import { Heading, Panel, Tag, Text } from "@/components/atoms";
import type { MonitorOverview } from "@/lib/data/monitors/types";

export type MonitorSummaryPanelProps = MonitorOverview;

export function MonitorSummaryPanel({
  name,
  nextReviewWindow,
  scopeLabel,
  signalCount,
  statusLabel,
  statusTone,
  summary,
}: MonitorSummaryPanelProps) {
  return (
    <Panel className="dashboard-sidebar-panel flex flex-col gap-[var(--space-5)]" padding="md">
      <div className="flex flex-wrap items-start justify-between gap-[var(--space-3)]">
        <div className="flex flex-wrap items-center gap-[var(--space-2)]">
          <Tag>{scopeLabel}</Tag>
          <Tag tone={statusTone}>{statusLabel}</Tag>
        </div>

        <Text size="meta" tone="muted">
          {nextReviewWindow}
        </Text>
      </div>

      <div className="flex flex-col gap-[var(--space-3)]">
        <Heading size="h4">{name}</Heading>
        <Text size="sm" tone="secondary">
          {summary}
        </Text>
      </div>

      <div className="rounded-[var(--radius-md)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-strong)] p-[var(--space-4)]">
        <Text size="label" tone="secondary" weight="medium" caps>
          Active signals
        </Text>
        <div className="mt-[var(--space-2)] flex items-end justify-between gap-[var(--space-3)]">
          <Heading as="p" size="h3">
            {signalCount}
          </Heading>
          <Text size="sm" tone="muted">
            in current review window
          </Text>
        </div>
      </div>
    </Panel>
  );
}
