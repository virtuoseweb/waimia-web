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
  lead: MM_RESOURCES.lead,
  // Méga-menu V1 (§0ter) : Blog · Outils (calculateur ROI) · Academy.
  // Retirés : Newsletter, Cas clients (hors périmètre Ressources V1),
  // livres-blancs, veille-ia, cookbooks, VirtuoseOS (pages supprimées).
  columns: [
    {
      kicker: { fr: 'LECTURES', en: 'READING' },
      title: { fr: 'Lectures', en: 'Reading' },
      links: [
        {
          label: { fr: 'Blog', en: 'Blog' },
          href: '/ressources/blog',
          description: {
            fr: 'Insights business pour PME B2B.',
            en: 'Business insights for B2B SMBs.',
          },
          featured: true,
        },
        {
          label: { fr: 'Academy', en: 'Academy' },
          href: '/ressources/academy',
          description: {
            fr: 'Diagnostic maturité IA en 6 questions.',
            en: 'AI maturity diagnostic in 6 questions.',
          },
        },
      ],
      footer: {
        label: { fr: 'Tous les contenus →', en: 'All content →' },
        href: '/ressources',
      },
    },
    {
      kicker: { fr: 'PRATIQUE', en: 'PRACTICE' },
      title: { fr: 'Pratique', en: 'Practice' },
      links: [
        {
          label: { fr: 'Outils', en: 'Tools' },
          href: '/ressources/outils',
          description: {
            fr: 'Calculateurs, checklists, templates.',
            en: 'Calculators, checklists, templates.',
          },
        },
        {
          label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' },
          href: '/ressources/outils/calculateur-roi-ia',
          description: {
            fr: 'Estimez le retour de vos chantiers IA.',
            en: 'Estimate the return of your AI projects.',
          },
        },
      ],
      footer: {
        label: { fr: 'Catalogue outils →', en: 'Tools catalog →' },
        href: '/ressources/outils',
      },
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
      goal: { fr: 'Être trouvé et convertir', en: 'Get found and convert' },
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
          label: { fr: 'Tunnel de conversion intelligent', en: 'Smart conversion funnel' },
          href: '/services/tunnel-conversion-intelligent',
          description: { fr: 'De la visite au contrat signé, chaque palier mesuré.', en: 'From visit to signed contract, every stage measured.' },
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
      goal: { fr: 'Des agents IA sur vos outils', en: 'AI agents on your tools' },
      quote: {
        fr: '"Je veux automatiser mes workflows métier, sans POC qui dort."',
        en: '"I want to automate my business workflows, no POC left to rot."',
      },
      links: [
        {
          label: { fr: 'Intégrateur Claude Code', en: 'Claude Code integrator' },
          href: '/services/integrateur-claude',
          description: { fr: 'Agents IA branchés sur vos outils via MCP, conçus et supervisés.', en: 'AI agents wired to your tools via MCP, built and supervised.' },
          badge: { fr: 'Offre phare', en: 'Flagship' },
          featured: true,
        },
      ],
      footer: {
        label: { fr: 'Voir le service →', en: 'See the service →' },
        href: '/services/integrateur-claude',
      },
    },
    {
      kicker: { fr: 'PAR OÙ COMMENCER', en: 'WHERE TO START' },
      title: { fr: 'Audits & offres', en: 'Audits & offers' },
      goal: { fr: 'Cadrer avant d\'investir', en: 'Scope before investing' },
      links: [
        {
          label: { fr: 'Audit de maturité IA', en: 'AI maturity audit' },
          href: '/offres/audit-maturite-ia',
          description: { fr: 'Où l\'IA crée de la valeur chez vous, en un diagnostic.', en: 'Where AI creates value for you, in one diagnostic.' },
        },
        {
          label: { fr: 'Toutes les offres', en: 'All offers' },
          href: '/offres',
          description: { fr: 'Le catalogue des systèmes packagés.', en: 'The catalog of packaged systems.' },
        },
      ],
      footer: {
        label: { fr: 'Toutes les offres →', en: 'All offers →' },
        href: '/offres',
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
  matchPrefixes: ['/cas-clients'],
  lead: {
    fr: 'Cinq cas réels, résultats mesurés sur les données du client. Jamais de témoignage mis en scène.',
    en: 'Five real cases, results measured on the client\'s data. Never a staged testimonial.',
  },
  columns: [
    {
      kicker: { fr: 'ÉTUDES DE CAS', en: 'CASE STUDIES' },
      title: { fr: 'Études de cas', en: 'Case studies' },
      goal: { fr: 'La preuve par les résultats', en: 'Proof by results' },
      links: [
        { label: { fr: 'Amploi · site marketing IA-ready', en: 'Amploi · AI-ready marketing site' }, href: '/cas-clients/amploi', description: { fr: 'Design system sur mesure, CRM HubSpot, couche GEO/AIO.', en: 'Custom design system, HubSpot CRM, GEO/AIO layer.' } },
        { label: { fr: 'Balzeo · migration WordPress', en: 'Balzeo · WordPress migration' }, href: '/cas-clients/balzeo', description: { fr: 'Un site deux fois plus rapide.', en: 'A site twice as fast.' } },
        { label: { fr: 'Desangles Peinture · SEO local', en: 'Desangles Peinture · local SEO' }, href: '/cas-clients/desangles-peinture', description: { fr: 'De la page 6 à la page 1 de Google.', en: 'From page 6 to page 1 on Google.' } },
        { label: { fr: 'Isabelle Diaz · prise de RDV', en: 'Isabelle Diaz · bookings' }, href: '/cas-clients/isabelle-diaz-naturopathe', description: { fr: 'Une présence pensée pour le rendez-vous.', en: 'A presence designed for bookings.' } },
        { label: { fr: 'Les Carnets de Montpellier · communauté', en: 'Les Carnets de Montpellier · community' }, href: '/cas-clients/les-carnets-de-montpellier', description: { fr: 'De zéro présence à une communauté payante.', en: 'From zero presence to a paying community.' } },
      ],
      footer: {
        label: { fr: 'Tous les cas clients →', en: 'All case studies →' },
        href: '/cas-clients',
      },
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
          label: { fr: 'Simon Beros · CV Founder', en: 'Simon Beros · Founder CV' },
          href: '/equipe/simon-beros',
          description: {
            fr: 'Architecture systèmes agentiques.',
            en: 'Agentic systems architecture.',
          },
        },
      ],
    },
    {
      kicker: { fr: 'MANIFESTE', en: 'MANIFESTO' },
      title: { fr: 'Notre vision en action', en: 'Our vision in action' },
      links: [
        {
          label: { fr: 'Manifesto', en: 'Manifesto' },
          href: '/manifesto',
          description: {
            fr: 'Notre conviction : une IA opérationnelle, pas du théâtre.',
            en: 'Our conviction: operational AI, not theatre.',
          },
          featured: true,
        },
      ],
      // Footer « Ouvrir le design system → /agence/design-system » retiré 2026-06-16 :
      // l'atelier DS migre sous /library (public mais non référencé → retiré du mega-menu,
      // footer site only). Décision docs/design-system/03 §11.2 (sign-off Simon 2026-06-15).
    },
    {
      kicker: { fr: 'ÉCOSYSTÈME', en: 'ECOSYSTEM' },
      title: { fr: 'Partenaires technologiques', en: 'Technology partners' },
      goal: { fr: 'Stack éprouvée, partenaires certifiés', en: 'Proven stack, certified partners' },
      links: [
        {
          label: { fr: 'Expertise Claude', en: 'Claude expertise' },
          href: '/expertise-claude',
          description: {
            fr: 'Anthropic-first : Haiku, Sonnet, Opus, Code, un modèle par tâche.',
            en: 'Anthropic-first: Haiku, Sonnet, Opus, Code, one model per task.',
          },
          featured: true,
        },
      ],
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
