import { cn } from "@/lib/cn";

import type { CarriagePosition } from "./carriage";

/**
 * The night lamp, as in the Mac app: a wide, soft glow rising from the T
 * through a V, spreading behind the typed words, buttons and headline, and
 * following the carriage. Only shows while the lamp is on. Place it in the
 * rail: the glow spreads up from the rail's top edge, where the T stands.
 */
export function LampLight({ position }: { position: CarriagePosition }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-full left-0 -z-10 h-(--lamp-glow-reach) w-[calc(var(--lamp-glow-spread)*2)] lamp-glow opacity-0 ease-typewriter lamp-on:opacity-100",
        position.isReturning
          ? "duration-(--duration-carriage-return)"
          : "duration-(--duration-carriage-advance)",
      )}
      style={{
        translate: `calc(${position.x}px - var(--lamp-glow-spread))`,
        transitionProperty: "translate, opacity",
      }}
    />
  );
}
