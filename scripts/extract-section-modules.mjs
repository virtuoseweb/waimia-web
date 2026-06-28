#!/usr/bin/env node
/**
 * extract-section-modules.mjs
 * Waimia · Co-location DS (Wave #38, T5) · extracteur one-shot des sections legacy
 *
 * Découpe les 3 god-files (src/schemas/sections.ts, src/lib/section-demos.ts,
 * src/lib/section-registry.ts) en modules co-localisés `src/sections/<type>/`, à la
 * forme EXACTE des 3 pilotes (media-bento, hero-social-proof, eeat-panel). Pour chaque
 * type NON migré, il émet :
 *   - schema.ts   : le `z.object({...})` du type, SANS le wrapper discriminatedUnion,
 *                   `import { z } from 'astro:content'` + imports résolus (sous-schemas,
 *                   enums/mixin partagés, helpers locaux co-localisés dans _shared/locals).
 *   - demo.ts     : la donnée démo bilingue du type (export `demo: DemoData`).
 *   - meta.ts     : le descriptor registry SANS `component` (SectionMeta).
 *   - index.ts    : point d'agrégation `export default { id, schema, demo, meta, Component }`.
 *   - Component.astro : déplacé depuis src/components/sections/<X>.astro (imports relatifs
 *                   corrigés : la profondeur passe de components/sections/ à sections/<type>/).
 *
 * Les 32 helpers locaux de sections.ts (relatedCardSchema, logoWallItemSchema, ...) sont
 * extraits UNE FOIS dans src/sections/_shared/locals.ts (rule 60 : déplacer, pas dupliquer),
 * et chaque module importe ceux qu'il référence.
 *
 * Méthode d'introspection / extraction : parsing STATIQUE par équilibrage d'accolades
 * (pas d'import() runtime - les god-files importent astro:content + .astro). Déterministe,
 * idempotent (skip si le module existe déjà), tri alphabétique, 0 U+2014 (rule 58).
 *
 * Lancement : `node scripts/extract-section-modules.mjs` (one-shot, T5).
 */

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const SCHEMA_FILE = path.join(repoRoot, 'src/schemas/sections.ts');
const DEMOS_FILE = path.join(repoRoot, 'src/lib/section-demos.ts');
const REGISTRY_FILE = path.join(repoRoot, 'src/lib/section-registry.ts');
const SECTIONS_DIR = path.join(repoRoot, 'src/sections');
const COMPONENTS_DIR = path.join(repoRoot, 'src/components/sections');
const SHARED_DIR = path.join(SECTIONS_DIR, '_shared');

// Pilotes déjà migrés (ne pas re-extraire).
const PILOTS = new Set(['media-bento', 'hero-social-proof', 'eeat-panel']);

// Vocabulaire partagé exporté par _shared/base.ts (enums + placement + sectionBaseSchema).
const SHARED_BASE_EXPORTS = new Set(
  fs
    .readFileSync(path.join(SHARED_DIR, 'base.ts'), 'utf8')
    .split('\n')
    .map((l) => /^export const ([A-Za-z0-9]+)/.exec(l))
    .filter(Boolean)
    .map((m) => m[1]),
);
// Vocabulaire partagé exporté par _shared/subschemas.ts.
const SHARED_SUBSCHEMA_EXPORTS = new Set(
  fs
    .readFileSync(path.join(SHARED_DIR, 'subschemas.ts'), 'utf8')
    .split('\n')
    .map((l) => /^export const ([A-Za-z0-9]+)/.exec(l))
    .filter(Boolean)
    .map((m) => m[1]),
);

// ─── Utilitaires de parsing par accolades ───
function matchBrace(src, openIdx, open = '{', close = '}') {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === open) depth++;
    else if (src[i] === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}
function matchParen(src, openIdx) {
  return matchBrace(src, openIdx, '(', ')');
}

const camel = (kebab) => kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const pascal = (kebab) => {
  const c = camel(kebab);
  return c.charAt(0).toUpperCase() + c.slice(1);
};
const toPosix = (p) => p.split(path.sep).join('/');

// ─── 1. Extraction des helpers locaux de sections.ts → _shared/locals.ts ───
// Un helper local = `const <name> = z.<...>(...)` au top-level (pas export, pas type block,
// pas sectionWithAnchorSchema/sectionSchema). On les capture par équilibrage.
// Agrégats qui dépendent du discriminatedUnion → restent dans le god-file/generated.
const HELPER_EXCLUDE = new Set(['sectionWithAnchorSchema', 'sectionSchema', 'sectionsArraySchema']);
function extractLocalHelpers(schemaSrc) {
  const helpers = [];
  // Capture les helpers `const` ET `export const` qui sont des z.* SANS discriminant `type`.
  const re = /^(?:export )?const ([A-Za-z0-9_]+) = z\./gm;
  let m;
  while ((m = re.exec(schemaSrc)) !== null) {
    const name = m[1];
    if (HELPER_EXCLUDE.has(name)) continue; // agrégats → restent god-file
    // Vérifier que ce n'est PAS un type-block (les type-blocks ont un type literal).
    {
      let i = m.index, dc = 0, db = 0, e = -1;
      for (; i < schemaSrc.length; i++) {
        const c = schemaSrc[i];
        if (c === '(') dc++; else if (c === ')') dc--;
        else if (c === '{') db++; else if (c === '}') db--;
        else if (c === ';' && dc === 0 && db === 0) { e = i; break; }
      }
      if (e !== -1 && /type:\s*z\.literal/.test(schemaSrc.slice(m.index, e + 1))) continue;
    }
    // Capture jusqu'au `;` terminal du statement, en équilibrant ( ) et { }.
    const start = m.index;
    let i = m.index;
    let depthC = 0;
    let depthB = 0;
    let end = -1;
    for (; i < schemaSrc.length; i++) {
      const ch = schemaSrc[i];
      if (ch === '(') depthC++;
      else if (ch === ')') depthC--;
      else if (ch === '{') depthB++;
      else if (ch === '}') depthB--;
      else if (ch === ';' && depthC === 0 && depthB === 0) {
        end = i;
        break;
      }
    }
    if (end === -1) throw new Error(`Helper local « ${name} » : fin de statement introuvable.`);
    // Inclure le commentaire de ligne précédent immédiat (documentation).
    helpers.push({ name, code: schemaSrc.slice(start, end + 1) });
  }
  return helpers;
}

// ─── 2. Map type-id → bloc schema (export const <var> = z.object({ type: z.literal('id') ... })) ───
function extractSchemaBlocks(schemaSrc) {
  const blocks = new Map(); // id -> { varName, code }
  const re = /export const ([A-Za-z0-9_]+) = z\.object\(\{/g;
  let m;
  while ((m = re.exec(schemaSrc)) !== null) {
    const varName = m[1];
    const objOpen = schemaSrc.indexOf('{', m.index + m[0].length - 1);
    const objClose = matchBrace(schemaSrc, objOpen);
    if (objClose === -1) throw new Error(`Bloc schema « ${varName} » : accolade non équilibrée.`);
    const body = schemaSrc.slice(objOpen + 1, objClose);
    const litMatch = /type:\s*z\.literal\(\s*['"]([a-z0-9-]+)['"]\s*\)/.exec(body);
    if (!litMatch) continue; // pas un type-block (pas de discriminant) → ignorer
    const id = litMatch[1];
    // Statement complet : de `export const` au `)` de z.object( ... ) + `;`
    const stmtEnd = schemaSrc.indexOf(';', objClose);
    const code = schemaSrc.slice(m.index, stmtEnd + 1);
    blocks.set(id, { varName, code });
  }
  return blocks;
}

// ─── 3. Map type-id → bloc demo (clé top-level de SECTION_DEMOS) ───
// Une entrée : `'id': { ... }` (objet inline) OU `'id': aliasDemo` (pilote, on ignore).
function extractDemoBlocks(demosSrc) {
  const open = demosSrc.indexOf('export const SECTION_DEMOS');
  const braceOpen = demosSrc.indexOf('{', open);
  const braceClose = matchBrace(demosSrc, braceOpen);
  const body = demosSrc.slice(braceOpen + 1, braceClose);
  const blocks = new Map(); // id -> objectLiteralCode (sans la clé)
  const re = /(^|\n)([ \t]*)['"]([a-z0-9-]+)['"]\s*:\s*\{/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const id = m[3];
    const objOpen = body.indexOf('{', m.index + m[0].length - 1);
    const objClose = matchBrace(body, objOpen);
    if (objClose === -1) throw new Error(`Bloc demo « ${id} » : accolade non équilibrée.`);
    blocks.set(id, body.slice(objOpen, objClose + 1));
  }
  return blocks;
}

// ─── 4. Map type-id → descriptor registry + import composant ───
function extractRegistryData(registrySrc) {
  // 4a. Imports composants : name -> astro filename
  const importByName = new Map();
  const reImp = /^import ([A-Za-z0-9_]+) from '\.\.\/components\/sections\/([A-Za-z0-9_]+)\.astro';/gm;
  let im;
  while ((im = reImp.exec(registrySrc)) !== null) importByName.set(im[1], im[2]);

  // 4b. Bloc SECTIONS
  const open = registrySrc.indexOf('export const SECTIONS');
  const braceOpen = registrySrc.indexOf('{', open);
  const braceClose = matchBrace(registrySrc, braceOpen);
  const body = registrySrc.slice(braceOpen + 1, braceClose);

  const descByIdInline = new Map(); // id -> { componentName, fields[] } pour descriptors inline
  const re = /(^|\n)([ \t]*)['"]([a-z0-9-]+)['"]\s*:\s*\{/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    const id = m[3];
    const objOpen = body.indexOf('{', m.index + m[0].length - 1);
    const objClose = matchBrace(body, objOpen);
    const inner = body.slice(objOpen + 1, objClose);
    const compMatch = /component:\s*([A-Za-z0-9_]+)\s*,?/.exec(inner);
    const componentName = compMatch ? compMatch[1] : null;
    // Retirer la ligne component: + un éventuel spread ...xxxMeta (pilotes) ; garder le reste.
    descByIdInline.set(id, { componentName, inner });
  }
  return { importByName, descByIdInline };
}

// ─── Détection des dépendances référencées dans un bout de code ───
function referencedIdents(code, candidates) {
  const found = new Set();
  for (const name of candidates) {
    const re = new RegExp(`\\b${name}\\b`);
    if (re.test(code)) found.add(name);
  }
  return found;
}

// Tri topologique des helpers locaux (deps avant dependents), alpha en départage.
function topoSortHelpers(helpers, helperNames) {
  const byName = new Map(helpers.map((h) => [h.name, h]));
  const deps = new Map(); // name -> Set(deps internes)
  for (const h of helpers) {
    const d = new Set();
    for (const other of helperNames) {
      if (other === h.name) continue;
      if (new RegExp(`\\b${other}\\b`).test(h.code)) d.add(other);
    }
    deps.set(h.name, d);
  }
  const out = [];
  const done = new Set();
  const names = [...helperNames].sort((a, b) => a.localeCompare(b, 'en'));
  const visit = (name, stack = new Set()) => {
    if (done.has(name)) return;
    if (stack.has(name)) return; // cycle improbable → on stoppe (ordre alpha résiduel)
    stack.add(name);
    for (const dep of [...deps.get(name)].sort((a, b) => a.localeCompare(b, 'en'))) visit(dep, stack);
    stack.delete(name);
    if (!done.has(name)) {
      done.add(name);
      out.push(byName.get(name));
    }
  };
  for (const name of names) visit(name);
  return out;
}

function main() {
  const schemaSrc = fs.readFileSync(SCHEMA_FILE, 'utf8');
  const demosSrc = fs.readFileSync(DEMOS_FILE, 'utf8');
  const registrySrc = fs.readFileSync(REGISTRY_FILE, 'utf8');

  // GARDE : ce script est ONE-SHOT (T5). Après la bascule REPLACE, les god-files sont de minces
  // ré-exports (plus aucun bloc `z.object`) → re-lancer ne ferait rien d'utile et risquerait
  // d'écraser locals.ts avec 0 helper. On refuse alors clairement (sauf FORCE explicite).
  const looksMigrated = !/z\.discriminatedUnion\(/.test(schemaSrc) || /sections\.generated/.test(schemaSrc);
  if (looksMigrated && process.env.FORCE_EXTRACT !== '1') {
    console.error(
      'extract-section-modules : les god-files semblent DEJA migrés (mode REPLACE actif).\n' +
        'Ce script est one-shot. Pour ré-extraire depuis un état legacy, restaure les god-files\n' +
        'd\'origine puis relance avec FORCE_EXTRACT=1.',
    );
    process.exit(2);
  }

  const localHelpers = extractLocalHelpers(schemaSrc);
  const localHelperNames = new Set(localHelpers.map((h) => h.name));
  const schemaBlocks = extractSchemaBlocks(schemaSrc);
  const demoBlocks = extractDemoBlocks(demosSrc);
  const { importByName, descByIdInline } = extractRegistryData(registrySrc);

  // ── Compter combien de type-ids partagent chaque .astro (composant partagé) ──
  // Un .astro utilise par >1 type NE peut PAS etre deplace 1:1 dans un module : il reste
  // dans src/components/sections/ et chaque module porte un Component.astro WRAPPER (pass-through).
  const astroUsageCount = new Map();
  for (const [, desc] of descByIdInline) {
    if (!desc.componentName) continue;
    const af = importByName.get(desc.componentName);
    if (!af) continue;
    astroUsageCount.set(af, (astroUsageCount.get(af) ?? 0) + 1);
  }

  // ── Écrire _shared/locals.ts (tri alpha, single source) ──
  // Chaque helper peut référencer des sous-schemas/enums partagés OU d'autres helpers.
  const allLocalsCandidates = new Set([
    ...SHARED_SUBSCHEMA_EXPORTS,
    ...localHelperNames,
  ]);
  const localsImportsSub = new Set();
  const localsImportsBase = new Set();
  let needZodInLocals = false;
  for (const h of localHelpers) {
    if (/\bz\./.test(h.code)) needZodInLocals = true;
    for (const dep of referencedIdents(h.code, allLocalsCandidates)) {
      if (dep === h.name) continue;
      if (SHARED_SUBSCHEMA_EXPORTS.has(dep)) localsImportsSub.add(dep);
    }
    for (const dep of referencedIdents(h.code, SHARED_BASE_EXPORTS)) localsImportsBase.add(dep);
  }
  // Tri TOPOLOGIQUE (un helper qui en référence un autre doit être émis APRES sa dépendance),
  // alpha comme départage déterministe. Sans ça : `const X = z...(Y)` avant Y → TDZ au build.
  const sortedHelpers = topoSortHelpers(localHelpers, localHelperNames);
  let localsOut = `// Waimia · Co-location DS (Wave #38, T5) · feuille partagee PURE · helpers locaux\n`;
  localsOut += `//\n`;
  localsOut += `// Sous-schemas helper EXTRAITS one-shot depuis src/schemas/sections.ts (rule 60 :\n`;
  localsOut += `// deplaces, pas dupliques). Source unique reimportee par les modules qui les referencent.\n`;
  localsOut += `// FEUILLE PURE : n'importe que z + les sous-schemas/enums partages. 0 import de type-block.\n\n`;
  if (needZodInLocals) localsOut += `import { z } from 'astro:content';\n`;
  if (localsImportsSub.size) {
    localsOut += `import { ${[...localsImportsSub].sort().join(', ')} } from './subschemas';\n`;
  }
  if (localsImportsBase.size) {
    localsOut += `import { ${[...localsImportsBase].sort().join(', ')} } from './base';\n`;
  }
  localsOut += `\n`;
  for (const h of sortedHelpers) {
    // Re-exporter (export const) pour import nommé depuis les modules.
    // h.code peut déjà commencer par `export ` (helpers exportés) → ne pas doubler.
    const codeNoExport = h.code.replace(/^export\s+/, '');
    localsOut += `export ${codeNoExport}\n\n`;
  }
  fs.writeFileSync(path.join(SHARED_DIR, 'locals.ts'), localsOut);
  console.log(`_shared/locals.ts ecrit : ${sortedHelpers.length} helpers.`);

  // ── Pour chaque type non migré, émettre le module ──
  const candidatesForSchema = new Set([
    ...SHARED_BASE_EXPORTS,
    ...SHARED_SUBSCHEMA_EXPORTS,
    ...localHelperNames,
  ]);

  let created = 0;
  const ids = [...schemaBlocks.keys()].sort((a, b) => a.localeCompare(b, 'en'));
  const report = { skipped: [], missing: [], created: [] };

  for (const id of ids) {
    if (PILOTS.has(id)) {
      report.skipped.push(id);
      continue;
    }
    const moduleDir = path.join(SECTIONS_DIR, id);
    if (fs.existsSync(path.join(moduleDir, 'index.ts'))) {
      report.skipped.push(id);
      continue;
    }
    const sBlock = schemaBlocks.get(id);
    const dBlock = demoBlocks.get(id);
    const desc = descByIdInline.get(id);
    if (!desc || !desc.componentName) {
      report.missing.push(`${id} (descriptor/component introuvable)`);
      continue;
    }
    const astroFile = importByName.get(desc.componentName);
    if (!astroFile) {
      report.missing.push(`${id} (import .astro introuvable pour ${desc.componentName})`);
      continue;
    }
    const astroSrcPath = path.join(COMPONENTS_DIR, `${astroFile}.astro`);
    if (!fs.existsSync(astroSrcPath)) {
      report.missing.push(`${id} (fichier .astro absent : ${astroFile}.astro)`);
      continue;
    }

    fs.mkdirSync(moduleDir, { recursive: true });

    // ── schema.ts ──
    // Renommer la const en `schema` (export const schema = z.object({...})).
    let schemaBody = sBlock.code.replace(
      new RegExp(`^export const ${sBlock.varName} = z\\.object\\(\\{`),
      'export const schema = z.object({',
    );
    // Résoudre les imports nécessaires.
    const refs = referencedIdents(schemaBody, candidatesForSchema);
    const fromBase = [...refs].filter((r) => SHARED_BASE_EXPORTS.has(r)).sort();
    const fromSub = [...refs].filter((r) => SHARED_SUBSCHEMA_EXPORTS.has(r)).sort();
    const fromLocals = [...refs].filter((r) => localHelperNames.has(r)).sort();
    let schemaOut = `// Waimia · Co-location DS (Wave #38, T5) · module \`${id}\` · schema (extrait)\n`;
    schemaOut += `// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.\n`;
    schemaOut += `// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.\n\n`;
    schemaOut += `import { z } from 'astro:content';\n`;
    if (fromBase.length) schemaOut += `import { ${fromBase.join(', ')} } from '../_shared/base';\n`;
    if (fromSub.length) schemaOut += `import { ${fromSub.join(', ')} } from '../_shared/subschemas';\n`;
    if (fromLocals.length) schemaOut += `import { ${fromLocals.join(', ')} } from '../_shared/locals';\n`;
    schemaOut += `\n${schemaBody}\n`;
    fs.writeFileSync(path.join(moduleDir, 'schema.ts'), schemaOut);

    // ── demo.ts ──
    let demoOut = `// Waimia · Co-location DS (Wave #38, T5) · module \`${id}\` · demo bilingue (extrait)\n`;
    demoOut += `// DEPLACE depuis src/lib/section-demos.ts (rule 60).\n\n`;
    demoOut += `import type { DemoData } from '../../lib/section-demos';\n\n`;
    if (dBlock) {
      demoOut += `export const demo: DemoData = ${dBlock};\n`;
    } else {
      // Pas de demo dédiée → objet minimal { type } (drift-safe, touchpoints réinjecte la clé).
      demoOut += `export const demo: DemoData = { type: '${id}' };\n`;
    }
    fs.writeFileSync(path.join(moduleDir, 'demo.ts'), demoOut);

    // ── meta.ts ──
    // Le descriptor inline contient component: X + les champs SectionMeta. On retire la
    // ligne component: et un eventuel spread ...xxxMeta (deja migre, ne devrait pas arriver ici).
    let metaInner = desc.inner
      .replace(/\n?[ \t]*component:\s*[A-Za-z0-9_]+\s*,?/, '')
      .replace(/\n?[ \t]*\.\.\.[A-Za-z0-9_]+Meta\s*,?/, '');
    metaInner = metaInner.replace(/^\n+/, '').replace(/\n+$/, '');
    let metaOut = `// Waimia · Co-location DS (Wave #38, T5) · module \`${id}\` · meta (extrait)\n`;
    metaOut += `// DEPLACE depuis src/lib/section-registry.ts (rule 60). SectionMeta = descriptor SANS component/usage.\n\n`;
    metaOut += `import type { SectionMeta } from '../_shared/types';\n\n`;
    metaOut += `export const meta: SectionMeta = {\n${metaInner}\n};\n`;
    fs.writeFileSync(path.join(moduleDir, 'meta.ts'), metaOut);

    // ── Component.astro ──
    // Cas SOLO (1 seul type utilise ce .astro) : DEPLACER le fichier dans le module + corriger
    //   les imports relatifs (la profondeur reste 2-sous-src, branche sections/ au lieu de
    //   components/sections/).
    // Cas PARTAGE (>1 type) : le .astro RESTE dans src/components/sections/ (source unique) ;
    //   le module porte un Component.astro WRAPPER pass-through (props data+lang). Le rendu est
    //   identique (registry invoque <Component data={...} lang={...} />, 0 slot) → parite manifest.
    const shared = (astroUsageCount.get(astroFile) ?? 0) > 1;
    if (shared) {
      const wrapper =
        `---\n` +
        `// Waimia · Co-location DS (Wave #38, T5) · module \`${id}\` · Component WRAPPER.\n` +
        `// Le composant ${astroFile} est PARTAGE par plusieurs types : il reste source unique\n` +
        `// dans src/components/sections/ (rule 60). Ce wrapper pass-through (data+lang, 0 slot)\n` +
        `// satisfait le contrat 5-fichiers du module sans dupliquer le markup.\n` +
        `import Shared from '../../components/sections/${astroFile}.astro';\n` +
        `---\n` +
        `<Shared data={Astro.props.data} lang={Astro.props.lang} />\n`;
      fs.writeFileSync(path.join(moduleDir, 'Component.astro'), wrapper);
    } else {
      let astroSrc = fs.readFileSync(astroSrcPath, 'utf8');
      astroSrc = rewriteAstroImports(astroSrc);
      fs.writeFileSync(path.join(moduleDir, 'Component.astro'), astroSrc);
      fs.rmSync(astroSrcPath, { force: true });
    }

    // ── index.ts ──
    const indexOut =
      `// Waimia · Co-location DS (Wave #38, T5) · module \`${id}\` · point d'agregation.\n` +
      `import { schema } from './schema';\n` +
      `import { demo } from './demo';\n` +
      `import { meta } from './meta';\n` +
      `import Component from './Component.astro';\n\n` +
      `export { schema } from './schema';\n` +
      `export { demo } from './demo';\n` +
      `export { meta } from './meta';\n` +
      `export { default as Component } from './Component.astro';\n\n` +
      `export default {\n  id: '${id}' as const,\n  schema,\n  demo,\n  meta,\n  Component,\n};\n`;
    fs.writeFileSync(path.join(moduleDir, 'index.ts'), indexOut);

    created++;
    report.created.push(id);
  }

  console.log(`\nModules crees : ${created}`);
  if (report.missing.length) {
    console.log(`\n!! Types non extraits (${report.missing.length}) :`);
    for (const x of report.missing) console.log('  - ' + x);
  }
  console.log(`Pilotes/skip : ${report.skipped.length} (${report.skipped.join(', ')})`);
}

// Corrige les imports relatifs d'un .astro deplace de components/sections/ vers sections/<id>/.
// Regle : la cible a la MEME profondeur (2 niveaux sous src) que l'origine, MAIS dans une
// branche differente (sections/ au lieu de components/sections/). Donc :
//   './X'        (meme dossier, src/components/sections) -> '../../components/sections/X'
//   '../X'       (src/components)                        -> '../../components/X'
//   '../../X'    (src)                                   -> '../../X'  (inchange : 2 niveaux = src)
//   '../../../X' (racine repo)                           -> '../../../X' (inchange)
// On ne touche QUE les imports/exports relatifs (from '...'), pas les chemins absolus/alias.
function rewriteAstroImports(src) {
  return src.replace(/from\s+(['"])(\.[^'"]+)\1/g, (full, q, rel) => {
    let out;
    if (rel.startsWith('./')) {
      out = '../../components/sections/' + rel.slice(2);
    } else if (rel.startsWith('../')) {
      // Compter les niveaux montants.
      const ups = (rel.match(/\.\.\//g) || []).length;
      const tail = rel.replace(/(\.\.\/)+/, '');
      if (ups === 1) {
        // src/components/<tail> -> '../../components/<tail>'
        out = '../../components/' + tail;
      } else {
        // ups>=2 : pointe vers src/ ou au-dessus → meme chemin (profondeur identique).
        out = rel;
      }
    } else {
      out = rel;
    }
    return `from ${q}${out}${q}`;
  });
}

main();
