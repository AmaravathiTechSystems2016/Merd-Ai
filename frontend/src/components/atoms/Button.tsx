import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

const SIZE_CLASSES = {
  lg: "ui-button--lg",
  md: "ui-button--md",
  sm: "ui-button--sm",
} as const;

const VARIANT_CLASSES = {
  ghost: "ui-button--ghost",
  primary: "ui-button--primary",
  secondary: "ui-button--secondary",
} as const;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  size?: keyof typeof SIZE_CLASSES;
  trailingIcon?: ReactNode;
  variant?: keyof typeof VARIANT_CLASSES;
};

export function Button({
  children,
  className,
  fullWidth = false,
  leadingIcon,
  size = "md",
  trailingIcon,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "ui-button",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        fullWidth && "ui-button--full",
        className,
      )}
      type={type}
      {...props}
    >
      {leadingIcon ? <span className="flex shrink-0 items-center">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span className="flex shrink-0 items-center">{trailingIcon}</span>
      ) : null}
    </button>
  );
}
