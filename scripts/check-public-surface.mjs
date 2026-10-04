#!/usr/bin/env node
/**
 * check-public-surface.mjs · Gate CI : ce que le site expose aux robots.
 *
 *   1. liens      : aucune page publique ne lie une surface interne (catalogue, atelier,
 *                   dashboard, cartographie) ;
 *   2. production : avec --prod (build WAIMIA_INTERNAL_TOOLS=0), aucune surface interne
 *                   n'est générée, ni en HTML ni en fonction serverless ;
 *   3. markdown   : un .md par page indexable, et seulement pour elles ;
 *   4. llms.txt   : structuré par silo, chaque lien pointe un fichier du build, aucune URL
 *                   interne, positionnement à jour ;
 *   5. langue     : site monolingue FR, aucun lien ni alternate vers /en ;
 *   6. robots     : chaque robot (général et IA) est exclu des surfaces internes et de
 *                   /api/, et peut explorer le site public et l'image Open Graph ;
 *   7. en-têtes   : vercel.json pose X-Robots-Tag noindex sur les surfaces internes, les
 *                   .md et llms*.txt.
 *
 * Usage : node scripts/check-public-surface.mjs [--prod] [--report]
 * Exit  : 0 propre · 1 erreur(s) · 2 dist/client absent.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { scanDist, isIndexable, readRobots, isDisallowed, walk, DIST, ROOT, VERCEL_CONFIG, SITE_ORIGIN } from './lib/dist-scan.mjs';
import { isInternalPath, INTERNAL_PATH_PREFIXES, INTERNAL_API_PREFIXES } from '../src/lib/seo/internal-tools.mjs';

const VERBOSE = process.argv.includes('--report');
const PROD = process.argv.includes('--prod');

// Dette soldée à l'intégration (octobre 2026) : le footer ne lie plus aucun outil interne.
// L'ensemble reste, vide, pour tracer une éventuelle dette future sans la masquer.
const KNOWN_INTERNAL_LINKS = new Set([]);

const errors = [];
const known = [];
const err = (rule, msg) => errors.push({ rule, msg });

const { pages } = scanDist();
const publicPages = pages.filter((p) => !p.internal && !p.refresh);
const indexable = pages.filter(isIndexable);

// ── 1. Liens des pages publiques vers une surface interne ────────────────────
const linkers = new Map();
for (const p of publicPages) {
  for (const l of p.links) {
    if (!isInternalPath(l.href)) continue;
    if (!linkers.has(l.href)) linkers.set(l.href, new Set());
    linkers.get(l.href).add(p.pathname);
  }
}
for (const [href, from] of linkers) {
  const msg = `${href} lié depuis ${from.size} page(s) publique(s) (ex. ${[...from].slice(0, 3).join(', ')})`;
  if (KNOWN_INTERNAL_LINKS.has(href)) known.push(msg);
  else err('liens', msg);
}
const publicLinkingInternal = new Set([...linkers.values()].flatMap((s) => [...s])).size;

// ── 2. Build de production : aucune surface interne générée ──────────────────
const internalPages = pages.filter((p) => p.internal && !p.refresh);
if (PROD) {
  if (internalPages.length > 0) {
    err('production', `${internalPages.length} page(s) interne(s) générée(s) (ex. ${internalPages.slice(0, 3).map((p) => p.pathname).join(', ')})`);
  }
  if (existsSync(VERCEL_CONFIG)) {
    const cfg = JSON.parse(readFileSync(VERCEL_CONFIG, 'utf8'));
    for (const r of cfg.routes || []) {
      if (!r.dest || !r.src) continue;
      const src = r.src.replace(/\\/g, '');
      if ([...INTERNAL_PATH_PREFIXES, ...INTERNAL_API_PREFIXES].some((prefix) => src.startsWith(`^${prefix}`))) {
        err('production', `route serverless interne exposée : ${r.src}`);
      }
    }
  }
}

// ── 3. Fichiers markdown ──────────────────────────────────────────────────────
const mdFiles = walk(DIST, (f) => f.endsWith('.md')).map((f) => '/' + relative(DIST, f).split(sep).join('/'));
const mdFor = (pathname) => (pathname === '/' ? '/index.md' : `${pathname}.md`);
const expectedMd = new Set(indexable.map((p) => mdFor(p.pathname)));
for (const md of mdFiles) {
  if (isInternalPath(md.replace(/\.md$/, ''))) err('markdown', `${md} : version markdown d'une surface interne`);
  else if (existsSync(join(ROOT, 'public', md))) known.push(`${md} : fichier de documentation rangé dans public/, donc servi publiquement (noindex par en-tête)`);
  else if (!expectedMd.has(md)) err('markdown', `${md} : version markdown d'une page non indexable ou inexistante`);
}
for (const md of expectedMd) if (!mdFiles.includes(md)) err('markdown', `${md} manquant (page indexable sans version markdown)`);

// ── 4. llms.txt ───────────────────────────────────────────────────────────────
const llmsFile = join(DIST, 'llms.txt');
let llmsLinks = 0;
let llmsSilos = 0;
if (!existsSync(llmsFile)) err('llms', 'llms.txt absent du build');
else {
  const llms = readFileSync(llmsFile, 'utf8');
  if (!/^# \S/m.test(llms)) err('llms', 'llms.txt sans titre H1');
  if (!/^> \S/m.test(llms)) err('llms', 'llms.txt sans résumé (bloc de citation)');
  llmsSilos = (llms.match(/^## \S/gm) || []).length;
  if (llmsSilos < 3) err('llms', `llms.txt : ${llmsSilos} section(s), au moins 3 silos attendus`);
  for (const stale of [/expert de l'écosystème Claude/i, /llms-small\.txt/i]) {
    if (stale.test(llms)) err('llms', `llms.txt contient une formulation périmée (${stale.source})`);
  }
  for (const m of llms.matchAll(/\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s)]+)/g)) {
    const url = m[1] || m[2];
    if (!url.startsWith(SITE_ORIGIN)) continue;
    llmsLinks++;
    // Paramètres et ancre retirés : /contact?offer=… désigne la page /contact.
    const pathname = url.slice(SITE_ORIGIN.length).split(/[?#]/)[0] || '/';
    if (isInternalPath(pathname)) err('llms', `llms.txt liste une URL interne : ${pathname}`);
    else if (!existsSync(join(DIST, pathname.replace(/^\/+/, '')))) err('llms', `llms.txt liste une URL morte : ${pathname}`);
  }
  if (!existsSync(join(DIST, 'llms-full.txt'))) err('llms', 'llms-full.txt absent du build');
}

// ── 5. Résidus /en ────────────────────────────────────────────────────────────
for (const p of publicPages) {
  const en = p.links.filter((l) => l.href === '/en' || l.href.startsWith('/en/'));
  if (en.length > 0) err('langue', `${p.pathname} lie ${en[0].href} (le miroir /en n'existe pas)`);
  for (const a of p.alternates) {
    if (!['fr-FR', 'x-default'].includes(a.hreflang)) err('langue', `${p.pathname} déclare un alternate ${a.hreflang}`);
    else if (p.canonical && a.href !== p.canonical) err('langue', `${p.pathname} : alternate ${a.hreflang} (${a.href}) différent du canonical`);
  }
  if (!p.noindex && !p.alternates.some((a) => a.hreflang === 'x-default')) err('langue', `${p.pathname} sans x-default`);
}
if (pages.some((p) => p.pathname === '/en' || p.pathname.startsWith('/en/'))) err('langue', 'des pages /en sont générées');

// ── 6. robots.txt ─────────────────────────────────────────────────────────────
const robots = readRobots();
const agents = [...new Set(['*', ...robots.groups.flatMap((g) => g.agents)])];
const WANTED_AI = ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];
for (const ai of WANTED_AI) {
  if (!agents.some((a) => a.toLowerCase() === ai.toLowerCase())) err('robots', `robots.txt ne nomme pas ${ai}`);
}
for (const agent of agents) {
  for (const prefix of [...INTERNAL_PATH_PREFIXES, '/api/contact', '/api/ds/chat']) {
    for (const probe of [prefix, `${prefix}/x`]) {
      if (probe.startsWith('/api/') && probe.endsWith('/x')) continue;
      if (!isDisallowed(robots, probe, agent)) err('robots', `${agent} peut explorer ${probe}`);
    }
  }
  for (const open of ['/', '/services/agents-ia', '/blog', '/api/og.png', '/llms.txt']) {
    if (isDisallowed(robots, open, agent)) err('robots', `${agent} ne peut pas explorer ${open}`);
  }
}
if (/^\s*host\s*:/im.test(robots.raw)) err('robots', 'directive Host non standard présente');

// ── 7. En-têtes vercel.json ───────────────────────────────────────────────────
const vercelJson = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'));
// Vercel compile `source` (path-to-regexp) ; les motifs utilisés ici sont de la regex pure.
const headerRules = (vercelJson.headers || []).map((h) => ({
  re: new RegExp(`^${h.source}$`),
  noindex: (h.headers || []).some((x) => x.key.toLowerCase() === 'x-robots-tag' && /noindex/i.test(x.value)),
}));
const hasNoindexHeader = (pathname) => headerRules.some((h) => h.noindex && h.re.test(pathname));
for (const prefix of INTERNAL_PATH_PREFIXES) {
  for (const probe of [prefix, ...(prefix.startsWith('/agence/') ? [] : [`${prefix}/x/y`])]) {
    if (!hasNoindexHeader(probe)) err('en-têtes', `vercel.json : pas de X-Robots-Tag noindex sur ${probe}`);
  }
}
for (const probe of ['/index.md', '/services/agents-ia.md', '/llms.txt', '/llms-full.txt']) {
  if (!hasNoindexHeader(probe)) err('en-têtes', `vercel.json : pas de X-Robots-Tag noindex sur ${probe}`);
}
for (const probe of ['/', '/services/agents-ia', '/blog/x', '/agence', '/agence/methode']) {
  if (hasNoindexHeader(probe)) err('en-têtes', `vercel.json : X-Robots-Tag noindex posé sur une page publique (${probe})`);
}

// ── Rapport ───────────────────────────────────────────────────────────────────
const LINE = '═'.repeat(68);
console.log(`\n${LINE}`);
console.log(`  check:public-surface : exposition aux robots${PROD ? ' (build de production)' : ''}`);
console.log(`  Pages HTML : ${pages.length} · publiques : ${publicPages.length} · indexables : ${indexable.length} · internes : ${internalPages.length}`);
console.log(`  Pages publiques liant une surface interne : ${publicLinkingInternal}`);
console.log(`  Fichiers .md : ${mdFiles.length} · llms.txt : ${llmsSilos} silos, ${llmsLinks} liens`);
console.log(LINE);

const grouped = errors.reduce((acc, e) => ((acc[e.rule] ||= []).push(e.msg), acc), {});
for (const [rule, list] of Object.entries(grouped)) {
  console.log(`\n[${list.length}] ${rule}`);
  for (const m of VERBOSE ? list : list.slice(0, 6)) console.log(`  ✗ ${m}`);
  if (!VERBOSE && list.length > 6) console.log(`  … et ${list.length - 6} autre(s). Ajoute --report pour tout voir.`);
}
if (known.length > 0) {
  console.log(`\n⚠  Connus (dette trackée, non bloquants) : ${known.length}`);
  for (const m of known) console.log(`  ⚠ ${m}`);
}

console.log(`\n${LINE}`);
if (errors.length > 0) {
  console.log(`✗  ${errors.length} erreur(s) : exit 1`);
  console.log(LINE);
  process.exit(1);
}
console.log('✓  Surface publique conforme : exit 0');
console.log(LINE);
