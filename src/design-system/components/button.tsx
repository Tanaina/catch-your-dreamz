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
      className={cn(
        base,
        variants[variant],
        variant === "link" ? linkSizes[size] : sizes[size],
        className,
      )}
      {...props}
    >
      {!disabled && !loading && (
        <Glitter color={glitterColor[variant]} rounded={variant === "link"} />
      )}
      {loading ? <Spinner /> : leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});

/** Deterministic scatter across the whole button: left %, delay s, fall s, size px, drift px, twinkle s, fleck. */
const PARTICLES: Array<[number, number, number, number, number, number, boolean]> = [
  [3, 0.0, 1.5, 8, 5, 1.0, false], [8, 0.72, 1.15, 3, -4, 0.8, true],
  [13, 0.28, 1.85, 6, 6, 1.3, false], [18, 1.05, 1.35, 3, -5, 0.9, true],
  [23, 0.16, 1.65, 9, 4, 1.15, false], [28, 0.58, 1.95, 4, -6, 0.75, true],
  [33, 0.88, 1.25, 7, 5, 1.25, false], [38, 0.08, 1.75, 3, -3, 0.85, true],
  [43, 0.48, 1.45, 8, 6, 1.05, false], [48, 0.96, 1.9, 4, -5, 0.95, true],
  [53, 0.22, 1.3, 6, 4, 1.2, false], [58, 0.68, 1.7, 3, -6, 0.8, true],
  [63, 0.38, 2.0, 9, 5, 1.35, false], [68, 1.12, 1.4, 3, -4, 0.9, true],
  [73, 0.12, 1.8, 7, 6, 1.1, false], [78, 0.62, 1.55, 4, -5, 0.85, true],
  [83, 0.34, 1.25, 8, 4, 1.3, false], [88, 0.82, 1.95, 3, -3, 0.78, true],
  [93, 0.2, 1.6, 6, 5, 1.15, false], [97, 0.52, 1.4, 4, -4, 0.92, true],
  [6, 1.2, 1.7, 5, 4, 1.0, false], [21, 1.34, 1.5, 3, -5, 0.88, true],
  [36, 1.1, 1.9, 7, 6, 1.28, false], [51, 1.4, 1.6, 3, -3, 0.82, true],
  [66, 1.18, 1.35, 6, 5, 1.12, false], [81, 1.45, 1.85, 3, -6, 0.9, true],
  [96, 1.26, 1.55, 5, 4, 1.05, false],
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
      {PARTICLES.map(([left, delay, duration, dot, drift, twinkle, fleck], i) => (
        <span
          key={i}
          className={cn("cyd-glitter-particle", fleck && "cyd-glitter-fleck")}
          style={{
            left: `${left}%`,
            ["--cyd-dot" as string]: `${dot}px`,
            ["--cyd-drift" as string]: `${drift}px`,
            ["--cyd-twinkle" as string]: `${twinkle}s`,
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
