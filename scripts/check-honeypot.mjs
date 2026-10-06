#!/usr/bin/env node
/**
 * check-honeypot.mjs · Gate : anti-robots sur TOUT formulaire Waimia (décision Simon, 2026-10-05).
 *
 * Côté interface (src/, hors src/pages/api et src/lib/emails) :
 *  1. chaque balise `<form` doit être couverte : un composant `<FormGuard` (champ piège `website`
 *     hors écran + horodatage `_t`), OU un champ `name="website"`, OU l'attribut `data-form-local`
 *     (formulaire qui ne poste rien : calcul dans le navigateur). Comptage par fichier :
 *     (#FormGuard + #name="website" + #data-form-local) >= #<form ;
 *  2. un fichier qui fait `fetch('/api/<contact|devis|lead-magnet|newsletter>')` doit envoyer le
 *     piège : `website` dans le corps ou `new FormData(` (qui reprend tous les champs).
 *  3. un `<form` avec `action="/api/...` natif (sans JS) doit porter le champ piège (point 1).
 * Côté serveur (src/pages/api/*.ts qui lisent un corps, + src/lib/lead-magnet-delivery.ts) :
 *  4. le fichier appelle `isBotSubmission(` (src/lib/honeypot.ts) AVANT `.safeParse(` : un robot
 *     reçoit un faux succès silencieux sans validation, e-mail ni lecture de fichier ;
 *     `lead-magnet.ts` délègue à `processLeadMagnet(`, qui doit respecter le même ordre.
 *
 * Exit : 0 propre · 1 violation(s) · 2 rien à scanner.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const EXT = new Set(['.astro', '.ts', '.tsx', '.js', '.jsx']);
const FORM_ENDPOINTS = 'contact|devis|lead-magnet|newsletter';

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.isFile() && EXT.has(extname(e.name))) out.push(p);
  }
  return out;
}
const count = (s, re) => (s.match(re) || []).length;
const rel = (f) => relative(ROOT, f);

const files = walk(SRC).sort();
if (files.length === 0) {
  console.error('ERROR: 0 fichier scanné.');
  process.exit(2);
}
const violations = [];
const forms = [];

for (const f of files) {
  const r = rel(f);
  if (r.startsWith('src/pages/api/') || r.startsWith('src/lib/emails/') || r === 'src/components/ui/atoms/FormGuard.astro') continue;
  const s = readFileSync(f, 'utf8');
  // Les commentaires de documentation ne comptent pas comme balises.
  const code = s.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').replace(/<!--[\s\S]*?-->/g, '');
  const nForm = count(code, /<form[\s>]/g);
  if (nForm > 0) {
    const guard = count(code, /<FormGuard[\s/>]/g) + count(code, /name=["']website["']/g);
    const local = count(code, /data-form-local/g);
    const status = guard >= nForm ? 'honeypot' : guard + local >= nForm ? (guard ? 'honeypot+local' : 'local') : 'MANQUANT';
    forms.push({ file: r, forms: nForm, status });
    if (guard + local < nForm) violations.push(`${r} : ${nForm} <form, ${guard} honeypot, ${local} data-form-local (champ \`website\` ou <FormGuard /> manquant)`);
  }
  const postsToApi = new RegExp(`fetch\\(\\s*[^)]*['"\`]/api/(${FORM_ENDPOINTS})`).test(code);
  if (postsToApi && !/website|new FormData\(/.test(code)) {
    violations.push(`${r} : fetch vers un endpoint de formulaire sans envoyer \`website\` (ni FormData)`);
  }
}

// Endpoints.
const apiDir = join(SRC, 'pages', 'api');
const serverFiles = readdirSync(apiDir).filter((n) => n.endsWith('.ts')).map((n) => join(apiDir, n));
serverFiles.push(join(SRC, 'lib', 'lead-magnet-delivery.ts'));
const endpoints = [];
for (const f of serverFiles) {
  const r = rel(f);
  const s = readFileSync(f, 'utf8');
  const readsBody = /request\.json\(|formData\(|safeParse\(/.test(s);
  if (!readsBody) continue; // healthcheck, og.png
  const iBot = s.indexOf('isBotSubmission(');
  const iDelegate = s.indexOf('processLeadMagnet(');
  const iParse = s.indexOf('.safeParse(');
  if (iBot === -1 && iDelegate === -1) {
    violations.push(`${r} : endpoint de formulaire sans isBotSubmission( (champ piège \`website\` non testé)`);
    endpoints.push({ file: r, status: 'MANQUANT' });
  } else if (iBot !== -1 && iParse !== -1 && iBot > iParse) {
    violations.push(`${r} : isBotSubmission( appelé APRÈS .safeParse( (le robot doit être écarté avant toute validation)`);
    endpoints.push({ file: r, status: 'ORDRE' });
  } else endpoints.push({ file: r, status: iBot !== -1 ? 'isBotSubmission' : 'délègue à processLeadMagnet' });
}

console.log(`Formulaires (${forms.length} fichiers) :`);
for (const f of forms) console.log(`  ${f.status.padEnd(15)} ${f.file} (${f.forms} <form)`);
console.log(`Endpoints (${endpoints.length}) :`);
for (const e of endpoints) console.log(`  ${e.status.padEnd(26)} ${e.file}`);

if (violations.length) {
  console.error(`\nGate FAIL : ${violations.length} violation(s) honeypot.\n`);
  for (const v of violations) console.error('  - ' + v);
  console.error('\nUtiliser <FormGuard /> (src/components/ui/atoms/FormGuard.astro) dans le <form>, et isBotSubmission() (src/lib/honeypot.ts) dans l\'endpoint avant toute validation.');
  process.exit(1);
}
console.log(`\nPASS - ${forms.length} fichiers à formulaire et ${endpoints.length} endpoints couverts.`);
