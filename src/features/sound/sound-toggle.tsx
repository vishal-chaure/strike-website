"use client";

import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/cn";

import { useSound } from "./sound-provider";

/** "Hear it": turns the typewriter's sounds on or off. */
export function SoundToggle({ className }: { className?: string }) {
  const { isOn, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isOn}
      className={buttonClassName({
        variant: "ghost",
        className: cn(isOn && "border-light-green", className),
      })}
    >
      <span
        aria-hidden
        className={cn(
          "size-2 rounded-full bg-text-faint transition-colors",
          isOn && "bg-light-green shadow-[0_0_8px_var(--color-light-green)]",
        )}
      />
      {isOn ? "Sound on" : "Hear it"}
    </button>
  );
}
