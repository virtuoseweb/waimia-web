/**
 * hero-sumie.ts — résolveur de motif sumi-e pour les héros.
 *
 * Mappe une `signature` textuelle (dept + label + titre…) vers une clé de motif
 * consommée par `components/svg/sumie/HeroSumie.astro`. Trois étages :
 *   1. Parité secteurs existante (finance / services-b2b / industrie) — prioritaire.
 *   2. Thèmes solutions / offres (growth / content / network / flow / dialogue / layers).
 *   3. Fallback déterministe (hash) sur les 6 clés abstraites — jamais vide, varié.
 *
 * Pur TypeScript, aucune dépendance.
 */

/** Les 6 clés abstraites utilisées pour solutions/offres et le fallback. */
export const ABSTRACT_SUMIE_KEYS = [
  'growth',
  'content',
  'network',
  'flow',
  'dialogue',
  'layers',
] as const;

export type AbstractSumieKey = (typeof ABSTRACT_SUMIE_KEYS)[number];
export type SumieKey =
  | AbstractSumieKey
  | 'finance'
  | 'services-b2b'
  | 'industrie';

/** Hash déterministe simple (somme des charCodes) → indice borné. */
function hashIndex(input: string, modulo: number): number {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input.charCodeAt(i);
  }
  return ((sum % modulo) + modulo) % modulo;
}

/**
 * Résout une signature en clé de motif sumi-e. Jamais vide.
 */
export function resolveHeroSumie(signature: string): SumieKey {
  const s = (signature ?? '').toLowerCase();

  // 1. Parité secteurs (prioritaire).
  if (/finance|compta|comptabilit|fintech/.test(s)) return 'finance';
  if (/services b2b|cabinet|conseil/.test(s)) return 'services-b2b';
  if (/industrie/.test(s)) return 'industrie';

  // 2. Thèmes solutions / offres.
  if (/acquisition|growth|lead|marketing/.test(s)) return 'growth';
  if (/contenu|content|seo|geo|r[eé]daction|editorial/.test(s)) return 'content';
  if (/crm|relance|relation|pipeline/.test(s)) return 'network';
  if (/productivit|automat|op[eé]rationnel|operational|ops/.test(s)) return 'flow';
  if (/support|client|conversation|chat/.test(s)) return 'dialogue';
  if (
    /infrastructure|composable|application|app|site web|web|cowork|plateforme|platform|syst[eè]me|system/.test(
      s,
    )
  )
    return 'layers';

  // 3. Fallback déterministe (jamais vide, varié).
  return ABSTRACT_SUMIE_KEYS[hashIndex(s, ABSTRACT_SUMIE_KEYS.length)];
}
