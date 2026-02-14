import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-amber-400/15 bg-white/3 placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border px-4 py-2.5 text-sm shadow-sm transition-all duration-300 outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
