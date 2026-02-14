"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectFormFields } from "@/components/project/project-form-fields";
import { DeleteProjectDialog } from "@/components/project/delete-project-dialog";
import { COLOR_OPTIONS } from "@/lib/constants";

export default function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const router = useRouter();

  const project = useQuery(api.projects.get, {
    id: projectId as Id<"projects">,
  });
  const updateProject = useMutation(api.projects.update);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize form when project data arrives
  if (project && !initialized) {
    setName(project.name);
    setDescription(project.description ?? "");
    setColor(project.color ?? COLOR_OPTIONS[0].value);
    setInitialized(true);
  }

  if (project === undefined) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="space-y-6">
          <Skeleton className="h-4 w-32" />
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (project === null) {
    router.push("/projects");
    return null;
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSaving) return;

    setIsSaving(true);
    try {
      await updateProject({
        id: projectId as Id<"projects">,
        name: name.trim(),
        description: description.trim() || undefined,
        color,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href={`/projects/${projectId}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Project
      </Link>

      <div className="space-y-8">
        {/* General Settings */}
        <ProjectFormFields
          name={name}
          onNameChange={setName}
          description={description}
          onDescriptionChange={setDescription}
          color={color}
          onColorChange={setColor}
          onSubmit={handleSave}
          cardTitle="Project Settings"
          cardDescription="Update your project name, description, and color."
          submitLabel="Save Changes"
          submittingLabel="Saving..."
          isSubmitting={isSaving}
        />

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Deleting a project will permanently remove all its dashboards,
              data sources, and widgets. This action cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Project
            </Button>
          </CardContent>
        </Card>
      </div>

      <DeleteProjectDialog
        projectId={projectId}
        projectName={project.name}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </div>
  );
}
