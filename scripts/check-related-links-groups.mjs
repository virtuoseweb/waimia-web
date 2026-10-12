#!/usr/bin/env node
/**
 * check-related-links-groups.mjs · garde du bloc de maillage `related-links` sur le build.
 *
 * Le schéma (packages/ds-kernel/src/sections/related-links/schema.ts) plafonne un groupe
 * à 6 liens et une section à 5 groupes, mais le maillage calculé passe en `as any`
 * (src/layouts/Base.astro) : le plafond n'est donc jamais appliqué à l'exécution. Cette
 * garde le mesure dans le HTML servi : aucun groupe > 6 liens, aucune section > 5 groupes.
 *
 * Usage : node scripts/check-related-links-groups.mjs [--root <dossier>]
 * Exit  : 0 conforme · 1 dépassement · 2 dossier absent.
 */
import { existsSync, readFileSync } from 'node:fs';
import { relative } from 'node:path';
import { DIST, walk } from './lib/dist-scan.mjs';

const MAX_LINKS = 6;
const MAX_GROUPS = 5;
const rootArg = process.argv.indexOf('--root');
const root = rootArg > -1 ? process.argv[rootArg + 1] : DIST;
if (!existsSync(root)) {
  console.error(`check-related-links-groups : ${root} absent (lancer le build)`);
  process.exit(2);
}

const files = walk(root, (f) => f.endsWith('.html'));
const problems = [];
let sections = 0;
let groups = 0;
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  // Une section = de <section class="related-links ..."> à la section suivante ou à la fin.
  const parts = html.split(/<section[^>]*class="related-links[ "]/).slice(1);
  for (const part of parts) {
    const body = part.split('</section>')[0];
    const lists = body.split(/<div[^>]*class="related-links__group[ "]/).slice(1);
    sections++;
    groups += lists.length;
    if (lists.length > MAX_GROUPS) problems.push(`${relative(root, file)} : ${lists.length} groupes (> ${MAX_GROUPS})`);
    lists.forEach((g, i) => {
      const n = (g.match(/class="related-links__item[ "]/g) || []).length;
      const label = (g.match(/related-links__group-label[^>]*>([^<]*)</) || [])[1] || `groupe ${i + 1}`;
      if (n > MAX_LINKS) problems.push(`${relative(root, file)} : « ${label.trim()} » porte ${n} liens (> ${MAX_LINKS})`);
    });
  }
}

if (problems.length > 0) {
  console.error(`check-related-links-groups : ${problems.length} dépassement(s)\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`check-related-links-groups : OK (${sections} sections related-links, ${groups} groupes, plafonds ${MAX_LINKS} liens / ${MAX_GROUPS} groupes)`);
