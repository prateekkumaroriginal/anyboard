import { UseFormReturn, useFieldArray, Controller } from "react-hook-form";
import { WidgetType, WIDGET_TYPE } from "@/lib/schemas";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  form: UseFormReturn<any>;
}

function KpiConfigFields({ form }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Controller
        name="config.prefix"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Prefix</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="$" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.suffix"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Suffix</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder=" users" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

function GaugeConfigFields({ form }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Controller
        name="config.min"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Min</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value ?? 0}
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.max"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Max</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value ?? 100}
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.unit"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Unit</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="%" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

function ProgressBarConfigFields({ form }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Controller
        name="config.max"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Max fixed value</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value ?? 100}
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.maxField"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Max value field path</FieldLabel>
            <Input
              {...field}
              value={field.value ?? ""}
              placeholder="e.g. data.target"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.label"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Label</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="Status" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

function TableConfigFields({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "config.columns",
  });

  return (
    <div className="space-y-4">
      <Controller
        name="config.pageSize"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Page Size</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value ?? 10}
              onChange={(e) => field.onChange(parseInt(e.target.value) || 10)}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="space-y-2">
        <FieldLabel>Columns (Leave empty to auto-detect)</FieldLabel>
        {fields.map((col, index) => (
          <div key={col.id} className="flex gap-2 items-start">
            <Controller
              name={`config.columns.${index}.field`}
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex-1">
                  <Input {...field} placeholder="Data field (e.g. user.name)" />
                  {fieldState.invalid && (
                    <span className="text-xs text-destructive mt-1">
                      {fieldState.error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name={`config.columns.${index}.label`}
              control={form.control}
              render={({ field }) => (
                <div className="flex-1">
                  <Input {...field} value={field.value ?? ""} placeholder="Display Label" />
                </div>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
              className="text-destructive shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ field: "", label: "" })}
          className="mt-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Column
        </Button>
      </div>
    </div>
  );
}

function ChartConfigFields({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "config.yFields" as const,
  });

  return (
    <div className="space-y-4">
      <Controller
        name="config.xField"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>X-Axis Field</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="e.g. date" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="space-y-2">
        <FieldLabel>Y-Axis Fields</FieldLabel>
        {fields.map((yField, index) => (
          <div key={yField.id} className="flex gap-2 items-start">
            <Controller
              name={`config.yFields.${index}`}
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="flex-1">
                  <Input {...field} value={field.value ?? ""} placeholder="Data field" />
                  {fieldState.invalid && (
                    <span className="text-xs text-destructive mt-1">
                      {fieldState.error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
          className="mt-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Y-Axis Field
        </Button>
      </div>
    </div>
  );
}

function PieConfigFields({ form }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Controller
        name="config.nameField"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Name Field (Categories)</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="e.g. status" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.valueField"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Value Field</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="e.g. count" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

function ScatterConfigFields({ form }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Controller
        name="config.xField"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>X-Axis Field</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="e.g. height" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.yField"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Y-Axis Field</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="e.g. width" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="config.sizeField"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Size Field (Optional)</FieldLabel>
            <Input {...field} value={field.value ?? ""} placeholder="e.g. mass" />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}

interface WidgetConfigFieldsProps {
  type: WidgetType;
  form: UseFormReturn<any>;
}

export function WidgetConfigFields({ type, form }: WidgetConfigFieldsProps) {
  switch (type) {
    case WIDGET_TYPE.KPI:
      return <KpiConfigFields form={form} />;
    case WIDGET_TYPE.GAUGE:
      return <GaugeConfigFields form={form} />;
    case WIDGET_TYPE.PROGRESS_BAR:
      return <ProgressBarConfigFields form={form} />;
    case WIDGET_TYPE.TABLE:
      return <TableConfigFields form={form} />;
    case WIDGET_TYPE.LINE_CHART:
    case WIDGET_TYPE.BAR_CHART:
    case WIDGET_TYPE.AREA_CHART:
      return <ChartConfigFields form={form} />;
    case WIDGET_TYPE.PIE_CHART:
    case WIDGET_TYPE.DONUT_CHART:
      return <PieConfigFields form={form} />;
    case WIDGET_TYPE.SCATTER_PLOT:
      return <ScatterConfigFields form={form} />;
    default:
      return null;
  }
}
