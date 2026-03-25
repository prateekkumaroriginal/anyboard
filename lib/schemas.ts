import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500),
});
export type ProjectFormValues = z.infer<typeof projectSchema>;

export const dashboardSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500),
});
export type DashboardFormValues = z.infer<typeof dashboardSchema>;

export const deleteProjectSchema = (projectName: string) =>
  z.object({
    confirmName: z.string().refine((val) => val === projectName, {
      message: "Project name does not match",
    }),
  });
export type DeleteProjectFormValues = { confirmName: string };

export const keyValuePairSchema = z.object({
  key: z.string(),
  value: z.string(),
});
export type KeyValuePair = z.infer<typeof keyValuePairSchema>;

export const dataSourceConfigSchema = z
  .object({
    url: z.string().url("Enter a valid URL"),
    method: z.enum(["GET", "POST"]),
    headers: z.array(keyValuePairSchema).default([]),
    authType: z.enum(["none", "apiKey", "bearer", "basic"]).default("none"),
    authConfig: z
      .object({
        keyName: z.string().optional(),
        keyValue: z.string().optional(),
        location: z.enum(["header", "query"]).optional(),
        token: z.string().optional(),
        username: z.string().optional(),
        password: z.string().optional(),
      })
      .default({}),
    queryParams: z.array(keyValuePairSchema).default([]),
    body: z.string().optional(),
    responseDataPath: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    const trimmedBody = value.body?.trim() ?? "";

    if (value.method === "POST") {
      if (!trimmedBody) {
        ctx.addIssue({
          code: "custom",
          message: "Request body is required for POST requests",
          path: ["body"],
        });
      } else {
        try {
          JSON.parse(trimmedBody);
        } catch {
          ctx.addIssue({
            code: "custom",
            message: "Request body must be valid JSON",
            path: ["body"],
          });
        }
      }
    }

    if (value.authType === "apiKey") {
      if (!value.authConfig.keyName?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "API key name is required",
          path: ["authConfig", "keyName"],
        });
      }

      if (!value.authConfig.keyValue?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "API key value is required",
          path: ["authConfig", "keyValue"],
        });
      }
    }

    if (value.authType === "bearer" && !value.authConfig.token?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Bearer token is required",
        path: ["authConfig", "token"],
      });
    }

    if (value.authType === "basic") {
      if (!value.authConfig.username?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Username is required",
          path: ["authConfig", "username"],
        });
      }

      if (!value.authConfig.password?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: "Password is required",
          path: ["authConfig", "password"],
        });
      }
    }
  });
export type DataSourceConfigFormValues = z.infer<typeof dataSourceConfigSchema>;

export const dataSourceSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  config: dataSourceConfigSchema,
  cacheTtl: z.number().int().positive().optional(),
});
export type DataSourceFormValues = z.infer<typeof dataSourceSchema>;

// --- Widget type enum (SCREAM_CASE const object) ---
export const WIDGET_TYPE = {
  KPI: "KPI",
  GAUGE: "GAUGE",
  PROGRESS_BAR: "PROGRESS_BAR",
  TABLE: "TABLE",
  LINE_CHART: "LINE_CHART",
  BAR_CHART: "BAR_CHART",
  AREA_CHART: "AREA_CHART",
  PIE_CHART: "PIE_CHART",
  DONUT_CHART: "DONUT_CHART",
  SCATTER_PLOT: "SCATTER_PLOT",
} as const;
export type WidgetType = (typeof WIDGET_TYPE)[keyof typeof WIDGET_TYPE];

// --- Per-type config schemas ---
export const kpiConfigSchema = z.object({
  prefix: z.string().max(20).optional(),
  suffix: z.string().max(20).optional(),
});
export type KpiConfig = z.infer<typeof kpiConfigSchema>;

export const gaugeConfigSchema = z.object({
  min: z.number().default(0),
  max: z.number().default(100),
  unit: z.string().max(10).optional(),
});
export type GaugeConfig = z.infer<typeof gaugeConfigSchema>;

export const progressBarConfigSchema = z.object({
  max: z.number().positive().default(100),
  maxField: z.string().optional(),
  label: z.string().max(50).optional(),
});
export type ProgressBarConfig = z.infer<typeof progressBarConfigSchema>;

export const tableConfigSchema = z.object({
  columns: z.array(z.object({
    field: z.string().min(1),
    label: z.string().optional(),
  })).default([]),
  pageSize: z.number().int().positive().default(10),
});
export type TableConfig = z.infer<typeof tableConfigSchema>;

export const chartConfigSchema = z.object({
  xField: z.string().min(1, "X axis field is required"),
  yFields: z.array(z.string().min(1)).min(1, "At least one Y axis field is required"),
  colors: z.array(z.string()).optional(),
});
export type ChartConfig = z.infer<typeof chartConfigSchema>;

export const pieConfigSchema = z.object({
  nameField: z.string().min(1, "Name field is required"),
  valueField: z.string().min(1, "Value field is required"),
  colors: z.array(z.string()).optional(),
});
export type PieConfig = z.infer<typeof pieConfigSchema>;

export const scatterConfigSchema = z.object({
  xField: z.string().min(1, "X field is required"),
  yField: z.string().min(1, "Y field is required"),
  sizeField: z.string().optional(),
});
export type ScatterConfig = z.infer<typeof scatterConfigSchema>;

// --- Widget form schema ---
export const widgetBaseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  dataSourceId: z.string().optional(),
  valuePath: z.string().optional(),
  type: z.enum([
    WIDGET_TYPE.KPI, WIDGET_TYPE.GAUGE, WIDGET_TYPE.PROGRESS_BAR,
    WIDGET_TYPE.TABLE, WIDGET_TYPE.LINE_CHART, WIDGET_TYPE.BAR_CHART,
    WIDGET_TYPE.AREA_CHART, WIDGET_TYPE.PIE_CHART, WIDGET_TYPE.DONUT_CHART,
    WIDGET_TYPE.SCATTER_PLOT,
  ]),
});
export type WidgetFormValues = z.infer<typeof widgetBaseSchema>;

// Config schemas keyed by type for runtime lookup
export const WIDGET_CONFIG_SCHEMAS: Record<WidgetType, z.ZodTypeAny> = {
  KPI: kpiConfigSchema,
  GAUGE: gaugeConfigSchema,
  PROGRESS_BAR: progressBarConfigSchema,
  TABLE: tableConfigSchema,
  LINE_CHART: chartConfigSchema,
  BAR_CHART: chartConfigSchema,
  AREA_CHART: chartConfigSchema,
  PIE_CHART: pieConfigSchema,
  DONUT_CHART: pieConfigSchema,
  SCATTER_PLOT: scatterConfigSchema,
};
