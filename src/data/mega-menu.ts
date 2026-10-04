// FORK : nav spécifique Waimia (labels, routes, panneaux détail), à réécrire
// pour un fork (cf FORK.md § Limites connues).
//
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
  /**
   * Panneau « le module en détail » (col 3, refonte V8.3 2026-07-16 : pages
   * ENFANT curées). Sur un lien MODULE (col 2), déclare ses enfants VISUELS
   * (sans l'être structurellement) : déclinaisons de service réelles, cas client
   * ou cas d'usage PROPRES au module, diagnostic/audit/outil/comparatif
   * directement lié. Groupés en blocs titrés d'un intertitre court. Rendu dans
   * la col 3, conditionnel au module survolé/focus (jumelle du panneau modules).
   * 1 à 6 liens par module (parfois peu si peu de pertinence), TOUS des routes
   * réelles indexables. Bannis : liens génériques dupliqués sur ≥ 3 modules
   * (ex. /tarifs partout), renvois vers un module déjà présent en col 2 du même
   * système, cas qui n'illustre pas le module.
   */
  detail?: MegaMenuDetailBlock[];
}

/**
 * Bloc titré du panneau « le module en détail » (col 3) : un intertitre court
 * (mono/muted, ex. « Déclinaisons », « Aller plus loin ») suivi de ses liens.
 */
export interface MegaMenuDetailBlock {
  label: BiText;
  links: MegaMenuLink[];
}

/**
 * Niveau de regroupement « catégorie » au-dessus des liens flèches (directive
 * Simon 2026-07-13 : « le système est la catégorie, à l'intérieur les flèches »).
 * Une catégorie = un « système » : soit CLIQUABLE (`href` → hub du système),
 * soit « à venir » (`soon` : rendue muted, non-cliquable, badge). Ses `links`
 * sont les liens flèches enfants (facultatif : une catégorie « à venir » n'en a
 * pas). Rendu dans le mega panel desktop ET le sheet mobile.
 */
export interface MegaMenuCategory {
  label: BiText;
  href?: string;
  /**
   * Clé stable de switch (sélecteur desktop ↔ panneau dynamique, sous-accordéon
   * mobile). Obligatoire sur un système SÉLECTIONNABLE (avec `links`) ; inutile
   * sur un système « à venir » (non-sélectionnable). Ex. `marketing`, `ia`.
   */
  key?: string;
  /**
   * Description courte rendue dans l'en-tête du panneau dynamique (desktop) sous
   * le nom du système actif. Facultative.
   */
  description?: BiText;
  badge?: BiText;
  /**
   * Catégorie « à venir » : le système existe dans l'architecture mais pas
   * encore de page. Rendu NON-cliquable (span, pas <a>), discret (muted) —
   * même idiome que les liens `soon`. 0 lien mort / 0 crawl vers 404.
   */
  soon?: boolean;
  links?: MegaMenuLink[];
  /**
   * Bloc « featured » (col 4) du système (refonte V8.3 2026-07-16 : la col 4 est
   * STATIQUE PAR SYSTÈME, plus par module). Fixe tant qu'on reste sur ce système ;
   * bascule uniquement quand on change de système (survol col 1). Renvoie à la
   * colonne parent : hub du système, ou module clé qui le résume. Réutilise le
   * type `MegaMenuFeatured`.
   */
  featured?: MegaMenuFeatured;
  /**
   * Sous-groupes titrés de modules (directive Simon 2026-07-13). Alternative aux
   * `links` plats : le panneau rend un petit intertitre (kicker mono/muted) par
   * groupe suivi de ses liens. Ex. Systèmes opérationnels et IA → Automatiser / Développer.
   * En mobile, l'intertitre reste un simple libellé dans le dropdown (pas un 3e
   * niveau de toggle). Une catégorie utilise SOIT `links` SOIT `groups`.
   */
  groups?: MegaMenuGroup[];
}

/** Sous-groupe titré de modules dans le panneau dynamique (Inbound/Outbound…). */
export interface MegaMenuGroup {
  label: BiText;
  links: MegaMenuLink[];
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
  /**
   * Colonne « sélecteur de systèmes » (directive Simon 2026-07-13). Liste les
   * systèmes (catégories) : survol/clic/focus d'un système → le panneau jumeau
   * (`systemsPanel`) de la même section affiche ses modules. Le premier système
   * SÉLECTIONNABLE (avec `links`) est actif par défaut. Systèmes « à venir »
   * (`soon`) = muted, non-sélectionnables. Rendu desktop (sélecteur) ET mobile
   * (sous-accordéon). Remplace l'ancien `categories` statique.
   */
  systems?: MegaMenuCategory[];
  /**
   * Colonne « panneau dynamique » jumelle du sélecteur : rend TOUS les groupes
   * de modules côté serveur (indexable SEO/LLM), un seul visible à la fois
   * (switch en visibilité CSS piloté par `data-*`, aucun fetch/innerHTML). Lit
   * les systèmes de la colonne sœur `systems` de la même section.
   */
  systemsPanel?: boolean;
  /**
   * Colonne « le module en détail » jumelle du panneau modules (refonte V8.2
   * 2026-07-14 : granularité MODULE). Comme `systemsPanel`, elle rend côté serveur
   * le panneau `detail` de CHAQUE module (tous systèmes confondus), un seul visible
   * à la fois, basculé par le survol/focus d'un MODULE (col 2), avec un léger délai
   * d'intention. Défaut = 1er module du système par défaut. En-tête (kicker/titre)
   * commun. Sur mobile, chaque module devient un toggle qui déplie son détail.
   */
  moduleDetail?: boolean;
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
  /**
   * Bande « Résoudre un problème » horizontale en bas du mega panel (refonte V8.2
   * 2026-07-14) : un intitulé court + des liens inline vers la taxonomie « par
   * résultat » (cas-usages). Remplace l'ancienne colonne problèmes. Rendu dans la
   * zone footer du panel (au-dessus de la lede + hub). Compact, une ligne (wrap ok).
   */
  problemBand?: {
    label: BiText;
    links: MegaMenuLink[];
  };
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
          href: '/blog',
          description: {
            fr: 'Insights business pour PME B2B.',
            en: 'Business insights for B2B SMEs.',
          },
          featured: true,
        },
        {
          label: { fr: 'Guides', en: 'Guides' },
          href: '/ressources/guides',
        },
        {
          label: { fr: 'Comparatifs', en: 'Comparisons' },
          href: '/ressources/comparatifs',
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
        },
        {
          label: { fr: 'Diagnostic Référent IA', en: 'AI lead diagnostic' },
          href: '/ressources/diagnostics/referent-ia',
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
        },
        {
          label: { fr: 'Guide déploiement Claude', en: 'Claude deployment guide' },
          href: '/ressources/guides/claude-pme',
        },
      ],
      footer: {
        label: { fr: 'Catalogue outils →', en: 'Tools catalog →' },
        href: '/ressources/outils',
      },
    },
  ],
  // Image featured distincte par méga-menu (décoration, demande Simon 2026-06) :
  // RESSOURCES = visuel éditorial.
  featured: MM_RESOURCES.featured
    ? mapLegacyFeatured(MM_RESOURCES.featured, '/images/editorial/image-style-12.webp')
    : undefined,
};

// ─── SOLUTIONS · mega menu « systèmes → modules → module en détail » (refonte
// V8.3 2026-07-16) :
// Col 1 = SÉLECTEUR « Nos systèmes », trois systèmes cliquables (pivot IA 2026-10 :
// automatisation et agents IA [défaut, 1er], commerciaux, acquisition en dernier). Le survol/focus d'un système bascule les cols 2 ET 4.
// Col 2 = PANNEAU MODULES du système actif (survol système). Le survol/focus d'un
// MODULE (avec léger délai d'intention) pilote la col 3 seule ; défaut = 1er module du
// système actif. Col 3 = « LE MODULE EN DÉTAIL » : pages ENFANT curées du module
// (`detail`), un seul visible, basculé par le MODULE. Col 4 = FEATURED STATIQUE PAR
// SYSTÈME (`featured` du système, renvoie à la colonne parent), basculé par le SYSTÈME
// (col 1), inchangé au survol des modules. « Résoudre un problème » = bande horizontale
// `problemBand` en bas du panel (cas-usages). Tous les groupes rendus côté serveur
// (indexable SEO/LLM), switch CSS `data-*`, aucun fetch. Tous les liens = 100% réels.
const SOLUTIONS: MegaMenuSection = {
  parent: 'solutions',
  label: { fr: 'Solutions', en: 'Solutions' },
  parentHref: '/services',
  matchPrefixes: ['/services'],
  lead: {
    fr: 'De l\'ingénierie IA et applicative pour PME : des systèmes métier cohérents, l\'intégration IA qui les anime, et l\'audit pour savoir par où commencer.',
    en: 'AI and application engineering for SMBs: coherent business systems, the AI integration that powers them, and the audit to know where to start.',
  },
  columns: [
    // Col 1 · SÉLECTEUR « Nos systèmes » (directive Simon 2026-07-13, MAJ V8.1
    // 2026-07-14) : la colonne liste les systèmes ; survol/clic/focus d'un système →
    // le panneau jumeau (col 2) affiche ses modules. Les trois systèmes sont
    // cliquables, dans l'ordre (pivot IA 2026-10) : « Automatisation et agents IA »
    // (défaut actif, hub /services/systemes-operationnels-ia), « Systèmes commerciaux »
    // (hub /services/systeme-commercial), « Systèmes d'acquisition » (hub
    // /services/systeme-acquisition).
    {
      kicker: { fr: 'NOS SYSTÈMES', en: 'OUR SYSTEMS' },
      title: { fr: 'Nos systèmes', en: 'Our systems' },
      systems: [
        {
          // Libellé de NAVIGATION (pivot IA 2026-10) : le hub reste /services/systemes-operationnels-ia.
          label: { fr: 'Automatisation et agents IA', en: 'Automation and AI agents' },
          key: 'ia',
          href: '/services/systemes-operationnels-ia',
          description: { fr: 'Automatiser les processus et développer les outils métier dont les équipes ont besoin.', en: 'Automate processes and build the internal tools teams need.' },
          groups: [
            {
              label: { fr: 'Automatiser', en: 'Automate' },
              links: [
                {
                  label: { fr: 'Automatisations', en: 'Automations' },
                  href: '/services/automatisations',
                  description: { fr: 'Automatiser les tâches et processus répétitifs, de bout en bout.', en: 'Automate repetitive tasks and processes, end to end.' },
                  detail: [
                    {
                      label: { fr: 'Déclinaisons', en: 'Editions' },
                      links: [
                        { label: { fr: 'Automatisation n8n', en: 'n8n automation' }, href: '/services/automatisation-n8n' },
                      ],
                    },
                    {
                      label: { fr: 'Cas d\'usage', en: 'Use cases' },
                      links: [
                        { label: { fr: 'Standardiser les processus', en: 'Standardize processes' }, href: '/cas-usages/standardiser-processus' },
                        { label: { fr: 'Réduire le temps de reporting', en: 'Cut reporting time' }, href: '/cas-usages/reduire-reporting' },
                      ],
                    },
                    {
                      label: { fr: 'Aller plus loin', en: 'Go further' },
                      links: [
                        { label: { fr: 'Le cas Balzeo', en: 'The Balzeo case' }, href: '/cas-clients/balzeo' },
                        { label: { fr: 'n8n ou Zapier en 2026', en: 'n8n or Zapier in 2026' }, href: '/blog/avis-n8n-vs-zapier-2026' },
                        { label: { fr: 'Diagnostic maturité IA', en: 'AI maturity diagnostic' }, href: '/ressources/diagnostics/maturite-ia' },
                      ],
                    },
                  ],
                },
                {
                  label: { fr: 'Agents IA', en: 'AI agents' },
                  href: '/services/agents-ia',
                  description: { fr: 'Des agents autonomes branchés à vos outils via MCP, sous supervision.', en: 'Autonomous agents wired to your tools via MCP, under supervision.' },
                  detail: [
                    {
                      label: { fr: 'Déclinaisons', en: 'Editions' },
                      links: [
                        { label: { fr: 'Agent support client', en: 'Customer support agent' }, href: '/services/agent-support-client' },
                      ],
                    },
                    {
                      label: { fr: 'Aller plus loin', en: 'Go further' },
                      links: [
                        { label: { fr: 'Le cas Amploi', en: 'The Amploi case' }, href: '/cas-clients/amploi' },
                        { label: { fr: 'Agent IA ou automatisation', en: 'AI agent or automation' }, href: '/blog/agent-ia-vs-automatisation-classique-2026' },
                        { label: { fr: 'Audit IA PME', en: 'SME AI audit' }, href: '/audit-ia-pme' },
                      ],
                    },
                  ],
                },
                {
                  label: { fr: 'Intégrations', en: 'Integrations' },
                  href: '/services/integration-claude',
                  description: { fr: 'Claude, ChatGPT ou Mistral branchés à vos outils métier, en production.', en: 'Claude, ChatGPT or Mistral wired to your business tools, in production.' },
                  detail: [
                    {
                      label: { fr: 'Aller plus loin', en: 'Go further' },
                      links: [
                        { label: { fr: 'Le cas Amploi', en: 'The Amploi case' }, href: '/cas-clients/amploi' },
                        { label: { fr: 'Claude ou ChatGPT pour une PME', en: 'Claude or ChatGPT for an SME' }, href: '/ressources/comparatifs/claude-vs-chatgpt-pme' },
                        { label: { fr: 'Diagnostic maturité IA', en: 'AI maturity diagnostic' }, href: '/ressources/diagnostics/maturite-ia' },
                      ],
                    },
                  ],
                },
                {
                  label: { fr: 'Consultant IA', en: 'AI consultant' },
                  href: '/services/consultant-ia-claude',
                  description: { fr: 'Cadrer où l\'IA crée de la valeur, tracer la feuille de route, former les équipes.', en: 'Frame where AI creates value, set the roadmap, train the teams.' },
                },
              ],
            },
            {
              label: { fr: 'Développer', en: 'Build' },
              links: [
                {
                  label: { fr: 'Applications internes', en: 'Internal apps' },
                  href: '/services/applications-internes',
                  description: { fr: 'Développer les outils métier sur mesure dont vos équipes ont besoin.', en: 'Build the custom internal tools your teams need.' },
                  detail: [
                    {
                      label: { fr: 'Déclinaisons', en: 'Editions' },
                      links: [
                        { label: { fr: 'MVP SaaS', en: 'SaaS MVP' }, href: '/services/mvp-saas' },
                      ],
                    },
                    {
                      label: { fr: 'Cas d\'usage', en: 'Use cases' },
                      links: [
                        { label: { fr: 'Centraliser les données', en: 'Centralize data' }, href: '/cas-usages/centraliser-donnees' },
                        { label: { fr: 'Standardiser les processus', en: 'Standardize processes' }, href: '/cas-usages/standardiser-processus' },
                      ],
                    },
                    {
                      label: { fr: 'Aller plus loin', en: 'Go further' },
                      links: [
                        { label: { fr: 'Le cas Les Carnets', en: 'The Les Carnets case' }, href: '/cas-clients/les-carnets-de-montpellier' },
                        { label: { fr: 'App interne : développer ou acheter ?', en: 'Internal app: build or buy?' }, href: '/blog/applications-internes-build-vs-buy-pme' },
                        { label: { fr: 'Audit IA PME', en: 'SME AI audit' }, href: '/audit-ia-pme' },
                      ],
                    },
                  ],
                },
                {
                  label: { fr: 'Données et reporting', en: 'Data and reporting' },
                  href: '/services/donnees-reporting',
                  description: { fr: 'Centraliser les données et automatiser le reporting décisionnel.', en: 'Centralise data and automate decision reporting.' },
                  detail: [
                    {
                      label: { fr: 'Cas d\'usage', en: 'Use cases' },
                      links: [
                        { label: { fr: 'Centraliser les données', en: 'Centralize data' }, href: '/cas-usages/centraliser-donnees' },
                        { label: { fr: 'Réduire le temps de reporting', en: 'Cut reporting time' }, href: '/cas-usages/reduire-reporting' },
                      ],
                    },
                    {
                      label: { fr: 'Aller plus loin', en: 'Go further' },
                      links: [
                        { label: { fr: 'Le cas Amploi', en: 'The Amploi case' }, href: '/cas-clients/amploi' },
                        { label: { fr: 'Tableau de bord PME : quoi suivre', en: 'SME dashboard: what to track' }, href: '/blog/tableau-de-bord-pme-quelles-donnees-suivre' },
                        { label: { fr: 'Diagnostic maturité IA', en: 'AI maturity diagnostic' }, href: '/ressources/diagnostics/maturite-ia' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          // Col 4 featured STATIQUE du système opérationnel & IA. Arbitrage Simon
          // 2026-07-16 : renvoie à Intégration Claude (module clé du système), pas
          // au hub. Idée conservée, formulée sobrement (voix anti-théâtre) :
          // automatiser des tâches + un assistant expert à qui toute l'équipe délègue.
          featured: {
            kicker: { fr: 'INTÉGRATION CLAUDE', en: 'CLAUDE INTEGRATION' },
            label: { fr: 'Intégration Claude', en: 'Claude integration' },
            body: {
              fr: 'Automatiser les tâches répétitives et donner à l\'équipe un assistant expert, branché à vos outils, à qui déléguer du travail concret.',
              en: 'Automate repetitive tasks and give the team an expert assistant, wired to your tools, to hand real work to.',
            },
            cta: { fr: 'Voir Intégration Claude →', en: 'See Claude integration →' },
            href: '/services/integration-claude',
            image: '/images/besoins/besoin-operer.webp',
          },
        },
        {
          label: { fr: 'Systèmes commerciaux', en: 'Sales systems' },
          key: 'commercial',
          href: '/services/systeme-commercial',
          description: { fr: 'Transformer les prospects en clients : prospection, CRM, relances.', en: 'Turn prospects into clients: prospecting, CRM, follow-ups.' },
          // Modules à plat (aucun sous-groupe titré) : prospection, CRM, séquences de suivi.
          links: [
            {
              label: { fr: 'Prospection automatisée', en: 'Automated prospecting' },
              href: '/services/prospection-automatisee',
              description: { fr: 'Prospection multicanale automatisée, branchée à votre CRM.', en: 'Automated multichannel prospecting, wired to your CRM.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Cold email B2B', en: 'B2B cold email' }, href: '/services/cold-email-b2b' },
                  ],
                },
                {
                  label: { fr: 'Aller plus loin', en: 'Go further' },
                  links: [
                    { label: { fr: 'Le cas Isabelle Diaz', en: 'The Isabelle Diaz case' }, href: '/cas-clients/isabelle-diaz-naturopathe' },
                    { label: { fr: 'Automatiser les relances B2B', en: 'Automate B2B follow-ups' }, href: '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil' },
                    { label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' }, href: '/ressources/outils/calculateur-roi-ia' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'CRM, scoring et routing', en: 'CRM, scoring and routing' },
              href: '/services/crm-scoring-routing',
              description: { fr: 'CRM branché, scoring des leads et routing vers le bon commercial.', en: 'Wired CRM, lead scoring and routing to the right rep.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Intégration CRM', en: 'CRM integration' }, href: '/services/integration-crm' },
                  ],
                },
                {
                  label: { fr: 'Aller plus loin', en: 'Go further' },
                  links: [
                    { label: { fr: 'Le cas Amploi', en: 'The Amploi case' }, href: '/cas-clients/amploi' },
                    { label: { fr: 'Câbler son CRM en 10 jours', en: 'Wire your CRM in 10 days' }, href: '/blog/cabler-son-crm-en-10-jours' },
                    { label: { fr: 'Audit IA PME', en: 'SME AI audit' }, href: '/audit-ia-pme' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Séquences de suivi', en: 'Follow-up sequences' },
              href: '/services/sequences-de-suivi',
              description: { fr: 'Séquences de relance automatisées qui réchauffent et convertissent.', en: 'Automated follow-up sequences that nurture and convert.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Relance de devis', en: 'Quote follow-up' }, href: '/services/relance-devis' },
                  ],
                },
                {
                  label: { fr: 'Aller plus loin', en: 'Go further' },
                  links: [
                    { label: { fr: 'Le cas Les Carnets', en: 'The Les Carnets case' }, href: '/cas-clients/les-carnets-de-montpellier' },
                    { label: { fr: 'Automatiser les relances B2B', en: 'Automate B2B follow-ups' }, href: '/blog/automatiser-relances-b2b-sans-sdr-guide-cabinet-conseil' },
                    { label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' }, href: '/ressources/outils/calculateur-roi-ia' },
                  ],
                },
              ],
            },
          ],
          // Col 4 featured STATIQUE du système commercial (hub) : évoque le CRM
          // branché et la prospection outillée (outils réels cités dans
          // src/content/services/prospection-automatisee.json).
          featured: {
            kicker: { fr: 'L\'OFFRE COMPLÈTE', en: 'THE COMPLETE OFFER' },
            label: { fr: 'Système commercial', en: 'Sales system' },
            body: {
              fr: 'Un CRM branché et une prospection outillée (Apollo, Lemlist, Pharow) pour transformer les prospects en clients. Sur devis.',
              en: 'A wired CRM and tool-driven prospecting (Apollo, Lemlist, Pharow) to turn prospects into clients. On quote.',
            },
            cta: { fr: 'Découvrir le système →', en: 'Explore the system →' },
            href: '/services/systeme-commercial',
            image: '/images/besoins/besoin-acquerir.webp',
          },
        },
        {
          label: { fr: 'Systèmes d\'acquisition', en: 'Acquisition systems' },
          key: 'acquisition',
          href: '/services/systeme-acquisition',
          description: { fr: 'Concevoir l\'infrastructure qui attire et capte la demande : site, visibilité, landing pages.', en: 'Design the infrastructure that attracts and captures demand: website, visibility, landing pages.' },
          // Modules à plat (aucun sous-groupe titré) : site, visibilité, landing pages.
          links: [
            {
              label: { fr: 'Site web intelligent', en: 'Intelligent website' },
              href: '/services/site-web-ia',
              description: { fr: 'Application web pilotée par l\'IA : SEO, analytics et CRM branchés.', en: 'AI-driven web app: SEO, analytics and CRM wired in.' },
              // Sous-modules réels du site intelligent + compléments (cas, diagnostic, audit).
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Sur mesure Astro / React', en: 'Custom Astro / React' }, href: '/services/sur-mesure-headless' },
                    { label: { fr: 'WordPress', en: 'WordPress' }, href: '/services/wordpress' },
                    { label: { fr: 'Webflow', en: 'Webflow' }, href: '/services/webflow' },
                  ],
                },
                {
                  label: { fr: 'Aller plus loin', en: 'Go further' },
                  links: [
                    { label: { fr: 'Le cas Amploi', en: 'The Amploi case' }, href: '/cas-clients/amploi' },
                    { label: { fr: 'Quelle techno pour votre site en 2026', en: 'Which tech for your site in 2026' }, href: '/blog/webflow-vs-wordpress-vs-site-code-ia-2026' },
                    { label: { fr: 'Diagnostic site intelligent', en: 'Smart website diagnostic' }, href: '/ressources/diagnostics/site-web-intelligent' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'SEO, GEO et contenu', en: 'SEO, GEO and content' },
              href: '/services/seo-geo-contenu',
              description: { fr: 'Contenu balisé pour le SEO et les citations IA (GEO/AIO), en maillage.', en: 'Content marked up for SEO and AI citations (GEO/AIO), interlinked.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'SEO local', en: 'Local SEO' }, href: '/services/seo-local' },
                    { label: { fr: 'Référencement IA', en: 'AI search visibility' }, href: '/services/referencement-ia' },
                  ],
                },
                {
                  label: { fr: 'Aller plus loin', en: 'Go further' },
                  links: [
                    { label: { fr: 'Le cas Desangles Peinture', en: 'The Desangles Peinture case' }, href: '/cas-clients/desangles-peinture' },
                    { label: { fr: 'SEO ou GEO, quelle différence', en: 'SEO or GEO, what differs' }, href: '/ressources/comparatifs/geo-vs-seo' },
                    { label: { fr: 'Audit site web', en: 'Website audit' }, href: '/audit-site-web-intelligent' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Landing pages et tunnels', en: 'Landing pages and funnels' },
              href: '/services/landing-pages-tunnels',
              description: { fr: 'Landing pages qui convertissent et tunnels qui priorisent vos leads.', en: 'Landing pages that convert and funnels that prioritise your leads.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Landing page Google Ads', en: 'Google Ads landing page' }, href: '/services/landing-page-google-ads' },
                  ],
                },
                {
                  label: { fr: 'Aller plus loin', en: 'Go further' },
                  links: [
                    { label: { fr: 'Le cas Isabelle Diaz', en: 'The Isabelle Diaz case' }, href: '/cas-clients/isabelle-diaz-naturopathe' },
                    { label: { fr: 'Landing page qui convertit : la méthode', en: 'Landing pages that convert: the method' }, href: '/blog/landing-page-qui-convertit-methode-2026' },
                    { label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' }, href: '/ressources/outils/calculateur-roi-ia' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Publicité en ligne', en: 'Online advertising' },
              href: '/services/publicite-en-ligne',
              description: { fr: 'Google Ads, Meta et formats IA, branchés à vos landing pages et votre CRM.', en: 'Google Ads, Meta and AI formats, wired to your landing pages and your CRM.' },
              detail: [
                {
                  label: { fr: 'Aller plus loin', en: 'Go further' },
                  links: [
                    { label: { fr: 'Le cas Balzeo', en: 'The Balzeo case' }, href: '/cas-clients/balzeo' },
                    { label: { fr: 'Google Ads ou Meta Ads en 2026', en: 'Google Ads or Meta Ads in 2026' }, href: '/blog/google-ads-vs-meta-ads-pme-2026' },
                    { label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' }, href: '/ressources/outils/calculateur-roi-ia' },
                  ],
                },
              ],
            },
          ],
          // Col 4 featured STATIQUE du système d'acquisition (renvoie au hub).
          featured: {
            kicker: { fr: 'L\'OFFRE COMPLÈTE', en: 'THE COMPLETE OFFER' },
            label: { fr: 'Système d\'acquisition', en: 'Acquisition system' },
            body: {
              fr: 'L\'infrastructure qui attire et capte la demande : site, visibilité, landing pages. Packs sur devis à tarif dégressif.',
              en: 'The infrastructure that attracts and captures demand: website, visibility, landing pages. Packs on quote with degressive pricing.',
            },
            cta: { fr: 'Découvrir le système →', en: 'Explore the system →' },
            href: '/services/systeme-acquisition',
            image: '/images/besoins/besoin-piloter.webp',
          },
        },
      ],
      links: [],
    },
    // Col 2 · PANNEAU DYNAMIQUE jumeau du sélecteur. Rend tous les groupes de
    // modules côté serveur ; le survol du sélecteur bascule la visibilité.
    // Défaut = 1er système (Automatisation et agents IA). `title` non rendu (l'en-tête du panneau
    // = le nom du système actif) mais requis par MegaMenuColumn.
    {
      systemsPanel: true,
      title: { fr: 'Modules du système', en: 'System modules' },
      links: [],
    },
    // Col 3 · « Le module en détail » jumelle du panneau modules (refonte V8.2
    // 2026-07-14 : granularité MODULE). Le contenu (blocs `detail`) vit sur chaque
    // MODULE (col 2) ; cette colonne rend tous les panneaux côté serveur, un seul
    // visible, basculé par le survol/focus d'un module (léger délai d'intention).
    // En-tête commun. Défaut = 1er module du système par défaut.
    {
      kicker: { fr: 'LE MODULE EN DÉTAIL', en: 'THE MODULE IN DETAIL' },
      title: { fr: 'Le module en détail', en: 'The module in detail' },
      moduleDetail: true,
      links: [],
    },
  ],
  // Col 4 (refonte V8.3 2026-07-16) : featured STATIQUE PAR SYSTÈME (`featured` de
  // chaque système, renvoie à la colonne parent). Le rendu (Header.astro) stacke une
  // carte par système et bascule au survol du SÉLECTEUR (col 1), pas au survol module.
  // « Résoudre un problème » descend en bande horizontale (problemBand) en bas du panel.
  problemBand: {
    label: { fr: 'Vous partez d\'un problème ?', en: 'Starting from a problem?' },
    links: [
      { label: { fr: 'Générer plus de leads', en: 'Generate more leads' }, href: '/cas-usages/generer-plus-de-leads' },
      { label: { fr: 'Réduire le temps CMS', en: 'Cut CMS time' }, href: '/cas-usages/reduire-temps-cms' },
      { label: { fr: 'Standardiser les processus', en: 'Standardize processes' }, href: '/cas-usages/standardiser-processus' },
      { label: { fr: 'Centraliser les données', en: 'Centralize data' }, href: '/cas-usages/centraliser-donnees' },
      { label: { fr: 'Voir tous les problèmes', en: 'See all problems' }, href: '/cas-usages' },
      { label: { fr: 'Réserver un audit', en: 'Book an audit' }, href: '/audit-ia-pme' },
    ],
  },
};

const FORMULES: MegaMenuSection = {
  parent: 'formules',
  label: { fr: 'Nos formules', en: 'Plans' },
  parentHref: '/tarifs',
  matchPrefixes: ['/tarifs'],
  lead: {
    fr: 'Choisir le bon niveau d’engagement : projet, équipe dédiée, SEO/GEO ou sur mesure.',
    en: 'Choose the right engagement level: project, dedicated team, SEO/GEO or custom.',
  },
  columns: [
    {
      kicker: { fr: 'PROJET', en: 'PROJECT' },
      title: { fr: 'Un projet', en: 'One project' },
      goal: { fr: 'Livrer un actif précis', en: 'Ship a precise asset' },
      links: [
        { label: { fr: 'Lancement', en: 'Launch' }, href: '/tarifs#formules' },
        { label: { fr: 'Refonte', en: 'Rebuild' }, href: '/tarifs#formules' },
        { label: { fr: 'Migration', en: 'Migration' }, href: '/tarifs#formules' },
      ],
      footer: {
        label: { fr: 'Voir les forfaits projet →', en: 'See project packages →' },
        href: '/tarifs#formules',
      },
    },
    {
      kicker: { fr: 'ÉQUIPE DÉDIÉE', en: 'DEDICATED TEAM' },
      title: { fr: 'Équipe dédiée', en: 'Dedicated team' },
      goal: { fr: 'Garder le rythme chaque mois', en: 'Keep momentum every month' },
      links: [
        { label: { fr: 'Starter', en: 'Starter' }, href: '/tarifs#formules' },
        { label: { fr: 'Growth', en: 'Growth' }, href: '/tarifs#formules', badge: { fr: 'Recommandé', en: 'Recommended' } },
        { label: { fr: 'Scale', en: 'Scale' }, href: '/tarifs#formules' },
      ],
    },
    {
      kicker: { fr: 'SEO/GEO', en: 'SEO/GEO' },
      title: { fr: 'Visibilité', en: 'Visibility' },
      goal: { fr: 'Être trouvé, compris, cité', en: 'Be found, understood, cited' },
      links: [
        { label: { fr: 'Audit GEO', en: 'GEO audit' }, href: '/tarifs#formules' },
        { label: { fr: 'Sprint contenu', en: 'Content sprint' }, href: '/tarifs#formules' },
        { label: { fr: 'Pilotage visibilité', en: 'Visibility steering' }, href: '/tarifs#formules' },
        { label: { fr: 'Demander une recommandation', en: 'Request a recommendation' }, href: '/contact?intent=pricing' },
      ],
    },
  ],
  featured: {
    kicker: { fr: 'RECOMMANDATION', en: 'RECOMMENDATION' },
    label: { fr: 'Ne choisissez pas au hasard', en: 'Do not choose blindly' },
    body: {
      fr: 'Un échange de cadrage suffit à sélectionner la formule la plus simple qui couvre le besoin.',
      en: 'One scoping call is enough to select the simplest plan that covers the need.',
    },
    cta: { fr: 'Voir les formules →', en: 'See plans →' },
    href: '/tarifs',
    image: '/images/editorial/image-style-12.webp',
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
      goal: { fr: 'Cinq réalisations documentées', en: 'Five documented projects' },
      links: [
        { label: { fr: 'Toutes les études de cas', en: 'All case studies' }, href: '/cas-clients', description: { fr: 'Cinq réalisations documentées.', en: 'Five documented projects.' } },
      ],
    },
    // La colonne « Résultats obtenus » (taxonomie « par résultat » vers
    // /cas-clients/resultats/*) est RETIRÉE (refonte V8.2 2026-07-14) : la
    // taxonomie « par résultat » du menu = cas-usages uniquement (bande Solutions).
    // Ces pages resultats/* sont en cours de suppression → 0 lien vers elles.
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
    fr: 'Un studio solo basé à Bordeaux, missions à distance. Une méthode anti-théâtre, des livrables signés.',
    en: 'A solo studio based in Bordeaux, working remotely. An anti-theatre method, with signed deliverables.',
  },
  columns: [
    {
      kicker: { fr: 'STUDIO & VISION', en: 'STUDIO & VISION' },
      title: { fr: 'Qui nous sommes', en: 'Who we are' },
      links: [
        {
          label: { fr: 'À propos de Waimia', en: 'About Waimia' },
          href: '/agence',
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
        {
          label: { fr: 'Manifesto', en: 'Manifesto' },
          href: '/manifesto',
          description: {
            fr: 'Une IA opérationnelle, pas du théâtre.',
            en: 'Operational AI, not theatre.',
          },
          featured: true,
        },
      ],
    },
    {
      kicker: { fr: 'ÉCOSYSTÈME', en: 'ECOSYSTEM' },
      title: { fr: 'Écosystème', en: 'Ecosystem' },
      links: [
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
          href: '/services/integration-claude',
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
          label: { fr: 'Bordeaux', en: 'Bordeaux' },
          href: '/implantations/bordeaux',
        },
        {
          label: { fr: 'Montpellier', en: 'Montpellier' },
          href: '/implantations/montpellier',
        },
        {
          label: { fr: 'France entière', en: 'All of France' },
          href: '/implantations',
        },
      ],
      footer: {
        label: { fr: 'Réserver un audit →', en: 'Book an audit →' },
        href: '/audit-ia-pme',
      },
    },
  ],
  featured: {
    kicker: { fr: 'ANCRAGE', en: 'LOCATION' },
    label: { fr: 'Bordeaux · France', en: 'Bordeaux · France' },
    body: {
      fr: 'Un studio solo. Une seule méthode. Interlocuteur direct, pas un comité.',
      en: 'A solo studio. One method. A direct contact, not a committee.',
    },
    cta: { fr: 'Découvrir le studio →', en: 'Discover the studio →' },
    href: '/agence',
    image: '/images/besoins/besoin-operer.webp',
  },
};

export const MEGA_MENU: MegaMenuSection[] = [
  SOLUTIONS,
  FORMULES,
  CAS,
  RESSOURCES,
  AGENCE,
];

export function getMegaMenuSection(parent: string): MegaMenuSection | undefined {
  return MEGA_MENU.find((section) => section.parent === parent);
}
