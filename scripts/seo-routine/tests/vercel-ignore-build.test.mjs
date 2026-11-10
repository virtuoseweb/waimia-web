import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// « Ignored Build Step » de Vercel : exit 0 = déploiement sauté, 1 = déploiement. Le clone de Vercel est
// superficiel (le commit du dernier déploiement y est absent) : la liste des fichiers vient alors de
// l'API GitHub, ici simulée par un faux `curl`. Régression du 25 octobre 2026 : le commit d'état IndexNow
// était déployé pour rien parce que ce cas finissait toujours par « on déploie ».
const SCRIPT = fileURLToPath(new URL('../vercel-ignore-build.sh', import.meta.url));
const PREV = '7f1301a512108311f619ebbf6bed7590e9b25ee9';
const HEAD = 'ee4162049e26a332fd7268afd07f17190f835a39';

/** Dépôt à un seul commit (PREV y est donc absent) + faux curl qui rend `curlBody`, ou échoue si null. */
function sandbox(curlBody) {
  const dir = mkdtempSync(join(tmpdir(), 'ignore-build-'));
  const git = (...args) => spawnSync('git', args, { cwd: dir, encoding: 'utf8' });
  git('init', '-q');
  git('-c', 'user.name=t', '-c', 'user.email=t@t', 'commit', '-q', '--allow-empty', '-m', 'seul commit');
  const stub = join(dir, 'curl');
  writeFileSync(stub, curlBody === null ? '#!/bin/sh\nexit 22\n' : `#!/bin/sh\ncat <<'JSON'\n${curlBody}\nJSON\n`);
  chmodSync(stub, 0o755);
  return dir;
}

function run(dir, env = {}) {
  const r = spawnSync('bash', [SCRIPT], {
    cwd: dir,
    encoding: 'utf8',
    env: {
      PATH: `${dir}:${process.env.PATH}`,
      VERCEL_GIT_PREVIOUS_SHA: PREV,
      VERCEL_GIT_COMMIT_SHA: HEAD,
      VERCEL_GIT_REPO_OWNER: 'virtuoseweb',
      VERCEL_GIT_REPO_SLUG: 'waimia-web',
      ...env,
    },
  });
  return { code: r.status, out: r.stdout };
}

const files = (...names) => JSON.stringify({ files: names.map((filename) => ({ filename })) });

test('clone superficiel : seuls des fichiers de données ont changé, le déploiement est sauté', () => {
  const r = run(sandbox(files('docs/seo/data/state/indexnow.json', 'docs/seo/data/latest.json')));
  assert.equal(r.code, 0);
  assert.match(r.out, /déploiement sauté/);
});

test('clone superficiel : un fichier du site a changé, on déploie', () => {
  const r = run(sandbox(files('docs/seo/data/state/indexnow.json', 'src/content/blog/x.json')));
  assert.equal(r.code, 1);
  assert.match(r.out, /lus par le build ont changé, dont src\/content\/blog\/x\.json/);
});

// Décision du 6 novembre 2026 : ni preview par PR, ni build de production pour un changement que le
// build ne lit pas (doc, suivi, outillage Claude, workflows, tests, Markdown et captures racine).
test('production : doc, suivi, outillage, workflows, tests et fichiers racine seuls, le déploiement est sauté', () => {
  const r = run(sandbox(files(
    'docs/seo/journal.md', 'tasks/claude-board.json', '.claude/skills/x/SKILL.md', '.agents/skills/x/SKILL.md',
    '.github/workflows/ci.yml', 'tests/e2e/a.spec.ts', 'scripts/tests/a.test.mjs', 'AGENTS.md', 'capture.jpeg',
  )), { VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'main' });
  assert.equal(r.code, 0);
  assert.match(r.out, /sans effet sur le site/);
});

test('production : un fichier que le build lit (scripts, public, private, JSON racine, Markdown imbriqué), on déploie', () => {
  for (const f of ['scripts/gen-site-pages.mjs', 'public/images/a.webp', 'private/telechargements/a.pdf',
    'package.json', 'vercel.json', 'src/content/dashboard-seo/a.md', 'astro.config.mjs']) {
    const r = run(sandbox(files('docs/a.md', f)), { VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'main' });
    assert.equal(r.code, 1, f);
  }
});

test("preview d'une branche ordinaire : sautée, même quand le site change", () => {
  const r = run(sandbox(files('src/content/blog/x.json')), { VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'feat/seo-2026-11-06' });
  assert.equal(r.code, 0);
  assert.match(r.out, /pas de preview pour la branche « feat\/seo-2026-11-06 »/);
});

test('branche preview/… : sautée aussi, seule la production se construit (10 novembre 2026)', () => {
  const env = { VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'preview/atelier' };
  assert.equal(run(sandbox(files('src/content/blog/x.json')), env).code, 0);
});

test('dernier déploiement présent dans le clone : la liste vient de git diff', () => {
  const dir = sandbox(null);
  const git = (...args) => spawnSync('git', ['-c', 'user.name=t', '-c', 'user.email=t@t', ...args], { cwd: dir, encoding: 'utf8' });
  const base = git('rev-parse', 'HEAD').stdout.trim();
  writeFileSync(join(dir, 'NOTES.md'), 'doc\n');
  git('add', 'NOTES.md');
  git('commit', '-q', '-m', 'doc seule');
  const env = { VERCEL_ENV: 'production', VERCEL_GIT_PREVIOUS_SHA: base };
  assert.equal(run(dir, env).code, 0, 'Markdown racine seul : sauté');
  mkdirSync(join(dir, 'src'));
  writeFileSync(join(dir, 'src/page.astro'), '<p>x</p>\n');
  git('add', 'src/page.astro');
  git('commit', '-q', '-m', 'page');
  assert.equal(run(dir, env).code, 1, 'fichier du site : déployé');
});

test("clone superficiel : l'API échoue (limite de débit, 404), on déploie", () => {
  const r = run(sandbox(null));
  assert.equal(r.code, 1);
  assert.match(r.out, /liste GitHub indisponible/);
});

test('clone superficiel : liste vide ou illisible, on déploie', () => {
  assert.equal(run(sandbox(files())).code, 1);
  assert.equal(run(sandbox('pas du JSON')).code, 1);
});

test('clone superficiel : liste tronquée à 300 fichiers ou plus, on ne se prononce pas : on déploie', () => {
  const many = files(...Array.from({ length: 300 }, (_, i) => `docs/seo/data/f${i}.json`));
  assert.equal(run(sandbox(many)).code, 1);
});

test('dépôt ou SHA inconnus, ou aucun déploiement précédent : on déploie', () => {
  const dir = sandbox(files('docs/seo/data/latest.json'));
  assert.equal(run(dir, { VERCEL_GIT_REPO_OWNER: '', VERCEL_GIT_REPO_SLUG: '' }).code, 1);
  assert.equal(run(dir, { VERCEL_GIT_PREVIOUS_SHA: '' }).code, 1);
});
