import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useRipple } from "@/lib/ripple-effect"

const googleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-roboto font-medium ring-offset-background transition-all duration-md-medium2 ease-md-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-sys-color-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-38 relative overflow-hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        "google-blue": "bg-md-sys-color-primary text-md-sys-color-on-primary shadow-elevation-1 hover:shadow-elevation-2 focus-visible:shadow-elevation-2 active:shadow-elevation-0 rounded-full",
        "google-green": "bg-md-sys-color-tertiary text-md-sys-color-on-tertiary shadow-elevation-1 hover:shadow-elevation-2 focus-visible:shadow-elevation-2 active:shadow-elevation-0 rounded-full",
        "google-yellow": "bg-md-sys-color-warning text-md-sys-color-on-warning shadow-elevation-1 hover:shadow-elevation-2 focus-visible:shadow-elevation-2 active:shadow-elevation-0 rounded-full",
        "google-red": "bg-md-sys-color-error text-md-sys-color-on-error shadow-elevation-1 hover:shadow-elevation-2 focus-visible:shadow-elevation-2 active:shadow-elevation-0 rounded-full",
        "google-outline": "border border-md-sys-color-outline bg-transparent text-md-sys-color-primary hover:bg-md-sys-color-primary/8 focus-visible:bg-md-sys-color-primary/12 active:bg-md-sys-color-primary/12 rounded-full",
        "google-ghost": "bg-transparent text-md-sys-color-on-surface hover:bg-md-sys-color-on-surface/8 focus-visible:bg-md-sys-color-on-surface/12 active:bg-md-sys-color-on-surface/12 rounded-full",
        "google-floating": "bg-md-sys-color-surface-container-high text-md-sys-color-on-surface shadow-elevation-3 hover:shadow-elevation-4 focus-visible:shadow-elevation-4 active:shadow-elevation-3 border-0 rounded-xl",
      },
      size: {
        default: "h-10 px-6 text-sm md-typescale-label-large",
        sm: "h-8 px-3 text-xs md-typescale-label-medium",
        lg: "h-12 px-8 text-base md-typescale-label-large",
        icon: "h-10 w-10 p-0",
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
  disableRipple?: boolean
}

const GoogleButton = React.forwardRef<HTMLButtonElement, GoogleButtonProps>(
  ({ className, variant, size, asChild = false, disableRipple = false, onClick, ...props }, ref) => {
    const ripple = useRipple({
      color: variant === 'google-outline' || variant === 'google-ghost'
        ? 'rgb(var(--md-sys-color-primary))'
        : variant === 'google-green'
          ? 'rgb(var(--md-sys-color-on-tertiary))'
          : variant === 'google-red'
            ? 'rgb(var(--md-sys-color-on-error))'
            : variant === 'google-yellow'
              ? 'rgb(var(--md-sys-color-on-warning))'
              : 'rgb(var(--md-sys-color-on-primary))',
      opacity: 0.2,
      duration: 600
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        ripple(event);
      }
      onClick?.(event);
    };

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(googleButtonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
GoogleButton.displayName = "GoogleButton"

export { GoogleButton, googleButtonVariants }