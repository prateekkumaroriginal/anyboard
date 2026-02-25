"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { ArrowLeft } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { DataSourceWizard } from "@/components/data-source/data-source-wizard";

export default function EditDataSourcePage({
  params,
}: {
  params: Promise<{
    projectId: string;
    dataSourceId: string;
  }>;
}) {
  const { projectId, dataSourceId } = use(params);
  const router = useRouter();
  const backHref = `/projects/${projectId}/data-sources`;

  const project = useQuery(api.projects.get, { id: projectId as Id<"projects"> });
  const dataSource = useQuery(api.dataSources.get, {
    id: dataSourceId as Id<"dataSources">,
  });

  if (project === undefined || dataSource === undefined) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-5 w-56" />
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-[560px] w-full" />
        </div>
      </div>
    );
  }

  if (project === null) {
    router.push("/projects");
    return null;
  }

  if (dataSource === null || String(dataSource.projectId) !== projectId) {
    router.push(backHref);
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          href={backHref}
          className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Data Sources
        </Link>

        <DataSourceWizard
          projectId={projectId}
          title="Edit Data Source"
          dataSource={dataSource}
          onCancel={() => router.push(backHref)}
          onSuccess={() => router.push(backHref)}
        />
      </div>
    </div>
  );
}
