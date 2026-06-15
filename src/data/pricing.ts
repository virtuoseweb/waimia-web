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
