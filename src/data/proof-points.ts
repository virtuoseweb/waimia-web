// src/data/proof-points.ts — Référentiel UNIQUE des preuves chiffrées (refonte R7a, docs/37 §2.1).
// Consolidation de l'existant, 0 invention : 15 ids repris de src/content/proof-points/*.mdx
// + 7 chiffres récurrents dédupliqués depuis cases.metrics, solutions.roi_metrics/case_results
// et offres.proof.metrics (audit collections.md R8 : un chiffre ne vit qu'à UN endroit).
// `sources` = chemins de contenu (collection/slug) où le chiffre apparaît aujourd'hui.
// Validé par scripts/check-content-refs.mjs (ids stables kebab-case, sources existantes).

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
    value: '3×',
    label_fr: 'ROI x3 en 12 mois sur projets Waimia',
    label_en: '3x ROI within 12 months on Waimia projects',
    description_fr: "Médiane observée sur 8 projets d'automatisation IA 2023-2024.",
    description_en: 'Median observed across 8 AI automation projects 2023-2024.',
    sources: ['proof-points/roi-3x-12-mois'],
  },
  {
    id: 'roi-payback-90-jours',
    category: 'roi',
    value: '90 jours',
    label_fr: 'Payback moyen 90 jours',
    label_en: 'Average 90-day payback period',
    description_fr: 'Moyenne clients Waimia activation + growth system 2024.',
    description_en: 'Average across Waimia activation and growth system clients 2024.',
    sources: ['proof-points/roi-payback-90-jours'],
  },
  {
    id: 'roi-revenu-supp-25pct',
    category: 'roi',
    value: '+25%',
    label_fr: 'Revenu additionnel généré par automation IA',
    label_en: 'Additional revenue generated through AI automation',
    description_fr: 'Benchmark interne Waimia, périmètre clients avec CRM automatisé.',
    description_en: 'Waimia internal benchmark, clients with automated CRM.',
    sources: ['proof-points/roi-revenu-supp-25pct'],
  },
  {
    id: 'roi-4-1x-12-mois',
    category: 'roi',
    value: '4,1×',
    label_fr: 'ROI mesuré à 12 mois (acquisition)',
    label_en: 'ROI measured at 12 months (acquisition)',
    description_fr: 'ROI mesuré à 12 mois sur le périmètre acquisition (cas Plateau).',
    description_en: 'ROI measured at 12 months on the acquisition scope (Plateau case).',
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
    value: '+2,4 M€',
    label_fr: 'Pipeline reconnecté (cas Plateau)',
    label_en: 'Pipeline reconnected (Plateau case)',
    description_fr: '2,4 M€ de pipeline historique réactivé en 8 à 10 semaines chez Plateau.',
    description_en: '€2.4M of historical pipeline reactivated within 8 to 10 weeks at Plateau.',
    sources: ['cases/plateau', 'offres/growth-system-ia', 'solutions/acquisition-ia'],
  },
  {
    id: 'roi-leads-x2-4',
    category: 'roi',
    value: '×2,4',
    label_fr: 'Leads qualifiés par mois',
    label_en: 'Qualified leads per month',
    description_fr: 'Multiplication des leads qualifiés mensuels après câblage du système.',
    description_en: 'Monthly qualified leads multiplied after the system is wired.',
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
    description_fr: 'Délai médian activation Waimia, 12 projets 2024.',
    description_en: 'Median Waimia activation delay, 12 projects 2024.',
    sources: ['proof-points/time-2-semaines-pilote'],
  },
  {
    id: 'time-30pct-taches-reduites',
    category: 'time',
    value: '−30%',
    label_fr: 'Réduction tâches répétitives quotidiennes',
    label_en: 'Reduction in daily repetitive tasks',
    description_fr: 'Étude interne Waimia, déploiements automatisation 2023-2024.',
    description_en: 'Waimia internal study, automation deployments 2023-2024.',
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
    label_fr: 'Temps de qualification commercial',
    label_en: 'Sales qualification time',
    description_fr: 'Réduction du temps de qualification après scoring IA des leads entrants.',
    description_en: 'Qualification time reduction after AI scoring of inbound leads.',
    sources: ['solutions/acquisition-ia', 'offres/growth-system-ia'],
  },
  {
    id: 'time-cloture-72pct',
    category: 'time',
    value: '−72%',
    label_fr: 'Temps de clôture mensuelle',
    label_en: 'Monthly close time',
    description_fr: 'Réduction du temps de clôture après automatisation de la réconciliation.',
    description_en: 'Close time reduction after reconciliation automation.',
    sources: ['solutions/finance', 'solutions/productivite-ia'],
  },
  {
    id: 'time-halcyon-120h',
    category: 'time',
    value: '120 h',
    label_fr: 'Heures consultant libérées (cas Halcyon)',
    label_en: 'Consultant hours recovered (Halcyon case)',
    description_fr: '120 heures consultant libérées au Q1 2026, 3 projets livrés on-time.',
    description_en: '120 consultant hours recovered in Q1 2026, 3 projects delivered on time.',
    sources: ['cases/halcyon'],
  },
  {
    id: 'time-northbound-2j',
    category: 'time',
    value: '−2 j',
    label_fr: 'Jours de clôture récupérés par mois (cas Northbound)',
    label_en: 'Closing days recovered per month (Northbound case)',
    description_fr: '2 jours de charge mensuelle récupérés, 80 % des questions de clôture traitées automatiquement.',
    description_en: '2 days of monthly workload recovered, 80% of closing questions handled automatically.',
    sources: ['cases/northbound'],
  },
  {
    id: 'time-plateau-22h-sem',
    category: 'time',
    value: '22 h',
    label_fr: 'Heures économisées par semaine (cas Plateau)',
    label_en: 'Hours saved per week (Plateau case)',
    description_fr: '22 heures par semaine économisées sur la qualification et les relances.',
    description_en: '22 hours per week saved on qualification and follow-ups.',
    sources: ['cases/plateau'],
  },
  {
    id: 'time-factures-1200h-an',
    category: 'time',
    value: '1 200 h/an',
    label_fr: 'Heures récupérées sur le traitement des factures',
    label_en: 'Hours recovered on invoice processing',
    description_fr: 'Extraction, classification et pré-saisie automatisées : 30 s par facture contre 8 min avant.',
    description_en: 'Automated extraction, classification and pre-entry: 30s per invoice versus 8 min before.',
    sources: ['offres/productivite-operationnelle-ia', 'cases/caserne'],
  },
  // ── Coût ──
  {
    id: 'cost-baisse-40pct',
    category: 'cost',
    value: '−40%',
    label_fr: 'Coût opérationnel après industrialisation',
    label_en: 'Operational cost reduction after industrialization',
    description_fr: 'Benchmark Waimia, clients ayant automatisé plus de 3 workflows.',
    description_en: 'Waimia benchmark, clients having automated more than 3 workflows.',
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
    label_fr: 'Précision classification IA en production',
    label_en: 'AI classification accuracy in production',
    description_fr: 'Mesure en production sur modèles fine-tunés clients Waimia.',
    description_en: 'Production measurement on fine-tuned models for Waimia clients.',
    sources: ['proof-points/quality-precision-92pct'],
  },
  {
    id: 'quality-zero-hallucination',
    category: 'quality',
    value: '0%',
    label_fr: 'Hallucinations critiques avec RAG bien câblé',
    label_en: 'Critical hallucinations with properly configured RAG',
    description_fr: 'Audit qualité Waimia, pipelines RAG avec garde-fous Anthropic Claude.',
    description_en: 'Waimia quality audit, RAG pipelines with Anthropic Claude guardrails.',
    sources: ['proof-points/quality-zero-hallucination'],
  },
  {
    id: 'quality-caserne-4-goulots',
    category: 'quality',
    value: '4 en 48 h',
    label_fr: 'Goulots identifiés et documentés (cas Caserne)',
    label_en: 'Bottlenecks identified and documented (Caserne case)',
    description_fr: '4 goulots documentés en 48 h, plan d\'action livré sous 24 h, −35 % de délais inter-sites estimés.',
    description_en: '4 bottlenecks documented in 48h, action plan delivered within 24h, estimated 35% inter-site delay reduction.',
    sources: ['cases/caserne'],
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
    description_fr: 'Durée médiane de formation équipe, projets Waimia 2024.',
    description_en: 'Median team training duration, Waimia projects 2024.',
    sources: ['proof-points/adoption-30-jours-onboard'],
  },
  {
    id: 'adoption-95pct-nps',
    category: 'adoption',
    value: '95%',
    label_fr: 'NPS clients Waimia 2025',
    label_en: 'Waimia client NPS 2025',
    description_fr: 'Enquête satisfaction clients Waimia Q1 2025, 22 répondants.',
    description_en: 'Waimia client satisfaction survey Q1 2025, 22 respondents.',
    sources: ['proof-points/adoption-95pct-nps'],
  },
  // ── Volume ──
  {
    id: 'volume-1000-tickets-jour',
    category: 'volume',
    value: '1000/jour',
    label_fr: 'Tickets support automatisés par jour',
    label_en: 'Support tickets automated per day',
    description_fr: 'Client SaaS B2B, déploiement agent support Waimia 2024.',
    description_en: 'B2B SaaS client, Waimia support agent deployment 2024.',
    sources: ['proof-points/volume-1000-tickets-jour', 'solutions/support-client-ia'],
  },
  {
    id: 'volume-10k-leads-traites',
    category: 'volume',
    value: '10k+',
    label_fr: 'Leads qualifiés traités par mois pour clients',
    label_en: 'Qualified leads processed per month for clients',
    description_fr: 'Périmètre clients growth system Waimia, données agrégées 2024.',
    description_en: 'Waimia growth system client scope, aggregated 2024 data.',
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
