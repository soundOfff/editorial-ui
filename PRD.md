# PRD: Editorial UI — Standalone Component Library

**Status**: Ready for Implementation  
**Date**: 2026-05-28  
**Author**: Tomi Brasca  
**Target Version**: 0.1.0

---

## Problem Statement

The Editorial UI design system exists only as a monolithic HTML prototype (`Editorial UI.html`, 2332 lines). Developers who want to use these warm-paper-surface, editorial-column components in their React applications have no packaged distribution to import from. The design system's CSS tokens, component styles, and interaction patterns are locked inside a showcase file, making it impossible to:

- Install via npm and use in production applications
- Consume only the components needed (treeshaking)
- Integrate with modern React frameworks (Next.js, Vite, Remix)
- Version and distribute updates independently from FocusQuote
- Build third-party applications using the Editorial design language

The design handoff documentation exists across multiple directories, making it difficult for new contributors to understand the system's principles, token values, and component anatomy without reading scattered markdown files and inspecting HTML source.

## Solution

Extract the Editorial UI design system from the HTML prototype into a standalone, production-ready npm package named `editorial-ui`. The package will provide:

1. **Modular CSS entry points**: fonts.css (Google Fonts imports), tokens.css (design tokens + dark mode), styles.css (complete bundled CSS)
2. **React component library**: TypeScript components with strict typing, ref forwarding, and Tier-1 API quality (matching Radix/shadcn standards)
3. **Icon component set**: 28 SVG icons extracted from the HTML prototype, each with baked stroke-width defaults
4. **Theme customization**: ThemeProvider component with 5 accent color presets (amber, terracotta, sage, indigo, plum)
5. **Clear documentation**: README with installation instructions, usage examples, and design principles

The package will be unscoped (`editorial-ui`, not `@focusquote/editorial-ui`) to position it as a standalone product, allowing use beyond the FocusQuote ecosystem.

## User Stories

1. As a **React developer**, I want to `npm install editorial-ui` and import pre-built components, so that I can build applications with the Editorial design language without writing custom CSS.

2. As a **vanilla JavaScript developer**, I want to import only `editorial-ui/styles.css`, so that I can use the design system's styles with plain HTML without React overhead.

3. As a **Next.js developer**, I want to import `editorial-ui/fonts.css` and `editorial-ui/tokens.css` separately, so that I can control font loading strategy and avoid bundling Google Fonts if I self-host them.

4. As a **design-conscious developer**, I want to customize the accent color (amber → sage), so that my application can use Editorial's structure while matching my brand palette.

5. As a **component consumer**, I want type-safe props with autocomplete (IntelliSense), so that I can discover available variants and sizes without reading documentation.

6. As a **accessibility-focused developer**, I want all interactive components to support keyboard navigation and ARIA attributes out of the box, so that my application meets WCAG standards without additional work.

7. As a **dark mode supporter**, I want the design system to automatically detect `prefers-color-scheme: dark`, so that users see the appropriate theme without JavaScript-based theme switching.

8. As a **theme customizer**, I want to explicitly set `data-theme="dark"` via ThemeProvider, so that I can override the user's OS preference when they toggle my app's theme picker.

9. As a **bundle optimizer**, I want to import only the components I use (e.g., `import { Button, Input } from 'editorial-ui/react'`), so that my production bundle doesn't include unused component code.

10. As a **icon user**, I want to import individual icons (e.g., `import { Search, Globe } from 'editorial-ui/icons'`), so that I can use Editorial's stroke icons with correct default weights without managing SVG files.

11. As a **form builder**, I want to compose input groups (text input + prefix/suffix addons), so that I can build search bars and unit inputs without custom CSS.

12. As a **data display developer**, I want to use compound Table components (`Table.Root`, `Table.Head`, `Table.Body`), so that I can build semantically correct tables with proper styling.

13. As a **modal implementer**, I want focus trap and portal rendering built into the Modal component, so that I don't need to add third-party focus-trap libraries.

14. As a **toast notification user**, I want a `useToast()` hook that returns a queue-managed toast API, so that I can show non-blocking notifications without managing state myself.

15. As a **hybrid API consumer**, I want Alert to support both simple props (`<Alert variant="info" message="..." />`) and compound children (`<Alert variant="info"><Alert.Icon /><Alert.Message>...</Alert.Message></Alert>`), so that I can use the simple case for speed and the compound case for custom content.

16. As a **design system maintainer**, I want exact class names preserved from the HTML prototype (`.btn-amber`, `.alert.is-info`), so that I can diff CSS changes against the original design reference.

17. As a **design token consumer**, I want CSS variable names to match the design handoff exactly (`--amber`, `--paper`, `--ink`), so that I can reference the design documentation without translation.

18. As a **selection toolbar builder**, I want controlled state props on SelectionToolbar (without a built-in language menu), so that I can wire my own dropdown logic in v0.1 while waiting for the full menu implementation in v0.2.

19. As a **visual regression tester**, I want example HTML files that render a representative subset of components, so that I can screenshot-test the library's appearance without building a full app.

20. As a **Next.js 14 developer**, I want a minimal example app in the repository, so that I can see how to integrate editorial-ui into a server-component-first framework.

21. As a **package contributor**, I want strict TypeScript with no `any` types, so that I can confidently refactor components without breaking consumers.

22. As a **codebase explorer**, I want component source organized by type (`src/react/primitives/`, `src/react/data-display/`, `src/react/overlays/`), so that I can quickly locate the file I need to modify.

23. As a **CSS consumer**, I want component CSS split into individual files (`button.css`, `input.css`), so that I can inspect and debug a single component's styles without scrolling through a 1300-line monolith.

24. As a **build tool integrator**, I want CSS files passed through tsup without processing (no PostCSS, no Tailwind), so that I can depend on stable, vanilla CSS output.

25. As a **design principle follower**, I want the library to enforce "one amber action per surface" in its component examples, so that I learn the design system's constraints by reading working code.

## Implementation Decisions

### Package Architecture
- **Bundler**: tsup, chosen for zero-config CSS passthrough (no PostCSS pipeline needed)
- **Build outputs**:
  - `dist/styles/fonts.css` — Google Fonts @import only
  - `dist/styles/tokens.css` — CSS vars + dark mode (both `:root[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`)
  - `dist/styles/index.css` — complete bundled CSS (~20KB, imports tokens + base + all components)
  - `dist/react/index.js` + `.d.ts` — React component entry point (auto-imports styles.css)
  - `dist/react/icons/index.js` + `.d.ts` — Icon components
- **Exports map** (already defined in package.json):
  - `editorial-ui` → React components (default)
  - `editorial-ui/react` → React components (explicit)
  - `editorial-ui/fonts.css`, `editorial-ui/tokens.css`, `editorial-ui/styles.css` → CSS entry points
  - `editorial-ui/icons` → Icon components

### CSS Extraction Strategy
1. **Source**: `/Users/User/Downloads/Editorial UI.html` lines 10-1325
2. **Split into**:
   - `src/styles/fonts.css` — Google Fonts @import only
   - `src/styles/tokens.css` — lines 14-72 (light mode vars) + lines 1233-1316 (dark mode overrides)
     - **Dark mode selectors**: Ship BOTH `:root[data-theme="dark"]` (explicit) AND `@media (prefers-color-scheme: dark)` (auto-detect)
   - `src/styles/base.css` — lines 77-92 (reset + body styles)
   - `src/styles/components/*.css` — one file per component (button.css, link.css, input.css, textarea.css, select.css, checkbox.css, radio.css, switch.css, segmented-control.css, tabs.css, chip.css, badge.css, dot.css, avatar.css, kbd.css, tooltip.css, alert.css, card.css, table.css, progress.css, pagination.css, breadcrumb.css, modal.css, toast.css, empty-state.css, selection-toolbar.css)
   - `src/styles/index.css` — imports `@import './tokens.css'; @import './base.css'; @import './components/button.css'; ...`
3. **Preservation**: Class names and token names must be byte-identical to the HTML prototype (no renaming, no BEM conversion)

### React Component Standards
- **TypeScript**: Strict mode enabled, no `any` types
- **Ref forwarding**: All components use `React.forwardRef`
- **Prop naming conventions**: `variant`, `size`, `disabled` (not "type", "isDisabled", "isActive")
- **Compound components**: Modal, Table, Alert (hybrid: supports both simple props and compound children)
- **No clsx dependency**: Use template literals for conditional className building
- **No asChild pattern in v0.1**: Defer Radix-style slot composition to v0.2
- **Accessibility**: Keyboard navigation, ARIA labels, focus trap in Modal (use react-focus-lock or native focus management)
- **Auto CSS import**: React entry point (`src/react/index.ts`) imports `../styles/index.css` so consumers get styles automatically

### Component Organization
```
src/react/
├── primitives/         # Button, Link, Input, Textarea, Select, Checkbox, Radio, Switch
├── controls/           # SegmentedControl, Tabs
├── data-display/       # Chip, Badge, Dot, Avatar, Kbd, Alert, Card, Table, Progress, EmptyState
├── navigation/         # Pagination, Breadcrumb
├── overlays/           # Modal, Toast, Tooltip, SelectionToolbar
├── theme/              # ThemeProvider, accentPresets
└── index.ts            # Re-export all components + import '../styles/index.css'
```

### Icon Extraction
- **Source**: `/Users/User/Downloads/Editorial UI.html` lines 1330-1360 (SVG symbol definitions)
- **Count**: 28 icons (Check, X, Search, ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Bookmark, Globe, Tag, Info, Warn, Flame, Plus, Minus, Trash, Edit, Copy, Download, Play, Settings, Bell, Target, Folder, Sun, Moon, Auto)
- **Per-icon stroke-width defaults** (from HTML usage analysis):
  - 2.2: Check (in saved states)
  - 2.0: Info/Warn dot paths
  - 1.8: X, Plus, Minus
  - 1.7: Globe, Info, Warn, Flame
  - 1.6 (default): Search, Chevrons, ArrowRight, Bookmark, Tag, Trash, Edit, Copy, Download, Bell, Target, Folder, Sun, Moon
  - 1.4: Settings (uniquely thin)
- **Props**: Each icon accepts `size?: number`, `strokeWidth?: number`, `className?: string`, `...svgProps`
- **File structure**: `src/react/icons/Check.tsx`, `src/react/icons/Search.tsx`, etc., with `src/react/icons/index.ts` re-exporting all

### Theme System
- **ThemeProvider component**: Accepts `accent?: [base: string, deep: string, soft: string]` prop
- **Accent presets** (export from `src/react/theme/presets.ts`):
  ```ts
  export const accentPresets = {
    amber: ['#F2A03C', '#C77A1F', '#FBE6C8'],
    terracotta: ['#DD6B4A', '#A8442A', '#F6D9CC'],
    sage: ['#6A8F66', '#3F5C3C', '#DCE7D6'],
    indigo: ['#5B7EC8', '#3E5DA0', '#DBE2F1'],
    plum: ['#B07AB0', '#7C4F7C', '#EAD8EA']
  } as const;
  ```
- **Implementation**: ThemeProvider sets `data-theme="dark"` attribute on root element and injects CSS variables `--amber`, `--amber-deep`, `--amber-soft` when custom accent is provided
- **Auto dark mode**: No ThemeProvider needed for auto dark mode — `tokens.css` includes `@media (prefers-color-scheme: dark)` selector

### Component-Specific Decisions
- **Alert**: Hybrid API — `<Alert variant="info" message="Saved" />` (simple) or `<Alert variant="info"><Alert.Icon /><Alert.Message>Custom content</Alert.Message></Alert>` (compound)
- **SelectionToolbar**: Ship v0.1 WITHOUT language menu dropdown (defer to v0.2). Provide controlled `fromLanguage`, `toLanguage`, `onFromClick`, `onToClick` props for consumers to wire their own menu.
- **Modal**: Portal rendering (use ReactDOM.createPortal), focus trap, `open` controlled prop, `onClose` callback, `Modal.Header`, `Modal.Body`, `Modal.Footer` compound structure
- **Toast**: Export `useToast()` hook (returns `{ toast, dismiss, dismissAll }`) and `<Toaster />` component (renders portal, manages queue)
- **Table**: Compound structure `<Table.Root><Table.Head>...</Table.Head><Table.Body>...</Table.Body><Table.Footer>...</Table.Footer></Table.Root>` matching HTML `<table><thead><tbody><tfoot>` anatomy

### Design Principles (from handoff docs)
Codified in component implementations and examples:
1. **One amber action per surface** — never two amber buttons at once
2. **Hairlines over shadows** — `1px solid var(--rule)` dividers, not card drop-shadows
3. **Mono small-caps for labels only** — JetBrains Mono 10.5px uppercase, never for body text
4. **Newsreader only at serif moments** — wordmark, headings, quote titles (not interface body)
5. **No new colors** — every color reference goes through a CSS variable (enforce in code review)

### Example Applications
1. **vanilla.html**: Representative subset (~10 components: Button variants, Input, Alert, Card, Modal trigger, no showcase chrome). Placed in `examples/vanilla/index.html`. Serves as visual regression baseline.
2. **next-app**: Minimal Next.js 14 app (App Router, server components where possible). Imports `editorial-ui/react` and renders a few components. Placed in `examples/next-app/`. Demonstrates framework integration.

## Testing Decisions

### What Makes a Good Test
- **Test external behavior, not implementation details**: Assert on rendered output (DOM structure, class names, ARIA attributes), not on internal state or private methods.
- **No mocking of CSS**: Tests should verify that components render with correct class names, not that specific styles are applied (visual regression tests handle that).
- **Accessibility**: Every interactive component test should verify keyboard navigation (Tab, Enter, Escape) and ARIA attributes (`role`, `aria-label`, `aria-expanded`).

### Which Modules Will Be Tested
1. **React components** (unit tests with Vitest + React Testing Library):
   - Primitives: Button (all variants, sizes, disabled state), Input (text, search, prefix/suffix), Textarea, Select
   - Compound components: Modal (open/close, focus trap, portal), Alert (simple props vs compound children), Table (proper semantic HTML)
   - Hooks: useToast (queue management, dismiss, dismissAll)
   - Theme: ThemeProvider (data-theme attribute, CSS variable injection)
2. **Icons** (smoke tests): Verify each icon renders without error and accepts strokeWidth prop
3. **Visual regression** (manual, not automated in v0.1): Screenshot vanilla.html and next-app example in light/dark mode

### Prior Art for Tests
- **No prior art in this repository** (new package, no existing tests)
- **External reference**: Radix UI test suite (compound components, keyboard nav, portal rendering), React Testing Library examples (accessibility matchers like `toHaveAccessibleName`, `toBeInTheDocument`)

### What NOT to Test
- CSS specifics (don't assert `backgroundColor: 'rgb(242, 160, 60)'` — that's what visual regression is for)
- Internal component state (don't mock useState or test state transitions directly)
- Build output (don't test that tsup bundles correctly — trust the build tool)

## Out of Scope

### v0.1 Exclusions (defer to v0.2+)
- **asChild pattern**: No Radix-style slot composition (no `asChild` prop for rendering components as different elements)
- **SelectionToolbar language menu**: No built-in dropdown — provide controlled props for consumers to wire their own
- **Popover primitives**: No generic Popover/Dropdown components (SelectionToolbar and Select use CSS-only solutions in v0.1)
- **Animation system**: No motion library integration (Framer Motion, React Spring) — use CSS transitions only
- **Server-side rendering edge cases**: No explicit SSR hydration mismatch handling beyond standard React practices
- **Storybook or Ladle**: No interactive component explorer (examples/vanilla.html and examples/next-app serve as references)
- **Automated visual regression**: Manual screenshot comparison only (no Percy, Chromatic, or Playwright visual testing)
- **Internationalization**: No i18n for component strings (labels, ARIA text are English-only)
- **Advanced theming**: No CSS-in-JS, no runtime style generation, no theme tokens beyond accent color override

### Not a Design System Generator
- No Figma plugin or design token export
- No automatic component generation from design files
- No design documentation site (README.md is the single source of documentation)

### Not a Full Application Framework
- No routing components (Breadcrumb is presentational only, not wired to React Router)
- No form validation (consumers bring their own: React Hook Form, Formik, Zod)
- No data fetching (no Table pagination logic, no infinite scroll)
- No state management (no Zustand/Redux integration)

### Not Targeting Non-React Frameworks
- No Vue, Svelte, Angular versions (CSS-only usage is supported via `editorial-ui/styles.css`, but no framework-specific components)
- No Web Components (no custom elements, no shadow DOM)

## Further Notes

### Design System Source of Truth
1. **CSS extraction**: `/Users/User/Downloads/Editorial UI.html` lines 10-1325 (complete CSS) and lines 1330-1360 (SVG icon symbols)
2. **Design handoff docs**: `/Users/User/Tomi/focus-quote/apps/extension/assets/design_handoff_focusquote_direction_a/` (TOKENS.md, COMPONENTS.md, README.md)
3. **Domain language**: `/Users/User/Tomi/focus-quote/CONTEXT.md` (FocusQuote-specific terms — NOT applicable to editorial-ui package itself)

### What NOT to Do (from prior session feedback)
- ❌ Don't rename tokens or class names (preserve exact names from HTML prototype)
- ❌ Don't add CSS processing (no PostCSS, no Tailwind, no autoprefixer)
- ❌ Don't add runtime dependencies beyond React (no clsx, no classnames, no Radix primitives)
- ❌ Don't implement language menu in SelectionToolbar (explicitly v0.2 feature)
- ❌ Don't create ADRs unless user explicitly asks (conversation + this PRD are the record)
- ❌ Don't git commit until user approves (last attempt was blocked by user preference)

### What TO Preserve
- ✅ Exact class names from Editorial UI.html (`.btn-amber`, `.alert.is-info`, `.lnk-arrow`, etc.)
- ✅ Exact token names and values (`--amber`, `--paper`, `--ink`, etc.)
- ✅ Component DOM structure from showcase (semantic HTML, ARIA attributes)
- ✅ Per-icon stroke-width defaults (Check=2.2, Globe=1.7, default=1.6)
- ✅ Dark mode selector strategy (both `data-theme="dark"` and `@media (prefers-color-scheme: dark)`)

### Implementation Task Breakdown (from handoff document)
This PRD corresponds to 9 tasks identified in the handoff session:
1. ✅ Initialize package structure (COMPLETED: directories created, package.json configured)
2. Extract CSS from Editorial UI.html → organize into fonts.css, tokens.css, base.css, component CSS files
3. Create primitive React components (Button, Input, Textarea, Select, Checkbox, Radio, Switch)
4. Create data display React components (Alert, Card, Table, Progress, EmptyState, Chip, Badge, Dot, Avatar, Kbd)
5. Create overlay React components (Modal, Toast, Tooltip, SelectionToolbar)
6. Extract 28 icon components from SVG symbols
7. Build ThemeProvider + export accent presets
8. Create examples (vanilla.html subset, Next.js app)
9. Tests + README + CHANGELOG

### Repository Status
- **Not a git repository yet**: `/Users/User/Tomi/editorial-ui` is not initialized with git (handoff note: "Don't git commit until user approves")
- **GitHub URL in package.json**: `https://github.com/tomibrasca/editorial-ui.git` (repository does not exist yet)
- **Once initialized**: This PRD should be published as a GitHub issue with label `ready-for-agent`

### Contact & Ownership
- **Author**: Tomi Brasca (tomibrasca97@gmail.com)
- **License**: MIT (already in repository)
- **Version target**: 0.1.0 (first public release)

---

**Ready for implementation.** All architectural questions were resolved in the prior grilling session. No new decisions needed — proceed with Task #2 (CSS extraction).
