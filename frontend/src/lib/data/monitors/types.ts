export type DashboardTagTone =
  | "accent"
  | "danger"
  | "neutral"
  | "success"
  | "warning";

export type MonitorOverview = {
  id: string;
  name: string;
  nextReviewWindow: string;
  scopeLabel: string;
  signalCount: number;
  statusLabel: string;
  statusTone: DashboardTagTone;
  summary: string;
};
