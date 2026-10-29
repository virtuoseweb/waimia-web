/**
 * news.ts · actualités : billets `type: 'actualite'` de la collection blog.
 *
 * Une actualité est un billet daté À LA MINUTE (publishedAt et updatedAt portent l'heure et
 * le fuseau), qui répond à un événement précis. Elle garde son URL /blog/<slug> (une seule
 * URL par contenu) ; la section /actualites la liste, son flux et son sitemap news la
 * diffusent. Les autres billets restent des articles évergreen.
 */
import type { CollectionEntry } from 'astro:content';
import { isoWithOffset } from './seo/news-sitemap.mjs';

type BlogEntry = CollectionEntry<'blog'>;

export const NEWS_TIME_ZONE = 'Europe/Paris';
/** Titre court : Google tronque le headline d'un NewsArticle au-delà de 110 caractères. */
export const NEWS_HEADLINE_MAX = 110;
/** Largeur minimale d'une image d'actualité (recommandation Google). */
export const NEWS_IMAGE_MIN_WIDTH = 1200;

export const isNewsEntry = (entry: BlogEntry): boolean => entry.data.type === 'actualite' && entry.data.seo?.noindex !== true;

/** Actualités, de la plus récente à la plus ancienne. */
export function sortNews(entries: BlogEntry[]): BlogEntry[] {
  return entries
    .filter(isNewsEntry)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

/** Date de dernière modification réelle : updatedAt, jamais antérieure à la publication. */
export function newsModifiedAt(entry: BlogEntry): Date {
  const { publishedAt, updatedAt } = entry.data;
  return updatedAt && updatedAt.getTime() > publishedAt.getTime() ? updatedAt : publishedAt;
}

/** Pièces locales (fuseau de Paris) d'un instant : jour, heure, minute. */
function parisParts(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: NEWS_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  return parts as Record<string, string>;
}

/** ISO 8601 avec fuseau de Paris : `2026-10-24T15:42:00+02:00` (dates JSON-LD d'une actualité). */
export const parisIso = (date: Date): string => isoWithOffset(date, NEWS_TIME_ZONE);

/** « 24 octobre 2026 à 15 h 42 » (heure de Paris). */
export function formatNewsDateTime(date: Date, lang: 'fr' | 'en' = 'fr'): string {
  const day = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    timeZone: NEWS_TIME_ZONE,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  const p = parisParts(date);
  return lang === 'fr' ? `${day} à ${p.hour} h ${p.minute}` : `${day}, ${p.hour}:${p.minute} (Paris)`;
}

/** Jour et heure courts pour une carte : « 24.10 · 15 h 42 ». */
export function formatNewsShort(date: Date): string {
  const p = parisParts(date);
  return `${p.day}.${p.month} · ${p.hour} h ${p.minute}`;
}
