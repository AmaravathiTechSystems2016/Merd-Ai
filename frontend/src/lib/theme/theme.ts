export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

export const THEME_STORAGE_KEY = "merd-ai-theme";

export function isThemePreference(
  value: string | null,
): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function resolveSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(preference: ThemePreference): Theme {
  return preference === "system" ? resolveSystemTheme() : preference;
}

export function readThemePreference(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemePreference(storedTheme) ? storedTheme : "system";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function setThemePreference(preference: ThemePreference): Theme {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }

  const nextTheme = resolveTheme(preference);
  applyTheme(nextTheme);
  return nextTheme;
}

export function clearThemePreference(): Theme {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  }

  const nextTheme = resolveSystemTheme();
  applyTheme(nextTheme);
  return nextTheme;
}

export function initializeTheme(): ThemePreference {
  const preference = readThemePreference();
  applyTheme(resolveTheme(preference));
  return preference;
}
