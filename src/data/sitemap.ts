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
  href: '/services',
  lead: {
    en: 'Five AI systems built around recurring SMB pain points: acquisition, customer relations, productivity, intelligence, operations.',
    fr: "Cinq systèmes IA qui adressent les douleurs récurrentes des PME : acquisition, relation client, productivité, pilotage, opérations.",
  },
  cols: [
    {
      kicker: { en: 'BY PROBLEM', fr: 'PAR PROBLÈME' },
      label: { en: 'Business use cases', fr: "Cas d'usage business" },
      // SEO état final (§0ter) : pages /solutions/* supprimées → services réels + ancres — tous les cas dirigés vers /cas-clients.
      items: [
        { href: '/services/seo-geo-contenu', label: { en: 'SEO, GEO and content', fr: 'SEO, GEO et contenu' }, lead: { en: 'Editorial line + SEO/GEO found by Google AND AI engines.', fr: 'Ligne éditoriale + SEO/GEO trouvés par Google ET les IA.' } },
        { href: '/services/site-web-ia', label: { en: 'Smart website', fr: 'Site web intelligent' }, lead: { en: 'Astro + AI site · showcase + acquisition.', fr: 'Site Astro + IA · vitrine + acquisition.' } },
        { href: '/services/landing-pages-tunnels', label: { en: 'Landing pages and funnels', fr: 'Landing pages et tunnels' }, lead: { en: 'From first click to signature, frictionless.', fr: 'Du premier clic à la signature, sans friction.' } },
      ],
    },
    {
      kicker: { en: 'BY NEED', fr: 'PAR BESOIN' },
      label: { en: 'Steer & operate', fr: 'Piloter & opérer' },
      items: [
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
    href: '/cas-clients',
  },
};

export const MM_SOLUTIONS: MegaMenu = MM_SOLUTIONS_NEW;

// ─── MEGA-MENU 2 · OFFRES
export const MM_OFFRES_NEW: MegaMenu = {
  key: 'offres',
  label: { en: 'Services', fr: 'Offres' },
  href: '/services',
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
        { href: '/services/systeme-acquisition', label: { en: 'Acquisition system', fr: "Système d'acquisition" }, lead: { en: 'Site, visibility, landing pages: the infrastructure that captures and qualifies, AI-driven.', fr: "Site, visibilité, landing pages : l'infrastructure qui capte et qualifie, pilotée par l'IA." }, featured: true },
        { href: '/services/site-web-ia', label: { en: 'AI website', fr: 'Site web IA' }, lead: { en: 'Astro + AI site · showcase + acquisition.', fr: 'Site Astro + IA · vitrine + acquisition.' } },
        { href: '/audit-ia-pme', label: { en: 'AI Maturity Audit', fr: 'Audit Maturité IA' }, lead: { en: 'Process mapping, priority AI levers, costed roadmap.', fr: 'Cartographie des process, leviers IA prioritaires, feuille de route chiffrée.' } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'FLAGSHIP SERVICE', fr: 'OFFRE PHARE' },
    label: { en: 'Acquisition system', fr: "Système d'acquisition" },
    body: {
      en: 'The acquisition infrastructure: website, visibility, landing pages, connected and AI-driven. Prospecting, CRM and follow-ups live in the sales system.',
      fr: "L'infrastructure d'acquisition : site, visibilité, landing pages, connectés et pilotés par l'IA. Prospection, CRM et relances vivent dans le système commercial.",
    },
    cta: { en: 'See the system →', fr: 'Découvrir le système →' },
    href: '/services/systeme-acquisition',
  },
};

export const MM_OFFRES: MegaMenu = MM_OFFRES_NEW;

// ─── MEGA-MENU 3 · CAS CLIENTS
export const MM_CASES_NEW: MegaMenu = {
  key: 'cas',
  label: { en: 'Case studies', fr: 'Cas clients' },
  href: '/cas-clients',
  lead: {
    en: 'Pipelines reconnected, qualification automated, operations streamlined. ROI measured on your data, never invented.',
    fr: 'Pipelines reconnectés, qualifications automatisées, opérations fluidifiées. ROI mesuré sur vos données, jamais inventé.',
  },
  cols: [
    {
      kicker: { en: 'BY PAIN POINT', fr: 'PAR DOULEUR' },
      label: { en: 'Case studies', fr: 'Études de cas' },
      items: [
        { href: '/cas-clients', label: { en: 'B2B acquisition', fr: 'Acquisition B2B' }, lead: { en: 'Pipeline reconnected · automated qualification & follow-ups.', fr: 'Pipeline reconnecté · qualification et relances automatisées.' }, featured: true },
        { href: '/cas-clients', label: { en: 'Consulting & firms', fr: 'Conseil & cabinets' }, lead: { en: 'Proposals and follow-ups automated.', fr: 'Proposals et relances automatisés.' } },
        { href: '/cas-clients', label: { en: 'Finance & management', fr: 'Finance & gestion' }, lead: { en: 'Monthly close streamlined, reporting wired.', fr: 'Clôture allégée, reporting câblé.' } },
        { href: '/cas-clients', label: { en: 'Industry & SMEs', fr: 'Industrie & PME' }, lead: { en: 'Bottlenecks surfaced, action plan delivered.', fr: 'Goulots identifiés, plan d’action livré.' } },
      ],
    },
    {
      kicker: { en: 'BY SECTOR', fr: 'PAR SECTEUR' },
      label: { en: 'Similar profiles', fr: 'Profils similaires' },
      items: [
        { href: '/cas-clients?secteur=services-b2b', label: { en: 'B2B Services', fr: 'Services B2B' } },
        { href: '/cas-clients?secteur=industrie', label: { en: 'Industry', fr: 'Industrie' } },
        { href: '/cas-clients?secteur=finance', label: { en: 'Finance & accounting', fr: 'Finance & compta' } },
        { href: '/cas-clients', label: { en: 'See all cases →', fr: 'Voir tous les cas →' } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'CASE STUDIES', fr: 'ÉTUDES DE CAS' },
    label: { en: 'First cases in preparation', fr: 'Premiers cas en préparation' },
    body: { en: 'We publish a case once the result is measured and the client has agreed. No staged testimonials.', fr: 'On publie un cas une fois le résultat mesuré et l’accord du client obtenu. Pas de témoignage mis en scène.' },
    cta: { en: 'Discuss your project →', fr: 'Parler de votre projet →' },
    href: '/cas-clients',
  },
};

// ─── MEGA-MENU 3 · TECHNOLOGIES
export const MM_TECH: MegaMenu = {
  key: 'expertise-claude',
  label: { en: 'Claude expertise', fr: 'Expertise Claude' },
  href: '/expertise-claude',
  lead: {
    en: 'Anthropic-first for demanding enterprise use. One Claude model per task profile.',
    fr: "Anthropic d'abord pour les usages enterprise exigeants. Un modèle Claude par profil de tâche.",
  },
  cols: [
    {
      kicker: { en: 'THE CLAUDE ECOSYSTEM', fr: 'ÉCOSYSTÈME CLAUDE' },
      label: { en: 'Anthropic · primary', fr: 'Anthropic · modèle principal' },
      tint: '#C94F2E',
      items: [
        { href: '/expertise-claude', label: { en: 'Claude expertise · Opus · Sonnet · Haiku', fr: 'Expertise Claude · Opus · Sonnet · Haiku' }, lead: { en: 'Opus 4.8 · Sonnet 4.6 · Haiku 4.5 · Code.', fr: 'Opus 4.8 · Sonnet 4.6 · Haiku 4.5 · Code.' }, featured: true },
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
      label: { en: 'Cases & proof', fr: 'Cas & preuve' },
      items: [
        { href: '/cas-clients', label: { en: 'Case studies · in preparation', fr: 'Études de cas · en préparation' } },
      ],
    },
    {
      kicker: { en: 'BUSINESS INSIGHTS', fr: 'INSIGHTS BUSINESS' },
      label: { en: 'SMB/SME applied AI', fr: 'IA appliquée PME/ETI' },
      items: [
        { href: '/blog', label: { en: 'Blog · business insights', fr: 'Blog · insights business' }, featured: true },
        { href: '/blog/brain-circuit', label: { en: 'Essay · Brain circuit', fr: 'Essai · Brain circuit' }, lead: { en: 'How operational AI rewires the company.', fr: "Comment l'IA opérationnelle recâble l'entreprise." } },
      ],
    },
    {
      kicker: { en: 'TOOLS', fr: 'OUTILS' },
      label: { en: 'Free calculators', fr: 'Calculateurs gratuits' },
      tint: '#C94F2E',
      items: [
        { href: '/ressources/outils', label: { en: 'Tools catalog', fr: 'Catalogue outils' }, lead: { en: 'ROI, TCO, AI Act compliance. No form, no funnel.', fr: 'ROI, TCO, conformité AI Act. Sans formulaire, sans funnel.' }, featured: true },
        { href: '/expertise-claude', label: { en: 'Claude expertise · the stack', fr: 'Expertise Claude · la stack' }, lead: { en: 'Claude ecosystem positioning.', fr: "Positionnement écosystème Claude." } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'BLOG', fr: 'BLOG' },
    label: { en: 'Business insights for B2B SMBs', fr: 'Insights business pour PME B2B' },
    body: { en: 'Signed essays and notes on AI-native websites, GEO and acquisition. Published when we genuinely have something to say.', fr: "Essais et notes signés sur les sites IA-native, le GEO et l'acquisition. Publiés quand on a vraiment quelque chose à dire." },
    cta: { en: 'Read the blog →', fr: 'Lire le blog →' },
    href: '/blog',
  },
};

// ─── MEGA-MENU 5 · AGENCE
export const MM_AGENCY_NEW: MegaMenu = {
  key: 'agence',
  label: { en: 'The Agency', fr: "L'Agence" },
  href: '/agence',
  lead: {
    en: 'A solo studio based in Bordeaux, working remotely. An anti-theatre method, with signed deliverables.',
    fr: 'Un studio solo basé à Bordeaux, missions à distance. Une méthode anti-théâtre, des livrables signés.',
  },
  cols: [
    {
      kicker: { en: 'THE TEAM', fr: "L'ÉQUIPE" },
      label: { en: 'Who we are', fr: 'Qui nous sommes' },
      items: [
        { href: '/agence', label: { en: 'About Waimia', fr: 'À propos de Waimia' } },
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
    label: { en: 'Bordeaux · France', fr: 'Bordeaux · France' },
    body: { en: 'A solo studio. One method. A direct contact, not a committee.', fr: 'Un studio solo. Une seule méthode. Interlocuteur direct, pas un comité.' },
    cta: { en: 'Discover the studio →', fr: 'Découvrir le studio →' },
    href: '/agence',
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
  // Col 1 — L'Agence (R3 ; trust-center/careers/console/atlas retirés P0.2-D).
  {
    heading: { en: 'The Agency', fr: "L'Agence" },
    items: [
      { href: '/agence', label: { en: 'About Waimia', fr: 'À propos' } },
      { href: '/equipe', label: { en: 'The team', fr: "L'équipe" } },
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
  // Col 2 — Solutions (archi v7 : 2 offres réelles = Site Web Intelligent +
  // Intégration Claude, matérialisées en pages service. Piliers Acquérir/Piloter/
  // Opérer retirés du footer — neutralisés noindex, strat 10 §3.5/§4 + 11 §2).
  {
    heading: { en: 'Offers & services', fr: 'Offres & services' },
    items: [
      {
        href: '/services/systeme-acquisition',
        label: { en: 'Acquisition system', fr: 'Système d\'acquisition' },
      },
      {
        href: '/services/systeme-commercial',
        label: { en: 'Sales system', fr: 'Système commercial' },
      },
      {
        href: '/services/prospection-automatisee',
        label: { en: 'Automated prospecting', fr: 'Prospection automatisée' },
      },
      {
        href: '/services/site-web-ia',
        label: { en: 'Smart website', fr: 'Site web intelligent' },
      },
      {
        href: '/services/integration-claude',
        label: { en: 'Claude integration', fr: 'Intégration Claude' },
      },
      {
        href: '/services/automatisations',
        label: { en: 'Automations', fr: 'Automatisations' },
      },
      {
        href: '/services/agents-ia',
        label: { en: 'AI agents', fr: 'Agents IA' },
      },
      {
        href: '/services/applications-internes',
        label: { en: 'Business applications', fr: 'Applications métier' },
      },
      {
        href: '/services/seo-geo-contenu',
        label: { en: 'SEO, GEO and content', fr: 'SEO, GEO et contenu' },
      },
      {
        href: '/services/landing-pages-tunnels',
        label: { en: 'Landing pages and funnels', fr: 'Landing pages et tunnels' },
      },
    ],
  },
  // Col 3 — Audits & diagnostics (footer cible strat 10 §4 : 2 audits transactionnels
  // + 2 diagnostics + réserver un audit → /audit-ia-pme, pivot IA 2026-10).
  {
    heading: { en: 'Audits & diagnostics', fr: 'Audits & diagnostics' },
    items: [
      {
        href: '/audit-ia-pme',
        label: { en: 'AI audit for SMBs', fr: 'Audit IA PME' },
      },
      {
        href: '/audit-site-web-intelligent',
        label: { en: 'Smart website audit', fr: 'Audit Site Web Intelligent' },
      },
      {
        href: '/ressources/diagnostics/maturite-ia',
        label: { en: 'AI maturity diagnostic', fr: 'Diagnostic maturité IA' },
      },
      {
        href: '/ressources/diagnostics/site-web-intelligent',
        label: { en: 'Smart website diagnostic', fr: 'Diagnostic Site Web Intelligent' },
      },
      {
        href: '/audit-ia-pme',
        label: { en: 'Book an audit', fr: 'Réserver un audit' },
      },
    ],
  },
  // Col 4 — Ressources (méga-menu V1 : Blog · Outils · Academy + Expertise
  // Claude en lien d'autorité E-E-A-T ; newsletter conservée via ancre).
  {
    heading: { en: 'Resources', fr: 'Ressources' },
    items: [
      {
        href: '/blog',
        label: { en: 'Blog', fr: 'Blog' },
      },
      {
        href: '/ressources/outils',
        label: { en: 'Free tools', fr: 'Outils gratuits' },
      },
      {
        href: '/ressources/academy',
        label: { en: 'Academy', fr: 'Academy' },
      },
      {
        href: '/demonstrations',
        label: { en: 'Demos', fr: 'Démonstrations' },
      },
      {
        href: '/expertise-claude',
        label: { en: 'Claude expertise', fr: 'Expertise Claude' },
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
      // Sitemap XML réel généré par @astrojs/sitemap (sortie par défaut
      // /sitemap-index.xml) : exposé pour consulter la liste des URLs indexées.
      {
        href: '/sitemap-index.xml',
        label: { en: 'Sitemap (XML)', fr: 'Sitemap (XML)' },
      },
      // Cartographie d'audit interne (toutes les pages réelles + statut SEO) :
      // outil de décision garder/supprimer · noindex (cf sitemap-noindex-exclude.ts).
      {
        href: '/agence/cartographie',
        label: { en: 'Sitemap audit', fr: 'Cartographie (audit)' },
      },
      // Atelier DS (catalogue + Studio + Hero Lab) sous /library : nav interne, public
      // mais non référencé (noindex + footer only · décision docs/design-system/03 §11.2).
      {
        href: '/library',
        label: { en: 'Design library', fr: 'Atelier design' },
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
    href: '/services',
  },
  {
    n: 'II',
    tag: { en: 'PRODUCTIVITY', fr: 'PRODUCTIVITÉ' },
    label: { en: 'Operational productivity', fr: 'Productivité opérationnelle' },
    lead: { en: 'Remove recurring tasks and make internal workflows run without daily chasing.', fr: 'Supprimer les tâches récurrentes et fluidifier les workflows internes.' },
    items: ['Workflows métiers', 'Tâches répétitives', 'Support client'],
    href: '/services',
  },
  {
    n: 'III',
    tag: { en: 'GROWTH', fr: 'ACQUISITION' },
    label: { en: 'Acquisition & intelligence', fr: 'Acquisition & pilotage' },
    lead: { en: 'Connect site, CRM, follow-ups, content, and business visibility into one growth system.', fr: 'Connecter site, CRM, relances, contenu et pilotage dans un même système.' },
    items: ["Système d'acquisition", 'Pipeline commercial', 'Tableaux de pilotage', 'Contenu SEO/GEO'],
    href: '/services',
  },
  {
    n: 'IV',
    tag: { en: 'ENTERPRISE', fr: 'ETI' },
    label: { en: 'Enterprise infrastructure', fr: 'Infrastructure ETI' },
    lead: { en: 'Connected systems for larger teams, stricter governance, and multi-site operations.', fr: 'Systèmes connectés pour équipes élargies, gouvernance stricte et opérations multi-sites.' },
    items: ['Architecture connectée', 'Sécurité & gouvernance', 'Multi-équipes & multi-sites'],
    href: '/services',
  },
];

export const DEPARTMENTS_GRID = [
  { slug: 'publicite-en-ligne', label: { en: 'Paid Acquisition', fr: 'Publicité en ligne' }, tag: { en: 'Ads · landing · GEO', fr: 'Ads · landing · GEO' } },
  { slug: 'agent-marketing-commercial', label: { en: 'Marketing & Sales Agent', fr: 'Agent marketing & commercial' }, tag: { en: 'Pipeline · qualification · nurturing', fr: 'Pipeline · qualification · nurturing' } },
  { slug: 'contenu-seo-geo-ia', label: { en: 'SEO/GEO Content', fr: 'Contenu SEO/GEO' }, tag: { en: 'Articles · landings · AI indexing', fr: 'Articles · landing · indexation IA' } },
  { slug: 'content-marketing-ia', label: { en: 'Content Marketing', fr: 'Content marketing' }, tag: { en: 'Editorial · nurturing · assets', fr: 'Éditorial · nurturing · assets' } },
  { slug: 'tunnel-de-vente', label: { en: 'Sales Funnel', fr: 'Tunnel de vente' }, tag: { en: 'Landing · tunnel · conversion', fr: 'Landing · tunnel · conversion' } },
];

// P0-5 : CASE_FEED (feed générique « domaines ») retiré. Source UNIQUE des cas = la collection
// Astro `cases` (getCollection('cases')), consommée par la home, /cas-clients, les secteurs et
// le manifeste via `src/lib/case-card-grid-data.ts`. Un seul récit de cas sur tout le site.

export const FIELD_NOTES = [
  { date: '04.2026', tag: { en: 'FIELD NOTE', fr: 'NOTE' },    text: { en: 'Consulting firms: where the 8-week proposal-automation lever sits.',              fr: 'Cabinets de conseil : où se trouve le levier d’automatisation des proposals.' } },
  { date: '04.2026', tag: { en: 'METHOD',    fr: 'MÉTHODE' },  text: { en: 'Multi-workspace kernels, French locale, replayable audit trail.',                fr: 'Noyaux multi-workspace, locale FR, audit trail re-rejouable.' } },
  { date: '03.2026', tag: { en: 'FIELD NOTE', fr: 'NOTE' },    text: { en: 'HubSpot + Claude: the unglamorous pattern that actually ships.',                  fr: 'HubSpot + Claude : le pattern discret qui livre vraiment.' } },
  { date: '03.2026', tag: { en: 'ESSAY',      fr: 'ESSAI' },   text: { en: 'Against the brain-circuit aesthetic.',                                            fr: "Contre l'esthétique cerveau-circuit." } },
  { date: '02.2026', tag: { en: 'METHOD',    fr: 'MÉTHODE' },  text: { en: 'RevOps rebuild: reconnect site, CRM, follow-ups into one pipeline.',             fr: 'Refonte RevOps : reconnecter site, CRM et relances dans un seul pipeline.' } },
];

// 6 services réels v7 (strat 11 §3) · source UNIQUE des cartes de la home (ServicesGrid).
// `href` pointe vers la vraie page /services/<slug> (les 6 collections existent).
// Honnêteté : capacités et engagements, 0 résultat client chiffré (studio solo).
export const SIX_SERVICES = [
  {
    k: '01',
    metric: { en: 'Astro + AI', fr: 'Astro + IA' },
    label: { en: 'Smart website', fr: 'Site web intelligent' },
    body: { en: 'A web app wired to AI and your data: it reads its KPIs, optimises its SEO and qualifies every visitor.', fr: "Une web app branchée à l'IA et à vos données : elle lit ses KPI, optimise son SEO et qualifie chaque visiteur." },
    connectors: { en: 'SEO/GEO · Analytics · CRM · Funnel', fr: 'SEO/GEO · Analytics · CRM · Tunnel' },
    href: '/services/site-web-ia',
  },
  {
    k: '02',
    metric: { en: 'Editorial machine', fr: 'Machine éditoriale' },
    label: { en: 'SEO, GEO and content', fr: 'SEO, GEO et contenu' },
    body: { en: 'SEO articles and GEO-ready content produced in your tone and validated by a human, to build authority.', fr: "Articles SEO et contenus GEO-ready produits dans votre ton et validés par un humain, pour bâtir l'autorité." },
    connectors: { en: 'SEO · GEO · Multi-channel · Human review', fr: 'SEO · GEO · Multi-canal · Relecture humaine' },
    href: '/services/seo-geo-contenu',
  },
  {
    k: '03',
    metric: { en: 'Qualified leads', fr: 'Leads qualifiés' },
    label: { en: 'Landing pages and funnels', fr: 'Landing pages et tunnels' },
    body: { en: 'Landing pages that convert and scoring that prioritises: from visitor to qualified lead, wired to your CRM.', fr: 'Landing pages qui convertissent et scoring qui priorise : du visiteur au lead qualifié, branché à votre CRM.' },
    connectors: { en: 'Landing · Scoring · CRM · Qualification', fr: 'Landing · Scoring · CRM · Qualification' },
    href: '/services/landing-pages-tunnels',
  },
  {
    k: '04',
    metric: { en: 'In production', fr: 'En production' },
    label: { en: 'Claude integration', fr: 'Intégration Claude' },
    body: { en: 'Deploy Claude, Claude Code and MCP wired to your tools, with AI-lead training and governance. In production, not in a POC.', fr: "Déployer Claude, Claude Code et MCP branchés à vos outils, avec formation du référent IA et gouvernance. En production, pas en POC." },
    connectors: { en: 'Claude · Claude Code · MCP · Governance', fr: 'Claude · Claude Code · MCP · Gouvernance' },
    href: '/services/integration-claude',
  },
  {
    k: '05',
    metric: { en: 'Roadmap', fr: 'Feuille de route' },
    label: { en: 'Claude AI consultant', fr: 'Consultant IA Claude' },
    body: { en: 'Frame where AI creates value, set the roadmap, lay governance and skill up your teams.', fr: "Cadrer où l'IA crée de la valeur, tracer la feuille de route, poser la gouvernance et faire monter vos équipes." },
    connectors: { en: 'Scoping · Roadmap · Governance · Training', fr: 'Cadrage · Feuille de route · Gouvernance · Formation' },
    href: '/services/consultant-ia-claude',
  },
  {
    k: '06',
    metric: { en: 'Autonomous', fr: 'Autonomes' },
    label: { en: 'AI agents', fr: 'Agents IA' },
    body: { en: 'Chatbot, MCP integration, workflows and business agents wired to your tools, executing under supervision.', fr: "Chatbot, intégration MCP, workflows et agents métier branchés à vos outils, qui exécutent sous supervision." },
    connectors: { en: 'Chatbot · MCP · Workflows · Business agents', fr: 'Chatbot · MCP · Workflows · Agents métier' },
    href: '/services/agents-ia',
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
