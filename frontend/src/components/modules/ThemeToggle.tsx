"use client";

import { Button, Text } from "@/components/atoms";
import { useTheme } from "@/lib/theme/use-theme";
import { cn } from "@/lib/utils/cn";

export type ThemeToggleProps = {
  className?: string;
  mode?: "icon" | "text";
};

function SunIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.75V5.25M12 18.75V21.25M21.25 12H18.75M5.25 12H2.75M18.54 5.46L16.77 7.23M7.23 16.77L5.46 18.54M18.54 18.54L16.77 16.77M7.23 7.23L5.46 5.46"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="16" viewBox="0 0 24 24" width="16">
      <path
        d="M14.5 2.75C12 3.81 10.25 6.28 10.25 9.16C10.25 13 13.34 16.12 17.16 16.12C19.18 16.12 21 15.24 22.25 13.85C21.48 18.09 17.75 21.25 13.22 21.25C8.13 21.25 4 17.12 4 12.03C4 7.39 7.42 3.53 11.89 2.86C12.77 2.73 13.66 2.69 14.5 2.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ThemeToggle({ className, mode = "text" }: ThemeToggleProps) {
  const { setPreference, theme } = useTheme();
  const iconOnly = mode === "icon";

  return (
    <div
      aria-label="Theme toggle"
      className={cn(
        "theme-toggle-shell flex items-center gap-[var(--space-2)] rounded-[var(--radius-pill)] border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-subtle)] p-[var(--space-1)]",
        iconOnly && "gap-[var(--space-1)]",
        className,
      )}
      role="group"
    >
      {!iconOnly ? (
        <Text
          className="hidden pl-[var(--space-2)] sm:block"
          size="label"
          tone="secondary"
          weight="medium"
          caps
        >
          Theme
        </Text>
      ) : null}

      <Button
        aria-label="Use light mode"
        aria-pressed={theme === "light"}
        className={cn("theme-toggle-option", iconOnly && "px-[var(--space-2)]")}
        data-active={theme === "light" ? "true" : undefined}
        onClick={() => setPreference("light")}
        size="sm"
        variant={theme === "light" ? "primary" : "ghost"}
      >
        {iconOnly ? <SunIcon /> : "Light"}
      </Button>

      <Button
        aria-label="Use dark mode"
        aria-pressed={theme === "dark"}
        className={cn("theme-toggle-option", iconOnly && "px-[var(--space-2)]")}
        data-active={theme === "dark" ? "true" : undefined}
        onClick={() => setPreference("dark")}
        size="sm"
        variant={theme === "dark" ? "primary" : "ghost"}
      >
        {iconOnly ? <MoonIcon /> : "Dark"}
      </Button>
    </div>
  );
}
