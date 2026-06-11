// Waimia · Écosystème partenaires (docs/48)
// Source de vérité des 16 logos unifiés. Chaque logo est un masque alpha sous
// `public/logos/partners/partner-<slug>.<ext>` ; la couleur vient du CSS
// (`currentColor`) via l'atome `PartnerLogo.astro`.
//
// Règle href : JAMAIS de 404. Page interne /technologies/<x> si elle existe,
// sinon URL officielle (external:true).

export type PartnerCategory =
  | 'ai'
  | 'cloud'
  | 'data'
  | 'crm'
  | 'microsoft'
  | 'certification';

export interface Partner {
  /** = nom de fichier asset sans `partner-` ni extension. */
  slug: string;
  /** Libellé affiché / alt. */
  name: string;
  /** `/logos/partners/partner-<slug>.png|svg` (respecte l'extension réelle). */
  asset: string;
  /** Catégorie principale (groupe la grille hub + le méga-menu). */
  category: PartnerCategory;
  /** Lien interne, sinon URL officielle. Jamais un 404. */
  href?: string;
  /** true si href externe → target _blank rel noopener. */
  external?: boolean;
}

export const PARTNERS: Partner[] = [
  // ── IA ──
  {
    slug: 'claude',
    name: 'Claude (Anthropic)',
    asset: '/logos/partners/partner-claude.png',
    category: 'ai',
    href: '/technologies/claude-models',
  },
  {
    slug: 'openai',
    name: 'OpenAI',
    asset: '/logos/partners/partner-openai.png',
    category: 'ai',
    href: 'https://openai.com',
    external: true,
  },
  {
    slug: 'copilot',
    name: 'Microsoft Copilot',
    asset: '/logos/partners/partner-copilot.svg',
    category: 'ai',
    href: '/technologies/microsoft-power-platform',
  },
  // ── Cloud ──
  {
    slug: 'aws',
    name: 'Amazon Web Services',
    asset: '/logos/partners/partner-aws.png',
    category: 'cloud',
    href: 'https://aws.amazon.com',
    external: true,
  },
  {
    slug: 'google',
    name: 'Google Cloud',
    asset: '/logos/partners/partner-google.png',
    category: 'cloud',
    href: 'https://cloud.google.com',
    external: true,
  },
  {
    slug: 'microsoft',
    name: 'Microsoft',
    asset: '/logos/partners/partner-microsoft.png',
    category: 'cloud',
    href: '/technologies/microsoft-power-platform',
  },
  // ── Data ──
  {
    slug: 'power-bi',
    name: 'Microsoft Power BI',
    asset: '/logos/partners/partner-power-bi.svg',
    category: 'data',
    href: '/technologies/microsoft-power-platform',
  },
  {
    slug: 'sap',
    name: 'SAP',
    asset: '/logos/partners/partner-sap.png',
    category: 'data',
    href: 'https://www.sap.com',
    external: true,
  },
  // ── CRM ──
  {
    slug: 'salesforce',
    name: 'Salesforce',
    asset: '/logos/partners/partner-salesforce.png',
    category: 'crm',
    href: 'https://www.salesforce.com',
    external: true,
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    asset: '/logos/partners/partner-hubspot.png',
    category: 'crm',
    href: 'https://www.hubspot.com',
    external: true,
  },
  // ── Microsoft Power Platform ──
  {
    slug: 'power-apps',
    name: 'Microsoft Power Apps',
    asset: '/logos/partners/partner-power-apps.svg',
    category: 'microsoft',
    href: '/technologies/microsoft-power-platform',
  },
  {
    slug: 'power-automate',
    name: 'Microsoft Power Automate',
    asset: '/logos/partners/partner-power-automate.svg',
    category: 'microsoft',
    href: '/technologies/microsoft-power-platform',
  },
  // ── Certification ──
  {
    slug: 'meta-business',
    name: 'Meta Business Partner',
    asset: '/logos/partners/partner-meta-business.png',
    category: 'certification',
    href: 'https://www.facebook.com/business/partner-directory',
    external: true,
  },
  {
    slug: 'france-num',
    name: 'Activateur France Num',
    asset: '/logos/partners/partner-france-num.png',
    category: 'certification',
    href: 'https://www.francenum.gouv.fr',
    external: true,
  },
  // ── Outils / dev ──
  {
    slug: 'github',
    name: 'GitHub',
    asset: '/logos/partners/partner-github.svg',
    category: 'cloud',
    href: 'https://github.com',
    external: true,
  },
  {
    slug: 'claude-mark',
    name: 'Claude',
    asset: '/logos/partners/partner-claude-mark.png',
    category: 'ai',
    href: '/technologies/claude-models',
  },
];

/** Libellés bilingues des catégories (titres de groupe dans la grille). */
export const PARTNER_CATEGORY_LABELS: Record<
  PartnerCategory,
  { fr: string; en: string }
> = {
  ai: { fr: 'Intelligence artificielle', en: 'Artificial intelligence' },
  cloud: { fr: 'Cloud & infrastructure', en: 'Cloud & infrastructure' },
  data: { fr: 'Data & analytics', en: 'Data & analytics' },
  crm: { fr: 'CRM & marketing', en: 'CRM & marketing' },
  microsoft: { fr: 'Microsoft Power Platform', en: 'Microsoft Power Platform' },
  certification: { fr: 'Certifications', en: 'Certifications' },
};
