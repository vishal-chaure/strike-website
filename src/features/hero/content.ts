/** The hero's words. */
export const heroContent = {
  headline: { lead: "Write like it's", accent: "ink." },
  subtitle: "Strike a key. Strike a thought. Strike a page.",
  /** Typed live by the typewriter, letter by letter. */
  description:
    "Strike turns your Mac into a quiet typewriter for books, notes and todos. No feeds. No pings. Just the page.",
  yourTurn: "Your turn — type anything.",
  screenshot: {
    day: {
      src: "/screenshots/book-day.webp",
      alt: "Strike by day: a book page typed on cream paper, the carriage under the last line.",
    },
    night: {
      src: "/screenshots/book-night.webp",
      alt: "Strike at night: the same page lit by the desk lamp, the carriage under the last line.",
    },
    /** The screenshots' size in pixels (taken at 2x). */
    width: 1982,
    height: 1448,
  },
} as const;
