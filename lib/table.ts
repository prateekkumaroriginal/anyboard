export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = Record<string, string | number | boolean | null>;

export function inferColumns(rows: TableRow[]): TableColumn[] {
  const firstRow = rows[0];
  if (!firstRow) return [];

  return Object.keys(firstRow).map((key) => ({
    key,
    label: key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  }));
}
