// Waimia · Mission #39 · Génération des JSON Schema par collection composable.
//
// Produit `src/schemas/generated/<col>.page.schema.json` (1 par collection composable)
// DÉRIVÉ DU ZOD défini dans `src/content.config.ts`. C'est une donnée de build commitée,
// consommée par les fichiers de contenu `.json` (clé `$schema`) → autocomplétion humaine
// dans l'éditeur + contrat IA explicite.
//
// 1 SOURCE DE VÉRITÉ (rule 59) : le schéma reste défini UNE seule fois dans content.config.ts.
// Ici on l'IMPORTE (neutralisé) et on le SÉRIALISE en JSON Schema. Aucune duplication des
// définitions Zod.
//
// Méthode : content.config.ts importe `astro:content` (module virtuel non résoluble hors
// build) + `astro/loaders` + toute l'arborescence `src/schemas/**` et `src/sections/**` (qui
// importent `astro:content` de façon transitive). On reconstruit l'arborescence RELATIVE dans
// un répertoire temp, en rebindant chaque import virtuel vers un SHIM :
//   - `astro:content`  -> shim ré-exportant le `z` réel du repo + defineCollection (identité)
//                         + reference (placeholder z.string()).
//   - `astro/loaders`  -> shim exportant `glob` (no-op).
// defineCollection étant l'identité, `mod.collections.<key>.schema` est le schéma Zod brut.
//
// Sérialisation : `z.toJSONSchema(schema, { io: 'input', unrepresentable: 'any' })` (Zod 4.4.3).
//   - io:'input' = décrit ce que l'HUMAIN/IA ÉCRIT (avant coercion/defaults) : `z.coerce.date()`
//     accepte une string, les champs `.default()` deviennent optionnels. Bon contrat d'authoring.
//   - unrepresentable:'any' = ne throw pas sur un type non représentable.
//
// Lancement : `npx tsx scripts/gen-page-schemas.mjs` (depuis la racine du repo).
// Gate : `npx tsx scripts/check-page-schemas.mjs`.
// Déterministe, 0 U+2014 (rule 58).

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repoRoot = process.cwd();
const OUT_DIR = path.join(repoRoot, 'src/schemas/generated');

// Collections composables cibles. `fileName` = nom de FICHIER en kebab-case (et nom
// de dossier de contenu) ; `key` = clé dans l'export `collections` de content.config.ts.
// NB : la collection casUsages s'exporte sous la clé 'cas-usages' (cf content.config.ts).
export const TARGETS = [
  { fileName: 'offres', key: 'offres' },
  { fileName: 'services', key: 'services' },
  { fileName: 'lp', key: 'lp' },
  { fileName: 'cas-usages', key: 'cas-usages' },
  { fileName: 'diagnostics', key: 'diagnostics' },
  { fileName: 'audits', key: 'audits' },
];

// Charge content.config.ts neutralisé et renvoie { z, collections }.
async function loadConfigModule() {
  const reqFromRepo = createRequire(path.join(repoRoot, 'package.json'));
  const zodPath = reqFromRepo.resolve('zod');
  const { z } = await import(pathToFileURL(zodPath).href);

  const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'page-schemas-'));
  try {
    // Shims des modules virtuels Astro.
    const shimContent = path.join(tmpRoot, '__shim_astro_content.mjs');
    fs.writeFileSync(
      shimContent,
      [
        `export { z } from ${JSON.stringify(zodPath)};`,
        `import { z as _z } from ${JSON.stringify(zodPath)};`,
        `export const defineCollection = (config) => config;`,
        `export const reference = () => _z.string();`,
        '',
      ].join('\n'),
    );
    const shimLoaders = path.join(tmpRoot, '__shim_astro_loaders.mjs');
    fs.writeFileSync(shimLoaders, `export const glob = () => ({});\n`);

    const rebind = (code) =>
      code
        .replace(/from ['"]astro:content['"]/g, `from ${JSON.stringify(shimContent)}`)
        .replace(/from ['"]astro\/loaders['"]/g, `from ${JSON.stringify(shimLoaders)}`);

    // content.config.ts (racine src/) -> <tmp>/content.config.ts
    fs.writeFileSync(
      path.join(tmpRoot, 'content.config.ts'),
      rebind(fs.readFileSync(path.join(repoRoot, 'src/content.config.ts'), 'utf8')),
    );

    // Arborescences relatives importées (transitives) : src/schemas/** + src/sections/**.
    // On préserve la structure pour que les imports relatifs résolvent dans le temp.
    const copyTsTree = (srcDir, destDir) => {
      if (!fs.existsSync(srcDir)) return;
      fs.mkdirSync(destDir, { recursive: true });
      for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
        const from = path.join(srcDir, entry.name);
        const to = path.join(destDir, entry.name);
        if (entry.isDirectory()) copyTsTree(from, to);
        else if (entry.isFile() && entry.name.endsWith('.ts'))
          fs.writeFileSync(to, rebind(fs.readFileSync(from, 'utf8')));
      }
    };
    copyTsTree(path.join(repoRoot, 'src/schemas'), path.join(tmpRoot, 'schemas'));
    copyTsTree(path.join(repoRoot, 'src/sections'), path.join(tmpRoot, 'sections'));

    const mod = await import(pathToFileURL(path.join(tmpRoot, 'content.config.ts')).href);
    if (!mod?.collections) throw new Error('content.config.ts neutralisé : export `collections` introuvable.');
    return { z, collections: mod.collections };
  } finally {
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
}

// Extrait l'enum des noms de type de section depuis un JSON Schema complet (forme
// `sections.items.allOf[0].oneOf[i].properties.type.const`). Trié + dédupliqué.
// Le discriminant `type` est un littéral par option de la discriminatedUnion.
function extractSectionTypeEnum(fullSchema) {
  const items = fullSchema?.properties?.sections?.items;
  const options = items?.allOf?.[0]?.oneOf ?? items?.oneOf ?? items?.anyOf ?? [];
  const names = new Set();
  for (const opt of options) {
    const t = opt?.properties?.type;
    const literal = t?.const ?? (Array.isArray(t?.enum) && t.enum.length === 1 ? t.enum[0] : undefined);
    if (typeof literal === 'string') names.add(literal);
  }
  return [...names].sort();
}

// Forme LÉGÈRE de `sections` : enveloppe de page uniquement. On NE réinjecte PAS les
// ~199 schémas de section (cela ferait ~1.5 Mo par fichier × 6 = bloat). Le contrat
// DÉTAILLÉ par type de section est servi ailleurs, volontairement hors de ce schéma :
//   - le serveur MCP catalogue (#41 : catalogue_get_section / ds_tokens)
//   - src/lib/section-slots.generated.json (contrat de slots par type)
// Ici on ne contraint que `type` (enum des noms valides) et on laisse passer le reste
// (`additionalProperties: true`) pour ne pas dupliquer le contrat de chaque section.
function lightSectionsSchema(typeEnum) {
  return {
    type: 'array',
    description:
      'Sections composables. Le contrat detaille par type est servi par le serveur MCP catalogue (#41) et section-slots.generated.json, hors de ce schema d enveloppe.',
    items: {
      type: 'object',
      required: ['type'],
      properties: {
        type: { type: 'string', enum: typeEnum },
      },
      additionalProperties: true,
    },
  };
}

// Construit la map { '<fileName>.page.schema.json': '<json string>' } EN MEMOIRE.
// Réutilisé par le gate (check-page-schemas.mjs) pour comparer sans réécrire le disque.
export async function buildPageSchemas() {
  const { z, collections } = await loadConfigModule();

  // L'enum des noms de type de section est IDENTIQUE pour les 6 collections
  // (toutes consomment la même `sectionsArraySchema`). On le dérive UNE fois.
  let sectionTypeEnum = null;

  const out = {};
  for (const { fileName, key } of TARGETS) {
    const col = collections[key];
    if (!col?.schema) throw new Error(`Collection « ${key} » : schéma Zod introuvable dans content.config.ts.`);
    const jsonSchema = z.toJSONSchema(col.schema, { io: 'input', unrepresentable: 'any' });

    if (sectionTypeEnum === null) {
      sectionTypeEnum = extractSectionTypeEnum(jsonSchema);
      if (sectionTypeEnum.length === 0)
        throw new Error('Aucun nom de type de section derive de la discriminatedUnion (forme inattendue).');
    }

    const { $schema, ...rest } = jsonSchema;
    // Post-traitement anti-bloat : remplacer `sections` (199 schemas inlines) par la
    // forme legere. Tous les autres champs (meta/taxonomie) restent pleinement decrits.
    if (rest.properties?.sections) rest.properties.sections = lightSectionsSchema(sectionTypeEnum);

    // En-tête lisible : $schema (draft) puis title humain, puis le corps dérivé.
    const titled = {
      $schema,
      title: `Waimia page document - ${fileName}`,
      ...rest,
    };
    out[`${fileName}.page.schema.json`] = JSON.stringify(titled, null, 2) + '\n';
  }
  return out;
}

async function main() {
  const files = await buildPageSchemas();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    const p = path.join(OUT_DIR, name);
    fs.writeFileSync(p, content);
    const bytes = Buffer.byteLength(content, 'utf8');
    console.log(`✓ ${path.relative(repoRoot, p)} (${bytes} octets)`);
  }
  console.log(`\n✓ ${Object.keys(files).length} JSON Schema générés dans ${path.relative(repoRoot, OUT_DIR)}.`);
}

// Exécuter uniquement si lancé directement (pas à l'import par le gate).
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main();
}
