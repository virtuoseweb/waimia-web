/**
 * Astro integration : la première section de <main> est peinte dès le premier rendu.
 *
 * Les classes reveal (`.reveal*`, `.scale-in`…) cachent un élément (opacity 0, flou, clip) jusqu'à
 * ce que le module de Base.astro charge et que l'IntersectionObserver pose `.in`. Sur le héros,
 * cela retarde le LCP de tout le chargement JS (mesuré sur la home : −230 ms de LCP sans elles),
 * et Chrome ne compte pas un élément à opacity 0 comme LCP.
 * Cette passe remplace, de l'ouverture de <main> à la fin de sa première <section>, chaque classe
 * reveal par `af-in` : animation CSS pure (scroll-reveal.css) qui part d'une opacité non nulle,
 * sans attendre aucun script. Le reste de la page garde ses reveals au scroll.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REVEAL = /^(reveal(-[\w-]+)?|scale-in|blur-in|clip-up|hair-draw|row-lines)$/;
const SECTION = /<(\/?)section\b[^>]*>/gi;

/** Fin (index exclu) de la zone au-dessus de la ligne de flottaison, ou -1. */
export function aboveFoldEnd(html, from) {
  SECTION.lastIndex = from;
  let depth = 0;
  let m;
  while ((m = SECTION.exec(html))) {
    if (!m[1]) depth++;
    else if (--depth === 0) return m.index + m[0].length;
  }
  return -1;
}

/** Remplace les classes reveal de `fragment` par `af-in` ; rend [fragment, nombre]. */
export function neutralize(fragment) {
  let n = 0;
  const out = fragment.replace(/(\sclass=")([^"]*)"/g, (all, pre, cls) => {
    const list = cls.split(/\s+/).filter(Boolean);
    if (!list.some((c) => REVEAL.test(c))) return all;
    n++;
    const kept = list.filter((c) => !REVEAL.test(c) && c !== 'af-in');
    return `${pre}${[...kept, 'af-in'].join(' ')}"`;
  });
  return [out, n];
}

export default function aboveFold() {
  return {
    name: 'above-fold',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const files = [];
        const walk = async (d) => {
          for (const e of await fs.readdir(d, { withFileTypes: true })) {
            const p = path.join(d, e.name);
            if (e.isDirectory()) {
              if (p !== path.join(distDir, '_astro')) await walk(p);
            } else if (e.name.endsWith('.html')) files.push(p);
          }
        };
        await walk(distDir);
        let pages = 0;
        let elements = 0;
        for (const file of files) {
          const html = await fs.readFile(file, 'utf8');
          const main = /<main\b[^>]*>/i.exec(html);
          if (!main) continue;
          const start = main.index + main[0].length;
          const end = aboveFoldEnd(html, start);
          if (end < 0) continue;
          const [frag, n] = neutralize(html.slice(start, end));
          if (!n) continue;
          await fs.writeFile(file, html.slice(0, start) + frag + html.slice(end));
          pages++;
          elements += n;
        }
        logger.info(`${elements} éléments reveal de la première section rendus visibles sans JS sur ${pages} pages`);
      },
    },
  };
}
