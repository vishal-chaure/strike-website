import { cn } from "@/lib/cn";

/** Where the carriage stands (its centre, in px from the rail's left) and how it got there. */
export type CarriagePosition = { x: number; isReturning: boolean };

/**
 * The carriage: the T that strikes each letter, on a rounded housing with an
 * amber slit and three lights — green for sound, amber for the lamp, red near
 * the line's end. Same as the Mac app.
 */
export function Carriage({
  position,
  strikes,
  isSoundOn,
  isNearLineEnd,
}: {
  position: CarriagePosition;
  strikes: number;
  isSoundOn: boolean;
  isNearLineEnd: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 flex w-(--carriage-width) flex-col items-center ease-typewriter",
        position.isReturning
          ? "duration-(--duration-carriage-return)"
          : "duration-(--duration-carriage-advance)",
      )}
      style={{
        translate: `calc(${position.x}px - var(--carriage-width) / 2)`,
        transitionProperty: "translate",
      }}
    >
      {/* Re-mounted on each strike, so the swing plays again. */}
      <div
        key={strikes}
        className="flex h-(--guide-height) flex-col items-center justify-end"
      >
        <span
          className={cn(
            "h-(--crossbar-height) w-(--crossbar-width) origin-bottom rounded-xs bg-carriage-guide lamp-on:bg-carriage-guide-night",
            strikes > 0 && "animate-strike-bar",
          )}
        />
        <span
          className={cn(
            "h-(--stem-height) w-(--stem-width) bg-carriage-guide lamp-on:bg-carriage-guide-night",
            strikes > 0 && "animate-strike",
          )}
        />
      </div>

      <div className="relative h-(--carriage-body-height) w-full rounded-xl bg-linear-to-b from-carriage-top to-carriage-bottom shadow-lg inset-shadow-[0_1px_0_rgb(255_255_255/0.12)]">
        <span className="absolute top-1.5 left-1/2 h-(--slit-height) w-(--slit-width) -translate-x-1/2 rounded-full bg-slit-off transition-colors lamp-on:bg-amber lamp-on:shadow-[0_0_8px_var(--color-amber)]" />
        <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1.5">
          <Light
            isOn={isSoundOn}
            className="bg-light-green"
            glow="shadow-[0_0_7px_var(--color-light-green)]"
          />
          <span className="size-(--indicator-size) rounded-full bg-light-amber opacity-25 transition-opacity lamp-on:opacity-100 lamp-on:shadow-[0_0_7px_var(--color-light-amber)]" />
          <Light
            isOn={isNearLineEnd}
            className="bg-light-red"
            glow="shadow-[0_0_7px_var(--color-light-red)]"
          />
        </div>
      </div>
    </div>
  );
}

function Light({
  isOn,
  className,
  glow,
}: {
  isOn: boolean;
  className: string;
  glow: string;
}) {
  return (
    <span
      className={cn(
        "size-(--indicator-size) rounded-full transition-opacity",
        className,
        isOn ? cn("opacity-100", glow) : "opacity-25",
      )}
    />
  );
}
