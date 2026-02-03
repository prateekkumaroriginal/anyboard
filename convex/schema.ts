import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  boards: defineTable({
    name: v.string(),
    createdAt: v.number()
  }).index("by_created_at", ["createdAt"])
});
