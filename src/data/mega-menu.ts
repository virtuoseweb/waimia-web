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
  parentHref: '/acquerir',
  matchPrefixes: ['/offres', '/acquerir', '/piloter', '/operer', '/services'],
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
      // SEO état final (§0ter, méga-menu V1) : pages /solutions/* supprimées.
      // Liens RÉELS sur les 3 pages service (/services/*) + ancres du pilier
      // /acquerir pour les sous-sujets sans page (SEO & GEO réel, Publicité et
      // Agent marketing « à venir »). Zéro lien mort (ADR-003 nuance #4).
      links: [
        {
          label: { fr: 'Site web intelligent', en: 'Smart website' },
          href: '/services/site-web-intelligent',
          description: { fr: 'Site Astro + IA · vitrine + acquisition.', en: 'Astro + AI site · showcase + acquisition.' },
        },
        {
          label: { fr: 'Content marketing intelligent', en: 'Smart content marketing' },
          href: '/services/content-marketing-intelligent',
          description: { fr: 'Ligne éditoriale + SEO/GEO trouvés par Google ET les IA.', en: 'Editorial line + SEO/GEO found by Google AND AI engines.' },
        },
        {
          label: { fr: 'Tunnel de conversion', en: 'Conversion funnel' },
          href: '/services/tunnel-conversion-intelligent',
          description: { fr: 'Du premier clic à la signature, sans friction.', en: 'From first click to signature, frictionless.' },
        },
        {
          label: { fr: 'SEO & GEO', en: 'SEO & GEO' },
          href: '/acquerir#seo-geo',
          description: { fr: 'Trouvé par Google ET les moteurs IA.', en: 'Found by Google AND AI engines.' },
        },
        {
          label: { fr: 'Publicité en ligne', en: 'Online advertising' },
          href: '/acquerir#publicite',
          description: { fr: 'Campagnes pilotées au ROI, sans gaspillage.', en: 'ROI-driven campaigns, without waste.' },
          badge: { fr: 'À venir', en: 'Soon' },
        },
        {
          label: { fr: 'Agent marketing', en: 'Marketing agent' },
          href: '/acquerir#agent-marketing',
          description: { fr: 'Un agent qui prospecte et relance en continu.', en: 'An agent that prospects and follows up continuously.' },
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
      footer: {
        label: { fr: 'Le hub Acquérir →', en: 'The Acquire hub →' },
        href: '/acquerir',
      },
    },
    {
      title: { fr: 'Piloter', en: 'Steer' },
      goal: { fr: 'Voir & décider', en: 'See & decide' },
      quote: {
        fr: '"J\'ai des données partout, mais je ne sais pas ce qui marche vraiment."',
        en: '"I have data everywhere, but I don\'t know what\'s actually working."',
      },
      // SEO état final (méga-menu V1) : 0 page enfant Piloter → uniquement des
      // ancres du pilier /piloter (zéro lien mort, ADR-003 nuance #4).
      links: [
        {
          label: { fr: 'RevOps', en: 'RevOps' },
          href: '/piloter#revops',
          description: { fr: 'Process de revenu reconnectés.', en: 'Revenue processes reconnected.' },
        },
        {
          label: { fr: 'Tableaux de bord', en: 'Dashboards' },
          href: '/piloter#tableaux-de-bord',
          description: { fr: 'Décider en 2 min, pas en réunion.', en: 'Decide in 2 min, not a meeting.' },
        },
        {
          label: { fr: 'Reporting IA', en: 'AI reporting' },
          href: '/piloter#reporting-ia',
          description: { fr: 'Rapports générés et commentés par l\'IA.', en: 'Reports generated and explained by AI.' },
        },
        {
          label: { fr: 'Données centralisées', en: 'Centralized data' },
          href: '/piloter#donnees-centralisees',
          description: { fr: 'Une seule source de vérité.', en: 'A single source of truth.' },
        },
        {
          label: { fr: 'Prévisionnel IA', en: 'AI forecasting' },
          href: '/piloter#previsionnel-ia',
          description: { fr: 'Anticiper, pas subir.', en: 'Anticipate, don\'t react.' },
        },
        {
          label: { fr: 'Agent analytique', en: 'Analytics agent' },
          href: '/piloter#agent-analytique',
          description: { fr: 'Vos questions data, en langage naturel.', en: 'Your data questions, in plain language.' },
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
      footer: {
        label: { fr: 'Le hub Piloter →', en: 'The Steer hub →' },
        href: '/piloter',
      },
    },
    {
      title: { fr: 'Opérer', en: 'Operate' },
      goal: { fr: 'Gagner du temps', en: 'Save time' },
      quote: {
        fr: '"Mon équipe perd des heures sur des tâches répétitives qui pourraient être automatisées."',
        en: '"My team loses hours on repetitive tasks that could be automated."',
      },
      // SEO état final (méga-menu V1) : pages /solutions Opérer supprimées →
      // uniquement des ancres du pilier /operer (zéro lien mort).
      links: [
        {
          label: { fr: 'CRM & relances', en: 'CRM & follow-ups' },
          href: '/operer#crm-relances',
          description: { fr: 'Le CRM qui relance et qualifie tout seul.', en: 'A CRM that follows up and qualifies on its own.' },
        },
        {
          label: { fr: 'Automatisation', en: 'Automation' },
          href: '/operer#automatisation',
          description: { fr: 'Les tâches répétitives tournent sans vous.', en: 'Repetitive tasks run without you.' },
        },
        {
          label: { fr: 'Service client', en: 'Customer service' },
          href: '/operer#service-client',
          description: { fr: 'Réponses rapides, ton maîtrisé.', en: 'Fast answers, controlled tone.' },
        },
        {
          label: { fr: 'Admin & RH', en: 'Admin & HR' },
          href: '/operer#admin-rh',
          description: { fr: 'Onboarding, paie, documents allégés.', en: 'Onboarding, payroll, documents streamlined.' },
        },
        {
          label: { fr: 'Légal', en: 'Legal' },
          href: '/operer#legal',
          description: { fr: 'Contrats et conformité assistés.', en: 'Contracts and compliance assisted.' },
        },
        {
          label: { fr: 'Agents métiers', en: 'Business agents' },
          href: '/operer#agents-metiers',
          description: { fr: 'Un agent dédié par fonction clé.', en: 'A dedicated agent per key function.' },
          badge: { fr: 'À venir', en: 'Soon' },
        },
      ],
      footer: {
        label: { fr: 'Le hub Opérer →', en: 'The Operate hub →' },
        href: '/operer',
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
// le listing /realisations n'est plus exposé dans le mega menu (reste accessible via
// footer / plan du site) ; /realisations reste dans matchPrefixes pour l'état actif.
const CAS: MegaMenuSection = {
  parent: 'cas',
  label: { fr: 'Cas clients', en: 'Case studies' },
  parentHref: '/realisations',
  matchPrefixes: ['/realisations'],
  lead: {
    fr: 'Pipelines reconnectés, qualifications automatisées, opérations fluidifiées. ROI mesuré sur vos données, jamais inventé.',
    en: 'Pipelines reconnected, qualification automated, operations streamlined. ROI measured on your data, never invented.',
  },
  columns: [
    {
      kicker: { fr: 'PAR SECTEUR', en: 'BY INDUSTRY' },
      title: { fr: 'Par secteur', en: 'By industry' },
      goal: { fr: 'La preuve par votre métier', en: 'Proof from your industry' },
      // SEO état final : /secteurs supprimé (régénérable) → liens repointés sur /realisations.
      links: [
        {
          label: { fr: 'Services B2B', en: 'B2B services' },
          href: '/realisations',
          description: { fr: 'Pipeline reconnecté, qualification et relances automatisées.', en: 'Pipeline reconnected, qualification and follow-ups automated.' },
        },
        {
          label: { fr: 'Industrie', en: 'Manufacturing' },
          href: '/realisations',
          description: { fr: 'Données réunies, goulots identifiés, plan d\'action.', en: 'Data unified, bottlenecks surfaced, action plan.' },
        },
        {
          label: { fr: 'Finance & Compta', en: 'Finance & accounting' },
          href: '/realisations',
          description: { fr: 'Réconciliation, reporting et clôture allégés.', en: 'Reconciliation, reporting and close streamlined.' },
        },
      ],
      footer: {
        label: { fr: 'Tous les cas clients →', en: 'All case studies →' },
        href: '/realisations',
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
    href: '/realisations',
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
