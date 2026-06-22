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
   * (aria-current). Ex. Solutions absorbe les pages `/offres/*` depuis la
   * fusion R3 : sans ça, naviguer dans `/offres/*` ne surlignerait plus aucun
   * trigger top-level (le hub `/offres` n'est plus une entrée).
   */
  matchPrefixes?: string[];
  lead?: BiText;
  columns: MegaMenuColumn[];
  featured?: MegaMenuFeatured;
}

function mapLegacyFeatured(featured: LegacyFeaturedCard): MegaMenuFeatured {
  return {
    kicker: featured.kicker,
    label: featured.label,
    body: featured.body,
    cta: featured.cta,
    href: featured.href,
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
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Diagnostic Site Web Intelligent', en: 'Smart website diagnostic' },
          href: '/ressources/diagnostics/site-web-intelligent',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
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
  featured: MM_RESOURCES.featured ? mapLegacyFeatured(MM_RESOURCES.featured) : undefined,
};

// ─── SOLUTIONS · reframe v7 par OFFRE (strategy/10 §4) : on abandonne le cadrage
// piliers Acquérir/Piloter/Opérer dans la nav publique (strategy/10 l.17). 3 colonnes :
// Site Web Intelligent (offre + services qui la composent) · Intégration Claude (flagship
// SEO #1) · Audits & offres (par où commencer). Liens 100% réels + indexables (4 services
// noindex:false + 2 offres réelles). Featured = Growth System IA. matchPrefixes conserve
// l'état actif sur /services, /offres et les piliers (encore vivants jusqu'à V0.3).
const SOLUTIONS: MegaMenuSection = {
  parent: 'solutions',
  label: { fr: 'Solutions', en: 'Solutions' },
  parentHref: '/offres',
  matchPrefixes: ['/services', '/offres', '/acquerir', '/piloter', '/operer'],
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
          label: { fr: 'Content marketing intelligent', en: 'Smart content marketing' },
          href: '/services/content-marketing-intelligent',
          description: { fr: 'Une machine éditoriale trouvée par Google ET les IA.', en: 'An editorial machine found by Google AND AI.' },
        },
        {
          label: { fr: 'GEO', en: 'GEO' },
          href: '/services/geo',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'SEO IA', en: 'AI SEO' },
          href: '/services/seo-ia',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'CRM intelligent', en: 'Smart CRM' },
          href: '/services/crm-intelligent',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Lead scoring IA', en: 'AI lead scoring' },
          href: '/services/lead-scoring-ia',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
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
          description: { fr: 'Agents IA branchés sur vos outils via MCP, conçus et supervisés.', en: 'AI agents wired to your tools via MCP, built and supervised.' },
          badge: { fr: 'Offre phare', en: 'Flagship' },
        },
        {
          label: { fr: 'Intégrateur Claude Code', en: 'Claude Code integrator' },
          href: '/services/integrateur-claude-code',
          description: { fr: 'Claude Code dans vos dépôts : hooks, guardrails et revue assistée.', en: 'Claude Code in your repos: hooks, guardrails and assisted review.' },
        },
        {
          label: { fr: 'Consultant Claude', en: 'Claude consultant' },
          href: '/services/consultant-claude',
        },
        {
          label: { fr: 'Référent IA', en: 'AI lead' },
          href: '/services/referent-ia',
          description: { fr: 'Formez la personne qui pilote l\'IA en interne et rend vos équipes autonomes.', en: 'Train the person who drives AI in-house and makes your teams autonomous.' },
        },
        {
          label: { fr: 'Agents IA', en: 'AI agents' },
          href: '/services/agents-ia',
          description: { fr: 'Des agents autonomes qui exécutent vos tâches répétitives, sous supervision.', en: 'Autonomous agents that carry out your repetitive tasks, under supervision.' },
        },
        {
          label: { fr: 'Gouvernance IA', en: 'AI governance' },
          href: '/services/gouvernance-ia',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
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
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Réduire le temps dans le CMS', en: 'Cut time in the CMS' },
          href: '/cas-usages/reduire-temps-cms',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Centraliser les données', en: 'Centralize data' },
          href: '/cas-usages/centraliser-donnees',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Réduire le reporting', en: 'Reduce reporting' },
          href: '/cas-usages/reduire-reporting',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Standardiser les processus', en: 'Standardize processes' },
          href: '/cas-usages/standardiser-processus',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
    },
    {
      kicker: { fr: 'PAR OÙ COMMENCER', en: 'WHERE TO START' },
      title: { fr: 'Audits', en: 'Audits' },
      goal: { fr: 'Une entrée plus simple qu\'un projet complet', en: 'An easier entry than a full project' },
      links: [
        {
          label: { fr: 'Audit IA PME', en: 'SME AI audit' },
          href: '/audit-ia-pme',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Audit Site Web Intelligent', en: 'Smart website audit' },
          href: '/audit-site-web-intelligent',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Diagnostic maturité IA', en: 'AI maturity diagnostic' },
          href: '/ressources/diagnostics/maturite-ia',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Diagnostic Site Web Intelligent', en: 'Smart website diagnostic' },
          href: '/ressources/diagnostics/site-web-intelligent',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
      footer: {
        label: { fr: 'Réserver un audit →', en: 'Book an audit →' },
        href: '/contact',
      },
    },
  ],
  featured: {
    kicker: { fr: 'OFFRE VEDETTE', en: 'FLAGSHIP OFFER' },
    label: { fr: 'Growth System IA', en: 'AI Growth System' },
    body: {
      fr: 'Le système complet d\'acquisition et de conversion, automatisé de bout en bout.',
      en: 'The complete acquisition and conversion system, automated end to end.',
    },
    cta: { fr: 'Découvrir l\'offre →', en: 'Explore the offer →' },
    href: '/offres/growth-system-ia',
    image: '/images/besoins/besoin-acquerir.webp',
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
        { label: { fr: 'Conseil', en: 'Consulting' }, href: '/secteurs/conseil', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Comptabilité', en: 'Accounting' }, href: '/secteurs/comptabilite', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Agence', en: 'Agency' }, href: '/secteurs/agence', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Industrie', en: 'Industry' }, href: '/secteurs/industrie', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Formation', en: 'Training' }, href: '/secteurs/formation', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'ESN', en: 'IT services firm' }, href: '/secteurs/esn', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
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
    {
      kicker: { fr: 'PREUVES & DÉMOS', en: 'PROOF & DEMOS' },
      title: { fr: 'Preuves & démonstrations', en: 'Proof & demos' },
      goal: { fr: 'Voir le système en action', en: 'See the system in action' },
      links: [
        { label: { fr: 'Démo Site Web Intelligent', en: 'Smart website demo' }, href: '/demonstrations/site-web-intelligent', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Démo Intégration Claude', en: 'Claude integration demo' }, href: '/demonstrations/integration-claude', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
        { label: { fr: 'Avant / Après', en: 'Before / After' }, href: '/demonstrations/avant-apres', soon: true, badge: { fr: 'À venir', en: 'Soon' } },
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
          href: '/methode/process-intelligence',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Notre approche', en: 'Our approach' },
          href: '/agence/methode',
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
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Stack & technologies', en: 'Stack & technologies' },
          href: '/technologies',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
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
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'France entière', en: 'All of France' },
          href: '/implantations',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Bordeaux', en: 'Bordeaux' },
          href: '/implantations/bordeaux',
          soon: true,
          badge: { fr: 'À venir', en: 'Soon' },
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
