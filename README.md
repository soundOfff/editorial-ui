# editorial-ui

A React component library built on editorial design principles — warm paper surfaces, one amber action per view, hairlines over shadows.

## Installation

```bash
npm install editorial-ui
```

## Quick Start

```tsx
// In your app entry / layout
import 'editorial-ui/fonts.css';   // Newsreader, Geist, JetBrains Mono
import 'editorial-ui/styles.css';  // all component styles

// Use components
import { Button, Input, Alert } from 'editorial-ui';
import { Search } from 'editorial-ui/icons';
import { ThemeProvider, accentPresets } from 'editorial-ui';

function App() {
  return (
    <ThemeProvider accent={accentPresets.sage}>
      <Button variant="amber">Save</Button>
    </ThemeProvider>
  );
}
```

> **Note:** If you import from `editorial-ui` (the default React entry), styles are bundled automatically — you do not need to import `editorial-ui/styles.css` separately. Import `styles.css` only when using CSS-only (no React).

## Design Principles

Editorial UI encodes four constraints shared by long-form reading environments:

1. **One amber action per view** — a single primary call-to-action is visually distinct; every other action is ghost, quiet, or danger.
2. **Hairlines over shadows** — dividers use `1px solid var(--rule)`; cards sit on the surface plane rather than floating above it.
3. **Paper surfaces** — backgrounds use warm off-white (`--paper`, `--paper-raised`) rather than pure white or cool grey.
4. **Serif for reading, sans for UI** — Newsreader appears at wordmarks, headings, and quote titles; Geist handles all interface text; JetBrains Mono is reserved for small-caps labels.

## Component Reference

### Primitives

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Button` | Primary interactive element | `variant`: `amber` \| `ghost` \| `quiet` \| `danger` \| `saved` \| `icon`; `size`: `sm` \| `md` \| `lg` |
| `Input` | Text input with optional prefix/suffix | `type`, `prefix`, `suffix`, `error`, `disabled` |
| `Textarea` | Multiline text input | `error`, `disabled`, `rows` |
| `Select` | Native dropdown | `error`, `disabled` |
| `Link` | Inline anchor | `variant`: `inline` \| `quiet` \| `amber` \| `arrow` \| `danger` |

### Form Controls

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Checkbox` | Single checkbox with label | `checked`, `onChange`, `disabled`, `error` |
| `Radio` | Radio button | `checked`, `onChange`, `disabled` |
| `Switch` | Toggle switch | `checked`, `onChange`, `disabled` |

### Data Display

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Badge` | Status label | `variant`: `default` \| `amber` \| `success` \| `danger` \| `info` |
| `Chip` | Removable tag | `onRemove`, `disabled` |
| `Dot` | Status indicator dot | `variant`: `amber` \| `success` \| `danger` \| `info` \| `neutral` |
| `Kbd` | Keyboard shortcut label | `children` |
| `Avatar` | User avatar | `src`, `alt`, `size`, `initials` |
| `Alert` | Contextual message — hybrid simple/compound API | `variant`: `info` \| `success` \| `warn` \| `danger`; `message` (simple) or `<Alert.Icon>` / `<Alert.Message>` (compound) |
| `Card` | Content container | `variant`: `standard` \| `quote` \| `stat` |
| `Table` | Compound table | `Table.Root`, `Table.Head`, `Table.Body`, `Table.Footer` |
| `Progress` | Progress indicator | `value` (0–100); omit for indeterminate |
| `EmptyState` | Presentational empty view | `icon`, `heading`, `description`, `action` |

#### Alert — simple vs compound

```tsx
// Simple
<Alert variant="info" message="Your draft was saved." />

// Compound — custom content
<Alert variant="warn">
  <Alert.Icon />
  <Alert.Message>
    <strong>Heads up:</strong> This action cannot be undone.
  </Alert.Message>
</Alert>
```

#### Table — compound structure

```tsx
<Table.Root>
  <Table.Head>
    <tr><th>Title</th><th>Status</th></tr>
  </Table.Head>
  <Table.Body>
    <tr><td>Article</td><td>Draft</td></tr>
  </Table.Body>
  <Table.Footer>
    <tr><td colSpan={2}>10 results</td></tr>
  </Table.Footer>
</Table.Root>
```

### Navigation

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Tabs` | Keyboard-navigable tab bar | `value`, `onChange`, `items` |
| `SegmentedControl` | Mutually exclusive button group | `value`, `onChange`, `options` |
| `Breadcrumb` | Presentational path trail | `items` (array of `{ label, href? }`) |
| `Pagination` | Page navigation | `page`, `totalPages`, `onChange` |

### Overlays

| Component | Description | Key Props |
|-----------|-------------|-----------|
| `Modal` | Portal-rendered dialog with focus trap | `open`, `onClose`; compound: `Modal.Header`, `Modal.Body`, `Modal.Footer` |
| `Tooltip` | CSS-only tooltip via data attribute | `data-tip` attribute on any element |
| `SelectionToolbar` | Controlled language selector | `fromLanguage`, `toLanguage`, `onFromClick`, `onToClick` |
| `Toast` / `useToast` / `ToastProvider` | Queue-managed notifications | `useToast()` returns `{ toast, dismiss, dismissAll }` |

#### Modal — compound structure

```tsx
<Modal open={isOpen} onClose={() => setOpen(false)}>
  <Modal.Header>Edit Article</Modal.Header>
  <Modal.Body>
    <Input label="Title" />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="amber">Save</Button>
  </Modal.Footer>
</Modal>
```

#### Toast — hook usage

```tsx
// Wrap your app
<ToastProvider>
  <App />
</ToastProvider>

// Inside any component
const { toast, dismiss } = useToast();

toast({ message: 'Article saved.', variant: 'success' });
```

### Icons

27 SVG icon components available from `editorial-ui/icons`. Each accepts `size?: number`, `strokeWidth?: number`, `className?: string`, and any standard SVG prop.

```tsx
import { Search, Globe, ChevronDown } from 'editorial-ui/icons';

<Search size={16} />
<Globe strokeWidth={1.7} />
```

**Available icons:**

`Check`, `X`, `Search`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `ArrowRight`,
`Bookmark`, `Globe`, `Tag`, `Info`, `Warn`, `Flame`, `Plus`, `Minus`, `Trash`, `Edit`,
`Copy`, `Download`, `Play`, `Settings`, `Bell`, `Target`, `Folder`, `Sun`, `Moon`, `Auto`

### Theme

```tsx
import { ThemeProvider, accentPresets } from 'editorial-ui';

// Use a preset accent color
<ThemeProvider accent={accentPresets.sage}>
  ...
</ThemeProvider>

// Custom accent tuple [base, deep, soft]
<ThemeProvider accent={['#6A8F66', '#3F5C3C', '#DCE7D6']}>
  ...
</ThemeProvider>
```

**Available presets:** `amber` (default), `terracotta`, `sage`, `indigo`, `plum`

## Exports

| Import | Contents |
|--------|----------|
| `editorial-ui` or `editorial-ui/react` | All React components (styles auto-imported) |
| `editorial-ui/icons` | 27 SVG icon components |
| `editorial-ui/fonts.css` | Font face declarations (Newsreader, Geist, JetBrains Mono) |
| `editorial-ui/tokens.css` | CSS custom properties only — no component styles |
| `editorial-ui/styles.css` | Full CSS bundle (tokens + base + all components) |

## Dark Mode

Wrap your app in `ThemeProvider` and pass a `theme` prop:

```tsx
// Explicit dark mode
<ThemeProvider theme="dark">...</ThemeProvider>

// Explicit light mode
<ThemeProvider theme="light">...</ThemeProvider>

// Follow OS preference (default when ThemeProvider is omitted)
<ThemeProvider theme="auto">...</ThemeProvider>
```

Dark mode styles are also included in `tokens.css` via `@media (prefers-color-scheme: dark)`, so they apply automatically even without `ThemeProvider` — the provider is only needed to override the OS setting programmatically.

## CSS-Only Usage

You can use Editorial UI's design tokens and component styles in a plain HTML project without React:

```html
<link rel="stylesheet" href="node_modules/editorial-ui/dist/styles/index.css" />

<button class="btn-amber">Save</button>
<div class="alert is-info">Your draft was saved.</div>
```

## Contributing

Contributions welcome. Please open an issue before submitting a PR for new components or breaking changes.

## License

MIT — see [LICENSE](./LICENSE) for details.

Repository: [github.com/soundOfff/editorial-ui](https://github.com/soundOfff/editorial-ui)
