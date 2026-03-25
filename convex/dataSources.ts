import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { fetchDatasource } from "./_lib/fetchDatasource";

const dataSourceConfigValidator = v.object({
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
});

export const list = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== identity.subject) return [];

    return ctx.db
      .query("dataSources")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("dataSources") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const dataSource = await ctx.db.get(args.id);
    if (!dataSource) return null;

    const project = await ctx.db.get(dataSource.projectId);
    if (!project || project.userId !== identity.subject) return null;

    return dataSource;
  },
});

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    config: dataSourceConfigValidator,
    cacheTtl: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const project = await ctx.db.get(args.projectId);

    if (!project || project.userId !== identity.subject) {
      throw new Error("Project not found");
    }

    return ctx.db.insert("dataSources", {
      projectId: args.projectId,
      name: args.name,
      config: args.config,
      cacheTtl: args.cacheTtl,
      lastFetchedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("dataSources"),
    name: v.optional(v.string()),
    config: v.optional(dataSourceConfigValidator),
    cacheTtl: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const dataSource = await ctx.db.get(args.id);
    if (!dataSource) throw new Error("Data source not found");

    const project = await ctx.db.get(dataSource.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Data source not found");
    }

    const updates: Record<string, unknown> = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.config !== undefined) updates.config = args.config;
    if (args.cacheTtl !== undefined) updates.cacheTtl = args.cacheTtl;

    await ctx.db.patch(args.id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("dataSources") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const dataSource = await ctx.db.get(args.id);
    if (!dataSource) throw new Error("Data source not found");

    const project = await ctx.db.get(dataSource.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Data source not found");
    }

    const widgets = await ctx.db
      .query("widgets")
      .withIndex("by_projectId", (q) => q.eq("projectId", dataSource.projectId))
      .collect();

    await Promise.all([
      ...widgets
        .filter((widget) => widget.dataSourceId === args.id)
        .map((widget) => ctx.db.delete(widget._id)),
      ctx.db.delete(args.id),
    ]);
  },
});

export const testConnection = action({
  args: {
    config: dataSourceConfigValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { success: false as const, error: "Not authenticated" };
    }

    return await fetchDatasource(args.config);
  },
});
