// src/data/eeat-proposals.ts
// Content pack PARTAGÉ pour la page de proposition des 10 sections bento éditoriales E-E-A-T
// (/preview/eeat-propositions). NON catalogué tant que Simon n'a pas choisi (cf demande 2026-06-27).
//
// HONNÊTETÉ (cf src/data/proof-points.ts) : Waimia = studio solo, 0 client réel, 0 cas mesuré.
// => AUCUN témoignage client inventé. Le bloc « avis/review » = ENGAGEMENTS/GARANTIES + note honnête.
//
// Sources réelles : src/content/authors/simon-beros.mdx, src/content/secteurs/*, src/content/blog/*,
// src/content/outils/*, src/content/services/*. Routes : /secteurs/<slug>, /ressources/blog/<slug>,
// /ressources/outils/<slug>, /services/<slug>, /equipe/simon-beros.

export interface EeatLink {
  label: string;
  href: string;
  /** petit libellé de catégorie (kicker), ex. « Secteur », « Article ». */
  kicker?: string;
  /** accroche courte optionnelle. */
  lead?: string;
}

export interface EeatMilestone {
  year: string;
  label: string;
}

export interface EeatPack {
  author: {
    name: string;
    role: string;
    location: string;
    profileHref: string;
    initials: string;
    /** une phrase de posture (extrait bio). */
    bio: string;
    /** signature courte pour un colophon / ours. */
    signature: string;
  };
  expertise: string[];
  milestones: EeatMilestone[];
  sectors: EeatLink[];
  articles: EeatLink[];
  tools: EeatLink[];
  services: EeatLink[];
  /** Bloc « avis » honnête : engagements d'offre, PAS de témoignage client. */
  commitments: { label: string; detail: string }[];
  /** Note d'honnêteté à afficher près du bloc avis/preuves. */
  honestyNote: string;
}

export const EEAT_PACK: EeatPack = {
  author: {
    name: 'Simon Beros',
    role: 'Fondateur · architecte systèmes IA pour PME',
    location: 'Montpellier, France',
    profileHref: '/equipe/simon-beros',
    initials: 'SB',
    bio: "Studio solo. Simon conçoit, câble et suit lui-même chaque mission : pas de junior qui découvre le sujet en même temps que vous, pas de pool de sous-traitants entre vous et le travail.",
    signature: 'Conçu, câblé et tenu en production par Simon Beros · Waimia, Montpellier.',
  },
  expertise: [
    'Systèmes IA pour PME B2B',
    'RevOps & acquisition automatisée',
    'Pilotage data temps réel',
    'Stack Anthropic / Claude',
    'Process Intelligence',
  ],
  milestones: [
    { year: '2024', label: 'Fondation de Waimia · Montpellier' },
    { year: 'Avant', label: 'VirtuoseWeb · systèmes web et IA pour PME B2B' },
    { year: '2026', label: 'Claude, Claude Code et MCP en production' },
  ],
  sectors: [
    { label: 'Bâtiment & artisans', href: '/secteurs/batiment', kicker: 'Secteur' },
    { label: 'E-commerce', href: '/secteurs/e-commerce', kicker: 'Secteur' },
    { label: 'Libéraux & indépendants', href: '/secteurs/liberal-independant', kicker: 'Secteur' },
    { label: 'Services B2B', href: '/secteurs/services-b2b', kicker: 'Secteur' },
    { label: 'Startup & éditeur logiciel', href: '/secteurs/startup-logiciel', kicker: 'Secteur' },
    { label: 'Thérapeutes & bien-être', href: '/secteurs/therapeutes', kicker: 'Secteur' },
  ],
  articles: [
    {
      label: 'SEO & GEO : être cité par les IA génératives',
      href: '/ressources/blog/seo-geo-etre-cite-par-les-ia-generatives',
      kicker: 'Article',
      lead: 'Baliser un site pour que Google et les moteurs génératifs citent votre marque.',
    },
    {
      label: "L'IA pour les PME en 2026",
      href: '/ressources/blog/essai-pillar-ia-pme-2026',
      kicker: 'Essai',
      lead: 'Le tour d\'horizon : où l\'IA crée vraiment de la valeur pour une PME.',
    },
    {
      label: 'Câbler son CRM en 10 jours',
      href: '/ressources/blog/cabler-son-crm-en-10-jours',
      kicker: 'Guide',
      lead: 'La méthode pour brancher un CRM utile, scoring compris, en deux semaines.',
    },
    {
      label: 'n8n vs Zapier en 2026',
      href: '/ressources/blog/avis-n8n-vs-zapier-2026',
      kicker: 'Comparatif',
      lead: 'Quel orchestrateur d\'automatisations selon votre stack et votre budget.',
    },
    {
      label: 'Automatiser les relances B2B sans SDR',
      href: '/ressources/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil',
      kicker: 'Guide',
      lead: 'Relancer chaque lead au bon moment sans recruter un commercial dédié.',
    },
  ],
  tools: [
    {
      label: 'Calculateur de ROI IA',
      href: '/ressources/outils/calculateur-roi-ia',
      kicker: 'Outil',
      lead: 'Estimez le retour d\'un site instrumenté sur votre acquisition, à partir de vos chiffres.',
    },
  ],
  services: [
    { label: 'Landing page & scoring', href: '/services/landing-page-scoring', kicker: 'Service' },
    { label: 'Content marketing intelligent', href: '/services/content-marketing-intelligent', kicker: 'Service' },
    { label: 'Agents IA', href: '/services/agents-ia', kicker: 'Service' },
    { label: 'Consultant IA Claude', href: '/services/consultant-ia-claude', kicker: 'Service' },
  ],
  commitments: [
    { label: 'Audit 5 jours', detail: 'Diagnostic du parcours, livrable chiffré avant tout engagement.' },
    { label: 'Prix fixe transparent', detail: 'Périmètre et budget connus avant de signer, pas de dérive.' },
    { label: 'Formation incluse', detail: 'Documentation et passation : votre équipe est autonome à la livraison.' },
    { label: 'Zéro captivité', detail: 'Code, balisage et docs transférés : vous gardez la stack.' },
  ],
  honestyNote: 'Studio solo · premiers cas clients en cours de rédaction.',
};
