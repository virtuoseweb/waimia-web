/**
 * Fraîcheur de la dernière collecte : lit docs/seo/data/latest.json et dit si elle est
 * complète et assez récente. Deux usages :
 *   - le workflow seo-routine.yml (créneau de rattrapage du lundi) : ne rien refaire si une
 *     collecte complète de moins de 36 heures existe ;
 *   - la session Claude du lundi : juger les données par `generatedAt` (moins de 48 heures),
 *     pas par le numéro de semaine. La collecte du dimanche soir porte en effet le numéro de la
 *     semaine ISO qui se termine, la session celui de la semaine qui commence.
 *
 * « Complète » : aucune étape `erreur` ni `ignoré` (une étape `non configuré` ne changerait pas
 * en relançant, elle ne rend donc pas la collecte incomplète).
 *
 * Usage : node scripts/seo-routine/freshness.mjs [--max-hours=48] [--strict]
 *   --max-hours=N : âge maximal accepté, en heures (48 par défaut).
 *   --strict : sort en code 1 si la collecte n'est pas fraîche (0 sinon, dans tous les cas).
 * Dans GitHub Actions, écrit aussi `fresh=true|false` dans $GITHUB_OUTPUT. Hors réseau, sans secret.
 */
import { appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA_DIR } from './config.mjs';
import { isMain, readJson } from './lib/util.mjs';

export const DEFAULT_MAX_HOURS = 48;

/**
 * Fonction pure.
 * @param {{week?:string, generatedAt?:string, steps?:Record<string,{status:string}>}|null} summary contenu de latest.json
 * @param {{now?:Date, maxHours?:number}} options
 */
export function assessFreshness(summary, { now = new Date(), maxHours = DEFAULT_MAX_HOURS } = {}) {
  const base = { exists: Boolean(summary), week: summary?.week ?? null, generatedAt: summary?.generatedAt ?? null, ageHours: null, maxHours, complete: false, incompleteSteps: [], fresh: false };
  if (!summary) return { ...base, reason: 'latest.json absent : aucune collecte commitée.' };
  const at = new Date(summary.generatedAt ?? NaN).getTime();
  if (Number.isNaN(at)) return { ...base, reason: 'latest.json sans date `generatedAt` lisible.' };
  // La comparaison se fait sur l'âge exact ; l'arrondi ne sert qu'à l'affichage.
  const exactHours = (now.getTime() - at) / 3600000;
  const ageHours = Math.round(exactHours * 10) / 10;
  const incompleteSteps = Object.entries(summary.steps ?? {})
    .filter(([, s]) => s?.status === 'erreur' || s?.status === 'ignoré')
    .map(([name, s]) => `${name} (${s.status})`);
  const complete = Object.keys(summary.steps ?? {}).length > 0 && incompleteSteps.length === 0;
  const recent = exactHours >= 0 && exactHours < maxHours;
  const fresh = complete && recent;
  let reason;
  if (exactHours < 0) reason = `collecte datée dans le futur (${summary.generatedAt}) : horloge à vérifier.`;
  else if (!recent) reason = `collecte vieille de ${ageHours} h (limite : ${maxHours} h).`;
  else if (!complete) reason = `collecte récente (${ageHours} h) mais incomplète : ${incompleteSteps.join(', ') || 'aucune étape enregistrée'}.`;
  else reason = `collecte complète de ${ageHours} h (limite : ${maxHours} h).`;
  return { ...base, ageHours, complete, incompleteSteps, fresh, reason };
}

if (isMain(import.meta.url)) {
  const arg = process.argv.find((a) => a.startsWith('--max-hours='));
  const maxHours = arg ? Number(arg.slice('--max-hours='.length)) : DEFAULT_MAX_HOURS;
  if (!Number.isFinite(maxHours) || maxHours <= 0) {
    console.error('freshness : --max-hours attend un nombre d\'heures positif.');
    process.exit(2);
  }
  const res = assessFreshness(await readJson(join(DATA_DIR, 'latest.json'), null), { maxHours });
  console.log(`${res.fresh ? 'FRAÎCHE' : 'PAS FRAÎCHE'} · semaine ${res.week ?? 'n.d.'} · generatedAt ${res.generatedAt ?? 'n.d.'} · ${res.reason}`);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `fresh=${res.fresh}\n`);
  if (process.argv.includes('--strict') && !res.fresh) process.exit(1);
}
