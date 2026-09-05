import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. */
  variant?: ButtonVariant;
  /** Control scale. */
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  /** Element rendered before the label. */
  leadingIcon?: ReactNode;
  /** Element rendered after the label. */
  trailingIcon?: ReactNode;
}

const base =
  "relative isolate overflow-hidden inline-flex items-center justify-center gap-2 font-script text-lg " +
  "transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "group bg-cta text-cta-foreground border border-cta-border shadow-sm hover:bg-cta-hover active:bg-cta rounded-pill",
  outline:
    "group border border-border-strong text-foreground hover:bg-primary-soft active:bg-cyd-gold-200 rounded-pill",
  ghost: "group text-foreground hover:bg-surface-muted active:bg-border rounded-pill",
  link: "group text-foreground underline decoration-primary underline-offset-4 hover:text-primary-hover rounded-xs",
};

/** Glitter tint per variant: the gold that already belongs to that button. */
const glitterColor: Record<ButtonVariant, string> = {
  primary: "var(--cta-glitter)",
  outline: "var(--primary)",
  ghost: "var(--primary)",
  link: "var(--primary)",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-[0.65rem]",
  md: "h-11 px-6",
  lg: "h-13 px-8 text-sm",
};

const linkSizes: Record<ButtonSize, string> = {
  sm: "p-0 text-[0.65rem]",
  md: "p-0",
  lg: "p-0 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    leadingIcon,
    trailingIcon,
    className,
    children,
    disabled,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], variant === "link" ? linkSizes[size] : sizes[size], className)}
      {...props}
    >
      {!disabled && !loading && <Glitter color={glitterColor[variant]} rounded={variant === "link"} />}
      {loading ? <Spinner /> : leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});

/**
 * Deterministic scatter across the whole button surface:
 * left %, top %, size px, period s, delay s, star?, drift px.
 * Mostly pinpoint specks with a handful of crisp star glints.
 */
const PARTICLES: Array<[number, number, number, number, number, boolean, number]> = [
  // Star glints
  [12, 30, 6, 1.2, 0.0, true, 0],
  [34, 66, 5, 1.4, 0.45, true, 0],
  [58, 26, 6, 1.1, 0.2, true, 0],
  [79, 62, 5, 1.3, 0.6, true, 0],
  [92, 32, 5, 1.5, 0.35, true, 0],
  // Pinpoint specks
  [4, 52, 1.5, 1.1, 0.15, false, 0.6],
  [8, 76, 1, 1.3, 0.5, false, -0.5],
  [17, 14, 1.5, 1.2, 0.3, false, 0.4],
  [21, 46, 1, 1.4, 0.7, false, -0.6],
  [26, 84, 1.5, 1.0, 0.1, false, 0.5],
  [30, 20, 1, 1.3, 0.55, false, -0.4],
  [39, 42, 1.5, 1.2, 0.25, false, 0.6],
  [43, 82, 1, 1.5, 0.65, false, -0.5],
  [48, 16, 1.5, 1.1, 0.4, false, 0.4],
  [52, 54, 1, 1.3, 0.05, false, -0.6],
  [62, 78, 1.5, 1.2, 0.5, false, 0.5],
  [66, 38, 1, 1.4, 0.2, false, -0.4],
  [71, 12, 1.5, 1.1, 0.6, false, 0.6],
  [75, 48, 1, 1.3, 0.3, false, -0.5],
  [84, 80, 1.5, 1.2, 0.1, false, 0.4],
  [88, 50, 1, 1.5, 0.45, false, -0.6],
  [96, 70, 1.5, 1.1, 0.25, false, 0.5],
  [55, 88, 1, 1.4, 0.58, false, -0.4],
];

function Glitter({ color, rounded }: { color: string; rounded?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-150",
        "group-hover:opacity-100 group-focus-visible:opacity-100",
        rounded ? "rounded-xs" : "rounded-pill",
      )}
      style={{ ["--cyd-glitter-color" as string]: color }}
    >
      {PARTICLES.map(([left, top, dot, period, delay, star, drift], i) => (
        <span
          key={i}
          className={cn("cyd-glitter-particle", star && "cyd-glitter-star")}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            ["--cyd-dot" as string]: `${dot}px`,
            ["--cyd-shimmer" as string]: `${period}s`,
            ["--cyd-delay" as string]: `${delay}s`,
            ["--cyd-drift" as string]: `${drift}px`,
          }}
        />
      ))}
    </span>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-3.5 animate-spin rounded-pill border-2 border-current border-t-transparent"
    />
  );
}
