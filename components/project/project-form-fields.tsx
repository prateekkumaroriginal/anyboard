import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ColorPicker } from "@/components/shared/color-picker";
import { toFieldErrors } from "@/lib/validation/form-errors";

interface ProjectFieldApi {
  name: string;
  state: {
    value: string;
    meta: {
      isTouched: boolean;
      errors: unknown[];
    };
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
}

interface ProjectFormApi {
  state: {
    submissionAttempts: number;
  };
  handleSubmit: () => Promise<unknown> | void;
  Field: React.ComponentType<{
    name: "name" | "description" | "color";
    children: (field: ProjectFieldApi) => React.ReactNode;
  }>;
  Subscribe: React.ComponentType<{
    selector: (state: {
      canSubmit: boolean;
      isSubmitting: boolean;
      values: {
        name: string;
      };
    }) => [
      boolean,
      boolean,
      string
    ];
    children: (state: [boolean, boolean, string]) => React.ReactNode;
  }>;
}

interface ProjectFormFieldsProps {
  form: unknown;
  cardTitle: string;
  cardDescription: string;
  submitLabel: string;
  submittingLabel: string;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
  autoFocusName?: boolean;
  /** If provided, shows a Cancel button linking to this path */
  cancelHref?: string;
}

export function ProjectFormFields({
  form,
  cardTitle,
  cardDescription,
  submitLabel,
  submittingLabel,
  namePlaceholder = "e.g. Sales Analytics",
  descriptionPlaceholder = "What is this project for?",
  autoFocusName = false,
  cancelHref,
}: ProjectFormFieldsProps) {
  const typedForm = form as ProjectFormApi;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void typedForm.handleSubmit();
          }}
        >
          <typedForm.Field name="name">
            {(field) => {
              const showError =
                field.state.meta.isTouched || typedForm.state.submissionAttempts > 0;
              const errors = showError ? toFieldErrors(field.state.meta.errors) : [];

              return (
                <Field data-invalid={errors.length > 0}>
                  <FieldLabel htmlFor={field.name} required>
                    Name
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder={namePlaceholder}
                      autoFocus={autoFocusName}
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
          </typedForm.Field>

          <typedForm.Field name="description">
            {(field) => {
              const showError =
                field.state.meta.isTouched || typedForm.state.submissionAttempts > 0;
              const errors = showError ? toFieldErrors(field.state.meta.errors) : [];

              return (
                <Field data-invalid={errors.length > 0}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldContent>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      placeholder={descriptionPlaceholder}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      rows={3}
                      aria-invalid={errors.length > 0}
                    />
                    <FieldDescription>
                      Optional context about what this project tracks.
                    </FieldDescription>
                  </FieldContent>
                  <FieldError errors={errors} />
                </Field>
              );
            }}
          </typedForm.Field>

          <typedForm.Field name="color">
            {(field) => {
              const showError =
                field.state.meta.isTouched || typedForm.state.submissionAttempts > 0;
              const errors = showError ? toFieldErrors(field.state.meta.errors) : [];

              return (
                <Field data-invalid={errors.length > 0}>
                  <FieldLabel>Color</FieldLabel>
                  <FieldContent>
                    <ColorPicker
                      value={field.state.value}
                      onChange={field.handleChange}
                      showLabel={false}
                    />
                    <FieldDescription>
                      Used as the accent color for this project.
                    </FieldDescription>
                  </FieldContent>
                  <FieldError errors={errors} />
                </Field>
              );
            }}
          </typedForm.Field>

          <typedForm.Subscribe
            selector={(state) => [
              state.canSubmit,
              state.isSubmitting,
              state.values.name,
            ]}
          >
            {([canSubmit, isSubmitting, nameValue]: [boolean, boolean, string]) => (
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || !nameValue.trim()}
                >
                  {isSubmitting ? submittingLabel : submitLabel}
                </Button>
                {cancelHref && (
                  <Button variant="ghost" asChild>
                    <Link href={cancelHref}>Cancel</Link>
                  </Button>
                )}
              </div>
            )}
          </typedForm.Subscribe>
        </form>
      </CardContent>
    </Card>
  );
}
