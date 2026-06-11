#!/usr/bin/env node
/**
 * check-semantic-coherence.mjs — Gate « cohérence sémantique DS » (vague harmonisation 2026-06-11).
 *
 * Doctrine : quand un token sémantique EXISTE pour une valeur, le littéral équivalent est
 * une dérive (2 sources de vérité pour le même pixel). Le gate verrouille les conversions
 * à PARITÉ EXACTE faites par la vague (tracking mono, hairlines, muted on-dark, crans
 * de section) et SURFACE en warn les cas d'arbitrage réservé (proches mais non-exacts).
 *
 * Règles :
 *  R1 (RETIRÉ 2026-06-11) — anciennement : warn sur `color: var(--ink-2|--ink-3)` hors
 *       titres. FAUX POSITIF confirmé par audit indépendant : --ink-2 (#1A1814) / --ink-3
 *       (#2B2620) sont l'échelle de texte FORT (chapô, excerpt, body proéminent), distincte
 *       de --muted (#6B6560) = texte ATÉNUÉ. ink-2/3 sur du body n'est PAS une dérive, et un
 *       regex de sélecteur ne peut pas distinguer un chapô fort d'une légende faible → la
 *       règle est retirée (elle ne crie plus au loup). La vraie dérive token de ce registre
 *       = fallback hex fantôme `var(--token-inexistant, #hex)` → futur gate dédié.
 *  R2 (fail/warn) — bordures `rgba(var(--ink-rgb), A)` :
 *       A = 0.09 exact  -> FAIL « utiliser var(--hairline) »        (parité exacte du token)
 *       A = 0.18 exact  -> FAIL « utiliser var(--hairline-strong) » (parité exacte du token)
 *       A ∈ [0.06–0.12] -> warn drift hairline (shift = arbitrage réservé)
 *       A ∈ [0.16–0.20] -> warn drift hairline-strong (idem)
 *       Les formes fallback `var(--hairline, rgba(...))` utilisent déjà le token : ignorées.
 *  R3 (fail) — littéraux `letter-spacing: .08em|0.08em|.12em|0.12em` interdits :
 *       --tracking-mono (0.12em) et --tracking-mono-tight (0.08em) existent.
 *  R4 (fail) — `padding-block: var(--space-9..15)` sur un sélecteur RACINE de section
 *       (src/components/sections/*.astro) : le rythme vertical de section = famille
 *       --section-tight|base|loose|grand, pas l'échelle --space-*.
 *  R5 (warn) — `color: rgba(var(--paper-rgb), 0.60–0.70)` dans un scope on-dark
 *       ([data-bg='ink'] / .on-dark) : l'idiome global pose --muted = rgba(paper, 0.64)
 *       -> « var(--muted) suffit » (0.64 exact = FAIL : parité exacte déjà tokenisée).
 *
 * Exit : 1 si >= 1 FAIL · 0 sinon (warns listés, non bloquants) · 2 si 0 fichier scanné.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COMPONENTS_DIR = join(ROOT, 'src/components');
const SECTIONS_DIR = join(ROOT, 'src/components/sections');

const fails = [];
const warns = [];

function* astroFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) yield* astroFiles(p);
    else if (entry.endsWith('.astro')) yield p;
  }
}

function lineOf(src, index) {
  return src.slice(0, index).split('\n').length;
}

/** Sélecteur de la règle CSS englobant l'offset donné (lookback jusqu'au '{' ouvrant). */
function enclosingSelector(src, index) {
  const open = src.lastIndexOf('{', index);
  if (open === -1) return '';
  let start = open - 1;
  while (start >= 0 && !'{};'.includes(src[start])) start--;
  return src.slice(start + 1, open).replace(/\/\*[\s\S]*?\*\//g, '').trim();
}

const ON_DARK_RE = /\[data-bg=['"]?ink['"]?\]|\.on-dark/;

let scanned = 0;
for (const file of astroFiles(COMPONENTS_DIR)) {
  scanned++;
  const src = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  const inSections = file.startsWith(SECTIONS_DIR + '/') || dirname(file) === SECTIONS_DIR;

  // ── R1 RETIRÉ (2026-06-11) — voir l'en-tête : --ink-2/3 = échelle texte fort légitime,
  //    pas une dérive ; faux positif confirmé par audit indépendant. ──

  // ── R2 — bordures rgba(var(--ink-rgb), A) ──
  for (const m of src.matchAll(/border[^:;{}]*:\s*[^;{}]*rgba\(var\(--ink-rgb\),\s*(\.?\d*\.?\d+)\)/g)) {
    // Forme fallback var(--hairline[-strong], rgba(...)) : le token est déjà utilisé.
    if (/var\(--hairline[^)]*$/.test(src.slice(Math.max(0, m.index - 80), m.index + m[0].indexOf('rgba')))) continue;
    const a = parseFloat(m[1].startsWith('.') ? '0' + m[1] : m[1]);
    const loc = `${rel}:${lineOf(src, m.index)}`;
    if (Math.abs(a - 0.09) < 1e-9) fails.push(`R2 ${loc} -> rgba(var(--ink-rgb), ${m[1]}) : utiliser var(--hairline) (parité exacte)`);
    else if (Math.abs(a - 0.18) < 1e-9) fails.push(`R2 ${loc} -> rgba(var(--ink-rgb), ${m[1]}) : utiliser var(--hairline-strong) (parité exacte)`);
    else if (a >= 0.06 && a <= 0.12) warns.push(`R2 ${loc} -> rgba(var(--ink-rgb), ${m[1]}) : proche de --hairline (0.09) — shift = arbitrage réservé`);
    else if (a >= 0.16 && a <= 0.2) warns.push(`R2 ${loc} -> rgba(var(--ink-rgb), ${m[1]}) : proche de --hairline-strong (0.18) — shift = arbitrage réservé`);
  }

  // ── R3 (fail) — littéraux tracking mono tokenisés ──
  for (const m of src.matchAll(/letter-spacing:\s*(0?\.12em|0?\.08em)/g)) {
    const token = m[1].includes('12') ? 'var(--tracking-mono)' : 'var(--tracking-mono-tight)';
    fails.push(`R3 ${rel}:${lineOf(src, m.index)} -> "letter-spacing: ${m[1]}" : utiliser ${token} (token existant)`);
  }

  // ── R4 (fail) — cran --space-9..15 sur racine de section ──
  if (inSections) {
    for (const m of src.matchAll(/padding-block:\s*var\(--space-(9|1[0-5])\)/g)) {
      const sel = enclosingSelector(src, m.index);
      // Racine de section = classe top-level (éventuellement [data-bg=...]), pas un descendant.
      const isRoot = sel !== '' && sel.split(',').every((s) => /^\s*\.[\w-]+(\[[^\]]*\])?\s*$/.test(s));
      if (isRoot) {
        fails.push(`R4 ${rel}:${lineOf(src, m.index)} -> "padding-block: var(--space-${m[1]})" sur racine « ${sel} » : utiliser un cran --section-* (tight|base|loose|grand)`);
      }
    }
  }

  // ── R5 — color: rgba(var(--paper-rgb), 0.60–0.70) en scope on-dark ──
  for (const m of src.matchAll(/(?<![-\w])color:\s*rgba\(var\(--paper-rgb\),\s*(\.?\d*\.?\d+)\)/g)) {
    const a = parseFloat(m[1].startsWith('.') ? '0' + m[1] : m[1]);
    const sel = enclosingSelector(src, m.index);
    if (!ON_DARK_RE.test(sel)) continue;
    const loc = `${rel}:${lineOf(src, m.index)}`;
    if (Math.abs(a - 0.64) < 1e-9) fails.push(`R5 ${loc} -> rgba(var(--paper-rgb), ${m[1]}) : utiliser var(--muted) (idiome on-dark, parité exacte)`);
    else if (a >= 0.6 && a <= 0.7) warns.push(`R5 ${loc} -> rgba(var(--paper-rgb), ${m[1]}) en scope on-dark : var(--muted) (0.64) suffit probablement — arbitrage réservé`);
  }
}

if (scanned === 0) {
  console.error('check-semantic-coherence: 0 fichier scanné (chemin src/components introuvable ?)');
  process.exit(2);
}

if (warns.length) {
  console.log(`⚠ check-semantic-coherence — ${warns.length} warn(s) (arbitrage réservé, non bloquant) :`);
  for (const w of warns) console.log('  ' + w);
}
if (fails.length) {
  console.error(`✖ check-semantic-coherence — ${fails.length} violation(s) :`);
  for (const f of fails) console.error('  ' + f);
  process.exit(1);
}
console.log(`✔ check-semantic-coherence — ${scanned} fichiers scannés, 0 violation (${warns.length} warn).`);
