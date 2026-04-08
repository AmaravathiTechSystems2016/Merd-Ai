import { Button, Heading, Panel, Tag, Text } from "@/components/atoms";
import {
  FilterBar,
  MonitorSummaryPanel,
  SectionHeader,
  SignalItem,
} from "@/components/modules";
import { monitorOverviewMock } from "@/lib/data/monitors/mock";
import { dashboardSignalsMock } from "@/lib/data/signals/mock";

const insightMarkers = [
  {
    label: "Highest pressure",
    value: "Supply continuity and trade friction",
  },
  {
    label: "Most active cluster",
    value: "Semiconductors, shipping, and minerals",
  },
  {
    label: "Recommended posture",
    value: "Escalate for review, not broad alarm",
  },
] as const;

const dashboardStatusCue = [
  { label: "Active monitors", value: "4" },
  { label: "Signals in review", value: "4" },
  { label: "Escalating clusters", value: "2" },
] as const;

export function MonitoringDashboardSlice() {
  return (
    <main className="motion-page-enter page-background mx-auto flex w-full max-w-[var(--content-width-page)] flex-1 flex-col gap-[var(--space-6)] px-[var(--space-6)] py-[var(--space-6)] md:px-[var(--space-10)] md:py-[var(--space-8)]">
      <SectionHeader
        className="gap-[var(--space-3)]"
        eyebrow="Monitoring dashboard"
        title="What needs attention now"
        description="A calm scanning surface for active monitors, current signals, and the clearest cross-monitor shift visible right now."
        meta="Approval slice only. Uses mock monitor and signal data with no backend integration."
        actions={
          <>
            <Button size="sm">
              Create monitor
            </Button>
            <Button size="sm" variant="secondary">
              Review queue
            </Button>
          </>
        }
      />

      <Panel
        className="dashboard-status-strip flex flex-wrap items-center gap-[var(--space-3)]"
        padding="sm"
        tone="subtle"
      >
        <Text className="dashboard-status-title" size="label" tone="secondary" weight="medium" caps>
          Dashboard status
        </Text>

        {dashboardStatusCue.map((item) => (
          <div
            key={item.label}
            className="dashboard-status-item flex items-center gap-[var(--space-3)]"
          >
            <div className="flex items-baseline gap-[var(--space-2)]">
              <Text
                className="dashboard-status-value"
                size="sm"
                tone="primary"
                weight="semibold"
                numeric
              >
                {item.value}
              </Text>
              <Text size="sm" tone="muted">
                {item.label}
              </Text>
            </div>
          </div>
        ))}
      </Panel>

      <div className="grid gap-[var(--space-6)] xl:grid-cols-[minmax(0,1.5fr)_minmax(21rem,0.92fr)] xl:items-start">
        <div className="flex flex-col gap-[var(--space-6)]">
          <Panel
            className="motion-panel-enter motion-delay-1 dashboard-insight-panel flex flex-col gap-[var(--space-6)]"
            padding="lg"
            tone="strong"
          >
            <div className="flex flex-wrap items-center gap-[var(--space-2)]">
              <Tag className="dashboard-primary-chip" tone="accent">
                Primary insight
              </Tag>
              <Tag tone="warning">Cross-monitor shift</Tag>
            </div>

            <div className="flex flex-col gap-[var(--space-3)]">
              <Heading size="h2">
                Trade, shipping, and critical-input signals are converging into a
                broader supply continuity risk.
              </Heading>
              <Text size="lg" tone="secondary">
                The most important developments are no longer isolated events.
                Multiple active monitors now point to the same operating pressure:
                slower movement, tighter input flexibility, and more policy
                friction across exposed supply chains.
              </Text>
            </div>

            <div className="grid gap-[var(--space-4)] md:grid-cols-3">
              {insightMarkers.map((marker) => (
                <div
                  key={marker.label}
                  className="dashboard-insight-marker flex flex-col gap-[var(--space-2)] border-l pl-[var(--space-4)]"
                >
                  <Text size="label" tone="secondary" weight="medium" caps>
                    {marker.label}
                  </Text>
                  <Text className="dashboard-insight-value" size="sm" tone="primary" weight="medium">
                    {marker.value}
                  </Text>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-[var(--space-3)]">
              <Button>Review priority signals</Button>
              <Button variant="secondary">Open monitor analysis</Button>
            </div>
          </Panel>

          <section className="flex flex-col gap-[var(--space-4)]">
            <div className="flex flex-col gap-[var(--space-2)]">
              <Heading size="h3">Priority signals</Heading>
              <Text size="md" tone="secondary">
                Ordered for quick scanning, with the relevance layer attached to each
                event instead of leaving users to infer why it matters.
              </Text>
            </div>

            <FilterBar
              summary="Showing 4 current signals across the most active monitors."
              actions={
                <Button size="sm" variant="ghost">
                  Refresh view
                </Button>
              }
            >
              <Tag tone="accent">All monitors</Tag>
              <Tag tone="accent">High priority</Tag>
              <Tag tone="accent">Last 24 hours</Tag>
            </FilterBar>

            <div className="flex flex-col gap-[var(--space-4)]">
              {dashboardSignalsMock.map((signal) => (
                <SignalItem key={signal.id} {...signal} />
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-[var(--space-4)] xl:sticky xl:top-[var(--space-8)]">
          <Panel
            className="motion-panel-enter motion-delay-2 dashboard-overview-panel dashboard-sidebar-panel flex flex-col gap-[var(--space-3)]"
            padding="lg"
          >
            <Text size="label" tone="secondary" weight="medium" caps>
              Monitor overview
            </Text>
            <Heading size="h3">Active monitors with the most movement</Heading>
            <Text size="md" tone="secondary">
              A quieter read on where the signal load is building and which monitors
              are most likely to deserve a closer review next.
            </Text>
          </Panel>

          <div className="flex flex-col gap-[var(--space-4)]">
            {monitorOverviewMock.map((monitor, index) => (
              <div
                key={monitor.id}
                className={`motion-panel-enter motion-delay-${Math.min(index + 3, 5)}`}
              >
                <MonitorSummaryPanel {...monitor} />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
