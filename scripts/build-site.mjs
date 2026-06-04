// Build the static showcase site that gets published to GitHub Pages.
//
// The deployable landing/showcase is examples/vanilla/_verify.html. It loads the
// library straight from dist/styles/*.css via a "../../dist/" relative path, which
// only resolves inside the repo tree. For Pages we flatten everything into a single
// self-contained `site/` folder:
//
//   site/
//     index.html        <- _verify.html, with dist paths rewritten + version synced
//     dist/styles/...   <- a copy of the built library stylesheets/fonts
//
// The version strings in the showcase are kept in sync with package.json so the
// page never drifts from the published library. Run AFTER `npm run build` so dist/
// exists. Output dir (site/) is git-ignored — it's a build artifact.
import { readFile, writeFile, rm, mkdir, cp } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_HTML = resolve(root, 'examples/vanilla/_verify.html');
const DIST = resolve(root, 'dist');
const OUT = resolve(root, 'site');

const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const version = pkg.version; // e.g. "0.1.0"
const [major, minor] = version.split('.'); // "0", "1"
const minorVersion = `${major}.${minor}`; // "0.1"

// --- Sync the version strings shown in the showcase with package.json ---------
// Each rule is anchored on the surrounding markup (not the literal number) so a
// version bump in package.json is enough — the source HTML never has to change.
let html = await readFile(SRC_HTML, 'utf8');

const rules = [
  // Left-rail build badge:  <div class="build">v0.1 · paper kit</div>
  [/(class="build">v)\d+\.\d+/, `$1${minorVersion}`],
  // Header meta:            <div>v <b>0.1.0</b></div>
  [/(v <b>)\d+\.\d+\.\d+(<\/b>)/, `$1${version}$2`],
  // Footer:                 <span>Editorial UI · v0.1.0</span>
  [/(Editorial UI[^<v]*v)\d+\.\d+\.\d+/, `$1${version}`],
];

for (const [re, replacement] of rules) {
  if (!re.test(html)) {
    console.warn(
      `[build-site] WARNING: version marker not found for ${re} — the showcase markup changed; update scripts/build-site.mjs`,
    );
    continue;
  }
  html = html.replace(re, replacement);
}

// --- Rewrite the in-repo dist path to the flattened site layout ---------------
//   ../../dist/styles/...  ->  dist/styles/...
html = html.replace(/\.\.\/\.\.\/dist\//g, 'dist/');

// --- Emit site/ ---------------------------------------------------------------
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await writeFile(resolve(OUT, 'index.html'), html, 'utf8');
// `.nojekyll` stops GitHub Pages' Jekyll pass from ignoring files/dirs that
// start with an underscore (harmless here, but standard for static sites).
await writeFile(resolve(OUT, '.nojekyll'), '', 'utf8');
await cp(DIST, resolve(OUT, 'dist'), { recursive: true });

console.log(
  `[build-site] wrote ${OUT}/index.html (editorial-ui v${version}) + bundled dist/`,
);
