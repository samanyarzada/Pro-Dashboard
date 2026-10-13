import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { readStorage, writeStorage } from "../utils/storage";

const SettingsContext = createContext(null);
const STORAGE_KEY = "pd.settings";

export const defaultSettings = {
  appName: "Pro Dashboard",
  companyName: "Pro Company",
  currency: "USD",
  language: "English",
  timezone: "UTC",
  compactMode: false,
  notifications: {
    email: true,
    projects: true,
    security: true,
    marketing: false,
  },
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const stored = readStorage(STORAGE_KEY, {});
    return {
      ...defaultSettings,
      ...stored,
      notifications: { ...defaultSettings.notifications, ...(stored.notifications || {}) },
    };
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-density",
      settings.compactMode ? "compact" : "comfortable"
    );
  }, [settings.compactMode]);

  const saveSettings = useCallback((changes) => {
    setSettings((current) => {
      const next = { ...current, ...changes };
      writeStorage(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ settings, saveSettings }), [settings, saveSettings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used inside SettingsProvider");
  return context;
}
