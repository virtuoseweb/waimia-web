import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseFeed, parseSitemap, parseDate, cleanText, truncate } from '../lib/xml.mjs';
import { selectEntries } from '../feeds.mjs';
import { fetchSitemapUrls } from '../lib/sitemap.mjs';
import { normalizeUrl } from '../lib/util.mjs';

const fx = (name) => readFileSync(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');

test('RSS 2.0 : titres, liens, CDATA, HTML échappé et entités', () => {
  const feed = parseFeed(fx('rss.xml'));
  assert.equal(feed.format, 'rss');
  assert.equal(feed.title, "Blog d'exemple");
  assert.equal(feed.entries.length, 5);
  const [first] = feed.entries;
  assert.equal(first.title, 'Agents IA : ce qui change pour les PME & ETI');
  assert.equal(first.link, 'https://exemple.test/agents-ia?utm_source=rss&utm_medium=feed');
  assert.equal(first.summary, 'Un résumé avec du HTML échappé et une apostrophe’s.');
  assert.equal(first.date.toISOString(), '2026-10-02T06:00:00.000Z');
});

test('RSS : formats de date non standards et lien de repli sur guid', () => {
  const { entries } = parseFeed(fx('rss.xml'));
  assert.equal(entries[2].date.toISOString(), '2026-09-28T11:01:00.000Z');
  assert.equal(entries[3].date.toISOString(), '2026-10-02T09:48:00.000Z');
  assert.equal(entries[3].link, 'https://exemple.test/economie');
  assert.equal(entries[4].date, null);
});

test('Atom : lien alternate préféré au lien self, date published', () => {
  const feed = parseFeed(fx('atom.xml'));
  assert.equal(feed.format, 'atom');
  assert.equal(feed.entries.length, 2);
  assert.equal(feed.entries[0].link, 'https://atom.test/2026/oct/3/modele/');
  assert.equal(feed.entries[0].date.toISOString(), '2026-10-03T09:30:00.000Z');
  assert.equal(feed.entries[0].summary, 'Premier paragraphe.');
  assert.equal(feed.entries[1].link, 'https://autre.test/reprise');
});

test('RSS 1.0 (RDF) : dc:date', () => {
  const feed = parseFeed(fx('rdf.xml'));
  assert.equal(feed.format, 'rdf');
  assert.equal(feed.entries.length, 1);
  assert.equal(feed.entries[0].title, "Déploiement d'agents chez un industriel");
  assert.ok(feed.entries[0].date instanceof Date);
});

test('une page HTML n\'est pas un flux', () => {
  assert.throws(() => parseFeed('<!doctype html><html><head><title>404</title></head></html>'), /pas un flux/);
});

test('parseDate : formats pris en charge et valeurs illisibles', () => {
  assert.equal(parseDate('3 octobre 2026').toISOString(), '2026-10-03T00:00:00.000Z');
  assert.equal(parseDate('2026-10-02T16:12:24Z').toISOString(), '2026-10-02T16:12:24.000Z');
  assert.equal(parseDate('bientôt'), null);
  assert.equal(parseDate(''), null);
});

test('cleanText et truncate', () => {
  assert.equal(cleanText('<p>Bonjour&nbsp;&amp; <b>bienvenue</b></p>'), 'Bonjour & bienvenue');
  const long = 'mot '.repeat(200);
  assert.ok(truncate(long, 100).length <= 101);
  assert.ok(truncate(long, 100).endsWith('…'));
});

test('selectEntries : fenêtre de 8 jours, déduplication par lien et par titre, plafond, filtre include', () => {
  const now = new Date('2026-10-05T04:30:00Z');
  const rss = parseFeed(fx('rss.xml')).entries;
  const atom = parseFeed(fx('atom.xml')).entries;
  const { entries, stats } = selectEntries(
    [
      { feed: { id: 'a', name: 'A', theme: 'editeurs' }, entries: rss },
      { feed: { id: 'b', name: 'B', theme: 'seo-geo' }, entries: atom },
    ],
    { now },
  );
  const titles = entries.map((e) => e.title);
  assert.ok(!titles.includes('Article ancien'), 'hors fenêtre exclu');
  assert.ok(!titles.includes('Sans date'), 'entrée sans date exclue');
  assert.equal(titles.filter((t) => t.startsWith('Agents IA')).length, 1, 'même titre dans deux flux gardé une fois');
  assert.equal(stats.a.kept, 3);
  assert.equal(stats.b.kept, 1);
  assert.deepEqual(entries.map((e) => e.date), [...entries.map((e) => e.date)].sort().reverse(), 'tri du plus récent au plus ancien');
  assert.equal(entries[0].source, 'B');
  assert.equal(entries[0].theme, 'seo-geo');

  const capped = selectEntries([{ feed: { id: 'a', name: 'A', theme: 'editeurs', maxItems: 1 }, entries: rss }], { now });
  assert.equal(capped.entries.length, 1);

  const filtered = selectEntries([{ feed: { id: 'a', name: 'A', theme: 'editeurs', include: ['agents'] }, entries: rss }], { now });
  assert.deepEqual(filtered.entries.map((e) => e.title), ['Agents IA : ce qui change pour les PME & ETI']);
});

test('normalizeUrl : paramètres de suivi et slash final', () => {
  assert.equal(normalizeUrl('https://exemple.test/a/?utm_source=rss&id=3#top'), 'https://exemple.test/a/?id=3');
  assert.equal(normalizeUrl('https://exemple.test/a/'), 'https://exemple.test/a');
  assert.equal(normalizeUrl('https://exemple.test/'), 'https://exemple.test');
});

test('sitemap : index suivi jusqu\'aux URL, lastmod facultatif', async () => {
  assert.deepEqual(parseSitemap(fx('sitemap-index.xml')).sitemaps, ['https://site.test/sitemap-0.xml']);
  const fetcher = async (url) => fx(url.endsWith('sitemap-0.xml') ? 'sitemap-0.xml' : 'sitemap-index.xml');
  const { urls, sitemaps } = await fetchSitemapUrls('https://site.test/sitemap-index.xml', { fetcher });
  assert.equal(sitemaps.length, 2);
  assert.deepEqual(urls.map((u) => u.loc), ['https://site.test', 'https://site.test/services/agents-ia', 'https://site.test/contact']);
  assert.equal(urls[2].lastmod, null);
  assert.throws(() => parseSitemap('<html></html>'), /pas un sitemap/);
});
