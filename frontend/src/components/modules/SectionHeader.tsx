import type { ReactNode } from "react";

import { Divider, Heading, Text } from "@/components/atoms";
import { cn } from "@/lib/utils/cn";

export type SectionHeaderProps = {
  actions?: ReactNode;
  align?: "center" | "start";
  className?: string;
  description?: ReactNode;
  divider?: boolean;
  eyebrow?: ReactNode;
  meta?: ReactNode;
  title: ReactNode;
};

export function SectionHeader({
  actions,
  align = "start",
  className,
  description,
  divider = false,
  eyebrow,
  meta,
  title,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col gap-[var(--space-4)]", className)}>
      <div
        className={cn(
          "flex flex-col gap-[var(--space-4)]",
          !centered && actions
            ? "xl:flex-row xl:items-end xl:justify-between xl:gap-[var(--space-8)]"
            : centered && "items-center text-center",
        )}
      >
        <div className="flex max-w-[var(--content-width-reading)] flex-col gap-[var(--space-3)]">
          {eyebrow ? (
            <Text size="label" tone="accent" weight="medium" caps>
              {eyebrow}
            </Text>
          ) : null}

          <Heading size="h2">{title}</Heading>

          {description ? (
            <Text size="lg" tone="secondary">
              {description}
            </Text>
          ) : null}

          {meta ? (
            <Text size="sm" tone="muted">
              {meta}
            </Text>
          ) : null}
        </div>

        {actions ? (
          <div
            className={cn(
              "flex flex-wrap items-center gap-[var(--space-3)]",
              centered ? "justify-center" : "xl:justify-end",
            )}
          >
            {actions}
          </div>
        ) : null}
      </div>

      {divider ? <Divider /> : null}
    </div>
  );
}
