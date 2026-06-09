#!/usr/bin/env node
/**
 * Gate anti-régression : interdit le tiret cadratin U+2014 dans le contenu user-facing.
 *
 * Scan intégral : fichiers de contenu md, mdx, json, yaml et yml.
 * Scan hors commentaires : fichiers ts, json et astro des surfaces user-facing.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const EM_DASH = '—';
const COMMENT_LINE_RE = /^\s*(?:\/\/|\*|\/\*)/;

const TARGETS = [
  { dir: 'src/content', extensions: new Set(['.md', '.mdx', '.json', '.yaml', '.yml']), ignoreComments: false },
  { dir: 'src/data', extensions: new Set(['.ts', '.json']), ignoreComments: true },
  { dir: 'src/components', extensions: new Set(['.astro']), ignoreComments: true },
  { dir: 'src/pages', extensions: new Set(['.astro']), ignoreComments: true },
  { dir: 'src/layouts', extensions: new Set(['.astro']), ignoreComments: true },
];

function walk(dir, extensions, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path, extensions, files);
    } else if (entry.isFile() && extensions.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
}

function stripComments(line, state) {
  let visible = '';
  let cursor = 0;

  while (cursor < line.length) {
    if (state.commentEnd) {
      const end = line.indexOf(state.commentEnd, cursor);
      if (end === -1) return visible;
      cursor = end + state.commentEnd.length;
      state.commentEnd = null;
      continue;
    }

    const htmlStart = line.indexOf('<!--', cursor);
    const blockStart = line.indexOf('/*', cursor);
    const starts = [
      { index: htmlStart, openerLength: 4, end: '-->' },
      { index: blockStart, openerLength: 2, end: '*/' },
    ].filter((candidate) => candidate.index !== -1);

    if (starts.length === 0) return visible + line.slice(cursor);

    const start = starts.reduce((nearest, candidate) =>
      candidate.index < nearest.index ? candidate : nearest
    );
    visible += line.slice(cursor, start.index);
    state.commentEnd = start.end;
    cursor = start.index + start.openerLength;
  }

  return visible;
}

const hits = [];

for (const target of TARGETS) {
  const dir = join(ROOT, target.dir);
  for (const file of walk(dir, target.extensions).sort()) {
    const state = { commentEnd: null };
    const lines = readFileSync(file, 'utf8').split('\n');

    lines.forEach((rawLine, index) => {
      let searchable = rawLine;
      if (target.ignoreComments) {
        searchable = stripComments(rawLine, state);
        if (COMMENT_LINE_RE.test(searchable)) return;
      }

      let cursor = searchable.indexOf(EM_DASH);
      while (cursor !== -1) {
        hits.push({
          file: relative(ROOT, file),
          line: index + 1,
          context: rawLine.trim(),
        });
        cursor = searchable.indexOf(EM_DASH, cursor + EM_DASH.length);
      }
    });
  }
}

if (hits.length > 0) {
  hits.forEach((hit) => console.error(`${hit.file}:${hit.line}: ${hit.context}`));
  process.exit(1);
}

console.log('✅ PASS — 0 em-dash (U+2014) dans le contenu user-facing');
process.exit(0);
