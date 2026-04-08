"use client";

import type { ReactNode } from "react";
import Image from "next/image";

import { Button, Panel } from "@/components/atoms";
import { cn } from "@/lib/utils/cn";

export type HorizontalFilterTabItem = {
  badge?: string;
  id: string;
  iconSrc?: string;
  label: string;
};

export type HorizontalFilterTabsProps = {
  activeId: string;
  actions?: ReactNode;
  className?: string;
  items: HorizontalFilterTabItem[];
  label: string;
  onChange: (id: string) => void;
  variant?: "panel" | "seamless";
};

export function HorizontalFilterTabs({
  activeId,
  actions,
  className,
  items,
  label,
  onChange,
  variant = "panel",
}: HorizontalFilterTabsProps) {
  const material = variant === "seamless";

  const content = (
    <div className="flex flex-col gap-[var(--space-3)] xl:flex-row xl:items-center xl:justify-between">
      <div
        aria-label={label}
        className={cn(
          "flex gap-[var(--space-2)]",
          material
            ? "material-tablist overflow-x-auto whitespace-nowrap pb-[2px]"
            : "flex-wrap",
        )}
        role="tablist"
      >
        {items.map((item) => (
          <Button
            key={item.id}
            aria-selected={item.id === activeId}
            className={cn("monitor-tab", material && "monitor-tab--material")}
            data-active={item.id === activeId ? "true" : undefined}
            onClick={() => onChange(item.id)}
            role="tab"
            size="sm"
            variant="ghost"
          >
            {item.iconSrc ? (
              <Image
                alt=""
                aria-hidden="true"
                className="monitor-tab-icon"
                height={16}
                src={item.iconSrc}
                width={16}
              />
            ) : null}
            <span>{item.label}</span>
            {item.badge ? (
              <span className="monitor-tab-badge" aria-hidden="true">
                {item.badge}
              </span>
            ) : null}
          </Button>
        ))}
      </div>

      {actions ? <div className="flex flex-wrap items-center gap-[var(--space-2)]">{actions}</div> : null}
    </div>
  );

  if (variant === "seamless") {
    return <div className={cn("pestel-tabs-shell", className)}>{content}</div>;
  }

  return (
    <Panel className={cn("flex flex-col gap-[var(--space-3)]", className)} padding="sm" tone="subtle">
      {content}
    </Panel>
  );
}