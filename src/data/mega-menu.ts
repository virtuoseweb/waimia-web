// Waimia · structure mega-menu V3 simplifiée (2026-05-17)
// Ressources et Agence sont explicitement définies ici.
// Les autres sections restent mappées depuis sitemap.ts pour conserver le contenu validé.

import type { Lang } from '../lib/i18n';
import {
  MM_RESOURCES,
  type FeaturedCard as LegacyFeaturedCard,
} from './sitemap';

export type BiText = Record<Lang, string>;

export interface MegaMenuLink {
  label: BiText;
  href: string;
  description?: BiText;
  /**
   * Pill discret aligné à droite de la ligne d'item (« Offre phare ») pour
   * relever les offres phares du listing (correction Simon 2026-06). Rendu
   * dans le mega panel desktop ET le sheet mobile.
   */
  badge?: BiText;
  featured?: boolean;
  /**
   * Lien « à venir » : la page cible n'existe pas encore (architecture v7 exposée
   * avant construction, strategy/11 §8). Rendu NON-cliquable (span, pas <a>) pour
   * 0 lien mort / 0 lien crawlable vers 404. Affiché grisé + badge « À venir ».
   */
  soon?: boolean;
}

export interface MegaMenuColumn {
  title: BiText;
  kicker?: BiText;
  /**
   * Hiérarchie « par besoin » (refonte mega menu 2026-06, maquette Simon) :
   * `goal` = le but en mono caps accent sous le titre (« Trouver des clients »),
   * `quote` = citation prospect en italique serif avec barre accent.
   * Une colonne qui porte `goal` ou `quote` est rendue en mode hiérarchique
   * (titre serif grand + listing flèches/hairlines, descriptions non rendues).
   * Pas de badge au niveau colonne (retiré, correction Simon 2026-06 : il
   * désalignait les 3 titres) ; les offres phares = `badge` sur le LIEN.
   */
  goal?: BiText;
  quote?: BiText;
  links: MegaMenuLink[];
  footer?: MegaMenuLink;
  tint?: string;
}

export interface MegaMenuFeatured {
  kicker: BiText;
  label: BiText;
  body: BiText;
  cta: BiText;
  href: string;
  /**
   * Visuel optionnel du bloc featured (chemin public/). Sans `image`, le
   * cadre `.img` reste rendu tel quel (parité DOM avec les panels existants).
   */
  image?: string;
}

export interface MegaMenuSection {
  parent: string;
  label: BiText;
  parentHref?: string;
  /**
   * Préfixes d'URL additionnels qui marquent cette section comme active
   * (aria-current). Refonte v7 : le hub /offres et l'arbo 3-piliers
   * (/acquerir, /piloter, /operer) sont supprimés ; Solutions = /services.
   */
  matchPrefixes?: string[];
  lead?: BiText;
  columns: MegaMenuColumn[];
  featured?: MegaMenuFeatured;
}

function mapLegacyFeatured(featured: LegacyFeaturedCard, image?: string): MegaMenuFeatured {
  return {
    kicker: featured.kicker,
    label: featured.label,
    body: featured.body,
    cta: featured.cta,
    href: featured.href,
    ...(image ? { image } : {}),
  };
}

const RESSOURCES: MegaMenuSection = {
  parent: 'ressources',
  label: MM_RESOURCES.label,
  parentHref: MM_RESOURCES.href,
  matchPrefixes: ['/ressources', '/blog'],
  lead: {
    fr: 'Éduquer, qualifier, capter. Des contenus pour décideurs PME B2B.',
    en: 'Educate, qualify, capture. Content for B2B SME decision-makers.',
  },
  columns: [
    {
      kicker: { fr: 'LIRE', en: 'READING' },
      title: { fr: 'Lire', en: 'Reading' },
      links: [
        {
          label: { fr: 'Blog', en: 'Blog' },
          href: '/ressources/blog',
          description: {
            fr: 'Insights business pour PME B2B.',
            en: 'Business insights for B2B SMEs.',
          },
          featured: true,
        },
        {
          label: { fr: 'Guides', en: 'Guides' },
          href: '/ressources/guides',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Comparatifs', en: 'Comparisons' },
          href: '/ressources/comparatifs',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
      footer: {
        label: { fr: 'Toutes les ressources →', en: 'All resources →' },
        href: '/ressources',
      },
    },
    {
      kicker: { fr: 'DIAGNOSTICS', en: 'DIAGNOSTICS' },
      title: { fr: 'Diagnostics', en: 'Diagnostics' },
      links: [
        {
          label: { fr: 'Diagnostic maturité IA', en: 'AI maturity diagnostic' },
          href: '/ressources/diagnostics/maturite-ia',
        },
        {
          label: { fr: 'Diagnostic Site Web Intelligent', en: 'Smart website diagnostic' },
          href: '/ressources/diagnostics/site-web-intelligent',
        },
        {
          label: { fr: 'Diagnostic Claude PME', en: 'Claude SME diagnostic' },
          href: '/ressources/diagnostics/claude-pme',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Diagnostic Référent IA', en: 'AI lead diagnostic' },
          href: '/ressources/diagnostics/referent-ia',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
    },
    {
      kicker: { fr: 'OUTILS', en: 'TOOLS' },
      title: { fr: 'Outils', en: 'Tools' },
      links: [
        {
          label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' },
          href: '/ressources/outils/calculateur-roi-ia',
          description: {
            fr: 'Estimez le retour de vos chantiers IA.',
            en: 'Estimate the return of your AI projects.',
          },
        },
        {
          label: { fr: 'Score maturité IA', en: 'AI maturity score' },
          href: '/ressources/outils/score-maturite-ia',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Checklist déploiement Claude', en: 'Claude deployment checklist' },
          href: '/ressources/guides/checklist-deploiement-claude',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
      footer: {
        label: { fr: 'Catalogue outils →', en: 'Tools catalog →' },
        href: '/ressources/outils',
      },
    },
    {
      kicker: { fr: 'LES PLUS CONSULTÉS', en: 'MOST READ' },
      title: { fr: 'Les plus consultés', en: 'Most read' },
      links: [
        {
          label: { fr: 'Claude vs ChatGPT PME', en: 'Claude vs ChatGPT for SMEs' },
          href: '/ressources/comparatifs/claude-vs-chatgpt-pme',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'GEO vs SEO', en: 'GEO vs SEO' },
          href: '/ressources/comparatifs/geo-vs-seo',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Site Web Intelligent vs WordPress', en: 'Smart website vs WordPress' },
          href: '/ressources/comparatifs/site-web-intelligent-vs-wordpress',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Claude Code vs Cursor', en: 'Claude Code vs Cursor' },
          href: '/ressources/comparatifs/claude-code-vs-cursor',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
    },
  ],
  // Image featured distincte par méga-menu (décoration, demande Simon 2026-06) :
  // RESSOURCES = visuel éditorial.
  featured: MM_RESOURCES.featured
    ? mapLegacyFeatured(MM_RESOURCES.featured, '/images/editorial/image-style-12.webp')
    : undefined,
};

// ─── SOLUTIONS · refonte Phase 1 V7-FOLD 2026-06-22 : on REDUIT le nombre de pages
// service. Les sous-capacités ne sont plus des pages satellites mais des sections
// `feature-zigzag` DANS leur page parente. 4 colonnes : Site web intelligent (3 pages :
// site-web-intelligent, landing-page-scoring, maintenance-growth) · Intégration Claude
// (3 pages : integrateur-claude, consultant-ia-claude, agents-ia) · Résoudre un problème
// (cas-usages, soon). La colonne Audits est supprimée → le panneau featured devient le
// PANNEAU AUDIT (image stylée + CTA bouton vers /contact). Les ex-satellites (geo, seo-ia, crm-intelligent,
// lead-scoring-ia, integrateur-claude-code, referent-ia, gouvernance-ia) sont repliés en
// sections et retirés de la nav. content-marketing-intelligent reste une page indexée,
// atteinte depuis la brique « Content Marketing » de site-web-intelligent (hors nav).
// Liens cols 1-2 = 100% réels + indexables. Featured = Growth System IA.
const SOLUTIONS: MegaMenuSection = {
  parent: 'solutions',
  label: { fr: 'Solutions', en: 'Solutions' },
  parentHref: '/services',
  matchPrefixes: ['/services'],
  lead: {
    fr: 'Deux offres porteuses, les services qui les composent, et l\'audit pour savoir par où commencer.',
    en: 'Two flagship offers, the services that compose them, and the audit to know where to start.',
  },
  columns: [
    {
      kicker: { fr: 'SITE WEB INTELLIGENT', en: 'SMART WEBSITE' },
      title: { fr: 'Site web intelligent', en: 'Smart website' },
      goal: { fr: 'Générer plus de leads, alléger le marketing', en: 'Generate more leads, lighten marketing' },
      links: [
        {
          label: { fr: 'Site web intelligent', en: 'Smart website' },
          href: '/services/site-web-intelligent',
          description: { fr: 'Application web pilotée par l\'IA : SEO, analytics et CRM branchés.', en: 'AI-driven web app: SEO, analytics and CRM wired in.' },
          badge: { fr: 'Offre phare', en: 'Flagship' },
        },
        {
          label: { fr: 'Tunnel de qualification intelligent', en: 'Smart qualification funnel' },
          href: '/services/landing-page-scoring',
          description: { fr: 'Landing pages qui convertissent et scoring qui priorise vos leads.', en: 'Landing pages that convert and scoring that prioritises your leads.' },
        },
        {
          label: { fr: 'Maintenance & growth', en: 'Maintenance & growth' },
          href: '/services/maintenance-growth',
          description: { fr: 'Faire vivre et croître le site après la mise en ligne, au forfait.', en: 'Keep the site alive and growing after launch, on a retainer.' },
        },
      ],
      footer: {
        label: { fr: 'Découvrir l\'offre →', en: 'Explore the offer →' },
        href: '/services/site-web-intelligent',
      },
    },
    {
      kicker: { fr: 'INTÉGRATION CLAUDE', en: 'CLAUDE INTEGRATION' },
      title: { fr: 'Intégration Claude', en: 'Claude integration' },
      goal: { fr: 'Standardiser, gagner du temps, exploiter le savoir', en: 'Standardize, save time, leverage knowledge' },
      links: [
        {
          label: { fr: 'Intégrateur Claude', en: 'Claude integrator' },
          href: '/services/integrateur-claude',
          description: { fr: 'Claude en entreprise, Claude Code, gouvernance et formation, en production.', en: 'Claude in the enterprise, Claude Code, governance and training, in production.' },
          badge: { fr: 'Offre phare', en: 'Flagship' },
        },
        {
          label: { fr: 'Consultant IA Claude', en: 'Claude AI consultant' },
          href: '/services/consultant-ia-claude',
          description: { fr: 'Auditer, cadrer et prioriser vos cas d\'usage IA, puis les faire adopter.', en: 'Audit, frame and prioritise your AI use cases, then drive adoption.' },
        },
        {
          label: { fr: 'Agents IA', en: 'AI agents' },
          href: '/services/agents-ia',
          description: { fr: 'Des agents autonomes branchés à vos outils via MCP, sous supervision.', en: 'Autonomous agents wired to your tools via MCP, under supervision.' },
        },
      ],
      footer: {
        label: { fr: 'Voir le service →', en: 'See the service →' },
        href: '/services/integrateur-claude',
      },
    },
    {
      kicker: { fr: 'RÉSOUDRE UN PROBLÈME', en: 'SOLVE A PROBLEM' },
      title: { fr: 'Résoudre un problème', en: 'Solve a problem' },
      goal: { fr: 'Vous ne savez pas quel service choisir ?', en: 'Not sure which service to pick?' },
      links: [
        {
          label: { fr: 'Générer plus de leads', en: 'Generate more leads' },
          href: '/cas-usages/generer-plus-de-leads',
        },
        {
          label: { fr: 'Réduire le temps dans le CMS', en: 'Cut time in the CMS' },
          href: '/cas-usages/reduire-temps-cms',
        },
        {
          label: { fr: 'Standardiser les processus', en: 'Standardize processes' },
          href: '/cas-usages/standardiser-processus',
        },
        {
          label: { fr: 'Réserver un audit', en: 'Book an audit' },
          href: '/contact',
        },
      ],
      // V7-FOLD 2026-06-22 : 3 problèmes pour équilibrer avec les colonnes 1-2
      // (3 liens + footer). Footer « Voir tous les problèmes » en soon (le hub
      // /cas-usages n'existe pas encore, Phase B) → non-cliquable, 0 lien mort.
      footer: {
        label: { fr: 'Voir tous les problèmes →', en: 'See all problems →' },
        href: '/cas-usages',
      },
    },
  ],
  // Featured Solutions (Simon 2026-06) : on met en avant l'offre apex « Système
  // complet » (inbound + outbound piloté). L'audit gratuit n'est PLUS le featured
  // mais reste accessible via le lien « Réserver un audit » → /contact ajouté en
  // fin de la colonne « Résoudre un problème ». Image distincte par méga-menu.
  featured: {
    kicker: { fr: 'L\'OFFRE COMPLÈTE', en: 'THE COMPLETE OFFER' },
    label: { fr: 'Système complet', en: 'Complete system' },
    body: {
      fr: 'La machine inbound + outbound, pilotée. Packs sur devis à tarif dégressif.',
      en: 'The inbound + outbound machine, managed. Packs on quote with degressive pricing.',
    },
    cta: { fr: 'Découvrir le système →', en: 'Explore the system →' },
    href: '/services/systeme-complet',
    image: '/images/besoins/besoin-piloter.webp',
  },
};

// ─── CAS CLIENTS · v7 (strategy/10 §4) : les /secteurs/* (noindex placeholders) QUITTENT
// le menu (directive v7) → 1 colonne « Études de cas » vers les 5 cas RÉELS indexables.
// Featured corrigé : l'ancien « premiers cas en préparation » était FAUX (5 cas existent,
// E-E-A-T) → cas vedette Amploi (impact sourcé de son frontmatter). matchPrefixes = /cas-clients.
const CAS: MegaMenuSection = {
  parent: 'cas',
  label: { fr: 'Cas clients', en: 'Case studies' },
  parentHref: '/cas-clients',
  matchPrefixes: ['/cas-clients', '/secteurs', '/etudes-de-cas'],
  lead: {
    fr: 'Rassurer par secteur, par résultat et par la preuve. ROI mesuré sur vos données, jamais inventé.',
    en: 'Reassurance by industry, by result and by proof. ROI measured on your data, never invented.',
  },
  columns: [
    {
      kicker: { fr: 'PAR SECTEUR', en: 'BY INDUSTRY' },
      title: { fr: 'Par secteur', en: 'By industry' },
      goal: { fr: 'La preuve par votre métier', en: 'Proof from your industry' },
      links: [
        { label: { fr: 'Conseil', en: 'Consulting' }, href: '/secteurs/conseil' },
        { label: { fr: 'Comptabilité', en: 'Accounting' }, href: '/secteurs/comptabilite' },
        { label: { fr: 'Agence', en: 'Agency' }, href: '/secteurs/agence' },
        { label: { fr: 'Industrie', en: 'Industry' }, href: '/secteurs/industrie' },
        { label: { fr: 'Formation', en: 'Training' }, href: '/secteurs/formation' },
        { label: { fr: 'ESN', en: 'IT services firm' }, href: '/secteurs/esn' },
      ],
      footer: {
        label: { fr: 'Tous les secteurs →', en: 'All industries →' },
        href: '/secteurs',
      },
    },
    {
      kicker: { fr: 'ÉTUDES DE CAS', en: 'CASE STUDIES' },
      title: { fr: 'Études de cas', en: 'Case studies' },
      goal: { fr: 'Cinq cas réels, résultats mesurés', en: 'Five real cases, measured results' },
      links: [
        { label: { fr: 'Toutes les études de cas', en: 'All case studies' }, href: '/cas-clients', description: { fr: 'Cinq cas réels, ROI mesuré sur les données du client.', en: 'Five real cases, ROI measured on client data.' } },
        { label: { fr: 'Site Web Intelligent', en: 'Smart website' }, href: '/etudes-de-cas/site-web-intelligent', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Intégration Claude', en: 'Claude integration' }, href: '/etudes-de-cas/integration-claude', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
      ],
    },
    {
      kicker: { fr: 'RÉSULTATS OBTENUS', en: 'RESULTS' },
      title: { fr: 'Résultats obtenus', en: 'Results achieved' },
      goal: { fr: 'Trier par ce que vous cherchez', en: 'Sort by what you need' },
      links: [
        { label: { fr: 'Plus de leads', en: 'More leads' }, href: '/etudes-de-cas/resultats/plus-de-leads', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Réduction du temps marketing', en: 'Less marketing time' }, href: '/etudes-de-cas/resultats/reduction-temps-marketing', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Centralisation des données', en: 'Data centralization' }, href: '/etudes-de-cas/resultats/centralisation-donnees', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Automatisation des processus', en: 'Process automation' }, href: '/etudes-de-cas/resultats/automatisation-processus', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Meilleure qualification commerciale', en: 'Better sales qualification' }, href: '/etudes-de-cas/resultats/qualification-commerciale', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
      ],
    },
  ],
  featured: {
    kicker: { fr: 'CAS VEDETTE', en: 'FEATURED CASE' },
    label: { fr: 'Amploi', en: 'Amploi' },
    body: {
      fr: 'Site marketing IA-ready livré en 6 semaines : CRM HubSpot intégré et couche GEO/AIO en production.',
      en: 'AI-ready marketing site delivered in 6 weeks: HubSpot CRM integrated and a GEO/AIO layer in production.',
    },
    cta: { fr: 'Lire le cas →', en: 'Read the case →' },
    href: '/cas-clients/amploi',
    image: '/images/cas/cas-northbound.webp',
  },
};

// ─── L'AGENCE · structure conservée, élaguée + ajouts (R3 §3) :
// retirés du menu : Hero Lab, DS Studio, Espace client, Newsletter.
// ajoutés : Manifesto, Console, Atlas (nouvelle colonne « Manifeste & démos »).
const AGENCE: MegaMenuSection = {
  parent: 'agence',
  label: { fr: "L'Agence", en: 'The Agency' },
  parentHref: '/agence',
  lead: {
    fr: 'Un studio solo basé à Montpellier. Une méthode anti-théâtre, des livrables signés.',
    en: 'A solo studio based in Montpellier. An anti-theatre method, with signed deliverables.',
  },
  columns: [
    {
      kicker: { fr: "L'ÉQUIPE", en: 'THE TEAM' },
      title: { fr: 'Qui nous sommes', en: 'Who we are' },
      links: [
        {
          label: { fr: 'À propos de Waimia', en: 'About Waimia' },
          href: '/agence/about',
        },
        {
          label: { fr: 'Notre méthode · Process Intelligence', en: 'Our method · Process Intelligence' },
          href: '/agence/methode',
          description: {
            fr: 'Audit, déploiement, mesure, pas de PowerPoint.',
            en: 'Audit, deployment, measurement, no PowerPoint.',
          },
          featured: true,
        },
        {
          label: { fr: 'Simon Beros · Fondateur', en: 'Simon Beros · Founder' },
          href: '/equipe/simon-beros',
          description: {
            fr: 'Architecture systèmes agentiques.',
            en: 'Agentic systems architecture.',
          },
        },
      ],
    },
    {
      kicker: { fr: 'VISION', en: 'VISION' },
      title: { fr: 'Notre vision', en: 'Our vision' },
      links: [
        {
          label: { fr: 'Manifesto', en: 'Manifesto' },
          href: '/manifesto',
          description: {
            fr: 'Une IA opérationnelle, pas du théâtre.',
            en: 'Operational AI, not theatre.',
          },
          featured: true,
        },
        {
          label: { fr: 'Process Intelligence', en: 'Process Intelligence' },
          href: '/agence/methode',
          description: {
            fr: 'Cartographie, priorisation, câblage : la méthode anti-théâtre.',
            en: 'Mapping, prioritisation, wiring: the anti-theatre method.',
          },
        },
      ],
    },
    {
      kicker: { fr: 'ÉCOSYSTÈME', en: 'ECOSYSTEM' },
      title: { fr: 'Écosystème', en: 'Ecosystem' },
      links: [
        {
          label: { fr: 'Partenaires technologiques', en: 'Technology partners' },
          href: '/partenaires',
          description: {
            fr: 'L\'écosystème que nous intégrons, sans vous enfermer.',
            en: 'The ecosystem we integrate, without lock-in.',
          },
        },
        {
          label: { fr: 'Stack & technologies', en: 'Stack & technologies' },
          href: '/technologies',
          description: {
            fr: 'Claude, Astro, Vercel, vos outils métier : la stack par couche.',
            en: 'Claude, Astro, Vercel, your business tools: the stack by layer.',
          },
        },
        {
          label: { fr: 'Expertise Claude', en: 'Claude expertise' },
          href: '/services/integrateur-claude',
          description: {
            fr: 'Anthropic-first : un modèle par tâche.',
            en: 'Anthropic-first: one model per task.',
          },
        },
      ],
    },
    {
      kicker: { fr: 'PRÉSENCE', en: 'PRESENCE' },
      title: { fr: 'Présence', en: 'Presence' },
      links: [
        {
          label: { fr: 'Montpellier', en: 'Montpellier' },
          href: '/implantations/montpellier',
        },
        {
          label: { fr: 'France entière', en: 'All of France' },
          href: '/implantations',
        },
        {
          label: { fr: 'Bordeaux', en: 'Bordeaux' },
          href: '/implantations/bordeaux',
        },
      ],
      footer: {
        label: { fr: 'Réserver un audit →', en: 'Book an audit →' },
        href: '/contact',
      },
    },
  ],
  featured: {
    kicker: { fr: 'ANCRAGE', en: 'LOCATION' },
    label: { fr: 'Montpellier · France', en: 'Montpellier · France' },
    body: {
      fr: 'Un studio solo. Une seule méthode. Interlocuteur direct, pas un comité.',
      en: 'A solo studio. One method. A direct contact, not a committee.',
    },
    cta: { fr: 'Découvrir le studio →', en: 'Discover the studio →' },
    href: '/agence/about',
    image: '/images/besoins/besoin-operer.webp',
  },
};

export const MEGA_MENU: MegaMenuSection[] = [
  SOLUTIONS,
  CAS,
  RESSOURCES,
  AGENCE,
];

export function getMegaMenuSection(parent: string): MegaMenuSection | undefined {
  return MEGA_MENU.find((section) => section.parent === parent);
}
