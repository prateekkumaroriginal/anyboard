import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Doc } from "@/convex/_generated/dataModel";
import { getColorClass } from "@/lib/constants";

interface ProjectCardProps {
  project: Doc<"projects">;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project._id}`}>
      <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div
              className={`h-3 w-3 rounded-full shrink-0 ${getColorClass(project.color, index)}`}
            />
            <CardTitle className="text-base truncate">
              {project.name}
            </CardTitle>
          </div>
          {project.description && (
            <CardDescription className="line-clamp-2 mt-1">
              {project.description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
