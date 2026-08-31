import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

const field =
  "w-full bg-surface text-foreground font-sans text-sm placeholder:text-foreground-muted " +
  "border border-border rounded-sm transition-colors outline-none " +
  "hover:border-border-strong focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 " +
  "disabled:opacity-45 disabled:cursor-not-allowed";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Renders the error border and marks the control invalid. */
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(field, "h-11 px-4", invalid && "border-danger focus-visible:border-danger", className)}
      {...props}
    />
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(field, "px-4 py-3 resize-y", invalid && "border-danger", className)}
      {...props}
    />
  );
});
