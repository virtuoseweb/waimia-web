// Smoke test du serveur MCP refactore (audit 09) : verifie que les 8 tools repondent toujours via
// stdio (JSON-RPC newline-delimited brut, pas de dependance SDK dans ce script) apres l'extraction de
// la logique dans catalogue-tools.mjs. A lancer apres `pnpm build`.
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srv = spawn('node', [path.join(ROOT, 'mcp/waimia-catalogue-server.mjs')], { stdio: ['pipe', 'pipe', 'inherit'] });

let buf = '';
const waiters = new Map();
srv.stdout.on('data', (chunk) => {
  buf += chunk.toString();
  let nl;
  while ((nl = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && waiters.has(msg.id)) {
      waiters.get(msg.id)(msg);
      waiters.delete(msg.id);
    }
  }
});

function rpc(id, method, params) {
  return new Promise((resolve) => {
    waiters.set(id, resolve);
    srv.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
  });
}
function notify(method, params) {
  srv.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', method, params })}\n`);
}

let pass = 0, fail = 0;
const ok = (c, m) => (c ? (pass++, console.log(`  PASS · ${m}`)) : (fail++, console.error(`  FAIL · ${m}`)));

await rpc(1, 'initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'smoke', version: '0.0.1' } });
notify('notifications/initialized', {});

const list = await rpc(2, 'tools/list', {});
const names = (list.result?.tools ?? []).map((t) => t.name).sort();
console.log('tools:', names.join(', '));
ok(names.length === 8, `8 tools exposes (${names.length})`);
for (const n of ['builder_list_drafts', 'builder_save_draft', 'catalogue_get_preset', 'catalogue_get_section', 'catalogue_search', 'ds_tokens', 'page_compose', 'preview_render']) {
  ok(names.includes(n), `tool present : ${n}`);
}

const search = await rpc(3, 'tools/call', { name: 'catalogue_search', arguments: { limit: 2 } });
const searchJson = JSON.parse(search.result.content[0].text);
ok(!search.result.isError && searchJson.total > 0, `catalogue_search repond (total=${searchJson.total})`);
const type = searchJson.results[0].type;

const detail = await rpc(4, 'tools/call', { name: 'catalogue_get_section', arguments: { type } });
ok(!detail.result.isError, `catalogue_get_section repond pour ${type}`);

const unknown = await rpc(5, 'tools/call', { name: 'catalogue_get_section', arguments: { type: 'zzz-nope' } });
ok(unknown.result.isError === true, 'catalogue_get_section -> isError pour type inconnu');

const tokens = await rpc(6, 'tools/call', { name: 'ds_tokens', arguments: { prefix: '--space' } });
ok(!tokens.result.isError && JSON.parse(tokens.result.content[0].text).count > 0, 'ds_tokens repond');

const compose = await rpc(7, 'tools/call', { name: 'page_compose', arguments: { sections: [{ type }], meta: { collection: 'offres', slug: 'smoke' } } });
ok(!compose.result.isError && JSON.parse(compose.result.content[0].text).pageDocument, 'page_compose construit un pageDocument');

srv.kill();
console.log(`\n== SMOKE : ${pass} PASS, ${fail} FAIL ==`);
process.exit(fail > 0 ? 1 : 0);
