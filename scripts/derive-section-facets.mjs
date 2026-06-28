#!/usr/bin/env node
// derive-section-facets.mjs — Vague C / F0
// Dérive un PREMIER JET de facettes (effects / interactions / elements / layoutFacets)
// pour chaque SectionType du registry, par heuristiques sourcées sur le composant .astro.
//
// Sortie : tasks/facets-derived.json  { [type]: {effects, interactions, elements, layoutFacets} }
//
// Avec le flag --inject, le script injecte AUSSI les facettes dans chaque entrée de
// SECTIONS (src/lib/section-registry.ts), juste avant la ligne `tags:` :
//   - les 32 types ACTIFS  -> CURATED (curé à la main, vérifié sur le composant)
//   - les ~167 autres      -> jet auto dérivé ci-dessus
// L'injection est idempotente (saute une entrée qui a déjà `effects:`).
//
// Vocabulaires verrouillés : cf src/lib/section-facets.ts (mêmes unions). Le script
// ne produit QUE des tags présents dans ces listes.
//
// Usage : node scripts/derive-section-facets.mjs            (dérive seulement)
//         node scripts/derive-section-facets.mjs --inject   (dérive + peuple le registry)

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SECTIONS_DIR = join(ROOT, 'src', 'components', 'sections');
const REGISTRY = join(ROOT, 'src', 'lib', 'section-registry.ts');
const OUT_DIR = join(ROOT, 'tasks');
const OUT_FILE = join(OUT_DIR, 'facets-derived.json');

// ---------------------------------------------------------------------------
// 1. Parse le registry : type -> nom de composant importé.
// ---------------------------------------------------------------------------
const registrySrc = readFileSync(REGISTRY, 'utf8');

// Imports : `import HeroSplit from '../components/sections/HeroSplit.astro';`
const importMap = new Map(); // ComponentName -> fichier .astro (sections/ uniquement)
for (const m of registrySrc.matchAll(
  /import\s+(\w+)\s+from\s+'\.\.\/components\/sections\/([\w-]+)\.astro';/g,
)) {
  importMap.set(m[1], `${m[2]}.astro`);
}

// Entrées SECTIONS : `'hero-split': { component: HeroSplit, ... }`
const typeToComponent = new Map(); // type -> ComponentName
for (const m of registrySrc.matchAll(/'([\w-]+)':\s*\{\s*[\s\S]*?component:\s*(\w+)/g)) {
  // n'enregistre que les clés trouvées AVANT leur `component:` immédiat
  typeToComponent.set(m[1], m[2]);
}

// ---------------------------------------------------------------------------
// 2. Cache des sources de composant.
// ---------------------------------------------------------------------------
const sectionFiles = new Set(
  readdirSync(SECTIONS_DIR).filter((f) => f.endsWith('.astro')),
);
const srcCache = new Map();
function readComponent(name) {
  const file = importMap.get(name);
  if (!file || !sectionFiles.has(file)) return null;
  if (!srcCache.has(file)) {
    srcCache.set(file, readFileSync(join(SECTIONS_DIR, file), 'utf8'));
  }
  return srcCache.get(file);
}

// ---------------------------------------------------------------------------
// 3. Heuristiques de dérivation (sourcées sur le markup/CSS/script du .astro).
// ---------------------------------------------------------------------------
function uniq(arr) {
  return [...new Set(arr)];
}

function deriveFacets(src) {
  const effects = [];
  const interactions = [];
  const elements = [];
  const layout = [];

  const has = (re) => re.test(src);
  const count = (re) => (src.match(re) || []).length;

  // ---- signaux bruts ----
  const hasReveal = /class="[^"]*\breveal\b/.test(src) || /\breveal-stagger\b/.test(src);
  const hasObserver = /IntersectionObserver/.test(src);
  const hasDataActiveOpacity =
    /data-active/.test(src) && /opacity/.test(src) && count(/data-active/g) >= 2;
  const hasSticky = /position:\s*sticky/.test(src);
  const hasMarquee = /marquee/i.test(src) || (/@keyframes/.test(src) && /translateX/.test(src));
  const hasHover = /:hover/.test(src) || /pointerenter/.test(src) || /addEventListener\(['"]mouseenter/.test(src);
  const hasHoverImg = hasHover && /<img/.test(src);
  const hasInterval = /setInterval/.test(src);
  const hasSnap = /scroll-snap-type/.test(src) || /overflow-x:\s*auto/.test(src) || /overflow-x:\s*scroll/.test(src);
  const hasDetails = /<details/.test(src) || /aria-expanded/.test(src);
  const hasParallax = /parallax/i.test(src);
  const hasCountUp = /count-?up/i.test(src) || /data-count/.test(src);
  const imgCount = count(/<img\b/g);
  const hasForm = /<form/.test(src) || /<input/.test(src) || /<textarea/.test(src);
  const hasTable = /<table/.test(src);
  const hasSvgInline = /set:html/.test(src) && (/<svg/i.test(src) || /line-?art/i.test(src) || /art\b/.test(src));
  const hasBgImage = /background-image/.test(src) || /data-bg-image/.test(src) || /backgroundImage/.test(src);
  const hasBtn = /\bbtn\b/.test(src) || /class="[^"]*cta/.test(src) || /\.btn-/.test(src);
  const hasLogos = /logoId/i.test(src) || /\blogos?\b/.test(src) || /logo-marquee/i.test(src) || /LogoCloud/.test(src);
  const hasKpi = /\bkpi\b/i.test(src) || /numeral/i.test(src) || /stat[-_]?(num|value|figure)/i.test(src) || /StatBlock|StatRow|StatsBento/.test(src);
  const hasQuote = /<blockquote/.test(src) || /\bquote\b/i.test(src) || /testimonial/i.test(src);
  const hasCode = /<pre/.test(src) || /<code/.test(src) || /terminal/i.test(src) || /code-block/i.test(src);
  const hasTimeline = /timeline/i.test(src);
  const hasBadge = /\bbadge\b/i.test(src) || /\beyebrow\b/i.test(src) || /\bpill\b/i.test(src);
  const hasAvatar = /\bavatar\b/i.test(src) || /\bauthor\b/i.test(src) || /\bphoto\b/i.test(src) && /author|team|person/i.test(src);
  const hasTabs = /role="tab"/.test(src) || /\btabs?\b/i.test(src) && /data-tab/.test(src);
  const hasSlider = /\bslider\b/i.test(src) || /\bcarousel\b/i.test(src);
  const hasIcon = /\bicon\b/i.test(src) || /<i\b/.test(src) || /iconify/i.test(src);
  const hasCards = /\bcard\b/i.test(src) || /\btile\b/i.test(src);
  // listes répétées : >= 2 <ul>/<ol> ou .map( sur <li>
  const listCount = count(/<ul\b/g) + count(/<ol\b/g);
  const hasList = listCount >= 1 && /<li\b/.test(src);

  // grid-template-columns max nb de pistes (en desktop). On regarde les valeurs.
  let maxCols = 0;
  for (const g of src.matchAll(/grid-template-columns:\s*([^;]+);/g)) {
    const decl = g[1];
    // compte les pistes : repeat(N, ...) sinon nb de tokens séparés par espace
    const rep = decl.match(/repeat\(\s*(\d+)/);
    let n;
    if (rep) {
      n = parseInt(rep[1], 10);
    } else {
      n = decl.trim().split(/\s+/).filter(Boolean).length;
    }
    if (Number.isFinite(n) && n > maxCols) maxCols = n;
  }
  const hasBento = /\bbento\b/i.test(src);
  const hasCentered = /text-align:\s*center/.test(src) || /\bcentered\b/i.test(src) || /items-center/.test(src) && /justify-center/.test(src);
  const hasSplit = /\bsplit\b/i.test(src) || (maxCols === 2 && /media/i.test(src));
  const hasFullBleed = /\bfull-?bleed\b/i.test(src) || /100vw/.test(src) || /\bfullbleed\b/i.test(src);
  const hasMediaLeft = /media[-_]?(side|order)/i.test(src) && /(left|start|reverse)/i.test(src);
  const hasMediaRight = /media/i.test(src) && maxCols === 2;

  // ---- effects ----
  if (hasObserver && hasDataActiveOpacity && hasSticky) effects.push('sticky-media', 'crossfade');
  if (hasSticky && /stack|stk__|cards/i.test(src) && !effects.includes('sticky-media')) effects.push('sticky-stack');
  if (hasMarquee) effects.push('marquee');
  if (hasSnap) effects.push('horizontal-scroll');
  if (hasInterval && hasDataActiveOpacity) effects.push('auto-rotate', 'crossfade');
  else if (hasInterval) effects.push('auto-rotate');
  if (hasDataActiveOpacity && !effects.includes('crossfade') && !effects.includes('horizontal-scroll')) effects.push('crossfade');
  if (hasHoverImg && /reveal/i.test(src) && /pointer|mouse|:hover/.test(src) && /hrl__|hover-reveal/i.test(src)) effects.push('hover-reveal');
  if (hasHover && /scale\(|transform:\s*scale|zoom/i.test(src) && /<img/.test(src)) effects.push('hover-zoom');
  if (hasParallax) effects.push('parallax');
  if (hasCountUp) effects.push('count-up');
  if (hasDetails) effects.push('expand-collapse');
  if (hasReveal || hasObserver) effects.push('scroll-reveal');
  if (effects.length === 0) effects.push('static');

  // ---- interactions ----
  if (hasHover) interactions.push('hover');
  if (hasObserver || hasSticky || hasReveal) interactions.push('scroll');
  if (hasDetails || /button[^>]*toggle/i.test(src) || hasTabs) interactions.push('click-toggle');
  if (hasInterval) interactions.push('autoplay');
  if (hasSnap) interactions.push('drag-scroll');
  if (interactions.length === 0) interactions.push('none');

  // ---- elements ----
  if (imgCount >= 2) elements.push('multiple-images');
  else if (imgCount === 1) elements.push('image');
  if (hasBgImage) elements.push('background-image');
  if (hasSvgInline) elements.push('line-art');
  if (hasBtn) elements.push('buttons');
  if (hasForm) elements.push('form');
  if (hasLogos) elements.push('logos');
  if (hasDetails) elements.push('accordion');
  if (hasTable) elements.push('table');
  if (hasList) elements.push('list');
  if (hasKpi) elements.push('kpi-numbers');
  if (hasIcon) elements.push('icons');
  if (hasQuote) elements.push('quote');
  if (hasCode) elements.push('code-block');
  if (hasTimeline) elements.push('timeline');
  if (hasBadge) elements.push('badge');
  if (hasAvatar) elements.push('avatar');
  if (hasTabs) elements.push('tabs');
  if (hasSlider) elements.push('slider');
  if (hasCards) elements.push('cards');
  if (/<video/.test(src)) elements.push('video');

  // ---- layoutFacets ----
  if (maxCols >= 5) layout.push('multi-col');
  else if (maxCols === 4) layout.push('4-col');
  else if (maxCols === 3) layout.push('3-col');
  else if (maxCols === 2) layout.push('2-col');
  else if (maxCols === 1) layout.push('1-col');
  if (hasBento) layout.push('bento');
  if (hasMediaLeft) layout.push('media-left');
  if (hasMediaRight && !hasMediaLeft) layout.push('media-right');
  if (hasCentered) layout.push('centered');
  if (hasSplit) layout.push('split');
  if (hasFullBleed) layout.push('full-bleed');
  if (layout.length === 0) layout.push('1-col');

  return {
    effects: uniq(effects),
    interactions: uniq(interactions),
    elements: uniq(elements),
    layoutFacets: uniq(layout),
  };
}

// ---------------------------------------------------------------------------
// 4. Boucle sur tous les types du registry.
// ---------------------------------------------------------------------------
const result = {};
let derived = 0;
let fallback = 0;
const missing = [];

for (const [type, compName] of typeToComponent) {
  const src = readComponent(compName);
  if (!src) {
    // composant non trouvé (ex. import depuis un autre dossier) -> fallback minimal
    result[type] = {
      effects: ['static'],
      interactions: ['none'],
      elements: [],
      layoutFacets: ['1-col'],
    };
    fallback += 1;
    missing.push(`${type} (${compName})`);
    continue;
  }
  result[type] = deriveFacets(src);
  derived += 1;
}

// ---------------------------------------------------------------------------
// 5. Écriture.
// ---------------------------------------------------------------------------
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(result, null, 2) + '\n', 'utf8');

console.log(`[derive-section-facets] types: ${typeToComponent.size}`);
console.log(`  dérivés depuis composant : ${derived}`);
console.log(`  fallback (composant introuvable) : ${fallback}`);
if (missing.length) console.log(`  introuvables : ${missing.join(', ')}`);
console.log(`  écrit : ${OUT_FILE}`);

// ===========================================================================
// 6. CURATION des 32 types actifs (vérifiée composant par composant).
//    Vocabulaire VERROUILLÉ (section-facets.ts).
// ===========================================================================
const CURATED = {
  // ── 25 services ──
  'hero-masthead-card': { effects: ['static'], interactions: ['none'], elements: ['line-art', 'image', 'buttons', 'badge', 'list'], layoutFacets: ['2-col', 'media-right', 'split'] },
  'proof-bar': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['kpi-numbers', 'quote'], layoutFacets: ['multi-col'] },
  'statement-orbit': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['line-art', 'image'], layoutFacets: ['2-col', 'split'] },
  'definition-extract': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['badge', 'list'], layoutFacets: ['1-col', 'centered'] },
  'pain-severity-list': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['list', 'badge'], layoutFacets: ['1-col'] },
  'versus-competitors': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['table'], layoutFacets: ['multi-col'] },
  'deliverables-grid': { effects: ['scroll-reveal'], interactions: ['hover', 'scroll'], elements: ['line-art', 'cards', 'list'], layoutFacets: ['multi-col'] },
  'feature-zigzag': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['line-art', 'image', 'list'], layoutFacets: ['2-col', 'media-left', 'media-right', 'split'] },
  'bento-grid': { effects: ['static'], interactions: ['none'], elements: ['icons', 'cards', 'list'], layoutFacets: ['bento'] },
  'method-timeline': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['timeline', 'list'], layoutFacets: ['multi-col'] },
  'stats-bento': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['kpi-numbers', 'cards'], layoutFacets: ['bento'] },
  'logo-marquee': { effects: ['marquee'], interactions: ['hover', 'autoplay'], elements: ['logos'], layoutFacets: ['1-col', 'full-bleed'] },
  'pricing-cards': { effects: ['static'], interactions: ['hover'], elements: ['cards', 'badge', 'list', 'buttons'], layoutFacets: ['3-col'] },
  'case-card-grid': { effects: ['scroll-reveal'], interactions: ['hover', 'scroll'], elements: ['cards', 'list'], layoutFacets: ['multi-col'] },
  'eeat-panel': { effects: ['scroll-reveal'], interactions: ['hover', 'scroll'], elements: ['multiple-images', 'kpi-numbers', 'badge', 'avatar', 'buttons', 'list'], layoutFacets: ['multi-col', 'bento'] },
  'faq-two-column': { effects: ['static'], interactions: ['none'], elements: ['list'], layoutFacets: ['2-col'] },
  'footer-cta-band': { effects: ['static'], interactions: ['none'], elements: ['buttons'], layoutFacets: ['2-col', 'split'] },
  'feature-split-media': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['image', 'buttons', 'list'], layoutFacets: ['2-col', 'media-left', 'media-right', 'split'] },
  'diagnostic-stages': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['icons', 'list'], layoutFacets: ['multi-col'] },
  'workflow-table': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['table', 'badge', 'kpi-numbers'], layoutFacets: ['multi-col'] },
  'department-stack': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['table', 'badge', 'list'], layoutFacets: ['2-col'] },
  'comparison-duo': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['list', 'icons'], layoutFacets: ['2-col', 'split'] },
  'architecture-diagram': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['line-art'], layoutFacets: ['centered'] },
  'method-stepline': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['timeline', 'list'], layoutFacets: ['1-col'] },
  'system-flow': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['line-art', 'icons', 'list'], layoutFacets: ['1-col'] },
  // ── 7 nouvelles familles ──
  'scroll-gallery': { effects: ['sticky-media', 'crossfade', 'scroll-reveal'], interactions: ['scroll'], elements: ['multiple-images', 'list'], layoutFacets: ['2-col', 'media-right', 'split'] },
  'stack-cards': { effects: ['sticky-stack', 'scroll-reveal'], interactions: ['scroll'], elements: ['multiple-images', 'line-art', 'cards', 'list'], layoutFacets: ['2-col', 'split'] },
  'hover-reveal-list': { effects: ['hover-reveal', 'scroll-reveal'], interactions: ['hover', 'scroll'], elements: ['multiple-images', 'list'], layoutFacets: ['2-col', 'split'] },
  'horizontal-showcase': { effects: ['horizontal-scroll', 'scroll-reveal'], interactions: ['scroll', 'drag-scroll'], elements: ['multiple-images', 'buttons', 'list'], layoutFacets: ['multi-col', 'full-bleed'] },
  'media-bento': { effects: ['hover-zoom', 'scroll-reveal'], interactions: ['hover', 'scroll'], elements: ['multiple-images', 'cards'], layoutFacets: ['bento'] },
  'photo-cluster': { effects: ['scroll-reveal'], interactions: ['scroll'], elements: ['multiple-images'], layoutFacets: ['off-grid'] },
  'media-swap-band': { effects: ['crossfade', 'auto-rotate', 'scroll-reveal'], interactions: ['hover', 'scroll', 'autoplay'], elements: ['multiple-images', 'buttons'], layoutFacets: ['2-col', 'split'] },
};

// Merge : curation gagne sur le jet auto pour les 32, le reste garde le jet.
const FINAL = { ...result };
for (const [type, f] of Object.entries(CURATED)) {
  if (!FINAL[type]) throw new Error(`Type curé absent du registry : ${type}`);
  FINAL[type] = f;
}

// ===========================================================================
// 7. Injection dans le registry (flag --inject).
// ===========================================================================
if (process.argv.includes('--inject')) {
  const regLines = registrySrc.split('\n');
  const out = [];
  const ENTRY_RE = /^ {2}'([\w-]+)': \{$/;
  const TAGS_RE = /^ {4}tags:/;
  const INDENT = '    ';
  const fmtArr = (arr) => '[' + arr.map((t) => `'${t}'`).join(', ') + ']';

  let curType = null;
  let injected = 0;
  let already = 0;

  for (let i = 0; i < regLines.length; i++) {
    const line = regLines[i];
    const em = line.match(ENTRY_RE);
    if (em) curType = em[1];

    if (curType && TAGS_RE.test(line)) {
      // déjà injecté ? (cherche `effects:` en arrière jusqu'à l'ouverture du bloc)
      let has = false;
      for (let j = i - 1; j >= 0 && !ENTRY_RE.test(regLines[j]); j--) {
        if (/^ {4}effects:/.test(regLines[j])) {
          has = true;
          break;
        }
      }
      if (!has) {
        const f = FINAL[curType];
        if (!f) throw new Error(`Pas de facettes pour ${curType}`);
        out.push(`${INDENT}effects: ${fmtArr(f.effects)},`);
        out.push(`${INDENT}interactions: ${fmtArr(f.interactions)},`);
        out.push(`${INDENT}elements: ${fmtArr(f.elements)},`);
        out.push(`${INDENT}layoutFacets: ${fmtArr(f.layoutFacets)},`);
        injected += 1;
      } else {
        already += 1;
      }
      curType = null;
    }
    out.push(line);
  }

  writeFileSync(REGISTRY, out.join('\n'), 'utf8');
  console.log(`[inject] injectées : ${injected} · déjà présentes : ${already} · curées : ${Object.keys(CURATED).length}`);
}
