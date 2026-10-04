/**
 * Écrit un court récapitulatif du run (Markdown) à partir de docs/seo/data/latest.json.
 * Dans GitHub Actions, il s'ajoute au résumé du job ($GITHUB_STEP_SUMMARY) ; ailleurs, il
 * s'affiche sur la sortie standard. Usage : node scripts/seo-routine/job-summary.mjs
 */
import { appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA_DIR } from './config.mjs';
import { readJson } from './lib/util.mjs';

const s = await readJson(join(DATA_DIR, 'latest.json'), null);
const lines = [];
if (!s) {
  lines.push('Routine SEO : aucun résumé produit.');
} else {
  lines.push(`## Routine SEO · ${s.week}`, '', '| Étape | État | Détail |', '| --- | --- | --- |');
  for (const [name, st] of Object.entries(s.steps)) lines.push(`| ${name} | ${st.status} | ${(st.error ?? '').replace(/\|/g, '/')} |`);
  lines.push('');
  if (s.performance) {
    const k = s.performance.kpi.last28;
    lines.push(`Search Console, 28 jours : ${k.clicks.current} clics (${k.clicks.delta >= 0 ? '+' : ''}${k.clicks.delta}), ${k.impressions.current} impressions (${k.impressions.delta >= 0 ? '+' : ''}${k.impressions.delta}), position moyenne ${k.position.current ?? 'n.d.'}.`);
  }
  if (s.indexation) lines.push(`Indexation : ${s.indexation.indexed} indexées sur ${s.indexation.inspected} inspectées, ${s.indexation.notIndexedCount} non indexées.`);
  if (s.indexnow) lines.push(`IndexNow : ${s.indexnow.status} (${s.indexnow.sent} URL envoyées).`);
  if (s.indexingApi) {
    const i = s.indexingApi;
    const count = i.status === 'simulation' ? `${i.wouldSubmit} URL partiraient` : `${i.submitted} URL soumises`;
    lines.push(`Indexing API : ${i.status} (${count} ; ${i.added} nouvelles, ${i.modified} modifiées, ${i.prioritizedNotIndexed} non indexées en tête, ${i.deferred} reportées ; quota ${i.quota.used}/${i.quota.cap}).${i.note ? ` ${i.note}` : ''}`);
  }
  if (s.feeds) lines.push(`Flux : ${s.feeds.entryCount} entrées, ${s.feeds.feedsInError.length} flux en erreur.`);
  if (s.competitors) lines.push(`Concurrents : ${s.competitors.totalNew} URL nouvelles.`);
}
const text = `${lines.join('\n')}\n`;
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, text);
else process.stdout.write(text);
