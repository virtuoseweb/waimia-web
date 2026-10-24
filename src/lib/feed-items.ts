/**
 * feed-items.ts · éléments de flux RSS avec le TEXTE COMPLET des billets.
 *
 * Le flux ne portait que le titre et la description : un lecteur de flux, un agrégateur ou un
 * moteur qui s'abonne n'avait rien à lire sans cliquer. Chaque item porte désormais le corps
 * du billet (`content:encoded`), les liens relatifs rendus absolus, l'auteur (`dc:creator`)
 * et les thèmes. La date de publication d'une actualité garde son heure exacte.
 */
import { getEntry, type CollectionEntry } from 'astro:content';
import { blogEntryHref } from './blog-routing';

type BlogEntry = CollectionEntry<'blog'>;

export const FEED_XMLNS = { dc: 'http://purl.org/dc/elements/1.1/' };

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** `href="/x"` et `src="/x"` deviennent absolus : un flux est lu hors du site. */
export function absolutizeHtml(html: string, origin: string): string {
  return html.replace(/\b(href|src)="\/(?!\/)/g, `$1="${origin}/`);
}

/** Corps complet d'un billet : la prose FR de ses sections `editorial-prose`. */
export function entryFullHtml(entry: BlogEntry, origin: string): string {
  const sections = (entry.data.body_sections ?? []) as Array<{ type?: string; html_fr?: string }>;
  const html = sections
    .filter((s) => s.type === 'editorial-prose' && typeof s.html_fr === 'string')
    .map((s) => s.html_fr)
    .join('\n');
  return absolutizeHtml(html, origin);
}

/** Auteur d'affichage : titre de la fiche `authors` quand elle est connue, sinon le slug. */
export function feedItem(entry: BlogEntry, origin: string, authorName: string) {
  const d = entry.data;
  return {
    title: d.title_fr,
    pubDate: d.publishedAt,
    description: d.description_fr,
    link: blogEntryHref(entry),
    content: entryFullHtml(entry, origin),
    categories: d.tags ?? [],
    customData: `<dc:creator>${escapeXml(authorName)}</dc:creator>`,
  };
}

/** Items de flux pour une liste de billets (un seul accès par auteur). */
export async function buildFeedItems(entries: BlogEntry[], origin: string) {
  const names = new Map<string, string>();
  const items = [];
  for (const entry of entries) {
    const id = (entry.data.author as { id?: string }).id ?? '';
    if (!names.has(id)) names.set(id, (id ? (await getEntry('authors', id))?.data.title_fr : undefined) ?? 'Waimia');
    items.push(feedItem(entry, origin, names.get(id)!));
  }
  return items;
}
