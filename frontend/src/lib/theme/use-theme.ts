"use client";

import { useEffect, useState } from "react";

import {
  applyTheme,
  readThemePreference,
  resolveSystemTheme,
  resolveTheme,
  setThemePreference,
  type Theme,
  type ThemePreference,
} from "./theme";

type UseThemeReturn = {
  isSystem: boolean;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  theme: Theme;
  toggleTheme: () => void;
};

function getInitialPreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  return readThemePreference();
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return resolveTheme(readThemePreference());
}

export function useTheme(): UseThemeReturn {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    getInitialPreference,
  );
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      const nextPreference = readThemePreference();

      if (nextPreference === "system") {
        const nextTheme = resolveSystemTheme();
        applyTheme(nextTheme);
        setThemeState(nextTheme);
      }
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const updatePreference = (nextPreference: ThemePreference) => {
    const nextTheme = setThemePreference(nextPreference);
    setPreferenceState(nextPreference);
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    updatePreference(theme === "light" ? "dark" : "light");
  };

  return {
    isSystem: preference === "system",
    preference,
    setPreference: updatePreference,
    theme,
    toggleTheme,
  };
}
