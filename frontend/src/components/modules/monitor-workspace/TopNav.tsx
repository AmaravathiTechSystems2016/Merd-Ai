"use client";
import { Home, Radar, Calendar, Bell, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { SearchExpand } from ".";
import { ThemeToggle } from "@/components/modules/ThemeToggle";

export function TopNav() {
  return (
    <header className="relative flex min-h-12 items-center justify-end">
      <nav className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3">
          <NavItem icon={<Home size={22} />} label="Dashboard" />
          <NavItem icon={<Radar size={22} />} label="Monitors" accent />
          <NavItem icon={<Calendar size={22} />} label="Events" />
      </nav>

      <div className="theme-utility-cluster flex items-center gap-3 justify-end">
        <ThemeToggle className="hidden md:flex" mode="icon" />
        <SearchExpand />
        <div className="relative flex items-center">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-[color:var(--color-text-muted)] transition-all duration-200 hover:bg-[color:var(--color-surface-subtle)] hover:text-[color:var(--color-text-primary)] hover:shadow-[var(--shadow-panel)] focus:outline-none"
          >
            <Bell size={22} />
            <span
              className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "var(--color-danger-primary)" }}
            />
          </button>
        </div>
        <div className="relative group flex items-center">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full shadow-[0_12px_28px_-18px_color-mix(in_srgb,var(--color-accent-primary)_26%,transparent)] focus:outline-none"
            style={{
              backgroundColor: "var(--monitor-profile-icon-bg)",
              color: "var(--monitor-profile-icon-text)",
            }}
          >
            <User size={26} className="text-white" />
          </button>
          <div
            className="glass-panel-soft pointer-events-none absolute right-0 top-full z-50 mt-2 min-w-[180px] rounded-2xl px-5 py-4 opacity-0 shadow-2xl ring-1 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
            style={{
              backgroundColor: "var(--monitor-floating-bg)",
              borderColor: "var(--monitor-floating-border)",
              boxShadow: "var(--monitor-floating-shadow)",
              backdropFilter: "var(--monitor-floating-backdrop)",
            }}
          >
            <div className="flex flex-col items-start gap-1">
              <span className="text-base font-semibold text-[color:var(--color-text-primary)]">Jane Doe</span>
              <span className="mb-2 text-xs text-[color:var(--color-text-muted)]">Pro Plan</span>
              <button className="w-full py-1 text-left text-sm text-[color:var(--color-accent-primary)] hover:underline">Profile</button>
              <button className="w-full py-1 text-left text-sm text-[color:var(--color-text-primary)] hover:underline">Settings</button>
              <button
                className="w-full py-1 text-left text-sm hover:underline"
                style={{ color: "var(--color-danger-primary)" }}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ icon, label, accent }: { icon: React.ReactNode; label: string; accent?: boolean }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="flex items-center group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
          accent
            ? ""
            : "hover:bg-[color:var(--color-surface-subtle)] hover:shadow-[var(--shadow-panel)]"
        }`}
        style={{
          color: accent
            ? "var(--color-accent-primary)"
            : hovered
            ? "var(--color-accent-primary)"
            : "var(--color-text-secondary)",
        }}
        tabIndex={0}
      >
        {icon}
      </button>
      <AnimatePresence initial={false}>
        {hovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1, marginLeft: 12 }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-12 items-center overflow-hidden whitespace-nowrap text-[15px] font-bold text-[color:var(--color-text-muted)]"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
