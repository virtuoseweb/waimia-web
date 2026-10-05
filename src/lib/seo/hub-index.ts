// Waimia · règle d'indexation des hubs de listing (politique index-on-quality, strategy/10 §3).
//
// Un hub (/ressources/guides, /ressources/comparatifs, /ressources/outils…) est indexable dès
// qu'il liste au moins HUB_MIN_INDEXABLE_CHILDREN pages filles elles-mêmes indexables. La règle
// est CALCULÉE au build par chaque hub : plus de `noindex` écrit en dur, plus de liste à tenir.
// Le sitemap suit tout seul : l'intégration sitemapHygiene retire toute page noindex du sitemap.

/** Nombre minimal de pages filles indexables pour qu'un hub soit lui-même indexé. */
export const HUB_MIN_INDEXABLE_CHILDREN = 3;

/** Vrai si l'entrée de collection est indexable (pas de `seo.noindex`). */
export const isIndexableEntry = (entry: { data: { seo?: { noindex?: boolean } } }): boolean =>
  !entry.data.seo?.noindex;

/** Valeur de la prop `noindex` d'un hub, d'après le nombre de pages filles indexables listées. */
export const hubNoindex = (indexableChildren: number): boolean =>
  indexableChildren < HUB_MIN_INDEXABLE_CHILDREN;
