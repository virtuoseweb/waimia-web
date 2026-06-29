#!/usr/bin/env node
/**
 * gen-section-quickref.mjs
 * Waimia · Chantier industrialisation (scaffolding composable)
 *
 * Generates a one-shot lookup file : "give me the exact frontmatter for these N types".
 * Per registry section type :
 *   { type, category, categorySlug, status, requiredProps[], optionalProps[],
 *     demo: { ...minimal frontmatter extract ready to paste } }
 *
 * Inputs  : src/data/ds-section-manifest.json (props / constraints / required-ness)
 *           src/sections/<type>/demo.ts        (real demo values, co-located modules)
 * Output  : src/data/section-quickref.json
 *
 * Derives EVERYTHING from existing sources of truth (no new source).
 * Each co-located demo module imports .astro components so a Node import() is
 * impossible : we parse the `export const demo = { ... }` object-literal of every
 * src/sections/<type>/demo.ts statically by balanced-brace scanning (same strategy
 * as gen-section-manifest.mjs / check-presets.mjs). The typeId is the folder name.
 *
 * Constraints :
 *   - Zero new npm dependencies (Node.js built-ins only)
 *   - Deterministic, idempotent, alpha-sorted, 0 timestamps
 *   - 0 em-dash U+2014 in any generated content (rule 58)
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST_FILE = 'src/data/ds-section-manifest.json';
const SECTIONS_DIR = 'src/sections';
const OUTPUT_JSON = 'src/data/section-quickref.json';

const collator = new Intl.Collator('en');
const alpha = (a, b) => collator.compare(a, b);

function read(rel) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    console.error(`FATAL : fichier introuvable -> ${rel}`);
    process.exit(2);
  }
  return readFileSync(p, 'utf8');
}

// ─── Demo parsing (static, balanced-brace) ────────────────────────────────────

/**
 * Isolates the `export const demo ... = { ... }` object-literal of a co-located
 * demo module and returns the raw object source (braces included), or null if the
 * declaration is absent. Balanced-brace scan starting at the first '{' after the
 * `export const demo` declaration (the `= {` may carry a type annotation in
 * between, e.g. `export const demo: DemoData = {`).
 */
function extractDemoLiteral(source) {
  const startMatch = /export\s+const\s+demo\b[^=]*=\s*\{/.exec(source);
  if (!startMatch) return null;
  const objStart = startMatch.index + startMatch[0].length - 1; // at the '{'
  let depth = 0;
  for (let i = objStart; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) return source.slice(objStart, i + 1); // includes braces
    }
  }
  return null;
}

/**
 * Enumerates the co-located section modules (src/sections/<type>/) and returns
 * Map<typeId, rawObjectBody> for every module that has both an index.ts (valid
 * module marker) and a demo.ts whose `export const demo = {...}` literal could be
 * isolated. The typeId is the folder name (robust source of truth, preferred over
 * the in-literal `type:` field). The raw body is re-parsed via evalLiteral later.
 */
function parseDemoBlocks() {
  const dir = join(ROOT, SECTIONS_DIR);
  if (!existsSync(dir)) {
    console.error(`FATAL : repertoire introuvable -> ${SECTIONS_DIR}`);
    process.exit(2);
  }
  const blocks = new Map();
  const entries = readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort(alpha);
  for (const typeId of entries) {
    const indexPath = join(dir, typeId, 'index.ts');
    const demoPath = join(dir, typeId, 'demo.ts');
    if (!existsSync(indexPath) || !existsSync(demoPath)) continue;
    const literal = extractDemoLiteral(readFileSync(demoPath, 'utf8'));
    if (literal == null) continue;
    blocks.set(typeId, literal);
  }
  return blocks;
}

/**
 * Safe recursive-descent parser for the JS object-literals used in the demo
 * bodies. The demos are pure data (strings, numbers, booleans, null, arrays,
 * nested objects, with bare or quoted keys and trailing commas). We do NOT use
 * `new Function`/`eval` (code-injection footgun + matches the repo's static-parse
 * convention). Any unparseable construct throws and the caller degrades to null.
 *
 * Returns a plain object/array, or null on any failure.
 */
function parseLiteral(src) {
  let i = 0;
  const s = src;

  const ws = () => {
    while (i < s.length) {
      const c = s[i];
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r') { i++; continue; }
      // line comments inside a demo body are not expected, but skip defensively
      if (c === '/' && s[i + 1] === '/') { while (i < s.length && s[i] !== '\n') i++; continue; }
      break;
    }
  };

  const fail = (msg) => { throw new Error(`${msg} at ${i}`); };

  const parseString = (quote) => {
    i++; // opening quote
    let out = '';
    while (i < s.length) {
      const c = s[i++];
      if (c === '\\') {
        const n = s[i++];
        if (n === 'n') out += '\n';
        else if (n === 't') out += '\t';
        else if (n === 'r') out += '\r';
        else out += n; // \' \" \\ \` etc.
      } else if (c === quote) {
        return out;
      } else {
        out += c;
      }
    }
    fail('unterminated string');
  };

  const parseNumber = () => {
    const start = i;
    while (i < s.length && /[0-9eE+\-.]/.test(s[i])) i++;
    const n = Number(s.slice(start, i));
    if (Number.isNaN(n)) fail('bad number');
    return n;
  };

  const parseKey = () => {
    ws();
    const c = s[i];
    if (c === "'" || c === '"' || c === '`') return parseString(c);
    // bare identifier key
    const start = i;
    while (i < s.length && /[A-Za-z0-9_$]/.test(s[i])) i++;
    if (i === start) fail('bad key');
    return s.slice(start, i);
  };

  const parseValue = () => {
    ws();
    const c = s[i];
    if (c === '{') return parseObject();
    if (c === '[') return parseArray();
    if (c === "'" || c === '"' || c === '`') return parseString(c);
    if (s.startsWith('true', i)) { i += 4; return true; }
    if (s.startsWith('false', i)) { i += 5; return false; }
    if (s.startsWith('null', i)) { i += 4; return null; }
    if (/[0-9+\-.]/.test(c)) return parseNumber();
    fail(`unexpected token '${c}'`);
  };

  const parseArray = () => {
    i++; // [
    const arr = [];
    ws();
    if (s[i] === ']') { i++; return arr; }
    while (i < s.length) {
      arr.push(parseValue());
      ws();
      if (s[i] === ',') { i++; ws(); if (s[i] === ']') { i++; return arr; } continue; }
      if (s[i] === ']') { i++; return arr; }
      fail('expected , or ]');
    }
    fail('unterminated array');
  };

  const parseObject = () => {
    i++; // {
    const obj = {};
    ws();
    if (s[i] === '}') { i++; return obj; }
    while (i < s.length) {
      const key = parseKey();
      ws();
      if (s[i] !== ':') fail('expected :');
      i++;
      obj[key] = parseValue();
      ws();
      if (s[i] === ',') { i++; ws(); if (s[i] === '}') { i++; return obj; } continue; }
      if (s[i] === '}') { i++; return obj; }
      fail('expected , or }');
    }
    fail('unterminated object');
  };

  ws();
  const value = parseValue();
  return value && typeof value === 'object' ? value : null;
}

function evalLiteral(src) {
  try {
    return parseLiteral(src);
  } catch {
    return null;
  }
}

// ─── Minimal demo extract ─────────────────────────────────────────────────────

/**
 * Builds the minimal ready-to-paste frontmatter extract for a type.
 * Keeps `type` plus every REQUIRED prop's demo value, and a small set of
 * representative optional props so the pasted block renders something useful.
 * Falls back to the full demo object if the manifest lists no required props.
 */
function buildMinimalDemo(typeId, demo, requiredProps, optionalProps) {
  if (!demo) return { type: typeId };

  const out = { type: typeId };
  const req = new Set(requiredProps.map((p) => p.name));
  // bilingual fields are split (h1_fr/h1_en); manifest already lists each leaf.
  for (const key of Object.keys(demo)) {
    if (key === 'type') continue;
    if (req.has(key)) out[key] = demo[key];
  }

  // If the manifest required set is empty (some sections only have optionals),
  // surface the first few optional props that exist in the demo so the extract
  // is not just `{ type }`.
  if (Object.keys(out).length === 1) {
    const optNames = optionalProps.map((p) => p.name);
    for (const key of optNames) {
      if (key in demo && key !== 'type') out[key] = demo[key];
      if (Object.keys(out).length >= 5) break;
    }
  }

  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function noEmdash(value) {
  if (typeof value === 'string') return value.replace(/—/g, ' · ');
  if (Array.isArray(value)) return value.map(noEmdash);
  if (value && typeof value === 'object') {
    const o = {};
    for (const k of Object.keys(value)) o[k] = noEmdash(value[k]);
    return o;
  }
  return value;
}

function main() {
  const manifest = JSON.parse(read(MANIFEST_FILE));
  const demoBlocks = parseDemoBlocks();

  const quickref = [];

  for (const entry of manifest) {
    const typeId = entry.id;
    const fields = Array.isArray(entry.schemaFields) ? entry.schemaFields : [];

    const toProp = (f) => ({
      name: f.name,
      type: f.type,
      ...(f.constraint !== undefined ? { constraint: f.constraint } : {}),
      ...(f.default !== undefined ? { default: f.default } : {}),
    });

    const requiredProps = fields.filter((f) => f.required).map(toProp).sort((a, b) => alpha(a.name, b.name));
    const optionalProps = fields.filter((f) => !f.required).map(toProp).sort((a, b) => alpha(a.name, b.name));

    const rawBlock = demoBlocks.get(typeId);
    const demoObj = rawBlock ? evalLiteral(rawBlock) : null;
    const demo = buildMinimalDemo(typeId, demoObj, requiredProps, optionalProps);

    quickref.push({
      type: typeId,
      category: entry.category,
      categorySlug: entry.categorySlug,
      subcategory: entry.subcategory,
      status: entry.status,
      description_fr: entry.description_fr,
      requiredProps,
      optionalProps,
      hasDemo: demoObj !== null,
      demo: noEmdash(demo),
    });
  }

  quickref.sort((a, b) => alpha(a.type, b.type));

  writeFileSync(join(ROOT, OUTPUT_JSON), JSON.stringify(quickref, null, 2) + '\n', 'utf8');

  const withDemo = quickref.filter((q) => q.hasDemo).length;
  const totalReq = quickref.reduce((s, q) => s + q.requiredProps.length, 0);
  console.log(
    `section-quickref: ${quickref.length} types (${withDemo} with demo), ${totalReq} required props indexed -> ${OUTPUT_JSON}`,
  );
}

main();
