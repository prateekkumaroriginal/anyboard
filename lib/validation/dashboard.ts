import { z } from "zod";

export const DASHBOARD_TITLE_MAX_LENGTH = 80;
export const DASHBOARD_DESCRIPTION_MAX_LENGTH = 280;

export const dashboardFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Dashboard title is required")
    .max(
      DASHBOARD_TITLE_MAX_LENGTH,
      `Dashboard title must be ${DASHBOARD_TITLE_MAX_LENGTH} characters or fewer`
    ),
  description: z
    .string()
    .trim()
    .max(
      DASHBOARD_DESCRIPTION_MAX_LENGTH,
      `Description must be ${DASHBOARD_DESCRIPTION_MAX_LENGTH} characters or fewer`
    ),
});

export type DashboardFormValues = z.input<typeof dashboardFormSchema>;

export function toDashboardMutationValues(values: DashboardFormValues) {
  const parsed = dashboardFormSchema.parse(values);

  return {
    title: parsed.title,
    description: parsed.description || undefined,
  };
}
