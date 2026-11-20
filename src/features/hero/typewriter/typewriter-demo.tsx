"use client";

import { useEffect, useRef, useState } from "react";

import { useSound } from "@/features/sound";
import { cn } from "@/lib/cn";

import { typing } from "../lib/typing-engine";
import { Carriage, type CarriagePosition } from "./carriage";
import { LampLight } from "./lamp-light";
import { Rail } from "./rail";
import { TypedLines } from "./typed-lines";
import { useTypewriter } from "./use-typewriter";

/** The page's width, one typed letter's width, and how many letters fit a line, measured in the browser. */
type Metrics = { width: number; letterWidth: number; columns: number };

/**
 * The live typewriter: `text` types itself onto the page above a full-width
 * rail, the carriage under each letter and the T striking it. Each new line
 * pushes the rail down. When it's done, the visitor's keyboard takes over.
 * Click the text to finish it at once.
 */
export function TypewriterDemo({
  text,
  yourTurnHint,
}: {
  text: string;
  yourTurnHint: string;
}) {
  const area = useRef<HTMLDivElement>(null);
  const letter = useRef<HTMLSpanElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  // Measure the page and a letter (again whenever either resizes, e.g. when
  // the window changes or the typewriter font finishes loading).
  useEffect(() => {
    const element = area.current;
    const sample = letter.current;
    if (!element || !sample) return;
    const observer = new ResizeObserver(() => {
      const width = element.clientWidth;
      const letterWidth = sample.getBoundingClientRect().width;
      const rem = parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      setMetrics({
        width,
        letterWidth,
        columns: columnsFor(width - typing.sideRoomRem * 2 * rem, letterWidth),
      });
    });
    observer.observe(element);
    observer.observe(sample);
    return () => observer.disconnect();
  }, []);

  // Only take the visitor's keys while the typewriter is on screen.
  useEffect(() => {
    const element = area.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry?.isIntersecting ?? false),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const columns = metrics?.columns ?? typing.maxColumns;
  const { isOn: isSoundOn } = useSound();
  const typewriter = useTypewriter(text, columns, isOnScreen);

  const position: CarriagePosition = {
    x: metrics
      ? (metrics.width - columns * metrics.letterWidth) / 2 +
        typewriter.column * metrics.letterWidth
      : 0,
    isReturning: typewriter.column === 0,
  };

  return (
    <div ref={area} className="w-full">
      {/* The page: clicking it finishes the typing. */}
      <div
        className="relative pt-16 text-base"
        onClick={typewriter.finish}
        aria-hidden
      >
        <div className="relative mx-auto" style={{ width: `${columns}ch` }}>
          <TypedLines lines={typewriter.lines} />
          {typewriter.visitorLines && (
            <>
              <div className="h-(--typed-line-height)" />
              <TypedLines
                lines={typewriter.visitorLines}
                firstLine={typewriter.lines.length + 1}
              />
            </>
          )}
        </div>
        {/* One letter, measured to place the carriage. */}
        <span ref={letter} className="invisible absolute">
          M
        </span>
      </div>

      <div
        className={metrics ? "mt-(--rail-gap)" : "invisible mt-(--rail-gap)"}
      >
        <Rail>
          <LampLight position={position} />
          <Carriage
            position={position}
            strikes={typewriter.strikes}
            isSoundOn={isSoundOn}
            isNearLineEnd={typewriter.isNearLineEnd}
          />
        </Rail>
      </div>

      <p
        className={cn(
          "mt-5 text-center text-xs text-text-faint transition-opacity duration-(--duration-lamp) pointer-coarse:hidden",
          typewriter.visitorLines ? "opacity-100" : "opacity-0",
        )}
      >
        {yourTurnHint}
      </p>
    </div>
  );
}

/** As many letters as fit in `width`, within the typewriter's limits. */
function columnsFor(width: number, letterWidth: number): number {
  const fit = Math.floor(width / letterWidth);
  return Math.min(typing.maxColumns, Math.max(typing.minColumns, fit));
}
