// Flatten the @import graph of src/styles/index.css into a single,
// self-contained dist/styles/index.css.
//
// tsup's `.css: copy` loader ships each CSS entry verbatim and does NOT inline
// its @imports. Without this step the published `editorial-ui/styles.css`
// (and the CSS the React entry auto-imports) would be nothing but @import lines
// pointing at base.css + components/*.css that were never emitted into dist/ —
// so every component would render unstyled. Run from tsup's `onSuccess` hook.
//
// This is plain text concatenation (no PostCSS, no transforms): the bundled
// output is byte-for-byte the source partials, in @import order. External
// @imports (e.g. Google Fonts url(...)) are left untouched.
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'src/styles/index.css');
const OUT = resolve(root, 'dist/styles/index.css');

const IMPORT_RE = /@import\s+(?:url\()?\s*['"]([^'"]+)['"]\s*\)?\s*;/g;
const isExternal = (spec) => /^(?:https?:)?\/\//.test(spec);

async function inline(filePath, seen = new Set()) {
  const real = resolve(filePath);
  if (seen.has(real)) return ''; // cycle guard
  seen.add(real);

  const css = await readFile(real, 'utf8');
  let out = '';
  let cursor = 0;

  for (const match of css.matchAll(IMPORT_RE)) {
    const [statement, spec] = match;
    out += css.slice(cursor, match.index);
    cursor = match.index + statement.length;

    if (isExternal(spec)) {
      out += statement; // keep external @import as-is
    } else {
      const target = resolve(dirname(real), spec);
      out += await inline(target, seen);
    }
  }

  out += css.slice(cursor);
  return out;
}

const banner =
  '/* Editorial UI — bundled stylesheet. Generated from src/styles/index.css. Do not edit dist/ directly. */\n\n';
const bundled =
  banner + (await inline(SRC)).replace(/\n{3,}/g, '\n\n').trim() + '\n';
await writeFile(OUT, bundled, 'utf8');
console.log(`[build-css] flattened ${OUT} (${bundled.length} bytes)`);
