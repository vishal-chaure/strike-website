import { describe, expect, it } from "vitest";

import {
  inkJitter,
  isNearLineEnd,
  keyDelay,
  pageAt,
  planSteps,
  ringsBell,
  soundsOf,
  stepDelay,
  strikesIn,
  typing,
  visitorKey,
  wrapText,
} from "./typing-engine";

describe("wrapText", () => {
  it("keeps a short text on one line", () => {
    expect(wrapText("Strike a key.", 20)).toEqual(["Strike a key."]);
  });

  it("breaks at word boundaries and drops the space at the break", () => {
    expect(wrapText("Strike a key. Strike a thought.", 14)).toEqual([
      "Strike a key.",
      "Strike a",
      "thought.",
    ]);
  });

  it("fills a line exactly to its width", () => {
    expect(wrapText("abcd efgh", 4)).toEqual(["abcd", "efgh"]);
  });

  it("splits a word longer than a whole line", () => {
    expect(wrapText("typewriter", 4)).toEqual(["type", "writ", "er"]);
  });

  it("starts a new line at every newline, keeping empty lines", () => {
    expect(wrapText("one\n\ntwo", 10)).toEqual(["one", "", "two"]);
  });

  it("gives one empty line for empty text", () => {
    expect(wrapText("", 10)).toEqual([""]);
  });
});

describe("planSteps and pageAt", () => {
  const lines = ["ab", "c"];
  const steps = planSteps(lines);

  it("types each letter and returns between lines", () => {
    expect(steps).toEqual([
      { kind: "key", char: "a", line: 0, column: 0 },
      { kind: "key", char: "b", line: 0, column: 1 },
      { kind: "return", line: 1 },
      { kind: "key", char: "c", line: 1, column: 0 },
    ]);
  });

  it("starts on an empty line", () => {
    expect(pageAt(lines, steps, 0)).toEqual({
      lines: [""],
      line: 0,
      column: 0,
    });
  });

  it("stands the carriage after the last letter", () => {
    expect(pageAt(lines, steps, 1)).toEqual({
      lines: ["a"],
      line: 0,
      column: 1,
    });
    expect(pageAt(lines, steps, 2)).toEqual({
      lines: ["ab"],
      line: 0,
      column: 2,
    });
  });

  it("is on a fresh line at its start after a return", () => {
    expect(pageAt(lines, steps, 3)).toEqual({
      lines: ["ab", ""],
      line: 1,
      column: 0,
    });
  });

  it("shows everything when all steps are done", () => {
    expect(pageAt(lines, steps, 4)).toEqual({ lines, line: 1, column: 1 });
    expect(pageAt(lines, steps, 99)).toEqual({ lines, line: 1, column: 1 });
  });

  it("counts strikes, not spaces or returns", () => {
    const spaced = planSteps(["a b", "c"]);
    expect(strikesIn(spaced, spaced.length)).toBe(3);
  });
});

describe("timing", () => {
  const steady = () => 0.5;
  const steps = planSteps(["a.", "b"]);

  it("waits before the first letter", () => {
    expect(stepDelay(steps, 0, steady)).toBe(typing.startDelay);
  });

  it("varies a letter within a typist's rhythm", () => {
    expect(keyDelay("a", () => 0)).toBe(55);
    expect(keyDelay("a", () => 1)).toBe(130);
  });

  it("pauses longer after spaces and punctuation", () => {
    const letter = keyDelay("a", steady);
    expect(keyDelay(" ", steady)).toBeGreaterThan(letter);
    expect(keyDelay(",", steady)).toBeGreaterThan(keyDelay(" ", steady));
    expect(keyDelay(".", steady)).toBeGreaterThan(keyDelay(",", steady));
  });

  it("takes a breath before a return, and lets the carriage glide back after it", () => {
    expect(stepDelay(steps, 2, steady)).toBe(
      keyDelay(".", steady) + typing.lineEndPause,
    );
    expect(stepDelay(steps, 3, steady)).toBe(typing.returnDelay);
  });
});

describe("line end", () => {
  const columns = 40;
  const warning = columns - typing.nearEndColumns;

  it("lights the red light from the warning column on", () => {
    expect(isNearLineEnd(warning - 1, columns)).toBe(false);
    expect(isNearLineEnd(warning, columns)).toBe(true);
  });

  it("rings the bell once, at the warning column", () => {
    expect(ringsBell(warning, columns)).toBe(true);
    expect(ringsBell(warning + 1, columns)).toBe(false);
    expect(ringsBell(warning - 1, columns)).toBe(false);
  });

  it("sounds a step: clack, thud, bell, return", () => {
    expect(
      soundsOf({ kind: "key", char: "a", line: 0, column: 0 }, columns),
    ).toEqual(["key"]);
    expect(
      soundsOf({ kind: "key", char: " ", line: 0, column: 0 }, columns),
    ).toEqual(["space"]);
    expect(
      soundsOf({ kind: "key", char: "a", line: 0, column: warning }, columns),
    ).toEqual(["key", "bell"]);
    expect(soundsOf({ kind: "return", line: 1 }, columns)).toEqual(["return"]);
  });
});

describe("visitorKey", () => {
  const columns = 10;

  it("types a letter", () => {
    expect(visitorKey("ab", "c", columns)).toEqual({
      text: "abc",
      sounds: ["key"],
      struck: true,
    });
  });

  it("types a space without swinging the T", () => {
    expect(visitorKey("ab", " ", columns)).toEqual({
      text: "ab ",
      sounds: ["space"],
      struck: false,
    });
  });

  it("returns the carriage on Enter", () => {
    expect(visitorKey("ab", "Enter", columns)).toEqual({
      text: "ab\n",
      sounds: ["return"],
      struck: false,
    });
  });

  it("ignores keys that aren't letters or Enter", () => {
    expect(visitorKey("ab", "Shift", columns)).toBeNull();
    expect(visitorKey("ab", "ArrowLeft", columns)).toBeNull();
  });

  it("returns the carriage when a line fills up", () => {
    expect(visitorKey("abcdefghij", "k", columns)?.sounds).toEqual([
      "return",
      "key",
    ]);
  });

  it("rings the bell at the warning column", () => {
    const text = "a".repeat(columns - typing.nearEndColumns);
    expect(visitorKey(text, "b", columns)?.sounds).toEqual(["key", "bell"]);
  });

  it("starts a fresh page when the page is full", () => {
    const full = Array.from({ length: typing.maxVisitorLines }, () => "x").join(
      "\n",
    );
    expect(visitorKey(full, "Enter", columns)?.text).toBe("");
    expect(visitorKey(full, "y", columns)?.text).toBe(`${full}y`);
  });
});

describe("inkJitter", () => {
  it("lands the same way every time for the same spot", () => {
    expect(inkJitter(2, 7)).toEqual(inkJitter(2, 7));
  });

  it("stays subtle", () => {
    for (let line = 0; line < 5; line++) {
      for (let column = 0; column < 60; column++) {
        const { offsetY, opacity } = inkJitter(line, column);
        expect(Math.abs(offsetY)).toBeLessThanOrEqual(0.6);
        expect(opacity).toBeGreaterThanOrEqual(0.8);
        expect(opacity).toBeLessThanOrEqual(1);
      }
    }
  });

  it("varies from letter to letter", () => {
    const offsets = new Set(
      Array.from({ length: 20 }, (_, column) => inkJitter(0, column).offsetY),
    );
    expect(offsets.size).toBeGreaterThan(10);
  });
});
