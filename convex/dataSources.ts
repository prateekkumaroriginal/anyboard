import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";

const dataSourceConfigValidator = v.object({
  url: v.string(),
  method: v.union(v.literal("GET"), v.literal("POST")),
  responseType: v.union(v.literal("array"), v.literal("object")),
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

function toStringRecord(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};

  return Object.entries(input as Record<string, unknown>).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (typeof value === "string" && key.trim()) {
      acc[key.trim()] = value;
    }
    return acc;
  }, {});
}

function basicAuthToken(username: string, password: string): string {
  const payload = `${username}:${password}`;
  if (typeof btoa === "function") return btoa(payload);
  return Buffer.from(payload).toString("base64");
}

export const testConnection = action({
  args: {
    config: dataSourceConfigValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return { success: false as const, error: "Not authenticated" };
    }

    const headers = toStringRecord(args.config.headers);
    const queryParams = toStringRecord(args.config.queryParams);

    const authConfig =
      args.config.authConfig && typeof args.config.authConfig === "object"
        ? (args.config.authConfig as Record<string, unknown>)
        : {};

    if (args.config.authType === "bearer") {
      const token =
        typeof authConfig.token === "string" ? authConfig.token.trim() : "";
      if (token) headers.Authorization = `Bearer ${token}`;
    }

    if (args.config.authType === "basic") {
      const username =
        typeof authConfig.username === "string"
          ? authConfig.username.trim()
          : "";
      const password =
        typeof authConfig.password === "string" ? authConfig.password : "";
      if (username || password) {
        headers.Authorization = `Basic ${basicAuthToken(username, password)}`;
      }
    }

    if (args.config.authType === "apiKey") {
      const keyName =
        typeof authConfig.keyName === "string" ? authConfig.keyName.trim() : "";
      const keyValue =
        typeof authConfig.keyValue === "string" ? authConfig.keyValue : "";
      const location =
        authConfig.location === "query" ? "query" : ("header" as const);

      if (keyName && keyValue) {
        if (location === "query") {
          queryParams[keyName] = keyValue;
        } else {
          headers[keyName] = keyValue;
        }
      }
    }

    const requestUrl = new URL(args.config.url);
    for (const [key, value] of Object.entries(queryParams)) {
      requestUrl.searchParams.set(key, value);
    }

    const method = args.config.method;
    const init: RequestInit = { method, headers };

    if (method === "POST" && args.config.body) {
      init.body = args.config.body;
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
    }

    try {
      const response = await fetch(requestUrl.toString(), init);
      const contentType = response.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        return {
          success: false as const,
          error: `Request failed with status ${response.status}`,
          status: response.status,
          data: payload,
        };
      }

      return {
        success: true as const,
        status: response.status,
        data: payload,
      };
    } catch (error) {
      return {
        success: false as const,
        error:
          error instanceof Error ? error.message : "Unable to reach the API",
      };
    }
  },
});
