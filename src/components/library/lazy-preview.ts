// Waimia · Library · montage à la demande des iframes d'aperçu (defensif anti-saturation).
//
// Problème : une grille catalogue avec 25-35 vignettes-iframe live (ex. /library/[category]
// feature-sections=33, hero-header-sections=31 ; /library/family/[family] card-grid=28, hero=26)
// charge autant de documents /preview simultanément → le navigateur sature
// (ERR_INSUFFICIENT_RESOURCES) et les vignettes du bas ne chargent jamais.
//
// Parade en DEUX temps :
//   1. l'iframe porte un `data-src` (PAS `src`) ; on ne le promeut en `src` que quand la carte
//      approche le viewport (IntersectionObserver, rootMargin 400px) ;
//   2. file de concurrence : au plus MAX_CONCURRENT iframes chargent en même temps. Une iframe
//      libère son slot quand elle a fini (event load) → la suivante démarre. Aplatit la rafale
//      de connexions qui sature le navigateur en dev.
// preview-frame.ts scale ensuite l'iframe (il écoute déjà load + astro:page-load).
//
// Markup attendu (côté .astro) :
//   <span ... data-preview-frame data-max-height="..." data-lazy-preview>
//     <iframe ... data-src={`/preview/${type}`} loading="lazy" ...></iframe>
//   </span>

const MAX_CONCURRENT = 3;
let inFlight = 0;
const queue: HTMLElement[] = [];

function pump(): void {
  while (inFlight < MAX_CONCURRENT && queue.length > 0) {
    const wrap = queue.shift()!;
    const iframe = wrap.querySelector('iframe[data-src]') as HTMLIFrameElement | null;
    const src = iframe?.getAttribute('data-src');
    if (!iframe || !src) continue;
    inFlight++;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      inFlight = Math.max(0, inFlight - 1);
      pump();
    };
    iframe.addEventListener('load', release, { once: true });
    iframe.addEventListener('error', release, { once: true });
    iframe.src = src;
    iframe.removeAttribute('data-src');
  }
}

function initLazyPreviews(): void {
  const wraps = Array.from(document.querySelectorAll<HTMLElement>('[data-lazy-preview]'));
  if (wraps.length === 0) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const wrap = entry.target as HTMLElement;
        obs.unobserve(wrap);
        if (wrap.querySelector('iframe[data-src]')) {
          queue.push(wrap);
        }
      }
      pump();
    },
    { rootMargin: '400px' },
  );

  for (const wrap of wraps) {
    if (!wrap.querySelector('iframe[data-src]')) continue;
    io.observe(wrap);
  }
}

document.addEventListener('astro:page-load', initLazyPreviews);
