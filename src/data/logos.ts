// Waimia · Store GLOBAL des logos de marquee (anti-duplication)
// Source de vérité des couples src/name répétés inline dans les MDX services
// (logo-marquee). Un consommateur passe `logoIds: ['claude', 'hubspot', …]` au
// lieu de recopier chaque { src, name_fr, name_en } → édite une fois ici, propage
// partout (GLOBAL). Le rendu (grayscale, marquee, alt) reste porté par LogoMarquee.
//
// Couverture : les logos réellement utilisés dans les 2 MDX services
// (integrateur-claude.mdx, site-web-intelligent.mdx) + le minimum demandé (claude,
// github, hubspot). Étendre ici quand un nouveau logo de marquee apparaît.
//
// Assets : marques d'écosystème sous `/logos/integration-*.svg` ;
// les logos partenaires (claude, github, hubspot) réutilisent les assets
// `/logos/partners/partner-*` déjà présents (cf src/data/partners.ts).

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
  github: {
    src: '/logos/partners/partner-github.svg',
    name_fr: 'GitHub',
    name_en: 'GitHub',
  },
  hubspot: {
    src: '/logos/integration-hubspot.svg',
    name_fr: 'HubSpot',
    name_en: 'HubSpot',
  },
  salesforce: {
    src: '/logos/integration-salesforce.svg',
    name_fr: 'Salesforce',
    name_en: 'Salesforce',
  },
  pipedrive: {
    src: '/logos/integration-pipedrive.svg',
    name_fr: 'Pipedrive',
    name_en: 'Pipedrive',
  },
  slack: {
    src: '/logos/integration-slack.svg',
    name_fr: 'Slack',
    name_en: 'Slack',
  },
  notion: {
    src: '/logos/integration-notion.svg',
    name_fr: 'Notion',
    name_en: 'Notion',
  },
  postgres: {
    src: '/logos/integration-postgres.svg',
    name_fr: 'PostgreSQL',
    name_en: 'PostgreSQL',
  },
  gmail: {
    src: '/logos/integration-gmail.svg',
    name_fr: 'Gmail',
    name_en: 'Gmail',
  },
};
