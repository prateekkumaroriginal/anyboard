"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  WidgetType,
  widgetBaseSchema,
  WIDGET_CONFIG_SCHEMAS,
  WidgetFormValues,
} from "@/lib/schemas";
import { WIDGET_TYPE_OPTIONS } from "@/lib/constants";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

import { WidgetConfigFields } from "./widget-config-fields";

interface CreateWidgetDialogProps {
  dashboardId: Id<"dashboards">;
  projectId: Id<"projects">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widget?: Doc<"widgets">;
}

export function CreateWidgetDialog({
  dashboardId,
  projectId,
  open,
  onOpenChange,
  widget,
}: CreateWidgetDialogProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dataSources = useQuery(api.dataSources.list, { projectId }) ?? [];
  const createWidget = useMutation(api.widgets.create);
  const updateWidget = useMutation(api.widgets.update);

  const form = useForm<any>({
    mode: "onTouched",
    defaultValues: {
      title: "",
      type: "" as WidgetType,
      dataSourceId: "",
      valuePath: "",
      config: {},
    },
  });

  const selectedType = form.watch("type") as WidgetType;

  // We change the zod schema dynamically based on the selected type
  useEffect(() => {
    if (open) {
      if (widget) {
        form.reset({
          title: widget.title,
          type: widget.type,
          dataSourceId: widget.dataSourceId || "",
          valuePath: widget.valuePath || "",
          config: widget.config || {},
        });
        setStep(2);
      } else {
        form.reset({
          title: "",
          type: "" as WidgetType,
          dataSourceId: "",
          valuePath: "",
          config: {},
        });
        setStep(1);
      }
    } else {
      // Small delay to prevent layout jump while closing before clearing
      setTimeout(() => {
        if (!widget) setStep(1);
      }, 300);
    }
  }, [open, widget, form]);

  const goNext = async () => {
    if (step === 1) {
      if (!selectedType) return;
      setStep(2);
    }
  };

  const goBack = () => {
    if (step > 1 && !widget) setStep(step - 1);
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    const valid = await form.trigger(["title", "dataSourceId", "valuePath"]);
    if (!valid) return;

    // Manual full validation using combined schema
    const configSchema = WIDGET_CONFIG_SCHEMAS[selectedType];
    const fullSchema = widgetBaseSchema.extend({
      config: configSchema,
    });

    const values = form.getValues();
    const result = fullSchema.safeParse(values);

    if (!result.success) {
      // populate errors
      for (const issue of result.error.issues) {
        form.setError(issue.path.join(".") as any, {
          type: "manual",
          message: issue.message,
        });
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: result.data.title,
        type: result.data.type,
        dataSourceId: result.data.dataSourceId
          ? (result.data.dataSourceId as Id<"dataSources">)
          : undefined,
        valuePath: result.data.valuePath || undefined,
        config: result.data.config,
      };

      if (widget) {
        await updateWidget({
          id: widget._id,
          title: payload.title,
          dataSourceId: payload.dataSourceId || null,
          valuePath: payload.valuePath || null,
          config: payload.config,
        });
      } else {
        await createWidget({
          dashboardId,
          ...payload,
        });
      }
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden p-0">
        <div className="px-6 py-4 border-b">
          <DialogTitle>
            {widget ? "Edit Widget" : "Add Widget"}
            {!widget && (
              <span className="text-muted-foreground ml-2 text-sm font-normal">
                Step {step} of 2
              </span>
            )}
          </DialogTitle>
        </div>

        <div className="px-6 py-6 pb-24 max-h-[70vh] overflow-y-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 2) onSubmit();
              else goNext();
            }}
          >
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-medium">Select Widget Type</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {WIDGET_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        if (selectedType !== opt.value) {
                          form.setValue("type", opt.value);
                          form.setValue("config", {});
                        }
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 text-center transition-all ${
                        selectedType === opt.value
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-500"
                          : "border-transparent bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="font-semibold">{opt.label}</span>
                      <span className="text-xs opacity-70 mt-1">
                        {opt.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">General</h3>
                  <FieldGroup className="gap-5">
                    <Controller
                      name="title"
                      control={form.control}
                      rules={{ required: "Title is required" }}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>
                            Widget Title <span className="text-destructive">*</span>
                          </FieldLabel>
                          <Input {...field} placeholder="e.g. Total Revenue" />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="dataSourceId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Data Source (Optional)</FieldLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a data source" />
                            </SelectTrigger>
                            <SelectContent>
                              {dataSources.map((ds) => (
                                <SelectItem key={ds._id} value={ds._id}>
                                  {ds.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">
                            Select a data source to bind data. You can skip this initially.
                          </p>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="valuePath"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Value Path (Optional)</FieldLabel>
                          <Input
                            {...field}
                            placeholder="e.g. data.revenue"
                            value={field.value ?? ""}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Extract a specific field from the data source response.
                          </p>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>

                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wider">Widget Configuration</h3>
                  <FieldGroup className="gap-5">
                    <WidgetConfigFields type={selectedType} form={form} />
                  </FieldGroup>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background/80 backdrop-blur-sm flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={step === 1 || widget ? () => onOpenChange(false) : goBack}
          >
            {step === 1 || widget ? "Cancel" : "Back"}
          </Button>
          <Button
            type="button"
            onClick={step === 2 ? onSubmit : goNext}
            disabled={isSubmitting || (step === 1 && !selectedType)}
          >
            {isSubmitting
              ? "Saving..."
              : step === 2
              ? widget
                ? "Save Changes"
                : "Create Widget"
              : "Next"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
