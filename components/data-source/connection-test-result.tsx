"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface ConnectionTestState {
  success: boolean;
  status?: number;
  data?: unknown;
  error?: string;
}

interface ConnectionTestResultProps {
  result: ConnectionTestState | null;
  responseDataPath?: string;
  extractedData?: unknown;
}

function toPrettyJson(value: unknown) {
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function ConnectionTestResult({
  result,
  responseDataPath,
  extractedData,
}: ConnectionTestResultProps) {
  if (!result) return null;

  return (
    <div className="space-y-3 rounded-lg border bg-white/3 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {result.success ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <XCircle className="h-4 w-4 text-destructive" />
          )}
          <p className="text-sm font-medium">
            {result.success ? "Connection successful" : "Connection failed"}
          </p>
        </div>
        {result.status !== undefined && (
          <Badge variant="outline">HTTP {result.status}</Badge>
        )}
      </div>

      {result.error && (
        <p className="text-sm text-destructive break-words">{result.error}</p>
      )}

      {result.data !== undefined && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Raw response JSON</p>
          <ScrollArea className="h-56 w-full rounded-md border">
            <pre className="p-3 text-xs leading-relaxed whitespace-pre-wrap break-words">
              {toPrettyJson(result.data)}
            </pre>
          </ScrollArea>
        </div>
      )}

      {result.success && result.data !== undefined && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Data path preview{responseDataPath?.trim() ? `: ${responseDataPath}` : ""}
          </p>
          <ScrollArea className="h-40 w-full rounded-md border">
            <pre className="p-3 text-xs leading-relaxed whitespace-pre-wrap break-words">
              {toPrettyJson(extractedData)}
            </pre>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
