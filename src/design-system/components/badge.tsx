import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type BadgeTone = "gold" | "neutral" | "success" | "warning" | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Solid fill instead of the soft tint. */
  solid?: boolean;
}

const soft: Record<BadgeTone, string> = {
  gold: "bg-primary-soft text-cyd-gold-700 border-cyd-gold-200",
  neutral: "bg-surface-muted text-foreground-muted border-border",
  success: "bg-success/10 text-success border-success/30",
  warning: "bg-warning/10 text-warning border-warning/30",
  danger: "bg-danger/10 text-danger border-danger/30",
};

const solidTone: Record<BadgeTone, string> = {
  gold: "bg-primary text-foreground-onbrand border-transparent",
  neutral: "bg-cyd-ink-900 text-cyd-ink-50 border-transparent",
  success: "bg-success text-white border-transparent",
  warning: "bg-warning text-white border-transparent",
  danger: "bg-danger text-white border-transparent",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { tone = "gold", solid = false, className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-pill border px-3 py-1 font-sans text-[0.6rem] cyd-tracked",
        solid ? solidTone[tone] : soft[tone],
        className,
      )}
      {...props}
    />
  );
});
