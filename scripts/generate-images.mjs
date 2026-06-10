#!/usr/bin/env node
/**
 * generate-images.mjs : pipeline d'images génératives gpt-image-2 (DA Waimia).
 *
 * Usage :
 *   node scripts/generate-images.mjs            génère les images manquantes (sortie WebP q82)
 *   node scripts/generate-images.mjs --force    régénère tout
 *   node scripts/generate-images.mjs --only <slug>  régénère une seule entrée
 *   node scripts/generate-images.mjs --png      conserve le PNG brut au lieu de WebP (debug)
 *   node scripts/generate-images.mjs --help     affiche l'aide
 *
 * Clé API : OPENAI_API_KEY (env) sinon parse de /Users/simonberos/waimia-web/.env.openai
 * Manifeste : src/data/image-manifest.json (stylePrefix + entrées)
 * Sorties : public/images/<category>/<slug>.webp (q82)  — ou .png avec --png
 *
 * Node >= 20, dépendance : sharp (deja présent via pnpm astro).
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST_PATH = join(ROOT, 'src/data/image-manifest.json');
const OUT_ROOT = join(ROOT, 'public/images');
const ENV_FILE = '/Users/simonberos/waimia-web/.env.openai';
const API_URL = 'https://api.openai.com/v1/images/generations';
const DELAY_MS = 2000;
const MAX_RETRIES = 2;
const WEBP_QUALITY = 82;

// Load sharp from pnpm store (peer dep via astro/lightningcss, always present).
// Supports both a standalone install (node_modules in ROOT) and a pnpm worktree
// where node_modules lives in the repo root one level above .worktrees/<name>/.
let sharp;
try {
  // Walk up from ROOT: try direct node_modules/sharp, then pnpm .pnpm store
  let sharpDir = null;
  let searchDir = ROOT;
  for (let i = 0; i < 5 && !sharpDir; i += 1) {
    const direct = join(searchDir, 'node_modules', 'sharp');
    if (existsSync(direct)) { sharpDir = direct; break; }
    const pnpmBase = join(searchDir, 'node_modules', '.pnpm');
    if (existsSync(pnpmBase)) {
      for (const entry of readdirSync(pnpmBase)) {
        if (entry.startsWith('sharp@')) {
          const p = join(pnpmBase, entry, 'node_modules', 'sharp');
          if (existsSync(p)) { sharpDir = p; break; }
        }
      }
    }
    const parent = dirname(searchDir);
    if (parent === searchDir) break;
    searchDir = parent;
  }
  if (!sharpDir) throw new Error('sharp non trouvé dans node_modules (ni direct ni pnpm store)');
  const req = createRequire(join(sharpDir, 'package.json'));
  sharp = req(sharpDir);
} catch (err) {
  console.error(`ERREUR : impossible de charger sharp (${err.message}). Installer : pnpm add sharp`);
  process.exit(1);
}

function usage() {
  console.log(`generate-images.mjs : génère les images du manifeste via gpt-image-2.

Options :
  --force         régénère même si le fichier de sortie existe
  --only <slug>   ne traite que l'entrée <slug> (implique régénération)
  --png           conserve le PNG brut en sortie (debug) ; par défaut : WebP q${WEBP_QUALITY}
  --help          affiche cette aide`);
}

function parseArgs(argv) {
  const args = { force: false, only: null, help: false, png: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--force') args.force = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else if (a === '--png') args.png = true;
    else if (a === '--only') {
      args.only = argv[i + 1] ?? null;
      i += 1;
      if (!args.only) {
        console.error('ERREUR : --only attend un slug.');
        process.exit(1);
      }
    } else {
      console.error(`ERREUR : option inconnue "${a}". Voir --help.`);
      process.exit(1);
    }
  }
  return args;
}

function loadApiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY.trim();
  try {
    const raw = readFileSync(ENV_FILE, 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*OPENAI_API_KEY\s*=\s*(.+)\s*$/);
      if (m) return m[1].trim().replace(/^["']|["']$/g, '');
    }
  } catch {
    // fichier absent : on tombe sur l'erreur ci-dessous
  }
  console.error(`ERREUR : clé OpenAI introuvable (ni OPENAI_API_KEY, ni ${ENV_FILE}).`);
  process.exit(1);
}

function loadManifest() {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (err) {
    console.error(`ERREUR : manifeste illisible (${MANIFEST_PATH}) : ${err.message}`);
    process.exit(1);
  }
  if (!parsed || typeof parsed.stylePrefix !== 'string' || !Array.isArray(parsed.images)) {
    console.error('ERREUR : le manifeste doit contenir { stylePrefix: string, images: [] }.');
    process.exit(1);
  }
  return parsed;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateOne(apiKey, prompt, size, quality) {
  let lastError;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: 'gpt-image-2', prompt, size, quality, n: 1 }),
      });
      if (res.status >= 500) {
        lastError = new Error(`HTTP ${res.status}`);
      } else if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTTP ${res.status} : ${body.slice(0, 300)}`);
      } else {
        const json = await res.json();
        const b64 = json?.data?.[0]?.b64_json;
        if (!b64) throw new Error('réponse sans b64_json');
        return Buffer.from(b64, 'base64');
      }
    } catch (err) {
      // erreurs réseau (fetch reject) et 5xx : retry ; erreurs 4xx : relancées au-dessus
      if (err.message.startsWith('HTTP 4') || err.message.includes('b64_json')) throw err;
      lastError = err;
    }
    if (attempt < MAX_RETRIES) {
      console.log(`    retry ${attempt + 1}/${MAX_RETRIES} dans ${DELAY_MS} ms (${lastError.message})`);
      await sleep(DELAY_MS);
    }
  }
  throw lastError ?? new Error('échec inconnu');
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }
  const manifest = loadManifest();
  const apiKey = loadApiKey();

  const ext = args.png ? 'png' : 'webp';

  let entries = manifest.images;
  if (args.only) {
    entries = entries.filter((e) => e.slug === args.only);
    if (entries.length === 0) {
      console.error(`ERREUR : slug "${args.only}" introuvable dans le manifeste.`);
      process.exit(1);
    }
  }

  const summary = { generated: [], skipped: [], failed: [] };

  for (const entry of entries) {
    const { slug, category, size, quality = 'medium', prompt } = entry;
    const outPath = join(OUT_ROOT, category, `${slug}.${ext}`);

    if (!args.force && !args.only && existsSync(outPath)) {
      console.log(`[skip] ${category}/${slug}.${ext} existe déjà`);
      summary.skipped.push(slug);
      continue;
    }

    const fullPrompt = `${manifest.stylePrefix} ${prompt}`;
    console.log(`[gen ] ${category}/${slug} (${size}, ${quality}) -> .${ext}`);
    const start = Date.now();
    try {
      const pngBuffer = await generateOne(apiKey, fullPrompt, size, quality);
      let outBuffer;
      if (args.png) {
        outBuffer = pngBuffer;
      } else {
        outBuffer = await sharp(pngBuffer).webp({ quality: WEBP_QUALITY }).toBuffer();
      }
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, outBuffer);
      const secs = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  ok  ${slug} : ${outBuffer.length} octets en ${secs} s`);
      summary.generated.push(slug);
    } catch (err) {
      console.error(`  FAIL ${slug} : ${err.message}`);
      summary.failed.push(slug);
    }
    await sleep(DELAY_MS);
  }

  console.log('\nRécapitulatif :');
  console.log(`  générées : ${summary.generated.length} ${summary.generated.join(', ')}`);
  console.log(`  skippées : ${summary.skipped.length} ${summary.skipped.join(', ')}`);
  console.log(`  échouées : ${summary.failed.length} ${summary.failed.join(', ')}`);
  if (summary.failed.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(`ERREUR fatale : ${err.message}`);
  process.exit(1);
});
