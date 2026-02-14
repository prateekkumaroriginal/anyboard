import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return ctx.db
      .query("projects")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .order("desc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== identity.subject) return null;

    return project;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const now = Date.now();
    return ctx.db.insert("projects", {
      userId: identity.subject,
      name: args.name,
      description: args.description,
      color: args.color,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Project not found");
    }

    const updates: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.name !== undefined) updates.name = args.name;
    if (args.description !== undefined) updates.description = args.description;
    if (args.color !== undefined) updates.color = args.color;

    await ctx.db.patch(args.id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const project = await ctx.db.get(args.id);
    if (!project || project.userId !== identity.subject) {
      throw new Error("Project not found");
    }

    // Cascade: flat parallel queries by projectId, no per-dashboard loops
    const [dashboards, dataSources, widgets] = await Promise.all([
      ctx.db
        .query("dashboards")
        .withIndex("by_projectId", (q) => q.eq("projectId", args.id))
        .collect(),
      ctx.db
        .query("dataSources")
        .withIndex("by_projectId", (q) => q.eq("projectId", args.id))
        .collect(),
      ctx.db
        .query("widgets")
        .withIndex("by_projectId", (q) => q.eq("projectId", args.id))
        .collect(),
    ]);

    await Promise.all([
      ...dashboards.map((d) => ctx.db.delete(d._id)),
      ...dataSources.map((ds) => ctx.db.delete(ds._id)),
      ...widgets.map((w) => ctx.db.delete(w._id)),
      ctx.db.delete(args.id),
    ]);
  },
});
