import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label className={cn("text-xs text-amber-400/60 font-medium", className)} {...props}>
      {children}
      {required && <span className="text-destructive"> *</span>}
    </label>
  );
}
