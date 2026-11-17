#!/usr/bin/env node
/**
 * gen-lastmod.mjs · instantané des dates de dernière modification par route.
 *
 * Écrit `src/data/lastmod.generated.json` : pour chaque route portée par un fichier source
 * (contenu `src/content/**` ou page statique `src/pages/**.astro`), la date du dernier
 * commit git qui a touché ce fichier. Consommé par `src/lib/seo/lastmod.mjs` (sitemap,
 * JSON-LD dateModified, ligne « Mis à jour le »).
 *
 * Pourquoi un fichier commité : Vercel et la CI clonent en superficiel, `git log` n'y
 * renvoie que le dernier commit pour tous les fichiers (= une date identique partout,
 * exactement ce qu'on veut éviter). On calcule donc depuis un clone complet et on commite.
 *
 * Un commit de pure forme (typographie, jeton qui rend le même texte) porte la ligne
 * `Lastmod: ignore` dans son message : il ne date pas les pages qu'il touche. Un commit de pure
 * forme déjà poussé sans cette ligne (l'historique de main ne se réécrit pas) s'inscrit dans
 * `scripts/lastmod-ignore-commits.txt`, un SHA complet par ligne, avec la preuve en commentaire.
 *
 * Usage :
 *   node scripts/gen-lastmod.mjs           # régénère (refuse sur clone superficiel)
 *   node scripts/gen-lastmod.mjs --check   # exit 1 si l'instantané commité est en retard
 *
 * Déterministe, trié, 0 dépendance npm, 0 horodatage de génération.
 */

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listRouteSources } from '../src/lib/seo/lastmod.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src', 'data', 'lastmod.generated.json');
const CHECK = process.argv.includes('--check');

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
}

let shallow = true;
try {
  shallow = git(['rev-parse', '--is-shallow-repository']) === 'true';
} catch {
  shallow = true;
}
if (shallow) {
  console.log('gen-lastmod : clone superficiel (historique git incomplet), instantané commité conservé.');
  console.log('              Pour le régénérer : `git fetch --unshallow` puis relancer ce script.');
  process.exit(0);
}

// Commits de pure forme poussés sans la ligne `Lastmod: ignore` (SHA complets, # = commentaire).
const IGNORE_FILE = join(ROOT, 'scripts', 'lastmod-ignore-commits.txt');
const ignored = new Set(
  existsSync(IGNORE_FILE)
    ? readFileSync(IGNORE_FILE, 'utf8')
        .split('\n')
        .map((l) => l.replace(/#.*/, '').trim())
        .filter(Boolean)
    : [],
);
for (const sha of ignored) {
  if (!/^[0-9a-f]{40}$/.test(sha)) {
    console.error(`✗ ${relative(ROOT, IGNORE_FILE)} : « ${sha} » n'est pas un SHA complet.`);
    process.exit(1);
  }
}

const routes = {};
for (const { route, file } of listRouteSources(ROOT)) {
  const rel = relative(ROOT, file);
  let day = '';
  try {
    // %cs = date du commit (YYYY-MM-DD). --follow suit un renommage de fichier.
    // Les 10 derniers commits suffisent presque toujours ; l'historique complet sinon.
    const firstKept = (limit) =>
      git(['log', ...limit, '--format=%H %cs', '--follow', '--invert-grep', '--grep=^Lastmod: ignore$', '--', rel])
        .split('\n')
        .map((l) => l.split(' '))
        .find(([sha, d]) => sha && d && !ignored.has(sha));
    const hit = firstKept(['-n', '10']) ?? firstKept([]);
    day = hit ? hit[1] : '';
  } catch {
    day = '';
  }
  if (!day) continue; // fichier non commité : pas de date fiable
  if (!routes[route] || day > routes[route]) routes[route] = day;
}

const sorted = Object.fromEntries(Object.entries(routes).sort(([a], [b]) => a.localeCompare(b)));
const json =
  JSON.stringify(
    {
      $comment:
        'Généré par scripts/gen-lastmod.mjs (date du dernier commit par fichier source). Ne pas éditer à la main.',
      routes: sorted,
    },
    null,
    2,
  ) + '\n';

if (CHECK) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
  if (current !== json) {
    console.error('✗ src/data/lastmod.generated.json est en retard sur git : lance `node scripts/gen-lastmod.mjs`.');
    process.exit(1);
  }
  console.log(`✓ lastmod à jour (${Object.keys(sorted).length} routes).`);
  process.exit(0);
}

writeFileSync(OUT, json);
console.log(`gen-lastmod : ${Object.keys(sorted).length} routes → src/data/lastmod.generated.json`);
