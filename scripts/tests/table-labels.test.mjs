import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const { labelTableCells } = await import(pathToFileURL(join(process.cwd(), 'src/lib/table-labels.ts')).href);

const TABLE = '<table><thead><tr><th>Mode</th><th>Ce que fait <em>Claude</em></th></tr></thead><tbody>'
  + '<tr><td><strong>Manually</strong></td><td>Demande « accord »</td></tr>'
  + '<tr><td>Auto</td><td>Enchaîne</td></tr></tbody></table>';

test('chaque cellule reçoit le libellé de sa colonne, balises retirées', () => {
  const out = labelTableCells(TABLE);
  assert.equal((out.match(/data-label="Mode"/g) ?? []).length, 2);
  assert.equal((out.match(/data-label="Ce que fait Claude"/g) ?? []).length, 2);
  assert.ok(!/<th[^>]*data-label/.test(out), 'les en-têtes ne sont pas étiquetés');
});

test('idempotent, et sans effet hors tableau', () => {
  const once = labelTableCells(TABLE);
  assert.equal(labelTableCells(once), once);
  assert.equal(labelTableCells('<p>Texte</p>'), '<p>Texte</p>');
});

test('tableau sans en-tête, libellé guillemet : rien de cassé', () => {
  const bare = '<table><tr><td>a</td><td>b</td></tr></table>';
  assert.equal(labelTableCells(bare), bare);
  const q = labelTableCells('<table><thead><tr><th>Dit "oui"</th></tr></thead><tbody><tr><td>x</td></tr></tbody></table>');
  assert.ok(q.includes('data-label="Dit &quot;oui&quot;"'));
});
