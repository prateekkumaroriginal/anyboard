"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { Plus, Database, ArrowLeft } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { DataSourceCard } from "@/components/data-source/data-source-card";

export default function ProjectDataSourcesPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();

  const project = useQuery(api.projects.get, { id: projectId as Id<"projects"> });
  const dataSources = useQuery(api.dataSources.list, {
    projectId: projectId as Id<"projects">,
  });
  const removeDataSource = useMutation(api.dataSources.remove);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const dataSourcesBaseHref = `/projects/${projectId}/data-sources`;

  if (project === undefined) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
          <CardSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (project === null) {
    router.push("/projects");
    return null;
  }

  const handleDelete = async (dataSource: Doc<"dataSources">) => {
    const confirmed = window.confirm(
      `Delete "${dataSource.name}"? This cannot be undone.`
    );
    if (!confirmed || deletingId) return;

    setDeletingId(dataSource._id);
    try {
      await removeDataSource({ id: dataSource._id });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 space-y-3">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              Data Sources
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage API connections for {project.name}.
            </p>
          </div>
          <Button asChild>
            <Link prefetch href={`${dataSourcesBaseHref}/new`}>
              <Plus className="h-4 w-4 mr-2" />
              Add Data Source
            </Link>
          </Button>
        </div>
      </div>

      {dataSources === undefined ? (
        <CardSkeleton count={3} />
      ) : dataSources.length === 0 ? (
        <EmptyState
          icon={Database}
          title="No data sources yet"
          description="Add your first API connection to start powering widgets."
          action={
            <Button asChild>
              <Link prefetch href={`${dataSourcesBaseHref}/new`}>
                <Plus className="h-4 w-4 mr-2" />
                Add Data Source
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {dataSources.map((dataSource) => (
            <DataSourceCard
              key={dataSource._id}
              dataSource={dataSource}
              onEdit={(next) => {
                router.push(`${dataSourcesBaseHref}/${next._id}/edit`);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {deletingId && (
        <p className="text-xs text-muted-foreground mt-3">
          Deleting data source...
        </p>
      )}
    </div>
  );
}
