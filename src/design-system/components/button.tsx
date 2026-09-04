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

/** Deterministic scatter: left offset (%), delay (s), duration (s), size (px). */
const PARTICLES: Array<[number, number, number, number]> = [
  [4, 0, 1.5, 2], [11, 0.55, 1.9, 1.5], [18, 0.22, 1.3, 2.5], [25, 0.8, 1.7, 1.5],
  [32, 0.12, 2.0, 2], [39, 0.65, 1.4, 1.5], [46, 0.35, 1.8, 2.5], [53, 0.95, 1.6, 1.5],
  [60, 0.05, 1.5, 2], [67, 0.48, 2.0, 1.5], [74, 0.28, 1.35, 2.5], [81, 0.72, 1.75, 1.5],
  [88, 0.18, 1.55, 2], [95, 0.6, 1.9, 1.5],
];

function Glitter() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
    >
      {PARTICLES.map(([left, delay, duration, dot], i) => (
        <span
          key={i}
          className="cyd-glitter-particle"
          style={{
            left: `${left}%`,
            width: `${dot}px`,
            height: `${dot}px`,
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
