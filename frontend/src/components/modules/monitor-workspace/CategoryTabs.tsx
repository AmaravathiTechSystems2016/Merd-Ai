import type { Ref } from "react";
import { motion } from "framer-motion";

type PestelCategory =
  | "Political"
  | "Economic"
  | "Social"
  | "Technological"
  | "Environmental"
  | "Legal";

type CategoryTabsProps = {
  activeTab: PestelCategory;
  counts: Record<PestelCategory, number>;
  onTabClick: (category: PestelCategory) => void;
  stickyTop?: number;
  tabsRef?: Ref<HTMLDivElement>;
};

const tabs: PestelCategory[] = [
  "Political",
  "Economic",
  "Social",
  "Technological",
  "Environmental",
  "Legal",
];

export function CategoryTabs({
  activeTab,
  counts,
  onTabClick,
  stickyTop = 0,
  tabsRef,
}: CategoryTabsProps) {
  // Import the icons here to avoid circular deps
  const PESTEL_ICONS: Record<PestelCategory, string> = {
    Political: "/tab-icons/political.svg",
    Economic: "/tab-icons/economic.svg",
    Social: "/tab-icons/social.svg",
    Technological: "/tab-icons/technological.svg",
    Environmental: "/tab-icons/environmental.svg",
    Legal: "/tab-icons/legal.svg",
  };
  // Use require to avoid SSR issues with next/image
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <div
      ref={tabsRef}
      className="sticky z-30"
      style={{ top: stickyTop }}
    >
      <div
        className="glass-panel relative min-h-[56px] rounded-[16px] border px-2 py-2"
        style={{
          backgroundColor: "var(--monitor-pestel-shell-bg)",
          borderColor: "var(--monitor-pestel-shell-border)",
          boxShadow: "var(--monitor-pestel-shell-shadow)",
          backdropFilter: "var(--monitor-panel-backdrop)",
        }}
      >
        <div
          role="tablist"
          aria-label="PESTEL categories"
          className="relative flex flex-wrap gap-1.5"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onTabClick(tab)}
                className={`relative inline-flex min-w-[132px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-[16px] px-4 py-3 text-base font-semibold transition-all duration-300 md:min-w-0 h-[48px] ${
                  isActive
                    ? "text-white"
                    : "hover:bg-[color:var(--monitor-pestel-tab-hover-bg)] hover:text-[color:var(--monitor-pestel-tab-hover-text)]"
                }`}
                style={
                  isActive
                    ? undefined
                    : {
                        color: "var(--monitor-pestel-tab-text)",
                      }
                }
              >
                {isActive ? (
                  <motion.span
                    layoutId="pestel-active-pill"
                    className="absolute inset-0 rounded-[16px]"
                    style={{
                      background: "var(--monitor-pestel-tab-active-bg)",
                      boxShadow: "var(--monitor-pestel-tab-active-shadow)",
                    }}
                    transition={{
                      type: "tween",
                      duration: 0.25,
                      ease: "easeInOut",
                    }}
                  />
                ) : null}
                <span className="relative z-10 whitespace-nowrap flex items-center gap-2">
                  {tab}
                </span>
                <span
                  className={`relative z-10 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[11px] font-semibold leading-none transition-colors ${
                    isActive ? "" : ""
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: "var(--monitor-pestel-badge-active-bg)",
                          color: "var(--monitor-pestel-badge-active-text)",
                        }
                      : {
                          backgroundColor: "var(--monitor-pestel-badge-bg)",
                          color: "var(--monitor-pestel-badge-text)",
                        }
                  }
                >
                  {counts[tab]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
