/**
 * Lecture légère de XML (flux RSS 2.0, RSS 1.0/RDF, Atom, sitemaps) sans dépendance.
 * Ce n'est pas un parseur XML général : il extrait les balises utiles par expressions
 * régulières, ce qui suffit pour des flux et des sitemaps et tolère le XML mal formé.
 */

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', laquo: '«', raquo: '»', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', ndash: '-', mdash: '-', eacute: 'é', egrave: 'è', ecirc: 'ê', agrave: 'à', acirc: 'â', ccedil: 'ç', ocirc: 'ô', ugrave: 'ù', ucirc: 'û', icirc: 'î', iuml: 'ï', euro: '€' };

export function decodeEntities(s) {
  return String(s ?? '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, code) => {
    if (code[0] === '#') {
      const n = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) && n > 0 && n < 0x10ffff ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

/** Retire CDATA, balises HTML et entités (deux passes : le HTML des flux est souvent échappé). */
export function cleanText(raw) {
  let s = String(raw ?? '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
  s = decodeEntities(s);
  s = s.replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]+>/g, ' ');
  s = decodeEntities(s);
  return s.replace(/\s+/g, ' ').trim();
}

export function truncate(s, max = 280) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trimEnd()}…`;
}

function tag(block, names) {
  for (const name of names) {
    const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i');
    const m = block.match(re);
    if (m && m[1].trim()) return m[1];
  }
  return '';
}

function atomLink(block) {
  const links = [...block.matchAll(/<link\b([^>]*)\/?>/gi)].map((m) => m[1]);
  const pick = links.find((a) => /rel=["']alternate["']/i.test(a)) ?? links.find((a) => !/rel=/i.test(a)) ?? links[0];
  const href = pick?.match(/href=["']([^"']+)["']/i);
  return href ? decodeEntities(href[1]) : '';
}

const MONTHS_FR = { janvier: 0, fevrier: 1, mars: 2, avril: 3, mai: 4, juin: 5, juillet: 6, aout: 7, septembre: 8, octobre: 9, novembre: 10, decembre: 11 };

/**
 * Date d'un flux vers Date (ou null). Gère RFC 822, ISO 8601, « AAAA-MM-JJ HH:MM:SS »,
 * « JJ/MM/AAAA - HH:MM » (France Num) et « 3 octobre 2026 ».
 */
export function parseDate(raw) {
  const s = cleanText(raw);
  if (!s) return null;
  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:\s*-?\s*(\d{1,2}):(\d{2}))?/);
  if (m) return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1], +(m[4] ?? 0), +(m[5] ?? 0)));
  m = s.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] ?? 0)));
  m = s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().match(/^(?:[a-z]+\.? )?(\d{1,2})(?:er)? ([a-z]+) (\d{4})/);
  if (m && MONTHS_FR[m[2]] !== undefined) return new Date(Date.UTC(+m[3], MONTHS_FR[m[2]], +m[1]));
  const t = Date.parse(s);
  return Number.isNaN(t) ? null : new Date(t);
}

/**
 * Lit un flux RSS 2.0, RSS 1.0 (RDF) ou Atom.
 * @returns {{ format: 'rss'|'atom'|'rdf', title: string, entries: Array<{title:string, link:string, date:Date|null, summary:string}> }}
 */
export function parseFeed(xml) {
  const head = String(xml ?? '').slice(0, 3000);
  const isAtom = /<feed[\s>]/i.test(head) && !/<rss[\s>]/i.test(head);
  const isRdf = /<rdf:RDF[\s>]/i.test(head);
  if (!isAtom && !isRdf && !/<rss[\s>]/i.test(head)) {
    throw new Error('ce document n\'est pas un flux RSS ou Atom');
  }
  const blockRe = isAtom ? /<entry[\s>][\s\S]*?<\/entry>/gi : /<item[\s>][\s\S]*?<\/item>/gi;
  const firstBlock = xml.search(blockRe);
  const channelHead = firstBlock > 0 ? xml.slice(0, firstBlock) : head;
  const entries = [];
  for (const [block] of xml.matchAll(blockRe)) {
    const title = cleanText(tag(block, ['title']));
    let link = isAtom ? atomLink(block) : cleanText(tag(block, ['link']));
    if (!link && !isAtom) link = atomLink(block) || cleanText(tag(block, ['guid']));
    if (!link && isAtom) link = cleanText(tag(block, ['id']));
    const date = parseDate(tag(block, isAtom ? ['published', 'updated'] : ['pubDate', 'dc:date', 'date', 'updated', 'published']));
    const summary = truncate(cleanText(tag(block, isAtom ? ['summary', 'content'] : ['description', 'content:encoded', 'summary'])));
    if (title || link) entries.push({ title, link: link.trim(), date, summary });
  }
  return { format: isAtom ? 'atom' : isRdf ? 'rdf' : 'rss', title: cleanText(tag(channelHead, ['title'])), entries };
}

/**
 * Lit un sitemap ou un index de sitemaps.
 * @returns {{ sitemaps: string[], urls: Array<{loc:string, lastmod:string|null}> }}
 */
export function parseSitemap(xml) {
  const text = String(xml ?? '');
  if (!/<(urlset|sitemapindex)[\s>]/i.test(text.slice(0, 3000))) throw new Error('ce document n\'est pas un sitemap XML');
  const sitemaps = [];
  for (const [block] of text.matchAll(/<sitemap[\s>][\s\S]*?<\/sitemap>/gi)) {
    const loc = cleanText(tag(block, ['loc']));
    if (loc) sitemaps.push(loc);
  }
  const urls = [];
  for (const [block] of text.matchAll(/<url[\s>][\s\S]*?<\/url>/gi)) {
    const loc = cleanText(tag(block, ['loc']));
    if (loc) urls.push({ loc, lastmod: cleanText(tag(block, ['lastmod'])) || null });
  }
  return { sitemaps, urls };
}
