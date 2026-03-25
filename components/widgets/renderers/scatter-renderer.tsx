import { ScatterConfig } from "@/lib/schemas";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { CardContent } from "@/components/ui/card";

interface ScatterRendererProps {
  data: any[];
  config: ScatterConfig;
}

export function ScatterRenderer({ data, config }: ScatterRendererProps) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <CardContent className="flex h-full w-full items-center justify-center p-4 text-sm text-muted-foreground">
        No data to display.
      </CardContent>
    );
  }

  const { xField, yField, sizeField } = config;

  return (
    <CardContent className="h-full w-full min-h-[200px] p-6 pt-0">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            dataKey={xField}
            name={xField}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey={yField}
            name={yField}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          {sizeField && (
            <ZAxis type="number" dataKey={sizeField} range={[50, 400]} name={sizeField} />
          )}
          <Tooltip
            cursor={{ strokeDasharray: "3 3", stroke: "hsl(var(--muted))" }}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Scatter name="Data" data={data} fill="hsl(35, 92%, 53%)" opacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </CardContent>
  );
}
