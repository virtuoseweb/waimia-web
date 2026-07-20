// @waimia/atelier-ui · inspector · client léger de l'endpoint dev `/api/ds/ref-options`.
//
// Un slot `array` `refable` (P4.4-e) peut, par item, pointer une source de contenu GLOBAL
// (`{ ref: '<source>/<id>' }`) au lieu de sa forme inline. Le widget de sélection a besoin de
// LISTER les ids choisissables d'une source. Cet endpoint est dev-only (monté par l'intégration
// `ds-save-dev.mjs`) : il n'existe que sous le builder/DS Studio local, exactement le contexte où
// l'édition `{ref}` a du sens (aucune écriture de contenu en prod SSG statique).
//
// DÉROGATION ASSUMÉE à la « pureté 0-fetch » de l'inspecteur : l'hôte (BuilderHost) fournit
// habituellement les données/callbacks en props, mais lister les refs est une préoccupation
// locale à ce widget et l'endpoint n'existe qu'en dev. On calque le pattern de fetch DIRECT déjà
// utilisé DANS ce package (BuilderApp.tsx → /api/ds/compose, useLiveFrame.ts → render). Échec
// réseau/endpoint absent → liste vide (dégradation propre, jamais de throw dans l'UI).

export interface RefOption {
  id: string;
  label: string;
}

const cache = new Map<string, Promise<RefOption[]>>();

/**
 * Liste (mémoïsée par source) les ids référençables d'une source de contenu global.
 * Résout TOUJOURS (jamais rejette) : une erreur donne `[]` et n'est pas mise en cache
 * (une nouvelle tentative reste possible, ex. serveur dev pas encore prêt).
 */
export function fetchRefOptions(source: string): Promise<RefOption[]> {
  const cached = cache.get(source);
  if (cached) return cached;

  const pending: Promise<RefOption[]> = fetch(
    `/api/ds/ref-options?source=${encodeURIComponent(source)}`,
  )
    .then((r) => (r.ok ? r.json() : null))
    .then((j: unknown) => {
      const ids =
        j && typeof j === 'object' && (j as { ok?: unknown }).ok
          ? (j as { ids?: unknown }).ids
          : null;
      if (!Array.isArray(ids)) return [] as RefOption[];
      return ids.filter(
        (o): o is RefOption =>
          !!o && typeof (o as RefOption).id === 'string',
      );
    })
    .catch(() => [] as RefOption[]);

  cache.set(source, pending);
  // Ne pas garder un résultat vide en cache (probable erreur transitoire) → autorise un retry.
  void pending.then((opts) => {
    if (opts.length === 0) cache.delete(source);
  });
  return pending;
}
