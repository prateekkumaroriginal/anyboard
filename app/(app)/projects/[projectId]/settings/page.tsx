"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation } from "convex/react";
import { useForm } from "@tanstack/react-form";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
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
import {
  projectFormSchema,
  toProjectMutationValues,
} from "@/lib/validation/project";

export default function ProjectSettingsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const router = useRouter();

  const project = useQuery(
    api.projects.get,
    projectId
      ? {
          id: projectId as Id<"projects">,
        }
      : "skip"
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (project === null) {
      router.push("/projects");
    }
  }, [project, router]);

  if (!projectId || project === undefined) {
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

  if (project === null) return null;

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
        <ProjectSettingsForm
          key={`${project._id}-${project.updatedAt}`}
          projectId={projectId}
          project={project}
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

function ProjectSettingsForm({
  projectId,
  project,
}: {
  projectId: string;
  project: Doc<"projects">;
}) {
  const updateProject = useMutation(api.projects.update);
  const form = useForm({
    defaultValues: {
      name: project.name,
      description: project.description ?? "",
      color: project.color ?? COLOR_OPTIONS[0].value,
    },
    validators: {
      onChange: projectFormSchema,
      onSubmit: projectFormSchema,
    },
    onSubmit: async ({ value }) => {
      await updateProject({
        id: projectId as Id<"projects">,
        ...toProjectMutationValues(value),
      });
    },
  });

  return (
    <ProjectFormFields
      form={form}
      cardTitle="Project Settings"
      cardDescription="Update your project name, description, and color."
      submitLabel="Save Changes"
      submittingLabel="Saving..."
    />
  );
}
