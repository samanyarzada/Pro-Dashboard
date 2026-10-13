// Safe localStorage helpers — never throw (private mode, quota, bad JSON).

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}
