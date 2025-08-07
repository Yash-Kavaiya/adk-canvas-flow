import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useRipple } from "@/lib/ripple-effect"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-roboto font-medium ring-offset-background transition-all duration-md-medium2 ease-md-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-sys-color-primary/40 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-38 relative overflow-hidden [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Material Design 3 Filled Button (Primary) - Google Style
        filled: "md-surface-primary md-text-on-primary hover:md-elevation-1 focus-visible:md-elevation-1 active:md-elevation-0 rounded-full md-elevation-0",
        // Material Design 3 Filled Tonal Button - Google Style  
        "filled-tonal": "md-bg-secondary-container md-text-on-secondary-container hover:md-elevation-1 focus-visible:md-elevation-1 active:md-elevation-0 rounded-full md-elevation-0",
        // Material Design 3 Outlined Button - Google Style
        outlined: "border border-md-sys-color-outline bg-transparent md-text-primary hover:bg-md-primary-90/50 focus-visible:bg-md-primary-90/70 active:bg-md-primary-90/80 rounded-full",
        // Material Design 3 Text Button - Google Style
        text: "bg-transparent md-text-primary hover:bg-md-primary-90/30 focus-visible:bg-md-primary-90/50 active:bg-md-primary-90/60 rounded-full",
        // Error variant - Google Style
        error: "md-surface-error md-text-on-error hover:md-elevation-1 focus-visible:md-elevation-1 active:md-elevation-0 rounded-full md-elevation-0",
        // Legacy variants for compatibility
        default: "md-surface-primary md-text-on-primary hover:md-elevation-1 focus-visible:md-elevation-1 active:md-elevation-0 rounded-full md-elevation-0",
        destructive: "md-surface-error md-text-on-error hover:md-elevation-1 focus-visible:md-elevation-1 active:md-elevation-0 rounded-full md-elevation-0",
        secondary: "md-bg-secondary-container md-text-on-secondary-container hover:md-elevation-1 focus-visible:md-elevation-1 active:md-elevation-0 rounded-full md-elevation-0",
        ghost: "bg-transparent md-text-primary hover:bg-md-primary-90/30 focus-visible:bg-md-primary-90/50 active:bg-md-primary-90/60 rounded-full",
        link: "bg-transparent md-text-primary underline-offset-4 hover:underline rounded-full",
      },
      size: {
        // Material Design 3 Button Sizes
        small: "h-8 px-3 text-xs md-typescale-label-medium",
        medium: "h-10 px-6 text-sm md-typescale-label-large",
        large: "h-12 px-8 text-base md-typescale-label-large",
        // Legacy sizes for compatibility
        default: "h-10 px-6 text-sm md-typescale-label-large",
        sm: "h-8 px-3 text-xs md-typescale-label-medium",
        lg: "h-12 px-8 text-base md-typescale-label-large",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "medium",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  disableRipple?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disableRipple = false, onClick, ...props }, ref) => {
    const ripple = useRipple({
      color: variant === 'outlined' || variant === 'text' || variant === 'ghost' 
        ? 'rgb(var(--md-sys-color-primary))' 
        : 'currentColor',
      opacity: 0.16,
      duration: 400
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
