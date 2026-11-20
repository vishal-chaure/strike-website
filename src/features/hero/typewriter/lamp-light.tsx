import { cn } from "@/lib/cn";

import type { CarriagePosition } from "./carriage";

/**
 * The night lamp's V of light, rising from the T over the typed words and
 * following the carriage. Only shows while the lamp is on.
 */
export function LampLight({ position }: { position: CarriagePosition }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-0 left-0 h-(--lamp-beam-height) w-(--lamp-beam-width) opacity-0 mix-blend-screen blur-lg ease-typewriter lamp-on:opacity-100",
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
