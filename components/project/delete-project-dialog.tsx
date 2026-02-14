"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
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
  createDeleteProjectSchema,
  DeleteProjectFormValues,
} from "@/lib/validation/project";

interface DeleteProjectDialogProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({
  projectId,
  projectName,
  open,
  onOpenChange,
}: DeleteProjectDialogProps) {
  const router = useRouter();
  const removeProject = useMutation(api.projects.remove);
  const deleteProjectSchema = useMemo(
    () => createDeleteProjectSchema(projectName),
    [projectName]
  );

  function handleOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      form.reset();
    }
  }

  const form = useForm({
    defaultValues: {
      projectName: "",
    } as DeleteProjectFormValues,
    validators: {
      onChange: deleteProjectSchema,
      onSubmit: deleteProjectSchema,
    },
    onSubmit: async () => {
      await removeProject({ id: projectId as Id<"projects"> });
      handleOpenChange(false);
      router.push("/projects");
    },
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{projectName}</strong> and all
            its dashboards. Type the project name to confirm.
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
          <form.Field name="projectName">
            {(field) => {
              const showError =
                field.state.meta.isTouched || form.state.submissionAttempts > 0;
              const errors = showError ? toFieldErrors(field.state.meta.errors) : [];

              return (
                <Field data-invalid={errors.length > 0}>
                  <FieldLabel htmlFor={field.name} required>
                    Confirm project name
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder={projectName}
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

          <form.Subscribe>
            {(state) => (
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={
                    !state.canSubmit ||
                    state.isSubmitting ||
                    state.values.projectName !== projectName
                  }
                >
                  {state.isSubmitting ? "Deleting..." : "Delete Project"}
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
