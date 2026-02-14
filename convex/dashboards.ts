import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listByProject = query({
  args: { projectId: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== identity.subject) return [];

    return ctx.db
      .query("dashboards")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("dashboards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const dashboard = await ctx.db.get(args.id);
    if (!dashboard) return null;

    // Verify ownership through project
    const project = await ctx.db.get(dashboard.projectId);
    if (!project || project.userId !== identity.subject) return null;

    return dashboard;
  },
});

export const create = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Verify project ownership
    const project = await ctx.db.get(args.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Project not found");
    }

    const now = Date.now();
    return ctx.db.insert("dashboards", {
      projectId: args.projectId,
      title: args.title,
      description: args.description,
      isPublic: false,
      layout: [],
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("dashboards"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    publicSlug: v.optional(v.string()),
    layout: v.optional(
      v.array(
        v.object({
          i: v.string(),
          x: v.number(),
          y: v.number(),
          w: v.number(),
          h: v.number(),
        })
      )
    ),
    refreshInterval: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const dashboard = await ctx.db.get(args.id);
    if (!dashboard) throw new Error("Dashboard not found");

    const project = await ctx.db.get(dashboard.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Dashboard not found");
    }

    const { id, ...fields } = args;
    const updates: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[key] = value;
    }

    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("dashboards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const dashboard = await ctx.db.get(args.id);
    if (!dashboard) throw new Error("Dashboard not found");

    const project = await ctx.db.get(dashboard.projectId);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Dashboard not found");
    }

    // Cascade: parallel queries + batch delete
    const [dataSources, widgets] = await Promise.all([
      ctx.db
        .query("dataSources")
        .withIndex("by_dashboardId", (q) => q.eq("dashboardId", args.id))
        .collect(),
      ctx.db
        .query("widgets")
        .withIndex("by_dashboardId", (q) => q.eq("dashboardId", args.id))
        .collect(),
    ]);

    await Promise.all([
      ...dataSources.map((ds) => ctx.db.delete(ds._id)),
      ...widgets.map((w) => ctx.db.delete(w._id)),
      ctx.db.delete(args.id),
    ]);
  },
});
