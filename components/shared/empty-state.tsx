import { type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Icon className="h-16 w-16 text-muted-foreground/30 mb-4" />
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <p className="text-muted-foreground text-sm mb-6 max-w-sm">
        {description}
      </p>
      {action}
    </div>
  );
}
