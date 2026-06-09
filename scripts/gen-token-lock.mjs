#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = 'src/styles/tokens.css';
const OUTPUT = 'design-system.lock.json';
const source = readFileSync(join(ROOT, SOURCE), 'utf8');
const tokens = [...new Set([...source.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)].map((match) => match[1]))].sort();
const lock = { generatedFrom: SOURCE, tokenCount: tokens.length, tokens };

writeFileSync(join(ROOT, OUTPUT), JSON.stringify(lock, null, 2) + '\n', 'utf8');
console.log(`token-lock: ${tokens.length} tokens written to ${OUTPUT}`);
