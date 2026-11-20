/**
 * The typewriter demo's rules, as plain functions: how text wraps into lines,
 * the keystrokes and carriage returns that type it, how long each takes, when
 * the bell rings, how each letter's ink lands, and what a visitor's key does.
 * No timers or DOM here, so it's all testable.
 */

import type { TypewriterSoundName } from "@/features/sound";

export const typing = {
  /** The widest a typed line gets, in letters. */
  maxColumns: 60,
  /** The fewest letters per line on narrow screens. */
  minColumns: 16,
  /** Space kept free at each end of a line, in rem: a clamp and half a carriage. */
  sideRoomRem: 3.5,
  /** The bell rings, and the red light comes on, this many letters before a line's end. */
  nearEndColumns: 6,
  /** A pause before the demo starts, in ms. */
  startDelay: 700,
  /** A breath at the end of a line before the carriage returns, in ms. */
  lineEndPause: 300,
  /** How long the carriage takes to glide back before the next letter, in ms. */
  returnDelay: 520,
  /** After the demo, the wait before the visitor's turn, in ms. */
  yourTurnDelay: 900,
  /** Visitor lines kept before their page is cleared. */
  maxVisitorLines: 3,
} as const;

/** One thing the typewriter does: strike a letter, or return the carriage to a new line. */
export type Step =
  | { kind: "key"; char: string; line: number; column: number }
  | { kind: "return"; line: number };

/** The page at some moment: the lines so far, and where the carriage stands. */
export type Page = { lines: string[]; line: number; column: number };

/**
 * Breaks `text` into lines of at most `columns` letters at word boundaries,
 * like a typist would. A space at a break is dropped, a word longer than a
 * whole line is split, and "\n" always starts a new line.
 */
export function wrapText(text: string, columns: number): string[] {
  const width = Math.max(1, Math.floor(columns));
  const lines: string[] = [];

  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(" ")) {
      const candidate = line === "" ? word : `${line} ${word}`;
      if (candidate.length <= width) {
        line = candidate;
        continue;
      }
      if (line !== "") {
        lines.push(line);
      }
      let rest = word;
      while (rest.length > width) {
        lines.push(rest.slice(0, width));
        rest = rest.slice(width);
      }
      line = rest;
    }
    lines.push(line);
  }
  return lines;
}

/** The keystrokes and returns that type `lines`, in order. */
export function planSteps(lines: readonly string[]): Step[] {
  const steps: Step[] = [];
  lines.forEach((text, line) => {
    if (line > 0) {
      steps.push({ kind: "return", line });
    }
    [...text].forEach((char, column) =>
      steps.push({ kind: "key", char, line, column }),
    );
  });
  return steps;
}

/** The page after the first `done` steps. */
export function pageAt(
  lines: readonly string[],
  steps: readonly Step[],
  done: number,
): Page {
  const last = steps[Math.min(done, steps.length) - 1];
  if (!last) {
    return { lines: [""], line: 0, column: 0 };
  }
  const before = lines.slice(0, last.line);
  if (last.kind === "return") {
    return { lines: [...before, ""], line: last.line, column: 0 };
  }
  const column = last.column + 1;
  return {
    lines: [...before, (lines[last.line] ?? "").slice(0, column)],
    line: last.line,
    column,
  };
}

/** How many of the first `done` steps strike a letter (spaces don't swing the T). */
export function strikesIn(steps: readonly Step[], done: number): number {
  return steps
    .slice(0, done)
    .filter((step) => step.kind === "key" && step.char !== " ").length;
}

/** How long to wait before step `index`, in ms. */
export function stepDelay(
  steps: readonly Step[],
  index: number,
  random: () => number = Math.random,
): number {
  const previous = steps[index - 1];
  if (!previous) return typing.startDelay;
  if (previous.kind === "return") return typing.returnDelay;
  const delay = keyDelay(previous.char, random);
  return steps[index]?.kind === "return" ? delay + typing.lineEndPause : delay;
}

/**
 * How long to wait after striking `char`, in ms: a typist's uneven rhythm,
 * a little longer after a space, and a breath after punctuation.
 */
export function keyDelay(
  char: string,
  random: () => number = Math.random,
): number {
  const rhythm = 55 + random() * 75;
  if (char === " ") return rhythm + 30;
  if (",;:".includes(char)) return rhythm + 160;
  if (".!?".includes(char)) return rhythm + 260;
  return rhythm;
}

/** Whether the carriage is in the last few columns, where the red light is on. */
export function isNearLineEnd(column: number, columns: number): boolean {
  return column >= columns - typing.nearEndColumns;
}

/** Whether striking the letter at `column` rings the bell: once per line, at the warning column. */
export function ringsBell(column: number, columns: number): boolean {
  return column === columns - typing.nearEndColumns;
}

/** The sounds of a step. */
export function soundsOf(step: Step, columns: number): TypewriterSoundName[] {
  if (step.kind === "return") return ["return"];
  const strike: TypewriterSoundName = step.char === " " ? "space" : "key";
  return ringsBell(step.column, columns) ? [strike, "bell"] : [strike];
}

/**
 * What a visitor's key does on their page: Enter returns the carriage, a
 * letter is typed (wrapping onto a new line when needed), and a full page is
 * cleared so typing carries on fresh. Returns the new text, its sounds, and
 * whether the T swung.
 */
export function visitorKey(
  text: string,
  key: string,
  columns: number,
): { text: string; sounds: TypewriterSoundName[]; struck: boolean } | null {
  const isEnter = key === "Enter";
  if (!isEnter && [...key].length !== 1) {
    return null;
  }
  const typed = isEnter ? "\n" : key;
  const candidate = text + typed;
  const before = wrapText(text, columns);
  const after = wrapText(candidate, columns);
  const pageIsFull = after.length > typing.maxVisitorLines;
  const next = pageIsFull ? (isEnter ? "" : typed) : candidate;

  if (isEnter) {
    return { text: next, sounds: ["return"], struck: false };
  }
  const strike: TypewriterSoundName = typed === " " ? "space" : "key";
  const startsNewLine = pageIsFull || after.length > before.length;
  const column = (wrapText(next, columns).at(-1)?.length ?? 1) - 1;
  const sounds: TypewriterSoundName[] = startsNewLine
    ? ["return", strike]
    : [strike];
  if (!startsNewLine && ringsBell(column, columns)) {
    sounds.push("bell");
  }
  return { text: next, sounds, struck: typed !== " " };
}

/**
 * How a letter's ink lands: a slight lift or drop and a lighter or darker
 * strike. The same letter in the same place always lands the same way, so the
 * page doesn't shimmer when it re-renders.
 */
export function inkJitter(
  line: number,
  column: number,
): { offsetY: number; opacity: number } {
  // A small integer hash (Knuth's multiplicative method), split into two
  // values between 0 and 1.
  const hash = Math.imul((line + 1) * 7919 + column * 104729, 2654435761) >>> 0;
  const a = (hash & 0xffff) / 0xffff;
  const b = (hash >>> 16) / 0xffff;
  return {
    offsetY: Number(((a - 0.5) * 1.2).toFixed(2)),
    opacity: Number((0.8 + b * 0.2).toFixed(2)),
  };
}
