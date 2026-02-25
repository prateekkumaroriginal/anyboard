export const PROJECT_COLORS = [
  "bg-amber-400",
  "bg-blue-400",
  "bg-emerald-400",
  "bg-purple-400",
  "bg-rose-400",
  "bg-cyan-400",
  "bg-orange-400",
  "bg-pink-400",
];

export const COLOR_OPTIONS = [
  { value: "bg-amber-400", label: "Amber" },
  { value: "bg-blue-400", label: "Blue" },
  { value: "bg-emerald-400", label: "Emerald" },
  { value: "bg-purple-400", label: "Purple" },
  { value: "bg-rose-400", label: "Rose" },
  { value: "bg-cyan-400", label: "Cyan" },
  { value: "bg-orange-400", label: "Orange" },
  { value: "bg-pink-400", label: "Pink" },
];

export function getColorClass(color?: string, index: number = 0) {
  if (color) return color;
  return PROJECT_COLORS[index % PROJECT_COLORS.length];
}

export const HTTP_METHOD_OPTIONS = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
] as const;

export const AUTH_TYPE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "apiKey", label: "API Key" },
  { value: "bearer", label: "Bearer Token" },
  { value: "basic", label: "Basic Auth" },
] as const;

export const RESPONSE_TYPE_OPTIONS = [
  { value: "array", label: "Array of records" },
  { value: "object", label: "Single object/value" },
] as const;

export const FIELD_TYPE_OPTIONS = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "date", label: "Date" },
] as const;
