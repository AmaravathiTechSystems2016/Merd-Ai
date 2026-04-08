import type { DashboardTagTone } from "../monitors/types";

export type PestelCategory =
  | "Political"
  | "Economic"
  | "Social"
  | "Technological"
  | "Environmental"
  | "Legal";

export type MonitorTimeframeOption = {
  active: boolean;
  id: string;
  label: string;
  summary: string;
};

export type MonitorBriefItem = {
  id: string;
  label: string;
  summary: string;
  title: string;
};

export type SavedMonitorEvent = {
  id: string;
  note: string;
  sourceLabel: string;
  title: string;
};

export type MonitorImpactLayer = {
  id: string;
  implications: string[];
  label: string;
  summary: string;
  title: string;
};

export type MonitorAnalysisEvent = {
  evidence: string[];
  id: string;
  imageSrc: string;
  label: string;
  note: string;
  pestelCategory: PestelCategory;
  publishedAt: string;
  publisher: string;
  relevanceScore: number;
  topicTags: string[];
  statusLabel: string;
  statusTone: DashboardTagTone;
  summary: string;
  title: string;
};

export type MonitorAnalysisScreenData = {
  analysisEvents: MonitorAnalysisEvent[];
  controlSummary: string;
  impactLayers: MonitorImpactLayer[];
  meta: string;
  missedSinceLastReview: MonitorBriefItem[];
  monitorName: string;
  savedEvents: SavedMonitorEvent[];
  subtitle: string;
  timeframeOptions: MonitorTimeframeOption[];
};
