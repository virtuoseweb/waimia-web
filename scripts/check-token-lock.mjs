#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = 'packages/ds-tokens/tokens.css';
const LOCK = 'design-system.lock.json';
const enforce = process.env.DS_TOKEN_LOCK_ENFORCE === '1';

if (!existsSync(join(ROOT, LOCK))) {
  console.warn(`token-lock WARNING: ${LOCK} is missing`);
  console.warn(`token-lock summary: 0 tokens in lock, current tokens unknown`);
  process.exit(enforce ? 1 : 0);
}

const source = readFileSync(join(ROOT, SOURCE), 'utf8');
const current = new Set([...source.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)].map((match) => match[1]));
const lock = JSON.parse(readFileSync(join(ROOT, LOCK), 'utf8'));
const locked = new Set(lock.tokens);
const added = [...current].filter((token) => !locked.has(token)).sort();

if (added.length > 0) {
  console.warn(`token-lock WARNING: ${added.length} new token(s) absent from ${LOCK}`);
  added.forEach((token) => console.warn(`  - ${token}`));
} else {
  console.log(`token-lock: no new tokens`);
}
console.log(`token-lock summary: ${locked.size} tokens in lock, ${added.length} new tokens`);
process.exit(enforce && added.length > 0 ? 1 : 0);
