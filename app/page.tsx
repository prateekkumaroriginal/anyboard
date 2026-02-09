import DashboardManager from "@/components/dashboard-manager";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { inferColumns, type TableRow } from "@/lib/table";

const highlights = [
  {
    title: "API-first dashboards",
    description: "Point Anyboard at a GET endpoint and get instant visuals with caching and validation."
  },
  {
    title: "Type-safe widgets",
    description: "Tables, cards, and charts share a strict configuration contract from backend to UI."
  },
  {
    title: "Production-ready defaults",
    description: "Convex data fetching, Nuqs URL sync, and Tailwind + shadcn/ui styling out of the box."
  }
];

const sampleRows: TableRow[] = [
  { endpoint: "/api/metrics", requests: 12450, errors: 12, latency_ms: 180 },
  { endpoint: "/api/boards", requests: 8430, errors: 4, latency_ms: 142 },
  { endpoint: "/api/data", requests: 6720, errors: 9, latency_ms: 205 }
];

const sampleColumns = inferColumns(sampleRows);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="container py-16">
        <div className="flex flex-col gap-8">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Anyboard
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Ship API dashboards without frontend overhead.
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              Build, configure, and share dashboards in minutes. Anyboard fetches your API data, validates
              responses, and renders interactive widgets with type-safe defaults.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg">Create your first board</Button>
              <Button variant="outline" size="lg">
                View product plan
              </Button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Ready for your data sources</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Configure headers, query params, pagination, and cache TTLs without leaving the builder.
                </p>
              </div>
              <Button variant="secondary">Connect an API</Button>
            </div>
          </div>
          <DashboardManager />
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Sample API table</h2>
              <p className="mt-2 text-sm text-slate-600">
                This table uses inferred columns from API-shaped data while the GET endpoint is wired for
                live sources.
              </p>
            </div>
            <DataTable columns={sampleColumns} rows={sampleRows} />
          </div>
        </div>
      </section>
    </main>
  );
}
