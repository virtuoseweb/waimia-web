#!/usr/bin/env node
/**
 * check-tunnels.mjs · Chaque page de contenu mène à son silo (sur le build, dist/client).
 *
 * Périmètre : pages indexables de /blog/<slug>, /ressources/guides/<slug>,
 * /ressources/comparatifs/<slug> et /ressources/outils/<slug>. Pour chacune, le contenu de
 * <main> doit porter :
 *   1. un lien vers le GUIDE PILIER de son silo (SILOS[silo].guide), sauf si la page est ce guide ;
 *   2. un lien vers la PAGE DE SERVICE du silo (le `pillar` de SILOS, sauf silo `claude` :
 *      MONEY_PAGE du maillage) ;
 *   3. une RESSOURCE GRATUITE : formulaire `lead-capture`, ou lien vers /ressources/outils/<x>
 *      ou /ressources/diagnostics/<x> (une page d'outil est sa propre ressource) ;
 *   4. un lien d'AUDIT : /contact?offer=audit-ia-pme… ou /audit-ia-pme.
 * Le silo d'une page est le premier thème de sa route au registre du maillage
 * (src/lib/internal-mesh.ts), à défaut la `category` de son JSON (garde `check:silos` : les
 * deux concordent). Un silo sans guide (studio) n'exige pas le point 1.
 *
 * Sortie : liste nominative des manques, puis le décompte. Exit 1 s'il en reste, 2 sans build.
 * Usage : node scripts/check-tunnels.mjs [--root <dossier du build>]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const rootArg = process.argv.indexOf('--root');
const DIST = rootArg > -1 ? path.resolve(process.argv[rootArg + 1]) : path.join(ROOT, 'dist', 'client');
if (!fs.existsSync(DIST)) {
  console.error(`check-tunnels : ${DIST} introuvable (lancer le build d'abord).`);
  process.exit(2);
}

// ── Sources : silos, registre du maillage, page de service ──
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const taxo = read('src/data/taxonomies.ts');
const mesh = read('src/lib/internal-mesh.ts');

const silosBlock = taxo.match(/export const SILOS = \{([\s\S]*?)\n\} as const/);
if (!silosBlock) throw new Error('SILOS introuvable dans src/data/taxonomies.ts');
const silos = {};
for (const m of silosBlock[1].matchAll(/^ {2}([a-z-]+): \{([\s\S]*?)\n {2}\},/gm)) {
  const pick = (k) => new RegExp(`${k}: '([^']+)'`).exec(m[2])?.[1];
  silos[m[1]] = { pillar: pick('pillar'), guide: pick('guide') };
}
const claudeService = /silo === 'claude' \? '([^']+)'/.exec(mesh)?.[1];
if (Object.keys(silos).length === 0 || !claudeService) {
  throw new Error('Lecture vide (motif cassé ?) : SILOS ou MONEY_PAGE du maillage.');
}
const servicePage = (silo) => (silo === 'claude' ? claudeService : silos[silo]?.pillar);

const registry = {};
for (const m of mesh.matchAll(/^ {2}'(\/[^']*)': \{[^\n]*?topics: \[([^\]]*)\]/gm)) {
  registry[m[1]] = /'([a-z-]+)'/.exec(m[2])?.[1];
}
if (Object.keys(registry).length === 0) throw new Error('PAGES introuvable dans internal-mesh.ts.');

const CONTENT = { '/blog/': 'blog', '/ressources/guides/': 'guides', '/ressources/comparatifs/': 'comparatifs' };
function siloOf(pathname) {
  if (registry[pathname]) return registry[pathname];
  for (const [prefix, coll] of Object.entries(CONTENT)) {
    if (!pathname.startsWith(prefix)) continue;
    const slug = pathname.slice(prefix.length);
    const file = path.join(ROOT, 'src/content', coll, `${slug}.json`);
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8')).category;
  }
  return undefined;
}

// ── Build ──
const SCOPE = /^\/(blog|ressources\/(guides|comparatifs|outils))\/[^/]+$/;
const norm = (h) => {
  const p = h.split('#')[0];
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
};
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name === 'index.html') out.push(full);
  }
  return out;
}

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#38;/g, '&');
const missing = [];
let checked = 0;
for (const file of walk(DIST)) {
  const rel = path.relative(DIST, path.dirname(file)).split(path.sep).join('/');
  const pathname = rel === '' ? '/' : `/${rel}`;
  if (!SCOPE.test(pathname)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const head = html.slice(0, Math.max(0, html.indexOf('</head>')));
  if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(head)) continue;
  checked++;

  const start = html.search(/<main\b/i);
  const end = html.lastIndexOf('</main>');
  const main = start > -1 ? html.slice(start, end > start ? end : undefined) : '';
  const hrefs = [...main.matchAll(/<a\b[^>]*?\shref=(?:"([^"]*)"|'([^']*)')/gi)].map((m) => decode(m[1] ?? m[2]));
  const internal = hrefs.filter((h) => h.startsWith('/') && !h.startsWith('//'));
  const paths = new Set(internal.map(norm).map((h) => h.split('?')[0]));

  const silo = siloOf(pathname);
  if (!silo || !silos[silo]) {
    missing.push(`${pathname} : silo introuvable (ni registre du maillage, ni category du JSON)`);
    continue;
  }
  const guide = silos[silo].guide;
  const service = servicePage(silo);
  const lacks = [];
  if (guide && guide !== pathname && !paths.has(guide)) lacks.push(`guide pilier ${guide}`);
  if (service && !paths.has(service)) lacks.push(`page de service ${service}`);
  const isTool = pathname.startsWith('/ressources/outils/');
  const hasResource =
    isTool ||
    /data-lead-capture\b/.test(main) ||
    [...paths].some((p) => /^\/ressources\/(outils|diagnostics)\/[^/]+$/.test(p));
  if (!hasResource) lacks.push('ressource gratuite (formulaire ou lien outil/diagnostic)');
  const hasAudit = internal.some((h) => /^\/contact\?(?:[^#]*&)?offer=audit-ia-pme(?:&|$)/.test(h)) || paths.has('/audit-ia-pme');
  if (!hasAudit) lacks.push("lien d'audit (/contact?offer=audit-ia-pme&intent=audit)");
  if (lacks.length > 0) missing.push(`${pathname} [${silo}] : manque ${lacks.join(' ; ')}`);
}

console.log(`check-tunnels : ${checked} pages (blog, guides, comparatifs, outils) dans ${path.relative(ROOT, DIST) || DIST}`);
if (checked === 0) {
  console.error('Aucune page du périmètre trouvée : build absent ou motif cassé.');
  process.exit(2);
}
const rows = missing.map((m) => `  - ${m}`);
if (rows.length > 0) console.log(rows.join('\n'));
const cats = { guide: 0, service: 0, resource: 0, audit: 0, silo: 0 };
for (const m of missing) {
  if (m.includes('silo introuvable')) cats.silo++;
  if (m.includes('guide pilier')) cats.guide++;
  if (m.includes('page de service')) cats.service++;
  if (m.includes('ressource gratuite')) cats.resource++;
  if (m.includes("lien d'audit")) cats.audit++;
}
console.log(
  `${checked - missing.length}/${checked} pages avec tunnel complet · manques : guide ${cats.guide}, service ${cats.service}, ressource ${cats.resource}, audit ${cats.audit}, silo inconnu ${cats.silo}`,
);
process.exit(missing.length > 0 ? 1 : 0);
