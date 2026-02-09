import type { TableColumn, TableRow } from "@/lib/table";

export default function DataTable({
  columns,
  rows
}: {
  columns: TableColumn[];
  rows: TableRow[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-100">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-slate-700">
                    {row[column.key]?.toString() ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
