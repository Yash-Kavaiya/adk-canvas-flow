import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold font-roboto transition-colors focus:outline-none focus:ring-2 focus:ring-md-sys-color-primary/40 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-md-sys-color-primary text-md-sys-color-on-primary hover:bg-md-sys-color-primary/90",
        secondary:
          "border-transparent bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container hover:bg-md-sys-color-secondary-container/80",
        destructive:
          "border-transparent bg-md-sys-color-error text-md-sys-color-on-error hover:bg-md-sys-color-error/90",
        outline: "text-md-sys-color-on-surface border-md-sys-color-outline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)


export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
