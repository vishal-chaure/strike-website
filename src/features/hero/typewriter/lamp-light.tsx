import { cn } from "@/lib/cn";

import type { CarriagePosition } from "./carriage";

/**
 * The night lamp's V of light: rising from the T and spreading over the whole
 * hero, behind its words, following the carriage. Only shows while the lamp
 * is on. Place it in the rail (its point sits on the rail's top edge).
 */
export function LampLight({ position }: { position: CarriagePosition }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-full left-0 -z-10 h-(--lamp-beam-height) w-(--lamp-beam-width) opacity-0 blur-2xl ease-typewriter lamp-on:opacity-100",
        position.isReturning
          ? "duration-(--duration-carriage-return)"
          : "duration-(--duration-carriage-advance)",
      )}
      style={{
        translate: `calc(${position.x}px - var(--lamp-beam-width) / 2)`,
        transitionProperty: "translate, opacity",
      }}
    >
      <div className="size-full lamp-beam" />
    </div>
  );
}
