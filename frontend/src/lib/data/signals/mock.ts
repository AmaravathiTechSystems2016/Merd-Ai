import type { DashboardSignal } from "./types";

export const dashboardSignalsMock: DashboardSignal[] = [
  {
    contextLabel: "Trade policy",
    headline: "New export restrictions are tightening semiconductor equipment access across two monitored markets.",
    id: "signal-semiconductor-controls",
    monitorName: "East Asia semiconductor supply",
    priorityLabel: "High priority",
    priorityTone: "danger",
    summary:
      "The change does not stand alone. It reinforces an already visible pattern of narrower supplier flexibility for advanced manufacturing inputs.",
    timeLabel: "14 minutes ago",
    watchNext:
      "Watch for supplier response guidance and any downstream pricing or allocation commentary in the next reporting cycle.",
    whyItMatters:
      "This matters because equipment access constraints can slow capacity plans and raise execution risk for companies exposed to the same supplier network.",
  },
  {
    contextLabel: "Shipping disruption",
    headline: "Carrier rerouting pressure is extending Red Sea transit assumptions for another week.",
    id: "signal-red-sea-rerouting",
    monitorName: "Red Sea shipping lanes",
    priorityLabel: "Priority",
    priorityTone: "warning",
    summary:
      "The signal is operational rather than headline-driven. The issue is persistent transit drag, not a single new event spike.",
    timeLabel: "31 minutes ago",
    watchNext:
      "Watch whether insurance, fuel, or schedule revisions begin to appear in supplier planning updates and imported goods guidance.",
    whyItMatters:
      "This matters because extended shipping assumptions compound inventory and working-capital pressure across globally distributed operations.",
  },
  {
    contextLabel: "Critical inputs",
    headline: "Minerals processing requirements are becoming more explicit in a market tied to battery sourcing exposure.",
    id: "signal-critical-minerals",
    monitorName: "Critical minerals policy",
    priorityLabel: "Rising signal",
    priorityTone: "accent",
    summary:
      "The development is still early, but it adds policy friction to an input chain that already has concentration risk.",
    timeLabel: "52 minutes ago",
    watchNext:
      "Watch for whether procurement teams or local partners start adjusting sourcing language, eligibility rules, or timing assumptions.",
    whyItMatters:
      "This matters because even early policy tightening can shift cost assumptions and supplier viability before the market reprices the risk.",
  },
  {
    contextLabel: "Industrial planning",
    headline: "Expansion incentives in northern Mexico remain attractive, but execution confidence is diverging by sector.",
    id: "signal-mexico-expansion",
    monitorName: "Mexico industrial expansion",
    priorityLabel: "Watch",
    priorityTone: "success",
    summary:
      "This is a lower-urgency signal, but it helps separate strategic opportunity from the more immediate disruption cluster elsewhere on the dashboard.",
    timeLabel: "1 hour ago",
    watchNext:
      "Watch whether infrastructure timing, power reliability, or permitting updates begin changing the expected speed of project deployment.",
    whyItMatters:
      "This matters because location strategy signals need to be tracked even when they are not the first item demanding escalation.",
  },
];
