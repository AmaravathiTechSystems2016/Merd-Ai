import type { ReactNode } from "react";

import { Panel, Text } from "@/components/atoms";

export type FilterBarProps = {
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  label?: ReactNode;
  summary?: ReactNode;
};

export function FilterBar({
  actions,
  children,
  className,
  label = "Filters",
  summary,
}: FilterBarProps) {
  return (
    <Panel className={className} tone="subtle" padding="sm">
      <div className="flex flex-col gap-[var(--space-4)] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-3)]">
          <div className="flex flex-wrap items-center gap-[var(--space-3)]">
            {label ? (
              <Text size="label" tone="secondary" weight="medium" caps>
                {label}
              </Text>
            ) : null}

            {summary ? (
              <Text size="sm" tone="muted">
                {summary}
              </Text>
            ) : null}
          </div>

          {children ? (
            <div className="flex flex-wrap items-center gap-[var(--space-3)]">
              {children}
            </div>
          ) : null}
        </div>

        {actions ? (
          <div className="flex flex-wrap items-center gap-[var(--space-3)]">
            {actions}
          </div>
        ) : null}
      </div>
    </Panel>
  );
}
