// FORK : nav spécifique Waimia (labels, routes, panneaux détail), à réécrire
// pour un fork (cf FORK.md § Limites connues).
//
// Waimia · structure mega-menu V3 simplifiée (2026-05-17)
// Ressources et Agence sont explicitement définies ici.
// Les autres sections restent mappées depuis sitemap.ts pour conserver le contenu validé.

import type { Lang } from '../lib/i18n';
import { AUDIT_PROMISE } from './conversion';
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

/**
 * Carte illustrée sous les liens d'une colonne (2026-10-11) : illustration 7:3
 * (1456×624, `public/images/illustrations/ds/<slug>-paper.webp`), titre, une ligne
 * et un lien. Un seul `<a>` porte toute la carte. Rendue dans les colonnes
 * classiques (`links`) du mega panel desktop ET du sheet mobile.
 */
export interface MegaMenuCard {
  title: BiText;
  body: BiText;
  cta: BiText;
  href: string;
  /** Chemin public/ de l'illustration, ratio 7:3 (1456×624). */
  image: string;
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
   * Carte illustrée sous les liens de la colonne (cf `MegaMenuCard`).
   */
  card?: MegaMenuCard;
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
  /**
   * Dimensions réelles `[largeur, hauteur]` de `image` (attributs width/height, CLS) ;
   * défaut 1536×1024 (visuels `besoins/`). Illustrations DS `ds/` : 1456×624.
   */
  imageSize?: [number, number];
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

// ─── RESSOURCES · allégé (2026-10-06, demande Simon : « un hub, quelques liens importants,
// Tout voir »). Vues filtrées guides, comparatifs et outils, blog, plus le guide pilier en bloc
// mis en avant ; deux cartes illustrées (diagnostic, calculateur) occupent le bas des colonnes.
// Chaque colonne reste à 4 liens au plus (Décider : guides, comparatifs, outils). Le détail (tous les guides, comparatifs,
// outils et articles, filtrables par type) vit sur l'index unifié /ressources, lié par
// « Tout voir ». Les hubs sont indexables dès 3 pages filles (règle calculée, hub-index.ts).
const RESSOURCES: MegaMenuSection = {
  parent: 'ressources',
  label: MM_RESOURCES.label,
  parentHref: MM_RESOURCES.href,
  matchPrefixes: ['/ressources', '/blog'],
  lead: {
    fr: 'Guides, comparatifs et outils pour décider où l\'IA vaut le coup dans une PME.',
    en: 'Guides, comparisons and tools to decide where AI is worth it in an SME.',
  },
  columns: [
    {
      kicker: { fr: 'APPRENDRE', en: 'LEARN' },
      title: { fr: 'Apprendre', en: 'Learn' },
      links: [
        {
          label: { fr: 'Blog', en: 'Blog' },
          href: '/blog',
          description: {
            fr: 'Notes de terrain sur l\'IA et l\'automatisation.',
            en: 'Field notes on AI and automation.',
          },
        },
      ],
      card: {
        title: { fr: 'Diagnostic de maturité IA', en: 'AI maturity diagnostic' },
        body: {
          fr: 'Dix questions, un niveau de 1 à 5 et le point à traiter en premier.',
          en: 'Ten questions, a level from 1 to 5 and the first point to fix.',
        },
        cta: { fr: 'Faire le diagnostic →', en: 'Take the diagnostic →' },
        href: '/ressources/diagnostics/maturite-ia',
        image: '/images/illustrations/ds/outil-diagnostic-maturite-ia-paper.webp',
      },
    },
    {
      kicker: { fr: 'DÉCIDER', en: 'DECIDE' },
      title: { fr: 'Décider', en: 'Decide' },
      links: [
        {
          label: { fr: 'Comparatifs', en: 'Comparisons' },
          href: '/ressources/comparatifs',
          description: {
            fr: 'Deux outils face à face, l\'arbitrage tranché.',
            en: 'Two tools side by side, the call made plainly.',
          },
        },
        {
          label: { fr: 'Guides', en: 'Guides' },
          href: '/ressources/guides',
          description: {
            fr: 'Les guides pratiques, du cadrage au déploiement.',
            en: 'Practical guides, from scoping to rollout.',
          },
        },
        {
          label: { fr: 'Outils gratuits', en: 'Free tools' },
          href: '/ressources/outils',
          description: {
            fr: 'Calculateurs, grilles et modèles, sans inscription.',
            en: 'Calculators, grids and templates, no sign-up.',
          },
        },
      ],
      card: {
        title: { fr: 'Calculateur ROI IA', en: 'AI ROI calculator' },
        body: {
          fr: 'Vos heures et votre coût horaire : le temps récupérable, chiffré en deux minutes.',
          en: 'Your hours and hourly cost: the recoverable time, priced in two minutes.',
        },
        cta: { fr: 'Calculer mon ROI →', en: 'Calculate my ROI →' },
        href: '/ressources/outils/calculateur-roi-ia',
        image: '/images/illustrations/ds/outil-calculateur-roi-ia-paper.webp',
      },
    },
  ],
  featured: {
    kicker: { fr: 'GUIDE COMPLET', en: 'COMPLETE GUIDE' },
    label: { fr: 'Déployer Claude en PME', en: 'Deploying Claude in an SME' },
    body: {
      fr: 'Quel produit pour quel besoin, ce que ça coûte, les risques et l\'ordre de déploiement.',
      en: 'Which product for which need, what it costs, the risks and the rollout order.',
    },
    cta: { fr: 'Lire le guide →', en: 'Read the guide →' },
    href: '/ressources/guides/claude-pme',
    image: '/images/illustrations/ds/claude-pme-hub-carrefour-paper.webp',
    imageSize: [1456, 624],
  },
};

const SOLUTIONS: MegaMenuSection = {
  parent: 'solutions',
  label: { fr: 'Solutions', en: 'Solutions' },
  parentHref: '/services',
  matchPrefixes: ['/services', '/formations', '/audit-ia-pme'],
  lead: {
    fr: 'Studio de développement IA et cabinet d\'automatisation des processus pour PME et ETI.',
    en: 'AI development studio and process automation practice for SMEs.',
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
                    { label: { fr: 'Agent de qualification de leads', en: 'Lead qualification agent' }, href: '/services/agent-qualification-leads' },
                    { label: { fr: 'Agent de traitement de documents', en: 'Document processing agent' }, href: '/services/agent-traitement-documents' },
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
                  label: { fr: 'Autres modèles', en: 'Other models' },
                  links: [
                    { label: { fr: 'Intégration Mistral AI, angle européen', en: 'Mistral AI integration, European angle' }, href: '/services/integration-mistral-ai' },
                    { label: { fr: 'Intégration ChatGPT et OpenAI', en: 'ChatGPT and OpenAI integration' }, href: '/services/integration-chatgpt-openai' },
                  ],
                },
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
              fr: AUDIT_PROMISE.general.short.fr,
              en: AUDIT_PROMISE.general.short.en,
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
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'MVP SaaS', en: 'SaaS MVP' }, href: '/services/mvp-saas' },
                    { label: { fr: 'Portail client', en: 'Client portal' }, href: '/services/portail-client' },
                    { label: { fr: 'Back-office sur mesure', en: 'Custom back office' }, href: '/services/back-office-sur-mesure' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Données et reporting', en: 'Data and reporting' },
              href: '/services/donnees-reporting',
              description: { fr: 'Centraliser les données et automatiser le reporting de pilotage.', en: 'Centralise data and automate management reporting.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Tableau de bord de direction', en: 'Management dashboard' }, href: '/services/tableau-de-bord-direction' },
                    { label: { fr: 'Centralisation des données', en: 'Data centralisation' }, href: '/services/centralisation-donnees' },
                    { label: { fr: 'Reporting automatisé', en: 'Automated reporting' }, href: '/services/reporting-automatise' },
                  ],
                },
              ],
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
          label: { fr: 'Site web, SEO et marque', en: 'Website, SEO and brand' },
          key: 'web',
          href: '/services/systeme-acquisition',
          hubLabel: { fr: 'Voir le site, le référencement et la marque →', en: 'See website, search and brand →' },
          description: { fr: 'Créer ou refaire le site, être trouvé sur Google et par les moteurs IA, poser la marque.', en: 'Build or rebuild the website, be found on Google and by AI engines, set the brand.' },
          links: [
            {
              label: { fr: 'Agence site web', en: 'Web agency' },
              href: '/services/site-web-ia',
              description: { fr: 'Un site qui convertit, sur la plateforme adaptée à votre équipe.', en: 'A website that converts, on the platform that fits your team.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Agence Webflow', en: 'Webflow agency' }, href: '/services/webflow' },
                    { label: { fr: 'Agence WordPress', en: 'WordPress agency' }, href: '/services/wordpress' },
                    { label: { fr: 'Agence Shopify', en: 'Shopify agency' }, href: '/services/shopify' },
                    { label: { fr: 'Site sur mesure', en: 'Custom website' }, href: '/services/sur-mesure-headless' },
                    { label: { fr: 'Landing pages et tunnels', en: 'Landing pages and funnels' }, href: '/services/landing-pages-tunnels' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Agence SEO et référencement naturel', en: 'SEO and organic search agency' },
              href: '/services/seo-geo-contenu',
              description: { fr: 'Être trouvé sur Google : audit, contenu et SEO local.', en: 'Be found on Google: audit, content and local SEO.' },
              detail: [
                {
                  label: { fr: 'Déclinaisons', en: 'Editions' },
                  links: [
                    { label: { fr: 'Audit SEO technique', en: 'Technical SEO audit' }, href: '/services/audit-seo-technique' },
                    { label: { fr: 'Agence GEO : être cité par les IA', en: 'GEO agency: get cited by AI' }, href: '/services/referencement-ia' },
                    { label: { fr: 'Rédaction SEO et contenu', en: 'SEO writing and content' }, href: '/services/redaction-seo-contenu' },
                    { label: { fr: 'SEO local', en: 'Local SEO' }, href: '/services/seo-local' },
                  ],
                },
              ],
            },
            {
              label: { fr: 'Agence de branding', en: 'Branding agency' },
              href: '/services/branding',
              description: { fr: 'Une marque claire, du positionnement à la charte graphique.', en: 'A clear brand, from positioning to the brand book.' },
              detail: [
                {
                  label: { fr: 'Offres', en: 'Offers' },
                  links: [
                    { label: { fr: 'Identité de marque', en: 'Brand identity' }, href: '/services/identite-de-marque' },
                    { label: { fr: 'Refonte de marque', en: 'Rebranding' }, href: '/services/refonte-de-marque' },
                    { label: { fr: 'Naming et positionnement', en: 'Naming and positioning' }, href: '/services/naming-et-positionnement' },
                    { label: { fr: 'Charte graphique et brand book', en: 'Brand guidelines and brand book' }, href: '/services/charte-graphique-brand-book' },
                  ],
                },
              ],
            },
          ],
          featured: {
            kicker: { fr: 'VISIBILITÉ', en: 'VISIBILITY' },
            label: { fr: 'Site, référencement et marque', en: 'Website, search and brand' },
            body: {
              fr: 'Le site, le référencement et la marque amènent la demande que les automatisations traitent ensuite.',
              en: 'The website, search and brand bring the demand the automations then process.',
            },
            cta: { fr: 'Voir le système d\'acquisition →', en: 'See the acquisition system →' },
            href: '/services/systeme-acquisition',
            image: '/images/besoins/besoin-acquerir.webp',
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
              description: AUDIT_PROMISE.general.tiny,
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
          description: { fr: 'Prospection outillée, CRM branché et relances automatiques : les mêmes briques d\'automatisation, appliquées au pipeline commercial.', en: 'Tool-driven prospecting, connected CRM and automatic follow-ups: the same automation building blocks, applied to the sales pipeline.' },
          links: [
            {
              label: { fr: 'Prospection et CRM', en: 'Prospecting and CRM' },
              href: '/services/systeme-commercial',
              description: { fr: 'Prospection outillée, CRM branché et relances automatiques.', en: 'Tool-driven prospecting, connected CRM and automatic follow-ups.' },
              detail: [
                {
                  label: { fr: 'Prospection automatisée', en: 'Automated prospecting' },
                  links: [
                    { label: { fr: 'Prospection automatisée, vue d\'ensemble', en: 'Automated prospecting, overview' }, href: '/services/prospection-automatisee' },
                    { label: { fr: 'Prospection LinkedIn', en: 'LinkedIn prospecting' }, href: '/services/prospection-linkedin' },
                    { label: { fr: 'Social selling avec l\'IA', en: 'Social selling with AI' }, href: '/services/social-selling-ia' },
                    { label: { fr: 'Réseaux sociaux', en: 'Social media' }, href: '/services/automatisation-reseaux-sociaux' },
                    { label: { fr: 'Cold email B2B', en: 'B2B cold email' }, href: '/services/cold-email-b2b' },
                  ],
                },
                {
                  label: { fr: 'CRM et suivi', en: 'CRM and follow-up' },
                  links: [
                    { label: { fr: 'CRM, scoring et routing', en: 'CRM, scoring and routing' }, href: '/services/crm-scoring-routing' },
                  ],
                },
              ],
            },
          ],
          featured: {
            kicker: { fr: 'COMMERCIAL', en: 'SALES' },
            label: { fr: 'Outils commerciaux', en: 'Sales tooling' },
            body: {
              fr: 'Prospection, scoring et affectation dans le CRM, relances déclenchées par le comportement.',
              en: 'Prospecting, scoring and assignment in the CRM, follow-ups triggered by behaviour.',
            },
            cta: { fr: 'Voir les outils commerciaux →', en: 'See sales tooling →' },
            href: '/services/systeme-commercial',
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
    fr: 'Partir du problème ou de la fonction, pas de la technologie.',
    en: 'Start from the problem or the function, not the technology.',
  },
  columns: [
    {
      kicker: { fr: 'PAR PROBLÈME', en: 'BY PROBLEM' },
      title: { fr: 'Par problème', en: 'By problem' },
      goal: { fr: 'Rendre du temps aux équipes', en: 'Give time back to teams' },
      links: [
        { label: { fr: "Automatiser l'administratif", en: 'Automate admin work' }, href: '/cas-usages/standardiser-processus' },
        { label: { fr: 'Centraliser données et reporting', en: 'Centralise data and reporting' }, href: '/cas-usages/centraliser-donnees' },
        { label: { fr: 'Automatiser le suivi commercial', en: 'Automate sales follow-up' }, href: '/cas-usages/generer-plus-de-leads' },
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
        { label: { fr: 'Audit IA PME', en: 'SME AI audit' }, href: '/audit-ia-pme' },
      ],
    },
  ],
  featured: {
    kicker: { fr: 'VOTRE CAS', en: 'YOUR CASE' },
    label: { fr: 'Votre problème n\'est pas dans la liste ?', en: 'Your problem is not listed?' },
    body: {
      fr: AUDIT_PROMISE.general.short.fr,
      en: AUDIT_PROMISE.general.short.en,
    },
    cta: { fr: 'Réserver un audit →', en: 'Book an audit →' },
    href: AUDIT_BOOKING_HREF,
    image: '/images/editorial/image-style-12.webp',
    imageSize: [1456, 624],
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
        { label: { fr: 'Waimia OS', en: 'Waimia OS' }, href: '/cas-clients/waimia-os', description: { fr: 'OS à agents IA multi-entreprises, en construction.', en: 'Multi-company agentic OS, under construction.' } },
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
    fr: 'Un studio solo basé à Bordeaux : un ingénieur qui travaille avec vos équipes métier.',
    en: 'A solo studio based in Bordeaux: one engineer working with your business teams.',
  },
  columns: [
    {
      kicker: { fr: 'LE STUDIO', en: 'THE STUDIO' },
      title: { fr: 'Le studio', en: 'The studio' },
      links: [
        {
          label: { fr: 'À propos', en: 'About' },
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
        {
          label: { fr: 'Implantations', en: 'Locations' },
          href: '/implantations',
          description: {
            fr: 'Bordeaux, Montpellier, Lyon, Paris et à distance.',
            en: 'Bordeaux, Montpellier, Lyon, Paris and remote.',
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
        },
        {
          label: { fr: 'Tarifs', en: 'Pricing' },
          href: '/tarifs',
          description: {
            fr: 'Audit gratuit, sprint à 999 € HT, pilote dès 2 000 € HT.',
            en: 'Free audit, sprint at 999 € ex VAT, pilot from 2,000 € ex VAT.',
          },
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
