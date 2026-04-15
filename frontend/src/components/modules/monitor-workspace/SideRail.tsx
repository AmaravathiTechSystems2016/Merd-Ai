

"use client";
import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import {
  CalendarDays,
  FileText,
  Home,
  MessageSquare,
  Plus,
  Radar,
  Settings,
  Users,
} from "lucide-react";
import { MerdAiLogo } from "@/components/modules/MerdAiLogo";

const items = [
  { label: "Home", active: false, badge: null, icon: Home },
  { label: "Monitors", active: true, badge: 8, icon: Radar },
  { label: "Teams", active: false, badge: null, icon: Users },
  { label: "Calendar", active: false, badge: null, icon: CalendarDays },
  { label: "Docs", active: false, badge: null, icon: FileText },
  { label: "Messages", active: false, badge: 1, icon: MessageSquare },
  { label: "Settings", active: false, badge: null, icon: Settings },
] as const;

export function SideRail() {
  const [isRailExpanded, setIsRailExpanded] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <aside
      className="hidden shrink-0 transition-[width] duration-300 ease-out lg:block"
      onMouseLeave={() => setIsRailExpanded(false)}
      style={{
        width: isRailExpanded ? 236 : 92,
        background: "transparent",
        backdropFilter: "none",
      }}
    >
      <div className="sticky top-0 px-4 pb-8 pt-4">
        <div className="flex h-[calc(100vh-32px)] flex-col justify-between">
          <div>
            <div
              className="mb-10 h-[68px] w-max cursor-pointer"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="relative inline-flex h-full items-center gap-3 rounded-[22px] px-3 py-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                  <MerdAiLogo size={38} color="#183EEB" />
                </div>
                <AnimatePresence>
                  {isLogoHovered && (
                    <motion.span
                      initial={{
                        opacity: 0,
                        width: 0,
                        x: -8,
                        filter: "blur(8px)",
                      }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        x: -8,
                        filter: "blur(8px)",
                      }}
                      transition={{
                        duration: 0.38,
                        type: "spring",
                        stiffness: 340,
                        damping: 22,
                      }}
                      className="overflow-hidden whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[1.05rem] font-bold tracking-[-0.02em] text-[color:var(--color-text-primary)] shadow-[var(--shadow-panel)] backdrop-blur-[14px]"
                      style={{ pointerEvents: "none" }}
                    >
                      MERD AI
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation items */}
            <div
              className="transition-[width] duration-300 ease-out"
              onMouseEnter={() => setIsRailExpanded(true)}
              style={{ width: isRailExpanded ? 220 : 72 }}
            >
              <nav aria-label="Primary" className="flex flex-col gap-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      aria-label={item.label}
                      className={`relative flex h-14 items-center overflow-hidden rounded-[18px] transition-all duration-200 ${
                        isRailExpanded
                          ? "w-full justify-start px-4"
                          : "mx-auto w-14 justify-center px-0"
                      } ${item.active ? "" : "hover:-translate-y-0.5"}`}
                      style={
                        item.active
                          ? {
                              background: "var(--color-surface-strong)",
                              color: "var(--color-text-primary)",
                              boxShadow: "var(--shadow-panel)",
                            }
                          : {
                              color: "var(--color-text-muted)",
                              boxShadow: "none",
                            }
                      }
                      type="button"
                    >
                      <span
                        className={`flex h-8 w-8 items-center justify-center transition-all duration-200 ${
                          isRailExpanded ? "" : "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.9} color="currentColor" />
                      </span>

                      <span
                        className="overflow-hidden whitespace-nowrap text-left text-[14px] font-medium transition-all duration-200"
                        style={{
                          width: isRailExpanded ? "auto" : 0,
                          opacity: isRailExpanded ? 1 : 0,
                          marginLeft: isRailExpanded ? 12 : 0,
                          color: item.active
                            ? "var(--color-text-primary)"
                            : "currentColor",
                        }}
                      >
                        {item.label}
                      </span>

                      {item.badge ? (
                        <span
                          className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold transition-opacity duration-200"
                          style={{
                            opacity: isRailExpanded ? 1 : 0,
                            backgroundColor: item.active
                              ? "color-mix(in srgb, var(--color-surface-inverse) 10%, var(--color-surface) 90%)"
                              : "var(--color-text-primary)",
                            color: item.active
                              ? "var(--color-text-primary)"
                              : "var(--color-text-inverse)",
                            boxShadow: item.active
                              ? "inset 0 0 0 1px color-mix(in srgb, var(--color-border-strong) 72%, transparent)"
                              : "none",
                          }}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div
            className="transition-[width] duration-300 ease-out"
            onMouseEnter={() => setIsRailExpanded(true)}
            style={{ width: isRailExpanded ? 220 : 72 }}
          >
            <button
              className={`flex h-12 items-center overflow-hidden rounded-[16px] text-white shadow-[0_0_8px_2px_var(--color-accent-glow)] transition-all duration-200 hover:translate-y-[-1px] hover:shadow-[0_0_12px_3px_var(--color-accent-glow)] ${
                isRailExpanded
                  ? "w-full px-4"
                  : "mx-auto w-14 justify-center px-0"
              }`}
              style={{ background: "#010028" }}
              type="button"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <Plus size={20} strokeWidth={2.1} />
              </span>
              <span
                className="overflow-hidden whitespace-nowrap text-[14px] font-semibold transition-all duration-200"
                style={{
                  width: isRailExpanded ? "auto" : 0,
                  opacity: isRailExpanded ? 1 : 0,
                  marginLeft: isRailExpanded ? 12 : 0,
                }}
              >
                New monitor
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
