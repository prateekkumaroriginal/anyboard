import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { fetchDatasource } from "./_lib/fetchDatasource";
import { resolveWidgetData } from "../lib/data-utils";

export const listByDashboard = query({
  args: { dashboardId: v.id("dashboards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const dashboard = await ctx.db.get(args.dashboardId);
    if (!dashboard) return [];

    const project = await ctx.db.get(dashboard.projectId);
    if (!project || project.userId !== identity.subject) return [];

    return ctx.db
      .query("widgets")
      .withIndex("by_dashboardId", (q) => q.eq("dashboardId", args.dashboardId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("widgets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const widget = await ctx.db.get(args.id);
    if (!widget) return null;

    const project = await ctx.db.get(widget.projectId);
    if (!project || project.userId !== identity.subject) return null;

    return widget;
  },
});

const widgetTypeValidator = v.union(
  v.literal("KPI"),
  v.literal("TABLE"),
  v.literal("LINE_CHART"),
  v.literal("BAR_CHART"),
  v.literal("PIE_CHART"),
  v.literal("DONUT_CHART"),
  v.literal("AREA_CHART"),
  v.literal("SCATTER_PLOT"),
  v.literal("GAUGE"),
  v.literal("PROGRESS_BAR")
);

export const create = mutation({
  args: {
    dashboardId: v.id("dashboards"),
    type: widgetTypeValidator,
    title: v.string(),
    dataSourceId: v.optional(v.id("dataSources")),
    config: v.any(),
    valuePath: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const dashboard = await ctx.db.get(args.dashboardId);
    if (!dashboard) throw new Error("Dashboard not found");

    const project = await ctx.db.get(dashboard.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Not authorized");
    }

    return ctx.db.insert("widgets", {
      projectId: dashboard.projectId,
      dashboardId: args.dashboardId,
      type: args.type,
      title: args.title,
      dataSourceId: args.dataSourceId,
      config: args.config,
      valuePath: args.valuePath,
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("widgets"),
    title: v.optional(v.string()),
    dataSourceId: v.optional(v.union(v.id("dataSources"), v.null())),
    config: v.optional(v.any()),
    valuePath: v.optional(v.union(v.string(), v.null())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const widget = await ctx.db.get(args.id);
    if (!widget) throw new Error("Widget not found");

    const project = await ctx.db.get(widget.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Not authorized");
    }

    const updates: any = { updatedAt: Date.now() };
    if (args.title !== undefined) updates.title = args.title;
    if (args.dataSourceId !== undefined) {
      updates.dataSourceId = args.dataSourceId === null ? undefined : args.dataSourceId;
    }
    if (args.config !== undefined) updates.config = args.config;
    if (args.valuePath !== undefined) {
      updates.valuePath = args.valuePath === null ? undefined : args.valuePath;
    }

    await ctx.db.patch(args.id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("widgets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const widget = await ctx.db.get(args.id);
    if (!widget) throw new Error("Widget not found");

    const project = await ctx.db.get(widget.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.id);
  },
});

export const fetchData = action({
  args: { widgetId: v.id("widgets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return { success: false as const, error: "Not authenticated" };

    const widget = await ctx.runQuery((api as any).widgets.get, { id: args.widgetId });
    if (!widget) return { success: false as const, error: "Widget not found" };

    if (!widget.dataSourceId) {
      return { success: false as const, error: "No data source configured" };
    }

    const dataSource = await ctx.runQuery(api.dataSources.get, { id: widget.dataSourceId });
    if (!dataSource) return { success: false as const, error: "Data source not found" };

    const fetchResult = await fetchDatasource(dataSource.config as any);
    if (!fetchResult.success) {
      return fetchResult;
    }

    console.info("fetchResult", fetchResult);
    console.info("responseDataPath", (dataSource.config as any).responseDataPath);
    console.info("valuePath", widget.valuePath);
    const resolvedData = resolveWidgetData(
      fetchResult.data,
      (dataSource.config as any).responseDataPath,
      widget.valuePath
    );

    // Validate shape based on widget type
    const isPrimitiveType = ["KPI", "GAUGE", "PROGRESS_BAR"].includes(widget.type);
    
    if (isPrimitiveType) {
      console.log("Primitive type", resolvedData);
      console.log("Widget Type", widget.type);
      const isPrimitive =
        typeof resolvedData === "string" ||
        typeof resolvedData === "number" ||
        typeof resolvedData === "boolean";
      
      if (!isPrimitive) {
        return {
          success: false as const,
          error: "Expected primitive value (string, number, boolean) but got complex object/array. Use value path to point to a specific value.",
        };
      }
    } else {
      if (!Array.isArray(resolvedData)) {
        return {
          success: false as const,
          error: "Expected an array of objects for this widget type, but got something else.",
        };
      }
    }

    return {
      success: true as const,
      data: resolvedData,
    };
  },
});
