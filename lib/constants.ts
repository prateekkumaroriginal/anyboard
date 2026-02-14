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
