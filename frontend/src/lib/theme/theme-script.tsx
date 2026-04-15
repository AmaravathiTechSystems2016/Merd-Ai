import { THEME_STORAGE_KEY } from "./theme";

export const themeInitializer = `(function(){try{var key="${THEME_STORAGE_KEY}";var stored=window.localStorage.getItem(key);var preference=stored==="light"||stored==="dark"||stored==="dark-alt"||stored==="dark-alt-2"||stored==="system"?stored:"system";var system=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var theme=preference==="system"?system:preference;document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme==="light"?"light":"dark";}catch(error){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light";}})();`;

// ThemeScript component removed. Theme initialization is now handled in layout.tsx using next/script.
