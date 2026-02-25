"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FIELD_TYPE_OPTIONS } from "@/lib/constants";
import { SchemaFieldFormValues } from "@/lib/schemas";

interface SchemaFieldEditorProps {
  value: SchemaFieldFormValues[];
  onChange: (value: SchemaFieldFormValues[]) => void;
}

const EMPTY_FIELD: SchemaFieldFormValues = {
  name: "",
  type: "string",
  path: "",
};

export function SchemaFieldEditor({ value, onChange }: SchemaFieldEditorProps) {
  const fields = value.length > 0 ? value : [EMPTY_FIELD];

  const updateField = (
    index: number,
    key: keyof SchemaFieldFormValues,
    nextValue: string
  ) => {
    const nextFields = fields.map((field, fieldIndex) =>
      fieldIndex === index ? { ...field, [key]: nextValue } : field
    );
    onChange(nextFields);
  };

  const addField = () => onChange([...fields, { ...EMPTY_FIELD }]);

  const removeField = (index: number) => {
    const nextFields = fields.filter((_, fieldIndex) => fieldIndex !== index);
    onChange(nextFields.length > 0 ? nextFields : [{ ...EMPTY_FIELD }]);
  };

  return (
    <div className="space-y-3">
      <FieldLabel>
        Fields <span className="text-destructive">*</span>
      </FieldLabel>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 sm:flex-row sm:items-center"
          >
            <Input
              value={field.name}
              onChange={(event) =>
                updateField(index, "name", event.target.value)
              }
              placeholder="Field name"
              className="bg-white/3 border-amber-400/15 sm:w-56 sm:flex-none"
            />
            <Select
              value={field.type}
              onValueChange={(value) => updateField(index, "type", value)}
            >
              <SelectTrigger className="bg-white/3 border-amber-400/15 sm:w-36 sm:flex-none">
                <SelectValue placeholder="Field type" />
              </SelectTrigger>
              <SelectContent>
                {FIELD_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={field.path ?? ""}
              onChange={(event) =>
                updateField(index, "path", event.target.value)
              }
              placeholder="Path (e.g. stats.highScore)"
              className="bg-white/3 border-amber-400/15 sm:flex-1"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeField(index)}
              className="sm:self-center"
              aria-label={`Remove field ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={addField}>
        <Plus className="h-4 w-4 mr-2" />
        Add Field
      </Button>
    </div>
  );
}
