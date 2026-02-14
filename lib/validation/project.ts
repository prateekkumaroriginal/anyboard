import { z } from "zod";
import { COLOR_OPTIONS } from "@/lib/constants";

export const PROJECT_NAME_MAX_LENGTH = 80;
export const PROJECT_DESCRIPTION_MAX_LENGTH = 280;

const PROJECT_COLOR_VALUES = COLOR_OPTIONS.map((option) => option.value) as [
  string,
  ...string[]
];

export const projectFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required")
    .max(
      PROJECT_NAME_MAX_LENGTH,
      `Project name must be ${PROJECT_NAME_MAX_LENGTH} characters or fewer`
    ),
  description: z
    .string()
    .trim()
    .max(
      PROJECT_DESCRIPTION_MAX_LENGTH,
      `Description must be ${PROJECT_DESCRIPTION_MAX_LENGTH} characters or fewer`
    ),
  color: z.enum(PROJECT_COLOR_VALUES, {
    error: "Select a valid project color",
  }),
});

export type ProjectFormValues = z.input<typeof projectFormSchema>;

export function toProjectMutationValues(values: ProjectFormValues) {
  const parsed = projectFormSchema.parse(values);

  return {
    name: parsed.name,
    description: parsed.description || undefined,
    color: parsed.color,
  };
}

export interface DeleteProjectFormValues {
  projectName: string;
}

export function createDeleteProjectSchema(projectName: string) {
  return z.object({
    projectName: z.string().refine((value) => value === projectName, {
      message: `Type "${projectName}" to confirm`,
    }),
  });
}
