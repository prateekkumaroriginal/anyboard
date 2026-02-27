import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500),
  color: z.string().min(1),
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

export const schemaFieldSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  type: z.enum(["string", "number", "boolean", "date"]),
  path: z.string().optional(),
});
export type SchemaFieldFormValues = z.infer<typeof schemaFieldSchema>;

export const dataSourceConfigSchema = z
  .object({
    url: z.string().url("Enter a valid URL"),
    method: z.enum(["GET", "POST"]),
    responseType: z.enum(["array", "object"]),
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
  schema: z.array(schemaFieldSchema).min(1, "Add at least one schema field"),
  cacheTtl: z.number().int().positive().optional(),
});
export type DataSourceFormValues = z.infer<typeof dataSourceSchema>;
