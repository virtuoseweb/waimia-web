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

// ─── Maintenance : contenu des trois paliers (précisions Simon 2026-10) · SOURCE UNIQUE ──
// Nom, résumé et lignes incluses de chaque palier. /tarifs, la page maintenance, la FAQ,
// /llms.txt et le JSON-LD `OfferCatalog` lisent ce tableau (directement ou par jetons).
// Rien n'est promis ici que Simon n'ait formulé : ni nombre de systèmes, ni pénalité.

export interface MaintenancePlan {
  /** Identifiant de jeton : p1, p2, p3. */
  id: 'p1' | 'p2' | 'p3';
  /** Forfait mensuel, en euros HT. */
  price: number;
  name: { fr: string; en: string };
  /** Résumé d'une phrase (FAQ, llms.txt, description de l'offre en JSON-LD). */
  summary: { fr: string; en: string };
  /** Lignes incluses, telles qu'affichées dans la grille. */
  includes: { fr: readonly string[]; en: readonly string[] };
}

export const MAINTENANCE_PLANS: readonly MaintenancePlan[] = [
  {
    id: 'p1',
    price: MAINTENANCE_TIERS_EUR[0],
    name: { fr: 'Suivi', en: 'Monitoring' },
    summary: {
      fr: `Analyse mensuelle, reporting et contrôle des coûts. Les interventions sont facturées ${HOURLY_RATE_EUR} € HT de l'heure.`,
      en: `Monthly analysis, reporting and cost control. Interventions are billed ${HOURLY_RATE_EUR} € ex VAT an hour.`,
    },
    includes: {
      fr: [
        'Analyse mensuelle',
        'Reporting',
        'Contrôle des coûts',
        `Interventions facturées ${HOURLY_RATE_EUR} € HT de l'heure`,
      ],
      en: [
        'Monthly analysis',
        'Reporting',
        'Cost control',
        `Interventions billed ${HOURLY_RATE_EUR} € ex VAT an hour`,
      ],
    },
  },
  {
    id: 'p2',
    price: MAINTENANCE_TIERS_EUR[1],
    name: { fr: 'Suivi et interventions', en: 'Monitoring and interventions' },
    summary: {
      fr: `Tout ce qui est inclus dans le palier à ${MAINTENANCE_TIERS_EUR[0]} €, plus 2 heures d'intervention par mois et un traitement des demandes en moins de 72 heures.`,
      en: `Everything in the ${MAINTENANCE_TIERS_EUR[0]} € tier, plus 2 hours of intervention a month and requests handled in under 72 hours.`,
    },
    includes: {
      fr: [
        `Tout le palier à ${MAINTENANCE_TIERS_EUR[0]} € : analyse mensuelle, reporting, contrôle des coûts`,
        "2 heures d'intervention par mois",
        'Demandes traitées en moins de 72 heures',
      ],
      en: [
        `Everything in the ${MAINTENANCE_TIERS_EUR[0]} € tier: monthly analysis, reporting, cost control`,
        '2 hours of intervention a month',
        'Requests handled in under 72 hours',
      ],
    },
  },
  {
    id: 'p3',
    price: MAINTENANCE_TIERS_EUR[2],
    name: { fr: 'Optimisation continue', en: 'Continuous optimisation' },
    summary: {
      fr: "Optimisation en continu ; nouveaux scénarios et nouvelles automatisations IA pertinentes pour votre activité, évolutions ; jusqu'à 5 heures d'intervention par mois ; priorité dans la file de traitement des erreurs, du débogage et de l'adaptation des scénarios aux nouvelles contraintes (nouveau modèle, nouvelles interfaces des applications tierces, etc.) ; intervention y compris le dimanche ; résolution des problèmes en moins de 24 heures.",
      en: 'Continuous optimisation; new scenarios and new AI automations relevant to your business, upgrades; up to 5 hours of intervention a month; priority in the queue for errors, debugging and adapting scenarios to new constraints (new model, new interfaces of third-party applications, etc.); intervention including on Sundays; problems resolved in under 24 hours.',
    },
    includes: {
      fr: [
        'Optimisation en continu',
        'Nouveaux scénarios et nouvelles automatisations IA pertinentes pour votre activité, évolutions',
        "Jusqu'à 5 heures d'intervention par mois",
        'Priorité dans la file de traitement : erreurs, débogage, adaptation des scénarios aux nouvelles contraintes (nouveau modèle, nouvelles interfaces des applications tierces, etc.)',
        'Intervention y compris le dimanche',
        'Problèmes résolus en moins de 24 heures',
      ],
      en: [
        'Continuous optimisation',
        'New scenarios and new AI automations relevant to your business, upgrades',
        'Up to 5 hours of intervention a month',
        'Priority in the processing queue: errors, debugging, adapting scenarios to new constraints (new model, new interfaces of third-party applications, etc.)',
        'Intervention including on Sundays',
        'Problems resolved in under 24 hours',
      ],
    },
  },
];

// ─── Formations : deux formats (précisions Simon 2026-10) · SOURCE UNIQUE ────────────────
// Durée en heures et prix en euros HT (le site annonce ses prix hors taxes, note de /tarifs).
// Les pages /formations/*, la ligne Formation de /tarifs, /llms.txt et le JSON-LD `Course`
// (offers + hasCourseInstance.courseWorkload) lisent ce tableau.

export interface TrainingFormat {
  /** Identifiant de jeton : f1, f2. */
  id: 'f1' | 'f2';
  hours: number;
  price: number;
}

export const TRAINING_FORMATS: readonly TrainingFormat[] = [
  { id: 'f1', hours: 10, price: 2000 },
  { id: 'f2', hours: 20, price: 4000 },
];

// Base du prix (précision Simon 2026-10) : le prix d'un format s'entend par session, pour le
// groupe formé, pas par participant. Libellé court à accoler au prix, et phrase complète (sans
// point final : le contenu le pose). Jetons `{{prix.formation.base}}` et `{{prix.formation.note}}`.
export const TRAINING_PRICE_BASIS = { fr: 'par session', en: 'per session' } as const;
export const TRAINING_PRICE_NOTE = {
  fr: 'Prix par session, pas par participant',
  en: 'Price per session, not per participant',
} as const;

// ─── Système commercial / prospection (précisions Simon 2026-10) · SOURCE UNIQUE ─────────
/** Prix d'entrée de l'abonnement, en euros HT par mois (« dès 980 € HT/mois »). */
export const SALES_SYSTEM_FLOOR_EUR = 980 as const;
/** Essai gratuit : nombre de leads offerts, pour 0 €. C'est un essai, pas le prix. */
export const SALES_SYSTEM_TRIAL_LEADS = 30 as const;

/**
 * Date de dernière vérification de la grille tarifaire (ISO, jour UTC). Source unique de
 * « Prix en vigueur au… » : jetons `{{prix.maj}}` (fr) et `{{prix.maj.en}}` (en). À mettre à
 * jour à chaque changement de prix ou relecture de la grille.
 */
export const PRICING_UPDATED_AT = '2026-10-14' as const;

/** Date longue d'un jour ISO : « 14 octobre 2026 » (fr) ou « 14 October 2026 » (en). */
const longDate = (iso: string, lang: 'fr' | 'en') =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** (Déclaré avant PRICING_TOKENS qui le lit.) Sprint de cadrage : prix fixe, en euros HT, et durée en heures. */
export const SCOPING_SPRINT_EUR = 999 as const;
export const SCOPING_SPRINT_HOURS = 10 as const;

/** Montant en toutes lettres typographiques, sans devise : « 2 000 » (fr) ou « 2,000 » (en). */
const amount = (value: number, lang: 'fr' | 'en') =>
  lang === 'fr' ? value.toLocaleString('fr-FR').replace(/[\u00a0\u202f\s]/g, ' ') : value.toLocaleString('en-US');

/**
 * Jetons reconnus dans le contenu → texte affiché. Les jetons de montant donnent le nombre
 * seul, sans devise ; un suffixe `.en` donne la version anglaise quand elle diffère.
 */
export const PRICING_TOKENS: Readonly<Record<string, string>> = {
  'prix.horaire': String(HOURLY_RATE_EUR),
  'prix.maj': longDate(PRICING_UPDATED_AT, 'fr'),
  'prix.maj.en': longDate(PRICING_UPDATED_AT, 'en'),
  'prix.maintenance.p1': String(MAINTENANCE_TIERS_EUR[0]),
  'prix.maintenance.p2': String(MAINTENANCE_TIERS_EUR[1]),
  'prix.maintenance.p3': String(MAINTENANCE_TIERS_EUR[2]),
  // Contenu des paliers : nom, résumé, lignes incluses (numérotées à partir de 1).
  ...Object.fromEntries(
    MAINTENANCE_PLANS.flatMap((plan) => [
      [`prix.maintenance.${plan.id}.nom`, plan.name.fr],
      [`prix.maintenance.${plan.id}.nom.en`, plan.name.en],
      [`prix.maintenance.${plan.id}.resume`, plan.summary.fr],
      [`prix.maintenance.${plan.id}.resume.en`, plan.summary.en],
      ...plan.includes.fr.map((line, i) => [`prix.maintenance.${plan.id}.inclus.${i + 1}`, line]),
      ...plan.includes.en.map((line, i) => [`prix.maintenance.${plan.id}.inclus.${i + 1}.en`, line]),
    ]),
  ),
  // Formations : durée (heures) et prix de chaque format.
  ...Object.fromEntries(
    TRAINING_FORMATS.flatMap((f) => [
      [`prix.formation.${f.id}.heures`, String(f.hours)],
      [`prix.formation.${f.id}`, amount(f.price, 'fr')],
      [`prix.formation.${f.id}.en`, amount(f.price, 'en')],
    ]),
  ),
  // Sprint de cadrage : montant seul, sans devise.
  'prix.sprint': amount(SCOPING_SPRINT_EUR, 'fr'),
  'prix.sprint.en': amount(SCOPING_SPRINT_EUR, 'en'),
  'prix.formation.base': TRAINING_PRICE_BASIS.fr,
  'prix.formation.base.en': TRAINING_PRICE_BASIS.en,
  'prix.formation.note': TRAINING_PRICE_NOTE.fr,
  'prix.formation.note.en': TRAINING_PRICE_NOTE.en,
  // Système commercial : prix d'entrée mensuel et volume de l'essai gratuit.
  'prix.commercial': String(SALES_SYSTEM_FLOOR_EUR),
  'prix.commercial.essai': String(SALES_SYSTEM_TRIAL_LEADS),
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
// Les cinq étapes affichées sur /tarifs et les deux formats de formation, avec leur prix. Le JSON-LD `OfferCatalog`
// de la page (src/lib/seo/schema-builder.ts → buildPricingCatalog) et le résumé de
// /llms.txt lisent ces valeurs ; le gate check-jsonld vérifie que chaque montant balisé est
// bien affiché sur la page.

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
  /** Ce que l'offre comprend, en une phrase (affiché sur /tarifs). */
  description?: string;
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
  ...MAINTENANCE_PLANS.map(
    (plan): EngagementOffer => ({
      id: `maintenance-${plan.id}`,
      name: `Accompagnement continu : ${plan.name.fr}`,
      description: plan.summary.fr,
      pricing: { kind: 'monthly', price: plan.price },
    }),
  ),
  {
    id: 'taux-horaire',
    name: 'Interventions hors forfait',
    pricing: { kind: 'hourly', price: HOURLY_RATE_EUR },
  },
  ...TRAINING_FORMATS.map(
    (format): EngagementOffer => ({
      id: `formation-${format.id}`,
      name: `Formation, format ${format.hours} heures`,
      description: `${TRAINING_PRICE_NOTE.fr}.`,
      pricing: { kind: 'fixed', price: format.price },
    }),
  ),
];

/** Ligne du parcours par id (échec de build si l'id n'existe pas). */
export function engagementOffer(id: string): EngagementOffer {
  const found = ENGAGEMENT_OFFERS.find((o) => o.id === id);
  if (!found) throw new Error(`offre du parcours inconnue : ${id}`);
  return found;
}
