import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  description: z.string().max(500),
  color: z.string().min(1),
});
export type ProjectFormValues = z.infer<typeof projectSchema>;

export const dashboardSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500),
});
export type DashboardFormValues = z.infer<typeof dashboardSchema>;

export const deleteProjectSchema = (projectName: string) =>
  z.object({
    confirmName: z.string().refine((val) => val === projectName, {
      message: "Project name does not match",
    }),
  });
export type DeleteProjectFormValues = { confirmName: string };
