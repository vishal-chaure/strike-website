/** What Strike does, one feature at a time, shown beside the app. */
export const showcaseContent = {
  features: [
    {
      label: "Books",
      title: "Write a book, page by page.",
      text: "Real pages of 25 lines. The bell rings as a page fills, a fresh sheet rolls in, and the whole book saves as a PDF.",
    },
    {
      label: "Notes",
      title: "Notes that feel like letters.",
      text: "Every note on its own sheet, saved as you type. Keep a carbon copy as an image or a PDF.",
    },
    {
      label: "Todos",
      title: "Stamp it done.",
      text: "One line per task. Stamp DONE, URGENT or LATER with a key, and the list sorts itself.",
    },
    {
      label: "Lamp",
      title: "A lamp for late nights.",
      text: "One key and the room goes dark. The page stays lit, and the light follows every letter.",
    },
    {
      label: "Sound",
      title: "Hear every key.",
      text: "The clack of each letter, the bell at the line's end, the carriage gliding home.",
    },
  ],
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
