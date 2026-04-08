import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils/cn";

const SIZE_CLASSES = {
  display: "type-display",
  h1: "type-heading-1",
  h2: "type-heading-2",
  h3: "type-heading-3",
  h4: "type-heading-4",
} as const;

const DEFAULT_ELEMENTS = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
} as const;

const TONE_CLASSES = {
  accent: "tone-accent",
  inverse: "tone-inverse",
  primary: "tone-primary",
  secondary: "tone-secondary",
} as const;

const WEIGHT_CLASSES = {
  bold: "weight-bold",
  medium: "weight-medium",
  regular: "weight-regular",
  semibold: "weight-semibold",
} as const;

type HeadingOwnProps<T extends ElementType> = {
  as?: T;
  balance?: boolean;
  className?: string;
  size?: keyof typeof SIZE_CLASSES;
  tone?: keyof typeof TONE_CLASSES;
  weight?: keyof typeof WEIGHT_CLASSES;
};

export type HeadingProps<T extends ElementType> = HeadingOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof HeadingOwnProps<T>>;

export function Heading<T extends ElementType = "h2">({
  as,
  balance = true,
  className,
  size = "h2",
  tone = "primary",
  weight = "semibold",
  ...props
}: HeadingProps<T>) {
  const Component = (as ?? DEFAULT_ELEMENTS[size]) as ElementType;

  return (
    <Component
      className={cn(
        SIZE_CLASSES[size],
        TONE_CLASSES[tone],
        WEIGHT_CLASSES[weight],
        balance && "text-balance",
        className,
      )}
      {...props}
    />
  );
}
