import { useEffect } from "react";

// Calls `handler` when a pointer press happens outside `ref`, or Escape is pressed.
export function useClickOutside(ref, handler, active = true) {
  useEffect(() => {
    if (!active) return undefined;

    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler();
    };
    const onKey = (event) => {
      if (event.key === "Escape") handler();
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, handler, active]);
}
