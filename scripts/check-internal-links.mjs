#!/usr/bin/env node
/**
 * check-internal-links.mjs
 * Waimia · Chantier industrialisation (gate anti-404)
 *
 * Crawls the built site (dist/client/**\/*.html), extracts every INTERNAL href,
 * and verifies each target resolves to a built page (or an astro.config redirect).
 * Comble le trou qui a laisse passer des 404 internes.
 *
 * Resolution model (Astro output:'static', trailingSlash:'never') :
 *   /foo            -> dist/client/foo/index.html  OR  dist/client/foo.html
 *   /               -> dist/client/index.html
 *   /a.pdf, /x.png  -> dist/client/a.pdf (asset : checked as a file)
 *   redirect target -> astro.config redirects map (string | { destination })
 *
 * Anti-faux-positif (ignores) :
 *   - #ancres pures, mailto:, tel:, javascript:, data:
 *   - http(s):// externes (et // protocol-relative)
 *   - on strip ?query et #hash avant resolution
 *
 * Classification SOURCE :
 *   Pages INTERNES (noindex, catalogue DS, demo) : liens casses = WARNING non-bloquant.
 *   Pages INDEXABLES (publiques) : liens casses = ERROR bloquant (exit 1).
 *
 * Exit : 0 si aucun lien casse depuis page indexable · 1 si >=1 error bloquant
 *        · 2 si dist absent / 0 page crawlee.
 *
 * Constraints : Node built-ins only, deterministic, 0 em-dash U+2014 (rule 58).
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist', 'client');
const ASTRO_CONFIG = 'astro.config.mjs';

const collator = new Intl.Collator('en');
const alpha = (a, b) => collator.compare(a, b);

// ─── Internal (noindex) source prefixes ───────────────────────────────────────
// Aligned with sitemap filter + robots disallow in astro.config.mjs.
// A broken link whose SOURCE page path starts with one of these prefixes is
// classified as WARNING (non-blocking) instead of ERROR (blocking).
// Source = the HTML file path relative to dist/client, e.g. /preview/hero/index.html
// -> normalized to /preview/hero before matching.
const INTERNAL_SOURCE_PREFIXES = [
  '/bienvenue/',
  '/agence/design-system',
  '/agence/ds-studio',
  '/agence/hero-lab',
  '/preview/',
  '/components/',
  '/categories/',
  '/compare/',
  '/commerce/',
  '/lp/',
  '/ecole/formation/',
  '/admin/',
];

/** Returns true if the source page path is an internal/noindex page. */
function isInternalSource(sourceRel) {
  // sourceRel is like /preview/hero/index.html or /agence/design-system/index.html
  // Strip the trailing /index.html or .html to get the logical page path.
  const pagePath = sourceRel
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '');
  return INTERNAL_SOURCE_PREFIXES.some((prefix) => {
    // Exact match (e.g. /agence/design-system) or prefix match with slash boundary.
    if (prefix.endsWith('/')) return pagePath.startsWith(prefix) || pagePath + '/' === prefix;
    return pagePath === prefix || pagePath.startsWith(prefix + '/');
  });
}

// ─── Redirect map from astro.config ───────────────────────────────────────────

/**
 * Statically parses the `redirects: { ... }` object of astro.config.mjs.
 * Supports both forms : '/from': '/to'  and  '/from': { destination: '/to' }.
 * Returns Set of redirect SOURCE paths (normalized, no trailing slash) : a link
 * whose target matches a redirect source is considered valid (it 30x-resolves).
 */
function parseRedirectSources(configSrc) {
  const sources = new Set();
  const m = /redirects\s*:\s*\{/.exec(configSrc);
  if (!m) return sources;
  const start = m.index + m[0].length - 1; // at '{'
  let depth = 0;
  let end = -1;
  for (let i = start; i < configSrc.length; i++) {
    if (configSrc[i] === '{') depth++;
    else if (configSrc[i] === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end === -1) return sources;
  const body = configSrc.slice(start + 1, end);
  // Strip comment lines so commented examples never count as real redirects.
  const clean = body.replace(/\/\/[^\n]*/g, '');
  for (const e of clean.matchAll(/'([^']+)'\s*:/g)) {
    sources.add(normalize(e[1]));
  }
  return sources;
}

// ─── Path helpers ─────────────────────────────────────────────────────────────

function normalize(p) {
  if (!p) return '/';
  // strip query + hash
  let s = p.split('#')[0].split('?')[0];
  if (s === '') return '/';
  // collapse trailing slash (trailingSlash:'never') except root
  if (s.length > 1 && s.endsWith('/')) s = s.replace(/\/+$/, '');
  return s || '/';
}

function isInternal(href) {
  if (!href) return false;
  const h = href.trim();
  if (h === '') return false;
  if (h.startsWith('#')) return false; // pure anchor
  if (/^(mailto:|tel:|javascript:|data:)/i.test(h)) return false;
  if (/^https?:\/\//i.test(h)) return false; // absolute external
  if (h.startsWith('//')) return false; // protocol-relative external
  return h.startsWith('/'); // only root-relative internal links are validated
}

/** Resolve an internal path to a built artifact. Returns true if it exists. */
function resolves(pathname, redirectSources) {
  const p = normalize(pathname);
  if (p === '/') return existsSync(join(DIST, 'index.html'));
  if (redirectSources.has(p)) return true;

  const rel = p.replace(/^\/+/, ''); // drop leading slash
  // 1) directory page : <p>/index.html
  if (existsSync(join(DIST, rel, 'index.html'))) return true;
  // 2) flat html : <p>.html
  if (existsSync(join(DIST, rel + '.html'))) return true;
  // 3) literal asset/file : <p> exists as a file
  const direct = join(DIST, rel);
  if (existsSync(direct) && statSync(direct).isFile()) return true;
  return false;
}

// ─── HTML crawl ───────────────────────────────────────────────────────────────

function walkHtml(dir, acc) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walkHtml(full, acc);
    else if (name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function extractHrefs(html) {
  const hrefs = [];
  for (const m of html.matchAll(/\shref\s*=\s*"([^"]*)"/gi)) hrefs.push(m[1]);
  for (const m of html.matchAll(/\shref\s*=\s*'([^']*)'/gi)) hrefs.push(m[1]);
  return hrefs;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  if (!existsSync(DIST)) {
    console.error(`FATAL : dist absent (${posix.relative(ROOT, DIST)}). Lancer le build d'abord.`);
    process.exit(2);
  }

  const redirectSources = existsSync(join(ROOT, ASTRO_CONFIG))
    ? parseRedirectSources(readFileSync(join(ROOT, ASTRO_CONFIG), 'utf8'))
    : new Set();

  const pages = walkHtml(DIST, []);
  if (pages.length === 0) {
    console.error('FATAL : 0 page HTML crawlee dans dist/client.');
    process.exit(2);
  }

  // broken target -> { errors: Set<sourceRel>, warnings: Set<sourceRel> }
  // errors   = source is an indexable public page (blocking)
  // warnings = source is an internal/noindex page (non-blocking)
  const broken = new Map();
  let totalLinks = 0;
  const cache = new Map(); // pathname -> boolean (resolves)

  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const sourceRel = '/' + page.slice(DIST.length + 1).replace(/\\/g, '/');
    const internal = isInternalSource(sourceRel);
    for (const href of extractHrefs(html)) {
      if (!isInternal(href)) continue;
      totalLinks++;
      const target = normalize(href);
      let ok = cache.get(target);
      if (ok === undefined) {
        ok = resolves(target, redirectSources);
        cache.set(target, ok);
      }
      if (!ok) {
        if (!broken.has(target)) broken.set(target, { errors: new Set(), warnings: new Set() });
        if (internal) {
          broken.get(target).warnings.add(sourceRel);
        } else {
          broken.get(target).errors.add(sourceRel);
        }
      }
    }
  }

  // Split into two buckets.
  // A target is a blocking error only if at least one of its sources is indexable.
  const errorTargets = [...broken.keys()].filter((t) => broken.get(t).errors.size > 0).sort(alpha);
  const warnOnlyTargets = [...broken.keys()].filter((t) => broken.get(t).errors.size === 0).sort(alpha);

  const totalBroken = broken.size;
  console.log(
    `check-internal-links: ${pages.length} pages, ${totalLinks} liens internes, ${totalBroken} cible(s) cassee(s) (${errorTargets.length} bloquant(s), ${warnOnlyTargets.length} warning(s)).`,
  );

  if (totalBroken === 0) {
    console.log('OK : aucun lien interne casse.');
    process.exit(0);
  }

  /** Print a broken-link block for a given target and its source set. */
  function printBlock(stream, target, sources) {
    stream(`  ${target}`);
    for (const src of [...sources].sort(alpha).slice(0, 5)) stream(`      <- ${src}`);
    if (sources.size > 5) stream(`      ... +${sources.size - 5} autre(s) page(s)`);
  }

  if (errorTargets.length > 0) {
    console.error('');
    console.error('LIENS CASSES (pages indexables) -> bloquant :');
    for (const target of errorTargets) {
      printBlock(console.error.bind(console), target, broken.get(target).errors);
    }
  }

  if (warnOnlyTargets.length > 0) {
    console.warn('');
    console.warn('Liens casses depuis pages internes (demo catalogue) -> warning non-bloquant :');
    for (const target of warnOnlyTargets) {
      const { warnings } = broken.get(target);
      printBlock(console.warn.bind(console), target, warnings);
    }
    // Also surface warnings for error-targets that also have internal sources.
    const errorTargetsWithWarnings = errorTargets.filter((t) => broken.get(t).warnings.size > 0);
    for (const target of errorTargetsWithWarnings) {
      printBlock(console.warn.bind(console), target, broken.get(target).warnings);
    }
  }

  process.exit(errorTargets.length > 0 ? 1 : 0);
}

main();
