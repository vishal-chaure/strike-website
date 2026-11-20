/**
 * Small preferences kept in the visitor's browser (like the lamp being on).
 * Storage can be missing or blocked (private windows, the server render), so
 * every call quietly falls back instead of throwing.
 */
export const safeStorage = {
  get(key: string): string | null {
    try {
      return globalThis.localStorage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  },

  set(key: string, value: string): void {
    try {
      globalThis.localStorage?.setItem(key, value);
    } catch {
      // Not saved; the preference just won't be remembered.
    }
  },
};
