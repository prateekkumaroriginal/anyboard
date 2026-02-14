"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription as FieldHint,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toFieldErrors } from "@/lib/validation/form-errors";
import {
  dashboardFormSchema,
  toDashboardMutationValues,
} from "@/lib/validation/dashboard";

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
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onChange: dashboardFormSchema,
      onSubmit: dashboardFormSchema,
    },
    onSubmit: async ({ value }) => {
      await createDashboard({
        projectId: projectId as Id<"projects">,
        ...toDashboardMutationValues(value),
      });
      handleOpenChange(false);
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Dashboard</DialogTitle>
          <DialogDescription>
            Add a new dashboard to {projectName}.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field name="title">
            {(field) => {
              const showError =
                field.state.meta.isTouched || form.state.submissionAttempts > 0;
              const errors = showError ? toFieldErrors(field.state.meta.errors) : [];

              return (
                <Field data-invalid={errors.length > 0}>
                  <FieldLabel htmlFor={field.name} required>
                    Title
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="e.g. Monthly Revenue"
                      autoFocus
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={errors.length > 0}
                    />
                  </FieldContent>
                  <FieldError errors={errors} />
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="description">
            {(field) => {
              const showError =
                field.state.meta.isTouched || form.state.submissionAttempts > 0;
              const errors = showError ? toFieldErrors(field.state.meta.errors) : [];

              return (
                <Field data-invalid={errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Optional description"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={errors.length > 0}
                    />
                    <FieldHint>Optional context for this dashboard.</FieldHint>
                  </FieldContent>
                  <FieldError errors={errors} />
                </Field>
              );
            }}
          </form.Field>

          <form.Subscribe>
            {(state) => (
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={
                    !state.canSubmit ||
                    state.isSubmitting ||
                    !state.values.title.trim()
                  }
                >
                  {state.isSubmitting ? "Creating..." : "Create"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleOpenChange(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
}
