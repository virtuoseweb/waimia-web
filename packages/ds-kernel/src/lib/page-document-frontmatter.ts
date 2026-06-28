// Waimia · page-document-frontmatter.ts : sérialisation PURE PageDocument -> frontmatter (#39).
//
// Module SANS aucune dépendance runtime vers `astro:content` (module virtuel serveur-only).
// Il n'importe que des TYPES (effacés au build) et ne manipule que l'objet `doc` à plat.
// C'est ce qui le rend importable par les ILES CLIENT (ex. BuilderCanvas.tsx, île React
// `client:load`) sans entraîner `astro:content` dans le bundle navigateur (le chemin
// `lib/page-document.ts` -> `schemas/page-document.ts` -> `astro:content` cassait le build client).
//
// Source de vérité UNIQUE de `META_FLAT_KEYS` et `pageDocToFrontmatter` : `lib/page-document.ts`
// les ré-exporte pour les consommateurs serveur (rule 59, pas de duplication).

import type { PageDocument } from '../schemas/page-document';

/** Champs de `meta` à plat dans le frontmatter (le reste non-`sections` → collectionExtra). */
export const META_FLAT_KEYS = [
  'slug',
  'lang',
  'title_fr',
  'title_en',
  'description_fr',
  'description_en',
  'seo',
] as const;

/**
 * Inverse de `frontmatterToPageDoc` : reconstruit l'objet frontmatter qu'attend la collection
 * (meta à plat + collectionExtra étalé + `sections:`). `collection` n'est PAS réémis (c'est le
 * nom de la collection cible, pas un champ de l'entrée).
 */
export function pageDocToFrontmatter(doc: PageDocument): Record<string, unknown> {
  const { meta, sections } = doc;
  const { collection: _collection, collectionExtra, ...metaFlat } = meta;

  const out: Record<string, unknown> = { ...collectionExtra };
  for (const key of META_FLAT_KEYS) {
    const value = (metaFlat as Record<string, unknown>)[key];
    if (value !== undefined) out[key] = value;
  }
  out.sections = sections;
  return out;
}
