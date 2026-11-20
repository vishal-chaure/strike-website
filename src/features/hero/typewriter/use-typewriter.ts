"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useSound } from "@/features/sound";

import {
  isNearLineEnd,
  pageAt,
  planSteps,
  soundsOf,
  stepDelay,
  strikesIn,
  typing,
  visitorKey,
  wrapText,
} from "../lib/typing-engine";
import { useReducedMotion } from "./use-reduced-motion";

/** Keys typed into these go there, not onto the typewriter. */
const TYPING_TARGETS = "input, textarea, select, button, a, [contenteditable]";

export type TypewriterState = {
  /** The typed description, line by line. */
  lines: string[];
  /** The visitor's own page, once it's their turn; null before that. */
  visitorLines: string[] | null;
  /** The carriage's column on the current (last) line. */
  column: number;
  /** Goes up on every letter struck, so the T swings each time. */
  strikes: number;
  isNearLineEnd: boolean;
  /** Types the rest of the description at once. */
  finish: () => void;
};

/**
 * Plays the description onto the page letter by letter (with its sounds),
 * starting once the typewriter has been seen, then hands the keyboard to the
 * visitor while it's on screen. With reduced motion the description appears
 * whole.
 *
 * @param columns letters per line (from the measured width)
 */
export function useTypewriter(
  text: string,
  columns: number,
  { isOnScreen, hasBeenSeen }: { isOnScreen: boolean; hasBeenSeen: boolean },
): TypewriterState {
  const { play } = useSound();
  const reducedMotion = useReducedMotion();

  const lines = useMemo(() => wrapText(text, columns), [text, columns]);
  const steps = useMemo(() => planSteps(lines), [lines]);

  const [done, setDone] = useState(0);
  const [visitorText, setVisitorText] = useState<string | null>(null);
  const [visitorStrikes, setVisitorStrikes] = useState(0);
  const visitorTextRef = useRef(visitorText);

  const isDescriptionDone = reducedMotion || done >= steps.length;
  const page = pageAt(lines, steps, isDescriptionDone ? steps.length : done);

  // Type the description, one step per tick, once the typewriter has been seen.
  useEffect(() => {
    if (isDescriptionDone || !hasBeenSeen) return;
    const timer = setTimeout(
      () => {
        const step = steps[done];
        if (step) soundsOf(step, columns).forEach(play);
        setDone(done + 1);
      },
      stepDelay(steps, done),
    );
    return () => clearTimeout(timer);
  }, [done, steps, columns, isDescriptionDone, hasBeenSeen, play]);

  // Then it's the visitor's turn.
  useEffect(() => {
    if (!isDescriptionDone || visitorText !== null) return;
    const timer = setTimeout(
      () => {
        visitorTextRef.current = "";
        setVisitorText("");
      },
      reducedMotion ? 0 : typing.yourTurnDelay,
    );
    return () => clearTimeout(timer);
  }, [isDescriptionDone, visitorText, reducedMotion]);

  // The visitor's keys strike the page while the typewriter is on screen.
  const isVisitorsTurn = visitorText !== null;
  useEffect(() => {
    if (!isVisitorsTurn || !isOnScreen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing)
        return;
      if (
        event.target instanceof Element &&
        event.target.closest(TYPING_TARGETS)
      )
        return;

      const result = visitorKey(
        visitorTextRef.current ?? "",
        event.key,
        columns,
      );
      if (!result) return;
      event.preventDefault(); // keep Space from scrolling the page
      visitorTextRef.current = result.text;
      setVisitorText(result.text);
      if (result.struck) setVisitorStrikes((count) => count + 1);
      result.sounds.forEach(play);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVisitorsTurn, isOnScreen, columns, play]);

  const visitorLines =
    visitorText === null ? null : wrapText(visitorText, columns);
  const column = visitorLines
    ? (visitorLines.at(-1)?.length ?? 0)
    : page.column;

  return {
    lines: page.lines,
    visitorLines,
    column,
    strikes:
      strikesIn(steps, isDescriptionDone ? steps.length : done) +
      visitorStrikes,
    isNearLineEnd: column > 0 && isNearLineEnd(column, columns),
    finish: () => setDone(steps.length),
  };
}
