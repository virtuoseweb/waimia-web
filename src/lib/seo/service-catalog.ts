// Waimia · service-catalog.ts · catalogue des services pour le JSON-LD (`OfferCatalog`).
//
// Source unique = le menu Solutions (src/data/sitemap.ts → MM_SOLUTIONS_NEW) : les
// domaines de l'offre (une colonne de menu chacun) et leurs pages. Aucune liste recopiée ici : une page ajoutée au menu
// entre dans le catalogue, une page retirée en sort.

import { MM_SOLUTIONS_NEW } from '../../data/sitemap';
import type { CatalogService } from './schema-builder';

/** Pages hub : chacune regroupe les pages qui la suivent dans sa colonne de menu. */
export const SERVICE_HUB_PATHS = [
  '/services/systemes-operationnels-ia',
  '/services/systeme-commercial',
  '/services/systeme-acquisition',
] as const;

const isHub = (href: string) => (SERVICE_HUB_PATHS as readonly string[]).includes(href);

/** Les domaines de l'offre (colonnes du menu), avec leurs pages (ordre du menu). */
export function serviceDomains(): Array<{ name: string; services: CatalogService[] }> {
  return MM_SOLUTIONS_NEW.cols.map((col) => ({
    name: col.label.fr,
    services: col.items.map((item) => ({ name: item.label.fr, url: item.href })),
  }));
}

/**
 * Services enfants d'un hub : les pages qui le suivent dans sa colonne, jusqu'au hub
 * suivant. Tableau vide si `path` n'est pas un hub.
 */
export function hubChildren(path: string): CatalogService[] {
  if (!isHub(path)) return [];
  for (const col of MM_SOLUTIONS_NEW.cols) {
    const start = col.items.findIndex((item) => item.href === path);
    if (start === -1) continue;
    const children: CatalogService[] = [];
    for (const item of col.items.slice(start + 1)) {
      if (isHub(item.href)) break;
      children.push({ name: item.label.fr, url: item.href });
    }
    return children;
  }
  return [];
}
