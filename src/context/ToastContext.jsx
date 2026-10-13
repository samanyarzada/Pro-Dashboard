import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

import Icon from "../components/common/Icon";

const ToastContext = createContext(null);

const ICONS = { success: "check-circle", error: "alert-circle", info: "info" };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const show = useCallback(
    (type, title, message) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((current) => [...current.slice(-3), { id, type, title, message }]);
      timers.current.set(id, setTimeout(() => dismiss(id), 4200));
    },
    [dismiss]
  );

  useEffect(() => {
    const active = timers.current;
    return () => active.forEach((timer) => clearTimeout(timer));
  }, []);

  const api = useMemo(
    () => ({
      success: (title, message) => show("success", title, message),
      error: (title, message) => show("error", title, message),
      info: (title, message) => show("info", title, message),
    }),
    [show]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      <div className="toast-region" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`} role="status">
            <Icon name={ICONS[toast.type]} size={18} />

            <div className="toast-body">
              <strong>{toast.title}</strong>
              {toast.message && <span>{toast.message}</span>}
            </div>

            <button
              type="button"
              className="toast-close"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside ToastProvider");
  return context;
}
