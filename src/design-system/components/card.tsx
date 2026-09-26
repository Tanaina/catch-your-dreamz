import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type CardVariant = "elevated" | "outline" | "ghost";
export type CardTexture = "none" | "subtle" | "veined" | "warm";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Marble surface texture, rendered at native tile scale behind the content. */
  texture?: CardTexture;
}

const cardVariants: Record<CardVariant, string> = {
  elevated: "bg-surface border border-border shadow-md",
  outline: "bg-surface border border-border-strong",
  ghost: "bg-surface-muted border border-transparent",
};

const cardTextures: Record<CardTexture, string | null> = {
  none: null,
  subtle: "cyd-marble-surface",
  veined: "cyd-marble-surface cyd-marble-surface-veined",
  warm: "cyd-marble-surface cyd-marble-surface-warm",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "elevated", texture = "none", className, children, ...props },
  ref,
) {
  const textureClass = cardTextures[texture];

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg p-6",
        cardVariants[variant],
        textureClass && "relative overflow-hidden",
        className,
      )}
      {...props}
    >
      {textureClass ? (
        <>
          <span aria-hidden className={textureClass} />
          <div className="relative z-10">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
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
