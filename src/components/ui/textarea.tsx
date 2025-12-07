import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-md-sys-color-outline md-surface-container-highest md-text-on-surface px-4 py-3 md-typescale-body-large font-roboto ring-offset-background placeholder:md-text-on-surface-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-sys-color-primary/40 focus-visible:ring-offset-1 focus-visible:border-md-sys-color-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

