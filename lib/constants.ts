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

export const DATA_SOURCE_STEP_TITLES: Record<number, string> = {
  1: "Basic Configuration",
  2: "Authentication & Headers",
  3: "Test Connection and Data Path",
  4: "Review and Save",
};
