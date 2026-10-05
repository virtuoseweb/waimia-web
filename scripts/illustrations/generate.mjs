#!/usr/bin/env node
/**
 * Génère une illustration Waimia DIRECTEMENT dans sa palette finale (aucun filtre après coup).
 *
 *   node scripts/illustrations/generate.mjs <slug> "<subject in English>" \
 *     [--palette duotone|tritone] [--cast <distribution>] [--quality high|medium] [--attempts 3] [--no-ink]
 *
 * Étapes :
 *   1. Variante claire : prompt = dessin (style.json) + palette `<palette>-paper` + sujet.
 *      Génération 1536×1024, recadrage central 7:3, largeur 1456, WebP q82.
 *   2. Variante sombre : édition de l'image claire (/v1/images/edits) avec la palette
 *      `<palette>-ink` → même dessin, recoloré par le modèle.
 *   3. palette-check sur chaque variante ; si non conforme, on RÉGÉNÈRE (jusqu'à --attempts).
 * Sorties : public/images/illustrations/ds/<slug>-paper.webp et <slug>-ink.webp
 *           .illustrations-tmp/<slug>.* (PNG bruts + prompts, gitignoré)
 * Puis : node scripts/illustrations/add-illustration.mjs <slug> --palette … --alt-fr … --alt-en … --tags …
 *
 * Clé : OPENAI_API_KEY (env) sinon .env.openai (gitignoré). Modèle : OPENAI_IMAGE_MODEL (défaut gpt-image-2).
 */
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, STYLE, loadSharp, parseArgs, checkPalette } from './_lib.mjs';

const { flags, positional } = parseArgs(process.argv.slice(2), ['no-ink']);
const [slug, subject] = positional;
const family = flags.palette ?? (flags.cast ? STYLE.casts[flags.cast]?.family : 'duotone') ?? 'duotone';
const castName = flags.cast ?? STYLE.default_cast[family];
const cast = STYLE.casts[castName];
if (!cast || cast.family !== family) throw new Error(`Distribution ${castName} absente ou incompatible avec ${family}`);
if (!slug || !subject || !['duotone', 'tritone'].includes(family)) {
  console.log('Usage : generate.mjs <slug> "<subject>" [--palette duotone|tritone] [--quality high] [--attempts 3] [--no-ink]');
  process.exit(1);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) throw new Error(`Slug invalide (kebab-case) : ${slug}`);

const sharp = loadSharp();
const MODEL = process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-2';
const quality = flags.quality ?? 'high';
const attempts = Number(flags.attempts ?? 3);
const TMP = join(ROOT, '.illustrations-tmp');
const DS = join(ROOT, 'public/images/illustrations/ds');
mkdirSync(TMP, { recursive: true });

function apiKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const f = join(ROOT, '.env.openai');
  const m = existsSync(f) && readFileSync(f, 'utf8').match(/^OPENAI_API_KEY\s*=\s*"?([^"\n]+)"?/m);
  if (m) return m[1].trim();
  throw new Error('OPENAI_API_KEY absente (env ou .env.openai).');
}

async function call(endpoint, init) {
  const res = await fetch(`https://api.openai.com/v1/images/${endpoint}`, {
    method: 'POST',
    ...init,
    headers: { Authorization: `Bearer ${apiKey()}`, ...(init.headers ?? {}) },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} : ${(await res.text()).slice(0, 300)}`);
  const b64 = (await res.json())?.data?.[0]?.b64_json;
  if (!b64) throw new Error('réponse sans b64_json');
  return Buffer.from(b64, 'base64');
}

const generate = (prompt) =>
  call('generations', {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, size: STYLE.size, quality, n: 1 }),
  });

function edit(png, prompt) {
  const form = new FormData();
  form.append('model', MODEL);
  form.append('prompt', prompt);
  form.append('size', STYLE.size);
  form.append('quality', quality);
  form.append('image', new Blob([png], { type: 'image/png' }), 'source.png');
  return call('edits', { body: form });
}

/** Recadrage central 7:3 + largeur cible → WebP final. */
async function finalize(raw, file) {
  const meta = await sharp(raw).metadata();
  const [rw, rh] = STYLE.crop_ratio.split(':').map(Number);
  const h = Math.min(meta.height, Math.round((meta.width * rh) / rw));
  await sharp(raw)
    .extract({ left: 0, top: Math.round((meta.height - h) / 2), width: meta.width, height: h })
    .resize({ width: STYLE.output_width })
    .webp({ quality: 82, effort: 6 })
    .toFile(file);
}

async function produce(tone, makeRaw, prompt) {
  const palette = `${family}-${tone}`;
  const file = join(DS, `${slug}-${tone}.webp`);
  writeFileSync(join(TMP, `${slug}-${tone}.prompt.txt`), prompt);
  for (let i = 1; i <= attempts; i += 1) {
    const raw = await makeRaw(prompt);
    writeFileSync(join(TMP, `${slug}-${tone}-try${i}.png`), raw);
    await finalize(raw, file);
    const r = await checkPalette(file, palette);
    console.log(`${r.pass ? '✓' : '✗'} ${tone} essai ${i}/${attempts} · ΔE ${r.meanDeltaE.toFixed(1)} · couverture ${(r.coverage * 100).toFixed(0)} %${family === 'tritone' ? ` · bleu ${(r.blueShare * 100).toFixed(0)} %` : ''}${r.reasons.length ? ` · ${r.reasons.join(' ; ')}` : ''}`);
    if (r.pass) return raw;
  }
  throw new Error(`${palette} non conforme après ${attempts} essais : reformuler le sujet (contrastes de valeurs, zones bleues) et relancer.`);
}

const anchors = `Match the house style of these existing illustrations (style only, do not copy their subjects):\n- ${STYLE.style_anchors.join('\n- ')}`;
const base = `${STYLE.drawing_prompt}\n\n${anchors}\n\nColor rendering: ${STYLE.palettes[`${family}-paper`].prompt}\n${cast.prompt}\n\nSubject: ${subject}\n\nAvoid: ${STYLE.negative_prompt}`;
const paperRaw = await produce('paper', generate, base);

if (!flags['no-ink']) {
  const inkPrompt = `${STYLE.ink_from_paper_prompt}${STYLE.palettes[`${family}-ink`].prompt} Keep the same color roles (which area is background, subject, accent), only darkened to this palette.\n\nAvoid: ${STYLE.negative_prompt}`;
  const png = await sharp(paperRaw).png().toBuffer();
  await produce('ink', (p) => edit(png, p), inkPrompt);
}
console.log(`→ Vérifier visuellement public/images/illustrations/ds/${slug}-paper.webp${flags['no-ink'] ? '' : ` et ${slug}-ink.webp`}, puis add-illustration.mjs.`);
