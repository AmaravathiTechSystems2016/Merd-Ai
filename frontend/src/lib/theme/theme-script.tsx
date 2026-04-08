import { THEME_STORAGE_KEY } from "./theme";

const themeInitializer = `(function(){try{var key="${THEME_STORAGE_KEY}";var stored=window.localStorage.getItem(key);var preference=stored==="light"||stored==="dark"||stored==="system"?stored:"system";var system=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var theme=preference==="system"?system:preference;document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(error){document.documentElement.dataset.theme="light";document.documentElement.style.colorScheme="light";}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />;
}
