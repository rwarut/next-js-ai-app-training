import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[#C026D3] active:bg-[#A21CAF] border-none",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-[#FDF4FF]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-cyan-200 active:bg-cyan-300 border-none",
        ghost: "bg-transparent text-[#525252] hover:bg-[#F5F5F5] border-none",
        destructive: "bg-[#EF4444] text-white hover:bg-[#DC2626] border-none",
        link: "text-primary underline-offset-4 hover:underline border-none bg-transparent",
      },
      size: {
        default: "h-[42px] px-7 py-3 text-[15px]",
        xs: "h-6 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-[34px] px-[18px] py-2.5 text-[13px]",
        lg: "h-[50px] px-9 py-3.5 text-[16px]",
        icon: "size-[42px]",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-[34px]",
        "icon-lg": "size-[50px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
