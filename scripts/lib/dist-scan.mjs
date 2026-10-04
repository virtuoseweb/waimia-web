// scripts/lib/dist-scan.mjs · lecture commune du build (dist/client) pour les gates SEO.
// 0 dépendance npm. Chaque gate importe `scanDist()` au lieu de re-parser le HTML à sa façon.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { isInternalPath } from '../../src/lib/seo/internal-tools.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(__dirname, '..', '..');
export const DIST = join(ROOT, 'dist', 'client');
export const VERCEL_CONFIG = join(ROOT, '.vercel', 'output', 'config.json');
export const SITE_ORIGIN = 'https://waimia.com';

export function walk(dir, predicate) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

export function normalizePath(p) {
  if (!p) return '/';
  p = p.split('#')[0].split('?')[0];
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

/** Chemin de fichier dist → pathname d'URL (`blog/index.html` → `/blog`). */
export function fileToPathname(file) {
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'/index.html'.length);
  if (rel.endsWith('.html')) return '/' + rel.slice(0, -'.html'.length);
  return '/' + rel;
}

export function decodeEntities(s) {
  return String(s)
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function attr(tag, name) {
  const dq = new RegExp(`\\s${name}="([^"]*)"`, 'i').exec(tag);
  if (dq) return decodeEntities(dq[1]);
  const sq = new RegExp(`\\s${name}='([^']*)'`, 'i').exec(tag);
  if (sq) return decodeEntities(sq[1]);
  const bare = new RegExp(`\\s${name}=([^\\s>]+)`, 'i').exec(tag);
  return bare ? decodeEntities(bare[1]) : null;
}

function tags(html, name) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) || [];
}

function metaContent(html, key, value) {
  for (const t of tags(html, 'meta')) {
    if ((attr(t, key) || '').toLowerCase() === value) return attr(t, 'content');
  }
  return null;
}

export function textOf(fragment) {
  return decodeEntities(fragment.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** Analyse un fichier HTML bâti. */
export function parsePage(file) {
  const html = readFileSync(file, 'utf8');
  const pathname = normalizePath(fileToPathname(file));
  const headEnd = html.indexOf('</head>');
  const head = headEnd > -1 ? html.slice(0, headEnd) : html;
  const body = headEnd > -1 ? html.slice(headEnd) : html;

  const titleM = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(head);
  const robots = metaContent(head, 'name', 'robots') || '';
  let canonical = null;
  const alternates = [];
  for (const t of tags(head, 'link')) {
    const rel = (attr(t, 'rel') || '').toLowerCase();
    if (rel === 'canonical') canonical = attr(t, 'href');
    if (rel === 'alternate' && attr(t, 'hreflang')) alternates.push({ hreflang: attr(t, 'hreflang'), href: attr(t, 'href') });
  }
  // Page de redirection statique (meta refresh) émise par Astro pour `redirects`.
  const refresh = /<meta[^>]+http-equiv=["']?refresh/i.test(head);

  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => textOf(m[1]));

  const jsonLd = [];
  for (const m of html.matchAll(/<script[^>]*type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      jsonLd.push({ ok: true, data: JSON.parse(m[1]) });
    } catch (e) {
      jsonLd.push({ ok: false, error: e.message, raw: m[1].slice(0, 120) });
    }
  }

  // Liens internes, avec la zone d'origine (chrome global vs contenu de page).
  const mainStart = body.search(/<main\b/i);
  const mainEnd = body.lastIndexOf('</main>');
  const links = [];
  for (const m of body.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(m[0], 'href');
    if (!href) continue;
    let p = null;
    if (href.startsWith('/') && !href.startsWith('//')) p = href;
    else if (href.startsWith(SITE_ORIGIN)) p = href.slice(SITE_ORIGIN.length) || '/';
    if (p === null) continue;
    const inMain = mainStart > -1 && m.index > mainStart && m.index < mainEnd;
    links.push({ href: normalizePath(p), inMain, nofollow: /nofollow/i.test(attr(m[0], 'rel') || '') });
  }

  return {
    file,
    rel: relative(DIST, file).split(sep).join('/'),
    pathname,
    html,
    title: titleM ? decodeEntities(titleM[1]).trim() : null,
    description: metaContent(head, 'name', 'description'),
    robots,
    noindex: /noindex/i.test(robots),
    canonical,
    alternates,
    refresh,
    h1s,
    jsonLd,
    links,
    og: {
      title: metaContent(head, 'property', 'og:title'),
      description: metaContent(head, 'property', 'og:description'),
      image: metaContent(head, 'property', 'og:image'),
      url: metaContent(head, 'property', 'og:url'),
      type: metaContent(head, 'property', 'og:type'),
    },
    twitter: {
      card: metaContent(head, 'name', 'twitter:card'),
      site: metaContent(head, 'name', 'twitter:site'),
      image: metaContent(head, 'name', 'twitter:image'),
    },
    internal: isInternalPath(pathname),
  };
}

/** URL du sitemap : [{ loc, pathname, lastmod }]. */
export function readSitemap() {
  const out = [];
  for (const f of walk(DIST, (x) => /sitemap-\d+\.xml$/.test(x))) {
    const xml = readFileSync(f, 'utf8');
    for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = /<loc>([^<]*)<\/loc>/.exec(m[1]);
      const lastmod = /<lastmod>([^<]*)<\/lastmod>/.exec(m[1]);
      if (!loc) continue;
      const u = decodeEntities(loc[1]);
      let pathname = '/';
      try {
        pathname = normalizePath(new URL(u).pathname);
      } catch {
        /* loc invalide : signalé par le gate */
      }
      out.push({ loc: u, pathname, lastmod: lastmod ? lastmod[1] : null });
    }
  }
  return out;
}

/** Groupes de robots.txt : [{ agents, allow, disallow }]. */
export function readRobots() {
  const file = join(DIST, 'robots.txt');
  if (!existsSync(file)) return { raw: '', groups: [], sitemaps: [] };
  const raw = readFileSync(file, 'utf8');
  const groups = [];
  const sitemaps = [];
  let current = null;
  let lastWasAgent = false;
  for (const line of raw.split(/\r?\n/)) {
    const m = /^\s*([A-Za-z-]+)\s*:\s*(.*?)\s*$/.exec(line);
    if (!m) continue;
    const key = m[1].toLowerCase();
    if (key === 'sitemap') {
      sitemaps.push(m[2]);
      continue;
    }
    if (key === 'user-agent') {
      if (!lastWasAgent) {
        current = { agents: [], allow: [], disallow: [] };
        groups.push(current);
      }
      current.agents.push(m[2]);
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue;
    if (key === 'disallow' && m[2]) current.disallow.push(m[2]);
    if (key === 'allow' && m[2]) current.allow.push(m[2]);
  }
  return { raw, groups, sitemaps };
}

function ruleToRegex(rule) {
  const anchored = rule.endsWith('$');
  const body = (anchored ? rule.slice(0, -1) : rule).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${body}${anchored ? '$' : ''}`);
}

/**
 * Vrai si `pathname` est interdit pour l'agent donné. Un agent nommé n'hérite PAS du
 * groupe `*` (RFC 9309) ; la règle la plus longue gagne, Allow l'emporte à égalité.
 */
export function isDisallowed(robots, pathname, agent = '*') {
  const group =
    robots.groups.find((g) => g.agents.some((a) => a.toLowerCase() === agent.toLowerCase())) ||
    robots.groups.find((g) => g.agents.includes('*'));
  if (!group) return false;
  let best = { len: -1, allow: true };
  for (const [list, allow] of [
    [group.allow, true],
    [group.disallow, false],
  ]) {
    for (const rule of list) {
      if (ruleToRegex(rule).test(pathname) && (rule.length > best.len || (rule.length === best.len && allow))) {
        best = { len: rule.length, allow };
      }
    }
  }
  return !best.allow;
}

/** Redirections de la config Vercel générée : [{ src, re, location, status }] (null si absente). */
export function readVercelRedirects() {
  if (!existsSync(VERCEL_CONFIG)) return null;
  const cfg = JSON.parse(readFileSync(VERCEL_CONFIG, 'utf8'));
  return (cfg.routes || [])
    .filter((r) => r.status >= 300 && r.status < 400 && r.headers && (r.headers.Location || r.headers.location))
    .map((r) => ({
      src: r.src,
      re: new RegExp(r.src),
      location: r.headers.Location || r.headers.location,
      status: r.status,
      has: r.has,
    }));
}

/** Scanne tout dist/client. */
export function scanDist() {
  if (!existsSync(DIST)) {
    console.error("✗ dist/client introuvable : lance d'abord `pnpm build`.");
    process.exit(2);
  }
  const pages = walk(DIST, (f) => f.endsWith('.html')).map(parsePage);
  const byPath = new Map(pages.map((p) => [p.pathname, p]));
  return { pages, byPath };
}

/** Page publique indexable : hors surfaces internes, sans noindex, pas une page de redirection. */
export function isIndexable(page) {
  return !page.internal && !page.noindex && !page.refresh && page.pathname !== '/404';
}

/** Titre sans le suffixe de marque (« Titre · Waimia », « Titre | Waimia »). */
export function titleWithoutBrand(title) {
  return String(title || '')
    .replace(/\s*[·|–-]\s*Waimia\b.*$/i, '')
    .trim();
}
