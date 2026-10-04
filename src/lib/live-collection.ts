/**
 * live-collection.ts · lecture d'une collection SANS ses entrées redirigées.
 *
 * Une page retirée par 301 (src/data/depublished.ts → REDIRECTED_PATHS) garde son fichier
 * de contenu, mais ne doit plus être ni générée ni listée. Toute route ou tout listing qui
 * lit une collection concernée passe par cette fonction plutôt que par `getCollection` :
 * ajouter une redirection dans REDIRECTED_PATHS suffit alors à retirer la page partout.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { isRedirectedPath } from '../data/depublished';
import { COLLECTION_ROUTE_PREFIX } from './seo/lastmod.mjs';

type RoutedCollection = 'blog' | 'secteurs' | 'cas-usages' | 'demonstrations' | 'diagnostics' | 'comparatifs';

export async function getLiveCollection<C extends RoutedCollection>(name: C): Promise<CollectionEntry<C>[]> {
  const prefix = (COLLECTION_ROUTE_PREFIX as Record<string, string>)[name];
  const entries = (await getCollection(name)) as CollectionEntry<C>[];
  return entries.filter((e) => {
    const slug = (e.data as { slug?: string }).slug ?? e.id;
    return !isRedirectedPath(`${prefix}/${slug}`);
  });
}
