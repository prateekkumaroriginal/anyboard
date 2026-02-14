"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DeleteProjectDialogProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({
  projectId,
  projectName,
  open,
  onOpenChange,
}: DeleteProjectDialogProps) {
  const router = useRouter();
  const removeProject = useMutation(api.projects.remove);

  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleteConfirm !== projectName || isDeleting) return;

    setIsDeleting(true);
    try {
      await removeProject({ id: projectId as Id<"projects"> });
      router.push("/projects");
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            This will permanently delete <strong>{projectName}</strong> and all
            its dashboards. Type the project name to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder={projectName}
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
          />
          <div className="flex gap-3">
            <Button
              variant="destructive"
              disabled={deleteConfirm !== projectName || isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : "Delete Project"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onOpenChange(false);
                setDeleteConfirm("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
