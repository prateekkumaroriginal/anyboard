import { ProgressBarConfig } from "@/lib/schemas";
import { Progress } from "@/components/ui/progress";
import { CardContent } from "@/components/ui/card";

interface ProgressRendererProps {
  value: number | any;
  config: ProgressBarConfig;
}

export function ProgressRenderer({ value, config }: ProgressRendererProps) {
  // If value is an object (due to missing valuePath but trying to evaluate maxField), we need to extract raw value
  let numericValue = 0;
  let dynamicMax = config.max || 100;
  
  if (typeof value === "number") {
    numericValue = value;
  } else if (typeof value === "object" && value !== null) {
    // Edge case: if they returned the whole object and didn't specify valuePath,
    // this shouldn't happen natively based on validation, but just in case.
    numericValue = Number(value.value) || 0;
    if (config.maxField && value[config.maxField] !== undefined) {
      dynamicMax = Number(value[config.maxField]) || dynamicMax;
    }
  }

  const clampedValue = Math.max(0, Math.min(dynamicMax, numericValue));
  const percentage = (clampedValue / dynamicMax) * 100;

  return (
    <CardContent className="flex flex-col justify-center h-full w-full p-6 pt-2 pb-6 min-h-[100px] gap-2">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-medium text-muted-foreground">
          {config.label || "Progress"}
        </span>
        <span className="text-base font-bold">
          {numericValue.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">/ {dynamicMax.toLocaleString()}</span>
        </span>
      </div>
      <Progress value={percentage} className="h-3" />
    </CardContent>
  );
}
