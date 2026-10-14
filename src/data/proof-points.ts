// src/data/proof-points.ts — Référentiel UNIQUE des repères affichables (refonte R7a, docs/37 §2.1).
// RÈGLE (refonte contenus 2026-10) : ce fichier ne contient QUE des engagements d'offre
// (audit, pilote, prix, formation) et des modalités de mesure. AUCUNE valeur cible chiffrée
// (pourcentage, multiplicateur, volume) n'y figure : une cible présentée dans une barre de
// métriques se lit comme un résultat. Les résultats réels vivent dans les fiches
// src/content/cases/* et nulle part ailleurs.
// Les `id` restent STABLES (des consommateurs en dépendent, validés par check-content-refs.mjs) :
// certains ids portent encore un chiffre dans leur nom, la VALEUR affichée ne le reprend plus.
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
  | 'roi-leads-x2-4'
  | 'time-2-semaines-pilote'
  | 'time-30pct-taches-reduites'
  | 'time-5-jours-audit'
  | 'time-qualification-62pct'
  | 'time-cloture-72pct'
  | 'time-factures-1200h-an'
  | 'cost-baisse-40pct'
  | 'cost-prix-transparent'
  | 'quality-precision-92pct'
  | 'quality-zero-hallucination'
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
    value: 'Suivi',
    label_fr: "Retour sur investissement suivi sur votre périmètre",
    label_en: "Return on investment tracked on your scope",
    description_fr: "Mesuré avant et après sur vos propres données ; aucune valeur cible n'est annoncée à l'avance.",
    description_en: "Measured before and after on your own data; no target value is announced in advance.",
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
      'solutions/agent-marketing-commercial',
      'offres/growth-system-ia',
    ],
  },
  {
    id: 'roi-leads-x2-4',
    category: 'roi',
    value: 'Mesuré',
    label_fr: "Leads qualifiés par mois, suivis dans votre CRM",
    label_en: "Qualified leads per month, tracked in your CRM",
    description_fr: "Mesuré avant et après sur vos propres données ; aucune valeur cible n'est annoncée à l'avance.",
    description_en: "Measured before and after on your own data; no target value is announced in advance.",
    sources: [
      'solutions/agent-marketing-commercial',
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
    value: 'Mesuré',
    label_fr: "Temps passé sur les tâches répétitives, avant et après",
    label_en: "Time spent on repetitive tasks, before and after",
    description_fr: "Mesuré avant et après sur vos propres données ; aucune valeur cible n'est annoncée à l'avance.",
    description_en: "Measured before and after on your own data; no target value is announced in advance.",
    sources: ['proof-points/time-30pct-taches-reduites'],
  },
  {
    id: 'time-5-jours-audit',
    category: 'time',
    value: '45 min',
    label_fr: 'Audit IA gratuit : un échange de 45 minutes en visio',
    label_en: 'Free AI audit: a 45-minute call',
    description_fr: "L'audit est gratuit et sans engagement. Le sprint de cadrage qui peut suivre dure 10 heures, pour 999 € HT.",
    description_en: 'The audit is free, with no commitment. The scoping sprint that may follow lasts 10 hours, for €999 excl. VAT.',
    sources: ['proof-points/time-5-jours-audit'],
  },
  {
    id: 'time-qualification-62pct',
    category: 'time',
    value: 'Mesuré',
    label_fr: "Temps de qualification commerciale, avant et après",
    label_en: "Sales qualification time, before and after",
    description_fr: "Mesuré avant et après sur vos propres données ; aucune valeur cible n'est annoncée à l'avance.",
    description_en: "Measured before and after on your own data; no target value is announced in advance.",
    sources: ['solutions/agent-marketing-commercial', 'offres/growth-system-ia'],
  },
  {
    id: 'time-cloture-72pct',
    category: 'time',
    value: 'Mesuré',
    label_fr: "Temps de clôture mensuelle, avant et après",
    label_en: "Monthly close time, before and after",
    description_fr: "Mesuré avant et après sur vos propres données ; aucune valeur cible n'est annoncée à l'avance.",
    description_en: "Measured before and after on your own data; no target value is announced in advance.",
    sources: [],
  },
  {
    id: 'time-factures-1200h-an',
    category: 'time',
    value: 'Mesuré',
    label_fr: "Temps de traitement des factures, avant et après",
    label_en: "Invoice processing time, before and after",
    description_fr: "Mesuré avant et après sur vos propres données ; aucune valeur cible n'est annoncée à l'avance.",
    description_en: "Measured before and after on your own data; no target value is announced in advance.",
    sources: [],
  },
  // ── Coût ──
  {
    id: 'cost-baisse-40pct',
    category: 'cost',
    value: 'Mesuré',
    label_fr: "Coût opérationnel du process, avant et après",
    label_en: "Operational cost of the process, before and after",
    description_fr: "Mesuré avant et après sur vos propres données ; aucune valeur cible n'est annoncée à l'avance.",
    description_en: "Measured before and after on your own data; no target value is announced in advance.",
    sources: ['proof-points/cost-baisse-40pct'],
  },
  {
    id: 'cost-prix-transparent',
    category: 'cost',
    value: 'dès 2 000 €',
    label_fr: 'Prix d’entrée fixe et transparent',
    label_en: 'Fixed, transparent entry price',
    description_fr: 'Grille publique 2 000 / 4 000 / 7 000 / 10 000 € HT, audit gratuit, aucun surcoût caché.',
    description_en: 'Public grid 2,000 / 4,000 / 7,000 / 10,000 € ex VAT, free audit, no hidden costs.',
    sources: ['proof-points/cost-prix-transparent'],
  },
  // ── Qualité ──
  {
    id: 'quality-precision-92pct',
    category: 'quality',
    value: 'Validé',
    label_fr: "Précision vérifiée sur vos données avant mise en production",
    label_en: "Accuracy checked on your data before going live",
    description_fr: "La précision d'une classification est mesurée sur un échantillon de vos propres données avant toute mise en production.",
    description_en: "Classification accuracy is measured on a sample of your own data before any go-live.",
    sources: ['proof-points/quality-precision-92pct'],
  },
  {
    id: 'quality-zero-hallucination',
    category: 'quality',
    value: 'Sourcé',
    label_fr: "Réponses limitées à vos sources, escalade sinon",
    label_en: "Answers limited to your sources, escalation otherwise",
    description_fr: "Un agent ne répond que depuis les sources fournies et transmet à un humain quand il n'en trouve pas. Le risque d'erreur est réduit, jamais nul.",
    description_en: "An agent answers only from the sources provided and hands over to a human when it finds none. The risk of error is reduced, never zero.",
    sources: ['proof-points/quality-zero-hallucination'],
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
      'offres/growth-system-ia',
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
    value: 'Dimensionné',
    label_fr: "Capacité de traitement calée sur votre volume de demandes",
    label_en: "Processing capacity sized to your request volume",
    description_fr: "Le volume traité par un agent de support est dimensionné sur votre flux réel, mesuré au cadrage.",
    description_en: "The volume handled by a support agent is sized to your real flow, measured at scoping.",
    sources: ['proof-points/volume-1000-tickets-jour'],
  },
  {
    id: 'volume-10k-leads-traites',
    category: 'volume',
    value: 'Dimensionné',
    label_fr: "Capacité de traitement calée sur votre pipeline",
    label_en: "Processing capacity sized to your pipeline",
    description_fr: "Le volume de demandes qualifiées et routées est dimensionné sur votre pipeline réel.",
    description_en: "The volume of requests qualified and routed is sized to your real pipeline.",
    sources: ['proof-points/volume-10k-leads-traites'],
  },
  {
    id: 'volume-articles-8-semaine',
    category: 'volume',
    value: 'En cadence',
    label_fr: "Rythme de publication fixé avec vous, relu par un humain",
    label_en: "Publishing pace set with you, reviewed by a human",
    description_fr: "Le rythme de publication est fixé au cadrage selon votre capacité de relecture, pas selon un volume standard.",
    description_en: "The publishing pace is set at scoping based on your review capacity, not a standard volume.",
    sources: [
      'solutions/agent-marketing-commercial',
      'offres/growth-system-ia',
    ],
  },
] as const;

export const PROOF_POINT_IDS: readonly ProofPointId[] = PROOF_POINTS.map((p) => p.id);

export function getProofPoint(id: ProofPointId): ProofPoint | undefined {
  return PROOF_POINTS.find((p) => p.id === id);
}
