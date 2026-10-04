/**
 * Utilitaires partagés de la routine SEO : dates, semaines ISO, lecture/écriture JSON, réseau.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { gunzipSync } from 'node:zlib';
import { USER_AGENT } from '../config.mjs';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** AAAA-MM-JJ en UTC. */
export function ymd(date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

/** Semaine ISO 8601 au format AAAA-Www (ex. 2026-W41). */
export function isoWeek(date = new Date()) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export async function readJson(path, fallback = null) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return fallback;
    throw new Error(`JSON illisible : ${path} (${err.message})`);
  }
}

export async function writeJson(path, data) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

/**
 * GET texte avec délai maximal, User-Agent explicite et une nouvelle tentative sur erreur
 * réseau ou 5xx. Lève une erreur lisible (statut HTTP inclus) sinon.
 */
export async function fetchText(url, { timeoutMs = 25000, retries = 1, headers = {} } = {}) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        signal: AbortSignal.timeout(timeoutMs),
        headers: {
          'user-agent': USER_AGENT,
          accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*;q=0.5',
          ...headers,
        },
      });
      if (!res.ok) {
        const error = new Error(`HTTP ${res.status} sur ${url}`);
        error.status = res.status;
        if (res.status >= 500 && attempt < retries) {
          lastError = error;
          await sleep(1500);
          continue;
        }
        throw error;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      // Sitemap .xml.gz servi tel quel (sans Content-Encoding) : signature gzip 1f 8b.
      if (buf.length > 2 && buf[0] === 0x1f && buf[1] === 0x8b) return gunzipSync(buf).toString('utf8');
      return buf.toString('utf8');
    } catch (err) {
      lastError = err;
      if (err.status && err.status < 500) break;
      if (attempt < retries) await sleep(1500);
    }
  }
  const cause = lastError?.cause?.code ? ` (${lastError.cause.code})` : '';
  throw new Error(`${lastError?.message ?? 'échec réseau'}${cause}${lastError?.status ? '' : ` sur ${url}`}`);
}

/** Exécute `worker` sur chaque élément avec une concurrence bornée. */
export async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const i = next;
      next += 1;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

/** Normalise une URL pour comparaison : sans fragment, sans paramètres de suivi, sans slash final. */
export function normalizeUrl(raw) {
  try {
    const u = new URL(raw.trim());
    u.hash = '';
    for (const key of [...u.searchParams.keys()]) {
      if (/^(utm_|fbclid$|gclid$|mc_cid$|mc_eid$|ref$|source$)/i.test(key)) u.searchParams.delete(key);
    }
    let out = u.toString();
    if (out.endsWith('/') && u.pathname !== '/') out = out.slice(0, -1);
    if (u.pathname === '/' && !u.search) out = out.replace(/\/$/, '');
    return out;
  } catch {
    return raw.trim();
  }
}

/** Minuscules, sans accents, espaces réduits : pour comparer des requêtes et des titres. */
export function normalizeText(s) {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Vrai si le fichier est lancé directement (node fichier.mjs) et non importé. */
export function isMain(importMetaUrl) {
  return process.argv[1] && importMetaUrl === new URL(`file://${process.argv[1]}`).href;
}
