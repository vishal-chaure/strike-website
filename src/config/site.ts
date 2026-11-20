/** Facts about Strike used across the site: one place to change them. */
export const site = {
  name: "Strike",
  tagline: "A typewriter for your Mac",
  description:
    "Strike turns your Mac into a quiet typewriter. Write books, notes and todos on real paper, with the clack of every key and a lamp for late nights.",
  url: "https://strikeapp.in",
  download: {
    // Points at the .dmg once it's published.
    url: "#download",
    requirement: "macOS 15 or later",
  },
} as const;
