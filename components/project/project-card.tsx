import Link from "next/link";
import { Database, MoreVertical } from "lucide-react";
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
import { getColorClass } from "@/lib/constants";

interface ProjectCardProps {
  project: Doc<"projects">;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectHref = `/projects/${project._id}`;
  const dataSourcesHref = `${projectHref}/data-sources`;

  return (
    <div className="group relative h-full">
      <Link
        href={projectHref}
        className="absolute inset-0 z-10 rounded-xl"
        aria-label={`Open ${project.name}`}
      />
      <Card className="h-full cursor-pointer transition-colors group-hover:border-primary/50">
        <CardHeader>
          <div className="min-w-0 pr-10">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`h-3 w-3 rounded-full shrink-0 ${getColorClass(project.color, index)}`}
              />
              <CardTitle className="text-base truncate">{project.name}</CardTitle>
            </div>
            {project.description && (
              <CardDescription className="line-clamp-2 mt-1">
                {project.description}
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
                <DropdownMenuItem asChild>
                  <Link href={dataSourcesHref}>
                    <Database className="h-4 w-4 mr-2" />
                    Data Sources
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
