// src/data/proof-points.ts — Référentiel UNIQUE des repères chiffrés (refonte R7a, docs/37 §2.1).
// HONNÊTETÉ (vague 2) : Waimia est un studio solo, 0 client réel, 0 cas mesuré (cf /cas
// « premiers cas en cours de rédaction »). Ces entrées décrivent donc des CAPACITÉS du système
// et des ENGAGEMENTS d'offre (audit 5j, pilote 2 sem, prix fixe, formation incluse) ou des
// objectifs mesurés SUR VOS données. Aucun résultat client moyen inventé : pas de « médiane sur
// N projets », pas de « mesuré en production clients », pas de nom de faux client.
// Les `id` restent STABLES (des consommateurs en dépendent, validés par check-content-refs.mjs).
// `sources` = chemins de contenu (collection/slug) où la valeur apparaît aujourd'hui.

export type ProofPointCategory =
  | 'roi'
  | 'time'
  | 'cost'
  | 'quality'
  | 'adoption'
  | 'volume';

export type ProofPointId =
  | 'roi-3x-12-mois'
  | 'roi-payback-90-jours'
  | 'roi-revenu-supp-25pct'
  | 'roi-4-1x-12-mois'
  | 'roi-pipeline-plateau-2-4m'
  | 'roi-leads-x2-4'
  | 'time-2-semaines-pilote'
  | 'time-30pct-taches-reduites'
  | 'time-5-jours-audit'
  | 'time-qualification-62pct'
  | 'time-cloture-72pct'
  | 'time-halcyon-120h'
  | 'time-northbound-2j'
  | 'time-plateau-22h-sem'
  | 'time-factures-1200h-an'
  | 'cost-baisse-40pct'
  | 'cost-prix-transparent'
  | 'quality-precision-92pct'
  | 'quality-zero-hallucination'
  | 'quality-caserne-4-goulots'
  | 'adoption-100pct-equipe'
  | 'adoption-30-jours-onboard'
  | 'adoption-95pct-nps'
  | 'volume-1000-tickets-jour'
  | 'volume-10k-leads-traites'
  | 'volume-articles-8-semaine';

export interface ProofPoint {
  id: ProofPointId;
  category: ProofPointCategory;
  /** Valeur affichable telle qu'écrite dans le contenu source. */
  value: string;
  label_fr: string;
  label_en: string;
  description_fr: string;
  description_en: string;
  /** Chemins de contenu (collection/slug) où ce chiffre est déjà écrit. */
  sources: string[];
}

export const PROOF_POINTS: readonly ProofPoint[] = [
  // ── ROI ──
  {
    id: 'roi-3x-12-mois',
    category: 'roi',
    value: 'ROI ciblé',
    label_fr: 'Un ROI visé, mesuré sur votre périmètre',
    label_en: 'A targeted ROI, measured on your scope',
    description_fr: "On fixe la baseline au démarrage et on mesure le retour à 12 mois sur vos données, pas une moyenne inventée.",
    description_en: 'We set the baseline at kickoff and measure the 12-month return on your data, not an invented average.',
    sources: ['proof-points/roi-3x-12-mois'],
  },
  {
    id: 'roi-payback-90-jours',
    category: 'roi',
    value: '90 jours',
    label_fr: 'Payback visé à 90 jours',
    label_en: 'Targeted 90-day payback',
    description_fr: 'Horizon de retour visé pour une activation + growth system, mesuré avant/après sur votre périmètre.',
    description_en: 'Targeted payback horizon for an activation + growth system, measured before/after on your scope.',
    sources: ['proof-points/roi-payback-90-jours'],
  },
  {
    id: 'roi-revenu-supp-25pct',
    category: 'roi',
    value: 'Revenu visé',
    label_fr: 'Revenu additionnel ciblé via un CRM automatisé',
    label_en: 'Targeted additional revenue via an automated CRM',
    description_fr: 'Levier de revenu que vise un CRM automatisé bien câblé, mesuré sur vos chiffres réels.',
    description_en: 'Revenue lever a well-wired automated CRM aims for, measured on your real figures.',
    sources: ['proof-points/roi-revenu-supp-25pct'],
  },
  {
    id: 'roi-4-1x-12-mois',
    category: 'roi',
    value: 'ROI suivi',
    label_fr: 'ROI suivi à 12 mois sur le périmètre acquisition',
    label_en: 'ROI tracked at 12 months on the acquisition scope',
    description_fr: 'On instrumente l\'acquisition pour suivre le ROI à 12 mois sur vos données, baseline posée au départ.',
    description_en: 'We instrument acquisition to track 12-month ROI on your data, with a baseline set upfront.',
    sources: [
      'solutions/acquisition-ia',
      'solutions/site-web-ia-pme',
      'solutions/finance',
      'offres/growth-system-ia',
    ],
  },
  {
    id: 'roi-pipeline-plateau-2-4m',
    category: 'roi',
    value: '8 à 10 sem',
    label_fr: 'Pipeline reconnecté',
    label_en: 'Pipeline reconnected',
    description_fr: 'Délai de câblage visé pour reconnecter un pipeline dormant : site, CRM et relances dans un même flux.',
    description_en: 'Targeted wiring time to reconnect a dormant pipeline: site, CRM and follow-ups in one flow.',
    sources: ['offres/growth-system-ia', 'solutions/acquisition-ia'],
  },
  {
    id: 'roi-leads-x2-4',
    category: 'roi',
    value: '×2,4',
    label_fr: 'Leads qualifiés par mois · objectif visé',
    label_en: 'Qualified leads per month · targeted',
    description_fr: 'Multiplication des leads qualifiés que vise le système une fois câblé, mesurée sur votre pipeline.',
    description_en: 'Qualified-lead multiplier the system aims for once wired, measured on your own pipeline.',
    sources: [
      'solutions/acquisition-ia',
      'solutions/site-web-ia-pme',
      'offres/growth-system-ia',
    ],
  },
  // ── Temps ──
  {
    id: 'time-2-semaines-pilote',
    category: 'time',
    value: '2 semaines',
    label_fr: 'Pilote en production 2 semaines après go',
    label_en: 'Pilot in production within 2 weeks of kickoff',
    description_fr: 'Engagement Waimia : un premier workflow en production deux semaines après le go.',
    description_en: 'Waimia commitment: a first workflow in production two weeks after kickoff.',
    sources: ['proof-points/time-2-semaines-pilote'],
  },
  {
    id: 'time-30pct-taches-reduites',
    category: 'time',
    value: '−30%',
    label_fr: 'Tâches répétitives quotidiennes · réduction visée',
    label_en: 'Daily repetitive tasks · targeted reduction',
    description_fr: 'Charge de tâches récurrentes que vise l\'automatisation d\'un workflow métier, mesurée avant/après chez vous.',
    description_en: 'Recurring-task load that workflow automation aims to cut, measured before/after at your side.',
    sources: ['proof-points/time-30pct-taches-reduites'],
  },
  {
    id: 'time-5-jours-audit',
    category: 'time',
    value: '5 jours',
    label_fr: 'Audit maturité IA complet livré en 5 jours',
    label_en: 'Complete AI maturity audit delivered in 5 days',
    description_fr: 'Engagement standard audit Waimia, inclus dans les offres de diagnostic.',
    description_en: 'Standard Waimia audit engagement, included in diagnostic offers.',
    sources: ['proof-points/time-5-jours-audit', 'offres/activation-ia'],
  },
  {
    id: 'time-qualification-62pct',
    category: 'time',
    value: '−62%',
    label_fr: 'Temps de qualification commercial · cible',
    label_en: 'Sales qualification time · target',
    description_fr: 'Gain de temps de qualification que vise le scoring IA des leads entrants, mesuré sur votre volume.',
    description_en: 'Qualification-time gain that AI scoring of inbound leads aims for, measured on your own volume.',
    sources: ['solutions/acquisition-ia', 'offres/growth-system-ia'],
  },
  {
    id: 'time-cloture-72pct',
    category: 'time',
    value: '−72%',
    label_fr: 'Temps de clôture mensuelle · cible',
    label_en: 'Monthly close time · target',
    description_fr: 'Gain de temps de clôture que vise l\'automatisation de la réconciliation, mesuré sur vos écritures réelles.',
    description_en: 'Close-time gain that reconciliation automation aims for, measured on your real ledger.',
    sources: ['solutions/finance', 'solutions/productivite-ia'],
  },
  {
    id: 'time-halcyon-120h',
    category: 'time',
    value: '120 h',
    label_fr: 'Heures consultant · objectif libéré par trimestre',
    label_en: 'Consultant hours · targeted recovery per quarter',
    description_fr: 'Volume d\'heures qu\'un cabinet vise à récupérer par trimestre en automatisant proposals et relances, mesuré chez vous.',
    description_en: 'Quarterly hours a firm aims to recover by automating proposals and follow-ups, measured at your side.',
    sources: [],
  },
  {
    id: 'time-northbound-2j',
    category: 'time',
    value: '−2 j',
    label_fr: 'Jours de clôture · objectif récupéré par mois',
    label_en: 'Closing days · targeted recovery per month',
    description_fr: 'Jours de charge mensuelle qu\'une clôture automatisée vise à récupérer, mesurés sur votre cycle réel.',
    description_en: 'Monthly workload days an automated close aims to recover, measured on your real cycle.',
    sources: [],
  },
  {
    id: 'time-plateau-22h-sem',
    category: 'time',
    value: '22 h',
    label_fr: 'Heures par semaine · objectif économisé',
    label_en: 'Hours per week · targeted savings',
    description_fr: 'Heures hebdomadaires qu\'un système de qualification et de relances vise à libérer, mesurées chez vous.',
    description_en: 'Weekly hours a qualification-and-follow-up system aims to free, measured at your side.',
    sources: [],
  },
  {
    id: 'time-factures-1200h-an',
    category: 'time',
    value: '1 200 h/an',
    label_fr: 'Heures visées sur le traitement des factures',
    label_en: 'Targeted hours on invoice processing',
    description_fr: 'Capacité du pipeline : 30 s par facture en extraction, classification et pré-saisie automatisées, contre 8 min en manuel.',
    description_en: 'Pipeline capability: 30s per invoice for automated extraction, classification and pre-entry, versus 8 min by hand.',
    sources: ['offres/productivite-operationnelle-ia'],
  },
  // ── Coût ──
  {
    id: 'cost-baisse-40pct',
    category: 'cost',
    value: '−40%',
    label_fr: 'Coût opérationnel · réduction visée',
    label_en: 'Operational cost · targeted reduction',
    description_fr: 'Baisse de coût opérationnel que vise l\'industrialisation de plusieurs workflows, mesurée sur vos charges réelles.',
    description_en: 'Operational cost cut that industrializing several workflows aims for, measured on your real costs.',
    sources: ['proof-points/cost-baisse-40pct'],
  },
  {
    id: 'cost-prix-transparent',
    category: 'cost',
    value: '1500€',
    label_fr: 'Activation IA à prix fixe transparent',
    label_en: 'AI activation at a fixed, transparent price',
    description_fr: 'Tarif fixe de l\'offre Activation 1 semaine, aucun surcoût caché.',
    description_en: 'Fixed rate for the 1-week Activation offer, no hidden costs.',
    sources: ['proof-points/cost-prix-transparent', 'offres/activation-ia'],
  },
  // ── Qualité ──
  {
    id: 'quality-precision-92pct',
    category: 'quality',
    value: '92%',
    label_fr: 'Précision de classification IA · cible production',
    label_en: 'AI classification accuracy · production target',
    description_fr: 'Précision visée pour un modèle de classification fine-tuné, validée sur vos propres données avant mise en production.',
    description_en: 'Accuracy targeted for a fine-tuned classification model, validated on your own data before going live.',
    sources: ['proof-points/quality-precision-92pct'],
  },
  {
    id: 'quality-zero-hallucination',
    category: 'quality',
    value: '0%',
    label_fr: 'Hallucinations critiques avec RAG bien câblé',
    label_en: 'Critical hallucinations with properly configured RAG',
    description_fr: 'Objectif de fiabilité d\'un pipeline RAG correctement câblé avec garde-fous Anthropic Claude, vérifié sur vos contenus.',
    description_en: 'Reliability target of a properly wired RAG pipeline with Anthropic Claude guardrails, verified on your own content.',
    sources: ['proof-points/quality-zero-hallucination'],
  },
  {
    id: 'quality-caserne-4-goulots',
    category: 'quality',
    value: '48 h',
    label_fr: 'Goulots identifiés et documentés · cadence audit',
    label_en: 'Bottlenecks identified and documented · audit cadence',
    description_fr: 'Cadence d\'un audit de cadrage : goulots documentés sous 48 h, plan d\'action livré sous 24 h.',
    description_en: 'Scoping-audit cadence: bottlenecks documented within 48h, action plan delivered within 24h.',
    sources: [],
  },
  // ── Adoption ──
  {
    id: 'adoption-100pct-equipe',
    category: 'adoption',
    value: '100%',
    label_fr: 'Équipes formées et autonomes post-déploiement',
    label_en: 'Teams trained and autonomous after deployment',
    description_fr: 'Engagement contractuel Waimia, inclus dans toutes les offres.',
    description_en: 'Waimia contractual commitment, included in all offers.',
    sources: [
      'proof-points/adoption-100pct-equipe',
      'offres/activation-ia',
      'offres/infrastructure-ia',
      'offres/application-ia-pme',
    ],
  },
  {
    id: 'adoption-30-jours-onboard',
    category: 'adoption',
    value: '30 jours',
    label_fr: 'Onboarding complet collaborateur',
    label_en: 'Complete employee onboarding',
    description_fr: 'Fenêtre de formation prévue pour rendre une équipe autonome sur les workflows livrés.',
    description_en: 'Planned training window to make a team autonomous on the delivered workflows.',
    sources: ['proof-points/adoption-30-jours-onboard'],
  },
  {
    id: 'adoption-95pct-nps',
    category: 'adoption',
    value: 'Satisfaction',
    label_fr: 'Satisfaction suivie, pas mise en scène',
    label_en: 'Satisfaction tracked, not staged',
    description_fr: 'On mesure la satisfaction à chaque mission et on ne publiera un score qu\'une fois assez de retours réels recueillis.',
    description_en: 'We measure satisfaction on every mission and will only publish a score once enough real feedback is gathered.',
    sources: ['proof-points/adoption-95pct-nps'],
  },
  // ── Volume ──
  {
    id: 'volume-1000-tickets-jour',
    category: 'volume',
    value: '1000/jour',
    label_fr: 'Tickets support · capacité de traitement par jour',
    label_en: 'Support tickets · daily processing capacity',
    description_fr: 'Volume quotidien qu\'un agent de support bien câblé peut trier et résoudre, dimensionné sur votre flux.',
    description_en: 'Daily volume a well-wired support agent can triage and resolve, sized to your own flow.',
    sources: ['proof-points/volume-1000-tickets-jour', 'solutions/support-client-ia'],
  },
  {
    id: 'volume-10k-leads-traites',
    category: 'volume',
    value: '10k+',
    label_fr: 'Leads qualifiés · capacité de traitement par mois',
    label_en: 'Qualified leads · monthly processing capacity',
    description_fr: 'Volume mensuel qu\'un growth system peut qualifier et router sans relance manuelle, dimensionné sur votre pipeline.',
    description_en: 'Monthly volume a growth system can qualify and route with no manual chasing, sized to your own pipeline.',
    sources: ['proof-points/volume-10k-leads-traites'],
  },
  {
    id: 'volume-articles-8-semaine',
    category: 'volume',
    value: '8/sem',
    label_fr: 'Articles SEO/GEO publiés par semaine',
    label_en: 'SEO/GEO articles published per week',
    description_fr: 'Pipeline éditorial IA : 8 articles par semaine optimisés Google + citation IA.',
    description_en: 'AI editorial pipeline: 8 articles per week optimised for Google and AI citation.',
    sources: [
      'solutions/acquisition-ia',
      'solutions/site-web-ia-pme',
      'offres/growth-system-ia',
    ],
  },
] as const;

export const PROOF_POINT_IDS: readonly ProofPointId[] = PROOF_POINTS.map((p) => p.id);

export function getProofPoint(id: ProofPointId): ProofPoint | undefined {
  return PROOF_POINTS.find((p) => p.id === id);
}
