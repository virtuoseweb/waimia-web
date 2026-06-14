#!/usr/bin/env node
/**
 * check-gutter.mjs — Gate « gutter horizontal canonique » (anti-régression).
 *
 * Pourquoi : le gutter horizontal du site est UNIQUE et canonique = `var(--gut)`
 * (défini une seule fois dans tokens.css, responsive 32→20→16px), appliqué via les
 * conteneurs `.wrap` / `.wrap-wide` / `.wrap-tight` (`padding: 0 var(--gut)` dans
 * global.css). Toute section qui RÉOUVRE un de ces sélecteurs pour y réinjecter un
 * padding horizontal différent (ex. `padding: 0 var(--space-8)`, `padding-left:
 * var(--space-6)`) brise l'uniformité du gutter sur la page concernée. Ce gate FAIL
 * sur toute réintroduction, pour figer le gutter partout.
 *
 * Deux familles de violations détectées :
 *   1. Une règle CSS dont le sélecteur contient `.wrap` / `.wrap-wide` / `.wrap-tight`
 *      ET qui déclare un padding HORIZONTAL (`padding` shorthand, `padding-inline`,
 *      `padding-left`, `padding-right`) avec une valeur ≠ `var(--gut)` (override).
 *      Autorisé : `var(--gut)` et `var(--gut, …)` (le fallback est le gutter canonique).
 *   2. Usage du token FANTÔME `var(--space-page-x)` (inexistant dans tokens.css —
 *      grep confirmé) — partout dans le scope scanné. C'est une dérive : le seul
 *      gutter valide est `--gut`.
 *
 * Scan : src/components/sections/*.astro + src/components/ui/organisms/*.astro.
 * On parse les blocs <style> ET les règles CSS multi-lignes (le padding override est
 * presque toujours sur une ligne distincte du sélecteur), commentaires CSS neutralisés.
 *
 * ALLOWLIST (full-bleed légitimes — pas de gutter par design, ne pas flagger) :
 *   MarqueeBand, LogoMarquee, AnnouncementBanner, FooterMarquee, TierPyramidSvg.
 *
 * Exit : 1 si ≥1 violation · 0 sinon · 2 si 0 fichier scanné.
 * Flag --report : liste toutes les occurrences (défaut = résumé + 5 exemples).
 *
 * ⚠️ Note : tant que les déviations actuelles (≈ 9-10) ne sont pas corrigées par
 * la passe d'harmonisation du gutter, ce gate FAIL volontairement au build central.
 * C'est NORMAL : l'orchestrateur le câble dans la CI APRÈS la passe de fixes.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, basename } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SECTIONS_DIR = join(ROOT, 'src/components/sections');
const ORGANISMS_DIR = join(ROOT, 'src/components/ui/organisms');
const REPORT = process.argv.includes('--report');

// Composants full-bleed légitimes (pas de gutter par design) — match sur basename sans extension.
const ALLOWLIST = new Set([
  'MarqueeBand',
  'LogoMarquee',
  'AnnouncementBanner',
  'FooterMarquee',
  'TierPyramidSvg',
]);

// Propriétés de padding HORIZONTAL surveillées sur un sélecteur .wrap*.
const H_PADDING_PROPS = new Set([
  'padding',          // shorthand (la composante horizontale provient des positions 2/4)
  'padding-inline',
  'padding-left',
  'padding-right',
]);

// Retire le contenu des commentaires CSS /* … */ en préservant les retours-ligne (n° de ligne stables).
const stripComments = (s) =>
  s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));

// Concatène tous les blocs <style>…</style>, commentaires neutralisés, lignes préservées.
function extractStyleSurface(raw) {
  const clean = stripComments(raw);
  let surface = clean.replace(/[^\n]/g, ' '); // canevas vide, lignes préservées
  for (const m of clean.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const start = m.index + m[0].indexOf(m[1]);
    const end = start + m[1].length;
    surface = surface.slice(0, start) + clean.slice(start, end) + surface.slice(end);
  }
  return surface;
}

const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

// La valeur d'un padding horizontal est-elle le gutter canonique ?
// Autorisé : `var(--gut)` ou `var(--gut, …)` (fallback) — sur TOUTES les composantes horizontales.
//  - padding-inline / padding-left / padding-right : la valeur entière doit être var(--gut…).
//  - padding shorthand : on inspecte les composantes horizontales (col 2 = L/R si 2 valeurs ;
//    col 4 = left, col 2 = right si 4 valeurs). Si une composante horizontale ≠ var(--gut…), violation.
function isCanonicalGut(token) {
  return /^var\(\s*--gut\s*(?:,[^)]*)?\)$/.test(token.trim());
}

// Découpe une valeur CSS en tokens top-level (ne casse PAS l'intérieur des parenthèses var()/calc()).
function splitTopLevel(value) {
  const tokens = [];
  let depth = 0;
  let cur = '';
  for (const ch of value) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (/\s/.test(ch) && depth === 0) {
      if (cur.trim()) tokens.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  if (cur.trim()) tokens.push(cur.trim());
  return tokens;
}

// Retourne true si la déclaration padding-* introduit un gutter horizontal NON canonique.
function isHorizontalGutterOverride(prop, value) {
  const v = value.trim();
  if (prop === 'padding-inline' || prop === 'padding-left' || prop === 'padding-right') {
    // Valeur simple : doit être var(--gut…). padding-inline peut avoir 2 valeurs (start end) :
    // on flagge si AU MOINS une composante n'est pas le gutter canonique.
    const parts = splitTopLevel(v);
    return parts.some((p) => !isCanonicalGut(p));
  }
  if (prop === 'padding') {
    const parts = splitTopLevel(v);
    // Composantes horizontales selon le nb de valeurs (CSS shorthand T R B L) :
    //   1 valeur  → all (R+L) = parts[0]
    //   2 valeurs → V H ; H = parts[1]
    //   3 valeurs → T H B ; H = parts[1]
    //   4 valeurs → T R B L ; R = parts[1], L = parts[3]
    let horiz = [];
    if (parts.length === 1) horiz = [parts[0]];
    else if (parts.length === 2 || parts.length === 3) horiz = [parts[1]];
    else if (parts.length >= 4) horiz = [parts[1], parts[3]];
    return horiz.some((p) => !isCanonicalGut(p));
  }
  return false;
}

// Parse les règles CSS de la surface <style> et retourne les violations .wrap*.
// Une « règle » = <prélude sélecteur> { <corps de déclarations> }.
function findWrapOverrides(surface, relFile) {
  const violations = [];
  // Match non-imbriqué suffisant ici (les .wrap* sont des règles plates, pas @media→règle imbriquée
  // qui ne capturerait que jusqu'au premier }). Pour gérer @media, on matche chaque bloc {…} le plus
  // interne via une regex de règle simple : sélecteur (sans { }) + corps sans { }.
  const RULE_RE = /([^{}]+)\{([^{}]*)\}/g;
  for (const m of surface.matchAll(RULE_RE)) {
    const selector = m[1];
    const body = m[2];
    // Le sélecteur doit cibler .wrap / .wrap-wide / .wrap-tight (word-boundary sur le suffixe).
    if (!/\.wrap(?![\w-])|\.wrap-wide(?![\w-])|\.wrap-tight(?![\w-])/.test(selector)) continue;
    // Index absolu du début du corps pour calculer les n° de ligne.
    const bodyStart = m.index + m[0].indexOf('{') + 1;
    // Itère les déclarations du corps.
    const DECL_RE = /([\w-]+)\s*:\s*([^;]+)(;|$)/g;
    for (const d of body.matchAll(DECL_RE)) {
      const prop = d[1].toLowerCase();
      const value = d[2];
      if (!H_PADDING_PROPS.has(prop)) continue;
      if (isHorizontalGutterOverride(prop, value)) {
        const absIdx = bodyStart + d.index;
        violations.push({
          file: relFile,
          line: lineOf(surface, absIdx),
          kind: 'wrap-override',
          detail: `${selector.trim().replace(/\s+/g, ' ')} { ${prop}: ${value.trim()} }`,
        });
      }
    }
  }
  return violations;
}

// Détecte tout usage du token fantôme var(--space-page-x) (partout dans le fichier brut).
function findPhantomToken(raw, relFile) {
  const hits = [];
  const RE = /var\(\s*--space-page-x[^)]*\)/g;
  for (const m of raw.matchAll(RE)) {
    hits.push({
      file: relFile,
      line: lineOf(raw, m.index),
      kind: 'phantom-token',
      detail: `${m[0]}  → token --space-page-x inexistant (utiliser var(--gut))`,
    });
  }
  return hits;
}

// Collecte les fichiers .astro dans les répertoires scopés, hors allowlist.
function collectFiles() {
  const out = [];
  for (const dir of [SECTIONS_DIR, ORGANISMS_DIR]) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith('.astro')) continue;
      if (ALLOWLIST.has(basename(f, '.astro'))) continue;
      out.push(join(dir, f));
    }
  }
  return out;
}

const files = collectFiles();
if (files.length === 0) {
  console.error(
    `ERREUR : 0 fichier .astro scanné dans ${SECTIONS_DIR} + ${ORGANISMS_DIR} (parse cassé ?)`
  );
  process.exit(2);
}

const violations = [];
for (const fpath of files) {
  const rel = relative(ROOT, fpath);
  const raw = readFileSync(fpath, 'utf8');
  const surface = extractStyleSurface(raw);
  violations.push(...findWrapOverrides(surface, rel));
  violations.push(...findPhantomToken(raw, rel));
}

const overrideHits = violations.filter((v) => v.kind === 'wrap-override');
const phantomHits = violations.filter((v) => v.kind === 'phantom-token');

const show = (arr) => (REPORT ? arr : arr.slice(0, 5));
const fmt = (h) => `    ${h.file}:${h.line}  ${h.detail}`;

console.log(`\n📏 Gutter canonique — ${files.length} fichiers (sections/ + ui/organisms/) scannés\n`);

console.log(
  `✗ Override du gutter sur .wrap* (padding horizontal ≠ var(--gut), BLOQUANT) : ${overrideHits.length}`
);
if (overrideHits.length) show(overrideHits).forEach((h) => console.log(fmt(h)));
if (!REPORT && overrideHits.length > 5) console.log(`    … +${overrideHits.length - 5} (voir --report)`);

console.log(
  `\n✗ Token fantôme var(--space-page-x) (inexistant dans tokens.css, BLOQUANT) : ${phantomHits.length}`
);
if (phantomHits.length) show(phantomHits).forEach((h) => console.log(fmt(h)));
if (!REPORT && phantomHits.length > 5) console.log(`    … +${phantomHits.length - 5} (voir --report)`);

const total = overrideHits.length + phantomHits.length;

if (total > 0) {
  console.log(
    `\n❌ FAIL — ${total} déviation(s) du gutter canonique. Le gutter horizontal du site est UNIQUE = var(--gut) (tokens.css). Migre chaque override vers var(--gut) et supprime var(--space-page-x).\n`
  );
  process.exit(1);
}

console.log(
  `\n✅ PASS — 0 override .wrap*, 0 token fantôme. Le gutter horizontal reste canonique (var(--gut)) partout.\n`
);
process.exit(0);
