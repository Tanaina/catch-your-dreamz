import { forwardRef, useId, type HTMLAttributes, type LabelHTMLAttributes, type ReactElement, cloneElement } from "react";
import { cn } from "../lib/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Appends a gold asterisk. */
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, className, children, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn("block font-sans text-[0.7rem] cyd-tracked text-foreground-muted", className)}
      {...props}
    >
      {children}
      {required && <span className="text-primary"> *</span>}
    </label>
  );
});

export interface FieldProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  label: string;
  /** Helper copy shown under the control. */
  hint?: string;
  /** Error copy; replaces the hint and marks the control invalid. */
  error?: string;
  required?: boolean;
  /** The control to label — Input, Textarea, or any element accepting `id`. */
  children: ReactElement<{ id?: string; invalid?: boolean; "aria-describedby"?: string }>;
}

/** Label + control + hint/error, wired with matching ids for screen readers. */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, hint, error, required, children, className, ...props },
  ref,
) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {cloneElement(children, {
        id,
        invalid: Boolean(error) || children.props.invalid,
        "aria-describedby": message ? messageId : undefined,
      })}
      {message && (
        <p
          id={messageId}
          className={cn("font-sans text-xs", error ? "text-danger" : "text-foreground-muted")}
        >
          {message}
        </p>
      )}
    </div>
  );
});
