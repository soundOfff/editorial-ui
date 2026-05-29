# Changelog

## v0.1.0 — 2026-05-29

Initial release of editorial-ui.

### Components

- **Button** (variants: amber, ghost, quiet, danger, saved, icon; sizes: sm, md, lg)
- **Input**, **Textarea**, **Select** — form input primitives with error/disabled states
- **Checkbox**, **Radio**, **Switch** — form controls
- **Badge**, **Chip**, **Dot**, **Kbd**, **Avatar** — data display primitives
- **Alert** — hybrid simple/compound API (info, success, warn, danger)
- **Card** — variants: standard, quote, stat
- **Table** — compound component (Table.Root, Table.Head, Table.Body, Table.Footer)
- **Progress** — determinate and indeterminate modes
- **EmptyState** — presentational empty view
- **Tabs**, **SegmentedControl** — keyboard-navigable controls
- **Breadcrumb**, **Pagination** — navigation primitives
- **Modal** — portal rendering with focus trap
- **Toast** / **useToast** / **ToastProvider** — queue-managed notifications
- **Tooltip** — CSS-only via `data-tip` attribute
- **SelectionToolbar** — controlled language selector (dropdown deferred to v0.2)
- **Link** — inline, quiet, amber, arrow, danger variants

### Icons

27 SVG icon components via `editorial-ui/icons`:

Check, X, Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
Bookmark, Globe, Tag, Info, Warn, Flame, Plus, Minus, Trash, Edit,
Copy, Download, Play, Settings, Bell, Target, Folder, Sun, Moon, Auto

### Theme

- **ThemeProvider** with light/dark/auto modes
- **accentPresets**: amber, terracotta, sage, indigo, plum

### CSS

- CSS custom properties (`tokens.css`) for all design decisions — includes both `data-theme="dark"` and `@media (prefers-color-scheme: dark)` selectors
- Font loading for Newsreader, Geist, JetBrains Mono (`fonts.css`)
- Full bundle (`styles.css`) — tokens + base reset + all component styles
