import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type CardVariant = "elevated" | "outline" | "ghost";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const cardVariants: Record<CardVariant, string> = {
  elevated: "bg-surface border border-border shadow-md",
  outline: "bg-surface border border-border-strong",
  ghost: "bg-surface-muted border border-transparent",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "elevated", className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn("rounded-lg p-6", cardVariants[variant], className)} {...props} />
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1 pb-4", className)} {...props} />;
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn("font-display text-2xl font-medium text-foreground", className)}
        {...props}
      />
    );
  },
);

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <p ref={ref} className={cn("font-sans text-sm text-foreground-muted", className)} {...props} />
    );
  },
);

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("font-sans text-sm text-foreground", className)} {...props} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex items-center gap-3 pt-5", className)} {...props} />;
  },
);
