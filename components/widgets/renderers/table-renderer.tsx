import { TableConfig } from "@/lib/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardContent } from "@/components/ui/card";

interface TableRendererProps {
  data: any[];
  config: TableConfig;
}

export function TableRenderer({ data, config }: TableRendererProps) {
  const [page, setPage] = useState(0);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <CardContent className="flex h-full w-full items-center justify-center p-4 text-sm text-muted-foreground">
        No data to display.
      </CardContent>
    );
  }

  // Auto-detect columns if none specified
  const columns =
    config.columns && config.columns.length > 0
      ? config.columns
      : Object.keys(data[0] || {}).map((key) => ({ field: key, label: key }));

  const pageSize = config.pageSize || 10;
  const totalPages = Math.ceil(data.length / pageSize);
  const startIdx = page * pageSize;
  const visibleData = data.slice(startIdx, startIdx + pageSize);

  return (
    <CardContent className="flex flex-col h-full w-full p-2 sm:p-4 pt-0">
      <div className="flex-1 overflow-auto rounded-md border text-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.field} className="whitespace-nowrap">
                  {col.label || col.field}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleData.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => {
                  const val = row[col.field];
                  return (
                    <TableCell key={col.field} className="whitespace-nowrap">
                      {val !== null && val !== undefined ? String(val) : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 pb-1 px-1">
          <div className="text-xs text-muted-foreground">
            Showing {startIdx + 1} to {Math.min(startIdx + pageSize, data.length)} of {data.length}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </CardContent>
  );
}
