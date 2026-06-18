/* Waimia · container-expand.ts
   Effet scroll-driven REUTILISABLE : Container Expansion.

   Une carte [data-expand] demarre contenue (marges laterales + border-radius +
   leger scale-down) puis, a la traversee du viewport, ses marges -> 0, son radius
   -> 0 et son scale -> 1 (elle occupe presque tout le viewport). Le module ecrit
   une progression 0..1 dans la custom property `--expand` sur l'element ; la CSS
   interpole avec calc() sur des tokens existants (cf .container-expand dans
   scroll-reveal.css). Meme pattern rAF que parallaxe / motion-signature :
   listener scroll passif + requestAnimationFrame, deterministe et testable.

   Contraintes : prefers-reduced-motion: reduce ET mobile <=768px -> AUCUN effet
   (etat final visible immediatement, --expand=1). Auto-mount idempotent (WeakSet).
   Re-executable apres View Transitions. */

const SELECTOR = '[data-expand]';
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

// Progression 0..1 sur la traversee du viewport par l'element : 0 quand le haut de
// l'element atteint le bas du viewport, 1 quand le bas de l'element atteint le haut.
// On lisse vers le centre pour que l'expansion soit pleine quand l'element est centre.
function progressFor(el: HTMLElement, vh: number): number {
  const rect = el.getBoundingClientRect();
  const start = vh; // entree par le bas
  const end = -rect.height; // sortie par le haut
  const raw = (start - rect.top) / (start - end);
  return Math.max(0, Math.min(1, raw));
}

function update(): void {
  raf = 0;
  const vh = window.innerHeight || 1;
  for (const el of tracked) {
    const p = progressFor(el, vh);
    el.style.setProperty('--expand', p.toFixed(4));
  }
}

function requestUpdate(): void {
  if (raf) return;
  raf = window.requestAnimationFrame(update);
}

function neutralize(): void {
  for (const el of tracked) el.style.setProperty('--expand', '1');
}

export function initContainerExpand(): void {
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
    document.addEventListener('DOMContentLoaded', initContainerExpand);
  } else {
    initContainerExpand();
  }
  document.addEventListener('astro:page-load', initContainerExpand);
}
