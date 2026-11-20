import { inkJitter } from "../lib/typing-engine";

/**
 * Lines of typed letters, each landing with its own touch of uneven ink.
 * `firstLine` keeps each letter's ink unique across blocks of lines.
 */
export function TypedLines({
  lines,
  firstLine = 0,
}: {
  lines: readonly string[];
  firstLine?: number;
}) {
  return lines.map((text, index) => {
    const line = firstLine + index;
    return (
      <div
        key={line}
        className="h-(--typed-line-height) leading-(--typed-line-height) whitespace-pre"
      >
        {[...text].map((char, column) => {
          const { offsetY, opacity } = inkJitter(line, column);
          return (
            <span
              key={column}
              className="inline-block ink"
              style={{ translate: `0 ${offsetY}px`, opacity }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  });
}
