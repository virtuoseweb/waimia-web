#!/usr/bin/env node
/**
 * check-token-purity.mjs — Gate « pureté du design system » (token-driven).
 *
 * Pourquoi : le DS Waimia doit rester pilotable par un futur générateur (composants
 * IA + outil d'identité qui swappe les VALEURS des tokens). Pour repeindre la marque
 * « sans conflit », les composants doivent consommer des TOKENS, jamais hardcoder une
 * couleur de marque.
 *
 *  - hex brut  = INTERDIT (#rgb/#rrggbb/#rrggbbaa). Le DS est token-driven → exit 1.
 *  - rgba de marque (accent #c94f2e=201,79,46 / paper #f6f1e8=246,241,232) = DETTE
 *    non-bloquante : à migrer vers des tokens canaux (--accent-rgb / color-mix) pour que
 *    l'outil identité repeigne sans conflit. Listée, n'incrémente PAS le total bloquant.
 *  - rgba neutre (0,0,0,* / 255,255,255,*) = OK, indépendant de la marque.
 *  - littéraux property-anchored (font-size/line-height/etc.) = BLOQUANT (DS enforced V8).
 *
 * Scan : blocs <style> ET attributs style="..." inline de src/components/sections/*.astro.
 * Ignore : url(#…) (refs SVG), currentColor, et le contenu des commentaires CSS.
 *
 * Scan littéraux V8 : src/**\/*.astro (corps) + src/**\/*.css (hors tokens.css).
 *
 * Exit : 1 si ≥1 hex brut ou ≥1 littéral property-anchored · 0 sinon · 2 si 0 fichier scanné.
 * Flag --report : liste toutes les occurrences (défaut = résumé + 3 exemples).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SECTIONS_DIR = join(ROOT, 'src/components/sections');
const REPORT = process.argv.includes('--report');

const ACCENT = [201, 79, 46]; // #c94f2e
const PAPER = [246, 241, 232]; // #f6f1e8
const TOL = 2; // ±2 par canal (arrondis)

const near = (rgb, ref) => rgb.every((c, i) => Math.abs(c - ref[i]) <= TOL);
const isNeutral = (rgb) =>
  (rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0) ||
  (rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255);

// Retire le contenu des commentaires CSS /* ... */ (en préservant les retours ligne pour garder les n° de ligne).
const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

// Concatène tous les blocs <style>…</style> + les attributs style="…", commentaires neutralisés.
function extractColorSurface(raw) {
  const clean = stripComments(raw);
  let surface = clean.replace(/[^\n]/g, ' '); // canevas vide, lignes préservées
  const splice = (start, end) => {
    surface = surface.slice(0, start) + clean.slice(start, end) + surface.slice(end);
  };
  for (const m of clean.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    splice(m.index + m[0].indexOf(m[1]), m.index + m[0].indexOf(m[1]) + m[1].length);
  }
  for (const m of clean.matchAll(/\bstyle\s*=\s*"([^"]*)"/gi)) {
    splice(m.index + m[0].indexOf(m[1]), m.index + m[0].indexOf(m[1]) + m[1].length);
  }
  return surface;
}

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

const files = readdirSync(SECTIONS_DIR).filter((f) => f.endsWith('.astro'));
if (files.length === 0) {
  console.error('ERREUR : 0 fichier .astro scanné dans ' + SECTIONS_DIR + ' (parse cassé ?)');
  process.exit(2);
}

const hexHits = []; // bloquant
const brandHits = []; // dette non-bloquante
let neutralCount = 0;
const neutralHits = [];

const HEX_RE = /(?<![\w&])#[0-9a-fA-F]{3,8}\b/g;
const RGB_RE = /rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*(?:,[^)]*)?\)/gi;

for (const f of files) {
  const rel = relative(ROOT, join(SECTIONS_DIR, f));
  const surface = extractColorSurface(readFileSync(join(SECTIONS_DIR, f), 'utf8'));

  for (const m of surface.matchAll(HEX_RE)) {
    const hex = m[0];
    // 3/4/6/8 chiffres = couleur hex ; longueurs 5/7 = non-couleur (ex: id), on ignore.
    if (![3, 4, 6, 8].includes(hex.length - 1)) continue;
    hexHits.push({ file: rel, line: lineOf(surface, m.index), value: hex });
  }

  for (const m of surface.matchAll(RGB_RE)) {
    const rgb = [+m[1], +m[2], +m[3]];
    if (isNeutral(rgb)) {
      neutralCount++;
      neutralHits.push({ file: rel, line: lineOf(surface, m.index), value: m[0].replace(/\s+/g, '') });
      continue;
    }
    if (near(rgb, ACCENT) || near(rgb, PAPER)) {
      brandHits.push({
        file: rel,
        line: lineOf(surface, m.index),
        value: m[0].replace(/\s+/g, ''),
        token: near(rgb, ACCENT) ? 'accent' : 'paper',
      });
    }
    // autres rgba (ex: teinte accent assombrie 181,71,42) = ni marque canonique ni neutre → non comptés.
  }
}

const show = (arr) => (REPORT ? arr : arr.slice(0, 3));
const fmt = (h) => `    ${h.file}:${h.line}  ${h.value}${h.token ? ' [' + h.token + ']' : ''}`;

console.log(`\n🎨 Token purity — ${files.length} fichiers sections/*.astro scannés\n`);

console.log(`✗ Hex bruts (BLOQUANT, interdit — DS token-driven) : ${hexHits.length}`);
if (hexHits.length) show(hexHits).forEach((h) => console.log(fmt(h)));
if (!REPORT && hexHits.length > 3) console.log(`    … +${hexHits.length - 3} (voir --report)`);

console.log(`\n⚠ rgba de marque à tokeniser (prérequis outil identité, NON-BLOQUANT) : ${brandHits.length} occurrence(s)`);
if (brandHits.length) show(brandHits).forEach((h) => console.log(fmt(h)));
if (!REPORT && brandHits.length > 3) console.log(`    … +${brandHits.length - 3} (voir --report)`);

console.log(`\nℹ rgba neutre (0,0,0 / 255,255,255 — OK, indépendant marque) : ${neutralCount}`);
if (REPORT && neutralHits.length) neutralHits.forEach((h) => console.log(fmt(h)));

// ══════════════════════════════════════════════════════════════════════════════
// V8 — Gate littéraux property-anchored (BLOQUANT, DS enforced)
// Scan : src/**/*.astro (corps après frontmatter) + src/**/*.css (hors tokens.css)
// ══════════════════════════════════════════════════════════════════════════════

// Table des mappings property-anchored (même définition que tokenize-literals.mjs)
const LITERAL_MAPPINGS = [
  // font-size
  { property: 'font-size',      value: '11px',    token: '--text-eyebrow' },
  { property: 'font-size',      value: '14px',    token: '--text-body-sm' },
  { property: 'font-size',      value: '10px',    token: '--text-mono-xs' },
  { property: 'font-size',      value: '17px',    token: '--text-body-md' },
  // V9c — nouveaux crans à fort volume
  { property: 'font-size',      value: '12px',    token: '--text-caption' },
  { property: 'font-size',      value: '13px',    token: '--text-ui' },
  { property: 'font-size',      value: '15px',    token: '--text-body-lead' },
  // line-height (exact uniquement — ne pas toucher 1, 1.15, 1.55, 1.6, etc.)
  { property: 'line-height',    value: '1.5',     token: '--leading-body' },
  { property: 'line-height',    value: '0.96',    token: '--leading-h1' },
  { property: 'line-height',    value: '1.02',    token: '--leading-h2' },
  { property: 'line-height',    value: '1.1',     token: '--leading-h3' },
  // V9c — nouveaux crans line-height à fort volume
  { property: 'line-height',    value: '1.4',     token: '--leading-lede' },
  { property: 'line-height',    value: '1.65',    token: '--leading-prose' },
  // letter-spacing
  { property: 'letter-spacing', value: '0.12em',   token: '--tracking-mono' },
  { property: 'letter-spacing', value: '-0.025em',  token: '--tracking-display' },
  { property: 'letter-spacing', value: '-0.005em',  token: '--tracking-body' },
  // font-weight
  { property: 'font-weight',    value: '400',     token: '--fw-regular' },
  { property: 'font-weight',    value: '500',     token: '--fw-medium' },
  { property: 'font-weight',    value: '600',     token: '--fw-semibold' },
  // border-radius (uniquement border-radius, pas padding/gap)
  { property: 'border-radius',  value: '2px',     token: '--radius-sm' },
  { property: 'border-radius',  value: '8px',     token: '--radius-md' },
  { property: 'border-radius',  value: '12px',    token: '--radius-lg' },
  { property: 'border-radius',  value: '999px',   token: '--radius-pill' },
  // V9c — nouveaux crans border-radius à fort volume
  { property: 'border-radius',  value: '4px',     token: '--radius-xs' },
  { property: 'border-radius',  value: '50%',     token: '--radius-full' },
  // max-width
  { property: 'max-width',      value: '720px',   token: '--wrap-prose' },
  { property: 'max-width',      value: '900px',   token: '--wrap-read' },
  { property: 'max-width',      value: '1120px',  token: '--wrap-tight' },
  { property: 'max-width',      value: '1440px',  token: '--wrap' },
  { property: 'max-width',      value: '1560px',  token: '--wrap-wide' },
  // durées (ms — remplacement global, ms = toujours une durée)
  { property: null,             value: '200ms',   token: '--dur-fast' },
  { property: null,             value: '1100ms',  token: '--dur-reveal' },
  { property: null,             value: '1400ms',  token: '--dur-slow' },
  // cubic-bezier (remplacement global, valeur exacte)
  { property: null,             value: 'cubic-bezier(0.22, 1, 0.36, 1)',  token: '--ease' },
  { property: null,             value: 'cubic-bezier(.22, 1, .36, 1)',     token: '--ease' },
  { property: null,             value: 'cubic-bezier(0.16, 1, 0.30, 1)',  token: '--ease-out' },
  { property: null,             value: 'cubic-bezier(.16, 1, .30, 1)',    token: '--ease-out' },
  { property: null,             value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', token: '--ease-spring' },
  { property: null,             value: 'cubic-bezier(.34, 1.56, .64, 1)', token: '--ease-spring' },
];

function escLit(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// Construit le regex de détection (mirror de tokenize-literals.mjs)
function buildLiteralDetectionRegex(property, value) {
  if (property === null) {
    // durée ou cubic-bezier — global, tolère espaces dans cubic-bezier
    if (value.startsWith('cubic-bezier')) {
      // Tolère espaces variables autour des virgules
      const inner = value
        .replace(/^cubic-bezier\(/, '')
        .replace(/\)$/, '')
        .split(',')
        .map(p => escLit(p.trim()))
        .join('\\s*,\\s*');
      return new RegExp(`(?<!var\\()cubic-bezier\\(\\s*${inner}\\s*\\)`, 'g');
    }
    // ms — global word boundary
    return new RegExp(`(?<!var\\()\\b${escLit(value)}\\b(?![a-zA-Z0-9_-])`, 'g');
  }
  // property-anchored
  const escapedProp = escLit(property);
  const escapedVal  = escLit(value);
  let rightBoundary;
  if (value.endsWith('px') || value.endsWith('em') || value.endsWith('ms')) {
    rightBoundary = '(?![a-zA-Z0-9_-])';
  } else if (/^\d+\.\d+$/.test(value)) {
    rightBoundary = '(?![0-9.])';
  } else {
    rightBoundary = '(?![a-zA-Z0-9_-])';
  }
  return new RegExp(
    `${escapedProp}:\\s*(?!var\\()${escapedVal}${rightBoundary}`,
    'g'
  );
}

// Exclusions pour le scan V8
const EXCLUDES_V8 = [
  /\/src\/styles\/tokens\.css$/,
  /\/src\/components\/emails\//,
  /\/src\/components\/motion\/LiquidHero\.tsx$/,
  /\/src\/pages\/api\/og\.png\.ts$/,
  /\.(ts|tsx|js|jsx)$/,
];
function isExcludedV8(p) { return EXCLUDES_V8.some(rx => rx.test(p)); }

// Sépare frontmatter .astro
function splitAstroBody(content) {
  if (!content.startsWith('---')) return content;
  const idx = content.indexOf('---', 3);
  if (idx === -1) return content;
  return content.slice(idx + 3);
}

// Walk récursif
function walkV8(dir, exts, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walkV8(full, exts, files);
    else if (exts.includes(extname(full))) files.push(full);
  }
  return files;
}

const SRC_ROOT_V8 = join(ROOT, 'src');
const allFilesV8  = walkV8(SRC_ROOT_V8, ['.css', '.astro']).filter(f => !isExcludedV8(f));

const literalHits = [];

for (const fpath of allFilesV8) {
  const raw = readFileSync(fpath, 'utf8');
  const text = extname(fpath) === '.astro' ? splitAstroBody(raw) : raw;
  const rel  = relative(ROOT, fpath);

  for (const { property, value, token } of LITERAL_MAPPINGS) {
    const rx = buildLiteralDetectionRegex(property, value);
    for (const m of text.matchAll(rx)) {
      const line = text.slice(0, m.index).split('\n').length;
      literalHits.push({ file: rel, line, value: m[0].trim(), token });
    }
  }
}

const showLit = (arr) => (REPORT ? arr : arr.slice(0, 3));
const fmtLit  = (h) => `    ${h.file}:${h.line}  ${h.value}  → doit être var(${h.token})`;

console.log(`\n⛔ Littéraux property-anchored (BLOQUANT V8, DS enforced) : ${literalHits.length}`);
if (literalHits.length) showLit(literalHits).forEach(h => console.log(fmtLit(h)));
if (!REPORT && literalHits.length > 3) console.log(`    … +${literalHits.length - 3} (voir --report)`);

// ══════════════════════════════════════════════════════════════════════════════
// V9b — Gate espacement on-grid (BLOQUANT, DS enforced)
// Détecte les px ∈ échelle --space-N dans les propriétés d'espacement ancrées.
// Anti-régression : tout px on-grid dans padding/margin/gap doit être un var(--space-N).
// Scan : src/**/*.astro (corps après frontmatter) + src/**/*.css (hors tokens.css)
// ══════════════════════════════════════════════════════════════════════════════

const SPACE_PX = new Set([
  '4px','8px','12px','16px','24px','32px','40px','48px',
  '64px','80px','96px','120px','160px','200px','256px',
]);

// Propriétés d'espacement ancrées — liste fermée (miroir de tokenize-spacing.mjs)
const SPACING_PROPS_V9 = [
  'padding','padding-top','padding-right','padding-bottom','padding-left',
  'padding-inline','padding-block','padding-inline-start','padding-inline-end',
  'padding-block-start','padding-block-end',
  'margin','margin-top','margin-right','margin-bottom','margin-left',
  'margin-inline','margin-block','margin-inline-start','margin-inline-end',
  'margin-block-start','margin-block-end',
  'gap','row-gap','column-gap',
];

function escV9(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// Regex property-anchored qui détecte les px on-grid encore bruts
// (pas encore dans var() — lookahead négatif sur 'var(')
function buildSpacingDetectRegex(prop) {
  const ep = escV9(prop);
  // Cherche le nom de propriété (avec boundary stricte) suivi de : puis une valeur contenant un px on-grid
  // On ne capture pas toute la valeur ; on recherche token par token après le :.
  // Pattern : (?:^|(?<=[{;\s>]))<prop>\s*:\s* puis dans la valeur (jusqu'à [;}\n]) un token <n>px on-grid
  // Pour simplicité : on matche la propriété + la valeur entière, puis on inspecte les tokens.
  return new RegExp(
    `(?:^|(?<=[{;\\s>]))(${ep})(\\s*:\\s*)` +
    `((?:(?!;|}|\\n|!important).)*?)` +
    `(\\s*!important)?(?=[;}\n])`,
    'gm'
  );
}

// Vérifier si une valeur-courte (token) est un px on-grid brut (pas var())
function hasRawSpacingPx(rawValue) {
  const tokens = rawValue.split(/\s+/);
  return tokens.some(t => SPACE_PX.has(t));
}

const spacingHits = [];

for (const fpath of allFilesV8) {
  const raw = readFileSync(fpath, 'utf8');
  const text = extname(fpath) === '.astro' ? splitAstroBody(raw) : raw;
  const rel  = relative(ROOT, fpath);

  for (const prop of SPACING_PROPS_V9) {
    const rx = buildSpacingDetectRegex(prop);
    for (const m of text.matchAll(rx)) {
      const rawValue = m[3] || '';
      const tokens = rawValue.split(/\s+/);
      for (const tok of tokens) {
        if (SPACE_PX.has(tok)) {
          const line = text.slice(0, m.index).split('\n').length;
          spacingHits.push({ file: rel, line, prop, value: tok });
        }
      }
    }
  }
}

const showSp = (arr) => (REPORT ? arr : arr.slice(0, 3));
const fmtSp  = (h) => `    ${h.file}:${h.line}  ${h.prop}: ${h.value}  → doit être var(--space-N)`;

console.log(`\n⛔ Littéraux espacement on-grid (BLOQUANT V9b, DS enforced) : ${spacingHits.length}`);
if (spacingHits.length) showSp(spacingHits).forEach(h => console.log(fmtSp(h)));
if (!REPORT && spacingHits.length > 3) console.log(`    … +${spacingHits.length - 3} (voir --report)`);

// ══════════════════════════════════════════════════════════════════════════════
// V9d — Gate demi-pixels font-size (BLOQUANT, DS enforced)
// Interdit tout font-size: <n>.5px direct (hors clamp/calc).
// Outliers whitelistés : 8.5px, 9.5px (pas de token proche).
// Scope : src/**/*.astro (corps) + src/**/*.css (hors tokens.css)
// ══════════════════════════════════════════════════════════════════════════════

// Demi-pixels tokenisables (10.5–15.5) = BLOQUANTS.
// Outliers 8.5 / 9.5 : whitelistés (aucun token entier proche → préservés intentionnellement).
const HALFPX_BLOCKED = new Set(['10.5px', '11.5px', '12.5px', '13.5px', '14.5px', '15.5px']);
// Regex property-anchored : font-size: <n>.5px (valeur directe, pas var(), pas clamp)
// La même exclusion clamp est gratuite : après "font-size: " vient "clamp" → ne matche pas.
const HALFPX_RE = /font-size:\s*(?!var\()(\d+\.5px)(?![a-zA-Z0-9_-])/g;

const halfpxHits = [];

for (const fpath of allFilesV8) {
  const raw  = readFileSync(fpath, 'utf8');
  const text = extname(fpath) === '.astro' ? splitAstroBody(raw) : raw;
  const rel  = relative(ROOT, fpath);

  for (const m of text.matchAll(HALFPX_RE)) {
    const val = m[1]; // ex "10.5px"
    if (!HALFPX_BLOCKED.has(val)) continue; // outliers 8.5/9.5 → ignorés
    const line = text.slice(0, m.index).split('\n').length;
    halfpxHits.push({ file: rel, line, value: m[0].trim() });
  }
}

const showHp = (arr) => (REPORT ? arr : arr.slice(0, 3));
const fmtHp  = (h) => `    ${h.file}:${h.line}  ${h.value}  → doit être var(--text-*)`;

console.log(`\n⛔ Demi-pixels font-size directs (BLOQUANT V9d, dérive éliminée) : ${halfpxHits.length}`);
if (halfpxHits.length) showHp(halfpxHits).forEach(h => console.log(fmtHp(h)));
if (!REPORT && halfpxHits.length > 3) console.log(`    … +${halfpxHits.length - 3} (voir --report)`);

// ══════════════════════════════════════════════════════════════════════════════
// V9-SVG — Gate hex de marque en attribut fill=/stroke= (BLOQUANT, repaintabilité)
// Interdit tout fill="<hex-marque>" ou stroke="<hex-marque>" résiduel dans .astro.
// Ces 4 hex doivent toujours passer par var(--ink|--muted|--accent|--paper-2)
// pour que l'outil identité puisse repeindre les SVG inline par swap de token.
// Scan : src/**/*.astro (intégral — SVG inline dans le corps du template).
// ══════════════════════════════════════════════════════════════════════════════

// Hex de marque bloquants en attribut SVG (insensible à la casse)
const SVG_HEX_RE = /(fill|stroke)\s*=\s*"#(0C0B09|6B6560|C94F2E|EFE9DD)"/gi;

const svgHexHits = [];

// Réutilise allFilesV8, filtre uniquement les .astro
const astroFilesV9svg = allFilesV8.filter(f => extname(f) === '.astro');

for (const fpath of astroFilesV9svg) {
  const raw = readFileSync(fpath, 'utf8');
  // On scanne le contenu COMPLET (les fill/stroke SVG sont dans le corps, jamais dans le frontmatter)
  const rel = relative(ROOT, fpath);
  for (const m of raw.matchAll(SVG_HEX_RE)) {
    const line = raw.slice(0, m.index).split('\n').length;
    svgHexHits.push({ file: rel, line, value: m[0].trim() });
  }
}

const showSvg = (arr) => (REPORT ? arr : arr.slice(0, 3));
const fmtSvg  = (h) => `    ${h.file}:${h.line}  ${h.value}  → doit être fill/stroke="var(--token)"`;

console.log(`\n⛔ Hex de marque en attribut SVG (BLOQUANT V9-SVG, repaintabilité) : ${svgHexHits.length}`);
if (svgHexHits.length) showSvg(svgHexHits).forEach(h => console.log(fmtSvg(h)));
if (!REPORT && svgHexHits.length > 3) console.log(`    … +${svgHexHits.length - 3} (voir --report)`);

// ══════════════════════════════════════════════════════════════════════════════
// V9-RGBA — Gate rgba de marque exacte (BLOQUANT, repaintabilité)
// Interdit tout rgba(246,241,232,*) / rgba(201,79,46,*) / rgba(12,11,9,*) résiduel.
// Ces triplets doivent passer par rgba(var(--paper-rgb),*) / rgba(var(--accent-rgb),*)
// / rgba(var(--ink-rgb),*) pour que l'outil identité repeigne sans conflit.
// Scan : src/**/*.astro + src/**/*.css (contenu COMPLET — frontmatter inclus).
// Exclusions : tokens.css (définitions du contrat), emails/, LiquidHero.tsx, og.png.ts.
// ══════════════════════════════════════════════════════════════════════════════

// Détecte les rgba de marque EXACTE résiduels (préfixe triplet, tolère espaces)
const RGBA_BRAND_RE = /rgba\(\s*(246\s*,\s*241\s*,\s*232|201\s*,\s*79\s*,\s*46|12\s*,\s*11\s*,\s*9)\s*,/gi;

const rgbaBrandHits = [];

// Inclut tokens.css dans ce scan UNIQUEMENT : le contrat lui-même est désormais channelisé
// (V9-RGBA-contract) et doit rester exempt de rgba de marque hardcodées.
// Les autres blocs (littéraux, espacement, demi-pixels, SVG) continuent d'exclure tokens.css
// via isExcludedV8 — on ne modifie PAS allFilesV8.
const rgbaScanFiles = [...allFilesV8, join(ROOT, 'src/styles/tokens.css')];

// Réutilise allFilesV8 étendu de tokens.css pour ce bloc uniquement
for (const fpath of rgbaScanFiles) {
  // Scanne le contenu BRUT complet (frontmatter inclus — c'est là que sont les rgba)
  const raw = readFileSync(fpath, 'utf8');
  const rel = relative(ROOT, fpath);

  RGBA_BRAND_RE.lastIndex = 0;
  for (const m of raw.matchAll(RGBA_BRAND_RE)) {
    const line = raw.slice(0, m.index).split('\n').length;
    rgbaBrandHits.push({ file: rel, line, value: m[0].replace(/\s+/g, '') });
  }
}

const showRgba = (arr) => (REPORT ? arr : arr.slice(0, 3));
const fmtRgba  = (h) => `    ${h.file}:${h.line}  ${h.value}  → doit être rgba(var(--paper-rgb|--accent-rgb|--ink-rgb),X)`;

console.log(`\n⛔ rgba de marque exacte (BLOQUANT V9-RGBA, repaintabilité) : ${rgbaBrandHits.length}`);
if (rgbaBrandHits.length) showRgba(rgbaBrandHits).forEach(h => console.log(fmtRgba(h)));
if (!REPORT && rgbaBrandHits.length > 3) console.log(`    … +${rgbaBrandHits.length - 3} (voir --report)`);

// ── Décision finale ────────────────────────────────────────────────────────────
const totalBlocking = hexHits.length + literalHits.length + spacingHits.length + halfpxHits.length + svgHexHits.length + rgbaBrandHits.length;

if (hexHits.length > 0) {
  console.log(`\n❌ FAIL — ${hexHits.length} hex brut(s). Migre vers var(--token) / color-mix.\n`);
}
if (literalHits.length > 0) {
  console.log(`\n❌ FAIL — ${literalHits.length} littéral(aux) property-anchored. Chaque littéral doit être var(--token) (DS enforced V8).\n`);
}
if (spacingHits.length > 0) {
  console.log(`\n❌ FAIL — ${spacingHits.length} littéral(aux) espacement on-grid. Chaque px on-grid doit être var(--space-N) (DS enforced V9b).\n`);
}
if (halfpxHits.length > 0) {
  console.log(`\n❌ FAIL — ${halfpxHits.length} demi-pixel(s) font-size direct(s). Snap vers var(--text-*) via snap-halfpixel-fontsize.mjs (DS enforced V9d).\n`);
}
if (svgHexHits.length > 0) {
  console.log(`\n❌ FAIL — ${svgHexHits.length} hex de marque en attribut fill/stroke SVG. Migre via tokenize-svg-hex.mjs → var(--ink|--muted|--accent|--paper-2) (DS enforced V9-SVG).\n`);
}
if (rgbaBrandHits.length > 0) {
  console.log(`\n❌ FAIL — ${rgbaBrandHits.length} rgba de marque exacte résiduel(s). Migre via tokenize-rgba-brand.mjs → rgba(var(--paper-rgb|--accent-rgb|--ink-rgb),X) (DS enforced V9-RGBA).\n`);
}
if (totalBlocking > 0) {
  process.exit(1);
}
console.log(`\n✅ PASS — 0 hex brut, 0 littéral property-anchored, 0 espacement on-grid brut, 0 demi-pixel font-size, 0 hex SVG de marque, 0 rgba de marque exacte. (${brandHits.length} rgba de marque dans sections/ = dette non-bloquante.)\n`);
process.exit(0);
