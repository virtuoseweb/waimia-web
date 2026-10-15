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
// l'offre : (1) automatisation et agents IA, (2) applications métier, (3) site web, SEO et
// marque (décision du 14 octobre 2026 : le web n'est plus « en appui »), (4) conseil et
// formation, puis (5) outils commerciaux.

/** URL unique de prise de rendez-vous : source unique dans conversion.ts, ré-exportée ici. */
import { AUDIT_BOOKING_HREF, AUDIT_BOOKING_LABEL } from './conversion';
export { AUDIT_BOOKING_HREF };

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
        { href: '/services/automatisation-n8n', label: { en: 'n8n agency', fr: 'Agence n8n' } },
        { href: '/services/automatisation-make', label: { en: 'Make agency', fr: 'Agence Make' } },
        { href: '/services/agents-ia', label: { en: 'AI agents', fr: 'Agents IA' } },
        { href: '/services/agent-support-client', label: { en: 'Customer support agent', fr: 'Agent support client' } },
        { href: '/services/base-de-connaissance-ia', label: { en: 'AI knowledge base', fr: 'Base de connaissance IA' } },
        { href: '/services/agent-qualification-leads', label: { en: 'Lead qualification agent', fr: 'Agent de qualification de leads' } },
        { href: '/services/agent-traitement-documents', label: { en: 'Document processing agent', fr: 'Agent de traitement de documents' } },
        { href: '/services/integration-claude', label: { en: 'Claude integration', fr: 'Intégration Claude' } },
        { href: '/services/integration-mistral-ai', label: { en: 'Mistral AI integration, European angle', fr: 'Intégration Mistral AI, angle européen' } },
        { href: '/services/integration-chatgpt-openai', label: { en: 'ChatGPT and OpenAI integration', fr: 'Intégration ChatGPT et OpenAI' } },
      ],
    },
    {
      kicker: { en: 'BUSINESS APPLICATIONS', fr: 'APPLICATIONS MÉTIER' },
      label: { en: 'Business applications', fr: 'Applications métier' },
      items: [
        { href: '/services/applications-internes', label: { en: 'Internal applications', fr: 'Applications internes' } },
        { href: '/services/mvp-saas', label: { en: 'SaaS MVP', fr: 'MVP SaaS' } },
        { href: '/services/portail-client', label: { en: 'Client portal', fr: 'Portail client' } },
        { href: '/services/back-office-sur-mesure', label: { en: 'Custom back office', fr: 'Back-office sur mesure' } },
        { href: '/services/donnees-reporting', label: { en: 'Data and reporting', fr: 'Données et reporting' } },
        { href: '/services/tableau-de-bord-direction', label: { en: 'Management dashboard', fr: 'Tableau de bord de direction' } },
        { href: '/services/centralisation-donnees', label: { en: 'Data centralisation', fr: 'Centralisation des données' } },
        { href: '/services/reporting-automatise', label: { en: 'Automated reporting', fr: 'Reporting automatisé' } },
      ],
    },
    {
      kicker: { en: 'WEBSITE, SEO AND BRAND', fr: 'SITE WEB, SEO ET MARQUE' },
      label: { en: 'Website, SEO and brand', fr: 'Site web, SEO et marque' },
      items: [
        { href: '/services/systeme-acquisition', label: { en: 'Website, search and brand', fr: 'Site, référencement et marque' } },
        { href: '/services/site-web-ia', label: { en: 'Web agency', fr: 'Agence site web' } },
        { href: '/services/webflow', label: { en: 'Webflow agency', fr: 'Agence Webflow' } },
        { href: '/services/wordpress', label: { en: 'WordPress agency', fr: 'Agence WordPress' } },
        { href: '/services/shopify', label: { en: 'Shopify agency', fr: 'Agence Shopify' } },
        { href: '/services/sur-mesure-headless', label: { en: 'Custom website', fr: 'Site sur mesure' } },
        { href: '/services/landing-pages-tunnels', label: { en: 'Landing pages and funnels', fr: 'Landing pages et tunnels' } },
        { href: '/services/seo-geo-contenu', label: { en: 'SEO and organic search agency', fr: 'Agence SEO et référencement naturel' } },
        { href: '/services/audit-seo-technique', label: { en: 'Technical SEO audit', fr: 'Audit SEO technique' } },
        { href: '/services/referencement-ia', label: { en: 'GEO agency: get cited by AI', fr: 'Agence GEO : être cité par les IA' } },
        { href: '/services/redaction-seo-contenu', label: { en: 'SEO writing and content', fr: 'Rédaction SEO et contenu' } },
        { href: '/services/seo-local', label: { en: 'Local SEO', fr: 'SEO local' } },
        { href: '/services/branding', label: { en: 'Branding agency', fr: 'Agence de branding' } },
        { href: '/services/identite-de-marque', label: { en: 'Brand identity', fr: 'Identité de marque' } },
        { href: '/services/refonte-de-marque', label: { en: 'Rebranding', fr: 'Refonte de marque' } },
        { href: '/services/naming-et-positionnement', label: { en: 'Naming and positioning', fr: 'Naming et positionnement' } },
        { href: '/services/charte-graphique-brand-book', label: { en: 'Brand guidelines and brand book', fr: 'Charte graphique et brand book' } },
      ],
    },
    {
      kicker: { en: 'ADVISORY AND TRAINING', fr: 'CONSEIL ET FORMATION' },
      label: { en: 'Advisory and training', fr: 'Conseil et formation' },
      items: [
        { href: '/audit-ia-pme', label: { en: 'SME AI audit', fr: 'Audit IA PME' } },
        { href: '/services/consultant-ia-claude', label: { en: 'AI consultant', fr: 'Consultant IA' } },
        { href: '/conformite-ia', label: { en: 'AI compliance: GDPR and AI Act', fr: 'Conformité IA : RGPD et AI Act' } },
      ],
    },
    {
      kicker: { en: 'TRAINING', fr: 'FORMATIONS' },
      label: { en: 'Training', fr: 'Formations' },
      items: [
        { href: '/formations', label: { en: 'AI and automation training', fr: 'Formations IA et automatisation' }, featured: true },
        { href: '/formations/automatisation', label: { en: 'Automation training', fr: 'Formation automatisation' } },
        { href: '/formations/n8n', label: { en: 'n8n training', fr: 'Formation n8n' } },
        { href: '/formations/make', label: { en: 'Make training', fr: 'Formation Make' } },
        { href: '/formations/claude', label: { en: 'Claude training', fr: 'Formation Claude' } },
        { href: '/formations/claude-code', label: { en: 'Claude Code training', fr: 'Formation Claude Code' } },
        { href: '/formations/chatgpt', label: { en: 'ChatGPT training', fr: 'Formation ChatGPT' } },
      ],
    },
    {
      kicker: { en: 'SALES TOOLING', fr: 'OUTILS COMMERCIAUX' },
      label: { en: 'Sales tooling', fr: 'Outils commerciaux' },
      items: [
        { href: '/services/systeme-commercial', label: { en: 'Sales tooling', fr: 'Outils commerciaux' } },
        { href: '/services/prospection-automatisee', label: { en: 'Automated prospecting, overview', fr: "Prospection automatisée, vue d'ensemble" } },
        { href: '/services/prospection-linkedin', label: { en: 'LinkedIn prospecting', fr: 'Prospection LinkedIn' } },
        { href: '/services/social-selling-ia', label: { en: 'Social selling with AI', fr: "Social selling avec l'IA" } },
        { href: '/services/automatisation-reseaux-sociaux', label: { en: 'Social media', fr: 'Réseaux sociaux' } },
        { href: '/services/cold-email-b2b', label: { en: 'B2B cold email', fr: 'Cold email B2B' } },
        { href: '/services/crm-scoring-routing', label: { en: 'CRM, scoring and routing', fr: 'CRM, scoring et routing' } },
        { href: '/services/sequences-de-suivi', label: { en: 'Follow-up sequences', fr: 'Séquences de suivi' } },
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
    en: 'Start from the problem or the function, not the technology: what we automate, in what order and where the limits are.',
    fr: "Partir du problème ou de la fonction, pas de la technologie : ce qu'on automatise, dans quel ordre et où sont les limites.",
  },
  cols: [
    {
      kicker: { en: 'BY PROBLEM', fr: 'PAR PROBLÈME' },
      label: { en: 'By problem', fr: 'Par problème' },
      items: [
        { href: '/cas-usages/standardiser-processus', label: { en: 'Standardize processes', fr: "Automatiser l'administratif" } },
        { href: '/cas-usages/centraliser-donnees', label: { en: 'Centralize data', fr: 'Centraliser données et reporting' } },
        { href: '/cas-usages/generer-plus-de-leads', label: { en: 'Generate more leads', fr: 'Automatiser le suivi commercial' } },
      ],
    },
    {
      kicker: { en: 'BY FUNCTION', fr: 'PAR FONCTION' },
      label: { en: 'By function', fr: 'Par fonction' },
      items: [
        { href: '/cas-usages/support-sav', label: { en: 'Customer service and after-sales', fr: 'Service client et SAV' } },
        { href: '/cas-usages/finance-comptabilite', label: { en: 'Finance and accounting', fr: 'Finance et comptabilité' } },
        { href: '/cas-usages/rh', label: { en: 'Human resources', fr: 'Ressources humaines' } },
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
    en: 'Client engagements and internal projects, documented. The figures quoted come from the case pages, never from an average.',
    fr: "Des missions clients et des projets internes, documentés. Les chiffres cités viennent des fiches, jamais d'une moyenne.",
  },
  cols: [
    {
      kicker: { en: 'CLIENT WORK', fr: 'RÉALISATIONS CLIENTS' },
      label: { en: 'Client work', fr: 'Réalisations clients' },
      items: [
        { href: '/cas-clients/brow-x-professionnel', label: { en: 'Brow.X Professionnel', fr: 'Brow.X Professionnel' } },
        { href: '/cas-clients/inbound-value', label: { en: 'Inbound Value', fr: 'Inbound Value' } },
        { href: '/cas-clients/isabelle-diaz-naturopathe', label: { en: 'Isabelle Diaz, naturopath', fr: 'Isabelle Diaz, naturopathe' } },
        { href: '/cas-clients/les-carnets-de-montpellier', label: { en: 'Les Carnets de Montpellier', fr: 'Les Carnets de Montpellier' } },
        { href: '/cas-clients/amploi', label: { en: 'Amploi', fr: 'Amploi' } },
        { href: '/cas-clients/balzeo', label: { en: 'Balzeo', fr: 'Balzeo' } },
        { href: '/cas-clients/desangles-peinture', label: { en: 'Desangles Peinture', fr: 'Desangles Peinture' } },
      ],
    },
    {
      kicker: { en: 'INTERNAL PROJECTS', fr: 'PROJETS INTERNES' },
      label: { en: 'Internal projects', fr: 'Projets internes' },
      items: [
        { href: '/cas-clients/waimia-os', label: { en: 'Waimia OS', fr: 'Waimia OS' } },
        { href: '/cas-clients/virtuoseos', label: { en: 'VirtuoseOS', fr: 'VirtuoseOS' } },
        { href: '/cas-clients/prototypes-internes', label: { en: 'Internal prototypes', fr: 'Prototypes internes' } },
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
        { href: '/ressources/guides/claude-cowork', label: { en: 'Claude Cowork is now Claude', fr: 'Claude Cowork est désormais Claude' } },
        { href: '/ressources/guides/claude-fonctionnalites-pme', label: { en: 'Claude: features, plans and pricing', fr: 'Claude : fonctionnalités, offres et prix' } },
        { href: '/ressources/guides/claude-code-entreprise', label: { en: 'Claude Code for business', fr: 'Claude Code en entreprise' } },
        { href: '/ressources/guides/claude-skills', label: { en: 'Claude skills: build and deploy', fr: 'Skills Claude : créer et déployer' } },
        { href: '/ressources/guides/claude-plugins-entreprise', label: { en: 'Claude plugins and connectors', fr: 'Plugins et connecteurs Claude' } },
        { href: '/ressources/guides/claude-design', label: { en: 'Claude Design for SMBs', fr: 'Claude Design en PME' } },
        { href: '/ressources/outils/guide-achat-claude-pme', label: { en: "Claude buyer's guide for SMBs (PDF)", fr: "Guide d'achat Claude pour PME (PDF)" } },
        { href: '/ressources/guides/mcp-claude', label: { en: 'MCP guide: connecting Claude to your tools', fr: 'Guide MCP : brancher Claude à vos outils' } },
        { href: '/ressources/guides/ai-act-pme-calendrier', label: { en: 'AI Act: the timeline for an SME', fr: 'AI Act : le calendrier pour une PME' } },
        { href: '/ressources/guides/roi-automatisation', label: { en: 'Guide: computing automation ROI', fr: "Guide : calculer le ROI d'une automatisation" } },
        { href: '/ressources/guides/taches-a-automatiser-pme', label: { en: 'Guide: which tasks to automate first', fr: "Guide : quelles tâches automatiser d'abord" } },
        { href: '/ressources/comparatifs/n8n-vs-make', label: { en: 'n8n or Make', fr: 'n8n ou Make' } },
        { href: '/ressources/comparatifs/claude-vs-chatgpt-pme', label: { en: 'Claude or ChatGPT at work', fr: 'Claude ou ChatGPT en entreprise' } },
        { href: '/ressources/comparatifs/claude-platform-vs-openai-platform', label: { en: 'Claude Platform or OpenAI Platform', fr: 'Claude Platform ou OpenAI Platform' } },
      ],
    },
    {
      kicker: { en: 'MEASURE', fr: 'MESURER' },
      label: { en: 'Tools and diagnostics', fr: 'Outils et diagnostics' },
      tint: '#C94F2E',
      items: [
        { href: '/ressources/outils/calculateur-roi-ia', label: { en: 'AI ROI calculator', fr: 'Calculateur ROI IA' }, featured: true },
        { href: '/ressources/diagnostics/maturite-ia', label: { en: 'AI maturity diagnostic', fr: 'Diagnostic maturité IA' } },
        { href: '/ressources/outils/grille-taches-a-automatiser', label: { en: 'Task automation grid', fr: 'Grille des tâches à automatiser' } },
        { href: '/ressources/outils/charte-ia-entreprise', label: { en: 'AI charter template', fr: 'Modèle de charte IA' } },
        { href: '/ressources/outils/checklist-90-jours-claude', label: { en: '90-day Claude deployment checklist', fr: 'Checklist 90 jours Claude en PME' } },
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
        { href: '/conformite-ia', label: { en: 'AI compliance', fr: 'Conformité IA' } },
        { href: '/contact', label: { en: 'Contact', fr: 'Contact' } },
      ],
    },
    {
      kicker: { en: 'PRESENCE', fr: 'PRÉSENCE' },
      label: { en: 'Presence', fr: 'Présence' },
      items: [
        { href: '/implantations', label: { en: 'Where the studio works', fr: 'Où le studio intervient' } },
        { href: '/implantations/bordeaux', label: { en: 'Bordeaux', fr: 'Bordeaux' } },
        { href: '/implantations/montpellier', label: { en: 'Montpellier', fr: 'Montpellier' } },
        { href: '/implantations/lyon', label: { en: 'Lyon', fr: 'Lyon' } },
        { href: '/implantations/toulouse', label: { en: 'Toulouse', fr: 'Toulouse' } },
        { href: '/implantations/strasbourg', label: { en: 'Strasbourg', fr: 'Strasbourg' } },
        { href: '/implantations/lille', label: { en: 'Lille', fr: 'Lille' } },
        { href: '/implantations/marseille', label: { en: 'Marseille', fr: 'Marseille' } },
        { href: '/implantations/dijon', label: { en: 'Dijon', fr: 'Dijon' } },
        { href: '/implantations/nantes', label: { en: 'Nantes', fr: 'Nantes' } },
        { href: '/implantations/paris', label: { en: 'Paris', fr: 'Paris' } },
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
// page dépubliée, redirigée ou noindex (index /ressources/outils, /demonstrations, /library,
// /agence/cartographie et /plan-du-site n'y figurent pas).
export const FOOTER_COLS: FooterCol[] = [
  // Col 1 : le métier.
  {
    heading: { en: 'Automation and AI', fr: 'Automatisation et IA' },
    items: [
      { href: '/services/automatisations', label: { en: 'Process automation', fr: 'Automatisation des processus' } },
      { href: '/services/automatisation-n8n', label: { en: 'n8n agency', fr: 'Agence n8n' } },
      { href: '/services/automatisation-make', label: { en: 'Make agency', fr: 'Agence Make' } },
      { href: '/services/agents-ia', label: { en: 'AI agents', fr: 'Agents IA' } },
      { href: '/services/agent-support-client', label: { en: 'Customer support agent', fr: 'Agent support client' } },
      { href: '/services/base-de-connaissance-ia', label: { en: 'AI knowledge base', fr: 'Base de connaissance IA' } },
      { href: '/services/integration-claude', label: { en: 'Claude integration', fr: 'Intégration Claude' } },
      { href: '/services/applications-internes', label: { en: 'Business applications', fr: 'Applications métier' } },
      { href: '/services/donnees-reporting', label: { en: 'Data and reporting', fr: 'Données et reporting' } },
      { href: '/services/consultant-ia-claude', label: { en: 'AI consultant', fr: 'Consultant IA' } },
      { href: '/services/systeme-commercial', label: { en: 'Sales tooling', fr: 'Outils commerciaux' } },
      { href: '/services/prospection-automatisee', label: { en: 'Automated prospecting, overview', fr: "Prospection automatisée, vue d'ensemble" } },
      { href: '/services/crm-scoring-routing', label: { en: 'CRM, scoring and routing', fr: 'CRM, scoring et routing' } },
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
      { href: '/cas-usages/support-sav', label: { en: 'Customer service and after-sales', fr: 'Service client et SAV' } },
      { href: '/cas-usages/finance-comptabilite', label: { en: 'Finance and accounting', fr: 'Finance et comptabilité' } },
      { href: '/cas-usages/rh', label: { en: 'Human resources', fr: 'Ressources humaines' } },
      { href: '/formations', label: { en: 'Training', fr: 'Formations' } },
      { href: '/ressources/outils/calculateur-roi-ia', label: { en: 'AI ROI calculator', fr: 'Calculateur ROI IA' } },
      { href: '/ressources/diagnostics/maturite-ia', label: { en: 'AI maturity diagnostic', fr: 'Diagnostic maturité IA' } },
      { href: AUDIT_BOOKING_HREF, label: { en: AUDIT_BOOKING_LABEL.en, fr: AUDIT_BOOKING_LABEL.fr } },
    ],
  },
  // Col 3 : le site web, le référencement et la marque (le web n'est plus « en appui »).
  {
    heading: { en: 'Website, SEO and brand', fr: 'Site web, SEO et marque' },
    items: [
      { href: '/services/systeme-acquisition', label: { en: 'Website, search and brand', fr: 'Site, référencement et marque' } },
      { href: '/services/site-web-ia', label: { en: 'Web agency', fr: 'Agence site web' } },
      { href: '/services/seo-geo-contenu', label: { en: 'SEO and organic search agency', fr: 'Agence SEO et référencement naturel' } },
      { href: '/services/branding', label: { en: 'Branding agency', fr: 'Agence de branding' } },
    ],
  },
  // Col 4 : le studio, les preuves, les ressources.
  {
    heading: { en: 'The studio', fr: 'Le studio' },
    items: [
      { href: '/agence', label: { en: 'About Waimia', fr: 'À propos' } },
      { href: '/equipe/simon-beros', label: { en: 'Simon Beros, founder', fr: 'Simon Beros, fondateur' } },
      { href: '/manifesto', label: { en: 'Manifesto', fr: 'Manifeste' } },
      { href: '/conformite-ia', label: { en: 'AI compliance', fr: 'Conformité IA' } },
      { href: '/cas-clients', label: { en: 'Work', fr: 'Réalisations' } },
      { href: '/blog', label: { en: 'Blog', fr: 'Blog' } },
      { href: '/ressources', label: { en: 'Resources', fr: 'Ressources' } },
      { href: '/implantations/bordeaux', label: { en: 'Bordeaux', fr: 'Bordeaux' } },
      { href: '/implantations/montpellier', label: { en: 'Montpellier', fr: 'Montpellier' } },
      { href: '/implantations/lyon', label: { en: 'Lyon', fr: 'Lyon' } },
      { href: '/implantations/toulouse', label: { en: 'Toulouse', fr: 'Toulouse' } },
      { href: '/implantations/strasbourg', label: { en: 'Strasbourg', fr: 'Strasbourg' } },
      { href: '/implantations/lille', label: { en: 'Lille', fr: 'Lille' } },
      { href: '/implantations/marseille', label: { en: 'Marseille', fr: 'Marseille' } },
      { href: '/implantations/dijon', label: { en: 'Dijon', fr: 'Dijon' } },
      { href: '/implantations/nantes', label: { en: 'Nantes', fr: 'Nantes' } },
      { href: '/implantations/paris', label: { en: 'Paris', fr: 'Paris' } },
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

// Pied de page servi (refonte 2026-10 · O12) : hubs et pages prioritaires seulement. Le menu
// porte déjà le détail des offres sur chaque page ; FOOTER_COLS reste la liste longue du pied
// (plan du site). Pages retirées du pied, toujours atteignables : les autres villes par le
// hub /implantations (10 villes), /manifesto et /conformite-ia par /agence, les offres par
// le menu et /services. Libellés repris de FOOTER_COLS (une seule source par href).
const footerItem = (href: string) => {
  for (const col of FOOTER_COLS) {
    const it = col.items.find((i) => i.href === href);
    if (it) return it;
  }
  throw new Error(`FOOTER_LEAN : href absent de FOOTER_COLS (${href})`);
};
export const FOOTER_LEAN: FooterCol[] = [
  {
    heading: { en: 'Automation and AI', fr: 'Automatisation et IA' },
    items: [
      { href: '/services/systemes-operationnels-ia', label: { en: 'Automation and AI agents', fr: 'Automatisation et agents IA' } },
      footerItem('/services/systeme-commercial'),
      footerItem('/services/systeme-acquisition'),
      { href: '/services', label: { en: 'All services', fr: 'Tous les services' } },
    ],
  },
  {
    heading: { en: 'Getting started', fr: 'Démarrer' },
    items: [
      footerItem('/audit-ia-pme'),
      footerItem(AUDIT_BOOKING_HREF),
      footerItem('/tarifs'),
      footerItem('/formations'),
    ],
  },
  {
    heading: { en: 'The studio', fr: 'Le studio' },
    items: [
      footerItem('/agence'),
      footerItem('/cas-clients'),
      footerItem('/ressources'),
      footerItem('/blog'),
      { href: '/implantations', label: { en: 'Locations', fr: 'Implantations' } },
      footerItem('/implantations/bordeaux'),
      footerItem('/implantations/lyon'),
      footerItem('/implantations/paris'),
      footerItem('/implantations/montpellier'),
      footerItem('/contact'),
    ],
  },
];

// ─── TRUST BADGES
export type TrustBadge = { k: string; label: BiText; kind: 'partner' | 'cert' | 'compliance'; href?: string };
// P0.2-D · badges de certification/conformité non détenus retirés (risque légal :
// Claude Certified Architect, AI Act ready, RGPD, ISO 27001 alignée = claims non prouvés).
// Conservés : partenariats/labels publics vérifiables uniquement.
export const TRUST_BADGES: TrustBadge[] = [
  { k: 'FRANCENUM', kind: 'partner', href: 'https://www.francenum.gouv.fr/activateurs/beros-simon', label: { en: 'France Num · AI & digital expert', fr: 'Activateur France Num · expert IA' } },
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
  { k: '01', n: '45 min', label: { en: 'free audit to pinpoint the lever', fr: "d'audit gratuit pour cibler le levier" } },
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
    items: ['Audit IA gratuit · 45 min', 'Sprint de cadrage · 10 h', 'Formation équipe'],
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
