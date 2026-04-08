import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

import { Text } from "./Text";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  description?: string;
  error?: string;
  inputClassName?: string;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export function Input({
  className,
  description,
  disabled,
  error,
  id,
  inputClassName,
  label,
  prefix,
  suffix,
  ...props
}: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex w-full flex-col gap-[var(--space-2)]", className)}>
      {label ? (
        <Text
          as="label"
          htmlFor={fieldId}
          size="meta"
          tone="secondary"
          weight="medium"
          caps
        >
          {label}
        </Text>
      ) : null}

      <div
        className="ui-input-shell"
        data-disabled={disabled ? "true" : undefined}
        data-invalid={error ? "true" : undefined}
      >
        {prefix ? (
          <span className="tone-secondary flex items-center pl-[var(--space-4)]">
            {prefix}
          </span>
        ) : null}

        <input
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
          className={cn(
            "ui-input-field",
            prefix || suffix ? "px-0" : "px-[var(--space-4)]",
            inputClassName,
          )}
          disabled={disabled}
          id={fieldId}
          {...props}
        />

        {suffix ? (
          <span className="tone-secondary flex items-center pr-[var(--space-4)]">
            {suffix}
          </span>
        ) : null}
      </div>

      {error ? (
        <Text id={errorId} size="sm" tone="danger">
          {error}
        </Text>
      ) : null}

      {!error && description ? (
        <Text id={descriptionId} size="sm" tone="muted">
          {description}
        </Text>
      ) : null}
    </div>
  );
}
