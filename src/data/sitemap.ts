// Waimia · sitemap.ts
// Source de vérité du mega-menu, footer, trust badges, marquee, content homepage.
// Portage typé de handoff/parts/sitemap-data.jsx — types stricts pour DX.

import type { Lang } from '../lib/i18n';

export type BiText = { en: string; fr: string };

export type NavItem = {
  href: string;
  label: BiText;
  lead?: BiText;
  featured?: boolean;
};

export type NavColumn = {
  kicker: BiText;
  label: BiText;
  tint?: string;
  items: NavItem[];
};

export type FeaturedCard = {
  kicker: BiText;
  label: BiText;
  body: BiText;
  cta: BiText;
  href: string;
};

export type MegaMenu = {
  key: string;
  label: BiText;
  href: string;
  lead: BiText;
  cols: NavColumn[];
  featured?: FeaturedCard;
};

export type SimpleNav = { key: string; label: BiText; href: string; simple: true };

// ─── MEGA-MENU 1 · SOLUTIONS
export const MM_SOLUTIONS_NEW: MegaMenu = {
  key: 'solutions',
  label: { en: 'Solutions', fr: 'Solutions' },
  href: '/solutions',
  lead: {
    en: 'Five AI systems built around recurring SMB pain points: acquisition, customer relations, productivity, intelligence, operations.',
    fr: "Cinq systèmes IA qui adressent les douleurs récurrentes des PME : acquisition, relation client, productivité, pilotage, opérations.",
  },
  cols: [
    {
      kicker: { en: 'BY PROBLEM', fr: 'PAR PROBLÈME' },
      label: { en: 'Business use cases', fr: "Cas d'usage business" },
      items: [
        { href: '/solutions/acquisition-ia', label: { en: 'AI Acquisition', fr: 'Acquisition IA' }, lead: { en: 'More qualified leads, without hiring.', fr: 'Plus de leads qualifiés, sans recruter.' } },
        { href: '/solutions/crm-relances-ia', label: { en: 'CRM & AI follow-ups', fr: 'CRM & relances IA' }, lead: { en: 'A sales pipeline that never sleeps.', fr: 'Pipeline commercial qui ne dort jamais.' } },
        { href: '/solutions/contenu-seo-geo-ia', label: { en: 'SEO/GEO content with AI', fr: 'Contenu SEO / GEO IA' }, lead: { en: 'Content found by Google AND AI engines.', fr: 'Du contenu trouvé par Google ET les IA.' } },
        { href: '/solutions/productivite-ia', label: { en: 'AI Productivity', fr: 'Productivité IA' }, lead: { en: 'Your Excel and Office teams, augmented.', fr: 'Vos équipes Excel et Office, augmentées.' } },
        { href: '/solutions/support-client-ia', label: { en: 'AI Customer Support', fr: 'Support client IA' }, lead: { en: '24/7 answers, smart human escalation.', fr: 'Réponses 24/7, escalade humaine intelligente.' } },
      ],
    },
    {
      kicker: { en: 'BY SECTOR', fr: 'PAR SECTEUR' },
      label: { en: 'Adapted to your industry', fr: 'Adapté à votre métier' },
      items: [
        { href: '/secteurs', label: { en: 'All sectors →', fr: 'Tous les secteurs →' } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'CASE STUDIES', fr: 'ÉTUDES DE CAS' },
    label: { en: 'First cases in preparation', fr: 'Premiers cas en préparation' },
    body: {
      en: 'Pipeline reconnected, qualification automated, real-time visibility. We publish a case once the result is measured.',
      fr: 'Pipeline reconnecté, qualification automatisée, visibilité temps réel. On publie un cas une fois le résultat mesuré.',
    },
    cta: { en: 'Discuss your project →', fr: 'Parler de votre projet →' },
    href: '/cas',
  },
};

export const MM_SOLUTIONS: MegaMenu = MM_SOLUTIONS_NEW;

// ─── MEGA-MENU 2 · OFFRES
export const MM_OFFRES_NEW: MegaMenu = {
  key: 'offres',
  label: { en: 'Services', fr: 'Offres' },
  href: '/offres',
  lead: {
    en: 'Three systems for the business levers: a starter format to activate quickly, an enterprise format for larger ambitions.',
    fr: "Trois systèmes pour adresser les leviers business : un format starter pour activer rapidement, un format ETI quand l'ambition est plus forte.",
  },
  cols: [
    {
      kicker: { en: '01 · THE 3 PILLARS', fr: '01 · LES 3 PILIERS' },
      label: { en: 'Business systems', fr: 'Systèmes business' },
      tint: '#C94F2E',
      items: [
        { href: '/offres/growth-system-ia', label: { en: 'AI Growth System', fr: 'Growth System IA' }, lead: { en: 'Automated acquisition and conversion system. Site, CRM, follow-ups, dashboards: all connected.', fr: "Système d'acquisition et de conversion automatisé. Site, CRM, relances, tableaux : tout connecté." }, featured: true },
        { href: '/offres/growth-intelligence', label: { en: 'Growth Intelligence', fr: 'Growth Intelligence' }, lead: { en: 'Real-time intelligence and data clarity for faster decisions.', fr: 'Pilotage temps réel et lisibilité des données pour décider plus vite.' } },
        { href: '/offres/productivite-operationnelle-ia', label: { en: 'Operational AI', fr: 'Productivité Opérationnelle IA' }, lead: { en: 'Repetitive tasks automated, internal workflows streamlined.', fr: 'Tâches répétitives automatisées, workflows internes fluidifiés.' } },
        { href: '/services/site-web-intelligent', label: { en: 'AI website', fr: 'Site web IA' }, lead: { en: 'Astro + AI site · showcase + acquisition.', fr: 'Site Astro + IA · vitrine + acquisition.' } },
        { href: '/offres/revops', label: { en: 'RevOps Rebuild', fr: 'RevOps Rebuild' }, lead: { en: 'CRM + warehouse + billing reconciled · 10 wks.', fr: 'CRM + entrepôt + billing réconciliés · 10 sem.' } },
      ],
    },
    {
      kicker: { en: '02 · TIERS', fr: '02 · NIVEAUX' },
      label: { en: 'Activation & infrastructure', fr: 'Activation & infrastructure' },
      items: [
        { href: '/offres/activation-ia', label: { en: 'AI Activation · 1 week', fr: 'Activation IA · 1 semaine' }, lead: { en: 'Audit + team training. The fast-track entry point.', fr: "Audit + formation des équipes. La porte d'entrée pour activer rapidement." } },
        { href: '/offres/infrastructure-ia', label: { en: 'AI Infrastructure · Enterprise', fr: 'Infrastructure IA · ETI' }, lead: { en: 'Connected systems at scale, multi-team, multi-site.', fr: 'Systèmes connectés à grande échelle, multi-équipes, multi-sites.' } },
        { href: '/offres/application-ia-pme', label: { en: 'AI Application for SMBs', fr: 'Application IA pour PME' }, lead: { en: 'Dedicated app 8–12 wks. ETI/SMB.', fr: 'App dédiée 8–12 sem. ETI/PME.' } },
        { href: '/offres/conseil', label: { en: 'AI Consulting & audit', fr: 'Conseil & audit IA' }, lead: { en: '7 audit/roadmap/governance services.', fr: '7 services audit/feuille de route/gouvernance.' } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'FLAGSHIP SERVICE', fr: 'OFFRE PHARE' },
    label: { en: 'AI Growth System', fr: 'Growth System IA' },
    body: {
      en: 'An automated acquisition and conversion system. Site, CRM, follow-ups, dashboards, connected and AI-driven. €5–20k.',
      fr: "Un système d'acquisition et de conversion automatisé. Site, CRM, relances, tableaux, connectés et pilotés par l'IA. 5 à 20 k€.",
    },
    cta: { en: 'See the system →', fr: 'Découvrir le système →' },
    href: '/offres/growth-system-ia',
  },
};

export const MM_OFFRES: MegaMenu = MM_OFFRES_NEW;

// ─── MEGA-MENU 3 · CAS CLIENTS
export const MM_CASES_NEW: MegaMenu = {
  key: 'cas',
  label: { en: 'Case studies', fr: 'Cas clients' },
  href: '/cas',
  lead: {
    en: 'Pipelines reconnected, qualification automated, operations streamlined. ROI measured on your data, never invented.',
    fr: 'Pipelines reconnectés, qualifications automatisées, opérations fluidifiées. ROI mesuré sur vos données, jamais inventé.',
  },
  cols: [
    {
      kicker: { en: 'BY PAIN POINT', fr: 'PAR DOULEUR' },
      label: { en: 'Case studies', fr: 'Études de cas' },
      items: [
        { href: '/cas', label: { en: 'B2B acquisition', fr: 'Acquisition B2B' }, lead: { en: 'Pipeline reconnected · automated qualification & follow-ups.', fr: 'Pipeline reconnecté · qualification et relances automatisées.' }, featured: true },
        { href: '/cas', label: { en: 'Consulting & firms', fr: 'Conseil & cabinets' }, lead: { en: 'Proposals and follow-ups automated.', fr: 'Proposals et relances automatisés.' } },
        { href: '/cas', label: { en: 'Finance & management', fr: 'Finance & gestion' }, lead: { en: 'Monthly close streamlined, reporting wired.', fr: 'Clôture allégée, reporting câblé.' } },
        { href: '/cas', label: { en: 'Industry & SMEs', fr: 'Industrie & PME' }, lead: { en: 'Bottlenecks surfaced, action plan delivered.', fr: 'Goulots identifiés, plan d’action livré.' } },
      ],
    },
    {
      kicker: { en: 'BY SECTOR', fr: 'PAR SECTEUR' },
      label: { en: 'Similar profiles', fr: 'Profils similaires' },
      items: [
        { href: '/cas?secteur=services-b2b', label: { en: 'B2B Services', fr: 'Services B2B' } },
        { href: '/cas?secteur=industrie', label: { en: 'Industry', fr: 'Industrie' } },
        { href: '/cas?secteur=finance', label: { en: 'Finance & accounting', fr: 'Finance & compta' } },
        { href: '/cas', label: { en: 'See all cases →', fr: 'Voir tous les cas →' } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'CASE STUDIES', fr: 'ÉTUDES DE CAS' },
    label: { en: 'First cases in preparation', fr: 'Premiers cas en préparation' },
    body: { en: 'We publish a case once the result is measured and the client has agreed. No staged testimonials.', fr: 'On publie un cas une fois le résultat mesuré et l’accord du client obtenu. Pas de témoignage mis en scène.' },
    cta: { en: 'Discuss your project →', fr: 'Parler de votre projet →' },
    href: '/cas',
  },
};

// ─── MEGA-MENU 3 · TECHNOLOGIES
export const MM_TECH: MegaMenu = {
  key: 'technologies',
  label: { en: 'Technologies', fr: 'Technologies' },
  href: '/technologies',
  lead: {
    en: 'The stack we ship on. Anthropic-first · open-source when sovereignty demands it.',
    fr: "La stack qu'on déploie. Anthropic d'abord · open-source quand la souveraineté l'exige.",
  },
  cols: [
    {
      kicker: { en: 'THE CLAUDE ECOSYSTEM', fr: 'ÉCOSYSTÈME CLAUDE' },
      label: { en: 'Anthropic · primary', fr: 'Anthropic · premier partenaire' },
      tint: '#C94F2E',
      items: [
        { href: '/technologies/claude-models', label: { en: 'Claude models · Opus · Sonnet · Haiku', fr: 'Modèles Claude · Opus · Sonnet · Haiku' }, lead: { en: 'Opus 4.8 · Sonnet 4.6 · Haiku 4.5.', fr: 'Opus 4.8 · Sonnet 4.6 · Haiku 4.5.' } },
        { href: '/technologies/claude-code', label: { en: 'Claude Code & Managed Agents', fr: 'Claude Code & Managed Agents' } },
        { href: '/technologies/claude-surfaces', label: { en: 'Claude Cowork · Skills · MCP', fr: 'Claude Cowork · Skills · MCP' } },
      ],
    },
    {
      kicker: { en: 'OPEN SOURCE · SOVEREIGN', fr: 'OPEN SOURCE · SOUVERAIN' },
      label: { en: 'Self-hosted', fr: 'Self-hosted' },
      items: [
        { href: '/technologies', label: { en: 'VirtuoseOS · sovereign agent runtime', fr: 'VirtuoseOS · runtime souverain' }, lead: { en: 'Our open agent OS · self-hosted, audit-ready.', fr: "Notre OS d'agents · auto-hébergé, traçable." }, featured: true },
      ],
    },
    {
      kicker: { en: 'FRAMEWORKS · ORCHESTRATION', fr: 'FRAMEWORKS · ORCHESTRATION' },
      label: { en: 'Multi-agent & no-code', fr: 'Multi-agents & no-code' },
      items: [
        { href: '/technologies', label: { en: 'Technologies hub · the full stack', fr: 'Hub Technologies · la stack complète' }, lead: { en: 'Anthropic · open-source · orchestration.', fr: "Anthropic · open-source · orchestration." }, featured: true },
        { href: '/technologies/frameworks', label: { en: 'LangGraph · CrewAI · AutoGen', fr: 'LangGraph · CrewAI · AutoGen' } },
      ],
    },
  ],
};

// ─── MEGA-MENU 4 · RESSOURCES
export const MM_RESOURCES: MegaMenu = {
  key: 'ressources',
  label: { en: 'Resources', fr: 'Ressources' },
  href: '/ressources',
  lead: {
    en: 'Business insights, proof, and practical tools for SMBs adopting AI without theatre.',
    fr: 'Insights business, preuves et outils pratiques pour les PME qui activent l’IA sans théâtre.',
  },
  cols: [
    {
      kicker: { en: 'PROOF', fr: 'PREUVES' },
      label: { en: 'Cases & internal blueprint', fr: 'Cas & blueprint interne' },
      items: [
        { href: '/cas', label: { en: 'Case studies · in preparation', fr: 'Études de cas · en préparation' } },
        { href: '/ressources/cas/virtuoseos', label: { en: 'VirtuoseOS · blueprint case', fr: 'VirtuoseOS · cas blueprint' }, featured: true },
        { href: '/ressources/changelog', label: { en: 'Changelog · Claude versions', fr: 'Changelog · versions Claude' }, lead: { en: 'Anthropic product releases watch.', fr: 'Veille produit Anthropic releases.' } },
      ],
    },
    {
      kicker: { en: 'BUSINESS INSIGHTS', fr: 'INSIGHTS BUSINESS' },
      label: { en: 'SMB/SME applied AI', fr: 'IA appliquée PME/ETI' },
      items: [
        { href: '/ressources/cookbooks/claude-cowork-rollout', label: { en: 'Cookbook · Claude Cowork rollout', fr: 'Cookbook · Déploiement Claude Cowork' }, lead: { en: 'Roll out Claude in a team without losing the week.', fr: 'Déployer Claude dans une équipe sans perdre la semaine.' }, featured: true },
        { href: '/ressources/blog', label: { en: 'Blog · business insights', fr: 'Blog · insights business' } },
        { href: '/ressources/cookbooks', label: { en: 'Cookbooks & tutorials', fr: 'Cookbooks & tutoriels' }, lead: { en: 'Practical automation patterns for SMB teams.', fr: 'Patterns d’automatisation concrets pour équipes PME.' } },
        { href: '/ressources/livres-blancs', label: { en: 'White papers · in-depth', fr: 'Livres blancs · études' } },
      ],
    },
    {
      kicker: { en: 'DEEP READS', fr: 'LECTURES LONGUES' },
      label: { en: 'White papers & essays', fr: 'Livres blancs & essais' },
      tint: '#C94F2E',
      items: [
        { href: '/ressources/livres-blancs/ai-act-readiness', label: { en: 'White paper · AI Act Readiness', fr: "Livre blanc · Préparation à l'AI Act" }, lead: { en: 'The compliance dossier · downloadable.', fr: 'Le dossier de conformité · téléchargeable.' }, featured: true },
        { href: '/ressources/blog/brain-circuit', label: { en: 'Essay · Brain circuit', fr: 'Essai · Brain circuit' }, lead: { en: 'How operational AI rewires the company.', fr: "Comment l'IA opérationnelle recâble l'entreprise." } },
        { href: '/ressources/livres-blancs', label: { en: 'All white papers', fr: 'Tous les livres blancs' } },
        { href: '/ressources/veille-ia', label: { en: 'AI watch · weekly briefs', fr: 'Veille IA · synthèses hebdo' } },
        { href: '/technologies', label: { en: 'Technologies archive · the stack', fr: 'Archives technologies · la stack' }, lead: { en: 'Claude ecosystem + open-source + frameworks.', fr: "Écosystème Claude + open-source + frameworks." } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'WHITE PAPER', fr: 'LIVRE BLANC' },
    label: { en: 'AI Act Readiness Dossier', fr: "Dossier Préparation à l'AI Act" },
    body: { en: 'The complete compliance dossier to anticipate the AI Act before launching an operational AI project.', fr: "Le dossier de conformité complet pour anticiper l'AI Act avant de lancer un projet IA opérationnel." },
    cta: { en: 'Open the white paper →', fr: 'Ouvrir le livre blanc →' },
    href: '/ressources/livres-blancs/ai-act-readiness',
  },
};

// ─── MEGA-MENU 5 · AGENCE
export const MM_AGENCY_NEW: MegaMenu = {
  key: 'agence',
  label: { en: 'The Agency', fr: "L'Agence" },
  href: '/agence',
  lead: {
    en: 'A solo studio based in Montpellier. An anti-theatre method, with signed deliverables.',
    fr: 'Un studio solo basé à Montpellier. Une méthode anti-théâtre, des livrables signés.',
  },
  cols: [
    {
      kicker: { en: 'THE TEAM', fr: "L'ÉQUIPE" },
      label: { en: 'Who we are', fr: 'Qui nous sommes' },
      items: [
        { href: '/agence/about', label: { en: 'About Waimia', fr: 'À propos de Waimia' } },
        { href: '/agence/methode', label: { en: 'Our method · Process Intelligence', fr: 'Notre méthode · Process Intelligence' }, lead: { en: 'Audit, deployment, measurement, no PowerPoint.', fr: 'Audit, déploiement, mesure, pas de PowerPoint.' }, featured: true },
        { href: '/equipe/simon-beros', label: { en: 'Simon Beros · Founder CV', fr: 'Simon Beros · CV Founder' }, lead: { en: 'Agentic systems architecture.', fr: 'Architecture systèmes agentiques.' } },
      ],
    },
    {
      kicker: { en: 'CONTACT', fr: 'CONTACT' },
      label: { en: 'Talk to us', fr: 'Nous parler' },
      items: [
        { href: '/contact', label: { en: 'Contact us · 45 min', fr: 'Nous contacter · 45 min' }, lead: { en: 'Free scoping, honest audit, or nothing.', fr: 'Cadrage gratuit, audit honnête, ou rien.' } },
        { href: '/manifesto', label: { en: 'Manifesto', fr: 'Manifesto' }, lead: { en: 'Operational AI, not theatre.', fr: 'Une IA opérationnelle, pas du théâtre.' } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'LOCATION', fr: 'ANCRAGE' },
    label: { en: 'Montpellier · France', fr: 'Montpellier · France' },
    body: { en: 'A solo studio. One method. A direct contact, not a committee.', fr: 'Un studio solo. Une seule méthode. Interlocuteur direct, pas un comité.' },
    cta: { en: 'Discover the studio →', fr: 'Découvrir le studio →' },
    href: '/agence/about',
  },
};

// ─── PRIMARY NAV
// R3 : top-level réduit à 4 entrées + CTA. « Offres » a fusionné dans Solutions
// (cf src/data/mega-menu.ts). La nav servie lit MEGA_MENU ; ce tableau reste un
// miroir de cohérence (aucun consommateur direct aujourd'hui).
export const PRIMARY_NAV: Array<MegaMenu | SimpleNav> = [
  MM_SOLUTIONS_NEW,
  MM_CASES_NEW,
  MM_RESOURCES,
  MM_AGENCY_NEW,
];

// ─── FOOTER (5 colonnes)
export type FooterCol = {
  heading: BiText;
  shield?: boolean;
  items: Array<{ label: BiText; href: string }>;
};

export const FOOTER_COLS: FooterCol[] = [
  // Col 1 — L'Agence (R3 ; trust-center/careers/console/atlas retirés P0.2-D : pages démos/fictives supprimées)
  {
    heading: { en: 'The Agency', fr: "L'Agence" },
    items: [
      { href: '/agence/about', label: { en: 'About Waimia', fr: 'À propos' } },
      {
        href: '/agence/methode',
        label: {
          en: 'Our method · Process Intelligence',
          fr: 'Notre méthode · Process Intelligence',
        },
      },
      { href: '/manifesto', label: { en: 'Manifesto', fr: 'Manifesto' } },
      { href: '/contact', label: { en: 'Contact', fr: 'Nous contacter' } },
    ],
  },
  // Col 2 — Solutions
  {
    heading: { en: 'Solutions', fr: 'Solutions' },
    items: [
      {
        href: '/solutions/acquisition-ia',
        label: { en: 'AI Acquisition', fr: 'Acquisition IA' },
      },
      {
        href: '/solutions/crm-relances-ia',
        label: { en: 'CRM & AI follow-ups', fr: 'CRM & relances IA' },
      },
      {
        href: '/solutions/contenu-seo-geo-ia',
        label: { en: 'SEO/GEO content with AI', fr: 'Contenu SEO/GEO IA' },
      },
      {
        href: '/solutions/productivite-ia',
        label: { en: 'AI Productivity', fr: 'Productivité IA' },
      },
      {
        href: '/solutions/support-client-ia',
        label: { en: 'AI Customer Support', fr: 'Support client IA' },
      },
      { href: '/secteurs', label: { en: 'By sector →', fr: 'Par secteur →' } },
    ],
  },
  // Col 3 — Offres
  {
    heading: { en: 'Services', fr: 'Offres' },
    items: [
      {
        href: '/offres/growth-system-ia',
        label: { en: 'AI Growth System', fr: 'Growth System IA' },
      },
      {
        href: '/offres/growth-intelligence',
        label: { en: 'Growth Intelligence', fr: 'Growth Intelligence' },
      },
      {
        href: '/offres/productivite-operationnelle-ia',
        label: { en: 'Operational AI', fr: 'Productivité Opérationnelle IA' },
      },
      {
        href: '/offres/activation-ia',
        label: {
          en: 'AI Activation · 1 week',
          fr: 'Activation IA · 1 semaine',
        },
      },
      {
        href: '/offres/infrastructure-ia',
        label: {
          en: 'AI Infrastructure · Enterprise',
          fr: 'Infrastructure IA · ETI',
        },
      },
    ],
  },
  // Col 4 — Ressources (enrichie : ajout outils + newsletter + veille)
  {
    heading: { en: 'Resources', fr: 'Ressources' },
    items: [
      { href: '/cas', label: { en: 'Case studies', fr: 'Cas clients' } },
      {
        href: '/ressources/blog',
        label: { en: 'Blog', fr: 'Blog' },
      },
      {
        href: '/ressources/cookbooks',
        label: { en: 'Cookbooks · guides', fr: 'Cookbooks · guides' },
      },
      {
        href: '/ressources/livres-blancs',
        label: { en: 'White papers', fr: 'Livres blancs' },
      },
      {
        href: '/ressources/outils',
        label: { en: 'Free tools', fr: 'Outils gratuits' },
      },
      {
        href: '/ressources/veille-ia',
        label: { en: 'AI watch', fr: 'Veille IA' },
      },
      {
        href: '/ressources/#newsletter',
        label: { en: 'Newsletter', fr: 'Newsletter' },
      },
    ],
  },
  // Col 5 — Légal & Archive (trust-center retiré P0.2-D : pages légales réelles uniquement)
  {
    heading: { en: 'Legal', fr: 'Légal' },
    shield: true,
    items: [
      {
        href: '/politique-confidentialite',
        label: { en: 'Privacy policy', fr: 'Politique de confidentialité' },
      },
      {
        href: '/mentions-legales',
        label: { en: 'Legal notice', fr: 'Mentions légales' },
      },
      {
        href: '/cgv',
        label: { en: 'Terms of sale', fr: 'CGV' },
      },
      {
        href: '/plan-du-site',
        label: { en: 'Site map', fr: 'Plan du site' },
      },
    ],
  },
];

// ─── TRUST BADGES
export type TrustBadge = { k: string; label: BiText; kind: 'partner' | 'cert' | 'compliance' };
// P0.2-D · badges de certification/conformité non détenus retirés (risque légal :
// Claude Certified Architect, AI Act ready, RGPD, ISO 27001 alignée = claims non prouvés).
// Conservés : partenariats/labels publics vérifiables uniquement.
export const TRUST_BADGES: TrustBadge[] = [
  { k: 'FRANCENUM', kind: 'partner', label: { en: 'France Num · AI & digital expert', fr: 'Activateur France Num · expert IA' } },
];

// ─── CLIENT LOGOS (marquee)
// Honnêteté : pas de faux logos clients. On affiche les technologies réellement
// opérées (la marquee « social proof » dit la stack, pas des clients inventés).
export const CLIENT_LOGOS = [
  'Claude', 'Anthropic', 'HubSpot', 'Notion', 'Make', 'n8n',
  'Airtable', 'Stripe', 'Google Workspace', 'Microsoft 365', 'Slack', 'Zapier',
  'France Num', 'MCP', 'Vercel', 'Supabase', 'PostgreSQL', 'OpenAI',
] as const;

// ─── HOMEPAGE · core content
// Honnêteté : on affiche notre MÉTHODE (vérifiable) plutôt que des résultats
// clients moyens inventés. Pas de chiffres de pipeline ni de ROI fabriqués.
export const HERO_METRICS = [
  { k: '01', n: '5 jours', label: { en: 'to audit and pinpoint the lever', fr: 'pour auditer et cibler le levier' } },
  { k: '02', n: '4 sem.', label: { en: 'to a first workflow in production', fr: 'jusqu’au premier workflow en production' } },
  { k: '03', n: '1', label: { en: 'single point of contact, end to end', fr: 'interlocuteur unique, de bout en bout' } },
  { k: '04', n: 'Mesuré', label: { en: 'ROI measured on your data, never invented', fr: 'ROI mesuré sur vos données, jamais inventé' } },
];

export const PYRAMID_TIERS = [
  {
    n: 'I',
    tag: { en: 'ACTIVATION', fr: 'ACTIVATION' },
    label: { en: 'Fast activation', fr: 'Activation rapide' },
    lead: { en: 'One week to identify the lever, train the team, and ship the first workflow in production.', fr: "Une semaine pour identifier le levier, former l'équipe et livrer un premier workflow en production." },
    items: ['Audit process · 5j', 'Formation équipe · 1 sem', 'Gain rapide Excel'],
    href: '/offres#tier-1',
  },
  {
    n: 'II',
    tag: { en: 'PRODUCTIVITY', fr: 'PRODUCTIVITÉ' },
    label: { en: 'Operational productivity', fr: 'Productivité opérationnelle' },
    lead: { en: 'Remove recurring tasks and make internal workflows run without daily chasing.', fr: 'Supprimer les tâches récurrentes et fluidifier les workflows internes.' },
    items: ['Workflows métiers', 'Tâches répétitives', 'Support client'],
    href: '/offres#tier-2',
  },
  {
    n: 'III',
    tag: { en: 'GROWTH', fr: 'ACQUISITION' },
    label: { en: 'Acquisition & intelligence', fr: 'Acquisition & pilotage' },
    lead: { en: 'Connect site, CRM, follow-ups, content, and business visibility into one growth system.', fr: 'Connecter site, CRM, relances, contenu et pilotage dans un même système.' },
    items: ["Système d'acquisition", 'Pipeline commercial', 'Tableaux de pilotage', 'Contenu SEO/GEO'],
    href: '/offres#tier-3',
  },
  {
    n: 'IV',
    tag: { en: 'ENTERPRISE', fr: 'ETI' },
    label: { en: 'Enterprise infrastructure', fr: 'Infrastructure ETI' },
    lead: { en: 'Connected systems for larger teams, stricter governance, and multi-site operations.', fr: 'Systèmes connectés pour équipes élargies, gouvernance stricte et opérations multi-sites.' },
    items: ['Architecture connectée', 'Sécurité & gouvernance', 'Multi-équipes & multi-sites'],
    href: '/offres#tier-4',
  },
];

export const DEPARTMENTS_GRID = [
  { slug: 'acquisition-ia', label: { en: 'Acquisition', fr: 'Acquisition' }, tag: { en: 'Ads · landing · GEO', fr: 'Ads · landing · GEO' } },
  { slug: 'crm-relances-ia', label: { en: 'CRM & Follow-ups', fr: 'CRM & Relances' }, tag: { en: 'Pipeline · qualification · nurturing', fr: 'Pipeline · qualification · nurturing' } },
  { slug: 'contenu-seo-geo-ia', label: { en: 'SEO/GEO Content', fr: 'Contenu SEO/GEO' }, tag: { en: 'Articles · landings · AI indexing', fr: 'Articles · landing · indexation IA' } },
  { slug: 'site-web-ia-pme', label: { en: 'AI-first Website', fr: 'Site IA-first' }, tag: { en: 'Landing · tunnel · CMS', fr: 'Landing · tunnel · CMS' } },
  { slug: 'productivite-ia', label: { en: 'Productivity', fr: 'Productivité' }, tag: { en: 'Excel · Office · agents', fr: 'Excel · Office · agents' } },
  { slug: 'support-client-ia', label: { en: 'Customer Support', fr: 'Support client' }, tag: { en: 'Triage · resolution · escalation', fr: 'Triage · résolution · escalade' } },
];

// Honnêteté (vague 2) : studio solo, 0 client réel, 0 cas livré. Ce ne sont donc PAS
// des dossiers/preuves de livraisons clientes mais les DOMAINES D'INTERVENTION où Waimia
// câble des systèmes, avec le type d'engagement (durée de déploiement, stack). Aucun nom de
// client, aucun résultat client chiffré. `impact` = ce que le chantier VISE à câbler, pas un
// résultat mesuré existant. Les liens pointent vers /cas (premiers cas en cours de rédaction).
// Featured = le blueprint interne VirtuoseOS (réel, projet propre).
export const CASE_FEED = [
  { slug: '', client: 'Acquisition B2B', sector: { en: 'B2B SaaS', fr: 'SaaS B2B' }, duration: '10 sem', stack: 'Claude · HubSpot · dbt', impact: { en: 'Reconnect the pipeline, automate qualification', fr: 'Reconnecter le pipeline, automatiser la qualification' } },
  { slug: '', client: 'Conseil & cabinets', sector: { en: 'Strategy consulting', fr: 'Conseil en stratégie' }, duration: '8 sem', stack: 'Claude · Notion MCP', impact: { en: 'Automate proposals and follow-ups', fr: 'Automatiser proposals et relances' } },
  { slug: '', client: 'Gestion & finance', sector: { en: 'Asset management', fr: "Gestion d'actifs" }, duration: '5 j', stack: 'Claude · Notion MCP · Excel', impact: { en: 'Streamline the monthly close, wire reporting', fr: 'Alléger la clôture, câbler le reporting' } },
  { slug: '', client: 'Industrie & PME', sector: { en: 'Manufacturing', fr: 'Industrie manufacturière' }, duration: '2 j', stack: 'Claude · revue documentaire · entretiens', impact: { en: 'Surface bottlenecks, deliver an action plan', fr: 'Identifier les goulots, livrer un plan d’action' } },
  { slug: '', client: 'VirtuoseOS', sector: { en: 'Internal blueprint', fr: 'Blueprint interne' }, duration: 'ongoing', stack: 'Claude · open-source · multi-agent', impact: { en: 'The operating system under every delivery', fr: 'Le système opérationnel sous chaque livraison' }, featured: true },
];

export const FIELD_NOTES = [
  { date: '04.2026', tag: { en: 'FIELD NOTE', fr: 'NOTE' },    text: { en: 'Consulting firms: where the 8-week proposal-automation lever sits.',              fr: 'Cabinets de conseil : où se trouve le levier d’automatisation des proposals.' } },
  { date: '04.2026', tag: { en: 'METHOD',    fr: 'MÉTHODE' },  text: { en: 'Multi-workspace kernels, French locale, replayable audit trail.',                fr: 'Noyaux multi-workspace, locale FR, audit trail re-rejouable.' } },
  { date: '03.2026', tag: { en: 'FIELD NOTE', fr: 'NOTE' },    text: { en: 'HubSpot + Claude: the unglamorous pattern that actually ships.',                  fr: 'HubSpot + Claude : le pattern discret qui livre vraiment.' } },
  { date: '03.2026', tag: { en: 'ESSAY',      fr: 'ESSAI' },   text: { en: 'Against the brain-circuit aesthetic.',                                            fr: "Contre l'esthétique cerveau-circuit." } },
  { date: '02.2026', tag: { en: 'METHOD',    fr: 'MÉTHODE' },  text: { en: 'RevOps rebuild: reconnect site, CRM, follow-ups into one pipeline.',             fr: 'Refonte RevOps : reconnecter site, CRM et relances dans un seul pipeline.' } },
];

// ─── CAPABILITY MAP · 8 catégories du scope Waimia complet · home strip
// Conçu pour la home Section CapabilityStrip · expose le scope opérationnel
// au-delà du seul "Excel + HubSpot + Outlook" — sans dénaturer les 6 services.
// Chaque catégorie pointe vers une page d'offre/solution existante.
export type CapabilityCategory = {
  k: string;
  kicker: BiText;
  label: BiText;
  lead: BiText;
  items: BiText[];
  href: string;
};

export const CAPABILITY_MAP: CapabilityCategory[] = [
  {
    k: '01',
    kicker: { en: 'ACQUISITION', fr: 'ACQUISITION' },
    label: { en: 'Ads & lead systems', fr: "Systèmes d'acquisition" },
    lead: { en: 'Connected campaigns, automated qualification, measured pipeline.', fr: 'Campagnes connectées, qualification automatisée, pipeline mesuré.' },
    items: [
      { en: 'Google Ads · Meta · LinkedIn', fr: 'Google Ads · Meta · LinkedIn' },
      { en: 'Landing pages & tunnels', fr: 'Landings & tunnels' },
      { en: 'Lead qualification IA', fr: 'Qualification IA des leads' },
      { en: 'Pipeline reporting', fr: 'Reporting pipeline' },
    ],
    href: '/solutions/acquisition-ia',
  },
  {
    k: '02',
    kicker: { en: 'CONTENT', fr: 'CONTENU' },
    label: { en: 'Editorial & SEO/GEO', fr: 'Contenu & SEO/GEO' },
    lead: { en: 'Briefs, calendars, articles, repurposing, searched by Google AND AI engines.', fr: "Briefs, calendrier, articles, repurposing : trouvé par Google ET les IA." },
    items: [
      { en: 'Strategy & briefs', fr: 'Stratégie & briefs' },
      { en: 'Articles · posts · landing', fr: 'Articles · posts · landing' },
      { en: 'SEO / GEO indexing', fr: 'SEO / GEO indexation' },
      { en: 'Content repurposing', fr: 'Repurposing multi-canal' },
    ],
    href: '/solutions/contenu-seo-geo-ia',
  },
  {
    k: '03',
    kicker: { en: 'WEB & CMS', fr: 'WEB & CMS' },
    label: { en: 'AI-first websites', fr: 'Sites IA-first' },
    lead: { en: 'Living sites: landing, tunnels, evolving pages, Git-based or connected CMS.', fr: 'Sites vivants : landing, tunnels, pages évolutives, CMS Git-based ou connecté.' },
    items: [
      { en: 'AI-first websites', fr: 'Sites IA-first' },
      { en: 'Landing & tunnels', fr: 'Landing & tunnels' },
      { en: 'Git-based CMS', fr: 'CMS Git-based' },
      { en: 'Connected existing CMS', fr: 'CMS existant connecté' },
    ],
    href: '/solutions/site-web-ia-pme',
  },
  {
    k: '04',
    kicker: { en: 'CRM & SALES', fr: 'CRM & SALES' },
    label: { en: 'Augmented CRM & follow-ups', fr: 'CRM augmenté & relances' },
    lead: { en: 'A CRM that qualifies, follows up and reports, without your team chasing it.', fr: 'Un CRM qui qualifie, relance et reporte, sans relance manuelle.' },
    items: [
      { en: 'HubSpot · Salesforce · Pipedrive', fr: 'HubSpot · Salesforce · Pipedrive' },
      { en: 'Automated follow-ups', fr: 'Relances automatisées' },
      { en: 'Lead scoring & enrichment', fr: 'Scoring & enrichissement' },
      { en: 'Outlook / Gmail integration', fr: 'Intégration Outlook / Gmail' },
    ],
    href: '/solutions/crm-relances-ia',
  },
  {
    k: '05',
    kicker: { en: 'DATA & INSIGHTS', fr: 'DATA & INSIGHTS' },
    label: { en: 'Analytics & decisions', fr: 'Analytics & décisions' },
    lead: { en: 'GA4, Search Console, SEO tools, turned into continuous actions.', fr: 'GA4, Search Console, SEO tools, transformés en actions continues.' },
    items: [
      { en: 'GA4 · Search Console', fr: 'GA4 · Search Console' },
      { en: 'Real-time dashboards', fr: 'Dashboards temps réel' },
      { en: 'SEO opportunity detection', fr: 'Détection d’opportunités SEO' },
      { en: 'Automated reporting', fr: 'Reporting automatisé' },
    ],
    href: '/offres/growth-intelligence',
  },
  {
    k: '06',
    kicker: { en: 'AUTOMATION & AGENTS', fr: 'AUTOMATION & AGENTS' },
    label: { en: 'Workflows & AI agents', fr: 'Workflows & agents IA' },
    lead: { en: 'Repetitive work removed. Marketing and sales agents that communicate, decide, deliver.', fr: 'Tâches répétitives supprimées. Agents marketing & sales qui communiquent, décident, livrent.' },
    items: [
      { en: 'Internal workflows', fr: 'Workflows internes' },
      { en: 'Marketing & sales agents', fr: 'Agents marketing & sales' },
      { en: 'Excel / Office productivity', fr: 'Productivité Excel / Office' },
      { en: 'Multi-agent orchestration', fr: 'Orchestration multi-agents' },
    ],
    href: '/solutions/productivite-ia',
  },
  {
    k: '07',
    kicker: { en: 'BRAND SYSTEM', fr: 'BRAND SYSTEM' },
    label: { en: 'Design system & assets', fr: 'Design system & supports' },
    lead: { en: 'A consistent brand across site, decks, PDF, posts, ads and sales material.', fr: 'Une marque cohérente sur site, decks, PDF, posts, ads et supports sales.' },
    items: [
      { en: 'Design system & tokens', fr: 'Design system & tokens' },
      { en: 'Brand voice & guidelines', fr: 'Charte & ton de marque' },
      { en: 'PowerPoint · PDF · Posts', fr: 'PowerPoint · PDF · Posts' },
      { en: 'Templates & production agents', fr: 'Templates & agents de production' },
    ],
    href: '/agence/design-system',
  },
  {
    k: '08',
    kicker: { en: 'GOVERNANCE', fr: 'GOUVERNANCE' },
    label: { en: 'AI Act · GDPR · Security', fr: 'AI Act · RGPD · Sécurité' },
    lead: { en: 'Classified risk, audit logs, sovereign architecture when needed.', fr: "Risque classifié, journaux d'audit, architecture souveraine si besoin." },
    items: [
      { en: 'AI Act classification', fr: 'Classification AI Act' },
      { en: 'GDPR · RGPD · LPD', fr: 'RGPD · LPD' },
      { en: 'Audit logs & data sovereignty', fr: 'Journaux & souveraineté données' },
    ],
    href: '/offres/conseil',
  },
];

// ─── 6 services taught by doing — Acte II
export const SIX_SERVICES = [
  {
    k: '01',
    metric: { en: '30 min', fr: '30 min' },
    label: { en: '30-min diagnostic', fr: 'Diagnostic 30 min' },
    body: { en: 'We identify the business lever before the technology.', fr: 'On identifie le levier métier avant la techno.' },
    connectors: { en: 'Audit · Cartography · Stack mapping', fr: 'Audit · Cartographie · Stack mapping' },
  },
  {
    k: '02',
    metric: { en: '+€840K pipe', fr: '+840 K€ pipe' },
    label: { en: 'Acquisition system', fr: "Système d'acquisition" },
    body: { en: 'Pipeline reconnected, qualification automated.', fr: 'Pipeline reconnecté, qualification automatisée.' },
    connectors: { en: 'Google Ads · Meta · LinkedIn · GA4 · Landing', fr: 'Google Ads · Meta · LinkedIn · GA4 · Landing' },
  },
  {
    k: '03',
    metric: { en: '−35% manual', fr: '−35% manuel' },
    label: { en: 'Augmented CRM', fr: 'CRM augmenté' },
    body: { en: 'The CRM that follows up, qualifies and alerts, without you touching it.', fr: 'Le CRM qui relance, qualifie et alerte, sans que vous touchiez rien.' },
    connectors: { en: 'HubSpot · Salesforce · Pipedrive · Outlook', fr: 'HubSpot · Salesforce · Pipedrive · Outlook' },
  },
  {
    k: '04',
    metric: { en: '2 min decision', fr: 'Décide en 2 min' },
    label: { en: 'Data clarity', fr: 'Lisibilité des données' },
    body: { en: 'Real-time dashboards: decide in 2 minutes, not a meeting.', fr: 'Tableaux de bord temps réel : décidez en 2 minutes, pas en réunion.' },
    connectors: { en: 'GA4 · Search Console · SEO tools · Dashboards', fr: 'GA4 · Search Console · SEO tools · Dashboards' },
  },
  {
    k: '05',
    metric: { en: '+12h / week', fr: '+12h / sem' },
    label: { en: 'Repetitive tasks removed', fr: 'Tâches répétitives éliminées' },
    body: { en: 'Workflows that run without you.', fr: 'Workflows qui tournent sans vous.' },
    connectors: { en: 'Workflows · AI agents · Excel · Office', fr: 'Workflows · Agents IA · Excel · Office' },
  },
  {
    k: '06',
    metric: { en: 'Sovereign', fr: 'Souverain' },
    label: { en: 'Enterprise custom build', fr: 'Sur-mesure ETI' },
    body: { en: 'Sovereign architecture, when the market stack hits your perimeter limits.', fr: "Architecture souveraine, quand les outils du marché butent sur votre périmètre." },
    connectors: { en: 'Trust Center · Design System · Governance · VirtuoseOS', fr: 'Trust Center · Design System · Governance · VirtuoseOS' },
  },
];

// ─── 4 FIG rows — Acte I · Why AI stalls
export const WHY_AI_STALLS = [
  { fig: 'FIG 1.1', text: { en: 'A growing SMB rarely lacks tools. It lacks continuity between the CRM, inboxes, spreadsheets, and the site.', fr: 'Une PME en croissance manque rarement d’outils. Elle manque de continuité entre CRM, boîtes mail, tableurs et site.' } },
  { fig: 'FIG 1.2', text: { en: 'AI without structured business data turns every answer into an expensive guess.', fr: 'L’IA sans données métier structurées transforme chaque réponse en pari coûteux.' } },
  { fig: 'FIG 1.3', text: { en: 'Projects that reach production in less than 8 weeks keep momentum. After that, adoption usually becomes the real risk.', fr: 'Les projets livrés en moins de 8 semaines gardent l’élan. Après, le vrai risque devient l’adoption.' } },
  { fig: 'FIG 1.4', text: { en: "The rebuild reflex is usually wrong. The money leaks in handoffs: lead to CRM, CRM to sales, sales to delivery.", fr: 'Le réflexe de tout refaire trompe souvent. L’argent fuit dans les passations : lead vers CRM, CRM vers vente, vente vers livraison.' } },
];

// ─── i18n helper · tire la chaîne dans la langue active
export function pick(t: BiText, lang: Lang): string {
  return t[lang];
}
