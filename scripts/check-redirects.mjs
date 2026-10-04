#!/usr/bin/env node
/**
 * check-redirects.mjs · Gate CI : redirections de la config Vercel GÉNÉRÉE par le build.
 *
 * Lit `.vercel/output/config.json` (ce que Vercel exécute réellement, pas la source
 * astro.config.mjs) et vérifie que chaque ancienne URL arrive en UN SEUL saut sur une
 * page qui répond 200 :
 *   1. cible vivante  : la destination est une page (ou un fichier) du build ;
 *   2. pas de chaîne  : la destination n'est pas elle-même redirigée ;
 *   3. pas de boucle  : une URL ne se redirige pas vers elle-même ;
 *   4. permanente     : statut 301 ou 308 (un 302/307 ne transmet pas le signal) ;
 *   5. cible indexable: la destination n'est pas noindex (avertissement) ;
 *   6. slash final    : la règle `/x/` → `/x` est présente (une seule forme d'URL servie).
 * Les règles à motif (`/ressources/blog/(.*)`) sont testées avec chaque page réelle que
 * leur destination peut produire.
 *
 * Usage : node scripts/check-redirects.mjs [--report] [--list]
 *   --list : imprime `source<TAB>destination` (sert au test curl contre la production).
 * Exit  : 0 propre · 1 erreur(s) · 2 build absent.
 */

import { existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { scanDist, readVercelRedirects, normalizePath, DIST } from './lib/dist-scan.mjs';
import { isInternalPath } from '../src/lib/seo/internal-tools.mjs';

const VERBOSE = process.argv.includes('--report');
const LIST = process.argv.includes('--list');

const redirects = readVercelRedirects();
if (!redirects) {
  console.error("✗ .vercel/output/config.json introuvable : lance d'abord `pnpm build`.");
  process.exit(2);
}
const { byPath } = scanDist();

const TRAILING = '^/(.*)/$';
const rules = redirects.filter((r) => r.src !== TRAILING && !r.has);

/** Applique la première règle qui matche (ordre Vercel). Retourne la cible ou null. */
function step(pathname) {
  for (const r of rules) {
    const m = r.re.exec(pathname);
    if (!m) continue;
    const target = r.location.replace(/\$(\d+)/g, (_x, n) => m[Number(n)] ?? '');
    return { target: normalizePath(target), status: r.status, rule: r };
  }
  return null;
}

function isLive(pathname) {
  if (byPath.has(pathname) && !byPath.get(pathname).refresh) return true;
  const file = join(DIST, pathname.replace(/^\/+/, ''));
  return existsSync(file) && statSync(file).isFile();
}

/** Source concrète d'une règle statique (`^/a/b$` → `/a/b`), ou null si la règle a un motif. */
function staticSource(src) {
  const body = src.replace(/^\^/, '').replace(/\$$/, '');
  if (/[()[\]*+?|]/.test(body.replace(/\\./g, ''))) return null;
  return body.replace(/\\(.)/g, '$1');
}

/** Sources de test d'une règle à motif : une par page réelle que la destination peut produire. */
function patternSources(rule) {
  const destPrefix = rule.location.split('$')[0];
  const srcPrefix = rule.src.replace(/^\^/, '').split('(')[0].replace(/\\(.)/g, '$1');
  const out = [];
  for (const p of byPath.keys()) {
    if (p.startsWith(destPrefix) && p.length > destPrefix.length) out.push(srcPrefix + p.slice(destPrefix.length));
  }
  return out.slice(0, 50);
}

const errors = [];
const warnings = [];
const rows = [];

for (const rule of rules) {
  const fixed = staticSource(rule.src);
  const sources = fixed ? [fixed] : patternSources(rule);
  if (sources.length === 0) {
    warnings.push(`${rule.src} → ${rule.location} : règle à motif sans page cible à tester`);
    continue;
  }
  for (const source of sources) {
    const first = step(source);
    if (!first) continue;
    rows.push({ source, target: first.target, status: first.status });
    const label = `${source} → ${first.target}`;

    if (![301, 308].includes(first.status)) errors.push(`${label} : statut ${first.status} (301 ou 308 attendu)`);
    if (first.target === normalizePath(source)) {
      errors.push(`${label} : boucle (l'URL se redirige vers elle-même)`);
      continue;
    }
    if (/^https?:\/\//.test(first.target)) continue; // cible externe : hors contrôle du build
    const second = step(first.target);
    if (second) {
      errors.push(`${label} : chaîne (la cible est elle-même redirigée vers ${second.target})`);
      continue;
    }
    if (!isLive(first.target)) {
      errors.push(`${label} : cible absente du build (301 vers 404)`);
      continue;
    }
    const page = byPath.get(first.target);
    if (page?.noindex && !isInternalPath(first.target)) warnings.push(`${label} : la cible est noindex`);
  }
}

if (!redirects.some((r) => r.src === TRAILING && [301, 308].includes(r.status))) {
  errors.push('règle de slash final absente : `/x/` et `/x` seraient deux URL servies');
}

if (LIST) {
  for (const r of rows) console.log(`${r.source}\t${r.target}\t${r.status}`);
  process.exit(errors.length > 0 ? 1 : 0);
}

const LINE = '═'.repeat(68);
console.log(`\n${LINE}`);
console.log('  check:redirects : redirections de .vercel/output/config.json');
console.log(`  Règles : ${rules.length} (+ slash final) · sources testées : ${rows.length}`);
console.log(LINE);
if (errors.length > 0) {
  console.log(`\n[${errors.length}] erreurs`);
  for (const e of VERBOSE ? errors : errors.slice(0, 10)) console.log(`  ✗ ${e}`);
  if (!VERBOSE && errors.length > 10) console.log(`  … et ${errors.length - 10} autre(s). Ajoute --report pour tout voir.`);
}
if (warnings.length > 0) {
  console.log(`\n⚠ [${warnings.length}] avertissements`);
  for (const w of VERBOSE ? warnings : warnings.slice(0, 10)) console.log(`  ⚠ ${w}`);
}
console.log(`\n${LINE}`);
if (errors.length > 0) {
  console.log(`✗  ${errors.length} erreur(s) : exit 1`);
  console.log(LINE);
  process.exit(1);
}
console.log(`✓  ${rows.length} anciennes URL : un seul saut, cible 200, ni chaîne ni boucle : exit 0`);
console.log(LINE);
