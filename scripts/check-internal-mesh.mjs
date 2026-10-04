#!/usr/bin/env node
/**
 * check-internal-mesh.mjs · Rapport de maillage interne sur le build (mode AVERTISSEMENT).
 *
 * Pour chaque page indexable de dist/client :
 *   · liens entrants CONTEXTUELS : liens situés dans le contenu (<main>) d'une AUTRE page
 *     indexable. Le header, le mega menu et le footer ne comptent pas : ils lient tout le
 *     monde pareil et n'apportent ni contexte ni priorité ;
 *   · liens entrants de navigation (chrome global), à titre indicatif ;
 *   · profondeur : nombre de clics depuis l'accueil, tous liens confondus.
 * Signale :
 *   · les pages ORPHELINES (0 lien entrant contextuel) ;
 *   · les pages sous le seuil de 3 liens entrants contextuels ;
 *   · les pages à plus de 3 clics de l'accueil ;
 *   · les liens vers une URL redirigée (chaque saut dilue le signal).
 *
 * Usage : node scripts/check-internal-mesh.mjs [--report] [--json] [--strict]
 *   --report : tableau complet, une ligne par page
 *   --json   : sortie machine
 *   --strict : exit 1 s'il reste une orpheline ou une page sous le seuil
 * Exit  : 0 par défaut (rapport non bloquant) · 2 dist/client absent.
 */

import { scanDist, isIndexable, readVercelRedirects } from './lib/dist-scan.mjs';

const VERBOSE = process.argv.includes('--report');
const AS_JSON = process.argv.includes('--json');
const STRICT = process.argv.includes('--strict');
const MIN_INBOUND = 3;
const MAX_DEPTH = 3;
// Pages utilitaires : liées depuis le footer de toutes les pages, sans enjeu de
// positionnement. Elles sont listées à part et ne comptent pas dans le seuil.
const UTILITY = new Set(['/cgv', '/mentions-legales', '/politique-confidentialite', '/contact', '/sources-methodologie']);

const { pages } = scanDist();
const indexable = pages.filter(isIndexable);
const paths = new Set(indexable.map((p) => p.pathname));
const redirects = readVercelRedirects() || [];
const isRedirected = (href) => redirects.some((r) => r.src !== '^/(.*)/$' && !r.has && r.re.test(href));

const contextual = new Map(indexable.map((p) => [p.pathname, new Set()]));
const navigation = new Map(indexable.map((p) => [p.pathname, new Set()]));
const outgoing = new Map();
const redirectedLinks = new Map();

for (const p of indexable) {
  const out = new Set();
  for (const l of p.links) {
    if (l.href === p.pathname || l.nofollow) continue;
    if (isRedirected(l.href)) {
      if (!redirectedLinks.has(l.href)) redirectedLinks.set(l.href, new Set());
      redirectedLinks.get(l.href).add(p.pathname);
    }
    if (!paths.has(l.href)) continue;
    out.add(l.href);
    (l.inMain ? contextual : navigation).get(l.href).add(p.pathname);
  }
  outgoing.set(p.pathname, out);
}

// Profondeur : parcours en largeur depuis l'accueil.
const depth = new Map([['/', 0]]);
const queue = ['/'];
while (queue.length > 0) {
  const current = queue.shift();
  for (const next of outgoing.get(current) || []) {
    if (depth.has(next)) continue;
    depth.set(next, depth.get(current) + 1);
    queue.push(next);
  }
}

const rows = indexable
  .map((p) => ({
    pathname: p.pathname,
    contextual: contextual.get(p.pathname).size,
    navigation: navigation.get(p.pathname).size,
    depth: depth.has(p.pathname) ? depth.get(p.pathname) : null,
    from: [...contextual.get(p.pathname)].sort(),
  }))
  .sort((a, b) => a.contextual - b.contextual || a.pathname.localeCompare(b.pathname));

const counted = (r) => r.pathname !== '/' && !UTILITY.has(r.pathname);
const orphans = rows.filter((r) => counted(r) && r.contextual === 0);
const weak = rows.filter((r) => counted(r) && r.contextual > 0 && r.contextual < MIN_INBOUND);
const utility = rows.filter((r) => UTILITY.has(r.pathname));
const deep = rows.filter((r) => r.depth === null || r.depth > MAX_DEPTH);

if (AS_JSON) {
  console.log(JSON.stringify({ pages: rows, orphans: orphans.map((r) => r.pathname), weak: weak.map((r) => r.pathname), deep: deep.map((r) => r.pathname), redirectedLinks: Object.fromEntries([...redirectedLinks].map(([k, v]) => [k, [...v]])) }, null, 2));
  process.exit(0);
}

const LINE = '═'.repeat(68);
console.log(`\n${LINE}`);
console.log('  check:internal-mesh : maillage interne (rapport, non bloquant)');
console.log(`  Pages indexables : ${indexable.length} · seuil : ${MIN_INBOUND} liens entrants contextuels · profondeur max : ${MAX_DEPTH}`);
console.log(LINE);

const line = (r) =>
  `  ${String(r.contextual).padStart(3)} ctx  ${String(r.navigation).padStart(3)} nav  prof. ${r.depth === null ? '∞' : r.depth}  ${r.pathname}`;

console.log(`\n⚠ [${orphans.length}] orphelines (0 lien entrant contextuel)`);
orphans.forEach((r) => console.log(line(r)));
console.log(`\n⚠ [${weak.length}] sous le seuil (1 ou 2 liens entrants contextuels)`);
weak.forEach((r) => console.log(`${line(r)}   ← ${r.from.join(', ')}`));
console.log(`\n· [${utility.length}] pages utilitaires (hors seuil, liées depuis le footer)`);
utility.forEach((r) => console.log(line(r)));
console.log(`\n⚠ [${deep.length}] à plus de ${MAX_DEPTH} clics de l'accueil (ou injoignables)`);
deep.forEach((r) => console.log(line(r)));
console.log(`\n⚠ [${redirectedLinks.size}] URL redirigées encore liées`);
for (const [href, from] of redirectedLinks) console.log(`  ${href}   ← ${[...from].slice(0, 4).join(', ')}${from.size > 4 ? ` (+${from.size - 4})` : ''}`);

if (VERBOSE) {
  console.log('\nToutes les pages (liens entrants contextuels croissants) :');
  rows.forEach((r) => console.log(line(r)));
}

const total = rows.filter(counted).length;
const ok = total - orphans.length - weak.length;
console.log(`\n${LINE}`);
console.log(`  ${ok}/${total} pages au seuil · ${orphans.length} orpheline(s) · ${weak.length} sous le seuil · ${deep.length} trop profonde(s)`);
console.log(LINE);
process.exit(STRICT && (orphans.length > 0 || weak.length > 0 || deep.length > 0) ? 1 : 0);
