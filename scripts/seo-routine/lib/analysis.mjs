/**
 * Analyse des données Search Console : variations, sélections, suivi des mots-clés.
 * Fonctions pures (aucun accès réseau ni disque) pour rester testables.
 */
import { normalizeText } from './util.mjs';
import { THRESHOLDS } from '../config.mjs';

const round = (n, digits = 2) => (n === null || n === undefined || Number.isNaN(n) ? null : Number(n.toFixed(digits)));

/**
 * Variation entre deux valeurs. `pct` vaut null quand la valeur précédente est 0 ou absente
 * (une hausse depuis zéro n'a pas de pourcentage).
 */
export function variation(current, previous) {
  const cur = current ?? null;
  const prev = previous ?? null;
  if (cur === null || prev === null) return { current: cur, previous: prev, delta: null, pct: null };
  return {
    current: cur,
    previous: prev,
    delta: round(cur - prev, 4),
    pct: prev === 0 ? null : round(((cur - prev) / prev) * 100, 1),
  };
}

/** KPI d'une période comparés à la période précédente. Position : un delta négatif est un gain. */
export function compareKpi(current, previous) {
  const c = current ?? {};
  const p = previous ?? {};
  return {
    clicks: variation(c.clicks ?? 0, p.clicks ?? 0),
    impressions: variation(c.impressions ?? 0, p.impressions ?? 0),
    ctr: variation(round(c.ctr ?? 0, 4), round(p.ctr ?? 0, 4)),
    position: variation(c.position ? round(c.position, 1) : null, p.position ? round(p.position, 1) : null),
  };
}

/** Ligne Search Analytics ({keys, clicks, impressions, ctr, position}) vers objet nommé. */
export function toRow(row, dimensions) {
  const out = {};
  dimensions.forEach((d, i) => {
    out[d] = row.keys?.[i] ?? null;
  });
  out.clicks = row.clicks ?? 0;
  out.impressions = row.impressions ?? 0;
  out.ctr = round(row.ctr ?? 0, 4);
  out.position = round(row.position ?? 0, 1);
  return out;
}

/**
 * Requêtes en « distance de frappe » : position moyenne entre min et max inclus, avec un
 * minimum d'impressions, triées par impressions décroissantes.
 */
export function selectStrikingDistance(rows, { min = THRESHOLDS.strikingMin, max = THRESHOLDS.strikingMax, minImpressions = THRESHOLDS.strikingMinImpressions, limit = 40 } = {}) {
  return rows
    .filter((r) => r.position >= min && r.position <= max && r.impressions >= minImpressions)
    .sort((a, b) => b.impressions - a.impressions || a.position - b.position)
    .slice(0, limit);
}

/**
 * CTR attendu par position. Ordre de grandeur usuel des courbes de CTR organique,
 * utilisé comme repère heuristique et non comme mesure.
 */
export function expectedCtr(position) {
  const curve = [0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018];
  const p = Math.max(1, Math.round(position));
  return p <= 10 ? curve[p - 1] : p <= 20 ? 0.01 : 0.004;
}

/** Pages à fortes impressions dont le CTR est inférieur à `ratio` fois le CTR attendu à cette position. */
export function selectLowCtr(rows, { minImpressions = THRESHOLDS.lowCtrMinImpressions, ratio = THRESHOLDS.lowCtrRatio, limit = 25 } = {}) {
  return rows
    .filter((r) => r.impressions >= minImpressions && r.ctr < expectedCtr(r.position) * ratio)
    .map((r) => ({ ...r, expectedCtr: expectedCtr(r.position) }))
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);
}

function pathOf(url) {
  try {
    const p = new URL(url).pathname.replace(/\/$/, '');
    return p || '/';
  } catch {
    return url;
  }
}

/**
 * Suivi des mots-clés : pour chaque requête suivie, la page la mieux exposée dans Search
 * Console (correspondance exacte après normalisation), sa position, et l'écart avec la
 * période précédente. `cannibalisation` = une autre page que la cible se classe.
 */
export function trackKeywords(keywords, pageQueryRows, previousPageQueryRows = []) {
  const index = (rows) => {
    const map = new Map();
    for (const r of rows) {
      const key = normalizeText(r.query);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(r);
    }
    return map;
  };
  const cur = index(pageQueryRows);
  const prev = index(previousPageQueryRows);
  const best = (rows) => (rows?.length ? [...rows].sort((a, b) => b.impressions - a.impressions || a.position - b.position)[0] : null);
  return keywords.map((k) => {
    const key = normalizeText(k.query);
    const rows = cur.get(key) ?? [];
    const top = best(rows);
    const before = best(prev.get(key));
    const rankedPath = top ? pathOf(top.page) : null;
    return {
      query: k.query,
      cluster: k.cluster,
      priority: k.priority,
      volume: k.volume,
      difficulty: k.difficulty,
      target: k.target,
      visible: Boolean(top),
      position: top?.position ?? null,
      previousPosition: before?.position ?? null,
      positionDelta: top && before ? round(top.position - before.position, 1) : null,
      impressions: rows.reduce((s, r) => s + r.impressions, 0),
      clicks: rows.reduce((s, r) => s + r.clicks, 0),
      rankedPage: rankedPath,
      onTarget: top ? rankedPath === k.target : null,
      cannibalisation: rows.length > 1 ? rows.map((r) => pathOf(r.page)).filter((p, i, a) => a.indexOf(p) === i) : null,
    };
  });
}

/** Plus fortes hausses et baisses d'impressions entre deux périodes, par clé (page ou requête). */
export function movers(currentRows, previousRows, key, { limit = 10, minImpressions = 5 } = {}) {
  const prev = new Map(previousRows.map((r) => [r[key], r]));
  const seen = new Set();
  const all = [];
  for (const r of currentRows) {
    seen.add(r[key]);
    const p = prev.get(r[key]);
    all.push({ [key]: r[key], impressions: r.impressions, previousImpressions: p?.impressions ?? 0, delta: r.impressions - (p?.impressions ?? 0), position: r.position, previousPosition: p?.position ?? null, clicks: r.clicks });
  }
  for (const p of previousRows) {
    if (!seen.has(p[key])) all.push({ [key]: p[key], impressions: 0, previousImpressions: p.impressions, delta: -p.impressions, position: null, previousPosition: p.position, clicks: 0 });
  }
  const significant = all.filter((r) => Math.max(r.impressions, r.previousImpressions) >= minImpressions);
  return {
    up: significant.filter((r) => r.delta > 0).sort((a, b) => b.delta - a.delta).slice(0, limit),
    down: significant.filter((r) => r.delta < 0).sort((a, b) => a.delta - b.delta).slice(0, limit),
  };
}
