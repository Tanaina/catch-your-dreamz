import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingVariant = "display" | "script" | "eyebrow";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level; also sets the default size. */
  level?: HeadingLevel;
  /** Typeface treatment. */
  variant?: HeadingVariant;
}

const levelSizes: Record<HeadingLevel, string> = {
  1: "text-5xl md:text-6xl",
  2: "text-4xl",
  3: "text-2xl",
  4: "text-xl",
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 2, variant = "display", className, ...props },
  ref,
) {
  const Tag = `h${level}` as "h1";
  const variantClass =
    variant === "script"
      ? "font-script font-normal leading-tight"
      : variant === "eyebrow"
        ? "font-sans text-xs cyd-tracked text-foreground-muted"
        : "font-display font-medium leading-tight";

  return (
    <Tag
      ref={ref}
      className={cn(
        "text-foreground",
        variantClass,
        variant !== "eyebrow" && levelSizes[level],
        className,
      )}
      {...props}
    />
  );
});

export type TextTone = "default" | "muted" | "brand";
export type TextSize = "xs" | "sm" | "md" | "lg";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: TextTone;
  size?: TextSize;
}

const tones: Record<TextTone, string> = {
  default: "text-foreground",
  muted: "text-foreground-muted",
  brand: "text-cyd-gold-700 dark:text-cyd-gold-300",
};

const textSizes: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(
  { tone = "default", size = "md", className, ...props },
  ref,
) {
  return (
    <p
      ref={ref}
      className={cn("font-sans leading-relaxed", tones[tone], textSizes[size], className)}
      {...props}
    />
  );
});
