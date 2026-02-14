import { COLOR_OPTIONS } from "@/lib/constants";
import { Label } from "@/components/shared/label";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="mb-1 block">Color</Label>
      <div className="flex gap-2 flex-wrap">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`h-8 w-8 rounded-full transition-all ${option.value} ${
              value === option.value
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110"
                : "hover:scale-105 opacity-60 hover:opacity-100"
            }`}
            title={option.label}
          />
        ))}
      </div>
    </div>
  );
}
