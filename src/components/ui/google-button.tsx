import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const googleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        "google-blue": "bg-google-blue text-white shadow-sm hover:bg-google-blue-dark hover:shadow-md active:scale-95",
        "google-green": "bg-google-green text-white shadow-sm hover:bg-google-green/90 hover:shadow-md active:scale-95",
        "google-yellow": "bg-google-yellow text-google-yellow-foreground shadow-sm hover:bg-google-yellow/90 hover:shadow-md active:scale-95",
        "google-red": "bg-google-red text-white shadow-sm hover:bg-google-red/90 hover:shadow-md active:scale-95",
        "google-outline": "border border-border bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md",
        "google-ghost": "hover:bg-accent hover:text-accent-foreground",
        "google-floating": "bg-surface shadow-lg hover:shadow-xl border border-border/50 hover:bg-accent active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "google-blue",
      size: "default",
    },
  }
)

export interface GoogleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof googleButtonVariants> {
  asChild?: boolean
}

const GoogleButton = React.forwardRef<HTMLButtonElement, GoogleButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(googleButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GoogleButton.displayName = "GoogleButton"

export { GoogleButton, googleButtonVariants }