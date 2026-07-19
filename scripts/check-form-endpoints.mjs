#!/usr/bin/env node
/**
 * check-form-endpoints.mjs - Gate anti-régression : endpoint /api/* absent pour un form.
 *
 * Pourquoi : la régression f3ac27d (SR-05) a supprime des fichiers src/pages/api/*.ts
 * sans retirer les references dans les formulaires. Les forms postaient vers un 404
 * silencieux en production - aucune erreur build, aucun avertissement CI, echec invisible.
 *
 * Ce gate detecte les cas ou un form HTML (action="/api/...") ou un fetch JS dans un
 * contexte de soumission (fetch('/api/...')) pointe vers un endpoint inexistant dans
 * src/pages/api/.
 *
 * Scan : src/ recursif sur .astro, .ts, .tsx, .js, .jsx.
 * Regex : capture action="/api/<slug>" et fetch('/api/<slug>') (apostrophe, guillemet, backtick).
 * Slug = premier segment apres /api/ sans sous-chemin ni query string (les endpoints
 * a sous-chemin DEV-ONLY sous astro dev - /api/ds/save ET /api/ds/preset - sont
 * naturellement exclus : le / du sous-chemin ne matche pas la classe de terminaison).
 *
 * Verification : pour chaque slug unique, cherche src/pages/api/<slug>.ts, .js ou .mjs.
 *
 * Exit : 1 si >= 1 violation (endpoint manquant) . 0 si PASS . 2 si 0 fichier scanne.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');
const API_DIR = join(ROOT, 'src', 'pages', 'api');
const EXTENSIONS = new Set(['.astro', '.ts', '.tsx', '.js', '.jsx']);

/**
 * Capture :
 *   action="/api/<slug>"   action='/api/<slug>'   action=`/api/<slug>`
 *   fetch('/api/<slug>'    fetch("/api/<slug>"    fetch(`/api/<slug>`
 * Le slug est exactement [a-z0-9-]+ suivi d'une quote/backtick ou d'un ? (query string).
 * Les chemins avec sous-segments (/api/ds/save, /api/ds/preset) ne matchent PAS car /
 * n'est pas dans le character class de terminaison - comportement voulu (DEV-ONLY, cf.
 * ds-studio.js + src/integrations/ds-save-dev.mjs).
 */
const FORM_ENDPOINT_RE = /(?:action=|fetch\()\s*['"`]\/api\/([a-z0-9-]+)['"`?]/gi;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path, files);
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

const files = walk(SRC_DIR).sort();

if (files.length === 0) {
  console.error('ERROR: 0 fichier scanne (src/ introuvable ou vide).');
  process.exit(2);
}

// slug -> Set<fichier relatif qui le reference>
const slugRefs = new Map();

for (const file of files) {
  const content = readFileSync(file, 'utf8');
  // Reinitialiser lastIndex car le flag g est persiste sur l'objet RegExp literal
  FORM_ENDPOINT_RE.lastIndex = 0;
  let match;
  while ((match = FORM_ENDPOINT_RE.exec(content)) !== null) {
    const slug = match[1];
    if (!slugRefs.has(slug)) {
      slugRefs.set(slug, new Set());
    }
    slugRefs.get(slug).add(relative(ROOT, file));
  }
}

if (slugRefs.size === 0) {
  console.log(`PASS - aucune reference /api/* dans un form detectee (${files.length} fichiers scannes). Rien a verifier.`);
  process.exit(0);
}

// Verifier l'existence de chaque endpoint reference
const violations = [];

for (const [slug, refs] of slugRefs.entries()) {
  const candidates = [
    join(API_DIR, `${slug}.ts`),
    join(API_DIR, `${slug}.js`),
    join(API_DIR, `${slug}.mjs`),
  ];
  const exists = candidates.some(existsSync);
  if (!exists) {
    violations.push({ slug, refs: [...refs].sort() });
  }
}

if (violations.length > 0) {
  console.error(`\nGate FAIL : ${violations.length} endpoint(s) /api/* reference(s) par un form mais absent(s) du disque.\n`);
  for (const { slug, refs } of violations) {
    console.error(`  /api/${slug}  [src/pages/api/${slug}.ts introuvable]`);
    for (const ref of refs) {
      console.error(`    <- ${ref}`);
    }
  }
  console.error(
    '\nUn form poste vers un endpoint inexistant : le navigateur recoit un 404' +
    ' silencieux en production (aucune erreur build, aucun avertissement).' +
    ' Regression de reference : f3ac27d (SR-05).' +
    ' Cree le fichier src/pages/api/<slug>.ts manquant ou corrige le chemin du form.\n'
  );
  process.exit(1);
}

const endpointList = [...slugRefs.keys()].sort().join(', ');
console.log(
  `PASS - ${slugRefs.size} endpoint(s) /api/* verifies, tous presents` +
  ` (${files.length} fichiers scannes). Endpoints : ${endpointList}`
);
process.exit(0);
