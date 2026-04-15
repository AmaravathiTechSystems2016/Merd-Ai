"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SlidersHorizontal, Search, X } from "lucide-react";

export type ArticleFilterGroup = "state" | "topic";

export type ArticleFilterOption = {
  group: ArticleFilterGroup;
  id: string;
  label: string;
};

type FilterBarProps = {
  activeFilters: string[];
  filterOptions: ArticleFilterOption[];
  onClearAll: () => void;
  onQueryChange: (value: string) => void;
  onRemoveFilter: (id: string) => void;
  onToggleFilter: (id: string) => void;
  query: string;
  resultCount: number;
};

export function FilterBar({
  activeFilters,
  filterOptions,
  onClearAll,
  onQueryChange,
  onRemoveFilter,
  onToggleFilter,
  query,
  resultCount,
}: FilterBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const groupedOptions = useMemo(() => {
    return {
      state: filterOptions.filter((option) => option.group === "state"),
      topic: filterOptions.filter((option) => option.group === "topic"),
    };
  }, [filterOptions]);

  return (
    <section
      className="glass-panel-strong rounded-2xl border px-4 py-3 md:px-5 md:py-4"
      style={{
        backgroundColor: "var(--monitor-panel-bg)",
        borderColor: "var(--monitor-panel-border)",
        boxShadow: "var(--monitor-panel-shadow)",
        backdropFilter: "var(--monitor-panel-backdrop)",
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[0.95rem] font-semibold tracking-[-0.015em] text-[color:var(--color-text-primary)]">
              Quick search
            </div>
            <div className="mt-1 text-[13px] text-[color:var(--color-text-muted)]">
              {resultCount} matching article{resultCount === 1 ? "" : "s"}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
          <div
            className="relative flex h-12 flex-1 items-center rounded-xl border pl-12 pr-3 transition-[border-color,box-shadow,background-color] duration-200 shadow-none"
            style={{
              backgroundColor: "var(--monitor-control-bg)",
              borderColor: "var(--monitor-control-border)",
              boxShadow: "var(--monitor-control-shadow)",
              backdropFilter: "var(--monitor-control-backdrop)",
            }}
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-text-muted)]"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search articles, signals, publishers, topics..."
              className="w-full bg-transparent text-[15px] font-normal text-[color:var(--color-text-primary)] outline-none focus:ring-0 focus:outline-none placeholder:text-[color:var(--color-text-muted)]"
            />
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="inline-flex h-12 items-center gap-2 rounded-full border px-5 text-[15px] font-semibold text-white shadow-none transition"
              style={{
                borderColor: "var(--monitor-filter-button-border)",
                backgroundColor: "var(--monitor-filter-button-bg)",
                color: "var(--monitor-filter-button-text)",
              }}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <SlidersHorizontal size={18} />
              Filter
              {activeFilters.length > 0 ? (
                <span
                  className="ml-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[11px] font-bold"
                  style={{
                    backgroundColor: "var(--monitor-filter-button-badge-bg)",
                    color: "var(--monitor-filter-button-badge-text)",
                  }}
                >
                  {activeFilters.length}
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="flex justify-end">
            <div
              className="glass-panel-soft w-full max-w-[320px] rounded-[22px] border p-4 shadow-[0_26px_44px_-28px_rgba(1,0,40,0.22)] backdrop-blur-[18px]"
              style={{
                backgroundColor: "var(--monitor-floating-bg)",
                borderColor: "var(--monitor-floating-border)",
                boxShadow: "var(--monitor-floating-shadow)",
                backdropFilter: "var(--monitor-floating-backdrop)",
              }}
            >
              <FilterSection
                title="Article state"
                options={groupedOptions.state}
                activeFilters={activeFilters}
                onToggleFilter={(id) => {
                  onToggleFilter(id);
                  // Do NOT close menu here; let user select multiple filters
                }}
              />

              <div
                className="my-4 h-px"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-border-subtle) 80%, transparent)",
                }}
              />

              <FilterSection
                title="Topics"
                options={groupedOptions.topic}
                activeFilters={activeFilters}
                onToggleFilter={(id) => {
                  onToggleFilter(id);
                  // Do NOT close menu here; let user select multiple filters
                }}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-3">
            {query.trim() && (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium shadow-sm transition"
                  style={{
                    borderColor: "var(--monitor-selected-filter-border)",
                    backgroundColor: "var(--monitor-selected-filter-bg)",
                    color: "var(--monitor-selected-filter-text)",
                    boxShadow: "var(--monitor-selected-filter-shadow)",
                  }}
              >
                <span className="truncate">Search: {query.trim()}</span>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "var(--monitor-selected-filter-icon-bg)",
                    color: "var(--monitor-selected-filter-icon-color)",
                  }}
                >
                  <X size={12} className="opacity-75" />
                </span>
              </button>
            )}
            {activeFilters.map((filterId) => {
              const option = filterOptions.find((item) => item.id === filterId);
              if (!option) return null;
              return (
                <button
                  key={filterId}
                  type="button"
                  onClick={() => onRemoveFilter(filterId)}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium shadow-sm transition"
                  style={{
                    borderColor: "var(--monitor-selected-filter-border)",
                    backgroundColor: "var(--monitor-selected-filter-bg)",
                    color: "var(--monitor-selected-filter-text)",
                    boxShadow: "var(--monitor-selected-filter-shadow)",
                  }}
                >
                  {option.label}
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--monitor-selected-filter-icon-bg)",
                      color: "var(--monitor-selected-filter-icon-color)",
                    }}
                  >
                    <X size={12} className="opacity-75" />
                  </span>
                </button>
              );
            })}
            {(activeFilters.length > 0 || query.trim()) && (
              <button
                type="button"
                onClick={onClearAll}
                className="ml-auto inline-flex items-center rounded-full border px-4 py-2 text-[15px] font-medium transition"
                style={{
                  borderColor: "var(--monitor-clear-filter-border)",
                  backgroundColor: "var(--monitor-clear-filter-bg)",
                  color: "var(--monitor-clear-filter-text)",
                }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterSection({
  activeFilters,
  onToggleFilter,
  options,
  title,
}: {
  activeFilters: string[];
  onToggleFilter: (id: string) => void;
  options: ArticleFilterOption[];
  title: string;
}) {
  return (
    <div>
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = activeFilters.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggleFilter(option.id)}
              className="rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-all duration-200"
              style={{
                color: active
                  ? "var(--color-text-inverse)"
                  : "var(--color-text-primary)",
                background: active
                  ? "linear-gradient(180deg, color-mix(in srgb, var(--color-accent-primary) 96%, white 4%) 0%, color-mix(in srgb, var(--color-accent-primary) 86%, black 14%) 100%)"
                  : "var(--color-surface)",
                borderColor: active
                  ? "color-mix(in srgb, var(--color-accent-primary) 80%, transparent)"
                  : "var(--color-border-subtle)",
                boxShadow: active
                  ? "0 14px 26px -20px color-mix(in srgb, var(--color-accent-primary) 40%, transparent)"
                  : "none",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
