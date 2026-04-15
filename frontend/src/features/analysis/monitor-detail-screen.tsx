"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils/cn";
// import { CategoryTabs } from "@/components/modules/monitor-workspace/PageHeader";
import {
  FilterBar,
  type ArticleFilterOption,
} from "@/components/modules/monitor-workspace/FilterBar";
import { CategoryTabs } from "@/components/modules/monitor-workspace/CategoryTabs";
import {
  MonitorCard,
  type Article,
} from "@/components/modules/monitor-workspace/MonitorCard";
// import { TopNav } from "@/components/modules/monitor-workspace";
import { SideRail } from "@/components/modules/monitor-workspace/SideRail";
import { WorkspaceBreadcrumbs } from "@/components/modules/monitor-workspace/WorkspaceBreadcrumbs";
import { EmptyState } from "@/components/modules";

// ─── Types ────────────────────────────────────────────────────────────────────

type PestelCategory =
  | "Political"
  | "Economic"
  | "Social"
  | "Technological"
  | "Environmental"
  | "Legal";

type ArticleFilterId =
  | "high-priority"
  | "last-7-days"
  | "eu-policy"
  | "trade-policy"
  | "semiconductor"
  | "ai-regulation";

// ─── Constants ────────────────────────────────────────────────────────────────

const PESTEL_CATEGORIES: PestelCategory[] = [
  "Political",
  "Economic",
  "Social",
  "Technological",
  "Environmental",
  "Legal",
];

const PESTEL_ICONS: Record<PestelCategory, string> = {
  Political: "/tab-icons/political.svg",
  Economic: "/tab-icons/economic.svg",
  Social: "/tab-icons/social.svg",
  Technological: "/tab-icons/technological.svg",
  Environmental: "/tab-icons/environmental.svg",
  Legal: "/tab-icons/legal.svg",
};

const ARTICLE_THUMBS: Record<PestelCategory, string> = {
  Political: "/article-thumbs/political.svg",
  Economic: "/article-thumbs/economic.svg",
  Social: "/article-thumbs/social.svg",
  Technological: "/article-thumbs/technological.svg",
  Environmental: "/article-thumbs/environmental.svg",
  Legal: "/article-thumbs/legal.svg",
};

const APP_HEADER_HEIGHT = 80;
const HEADER_FADE_DISTANCE = 120;

const ARTICLE_FILTER_OPTIONS: ArticleFilterOption[] = [
  { id: "high-priority", label: "High Priority", group: "state" },
  { id: "last-7-days", label: "Last 7 Days", group: "state" },
  { id: "eu-policy", label: "EU Policy", group: "topic" },
  { id: "trade-policy", label: "Trade Policy", group: "topic" },
  { id: "semiconductor", label: "Semiconductor", group: "topic" },
  { id: "ai-regulation", label: "AI Regulation", group: "topic" },
];

function parseHoursAgo(value: string): number | null {
  const hourMatch = value.match(/^(\d+)h ago$/i);
  if (hourMatch) return Number(hourMatch[1]);

  const dayMatch = value.match(/^(\d+)d ago$/i);
  if (dayMatch) return Number(dayMatch[1]) * 24;

  return null;
}

function normalizeText(value: string): string {
  return value.toLowerCase();
}

function articleMatchesFilter(article: Article, filterId: ArticleFilterId): boolean {
  const haystack = normalizeText(
    `${article.title} ${article.summary} ${article.publisher} ${article.topicTags.join(" ")}`,
  );

  switch (filterId) {
    case "high-priority":
      return article.relevanceScore >= 85;
    case "last-7-days": {
      const hoursAgo = parseHoursAgo(article.publishedAt);
      return hoursAgo !== null ? hoursAgo <= 168 : true;
    }
    case "eu-policy":
      return haystack.includes("eu") || haystack.includes("europe");
    case "trade-policy":
      return haystack.includes("trade");
    case "semiconductor":
      return haystack.includes("semiconductor");
    case "ai-regulation":
      return haystack.includes("ai regulation") || haystack.includes("ai governance");
    default:
      return true;
  }
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  // Political
  {
    id: "pol-1",
    category: "Political",
    title: "EU Parliament Votes on AI Governance Framework",
    summary:
      "Landmark vote establishes binding rules for high-risk AI applications across member states. Enforcement mechanisms and compliance timelines confirmed with two-year transition window.",
    publisher: "Politico",
    publishedAt: "2h ago",
    relevanceScore: 92,
    topicTags: ["AI Regulation", "EU Policy", "Governance"],
    imageSrc: ARTICLE_THUMBS.Political,
  },
  {
    id: "pol-2",
    category: "Political",
    title: "G7 Nations Agree on Critical Infrastructure Protection",
    summary:
      "Joint declaration introduces coordinated screening procedures for foreign investments in critical technology sectors. New oversight body to review cross-border acquisitions.",
    publisher: "Reuters",
    publishedAt: "5h ago",
    relevanceScore: 88,
    topicTags: ["Critical Infrastructure", "G7", "Cybersecurity"],
    imageSrc: ARTICLE_THUMBS.Political,
  },
  {
    id: "pol-3",
    category: "Political",
    title: "US Senate Committee Reviews Export Control Amendments",
    summary:
      "Proposed amendments extend export control scope to include advanced semiconductor packaging and AI-optimised hardware. Licensing exemptions under review for allied nation transfers.",
    publisher: "The Hill",
    publishedAt: "8h ago",
    relevanceScore: 85,
    topicTags: ["Export Controls", "Trade Policy", "Semiconductor"],
    imageSrc: ARTICLE_THUMBS.Political,
  },
  {
    id: "pol-4",
    category: "Political",
    title: "China Announces New Data Localisation Mandates",
    summary:
      "Expanded data residency requirements affect multinational operations across financial services, healthcare, and logistics. Implementation window set for Q3 2026.",
    publisher: "Financial Times",
    publishedAt: "11h ago",
    relevanceScore: 83,
    topicTags: ["Data Localisation", "China Policy", "Compliance"],
    imageSrc: ARTICLE_THUMBS.Political,
  },
  {
    id: "pol-5",
    category: "Political",
    title: "UK Digital Markets Bill Passes Second Reading",
    summary:
      "Legislation introduces ex-ante obligations for strategic market status designees. Interoperability and self-preferencing provisions to reshape platform dynamics.",
    publisher: "BBC News",
    publishedAt: "14h ago",
    relevanceScore: 79,
    topicTags: ["Digital Markets", "Competition", "Regulation"],
    imageSrc: ARTICLE_THUMBS.Political,
  },
  {
    id: "pol-6",
    category: "Political",
    title: "India Updates Foreign Investment Policy in Tech Sector",
    summary:
      "Revised FDI rules introduce conditional approval pathways for sensitive technology investments. Data centres and cloud infrastructure classified under new oversight tier.",
    publisher: "Economic Times",
    publishedAt: "18h ago",
    relevanceScore: 76,
    topicTags: ["FDI", "India", "Technology Investment"],
    imageSrc: ARTICLE_THUMBS.Political,
  },
  {
    id: "pol-7",
    category: "Political",
    title: "NATO Expands Technology Cooperation Agreement",
    summary:
      "Alliance widens scope of joint research and procurement frameworks for dual-use emerging technologies. Quantum communications and autonomous systems prioritised.",
    publisher: "Defense News",
    publishedAt: "22h ago",
    relevanceScore: 73,
    topicTags: ["NATO", "Technology", "Defense"],
    imageSrc: ARTICLE_THUMBS.Political,
  },
  {
    id: "pol-8",
    category: "Political",
    title: "ASEAN Digital Economy Agreement Ratified",
    summary:
      "Framework facilitates cross-border data flows and digital trade among member states. E-commerce dispute resolution mechanisms and interoperability standards included.",
    publisher: "Asia Times",
    publishedAt: "26h ago",
    relevanceScore: 70,
    topicTags: ["ASEAN", "Digital Economy", "Trade Agreement"],
    imageSrc: ARTICLE_THUMBS.Political,
  },

  // Economic
  {
    id: "eco-1",
    category: "Economic",
    title: "ECB Maintains Interest Rates Amid Eurozone Growth Concerns",
    summary:
      "Decision affects borrowing costs across the eurozone and has immediate implications for business investment planning. Forward guidance signals extended hold period.",
    publisher: "Bloomberg",
    publishedAt: "1h ago",
    relevanceScore: 94,
    topicTags: ["ECB", "Interest Rates", "Eurozone"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-2",
    category: "Economic",
    title: "Tech Sector Faces New Corporate Tax Framework",
    summary:
      "New minimum tax rates for multinational corporations finalised. Digital services tax implementation delayed pending international agreement on profit allocation mechanisms.",
    publisher: "Financial Times",
    publishedAt: "6h ago",
    relevanceScore: 86,
    topicTags: ["Taxation", "Digital Services", "Compliance"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-3",
    category: "Economic",
    title: "Global Supply Chain Costs Rise 23% in Q1 2026",
    summary:
      "Logistics inflation accelerates beyond commodity repricing, driven by infrastructure bottlenecks and labour market tightness in key transit hubs.",
    publisher: "Wall Street Journal",
    publishedAt: "4h ago",
    relevanceScore: 89,
    topicTags: ["Supply Chain", "Costs", "Q1 2026"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-4",
    category: "Economic",
    title: "Inflation Data Surprises to the Downside in Eurozone",
    summary:
      "Headline CPI prints below consensus for the second consecutive month. Services inflation remains elevated, complicating the disinflation narrative for policymakers.",
    publisher: "Reuters",
    publishedAt: "7h ago",
    relevanceScore: 82,
    topicTags: ["Inflation", "Eurozone", "Economic Data"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-5",
    category: "Economic",
    title: "Venture Capital Investment Surges in AI Infrastructure",
    summary:
      "Q1 deal volume exceeds prior year total as hyperscaler commitments crowd in private capital. Data centre and compute infrastructure attract the largest allocations.",
    publisher: "TechCrunch",
    publishedAt: "9h ago",
    relevanceScore: 78,
    topicTags: ["Venture Capital", "AI Infrastructure", "Investment"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-6",
    category: "Economic",
    title: "Semiconductor Equipment Orders Decline for Third Quarter",
    summary:
      "Order contraction reflects inventory digestion in legacy nodes while advanced node capacity investment remains elevated. Regional concentration in Taiwan and South Korea persists.",
    publisher: "Nikkei",
    publishedAt: "11h ago",
    relevanceScore: 77,
    topicTags: ["Semiconductor", "Equipment Orders", "Manufacturing"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-7",
    category: "Economic",
    title: "Federal Reserve Minutes Signal Extended Rate Hold",
    summary:
      "Committee members broadly support maintaining current policy stance. Labour market resilience and inflation uncertainty cited as primary factors delaying any easing.",
    publisher: "New York Times",
    publishedAt: "13h ago",
    relevanceScore: 75,
    topicTags: ["Federal Reserve", "Monetary Policy", "Rates"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-8",
    category: "Economic",
    title: "Energy Transition Costs Accelerating for Industrial Sector",
    summary:
      "Capital requirements for industrial decarbonisation exceed earlier projections. Carbon accounting obligations intensify procurement and operational planning complexity.",
    publisher: "Bloomberg",
    publishedAt: "15h ago",
    relevanceScore: 73,
    topicTags: ["Energy Transition", "Industrial", "Costs"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-9",
    category: "Economic",
    title: "European Banks Report Rising Exposure to Tech Sector",
    summary:
      "Loan book concentration in technology credits increases for the fifth consecutive quarter. Supervisory guidance flags concentration risk in AI infrastructure lending.",
    publisher: "Financial Times",
    publishedAt: "17h ago",
    relevanceScore: 72,
    topicTags: ["Banking", "Tech Exposure", "Risk"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-10",
    category: "Economic",
    title: "Currency Volatility Impacts Cross-Border Supply Agreements",
    summary:
      "Spot rate swings create contract renegotiation pressure in multi-year supply agreements denominated in mixed currencies. Hedging costs rising materially.",
    publisher: "Reuters",
    publishedAt: "20h ago",
    relevanceScore: 70,
    topicTags: ["Currency", "Supply", "Cross-Border"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-11",
    category: "Economic",
    title: "IMF Revises Global Growth Forecast Downward",
    summary:
      "Updated projections reflect tighter financial conditions, trade fragmentation, and lower productivity growth in advanced economies. Emerging market divergence widens.",
    publisher: "IMF News",
    publishedAt: "23h ago",
    relevanceScore: 69,
    topicTags: ["IMF", "Growth Forecast", "Global Economy"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },
  {
    id: "eco-12",
    category: "Economic",
    title: "Corporate Bond Markets Show Signs of Financial Stress",
    summary:
      "Spread widening in high-yield segments accelerates following a series of earnings misses. Refinancing risk elevated for issuers with near-term maturity walls.",
    publisher: "Bloomberg",
    publishedAt: "28h ago",
    relevanceScore: 67,
    topicTags: ["Corporate Bonds", "Markets", "Credit"],
    imageSrc: ARTICLE_THUMBS.Economic,
  },

  // Social
  {
    id: "soc-1",
    category: "Social",
    title: "Digital Inclusion Initiative Launched Across EU",
    summary:
      "New programme aims to bridge the digital divide with €2B funding for broadband infrastructure in rural areas. Focus on elderly populations and underserved communities to ensure equitable access to digital services.",
    publisher: "Reuters",
    publishedAt: "4h ago",
    relevanceScore: 78,
    topicTags: ["Digital Inclusion", "Infrastructure", "Equity"],
    imageSrc: ARTICLE_THUMBS.Social,
  },
  {
    id: "soc-2",
    category: "Social",
    title: "Workforce Automation Anxiety Rising Among Manufacturing Workers",
    summary:
      "Survey data shows 62% of manufacturing workers express concern about automation displacing roles within three years. Reskilling programme uptake remains below government targets.",
    publisher: "The Guardian",
    publishedAt: "8h ago",
    relevanceScore: 74,
    topicTags: ["Automation", "Workforce", "Manufacturing"],
    imageSrc: ARTICLE_THUMBS.Social,
  },
  {
    id: "soc-3",
    category: "Social",
    title: "Tech Skills Gap Widens as AI Adoption Accelerates",
    summary:
      "Demand for AI and data engineering roles grows 3x faster than the available talent pool. Universities and bootcamps expand capacity but structural imbalance persists through 2028.",
    publisher: "Harvard Business Review",
    publishedAt: "12h ago",
    relevanceScore: 71,
    topicTags: ["Skills Gap", "AI", "Talent"],
    imageSrc: ARTICLE_THUMBS.Social,
  },
  {
    id: "soc-4",
    category: "Social",
    title: "Remote Work Policy Fragmentation Creates Compliance Challenges",
    summary:
      "Cross-border remote arrangements trigger tax nexus, employment law, and data transfer obligations in multiple jurisdictions simultaneously. HR compliance costs escalating.",
    publisher: "Bloomberg",
    publishedAt: "16h ago",
    relevanceScore: 68,
    topicTags: ["Remote Work", "Compliance", "HR Policy"],
    imageSrc: ARTICLE_THUMBS.Social,
  },
  {
    id: "soc-5",
    category: "Social",
    title: "Gen Z Workforce Demands Reshape Corporate Tech Strategy",
    summary:
      "Preference for modern tooling and AI-augmented workflows influences platform procurement decisions. Organisations with legacy stacks report measurable impact on talent retention metrics.",
    publisher: "Fast Company",
    publishedAt: "20h ago",
    relevanceScore: 65,
    topicTags: ["Gen Z", "Workforce", "Strategy"],
    imageSrc: ARTICLE_THUMBS.Social,
  },

  // Technological
  {
    id: "tech-1",
    category: "Technological",
    title: "NVIDIA Unveils Next-Generation AI Chip Architecture",
    summary:
      "Blackwell Ultra delivers a 4x performance-per-watt improvement over prior generation. Supply allocation prioritises hyperscaler partners with broader availability expected in Q4 2026.",
    publisher: "The Verge",
    publishedAt: "2h ago",
    relevanceScore: 96,
    topicTags: ["NVIDIA", "AI Chips", "GPU"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-2",
    category: "Technological",
    title: "6G Research Consortium Established",
    summary:
      "Major European telecommunications companies form alliance for next-generation wireless technology. €500M investment targets 2030 commercial deployment with focus on IoT and autonomous systems.",
    publisher: "TechCrunch",
    publishedAt: "1h ago",
    relevanceScore: 91,
    topicTags: ["5G/6G", "Telecommunications", "Innovation"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-3",
    category: "Technological",
    title: "Quantum Computing Breakthrough Announced",
    summary:
      "European research institute demonstrates error-corrected quantum computing at scale. Breakthrough could accelerate commercial applications in cryptography, materials science, and drug discovery.",
    publisher: "Nature",
    publishedAt: "5h ago",
    relevanceScore: 94,
    topicTags: ["Quantum", "Research", "Computing"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-4",
    category: "Technological",
    title: "Open Source Foundation Releases Critical Security Patch",
    summary:
      "Vulnerability affecting widely-deployed cryptographic library patched after coordinated disclosure. Exploitation in the wild confirmed; immediate upgrade recommended for affected deployments.",
    publisher: "GitHub Blog",
    publishedAt: "3h ago",
    relevanceScore: 88,
    topicTags: ["Open Source", "Security", "Patch"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-5",
    category: "Technological",
    title: "Autonomous Systems Testing Expands to Urban Environments",
    summary:
      "Regulatory sandboxes in three European cities enable real-world trials for logistics and mobility applications. Safety framework updates expected before full commercial deployment.",
    publisher: "MIT Tech Review",
    publishedAt: "7h ago",
    relevanceScore: 85,
    topicTags: ["Autonomous Systems", "Urban", "Testing"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-6",
    category: "Technological",
    title: "Cloud Hyperscalers Report Record Data Centre Energy Demand",
    summary:
      "AI workload growth drives electricity consumption beyond grid capacity planning assumptions. Power purchase agreements and on-site generation investments accelerate significantly.",
    publisher: "Wired",
    publishedAt: "9h ago",
    relevanceScore: 83,
    topicTags: ["Cloud", "Data Centres", "Energy"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-7",
    category: "Technological",
    title: "Edge Computing Adoption Accelerates in Industrial IoT",
    summary:
      "Manufacturers deploy localised compute to reduce latency and address data sovereignty requirements. Integration complexity with legacy operational technology systems remains a primary challenge.",
    publisher: "IEEE Spectrum",
    publishedAt: "11h ago",
    relevanceScore: 81,
    topicTags: ["Edge Computing", "IoT", "Industrial"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-8",
    category: "Technological",
    title: "Cybersecurity Framework Updated for Critical Infrastructure",
    summary:
      "NIST releases version 2.1 with expanded guidance on AI system security and supply chain risk management. Alignment with EU NIS2 Directive requirements facilitates cross-border compliance.",
    publisher: "NIST",
    publishedAt: "13h ago",
    relevanceScore: 80,
    topicTags: ["Cybersecurity", "NIST", "Critical Infrastructure"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-9",
    category: "Technological",
    title: "Generative AI Integration Costs Fall 40% Year-over-Year",
    summary:
      "Inference costs decline as model efficiency improves and competition among providers intensifies. Enterprise adoption acceleration expected to follow cost normalisation.",
    publisher: "a16z",
    publishedAt: "15h ago",
    relevanceScore: 79,
    topicTags: ["Generative AI", "Costs", "Enterprise"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-10",
    category: "Technological",
    title: "Chip Manufacturing Yield Rates Improve with New Litho Process",
    summary:
      "High-NA EUV adoption drives meaningful yield improvements at sub-2nm process nodes. Equipment lead times remain extended but improving as vendor capacity expands.",
    publisher: "AnandTech",
    publishedAt: "17h ago",
    relevanceScore: 77,
    topicTags: ["Chip Manufacturing", "Yield", "Process Technology"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-11",
    category: "Technological",
    title: "Digital Twin Adoption Grows in Aerospace Supply Chains",
    summary:
      "Real-time simulation of supplier networks enables faster disruption response and maintenance planning. Integration with ERP and MES systems cited as the primary implementation bottleneck.",
    publisher: "Aerospace Technology",
    publishedAt: "19h ago",
    relevanceScore: 75,
    topicTags: ["Digital Twins", "Aerospace", "Supply Chain"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-12",
    category: "Technological",
    title: "API Security Vulnerabilities Exposed in Major Cloud Platforms",
    summary:
      "Research identifies privilege escalation vectors in multi-tenant API gateway configurations. Vendors have issued patches; independent audit of exposed services recommended.",
    publisher: "SecurityWeek",
    publishedAt: "21h ago",
    relevanceScore: 74,
    topicTags: ["API Security", "Cloud", "Vulnerabilities"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-13",
    category: "Technological",
    title: "Battery Technology Milestone Reached for EV Applications",
    summary:
      "Solid-state cell achieves 500Wh/kg energy density in production-ready format. Commercial availability projected for 2028 pending yield optimisation and cost reduction.",
    publisher: "Electrek",
    publishedAt: "24h ago",
    relevanceScore: 72,
    topicTags: ["Battery Tech", "EV", "Energy Storage"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-14",
    category: "Technological",
    title: "Satellite Internet Penetration Accelerates in Emerging Markets",
    summary:
      "Low-Earth orbit constellation expansion brings low-latency broadband to previously unconnected regions. Regulatory coordination with terrestrial spectrum holders remains ongoing.",
    publisher: "Space News",
    publishedAt: "28h ago",
    relevanceScore: 70,
    topicTags: ["Satellite", "Internet", "Emerging Markets"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },
  {
    id: "tech-15",
    category: "Technological",
    title: "Biometric Standards Updated for Cross-Border Identity",
    summary:
      "ICAO and IATA align on next-generation travel document and biometric verification protocols. Implementation timelines vary by jurisdiction with 2027 as common target.",
    publisher: "IATA",
    publishedAt: "32h ago",
    relevanceScore: 68,
    topicTags: ["Biometrics", "Identity", "Standards"],
    imageSrc: ARTICLE_THUMBS.Technological,
  },

  // Environmental
  {
    id: "env-1",
    category: "Environmental",
    title: "Carbon Border Adjustment Mechanism Takes Effect",
    summary:
      "EU begins phased implementation of carbon tariffs on imported goods. Initial focus on cement, steel, and aluminium sectors with expansion to chemicals and plastics planned for 2027.",
    publisher: "The Guardian",
    publishedAt: "7h ago",
    relevanceScore: 87,
    topicTags: ["Climate", "Trade", "Sustainability"],
    imageSrc: ARTICLE_THUMBS.Environmental,
  },
  {
    id: "env-2",
    category: "Environmental",
    title: "Extreme Weather Events Disrupt Global Logistics Networks",
    summary:
      "Flood events across Asia and drought conditions in Southern Europe combine to affect maritime and overland freight corridors simultaneously. Lead-time variability at multi-year high.",
    publisher: "Reuters",
    publishedAt: "14h ago",
    relevanceScore: 84,
    topicTags: ["Extreme Weather", "Logistics", "Disruption"],
    imageSrc: ARTICLE_THUMBS.Environmental,
  },
  {
    id: "env-3",
    category: "Environmental",
    title: "Renewable Energy Mandates Reshape Industrial Procurement",
    summary:
      "New clean power purchasing requirements for large industrial consumers accelerate corporate PPA activity. Grid reliability concerns persist in markets with fast-declining fossil fuel capacity.",
    publisher: "Bloomberg Green",
    publishedAt: "21h ago",
    relevanceScore: 76,
    topicTags: ["Renewable Energy", "Industrial", "Procurement"],
    imageSrc: ARTICLE_THUMBS.Environmental,
  },

  // Legal
  {
    id: "leg-1",
    category: "Legal",
    title: "EU AI Act Implementation Timeline Confirmed",
    summary:
      "Commission clarifies phased obligations calendar with prohibited practices enforcement from August 2026. High-risk system providers face mandatory conformity assessments and registration.",
    publisher: "Politico",
    publishedAt: "3h ago",
    relevanceScore: 92,
    topicTags: ["AI Act", "EU", "Implementation"],
    imageSrc: ARTICLE_THUMBS.Legal,
  },
  {
    id: "leg-2",
    category: "Legal",
    title: "Antitrust Investigation Opens Against Major Cloud Provider",
    summary:
      "Regulator initiates formal investigation into bundling and switching barrier practices. Preliminary findings expected within 12 months with remedies potentially requiring structural changes.",
    publisher: "Reuters",
    publishedAt: "6h ago",
    relevanceScore: 88,
    topicTags: ["Antitrust", "Cloud", "Competition"],
    imageSrc: ARTICLE_THUMBS.Legal,
  },
  {
    id: "leg-3",
    category: "Legal",
    title: "Data Privacy Framework Updated with Stricter Consent Rules",
    summary:
      "GDPR amendments introduce enhanced user consent mechanisms and stricter penalties for violations. Tech companies must update privacy policies and consent flows by Q3 2026.",
    publisher: "Bloomberg",
    publishedAt: "8h ago",
    relevanceScore: 85,
    topicTags: ["Privacy", "GDPR", "Compliance"],
    imageSrc: ARTICLE_THUMBS.Legal,
  },
  {
    id: "leg-4",
    category: "Legal",
    title: "Supply Chain Due Diligence Law Expands Scope in Germany",
    summary:
      "Lieferkettensorgfaltspflichtengesetz amendments extend obligations to companies with over 500 employees. Environmental due diligence requirements now align with forthcoming EU Corporate Sustainability Directive.",
    publisher: "DW",
    publishedAt: "11h ago",
    relevanceScore: 83,
    topicTags: ["Due Diligence", "Supply Chain", "Germany"],
    imageSrc: ARTICLE_THUMBS.Legal,
  },
  {
    id: "leg-5",
    category: "Legal",
    title: "Intellectual Property Framework for AI-Generated Content Updated",
    summary:
      "Guidance clarifies authorship, originality, and infringement liability thresholds for AI-assisted creation. Training data provenance documentation now required for registered copyright claims.",
    publisher: "LegalTech News",
    publishedAt: "16h ago",
    relevanceScore: 79,
    topicTags: ["IP", "AI Content", "Copyright"],
    imageSrc: ARTICLE_THUMBS.Legal,
  },
  {
    id: "leg-6",
    category: "Legal",
    title: "Cross-Border Data Transfer Agreement Stalled in Negotiations",
    summary:
      "US–EU data adequacy framework negotiations face delays over surveillance concerns. Potential impact on cloud services and international data flows for affected organisations.",
    publisher: "Wall Street Journal",
    publishedAt: "12h ago",
    relevanceScore: 81,
    topicTags: ["Data", "International", "Cloud"],
    imageSrc: ARTICLE_THUMBS.Legal,
  },
  {
    id: "leg-7",
    category: "Legal",
    title: "Export Licence Requirements Tightened for Dual-Use Tech",
    summary:
      "Updated control list includes additional categories of AI accelerators and advanced sensor systems. Expanded end-user verification obligations apply to direct and indirect transfers.",
    publisher: "Export Compliance Daily",
    publishedAt: "20h ago",
    relevanceScore: 77,
    topicTags: ["Export Compliance", "Dual-Use", "Technology"],
    imageSrc: ARTICLE_THUMBS.Legal,
  },
];

// ─── Remaining Local Section Component ────────────────────────────────────────

function PestelSection({
  category,
  articles,
  isCondensed,
  stickyTop,
  sectionRef,
}: {
  category: PestelCategory;
  articles: Article[];
  isCondensed: boolean;
  stickyTop: number;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  return (
    <section
      ref={(el) => {
        sectionRef(el);
      }}
      className="scroll-mt-32"
      aria-label={`${category} articles`}
    >
      <div className="flex flex-col gap-[var(--space-4)]">
        {articles.map((article, index) => (
          <MonitorCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function MonitorDetailScreen() {
  const [activeTab, setActiveTab] = useState<PestelCategory>("Political");
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<ArticleFilterId[]>(["high-priority", "eu-policy"]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tabsHeight, setTabsHeight] = useState(0);
  const [headerOffset, setHeaderOffset] = useState(APP_HEADER_HEIGHT);
  const sectionRefs = useRef<Partial<Record<PestelCategory, HTMLElement>>>({});
  const tabsRef = useRef<HTMLDivElement | null>(null);

  const filteredArticles = ARTICLES.filter((article) => {
    const normalizedQuery = normalizeText(query.trim());
    const searchableContent = normalizeText(
      `${article.title} ${article.summary} ${article.publisher} ${article.topicTags.join(" ")}`,
    );

    const matchesQuery = normalizedQuery
      ? searchableContent.includes(normalizedQuery)
      : true;

    const stateFilters = activeFilters.filter((filterId) =>
      ARTICLE_FILTER_OPTIONS.find((option) => option.id === filterId)?.group === "state",
    );
    const topicFilters = activeFilters.filter((filterId) =>
      ARTICLE_FILTER_OPTIONS.find((option) => option.id === filterId)?.group === "topic",
    );

    const matchesStateFilters = stateFilters.every((filterId) =>
      articleMatchesFilter(article, filterId),
    );
    const matchesTopicFilters =
      topicFilters.length === 0 ||
      topicFilters.some((filterId) => articleMatchesFilter(article, filterId));

    return matchesQuery && matchesStateFilters && matchesTopicFilters;
  });

  const groupedArticles = PESTEL_CATEGORIES.reduce<Record<PestelCategory, Article[]>>(
    (acc, cat) => {
      acc[cat] = filteredArticles.filter((a) => a.category === cat).slice(0, 6);
      return acc;
    },
    {
      Political: [],
      Economic: [],
      Social: [],
      Technological: [],
      Environmental: [],
      Legal: [],
    },
  );

  const counts = PESTEL_CATEGORIES.reduce<Record<PestelCategory, number>>(
    (acc, cat) => {
      acc[cat] = groupedArticles[cat].length;
      return acc;
    },
    {
      Political: 0,
      Economic: 0,
      Social: 0,
      Technological: 0,
      Environmental: 0,
      Legal: 0,
    },
  );

  const visibleCategories = PESTEL_CATEGORIES.filter(
    (category) => groupedArticles[category].length > 0,
  );
  const resolvedActiveTab = visibleCategories.includes(activeTab)
    ? activeTab
    : visibleCategories[0] ?? "Political";

  const isStickyHeaderCondensed = scrollProgress > 2;
  const tabsStickyTop = headerOffset;
  const stickyStackOffset = tabsStickyTop + (tabsHeight || 74);

  useEffect(() => {
    const update = () => {
      const currentScroll = window.scrollY;
      const maxScrollable = document.body.scrollHeight - window.innerHeight;

      setScrollProgress(
        Math.round((currentScroll / maxScrollable) * 100),
      );
      setHeaderOffset(
        APP_HEADER_HEIGHT *
          Math.max(0, 1 - currentScroll / HEADER_FADE_DISTANCE),
      );
    };

    window.addEventListener("scroll", update);
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const update = () => {
      setTabsHeight(el.getBoundingClientRect().height);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    visibleCategories.forEach((category) => {
      const el = sectionRefs.current[category];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(category);
          }
        },
        {
          threshold: 0,
          rootMargin: `-${stickyStackOffset + 12}px 0px -50% 0px`,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [stickyStackOffset, visibleCategories]);

  const scrollToSection = useCallback((category: PestelCategory) => {
    const el = sectionRefs.current[category];
    if (!el) return;

    const top =
      el.getBoundingClientRect().top + window.scrollY - stickyStackOffset - 12;

    window.scrollTo({ top, behavior: "smooth" });
  }, [stickyStackOffset]);

  const setSectionRef = useCallback(
    (category: PestelCategory) => (el: HTMLElement | null) => {
      if (el) sectionRefs.current[category] = el;
    },
    [],
  );

  const toggleFilter = (filterId: string) => {
    setActiveFilters((current) =>
      current.includes(filterId as ArticleFilterId)
        ? current.filter((item) => item !== filterId)
        : [...current, filterId as ArticleFilterId],
    );
  };

  const clearAllFilters = () => {
    setQuery("");
    setActiveFilters([]);
  };

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-50 h-[3px]"
        style={{
          background:
            "color-mix(in srgb, var(--color-accent-primary) 20%, transparent)",
        }}
      >
        <motion.div
          className="h-full"
          style={{
            width: `${scrollProgress}%`,
            background: "var(--color-accent-primary)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </div>
      {/* <TopNav /> */}


      <div className="flex">
        <SideRail />
        <main
          className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pb-10 pt-28 md:px-8 md:pb-12 md:pt-32 xl:px-10"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="mx-auto w-full max-w-[1220px]">
            <div className="mb-8 flex flex-col gap-5 md:mb-10">
              <WorkspaceBreadcrumbs />

              <div className="max-w-[840px]">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-text-muted)]">
                  Monitor
                </div>
                <h1 className="max-w-[12ch] text-[2.35rem] font-semibold leading-[1] tracking-[-0.04em] text-[color:var(--color-text-primary)] md:text-[3.4rem]">
                  EU Regulation
                </h1>
                <p className="mt-3 max-w-[40rem] text-[1.05rem] leading-8 text-[color:var(--color-text-muted)] md:text-[1.125rem]">
                  Comprehensive analysis and insights across active regulatory
                  developments, emerging pressure points, and the signals most
                  likely to shape the next round of decisions.
                </p>
              </div>
            </div>

            <FilterBar
              activeFilters={activeFilters}
              filterOptions={ARTICLE_FILTER_OPTIONS}
              onClearAll={clearAllFilters}
              onQueryChange={setQuery}
              onRemoveFilter={toggleFilter}
              onToggleFilter={toggleFilter}
              query={query}
              resultCount={filteredArticles.length}
            />
          </div>

          <div className="mx-auto mt-6 flex w-full max-w-[1220px] flex-col border-0 md:mt-8">
            <div
              className="glass-panel relative rounded-[16px] border px-2 pt-2 pb-2"
              style={{
                background: 'var(--monitor-pestel-shell-bg)',
                borderColor: 'var(--monitor-pestel-shell-border)',
                boxShadow: 'var(--monitor-pestel-shell-shadow)',
                backdropFilter: 'var(--monitor-panel-backdrop)',
              }}
            >
              <CategoryTabs
                activeTab={resolvedActiveTab}
                counts={counts}
                onTabClick={scrollToSection}
                stickyTop={tabsStickyTop}
                tabsRef={tabsRef}
              />
              {filteredArticles.length > 0 && (
                <div className="flex items-center gap-[var(--space-3)] px-2 pt-3 pb-2">
                  <motion.div
                    whileHover={{ scale: 1.18, rotate: -8 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        resolvedActiveTab === "Political"
                          ? "rgba(59, 40, 204, 0.08)"
                          : resolvedActiveTab === "Economic"
                          ? "rgba(0, 120, 212, 0.08)"
                          : resolvedActiveTab === "Social"
                          ? "rgba(0, 184, 212, 0.08)"
                          : resolvedActiveTab === "Technological"
                          ? "rgba(120, 72, 232, 0.08)"
                          : resolvedActiveTab === "Environmental"
                          ? "rgba(34, 197, 94, 0.08)"
                          : resolvedActiveTab === "Legal"
                          ? "rgba(16, 24, 40, 0.08)"
                          : "rgba(59, 40, 204, 0.08)",
                    }}
                  >
                    <Image
                      alt=""
                      aria-hidden="true"
                      className="opacity-95 [image-rendering:crisp-edges]"
                      height={22}
                      src={PESTEL_ICONS[resolvedActiveTab]}
                      width={22}
                    />
                  </motion.div>
                  <motion.h2 className="[font-family:var(--font-family-heading)] text-2xl font-semibold leading-none tracking-[-0.02em] text-[#3B28CC] group-hover:text-[#2B1FA2] transition-colors">
                    {resolvedActiveTab}
                  </motion.h2>
                  <span
                    className="text-sm font-medium text-[#3B28CC]/80 group-hover:text-[#2B1FA2] transition-colors"
                  >
                    {groupedArticles[resolvedActiveTab].length} article{groupedArticles[resolvedActiveTab].length !== 1 ? "s" : ""}
                  </span>
                  <div className="ml-auto hidden h-px flex-1 sm:block" style={{ background: "#E0E7FF" }} />
                </div>
              )}
            </div>
            <div className="h-6" />

            {filteredArticles.length === 0 ? (
              <div className="pt-8">
                <EmptyState
                  eyebrow="No Matches"
                  title="No articles match the current search and filters."
                  description="Try removing one of the topic filters, broadening the search query, or clearing all filters to return to the full monitor scan."
                  tone="subtle"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-12">
                {visibleCategories.map((category) => (
                  <PestelSection
                    key={category}
                    category={category}
                    articles={groupedArticles[category]}
                    isCondensed={isStickyHeaderCondensed}
                    stickyTop={stickyStackOffset}
                    sectionRef={setSectionRef(category)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
