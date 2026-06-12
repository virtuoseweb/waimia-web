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
          href: '/secteurs',
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
// Refonte hiérarchie 2026-06 (maquette Simon) : titre court serif grand + goal
// mono caps accent + quote prospect (FR verbatim Simon). Offres phares relevées
// par un badge inline sur l'item (Site web IA, Growth System IA) — pas de badge
// colonne (désalignait les 3 titres, correction Simon).
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
      title: { fr: 'Acquérir', en: 'Acquire' },
      goal: { fr: 'Trouver des clients', en: 'Find customers' },
      quote: {
        fr: '"Je veux plus de leads qualifiés, sans recruter une équipe marketing."',
        en: '"I want more qualified leads, without hiring a marketing team."',
      },
      links: [
        {
          label: { fr: 'Site web IA', en: 'Website AI' },
          href: '/offres/site-web-ia',
          description: { fr: 'Site Astro + IA · vitrine + acquisition.', en: 'Astro + AI site · showcase + acquisition.' },
        },
        {
          label: { fr: 'SEO & GEO', en: 'SEO & GEO' },
          href: '/solutions/contenu-seo-geo-ia',
          description: { fr: 'Du contenu trouvé par Google ET les IA.', en: 'Content found by Google AND AI engines.' },
        },
        {
          label: { fr: 'Content marketing', en: 'Content marketing' },
          href: '/solutions/content-marketing-ia',
          description: { fr: 'Une ligne éditoriale qui attire et convertit.', en: 'An editorial line that attracts and converts.' },
        },
        {
          label: { fr: 'Publicité en ligne', en: 'Online advertising' },
          href: '/solutions/publicite-en-ligne',
          description: { fr: 'Campagnes pilotées au ROI, sans gaspillage.', en: 'ROI-driven campaigns, without waste.' },
        },
        {
          label: { fr: 'Tunnel de vente', en: 'Sales funnel' },
          href: '/solutions/tunnel-de-vente',
          description: { fr: 'Du premier clic à la signature, sans friction.', en: 'From first click to signature, frictionless.' },
        },
        {
          label: { fr: 'Agent marketing & commercial', en: 'Marketing & sales agent' },
          href: '/solutions/agent-marketing-commercial',
          description: { fr: 'Un agent qui prospecte et relance en continu.', en: 'An agent that prospects and follows up continuously.' },
          badge: { fr: 'Agent IA', en: 'AI agent' },
        },
      ],
      footer: {
        label: { fr: 'Toutes les offres →', en: 'All services →' },
        href: '/offres',
      },
    },
    {
      title: { fr: 'Piloter', en: 'Steer' },
      goal: { fr: 'Voir & décider', en: 'See & decide' },
      quote: {
        fr: '"J\'ai des données partout, mais je ne sais pas ce qui marche vraiment."',
        en: '"I have data everywhere, but I don\'t know what\'s actually working."',
      },
      links: [
        {
          label: { fr: 'RevOps', en: 'RevOps' },
          href: '/offres/revops',
          description: { fr: 'CRM + entrepôt + billing réconciliés · 10 sem.', en: 'CRM + warehouse + billing reconciled · 10 wks.' },
        },
        {
          label: { fr: 'Tableaux de bord & analytics', en: 'Dashboards & analytics' },
          href: '/solutions/tableaux-de-bord-analytics',
          description: { fr: 'Vos chiffres clés, lisibles en un coup d\'œil.', en: 'Your key numbers, readable at a glance.' },
        },
        {
          label: { fr: 'Reporting IA', en: 'AI reporting' },
          href: '/solutions/reporting-ia',
          description: { fr: 'Des rapports générés et commentés par l\'IA.', en: 'Reports generated and commented by AI.' },
        },
        {
          label: { fr: 'Données centralisées', en: 'Centralized data' },
          href: '/solutions/donnees-centralisees',
          description: { fr: 'Une seule source de vérité, partout connectée.', en: 'One source of truth, connected everywhere.' },
        },
        {
          label: { fr: 'Prévisionnel IA', en: 'AI forecasting' },
          href: '/solutions/previsionnel-ia',
          description: { fr: 'Anticipez le pipeline et la trésorerie.', en: 'Anticipate pipeline and cash flow.' },
        },
        {
          label: { fr: 'Agent analytique', en: 'Analytics agent' },
          href: '/solutions/agent-analytique',
          description: { fr: 'Un agent qui répond à vos questions de pilotage.', en: 'An agent that answers your steering questions.' },
          badge: { fr: 'Agent IA', en: 'AI agent' },
        },
      ],
    },
    {
      title: { fr: 'Opérer', en: 'Operate' },
      goal: { fr: 'Gagner du temps', en: 'Save time' },
      quote: {
        fr: '"Mon équipe perd des heures sur des tâches répétitives qui pourraient être automatisées."',
        en: '"My team loses hours on repetitive tasks that could be automated."',
      },
      links: [
        {
          label: { fr: 'CRM & relances', en: 'CRM & follow-ups' },
          href: '/solutions/crm-relances-ia',
          description: { fr: 'Pipeline commercial qui ne dort jamais.', en: 'A sales pipeline that never sleeps.' },
        },
        {
          label: { fr: 'Automatisation de tâches & outils connectés', en: 'Task automation & connected tools' },
          href: '/solutions/productivite-ia',
          description: { fr: 'Vos outils reliés, vos tâches automatisées.', en: 'Your tools linked, your tasks automated.' },
        },
        {
          label: { fr: 'Service client IA', en: 'AI customer service' },
          href: '/solutions/support-client-ia',
          description: { fr: 'Réponses 24/7, escalade humaine intelligente.', en: '24/7 answers, smart human escalation.' },
        },
        {
          label: { fr: 'Administration & RH', en: 'Admin & HR' },
          href: '/solutions/administration-rh-ia',
          description: { fr: 'Paperasse, onboarding et suivi allégés.', en: 'Paperwork, onboarding and tracking lightened.' },
        },
        {
          label: { fr: 'Légal IA', en: 'Legal AI' },
          href: '/solutions/legal-ia',
          description: { fr: 'Contrats relus et risques signalés en amont.', en: 'Contracts reviewed and risks flagged upfront.' },
        },
        {
          label: { fr: 'Agents métiers', en: 'Business agents' },
          href: '/solutions/agents-metiers',
          description: { fr: 'Des agents taillés pour vos process internes.', en: 'Agents tailored to your internal processes.' },
          badge: { fr: 'Agent IA', en: 'AI agent' },
        },
      ],
      footer: {
        label: { fr: 'Votre secteur →', en: 'Your industry →' },
        href: '/secteurs',
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
    // Illustration éditoriale « acquisition / inbound growth » (flux convergeant
    // vers un point terracotta) : sert directement le propos de l'offre vedette,
    // distincte du visuel du cas Plateau (désormais featured de Cas clients).
    image: '/images/besoins/besoin-acquerir.webp',
  },
};

// ─── CAS CLIENTS · simplifié (R3 §5) : 1 colonne « Résultats mesurés » (4 cas
// vedettes, métriques en label) + featured = livre blanc AI Act (ne pas tripler
// Plateau, déjà featured de Solutions). Format 1 col + featured = data-cols=2.
// ─── CAS CLIENTS · refonte 2026-06 (mandat Simon) : 1 colonne « Par secteur »
// (la preuve par le métier, liens vers /secteurs/*) + featured = CAS CLIENT
// VEDETTE Plateau (visuel libéré du menu Solutions). parentHref → /secteurs :
// le listing /cas n'est plus exposé dans le mega menu (reste accessible via
// footer / plan du site) ; /cas reste dans matchPrefixes pour l'état actif.
const CAS: MegaMenuSection = {
  parent: 'cas',
  label: { fr: 'Cas clients', en: 'Case studies' },
  parentHref: '/secteurs',
  matchPrefixes: ['/cas'],
  lead: {
    fr: 'Pipelines reconnectés, qualifications automatisées, opérations fluidifiées. ROI mesurés, pas promis.',
    en: 'Pipelines reconnected, qualification automated, operations streamlined. Measured ROI, not promised.',
  },
  columns: [
    {
      kicker: { fr: 'PAR SECTEUR', en: 'BY INDUSTRY' },
      title: { fr: 'Par secteur', en: 'By industry' },
      goal: { fr: 'La preuve par votre métier', en: 'Proof from your industry' },
      links: [
        {
          label: { fr: 'Services B2B', en: 'B2B services' },
          href: '/secteurs',
          description: { fr: 'Pipeline reconnecté, qualification et relances automatisées.', en: 'Pipeline reconnected, qualification and follow-ups automated.' },
        },
        {
          label: { fr: 'Industrie', en: 'Manufacturing' },
          href: '/secteurs',
          description: { fr: 'Données réunies, goulots identifiés, plan d\'action.', en: 'Data unified, bottlenecks surfaced, action plan.' },
        },
        {
          label: { fr: 'Finance & Compta', en: 'Finance & accounting' },
          href: '/secteurs',
          description: { fr: 'Réconciliation, reporting et clôture allégés.', en: 'Reconciliation, reporting and close streamlined.' },
        },
      ],
      footer: {
        label: { fr: 'Tous les secteurs →', en: 'All industries →' },
        href: '/secteurs',
      },
    },
  ],
  featured: {
    kicker: { fr: 'ÉTUDES DE CAS', en: 'CASE STUDIES' },
    label: { fr: 'Premiers cas en préparation', en: 'First cases in preparation' },
    body: {
      fr: 'On publie un cas une fois le résultat mesuré et l\'accord du client obtenu. Pas de témoignage mis en scène.',
      en: 'We publish a case once the result is measured and the client has agreed. No staged testimonials.',
    },
    cta: { fr: 'Parler de votre projet →', en: 'Discuss your project →' },
    href: '/cas',
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
      footer: {
        label: { fr: 'Ouvrir le design system →', en: 'Open the design system →' },
        href: '/agence/design-system',
      },
    },
    {
      kicker: { fr: 'ÉCOSYSTÈME', en: 'ECOSYSTEM' },
      title: { fr: 'Partenaires technologiques', en: 'Technology partners' },
      goal: { fr: 'Stack éprouvée, partenaires certifiés', en: 'Proven stack, certified partners' },
      links: [
        {
          label: { fr: 'Toutes les technologies', en: 'All technologies' },
          href: '/technologies',
          description: {
            fr: 'Claude, open-source, VirtuoseOS : la stack complète.',
            en: 'Claude, open-source, VirtuoseOS: the full stack.',
          },
          featured: true,
        },
        {
          label: { fr: 'Claude Models', en: 'Claude Models' },
          href: '/technologies/claude-models',
          description: {
            fr: 'Haiku, Sonnet, Opus, Code : un modèle par tâche.',
            en: 'Haiku, Sonnet, Opus, Code: one model per task.',
          },
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
