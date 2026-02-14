"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  deleteProjectSchema,
  DeleteProjectFormValues,
} from "@/lib/schemas";

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
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<DeleteProjectFormValues>({
    resolver: zodResolver(deleteProjectSchema(projectName)),
    defaultValues: { confirmName: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (open) form.reset();
  }, [open, form]);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await removeProject({ id: projectId as Id<"projects"> });
      router.push("/projects");
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{projectName}</strong> and all
            its dashboards. Type the project name to confirm.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleDelete)}>
          <FieldGroup>
            <Controller
              name="confirmName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    placeholder={projectName}
                    autoComplete="off"
                  />
                  {fieldState.invalid && field.value.length > 0 && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                variant="destructive"
                disabled={!form.formState.isValid || isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Project"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  onOpenChange(false);
                  form.reset();
                }}
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
