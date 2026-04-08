import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils/cn";

const PADDING_CLASSES = {
  lg: "p-[var(--space-8)]",
  md: "p-[var(--space-6)]",
  none: "",
  sm: "p-[var(--space-4)]",
} as const;

const TONE_CLASSES = {
  default: "ui-panel",
  strong: "ui-panel ui-panel--strong",
  subtle: "ui-panel ui-panel--subtle",
} as const;

type PanelOwnProps<T extends ElementType> = {
  as?: T;
  className?: string;
  padding?: keyof typeof PADDING_CLASSES;
  tone?: keyof typeof TONE_CLASSES;
};

export type PanelProps<T extends ElementType> = PanelOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof PanelOwnProps<T>>;

export function Panel<T extends ElementType = "section">({
  as,
  className,
  padding = "md",
  tone = "default",
  ...props
}: PanelProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(TONE_CLASSES[tone], PADDING_CLASSES[padding], className)}
      {...props}
    />
  );
}
