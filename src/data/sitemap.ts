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

// Refonte positionnement 2026-10 : ces structures sont le MIROIR de la navigation servie
// (src/data/mega-menu.ts) pour le plan du site (/plan-du-site) et le footer. Ordre de
// l'offre : (1) automatisation et agents IA, (2) applications métier, (3) conseil et
// formation, puis en retrait (4) outils commerciaux et (5) visibilité web.

/** URL unique de prise de rendez-vous (la page contact porte le calendrier et le formulaire). */
export const AUDIT_BOOKING_HREF = '/contact?offer=audit-ia-pme&intent=audit';

// ─── MEGA-MENU 1 · SOLUTIONS
export const MM_SOLUTIONS_NEW: MegaMenu = {
  key: 'solutions',
  label: { en: 'Solutions', fr: 'Solutions' },
  href: '/services',
  lead: {
    en: 'AI development studio and process automation practice for SMEs: automations, AI agents, business applications, advisory and training.',
    fr: "Studio de développement IA et cabinet d'automatisation des processus pour PME et ETI : automatisations, agents IA, applications métier, conseil et formation.",
  },
  cols: [
    {
      kicker: { en: 'AUTOMATION AND AI AGENTS', fr: 'AUTOMATISATION ET AGENTS IA' },
      label: { en: 'Automation and AI agents', fr: 'Automatisation et agents IA' },
      items: [
        { href: '/services/systemes-operationnels-ia', label: { en: 'AI automation for SMEs', fr: 'Automatisation IA pour PME' }, featured: true },
        { href: '/services/automatisations', label: { en: 'Process automation', fr: 'Automatisation des processus' } },
        { href: '/services/automatisation-n8n', label: { en: 'n8n automation', fr: 'Automatisation n8n' } },
        { href: '/services/agents-ia', label: { en: 'AI agents', fr: 'Agents IA' } },
        { href: '/services/agent-support-client', label: { en: 'Customer support agent', fr: 'Agent support client' } },
        { href: '/services/integration-claude', label: { en: 'Claude integration', fr: 'Intégration Claude' } },
      ],
    },
    {
      kicker: { en: 'BUSINESS APPLICATIONS', fr: 'APPLICATIONS MÉTIER' },
      label: { en: 'Business applications', fr: 'Applications métier' },
      items: [
        { href: '/services/applications-internes', label: { en: 'Internal applications', fr: 'Applications internes' } },
        { href: '/services/donnees-reporting', label: { en: 'Data and reporting', fr: 'Données et reporting' } },
      ],
    },
    {
      kicker: { en: 'ADVISORY AND TRAINING', fr: 'CONSEIL ET FORMATION' },
      label: { en: 'Advisory and training', fr: 'Conseil et formation' },
      items: [
        { href: '/audit-ia-pme', label: { en: 'SME AI audit', fr: 'Audit IA PME' } },
        { href: '/services/consultant-ia-claude', label: { en: 'AI consultant', fr: 'Consultant IA' } },
      ],
    },
    {
      kicker: { en: 'IN SUPPORT', fr: 'EN APPUI' },
      label: { en: 'Sales tooling and web visibility', fr: 'Outils commerciaux et visibilité web' },
      items: [
        { href: '/services/systeme-commercial', label: { en: 'Sales tooling', fr: 'Outils commerciaux' } },
        { href: '/services/prospection-automatisee', label: { en: 'Automated prospecting', fr: 'Prospection automatisée' } },
        { href: '/services/crm-scoring-routing', label: { en: 'CRM, scoring and routing', fr: 'CRM, scoring et routing' } },
        { href: '/services/sequences-de-suivi', label: { en: 'Follow-up sequences', fr: 'Séquences de suivi' } },
        { href: '/services/systeme-acquisition', label: { en: 'Web visibility', fr: 'Visibilité web' } },
        { href: '/services/site-web-ia', label: { en: 'AI website', fr: 'Site web IA' } },
        { href: '/services/seo-geo-contenu', label: { en: 'SEO, GEO and content', fr: 'SEO, GEO et contenu' } },
        { href: '/services/landing-pages-tunnels', label: { en: 'Landing pages and funnels', fr: 'Landing pages et tunnels' } },
      ],
    },
  ],
};

export const MM_SOLUTIONS: MegaMenu = MM_SOLUTIONS_NEW;

// ─── MEGA-MENU 2 · CAS D'USAGE (ex « Offres » / « Nos formules »)
export const MM_OFFRES_NEW: MegaMenu = {
  key: 'cas-usages',
  label: { en: 'Use cases', fr: "Cas d'usage" },
  href: '/cas-usages',
  lead: {
    en: 'Start from the problem, not the technology: what we automate, with which tools and how the gain is measured.',
    fr: "Partir du problème, pas de la technologie : ce qu'on automatise, avec quels outils et comment on mesure le gain.",
  },
  cols: [
    {
      kicker: { en: 'OPERATIONS', fr: 'OPÉRATIONS' },
      label: { en: 'Operations', fr: 'Opérations' },
      items: [
        { href: '/cas-usages/standardiser-processus', label: { en: 'Standardize processes', fr: 'Standardiser les processus' } },
        { href: '/cas-usages/centraliser-donnees', label: { en: 'Centralize data', fr: 'Centraliser les données' } },
        { href: '/cas-usages/reduire-reporting', label: { en: 'Cut reporting time', fr: 'Réduire le temps de reporting' } },
      ],
    },
    {
      kicker: { en: 'SALES AND CONTENT', fr: 'COMMERCIAL ET CONTENU' },
      label: { en: 'Sales and content', fr: 'Commercial et contenu' },
      items: [
        { href: '/cas-usages/generer-plus-de-leads', label: { en: 'Generate more leads', fr: 'Générer plus de leads' } },
        { href: '/cas-usages/reduire-temps-cms', label: { en: 'Cut time spent on the CMS', fr: 'Réduire le temps passé sur le CMS' } },
      ],
    },
  ],
};

export const MM_OFFRES: MegaMenu = MM_OFFRES_NEW;

// ─── MEGA-MENU 3 · RÉALISATIONS (ex « Cas clients » ; les URL /cas-clients ne changent pas)
export const MM_CASES_NEW: MegaMenu = {
  key: 'cas',
  label: { en: 'Work', fr: 'Réalisations' },
  href: '/cas-clients',
  lead: {
    en: 'Five real engagements, documented. The figures quoted come from the case studies, never from an average.',
    fr: "Cinq missions réelles, documentées. Les chiffres cités viennent des études de cas, jamais d'une moyenne.",
  },
  cols: [
    {
      kicker: { en: 'CASE STUDIES', fr: 'ÉTUDES DE CAS' },
      label: { en: 'Case studies', fr: 'Études de cas' },
      items: [
        { href: '/cas-clients/amploi', label: { en: 'Amploi', fr: 'Amploi' } },
        { href: '/cas-clients/les-carnets-de-montpellier', label: { en: 'Les Carnets de Montpellier', fr: 'Les Carnets de Montpellier' } },
        { href: '/cas-clients/balzeo', label: { en: 'Balzeo', fr: 'Balzeo' } },
        { href: '/cas-clients/desangles-peinture', label: { en: 'Desangles Peinture', fr: 'Desangles Peinture' } },
        { href: '/cas-clients/isabelle-diaz-naturopathe', label: { en: 'Isabelle Diaz, naturopath', fr: 'Isabelle Diaz, naturopathe' } },
      ],
    },
  ],
};

// ─── MEGA-MENU · TARIFS ET MÉTHODE (ex « Expertise Claude »)
export const MM_TECH: MegaMenu = {
  key: 'tarifs-methode',
  label: { en: 'Pricing and method', fr: 'Tarifs et méthode' },
  href: '/tarifs',
  lead: {
    en: 'Free audit, scoping sprint, pilot in production, custom rollout, ongoing support. Prices shown.',
    fr: 'Audit gratuit, sprint de cadrage, pilote en production, déploiement sur mesure, accompagnement continu. Prix affichés.',
  },
  cols: [
    {
      kicker: { en: 'WORKING TOGETHER', fr: 'TRAVAILLER ENSEMBLE' },
      label: { en: 'Working together', fr: 'Travailler ensemble' },
      items: [
        { href: '/tarifs', label: { en: 'Pricing', fr: 'Tarifs' }, featured: true },
        { href: '/agence/methode', label: { en: 'Method', fr: 'Méthode' } },
        { href: '/technologies', label: { en: 'Stack and technologies', fr: 'Stack et technologies' } },
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
    en: 'Guides, comparisons and tools to decide where AI and automation are worth it in an SME.',
    fr: "Guides, comparatifs et outils pour décider où l'IA et l'automatisation valent le coup dans une PME.",
  },
  cols: [
    {
      kicker: { en: 'READING', fr: 'LIRE' },
      label: { en: 'Reading', fr: 'Lire' },
      items: [
        { href: '/blog', label: { en: 'Blog', fr: 'Blog' }, featured: true },
        { href: '/ressources/guides/claude-pme', label: { en: 'Guide: deploying Claude in an SME', fr: 'Guide : déployer Claude en PME' } },
        { href: '/ressources/comparatifs/claude-vs-chatgpt-pme', label: { en: 'Claude or ChatGPT at work', fr: 'Claude ou ChatGPT en entreprise' } },
      ],
    },
    {
      kicker: { en: 'MEASURE', fr: 'MESURER' },
      label: { en: 'Tools and diagnostics', fr: 'Outils et diagnostics' },
      tint: '#C94F2E',
      items: [
        { href: '/ressources/outils/calculateur-roi-ia', label: { en: 'AI ROI calculator', fr: 'Calculateur ROI IA' }, featured: true },
        { href: '/ressources/diagnostics/maturite-ia', label: { en: 'AI maturity diagnostic', fr: 'Diagnostic maturité IA' } },
      ],
    },
  ],
  featured: {
    kicker: { en: 'BLOG', fr: 'BLOG' },
    label: { en: 'Field notes on AI in SMEs', fr: "Notes de terrain sur l'IA en PME" },
    body: { en: 'Signed essays and notes on automation, AI agents and business applications. Published when there is something to say.', fr: "Essais et notes signés sur l'automatisation, les agents IA et les applications métier. Publiés quand il y a quelque chose à dire." },
    cta: { en: 'Read the blog →', fr: 'Lire le blog →' },
    href: '/blog',
  },
};

// ─── MEGA-MENU 5 · LE STUDIO (ex « L'Agence » ; les URL /agence ne changent pas)
export const MM_AGENCY_NEW: MegaMenu = {
  key: 'agence',
  label: { en: 'The studio', fr: 'Le studio' },
  href: '/agence',
  lead: {
    en: 'A solo studio based in Bordeaux, working remotely. One engineer working with your business teams.',
    fr: 'Un studio solo basé à Bordeaux, missions à distance. Un ingénieur qui travaille avec vos équipes métier.',
  },
  cols: [
    {
      kicker: { en: 'THE STUDIO', fr: 'LE STUDIO' },
      label: { en: 'The studio', fr: 'Le studio' },
      items: [
        { href: '/agence', label: { en: 'About Waimia', fr: 'À propos de Waimia' } },
        { href: '/equipe/simon-beros', label: { en: 'Simon Beros, founder', fr: 'Simon Beros, fondateur' } },
        { href: '/manifesto', label: { en: 'Manifesto', fr: 'Manifeste' } },
        { href: '/contact', label: { en: 'Contact', fr: 'Contact' } },
      ],
    },
  ],
};

// ─── PRIMARY NAV
// Miroir de cohérence du premier niveau servi (MEGA_MENU) : Solutions · Cas d'usage ·
// Réalisations · Ressources · Le studio. Aucun consommateur direct aujourd'hui.
export const PRIMARY_NAV: Array<MegaMenu | SimpleNav> = [
  MM_SOLUTIONS_NEW,
  MM_OFFRES_NEW,
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

// Colonnes ordonnées sur le positionnement (refonte 2026-10). Règle : aucun lien vers une
// page dépubliée ou noindex (index /ressources/outils, /demonstrations, /library,
// /agence/cartographie, /plan-du-site et /implantations/bordeaux retirés tant qu'ils sont noindex).
export const FOOTER_COLS: FooterCol[] = [
  // Col 1 : le métier.
  {
    heading: { en: 'Automation and AI', fr: 'Automatisation et IA' },
    items: [
      { href: '/services/automatisations', label: { en: 'Process automation', fr: 'Automatisation des processus' } },
      { href: '/services/automatisation-n8n', label: { en: 'n8n automation', fr: 'Automatisation n8n' } },
      { href: '/services/agents-ia', label: { en: 'AI agents', fr: 'Agents IA' } },
      { href: '/services/agent-support-client', label: { en: 'Customer support agent', fr: 'Agent support client' } },
      { href: '/services/integration-claude', label: { en: 'Claude integration', fr: 'Intégration Claude' } },
      { href: '/services/applications-internes', label: { en: 'Business applications', fr: 'Applications métier' } },
      { href: '/services/donnees-reporting', label: { en: 'Data and reporting', fr: 'Données et reporting' } },
      { href: '/services/consultant-ia-claude', label: { en: 'AI consultant', fr: 'Consultant IA' } },
    ],
  },
  // Col 2 : comment on démarre.
  {
    heading: { en: 'Getting started', fr: 'Démarrer' },
    items: [
      { href: '/audit-ia-pme', label: { en: 'SME AI audit', fr: 'Audit IA PME' } },
      { href: '/tarifs', label: { en: 'Pricing', fr: 'Tarifs' } },
      { href: '/agence/methode', label: { en: 'Method', fr: 'Méthode' } },
      { href: '/cas-usages', label: { en: 'Use cases', fr: "Cas d'usage" } },
      { href: '/ressources/outils/calculateur-roi-ia', label: { en: 'AI ROI calculator', fr: 'Calculateur ROI IA' } },
      { href: '/ressources/diagnostics/maturite-ia', label: { en: 'AI maturity diagnostic', fr: 'Diagnostic maturité IA' } },
      { href: AUDIT_BOOKING_HREF, label: { en: 'Book an audit', fr: 'Réserver un audit' } },
    ],
  },
  // Col 3 : les outils en appui (commercial, visibilité web).
  {
    heading: { en: 'Supporting tools', fr: 'Outils en appui' },
    items: [
      { href: '/services/systeme-commercial', label: { en: 'Sales tooling', fr: 'Outils commerciaux' } },
      { href: '/services/prospection-automatisee', label: { en: 'Automated prospecting', fr: 'Prospection automatisée' } },
      { href: '/services/crm-scoring-routing', label: { en: 'CRM, scoring and routing', fr: 'CRM, scoring et routing' } },
      { href: '/services/systeme-acquisition', label: { en: 'Web visibility', fr: 'Visibilité web' } },
      { href: '/services/site-web-ia', label: { en: 'AI website', fr: 'Site web IA' } },
      { href: '/services/seo-geo-contenu', label: { en: 'SEO, GEO and content', fr: 'SEO, GEO et contenu' } },
    ],
  },
  // Col 4 : le studio, les preuves, les ressources.
  {
    heading: { en: 'The studio', fr: 'Le studio' },
    items: [
      { href: '/agence', label: { en: 'About Waimia', fr: 'À propos' } },
      { href: '/equipe/simon-beros', label: { en: 'Simon Beros, founder', fr: 'Simon Beros, fondateur' } },
      { href: '/manifesto', label: { en: 'Manifesto', fr: 'Manifeste' } },
      { href: '/cas-clients', label: { en: 'Work', fr: 'Réalisations' } },
      { href: '/blog', label: { en: 'Blog', fr: 'Blog' } },
      { href: '/ressources', label: { en: 'Resources', fr: 'Ressources' } },
      { href: '/implantations/montpellier', label: { en: 'Montpellier', fr: 'Montpellier' } },
      { href: '/contact', label: { en: 'Contact', fr: 'Contact' } },
    ],
  },
  // Col 5 : légal (pages légales réelles uniquement).
  {
    heading: { en: 'Legal', fr: 'Légal' },
    shield: true,
    items: [
      { href: '/politique-confidentialite', label: { en: 'Privacy policy', fr: 'Politique de confidentialité' } },
      { href: '/mentions-legales', label: { en: 'Legal notice', fr: 'Mentions légales' } },
      { href: '/cgv', label: { en: 'Terms of sale', fr: 'CGV' } },
      // Sitemap XML réel généré par @astrojs/sitemap (liste des URL indexées).
      { href: '/sitemap-index.xml', label: { en: 'Sitemap (XML)', fr: 'Sitemap (XML)' } },
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
  { date: '02.2026', tag: { en: 'METHOD',    fr: 'MÉTHODE' },  text: { en: 'RevOps rebuild: reconnect site, CRM, follow-ups into one pipeline.',             fr: 'Reconnecter CRM et relances dans un seul pipeline, sans ressaisie.' } },
];

// Six prestations du studio, dans l'ordre de l'offre (refonte positionnement 2026-10) :
// automatisation et agents IA, applications métier, conseil et formation. Consommé par le
// manifeste (rangées alternées). `href` pointe vers la vraie page /services/<slug>.
// Honnêteté : capacités et engagements, 0 résultat client chiffré (studio solo).
export const SIX_SERVICES = [
  {
    k: '01',
    metric: { en: 'Workflows', fr: 'Workflows' },
    label: { en: 'Process automation', fr: 'Automatisation des processus' },
    body: { en: 'n8n and Make workflows that remove re-keying between your tools: data entered once flows everywhere it is needed.', fr: 'Des workflows n8n et Make qui suppriment la ressaisie entre vos outils : une donnée saisie une fois circule partout où elle est utile.' },
    connectors: { en: 'n8n · Make · API', fr: 'n8n · Make · API' },
    href: '/services/automatisations',
  },
  {
    k: '02',
    metric: { en: 'Supervised', fr: 'Supervisés' },
    label: { en: 'AI agents', fr: 'Agents IA' },
    body: { en: 'Agents on Claude or OpenAI, connected to your tools, acting within a defined scope. Sensitive actions go through human validation.', fr: "Des agents sur Claude ou OpenAI, branchés à vos outils, qui agissent dans un périmètre défini. Les actions sensibles passent par une validation humaine." },
    connectors: { en: 'Claude · OpenAI · MCP', fr: 'Claude · OpenAI · MCP' },
    href: '/services/agents-ia',
  },
  {
    k: '03',
    metric: { en: 'In production', fr: 'En production' },
    label: { en: 'Claude integration', fr: 'Intégration Claude' },
    body: { en: 'Claude deployed in the company and connected to your tools, with governance and an in-house AI lead trained. In production, not in a proof of concept.', fr: "Claude déployé dans l'entreprise et branché à vos outils, avec la gouvernance et un référent IA formé en interne. En production, pas en preuve de concept." },
    connectors: { en: 'Claude · MCP · Governance', fr: 'Claude · MCP · Gouvernance' },
    href: '/services/integration-claude',
  },
  {
    k: '04',
    metric: { en: 'Custom built', fr: 'Sur mesure' },
    label: { en: 'Business applications', fr: 'Applications métier' },
    body: { en: 'The internal tool the spreadsheet no longer replaces: a simple interface, connected to your data and automations. You keep the code.', fr: "L'outil interne que le tableur ne remplace plus : une interface simple, branchée à vos données et à vos automatisations. Vous gardez le code." },
    connectors: { en: 'Application · Data · API', fr: 'Application · Données · API' },
    href: '/services/applications-internes',
  },
  {
    k: '05',
    metric: { en: 'Steering', fr: 'Pilotage' },
    label: { en: 'Data and reporting', fr: 'Données et reporting' },
    body: { en: 'Data scattered across your tools gathered in one base, and reporting that produces itself.', fr: 'Les données dispersées entre vos outils rassemblées dans une seule base, et un reporting qui se produit tout seul.' },
    connectors: { en: 'Database · Dashboards · Alerts', fr: 'Base de données · Tableaux de bord · Alertes' },
    href: '/services/donnees-reporting',
  },
  {
    k: '06',
    metric: { en: 'Roadmap', fr: 'Feuille de route' },
    label: { en: 'Advisory and training', fr: 'Conseil et formation' },
    body: { en: 'Audit, roadmap and governance before investing, then training so your teams can evolve what was built.', fr: "Audit, feuille de route et gouvernance avant d'investir, puis formation pour que vos équipes fassent évoluer ce qui a été construit." },
    connectors: { en: 'Audit · Roadmap · Training', fr: 'Audit · Feuille de route · Formation' },
    href: '/services/consultant-ia-claude',
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
