import { NextRequest, NextResponse } from "next/server";

import { inferColumns, type TableRow } from "@/lib/table";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url query parameter." }, { status: 400 });
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: `Failed to fetch data: ${response.status} ${response.statusText}` },
      { status: response.status }
    );
  }

  const payload = (await response.json()) as unknown;
  const rows = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : [];

  const typedRows = rows.filter((row): row is TableRow => typeof row === "object" && row !== null);
  const columns = inferColumns(typedRows);

  return NextResponse.json({ rows: typedRows, columns });
}
