import type { MonitorOverview } from "./types";

export const monitorOverviewMock: MonitorOverview[] = [
  {
    id: "monitor-semiconductors",
    name: "East Asia semiconductor supply",
    nextReviewWindow: "Review within 6 hours",
    scopeLabel: "Sector monitor",
    signalCount: 3,
    statusLabel: "Escalating",
    statusTone: "danger",
    summary:
      "Export-control pressure and supplier concentration are increasing the chance of downstream disruption for electronics exposure.",
  },
  {
    id: "monitor-red-sea",
    name: "Red Sea shipping lanes",
    nextReviewWindow: "Watch through next session",
    scopeLabel: "Trade route monitor",
    signalCount: 2,
    statusLabel: "Unstable",
    statusTone: "warning",
    summary:
      "Extended transit times remain the clearest operational risk driver for import-heavy supply chains in this monitor set.",
  },
  {
    id: "monitor-critical-minerals",
    name: "Critical minerals policy",
    nextReviewWindow: "Review tomorrow morning",
    scopeLabel: "Policy monitor",
    signalCount: 2,
    statusLabel: "Rising relevance",
    statusTone: "accent",
    summary:
      "Licensing and domestic-processing signals are beginning to affect battery and industrial planning assumptions.",
  },
  {
    id: "monitor-mexico-manufacturing",
    name: "Mexico industrial expansion",
    nextReviewWindow: "Stable for now",
    scopeLabel: "Country monitor",
    signalCount: 1,
    statusLabel: "Monitoring",
    statusTone: "success",
    summary:
      "The monitor remains active, but current developments are more strategic than urgent compared with the top risk cluster.",
  },
];
