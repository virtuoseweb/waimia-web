/**
 * check-seo.mjs — Gate CI : invariants SEO sur le HTML déjà bâti (dist/client).
 *
 * Checks :
 *   1. meta-description-length  : présence + longueur ≤ 160 chars
 *   2. canonical-present        : présence de <link rel="canonical" href="...">
 *   3. noindex-not-in-sitemap   : aucune page noindex n'apparaît dans sitemap-0.xml
 *
 * Usage :
 *   node scripts/check-seo.mjs            # résumé (3 exemples par check)
 *   node scripts/check-seo.mjs --report   # verbose (toutes les occurrences)
 *
 * Exit codes :
 *   0  tout propre (ou uniquement violations connues dans ALLOWLIST)
 *   1  violations hors allowlist
 *   2  dist/client ou sitemap-0.xml manquant
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist', 'client');
const SITEMAP = join(DIST, 'sitemap-0.xml');
const VERBOSE = process.argv.includes('--report');

// ─── ALLOWLIST — violations connues/acceptées (non-bloquantes) ──────────────
// Format : { 'check-name': ['chemin/relatif/à/dist/client'] }
const ALLOWLIST = {
  'meta-description-length': [],
  'canonical-present': [],
  'noindex-not-in-sitemap': [],
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function walk(dir, predicate) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function normalizePath(p) {
  if (!p) return '/';
  p = p.split('#')[0].split('?')[0];
  if (p.length > 1) p = p.replace(/\/+$/, '');
  if (p === '') p = '/';
  return p;
}

function isNoindex(html) {
  return /content=["']?noindex/i.test(html);
}

function isExcludedPath(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  return (
    rel.startsWith('preview/') ||
    rel.startsWith('components/') ||
    rel.startsWith('compare/') ||
    rel.startsWith('admin/')
  );
}

function relPath(file) {
  return relative(DIST, file).split(sep).join('/');
}

function isAllowlisted(checkName, file) {
  const rel = relPath(file);
  return (ALLOWLIST[checkName] || []).some((p) => rel === p || rel.startsWith(p));
}

// ─── Pre-flight ───────────────────────────────────────────────────────────────

if (!existsSync(DIST)) {
  console.error('✗ dist/client introuvable — lance d\'abord `pnpm build`.');
  process.exit(2);
}
if (!existsSync(SITEMAP)) {
  console.error('✗ dist/client/sitemap-0.xml introuvable.');
  process.exit(2);
}

// ─── Collect HTML files ───────────────────────────────────────────────────────

const allHtmlFiles = walk(DIST, (f) => f.endsWith('.html'));
const indexableFiles = allHtmlFiles.filter((f) => !isExcludedPath(f) && !isNoindex(readFileSync(f, 'utf8')));

// ─── Parse sitemap <loc> → Set of pathnames ──────────────────────────────────

const sitemapXml = readFileSync(SITEMAP, 'utf8');
const sitemapPathnames = new Set();
const locPattern = /<loc>(https?:\/\/[^/]*)([^<]*)<\/loc>/gi;
let locMatch;
while ((locMatch = locPattern.exec(sitemapXml)) !== null) {
  const pathname = normalizePath(locMatch[2] || '/');
  sitemapPathnames.add(pathname);
}

// ─── Check 1 : meta-description-length ───────────────────────────────────────

function checkMetaDescription(files) {
  const violations = [];
  const knownViolations = [];

  for (const file of files) {
    const html = readFileSync(file, 'utf8');

    // Match <meta name="description" content="..."> in any attribute order
    const metaDescRegex = /<meta\s+(?:[^>]*?\s+)?name=["']description["'][^>]*>/gi;
    const altMetaDescRegex = /<meta\s+(?:[^>]*?\s+)?content=["'][^"']*["'][^>]*\s+name=["']description["'][^>]*>/gi;

    let found = false;
    let descContent = null;

    // Try name=... content=... order
    const match1 = metaDescRegex.exec(html);
    if (match1) {
      const contentMatch = /content=["']([^"']*)["']/i.exec(match1[0]);
      if (contentMatch) {
        found = true;
        descContent = contentMatch[1];
      }
    }

    // Try content=... name=... order (if not found yet)
    if (!found) {
      const match2 = altMetaDescRegex.exec(html);
      if (match2) {
        const contentMatch = /content=["']([^"']*)["']/i.exec(match2[0]);
        if (contentMatch) {
          found = true;
          descContent = contentMatch[1];
        }
      }
    }

    if (!found) {
      const entry = { file, issue: 'absente' };
      if (isAllowlisted('meta-description-length', file)) knownViolations.push(entry);
      else violations.push(entry);
      continue;
    }

    if (descContent.length > 160) {
      const entry = { file, issue: `${descContent.length} chars > 160`, content: descContent };
      if (isAllowlisted('meta-description-length', file)) knownViolations.push(entry);
      else violations.push(entry);
    }
  }

  return { violations, knownViolations };
}

// ─── Check 2 : canonical-present ─────────────────────────────────────────────

function checkCanonical(files) {
  const violations = [];
  const knownViolations = [];

  // Match <link rel="canonical" href="..."> in any attribute order
  const canonicalRegex = /<link\s+(?:[^>]*?\s+)?rel=["']canonical["'][^>]*>/gi;
  const altCanonicalRegex = /<link\s+(?:[^>]*?\s+)?href=["'][^"']*["'][^>]*\s+rel=["']canonical["'][^>]*>/gi;

  for (const file of files) {
    const html = readFileSync(file, 'utf8');

    const found = canonicalRegex.test(html) || altCanonicalRegex.test(html);
    // Reset lastIndex after .test()
    canonicalRegex.lastIndex = 0;
    altCanonicalRegex.lastIndex = 0;

    if (!found) {
      const entry = { file, issue: 'absente' };
      if (isAllowlisted('canonical-present', file)) knownViolations.push(entry);
      else violations.push(entry);
    }
  }

  return { violations, knownViolations };
}

// ─── Check 3 : noindex-not-in-sitemap ────────────────────────────────────────

function checkNoindexNotInSitemap() {
  const violations = [];
  const knownViolations = [];

  // Build noindex path set from ALL html files (excluded + non-excluded)
  const noindexPaths = new Set();
  for (const file of allHtmlFiles) {
    const html = readFileSync(file, 'utf8');
    if (isNoindex(html)) {
      // Derive pathname from file path
      const rel = relative(DIST, file).split(sep).join('/');
      // Convert file path to URL pathname
      // e.g. "blog/index.html" -> "/blog" ; "index.html" -> "/"
      let pathname;
      if (rel === 'index.html') {
        pathname = '/';
      } else if (rel.endsWith('/index.html')) {
        pathname = '/' + rel.slice(0, -'/index.html'.length);
      } else if (rel.endsWith('.html')) {
        pathname = '/' + rel.slice(0, -'.html'.length);
      } else {
        pathname = '/' + rel;
      }
      noindexPaths.add(normalizePath(pathname));
    }
  }

  // Check each noindex page against sitemap
  for (const file of allHtmlFiles) {
    const html = readFileSync(file, 'utf8');
    if (!isNoindex(html)) continue;

    const rel = relative(DIST, file).split(sep).join('/');
    let pathname;
    if (rel === 'index.html') {
      pathname = '/';
    } else if (rel.endsWith('/index.html')) {
      pathname = '/' + rel.slice(0, -'/index.html'.length);
    } else if (rel.endsWith('.html')) {
      pathname = '/' + rel.slice(0, -'.html'.length);
    } else {
      pathname = '/' + rel;
    }
    pathname = normalizePath(pathname);

    if (sitemapPathnames.has(pathname)) {
      const entry = { file, issue: `noindex mais présente dans sitemap (${pathname})` };
      if (isAllowlisted('noindex-not-in-sitemap', file)) knownViolations.push(entry);
      else violations.push(entry);
    }
  }

  return { violations, knownViolations };
}

// ─── Run checks ───────────────────────────────────────────────────────────────

const checks = [
  { name: 'meta-description-length', label: 'Meta description (présence + ≤ 160 chars)', files: indexableFiles },
  { name: 'canonical-present', label: 'Canonical (présence)', files: indexableFiles },
  { name: 'noindex-not-in-sitemap', label: 'Noindex absent du sitemap', files: null },
];

const results = {};

results['meta-description-length'] = checkMetaDescription(indexableFiles);
results['canonical-present'] = checkCanonical(indexableFiles);
results['noindex-not-in-sitemap'] = checkNoindexNotInSitemap();

// ─── Report ───────────────────────────────────────────────────────────────────

const LINE = '═'.repeat(68);
const SEP = '─'.repeat(68);

console.log(`\n${LINE}`);
console.log('  check:seo — Invariants SEO sur dist/client');
console.log(`  Pages indexables : ${indexableFiles.length} / ${allHtmlFiles.length} HTML`);
console.log(`  URLs sitemap     : ${sitemapPathnames.size}`);
console.log(LINE);

let totalViolations = 0;
let totalKnown = 0;

for (const check of checks) {
  const { violations, knownViolations } = results[check.name];
  totalViolations += violations.length;
  totalKnown += knownViolations.length;

  const statusIcon = violations.length === 0 ? '✓' : '✗';
  console.log(`\n[${violations.length}] ${check.name} : ${violations.length} violation(s)`);
  console.log(`     ${check.label}`);

  if (violations.length > 0) {
    const sample = VERBOSE ? violations : violations.slice(0, 3);
    for (const v of sample) {
      const rel = relPath(v.file);
      const detail = v.content ? ` — "${v.content.slice(0, 80)}${v.content.length > 80 ? '…' : ''}"` : '';
      console.log(`  ✗ ${rel} : ${v.issue}${detail}`);
    }
    if (!VERBOSE && violations.length > 3) {
      console.log(`  … et ${violations.length - 3} autre(s). Ajoute --report pour tout voir.`);
    }
  } else {
    console.log(`  ${statusIcon} Aucune violation`);
  }
}

if (totalKnown > 0) {
  console.log(`\n${SEP}`);
  console.log(`⚠  Connus (gated — non-bloquants) : ${totalKnown} violation(s)`);
  for (const check of checks) {
    const { knownViolations } = results[check.name];
    if (knownViolations.length === 0) continue;
    console.log(`\n   [${knownViolations.length}] ${check.name}`);
    const sample = VERBOSE ? knownViolations : knownViolations.slice(0, 3);
    for (const v of sample) {
      console.log(`   ⚠  ${relPath(v.file)} : ${v.issue}`);
    }
    if (!VERBOSE && knownViolations.length > 3) {
      console.log(`   … et ${knownViolations.length - 3} autre(s). Ajoute --report pour tout voir.`);
    }
  }
}

console.log(`\n${LINE}`);

if (totalViolations > 0) {
  console.log(`✗  ${totalViolations} violation(s) hors allowlist — exit 1`);
  console.log(LINE);
  process.exit(1);
} else {
  console.log(`✓  Tous les checks passent — exit 0`);
  console.log(LINE);
  process.exit(0);
}
