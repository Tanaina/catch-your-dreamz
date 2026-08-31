import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Gold gradient rule with a centred diamond, for section breaks. */
  ornament?: boolean;
  /** Optional label set into the rule. */
  label?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { ornament = false, label, className, ...props },
  ref,
) {
  const line = ornament ? "h-px cyd-rule-gold" : "h-px bg-border";

  if (label) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-label={label}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
        <span className={cn("flex-1", line)} />
        <span className="font-sans text-[0.6rem] cyd-tracked text-foreground-muted">{label}</span>
        <span className={cn("flex-1", line)} />
      </div>
    );
  }

  if (ornament) {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("flex items-center gap-3", className)}
        {...props}
      >
        <span className={cn("flex-1", line)} />
        <span aria-hidden="true" className="size-1.5 rotate-45 bg-primary" />
        <span className={cn("flex-1", line)} />
      </div>
    );
  }

  return <div ref={ref} role="separator" className={cn("w-full", line, className)} {...props} />;
});
