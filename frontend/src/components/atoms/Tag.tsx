import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const SIZE_CLASSES = {
  md: "ui-tag--md",
  sm: "ui-tag--sm",
} as const;

const TONE_CLASSES = {
  accent: "ui-tag--accent",
  danger: "ui-tag--danger",
  neutral: "ui-tag--neutral",
  success: "ui-tag--success",
  warning: "ui-tag--warning",
} as const;

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  size?: keyof typeof SIZE_CLASSES;
  tone?: keyof typeof TONE_CLASSES;
};

export function Tag({
  children,
  className,
  size = "md",
  tone = "neutral",
  ...props
}: TagProps) {
  return (
    <span
      className={cn("ui-tag", SIZE_CLASSES[size], TONE_CLASSES[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}
