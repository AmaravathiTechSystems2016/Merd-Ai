"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useScroll,
} from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Bookmark,
  Calendar,
  Edit3,
  ExternalLink,
  Landmark,
  Scale,
  Search,
  Sparkles,
  TrendingUp,
  TreePine,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type PestelCategory =
  | "Political"
  | "Economic"
  | "Social"
  | "Technological"
  | "Environmental"
  | "Legal";

interface Article {
  id: string;
  title: string;
  summary: string;
  publisher: string;
  publishedAt: string;
  relevanceScore: number;
  topicTags: string[];
  imageSrc: string;
  category: PestelCategory;
}

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

function resolveArticleImage(article: Article): string {
  return `https://picsum.photos/seed/${article.id}/384/256`;
}

function getTooltipMessage(score: number): string {
  if (score >= 90) return "Critical relevance — Immediate strategic impact";
  if (score >= 80) return "High relevance — Significant business implications";
  if (score >= 70) return "Moderate relevance — Worth monitoring closely";
  return "Standard relevance — Background awareness";
}

function formatPublishedAt(value: string): string {
  const hourMatch = value.match(/^(\d+)h ago$/i);

  if (hourMatch) {
    const hours = Number(hourMatch[1]);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  return value;
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBadge({
  articleId,
  score,
}: {
  articleId: string;
  score: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <motion.div
        className="cursor-default rounded-lg px-3 py-1 text-sm font-semibold"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-accent-primary) 10%, transparent)",
          color: "var(--color-accent-primary)",
        }}
      >
        {score}
      </motion.div>

      <AnimatePresence>
        {visible && (
          <motion.div
            key={`tooltip-${articleId}`}
            className="pointer-events-none absolute bottom-full right-0 z-20 mb-2 w-64 rounded-[12px] px-4 py-3 text-xs shadow-xl"
            style={{
              backgroundColor: "var(--color-text-primary)",
              color: "var(--color-text-inverse)",
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Arrow */}
            <div
              className="absolute right-3 h-0 w-0"
              style={{
                top: "100%",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "6px solid var(--color-text-primary)",
              }}
            />
            <p className="text-[0.75rem] font-bold leading-none">Relevance Score</p>
            <p className="mt-1.5 text-[0.75rem] leading-snug" style={{ opacity: 0.82 }}>
              {getTooltipMessage(score)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ArticleCard({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  const cardRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-120px" });

  return (
    <motion.article
      ref={cardRef}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)] shadow-sm transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="flex gap-6 p-6">
        {/* Thumbnail */}
        <motion.div
          className="h-[132px] w-48 shrink-0 overflow-hidden rounded-[12px] bg-[color:var(--color-surface-subtle)]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            alt={article.title}
            className="h-full w-full object-cover"
            height={132}
            src={resolveArticleImage(article)}
            width={192}
          />
        </motion.div>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Title row */}
          <div className="mb-3 flex items-start gap-3">
            <motion.button
              className="mb-2 w-fit cursor-pointer text-left text-lg font-semibold text-[color:var(--color-text-primary)] hover:text-[color:var(--color-accent-primary)]"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              type="button"
            >
              {article.title}
            </motion.button>
          </div>

          {/* Summary */}
          <p
            className="mb-4 line-clamp-2 text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            {article.summary}
          </p>

          <div className="mt-auto">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <span>{article.publisher}</span>
              <span>•</span>
              <span>{formatPublishedAt(article.publishedAt)}</span>
            </div>

            {/* Actions */}
            <div
              className="mt-5 flex items-start justify-between gap-4 border-t pt-5"
              style={{ borderColor: "var(--color-border-subtle)" }}
            >
              <div className="flex items-center gap-3">
                <motion.button
                  className="flex items-center gap-1 text-sm transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  whileHover={{ scale: 1.05, color: "var(--color-accent-primary)" }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                >
                  <Bookmark size={16} />
                  <span>Save</span>
                </motion.button>

                <motion.button
                  className="flex items-center gap-1 text-sm transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  whileHover={{ scale: 1.05, color: "var(--color-accent-primary)" }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                >
                  <ExternalLink size={16} />
                  <span>Open</span>
                </motion.button>

                <motion.button
                  className="flex items-center gap-1 text-sm transition-colors"
                  style={{ color: "var(--color-accent-primary)" }}
                  whileHover={{ scale: 1.05, opacity: 0.8 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                >
                  <TrendingUp size={16} />
                  <span>Deep dive</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex flex-wrap justify-end gap-2">
                  {article.topicTags.map((tag) => (
                    <motion.span
                      key={tag}
                      className="rounded-full px-3 py-1 text-xs"
                      style={{
                        backgroundColor: "var(--color-surface-subtle)",
                        color: "var(--color-text-muted)",
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                <div className="shrink-0">
                  <ScoreBadge articleId={article.id} score={article.relevanceScore} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function PestelSection({
  category,
  articles,
  isCondensed,
  sectionRef,
}: {
  category: PestelCategory;
  articles: Article[];
  isCondensed: boolean;
  sectionRef: (el: HTMLElement | null) => void;
}) {
  return (
    <section
      ref={sectionRef}
      className="scroll-mt-32"
      aria-label={`${category} articles`}
    >
      <div
        className={cn(
          "sticky top-[58px] z-[25] mb-[var(--space-6)] bg-[color:var(--color-canvas)] transition-[margin,padding] duration-300",
          isCondensed ? "pt-[2px] pb-[6px]" : "pt-[10px] pb-[8px]",
        )}
        style={{
          marginTop: isCondensed ? -1 : 12,
          boxShadow: "0 1px 0 var(--color-canvas)",
        }}
      >
        <motion.div
          className="group mb-[var(--space-3)] flex cursor-default items-center gap-[var(--space-3)]"
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="flex h-8 w-8 shrink-0 items-center justify-center"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="opacity-85 [image-rendering:crisp-edges]"
              height={20}
              src={PESTEL_ICONS[category]}
              width={20}
            />
          </motion.div>
          <motion.h2
            className="[font-family:var(--font-family-heading)] text-2xl font-semibold leading-none tracking-[-0.02em] text-[color:var(--color-text-primary)] transition-colors duration-300 group-hover:text-[color:var(--color-accent-primary)]"
          >
            {category}
          </motion.h2>
          <span
            className="text-sm font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            {articles.length} article{articles.length !== 1 ? "s" : ""}
          </span>
        </motion.div>
        <motion.div
          className="h-px origin-left"
          style={{
            background: "var(--color-accent-primary)",
          }}
          whileHover={{ scaleX: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-[var(--space-4)]">
        {articles.map((article, index) => (
          <ArticleCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </section>
  );
}

function PestelNav({
  activeTab,
  counts,
  scrollProgress,
  onTabClick,
}: {
  activeTab: PestelCategory;
  counts: Record<PestelCategory, number>;
  scrollProgress: number;
  onTabClick: (category: PestelCategory) => void;
}) {
  return (
    <div className="sticky top-0 z-20 mb-0">
      <div
        className="relative overflow-hidden rounded-[0.75rem] border border-[color:var(--color-border-subtle)] px-[var(--space-2)] py-[8px]"
        style={{
          backgroundColor: "var(--color-surface)",
          boxShadow:
            "inset 0 1px 0 color-mix(in srgb, var(--color-border-subtle) 78%, transparent), inset 0 -1px 0 color-mix(in srgb, var(--color-border-subtle) 78%, transparent), -2px 0 10px -10px rgb(0 0 0 / 0.18), 2px 0 10px -10px rgb(0 0 0 / 0.18), 0 8px 14px -14px rgb(0 0 0 / 0.2)",
        }}
      >
        <div
          className="absolute left-[var(--space-2)] right-[var(--space-2)] top-0 h-[2px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-border-subtle) 70%, transparent)" }}
        >
          <motion.div
            className="h-full origin-left"
            style={{
              scaleX: scrollProgress / 100,
              background: "var(--color-accent-soft)",
            }}
          />
        </div>

        <LayoutGroup id="pestel-nav">
          <div
            role="tablist"
            aria-label="PESTEL categories"
            className="flex gap-2"
          >
            {PESTEL_CATEGORIES.map((category, index) => {
              const isActive = activeTab === category;
              return (
                <motion.button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  className={cn(
                    "relative flex flex-1 items-center justify-center cursor-pointer overflow-hidden rounded-[12px] px-4 py-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-2",
                    isActive
                      ? "font-semibold text-[color:var(--color-accent-primary)]"
                      : "text-[#6C7280] hover:text-[color:var(--color-text-primary)]",
                  )}
                  style={{
                    ["--tw-ring-color" as string]: "var(--color-focus-ring)",
                  }}
                  onClick={() => onTabClick(category)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-x-[6px] inset-y-[2px] rounded-[12px]"
                      layoutId="active-tab-bg"
                      style={{
                        backgroundColor: "var(--color-tab-active-bg)",
                        boxShadow:
                          "inset 0 0 0 1px color-mix(in srgb, var(--color-accent-primary) 14%, transparent)",
                      }}
                      initial={{ opacity: 0.25 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                        opacity: { duration: 0.22, delay: 0.1, ease: "easeOut" },
                      }}
                    />
                  )}

                  <span className="relative z-10 flex w-full items-center justify-center gap-2">
                    <motion.span
                      className={cn(
                        "flex items-center",
                        isActive ? "opacity-100" : "opacity-75",
                      )}
                      animate={isActive ? { rotate: [0, 10, -10, 0] } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        alt=""
                        aria-hidden="true"
                        className="opacity-85 transition-opacity duration-200 [image-rendering:crisp-edges]"
                        height={16}
                        src={PESTEL_ICONS[category]}
                        width={16}
                      />
                    </motion.span>

                    <span>{category}</span>

                    <motion.span
                      className="flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold"
                      style={{
                        backgroundColor: isActive
                          ? "color-mix(in srgb, var(--color-accent-primary) 14%, transparent)"
                          : "var(--color-surface-subtle)",
                        color: isActive
                          ? "var(--color-accent-primary)"
                          : "var(--color-text-muted)",
                      }}
                      animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {counts[category]}
                    </motion.span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}

function MonitorControlsRow() {
  return (
    <motion.div
      className="mb-[var(--space-8)] flex items-center gap-[var(--space-4)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative flex-1">
        <Search
          className="absolute left-[var(--space-4)] top-1/2 -translate-y-1/2 text-[color:var(--color-text-muted)]"
          size={20}
          strokeWidth={2}
        />
        <input
          className="w-full rounded-[var(--radius-md)] border bg-[color:var(--color-surface)] py-[10px] pl-[48px] pr-[var(--space-4)] text-[var(--monitor-text-search)] text-[color:var(--color-text-primary)] outline-none placeholder:text-[color:var(--color-text-muted)] focus:border-[color:var(--color-border-strong)]"
          style={{ borderColor: "color-mix(in srgb, var(--color-border-subtle) 72%, transparent)" }}
          placeholder="Search keywords..."
          type="text"
        />
      </div>

      <button
        className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border bg-[color:var(--color-surface)] px-[var(--space-4)] py-[10px] text-[var(--monitor-text-button)] font-medium text-[color:var(--color-text-primary)]"
        style={{ borderColor: "color-mix(in srgb, var(--color-border-subtle) 72%, transparent)" }}
        type="button"
      >
        <Calendar size={18} strokeWidth={2} />
        Last 30 days
      </button>

      <button
        className="flex items-center gap-[var(--space-2)] rounded-[var(--radius-md)] border bg-[color:var(--color-surface)] px-[var(--space-4)] py-[10px] text-[var(--monitor-text-button)] font-medium"
        style={{
          borderColor: "color-mix(in srgb, var(--color-border-subtle) 72%, transparent)",
          color: "var(--color-text-secondary)",
        }}
        type="button"
      >
        <Edit3 size={18} strokeWidth={2} />
        Edit description
      </button>
    </motion.div>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export function MonitorDetailScreen() {
  const [activeTab, setActiveTab] = useState<PestelCategory>("Political");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<Partial<Record<PestelCategory, HTMLElement>>>({});
  const { scrollYProgress } = useScroll();

  // Grouped articles
  const groupedArticles = PESTEL_CATEGORIES.reduce<
    Record<PestelCategory, Article[]>
  >(
    (acc, cat) => {
      acc[cat] = ARTICLES.filter((a) => a.category === cat);
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

  const isStickyHeaderCondensed = scrollProgress > 2;

  // Track scroll progress percentage
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setScrollProgress(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    PESTEL_CATEGORIES.forEach((category) => {
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
          // Trigger when section reaches the top 40% of the viewport
          rootMargin: "-120px 0px -50% 0px",
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((category: PestelCategory) => {
    const el = sectionRefs.current[category];
    if (!el) return;

    const stickyNavHeight = 64;
    const top =
      el.getBoundingClientRect().top + window.scrollY - stickyNavHeight;

    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const setSectionRef = useCallback(
    (category: PestelCategory) => (el: HTMLElement | null) => {
      if (el) sectionRefs.current[category] = el;
    },
    [],
  );

  return (
    <>
      {/* Global scroll progress bar */}
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

      {/* Page body */}
      <main
        className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-8 py-10"
        style={{ backgroundColor: "transparent" }}
      >
        {/* Header */}
        <motion.header
          className="mb-[var(--space-10)] flex flex-col"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <motion.div
            className="mb-[var(--space-4)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Link
              className="inline-flex w-fit items-center gap-[var(--space-2)] text-[var(--monitor-text-back-link)] font-medium leading-none transition-colors"
              href="/dashboard"
              style={{ color: "var(--color-text-muted)" }}
            >
              <ArrowLeft size={16} strokeWidth={2} />
              <span
                className="text-[var(--monitor-text-back-link)] font-medium"
                style={{ color: "var(--color-text-muted)" }}
              >
                Back to Dashboard
              </span>
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-col gap-[var(--space-3)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
          >
            <h1
              className="[font-family:var(--font-family-heading)] text-4xl font-bold leading-[1.1] tracking-[var(--letter-spacing-heading)]"
              style={{ color: "var(--color-text-primary)" }}
            >
              EU Regulation
            </h1>
            <p
              className="text-lg font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              Comprehensive analysis and insights
            </p>
          </motion.div>
        </motion.header>

        <MonitorControlsRow />

        <PestelNav
          activeTab={activeTab}
          counts={counts}
          scrollProgress={scrollProgress}
          onTabClick={scrollToSection}
        />

        {/* PESTEL sections */}
        <div className="flex flex-col gap-[var(--space-16)]">
          {PESTEL_CATEGORIES.map((category) => (
            <PestelSection
              key={category}
              category={category}
              articles={groupedArticles[category]}
              isCondensed={isStickyHeaderCondensed}
              sectionRef={setSectionRef(category)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
