"use client";
import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function SearchExpand() {
  const [expanded, setExpanded] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
    >
      <button
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-surface-subtle)] focus:outline-none"
        tabIndex={0}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        aria-label="Expand search"
      >
        <Search size={22} />
      </button>
      <motion.input
        ref={inputRef}
        type="text"
        placeholder="Search anything..."
        initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
        animate={expanded ? { width: 220, opacity: 1, paddingLeft: 16, paddingRight: 16 } : { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel-soft ml-2 h-12 rounded-2xl border text-[color:var(--color-text-primary)] text-sm font-medium outline-none shadow-xl z-50"
        style={{
          minWidth: 0,
          backgroundColor: "var(--monitor-control-bg)",
          borderColor: "var(--monitor-control-border)",
          boxShadow: "var(--monitor-control-shadow)",
          backdropFilter: "var(--monitor-control-backdrop)",
        }}
        tabIndex={expanded ? 0 : -1}
        onBlur={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
      />
    </div>
  );
}
