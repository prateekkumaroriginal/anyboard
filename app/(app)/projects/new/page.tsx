"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectFormFields } from "@/components/project/project-form-fields";
import { COLOR_OPTIONS } from "@/lib/constants";

export default function NewProjectPage() {
  const router = useRouter();
  const createProject = useMutation(api.projects.create);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(COLOR_OPTIONS[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const projectId = await createProject({
        name: name.trim(),
        description: description.trim() || undefined,
        color,
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
        name={name}
        onNameChange={setName}
        description={description}
        onDescriptionChange={setDescription}
        color={color}
        onColorChange={setColor}
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
