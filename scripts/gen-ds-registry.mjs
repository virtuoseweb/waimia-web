#!/usr/bin/env node

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS_FILE = 'src/styles/tokens.css';
const CLASS_FILES = [
  'src/styles/global.css',
  'src/styles/grid.css',
  'src/styles/scroll-reveal.css',
];
const OUTPUT_FILE = 'src/data/ds-registry.json';
const collator = new Intl.Collator('en');
const alpha = (a, b) => collator.compare(a, b);

function read(rel) {
  return readFileSync(join(ROOT, rel), 'utf8');
}

function cleanComment(value) {
  return value
    .replace(/^\/\*|\*\/$/g, '')
    .replace(/^\s*\*\s?/gm, '')
    .replace(/\s+/g, ' ')
    // Rule 58 : pas de tiret cadratin U+2014 dans le contenu généré (gate check-no-emdash).
    // Le registry est du contenu user-facing (affiché dans /agence/ds-studio).
    .replace(/\s*—\s*/g, ' · ')
    .trim();
}

function groupFromHeader(header, name) {
  const normalized = header.toLowerCase();
  const headerGroups = [
    [/spacing|rhythm/, 'spacing'],
    [/type|typograph|font-weight/, 'type'],
    [/radius|rayon/, 'radius'],
    [/animation|motion|easing/, 'motion'],
    [/shadow|ombre/, 'shadow'],
    [/z-index/, 'z'],
    [/grid|layout/, 'layout'],
    [/@theme/, name.startsWith('--color-') ? 'color' : null],
  ];
  for (const [pattern, group] of headerGroups) {
    if (group && pattern.test(normalized)) return group;
  }

  const prefixGroups = [
    [/^--space-/, 'spacing'],
    [/^--spacing-/, 'spacing'],
    [/^--(?:text|leading|font|fw|tracking)-/, 'type'],
    [/^--(?:accent|ink|paper|muted|hairline|color)(?:-|$)/, 'color'],
    [/^--radius-/, 'radius'],
    [/^--shadow-/, 'shadow'],
    [/^--(?:ease|dur)(?:-|$)/, 'motion'],
    [/^--z-/, 'z'],
    [/^--(?:wrap|gut|header|cookie-banner|col)(?:-|$)/, 'layout'],
  ];
  for (const [pattern, group] of prefixGroups) {
    if (pattern.test(name)) return group;
  }
  return normalized.includes('base token') ? 'base' : 'other';
}

function parseTokens(source) {
  const headers = [...source.matchAll(/\/\*\s*─{3}\s*(.*?)\s*─{3}/g)].map(
    (match) => ({ index: match.index, value: cleanComment(match[0]) }),
  );
  const comments = [...source.matchAll(/\/\*[\s\S]*?\*\//g)].map((match) => ({
    index: match.index,
    end: match.index + match[0].length,
    value: cleanComment(match[0]),
    isHeader: /─{3}/.test(match[0]),
  }));
  const tokens = new Map();

  for (const match of source.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:\s*([\s\S]*?);/gm)) {
    const [, name, rawValue] = match;
    if (tokens.has(name)) continue;

    const header = headers.filter((item) => item.index < match.index).at(-1)?.value ?? '';
    const preceding = comments
      .filter((item) => item.end <= match.index && !item.isHeader)
      .filter((item) => source.slice(item.end, match.index).trim() === '')
      .at(-1);
    const lineEnd = source.indexOf('\n', match.index + match[0].length);
    const trailingText = source.slice(
      match.index + match[0].length,
      lineEnd === -1 ? source.length : lineEnd,
    );
    const trailing = trailingText.match(/\/\*([\s\S]*?)\*\//);
    const comment = trailing ? cleanComment(trailing[0]) : preceding?.value ?? '';
    const value = rawValue.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();

    tokens.set(name, {
      name,
      value,
      group: groupFromHeader(header, name),
      comment,
    });
  }

  return [...tokens.values()].sort((a, b) => alpha(a.name, b.name));
}

function listFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  });
}

function parseRules(source) {
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  const stack = [];
  let boundary = 0;

  for (let index = 0; index < clean.length; index++) {
    const char = clean[index];
    if (char === '{') {
      stack.push({ start: index, selector: clean.slice(boundary, index).trim() });
      boundary = index + 1;
    } else if (char === '}') {
      const open = stack.pop();
      if (open) {
        rules.push({
          selector: open.selector,
          body: clean.slice(open.start + 1, index),
        });
      }
      boundary = index + 1;
    } else if (char === ';' && stack.length === 0) {
      boundary = index + 1;
    }
  }
  return rules;
}

function directDeclarations(body) {
  let depth = 0;
  let direct = '';
  for (const char of body) {
    if (char === '{') depth++;
    else if (char === '}') depth--;
    else if (depth === 0) direct += char;
  }
  return direct;
}

function declarationSignature(body) {
  const declarations = directDeclarations(body)
    .split(';')
    .map((declaration) => declaration.replace(/\s+/g, ' ').trim())
    .filter((declaration) => declaration.includes(':'))
    .map((declaration) => {
      const colon = declaration.indexOf(':');
      const property = declaration.slice(0, colon).trim().toLowerCase();
      const value = declaration.slice(colon + 1).trim();
      return `${property}:${value}`;
    })
    .sort(alpha);
  return declarations.length ? declarations.join(';') : '';
}

function parseClasses() {
  const classEntries = new Map();
  const signatures = new Map();

  for (const file of CLASS_FILES) {
    for (const rule of parseRules(read(file))) {
      const names = [
        ...new Set([...rule.selector.matchAll(/\.(-?[_A-Za-z]+[_A-Za-z0-9-]*)/g)].map((m) => m[1])),
      ].sort(alpha);
      if (names.length === 0) continue;

      const tokens = [
        ...new Set([...rule.body.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)].map((m) => m[1])),
      ];
      for (const name of names) {
        const key = `${file}:${name}`;
        const existing = classEntries.get(key) ?? {
          name,
          file,
          tokensUsed: new Set(),
          hover: false,
        };
        tokens.forEach((token) => existing.tokensUsed.add(token));
        existing.hover ||= new RegExp(`\\.${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}:hover\\b`).test(
          rule.selector,
        );
        classEntries.set(key, existing);
      }

      const signature = declarationSignature(rule.body);
      if (signature) {
        const group = signatures.get(signature) ?? new Set();
        names.forEach((name) => group.add(name));
        signatures.set(signature, group);
      }
    }
  }

  const classes = [...classEntries.values()]
    .map((entry) => ({
      name: entry.name,
      file: entry.file,
      tokensUsed: [...entry.tokensUsed].sort(alpha),
      hover: entry.hover,
    }))
    .sort((a, b) => alpha(a.name, b.name) || alpha(a.file, b.file));

  const duplicateClasses = [...signatures.entries()]
    .map(([signature, names]) => ({ signature, classes: [...names].sort(alpha) }))
    .filter((group) => group.classes.length > 1)
    .sort((a, b) => alpha(a.classes.join(','), b.classes.join(',')) || alpha(a.signature, b.signature));

  return { classes, duplicateClasses };
}

const tokens = parseTokens(read(TOKENS_FILE));
const sourceFiles = listFiles(join(ROOT, 'src'))
  .filter((file) => ['.astro', '.css'].includes(extname(file)))
  .map((file) => relative(ROOT, file))
  .sort(alpha);
const tokenConsumers = tokens.map(({ name }) => {
  const pattern = new RegExp(`var\\(\\s*${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=[,\\s)])`);
  const files = sourceFiles.filter((file) => pattern.test(read(file)));
  return { token: name, count: files.length, files };
});
const { classes, duplicateClasses } = parseClasses();
const unusedTokens = tokenConsumers.filter(({ count }) => count === 0).map(({ token }) => token);

const registry = {
  tokens,
  tokenConsumers,
  classes,
  duplicateClasses,
  stats: {
    tokenCount: tokens.length,
    classCount: classes.length,
    duplicateGroupCount: duplicateClasses.length,
    unusedTokens,
  },
};

writeFileSync(join(ROOT, OUTPUT_FILE), JSON.stringify(registry, null, 2) + '\n', 'utf8');
console.log(
  `ds-registry: ${tokens.length} tokens, ${classes.length} classes, ${duplicateClasses.length} duplicate groups, ${unusedTokens.length} unused tokens`,
);
