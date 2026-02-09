import { mutationGeneric, queryGeneric } from "convex/server";
import { v } from "convex/values";

const query = queryGeneric;
const mutation = mutationGeneric;

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("boards").withIndex("by_created_at").order("desc").take(20);
  }
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    owner: v.string()
  },
  handler: async (ctx, args) => {
    const boardId = await ctx.db.insert("boards", {
      name: args.name,
      description: args.description,
      owner: args.owner,
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    return boardId;
  }
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    owner: v.optional(v.string()),
    status: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now()
    });
  }
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
});
