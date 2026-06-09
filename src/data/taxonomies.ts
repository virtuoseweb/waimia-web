import type { Lang } from '../lib/i18n';

export type BiText = Record<Lang, string>;

export const CATEGORIES: Record<
  string,
  { label: BiText; description: BiText; color?: string }
> = {
  acquisition: {
    label: { fr: 'Acquisition', en: 'Acquisition' },
    description: {
      fr: 'Systèmes d\'acquisition B2B automatisés pour PME : pipeline commercial, scoring de leads et qualification IA sur HubSpot ou Salesforce.',
      en: 'Automated B2B acquisition systems for SMBs: sales pipeline, AI lead scoring and qualification on HubSpot or Salesforce.',
    },
  },
  crm: {
    label: { fr: 'CRM & Relances', en: 'CRM & Follow-ups' },
    description: {
      fr: 'CRM nettoyé et relances automatisées par IA : scoring de contacts, séquences email personnalisées et suivi pipeline pour PME B2B.',
      en: 'Clean CRM and AI-automated follow-ups: contact scoring, personalised email sequences and pipeline tracking for B2B SMBs.',
    },
  },
  'contenu-seo-geo': {
    label: { fr: 'Contenu SEO/GEO', en: 'SEO/GEO Content' },
    description: {
      fr: 'Stratégie de contenu B2B optimisée SEO et GEO : articles sectoriels, indexation Google et visibilité dans les IA génératives (ChatGPT, Perplexity).',
      en: 'B2B content strategy optimised for SEO and GEO: sector articles, Google indexing and visibility in generative AI engines like ChatGPT and Perplexity.',
    },
  },
  productivite: {
    label: { fr: 'Productivité', en: 'Productivity' },
    description: {
      fr: 'Automatisation des workflows internes pour PME : Excel augmenté, Office IA, agents de traitement documentaire et pipelines de tâches répétitives.',
      en: 'Internal workflow automation for SMBs: AI-augmented Excel, Office automation, document-processing agents and repetitive-task pipelines.',
    },
  },
  support: {
    label: { fr: 'Support client', en: 'Customer Support' },
    description: {
      fr: 'Triage IA et résolution N1 automatisée : agents de support qui qualifient, répondent et escaladent vers un humain uniquement sur les cas complexes.',
      en: 'AI triage and automated L1 resolution: support agents that qualify, respond and escalate to a human only on complex cases.',
    },
  },
  pilotage: {
    label: { fr: 'Pilotage data', en: 'Data Intelligence' },
    description: {
      fr: 'Pilotage data en temps réel pour PME : KPI consolidés, dashboards automatisés et alertes IA pour décider vite sur des chiffres fiables.',
      en: 'Real-time data intelligence for SMBs: consolidated KPIs, automated dashboards and AI alerts to make fast decisions on reliable numbers.',
    },
  },
  data: {
    label: { fr: 'Data & ETL', en: 'Data & ETL' },
    description: {
      fr: 'Connecteurs ETL et structuration de données pour PME : pipelines fiables entre CRM, ERP et entrepôt, avec contrôle qualité automatisé à chaque étape.',
      en: 'ETL connectors and data structuring for SMBs: reliable pipelines between CRM, ERP and warehouse, with automated quality checks at every step.',
    },
  },
  gouvernance: {
    label: { fr: 'Gouvernance IA', en: 'AI Governance' },
    description: {
      fr: 'Gouvernance IA pour PME en EU : conformité AI Act et RGPD, trail audit re-rejouable, garde-fous opérationnels et documentation pour les équipes juridiques.',
      en: 'AI governance for EU SMBs: AI Act and GDPR compliance, replayable audit trail, operational guardrails and documentation for legal teams.',
    },
  },
};

export const CLUSTERS: Record<
  string,
  { label: BiText; pillarSlug?: string; targetSize: number }
> = {
  'pilier-acquisition-pme-2026': {
    label: { fr: 'Acquisition PME B2B 2026', en: 'B2B SMB Acquisition 2026' },
    pillarSlug: 'guide-acquisition-pme-b2b-2026',
    targetSize: 8,
  },
  'pilier-crm-relances-pme-2026': {
    label: { fr: 'CRM & relances PME 2026', en: 'SMB CRM & follow-ups 2026' },
    targetSize: 6,
  },
  'pilier-productivite-excel-2026': {
    label: {
      fr: 'Productivité Excel & Office IA 2026',
      en: 'Excel & Office AI Productivity 2026',
    },
    targetSize: 6,
  },
};

export const SOURCE_TYPES = {
  state: {
    label: { fr: 'Source publique', en: 'Public source' },
    color: '#1e40af',
  },
  university: {
    label: { fr: 'Recherche académique', en: 'Academic research' },
    color: '#7c3aed',
  },
  journal: { label: { fr: 'Presse', en: 'Press' }, color: '#374151' },
  enterprise: {
    label: { fr: 'Communiqué entreprise', en: 'Enterprise release' },
    color: '#C94F2E',
  },
  research: {
    label: { fr: 'Étude / cabinet', en: 'Research / firm' },
    color: '#ea580c',
  },
};
