import { afterEach, describe, expect, it, vi } from "vitest";

import { safeStorage } from "./safe-storage";

function fakeStorage(): Storage {
  const items = new Map<string, string>();
  return {
    get length() {
      return items.size;
    },
    clear: () => items.clear(),
    getItem: (key) => items.get(key) ?? null,
    key: (index) => [...items.keys()][index] ?? null,
    removeItem: (key) => void items.delete(key),
    setItem: (key, value) => void items.set(key, value),
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("safeStorage", () => {
  it("saves and reads a value", () => {
    vi.stubGlobal("localStorage", fakeStorage());
    safeStorage.set("lamp", "on");
    expect(safeStorage.get("lamp")).toBe("on");
  });

  it("returns null when storage is missing", () => {
    vi.stubGlobal("localStorage", undefined);
    expect(safeStorage.get("lamp")).toBeNull();
    expect(() => safeStorage.set("lamp", "on")).not.toThrow();
  });

  it("returns null when storage is blocked", () => {
    const blocked = fakeStorage();
    blocked.getItem = () => {
      throw new Error("blocked");
    };
    blocked.setItem = () => {
      throw new Error("blocked");
    };
    vi.stubGlobal("localStorage", blocked);
    expect(safeStorage.get("lamp")).toBeNull();
    expect(() => safeStorage.set("lamp", "on")).not.toThrow();
  });
});
