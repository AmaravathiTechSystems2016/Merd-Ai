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
  return (
    <div ref={tabsRef} className="sticky z-30" style={{ top: stickyTop }}>
      <div className="rounded-2xl border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)] px-2 py-2">
        <div
          role="tablist"
          aria-label="PESTEL categories"
          className="flex flex-wrap gap-2"
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
                className={[
                  "relative inline-flex min-w-[120px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-200 md:min-w-0",
                  isActive
                    ? "text-[color:var(--color-accent-primary)]"
                    : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-surface-subtle)] hover:text-[color:var(--color-text-primary)]",
                ].join(" ")}
              >
                {isActive ? (
                  <motion.span
                    layoutId="pestel-active-pill"
                    className="absolute inset-0 rounded-xl bg-[color:var(--color-accent-soft-bg)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 34,
                      mass: 0.9,
                    }}
                  />
                ) : null}

                <span className="relative z-10 whitespace-nowrap">{tab}</span>

                <span
                  className={[
                    "relative z-10 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[11px] font-semibold leading-none",
                    isActive
                      ? "bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-primary)]"
                      : "bg-[color:var(--color-surface-subtle)] text-[color:var(--color-text-muted)]",
                  ].join(" ")}
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