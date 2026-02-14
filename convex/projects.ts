import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  assertAllowedProjectColor,
  assertMaxLength,
  assertTrimmedNonEmpty,
  normalizeOptionalText,
  PROJECT_DESCRIPTION_MAX_LENGTH,
  PROJECT_NAME_MAX_LENGTH,
} from "../lib/convex-validation";

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

    const name = assertTrimmedNonEmpty(args.name, "Project name");
    assertMaxLength(name, PROJECT_NAME_MAX_LENGTH, "Project name");

    const description = normalizeOptionalText(
      args.description,
      PROJECT_DESCRIPTION_MAX_LENGTH,
      "Project description"
    );

    const color = args.color?.trim() || undefined;
    assertAllowedProjectColor(color);

    const now = Date.now();
    return ctx.db.insert("projects", {
      userId: identity.subject,
      name,
      description,
      color,
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

    if (args.name !== undefined) {
      const name = assertTrimmedNonEmpty(args.name, "Project name");
      assertMaxLength(name, PROJECT_NAME_MAX_LENGTH, "Project name");
      updates.name = name;
    }

    if (args.description !== undefined) {
      updates.description = normalizeOptionalText(
        args.description,
        PROJECT_DESCRIPTION_MAX_LENGTH,
        "Project description"
      );
    }

    if (args.color !== undefined) {
      const color = args.color.trim() || undefined;
      assertAllowedProjectColor(color);
      updates.color = color;
    }

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
