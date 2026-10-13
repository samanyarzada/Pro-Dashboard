import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { readStorage, writeStorage } from "../utils/storage";

const ThemeContext = createContext(null);
const STORAGE_KEY = "pd.theme";

function getSystemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  // `saved` is null until the user explicitly picks a theme; until then follow the OS.
  const [saved, setSaved] = useState(() => {
    const value = readStorage(STORAGE_KEY, null);
    return value === "light" || value === "dark" ? value : null;
  });
  const [system, setSystem] = useState(getSystemTheme);

  const theme = saved ?? system;

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!query) return undefined;
    const onChange = (event) => setSystem(event.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = useCallback((next) => {
    setSaved(next);
    writeStorage(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, isDark: theme === "dark", setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
