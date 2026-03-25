"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Plus, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { CardSkeleton } from "@/components/shared/card-skeleton";
import { CreateWidgetDialog } from "@/components/widgets/create-widget-dialog";
import { WidgetCard } from "@/components/widgets/widget-card";

export default function DashboardPage() {
  const { projectId, dashboardId } = useParams() as { projectId: string; dashboardId: string };

  const dashboard = useQuery(
    api.dashboards.get,
    dashboardId ? { id: dashboardId as Id<"dashboards"> } : "skip"
  );

  const widgets = useQuery(
    api.widgets.listByDashboard,
    dashboardId ? { dashboardId: dashboardId as Id<"dashboards"> } : "skip"
  );

  const removeWidget = useMutation(api.widgets.remove);

  const [showWidgetDialog, setShowWidgetDialog] = useState(false);
  const [editingWidget, setEditingWidget] = useState<Doc<"widgets"> | undefined>();

  if (dashboard === undefined || widgets === undefined) {
    return (
      <div className="max-w-[1600px] mx-auto w-full">
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
        <CardSkeleton count={6} />
      </div>
    );
  }

  if (dashboard === null) {
    return (
      <EmptyState
        icon={LayoutDashboard}
        title="Dashboard not found"
        description="The dashboard you are looking for does not exist or you do not have permission to view it."
        action={null}
      />
    );
  }

  const handleEdit = (widget: Doc<"widgets">) => {
    setEditingWidget(widget);
    setShowWidgetDialog(true);
  };

  const handleDelete = async (widgetId: Id<"widgets">) => {
    if (confirm("Are you sure you want to delete this widget?")) {
      await removeWidget({ id: widgetId });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{dashboard.title}</h1>
          {dashboard.description && (
            <p className="text-muted-foreground text-sm mt-1">{dashboard.description}</p>
          )}
        </div>
        <Button
          onClick={() => {
            setEditingWidget(undefined);
            setShowWidgetDialog(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Widget
        </Button>
      </div>

      {widgets.length === 0 ? (
        <EmptyState
          icon={LayoutDashboard}
          title="No widgets yet"
          description="Add your first widget to start visualizing your data."
          action={
            <Button
              onClick={() => {
                setEditingWidget(undefined);
                setShowWidgetDialog(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Widget
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(300px,max-content)]">
          {widgets.map((widget) => (
            <WidgetCard
              key={widget._id}
              widget={widget}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateWidgetDialog
        dashboardId={dashboardId as Id<"dashboards">}
        projectId={projectId as Id<"projects">}
        open={showWidgetDialog}
        onOpenChange={(open) => {
          setShowWidgetDialog(open);
          if (!open) setEditingWidget(undefined);
        }}
        widget={editingWidget}
      />
    </div>
  );
}
