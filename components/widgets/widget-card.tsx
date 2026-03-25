import { Doc, Id } from "@/convex/_generated/dataModel";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WidgetRenderer } from "@/components/widgets/widget-renderer";
import { cn } from "@/lib/utils";

interface WidgetCardProps {
  widget: Doc<"widgets">;
  onEdit: (widget: Doc<"widgets">) => void;
  onDelete: (widgetId: Id<"widgets">) => void;
}

const WIDE_WIDGET_TYPES = ["TABLE", "LINE_CHART", "AREA_CHART", "BAR_CHART"];

export function WidgetCard({ widget, onEdit, onDelete }: WidgetCardProps) {
  const isWide = WIDE_WIDGET_TYPES.includes(widget.type);

  return (
    <Card
      className={cn(
        "group relative flex flex-col overflow-hidden col-span-1",
        isWide && "md:col-span-2 lg:col-span-2"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4">
        <CardTitle className="text-sm font-semibold truncate pr-2">
          {widget.title}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(widget)}>
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:bg-destructive/10"
              onClick={() => onDelete(widget._id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <div className="flex-1 p-0 overflow-hidden relative">
        <WidgetRenderer widget={widget} />
      </div>
    </Card>
  );
}
