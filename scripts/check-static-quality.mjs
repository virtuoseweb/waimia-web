#!/usr/bin/env node
// scripts/check-static-quality.mjs
// ─────────────────────────────────────────────────────────────────────────────
// Gate qualité GF-1 STRUCTUREL (sans navigateur) sur le HTML bâti.
// Scanne dist/client/**/*.html et vérifie 4 invariants sur les pages INDEXÉES
// (user-facing) uniquement. Les pages catalogue internes (preview/components/
// compare/ + tout HTML noindex) sont EXCLUES : ni vérifiées, ni comptées.
//
// 4 checks :
//   1. heading-order  — exactement un <h1> + aucun saut descendant > 1
//   2. internal-links — redirect-aware (ROUTES ∪ REDIRECTS ∪ ASSETS)
//   3. img-alt        — <img> sans attribut alt= (alt="" = OK décoratif)
//   4. html-lang      — <html> sans attribut lang=
//
// Exit : 0 propre · 1 violation(s) hors allowlist · 2 dist/client introuvable
//        ou parse vide (0 page scannée).
//
// Usage : node scripts/check-static-quality.mjs [--report]
//   --report = verbeux (toutes occurrences) ; défaut = résumé (3 exemples/check).
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist', 'client');
const ASTRO_CONFIG = join(ROOT, 'astro.config.mjs');

const VERBOSE = process.argv.includes('--report');

// ── Allowlist = DETTE TRACKÉE, PAS un masquage ───────────────────────────────
// Une cible allowlistée reste AFFICHÉE (section « ⚠ Connus gated ») et comptée à
// part, mais n'incrémente PAS le total bloquant et ne déclenche PAS exit 1. Elle
// matérialise une décision Simon en attente (page à créer ou rediriger), pas une
// régression. Dès qu'une cible HORS allowlist apparaît → exit 1 (vraie régression).
// Curer une entrée = acter la dette ; la retirer une fois la page créée/redirigée.
// Signature lien = la cible ; signature heading/lang = le chemin de page.
const ALLOWLIST = {
  'internal-links': [
    // gated produit — pages sous-offres conseil à créer ou rediriger (décision Simon)
    '/offres/cybersecurite-ia',
    '/offres/dette-technique-ia',
    '/offres/finops-ia',
    '/offres/gouvernance-donnees',
    '/offres/roadmap-ia',
    '/offres/rpa-vers-agents',
    // gated légal/RGPD — page confidentialité à créer (décision Simon)
    '/legal/privacy',
    '/en/legal/privacy',
  ],
  'heading-order': [],
  'img-alt': [],
  'html-lang': [],
};

// ── 0. Garantir le build ─────────────────────────────────────────────────────
function ensureDist() {
  if (existsSync(DIST)) return true;
  console.error('[check-static-quality] dist/client absent → tentative de build…');
  try {
    const npx = (() => {
      try { return execSync('command -v npx', { encoding: 'utf8' }).trim(); }
      catch { return 'npx'; }
    })();
    execSync(`${npx} -y pnpm@9.15.0 build`, { cwd: ROOT, stdio: 'inherit' });
  } catch (e) {
    console.error('[check-static-quality] build échoué :', e.message);
    return false;
  }
  return existsSync(DIST);
}

// ── Walk récursif ────────────────────────────────────────────────────────────
function walk(dir, predicate) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

// ── Normalisation route (trailingSlash: never) ───────────────────────────────
function normalizePath(p) {
  if (!p) return '/';
  // strip query + hash
  p = p.split('#')[0].split('?')[0];
  // strip slash final (sauf racine)
  if (p.length > 1) p = p.replace(/\/+$/, '');
  if (p === '') p = '/';
  return p;
}

// ── 1. ROUTES : routes existantes depuis l'arborescence dist/client ──────────
function buildRoutes(htmlFiles) {
  const routes = new Set();
  for (const file of htmlFiles) {
    const rel = relative(DIST, file).split(sep).join('/'); // ex. cas/plateau/index.html
    let route;
    if (rel === 'index.html') {
      route = '/';
    } else if (rel.endsWith('/index.html')) {
      route = '/' + rel.slice(0, -'/index.html'.length); // X/Y/index.html → /X/Y
    } else if (rel.endsWith('.html')) {
      route = '/' + rel.slice(0, -'.html'.length); // X.html → /X
    } else {
      continue;
    }
    routes.add(normalizePath(route));
  }
  return routes;
}

// ── 2. REDIRECTS : clés sources du bloc redirects de astro.config.mjs ────────
function buildRedirects() {
  const redirects = new Set();
  if (!existsSync(ASTRO_CONFIG)) return redirects;
  const src = readFileSync(ASTRO_CONFIG, 'utf8');
  // Isoler le bloc redirects: { ... } (équilibre des accolades).
  const idx = src.indexOf('redirects:');
  if (idx === -1) return redirects;
  const braceStart = src.indexOf('{', idx);
  if (braceStart === -1) return redirects;
  let depth = 0;
  let end = braceStart;
  for (let i = braceStart; i < src.length; i++) {
    const c = src[i];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) { end = i; break; }
    }
  }
  const block = src.slice(braceStart, end + 1);
  for (let line of block.split('\n')) {
    const trimmed = line.trim();
    // IGNORER les lignes commentées.
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue;
    // Retirer un éventuel commentaire de fin de ligne (sécurité ; pas d'URL avec // ici).
    const noComment = trimmed.replace(/\s*\/\/.*$/, '');
    // Capter une clé source : '/source': '/target'  OU  '/source': { ... }
    const m = noComment.match(/^['"](\/[^'"]*)['"]\s*:/);
    if (m) redirects.add(normalizePath(m[1]));
  }
  return redirects;
}

// ── 3. ASSETS : fichiers réels présents sur disque dans dist/client ──────────
// Vérifie l'existence d'un fichier pour les liens type /favicon.ico, /og/*.png,
// /sitemap-0.xml, /robots.txt, /fonts/*.woff2, /_astro/*.css …
function assetExists(target) {
  // target normalisé sans query/hash/slash final ; reconstruire le chemin disque.
  const cleaned = target.replace(/^\/+/, '');
  if (!cleaned) return false;
  const full = join(DIST, cleaned.split('/').join(sep));
  try {
    return existsSync(full) && statSync(full).isFile();
  } catch {
    return false;
  }
}

// ── Extraction du contenu indexé ─────────────────────────────────────────────
function isNoindex(html) {
  return /content=["']?noindex/i.test(html);
}

function isExcludedPath(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  return (
    rel.startsWith('preview/') ||
    rel.startsWith('components/') ||
    rel.startsWith('compare/')
  );
}

// ── Checks ───────────────────────────────────────────────────────────────────
function checkHeadingOrder(route, html, violations) {
  if (ALLOWLIST['heading-order'].includes(route)) return;
  const levels = [];
  const re = /<h([1-6])[\s>]/gi;
  let m;
  while ((m = re.exec(html)) !== null) levels.push(parseInt(m[1], 10));

  const h1Count = levels.filter((l) => l === 1).length;
  if (h1Count !== 1) {
    violations.push({ page: route, issue: `h1 count = ${h1Count} (attendu : 1)` });
  }
  // Saut descendant > 1 entre deux titres consécutifs.
  for (let i = 1; i < levels.length; i++) {
    const prev = levels[i - 1];
    const cur = levels[i];
    if (cur > prev && cur - prev > 1) {
      violations.push({ page: route, issue: `saut h${prev}→h${cur}` });
    }
  }
}

function checkInternalLinks(route, html, byTarget, gatedByTarget, ROUTES, REDIRECTS) {
  const re = /href=["'](\/[^"']*)["']/gi;
  let m;
  const seen = new Set();
  while ((m = re.exec(html)) !== null) {
    let href = m[1];
    // exclure protocol-relative //, mailto/tel déjà filtrés (commencent pas par /),
    // hash pur déjà exclu (commence par #, pas /).
    if (href.startsWith('//')) continue;
    const target = normalizePath(href);
    if (target === '' || target === '#') continue;
    if (seen.has(target)) continue; // dédup par page
    seen.add(target);

    const valid =
      ROUTES.has(target) ||
      REDIRECTS.has(target) ||
      assetExists(target);
    if (valid) continue;

    // Cible non résolue : soit dette gated trackée (allowlist → bucket séparé,
    // affiché mais non bloquant), soit vraie régression (byTarget → bloquant).
    const bucket = ALLOWLIST['internal-links'].includes(target)
      ? gatedByTarget
      : byTarget;
    if (!bucket.has(target)) bucket.set(target, []);
    bucket.get(target).push(route);
  }
}

function checkImgAlt(route, html, violations) {
  if (ALLOWLIST['img-alt'].includes(route)) return;
  const re = /<img\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    // alt présent (même vide) = OK. Attribut absent = violation.
    if (!/\salt\s*=/i.test(tag)) {
      violations.push({ page: route, tag: tag.slice(0, 120) });
    }
  }
}

function checkHtmlLang(route, html, violations) {
  if (ALLOWLIST['html-lang'].includes(route)) return;
  const m = html.match(/<html\b[^>]*>/i);
  if (!m) {
    violations.push({ page: route, issue: '<html> introuvable' });
    return;
  }
  if (!/\slang\s*=/i.test(m[0])) {
    violations.push({ page: route, issue: 'attribut lang absent' });
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
function main() {
  if (!ensureDist()) {
    console.error('[check-static-quality] dist/client introuvable après build → exit 2.');
    process.exit(2);
  }

  const allHtml = walk(DIST, (f) => f.endsWith('.html'));
  if (allHtml.length === 0) {
    console.error('[check-static-quality] 0 fichier HTML trouvé dans dist/client → exit 2.');
    process.exit(2);
  }

  // ROUTES construites sur TOUT le HTML (les pages noindex restent des routes valides
  // pour la résolution des liens internes — elles existent, juste pas indexées).
  const ROUTES = buildRoutes(allHtml);
  const REDIRECTS = buildRedirects();

  // Partition indexé vs exclu.
  const indexed = [];
  let excludedPath = 0;
  let excludedNoindex = 0;

  for (const file of allHtml) {
    if (isExcludedPath(file)) { excludedPath++; continue; }
    const html = readFileSync(file, 'utf8');
    if (isNoindex(html)) { excludedNoindex++; continue; }
    indexed.push({ file, html });
  }

  if (indexed.length === 0) {
    console.error('[check-static-quality] 0 page indexée à scanner (parse suspect) → exit 2.');
    process.exit(2);
  }

  // Collecteurs. linkByTarget = bloquant (régressions) ; gatedByTarget = dette
  // trackée connue (allowlist) — affichée mais non bloquante.
  const headingViolations = [];
  const linkByTarget = new Map();
  const gatedByTarget = new Map();
  const imgAltViolations = [];
  const htmlLangViolations = [];

  for (const { file, html } of indexed) {
    const rel = relative(DIST, file).split(sep).join('/');
    const route =
      rel === 'index.html'
        ? '/'
        : rel.endsWith('/index.html')
          ? '/' + rel.slice(0, -'/index.html'.length)
          : '/' + rel.replace(/\.html$/, '');
    const normRoute = normalizePath(route);

    checkHeadingOrder(normRoute, html, headingViolations);
    checkInternalLinks(normRoute, html, linkByTarget, gatedByTarget, ROUTES, REDIRECTS);
    checkImgAlt(normRoute, html, imgAltViolations);
    checkHtmlLang(normRoute, html, htmlLangViolations);
  }

  // ── Rapport ───────────────────────────────────────────────────────────────
  const linkTargets = [...linkByTarget.keys()].sort();
  const totalLinkViolations = linkTargets.length;
  const gatedTargets = [...gatedByTarget.keys()].sort();

  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  GATE QUALITÉ STATIQUE — dist/client');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`Pages HTML totales         : ${allHtml.length}`);
  console.log(`  ├─ indexées (scannées)   : ${indexed.length}`);
  console.log(`  ├─ exclues (preview/components/compare) : ${excludedPath}`);
  console.log(`  └─ exclues (noindex)     : ${excludedNoindex}`);
  console.log(`Routes connues             : ${ROUTES.size}`);
  console.log(`Redirects actifs (sources) : ${REDIRECTS.size}`);
  console.log('───────────────────────────────────────────────────────────────');

  // 1. heading-order
  console.log(`\n[1] heading-order        : ${headingViolations.length} violation(s)`);
  const showHeading = VERBOSE ? headingViolations : headingViolations.slice(0, 3);
  for (const v of showHeading) console.log(`    · ${v.page} — ${v.issue}`);
  if (!VERBOSE && headingViolations.length > 3)
    console.log(`    … +${headingViolations.length - 3} autre(s) (--report pour tout)`);

  // 2. internal-links (groupé par cible)
  console.log(`\n[2] internal-links       : ${totalLinkViolations} cible(s) non résolue(s)`);
  const showTargets = VERBOSE ? linkTargets : linkTargets.slice(0, 3);
  for (const tgt of showTargets) {
    const sources = linkByTarget.get(tgt);
    const ex = VERBOSE ? sources : sources.slice(0, 3);
    console.log(`    ✗ ${tgt}  (${sources.length} page-source(s))`);
    console.log(`        ↳ ${ex.join(', ')}${!VERBOSE && sources.length > 3 ? ` …(+${sources.length - 3})` : ''}`);
  }
  if (!VERBOSE && totalLinkViolations > 3)
    console.log(`    … +${totalLinkViolations - 3} autre(s) cible(s) (--report pour tout)`);

  // 3. img-alt
  console.log(`\n[3] img-alt              : ${imgAltViolations.length} violation(s)`);
  const showImg = VERBOSE ? imgAltViolations : imgAltViolations.slice(0, 3);
  for (const v of showImg) console.log(`    · ${v.page} — ${v.tag}`);
  if (!VERBOSE && imgAltViolations.length > 3)
    console.log(`    … +${imgAltViolations.length - 3} autre(s) (--report pour tout)`);

  // 4. html-lang
  console.log(`\n[4] html-lang            : ${htmlLangViolations.length} violation(s)`);
  const showLang = VERBOSE ? htmlLangViolations : htmlLangViolations.slice(0, 3);
  for (const v of showLang) console.log(`    · ${v.page} — ${v.issue}`);
  if (!VERBOSE && htmlLangViolations.length > 3)
    console.log(`    … +${htmlLangViolations.length - 3} autre(s) (--report pour tout)`);

  // ── Connus gated (allowlist) — AFFICHÉS, comptés à part, NON bloquants ──────
  // Dette trackée (décision Simon en attente), pas un masquage : visibles pour
  // ne pas être oubliés, mais n'entrent ni dans le total bloquant ni dans exit 1.
  if (gatedTargets.length > 0) {
    console.log('\n───────────────────────────────────────────────────────────────');
    console.log(`⚠ Connus gated (non-bloquants) : ${gatedTargets.length} cible(s) allowlistée(s)`);
    for (const tgt of gatedTargets) {
      const sources = gatedByTarget.get(tgt);
      const ex = VERBOSE ? sources : sources.slice(0, 3);
      console.log(`    ◦ ${tgt}  (${sources.length} page-source(s))`);
      console.log(`        ↳ ${ex.join(', ')}${!VERBOSE && sources.length > 3 ? ` …(+${sources.length - 3})` : ''}`);
    }
    console.log('    (dette trackée — à créer/rediriger, cf ALLOWLIST en tête de script)');
  }

  // Total BLOQUANT = violations hors allowlist uniquement.
  const totalViolations =
    headingViolations.length +
    totalLinkViolations +
    imgAltViolations.length +
    htmlLangViolations.length;

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`  TOTAL violations bloquantes (hors allowlist) : ${totalViolations}`);
  console.log(`  Connus gated non-bloquants                   : ${gatedTargets.length}`);
  console.log('═══════════════════════════════════════════════════════════════');

  process.exit(totalViolations > 0 ? 1 : 0);
}

main();
