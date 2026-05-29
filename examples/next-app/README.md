# editorial-ui — Next.js 14 Example

This example demonstrates how to integrate `editorial-ui` with a **Next.js 14 App Router** project.

## What it shows

- **SSR compatibility** — All components in the showcase are rendered as React Server Components (no `'use client'` directive required for purely presentational components).
- **CSS variable theming** — Typography, color tokens (`--ink`, `--muted`), and font stacks (`--font-serif`, `--font-sans`) are applied via raw `style` props, showing that the design system works without any CSS-in-JS runtime.
- **Font loading** — `editorial-ui/fonts.css` is imported once in the root layout and applies globally, the same as any other global stylesheet.
- **ESM handling** — `transpilePackages: ['editorial-ui']` in `next.config.js` ensures Next.js correctly transpiles the library's ESM output.

## Components showcased

- `Button` — all four variants (`amber`, `ghost`, `quiet`, `danger`) plus a disabled state
- `Input` — normal and disabled states
- `Checkbox` — pre-checked state

## How to run

```bash
# From the repo root, build the library first (generates dist/)
npm run build

# Then install and start the example
cd examples/next-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the showcase.

## Notes

- The `editorial-ui` dependency points to `file:../../`, so it always references the local build. Re-run `npm run build` in the repo root whenever you change the library source.
- Only components that are merged to `main` are imported. The page will grow as additional components (`Select`, `Radio`, `Switch`, `Textarea`, …) are showcased in future updates.
