"use client";

import { ChevronRight, Home } from "lucide-react";

type Crumb = {
  label: string;
  current?: boolean;
};

const CRUMBS: Crumb[] = [
  { label: "Home" },
  { label: "Dashboard" },
  { label: "Monitors" },
  { label: "EU Regulation", current: true },
];

export function WorkspaceBreadcrumbs() {
  return (
    <nav
      className="flex w-fit max-w-full items-center gap-1.5 overflow-x-auto"
      aria-label="Breadcrumb"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
        <Home size={15} color="var(--color-text-muted)" />
      </span>

      {CRUMBS.map((crumb, index) => (
        <div key={crumb.label} className="flex items-center gap-1.5">
          <span
            className="whitespace-nowrap rounded-full px-2.5 py-1 text-[13px] font-medium tracking-[-0.01em]"
            style={{
              color: crumb.current
                ? "var(--color-text-primary)"
                : "var(--color-text-muted)",
              backgroundColor: crumb.current
                ? "color-mix(in srgb, var(--color-surface-subtle) 78%, transparent)"
                : "transparent",
            }}
          >
            {crumb.label}
          </span>
          {index < CRUMBS.length - 1 ? (
            <ChevronRight
              size={14}
              color="color-mix(in srgb, var(--color-text-muted) 78%, transparent)"
            />
          ) : null}
        </div>
      ))}
    </nav>
  );
}
