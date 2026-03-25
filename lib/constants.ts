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

export const WIDGET_TYPE_OPTIONS = [
  { value: "KPI", label: "KPI", description: "Single value metric" },
  { value: "GAUGE", label: "Gauge", description: "Numeric gauge dial" },
  { value: "PROGRESS_BAR", label: "Progress", description: "Progress bar" },
  { value: "TABLE", label: "Table", description: "Data table" },
  { value: "LINE_CHART", label: "Line Chart", description: "Line chart" },
  { value: "BAR_CHART", label: "Bar Chart", description: "Bar chart" },
  { value: "AREA_CHART", label: "Area Chart", description: "Area chart" },
  { value: "PIE_CHART", label: "Pie Chart", description: "Pie chart" },
  { value: "DONUT_CHART", label: "Donut Chart", description: "Donut chart" },
  { value: "SCATTER_PLOT", label: "Scatter", description: "Scatter plot" },
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
