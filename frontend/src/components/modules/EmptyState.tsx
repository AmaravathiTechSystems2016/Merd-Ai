import type { ReactNode } from "react";

import { Heading, Panel, Text } from "@/components/atoms";
import { cn } from "@/lib/utils/cn";

export type EmptyStateProps = {
  action?: ReactNode;
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  footer?: ReactNode;
  title: ReactNode;
  tone?: "default" | "strong" | "subtle";
};

export function EmptyState({
  action,
  className,
  description,
  eyebrow,
  footer,
  title,
  tone = "default",
}: EmptyStateProps) {
  return (
    <Panel className={className} tone={tone} padding="lg">
      <div className="flex max-w-[var(--content-width-reading)] flex-col gap-[var(--space-4)]">
        {eyebrow ? (
          <Text size="label" tone="accent" weight="medium" caps>
            {eyebrow}
          </Text>
        ) : null}

        <Heading size="h3">{title}</Heading>

        {description ? (
          <Text size="md" tone="secondary">
            {description}
          </Text>
        ) : null}

        {action ? <div className="pt-[var(--space-2)]">{action}</div> : null}

        {footer ? (
          <div className={cn("pt-[var(--space-2)]", typeof footer === "string" && "max-w-[64ch]")}>
            {typeof footer === "string" ? (
              <Text size="sm" tone="muted">
                {footer}
              </Text>
            ) : (
              footer
            )}
          </div>
        ) : null}
      </div>
    </Panel>
  );
}
