import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-md-sys-color-outline md-surface-container-highest md-text-on-surface px-4 py-3 md-typescale-body-large font-roboto ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:md-text-on-surface placeholder:md-text-on-surface-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-sys-color-primary/40 focus-visible:ring-offset-1 focus-visible:border-md-sys-color-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
