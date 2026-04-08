import type { DashboardTagTone } from "../monitors/types";

export type DashboardSignal = {
  contextLabel: string;
  headline: string;
  id: string;
  monitorName: string;
  priorityLabel: string;
  priorityTone: DashboardTagTone;
  summary: string;
  timeLabel: string;
  watchNext: string;
  whyItMatters: string;
};
