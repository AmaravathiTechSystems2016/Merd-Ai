import { Heading, Panel, Tag, Text } from "@/components/atoms";
import type { DashboardSignal } from "@/lib/data/signals/types";

export type SignalItemProps = DashboardSignal;

export function SignalItem({
  contextLabel,
  headline,
  monitorName,
  priorityLabel,
  priorityTone,
  summary,
  timeLabel,
  watchNext,
  whyItMatters,
}: SignalItemProps) {
  return (
    <Panel className="flex flex-col gap-[var(--space-5)]" padding="md">
      <div className="flex flex-wrap items-start justify-between gap-[var(--space-3)]">
        <div className="flex flex-wrap items-center gap-[var(--space-2)]">
          <Tag tone={priorityTone}>{priorityLabel}</Tag>
          <Tag>{contextLabel}</Tag>
        </div>

        <Text size="meta" tone="muted">
          {timeLabel}
        </Text>
      </div>

      <div className="flex flex-col gap-[var(--space-3)]">
        <Heading size="h4">{headline}</Heading>
        <Text size="md" tone="secondary">
          {summary}
        </Text>
      </div>

      <div className="flex flex-wrap items-center gap-[var(--space-3)]">
        <Text size="meta" tone="muted">
          {monitorName}
        </Text>
      </div>

      <div className="grid gap-[var(--space-4)] border-t border-[color:var(--color-border-subtle)] pt-[var(--space-4)] md:grid-cols-2">
        <div className="flex flex-col gap-[var(--space-2)]">
          <Text size="label" tone="secondary" weight="medium" caps>
            Why it matters
          </Text>
          <Text size="sm" tone="secondary">
            {whyItMatters}
          </Text>
        </div>

        <div className="flex flex-col gap-[var(--space-2)]">
          <Text size="label" tone="secondary" weight="medium" caps>
            Watch next
          </Text>
          <Text size="sm" tone="secondary">
            {watchNext}
          </Text>
        </div>
      </div>
    </Panel>
  );
}
