import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    userId: v.string(), // Clerk user ID
    name: v.string(),
    description: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  dashboards: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    isPublic: v.boolean(),
    publicSlug: v.optional(v.string()),
    layout: v.array(
      v.object({
        i: v.string(),
        x: v.number(),
        y: v.number(),
        w: v.number(),
        h: v.number(),
      })
    ),
    refreshInterval: v.optional(v.number()),
    globalFilters: v.optional(
      v.array(
        v.object({
          field: v.string(),
          operator: v.string(),
          value: v.any(),
        })
      )
    ),
    updatedAt: v.number(),
  })
    .index("by_projectId", ["projectId"])
    .index("by_publicSlug", ["publicSlug"]),

  dataSources: defineTable({
    projectId: v.id("projects"),
    name: v.string(),
    config: v.object({
      url: v.string(),
      method: v.union(v.literal("GET"), v.literal("POST")),
      headers: v.optional(v.any()),
      authType: v.optional(
        v.union(
          v.literal("none"),
          v.literal("apiKey"),
          v.literal("bearer"),
          v.literal("basic")
        )
      ),
      authConfig: v.optional(v.any()),
      queryParams: v.optional(v.any()),
      body: v.optional(v.string()),
      responseDataPath: v.optional(v.string()),
    }),
    cacheTtl: v.optional(v.number()),
    lastFetchedAt: v.optional(v.number()),
  }).index("by_projectId", ["projectId"]),

  widgets: defineTable({
    projectId: v.id("projects"),
    dashboardId: v.id("dashboards"),
    dataSourceId: v.optional(v.id("dataSources")),
    type: v.union(
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
    ),
    title: v.string(),
    config: v.any(),
    valuePath: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_dashboardId", ["dashboardId"])
    .index("by_projectId", ["projectId"]),
});
