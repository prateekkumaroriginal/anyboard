import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  boards: defineTable({
    name: v.string(),
    description: v.string(),
    owner: v.string(),
    status: v.string(),
    createdAt: v.number(),
    updatedAt: v.number()
  }).index("by_created_at", ["createdAt"])
});
