import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils/cn";

const SIZE_CLASSES = {
  label: "type-label",
  lg: "type-body-lg",
  md: "type-body-md",
  meta: "type-meta",
  sm: "type-body-sm",
} as const;

const TONE_CLASSES = {
  accent: "tone-accent",
  danger: "tone-danger",
  inverse: "tone-inverse",
  muted: "tone-muted",
  primary: "tone-primary",
  secondary: "tone-secondary",
} as const;

const WEIGHT_CLASSES = {
  bold: "weight-bold",
  medium: "weight-medium",
  regular: "weight-regular",
  semibold: "weight-semibold",
} as const;

type TextOwnProps<T extends ElementType> = {
  as?: T;
  caps?: boolean;
  className?: string;
  numeric?: boolean;
  size?: keyof typeof SIZE_CLASSES;
  tone?: keyof typeof TONE_CLASSES;
  weight?: keyof typeof WEIGHT_CLASSES;
};

export type TextProps<T extends ElementType> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

export function Text<T extends ElementType = "p">({
  as,
  caps = false,
  className,
  numeric = false,
  size = "md",
  tone = "primary",
  weight = "regular",
  ...props
}: TextProps<T>) {
  const Component = as ?? "p";

  return (
    <Component
      className={cn(
        SIZE_CLASSES[size],
        TONE_CLASSES[tone],
        WEIGHT_CLASSES[weight],
        caps && "uppercase",
        numeric && "font-mono tabular-nums",
        className,
      )}
      {...props}
    />
  );
}
