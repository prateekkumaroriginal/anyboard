"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { KeyValuePair } from "@/lib/schemas";

interface KeyValueEditorProps {
  label: string;
  value: KeyValuePair[];
  onChange: (value: KeyValuePair[]) => void;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
  addLabel?: string;
}

const EMPTY_ROW: KeyValuePair = { key: "", value: "" };

export function KeyValueEditor({
  label,
  value,
  onChange,
  keyPlaceholder = "Key",
  valuePlaceholder = "Value",
  addLabel = "Add row",
}: KeyValueEditorProps) {
  const rows = value.length > 0 ? value : [EMPTY_ROW];

  const updateRow = (
    index: number,
    field: keyof KeyValuePair,
    nextValue: string
  ) => {
    const nextRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: nextValue } : row
    );
    onChange(nextRows);
  };

  const addRow = () => onChange([...rows, { ...EMPTY_ROW }]);

  const removeRow = (index: number) => {
    const nextRows = rows.filter((_, rowIndex) => rowIndex !== index);
    onChange(nextRows.length > 0 ? nextRows : [{ ...EMPTY_ROW }]);
  };

  return (
    <div className="space-y-3">
      <FieldLabel>{label}</FieldLabel>
      <div className="space-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              value={row.key}
              onChange={(event) => updateRow(index, "key", event.target.value)}
              placeholder={keyPlaceholder}
            />
            <Input
              value={row.value}
              onChange={(event) =>
                updateRow(index, "value", event.target.value)
              }
              placeholder={valuePlaceholder}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeRow(index)}
              aria-label={`Remove ${label} row ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addRow}>
        <Plus className="h-4 w-4 mr-2" />
        {addLabel}
      </Button>
    </div>
  );
}
