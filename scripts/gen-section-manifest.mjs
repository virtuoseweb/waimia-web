#!/usr/bin/env node
/**
 * gen-section-manifest.mjs
 * Waimia · Backlog B DS Health Audit
 *
 * Generates a machine-readable per-section listing of all registry types.
 * Inputs  : src/schemas/sections.ts + src/lib/section-registry.ts + src/components/sections/*.astro
 * Outputs : src/data/ds-section-manifest.json + docs/DS-SECTION-CATALOG.md
 *
 * Constraints :
 *   - Zero new npm dependencies (Node.js built-ins only)
 *   - Deterministic, idempotent, alpha-sorted everywhere, 0 timestamps
 *   - 0 em-dash U+2014 in any generated content (rule 58)
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SECTIONS_SCHEMA_FILE = 'src/schemas/sections.ts';
const REGISTRY_FILE = 'src/lib/section-registry.ts';
const LIBRARY_MANIFEST_FILE = 'src/lib/library-manifest.ts';
const TOKENS_FILE = 'src/styles/tokens.css';
const SECTIONS_DIR = 'src/components/sections';
const OUTPUT_JSON = 'src/data/ds-section-manifest.json';
const OUTPUT_MD = 'docs/DS-SECTION-CATALOG.md';

const collator = new Intl.Collator('en');
const alpha = (a, b) => collator.compare(a, b);

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

// ─── Token parsing (adapted from gen-ds-registry.mjs) ─────────────────────────

function parseTokens(source) {
  const tokens = new Map();
  for (const match of source.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:\s*([\s\S]*?);/gm)) {
    const [, name, rawValue] = match;
    if (tokens.has(name)) continue;
    const value = rawValue.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
    tokens.set(name, value);
  }
  return tokens;
}

// ─── Library manifest parsing (usage + consumers, docs/40 §3) ────────────────

/**
 * Parses src/lib/library-manifest.ts to extract per-type usage + consumers.
 * Resolves the only named consumer constant (SOLUTIONS_CONSUMERS) and the
 * USAGE_OVERRIDES map. Usage derives as: override ?? (consumers.length ? 'site' : 'library').
 * Returns Map<id, { usage, consumers }>.
 */
function parseLibraryManifest(source) {
  // Resolve named consumer arrays (e.g. const SOLUTIONS_CONSUMERS = [ '...', ... ];)
  const namedArrays = new Map();
  for (const m of source.matchAll(/const\s+([A-Z][A-Z0-9_]*)\s*=\s*\[([\s\S]*?)\];/g)) {
    const values = [...m[2].matchAll(/'([^']+)'/g)].map((v) => v[1]);
    namedArrays.set(m[1], values);
  }

  // Parse USAGE_OVERRIDES object body (may be empty)
  const overrides = new Map();
  const ovMatch = /USAGE_OVERRIDES[^=]*=\s*\{([\s\S]*?)\};/.exec(source);
  if (ovMatch) {
    for (const m of ovMatch[1].matchAll(/'?([a-z][a-z0-9-]*)'?\s*:\s*'(site|library)'/g)) {
      overrides.set(m[1], m[2]);
    }
  }

  // Isolate the SECTION_USAGE array body
  const startMatch = /const\s+SECTION_USAGE[^=]*=\s*\[/.exec(source);
  if (!startMatch) throw new Error('SECTION_USAGE not found in library-manifest');
  const arrStart = startMatch.index + startMatch[0].length - 1; // at '['
  let depth = 0;
  let arrEnd = -1;
  for (let i = arrStart; i < source.length; i++) {
    if (source[i] === '[') depth++;
    else if (source[i] === ']') {
      depth--;
      if (depth === 0) { arrEnd = i; break; }
    }
  }
  const body = source.slice(arrStart + 1, arrEnd);

  const result = new Map();
  // Each entry: { id: 'type', consumers: [...] | NAMED_CONST }
  // Balanced-bracket scan : un chemin consommateur peut contenir ']' littéral
  // (ex. routes dynamiques 'personas/[slug].astro') — un regex non-greedy
  // tronquerait au premier ']'. On parse l'array par profondeur.
  for (const m of body.matchAll(/id:\s*'([a-z][a-z0-9-]*)'\s*,\s*consumers:\s*/g)) {
    const id = m[1];
    let p = m.index + m[0].length;
    while (p < body.length && /\s/.test(body[p])) p++;
    let consumers;
    if (body[p] === '[') {
      let bd = 0;
      let end = -1;
      for (let i = p; i < body.length; i++) {
        if (body[i] === '[') bd++;
        else if (body[i] === ']') { bd--; if (bd === 0) { end = i; break; } }
      }
      const inner = body.slice(p + 1, end);
      consumers = [...inner.matchAll(/'([^']+)'/g)].map((v) => v[1]);
    } else {
      const nm = /^[A-Z][A-Z0-9_]*/.exec(body.slice(p));
      consumers = nm ? namedArrays.get(nm[0]) ?? [] : [];
    }
    const usage = overrides.get(id) ?? (consumers.length > 0 ? 'site' : 'library');
    result.set(id, { usage, consumers });
  }
  return result;
}

// ─── Registry parsing ─────────────────────────────────────────────────────────

/**
 * Parses section-registry.ts to extract:
 *   - import map: componentName -> filename (e.g. HeroSplit -> HeroSplit.astro)
 *   - SECTIONS entries: type -> { component (variable name), category, subcategory,
 *     categorySlug, tags, status, description_fr, description_en }
 */
function parseRegistry(source) {
  // Parse import statements: import ComponentName from '../components/sections/File.astro'
  const importMap = new Map(); // componentName -> filename (basename)
  for (const m of source.matchAll(/^import\s+(\w+)\s+from\s+'[^']*\/sections\/([^']+\.astro)'/gm)) {
    importMap.set(m[1], m[2]);
  }

  // Parse SECTIONS object entries
  // Pattern: 'type-id': { component: ComponentName, category: '...', ... }
  const entries = new Map();

  // Split into individual type blocks using a state machine approach
  // Find the SECTIONS object boundaries
  const sectionsStart = source.indexOf('export const SECTIONS');
  if (sectionsStart === -1) throw new Error('SECTIONS not found in registry');

  const objectStart = source.indexOf('{', sectionsStart);
  // Find matching closing brace
  let depth = 0;
  let objectEnd = -1;
  for (let i = objectStart; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) { objectEnd = i; break; }
    }
  }

  const objectBody = source.slice(objectStart + 1, objectEnd);

  // Find each top-level type entry: 'type-id': { ... }
  // Use matchAll to collect all key positions first (avoids off-by-one in pos arithmetic)
  for (const keyMatch of objectBody.matchAll(/'([a-z][a-z0-9-]*)'\s*:\s*\{/g)) {
    const typeId = keyMatch[1];
    // keyMatch[0] ends with '{' — blockStart points at that '{'
    const blockStart = keyMatch.index + keyMatch[0].length - 1;
    let d = 0;
    let blockEnd = -1;
    for (let i = blockStart; i < objectBody.length; i++) {
      if (objectBody[i] === '{') d++;
      else if (objectBody[i] === '}') {
        d--;
        if (d === 0) { blockEnd = i; break; }
      }
    }
    if (blockEnd === -1) continue;

    const block = objectBody.slice(blockStart + 1, blockEnd);

    // Extract fields
    const componentMatch = /component\s*:\s*(\w+)/.exec(block);
    const categoryMatch = /category\s*:\s*'([^']+)'/.exec(block);
    const subcategoryMatch = /subcategory\s*:\s*'([^']+)'/.exec(block);
    const categorySlugMatch = /categorySlug\s*:\s*'([^']+)'/.exec(block);
    const statusMatch = /status\s*:\s*'([^']+)'/.exec(block);
    const tagsMatch = /tags\s*:\s*\[([^\]]*)\]/.exec(block);
    const descFrMatch = /description_fr\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/.exec(block);
    const descEnMatch = /description_en\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/.exec(block);

    const componentName = componentMatch?.[1] ?? '';
    const tags = tagsMatch
      ? [...tagsMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]).sort(alpha)
      : [];

    entries.set(typeId, {
      componentName,
      componentFile: importMap.get(componentName) ?? componentName + '.astro',
      category: categoryMatch?.[1] ?? 'marketing',
      subcategory: subcategoryMatch?.[1] ?? '',
      categorySlug: categorySlugMatch?.[1] ?? '',
      tags,
      status: statusMatch?.[1] ?? 'stable',
      description_fr: (descFrMatch?.[1] ?? descFrMatch?.[2] ?? '').replace(/\\'/g, "'").replace(/\\"/g, '"'),
      description_en: (descEnMatch?.[1] ?? descEnMatch?.[2] ?? '').replace(/\\'/g, "'").replace(/\\"/g, '"'),
    });
  }

  return entries;
}

// ─── Zod schema parsing ───────────────────────────────────────────────────────

/**
 * Maps type-id kebab-case to the camelCase schema export name pattern.
 * e.g. 'hero-split' -> 'heroSplitSchema'
 */
function typeIdToSchemaName(typeId) {
  return (
    typeId
      .split('-')
      .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
      .join('') + 'Schema'
  );
}

/**
 * Infer a simplified type string from a Zod chain.
 * This is intentionally simple — handles the most common patterns.
 */
function inferZodType(chain) {
  if (/z\.literal\(/.test(chain)) return 'literal';
  if (/\.array\(|z\.array\(/.test(chain)) return 'array';
  if (/\.enum\(/.test(chain)) return 'enum';
  if (/z\.object\(/.test(chain)) return 'object';
  if (/z\.number\(/.test(chain)) return 'number';
  if (/z\.boolean\(/.test(chain)) return 'boolean';
  if (/z\.string\(/.test(chain)) return 'string';
  if (/z\.union\(/.test(chain)) return 'union';
  if (/bilingualString/.test(chain)) return 'object';
  if (/ctaSchema/.test(chain)) return 'object';
  if (/metricSchema/.test(chain)) return 'object';
  if (/featureItemSchema/.test(chain)) return 'object';
  if (/stepSchema/.test(chain)) return 'object';
  if (/faqItemSchema/.test(chain)) return 'object';
  if (/pricingTierSchema/.test(chain)) return 'object';
  if (/testimonialSchema/.test(chain)) return 'object';
  if (/comparisonRowSchema/.test(chain)) return 'object';
  if (/timelineEventSchema/.test(chain)) return 'object';
  return 'unknown';
}

/**
 * Extract enum values from a .enum([...]) chain.
 */
function extractEnumValues(chain) {
  const m = /\.enum\(\s*\[([^\]]+)\]/.exec(chain);
  if (!m) return undefined;
  return [...m[1].matchAll(/'([^']+)'/g)].map((v) => v[1]).join(' | ');
}

/**
 * Extract constraint string (min/max/int/etc.).
 */
function extractConstraint(chain) {
  const parts = [];
  const minM = /\.min\((\d+)\)/.exec(chain);
  const maxM = /\.max\((\d+)\)/.exec(chain);
  const intM = /\.int\(\)/.test(chain);
  if (intM) parts.push('int');
  if (minM) parts.push('min:' + minM[1]);
  if (maxM) parts.push('max:' + maxM[1]);
  if (parts.length === 0) return undefined;
  return parts.join(' ');
}

/**
 * Extract default value from a .default(...) chain.
 */
function extractDefault(chain) {
  const m = /\.default\(('([^']*)'|"([^"]*)"|(true|false|\d[\d.]*))\)/.exec(chain);
  if (!m) return undefined;
  return m[2] ?? m[3] ?? m[4];
}

/**
 * Given the source of sections.ts and a type id, find the corresponding z.object
 * export and return array of { name, type, required, default?, constraint? }.
 *
 * Strategy: locate the export `export const <schemaName> = z.object({` then
 * extract the DIRECT (top-level) fields of that object.
 */
function parseSchemaFields(source, typeId) {
  const schemaName = typeIdToSchemaName(typeId);
  // Find the declaration
  const declPattern = new RegExp(
    `export\\s+const\\s+${schemaName}\\s*=\\s*z\\.object\\s*\\(\\s*\\{`,
  );
  const declMatch = declPattern.exec(source);
  if (!declMatch) return [];

  // Find matching closing brace of the z.object({ ... }) call
  const objStart = declMatch.index + declMatch[0].length - 1; // the '{'
  let depth = 0;
  let objEnd = -1;
  for (let i = objStart; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) { objEnd = i; break; }
    }
  }
  if (objEnd === -1) return [];

  const body = source.slice(objStart + 1, objEnd);

  // Now extract top-level fields: identifier: <zod-chain>,
  // We scan char by char to handle nested parens/brackets/braces.
  const fields = [];
  let p = 0;
  while (p < body.length) {
    // Skip whitespace and commas at top level
    while (p < body.length && /[\s,]/.test(body[p])) p++;
    if (p >= body.length) break;

    // Match field name (identifier or quoted string)
    const nameMatch = /^([a-zA-Z_$][a-zA-Z0-9_$]*)/.exec(body.slice(p));
    if (!nameMatch) { p++; continue; }

    const fieldName = nameMatch[1];
    p += nameMatch[0].length;

    // Skip whitespace
    while (p < body.length && /\s/.test(body[p])) p++;
    if (p >= body.length || body[p] !== ':') { continue; }
    p++; // consume ':'

    // Skip whitespace
    while (p < body.length && /\s/.test(body[p])) p++;

    // Collect the value up to the matching comma at depth 0
    // Track depths for (), {}, []
    let valueEnd = p;
    let pd = 0, bd = 0, sqd = 0;
    while (valueEnd < body.length) {
      const c = body[valueEnd];
      if (c === '(') pd++;
      else if (c === ')') { if (pd > 0) pd--; else break; }
      else if (c === '{') bd++;
      else if (c === '}') { if (bd > 0) bd--; else break; }
      else if (c === '[') sqd++;
      else if (c === ']') { if (sqd > 0) sqd--; else break; }
      else if (c === ',' && pd === 0 && bd === 0 && sqd === 0) break;
      valueEnd++;
    }

    const chain = body.slice(p, valueEnd).trim();
    p = valueEnd;

    // Skip the 'type' discriminator field
    if (fieldName === 'type' && /z\.literal\(/.test(chain)) continue;

    const zodType = inferZodType(chain);
    const isOptional = /\.optional\(\)/.test(chain);
    const hasDefault = /\.default\(/.test(chain);
    const defaultVal = extractDefault(chain);
    const constraint = extractConstraint(chain) ?? extractEnumValues(chain);

    if (zodType === 'unknown' && fieldName === 'type') continue;

    fields.push({
      name: fieldName,
      type: zodType,
      required: !isOptional && !hasDefault,
      ...(defaultVal !== undefined ? { default: defaultVal } : {}),
      ...(constraint !== undefined ? { constraint } : {}),
    });
  }

  return fields.sort((a, b) => alpha(a.name, b.name));
}

// ─── Astro component parsing ──────────────────────────────────────────────────

/**
 * Extract scoped CSS classes from <style> blocks in an Astro component.
 * Returns { scopedClasses, tokensUsed (var names), tailwindUtils, hardcodedLiterals }.
 */
function parseAstroComponent(source, tokenMap) {
  // Extract <style> block(s)
  const styleBlocks = [];
  for (const m of source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    styleBlocks.push(m[1]);
  }
  const styleSource = styleBlocks.join('\n');

  // Scoped classes: .className patterns in style blocks
  const scopedClassSet = new Set();
  for (const m of styleSource.matchAll(/\.(-?[_A-Za-z]+[_A-Za-z0-9-]*)/g)) {
    scopedClassSet.add(m[1]);
  }
  const scopedClasses = [...scopedClassSet].sort(alpha);

  // CSS tokens used: var(--token-name) in style blocks
  const tokenVarSet = new Set();
  for (const m of styleSource.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) {
    tokenVarSet.add(m[1]);
  }

  // Also collect from template/script sections (class attributes and inline styles)
  const nonStyleSource = source.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  for (const m of nonStyleSource.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) {
    tokenVarSet.add(m[1]);
  }

  const tokensUsed = [...tokenVarSet]
    .sort(alpha)
    .map((name) => ({
      name,
      value: tokenMap.get(name) ?? '',
    }));

  // Tailwind utils: classes in class= attributes that look like Tailwind utilities
  // Tailwind patterns: known prefixes + utility-like short names
  const twPrefixes = /^(?:flex|grid|block|inline|hidden|absolute|relative|fixed|sticky|overflow|z-|w-|h-|min-|max-|p-|px-|py-|pt-|pb-|pl-|pr-|m-|mx-|my-|mt-|mb-|ml-|mr-|gap-|space-|col-|row-|text-|font-|tracking-|leading-|uppercase|lowercase|capitalize|truncate|whitespace-|bg-|border-|rounded|shadow|opacity-|transition|duration-|ease-|transform|scale-|rotate-|translate-|cursor-|pointer-|select-|resize|sr-only|not-sr-only|aspect-|object-|items-|justify-|self-|place-|content-|list-|appearance-|outline-|ring-|fill-|stroke-)/;

  const twSet = new Set();
  for (const m of nonStyleSource.matchAll(/class[Name]*=["'\`{]([^"'\`}]+)["'\`}]/g)) {
    for (const cls of m[1].split(/[\s{}]+/)) {
      const c = cls.trim();
      if (c && twPrefixes.test(c)) {
        twSet.add(c);
      }
    }
  }
  const tailwindUtils = [...twSet].sort(alpha);

  // Hardcoded literals in style blocks (px values, %, clamp(), em/rem, bare hex)
  const hardcodedSet = new Set();
  for (const m of styleSource.matchAll(
    /(?<![a-zA-Z0-9_-])(-?\d*\.?\d+px|-?\d*\.?\d+%|clamp\([^)]+\)|-?\d*\.?\d+em|-?\d*\.?\d+rem|#[0-9A-Fa-f]{3,8})/g,
  )) {
    // Exclude values that are inside a var() argument (those are resolved tokens, not literals)
    const before = styleSource.slice(Math.max(0, m.index - 20), m.index);
    if (/var\(\s*$/.test(before)) continue;
    // Exclude 0 standalone (not 0px, just 0)
    if (m[0] === '0') continue;
    hardcodedSet.add(m[0]);
  }
  const hardcodedArray = [...hardcodedSet].sort(alpha);

  return {
    scopedClasses,
    tokensUsed,
    tailwindUtils,
    hardcodedLiterals: {
      count: hardcodedArray.length,
      samples: hardcodedArray.slice(0, 8),
    },
  };
}

// ─── agentGuide generation ────────────────────────────────────────────────────

function generateAgentGuide(typeId, fields, tokensUsed, hardcodedLiterals, scopedClasses) {
  const parts = [];

  // Layout/variant props (enum fields)
  const enumFields = fields.filter((f) => f.type === 'enum' && f.name !== 'type');
  if (enumFields.length > 0) {
    const names = enumFields.map((f) => `\`${f.name}\``).join(', ');
    parts.push(`Layout : ${names} (schema, 0 CSS)`);
  }

  // Key token usage
  const spacingTokens = tokensUsed.filter((t) => /^--spa?c(ing|e)/.test(t.name));
  const colorTokens = tokensUsed.filter((t) => /^--(accent|ink|paper|muted)/.test(t.name));
  const typeTokens = tokensUsed.filter((t) => /^--(text|font|leading|fw|tracking)/.test(t.name));

  if (spacingTokens.length > 0) {
    parts.push(`Espacement : ${spacingTokens.map((t) => t.name).slice(0, 3).join(' ')}`);
  }
  if (colorTokens.length > 0) {
    parts.push(`Couleur : ${colorTokens.map((t) => t.name).slice(0, 3).join(' ')}`);
  }
  if (typeTokens.length > 0) {
    parts.push(`Typographie : ${typeTokens.map((t) => t.name).slice(0, 2).join(' ')}`);
  }

  // Debt signal
  if (hardcodedLiterals.count > 0) {
    const samples = hardcodedLiterals.samples.slice(0, 3).join(', ');
    parts.push(`Dette : ${hardcodedLiterals.count} litteral(s) hardcode(s) (${samples})`);
  }

  // data-coupling from scoped classes containing [data-
  const dataCoupling = scopedClasses.filter((c) => c.includes('data-'));
  if (dataCoupling.length > 0) {
    parts.push(`data-coupling : ${dataCoupling.slice(0, 3).join(' ')}`);
  }

  if (parts.length === 0) {
    return `Personnaliser via les props schema (${fields.filter((f) => f.required).length} requis, ${fields.filter((f) => !f.required).length} optionnels).`;
  }

  return parts.join('. ') + '.';
}

// ─── Markdown generation ──────────────────────────────────────────────────────

function noEmdash(str) {
  // Rule 58 : replace U+2014 with ' · ' if it ever slips through
  return str.replace(/—/g, ' · ');
}

function generateMarkdown(manifest) {
  const lines = [];

  lines.push('# DS Section Catalog');
  lines.push('');
  lines.push('> Machine-readable catalog of all registry section types.');
  lines.push('> Source : `gen-section-manifest.mjs` (deterministic, do not edit by hand).');
  lines.push(`> Sections : ${manifest.length}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  // Group by category slug
  const grouped = new Map();
  for (const entry of manifest) {
    const key = entry.categorySlug || 'other';
    if (!grouped.has(key)) grouped.set(key, { label: entry.subcategory, entries: [] });
    grouped.get(key).entries.push(entry);
  }

  // Sort groups alpha by key
  const sortedGroups = [...grouped.entries()].sort((a, b) => alpha(a[0], b[0]));

  for (const [slug, { label, entries }] of sortedGroups) {
    lines.push(`## ${label || slug}`);
    lines.push('');

    // Sort entries within group alpha by id
    const sortedEntries = [...entries].sort((a, b) => alpha(a.id, b.id));

    for (const entry of sortedEntries) {
      lines.push(`### \`${entry.id}\``);
      lines.push('');

      const desc = noEmdash(entry.description_fr || entry.description_en || '');
      if (desc) lines.push(`> ${desc}`);
      lines.push(`> ${entry.component.name} · ${entry.component.path} · ${entry.category}/${entry.categorySlug}`);
      lines.push(`> status : ${entry.status} · tags : ${entry.tags.join(', ')}`);
      lines.push('');

      // Schema fields table
      if (entry.schemaFields.length > 0) {
        lines.push('**Props**');
        lines.push('');
        lines.push('| Champ | Type | Req | Default | Contrainte |');
        lines.push('|---|---|---|---|---|');
        for (const f of entry.schemaFields) {
          lines.push(
            `| \`${f.name}\` | ${f.type} | ${f.required ? 'oui' : 'non'} | ${f.default ?? ''} | ${f.constraint ?? ''} |`,
          );
        }
        lines.push('');
      }

      // Tokens
      if (entry.tokensUsed.length > 0) {
        const tokenList = entry.tokensUsed.map((t) => `\`${t.name}\``).join(' ');
        lines.push(`**Tokens** : ${tokenList}`);
        lines.push('');
      }

      // Scoped classes
      if (entry.scopedClasses.length > 0) {
        const cls = entry.scopedClasses.map((c) => `.${c}`).join(' ');
        lines.push(`**Classes scoped** : ${cls}`);
        lines.push('');
      }

      // Tailwind utils (if any)
      if (entry.tailwindUtils.length > 0) {
        lines.push(`**Tailwind** : ${entry.tailwindUtils.join(' ')}`);
        lines.push('');
      }

      // Hardcoded literals
      if (entry.hardcodedLiterals.count > 0) {
        lines.push(
          `**Dette hardcode** : ${entry.hardcodedLiterals.count} valeur(s) — ${entry.hardcodedLiterals.samples.join(', ')}`,
        );
        lines.push('');
      }

      // Agent guide
      lines.push(`**Agent** : ${noEmdash(entry.agentGuide)}`);
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }

  return lines.join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  // Load token values
  const tokenMap = parseTokens(read(TOKENS_FILE));

  // Parse registry
  const registrySource = read(REGISTRY_FILE);
  const registryEntries = parseRegistry(registrySource);

  // Parse library manifest (usage + consumers, docs/40 §3)
  const usageEntries = parseLibraryManifest(read(LIBRARY_MANIFEST_FILE));

  // Parse schemas
  const schemaSource = read(SECTIONS_SCHEMA_FILE);

  // Build manifest
  const manifest = [];

  for (const [typeId, meta] of registryEntries.entries()) {
    const componentPath = `src/components/sections/${meta.componentFile}`;
    const componentAbsPath = join(ROOT, componentPath);

    // Parse Astro component
    let scopedClasses = [];
    let tokensUsed = [];
    let tailwindUtils = [];
    let hardcodedLiterals = { count: 0, samples: [] };

    if (existsSync(componentAbsPath)) {
      const componentSource = readFileSync(componentAbsPath, 'utf8');
      const parsed = parseAstroComponent(componentSource, tokenMap);
      scopedClasses = parsed.scopedClasses;
      tokensUsed = parsed.tokensUsed;
      tailwindUtils = parsed.tailwindUtils;
      hardcodedLiterals = parsed.hardcodedLiterals;
    }

    // Parse schema fields
    const schemaFields = parseSchemaFields(schemaSource, typeId);

    // Generate agent guide
    const agentGuide = generateAgentGuide(
      typeId,
      schemaFields,
      tokensUsed,
      hardcodedLiterals,
      scopedClasses,
    );

    const usageInfo = usageEntries.get(typeId) ?? { usage: 'library', consumers: [] };

    manifest.push({
      id: typeId,
      component: {
        name: meta.componentName,
        path: componentPath,
      },
      usage: usageInfo.usage,
      consumers: [...usageInfo.consumers].sort(alpha),
      category: meta.category,
      categorySlug: meta.categorySlug,
      subcategory: meta.subcategory,
      tags: meta.tags,
      status: meta.status,
      description_fr: meta.description_fr,
      description_en: meta.description_en,
      schemaFields,
      scopedClasses,
      tokensUsed,
      tailwindUtils,
      hardcodedLiterals,
      agentGuide,
    });
  }

  // Sort manifest alpha by id (deterministic)
  manifest.sort((a, b) => alpha(a.id, b.id));

  // Verify no em-dash in agentGuide or descriptions (rule 58)
  for (const entry of manifest) {
    if (entry.agentGuide.includes('—')) {
      entry.agentGuide = entry.agentGuide.replace(/—/g, ' · ');
    }
    if (entry.description_fr.includes('—')) {
      entry.description_fr = entry.description_fr.replace(/—/g, ' · ');
    }
    if (entry.description_en.includes('—')) {
      entry.description_en = entry.description_en.replace(/—/g, ' · ');
    }
  }

  // Write JSON
  writeFileSync(join(ROOT, OUTPUT_JSON), JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  // Write Markdown
  const mdContent = generateMarkdown(manifest);
  writeFileSync(join(ROOT, OUTPUT_MD), mdContent, 'utf8');

  // Stats
  const totalTokenRefs = manifest.reduce((s, e) => s + e.tokensUsed.length, 0);
  const totalHardcoded = manifest.reduce((s, e) => s + e.hardcodedLiterals.count, 0);
  const totalFields = manifest.reduce((s, e) => s + e.schemaFields.length, 0);
  const siteCount = manifest.filter((e) => e.usage === 'site').length;
  const libraryCount = manifest.filter((e) => e.usage === 'library').length;

  console.log(
    `section-manifest: ${manifest.length} types (${siteCount} site, ${libraryCount} library), ${totalFields} schema fields, ${totalTokenRefs} token refs, ${totalHardcoded} hardcoded literals`,
  );
}

main();
