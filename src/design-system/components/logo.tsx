import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";
import circleMark from "@/assets/logos/cyd-logo-circle.png";

export type LogoSize = "sm" | "md" | "lg";

export interface LogoProps extends Omit<HTMLAttributes<HTMLImageElement>, "children"> {
  size?: LogoSize;
  /** Accessible name; pass "" for a decorative mark beside a wordmark. */
  alt?: string;
}

const sizes: Record<LogoSize, string> = {
  sm: "h-16 w-auto",
  md: "h-32 w-auto",
  lg: "h-64 w-auto",
};

/**
 * The Catch Your Dreamz circular brand mark — the single canonical logo.
 * Never redraw or substitute it; always render this component.
 */
export const Logo = forwardRef<HTMLImageElement, LogoProps>(function Logo(
  { size = "md", alt = "Catch Your Dreamz", className, ...props },
  ref,
) {
  return (
    <img
      ref={ref}
      src={circleMark}
      alt={alt}
      className={cn("object-contain", sizes[size], className)}
      {...props}
    />
  );
});
