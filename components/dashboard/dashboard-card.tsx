import Link from "next/link";
import { MoreVertical, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc } from "@/convex/_generated/dataModel";

interface DashboardCardProps {
  dashboard: Doc<"dashboards">;
  projectId: string;
  onEdit: (dashboard: Doc<"dashboards">) => void;
}

export function DashboardCard({
  dashboard,
  projectId,
  onEdit,
}: DashboardCardProps) {
  const dashboardHref = `/projects/${projectId}/dashboards/${dashboard._id}`;

  return (
    <div className="group relative h-full">
      <Link
        href={dashboardHref}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`Open ${dashboard.title}`}
      />
      <Card className="h-full cursor-pointer transition-colors group-hover:border-primary/50">
        <CardHeader>
          <div className="min-w-0 pr-10">
            <CardTitle className="text-base line-clamp-1">
              {dashboard.title}
            </CardTitle>
            {dashboard.description && (
              <CardDescription className="line-clamp-2 mt-1">
                {dashboard.description}
              </CardDescription>
            )}
          </div>

          <div className="absolute right-3 top-3 z-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(dashboard)}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <span>{dashboard.layout.length} widgets</span>
            {dashboard.isPublic && (
              <span className="text-amber-400">Public</span>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
