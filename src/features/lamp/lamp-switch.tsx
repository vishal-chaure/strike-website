"use client";

import { buttonClassName } from "@/components/ui/button";
import { BulbIcon } from "@/components/ui/icons";

import { useLamp } from "./use-lamp";

/**
 * Switches the night lamp: the whole site goes from cream paper to a dark,
 * lamp-lit room. The label follows the page's own attribute (set before
 * paint), so it's right from the first frame.
 */
export function LampSwitch() {
  const { isOn, toggle } = useLamp();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isOn}
      className={buttonClassName({
        variant: "ghost",
        size: "sm",
        className: "lamp-on:border-amber/40 lamp-on:text-amber",
      })}
    >
      <BulbIcon className="size-4 lamp-on:drop-shadow-[0_0_6px_var(--color-amber)]" />
      <span className="lamp-on:hidden">Lamp off</span>
      <span className="hidden lamp-on:inline">Lamp on</span>
    </button>
  );
}
