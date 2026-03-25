import { AlertCircle } from "lucide-react";
import { CardContent } from "@/components/ui/card";

interface WidgetErrorProps {
  error: string;
}

export function WidgetError({ error }: WidgetErrorProps) {
  return (
    <CardContent className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-sm text-muted-foreground">
      <AlertCircle className="mb-2 h-6 w-6 text-destructive/80" />
      <p className="max-w-[200px] text-balance">{error}</p>
    </CardContent>
  );
}
