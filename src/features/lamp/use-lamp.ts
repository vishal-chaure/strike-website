"use client";

import { useCallback, useSyncExternalStore } from "react";

import { safeStorage } from "@/lib/safe-storage";

import { LAMP_ATTRIBUTE, LAMP_STORAGE_KEY } from "./lamp-script";

/** The lamp lives on <html> (set before paint by the lamp script); this reads and watches it. */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributeFilter: [LAMP_ATTRIBUTE],
  });
  return () => observer.disconnect();
}

function isLampOn(): boolean {
  return document.documentElement.getAttribute(LAMP_ATTRIBUTE) === "on";
}

/** The server can't know; the lamp script corrects the page before paint. */
function isLampOnOnServer(): boolean {
  return false;
}

/** Whether the lamp is on, and a way to switch it (remembered for next time). */
export function useLamp(): { isOn: boolean; toggle: () => void } {
  const isOn = useSyncExternalStore(subscribe, isLampOn, isLampOnOnServer);

  const toggle = useCallback(() => {
    const next = isLampOn() ? "off" : "on";
    document.documentElement.setAttribute(LAMP_ATTRIBUTE, next);
    safeStorage.set(LAMP_STORAGE_KEY, next);
  }, []);

  return { isOn, toggle };
}
