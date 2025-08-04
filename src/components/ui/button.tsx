import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold-primary relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-brand-gold-primary to-brand-rose-primary text-white shadow-luxury hover:shadow-luxury-strong hover:scale-105 hover:-translate-y-1 btn-shine",
        destructive:
          "bg-error-luxury text-white shadow-xs hover:bg-error-luxury/90 focus-visible:ring-error-luxury/20",
        outline:
          "border-2 border-brand-gold-primary bg-transparent text-brand-gold-primary shadow-xs hover:bg-brand-gold-primary hover:text-white hover:scale-105 hover:-translate-y-1",
        secondary:
          "bg-brand-champagne text-brand-charcoal shadow-xs hover:bg-brand-gold-light hover:scale-105 hover:-translate-y-1",
        ghost:
          "text-brand-gold-primary hover:bg-brand-champagne hover:text-brand-gold-dark hover:scale-105",
        link: 
          "text-brand-gold-primary underline-offset-4 hover:underline gradient-underline",
        luxury:
          "bg-gradient-to-r from-brand-gold-primary via-brand-rose-primary to-brand-gold-primary bg-size-200 text-white shadow-luxury-medium hover:shadow-luxury-glow hover:bg-pos-100 hover:scale-110 hover:-translate-y-2 btn-shine pulse-luxury",
        premium:
          "bg-brand-charcoal text-brand-gold-primary border border-brand-gold-primary shadow-luxury hover:bg-brand-gold-primary hover:text-brand-charcoal hover:shadow-luxury-glow hover:scale-105 hover:-translate-y-1 shimmer-overlay"
      },
      size: {
        default: "h-10 px-6 py-2 text-sm has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-4 text-xs has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 text-base has-[>svg]:px-6",
        xl: "h-14 rounded-xl px-10 text-lg has-[>svg]:px-8",
        icon: "size-10 rounded-md",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12 rounded-lg"
      },
      loading: {
        true: "cursor-not-allowed",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false
    },
  }
)

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

function Button({
  className,
  variant,
  size,
  loading = false,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, loading, className }))}
      disabled={disabled || loading}
      aria-label={loading ? "Loading..." : props["aria-label"]}
      {...props}
    >
      {/* Shine effect overlay */}
      {(variant === "default" || variant === "luxury") && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
      )}
      
      {/* Loading spinner */}
      {loading && (
        <svg 
          className="animate-spin h-4 w-4 mr-2" 
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="mr-1">{leftIcon}</span>
      )}
      
      {/* Button content */}
      {children}
      
      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="ml-1">{rightIcon}</span>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
