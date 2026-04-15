import React from "react";

const alerts = [
  { title: "EU AI Act Update", time: "2h ago", color: "text-[#EF4444]" },
  { title: "US Export Control", time: "4h ago", color: "text-[#F97316]" },
  { title: "GDPR Amendment", time: "6h ago", color: "text-[#183EEB]" },
];

export function RecentAlertsPanel() {
  return (
    <section className="mt-10 space-y-5">
      <h3 className="text-[2rem] font-semibold tracking-[-0.02em] text-[color:var(--color-text-primary)]">
        Recent Alerts
      </h3>

      {alerts.map((alert) => (
        <div
          key={alert.title}
          className="rounded-[28px] border p-6"
          style={{
            borderColor: "var(--monitor-panel-border)",
            backgroundColor: "var(--monitor-panel-bg)",
            boxShadow: "var(--monitor-panel-shadow)",
            backdropFilter: "var(--monitor-panel-backdrop)",
          }}
        >
          <div className="flex items-start gap-4">
            <span className={`mt-1 text-xl ${alert.color}`}>◔</span>
            <div>
              <p className="text-[1.2rem] font-semibold text-[color:var(--color-text-primary)]">
                {alert.title}
              </p>
              <p className="mt-1 text-lg text-[color:var(--color-text-muted)]">{alert.time}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
