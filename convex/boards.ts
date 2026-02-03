import { query, mutation } from "convex/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("boards").withIndex("by_created_at").order("desc").take(20);
  }
});

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const boardId = await ctx.db.insert("boards", {
      name: args.name,
      createdAt: Date.now()
    });
    return boardId;
  }
});
