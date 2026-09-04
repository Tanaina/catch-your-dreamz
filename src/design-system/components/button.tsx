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
  "relative isolate overflow-hidden inline-flex items-center justify-center gap-2 font-sans font-medium cyd-tracked text-xs " +
  "transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "group bg-cta text-cta-foreground border border-cta-border shadow-sm hover:bg-cta-hover active:bg-cta rounded-pill",
  outline:
    "border border-border-strong text-foreground hover:bg-primary-soft active:bg-cyd-gold-200 rounded-pill",
  ghost: "text-foreground hover:bg-surface-muted active:bg-border rounded-pill",
  link: "text-foreground underline decoration-primary underline-offset-4 hover:text-primary-hover rounded-xs",
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
      className={cn(
        base,
        variants[variant],
        variant === "link" ? linkSizes[size] : sizes[size],
        className,
      )}
      {...props}
    >
      {variant === "primary" && <Glitter />}
      {loading ? <Spinner /> : leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});

/** Deterministic scatter across the whole button: left %, delay s, duration s, size px, drift px. */
const PARTICLES: Array<[number, number, number, number, number]> = [
  [2, 0.0, 1.5, 2, 4], [7, 0.62, 1.9, 1.5, -3], [12, 0.24, 1.25, 2.5, 5],
  [17, 0.9, 1.7, 1.5, -4], [22, 0.14, 2.0, 2, 3], [27, 0.5, 1.35, 1.5, -5],
  [32, 0.78, 1.8, 2.5, 4], [37, 0.06, 1.55, 1.5, -2], [42, 0.42, 1.95, 2, 5],
  [47, 0.86, 1.3, 1.5, -3], [52, 0.2, 1.75, 2.5, 4], [57, 0.66, 1.5, 1.5, -5],
  [62, 0.34, 2.0, 2, 2], [67, 0.98, 1.4, 1.5, -4], [72, 0.1, 1.85, 2.5, 5],
  [77, 0.56, 1.6, 1.5, -3], [82, 0.3, 1.3, 2, 4], [87, 0.74, 1.9, 1.5, -2],
  [92, 0.18, 1.65, 2.5, 3], [97, 0.46, 1.45, 1.5, -4],
  [5, 1.1, 1.7, 1.5, 3], [20, 1.25, 1.5, 2, -3], [35, 1.05, 1.9, 1.5, 4],
  [50, 1.3, 1.6, 2.5, -2], [65, 1.15, 1.4, 1.5, 3], [80, 1.35, 1.8, 2, -4],
  [95, 1.2, 1.55, 1.5, 2],
];

function Glitter() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-pill opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {PARTICLES.map(([left, delay, duration, dot, drift], i) => (
        <span
          key={i}
          className="cyd-glitter-particle"
          style={{
            left: `${left}%`,
            width: `${dot}px`,
            height: `${dot}px`,
            ["--cyd-drift" as string]: `${drift}px`,
            animation: `cyd-glitter-fall ${duration}s linear ${delay}s infinite`,
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
