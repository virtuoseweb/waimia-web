/**
 * Dit si un chemin du site correspond à une page qui existe dans le repo, hors réseau.
 * Sert à check-config.mjs (pages cibles des mots-clés) et à check-calendar.mjs (pages du
 * calendrier éditorial).
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from '../config.mjs';

function contentBasenames(dir, out = new Set()) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) contentBasenames(join(dir, e.name), out);
    else if (e.name.endsWith('.json')) {
      out.add(e.name.replace(/\.json$/, ''));
      // La route d'un contenu vient de son `slug`, qui peut différer du nom de fichier
      // (services/site-web-ia/sur-mesure.json a pour slug sur-mesure-headless).
      const slug = readFileSync(join(dir, e.name), 'utf8').match(/^ {2}"slug":\s*"([a-z0-9-]+)"/m)?.[1];
      if (slug) out.add(slug);
    }
  }
  return out;
}

let CONTENT = null;

/**
 * Une cible existe si une route statique src/pages lui correspond, ou un contenu JSON du même
 * nom que son dernier segment (index.json pour un hub de collection). Heuristique : elle ne
 * vérifie pas que le contenu est rangé dans la collection du préfixe.
 */
export function targetExists(target) {
  CONTENT ??= contentBasenames(join(ROOT, 'src', 'content'));
  const rel = target.replace(/^\//, '');
  const pages = join(ROOT, 'src', 'pages');
  if (existsSync(join(pages, `${rel}.astro`)) || existsSync(join(pages, rel, 'index.astro'))) return true;
  const segments = rel.split('/');
  const last = segments[segments.length - 1];
  if (segments.length > 1 && CONTENT.has(last)) return true;
  return segments.length === 1 && existsSync(join(ROOT, 'src', 'content', rel, 'index.json'));
}
