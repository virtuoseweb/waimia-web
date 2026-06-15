/* Waimia · scroll-reveal.ts
   IntersectionObserver leger qui ajoute .is-visible aux elements .reveal[*].
   Idempotent : peut etre appele plusieurs fois sans dupliquer.
   Desactive si prefers-reduced-motion.

   Deux observers :
     - "standard"  → threshold 0.08 (declenche quand ~8 % de l'element entre).
     - "tall"      → threshold 0    (declenche des qu'un pixel entre).
   Raison : un element PLUS HAUT que le viewport ne peut JAMAIS exposer 8 % de
   sa surface simultanement (ex. corps d'essai ~15 000px sur mobile 844px →
   ratio max ≈ 5 %), donc l'observer standard ne tirait jamais et le contenu
   restait opacity:0 en permanence (bug mobile R1). On route ces elements vers
   l'observer "tall" ; le rootMargin existant suffit a eviter un declenchement
   hors ecran. Le routage est re-evalue au resize / changement d'orientation.
*/

const REVEAL_SELECTOR = [
  '.reveal',
  '.reveal-stagger',
  '.reveal-fade',
  '.reveal-slide',
  '.reveal-snap',
  '.reveal-mask-up',
  '.reveal-split-letter',
  '.reveal-curtain',
  '.reveal-zoom-in',
  '.reveal-blur-clip',
  // Variantes auparavant gerees par l'observer is:inline de Base.astro,
  // absorbees ici pour n'avoir qu'un seul observer reveal par page.
  '.reveal-up',
  '.scale-in',
  '.blur-in',
  '.clip-up',
  '.hair-draw',
  '.row-lines',
].join(', ');

// Plage inferieure du rootMargin (cf options ci-dessous) : -10 % du viewport.
// La hauteur de root effective d'observation vaut donc 0.9 × innerHeight.
const ROOT_MARGIN = '0px 0px -10% 0px';
const ROOT_BOTTOM_TRIM = 0.1; // -10%
const STANDARD_THRESHOLD = 0.08;

let standardObserver: IntersectionObserver | null = null;
let tallObserver: IntersectionObserver | null = null;
let observersReady = false;
const revealed = new WeakSet<Element>();
const tracked = new Set<Element>();
let resizeBound = false;
let resizeRaf = 0;

function reveal(el: Element): void {
  // Ceinture + bretelles : on ajoute is-visible ET in. Le CSS expose les deux
  // selecteurs pour chaque variante (.x.is-visible et .x.in), donc l'element
  // se revele quelle que soit la classe attendue. Idem fallback reduced-motion.
  el.classList.add('is-visible', 'in');
  revealed.add(el);
  tracked.delete(el);
}

function makeObserver(threshold: number): IntersectionObserver {
  return new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target;
          standardObserver?.unobserve(el);
          tallObserver?.unobserve(el);
          reveal(el);
        }
      }
    },
    { rootMargin: ROOT_MARGIN, threshold },
  );
}

// Un element est "tall" quand le seuil standard (0.08) est mathematiquement
// inatteignable : il faudrait exposer 8 % de sa hauteur, or le root effectif
// ne peut en montrer au mieux que (0.9 × innerHeight) px.
function isTall(el: Element): boolean {
  const h = (el as HTMLElement).offsetHeight;
  if (!h) return false;
  const effectiveViewport = (window.innerHeight || 0) * (1 - ROOT_BOTTOM_TRIM);
  return h * STANDARD_THRESHOLD > effectiveViewport;
}

function observe(el: Element): void {
  if (revealed.has(el)) return;
  // Retire l'element des deux observers avant de (re)router : permet une
  // re-evaluation propre au resize sans double-observation.
  standardObserver?.unobserve(el);
  tallObserver?.unobserve(el);
  if (isTall(el)) {
    tallObserver?.observe(el);
  } else {
    standardObserver?.observe(el);
  }
  tracked.add(el);
}

function setupObservers(): boolean {
  if (observersReady) return standardObserver !== null;
  observersReady = true;
  if (typeof IntersectionObserver === 'undefined') return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  standardObserver = makeObserver(STANDARD_THRESHOLD);
  tallObserver = makeObserver(0);
  return true;
}

// Au resize / changement d'orientation, un element devenu "tall" (ou redevenu
// "standard") doit changer d'observer, sinon un element non encore revele peut
// rester piege sur le mauvais seuil. On ne re-route que les elements non reveles.
function handleResize(): void {
  resizeRaf = 0;
  for (const el of [...tracked]) {
    if (!revealed.has(el)) observe(el);
  }
}

function requestResizeReroute(): void {
  if (resizeRaf) return;
  resizeRaf = window.requestAnimationFrame(handleResize);
}

export function initScrollReveal(): void {
  if (typeof document === 'undefined') return;
  const hasObservers = setupObservers();
  if (!hasObservers) {
    document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
      el.classList.add('is-visible', 'in');
    });
    resetParallax();
    return;
  }
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (!revealed.has(el) && !tracked.has(el)) observe(el);
  });
  // Filet above-the-fold (ex-fallback de l'observer is:inline de Base.astro) :
  // si un overlay (ex. BootSplash, z-index eleve) couvre le viewport au chargement,
  // l'IntersectionObserver peut ne pas tirer pour les elements deja visibles. On
  // revele apres 1300ms tout element encore masque dont le rect chevauche le viewport.
  // Garde uniquement quand des observers existent : sous reduced-motion, le fallback
  // immediat (plus haut) a deja tout revele.
  if (hasObservers) {
    window.setTimeout(() => {
      const vh = window.innerHeight || 0;
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (revealed.has(el)) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.95 && rect.bottom > 0) {
          standardObserver?.unobserve(el);
          tallObserver?.unobserve(el);
          reveal(el);
        }
      });
    }, 1300);
  }
  if (!resizeBound) {
    resizeBound = true;
    window.addEventListener('resize', requestResizeReroute, { passive: true });
    window.addEventListener('orientationchange', requestResizeReroute, { passive: true });
  }
  initScrollLinkedParallax();
}

let parallaxReady = false;
let parallaxRaf = 0;

function resetParallax(): void {
  document.querySelectorAll<HTMLElement>('[data-par]').forEach((el) => {
    el.style.transform = '';
  });
}

function updateParallax(): void {
  parallaxRaf = 0;
  const viewportHeight = window.innerHeight || 1;
  document.querySelectorAll<HTMLElement>('[data-par]').forEach((el) => {
    const speed = Number(el.dataset.par ?? '0');
    if (!Number.isFinite(speed) || speed === 0) return;
    const rect = el.getBoundingClientRect();
    const centerDelta = rect.top + rect.height / 2 - viewportHeight / 2;
    const offset = centerDelta * speed;
    el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  });
}

function requestParallaxUpdate(): void {
  if (parallaxRaf) return;
  parallaxRaf = window.requestAnimationFrame(updateParallax);
}

function initScrollLinkedParallax(): void {
  if (parallaxReady) {
    requestParallaxUpdate();
    return;
  }
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    resetParallax();
    return;
  }
  if (!document.querySelector('[data-par]')) return;

  parallaxReady = true;
  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  window.addEventListener('resize', requestParallaxUpdate, { passive: true });
  requestParallaxUpdate();
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
  document.addEventListener('astro:page-load', initScrollReveal);
}
