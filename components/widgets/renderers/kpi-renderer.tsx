import { KpiConfig } from "@/lib/schemas";
import { CardContent } from "@/components/ui/card";

interface KpiRendererProps {
  value: string | number | boolean;
  config: KpiConfig;
}

export function KpiRenderer({ value, config }: KpiRendererProps) {
  const displayValue = typeof value === "boolean" ? (value ? "Yes" : "No") : value;

  return (
    <CardContent className="flex flex-col items-center justify-center h-full w-full min-h-[120px] p-6 pt-2 pb-6">
      <div className="flex items-baseline gap-1 text-center">
        {config.prefix && (
          <span className="text-xl sm:text-2xl text-muted-foreground font-medium">
            {config.prefix}
          </span>
        )}
        <span
          className="text-base font-bold tracking-tight text-foreground truncate max-w-full"
          title={String(displayValue)}
        >
          {displayValue}
        </span>
        {config.suffix && (
          <span className="text-xl sm:text-2xl text-muted-foreground font-medium">
            {config.suffix}
          </span>
        )}
      </div>
    </CardContent>
  );
}
