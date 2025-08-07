import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useRipple } from "@/lib/ripple-effect"

const fabVariants = cva(
  "inline-flex items-center justify-center font-roboto font-medium ring-offset-background transition-all duration-md-medium2 ease-md-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-sys-color-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-38 relative overflow-hidden rounded-full shadow-md-3 hover:shadow-md-4 focus-visible:shadow-md-4 active:shadow-md-3 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Material Design 3 FAB variants
        primary: "bg-md-sys-color-primary-container text-md-sys-color-on-primary-container",
        secondary: "bg-md-sys-color-secondary-container text-md-sys-color-on-secondary-container",
        tertiary: "bg-md-sys-color-tertiary-container text-md-sys-color-on-tertiary-container",
        surface: "bg-md-sys-color-surface-container-high text-md-sys-color-primary",
      },
      size: {
        // Material Design 3 FAB sizes
        small: "h-10 w-10 [&_svg]:size-4",
        medium: "h-14 w-14 [&_svg]:size-6",
        large: "h-24 w-24 [&_svg]:size-8",
        extended: "h-14 px-4 gap-2 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
)

export interface FabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  disableRipple?: boolean
}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, size, disableRipple = false, onClick, children, ...props }, ref) => {
    const ripple = useRipple({
      color: 'rgb(var(--md-sys-color-on-primary-container))',
      opacity: 0.2,
      duration: 600
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disableRipple) {
        ripple(event);
      }
      onClick?.(event);
    };

    return (
      <button
        className={cn(fabVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Fab.displayName = "Fab"

export { Fab, fabVariants }