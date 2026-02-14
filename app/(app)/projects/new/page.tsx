"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectFormFields } from "@/components/project/project-form-fields";
import { COLOR_OPTIONS } from "@/lib/constants";
import { projectSchema, ProjectFormValues } from "@/lib/schemas";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useMutation(api.projects.create);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: { name: "", description: "", color: COLOR_OPTIONS[0].value },
    mode: "onTouched",
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const projectId = await createProject({
        name: values.name.trim(),
        description: values.description?.trim() || undefined,
        color: values.color,
      });
      router.push(`/projects/${projectId}`);
    } catch {
      setIsSubmitting(false);
    }
  };

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
        onSubmit={handleSubmit}
        cardTitle="Create Project"
        cardDescription="A project groups related dashboards together."
        submitLabel="Create Project"
        submittingLabel="Creating..."
        isSubmitting={isSubmitting}
        autoFocusName
        cancelHref="/projects"
      />
    </div>
  );
}
