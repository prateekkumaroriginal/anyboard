import { actionGeneric } from "convex/server";
import { v } from "convex/values";

const action = actionGeneric;

const headerSchema = v.object({ key: v.string(), value: v.string() });
const queryParamSchema = v.object({ key: v.string(), value: v.string() });

export const fetchTableData = action({
  args: {
    url: v.string(),
    headers: v.optional(v.array(headerSchema)),
    queryParams: v.optional(v.array(queryParamSchema))
  },
  handler: async (_ctx, args) => {
    const url = new URL(args.url);

    args.queryParams?.forEach((param) => {
      url.searchParams.set(param.key, param.value);
    });

    const response = await fetch(url.toString(), {
      headers: Object.fromEntries(
        (args.headers ?? []).map((header) => [header.key, header.value])
      )
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data source: ${response.status} ${response.statusText}`);
    }

    const payload = (await response.json()) as unknown;
    const rows = Array.isArray(payload)
      ? payload
      : payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)
        ? (payload as { data: unknown[] }).data
        : [];

    const firstRow = rows[0];
    const columns =
      firstRow && typeof firstRow === "object"
        ? Object.keys(firstRow as Record<string, unknown>).map((key) => ({
            key,
            label: key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
          }))
        : [];

    return {
      rows,
      columns
    };
  }
});
