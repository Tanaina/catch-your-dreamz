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
  "relative isolate overflow-hidden inline-flex items-center justify-center gap-2 font-script text-xl " +
  "transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "group text-foreground bg-transparent border border-cta-border hover:bg-cta-hover rounded-pill",
  outline: "group text-foreground bg-transparent border border-cta-border hover:text-cta-glitter rounded-pill",
  ghost: "group text-foreground bg-transparent border border-transparent hover:bg-cta-hover rounded-pill",
  link: "group text-foreground bg-transparent border border-transparent hover:bg-cta-hover rounded-pill",
};

/** Glitter tint per variant: the gold that already belongs to that button. */
const glitterColor: Record<ButtonVariant, string> = {
  primary: "var(--cta-glitter)",
  outline: "var(--primary)",
  ghost: "var(--primary)",
  link: "var(--primary)",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-lg",
  md: "h-10 px-5 text-xl",
  lg: "h-12 px-6 text-2xl",
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
      {!disabled && !loading && <Glitter color={glitterColor[variant]} />}
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
  [7, 18, 9, 1.3, 0.25, true, 0],
  [15, 42, 13, 1.5, 0.7, true, 0],
  [22, 72, 8, 1.1, 0.4, true, 0],
  [31, 28, 14, 1.4, 0.85, true, 0],
  [41, 76, 10, 1.2, 0.15, true, 0],
  [50, 32, 12, 1.6, 0.55, true, 0],
  [65, 18, 13, 1.5, 0.35, true, 0],
  [72, 45, 8, 1.1, 0.65, true, 0],
  [89, 72, 14, 1.6, 0.5, true, 0],
  [97, 44, 9, 1.2, 0.8, true, 0],
  [12, 30, 12, 1.2, 0.0, true, 0],
  [34, 66, 11, 1.4, 0.45, true, 0],
  [58, 26, 15, 1.1, 0.2, true, 0],
  [79, 62, 20, 1.3, 0.6, true, 0],
  [92, 32, 18, 1.5, 0.35, true, 0],
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
  // Additional pinpoint specks
  [6, 35, 1, 1.2, 0.35, false, -0.4],
  [10, 58, 1.5, 1.4, 0.8, false, 0.5],
  [14, 88, 1, 1.1, 0.2, false, -0.5],
  [19, 31, 1.5, 1.3, 0.65, false, 0.4],
  [23, 61, 1, 1.5, 0.15, false, -0.6],
  [28, 38, 1.5, 1.2, 0.9, false, 0.5],
  [33, 91, 1, 1.4, 0.4, false, -0.4],
  [37, 12, 1, 1.1, 0.75, false, 0.6],
  [42, 57, 1.5, 1.3, 0.3, false, -0.5],
  [47, 35, 1, 1.5, 0.55, false, 0.4],
  [51, 73, 1.5, 1.2, 0.85, false, -0.6],
  [57, 45, 1, 1.4, 0.25, false, 0.5],
  [61, 91, 1.5, 1.1, 0.7, false, -0.4],
  [68, 62, 1, 1.3, 0.1, false, 0.6],
  [73, 29, 1.5, 1.5, 0.5, false, -0.5],
  [77, 84, 1, 1.2, 0.9, false, 0.4],
  [82, 42, 1.5, 1.4, 0.35, false, -0.6],
  [87, 67, 1, 1.1, 0.65, false, 0.5],
  [91, 18, 1.5, 1.3, 0.2, false, -0.4],
  [95, 55, 1, 1.5, 0.8, false, 0.6],
  // More pinpoint specks
  [3, 24, 1, 1.2, 0.32, false, 0.4],
  [5, 68, 1.5, 1.4, 0.72, false, -0.5],
  [9, 41, 1, 1.1, 0.18, false, 0.6],
  [13, 7, 1.5, 1.3, 0.57, false, -0.4],
  [16, 55, 1, 1.5, 0.91, false, 0.5],
  [20, 76, 1.5, 1.2, 0.43, false, -0.6],
  [24, 18, 1, 1.4, 0.08, false, 0.4],
  [27, 51, 1.5, 1.1, 0.67, false, -0.5],
  [31, 74, 1, 1.3, 0.29, false, 0.6],
  [35, 34, 1.5, 1.5, 0.83, false, -0.4],
  [38, 69, 1, 1.2, 0.14, false, 0.5],
  [41, 9, 1.5, 1.4, 0.52, false, -0.6],
  [44, 63, 1, 1.1, 0.77, false, 0.4],
  [49, 24, 1.5, 1.3, 0.36, false, -0.5],
  [53, 81, 1, 1.5, 0.95, false, 0.6],
  [56, 11, 1.5, 1.2, 0.21, false, -0.4],
  [60, 47, 1, 1.4, 0.64, false, 0.5],
  [64, 88, 1.5, 1.1, 0.11, false, -0.6],
  [67, 21, 1, 1.3, 0.48, false, 0.4],
  [70, 57, 1.5, 1.5, 0.79, false, -0.5],
  [74, 6, 1, 1.2, 0.27, false, 0.6],
  [76, 71, 1.5, 1.4, 0.59, false, -0.4],
  [80, 39, 1, 1.1, 0.06, false, 0.5],
  [85, 13, 1.5, 1.3, 0.74, false, -0.6],
  [86, 61, 1, 1.5, 0.31, false, 0.4],
  [90, 86, 1.5, 1.2, 0.88, false, -0.5],
  [93, 46, 1, 1.4, 0.17, false, 0.6],
  [94, 23, 1.5, 1.1, 0.66, false, -0.4],
  [97, 58, 1, 1.3, 0.39, false, 0.5],
  [99, 34, 1.5, 1.5, 0.82, false, -0.6],
  // More pinpoint specks
  [2, 12, 1, 1.2, 0.22, false, 0.4],
  [5, 37, 1.5, 1.4, 0.61, false, -0.5],
  [9, 63, 1, 1.1, 0.14, false, 0.6],
  [12, 86, 1.5, 1.3, 0.48, false, -0.4],
  [16, 27, 1, 1.5, 0.83, false, 0.5],
  [20, 70, 1.5, 1.2, 0.35, false, -0.6],
  [24, 46, 1, 1.4, 0.72, false, 0.4],
  [28, 8, 1.5, 1.1, 0.19, false, 0.5],
  [32, 62, 1, 1.3, 0.56, false, -0.6],
  [36, 41, 1.5, 1.5, 0.91, false, 0.4],
  [40, 92, 1, 1.2, 0.27, false, -0.5],
  [44, 17, 1.5, 1.4, 0.68, false, 0.6],
  [48, 68, 1, 1.1, 0.11, false, -0.4],
  [52, 36, 1.5, 1.3, 0.49, false, 0.5],
  [56, 82, 1, 1.5, 0.76, false, -0.6],
  [60, 14, 1.5, 1.2, 0.31, false, 0.4],
  [64, 54, 1, 1.4, 0.87, false, -0.5],
  [68, 89, 1.5, 1.1, 0.16, false, 0.6],
  [72, 33, 1, 1.3, 0.58, false, -0.4],
  [76, 65, 1.5, 1.5, 0.42, false, 0.5],
  [80, 11, 1, 1.2, 0.94, false, -0.6],
  [84, 49, 1.5, 1.4, 0.24, false, 0.4],
  [88, 77, 1, 1.1, 0.65, false, -0.5],
  [92, 28, 1.5, 1.3, 0.09, false, 0.6],
  [95, 91, 1, 1.5, 0.53, false, -0.4],
  [98, 56, 1.5, 1.2, 0.79, false, 0.5],
];

function Glitter({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-150",
        "group-hover:opacity-100 group-focus-visible:opacity-100",
        "rounded-pill",
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
