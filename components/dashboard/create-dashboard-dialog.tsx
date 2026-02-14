"use client";

import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
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
}

export function CreateDashboardDialog({
  projectId,
  projectName,
  open,
  onOpenChange,
}: CreateDashboardDialogProps) {
  const createDashboard = useMutation(api.dashboards.create);
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<DashboardFormValues>({
    resolver: zodResolver(dashboardSchema),
    defaultValues: { title: "", description: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (open) form.reset();
  }, [open, form]);

  const handleSubmit = async (values: DashboardFormValues) => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      await createDashboard({
        projectId: projectId as Id<"projects">,
        title: values.title.trim(),
        description: values.description?.trim() || undefined,
      });
      onOpenChange(false);
      form.reset();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Dashboard</DialogTitle>
          <DialogDescription>
            Add a new dashboard to {projectName}.
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
                disabled={!form.formState.isValid || isCreating}
              >
                {isCreating ? "Creating..." : "Create"}
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
