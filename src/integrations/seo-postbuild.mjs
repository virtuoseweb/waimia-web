/**
 * Astro integration : mise en cohérence du JSON-LD après build.
 *
 * Base.astro normalise les blocs que les pages lui passent en props. Mais plusieurs blocs
 * sont émis dans le CORPS par des composants (<Breadcrumb>, <MastheadRow>, sections FAQ,
 * templates), hors de sa vue. Cette passe relit le HTML bâti de chaque page publique et :
 *   1. applique la même normalisation (schema-normalize.mjs) à TOUS les blocs de la page :
 *      auteur Person relié, éditeur, date de mise à jour réelle, provider relié… ;
 *   2. répare le fil d'Ariane : un niveau intermédiaire sans URL reçoit celle de la page
 *      parente qui existe dans le build, sinon il est retiré ; le dernier niveau reçoit l'URL
 *      canonique de la page (aucun ListItem sans `item`) ; un fil d'Ariane réduit à un seul
 *      niveau (accueil) est supprimé ;
 *   3. ajoute un fil d'Ariane aux pages qui n'en émettent aucun, construit depuis l'URL :
 *      Accueil > [chaque parent présent dans le build] > page courante, libellé = H1.
 * Les surfaces internes (catalogue, atelier) ne sont pas traitées.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isInternalPath } from '../lib/seo/internal-tools.mjs';
import { lastmodFor } from '../lib/seo/lastmod.mjs';
import { normalizeNode, repairBreadcrumb, typesOf } from '../lib/seo/schema-normalize.mjs';

const LD_SCRIPT = /<script\b([^>]*type=["']?application\/ld\+json["']?[^>]*)>([\s\S]*?)<\/script>/gi;

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

function h1Of(html) {
  const m = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  if (!m) return null;
  return decode(m[1].replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim() || null;
}

function metaOf(html, re) {
  const m = re.exec(html);
  return m ? decode(m[1]) : null;
}

// `<` échappé : un `</script>` dans une chaîne ne doit pas fermer la balise.
const serialize = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

/**
 * @param {{ siteUrl: string, site: import('../lib/seo/schema-normalize.mjs').SiteIdentity, root?: string }} options
 */
export default function seoPostbuild({ siteUrl, site, root = process.cwd() }) {
  return {
    name: 'seo-postbuild',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }) => {
        const distDir = fileURLToPath(dir);
        const fileFor = (pathname) => path.join(distDir, pathname.replace(/^\/+/, ''), 'index.html');
        const cache = new Map();
        const read = async (pathname) => {
          if (!cache.has(pathname)) cache.set(pathname, await fs.readFile(fileFor(pathname), 'utf8').catch(() => null));
          return cache.get(pathname);
        };
        const exists = async (pathname) => (await read(pathname)) !== null;

        const stats = { pages: 0, normalized: 0, repaired: 0, removed: 0, added: 0 };

        for (const page of pages) {
          const pathname = '/' + page.pathname.replace(/^\/+|\/+$/g, '');
          if (pathname === '/404' || isInternalPath(pathname)) continue;
          const html = await read(pathname);
          if (!html || /<meta[^>]+http-equiv=["']?refresh/i.test(html)) continue;
          stats.pages++;

          const segments = pathname.split('/').filter(Boolean);
          const canonicalUrl =
            metaOf(html, /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ??
            `${siteUrl}${pathname === '/' ? '/' : pathname}`;
          const ctx = {
            canonicalUrl,
            ogImage: metaOf(html, /<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ?? undefined,
            lastmod: lastmodFor(pathname, root),
            lang: 'fr',
          };

          // URL des pages parentes réellement présentes dans le build, par profondeur.
          const ancestorUrl = [`${siteUrl}/`];
          for (let i = 1; i < segments.length; i++) {
            const p = '/' + segments.slice(0, i).join('/');
            ancestorUrl[i] = (await exists(p)) ? `${siteUrl}${p}` : null;
          }

          let hasBreadcrumb = false;
          let next = html.replace(LD_SCRIPT, (full, attrs, body) => {
            let data;
            try {
              data = JSON.parse(body);
            } catch {
              return full; // JSON invalide : laissé tel quel, le gate check-jsonld le signale
            }
            const list = Array.isArray(data) ? data : [data];
            const out = [];
            for (const block of list) {
              if (!block || typeof block !== 'object') continue;
              if (typesOf(block).includes('BreadcrumbList')) {
                const repaired = pathname === '/' ? null : repairBreadcrumb(block, (_name, i) => ancestorUrl[i] ?? null, canonicalUrl);
                if (!repaired) {
                  stats.removed++;
                  continue;
                }
                if (JSON.stringify(repaired) !== JSON.stringify(block)) stats.repaired++;
                hasBreadcrumb = true;
                out.push(repaired);
                continue;
              }
              const normalized = normalizeNode(block, ctx, site);
              if (JSON.stringify(normalized) !== JSON.stringify(block)) stats.normalized++;
              out.push(normalized);
            }
            if (out.length === 0) return '';
            return `<script${attrs}>${serialize(Array.isArray(data) ? out : out[0])}</script>`;
          });

          const noindex = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
          if (!hasBreadcrumb && pathname !== '/' && !noindex) {
            const items = [{ name: 'Accueil', url: `${siteUrl}/` }];
            for (let i = 1; i <= segments.length; i++) {
              const p = '/' + segments.slice(0, i).join('/');
              const parentHtml = await read(p);
              const name = parentHtml ? h1Of(parentHtml) : null;
              if (name) items.push({ name, url: `${siteUrl}${p}` }); // niveau sans page : pas d'URL fabriquée
            }
            if (items.length >= 2) {
              const ld = {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: items.map((it, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: it.name,
                  // Chaque niveau porte son URL ; le dernier = URL canonique de la page.
                  item: i === items.length - 1 ? canonicalUrl : it.url,
                })),
              };
              next = next.replace('</head>', `<script type="application/ld+json">${serialize(ld)}</script></head>`);
              stats.added++;
            }
          }

          if (next !== html) await fs.writeFile(fileFor(pathname), next, 'utf8');
        }

        logger.info(
          `${stats.pages} pages : ${stats.normalized} blocs normalisés, fil d'Ariane ${stats.repaired} réparés / ${stats.added} ajoutés / ${stats.removed} retirés`,
        );
      },
    },
  };
}
