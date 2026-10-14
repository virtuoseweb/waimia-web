/**
 * Astro integration : hygiène du sitemap, après @astrojs/sitemap.
 *
 * Relit le HTML réellement bâti et retire du sitemap toute URL qui n'a rien à y faire :
 *   · page absente du build (l'URL ne répondrait pas 200) ;
 *   · page noindex ;
 *   · page de redirection (meta refresh émise par Astro pour `redirects`) ;
 *   · page dont le canonical pointe une autre URL.
 *
 * Pourquoi ici plutôt que dans le `filter` du sitemap : le filtre ne voit que l'URL, pas
 * la page. La liste manuelle `NOINDEX_SITEMAP_PATHS` devait donc être tenue à jour à la
 * main, et chaque oubli créait une incohérence noindex/sitemap. Avec cette passe, le HTML
 * est la source de vérité : passer une page en noindex suffit à la sortir du sitemap.
 *
 * Doit être déclarée APRÈS sitemap() dans `integrations` (les hooks build:done s'exécutent
 * dans l'ordre de déclaration).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function htmlCandidates(distDir, pathname) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return [path.join(distDir, 'index.html')];
  return [path.join(distDir, clean, 'index.html'), path.join(distDir, `${clean}.html`)];
}

async function readFirst(files) {
  for (const f of files) {
    try {
      return await fs.readFile(f, 'utf8');
    } catch {
      /* candidat suivant */
    }
  }
  return null;
}

/** Raison d'exclusion d'une URL, ou null si elle est légitime dans le sitemap. */
export function exclusionReason(html, url) {
  if (html === null) return 'absente du build';
  const head = html.slice(0, html.indexOf('</head>') > -1 ? html.indexOf('</head>') : html.length);
  if (/<meta[^>]+http-equiv=["']?refresh/i.test(head)) return 'redirection';
  const robots = /<meta[^>]+name=["']robots["'][^>]*>/i.exec(head);
  if (robots && /noindex/i.test(robots[0])) return 'noindex';
  const canonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.exec(head);
  if (canonical) {
    const href = /href=["']([^"']+)["']/i.exec(canonical[0]);
    const norm = (u) => u.replace(/\/+$/, '');
    if (href && norm(href[1]) !== norm(url)) return `canonical vers ${href[1]}`;
  }
  return null;
}

export default function sitemapHygiene() {
  return {
    name: 'sitemap-hygiene',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const files = (await fs.readdir(distDir)).filter((f) => /^sitemap-\d+\.xml$/.test(f));
        let kept = 0;
        const removed = [];

        for (const file of files) {
          const full = path.join(distDir, file);
          const xml = await fs.readFile(full, 'utf8');
          const urls = [...xml.matchAll(/<url>[\s\S]*?<\/url>/g)];
          let out = xml;
          for (const m of urls) {
            const loc = /<loc>([^<]*)<\/loc>/.exec(m[0]);
            if (!loc) continue;
            const url = loc[1].replace(/&amp;/g, '&');
            const html = await readFirst(htmlCandidates(distDir, new URL(url).pathname));
            const reason = exclusionReason(html, url);
            if (reason) {
              out = out.replace(m[0], '');
              removed.push(`${new URL(url).pathname} (${reason})`);
            } else {
              kept++;
            }
          }
          // @astrojs/sitemap (trailingSlash: 'never') retire la barre de l'accueil : on la rétablit
          // ici, seul point qui s'exécute après l'écriture, pour que `<loc>` égale le canonical.
          out = out.replace(/<loc>(https?:\/\/[^/<]+)<\/loc>/g, '<loc>$1/</loc>');
          if (out !== xml) await fs.writeFile(full, out, 'utf8');
        }

        logger.info(`${kept} URL conservées, ${removed.length} retirées${removed.length ? ' : ' + removed.join(', ') : ''}`);
      },
    },
  };
}
