// Waimia · Atelier · useThumbQueue : file de rendu a la demande des iframes d'apercu (React).
//
// Port FIDELE de packages/catalogue-ui/src/lazy-preview.ts vers un hook React, primitive
// consommee par les grilles de vignettes des vagues 2 (picker/canvas/inspector de l'Atelier).
//
// Meme probleme que l'original : une grille catalogue avec 25-35 vignettes-iframe live charge
// autant de documents /preview simultanement -> le navigateur sature (ERR_INSUFFICIENT_RESOURCES)
// et les vignettes du bas ne chargent jamais.
//
// Meme parade en DEUX temps, semantique inchangee :
//   1. l'iframe porte un `data-src` (PAS `src`) ; on ne le promeut en `src` que quand la carte
//      approche le viewport (IntersectionObserver, rootMargin 400px par defaut) ;
//   2. file de concurrence : au plus `maxConcurrent` (3 par defaut) iframes chargent en meme
//      temps. Une iframe libere son slot quand elle a fini (event load/error) -> la suivante
//      demarre. Aplatit la rafale de connexions qui sature le navigateur.
//
// Difference avec l'original (module-level + `astro:page-load`) : ici la file est LOCALE a
// l'instance montee (une file par grille), et le cycle de vie suit le montage React (effet +
// nettoyage `io.disconnect()`) au lieu de l'evenement de navigation Astro. La semantique de
// concurrence, de promotion data-src -> src et de liberation de slot est identique.
//
// Markup attendu par chaque wrapper (rendu par le composant React consommateur) :
//   <span data-lazy-preview>
//     <iframe data-src={`/preview/${type}`} loading="lazy" ... />
//   </span>

import { useEffect } from 'react';
import type { DependencyList, RefObject } from 'react';

export interface ThumbQueueOptions {
  /** Nombre maximum d'iframes qui chargent simultanement. Defaut : 3 (comme lazy-preview). */
  maxConcurrent?: number;
  /** Marge de declenchement de l'IntersectionObserver. Defaut : '400px'. */
  rootMargin?: string;
  /** Selecteur des wrappers a observer, dans le conteneur. Defaut : '[data-lazy-preview]'. */
  selector?: string;
}

/**
 * Attache une file de rendu a la demande aux wrappers d'apercu contenus dans `containerRef`.
 *
 * @param containerRef  Ref du conteneur de la grille (les wrappers `[data-lazy-preview]` sont
 *                      cherches a l'interieur).
 * @param deps          Dependances qui relancent l'observation (ex. la liste filtree/triee).
 * @param options       Reglages de concurrence / marge / selecteur.
 */
export function useThumbQueue(
  containerRef: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
  options: ThumbQueueOptions = {},
): void {
  const {
    maxConcurrent = 3,
    rootMargin = '400px',
    selector = '[data-lazy-preview]',
  } = options;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const wraps = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (wraps.length === 0) return;

    // File de concurrence LOCALE a ce montage (contrairement au singleton module de l'original).
    let inFlight = 0;
    const queue: HTMLElement[] = [];

    const pump = (): void => {
      while (inFlight < maxConcurrent && queue.length > 0) {
        const wrap = queue.shift()!;
        const iframe = wrap.querySelector('iframe[data-src]') as HTMLIFrameElement | null;
        const src = iframe?.getAttribute('data-src');
        if (!iframe || !src) continue;
        inFlight += 1;
        let released = false;
        const release = (): void => {
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
    };

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const wrap = entry.target as HTMLElement;
          obs.unobserve(wrap);
          if (wrap.querySelector('iframe[data-src]')) queue.push(wrap);
        }
        pump();
      },
      { rootMargin },
    );

    for (const wrap of wraps) {
      if (!wrap.querySelector('iframe[data-src]')) continue;
      io.observe(wrap);
    }

    return () => io.disconnect();
    // Relance l'observation quand la liste change (ajout/filtre/tri) ou les reglages.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxConcurrent, rootMargin, selector, ...deps]);
}
