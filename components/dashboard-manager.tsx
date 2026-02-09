"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Dashboard = {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: "active" | "paused";
};

const inputClassName =
  "h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400";

export default function DashboardManager() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([
    {
      id: "board-1",
      name: "Launch metrics",
      description: "Track API usage, conversions, and uptime in one place.",
      owner: "Alex Kim",
      status: "active"
    }
  ]);
  const [form, setForm] = useState({ name: "", description: "", owner: "" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => setForm({ name: "", description: "", owner: "" });

  const handleSubmit = () => {
    if (!form.name || !form.description || !form.owner) return;

    if (editingId) {
      setDashboards((items) =>
        items.map((item) =>
          item.id === editingId
            ? { ...item, ...form, status: item.status }
            : item
        )
      );
      setEditingId(null);
    } else {
      setDashboards((items) => [
        {
          id: `board-${Date.now()}`,
          name: form.name,
          description: form.description,
          owner: form.owner,
          status: "active"
        },
        ...items
      ]);
    }

    resetForm();
  };

  const handleEdit = (dashboard: Dashboard) => {
    setEditingId(dashboard.id);
    setForm({
      name: dashboard.name,
      description: dashboard.description,
      owner: dashboard.owner
    });
  };

  const handleDelete = (id: string) => {
    setDashboards((items) => items.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      resetForm();
    }
  };

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Dashboards</h2>
        <p className="mt-2 text-sm text-slate-600">
          Add, edit, and remove dashboards with required fields for name, description, and owner.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Name</label>
          <input
            className={inputClassName}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Launch metrics"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Description</label>
          <input
            className={inputClassName}
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Track API KPIs and releases"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase text-slate-500">Owner</label>
          <input
            className={inputClassName}
            value={form.owner}
            onChange={(event) => setForm({ ...form, owner: event.target.value })}
            placeholder="Alex Kim"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={handleSubmit}>{editingId ? "Save changes" : "Add dashboard"}</Button>
        <Button
          variant="ghost"
          className={cn(!editingId && "opacity-0 pointer-events-none")}
          onClick={() => {
            setEditingId(null);
            resetForm();
          }}
        >
          Cancel
        </Button>
      </div>

      <div className="space-y-4">
        {dashboards.map((dashboard) => (
          <div
            key={dashboard.id}
            className="flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 className="text-sm font-semibold text-slate-900">{dashboard.name}</h3>
              <p className="text-sm text-slate-600">{dashboard.description}</p>
              <p className="mt-1 text-xs uppercase text-slate-400">Owner: {dashboard.owner}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(dashboard)}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(dashboard.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
