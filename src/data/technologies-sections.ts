// ─────────────────────────────────────────────────────────────────────────────
// Stack et technologies · /technologies · sections en donnée
// ─────────────────────────────────────────────────────────────────────────────
// Refonte positionnement 2026-10 : la stack est celle d'un studio de développement IA et
// d'un cabinet d'automatisation. Ordre des couches = ordre de l'offre : automatisation,
// IA et agents, outils, données et applications, puis le web en dernier (voix humaine,
// 11 novembre 2026 : quatre couches de longueurs inégales au lieu de cinq blocs identiques).
// Retirés : la bande de « métriques » (1 / 0 / 100 %), la grille de logos (un mur de logos
// sous un hero qui disait « pas de catalogue de logos »), et les affirmations sur des
// produits tiers qui ne sont pas sourcées.
//
// La factory `technologiesSections(lang)` reçoit la langue pour les liens et le breadcrumb.
// Le JSON-LD `techLd` (dépend de SITE.url + Astro.url) reste dans la page (SEO/runtime).
import type { SectionByType } from '@waimia/ds-kernel';
import type { NumberedLayerListData } from '@waimia/ds-kernel/sections/numbered-layer-list/schema';
import { localizeHref, type Lang } from '../lib/i18n';
import { AUDIT_BOOKING_HREF } from './sitemap';
import { AUDIT_PROMISE, AUDIT_BOOKING_LABEL } from './conversion';

// ── Couches de la stack. Contenu FR (page FR-only) : les champs _en reflètent le FR. ──
const layers = [
  {
    n: '01',
    label: 'Automatisation',
    intro: 'Les workflows qui font circuler la donnée entre vos outils. La plateforme se choisit sur trois critères : où elle est hébergée, ce qu’elle coûte, et qui la maintiendra.',
    items: [
      'n8n pour les workflows que vous voulez maîtriser de bout en bout.',
      'Make quand votre équipe doit pouvoir lire et modifier les scénarios elle-même.',
      'Du code quand la logique dépasse ce qu’une plateforme sait faire proprement.',
      'Chaque workflow est documenté et remis avec ses accès.',
    ],
  },
  {
    n: '02',
    label: 'IA et agents',
    intro: 'Un modèle choisi par tâche, pas un seul pour tout. Les agents agissent dans un périmètre écrit, avec une validation humaine sur les actions sensibles.',
    items: [
      'Claude par défaut pour les agents ; OpenAI si votre équipe l’utilise déjà ; Mistral si vos données doivent rester chez un fournisseur européen.',
      'Des connecteurs standard (API, MCP) pour que l’agent lise vos outils sans accès superflu.',
      'Bases de connaissance pour répondre à partir de vos documents.',
      'Journal des actions et suivi des coûts de modèles.',
    ],
  },
  {
    n: '03',
    label: 'Vos outils, vos données, vos applications',
    intro: 'On branche l’existant, sans migration imposée. Quand aucun outil du marché ne fait le travail, on développe, avec des technologies courantes pour qu’un autre développeur puisse reprendre le code.',
    items: [
      'Excel, Outlook, votre ERP et votre CRM (HubSpot, Salesforce, Pipedrive) restent en place.',
      'PostgreSQL centralise ce qui est dispersé, et des tableaux de bord alimentés automatiquement remplacent le reporting manuel.',
      'Pour une application sur mesure : interface web en React, conçue avec ceux qui s’en servent, données et authentification sur PostgreSQL.',
      'Le code est versionné dans votre dépôt, hébergé sur vos comptes, avec la documentation et le mode opératoire.',
    ],
  },
  {
    n: '04',
    label: 'Site web et mesure',
    intro: 'Un site rapide, relié au CRM, et une mesure avant et après.',
    items: [
      'Astro pour un site codé ; WordPress, Webflow ou Shopify quand votre équipe doit publier seule.',
      'Search Console pour voir ce que Google indexe et ce qui vous amène des visites.',
      'Suivi de conversion : chaque action utile est tracée et attribuée.',
    ],
  },
];

export function technologiesSections(lang: Lang) {
  // ── HERO · masthead éditorial (composant catalogué `hero-utility-masthead`) ──
  const heroData = {
    type: 'hero-utility-masthead',
    kicker_fr: '§ Stack et technologies',
    kicker_en: '§ Stack and technologies',
    h1_fr: 'Stack et technologies IA : les outils, <i>couche par couche</i>.',
    h1_en: 'AI stack and technologies: the tools, <i>layer by layer</i>.',
    lede_fr: 'Le plus simple qui fait le travail. n8n et Make pour automatiser, Claude et OpenAI pour les agents, vos outils gardés tels quels, et le code remis à la fin.',
    lede_en: 'n8n and Make to automate, Claude and OpenAI for agents, your tools kept as they are. Here is what we use, for what, and what you get at the end.',
    align: 'left',
  } satisfies SectionByType<'hero-utility-masthead'>;

  // ── Breadcrumb (masthead-bar) ──
  const crumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', href: lang === 'fr' ? '/' : '/en' },
    { label: lang === 'fr' ? 'Le studio' : 'The studio', href: localizeHref('/agence', lang) },
    { label: lang === 'fr' ? 'Stack et technologies' : 'Stack and technologies' },
  ];

  // ── COUCHES · numbered-layer-list ──
  const layersData = {
    type: 'numbered-layer-list',
    srHeading_fr: 'Les quatre couches de la stack',
    srHeading_en: 'The five layers of the stack',
    layers: layers.map((l) => ({
      n: l.n,
      label_fr: l.label,
      label_en: l.label,
      intro_fr: l.intro,
      intro_en: l.intro,
      items: l.items.map((t) => ({ text_fr: t, text_en: t })),
    })),
  } satisfies NumberedLayerListData;

  // ── Stack en bref · SpecBar (fond paper-2) ──
  const specData = {
    type: 'spec-bar',
    background: 'paper-2',
    kicker_fr: '§ En bref',
    kicker_en: '§ At a glance',
    specs: [
      { label_fr: 'Automatisation', label_en: 'Automation', value: 'n8n · Make' },
      { label_fr: 'Agents IA', label_en: 'AI agents', value: 'Claude · OpenAI' },
      { label_fr: 'Branchement', label_en: 'Connection', value: 'API · MCP' },
      { label_fr: 'À la fin', label_en: 'At the end', value: 'Code et workflows à vous' },
    ],
  } satisfies SectionByType<'spec-bar'>;

  // ── COMMENT ON CHOISIT · branded-callout variante rail (filet accent gauche) ──
  const anchorData = {
    type: 'branded-callout',
    variant: 'rail',
    bodyHtml: true,
    kicker_fr: '§ Comment on choisit',
    kicker_en: '§ How we choose',
    h2_fr: 'Aucun outil n\'est imposé par principe.',
    h2_en: 'Le plus simple qui fait le travail.',
    body1_fr: 'On part de votre métier, de vos outils et de votre budget. Une <a href="/services/automatisations">automatisation</a> à règles fixes passe avant un <a href="/services/agents-ia">agent IA</a> quand elle suffit ; un outil du marché passe avant une <a href="/services/applications-internes">application sur mesure</a> quand il fait le travail.',
    body1_en: 'Aucun outil n\'est imposé par principe. On part de votre métier, de vos outils et de votre budget. Une <a href="/services/automatisations">automatisation</a> à règles fixes passe avant un <a href="/services/agents-ia">agent IA</a> quand elle suffit ; un outil du marché passe avant une <a href="/services/applications-internes">application sur mesure</a> quand il fait le travail.',
    body2_fr: 'Le principe qui ne change pas : vous gardez le code, les workflows et la documentation. Vous pouvez reprendre le système en interne ou le confier à un autre prestataire.',
    body2_en: 'Le principe qui ne change pas : vous gardez le code, les workflows et la documentation. Vous pouvez reprendre le système en interne ou le confier à un autre prestataire.',
  } satisfies SectionByType<'branded-callout'>;

  // ── CTA final ──
  const ctaData = {
    type: 'cta-final',
    h2_fr: 'Quels outils pour <i>votre</i> cas ?',
    h2_en: 'Which tools for <i>your</i> case?',
    body_fr: `${AUDIT_PROMISE.general.short.fr} On part de vos processus et de ce que vous utilisez déjà, et on vous dit ce qui convient, ou ce que vous gardez tel quel.`,
    body_en: `${AUDIT_PROMISE.general.short.en} We start from your processes and your current tools, and tell you which tools fit.`,
    cta_primary: {
      label_fr: `${AUDIT_BOOKING_LABEL.fr} →`,
      label_en: `${AUDIT_BOOKING_LABEL.en} →`,
      href: AUDIT_BOOKING_HREF,
      variant: 'primary',
    },
    cta_secondary: {
      label_fr: 'Voir la méthode →',
      label_en: 'See the method →',
      href: localizeHref('/agence/methode', lang),
      variant: 'ghost',
    },
    background: 'paper',
  } satisfies SectionByType<'cta-final'>;

  return { heroData, crumbs, layersData, specData, anchorData, ctaData };
}
