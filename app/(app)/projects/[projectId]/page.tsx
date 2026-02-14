"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { CreateDashboardDialog } from "@/components/dashboard/create-dashboard-dialog";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();

  const project = useQuery(api.projects.get, {
    id: projectId as Id<"projects">,
  });
  const dashboards = useQuery(api.dashboards.listByProject, {
    projectId: projectId as Id<"projects">,
  });

  const [showNewDialog, setShowNewDialog] = useState(false);

  if (project === undefined) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
          <CardSkeleton count={3} />
        </div>
      </div>
    );
  }

  if (project === null) {
    router.push("/projects");
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {project.name}
          </h1>
          {project.description && (
            <p className="text-muted-foreground text-sm mt-1">
              {project.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/projects/${projectId}/settings`}>
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button onClick={() => setShowNewDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Dashboard
          </Button>
        </div>
      </div>

      {dashboards === undefined ? (
        <CardSkeleton count={3} />
      ) : dashboards.length === 0 ? (
        <EmptyState
          icon={LayoutDashboard}
          title="No dashboards yet"
          description="Create your first dashboard to start visualizing your data."
          action={
            <Button onClick={() => setShowNewDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Dashboard
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashboards.map((dashboard) => (
            <DashboardCard
              key={dashboard._id}
              dashboard={dashboard}
              projectId={projectId}
            />
          ))}
        </div>
      )}

      <CreateDashboardDialog
        projectId={projectId}
        projectName={project.name}
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
      />
    </div>
  );
}
