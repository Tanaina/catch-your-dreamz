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

/**
 * Deterministic scatter across the whole button surface:
 * left %, top %, size px, shimmer s, delay s, star?.
 * Many tiny specks plus a few crisp 4-point star twinkles.
 */
const PARTICLES: Array<[number, number, number, number, number, boolean]> = [
  // Star twinkles (larger, cross-shaped)
  [8, 22, 7, 0.7, 0.0, true], [22, 70, 6, 0.9, 0.3, true],
  [36, 30, 8, 0.6, 0.55, true], [50, 62, 6, 0.8, 0.15, true],
  [63, 26, 7, 0.7, 0.45, true], [76, 66, 6, 0.95, 0.1, true],
  [89, 34, 8, 0.65, 0.6, true], [45, 16, 5, 0.85, 0.75, true],
  // Fine specks (tiny shimmering dots)
  [4, 48, 2, 0.8, 0.2, false], [11, 82, 2.5, 0.7, 0.5, false],
  [16, 12, 2, 0.9, 0.35, false], [19, 44, 1.5, 0.6, 0.7, false],
  [26, 18, 2.5, 0.75, 0.1, false], [29, 88, 2, 0.85, 0.45, false],
  [33, 58, 1.5, 0.65, 0.25, false], [41, 84, 2, 0.8, 0.6, false],
  [47, 40, 2.5, 0.7, 0.05, false], [54, 12, 2, 0.9, 0.4, false],
  [57, 78, 1.5, 0.6, 0.15, false], [66, 50, 2.5, 0.75, 0.5, false],
  [70, 8, 2, 0.85, 0.3, false], [73, 90, 2, 0.7, 0.65, false],
  [80, 44, 1.5, 0.8, 0.2, false], [84, 74, 2.5, 0.65, 0.55, false],
  [93, 16, 2, 0.9, 0.4, false], [96, 58, 2.5, 0.75, 0.1, false],
  [14, 60, 2, 0.7, 0.68, false], [60, 38, 2, 0.85, 0.32, false],
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
      {PARTICLES.map(([left, top, dot, shimmer, delay, star], i) => (
        <span
          key={i}
          className={cn("cyd-glitter-particle", star && "cyd-glitter-star")}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            ["--cyd-dot" as string]: `${dot}px`,
            ["--cyd-shimmer" as string]: `${shimmer}s`,
            ["--cyd-delay" as string]: `${delay}s`,
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
