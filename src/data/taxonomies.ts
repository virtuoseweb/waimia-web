import type { Lang } from '../lib/i18n';

export type BiText = Record<Lang, string>;

/**
 * SILOS · taxonomie éditoriale unique du site (champ `category` des contenus).
 *
 * Un silo = un thème du maillage interne (`Topic` de src/lib/internal-mesh.ts) : la
 * catégorie d'un contenu est le PREMIER thème de sa page au registre du maillage
 * (garde `check:silos`). Chaque silo porte :
 *  - `label` : libellé affiché (kicker d'article, puces de filtre des hubs) ;
 *  - `pillar` : page pilier du silo (cible des liens « tout le silo ») ;
 *  - `question` : question injectée en tête du bandeau CTA des articles, écrite pour
 *    que la phrase garde un sens quel que soit l'article du silo.
 * Ajouter un silo = ajouter son thème au maillage ET une entrée ici (le schéma Zod
 * de `category` dérive de ces clés).
 */
export const SILOS = {
  automatisation: {
    label: { fr: 'Automatisation', en: 'Automation' },
    pillar: '/services/automatisations',
    question: { fr: 'Quelles tâches automatiser en premier chez vous ?', en: 'Which tasks should you automate first?' },
  },
  agents: {
    label: { fr: 'Agents IA', en: 'AI agents' },
    pillar: '/services/agents-ia',
    question: { fr: 'Un agent IA aurait-il sa place dans votre équipe ?', en: 'Would an AI agent earn its place in your team?' },
  },
  claude: {
    label: { fr: 'Claude et assistants IA', en: 'Claude and AI assistants' },
    pillar: '/ressources/guides/claude-pme',
    question: { fr: "Comment Claude s'intégrerait-il à vos outils et à vos équipes ?", en: 'How would Claude fit your tools and your team?' },
  },
  applications: {
    label: { fr: 'Applications métier', en: 'Business apps' },
    pillar: '/services/applications-internes',
    question: { fr: 'Une application métier remplacerait-elle vos tableurs ?', en: 'Could a business app replace your spreadsheets?' },
  },
  commercial: {
    label: { fr: 'Prospection et CRM', en: 'Prospecting and CRM' },
    pillar: '/services/systeme-commercial',
    question: { fr: 'Combien de relances et de devis vous échappent chaque mois ?', en: 'How many follow-ups and quotes slip through each month?' },
  },
  acquisition: {
    label: { fr: 'Acquisition et visibilité', en: 'Acquisition and visibility' },
    pillar: '/services/systeme-acquisition',
    question: { fr: 'Votre site attire-t-il les bons prospects ?', en: 'Does your website attract the right prospects?' },
  },
  donnees: {
    label: { fr: 'Données et pilotage', en: 'Data and reporting' },
    pillar: '/services/donnees-reporting',
    question: { fr: 'Vos chiffres arrivent-ils à temps pour décider ?', en: 'Do your numbers arrive in time to decide?' },
  },
  conseil: {
    label: { fr: 'Stratégie IA', en: 'AI strategy' },
    pillar: '/services/consultant-ia-claude',
    question: { fr: "Par où commencer avec l'IA dans votre entreprise ?", en: 'Where should your company start with AI?' },
  },
  conformite: {
    label: { fr: 'Conformité IA et RGPD', en: 'AI compliance and GDPR' },
    pillar: '/conformite-ia',
    question: { fr: "Vos usages de l'IA sont-ils en règle avec l'AI Act et le RGPD ?", en: 'Are your AI uses compliant with the AI Act and GDPR?' },
  },
  formation: {
    label: { fr: 'Formation IA', en: 'AI training' },
    pillar: '/formations',
    question: { fr: "Vos équipes savent-elles se servir de l'IA au quotidien ?", en: 'Can your teams use AI day to day?' },
  },
  studio: {
    label: { fr: 'Le studio', en: 'The studio' },
    pillar: '/agence',
    question: { fr: 'Envie de voir comment nous travaillerions ensemble ?', en: 'Want to see how we would work together?' },
  },
} as const satisfies Record<string, { label: BiText; pillar: string; question: BiText }>;

export type Silo = keyof typeof SILOS;
export const SILO_KEYS = Object.keys(SILOS) as [Silo, ...Silo[]];

/** Libellé d'un silo (repli : la clé brute, jamais une chaîne vide). */
export function siloLabel(key: string | undefined, lang: Lang = 'fr'): string | undefined {
  if (!key) return undefined;
  return key in SILOS ? SILOS[key as Silo].label[lang] : key;
}

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

/**
 * Phrase du bandeau CTA d'un contenu : la question de son silo + l'offre d'audit.
 * Sans silo (outil, page hors taxonomie), question générique.
 */
export function siloCtaText(key: string | undefined, lang: Lang = 'fr'): string {
  const question = key && key in SILOS
    ? SILOS[key as Silo].question[lang]
    : lang === 'fr' ? 'Vous voulez savoir ce que ce sujet change chez vous ?' : 'Want to know what this changes for you?';
  return lang === 'fr'
    ? `${question} L'audit gratuit de 45 minutes part de vos tâches réelles et dit par où commencer, ou s'il vaut mieux ne rien faire.`
    : `${question} The free 45-minute audit starts from your real tasks and says where to begin, or whether to leave it alone.`;
}
