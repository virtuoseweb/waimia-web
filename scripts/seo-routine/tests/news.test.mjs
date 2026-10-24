import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareTypes, totalsOf, NEWS_SEARCH_TYPES } from '../gsc-news.mjs';
import { buildNewsSitemapXml, selectNewsItems, isoWithOffset } from '../../../src/lib/seo/news-sitemap.mjs';

const period = (clicks, impressions, pages = []) => ({ totals: { clicks, impressions, ctr: 0, position: 0 }, byPage: pages });

test('gsc-news : trois surfaces suivies, dont Discover et Google Actualités', () => {
  assert.deepEqual(NEWS_SEARCH_TYPES, ['discover', 'googleNews', 'news']);
});

test('gsc-news : la réponse vide de Google devient des zéros, pas une erreur', () => {
  assert.deepEqual(totalsOf([]), { clicks: 0, impressions: 0, ctr: 0, position: 0 });
});

test('gsc-news : variation, pages triées, absence de donnée signalée', () => {
  const out = compareTypes({
    discover: { last28: period(5, 100, [{ page: 'a', clicks: 1, impressions: 10 }, { page: 'b', clicks: 4, impressions: 90 }]), previous28: period(2, 40) },
    googleNews: { last28: period(0, 0), previous28: period(0, 0) },
  });
  assert.equal(out.discover.clicks.delta, 3);
  assert.equal(out.discover.impressions.delta, 60);
  assert.equal(out.discover.topPages[0].page, 'b');
  assert.equal(out.discover.hasData, true);
  assert.equal(out.googleNews.hasData, false);
});

test('sitemap news : seules les 48 dernières heures, du plus récent au plus ancien', () => {
  const now = new Date('2026-10-26T12:00:00Z');
  const items = [
    { loc: 'https://waimia.com/blog/a', title: 'A', publishedAt: new Date('2026-10-26T09:00:00Z') },
    { loc: 'https://waimia.com/blog/old', title: 'Vieux', publishedAt: new Date('2026-10-24T11:59:00Z') },
    { loc: 'https://waimia.com/blog/b', title: 'B', publishedAt: new Date('2026-10-25T15:00:00Z') },
    { loc: 'https://waimia.com/blog/futur', title: 'Futur', publishedAt: new Date('2026-10-26T12:00:01Z') },
  ];
  assert.deepEqual(selectNewsItems(items, now).map((i) => i.loc), ['https://waimia.com/blog/a', 'https://waimia.com/blog/b']);
});

test('sitemap news : structure Google, date avec fuseau de Paris, XML échappé', () => {
  const now = new Date('2026-10-24T14:00:00Z');
  const xml = buildNewsSitemapXml([{ loc: 'https://waimia.com/blog/x?a=1&b=2', title: 'Duet & « dots » <test>', publishedAt: new Date('2026-10-24T13:36:10Z') }], { now });
  assert.match(xml, /xmlns:news="http:\/\/www\.google\.com\/schemas\/sitemap-news\/0\.9"/);
  assert.match(xml, /<news:publication_date>2026-10-24T15:36:10\+02:00<\/news:publication_date>/);
  assert.match(xml, /<loc>https:\/\/waimia\.com\/blog\/x\?a=1&amp;b=2<\/loc>/);
  assert.match(xml, /<news:title>Duet &amp; « dots » &lt;test&gt;<\/news:title>/);
  assert.match(xml, /<news:name>Waimia<\/news:name>\s*<news:language>fr<\/news:language>/);
});

test('sitemap news : aucune actualité récente donne un urlset vide valide', () => {
  const xml = buildNewsSitemapXml([], { now: new Date('2026-10-24T14:00:00Z') });
  assert.match(xml, /<urlset [^>]*>\n<\/urlset>/);
});

test('fuseau de Paris : heure d\'hiver (+01:00) et d\'été (+02:00)', () => {
  assert.equal(isoWithOffset(new Date('2026-12-10T10:00:00Z')), '2026-12-10T11:00:00+01:00');
  assert.equal(isoWithOffset(new Date('2026-07-10T10:00:00Z')), '2026-07-10T12:00:00+02:00');
});
