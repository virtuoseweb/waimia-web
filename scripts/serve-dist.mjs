#!/usr/bin/env node
/**
 * serve-dist.mjs · Serveur statique minimal pour dist/ (build Astro `output: 'static'`).
 *
 * Pourquoi : l'adapter @astrojs/vercel peut désactiver `astro preview`. Ce serveur sert
 * le dossier dist/ en respectant `trailingSlash: 'never'` (mappe /preview/foo →
 * dist/preview/foo/index.html OU dist/preview/foo.html). Utilisé par le sweep GF-1 cloud.
 *
 * Usage : node scripts/serve-dist.mjs [--port 4321] [--root dist]
 */
import http from 'node:http';
import { promises as fs } from 'node:fs';
import { existsSync } from 'node:fs';
import { resolve, join, extname } from 'node:path';

const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { args[argv[i].slice(2)] = argv[i + 1]; i++; }
}
const PORT = parseInt(args.port || '4321', 10);
const ROOT = resolve(args.root || 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
  '.map': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
};

async function resolveFile(pathname) {
  const p = decodeURIComponent(pathname.split('?')[0]);
  const candidates = [];
  if (p.endsWith('/')) {
    candidates.push(join(ROOT, p, 'index.html'));
  } else {
    candidates.push(join(ROOT, p));            // asset direct (/_astro/x.css)
    candidates.push(join(ROOT, p + '.html'));  // trailingSlash:never → foo.html
    candidates.push(join(ROOT, p, 'index.html')); // foo/index.html
  }
  for (const c of candidates) {
    if (existsSync(c) && (await fs.stat(c)).isFile()) return c;
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  try {
    let file = await resolveFile(req.url || '/');
    if (!file) {
      const fallback = join(ROOT, '404.html');
      if (existsSync(fallback)) { file = fallback; res.statusCode = 404; }
      else { res.statusCode = 404; res.end('Not found'); return; }
    }
    const body = await fs.readFile(file);
    res.setHeader('Content-Type', MIME[extname(file)] || 'application/octet-stream');
    res.end(body);
  } catch (e) {
    res.statusCode = 500;
    res.end('Server error: ' + e.message);
  }
});

server.listen(PORT, () => {
  process.stderr.write(`serve-dist · http://localhost:${PORT} → ${ROOT}\n`);
});
