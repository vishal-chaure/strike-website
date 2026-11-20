# Strike website

The marketing site for Strike, a typewriter for your Mac — [strikeapp.in](https://strikeapp.in).

Next.js 16 (static export), TypeScript, Tailwind CSS 4. Courier Prime is the typewriter font.

## Scripts

| Command             | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Local site at http://localhost:3000            |
| `npm run build`     | Static site written to `out/`                  |
| `npm run check`     | Format check, lint, type check and tests       |
| `npm run format`    | Formats every file                             |
| `npm run test`      | Runs the tests once (`test:watch` keeps going) |
| `npm run typecheck` | TypeScript only                                |

## Structure

```
src/
├─ app/          Routes only: each page just puts sections in order.
├─ features/     One folder per feature (hero, lamp, sound). Each shares
│                only what its index.ts exports.
│   └─ <feature>/
│      ├─ components/   UI pieces
│      ├─ lib/          plain logic, tested next to it (*.test.ts)
│      ├─ content.ts    the words shown
│      └─ index.ts      public exports
├─ components/   Shared UI: layout/ (header, footer) and ui/ (button, ...).
├─ config/       Site facts and navigation links.
├─ lib/          Small shared helpers.
└─ styles/       tokens.css: every colour, timing and size, day and night.
```

## Rules

- `app/` holds routes, metadata and layout only; no logic.
- Components are server-rendered unless they need the browser (`"use client"` on the smallest piece).
- No raw colours or magic numbers in components: use the tokens.
- Words live in `content.ts` / `config/`, not inside components.
- File names are `kebab-case`; imports use `@/`.

## Branches

- `uat`: work in progress
- `main`: the live site
