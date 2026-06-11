/* Waimia · motion-signature.ts
   Deux MOMENTS motion signature, sobres et haut de gamme (chantier C3 punchlist it.3) :

   1. Manifesto progressif — le texte des manifestes (.manifesto-stmt__text /
      .manifesto-act__text) passe d'une teinte estompee a la pleine encre, mot par mot,
      pilote par la position de scroll de la section (« lecture guidee »). Scroll-driven
      via requestAnimationFrame, deterministe et testable.

   2. Count-up des metriques massives — les chiffres heros (.metric-callout__value,
      .stat-block__value, .proof-bar__value, .manifesto-act__stat-k) comptent de 0 vers
      leur valeur finale a l'entree au viewport, une seule fois, ~900ms, easing sobre.
      Le format (prefixe/suffixe : × / − / % / +) est preserve ; tout format non parsable
      retombe sur la valeur finale telle quelle (progressive enhancement).

   Contraintes : prefers-reduced-motion: reduce → AUCUNE animation (texte plein + valeurs
   finales immediatement). 0 CLS (anime opacity/couleur/contenu in place, largeur verrouillee
   pendant le count-up). Sans JS, le HTML contient deja la valeur finale (SSG).
   Idempotent — re-executable apres View Transitions. */

const MANIFESTO_SELECTOR = '.manifesto-stmt__text, .manifesto-act__text';
const COUNTUP_SELECTOR =
  '.metric-callout__value, .stat-block__value, .proof-bar__value, .manifesto-act__stat-k';

const COUNT_DURATION = 900; // ms
// Easing sobre (ease-out cubic) — pas de rebond.
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

const prefersReduced = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

/* ─────────────────────────── 1. Manifesto progressif ─────────────────────────── */

const splitState = new WeakSet<HTMLElement>();
const manifestoEls: HTMLElement[] = [];
let manifestoRaf = 0;
let manifestoBound = false;

// Enveloppe chaque mot des NŒUDS TEXTE dans un <span class="ms-word">, en preservant
// les nœuds element existants (<i>, <strong>, <span class="acc">). Les mots a l'interieur
// d'un element sont aussi captes en descendant recursivement dans les text nodes.
function splitWords(root: HTMLElement): HTMLElement[] {
  const words: HTMLElement[] = [];
  const textNodes: Text[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = walker.nextNode())) textNodes.push(n as Text);

  for (const tn of textNodes) {
    const raw = tn.nodeValue ?? '';
    if (!raw.trim()) continue;
    const frag = document.createDocumentFragment();
    // Garde les espaces comme nœuds texte ; chaque mot non-blanc devient un span.
    const parts = raw.split(/(\s+)/);
    for (const part of parts) {
      if (part === '') continue;
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part));
      } else {
        const span = document.createElement('span');
        span.className = 'ms-word';
        span.textContent = part;
        frag.appendChild(span);
        words.push(span);
      }
    }
    tn.parentNode?.replaceChild(frag, tn);
  }
  return words;
}

function updateManifesto(): void {
  manifestoRaf = 0;
  const vh = window.innerHeight || 1;
  for (const el of manifestoEls) {
    const words = (el as HTMLElement & { _msWords?: HTMLElement[] })._msWords;
    if (!words || words.length === 0) continue;
    const rect = el.getBoundingClientRect();
    // Progression : 0 quand le haut du bloc atteint 80% du viewport,
    // 1 quand le bas du bloc remonte a 30% du viewport. Lecture guidee.
    const start = vh * 0.8;
    const end = vh * 0.3;
    const travel = rect.height + (start - end);
    const scrolled = start - rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / travel));
    const lit = progress * words.length;
    for (let i = 0; i < words.length; i++) {
      // Chaque mot s'eclaire sur une fenetre douce (anti-tout-ou-rien).
      const local = Math.max(0, Math.min(1, lit - i));
      words[i].style.setProperty('--ms-lit', local.toFixed(3));
    }
  }
}

function requestManifestoUpdate(): void {
  if (manifestoRaf) return;
  manifestoRaf = window.requestAnimationFrame(updateManifesto);
}

function initManifesto(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(MANIFESTO_SELECTOR));
  if (els.length === 0) return;

  if (prefersReduced()) {
    // Aucune animation : texte plein, pleine encre. On ne split meme pas.
    for (const el of els) el.classList.add('ms-manifesto-full');
    return;
  }

  for (const el of els) {
    if (splitState.has(el)) continue;
    splitState.add(el);
    const words = splitWords(el);
    (el as HTMLElement & { _msWords?: HTMLElement[] })._msWords = words;
    el.classList.add('ms-manifesto-progressive');
    if (!manifestoEls.includes(el)) manifestoEls.push(el);
  }

  if (!manifestoBound) {
    manifestoBound = true;
    window.addEventListener('scroll', requestManifestoUpdate, { passive: true });
    window.addEventListener('resize', requestManifestoUpdate, { passive: true });
  }
  requestManifestoUpdate();
}

/* ─────────────────────────── 2. Count-up des metriques ─────────────────────────── */

const countState = new WeakSet<HTMLElement>();

interface ParsedMetric {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  decimalSep: ',' | '.';
}

// Parse prudent : un SEUL groupe numerique dans la chaine (sinon fallback = valeur finale).
// Gere « ×2,4 » / « −57 % » / « +18 » / « 100 ». Refuse « 23→100 » (2 nombres) → fallback.
function parseMetric(text: string): ParsedMetric | null {
  const trimmed = text.trim();
  // Tous les groupes numeriques (chiffres + separateur decimal , ou .).
  const numMatches = trimmed.match(/\d[\d\s .,]*\d|\d/g);
  if (!numMatches || numMatches.length !== 1) return null;

  const numStr = numMatches[0];
  const idx = trimmed.indexOf(numStr);
  const prefix = trimmed.slice(0, idx);
  const suffix = trimmed.slice(idx + numStr.length);

  // Detection separateur decimal : dernier , ou . suivi de 1-2 chiffres en fin de nombre.
  let decimals = 0;
  let decimalSep: ',' | '.' = '.';
  const decMatch = numStr.match(/[.,](\d{1,3})$/);
  if (decMatch) {
    decimals = decMatch[1].length;
    decimalSep = numStr[numStr.length - decMatch[1].length - 1] as ',' | '.';
  }
  // Valeur numerique : retire espaces (milliers) et normalise le separateur decimal en point.
  let normalized = numStr.replace(/[\s ]/g, '');
  if (decMatch) {
    // Remplace le separateur decimal final par un point ; retire les autres separateurs (milliers).
    const cut = normalized.length - decMatch[1].length - 1;
    normalized = normalized.slice(0, cut).replace(/[.,]/g, '') + '.' + normalized.slice(cut + 1);
  } else {
    normalized = normalized.replace(/[.,]/g, '');
  }
  const target = Number(normalized);
  if (!Number.isFinite(target)) return null;

  return { prefix, suffix, target, decimals, decimalSep };
}

function formatValue(value: number, p: ParsedMetric): string {
  const fixed = value.toFixed(p.decimals);
  const body = p.decimalSep === ',' ? fixed.replace('.', ',') : fixed;
  return p.prefix + body + p.suffix;
}

function animateCount(el: HTMLElement, p: ParsedMetric, finalText: string): void {
  // 0 CLS : verrouille la largeur a la valeur finale (deja mesurable, le HTML la contient),
  // puis anime le contenu. inline-block + min-width = aucun reflow horizontal.
  const w = el.getBoundingClientRect().width;
  el.style.display = 'inline-block';
  el.style.minWidth = `${w.toFixed(2)}px`;

  let t0 = 0;
  const settle = (): void => {
    // Snap garanti a la valeur finale exacte (format d'origine preserve au bit pres).
    el.textContent = finalText;
    el.style.minWidth = '';
    el.style.display = '';
  };
  const step = (now: number): void => {
    if (t0 === 0) t0 = now;
    const t = Math.min(1, (now - t0) / COUNT_DURATION);
    if (t < 1) {
      el.textContent = formatValue(easeOut(t) * p.target, p);
      window.requestAnimationFrame(step);
    } else {
      settle();
    }
  };
  window.requestAnimationFrame(step);
  // Filet : snap final inconditionnel apres la duree (couvre tab masque / rAF throttle).
  window.setTimeout(settle, COUNT_DURATION + 120);
}

let countObserver: IntersectionObserver | null = null;

function initCountUp(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>(COUNTUP_SELECTOR));
  if (els.length === 0) return;

  if (prefersReduced() || typeof IntersectionObserver === 'undefined') {
    // Aucune animation : la valeur finale est deja dans le DOM, rien a faire.
    return;
  }

  if (!countObserver) {
    countObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          countObserver?.unobserve(el);
          if (countState.has(el)) continue;
          countState.add(el);
          const finalText = (el.textContent ?? '').trim();
          const parsed = parseMetric(finalText);
          if (!parsed || parsed.target === 0) continue; // fallback : valeur finale telle quelle
          animateCount(el, parsed, finalText);
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.4 },
    );
  }

  for (const el of els) {
    if (!countState.has(el)) countObserver.observe(el);
  }
}

/* ─────────────────────────── orchestration ─────────────────────────── */

export function initMotionSignature(): void {
  if (typeof document === 'undefined') return;
  initManifesto();
  initCountUp();
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotionSignature);
  } else {
    initMotionSignature();
  }
  document.addEventListener('astro:page-load', initMotionSignature);
}
