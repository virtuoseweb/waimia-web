// FORK : nav spécifique Waimia (labels, routes, panneaux détail), à réécrire
// pour un fork (cf FORK.md § Limites connues).
//
// Waimia · structure mega-menu V3 simplifiée (2026-05-17)
// Ressources et Agence sont explicitement définies ici.
// Les autres sections restent mappées depuis sitemap.ts pour conserver le contenu validé.

import type { Lang } from '../lib/i18n';
import {
  AUDIT_BOOKING_HREF,
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
  /** Libellé du lien vers `href` en pied de panneau (défaut : « Voir le système → »). */
  hubLabel?: BiText;
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

// Prise de rendez-vous : AUDIT_BOOKING_HREF (source unique : sitemap.ts). `/audit-ia-pme`
// PRÉSENTE l'audit (liens « Audit IA PME ») ; les « Réserver un audit » mènent au contact.

// ─── RESSOURCES · uniquement des pages indexables (les index /ressources/guides,
// /comparatifs et /outils sont noindex, /ressources/diagnostics est redirigé : on lie les
// pages de contenu directement).
const RESSOURCES: MegaMenuSection = {
  parent: 'ressources',
  label: MM_RESOURCES.label,
  parentHref: MM_RESOURCES.href,
  matchPrefixes: ['/ressources', '/blog'],
  lead: {
    fr: 'Guides, comparatifs et outils pour décider où l\'IA et l\'automatisation valent le coup dans une PME.',
    en: 'Guides, comparisons and tools to decide where AI and automation are worth it in an SME.',
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
            fr: 'Notes de terrain sur l\'IA et l\'automatisation en PME.',
            en: 'Field notes on AI and automation in SMEs.',
          },
          featured: true,
        },
        {
          label: { fr: 'Déployer Claude en PME', en: 'Deploying Claude in an SME' },
          href: '/ressources/guides/claude-pme',
          description: {
            fr: 'Le guide pilier, avec un guide par produit.',
            en: 'The pillar guide, with one guide per product.',
          },
        },
      ],
      footer: {
        label: { fr: 'Tous les guides →', en: 'All guides →' },
        href: '/ressources/guides',
      },
    },
    {
      kicker: { fr: 'COMPARER', en: 'COMPARE' },
      title: { fr: 'Comparer', en: 'Compare' },
      links: [
        {
          label: { fr: 'Claude ou ChatGPT pour une PME', en: 'Claude or ChatGPT for an SME' },
          href: '/ressources/comparatifs/claude-vs-chatgpt-pme',
        },
        {
          label: { fr: 'n8n ou Make', en: 'n8n or Make' },
          href: '/ressources/comparatifs/n8n-vs-make',
        },
      ],
      footer: {
        label: { fr: 'Tous les comparatifs →', en: 'All comparisons →' },
        href: '/ressources/comparatifs',
      },
    },
    {
      kicker: { fr: 'MESURER', en: 'MEASURE' },
      title: { fr: 'Outils', en: 'Tools' },
      links: [
        {
          label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' },
          href: '/ressources/outils/calculateur-roi-ia',
        },
        {
          label: { fr: 'Diagnostic de maturité IA', en: 'AI maturity diagnostic' },
          href: '/ressources/diagnostics/maturite-ia',
        },
      ],
      footer: {
        label: { fr: 'Tous les outils →', en: 'All tools →' },
        href: '/ressources/outils',
      },
    },
  ],
};

const SOLUTIONS: MegaMenuSection = {
  parent: 'solutions',
  label: { fr: 'Solutions', en: 'Solutions' },
  parentHref: '/services',
  matchPrefixes: ['/services', '/formations', '/audit-ia-pme'],
  lead: {
    fr: 'Studio de développement IA et cabinet d\'automatisation des processus pour PME et ETI. Le site web et la prospection sont des outils, pas le métier.',
    en: 'AI development studio and process automation practice for SMEs. The website and prospecting are tools, not the job.',
  },
  columns: [
    {
      kicker: { fr: 'CE QU\'ON FAIT', en: 'WHAT WE DO' },
      title: { fr: 'Ce qu\'on fait', en: 'What we do' },
      systems: [
        {
          label: { fr: 'Automatisation et agents IA', en: 'Automation and AI agents' },
          key: 'ia',
          href: '/services/systemes-operationnels-ia',
          hubLabel: { fr: 'Voir l\'offre automatisation →', en: 'See the automation offer →' },
          description: { fr: 'Supprimer la ressaisie, faire exécuter les tâches répétitives, brancher l\'IA à vos outils.', en: 'Remove re-keying, have repetitive tasks executed, connect AI to your tools.' },
          links: [
            {
              label: { fr: 'Automatisation des processus', en: 'Process automation' },
              href: '/services/automatisations',
              description: { fr: 'Les workflows qui suppriment la ressaisie entre vos outils.', en: 'Workflows that remove re-keying between your tools.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Agence n8n', en: 'n8n agency' }, href: '/services/automatisation-n8n' },
                    { label: { fr: 'Agence Make', en: 'Make agency' }, href: '/services/automatisation-make' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Agents IA', en: 'AI agents' },
              href: '/services/agents-ia',
              description: { fr: 'Des agents branchés à vos outils, qui exécutent sous supervision.', en: 'Agents connected to your tools, executing under supervision.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Agent support client', en: 'Customer support agent' }, href: '/services/agent-support-client' },
                    { label: { fr: 'Base de connaissance IA', en: 'AI knowledge base' }, href: '/services/base-de-connaissance-ia' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Intégration Claude', en: 'Claude integration' },
              href: '/services/integration-claude',
              description: { fr: 'Claude, ChatGPT ou Mistral branchés à vos outils métier, en production.', en: 'Claude, ChatGPT or Mistral connected to your business tools, in production.' },
              detail: [
                {
                  label: { fr: 'Pour décider', en: 'To decide' },
                  links: [
                    { label: { fr: 'Guide : déployer Claude en PME', en: 'Guide: deploying Claude in an SME' }, href: '/ressources/guides/claude-pme' },
                    { label: { fr: 'Claude ou ChatGPT pour une PME', en: 'Claude or ChatGPT for an SME' }, href: '/ressources/comparatifs/claude-vs-chatgpt-pme' },
                    { label: { fr: 'Formation Claude', en: 'Claude training' }, href: '/formations/claude' },
                  ],
                },
              ],
            },
          ],
          featured: {
            kicker: { fr: 'PREMIÈRE ÉTAPE', en: 'FIRST STEP' },
            label: { fr: 'Audit IA gratuit', en: 'Free AI audit' },
            body: {
              fr: 'Quarante-cinq minutes en visio pour repérer trois automatisations rentables dans vos processus. Sans engagement.',
              en: 'Forty-five minutes on a call to spot three profitable automations in your processes. No commitment.',
            },
            cta: { fr: 'En savoir plus sur l\'audit →', en: 'More about the audit →' },
            href: '/audit-ia-pme',
            image: '/images/besoins/besoin-operer.webp',
          },
        },
        {
          label: { fr: 'Applications métier', en: 'Business applications' },
          key: 'apps',
          href: '/services/applications-internes',
          hubLabel: { fr: 'Voir les applications métier →', en: 'See business applications →' },
          description: { fr: 'Développer l\'outil sur mesure que le tableur ou le logiciel du marché ne remplace plus.', en: 'Build the custom tool that the spreadsheet or off-the-shelf software no longer replaces.' },
          links: [
            {
              label: { fr: 'Applications internes', en: 'Internal applications' },
              href: '/services/applications-internes',
              description: { fr: 'L\'application métier sur mesure, branchée à vos données. Vous gardez le code.', en: 'The custom business application, connected to your data. You keep the code.' },
                          },
            {
              label: { fr: 'Données et reporting', en: 'Data and reporting' },
              href: '/services/donnees-reporting',
              description: { fr: 'Centraliser les données et automatiser le reporting de pilotage.', en: 'Centralise data and automate management reporting.' },
                          },
          ],
          featured: {
            kicker: { fr: 'APPLICATION MÉTIER', en: 'BUSINESS APPLICATION' },
            label: { fr: 'Développer ou acheter ?', en: 'Build or buy?' },
            body: {
              fr: 'Avant de développer, on vérifie qu\'un outil du marché ne fait pas déjà le travail. La grille de décision est publique.',
              en: 'Before building, we check that an off-the-shelf tool does not already do the job. The decision grid is public.',
            },
            cta: { fr: 'Lire la grille de décision →', en: 'Read the decision grid →' },
            href: '/blog/applications-internes-build-vs-buy-pme',
            image: '/images/besoins/besoin-piloter.webp',
          },
        },
        {
          label: { fr: 'Conseil et formation', en: 'Advisory and training' },
          key: 'conseil',
          href: '/services/consultant-ia-claude',
          hubLabel: { fr: 'Voir le conseil IA →', en: 'See AI advisory →' },
          description: { fr: 'Savoir où l\'IA crée de la valeur avant d\'investir, puis rendre les équipes autonomes.', en: 'Know where AI creates value before investing, then make teams autonomous.' },
          links: [
            {
              label: { fr: 'Audit IA PME', en: 'SME AI audit' },
              href: '/audit-ia-pme',
              description: { fr: 'Gratuit, 45 minutes : trois automatisations rentables identifiées.', en: 'Free, 45 minutes: three profitable automations identified.' },
              detail: [
                {
                  label: { fr: 'Préparer l\'audit', en: 'Prepare the audit' },
                  links: [
                    { label: { fr: 'Diagnostic maturité IA', en: 'AI maturity diagnostic' }, href: '/ressources/diagnostics/maturite-ia' },
                    { label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' }, href: '/ressources/outils/calculateur-roi-ia' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Consultant IA', en: 'AI consultant' },
              href: '/services/consultant-ia-claude',
              description: { fr: 'Feuille de route, gouvernance et montée en compétence des équipes.', en: 'Roadmap, governance and team upskilling.' },
                          },
            {
              label: { fr: 'Formations', en: 'Training' },
              href: '/formations',
              description: { fr: 'IA et automatisation, pour que vos équipes reprennent la main.', en: 'AI and automation, so your teams take over.' },
              detail: [
                {
                  label: { fr: 'Programmes', en: 'Programmes' },
                  links: [
                    { label: { fr: 'Formation automatisation', en: 'Automation training' }, href: '/formations/automatisation' },
                    { label: { fr: 'Formation n8n', en: 'n8n training' }, href: '/formations/n8n' },
                    { label: { fr: 'Formation Make', en: 'Make training' }, href: '/formations/make' },
                    { label: { fr: 'Formation Claude', en: 'Claude training' }, href: '/formations/claude' },
                    { label: { fr: 'Formation ChatGPT', en: 'ChatGPT training' }, href: '/formations/chatgpt' },
                  ],
                },
              ],
            },
          ],
          featured: {
            kicker: { fr: 'MÉTHODE', en: 'METHOD' },
            label: { fr: 'Audit, pilote, mesure, transfert', en: 'Audit, pilot, measure, handover' },
            body: {
              fr: 'Un ingénieur qui travaille avec vos équipes métier, du premier audit au transfert du code et des workflows.',
              en: 'An engineer working with your business teams, from the first audit to the handover of code and workflows.',
            },
            cta: { fr: 'Voir la méthode →', en: 'See the method →' },
            href: '/agence/methode',
            image: '/images/besoins/besoin-operer.webp',
          },
        },
        {
          label: { fr: 'Outils commerciaux', en: 'Sales tooling' },
          key: 'commercial',
          href: '/services/systeme-commercial',
          hubLabel: { fr: 'Voir les outils commerciaux →', en: 'See sales tooling →' },
          description: { fr: 'En appui : prospection, CRM et relances automatisés, branchés au reste du système.', en: 'In support: automated prospecting, CRM and follow-ups, connected to the rest of the system.' },
          links: [
            {
              label: { fr: 'Prospection automatisée', en: 'Automated prospecting' },
              href: '/services/prospection-automatisee',
              description: { fr: 'Prospection multicanale automatisée, branchée à votre CRM.', en: 'Automated multichannel prospecting, connected to your CRM.' },
                          },
            {
              label: { fr: 'CRM, scoring et routing', en: 'CRM, scoring and routing' },
              href: '/services/crm-scoring-routing',
              description: { fr: 'CRM branché, scoring des leads et affectation au bon commercial.', en: 'Connected CRM, lead scoring and assignment to the right rep.' },
                          },
            {
              label: { fr: 'Séquences de suivi', en: 'Follow-up sequences' },
              href: '/services/sequences-de-suivi',
              description: { fr: 'Relances automatisées déclenchées par le comportement.', en: 'Automated follow-ups triggered by behaviour.' },
                          },
          ],
          featured: {
            kicker: { fr: 'EN APPUI', en: 'IN SUPPORT' },
            label: { fr: 'Outils commerciaux', en: 'Sales tooling' },
            body: {
              fr: 'Un CRM branché et une prospection outillée (Apollo, Lemlist, Pharow). Un outil du système, pas une prestation d\'agence.',
              en: 'A connected CRM and tool-driven prospecting (Apollo, Lemlist, Pharow). A tool of the system, not an agency service.',
            },
            cta: { fr: 'Voir les outils commerciaux →', en: 'See sales tooling →' },
            href: '/services/systeme-commercial',
            image: '/images/besoins/besoin-acquerir.webp',
          },
        },
        {
          label: { fr: 'Visibilité web', en: 'Web visibility' },
          key: 'acquisition',
          href: '/services/systeme-acquisition',
          hubLabel: { fr: 'Voir les outils de visibilité →', en: 'See visibility tooling →' },
          description: { fr: 'En appui : site, référencement Google et moteurs IA, pages de conversion.', en: 'In support: website, Google and AI-engine visibility, conversion pages.' },
          links: [
            {
              label: { fr: 'Site web IA', en: 'AI website' },
              href: '/services/site-web-ia',
              description: { fr: 'Un site rapide, mesuré, branché au CRM et lisible par les moteurs IA.', en: 'A fast, measured site, connected to the CRM and readable by AI engines.' },
                          },
            {
              label: { fr: 'SEO, GEO et contenu', en: 'SEO, GEO and content' },
              href: '/services/seo-geo-contenu',
              description: { fr: 'Être trouvé par Google et cité par les moteurs IA.', en: 'Be found by Google and cited by AI engines.' },
                          },
            {
              label: { fr: 'Landing pages et tunnels', en: 'Landing pages and funnels' },
              href: '/services/landing-pages-tunnels',
              description: { fr: 'Pages de conversion reliées au CRM.', en: 'Conversion pages connected to the CRM.' },
                          },
          ],
          featured: {
            kicker: { fr: 'EN APPUI', en: 'IN SUPPORT' },
            label: { fr: 'Visibilité web', en: 'Web visibility' },
            body: {
              fr: 'Le site et le référencement sont des outils au service du système : ils amènent la demande que les automatisations traitent ensuite.',
              en: 'The website and search visibility are tools serving the system: they bring the demand the automations then process.',
            },
            cta: { fr: 'Voir les outils de visibilité →', en: 'See visibility tooling →' },
            href: '/services/systeme-acquisition',
            image: '/images/besoins/besoin-piloter.webp',
          },
        },
      ],
      links: [],
    },
    // Col 2 · PANNEAU DYNAMIQUE jumeau du sélecteur (modules du domaine actif).
    {
      systemsPanel: true,
      title: { fr: 'Modules', en: 'Modules' },
      links: [],
    },
    // Col 3 · détail du module survolé (blocs `detail` portés par chaque module).
    {
      kicker: { fr: 'POUR ALLER PLUS LOIN', en: 'GO FURTHER' },
      title: { fr: 'Pour aller plus loin', en: 'Go further' },
      moduleDetail: true,
      links: [],
    },
  ],
  };

// ─── CAS D'USAGE · remplace « Nos formules » (refonte positionnement 2026-10). Deux entrées,
// comme sur le hub /cas-usages : par problème à résoudre (les trois pages historiques) et par
// fonction de l'entreprise (support, comptabilité, RH : vague 2, 2026-10-05). « Tarifs » vit
// dans « Le studio ».
const CAS_USAGES: MegaMenuSection = {
  parent: 'cas-usages',
  label: { fr: 'Cas d\'usage', en: 'Use cases' },
  parentHref: '/cas-usages',
  matchPrefixes: ['/cas-usages'],
  lead: {
    fr: 'Partir du problème ou de la fonction, pas de la technologie : ce qu\'on automatise, dans quel ordre et où sont les limites.',
    en: 'Start from the problem or the function, not the technology: what we automate, in what order and where the limits are.',
  },
  columns: [
    {
      kicker: { fr: 'PAR PROBLÈME', en: 'BY PROBLEM' },
      title: { fr: 'Par problème', en: 'By problem' },
      goal: { fr: 'Rendre du temps aux équipes', en: 'Give time back to teams' },
      links: [
        { label: { fr: "Automatiser l'administratif", en: 'Standardize processes' }, href: '/cas-usages/standardiser-processus' },
        { label: { fr: 'Centraliser données et reporting', en: 'Centralize data' }, href: '/cas-usages/centraliser-donnees' },
        { label: { fr: 'Automatiser le suivi commercial', en: 'Generate more leads' }, href: '/cas-usages/generer-plus-de-leads' },
      ],
    },
    {
      kicker: { fr: 'PAR FONCTION', en: 'BY FUNCTION' },
      title: { fr: 'Par fonction', en: 'By function' },
      goal: { fr: 'Voir ce qui se fait dans votre métier', en: 'See what is done in your function' },
      links: [
        { label: { fr: 'Service client et SAV', en: 'Customer service and after-sales' }, href: '/cas-usages/support-sav' },
        { label: { fr: 'Finance et comptabilité', en: 'Finance and accounting' }, href: '/cas-usages/finance-comptabilite' },
        { label: { fr: 'Ressources humaines', en: 'Human resources' }, href: '/cas-usages/rh' },
      ],
    },
    {
      kicker: { fr: 'CHIFFRER', en: 'ESTIMATE' },
      title: { fr: 'Chiffrer le gain', en: 'Estimate the gain' },
      goal: { fr: 'Savoir si ça vaut le coup', en: 'Know if it is worth it' },
      links: [
        { label: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' }, href: '/ressources/outils/calculateur-roi-ia' },
        { label: { fr: 'Grille des tâches à automatiser', en: 'Task automation grid' }, href: '/ressources/outils/grille-taches-a-automatiser' },
        { label: { fr: 'Diagnostic maturité IA', en: 'AI maturity diagnostic' }, href: '/ressources/diagnostics/maturite-ia' },
        { label: { fr: 'Audit IA PME', en: 'SME AI audit' }, href: '/audit-ia-pme' },
      ],
    },
  ],
  featured: {
    kicker: { fr: 'VOTRE CAS', en: 'YOUR CASE' },
    label: { fr: 'Votre problème n\'est pas dans la liste ?', en: 'Your problem is not listed?' },
    body: {
      fr: 'L\'audit gratuit de 45 minutes part de vos processus réels et repère trois automatisations rentables.',
      en: 'The free 45-minute audit starts from your real processes and spots three profitable automations.',
    },
    cta: { fr: 'Réserver un audit →', en: 'Book an audit →' },
    href: AUDIT_BOOKING_HREF,
    image: '/images/editorial/image-style-12.webp',
  },
};

// ─── RÉALISATIONS · ex « Cas clients » (libellé seul : les URL /cas-clients ne changent pas).
// Mêmes deux rubriques que le hub : réalisations clients (deux colonnes, par nature du
// travail) et projets internes (vague 2, 2026-10-05). Les /secteurs/* (noindex) sortent du menu.
const CAS: MegaMenuSection = {
  parent: 'cas',
  label: { fr: 'Réalisations', en: 'Work' },
  parentHref: '/cas-clients',
  matchPrefixes: ['/cas-clients', '/secteurs'],
  lead: {
    fr: 'Des missions clients et des projets internes, documentés. Les chiffres cités viennent des fiches, jamais d\'une moyenne.',
    en: 'Client engagements and internal projects, documented. The figures quoted come from the case pages, never from an average.',
  },
  columns: [
    {
      kicker: { fr: 'MISSIONS CLIENTS', en: 'CLIENT ENGAGEMENTS' },
      title: { fr: 'Missions clients', en: 'Client engagements' },
      links: [
        { label: { fr: 'Amploi', en: 'Amploi' }, href: '/cas-clients/amploi', description: { fr: 'RH · demandes routées automatiquement dans HubSpot.', en: 'HR · requests routed automatically into HubSpot.' } },
        { label: { fr: 'Inbound Value', en: 'Inbound Value' }, href: '/cas-clients/inbound-value', description: { fr: 'Agence · serveur MCP de hub de preuve sociale.', en: 'Agency · MCP server for a social proof hub.' } },
        { label: { fr: 'Les Carnets de Montpellier', en: 'Les Carnets de Montpellier' }, href: '/cas-clients/les-carnets-de-montpellier', description: { fr: 'Média local · abonnements, puis agent IA.', en: 'Local media · subscriptions, then an AI agent.' } },
      ],
      footer: {
        label: { fr: 'Toutes les réalisations →', en: 'All work →' },
        href: '/cas-clients',
      },
    },
    {
      kicker: { fr: 'PROJETS DU STUDIO', en: 'STUDIO PROJECTS' },
      title: { fr: 'Projets du studio', en: 'Studio projects' },
      links: [
        { label: { fr: 'Waimia OS', en: 'Waimia OS' }, href: '/cas-clients/waimia-os', description: { fr: 'OS agentique multi-entreprises, en construction.', en: 'Multi-company agentic OS, under construction.' } },
        { label: { fr: 'Prototypes internes', en: 'Internal prototypes' }, href: '/cas-clients/prototypes-internes', description: { fr: 'LegiCheck, agent d\'entretien, quiz.', en: 'LegiCheck, interview agent, quiz.' } },
      ],
    },
  ],
  featured: {
    kicker: { fr: 'CAS VEDETTE', en: 'FEATURED CASE' },
    label: { fr: 'Amploi', en: 'Amploi' },
    body: {
      fr: 'Livré en 6 semaines : capture des demandes et routage automatique dans HubSpot, site structuré pour être cité par les moteurs IA.',
      en: 'Delivered in 6 weeks: lead capture and automatic routing into HubSpot, site structured to be cited by AI engines.',
    },
    cta: { fr: 'Lire le cas →', en: 'Read the case →' },
    href: '/cas-clients/amploi',
    image: '/images/cas/cas-northbound.webp',
  },
};

// ─── LE STUDIO · ex « L'Agence » (libellé seul : les URL /agence ne changent pas).
// Reçoit « Tarifs » (ex-entrée « Nos formules » du premier niveau).
const AGENCE: MegaMenuSection = {
  parent: 'agence',
  label: { fr: 'Le studio', en: 'The studio' },
  parentHref: '/agence',
  matchPrefixes: ['/agence', '/tarifs', '/manifesto', '/technologies', '/equipe', '/implantations', '/conformite-ia'],
  lead: {
    fr: 'Un studio solo basé à Bordeaux, missions à distance. Un ingénieur qui travaille avec vos équipes métier.',
    en: 'A solo studio based in Bordeaux, working remotely. One engineer working with your business teams.',
  },
  columns: [
    {
      kicker: { fr: 'LE STUDIO', en: 'THE STUDIO' },
      title: { fr: 'Le studio', en: 'The studio' },
      links: [
        {
          label: { fr: 'À propos de Waimia', en: 'About Waimia' },
          href: '/agence',
        },
        {
          label: { fr: 'Simon Beros, fondateur', en: 'Simon Beros, founder' },
          href: '/equipe/simon-beros',
          description: {
            fr: 'L\'ingénieur qui audite, construit et transfère.',
            en: 'The engineer who audits, builds and hands over.',
          },
        },
      ],
    },
    {
      kicker: { fr: 'TRAVAILLER ENSEMBLE', en: 'WORKING TOGETHER' },
      title: { fr: 'Travailler ensemble', en: 'Working together' },
      links: [
        {
          label: { fr: 'Méthode', en: 'Method' },
          href: '/agence/methode',
          description: {
            fr: 'Audit, pilote, mesure, transfert.',
            en: 'Audit, pilot, measure, handover.',
          },
          featured: true,
        },
        {
          label: { fr: 'Tarifs', en: 'Pricing' },
          href: '/tarifs',
          description: {
            fr: 'Audit gratuit, sprint à 999 € HT, pilote dès 2 000 € HT.',
            en: 'Free audit, sprint at 999 € ex VAT, pilot from 2,000 € ex VAT.',
          },
          featured: true,
        },
      ],
    },
    {
      kicker: { fr: 'PRÉSENCE', en: 'PRESENCE' },
      title: { fr: 'Présence', en: 'Presence' },
      links: [
        {
          label: { fr: 'Bordeaux, Montpellier, Lyon, Paris', en: 'Bordeaux, Montpellier, Lyon, Paris' },
          href: '/implantations',
        },
      ],
      footer: {
        label: { fr: 'Réserver un audit →', en: 'Book an audit →' },
        href: AUDIT_BOOKING_HREF,
      },
    },
  ],
  featured: {
    kicker: { fr: 'STUDIO SOLO', en: 'SOLO STUDIO' },
    label: { fr: 'Bordeaux · à distance', en: 'Bordeaux · remote' },
    body: {
      fr: 'Un seul interlocuteur, celui qui fait le travail. Missions à Bordeaux, Montpellier, Lyon, Paris et à distance.',
      en: 'A single contact, the one who does the work. Engagements in Bordeaux, Montpellier, Lyon, Paris and remotely.',
    },
    cta: { fr: 'Découvrir le studio →', en: 'Discover the studio →' },
    href: '/agence',
    image: '/images/besoins/besoin-operer.webp',
  },
};

// Premier niveau (refonte positionnement 2026-10) :
// Solutions · Cas d'usage · Réalisations · Ressources · Le studio.
export const MEGA_MENU: MegaMenuSection[] = [
  SOLUTIONS,
  CAS_USAGES,
  CAS,
  RESSOURCES,
  AGENCE,
];

export function getMegaMenuSection(parent: string): MegaMenuSection | undefined {
  return MEGA_MENU.find((section) => section.parent === parent);
}
