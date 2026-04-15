"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Globe, Moon, Search, Sun, User } from "lucide-react";

import { useTheme } from "@/lib/theme/use-theme";
import { cn } from "@/lib/utils/cn";

export function ProductHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/monitor", label: "Monitors" },
    { href: "/events", label: "Events" },
  ];

  return (
    <header className="border-b border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface)]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[var(--content-width-page)] items-center justify-between px-[var(--space-6)] py-[10px] md:px-[var(--space-10)]">
        <div className="flex items-center gap-8">
          <Link aria-label="MERD AI" className="inline-flex items-center gap-3" href="/dashboard">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-[0.75rem]"
              style={{ backgroundColor: "var(--color-accent-primary)" }}
            >
              <Globe
                aria-hidden="true"
                size={22}
                strokeWidth={1.9}
                style={{ color: "var(--color-text-inverse)" }}
              />
            </span>
            <span
              className="[font-family:var(--font-family-heading)] text-[1.75rem] font-bold leading-none tracking-[-0.02em]"
              style={{ color: "var(--color-text-primary)" }}
            >
              MERD AI
            </span>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  className={cn(
                    "px-4 text-[var(--font-size-body-lg)] leading-none transition-colors",
                    isActive
                      ? "rounded-[12px] py-2.5 font-semibold"
                      : "py-2 font-medium",
                  )}
                  href={item.href}
                  style={
                    isActive
                      ? {
                          backgroundColor:
                            theme === "dark"
                              ? "#1A1A23"
                              : "color-mix(in srgb, var(--color-accent-primary) 14%, transparent)",
                          color: "var(--color-accent-primary)",
                        }
                      : {
                          color: "var(--color-text-muted)",
                        }
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-[var(--space-4)] text-[color:var(--color-text-muted)]">
          <button
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="transition-colors hover:text-[color:var(--color-text-primary)]"
            onClick={toggleTheme}
            type="button"
          >
            {theme === "dark" ? (
              <Sun size={22} strokeWidth={2} />
            ) : (
              <Moon size={22} strokeWidth={2} />
            )}
          </button>
          <button
            aria-label="Search"
            className="transition-colors hover:text-[color:var(--color-text-primary)]"
            type="button"
          >
            <Search size={22} strokeWidth={2} />
          </button>
          <button
            aria-label="Notifications"
            className="relative transition-colors hover:text-[color:var(--color-text-primary)]"
            type="button"
          >
            <Bell size={22} strokeWidth={2} />
            <span className="absolute -right-[2px] top-[1px] h-[8px] w-[8px] rounded-full bg-[color:var(--color-accent-primary)]" />
          </button>
          <button
            aria-label="Account"
            className="transition-colors hover:text-[color:var(--color-text-primary)]"
            type="button"
          >
            <User size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}