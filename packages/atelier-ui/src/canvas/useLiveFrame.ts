// Waimia · Atelier · canvas (#39, brick B6) : rendu LIVE d'une iframe d'apercu, a concurrence bornee.
//
// Chaque bloc du canvas (et l'apercu page) rend un PageDocument dans une iframe via la route
// chrome-less. Deux chemins, comme dans l'ancienne ile BuilderCanvas :
//   - GET nominal : `iframe.src = renderPath?doc=<JSON encode>` (docs courts) ;
//   - POST de repli : `fetch(renderPath, {body})` -> `iframe.srcdoc = html` (docs longs, > URL_LIMIT).
//
// Difference vs `../preview/useThumbQueue` (qui borne des vignettes STATIQUES `/preview/<type>` via
// promotion `data-src -> src`) : ici le document est VIVANT (il change a chaque edition), donc la
// promotion data-src ne convient pas. On reprend la MEME idee de borne de concurrence (au plus
// `MAX_CONCURRENT` iframes chargent en meme temps) via un semaphore de module partage : le canvas
// peut afficher des dizaines de blocs sans saturer le navigateur (ERR_INSUFFICIENT_RESOURCES),
// exactement le probleme que resout useThumbQueue, mais applique a des rendus reactifs.
//
// 0 token DS (les constantes sont des seuils techniques, pas des tokens), 0 tiret cadratin U+2014.

import { useEffect, type RefObject } from 'react';

/** Au-dela, l'URL GET est trop longue : bascule POST+srcdoc (meme marge sure que BuilderCanvas). */
const URL_DOC_LIMIT = 6000;
/** Un seul rendu par rafale d'edition (debounce, ms). */
const DEBOUNCE_MS = 250;
/** Nombre maximum d'iframes qui chargent simultanement (identique au defaut de useThumbQueue). */
const MAX_CONCURRENT = 3;

// ── Semaphore de concurrence PARTAGE par toutes les iframes live de la page ────────────────────
let active = 0;
const waiters: Array<() => void> = [];

/** Acquiert un slot de chargement (resout quand un slot est libre). */
function acquire(): Promise<void> {
  if (active < MAX_CONCURRENT) {
    active += 1;
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    // Le slot est transmis a ce waiter par `release` (active reste comptabilise, pas de +1 ici).
    waiters.push(() => {
      active += 1;
      resolve();
    });
  });
}

/** Libere un slot : passe la main au prochain en attente, sinon decremente le compteur. */
function release(): void {
  const next = waiters.shift();
  if (next) {
    active -= 1; // sera immediatement re-incremente par le waiter (transfert de slot)
    next();
  } else {
    active = Math.max(0, active - 1);
  }
}

/**
 * Pilote une iframe pour qu'elle affiche `docJson` (JSON serialise d'un RenderDoc), en respectant
 * le debounce et la borne de concurrence. Relance a chaque changement de `docJson`.
 *
 * @param frameRef   ref de l'iframe cible.
 * @param docJson    JSON.stringify(RenderDoc) a afficher (chaine stable = pas de rechargement).
 * @param renderPath route de rendu chrome-less (ex. `/library/builder/render`).
 */
export function useLiveFrame(
  frameRef: RefObject<HTMLIFrameElement | null>,
  docJson: string,
  renderPath: string,
): void {
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let cancelled = false;
    let acquired = false;
    let released = false;

    // Libere le slot au plus une fois (fin de chargement OU annulation apres acquisition).
    const releaseOnce = (): void => {
      if (acquired && !released) {
        released = true;
        release();
      }
    };
    const onFrameDone = (): void => releaseOnce();

    const timer = window.setTimeout(async () => {
      const encoded = encodeURIComponent(docJson);
      const getUrl = `${renderPath}?doc=${encoded}`;

      await acquire();
      acquired = true;
      if (cancelled) {
        releaseOnce();
        return;
      }

      // On libere le slot quand l'iframe a fini de charger (GET comme srcdoc emettent `load`).
      frame.addEventListener('load', onFrameDone, { once: true });
      frame.addEventListener('error', onFrameDone, { once: true });

      if (getUrl.length <= URL_DOC_LIMIT) {
        // GET nominal. removeAttribute('srcdoc') si on revient d'un rendu POST precedent.
        if (frame.hasAttribute('srcdoc')) frame.removeAttribute('srcdoc');
        frame.src = getUrl;
        return;
      }

      // Repli POST : doc trop long pour l'URL -> fetch + srcdoc (aucune troncature).
      try {
        const res = await fetch(renderPath, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: docJson,
        });
        const html = await res.text();
        if (cancelled) {
          releaseOnce();
          return;
        }
        frame.srcdoc = html;
      } catch {
        // Erreur reseau : le rendu precedent reste affiche ; on libere le slot pour ne pas bloquer.
        releaseOnce();
      }
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      frame.removeEventListener('load', onFrameDone);
      frame.removeEventListener('error', onFrameDone);
      // Si on avait acquis un slot mais que le chargement n'a pas encore emis `load`, on le rend.
      releaseOnce();
    };
  }, [frameRef, docJson, renderPath]);
}
