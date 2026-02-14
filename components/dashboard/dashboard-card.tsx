import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";

interface DashboardCardProps {
  dashboard: Doc<"dashboards">;
  projectId: string;
}

export function DashboardCard({ dashboard, projectId }: DashboardCardProps) {
  return (
    <Link href={`/projects/${projectId}/dashboards/${dashboard._id}`}>
      <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
        <CardHeader>
          <CardTitle className="text-base">{dashboard.title}</CardTitle>
          {dashboard.description && (
            <CardDescription className="line-clamp-2">
              {dashboard.description}
            </CardDescription>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <span>{dashboard.layout.length} widgets</span>
            {dashboard.isPublic && (
              <span className="text-amber-400">Public</span>
            )}
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
