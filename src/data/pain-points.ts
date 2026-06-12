// src/data/pain-points.ts — Référentiel UNIQUE des douleurs prospects (refonte R7a, docs/37 §2.1).
// Consolidation de l'existant, 0 invention : chaque entrée provient des douleurs déjà écrites
// dans src/content/pain-points/*.mdx (ids repris tels quels) ou des pains inline éparpillés
// (solutions.pains, offres.problem_statement, secteurs.pains_fr, corps des cas), dédupliqués ici.
// `sources` = chemins de contenu (collection/slug) où la douleur apparaît aujourd'hui.
// Validé par scripts/check-content-refs.mjs (ids stables kebab-case, sources existantes).

export type PainPointId =
  | 'leads-non-qualifies'
  | 'seo-stagnant-sans-volume'
  | 'landing-pages-low-convert'
  | 'manque-visibilite-pipeline'
  | 'pipeline-dormant-crm'
  | 'pipeline-dependant-humains'
  | 'reporting-manuel-excel'
  | 'decisions-sans-data'
  | 'objectifs-non-mesures'
  | 'taches-repetitives-quotidiennes'
  | 'onboarding-collaborateurs-lent'
  | 'adoption-ia-faible'
  | 'outils-generiques-inadaptes'
  | 'pilotes-ia-sans-production'
  | 'support-premier-niveau-sature'
  | 'prompt-leak-confidential'
  | 'donnees-clients-rgpd-flou'
  | 'agent-actions-non-auditables'
  | 'conformite-reglementaire-chronophage'
  | 'goulots-operationnels-non-identifies';

export interface PainPoint {
  id: PainPointId;
  label_fr: string;
  label_en: string;
  description_fr: string;
  description_en: string;
  /** Chemins de contenu (collection/slug) où cette douleur est déjà exprimée. */
  sources: string[];
}

export const PAIN_POINTS: readonly PainPoint[] = [
  {
    id: 'leads-non-qualifies',
    label_fr: 'Leads non qualifiés',
    label_en: 'Unqualified leads',
    description_fr:
      "Les commerciaux passent 40 à 60 % de leur temps sur des leads tièdes ou hors ICP. Le taux de conversion stagne malgré les investissements en acquisition.",
    description_en:
      'Sales reps spend 40 to 60% of their time on lukewarm or off-ICP leads. Conversion rates stagnate despite acquisition investment.',
    sources: [
      'pain-points/leads-non-qualifies',
      'solutions/acquisition-ia',
      'offres/growth-system-ia',
    ],
  },
  {
    id: 'seo-stagnant-sans-volume',
    label_fr: 'Contenu invisible, SEO et GEO stagnants',
    label_en: 'Invisible content, stagnant SEO and GEO',
    description_fr:
      "Le contenu reste enfoui page 4 de Google, les IA génératives ne citent pas la marque, et la capacité de production ne suit pas le volume nécessaire.",
    description_en:
      "Content stays buried on Google page 4, generative AIs do not cite the brand, and production capacity cannot match the required volume.",
    sources: [
      'pain-points/seo-stagnant-sans-volume',
      'solutions/acquisition-ia',
      'solutions/contenu-seo-geo-ia',
      'solutions/site-web-ia-pme',
    ],
  },
  {
    id: 'landing-pages-low-convert',
    label_fr: 'Landing pages qui ne convertissent pas',
    label_en: 'Low-converting landing pages',
    description_fr:
      "Le site génère du trafic mais convertit sous les 2 % : l'expérience de page ne répond pas aux objections réelles et le coût d'acquisition explose.",
    description_en:
      'The site generates traffic but converts below 2%: the page experience does not address real objections and acquisition cost skyrockets.',
    sources: [
      'pain-points/landing-pages-low-convert',
      'solutions/site-web-ia-pme',
      'offres/growth-system-ia',
    ],
  },
  {
    id: 'manque-visibilite-pipeline',
    label_fr: 'Pipeline commercial sans visibilité',
    label_en: 'No visibility on the sales pipeline',
    description_fr:
      "Le pipeline est une boîte noire : impossible de savoir quelles opportunités avancent, lesquelles stagnent, ni quel chiffre est prenable à 90 jours.",
    description_en:
      'The pipeline is a black box: no way to know which opportunities progress, which stagnate, or what revenue is closeable within 90 days.',
    sources: [
      'pain-points/manque-visibilite-pipeline',
      'solutions/crm-relances-ia',
    ],
  },
  {
    id: 'pipeline-dormant-crm',
    label_fr: 'Pipeline qui dort dans le CRM',
    label_en: 'Pipeline dormant in the CRM',
    description_fr:
      "Les leads existent mais fuient entre le site, le CRM et les boîtes mail : relances tardives ou oubliées, opportunités historiques jamais réactivées.",
    description_en:
      'Leads exist but leak between the site, the CRM and inboxes: late or forgotten follow-ups, historical opportunities never reactivated.',
    sources: [
      'solutions/crm-relances-ia',
      'offres/growth-system-ia',
    ],
  },
  {
    id: 'pipeline-dependant-humains',
    label_fr: "Pipeline dépendant d'une ou deux personnes",
    label_en: 'Pipeline dependent on one or two people',
    description_fr:
      "L'acquisition tient sur 1 ou 2 commerciaux : une absence et les leads s'évaporent. Recruter un SDR coûte cher, monte lentement en charge et repart.",
    description_en:
      'Acquisition relies on 1 or 2 salespeople: one absence and leads evaporate. Hiring an SDR is expensive, slow to ramp, and short-lived.',
    sources: ['solutions/acquisition-ia'],
  },
  {
    id: 'reporting-manuel-excel',
    label_fr: 'Reporting manuel sur tableurs',
    label_en: 'Manual spreadsheet reporting',
    description_fr:
      "Chaque clôture, des jours sont passés à consolider des tableurs hétérogènes pour un reporting périmé le jour de la présentation.",
    description_en:
      'Every close, days are spent consolidating heterogeneous spreadsheets for a report already stale on presentation day.',
    sources: [
      'pain-points/reporting-manuel-excel',
      'solutions/finance',
      'solutions/productivite-ia',
      'offres/growth-intelligence',
    ],
  },
  {
    id: 'decisions-sans-data',
    label_fr: 'Décisions sans données fiables',
    label_en: 'Decisions without reliable data',
    description_fr:
      "Les décisions stratégiques reposent sur l'intuition : les indicateurs manquent, sont éparpillés ou arrivent trop tard pour les arbitrages qui comptent.",
    description_en:
      'Strategic decisions rely on intuition: indicators are missing, scattered, or arrive too late for the decisions that matter.',
    sources: [
      'pain-points/decisions-sans-data',
      'solutions/finance',
      'solutions/productivite-ia',
      'solutions/site-web-ia-pme',
      'offres/growth-intelligence',
    ],
  },
  {
    id: 'objectifs-non-mesures',
    label_fr: 'Objectifs fixés mais jamais mesurés',
    label_en: 'Targets set but never measured',
    description_fr:
      "Les objectifs annuels sont fixés en janvier et revus en décembre : sans suivi mensuel des KPIs, les dérives sont détectées trop tard.",
    description_en:
      'Annual targets are set in January and reviewed in December: without monthly KPI tracking, deviations are detected too late.',
    sources: ['pain-points/objectifs-non-mesures'],
  },
  {
    id: 'taches-repetitives-quotidiennes',
    label_fr: 'Tâches répétitives qui dévorent le temps',
    label_en: 'Repetitive tasks devouring time',
    description_fr:
      "40 % du temps des équipes part en formules, copier-coller, devis et documents faits à la main, au détriment de l'analyse et de la décision.",
    description_en:
      'Teams lose 40% of their time to formulas, copy-paste, hand-made quotes and documents, at the expense of analysis and decision-making.',
    sources: [
      'pain-points/taches-repetitives-quotidiennes',
      'solutions/productivite-ia',
      'solutions/site-web-ia-pme',
      'offres/productivite-operationnelle-ia',
    ],
  },
  {
    id: 'onboarding-collaborateurs-lent',
    label_fr: 'Onboarding collaborateur trop lent',
    label_en: 'Slow employee onboarding',
    description_fr:
      "Intégrer un collaborateur prend six semaines de productivité partielle : les procédures sont éparpillées dans des emails, des drives et des têtes.",
    description_en:
      "Onboarding a new hire takes six weeks of partial productivity: procedures are scattered across emails, drives, and people's heads.",
    sources: ['pain-points/onboarding-collaborateurs-lent'],
  },
  {
    id: 'adoption-ia-faible',
    label_fr: "L'IA disponible mais pas utilisée",
    label_en: 'AI available but unused',
    description_fr:
      "Les équipes ont accès à l'IA mais ne l'utilisent pas : sans scripts d'adoption, bibliothèque de prompts et connecteurs, l'usage ne décolle pas.",
    description_en:
      'Teams have access to AI but do not use it: without adoption scripts, a prompt library and connectors, usage never takes off.',
    sources: ['offres/claude-cowork'],
  },
  {
    id: 'outils-generiques-inadaptes',
    label_fr: 'Outils IA génériques inadaptés au métier',
    label_en: 'Generic AI tools unfit for the business',
    description_fr:
      "Les outils IA généralistes ne connaissent ni le métier, ni les clients, ni les données : le process s'adapte à l'outil au lieu de l'inverse.",
    description_en:
      'Generic AI tools know neither the business, the clients, nor the data: the process adapts to the tool instead of the reverse.',
    sources: ['offres/application-ia-pme'],
  },
  {
    id: 'pilotes-ia-sans-production',
    label_fr: 'Pilotes IA qui ne passent jamais en production',
    label_en: 'AI pilots that never reach production',
    description_fr:
      "Des pilotes IA partout, aucun en production : chaque équipe réinvente la roue, la donnée ne circule pas, et personne n'a le mandat pour un projet de 6 mois.",
    description_en:
      'AI pilots everywhere, none in production: every team reinvents the wheel, data does not flow, and nobody has the mandate for a 6-month project.',
    sources: ['offres/infrastructure-ia', 'offres/activation-ia'],
  },
  {
    id: 'support-premier-niveau-sature',
    label_fr: 'Support de premier niveau saturé',
    label_en: 'Saturated first-line support',
    description_fr:
      "Les tickets s'accumulent, le premier niveau répète les mêmes réponses et l'escalade vers l'humain est mal calibrée.",
    description_en:
      'Tickets pile up, first-line support repeats the same answers, and escalation to humans is poorly calibrated.',
    sources: ['solutions/support-client-ia'],
  },
  {
    id: 'prompt-leak-confidential',
    label_fr: 'Données confidentielles collées dans des IA grand public',
    label_en: 'Confidential data pasted into consumer AI tools',
    description_fr:
      "Les collaborateurs collent données contractuelles, tarifs et informations clients dans des IA en libre accès : ces données partent dans des pipelines tiers.",
    description_en:
      'Staff paste contractual data, pricing and client information into free-tier AI tools: that data flows into third-party pipelines.',
    sources: [
      'pain-points/prompt-leak-confidential',
      'offres/claude-cowork',
      'offres/infrastructure-ia',
    ],
  },
  {
    id: 'donnees-clients-rgpd-flou',
    label_fr: 'Gouvernance RGPD des données IA floue',
    label_en: 'Unclear GDPR governance of AI data',
    description_fr:
      "Les agents IA accèdent aux données clients sans politique de rétention ni base légale documentée : un contrôle CNIL serait intenable sous 72 heures.",
    description_en:
      'AI agents access client data without retention policy or documented legal basis: a CNIL audit could not be answered within 72 hours.',
    sources: ['pain-points/donnees-clients-rgpd-flou', 'solutions/fintech'],
  },
  {
    id: 'agent-actions-non-auditables',
    label_fr: 'Actions des agents IA non auditables',
    label_en: 'Non-auditable AI agent actions',
    description_fr:
      "Les agents IA agissent (emails, CRM, devis) sans journal d'audit traçable : impossible de reconstituer qui a fait quoi, quand et pourquoi.",
    description_en:
      'AI agents act (emails, CRM, quotes) with no traceable audit log: impossible to reconstruct who did what, when, and why.',
    sources: ['pain-points/agent-actions-non-auditables', 'solutions/fintech'],
  },
  {
    id: 'conformite-reglementaire-chronophage',
    label_fr: 'Mise en conformité réglementaire chronophage',
    label_en: 'Time-consuming regulatory compliance',
    description_fr:
      "ACPR, AI Act, KYC, LCB-FT : la préparation des dossiers et le reporting régulateur consomment les équipes, et la stack rend la conformité difficile.",
    description_en:
      'ACPR, AI Act, KYC, AML: preparing files and regulator reporting drains teams, and the stack makes compliance difficult.',
    sources: ['solutions/fintech'],
  },
  {
    id: 'goulots-operationnels-non-identifies',
    label_fr: 'Goulots opérationnels non identifiés',
    label_en: 'Unidentified operational bottlenecks',
    description_fr:
      "ERP non connectés, flux inter-sites opaques, qualité détectée trop tard : les goulots qui coûtent le plus ne sont ni identifiés ni documentés.",
    description_en:
      'Disconnected ERPs, opaque inter-site flows, quality detected too late: the costliest bottlenecks are neither identified nor documented.',
    sources: ['offres/conseil'],
  },
] as const;

export const PAIN_POINT_IDS: readonly PainPointId[] = PAIN_POINTS.map((p) => p.id);

export function getPainPoint(id: PainPointId): PainPoint | undefined {
  return PAIN_POINTS.find((p) => p.id === id);
}
