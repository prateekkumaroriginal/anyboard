import Link from "next/link";
import { Controller, UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ColorPicker } from "@/components/shared/color-picker";
import { ProjectFormValues } from "@/lib/schemas";

interface ProjectFormFieldsProps {
  form: UseFormReturn<ProjectFormValues>;
  onSubmit: (values: ProjectFormValues) => void;
  cardTitle: string;
  cardDescription: string;
  submitLabel: string;
  submittingLabel: string;
  isSubmitting: boolean;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
  autoFocusName?: boolean;
  /** If provided, shows a Cancel button linking to this path */
  cancelHref?: string;
}

export function ProjectFormFields({
  form,
  onSubmit,
  cardTitle,
  cardDescription,
  submitLabel,
  submittingLabel,
  isSubmitting,
  namePlaceholder = "e.g. Sales Analytics",
  descriptionPlaceholder = "What is this project for?",
  autoFocusName = false,
  cancelHref,
}: ProjectFormFieldsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="project-name">
                    Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="project-name"
                    placeholder={namePlaceholder}
                    autoFocus={autoFocusName}
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
                  <FieldLabel htmlFor="project-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="project-description"
                    placeholder={descriptionPlaceholder}
                    rows={3}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="color"
              control={form.control}
              render={({ field }) => (
                <ColorPicker value={field.value} onChange={field.onChange} />
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={!form.formState.isValid || isSubmitting}
              >
                {isSubmitting ? submittingLabel : submitLabel}
              </Button>
              {cancelHref && (
                <Button variant="ghost" asChild>
                  <Link href={cancelHref}>Cancel</Link>
                </Button>
              )}
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
