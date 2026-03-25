import { GaugeConfig } from "@/lib/schemas";
import { CardContent } from "@/components/ui/card";

interface GaugeRendererProps {
  value: number;
  config: GaugeConfig;
}

export function GaugeRenderer({ value, config }: GaugeRendererProps) {
  const { min = 0, max = 100, unit = "" } = config;
  
  // Constrain value to min, max
  const clampedValue = Math.max(min, Math.min(max, value));
  
  // Calculate percentage for progress
  const percentage = Math.max(0, Math.min(100, ((clampedValue - min) / (max - min)) * 100));

  return (
    <CardContent className="flex flex-col items-center justify-center p-6 h-full w-full min-h-[160px] pt-4">
      <div className="relative w-40 h-20 overflow-hidden">
        {/* Background Arc */}
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full border-24 border-secondary box-border"></div>
        {/* Foreground Arc */}
        <div 
          className="absolute top-0 left-0 w-40 h-40 rounded-full border-24 border-amber-500 box-border origin-center"
          style={{
            clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
            transform: `rotate(${ -180 + (percentage * 1.8) }deg)`,
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        ></div>
        {/* Needle dot */}
        <div 
          className="absolute bottom-0 left-1/2 w-4 h-4 bg-foreground rounded-full -translate-x-1/2 translate-y-1/2 z-10"
        ></div>
        {/* Inner block to hide lower half */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-card"></div>
      </div>
      
      <div className="mt-4 flex flex-col items-center">
        <span className="text-3xl font-bold tracking-tight">
          {Number(value).toLocaleString()}
          {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
        </span>
        <div className="flex w-40 justify-between mt-1 text-xs text-muted-foreground font-medium">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </CardContent>
  );
}
