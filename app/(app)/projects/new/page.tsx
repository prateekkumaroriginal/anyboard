"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useForm } from "@tanstack/react-form";
import { api } from "@/convex/_generated/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectFormFields } from "@/components/project/project-form-fields";
import { COLOR_OPTIONS } from "@/lib/constants";
import {
  projectFormSchema,
  toProjectMutationValues,
} from "@/lib/validation/project";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useMutation(api.projects.create);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      color: COLOR_OPTIONS[0].value,
    },
    validators: {
      onChange: projectFormSchema,
      onSubmit: projectFormSchema,
    },
    onSubmit: async ({ value }) => {
      const projectId = await createProject(toProjectMutationValues(value));
      router.push(`/projects/${projectId}`);
    },
  });

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <ProjectFormFields
        form={form}
        cardTitle="Create Project"
        cardDescription="A project groups related dashboards together."
        submitLabel="Create Project"
        submittingLabel="Creating..."
        autoFocusName
        cancelHref="/projects"
      />
    </div>
  );
}
