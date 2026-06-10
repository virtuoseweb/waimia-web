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
  badge?: BiText;
  featured?: boolean;
}

export interface MegaMenuColumn {
  title: BiText;
  kicker?: BiText;
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
        },
        {
          label: { fr: 'Livres blancs', en: 'White papers' },
          href: '/ressources/livres-blancs',
          description: {
            fr: 'Analyses approfondies téléchargeables.',
            en: 'Deep downloadable analyses.',
          },
        },
        {
          label: { fr: 'Veille IA', en: 'AI watch' },
          href: '/ressources/veille-ia',
          description: {
            fr: 'Mouvements marché analysés.',
            en: 'Analyzed market moves.',
          },
        },
        {
          label: { fr: 'Newsletter', en: 'Newsletter' },
          href: '/ressources/#newsletter',
          description: {
            fr: 'Archives des éditions envoyées.',
            en: 'Archive of sent editions.',
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
          label: { fr: 'Cookbooks', en: 'Cookbooks' },
          href: '/ressources/cookbooks',
          description: {
            fr: 'Recettes techniques actionnables.',
            en: 'Actionable technical recipes.',
          },
        },
        {
          label: { fr: 'Outils', en: 'Tools' },
          href: '/ressources/outils',
          description: {
            fr: 'Calculateurs, checklists, templates.',
            en: 'Calculators, checklists, templates.',
          },
        },
        {
          label: { fr: 'Cas clients', en: 'Case studies' },
          href: '/cas',
          description: {
            fr: 'Résultats mesurés en clair.',
            en: 'Measured results in the clear.',
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

// ─── SOLUTIONS · fusion Solutions + Offres par besoin prospect (R3 §4)
// 3 colonnes orientées besoin (Acquérir / Piloter / Opérer), liens 100% existants.
// Absorbe le top-level « Offres » (disparu) : matchPrefixes garde l'état actif
// sur les pages /offres/*. Featured = cas Plateau (pont vers Cas clients).
const SOLUTIONS: MegaMenuSection = {
  parent: 'solutions',
  label: { fr: 'Solutions', en: 'Solutions' },
  parentHref: '/solutions',
  matchPrefixes: ['/offres', '/secteurs'],
  lead: {
    fr: 'Des systèmes IA rangés par besoin : trouver des clients, piloter, opérer sans friction.',
    en: 'AI systems organized by need: find customers, steer the business, run operations without friction.',
  },
  columns: [
    {
      kicker: { fr: 'ACQUÉRIR', en: 'ACQUIRE' },
      title: { fr: 'Trouver et convertir des clients', en: 'Find and convert customers' },
      links: [
        {
          label: { fr: 'Growth System IA', en: 'AI Growth System' },
          href: '/offres/growth-system-ia',
          description: {
            fr: 'Acquisition et conversion automatisées, de bout en bout.',
            en: 'Acquisition and conversion automated, end to end.',
          },
          featured: true,
        },
        {
          label: { fr: 'Acquisition IA', en: 'AI Acquisition' },
          href: '/solutions/acquisition-ia',
          description: { fr: 'Plus de leads qualifiés, sans recruter.', en: 'More qualified leads, without hiring.' },
        },
        {
          label: { fr: 'CRM & relances IA', en: 'CRM & AI follow-ups' },
          href: '/solutions/crm-relances-ia',
          description: { fr: 'Pipeline commercial qui ne dort jamais.', en: 'A sales pipeline that never sleeps.' },
        },
        {
          label: { fr: 'Contenu SEO / GEO IA', en: 'SEO/GEO content with AI' },
          href: '/solutions/contenu-seo-geo-ia',
          description: { fr: 'Du contenu trouvé par Google ET les IA.', en: 'Content found by Google AND AI engines.' },
        },
        {
          label: { fr: 'Site web IA', en: 'AI website' },
          href: '/offres/site-web-ia',
          description: { fr: 'Site Astro + IA · vitrine + acquisition.', en: 'Astro + AI site · showcase + acquisition.' },
        },
      ],
      footer: {
        label: { fr: 'Toutes les offres →', en: 'All services →' },
        href: '/offres',
      },
    },
    {
      kicker: { fr: 'PILOTER', en: 'STEER' },
      title: { fr: 'Voir clair et décider vite', en: 'See clearly and decide fast' },
      links: [
        {
          label: { fr: 'Growth Intelligence', en: 'Growth Intelligence' },
          href: '/offres/growth-intelligence',
          description: { fr: 'Pilotage temps réel et lisibilité des données.', en: 'Real-time intelligence and data clarity.' },
        },
        {
          label: { fr: 'RevOps Rebuild', en: 'RevOps Rebuild' },
          href: '/offres/revops',
          description: { fr: 'CRM + entrepôt + billing réconciliés · 10 sem.', en: 'CRM + warehouse + billing reconciled · 10 wks.' },
        },
        {
          label: { fr: 'Conseil & audit IA', en: 'AI Consulting & audit' },
          href: '/offres/conseil',
          description: { fr: '7 services audit, feuille de route, gouvernance.', en: '7 audit, roadmap and governance services.' },
        },
        {
          label: { fr: 'Activation IA · 1 semaine', en: 'AI Activation · 1 week' },
          href: '/offres/activation-ia',
          description: { fr: "Audit + formation. La porte d'entrée rapide.", en: 'Audit + training. The fast-track entry point.' },
        },
      ],
    },
    {
      kicker: { fr: 'OPÉRER', en: 'OPERATE' },
      title: { fr: "Faire tourner l'entreprise sans friction", en: 'Run the business without friction' },
      links: [
        {
          label: { fr: 'Productivité IA', en: 'AI Productivity' },
          href: '/solutions/productivite-ia',
          description: { fr: 'Vos équipes Excel et Office, augmentées.', en: 'Your Excel and Office teams, augmented.' },
        },
        {
          label: { fr: 'Support client IA', en: 'AI Customer Support' },
          href: '/solutions/support-client-ia',
          description: { fr: 'Réponses 24/7, escalade humaine intelligente.', en: '24/7 answers, smart human escalation.' },
        },
        {
          label: { fr: 'Productivité Opérationnelle IA', en: 'Operational AI' },
          href: '/offres/productivite-operationnelle-ia',
          description: { fr: 'Tâches répétitives automatisées, workflows fluidifiés.', en: 'Repetitive tasks automated, workflows streamlined.' },
        },
        {
          label: { fr: 'Infrastructure IA · ETI', en: 'AI Infrastructure · Enterprise' },
          href: '/offres/infrastructure-ia',
          description: { fr: 'Systèmes connectés à grande échelle, multi-sites.', en: 'Connected systems at scale, multi-site.' },
        },
        {
          label: { fr: 'Application IA pour PME', en: 'AI Application for SMBs' },
          href: '/offres/application-ia-pme',
          description: { fr: 'App dédiée 8 à 12 sem. ETI/PME.', en: 'Dedicated app 8–12 wks. SMB/SME.' },
        },
      ],
      footer: {
        label: { fr: 'Votre secteur →', en: 'Your industry →' },
        href: '/secteurs',
      },
    },
  ],
  featured: {
    kicker: { fr: 'CAS CLIENT VEDETTE', en: 'FEATURED CASE' },
    label: { fr: '+€2,4 M de pipeline récupéré', en: '+€2.4M pipeline recovered' },
    body: {
      fr: 'Pipeline commercial reconnecté, qualification automatisée, visibilité temps réel. SaaS B2B · 10 semaines.',
      en: 'Sales pipeline reconnected, qualification automated, real-time visibility. B2B SaaS · 10 weeks.',
    },
    cta: { fr: 'Lire le cas →', en: 'Read the case →' },
    href: '/cas/plateau',
  },
};

// ─── CAS CLIENTS · simplifié (R3 §5) : 1 colonne « Résultats mesurés » (4 cas
// vedettes, métriques en label) + featured = livre blanc AI Act (ne pas tripler
// Plateau, déjà featured de Solutions). Format 1 col + featured = data-cols=2.
const CAS: MegaMenuSection = {
  parent: 'cas',
  label: { fr: 'Cas clients', en: 'Case studies' },
  parentHref: '/cas',
  lead: {
    fr: 'Pipelines reconnectés, qualifications automatisées, opérations fluidifiées. ROI mesurés, pas promis.',
    en: 'Pipelines reconnected, qualification automated, operations streamlined. Measured ROI, not promised.',
  },
  columns: [
    {
      kicker: { fr: 'RÉSULTATS MESURÉS', en: 'MEASURED RESULTS' },
      title: { fr: 'Cas vedettes', en: 'Flagship cases' },
      links: [
        {
          label: { fr: 'Plateau · +€2,4M pipeline récupéré', en: 'Plateau · +€2.4M pipeline recovered' },
          href: '/cas/plateau',
          description: { fr: 'SaaS B2B · 10 sem · qualification + relances automatisées.', en: 'B2B SaaS · 10 wks · qualification + automated follow-ups.' },
          featured: true,
        },
        {
          label: { fr: 'Halcyon · −38% temps de triage', en: 'Halcyon · −38% triage time' },
          href: '/cas/halcyon',
          description: { fr: 'Santé-tech · 6 sem · routage IA des demandes.', en: 'Healthtech · 6 wks · AI request routing.' },
        },
        {
          label: { fr: 'Northbound · ×3,1 conversion SQL', en: 'Northbound · ×3.1 SQL conversion' },
          href: '/cas/northbound',
          description: { fr: 'Fintech EU · 14 sem · lead scoring automatisé.', en: 'EU Fintech · 14 wks · automated lead scoring.' },
        },
        {
          label: { fr: 'Caserne · 1 200 h/an récupérées', en: 'Caserne · 1,200 hours/year saved' },
          href: '/cas/caserne',
          description: { fr: 'Industrie FR · 8 sem · automatisation back-office.', en: 'FR Industry · 8 wks · back-office automation.' },
        },
      ],
      footer: {
        label: { fr: 'Voir tous les cas →', en: 'See all cases →' },
        href: '/cas',
      },
    },
  ],
  featured: {
    kicker: { fr: 'LIVRE BLANC', en: 'WHITE PAPER' },
    label: { fr: "Dossier Préparation à l'AI Act", en: 'AI Act Readiness Dossier' },
    body: {
      fr: "Le dossier de conformité complet pour anticiper l'AI Act avant de lancer un projet IA opérationnel.",
      en: 'The complete compliance dossier to anticipate the AI Act before launching an operational AI project.',
    },
    cta: { fr: 'Ouvrir le livre blanc →', en: 'Open the white paper →' },
    href: '/ressources/livres-blancs/ai-act-readiness',
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
    fr: 'Une équipe basée à Paris et Genève. Une méthode anti-théâtre. Un Trust Center qui détaille tout.',
    en: 'A team based in Paris and Geneva. An anti-theatre method. A Trust Center that details everything.',
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
          label: { fr: 'École Waimia', en: 'Waimia School' },
          href: '/ecole',
          description: {
            fr: 'Formations IA pour vos équipes.',
            en: 'AI training for your teams.',
          },
          featured: true,
        },
        {
          label: { fr: 'Carrières', en: 'Careers' },
          href: '/agence/careers',
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
      kicker: { fr: 'MANIFESTE & DÉMOS', en: 'MANIFESTO & DEMOS' },
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
        {
          label: { fr: 'Console', en: 'Console' },
          href: '/console',
          description: {
            fr: "L'IA Waimia en démonstration, en direct.",
            en: 'Waimia AI in a live demonstration.',
          },
        },
        {
          label: { fr: 'Atlas', en: 'Atlas' },
          href: '/atlas',
          description: {
            fr: 'La cartographie de nos quatre piliers.',
            en: 'The cartography of our four pillars.',
          },
        },
      ],
      footer: {
        label: { fr: 'Ouvrir le design system →', en: 'Open the design system →' },
        href: '/agence/design-system',
      },
    },
    {
      kicker: { fr: 'CONFIANCE', en: 'TRUST' },
      title: { fr: 'Garanties & légal', en: 'Guarantees & legal' },
      links: [
        {
          label: { fr: 'Trust Center', en: 'Trust Center' },
          href: '/agence/trust-center',
          description: {
            fr: 'AI Act, RGPD, ISO : tous les contrôles en clair.',
            en: 'AI Act, GDPR, ISO: all controls in plain text.',
          },
        },
        {
          label: { fr: 'Gouvernance', en: 'Governance' },
          href: '/agence/governance',
          description: {
            fr: 'Comité ethics IA + whistleblowing.',
            en: 'AI ethics committee + whistleblowing.',
          },
        },
        {
          label: { fr: 'Documentation', en: 'Documentation' },
          href: '/agence/docs',
          description: {
            fr: 'Notre stack, nos intégrations, notre méthode.',
            en: 'Our stack, integrations, and method.',
          },
        },
      ],
    },
  ],
  featured: {
    kicker: { fr: 'ANCRAGE', en: 'LOCATION' },
    label: { fr: 'Paris · Genève', en: 'Paris · Geneva' },
    body: {
      fr: 'Deux bureaux. Une seule méthode. Parité française et helvétique.',
      en: 'Two offices. One method. French and Swiss parity.',
    },
    cta: { fr: 'Voir les bureaux →', en: 'See the offices →' },
    href: '/agence/about#bureaux',
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
