/**
 * blog-routing.ts · Routage canonique post-fusion fieldNotes + veilleIA → blog (R1, docs/audit-refonte/collections.md §F1).
 *
 * Les entrées blog `type: 'field-note'` et `type: 'veille-ia'` sont servies par les
 * routes héritées /ressources/field-notes/[slug] et /ressources/veille-ia/[...slug]
 * (URLs préservées, 0 redirection). La route /blog/[...slug] les EXCLUT
 * de son getStaticPaths : chaque contenu n'existe qu'à UNE URL (anti duplicate content).
 * Toute surface qui liste la collection blog doit construire ses hrefs via blogEntryHref().
 */
import type { CollectionEntry } from 'astro:content';

type BlogEntry = CollectionEntry<'blog'>;

/** Types blog servis par les routes héritées (hors /blog/[slug]). */
export function isLegacyRoutedType(entry: BlogEntry): boolean {
  return entry.data.type === 'field-note' || entry.data.type === 'veille-ia';
}

/** URL canonique d'une entrée blog selon son type. */
export function blogEntryHref(entry: BlogEntry): string {
  if (entry.data.type === 'field-note') return `/ressources/field-notes/${entry.id}`;
  if (entry.data.type === 'veille-ia') return `/ressources/veille-ia/${entry.id}`;
  return `/blog/${entry.id}`;
}

/** Label de type court pour les listings agrégateurs (silo/tag/categorie). */
export function blogEntryListType(entry: BlogEntry): string {
  if (entry.data.type === 'veille-ia') return 'veille';
  if (entry.data.type === 'field-note') return 'note';
  return 'blog';
}

/**
 * Labels d'affichage hérités de l'ancienne collection fieldNotes (tag_fr/tag_en),
 * désormais dérivés du champ blog `editorialType` (mapping documenté : NOTE↔Field Note,
 * ESSAI↔Essay, CAS↔Case, RECETTE↔Cookbook).
 */
const FIELD_NOTE_TAG_LABELS: Record<string, { fr: string; en: string }> = {
  'Field Note': { fr: 'NOTE', en: 'FIELD NOTE' },
  Essay: { fr: 'ESSAI', en: 'ESSAY' },
  Case: { fr: 'CAS', en: 'CASE' },
  Cookbook: { fr: 'RECETTE', en: 'COOKBOOK' },
};

export function fieldNoteTagLabel(editorialType: string | undefined, lang: 'fr' | 'en'): string {
  return (
    FIELD_NOTE_TAG_LABELS[editorialType ?? 'Field Note']?.[lang] ??
    (lang === 'fr' ? 'NOTE' : 'FIELD NOTE')
  );
}
