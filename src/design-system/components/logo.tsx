import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";
import circleMark from "@/assets/logos/cyd-logo-2026-gold.svg";
import detailedMark from "@/assets/logos/cyd-logo-2026-detailed.svg";
import monoMark from "@/assets/logos/cyd-logo.svg";

export type LogoVariant = "gold" | "detailed" | "mono";
export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps extends Omit<HTMLAttributes<HTMLImageElement>, "children"> {
  /** Which brand mark to render. */
  variant?: LogoVariant;
  size?: LogoSize;
  /** Accessible name; pass "" for a decorative mark beside a wordmark. */
  alt?: string;
}

const sources: Record<LogoVariant, string> = {
  gold: circleMark,
  detailed: detailedMark,
  mono: monoMark,
};

const sizes: Record<LogoSize, string> = {
  sm: "size-12",
  md: "size-24",
  lg: "size-44",
};

export const Logo = forwardRef<HTMLImageElement, LogoProps>(function Logo(
  { variant = "gold", size = "md", alt = "Catch Your Dreamz", className, ...props },
  ref,
) {
  return (
    <img
      ref={ref}
      src={sources[variant]}
      alt={alt}
      className={cn("object-contain", sizes[size], className)}
      {...props}
    />
  );
});
