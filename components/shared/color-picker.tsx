import { COLOR_OPTIONS } from "@/lib/constants";
import { Label } from "@/components/shared/label";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  showLabel?: boolean;
}

export function ColorPicker({
  value,
  onChange,
  label = "Color",
  showLabel = true,
}: ColorPickerProps) {
  return (
    <div className="space-y-2">
      {showLabel && <Label className="mb-1 block">{label}</Label>}
      <div className="flex gap-2 flex-wrap">
        {COLOR_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-label={option.label}
            aria-pressed={value === option.value}
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
