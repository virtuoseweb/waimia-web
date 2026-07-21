// Waimia · Test GF-1 (fonctionnel) de la brique chat-IA in-app (Φ3).
//
// Sans cle LLM reelle, on ne peut pas prouver un appel LLM de bout en bout. Ce test prouve ce qui
// EST prouvable sans cle, avec la reponse HTTP du LLM MOCKEE (fetchImpl injecte) :
//   1. dispatch de tool REEL in-process (ds_tokens, catalogue_search, page_compose) via les fonctions
//      partagees de mcp/catalogue-tools.mjs -- pas un second process MCP.
//   2. boucle agentique (run-chat) : le provider decide un tool_use -> execution reelle -> reinjection
//      -> reponse finale -> la boucle S'ARRETE correctement (Anthropic ET OpenAI).
//   3. page_compose produit un PageDocument valide (le doc applique au canvas du builder).
//   4. le factory jette ProviderNotConfiguredError quand la cle est absente (chemin du 503).
//
// A lancer APRES `pnpm build` (les tools lisent dist/client/library/*.json). Via : npx tsx.

import {
  runCatalogueSearch,
  runCatalogueGetSection,
} from '../mcp/catalogue-tools.mjs';
import { dispatchTool, LLM_TOOLS } from '../packages/apps-atelier/src/lib/chat/tools.ts';
import { runChatTurn } from '../packages/apps-atelier/src/lib/chat/run-chat.ts';
import { createProvider } from '../packages/apps-atelier/src/lib/chat/provider.ts';
import { createAnthropicProvider } from '../packages/apps-atelier/src/lib/chat/providers/anthropic.ts';
import { createOpenAiProvider } from '../packages/apps-atelier/src/lib/chat/providers/openai.ts';
import { ProviderNotConfiguredError } from '../packages/apps-atelier/src/lib/chat/types.ts';

let passed = 0;
let failed = 0;
function assert(cond, msg) {
  if (cond) {
    passed += 1;
    console.log(`  PASS · ${msg}`);
  } else {
    failed += 1;
    console.error(`  FAIL · ${msg}`);
  }
}

/** Fabrique une pseudo-Response (ok=true) a partir d'un objet JSON. */
function fakeResponse(bodyObj) {
  return {
    ok: true,
    status: 200,
    headers: { get: () => 'application/json' },
    json: async () => bodyObj,
    text: async () => JSON.stringify(bodyObj),
  };
}

/** fetchImpl scripte : renvoie les reponses de `sequence` dans l'ordre des appels. */
function scriptedFetch(sequence) {
  let i = 0;
  const calls = [];
  const fn = async (_url, init) => {
    calls.push(init);
    const body = sequence[Math.min(i, sequence.length - 1)];
    i += 1;
    return fakeResponse(body);
  };
  fn.calls = calls;
  return fn;
}

async function main() {
  console.log('== 1. Dispatch de tool REEL in-process (mcp/catalogue-tools) ==');
  const tokens = await dispatchTool('ds_tokens', { prefix: '--space' });
  assert(tokens.ok === true, 'ds_tokens s\'execute (ok)');
  assert(tokens.raw && Array.isArray(tokens.raw.tokens) && tokens.raw.tokens.length > 0, 'ds_tokens renvoie des tokens reels de tokens.css');

  const search = await dispatchTool('catalogue_search', { limit: 3 });
  assert(search.ok === true && Array.isArray(search.raw.results), 'catalogue_search s\'execute et renvoie des resultats');
  assert(search.raw.total > 0, `catalogue_search voit le catalogue reel (total=${search.raw?.total})`);

  const unknown = await dispatchTool('does_not_exist', {});
  assert(unknown.ok === false && unknown.result.startsWith('ERREUR'), 'un tool inconnu renvoie une erreur lisible (pas un crash)');

  console.log('== 2. LLM_TOOLS derive de la source unique ==');
  assert(LLM_TOOLS.some((t) => t.name === 'page_compose') && LLM_TOOLS.some((t) => t.name === 'catalogue_search'), 'LLM_TOOLS expose les tools attendus');

  console.log('== 3. Construction d\'une section valide depuis le catalogue reel ==');
  const first = runCatalogueSearch({ limit: 1 }).results[0];
  const type = first.type;
  const detail = runCatalogueGetSection({ type });
  const data = {};
  for (const slot of detail.slots || []) {
    if (slot.kind !== 'content' || !slot.required) continue;
    if (slot.bilingual) {
      data[`${slot.field}_fr`] = 'Contenu de test';
      data[`${slot.field}_en`] = 'Test content';
    } else {
      data[slot.field] = 'Contenu de test';
    }
  }
  console.log(`  (type choisi : ${type}, ${Object.keys(data).length} slot(s) requis rempli(s))`);

  console.log('== 4. Boucle agentique ANTHROPIC (mock HTTP) : tool_use -> exec reelle -> reponse finale ==');
  const anthropicSeq = [
    { content: [{ type: 'text', text: 'Je cherche des sections.' }, { type: 'tool_use', id: 't1', name: 'catalogue_search', input: { limit: 3 } }], stop_reason: 'tool_use' },
    { content: [{ type: 'tool_use', id: 't2', name: 'page_compose', input: { sections: [{ type, data }], meta: { collection: 'offres', slug: 'test-chat-ia', lang: 'fr', title_fr: 'Test' } } }], stop_reason: 'tool_use' },
    { content: [{ type: 'text', text: 'Page composee : 1 section.' }], stop_reason: 'end_turn' },
  ];
  const anthropicProvider = createAnthropicProvider({ apiKey: 'fake-key', fetchImpl: scriptedFetch(anthropicSeq) });
  const aRes = await runChatTurn({ provider: anthropicProvider, turns: [{ role: 'user', content: 'Compose une page.' }], maxSteps: 6 });
  assert(aRes.stopped === 'final', 'la boucle Anthropic s\'arrete sur une reponse finale');
  assert(aRes.toolTrace.some((t) => t.name === 'catalogue_search' && t.ok), 'catalogue_search a ete REELLEMENT execute dans la boucle');
  assert(aRes.toolTrace.some((t) => t.name === 'page_compose' && t.ok), 'page_compose a ete REELLEMENT execute dans la boucle');
  assert(aRes.pageDocument !== null && Array.isArray(aRes.pageDocument.sections) && aRes.pageDocument.sections.length === 1, 'un PageDocument a ete produit (applique au canvas)');
  assert(aRes.pageValid === true, `le PageDocument compose est VALIDE (pageValid=${aRes.pageValid})`);
  assert(aRes.text === 'Page composee : 1 section.', 'le texte final de l\'assistant est remonte');

  console.log('== 5. Boucle agentique OPENAI (mock HTTP) : function_call -> exec reelle -> reponse finale ==');
  const openaiSeq = [
    { output: [{ type: 'function_call', call_id: 'c1', name: 'ds_tokens', arguments: '{"prefix":"--paper"}' }] },
    { output: [{ type: 'message', content: [{ type: 'output_text', text: 'Voici les tokens.' }] }], output_text: 'Voici les tokens.' },
  ];
  const openaiProvider = createOpenAiProvider({ apiKey: 'fake-key', fetchImpl: scriptedFetch(openaiSeq) });
  const oRes = await runChatTurn({ provider: openaiProvider, turns: [{ role: 'user', content: 'Liste des tokens paper.' }], maxSteps: 4 });
  assert(oRes.stopped === 'final', 'la boucle OpenAI s\'arrete sur une reponse finale');
  assert(oRes.toolTrace.some((t) => t.name === 'ds_tokens' && t.ok), 'ds_tokens a ete REELLEMENT execute dans la boucle OpenAI');
  assert(oRes.text === 'Voici les tokens.', 'le texte final OpenAI est remonte');

  console.log('== 6. Factory : cle absente -> ProviderNotConfiguredError (chemin du 503) ==');
  let threw = false;
  try {
    createProvider({ provider: 'anthropic', apiKey: '' });
  } catch (err) {
    threw = err instanceof ProviderNotConfiguredError;
  }
  assert(threw, 'createProvider jette ProviderNotConfiguredError quand la cle est vide');

  console.log(`\n== RESULTAT : ${passed} PASS, ${failed} FAIL ==`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error('Test en erreur :', err);
  process.exit(1);
});
