#!/usr/bin/env node
/**
 * scaffold-section.mjs (v2) - Generateur de MODULES de section CO-LOCALISES (Wave #38).
 *
 * Reecriture complete : l'ancienne version ciblait les god-files disparus (schemas.ts 5k l,
 * section-presets.ts, snippets a coller). Le catalogue vit desormais en modules co-localises :
 *   - packages/ds-kernel/src/sections/<type>/schema.ts   (contrat Zod, cote kernel)
 *   - src/sections/<type>/{index.ts,meta.ts,demo.ts,Component.astro}   (facettes app)
 *   - scripts/section-order.json                          (ordre canonique registry/demos)
 * puis les 3 generateurs reconstruisent les fichiers .generated (registry/demos/union/slots/usage).
 *
 * USAGE :
 *   node scripts/scaffold-section.mjs <type> [--from <type-source>] [--dry-run] [--json]
 *
 *   <type>          SectionType kebab-case NOUVEAU et unique (ex. pricing-tiers).
 *   --from <src>    copie adaptee d'un module source existant (schema+demo+meta+Component)
 *                   avec renommage du discriminant `type`. Sans --from : squelette minimal
 *                   (heading/text + background optionnel).
 *   --dry-run       liste ce qui SERAIT ecrit, sans rien ecrire ni lancer de generateur.
 *   --json          sortie machine (JSON sur stdout, logs humains sur stderr) : utilise par
 *                   l'endpoint dev POST /api/ds/scaffold.
 *
 * Chaine de generation (apres ecriture, hors --dry-run) :
 *   1. node scripts/gen-section-aggregate.mjs   (FATAL) -> union + registry + demos .generated
 *   2. npx tsx scripts/derive-section-slots.mjs (best-effort : depend de tsx via npx)
 *   3. node scripts/gen-section-usage.mjs       (FATAL) -> usage reel .generated
 *
 * Contraintes : 0 dependance npm, deterministe, 0 U+2014 (rule 58), 0 token DS nouveau
 * (le squelette CONSOMME des tokens existants : --space-4, --text-small, --muted, --paper*, --ink).
 */

import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MODULES_DIR = join(ROOT, 'src/sections');
const KERNEL_SECTIONS_DIR = join(ROOT, 'packages/ds-kernel/src/sections');
const ORDER_FILE = join(ROOT, 'scripts/section-order.json');

// Noms interdits : collisions avec des dossiers techniques / feuilles partagees, ou identifiants
// qui casseraient la co-location (le codegen scanne src/sections/* en excluant _shared).
const RESERVED = new Set([
  'shared', 'index', 'default', 'type', 'schema', 'demo', 'meta', 'component',
  'sections', 'base', 'types', 'subschemas', 'locals', 'registry',
]);

// ─── helpers casse (miroir de gen-section-aggregate.mjs : camel identique) ───
const isKebab = (s) => /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(s);

// ─── args ───
function parseArgs(argv) {
  const out = { type: null, from: null, dryRun: false, json: false };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--dry-run') out.dryRun = true;
    else if (a === '--json') out.json = true;
    else if (a === '--from') out.from = rest[++i];
    else if (a.startsWith('--from=')) out.from = a.slice('--from='.length);
    else if (a.startsWith('--')) throw new Error(`option inconnue : ${a}`);
    else if (out.type === null) out.type = a;
    else throw new Error(`argument superflu : ${a}`);
  }
  return out;
}

// ─── contenus MINIMAL (sans --from) ───
function minimalSchema(type) {
  return `// Waimia · Co-location DS · module \`${type}\` · schema (scaffold minimal).
// z.object SANS discriminatedUnion. \`z\` vient de 'zod' (comme tous les schemas kernel).
// background optionnel = variante ink systematique (directive dark). A etoffer via le DS Studio.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('${type}'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  heading_fr: z.string(),
  heading_en: z.string(),
  text_fr: z.string().optional(),
  text_en: z.string().optional(),
});
`;
}

function minimalMeta(type) {
  return `// Waimia · Co-location DS · module \`${type}\` · meta (scaffold minimal).
// SectionMeta = descriptor SANS component/usage. Facettes valides (section-facets.ts).
// status 'wip' : squelette a etoffer (layouts/atomes) avant passage 'stable'.

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'Content Sections',
  categorySlug: 'content-sections',
  family: 'prose',
  intent: ['explain-concept'],
  pageRole: ['body'],
  contentMode: 'instance',
  effects: ['static'],
  interactions: ['none'],
  elements: [],
  layoutFacets: ['centered'],
  tags: ['${type}', 'scaffold'],
  status: 'wip',
  description_fr: 'Section generee par scaffold : titre et texte, variante ink. A etoffer.',
  description_en: 'Scaffolded section: heading and text, ink variant. To be extended.',
};
`;
}

function minimalDemo(type) {
  return `// Waimia · Co-location DS · module \`${type}\` · demo bilingue (scaffold minimal).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: '${type}',
  background: 'paper',
  heading_fr: 'Titre de section <i>exemple</i>',
  heading_en: 'Example section <i>heading</i>',
  text_fr: 'Texte de demonstration pour la section generee par le scaffolder.',
  text_en: 'Demo copy for the scaffolded section.',
};
`;
}

function minimalComponent(type) {
  return `---
// Section catalogue · ${type} (scaffold minimal)
// Placeholder genere par scripts/scaffold-section.mjs : titre + texte, variante ink.
// Consomme des tokens/classes DS existants (sec-base, wrap-wide, sec-base-h2). A etoffer.
import type { SectionByType } from '@waimia/ds-kernel';

interface Props {
  data: SectionByType<'${type}'>;
  lang: 'fr' | 'en';
}

const { data, lang } = Astro.props;
const isFr = lang === 'fr';
const heading = isFr ? data.heading_fr : data.heading_en;
const text = isFr ? data.text_fr : data.text_en;
---

<section class="scf sec-base" data-bg={data.background}>
  <div class="wrap-wide scf__inner">
    <h2 class="sec-base-h2" set:html={heading} />
    {text && <p class="scf__text">{text}</p>}
  </div>
</section>

<style>
  .scf__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-width: 720px;
  }
  .scf__inner :global(h2 i) {
    font-style: italic;
  }
  .scf__text {
    font-family: var(--font-sans);
    font-size: var(--text-small);
    color: var(--muted);
    line-height: var(--leading-body);
    margin: 0;
  }
  .scf[data-bg='paper-2'] { background: var(--paper-2); }
  .scf[data-bg='paper-3'] { background: var(--paper-3); }
  .scf[data-bg='ink'] {
    background: var(--ink);
    color: var(--paper);
  }
  .scf[data-bg='ink'] :is(h2, p) { color: var(--paper); }
</style>
`;
}

// index.ts identique quel que soit le mode (minimal ou --from) : le schema vient du kernel.
function indexContent(type) {
  return `// Waimia · Co-location DS · module \`${type}\` · point d'agregation (scaffold).
import { schema } from '@waimia/ds-kernel/sections/${type}/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/${type}/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: '${type}' as const,
  schema,
  demo,
  meta,
  Component,
};
`;
}

// ─── contenus --from (copie adaptee d'un module source) ───
const scaffoldHeader = (type, src, facet) =>
  `// Waimia · Co-location DS · module \`${type}\` · ${facet} (scaffold --from ${src}).\n`;

function fromSchema(type, src) {
  const p = join(KERNEL_SECTIONS_DIR, src, 'schema.ts');
  let body = readFileSync(p, 'utf8');
  // Renommage du discriminant : z.literal('<src>') -> z.literal('<type>').
  const re = new RegExp(`z\\.literal\\(\\s*['"]${src}['"]\\s*\\)`, 'g');
  if (!re.test(body)) throw new Error(`schema source ${src} : z.literal('${src}') introuvable (copie impossible)`);
  body = body.replace(re, `z.literal('${type}')`);
  return scaffoldHeader(type, src, 'schema') + stripLeadingComment(body);
}

function fromDemo(type, src) {
  const p = join(MODULES_DIR, src, 'demo.ts');
  let body = readFileSync(p, 'utf8');
  const re = new RegExp(`(type\\s*:\\s*)['"]${src}['"]`, 'g');
  if (!re.test(body)) throw new Error(`demo source ${src} : "type: '${src}'" introuvable (copie impossible)`);
  body = body.replace(re, `$1'${type}'`);
  return scaffoldHeader(type, src, 'demo') + stripLeadingComment(body);
}

function fromMeta(type, src) {
  const p = join(MODULES_DIR, src, 'meta.ts');
  const body = readFileSync(p, 'utf8');
  // meta n'a pas de discriminant `type` : copie verbatim (facettes source garanties valides).
  return scaffoldHeader(type, src, 'meta') + stripLeadingComment(body);
}

function fromComponent(type, src) {
  const p = join(MODULES_DIR, src, 'Component.astro');
  let body = readFileSync(p, 'utf8');
  // Seule adaptation : le generique de type SectionByType<'src'> -> <'type'> (typecheck).
  // On NE touche PAS au reste (classes CSS scopees Astro, imports relatifs meme profondeur).
  const re = new RegExp(`SectionByType<\\s*['"]${src}['"]\\s*>`, 'g');
  body = body.replace(re, `SectionByType<'${type}'>`);
  return body;
}

// Retire un unique bloc de commentaires de tete (lignes // consecutives + ligne vide) pour eviter
// un double en-tete quand on prefixe notre propre header. Conserve tout le reste a l'identique.
function stripLeadingComment(src) {
  const lines = src.split('\n');
  let i = 0;
  while (i < lines.length && lines[i].startsWith('//')) i++;
  while (i < lines.length && lines[i].trim() === '') i++;
  return lines.slice(i).join('\n');
}

// ─── ecriture d'un fichier (mkdir -p) ───
const rel = (abs) => abs.slice(ROOT.length + 1);
function writeFileTracked(abs, content, created) {
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content, 'utf8');
  created.push(rel(abs));
}

// ─── section-order.json : insertion (apres src si --from, sinon en fin) ───
function readOrder() {
  const arr = JSON.parse(readFileSync(ORDER_FILE, 'utf8'));
  if (!Array.isArray(arr)) throw new Error('section-order.json : tableau attendu');
  return arr;
}
function insertOrder(order, type, from) {
  const next = order.slice();
  const at = from ? next.indexOf(from) : -1;
  if (at >= 0) next.splice(at + 1, 0, type);
  else next.push(type);
  return next;
}

// ─── generateurs ───
function runGen(log, label, cmd, args, fatal) {
  try {
    execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    log(`  OK   ${label}`);
    return { label, ok: true };
  } catch (e) {
    const detail = String((e.stderr || '') + (e.stdout || '') || e.message || '')
      .split('\n').filter(Boolean).slice(-3).join(' | ');
    log(`  ${fatal ? 'FAIL' : 'WARN'} ${label} : ${detail}`);
    if (fatal) {
      const err = new Error(`generateur en echec (${label}) : ${detail}`);
      err.fatalGen = true;
      throw err;
    }
    return { label, ok: false };
  }
}

// Sortie machine (--json) vs humaine. code = exit code.
function emit(json, payload, code = 0, humanMsg = null) {
  if (json) process.stdout.write(JSON.stringify(payload));
  else if (payload.ok) process.stdout.write(`OK  scaffold « ${payload.type} » : ${payload.created.length} fichier(s).\n`);
  else process.stderr.write(`FAIL ${humanMsg || payload.error}\n`);
  process.exit(code);
}

// Abandon precoce (validation) : ok:false uniforme.
function abort(json, error) {
  if (json) process.stdout.write(JSON.stringify({ ok: false, error }));
  else process.stderr.write(`FAIL ${error}\n`);
  process.exit(1);
}

// ─── main ───
function main() {
  let opts;
  try {
    opts = parseArgs(process.argv);
  } catch (e) {
    return abort(process.argv.includes('--json'), e.message);
  }
  const { type, from, dryRun, json } = opts;

  const log = (m) => (json ? process.stderr : process.stdout).write(m + '\n');
  const abortHere = (msg) => abort(json, msg);

  // 1. Validation type
  if (!type) return abortHere('type manquant. Usage : scaffold-section.mjs <type> [--from <src>] [--dry-run] [--json]');
  if (!isKebab(type)) return abortHere(`type invalide « ${type} » : kebab-case attendu (minuscules, chiffres, tirets simples).`);
  if (RESERVED.has(type)) return abortHere(`type reserve « ${type} » : nom interdit (collision technique).`);

  // 2. Unicite
  const order = readOrder();
  if (order.includes(type)) return abortHere(`type deja existant « ${type} » : present dans section-order.json.`);
  if (existsSync(join(MODULES_DIR, type))) return abortHere(`type deja existant « ${type} » : src/sections/${type}/ existe.`);
  if (existsSync(join(KERNEL_SECTIONS_DIR, type))) return abortHere(`type deja existant « ${type} » : packages/ds-kernel/src/sections/${type}/ existe.`);

  // 3. Source --from
  if (from) {
    if (!isKebab(from)) return abortHere(`--from invalide « ${from} » : kebab-case attendu.`);
    if (!order.includes(from)) return abortHere(`--from « ${from} » : type source inconnu (absent de section-order.json).`);
    if (!existsSync(join(MODULES_DIR, from, 'Component.astro'))) return abortHere(`--from « ${from} » : module source incomplet (Component.astro absent).`);
    if (!existsSync(join(KERNEL_SECTIONS_DIR, from, 'schema.ts'))) return abortHere(`--from « ${from} » : schema source absent (kernel).`);
  }

  // 4. Contenus
  let schemaSrc, metaSrc, demoSrc, compSrc;
  try {
    schemaSrc = from ? fromSchema(type, from) : minimalSchema(type);
    metaSrc = from ? fromMeta(type, from) : minimalMeta(type);
    demoSrc = from ? fromDemo(type, from) : minimalDemo(type);
    compSrc = from ? fromComponent(type, from) : minimalComponent(type);
  } catch (e) {
    return abortHere(e.message);
  }
  const idxSrc = indexContent(type);

  const plannedFiles = [
    `packages/ds-kernel/src/sections/${type}/schema.ts`,
    `src/sections/${type}/index.ts`,
    `src/sections/${type}/meta.ts`,
    `src/sections/${type}/demo.ts`,
    `src/sections/${type}/Component.astro`,
    'scripts/section-order.json',
  ];

  // 5. Dry-run : liste + sortie, 0 ecriture, 0 generateur.
  if (dryRun) {
    log(`[dry-run] scaffold « ${type} »${from ? ` (--from ${from})` : ' (squelette minimal)'} :`);
    for (const f of plannedFiles) log(`  + ${f}`);
    log(`  ordre : ${from ? `apres « ${from} »` : 'en fin de section-order.json'}`);
    log('  (aucune ecriture, aucun generateur lance)');
    return emit(json, { ok: true, dryRun: true, type, from: from || null, created: plannedFiles, generators: [] });
  }

  // 6. Ecriture reelle
  const created = [];
  try {
    writeFileTracked(join(KERNEL_SECTIONS_DIR, type, 'schema.ts'), schemaSrc, created);
    writeFileTracked(join(MODULES_DIR, type, 'index.ts'), idxSrc, created);
    writeFileTracked(join(MODULES_DIR, type, 'meta.ts'), metaSrc, created);
    writeFileTracked(join(MODULES_DIR, type, 'demo.ts'), demoSrc, created);
    writeFileTracked(join(MODULES_DIR, type, 'Component.astro'), compSrc, created);
    const nextOrder = insertOrder(order, type, from);
    writeFileSync(ORDER_FILE, JSON.stringify(nextOrder, null, 2) + '\n', 'utf8');
    created.push('scripts/section-order.json');
  } catch (e) {
    return abortHere(`ecriture echouee : ${e.message}`);
  }
  for (const f of created) log(`  + ${f}`);

  // 7. Generateurs (aggregate FATAL, derive best-effort, usage FATAL)
  log('generateurs :');
  const generators = [];
  try {
    generators.push(runGen(log, 'gen-section-aggregate', 'node', ['scripts/gen-section-aggregate.mjs'], true));
    generators.push(runGen(log, 'derive-section-slots', 'npx', ['tsx', 'scripts/derive-section-slots.mjs'], false));
    generators.push(runGen(log, 'gen-section-usage', 'node', ['scripts/gen-section-usage.mjs'], true));
  } catch (e) {
    return emit(json, { ok: false, error: e.message, type, created, generators }, 1, e.message);
  }

  return emit(json, { ok: true, dryRun: false, type, from: from || null, created, generators });
}

main();
