import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ColorPicker } from "@/components/shared/color-picker";
import { Label } from "@/components/shared/label";

interface ProjectFormFieldsProps {
  name: string;
  onNameChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  color: string;
  onColorChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  cardTitle: string;
  cardDescription: string;
  submitLabel: string;
  submittingLabel: string;
  isSubmitting: boolean;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
  autoFocusName?: boolean;
  /** If provided, shows a Cancel button linking to this path */
  cancelHref?: string;
}

export function ProjectFormFields({
  name,
  onNameChange,
  description,
  onDescriptionChange,
  color,
  onColorChange,
  onSubmit,
  cardTitle,
  cardDescription,
  submitLabel,
  submittingLabel,
  isSubmitting,
  namePlaceholder = "e.g. Sales Analytics",
  descriptionPlaceholder = "What is this project for?",
  autoFocusName = false,
  cancelHref,
}: ProjectFormFieldsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" required>
              Name
            </Label>
            <Input
              id="name"
              placeholder={namePlaceholder}
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              autoFocus={autoFocusName}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder={descriptionPlaceholder}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              rows={3}
            />
          </div>

          <ColorPicker value={color} onChange={onColorChange} />

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={!name.trim() || isSubmitting}>
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
            {cancelHref && (
              <Button variant="ghost" asChild>
                <Link href={cancelHref}>Cancel</Link>
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
