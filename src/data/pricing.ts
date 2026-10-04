// src/data/pricing.ts — Référentiel UNIQUE de la grille tarifaire Waimia (P0-1, ADR-003).
//
// Source de vérité figée (RECONCILIATION-REPORT addendum 2026-06-15, décision 4) :
//   grille 2 000 / 4 000 / 7 000 / 10 000 € + sur-mesure, plancher 2 000 € HT, audit gratuit.
//   Périme partout : « dès 1 500 € », « 3 000 € », « 5 000 € », « 6 à 25 k€ », « 7 900 € »,
//   « 8 000 € », « 5 à 20 k€ ». Toute page/section qui affiche un montant tire d'ICI.
//
// Honnêteté : ce sont des prix d'entrée indicatifs « à partir de », cadrés au diagnostic gratuit.
// 0 tiret cadratin U+2014 (rule 58). 0 valeur hardcodée dans les composants (rule 60) : la grille
// vit ici, les composants/pages consomment les helpers.

export type PricingTierId = 'essentiel' | 'standard' | 'avance' | 'systeme' | 'sur-mesure';

export interface PricingTier {
  /** id stable kebab-case */
  tier: PricingTierId;
  /** montant numérique en euros HT ; null pour le palier sur-mesure */
  price: number | null;
  /** période / nature de l'engagement (bilingue) */
  period: { fr: string; en: string };
  /** code devise ISO 4217 */
  currency: 'EUR';
  /** libellé court du palier (bilingue) */
  label?: { fr: string; en: string };
}

/** Plancher tarifaire affiché (« à partir de »). Source unique du « dès X € » du site. */
export const PRICE_FLOOR_EUR = 2000 as const;

/** Audit/diagnostic d'entrée : gratuit (décision 4). */
export const AUDIT_IS_FREE = true as const;

/** Grille canonique : 4 paliers chiffrés + sur-mesure. Ordre = montée en maturité. */
export const PRICING_GRID: readonly PricingTier[] = [
  {
    tier: 'essentiel',
    price: 2000,
    currency: 'EUR',
    period: { fr: 'à partir de · HT', en: 'from · excl. VAT' },
    label: { fr: 'Essentiel', en: 'Essential' },
  },
  {
    tier: 'standard',
    price: 4000,
    currency: 'EUR',
    period: { fr: 'indicatif · HT', en: 'indicative · excl. VAT' },
    label: { fr: 'Standard', en: 'Standard' },
  },
  {
    tier: 'avance',
    price: 7000,
    currency: 'EUR',
    period: { fr: 'indicatif · HT', en: 'indicative · excl. VAT' },
    label: { fr: 'Avancé', en: 'Advanced' },
  },
  {
    tier: 'systeme',
    price: 10000,
    currency: 'EUR',
    period: { fr: 'à partir de · HT', en: 'from · excl. VAT' },
    label: { fr: 'Système', en: 'System' },
  },
  {
    tier: 'sur-mesure',
    price: null,
    currency: 'EUR',
    period: { fr: 'sur devis', en: 'on quote' },
    label: { fr: 'Sur-mesure', en: 'Custom' },
  },
];

/** Format FR d'un montant euro avec espace insécable fin (« 2 000 € »). */
export function formatEur(value: number): string {
  return `${value.toLocaleString('fr-FR').replace(/ | |\s/g, ' ')} €`;
}

/** Format EN d'un montant euro (« €2,000 »). */
export function formatEurEn(value: number): string {
  return `€${value.toLocaleString('en-US')}`;
}

/** Étiquette plancher « à partir de 2 000 € HT » (bilingue). */
export const PRICE_FROM_LABEL = {
  fr: `à partir de ${formatEur(PRICE_FLOOR_EUR)} HT`,
  en: `from ${formatEurEn(PRICE_FLOOR_EUR)} excl. VAT`,
} as const;

/** Récupère un palier par id (helper de consommation). */
export function tierById(id: PricingTierId): PricingTier {
  const found = PRICING_GRID.find((t) => t.tier === id);
  if (!found) throw new Error(`pricing tier inconnu: ${id}`);
  return found;
}

/** Prix affichable d'un palier (« 2 000 € » ou « Sur devis »). */
export function tierPriceLabel(id: PricingTierId, lang: 'fr' | 'en' = 'fr'): string {
  const t = tierById(id);
  if (t.price === null) return lang === 'fr' ? 'Sur devis' : 'On quote';
  return lang === 'fr' ? formatEur(t.price) : formatEurEn(t.price);
}

// ─── Taux horaire et maintenance (décision Simon 2026-10) · SOURCE UNIQUE ────────────────
// Le taux horaire et les paliers de maintenance ne s'écrivent NULLE PART en dur : le contenu
// (JSON des collections, src/data/pages/tarifs.json) porte des jetons `{{prix.*}}`, résolus au
// chargement (loader des collections dans src/content.config.ts, et src/pages/tarifs.astro).
// Changer un prix = changer une valeur ici. Gate : `node scripts/check-pricing.mjs`.

/** Taux horaire unique, en euros HT (interventions hors forfait, travail à l'heure). */
export const HOURLY_RATE_EUR = 99 as const;

/** Paliers mensuels de maintenance, en euros HT par mois (ordre croissant). */
export const MAINTENANCE_TIERS_EUR = [99, 249, 449] as const;

/** Jetons de prix reconnus dans le contenu → valeur affichée (nombre seul, sans devise). */
export const PRICING_TOKENS: Readonly<Record<string, string>> = {
  'prix.horaire': String(HOURLY_RATE_EUR),
  'prix.maintenance.p1': String(MAINTENANCE_TIERS_EUR[0]),
  'prix.maintenance.p2': String(MAINTENANCE_TIERS_EUR[1]),
  'prix.maintenance.p3': String(MAINTENANCE_TIERS_EUR[2]),
};

/** Empreinte des valeurs : sale le digest du cache de contenu (un prix change → tout est relu). */
export const PRICING_TOKENS_SIGNATURE = JSON.stringify(PRICING_TOKENS);

const PRICING_TOKEN_RE = /\{\{\s*(prix\.[a-z0-9.]+)\s*\}\}/g;

/**
 * Résout les jetons `{{prix.*}}` dans toutes les chaînes d'une valeur (parcours profond,
 * sans muter l'entrée). Un jeton inconnu fait échouer le build : jamais de jeton brut en prod.
 */
export function applyPricingTokens<T>(value: T): T {
  if (typeof value === 'string') {
    if (!value.includes('{{')) return value;
    return value.replace(PRICING_TOKEN_RE, (_m, key: string) => {
      const resolved = PRICING_TOKENS[key];
      if (resolved === undefined) throw new Error(`jeton de prix inconnu : {{${key}}}`);
      return resolved;
    }) as T;
  }
  if (Array.isArray(value)) return value.map((v) => applyPricingTokens(v)) as T;
  // Objets simples uniquement : une Date (frontmatter YAML) ou toute autre instance passe telle quelle.
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = applyPricingTokens(v);
    return out as T;
  }
  return value;
}

// ─── Parcours d'engagement (page /tarifs) · SOURCE UNIQUE des montants balisés ───────────
// Les cinq étapes affichées sur /tarifs, avec leur prix d'entrée. Le JSON-LD `OfferCatalog`
// de la page (src/lib/seo/schema-builder.ts → buildPricingCatalog) et le résumé de
// /llms.txt lisent ces valeurs ; le gate check-jsonld vérifie que chaque montant balisé est
// bien affiché sur la page.

/** Sprint de cadrage : prix fixe, en euros HT, et durée en heures. */
export const SCOPING_SPRINT_EUR = 999 as const;
export const SCOPING_SPRINT_HOURS = 10 as const;

/** Durée de l'audit gratuit, en minutes. */
export const AUDIT_DURATION_MIN = 45 as const;

/** Pilote : prix d'entrée (= plancher de la grille). */
export const PILOT_FLOOR_EUR = PRICE_FLOOR_EUR;

/** Déploiement sur mesure : prix d'entrée (= palier « avancé » de la grille). */
export const DEPLOYMENT_FLOOR_EUR = tierById('avance').price as number;

export type EngagementPricing =
  /** Prix ferme. */
  | { kind: 'fixed'; price: number }
  /** « Dès X € » : prix d'entrée, devis ferme après audit. */
  | { kind: 'from'; price: number }
  /** Forfait mensuel. */
  | { kind: 'monthly'; price: number }
  /** Taux horaire. */
  | { kind: 'hourly'; price: number };

export interface EngagementOffer {
  id: string;
  /** Libellé tel qu'affiché sur /tarifs. */
  name: string;
  pricing: EngagementPricing;
}

/** Lignes de /tarifs, dans l'ordre du parcours. Tous les montants sont hors taxes. */
export const ENGAGEMENT_OFFERS: readonly EngagementOffer[] = [
  {
    id: 'audit',
    name: 'Audit IA',
    pricing: { kind: 'fixed', price: 0 },
  },
  {
    id: 'sprint-cadrage',
    name: 'Sprint de cadrage',
    pricing: { kind: 'fixed', price: SCOPING_SPRINT_EUR },
  },
  {
    id: 'pilote',
    name: 'Pilote',
    pricing: { kind: 'from', price: PILOT_FLOOR_EUR },
  },
  {
    id: 'deploiement',
    name: 'Déploiement sur mesure',
    pricing: { kind: 'from', price: DEPLOYMENT_FLOOR_EUR },
  },
  ...MAINTENANCE_TIERS_EUR.map(
    (price, i): EngagementOffer => ({
      id: `maintenance-p${i + 1}`,
      name: `Accompagnement continu, palier ${i + 1}`,
      pricing: { kind: 'monthly', price },
    }),
  ),
  {
    id: 'taux-horaire',
    name: 'Interventions hors forfait',
    pricing: { kind: 'hourly', price: HOURLY_RATE_EUR },
  },
];

/** Ligne du parcours par id (échec de build si l'id n'existe pas). */
export function engagementOffer(id: string): EngagementOffer {
  const found = ENGAGEMENT_OFFERS.find((o) => o.id === id);
  if (!found) throw new Error(`offre du parcours inconnue : ${id}`);
  return found;
}
