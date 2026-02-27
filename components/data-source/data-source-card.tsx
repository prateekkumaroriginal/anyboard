import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataSourceCardProps {
  dataSource: Doc<"dataSources">;
  onEdit: (dataSource: Doc<"dataSources">) => void;
  onDelete: (dataSource: Doc<"dataSources">) => void;
}

function formatLastFetched(timestamp?: number) {
  if (!timestamp) return "Never";

  const diffMs = timestamp - Date.now();
  const diffMinutes = Math.round(diffMs / 60_000);

  if (Math.abs(diffMinutes) < 60) {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      diffMinutes,
      "minute"
    );
  }

  const diffHours = Math.round(diffMinutes / 60);
  return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
    diffHours,
    "hour"
  );
}

export function DataSourceCard({
  dataSource,
  onEdit,
  onDelete,
}: DataSourceCardProps) {
  return (
    <Card className="relative h-full border-amber-400/15 bg-white/3">
      <CardHeader className="space-y-3">
        <div className="min-w-0 pr-10">
          <CardTitle className="text-base line-clamp-1">{dataSource.name}</CardTitle>
          <CardDescription className="line-clamp-1 mt-1">
            {dataSource.config.url}
          </CardDescription>
        </div>

        <div className="absolute right-3 top-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(dataSource)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => onDelete(dataSource)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">
            {dataSource.config.method}
          </Badge>
          <Badge variant="secondary">
            {dataSource.config.responseType}
          </Badge>
          <span>{dataSource.schema.length} fields</span>
          <span className="text-amber-400/80">
            Last fetched {formatLastFetched(dataSource.lastFetchedAt)}
          </span>
        </div>
      </CardHeader>
    </Card>
  );
}
