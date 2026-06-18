/* Waimia · scroll-morph.ts
   Effet scroll-driven REUTILISABLE : Scroll Morph (transition A -> B au scroll).

   Un parent [data-morph] contient 2 enfants superposes [data-morph-from] (A) et
   [data-morph-to] (B). Sur la plage de traversee du viewport, A passe opacity 1->0
   (+ leger scale/translate) et B passe opacity 0->1. Le module ecrit une progression
   0..1 dans la custom property `--morph` sur le parent ; la CSS interpole l'opacite
   et la transform des 2 enfants (cf .scroll-morph dans scroll-reveal.css). Meme
   pattern rAF que parallaxe / motion-signature.

   Contraintes : prefers-reduced-motion: reduce ET mobile <=768px -> affiche l'etat
   final (B visible, A masque), --morph=1. Auto-mount idempotent (WeakSet).
   Re-executable apres View Transitions. */

const SELECTOR = '[data-morph]';
const MOBILE_MAX = 768;

const mounted = new WeakSet<HTMLElement>();
const tracked: HTMLElement[] = [];
let raf = 0;
let bound = false;

const prefersReduced = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

const isMobile = (): boolean =>
  typeof window !== 'undefined' && window.innerWidth <= MOBILE_MAX;

// Progression 0..1 centree sur la traversee : la bascule A->B se joue pendant que
// l'element parcourt le viewport. 0 a l'entree par le bas, 1 a la sortie par le haut.
function progressFor(el: HTMLElement, vh: number): number {
  const rect = el.getBoundingClientRect();
  const start = vh * 0.85;
  const end = -rect.height + vh * 0.15;
  const raw = (start - rect.top) / (start - end);
  return Math.max(0, Math.min(1, raw));
}

function update(): void {
  raf = 0;
  const vh = window.innerHeight || 1;
  for (const el of tracked) {
    const p = progressFor(el, vh);
    el.style.setProperty('--morph', p.toFixed(4));
  }
}

function requestUpdate(): void {
  if (raf) return;
  raf = window.requestAnimationFrame(update);
}

function neutralize(): void {
  for (const el of tracked) el.style.setProperty('--morph', '1');
}

export function initScrollMorph(): void {
  if (typeof document === 'undefined') return;
  const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  if (els.length === 0) return;

  for (const el of els) {
    if (mounted.has(el)) continue;
    mounted.add(el);
    tracked.push(el);
  }

  if (prefersReduced() || isMobile()) {
    neutralize();
    return;
  }

  if (!bound) {
    bound = true;
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
  }
  requestUpdate();
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollMorph);
  } else {
    initScrollMorph();
  }
  document.addEventListener('astro:page-load', initScrollMorph);
}
