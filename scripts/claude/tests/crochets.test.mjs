// Épreuves des crochets de scripts/claude et du miroir de skills.
//
//   node --test scripts/claude/tests/

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { attendUnMotif, decider as deciderAttente } from '../crochet-attente.mjs';
import { decider as deciderRessources, estLourde, estProcessusLourd } from '../crochet-ressources.mjs';

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const entree = (command) => ({ tool_input: { command } });
const BUILD = { pid: 4242, command: 'node /x/node_modules/.bin/astro build' };
const sortie = (script, stdin) => spawnSync(process.execPath, [join(RACINE, 'scripts/claude', script)], { encoding: 'utf8', input: stdin });

// ---- crochet-attente ----
test('attente refuse : until/while sur pgrep -f, y compris après && et entre guillemets', () => {
  assert.equal(attendUnMotif('until ! pgrep -f "astro build" >/dev/null; do sleep 5; done'), true);
  assert.equal(attendUnMotif('cd x && while pgrep -fl vitest; do sleep 1; done'), true);
  assert.equal(attendUnMotif('bash -c "until ! pgrep -f astro; do sleep 1; done"'), true);
  assert.equal(deciderAttente(entree('until ! pgrep -f astro; do sleep 1; done')).hookSpecificOutput.permissionDecision, 'deny');
});

test('attente accepte : attente par PID, pgrep sans -f, texte de commit', () => {
  assert.equal(attendUnMotif('until ! kill -0 4242; do sleep 1; done'), false);
  assert.equal(attendUnMotif('pgrep node'), false);
  assert.equal(attendUnMotif("git commit -F - <<'EOF'\nrefuse until ... pgrep -f\nEOF"), false);
  assert.equal(deciderAttente(entree('ls')), null);
});

test('attente : entrée invalide = aucune sortie, code 0', () => {
  for (const stdin of ['', 'pas du json', '{}', '{"tool_input":{"command":42}}']) {
    const r = sortie('crochet-attente.mjs', stdin);
    assert.equal(r.status, 0);
    assert.equal(r.stdout, '');
  }
});

test('attente : la boucle fautive est refusée par le script réel', () => {
  const r = sortie('crochet-attente.mjs', JSON.stringify(entree('until ! pgrep -f astro; do sleep 1; done')));
  assert.equal(r.status, 0);
  assert.equal(JSON.parse(r.stdout).hookSpecificOutput.permissionDecision, 'deny');
});

// ---- crochet-ressources ----
test('ressources reconnaît les commandes lourdes et laisse passer les autres', () => {
  for (const c of [
    'npx -y pnpm@9.15.0 build',
    'WAIMIA_INTERNAL_TOOLS=0 npx -y pnpm@9.15.0 build',
    'cd x && npm run build',
    'npx -y pnpm@9.15.0 exec astro check',
    'npx astro build',
    'npx playwright test e2e/a.spec.ts',
    'pnpm install --frozen-lockfile',
    'npm ci',
    'npx lighthouse http://localhost:4321',
  ]) assert.equal(estLourde(c), true, c);
  for (const c of ['ls -la', 'git status', 'node scripts/check-seo.mjs', 'npm run check:seo', 'node --test scripts/claude/tests/', "git commit -F - <<'EOF'\npnpm build\nEOF", "ps aux | grep 'astro build'", 'pgrep -fl "pnpm install"']) {
    assert.equal(estLourde(c), false, c);
  }
});

test('ressources : commande lourde refusée avec un build en cours, PID et remède nommés', () => {
  const r = deciderRessources(entree('npx -y pnpm@9.15.0 build'), [{ pid: 1, command: '/sbin/launchd' }, BUILD]);
  assert.equal(r.hookSpecificOutput.hookEventName, 'PreToolUse');
  assert.equal(r.hookSpecificOutput.permissionDecision, 'deny');
  assert.match(r.hookSpecificOutput.permissionDecisionReason, /PID 4242/u);
  assert.match(r.hookSpecificOutput.permissionDecisionReason, /astro build/u);
  assert.match(r.hookSpecificOutput.permissionDecisionReason, /notification/u);
});

test('ressources : commande lourde acceptée sans lourd en cours', () => {
  assert.equal(deciderRessources(entree('npx -y pnpm@9.15.0 build'), []), null);
  assert.equal(deciderRessources(entree('npx -y pnpm@9.15.0 build'), [{ pid: 1, command: '/sbin/launchd' }, { pid: 2, command: 'node serveur.js' }]), null);
});

test('ressources : commande non lourde acceptée malgré un build en cours', () => {
  assert.equal(deciderRessources(entree('git status'), [BUILD]), null);
  assert.equal(deciderRessources(entree('node scripts/check-seo.mjs'), [BUILD]), null);
});

test('ressources : l échappatoire WAIMIA_LOURD_OK=1 accepte', () => {
  assert.equal(deciderRessources(entree('WAIMIA_LOURD_OK=1 npx -y pnpm@9.15.0 build'), [BUILD]), null);
});

test('ressources : le shell d enveloppe et le crochet ne comptent pas comme lourds', () => {
  assert.equal(estProcessusLourd('/bin/zsh -c eval "npx -y pnpm@9.15.0 build"'), false);
  assert.equal(estProcessusLourd('grep astro build'), false);
  assert.equal(estProcessusLourd('node scripts/claude/crochet-ressources.mjs astro build'), false);
  assert.equal(estProcessusLourd('node /x/node_modules/.bin/astro build'), true);
  assert.equal(estProcessusLourd('node /usr/lib/pnpm.cjs run build'), true);
  assert.equal(estProcessusLourd('node /x/playwright test'), true);
});

test('ressources : entrée invalide = aucune sortie, code 0', () => {
  for (const stdin of ['', 'pas du json', '{}', '{"tool_input":{"command":42}}', 'null']) {
    const r = sortie('crochet-ressources.mjs', stdin);
    assert.equal(r.status, 0, stdin);
    assert.equal(r.stdout, '', stdin);
  }
  assert.equal(deciderRessources(null, [BUILD]), null);
  assert.equal(deciderRessources({}, [BUILD]), null);
});

test('ressources : une commande non lourde ne produit rien par le script réel', () => {
  const r = sortie('crochet-ressources.mjs', JSON.stringify(entree('ls')));
  assert.equal(r.status, 0);
  assert.equal(r.stdout, '');
});

// ---- miroir de skills ----
for (const nom of ['ecrire-un-brief', 'integrer-un-lot', 'prouver-une-page', 'optimiser-une-page-seo', 'lire-un-gros-volume']) {
  test(`skill ${nom} : .agents/skills identique à .claude/skills`, () => {
    const claude = readFileSync(join(RACINE, '.claude/skills', nom, 'SKILL.md'), 'utf8');
    const codex = readFileSync(join(RACINE, '.agents/skills', nom, 'SKILL.md'), 'utf8');
    assert.ok(claude.startsWith(`---\nname: ${nom}\n`));
    assert.equal(codex, claude);
  });
}
