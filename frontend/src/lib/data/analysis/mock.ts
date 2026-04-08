import type { MonitorAnalysisScreenData } from "./types";

export const monitorAnalysisMock: MonitorAnalysisScreenData = {
  analysisEvents: [
    {
      evidence: [
        "Export-control tightening is narrowing supplier flexibility for advanced manufacturing inputs.",
        "Cross-border equipment licensing reviews are adding variance to procurement lead times.",
        "The monitor is receiving aligned policy and logistics pressure on the same operating path.",
      ],
      id: "analysis-political",
      imageSrc: "/article-thumbs/political.svg",
      label: "Policy pressure",
      note:
        "Current read: political controls are now directly shaping operating flexibility.",
      pestelCategory: "Political",
      publishedAt: "3h ago",
      publisher: "Global Affairs Desk",
      relevanceScore: 92,
      topicTags: [
        "Entity: Iran",
        "Industry: Semiconductor",
        "Topic: Export controls",
        "Topic: Regional policy",
      ],
      statusLabel: "Escalating",
      statusTone: "danger",
      summary:
        "Policy tightening across monitored markets is no longer a background variable; it is now changing execution assumptions in near-real planning windows.",
      title:
        "Export-control updates are compounding monitor-level supply exposure.",
    },
    {
      evidence: [
        "Freight repricing and buffering costs are beginning to affect quarterly margin assumptions.",
        "Working-capital exposure is rising as teams hold more inventory against timeline uncertainty.",
        "Input volatility is now appearing in both upstream and downstream operating estimates.",
      ],
      id: "analysis-economic",
      imageSrc: "/article-thumbs/economic.svg",
      label: "Cost and margin",
      note:
        "Current read: economic pressure is broadening from transport cost into capital planning.",
      pestelCategory: "Economic",
      publishedAt: "5h ago",
      publisher: "Market Continuity Brief",
      relevanceScore: 86,
      topicTags: [
        "Entity: Red Sea",
        "Industry: Logistics",
        "Topic: Freight rates",
        "Topic: Working capital",
      ],
      statusLabel: "Building",
      statusTone: "accent",
      summary:
        "The economic story is shifting from isolated cost spikes to sustained planning drag across procurement and fulfillment cycles.",
      title:
        "Shipping and inventory pressure are reducing confidence in short-cycle cost planning.",
    },
    {
      evidence: [
        "Workforce retention concerns are rising around high-pressure procurement and planning roles.",
        "Stakeholder sentiment is increasingly sensitive to perceived supply fragility.",
        "Internal teams are requesting more transparent monitor-level communication cadence.",
      ],
      id: "analysis-social",
      imageSrc: "/article-thumbs/social.svg",
      label: "Sentiment and behavior",
      note:
        "Current read: social signals are not primary risk drivers yet, but they are beginning to shape execution behavior.",
      pestelCategory: "Social",
      publishedAt: "7h ago",
      publisher: "Executive Risk Review",
      relevanceScore: 74,
      topicTags: [
        "Entity: Supplier network",
        "Topic: Workforce",
        "Topic: Stakeholder confidence",
        "Topic: Communication cadence",
      ],
      statusLabel: "Emerging",
      statusTone: "warning",
      summary:
        "Narrative pressure is starting to influence internal and partner decision timing, especially where confidence depends on clear continuity signals.",
      title:
        "Confidence and stakeholder sentiment are becoming execution variables.",
    },
    {
      evidence: [
        "Legacy planning tools are struggling to reconcile policy and logistics updates in one view.",
        "Teams are increasing manual triage effort to align fragmented risk inputs.",
        "Automation opportunities are clearer where monitor evidence is structured consistently.",
      ],
      id: "analysis-technological",
      imageSrc: "/article-thumbs/technological.svg",
      label: "Systems capability",
      note:
        "Current read: tooling limitations are amplifying response friction more than signal volume itself.",
      pestelCategory: "Technological",
      publishedAt: "9h ago",
      publisher: "Operational Systems Wire",
      relevanceScore: 81,
      topicTags: [
        "Industry: SaaS",
        "Topic: Workflow automation",
        "Topic: Signal orchestration",
        "Topic: Response latency",
      ],
      statusLabel: "Actionable",
      statusTone: "accent",
      summary:
        "Technology constraints are now visible as operating bottlenecks, especially in workflows that require cross-domain signal synthesis.",
      title:
        "Signal orchestration gaps are creating avoidable response latency.",
    },
    {
      evidence: [
        "Weather-linked disruptions continue to affect route reliability in key corridors.",
        "Energy input variability is showing up in supplier-side planning assumptions.",
        "Environmental constraints are reinforcing existing transit and sourcing vulnerabilities.",
      ],
      id: "analysis-environmental",
      imageSrc: "/article-thumbs/environmental.svg",
      label: "Climate and route stability",
      note:
        "Current read: environmental disruptions are reinforcing timing variability rather than creating a separate risk lane.",
      pestelCategory: "Environmental",
      publishedAt: "12h ago",
      publisher: "Route Reliability Monitor",
      relevanceScore: 79,
      topicTags: [
        "Entity: Maritime routes",
        "Topic: Weather disruption",
        "Topic: Energy variability",
        "Topic: Transit reliability",
      ],
      statusLabel: "Persistent",
      statusTone: "warning",
      summary:
        "Environmental patterns are increasingly relevant to continuity forecasting, particularly where routes and energy assumptions are already fragile.",
      title:
        "Environmental volatility is strengthening existing logistics pressure.",
    },
    {
      evidence: [
        "Contract terms around compliance and delivery obligations are being interpreted more strictly.",
        "Licensing language changes may require updated supplier screening workflows.",
        "Legal exposure is rising where policy updates and contractual commitments move out of sync.",
      ],
      id: "analysis-legal",
      imageSrc: "/article-thumbs/legal.svg",
      label: "Compliance and liability",
      note:
        "Current read: legal interpretation risk is becoming material in cross-border execution planning.",
      pestelCategory: "Legal",
      publishedAt: "14h ago",
      publisher: "Regulatory Intelligence Ledger",
      relevanceScore: 88,
      topicTags: [
        "Entity: Cross-border contracts",
        "Topic: Licensing",
        "Topic: Compliance obligations",
        "Topic: Liability exposure",
      ],
      statusLabel: "Heightened",
      statusTone: "danger",
      summary:
        "The legal layer is moving from passive compliance tracking to active operating risk, especially in supplier and delivery commitments.",
      title:
        "Compliance interpretation risk is rising across active supplier contracts.",
    },
  ],
  controlSummary:
    "Refine this monitor by keyword or review date, then update the reading surface without leaving the monitor-level context.",
  impactLayers: [
    {
      id: "impact-immediate",
      implications: [
        "Longer lead-time assumptions are becoming the operating default instead of the contingency case.",
        "Teams exposed to constrained equipment or key inputs may need earlier decision cycles.",
      ],
      label: "Immediate impact",
      summary:
        "The most immediate consequence is reduced confidence in sourcing and timing assumptions across the monitor.",
      title: "Execution pressure is increasing faster than direct cost pressure.",
    },
    {
      id: "impact-operating",
      implications: [
        "Procurement, logistics, and planning functions may need tighter coordination around the same exposure set.",
        "Escalation is warranted where the same suppliers or routes sit across multiple programs.",
      ],
      label: "Operating impact",
      summary:
        "The monitor is showing a clearer need for cross-functional review because separate disruptions are now affecting the same decisions.",
      title: "This is becoming a cross-functional coordination problem, not a single team issue.",
    },
    {
      id: "impact-strategic",
      implications: [
        "Monitor-level analysis should begin separating temporary volatility from persistent capability constraints.",
        "Strategic alternatives matter more if current friction starts to look policy-backed rather than temporary.",
      ],
      label: "Strategic impact",
      summary:
        "The longer-term question is whether the current pattern reflects temporary congestion or a more durable reduction in sourcing flexibility.",
      title: "The strategic question is shifting from disruption response to structural resilience.",
    },
  ],
  meta:
    "Sector monitor · Updated 18 minutes ago · Focused on equipment controls, shipping exposure, and downstream capacity risk",
  missedSinceLastReview: [
    {
      id: "missed-red-sea",
      label: "Since last review",
      summary:
        "Transit pressure is now about duration and predictability, not just a fresh incident spike.",
      title:
        "Carrier schedule revisions extended Red Sea timing assumptions for another weekly cycle.",
    },
    {
      id: "missed-licensing",
      label: "New policy signal",
      summary:
        "The shift is early but important because it reinforces the same supplier-concentration story already visible elsewhere on the screen.",
      title:
        "Licensing language around minerals processing became more explicit in a market tied to battery sourcing.",
    },
  ],
  monitorName: "East Asia semiconductor supply",
  savedEvents: [
    {
      id: "saved-controls",
      note:
        "Saved because it is the clearest trigger linking policy tightening to near-term execution risk.",
      sourceLabel: "Saved event",
      title: "Equipment export restrictions across two monitored markets",
    },
    {
      id: "saved-shipping",
      note:
        "Saved because it converts logistics pressure into a direct planning and working-capital issue.",
      sourceLabel: "Saved event",
      title: "Extended rerouting assumptions through the Red Sea corridor",
    },
    {
      id: "saved-minerals",
      note:
        "Saved because it may become the strategic follow-on pressure if current sourcing constraints persist.",
      sourceLabel: "Saved event",
      title: "Critical minerals policy tightening around local processing eligibility",
    },
  ],
  subtitle: "Comprehensive analysis and insights",
  timeframeOptions: [
    {
      active: false,
      id: "24h",
      label: "Last 24 hours",
      summary: "Best for immediate signal shifts.",
    },
    {
      active: true,
      id: "7d",
      label: "Last 7 days",
      summary: "The clearest balance of urgency and pattern.",
    },
    {
      active: false,
      id: "30d",
      label: "Last 30 days",
      summary: "Useful for checking whether this is structural.",
    },
  ],
};
