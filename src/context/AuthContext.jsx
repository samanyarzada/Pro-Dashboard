import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

import { readStorage, removeStorage, writeStorage } from "../utils/storage";

const AuthContext = createContext(null);
const STORAGE_KEY = "pd.user";

// Demo credentials — replace with a real API call when a backend exists.
const DEMO_EMAIL = "admin@example.com";
const DEMO_PASSWORD = "123456";

const DEMO_USER = {
  id: "1",
  name: "Admin User",
  email: DEMO_EMAIL,
  role: "Administrator",
};

function readUser() {
  const stored = readStorage(STORAGE_KEY, null);
  return stored && typeof stored === "object" && stored.email ? stored : null;
}

export function AuthProvider({ children }) {
  // Read synchronously so protected routes never flash the login screen on refresh.
  const [user, setUser] = useState(readUser);
  const passwordRef = useRef(DEMO_PASSWORD);

  const login = useCallback(async (email, password) => {
    // Simulated network latency so the loading state is visible.
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (email.trim().toLowerCase() === DEMO_EMAIL && password === passwordRef.current) {
      const stored = readStorage(`${STORAGE_KEY}.profile`, null);
      const nextUser = { ...DEMO_USER, ...(stored || {}) };
      writeStorage(STORAGE_KEY, nextUser);
      setUser(nextUser);
      return { success: true };
    }

    return { success: false, message: "Email or password is incorrect." };
  }, []);

  const logout = useCallback(() => {
    removeStorage(STORAGE_KEY);
    setUser(null);
  }, []);

  const updateUser = useCallback((changes) => {
    setUser((current) => {
      const next = { ...current, ...changes };
      writeStorage(STORAGE_KEY, next);
      writeStorage(`${STORAGE_KEY}.profile`, next);
      return next;
    });
  }, []);

  const changePassword = useCallback(async (current, next) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (current !== passwordRef.current) {
      return { success: false, message: "Current password is incorrect." };
    }
    passwordRef.current = next;
    return { success: true };
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateUser,
      changePassword,
    }),
    [user, login, logout, updateUser, changePassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
