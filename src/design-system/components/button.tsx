import {
  forwardRef,
  useState,
  type ButtonHTMLAttributes,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost" | "link" | "heavysweep" | "glow";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** Enables randomized glitter on hover. */
  enableGlitter?: boolean;
  /** Enables the directional sweep effect on hover. */
  enableSweep?: boolean;
}

const base =
  "relative isolate overflow-hidden inline-flex items-center justify-center font-script text-xl " +
  "transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "group text-foreground bg-transparent border border-cta-border rounded-pill hover:text-cyd-gold-300",
  outline:
    "group text-foreground bg-transparent border border-transparent rounded-pill hover:border-cta-border hover:text-cyd-gold-300",
  ghost: "group text-foreground bg-transparent border border-cta-border rounded-pill hover:text-cyd-gold-300",
  link: "group text-foreground bg-transparent border border-transparent hover:text-cyd-gold-300 rounded-pill",
};
heavysweep: "bg-gradient-to-r from-[#b89753] via-[#c5a059] to-[#9c7d3d] text-white hover:opacity-95 shadow-md active:scale-95 transition-all duration-300",
  glow: "border border-[#d4af37]/40 bg-white/20 dark:bg-black/20 text-[#4a4238] dark:text-[#f7f5f0] backdrop-blur-sm hover:bg-[#d4af37]/10 hover:border-[#d4af37] active:scale-95 transition-all duration-300",

};

const glitterColor: Record<ButtonVariant, string> = {
  primary: "var(--cta-glitter)",
  outline: "var(--cta-glitter)",
  ghost: "var(--cta-glitter)",
  link: "var(--cta-glitter)",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-lg",
  md: "h-10 px-5 text-xl",
  lg: "h-12 px-6 text-2xl",
};

type RandomParticle = {
  left: number;
  top: number;
  dot: number;
  period: number;
  delay: number;
  star: boolean;
  drift: number;
};

function createRandomParticles(): RandomParticle[] {
  return Array.from({ length: 160 }, (_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    dot: i < 14 ? Math.random() * 9 + 9 : Math.random() * 1.4 + 1.2,
    period: Math.random() * 0.6 + 1,
    delay: Math.random() * 0.9,
    star: i < 14,
    drift: Math.random() * 1.2 - 0.6,
  }));
}

function Glitter({ color, particles }: { color: string; particles: RandomParticle[] }) {
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
      {particles.map(({ left, top, dot, period, delay, star, drift }, i) => (
        <span
          key={`${i}-${left}-${top}`}
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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    enableGlitter = false,
    enableSweep = false,
    leadingIcon,
    trailingIcon,
    className,
    children,
    disabled,
    type = "button",
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...props
  },
  ref,
) {
  const [particles, setParticles] = useState<RandomParticle[] | null>(null);

  const refreshGlitter = () => {
    if (enableGlitter && !disabled && !loading) {
      setParticles(createRandomParticles());
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>) => {
    refreshGlitter();
    onMouseEnter?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
    refreshGlitter();
    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    onBlur?.(event);
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {enableSweep && !enableGlitter && !disabled && !loading && (
        <span aria-hidden="true" className="cyd-button-sweep" />
      )}

      {enableGlitter && !disabled && !loading && particles && (
        <Glitter color={glitterColor[variant]} particles={particles} />
      )}

      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {loading ? <Spinner /> : leadingIcon}
        {children}
        {trailingIcon}
      </span>
    </button>
  );
});

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

Button.displayName = "Button";
