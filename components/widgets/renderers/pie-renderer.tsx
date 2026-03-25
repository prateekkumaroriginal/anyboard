import { PieConfig, WidgetType, WIDGET_TYPE } from "@/lib/schemas";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CardContent } from "@/components/ui/card";

interface PieRendererProps {
  data: any[];
  config: PieConfig;
  type: WidgetType; // PIE_CHART, DONUT_CHART
}

const DEFAULT_COLORS = [
  "hsl(35, 92%, 53%)", // amber-500
  "hsl(199, 89%, 48%)", // sky-500
  "hsl(338, 71%, 50%)", // pink-500
  "hsl(160, 84%, 39%)", // emerald-500
  "hsl(258, 90%, 66%)", // purple-500
  "hsl(14, 89%, 55%)",  // orange-500
  "hsl(178, 60%, 48%)", // teal-500
];

export function PieRenderer({ data, config, type }: PieRendererProps) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <CardContent className="flex h-full w-full items-center justify-center p-4 text-sm text-muted-foreground">
        No data to display.
      </CardContent>
    );
  }

  const { nameField, valueField, colors = [] } = config;

  const isDonut = type === WIDGET_TYPE.DONUT_CHART;

  return (
    <CardContent className="h-full w-full min-h-[240px] p-6 pt-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            nameKey={nameField}
            dataKey={valueField}
            cx="50%"
            cy="50%"
            innerRadius={isDonut ? "60%" : "0%"}
            outerRadius="80%"
            fill="hsl(35, 92%, 53%)"
            stroke="hsl(var(--background))"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  colors[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
                }
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid hsl(var(--border))",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: 12, lineHeight: "24px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </CardContent>
  );
}
