import { ChartConfig, WidgetType, WIDGET_TYPE } from "@/lib/schemas";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CardContent } from "@/components/ui/card";

interface ChartRendererProps {
  data: any[];
  config: ChartConfig;
  type: WidgetType; // LINE_CHART, BAR_CHART, AREA_CHART
}

const DEFAULT_COLORS = [
  "hsl(35, 92%, 53%)", // amber-500
  "hsl(199, 89%, 48%)", // sky-500
  "hsl(338, 71%, 50%)", // pink-500
  "hsl(160, 84%, 39%)", // emerald-500
  "hsl(258, 90%, 66%)", // purple-500
];

export function ChartRenderer({ data, config, type }: ChartRendererProps) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <CardContent className="flex h-full w-full items-center justify-center p-4 text-sm text-muted-foreground">
        No data to display.
      </CardContent>
    );
  }

  const { xField, yFields, colors = [] } = config;

  const getLineElements = () => {
    return yFields.map((yField, index) => (
      <Line
        key={yField}
        type="monotone"
        dataKey={yField}
        stroke={colors[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
        strokeWidth={2}
        dot={{ r: 3 }}
        activeDot={{ r: 5 }}
      />
    ));
  };

  const getBarElements = () => {
    return yFields.map((yField, index) => (
      <Bar
        key={yField}
        dataKey={yField}
        fill={colors[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
        radius={[4, 4, 0, 0]}
      />
    ));
  };

  const getAreaElements = () => {
    return yFields.map((yField, index) => {
      const color =
        colors[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
      return (
        <Area
          key={yField}
          type="monotone"
          dataKey={yField}
          stroke={color}
          fill={color}
          fillOpacity={0.2}
          strokeWidth={2}
        />
      );
    });
  };

  const commonProps = {
    data,
    margin: { top: 10, right: 10, left: -20, bottom: 0 },
  };

  return (
    <CardContent className="h-full w-full min-h-[200px] p-6 pt-0">
      <ResponsiveContainer width="100%" height="100%">
        {type === WIDGET_TYPE.LINE_CHART ? (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey={xField} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            {yFields.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {getLineElements()}
          </LineChart>
        ) : type === WIDGET_TYPE.BAR_CHART ? (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey={xField} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            {yFields.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {getBarElements()}
          </BarChart>
        ) : (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey={xField} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            />
            {yFields.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {getAreaElements()}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </CardContent>
  );
}
