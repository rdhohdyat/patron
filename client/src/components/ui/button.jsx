import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center  justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "relative bg-gradient-to-b from-emerald-400 to-emerald-500 text-white active:scale-95 transition-all ease-in-out hover:from-emerald-500 hover:to-emerald-600 hover:shadow-md dark:from-slate-300 dark:to-slate-400 dark:text-slate-50 dark:hover:from-slate-400 dark:hover:to-slate-500 dark:hover:shadow-md",
        destructive:
          "relative bg-gradient-to-b from-red-400 to-red-500 text-white active:scale-95 transition-all ease-in-out hover:from-red-500 hover:to-red-600 hover:shadow-md dark:from-red-600 dark:to-red-700 dark:text-white dark:hover:from-red-700 dark:hover:to-red-800 dark:hover:shadow-md",
        outline:
          "border border-slate-200 active:scale-95 transition-all ease-in-out bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 active:scale-95 transition-all ease-in-out hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all ease-in-out dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50 active:scale-95 transition-all ease-in-out",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
