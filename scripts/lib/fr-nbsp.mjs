/**
 * Règle unique de l'espace insécable française, partagée par
 * `scripts/fix-fr-nbsp.mjs` (correction) et `scripts/check-fr-nbsp.mjs` (porte).
 *
 * Règle : dans le texte FR, hors balises, une espace ordinaire U+0020
 *   - précédée d'un non-blanc (une balise fermante compte) et suivie de `: ; ? !` ou `»`,
 *   - ou qui suit `«`
 * devient U+00A0. Rien d'autre n'est touché : les contenus de <pre>, <code>, <script>,
 * <style>, les commentaires HTML, les URL (`https:`), les heures (`10:30`) et les clés
 * JSON restent intacts (le signe doit être précédé d'une espace).
 *
 * Périmètre :
 *   - src/content/**\/*.json : champs FR (clé ou ancêtre en `_fr`, `Fr`, `fr`), plus une liste
 *     blanche de champs FR sans suffixe, plus tout le dossier legal (hors clés `*En`).
 *     Les champs EN (`_en`, `En`, `en`) et la liste noire (slug, url, href, src...) ne sont jamais touchés.
 *   - src/data/**\/*.json : même règle que src/content (champs FR par suffixe de clé).
 *   - src/pages, src/components, src/sections /**\/*.astro : nœuds texte du gabarit et littéraux
 *     de chaîne qui portent un indice de français, via le parseur TypeScript. Les attributs des
 *     balises HTML minuscules sont exclus ; les props de composants (balise en majuscule) sont inclus.
 *   - src/data, src/lib, src/components, src/sections /**\/*.ts(x) : mêmes littéraux de chaîne
 *     (indice de français) ; exclus : clés d'objet, `import`/`export`, valeurs sous une clé EN,
 *     messages de développement (`throw`, `new Error`, `console.*`), gabarits étiquetés
 *     (css`...`), valeurs sous une clé `prompt*`, fichiers `*.generated.*` (corriger leur
 *     source puis régénérer), fichiers de test.
 */
import { createRequire } from 'node:module';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ts = createRequire(import.meta.url)('typescript');

export const NBSP = '\u00a0';

// 1 : balises et zones à ne pas toucher (rendues telles quelles) ; 2 : nom de la zone.
// Puis : espace avant `: ; ? !` `»` (signe non suivi d'une lettre, d'un chiffre, `=`, `:`, `/`, `-`),
// ou espace après `«`.
const RE = new RegExp(
  String.raw`(<!--[\s\S]*?-->|<(pre|code|script|style)\b[\s\S]*?<\/\2\s*>|<\/?[A-Za-z][^<>]*>)` +
    String.raw`|(?<=\S) (?=[:;?!»](?![\p{L}\p{N}=:/\-]))|(?<=«) `,
  'gu',
);

/** Indices (dans `text`) des espaces à remplacer ; `before` est le caractère source juste avant (contexte du lookbehind). */
export function spacePositions(text, before = '') {
  const hits = [];
  (before + text).replace(RE, (m, zone, _name, offset) => {
    if (zone === undefined) hits.push(offset - before.length);
    return m;
  });
  return hits;
}

/** Corrige `text` : chaque espace repérée par `spacePositions` devient U+00A0. */
export function fixString(text, before = '') {
  const hits = spacePositions(text, before);
  let out = text;
  for (const i of hits.reverse()) out = out.slice(0, i) + NBSP + out.slice(i + 1);
  return { out, n: hits.length };
}

// ---------------------------------------------------------------- JSON

const JSON_BLACKLIST = new Set([
  'slug', 'url', 'href', 'src', 'id', 'type', 'variant', 'background', 'tags', 'category',
  'publishedAt', 'updatedAt', 'revisedAt', '$schema', 'kind', 'version', 'key', 'anchor', 'class',
]);

const NEUTRAL_FR_PATHS = [
  /(^|\.)headings\.\[\]\.text$/,
  /(^|\.)sources\.\[\]\.name$/,
  /(^|\.)publications\.\[\]\.title$/,
  /\.rows\.\[\]\.values\.\[\]$/,
  /\.metrics\.\[\]\.value$/,
];

const isFrKey = (k) => /(_fr|Fr)$/.test(k) || k === 'fr';
const isEnKey = (k) => /(_en|En)$/.test(k) || k === 'en';

/** 'fr' | 'en' | 'neutre' selon l'ancêtre le plus proche portant un suffixe de langue. */
export function langOfPath(keys) {
  for (let i = keys.length - 1; i >= 0; i -= 1) {
    if (isFrKey(keys[i])) return 'fr';
    if (isEnKey(keys[i])) return 'en';
  }
  return 'neutre';
}

function shouldFixJson(keys, legal) {
  if (keys.some((k) => JSON_BLACKLIST.has(k))) return false;
  const lang = langOfPath(keys);
  if (lang === 'fr') return true;
  if (lang === 'en') return false;
  if (legal) return true;
  return NEUTRAL_FR_PATHS.some((re) => re.test(keys.join('.')));
}

/** Retourne `{ out, n, changes }` ; `out === null` si le fichier n'est pas réécrivable à l'identique. */
export function scanJson(file, raw) {
  const data = JSON.parse(raw);
  const tail = raw.endsWith('\n') ? '\n' : '';
  if (JSON.stringify(data, null, 2) + tail !== raw) return { out: null, n: 0, changes: [], reason: 'aller-retour JSON non identique' };
  const legal = file.split('\\').join('/').includes('/content/legal/');
  const changes = [];
  const visit = (node, keys) => {
    if (typeof node === 'string') return node;
    const list = Array.isArray(node);
    for (const k of Object.keys(node)) {
      const v = node[k];
      const next = [...keys, list ? '[]' : k];
      if (typeof v === 'string') {
        if (!shouldFixJson(next, legal)) continue;
        const { out, n } = fixString(v);
        if (n > 0) {
          node[k] = out;
          changes.push({ where: next.join('.'), n, before: v, after: out });
        }
      } else if (v && typeof v === 'object') {
        visit(v, next);
      }
    }
    return node;
  };
  visit(data, []);
  const n = changes.reduce((s, c) => s + c.n, 0);
  return { out: n > 0 ? JSON.stringify(data, null, 2) + tail : raw, n, changes };
}

// ---------------------------------------------------------------- Astro

const FR_CUE =
  /[àâäçéèêëîïôöûùüÿœæ]|\b(le|la|les|des|du|de|un|une|et|vous|nous|votre|vos|pour|que|qui|dans|sur|est|pas|avec|aux|cette)\b/i;
const ATTR_EXCLUDE = new Set(['href', 'src', 'class', 'id', 'slot', 'type', 'rel', 'target', 'lang', 'name', 'class:list']);
const RAW_TEXT_TAGS = new Set(['code', 'pre', 'kbd', 'samp', 'script', 'style']);

function splitAstro(src) {
  if (!src.startsWith('---')) return { fmEnd: 0, tplStart: 0 };
  const m = /\n---[ \t]*\r?\n/.exec(src);
  if (!m) return { fmEnd: 0, tplStart: 0 };
  return { fmEnd: m.index + 1, tplStart: m.index + m[0].length };
}

const blank = (s) => s.replace(/[^\n]/g, ' ');

/** Retourne `{ out, n, edits, parseOk }` ; `parseOk` faux : fichier non analysable, laissé tel quel. */
export function scanAstro(file, src) {
  const { fmEnd, tplStart } = splitAstro(src);
  const front = fmEnd > 0 ? blank(src.slice(0, 3)) + src.slice(3, fmEnd) : '';
  let tpl = blank(src.slice(0, tplStart)) + src.slice(tplStart);
  tpl = tpl.replace(/<!--[\s\S]*?-->|\{\s*\/\*[\s\S]*?\*\/\s*\}|<!doctype[^>]*>|<(style|script)\b[\s\S]*?<\/\1\s*>/gi, blank);
  const tsx = `<>${tpl}</>`;

  const sources = [];
  if (fmEnd > 0) sources.push({ sf: ts.createSourceFile(`${file}.ts`, front, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS), shift: 0, masked: front });
  sources.push({ sf: ts.createSourceFile(`${file}.tsx`, tsx, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX), shift: 2, masked: tpl });
  return scanSources(src, sources);
}

/** Fichier `.ts` / `.tsx` : mêmes règles de littéraux que le frontmatter et le gabarit d'un `.astro`. */
export function scanTs(file, src) {
  const kind = file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return scanSources(src, [{ sf: ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, kind), shift: 0, masked: src }]);
}

function scanSources(src, sources) {
  if (sources.some(({ sf }) => sf.parseDiagnostics.length > 0)) return { out: src, n: 0, edits: [], parseOk: false };

  // Les positions sont cherchées dans la source masquée (commentaires HTML, style et script
  // blanchis) puis appliquées à la source réelle, seulement là où celle-ci porte bien une espace.
  const hits = new Set();
  const addSpan = (masked, start, end) => {
    if (end <= start) return;
    for (const i of spacePositions(masked.slice(start, end), start > 0 ? masked[start - 1] : '')) {
      if (src[start + i] === ' ') hits.add(start + i);
    }
  };

  const inEnProperty = (node) => {
    const p = node.parent;
    return p && ts.isPropertyAssignment(p) && p.initializer === node && isEnKey(p.name.getText().replace(/^['"]|['"]$/g, ''));
  };
  const inPromptProperty = (node) => {
    for (let a = node.parent; a; a = a.parent) {
      if (ts.isPropertyAssignment(a) && /prompt/i.test(a.name.getText().replace(/^['"]|['"]$/g, ''))) return true;
      if (ts.isStatement(a)) return false;
    }
    return false;
  };
  const isTagged = (node) => node.parent && ts.isTaggedTemplateExpression(node.parent) && node.parent.template === node;
  const inDevMessage = (node) => {
    for (let a = node.parent; a; a = a.parent) {
      if (ts.isThrowStatement(a)) return true;
      if ((ts.isNewExpression(a) || ts.isCallExpression(a)) && /^(new\s+)?(\w*Error|console\.\w+)$/.test(a.expression.getText())) return true;
      if (ts.isStatement(a)) return false;
    }
    return false;
  };
  const tagOf = (attr) => {
    const el = attr.parent?.parent;
    return el && el.tagName ? el.tagName.getText() : '';
  };

  for (const { sf, shift, masked } of sources) {
    const pos = (node, delta = 0) => node.getStart(sf) - shift + delta;
    const end = (node, delta = 0) => node.end - shift + delta;
    const literal = (node, spans) => {
      if (!FR_CUE.test(node.getText(sf))) return;
      for (const [a, b] of spans) addSpan(masked, a, b);
    };
    const visit = (node, inRaw) => {
      if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
        const name = (ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName).getText(sf);
        inRaw = inRaw || RAW_TEXT_TAGS.has(name);
      }
      if (ts.isJsxText(node)) {
        if (!inRaw) addSpan(masked, Math.max(0, node.pos - shift), node.end - shift);
        return;
      }
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return;
      const inAttr = node.parent && ts.isJsxAttribute(node.parent) && node.parent.initializer === node;
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        const p = node.parent;
        if (p && ts.isPropertyAssignment(p) && p.name === node) return;
        if (inEnProperty(node) || inDevMessage(node) || inPromptProperty(node) || isTagged(node) || inRaw) return;
        if (inAttr) {
          const tag = tagOf(node.parent);
          if (!/^[A-Z]/.test(tag) || ATTR_EXCLUDE.has(node.parent.name.getText(sf))) return;
        }
        literal(node, [[pos(node, 1), end(node, -1)]]);
        return;
      }
      if (ts.isTemplateExpression(node)) {
        if (!inEnProperty(node) && !inDevMessage(node) && !inPromptProperty(node) && !isTagged(node) && !inRaw) {
          const spans = [[pos(node.head, 1), end(node.head, -2)]];
          node.templateSpans.forEach((s, i) => {
            const last = i === node.templateSpans.length - 1;
            spans.push([pos(s.literal, 1), end(s.literal, last ? -1 : -2)]);
          });
          literal(node, spans);
        }
        node.templateSpans.forEach((s) => visit(s.expression, inRaw));
        return;
      }
      ts.forEachChild(node, (c) => visit(c, inRaw));
    };
    visit(sf, false);
  }

  const idx = [...hits].sort((a, b) => b - a);
  let out = src;
  for (const i of idx) out = out.slice(0, i) + NBSP + out.slice(i + 1);
  return { out, n: idx.length, edits: idx.reverse(), parseOk: true };
}

// ---------------------------------------------------------------- Parcours

// Fichiers générés (corriger leur source, puis régénérer : gen:section-manifest, gen:section-quickref).
const SKIP_FILE = /\.generated\.|\.(test|spec)\.|\.d\.ts$|^(section-quickref|ds-section-manifest)\.json$/;

function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path, exts, files);
    else if (entry.isFile() && exts.some((e) => entry.name.endsWith(e)) && !SKIP_FILE.test(entry.name)) files.push(path);
  }
  return files;
}

const JSON_ROOTS = ['src/content', 'src/data'];
const ASTRO_ROOTS = ['src/pages', 'src/components', 'src/sections'];
const TS_ROOTS = ['src/data', 'src/lib', 'src/components', 'src/sections'];

/** Scanne tout le périmètre ; ne lit que, n'écrit rien. */
export function collectAll(root) {
  const files = [];
  const skipped = [];
  const rel = (file) => relative(root, file);
  for (const file of JSON_ROOTS.flatMap((d) => walk(join(root, d), ['.json'])).sort()) {
    const raw = readFileSync(file, 'utf8');
    const r = scanJson(file, raw);
    if (r.out === null) skipped.push({ file: rel(file), reason: r.reason });
    else if (r.n > 0) files.push({ file, kind: 'json', n: r.n, before: raw, after: r.out, detail: r.changes.map((c) => `${c.where} : ${c.before.slice(0, 70)}`) });
  }
  const code = [
    ...ASTRO_ROOTS.flatMap((d) => walk(join(root, d), ['.astro'])).map((file) => ({ file, kind: 'astro', scan: scanAstro })),
    ...TS_ROOTS.flatMap((d) => walk(join(root, d), ['.ts', '.tsx'])).map((file) => ({ file, kind: 'ts', scan: scanTs })),
  ].sort((a, b) => a.file.localeCompare(b.file));
  for (const { file, kind, scan } of code) {
    const raw = readFileSync(file, 'utf8');
    const r = scan(file, raw);
    if (!r.parseOk) skipped.push({ file: rel(file), reason: 'source non analysable par TypeScript' });
    else if (r.n > 0) files.push({ file, kind, n: r.n, before: raw, after: r.out, detail: r.edits.map((i) => raw.slice(Math.max(0, i - 40), i + 12).replace(/\s+/g, ' ')) });
  }
  return { files, skipped, total: files.reduce((s, f) => s + f.n, 0) };
}
