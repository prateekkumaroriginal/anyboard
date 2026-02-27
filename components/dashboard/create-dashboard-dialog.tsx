"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { dashboardSchema, DashboardFormValues } from "@/lib/schemas";

interface CreateDashboardDialogProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dashboard?: Doc<"dashboards"> | null;
}

export function CreateDashboardDialog({
  projectId,
  projectName,
  open,
  onOpenChange,
  dashboard,
}: CreateDashboardDialogProps) {
  const createDashboard = useMutation(api.dashboards.create);
  const updateDashboard = useMutation(api.dashboards.update);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(dashboard);

  const form = useForm<DashboardFormValues>({
    resolver: zodResolver(dashboardSchema),
    defaultValues: { title: "", description: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (!open) return;
    form.reset({
      title: dashboard?.title ?? "",
      description: dashboard?.description ?? "",
    });
  }, [open, dashboard, form]);

  const handleSubmit = async (values: DashboardFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (dashboard) {
        await updateDashboard({
          id: dashboard._id,
          title: values.title.trim(),
          description: values.description?.trim() || undefined,
        });
      } else {
        await createDashboard({
          projectId: projectId as Id<"projects">,
          title: values.title.trim(),
          description: values.description?.trim() || undefined,
        });
      }
      onOpenChange(false);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent closeOnOutside={false}>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Dashboard" : "Create Dashboard"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? `Update dashboard details in ${projectName}.`
              : `Add a new dashboard to ${projectName}.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="dashboard-title">
                    Title <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="dashboard-title"
                    placeholder="e.g. Monthly Revenue"
                    autoFocus
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="dashboard-desc">Description</FieldLabel>
                  <Input
                    {...field}
                    id="dashboard-desc"
                    placeholder="Optional description"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={!form.formState.isValid || isSubmitting}
              >
                {isSubmitting
                  ? isEditMode
                    ? "Saving..."
                    : "Creating..."
                  : isEditMode
                    ? "Save Changes"
                    : "Create"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
