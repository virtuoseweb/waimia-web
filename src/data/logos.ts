// Waimia · Store GLOBAL des logos de marquee (anti-duplication)
// Source de vérité des couples src/name répétés inline dans les MDX services
// (logo-marquee). Un consommateur passe `logoIds: ['claude', 'hubspot', …]` au
// lieu de recopier chaque { src, name_fr, name_en } → édite une fois ici, propage
// partout (GLOBAL). Le rendu (grayscale, marquee, alt) reste porté par LogoMarquee.
//
// Couverture : les 12 marques réelles utilisées par les bandeaux logo-marquee des
// 6 pages service (claude, openai, hubspot, salesforce, slack, notion, github, aws,
// google, microsoft, sap, meta). Étendre ici quand un nouveau logo de marquee apparaît.
//
// Assets : tous sous `/logos/partners/partner-*` (vrais logos de marque, cf
// src/data/partners.ts) : plus de placeholders `integration-*.svg`.

export interface LogoEntry {
  /** Chemin absolu de l'asset (sous /public). */
  src: string;
  /** Libellé affiché / alt (FR). */
  name_fr: string;
  /** Libellé affiché / alt (EN). */
  name_en: string;
  /** Lien optionnel (interne ou officiel). Jamais un 404. */
  href?: string;
}

export const LOGOS: Record<string, LogoEntry> = {
  claude: {
    src: '/logos/partners/partner-claude.png',
    name_fr: 'Claude · Anthropic',
    name_en: 'Claude · Anthropic',
  },
  openai: {
    src: '/logos/partners/partner-openai.png',
    name_fr: 'OpenAI',
    name_en: 'OpenAI',
  },
  hubspot: {
    src: '/logos/partners/partner-hubspot.png',
    name_fr: 'HubSpot',
    name_en: 'HubSpot',
  },
  salesforce: {
    src: '/logos/partners/partner-salesforce.png',
    name_fr: 'Salesforce',
    name_en: 'Salesforce',
  },
  slack: {
    src: '/logos/partners/partner-slack.svg',
    name_fr: 'Slack',
    name_en: 'Slack',
  },
  notion: {
    src: '/logos/partners/partner-notion.webp',
    name_fr: 'Notion',
    name_en: 'Notion',
  },
  github: {
    src: '/logos/partners/partner-github.svg',
    name_fr: 'GitHub',
    name_en: 'GitHub',
  },
  aws: {
    src: '/logos/partners/partner-aws.png',
    name_fr: 'AWS',
    name_en: 'AWS',
  },
  google: {
    src: '/logos/partners/partner-google.png',
    name_fr: 'Google',
    name_en: 'Google',
  },
  microsoft: {
    src: '/logos/partners/partner-microsoft.png',
    name_fr: 'Microsoft',
    name_en: 'Microsoft',
  },
  sap: {
    src: '/logos/partners/partner-sap.png',
    name_fr: 'SAP',
    name_en: 'SAP',
  },
  meta: {
    src: '/logos/partners/partner-meta-business.png',
    name_fr: 'Meta',
    name_en: 'Meta',
  },
};
