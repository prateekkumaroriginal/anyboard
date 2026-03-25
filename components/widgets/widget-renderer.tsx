"use client";

import { useEffect, useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { WIDGET_TYPE } from "@/lib/schemas";
import { WidgetError } from "./widget-error";
import { Skeleton } from "@/components/ui/skeleton";
import { CardContent } from "@/components/ui/card";

import { KpiRenderer } from "./renderers/kpi-renderer";
import { GaugeRenderer } from "./renderers/gauge-renderer";
import { ProgressRenderer } from "./renderers/progress-renderer";
import { TableRenderer } from "./renderers/table-renderer";
import { ChartRenderer } from "./renderers/chart-renderer";
import { PieRenderer } from "./renderers/pie-renderer";
import { ScatterRenderer } from "./renderers/scatter-renderer";

interface WidgetRendererProps {
  widget: Doc<"widgets">;
}

export function WidgetRenderer({ widget }: WidgetRendererProps) {
  const fetchData = useAction(api.widgets.fetchData);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    
    fetchData({ widgetId: widget._id })
      .then((res) => {
        if (!mounted) return;
        if (res.success) {
          setData(res.data);
          setError(null);
        } else {
          setError(res.error);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to fetch widget data");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [
    widget._id,
    widget.updatedAt,
    fetchData,
  ]);

  if (loading) {
    return (
      <CardContent className="h-full w-full min-h-[150px] p-6">
        <Skeleton className="h-full w-full" />
      </CardContent>
    );
  }

  if (error) {
    return <WidgetError error={error} />;
  }

  if (data === null || data === undefined) {
    return <WidgetError error="No data returned." />;
  }

  switch (widget.type) {
    case WIDGET_TYPE.KPI:
      return <KpiRenderer value={data} config={widget.config} />;
    case WIDGET_TYPE.GAUGE:
      return <GaugeRenderer value={data as number} config={widget.config} />;
    case WIDGET_TYPE.PROGRESS_BAR:
      return <ProgressRenderer value={data as number} config={widget.config} />;
    case WIDGET_TYPE.TABLE:
      return <TableRenderer data={data as any[]} config={widget.config} />;
    case WIDGET_TYPE.LINE_CHART:
    case WIDGET_TYPE.BAR_CHART:
    case WIDGET_TYPE.AREA_CHART:
      return <ChartRenderer data={data as any[]} config={widget.config} type={widget.type} />;
    case WIDGET_TYPE.PIE_CHART:
    case WIDGET_TYPE.DONUT_CHART:
      return <PieRenderer data={data as any[]} config={widget.config} type={widget.type} />;
    case WIDGET_TYPE.SCATTER_PLOT:
      return <ScatterRenderer data={data as any[]} config={widget.config} />;
    default:
      return <WidgetError error={`Unknown widget type: ${widget.type}`} />;
  }
}
