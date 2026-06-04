# Handoff: Editorial UI — Component Library page

## Overview
This is the implementation handoff for the **Editorial UI component library page** — the single scrolling reference page that showcases all 20 FocusQuote UI primitives (color, type, buttons, forms, data display, overlays, the selection toolbar) in light + dark, with a left navigation rail and a small dev "Tweaks" panel.

**You already have the library.** The component CSS (`focusquote.css`) and tokens (`colors_and_type.css`) exist. This handoff is about building the *showcase page itself* — the rail, the page header, and the 20 "bay" sections — on top of that existing library. You are **not** re-authoring components or tokens; you are assembling a page that consumes them.

## About the design files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look and behaviour, not production code to copy verbatim. Recreate the page in your codebase's existing environment (React/Vue/Svelte/etc.) using your established patterns. If there's no environment yet, plain HTML + the two stylesheets is a perfectly valid target — the page is static.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interactions. Match it pixel-for-pixel; every value you need is already in `colors_and_type.css` / `focusquote.css` as a CSS custom property or class.

---

## How it's built (the important part)

The page is **100% composed from the existing library** — both the components *and* the page scaffolding (`.page`, `.rail`, `.bay`, `.bay-head`, `.spec`, `.spec-grid`, `.swatch`, `.label`) resolve from `focusquote.css` + `colors_and_type.css`. There are no bespoke component styles in the page; it's pure markup plus those two stylesheets.

```html
<link rel="stylesheet" href="colors_and_type.css">  <!-- tokens: color, type, radii, shadow, dark theme -->
<link rel="stylesheet" href="focusquote.css">        <!-- every component + page scaffolding -->
<!-- inline assets/icons.svg ONCE near the top of <body>, then: -->
<svg width="15" height="15"><use href="#i-bookmark"/></svg>
```

Fonts (load before the stylesheets):
`Newsreader` (opsz 6–72, wght 400–700), `Geist` (300–700), `JetBrains Mono` (400–600) — via Google Fonts.

Dark mode: set `data-theme="dark"` on `<html>`. The token file handles the rest.

---

## Page structure

Two-column CSS grid (`.page`, `grid-template-columns: 220px minmax(0,1fr)`, `max-width: 1180px`, centered, gap `48px`).

### 1. Left rail (`<aside class="rail">`) — sticky, independently scrolling
- `position: sticky; top: 32px; height: calc(100vh - 64px); overflow-y: auto`.
- **Scrollbar:** custom thin style with a **transparent track** and a warm muted thumb — do not let it inherit the browser default. Spec:
  ```css
  .rail { scrollbar-width: thin; scrollbar-color: var(--rule-2) transparent; }
  .rail::-webkit-scrollbar { width: 6px; }
  .rail::-webkit-scrollbar-track { background: transparent; }
  .rail::-webkit-scrollbar-thumb { background: var(--rule-2); border-radius: 999px; }
  .rail:hover::-webkit-scrollbar-thumb { background: var(--muted-2); }
  ```
- Contents, top to bottom:
  - **Wordmark** `Editorial` + `<em>UI</em>` (the `UI` half is `--amber-deep`, non-italic). Newsreader 600, 20px.
  - **Build line** `v0.1 · paper kit` — JetBrains Mono, 9.5px, uppercase, `--muted`.
  - **Nav** (`<nav>`, flex column, gap 2px). Grouped by mono small-caps headers (`.rail-group`): **Foundation** (Color & surface, Typography), **Actions** (Buttons, Links), **Forms** (Inputs, Selects, Checkbox · radio · switch, Segmented · tabs), **Data** (Badges & chips, Avatars, Alerts, Cards, Table, Progress), **Navigation** (Pagination & breadcrumbs), **Overlay** (Tooltip · kbd, Modal, Toast, Empty state, Selection toolbar).
  - Each link is an in-page anchor (`href="#colors"` etc.). Hover steps to `--paper-2`; the active link is `--amber-deep`, weight 600, with an amber left border. Active state is set by a scroll-spy (see Behaviour).

### 2. Page header (`<header class="page-head">`)
- Left: `<h1>The component library.</h1>` (Newsreader display) + one-sentence lede.
- Right (`.meta`, mono): `v 0.1.0` · `23 components` · `May 28 · 2026`. Bold the values, mute the labels.

### 3. Main column — 20 "bays" (`<section class="bay" id="…">`)
Each bay = a `.bay-head` (a two-digit mono `.num`, an `<h2>`, and a `.lede` one-liner) followed by component demos laid out with `.spec` (a flex row of examples), `.spec.col` (stacked), or `.spec-grid.cols-2` / `.cols-3`. `.label` is the mono small-caps caption above each demo group.

| # | id | Title | What it demonstrates |
|---|-----|-------|----------------------|
| 01 | `colors` | Color & surface | `.swatch` grids: paper/ink/hairline stack, then brand + status tints |
| 02 | `typography` | Typography | Display / H1 / H2 / body / meta / mono-label specimens |
| 03 | `buttons` | Buttons | `.btn-amber`, `.btn-ghost`, quiet, destructive; sizes (`.btn-sm`); `.btn-icon`; `.btn-block`; `.btn-group` |
| 04 | `links` | Links | inline `.lnk` (soft underline) + standalone arrow-led link |
| 05 | `inputs` | Inputs | `.field` + `.input` / `.textarea`, label + `.opt`, amber focus ring |
| 06 | `selects` | Selects | native `.select` + a static popover-style language menu |
| 07 | `choice` | Checkbox · radio · switch | `.check`, `.radio`, `.switch` — amber active fill |
| 08 | `segmented` | Segmented & tabs | `.segmented` (icon + label) and `.tabs` with count `.badge` |
| 09 | `chips` | Badges & chips | mono `.chip` (+ `.is-blue/.is-sage/.is-clay`) with `.dot`; numeric `.badge` |
| 10 | `avatars` | Avatars | tinted paper circles, mono initials, sizes (`.avatar-sm`) |
| 11 | `alerts` | Alerts | `.alert.is-info/.is-success/.is-warn/.is-danger`, plus `.compact` |
| 12 | `cards` | Cards | standard `.card`, pull-quote `.quote-card`, stat card — all `.spec-grid.cols-3` |
| 13 | `table` | Table | `.table` in `.table-wrap`: mono small-caps `<th>`, hover striping, mono numerals, `.tb-iso` lang chips, row `.actions` |
| 14 | `progress` | Progress | `.progress` hairline track, amber fill; sage/clay system states |
| 15 | `pagi` | Pagination & breadcrumbs | mono `.pagi` numerals, amber-soft active page; breadcrumb trail |
| 16 | `tooltip` | Tooltip & kbd | inverted ink-on-paper tooltip; `<kbd>` keys |
| 17 | `modal` | Modal | popup-shell `.modal` on a dimmed etched-grid `.modal-stage` |
| 18 | `toast` | Toast | inverted ink `.toast` chip, bottom-right of its surface |
| 19 | `empty` | Empty state | dashed paper `.empty` card, glyph + one quiet action |
| 20 | `toolbar` | Selection toolbar | the flagship in-page `.toolbar` popover (amber **Save quote** + translate) — reference assembly |

> The header reads "23 components"; the page is organised into **20 numbered bays** (several bays show multiple related primitives). Keep the "23" copy as-is unless you renumber.

---

## Interactions & behaviour
- **Scroll-spy:** as the user scrolls, the rail link for the section currently in view gets `.is-active`. Implement with an `IntersectionObserver` over the `section.bay` elements, toggling `.is-active` on the matching `.rail nav a`. (The reference uses a small vanilla script at the bottom of the file — port it to your framework's idiom.)
- **Anchor nav:** rail links are in-page jumps to each bay's `id`.
- **Theme toggle + accent:** the reference page ships a small React "Tweaks" dev panel (theme light/dark, accent swatches) wired via a host protocol. **This is a prototyping affordance, not a product feature** — you can drop it and instead expose `data-theme` through your app's normal theme switch. The only thing that matters for the design is that `data-theme="dark"` on `<html>` produces the dark variant (handled entirely by `colors_and_type.css`).
- **Component states** (hover/focus/active/disabled) are all defined in `focusquote.css` — you get them for free by using the classes. Focus is always the amber ring (`box-shadow: 0 0 0 3px rgba(242,160,60,0.18)` + `--amber-deep` border), never the browser default.
- **Motion:** color/background transitions `0.12s`, switch knobs / chevrons `0.18s`, theme cross-fade `0.22s`. No bounces, no looping decorative animation.

## Design tokens
Do not hardcode values — everything is a CSS custom property in `colors_and_type.css`. Key families: paper `--paper / -2 / -3`, ink `--ink / -2`, `--muted / --muted-2`, hairlines `--rule / --rule-2`, `--popup-border`, amber `--amber / --amber-deep / --amber-soft`, status triads `--blue/sage/clay -soft/-ink/-edge`, fonts `--font-serif / --font-sans / --font-mono`, radii `--radius-popup 14 / -card 10 / -control 8 / -chip 7 / -pill 999`, and the warm brown-toned shadow tokens. Full reference: project `README.md` → "Visual foundations".

## Assets
- `assets/icons.svg` — 40-icon inline `<symbol>` sprite (24×24, `stroke: currentColor`, stroke-width ~1.6). Inline once, reference by `#i-<name>`. **No emoji.**
- `assets/logo-mark.svg` — the amber quotation-tile mark (not used on this page, included for completeness).
- Fonts: Newsreader, Geist, JetBrains Mono (Google Fonts).

## Files in this bundle
- `Editorial UI.html` — the full reference page (the design source of truth). Open it in a browser to see the target.
- `focusquote.css` — the component + scaffolding layer you'll consume (already in your repo).
- `colors_and_type.css` — the tokens (already in your repo). `focusquote.css` `@import`s it.
- `assets/icons.svg`, `assets/logo-mark.svg` — the sprite + mark.

This README is self-sufficient: a developer who wasn't in the original conversation can build the page from it plus the two stylesheets.
