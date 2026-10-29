import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, writeFileSync } from 'node:fs';
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
  assert.match(r.out, /hors docs\/seo\/data\//);
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
