import React from "react";

const stats = [
  { label: "Active Monitors", value: "24", change: "+3" },
  { label: "High Priority", value: "8", change: "+2" },
  { label: "Resolved Today", value: "12", change: "-1" },
];

export function QuickStatsPanel() {
  return (
    <section className="space-y-5">
      <h3 className="text-[2rem] font-semibold tracking-[-0.02em] text-[color:var(--color-text-primary)]">
        Quick Stats
      </h3>

      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[28px] border p-6"
          style={{
            borderColor: "var(--monitor-panel-border)",
            backgroundColor: "var(--monitor-panel-bg)",
            boxShadow: "var(--monitor-panel-shadow)",
            backdropFilter: "var(--monitor-panel-backdrop)",
          }}
        >
          <p className="text-[1.15rem] text-[color:var(--color-text-muted)]">{stat.label}</p>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-[2rem] font-semibold text-[color:var(--color-text-primary)]">
              {stat.value}
            </span>
            <span
              className="text-xl font-semibold"
              style={{
                color: stat.change.startsWith("-")
                  ? "var(--color-text-muted)"
                  : "var(--color-success-primary)",
              }}
            >
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
