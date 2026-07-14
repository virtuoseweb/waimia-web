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
   * Jeu de liens « Résoudre un problème » propre à ce système (directive Simon
   * 2026-07-14). Rendu dans la colonne jumelle `systemsProblems`, visible quand
   * ce système est actif. Labels = formulations problème, hrefs = routes réelles
   * (cas-usages ou pages service). Kicker/titre communs à la colonne.
   */
  problems?: MegaMenuLink[];
  /**
   * Bloc « featured » (col 4) propre à ce système (directive Simon 2026-07-14).
   * Rendu dans le stack featured, visible quand ce système est actif. Réutilise
   * le type `MegaMenuFeatured`. Remplace, pour les sections à systèmes, le
   * `featured` statique de section.
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
   * Colonne « Résoudre un problème » jumelle du sélecteur de systèmes (directive
   * Simon 2026-07-14). Comme `systemsPanel`, elle rend côté serveur les jeux de
   * liens de CHAQUE système (`MegaMenuCategory.problems`), un seul visible à la
   * fois, basculé par le même survol/focus que le panneau modules (data-*, aucun
   * fetch). Défaut = 1er système sélectionnable. En-tête (kicker/titre/goal) et
   * footer restent communs ; seuls les liens varient. Sur mobile, rend le jeu du
   * système par défaut (acquisition).
   */
  systemsProblems?: boolean;
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
  ],
  // Image featured distincte par méga-menu (décoration, demande Simon 2026-06) :
  // RESSOURCES = visuel éditorial.
  featured: MM_RESOURCES.featured
    ? mapLegacyFeatured(MM_RESOURCES.featured, '/images/editorial/image-style-12.webp')
    : undefined,
};

// ─── SOLUTIONS · mega menu « systèmes → modules » (refonte V8.1 2026-07-14) :
// Col 1 = SÉLECTEUR « Nos systèmes », trois systèmes cliquables : Systèmes
// d'acquisition [défaut actif, hub /services/systeme-acquisition, modules PLATS :
// site-web-ia (phare), seo-geo-contenu, landing-pages-tunnels] · Systèmes
// opérationnels et IA [hub /services/systemes-operationnels-ia, deux sous-groupes
// titrés Automatiser/Développer] · Systèmes commerciaux [hub /services/systeme-
// commercial, modules PLATS : prospection-automatisee, crm-scoring-routing,
// sequences-de-suivi]. Acquisition et commercial rendent leurs modules à plat, sans
// intertitre de sous-groupe. Col 2 = PANNEAU DYNAMIQUE jumeau : au survol/clic/focus
// d'un système, il affiche ses modules. Tous les groupes rendus côté serveur
// (indexable SEO/LLM), un seul visible (switch CSS `data-*`, aucun fetch). Col 3
// « Résoudre un problème » INCHANGÉE. Tous les liens = 100% réels + indexables.
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
    // cliquables : « Systèmes d'acquisition » (défaut actif, hub /services/systeme-
    // acquisition), « Systèmes opérationnels et IA » (hub /services/systemes-
    // operationnels-ia) et « Systèmes commerciaux » (hub /services/systeme-commercial).
    {
      kicker: { fr: 'NOS SYSTÈMES', en: 'OUR SYSTEMS' },
      title: { fr: 'Nos systèmes', en: 'Our systems' },
      systems: [
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
              badge: { fr: 'Offre phare', en: 'Flagship' },
            },
            {
              label: { fr: 'SEO, GEO et contenu', en: 'SEO, GEO and content' },
              href: '/services/seo-geo-contenu',
              description: { fr: 'Contenu balisé pour le SEO et les citations IA (GEO/AIO), en maillage.', en: 'Content marked up for SEO and AI citations (GEO/AIO), interlinked.' },
            },
            {
              label: { fr: 'Landing pages et tunnels', en: 'Landing pages and funnels' },
              href: '/services/landing-pages-tunnels',
              description: { fr: 'Landing pages qui convertissent et tunnels qui priorisent vos leads.', en: 'Landing pages that convert and funnels that prioritise your leads.' },
            },
          ],
          // Col 3 « Résoudre un problème » propre au système d'acquisition :
          // leads / temps CMS / visibilité (cas-usages réels + page service SEO).
          problems: [
            { label: { fr: 'Générer plus de leads', en: 'Generate more leads' }, href: '/cas-usages/generer-plus-de-leads' },
            { label: { fr: 'Réduire le temps dans le CMS', en: 'Cut time in the CMS' }, href: '/cas-usages/reduire-temps-cms' },
            { label: { fr: 'Être trouvé et cité par l\'IA', en: 'Get found and cited by AI' }, href: '/services/seo-geo-contenu' },
            { label: { fr: 'Réserver un audit', en: 'Book an audit' }, href: '/contact' },
          ],
          // Col 4 featured du système d'acquisition (ex-featured de section).
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
        {
          label: { fr: 'Systèmes opérationnels et IA', en: 'Operational & AI systems' },
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
                },
                {
                  label: { fr: 'Agents IA', en: 'AI agents' },
                  href: '/services/agents-ia',
                  description: { fr: 'Des agents autonomes branchés à vos outils via MCP, sous supervision.', en: 'Autonomous agents wired to your tools via MCP, under supervision.' },
                },
                {
                  label: { fr: 'Intégrations', en: 'Integrations' },
                  href: '/services/integration-claude',
                  description: { fr: 'Claude, ChatGPT ou Mistral branchés à vos outils métier, en production.', en: 'Claude, ChatGPT or Mistral wired to your business tools, in production.' },
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
                },
                {
                  label: { fr: 'Données et reporting', en: 'Data and reporting' },
                  href: '/services/donnees-reporting',
                  description: { fr: 'Centraliser les données et automatiser le reporting décisionnel.', en: 'Centralise data and automate decision reporting.' },
                },
              ],
            },
          ],
          // Col 3 « Résoudre un problème » propre aux systèmes opérationnels et IA :
          // processus / données / reporting (trois cas-usages réels).
          problems: [
            { label: { fr: 'Standardiser les processus', en: 'Standardize processes' }, href: '/cas-usages/standardiser-processus' },
            { label: { fr: 'Centraliser les données', en: 'Centralize data' }, href: '/cas-usages/centraliser-donnees' },
            { label: { fr: 'Réduire le temps de reporting', en: 'Cut reporting time' }, href: '/cas-usages/reduire-reporting' },
            { label: { fr: 'Réserver un audit', en: 'Book an audit' }, href: '/contact' },
          ],
          featured: {
            kicker: { fr: 'L\'OFFRE COMPLÈTE', en: 'THE COMPLETE OFFER' },
            label: { fr: 'Systèmes opérationnels et IA', en: 'Operational & AI systems' },
            body: {
              fr: 'Automatiser les processus et développer les outils métier qui font tourner l\'entreprise. Sur devis.',
              en: 'Automate processes and build the internal tools that keep the business running. On quote.',
            },
            cta: { fr: 'Découvrir le système →', en: 'Explore the system →' },
            href: '/services/systemes-operationnels-ia',
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
            },
            {
              label: { fr: 'CRM, scoring et routing', en: 'CRM, scoring and routing' },
              href: '/services/crm-scoring-routing',
              description: { fr: 'CRM branché, scoring des leads et routing vers le bon commercial.', en: 'Wired CRM, lead scoring and routing to the right rep.' },
            },
            {
              label: { fr: 'Séquences de suivi', en: 'Follow-up sequences' },
              href: '/services/sequences-de-suivi',
              description: { fr: 'Séquences de relance automatisées qui réchauffent et convertissent.', en: 'Automated follow-up sequences that nurture and convert.' },
            },
          ],
          // Col 3 « Résoudre un problème » propre au système commercial : aucun
          // cas-usage ne colle → liens vers les pages service réelles.
          problems: [
            { label: { fr: 'Remplir le pipeline commercial', en: 'Fill the sales pipeline' }, href: '/services/prospection-automatisee' },
            { label: { fr: 'Relancer sans y penser', en: 'Follow up without thinking' }, href: '/services/sequences-de-suivi' },
            { label: { fr: 'Qualifier et router les leads', en: 'Qualify and route leads' }, href: '/services/crm-scoring-routing' },
            { label: { fr: 'Réserver un audit', en: 'Book an audit' }, href: '/contact' },
          ],
          featured: {
            kicker: { fr: 'L\'OFFRE COMPLÈTE', en: 'THE COMPLETE OFFER' },
            label: { fr: 'Système commercial', en: 'Sales system' },
            body: {
              fr: 'Transformer les prospects en clients : prospection, CRM branché, relances automatisées. Sur devis.',
              en: 'Turn prospects into clients: prospecting, wired CRM, automated follow-ups. On quote.',
            },
            cta: { fr: 'Découvrir le système →', en: 'Explore the system →' },
            href: '/services/systeme-commercial',
            image: '/images/besoins/besoin-acquerir.webp',
          },
        },
      ],
      links: [],
    },
    // Col 2 · PANNEAU DYNAMIQUE jumeau du sélecteur. Rend tous les groupes de
    // modules côté serveur ; le survol du sélecteur bascule la visibilité.
    // Défaut = Système d'acquisition. `title` non rendu (l'en-tête du panneau
    // = le nom du système actif) mais requis par MegaMenuColumn.
    {
      systemsPanel: true,
      title: { fr: 'Modules du système', en: 'System modules' },
      links: [],
    },
    // Col 3 · « Résoudre un problème » jumelle du sélecteur (MAJ V8.1 2026-07-14) :
    // les liens deviennent conditionnels au système survolé (`systemsProblems`),
    // comme les cols 1-2. Chaque système porte son propre jeu `problems` ; le
    // panneau bascule au même survol/focus. En-tête (kicker/titre/goal) et footer
    // restent communs. Défaut = système d'acquisition. Tous les liens = routes
    // réelles indexables (cas-usages + pages service), 0 lien mort.
    {
      kicker: { fr: 'RÉSOUDRE UN PROBLÈME', en: 'SOLVE A PROBLEM' },
      title: { fr: 'Résoudre un problème', en: 'Solve a problem' },
      goal: { fr: 'Vous ne savez pas quel service choisir ?', en: 'Not sure which service to pick?' },
      systemsProblems: true,
      links: [],
      // Le hub /cas-usages EXISTE et répond 200 (page src/pages/cas-usages/index.astro)
      // → footer « Voir tous les problèmes » cliquable, commun à tous les systèmes.
      footer: {
        label: { fr: 'Voir tous les problèmes →', en: 'See all problems →' },
        href: '/cas-usages',
      },
    },
  ],
  // Plus de `featured` de section pour Solutions (MAJ V8.1 2026-07-14) : la col 4
  // devient conditionnelle au système survolé → chaque système porte son propre
  // `featured` (source unique). Le rendu (Header.astro) stacke les variantes et
  // bascule au même survol que le panneau modules. Défaut = système d'acquisition.
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
        { label: { fr: 'Kick start', en: 'Kick start' }, href: '/tarifs#formules' },
        { label: { fr: 'Boost', en: 'Boost' }, href: '/tarifs#formules' },
        { label: { fr: 'Growth', en: 'Growth' }, href: '/tarifs#formules', badge: { fr: 'Recommandé', en: 'Recommended' } },
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
        { label: { fr: 'Plus de leads', en: 'More leads' }, href: '/cas-clients/resultats/plus-de-leads' },
        { label: { fr: 'Réduction du temps marketing', en: 'Less marketing time' }, href: '/cas-clients/resultats/reduction-temps-marketing' },
        { label: { fr: 'Centralisation des données', en: 'Data centralization' }, href: '/cas-clients/resultats/centralisation-donnees' },
        { label: { fr: 'Automatisation des processus', en: 'Process automation' }, href: '/cas-clients/resultats/automatisation-processus' },
        { label: { fr: 'Meilleure qualification commerciale', en: 'Better sales qualification' }, href: '/cas-clients/resultats/qualification-commerciale' },
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
      kicker: { fr: 'STUDIO & VISION', en: 'STUDIO & VISION' },
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
  FORMULES,
  CAS,
  RESSOURCES,
  AGENCE,
];

export function getMegaMenuSection(parent: string): MegaMenuSection | undefined {
  return MEGA_MENU.find((section) => section.parent === parent);
}
