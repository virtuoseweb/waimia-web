/**
 * Astro integration : minifie les <script> INLINE classiques du HTML bâti.
 *
 * Astro minifie les scripts qu'il regroupe, jamais les `<script is:inline>` : le script du header
 * (17 Ko, commentaires et indentation compris), la validation des formulaires, le consentement
 * cookies et le survol magnétique étaient copiés tels quels dans chacune des pages, soit ~23 Ko
 * de HTML sans texte par page. esbuild (dépendance de Vite) les minifie sans changer leur
 * sémantique : en mode transform, les noms de premier niveau sont conservés (fonctions globales
 * appelées d'ailleurs), seuls les noms locaux sont raccourcis.
 * Ne touche pas : scripts à src, modules (déjà minifiés par Astro), JSON-LD et autres types.
 * Un script qu'esbuild ne sait pas analyser est laissé intact (avertissement au journal).
 */
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

/** @param {{ root?: string }} [options] */
export default function minifyInlineScripts({ root = process.cwd() } = {}) {
  return {
    name: 'minify-inline-scripts',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const fromRoot = createRequire(path.join(root, 'package.json'));
        const fromAstro = createRequire(fromRoot.resolve('astro/package.json'));
        const esbuild = createRequire(fromAstro.resolve('vite/package.json'))('esbuild');
        const distDir = fileURLToPath(dir);
        /** @type {Map<string, string>} */
        const cache = new Map();
        const failed = new Set();
        let pages = 0;
        let before = 0;
        let after = 0;

        const files = [];
        const walk = async (d) => {
          for (const e of await fs.readdir(d, { withFileTypes: true })) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) await walk(p);
            else if (e.name.endsWith('.html')) files.push(p);
          }
        };
        await walk(distDir);

        for (const file of files) {
          const html = await fs.readFile(file, 'utf8');
          const todo = [];
          for (const m of html.matchAll(SCRIPT)) {
            const attrs = m[1];
            if (/\ssrc\s*=/i.test(attrs)) continue;
            const type = /\stype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs)?.[1]?.toLowerCase();
            if (type && type !== 'text/javascript') continue;
            if (m[2].trim().length < 200) continue;
            todo.push(m[2]);
          }
          for (const code of todo) {
            if (cache.has(code) || failed.has(code)) continue;
            try {
              const out = (await esbuild.transform(code, { loader: 'js', minify: true, target: 'es2020' })).code.trim();
              // `</script` ne peut pas apparaître dans un littéral sans fermer la balise.
              cache.set(code, /<\/script/i.test(out) ? code : out);
            } catch (e) {
              failed.add(code);
              logger.warn(`script inline non minifié (${file.slice(distDir.length)}) : ${String(e.message).split('\n')[0]}`);
            }
          }
          let changed = false;
          const next = html.replace(SCRIPT, (whole, attrs, code) => {
            const min = cache.get(code);
            if (!min || min === code) return whole;
            changed = true;
            before += code.length;
            after += min.length;
            return `<script${attrs}>${min}</script>`;
          });
          if (changed) {
            await fs.writeFile(file, next);
            pages++;
          }
        }
        logger.info(
          `${pages} pages : scripts inline ${(before / 1024).toFixed(0)} Ko → ${(after / 1024).toFixed(0)} Ko ` +
            `(${cache.size} scripts distincts, ${failed.size} laissés intacts)`,
        );
      },
    },
  };
}
