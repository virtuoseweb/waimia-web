// ─────────────────────────────────────────────────────────────────────────────
// Stack & technologies · /technologies · sections en donnée (JSONification, vague V3)
// ─────────────────────────────────────────────────────────────────────────────
// Extraction des littéraux de section qui vivaient inline dans le frontmatter de
// `src/pages/technologies.astro` (fiche 0027 D6 · vague V3 hubs/utilitaires). Même
// mécanisme que la vague V1 home / V2 manifeste : module `src/data/*.ts`, le plus SÛR
// pour la parité stricte (déplacement d'objets typés, 0 schéma à valider).
//
// La factory `technologiesSections(lang)` reçoit la langue pour reproduire À L'IDENTIQUE
// les appels `localizeHref(..., lang)` et le breadcrumb qui vivaient dans la page.
// Le JSON-LD `techLd` (dépend de SITE.url + Astro.url) reste dans la page (SEO/runtime).
//
// 0 valeur réécrite : chaque littéral est transcrit CARACTÈRE POUR CARACTÈRE depuis
// l'ancien frontmatter (apostrophes, points médians ·, flèches →, balises <i>/<a> incluses).
import type { SectionByType } from '@waimia/ds-kernel';
import type { NumberedLayerListData } from '@waimia/ds-kernel/sections/numbered-layer-list/schema';
import { localizeHref, type Lang } from '../lib/i18n';

// ── Couches de la stack · idiome « livrables numerotes » (cf /agence/about) ──
// Contenu FR (page FR-only). Mappe vers le schema bilingue de `numbered-layer-list` : les champs
// _en refletent le FR (aucune page /en/technologies ne rend ce contenu -> 0 fabrication de trad).
const layers = [
  {
    n: '01',
    label: 'IA & agents',
    intro: 'Claude, par Anthropic, comme moteur de raisonnement. Un modèle par tâche, pas un seul fourre-tout.',
    items: [
      "Claude Opus pour la conception et l'arbitrage.",
      'Claude Sonnet pour le travail cadré et borné.',
      'Claude Haiku pour le mécanique rapide et les vérifications.',
      'Orchestration multi-agents : on décompose, on délègue, on recompose.',
    ],
  },
  {
    n: '02',
    label: 'Sites & front',
    intro: 'Un front découplé, statique et rapide. Pas de serveur applicatif à chaque visite.',
    items: [
      'Astro en génération statique (SSG), PageSpeed visé 100/100.',
      "React en îlots, seulement là où l'interactivité le justifie.",
      'Tailwind pour un design system cohérent, sans CSS dupliqué.',
      'Déploiement Vercel : previews par branche, mise en ligne continue.',
    ],
  },
  {
    n: '03',
    label: 'CMS & contenu',
    intro: 'Le bon CMS dépend de votre cas, pas d\'une mode. On tranche au cadrage.',
    items: [
      'Git-based par défaut pour une PME : TinaCMS, Keystatic, Decap. Édition versionnée, zéro base de données, réversible.',
      'Headless classique pour les gros volumes : Contentful, Sanity, Strapi, Prismic.',
      'Standards ouverts : code, contenu et docs transférés à la livraison.',
    ],
  },
  {
    n: '04',
    label: 'Data, CRM & outils métier',
    intro: "On câble les agents dans vos outils existants. Pas de migration : on connecte ce qui marche déjà.",
    items: [
      'Productivité : Excel, Outlook, et votre ERP, sans tout remplacer.',
      'CRM : HubSpot et vos bases existantes, instrumentés proprement.',
      'Prospection sortante : Lemlist, Instantly, Apollo, Pharow.',
      'Email : MailerLite pour l\'audience, Resend pour le transactionnel.',
    ],
  },
  {
    n: '05',
    label: 'Analytics & SEO',
    intro: "On mesure avant et après. Si ça ne mesure rien, ça n'existe pas.",
    items: [
      'Search Console pour l\'indexation et la performance organique.',
      'Google Business Profile : présence locale, avis et fiche établissement optimisés.',
      'Suivi de conversion : chaque action clé est tracée et attribuée.',
      'Google Analytics 4 branché quand la mesure le justifie, pas installé par défaut.',
    ],
  },
];

export function technologiesSections(lang: Lang) {
  // ── HERO · masthead editorial (composant catalogue `hero-utility-masthead`) ──
  const heroData = {
    type: 'hero-utility-masthead',
    kicker_fr: '§ Stack & technologies',
    kicker_en: '§ Stack & technologies',
    h1_fr: 'La <i>stack</i>, couche par couche.',
    h1_en: 'The <i>stack</i>, layer by layer.',
    lede_fr: "Pas de catalogue de logos. Des choix tenus : un modèle par tâche, un front qui tient la charge, vos outils gardés. Et zéro captivité au bout.",
    lede_en: "No logo wall. Choices we stand by: one model per task, a front that holds up, your tools kept. And zero lock-in at the end.",
    align: 'left',
  } satisfies SectionByType<'hero-utility-masthead'>;

  // ── Breadcrumb (masthead-bar) · reproduit l'auto-deduction UtilityTemplate pour /technologies ──
  const crumbs = [
    { label: lang === 'fr' ? 'Accueil' : 'Home', href: lang === 'fr' ? '/' : '/en' },
    { label: 'Stack & technologies' },
  ];

  // ── COUCHES · numbered-layer-list (ex-.tech-layers, cape a 920px) ──
  const layersData = {
    type: 'numbered-layer-list',
    srHeading_fr: 'Les cinq couches de la stack',
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

  // ── Stack en bref · SpecBar (respiration, fond paper-2) ──
  const specData = {
    type: 'spec-bar',
    background: 'paper-2',
    kicker_fr: '§ Stack en bref',
    kicker_en: '§ Stack at a glance',
    specs: [
      { label_fr: 'Moteur IA', label_en: 'AI engine', value: 'Claude' },
      { label_fr: 'Front', label_en: 'Front', value: 'Astro SSG' },
      { label_fr: 'PageSpeed visé', label_en: 'Target PageSpeed', value: '100/100' },
      { label_fr: 'Captivité', label_en: 'Lock-in', value: '0' },
    ],
  } satisfies SectionByType<'spec-bar'>;

  // ── Principes de choix · bande INK (contraste, climax avant CTA) ──
  const principlesData = {
    type: 'metric-callout-band',
    background: 'ink',
    kicker_fr: '§ Comment on choisit',
    kicker_en: '§ How we choose',
    context_fr: "Aucun outil n'est imposé par dogme. On part de votre métier, de vos outils, de votre budget. Le sur-mesure se justifie quand le clé-en-main atteint ses limites, jamais par défaut.",
    context_en: 'No tool is imposed by dogma. We start from your business, your tools, your budget. Bespoke is justified when turnkey hits its limits, never by default.',
    metrics: [
      { value: '1', label_fr: 'modèle choisi par tâche, pas un fourre-tout', label_en: 'model chosen per task, not a catch-all' },
      { value: '0', label_fr: 'captivité : standards ouverts, stack transférée', label_en: 'lock-in: open standards, stack handed over' },
      { value: '100%', label_fr: 'câblé dans vos outils, sans migration forcée', label_en: 'wired into your tools, no forced migration' },
    ],
  } satisfies SectionByType<'metric-callout-band'>;

  // ── ANCRAGE ANTHROPIC · branded-callout variante rail (ex-.tech-anchor).
  // bodyHtml preserve les 2 liens internes ; variant rail = filet accent gauche. ──
  const anchorData = {
    type: 'branded-callout',
    variant: 'rail',
    bodyHtml: true,
    kicker_fr: '§ Anthropic-first',
    kicker_en: '§ Anthropic-first',
    h2_fr: 'Un parti pris assumé sur le moteur.',
    h2_en: 'Un parti pris assumé sur le moteur.',
    body1_fr: 'On a construit la méthode autour de <a href="/services/integration-claude">Claude</a> parce que c\'est, pour notre usage, le meilleur compromis raisonnement, fiabilité et sécurité. Le reste de la stack reste ouvert : <a href="/services/site-web-ia">front Astro</a>, CMS et intégrations se choisissent au cas par cas, selon votre métier.',
    body1_en: 'On a construit la méthode autour de <a href="/services/integration-claude">Claude</a> parce que c\'est, pour notre usage, le meilleur compromis raisonnement, fiabilité et sécurité. Le reste de la stack reste ouvert : <a href="/services/site-web-ia">front Astro</a>, CMS et intégrations se choisissent au cas par cas, selon votre métier.',
    body2_fr: 'Le principe ne change pas : on ne vous enferme nulle part. Vous gardez le code, le contenu et la documentation. Vous pouvez reprendre la stack en interne, ou la confier à un autre prestataire.',
    body2_en: 'Le principe ne change pas : on ne vous enferme nulle part. Vous gardez le code, le contenu et la documentation. Vous pouvez reprendre la stack en interne, ou la confier à un autre prestataire.',
  } satisfies SectionByType<'branded-callout'>;

  // ── ÉCOSYSTÈME · ecosystem-partners (grille par catégorie, fond paper-2).
  // Le hero dit « pas de catalogue de logos » : la copy assume donc l'inverse d'un
  // mur de badges → les briques réellement câblées, couche par couche. Claude pointe
  // vers la route interne /expertise-claude ; le reste en liens externes. Chaque asset
  // vérifié présent dans public/logos/partners/. Page FR-only → _en reflète le FR. ──
  const ecosystemData = {
    type: 'ecosystem-partners',
    background: 'paper-2',
    layout: 'grid',
    kicker_fr: '§ Écosystème',
    kicker_en: '§ Écosystème',
    h2_fr: "Les outils qu'on <i>câble</i> vraiment.",
    h2_en: "Les outils qu'on <i>câble</i> vraiment.",
    lede_fr: "Pas des badges accrochés au mur. Les briques qu'on connecte pour de vrai, couche par couche. La plupart, vous les avez déjà.",
    lede_en: "Pas des badges accrochés au mur. Les briques qu'on connecte pour de vrai, couche par couche. La plupart, vous les avez déjà.",
    partners: [
      { name: 'Claude (Anthropic)', asset: '/logos/partners/partner-claude.png', href: '/expertise-claude', category: 'IA & agents' },
      { name: 'OpenAI', asset: '/logos/partners/partner-openai.png', href: 'https://openai.com', external: true, category: 'IA & agents' },
      { name: 'GitHub Copilot', asset: '/logos/partners/partner-copilot.svg', href: 'https://github.com/features/copilot', external: true, category: 'IA & agents' },
      { name: 'Amazon Web Services', asset: '/logos/partners/partner-aws.png', href: 'https://aws.amazon.com', external: true, category: 'Cloud & infrastructure' },
      { name: 'Google', asset: '/logos/partners/partner-google.png', href: 'https://cloud.google.com', external: true, category: 'Cloud & infrastructure' },
      { name: 'Microsoft', asset: '/logos/partners/partner-microsoft.png', href: 'https://www.microsoft.com', external: true, category: 'Cloud & infrastructure' },
      { name: 'HubSpot', asset: '/logos/partners/partner-hubspot.png', href: 'https://www.hubspot.com', external: true, category: 'CRM & acquisition' },
      { name: 'Salesforce', asset: '/logos/partners/partner-salesforce.png', href: 'https://www.salesforce.com', external: true, category: 'CRM & acquisition' },
      { name: 'Meta Business', asset: '/logos/partners/partner-meta-business.png', href: 'https://business.meta.com', external: true, category: 'CRM & acquisition' },
      { name: 'Slack', asset: '/logos/partners/partner-slack.svg', href: 'https://slack.com', external: true, category: 'Collaboration & outils' },
      { name: 'GitHub', asset: '/logos/partners/partner-github.svg', href: 'https://github.com', external: true, category: 'Collaboration & outils' },
      { name: 'Microsoft Power Apps', asset: '/logos/partners/partner-power-apps.svg', href: 'https://powerapps.microsoft.com', external: true, category: 'Collaboration & outils' },
    ],
  } satisfies SectionByType<'ecosystem-partners'>;

  // ── CTA final · reproduit la branche non-contact de UtilityTemplate (showCta) ──
  const utilityLabel = 'Stack & technologies';
  const ctaData = {
    type: 'cta-final',
    h2_fr: 'Prêt à passer du <i>texte</i> au terrain ?',
    h2_en: 'Ready to move from <i>text</i> to the field?',
    body_fr: `${utilityLabel} clarifié. Reste à cadrer le chantier, le bon niveau d'engagement et le premier livrable utile.`,
    body_en: `${utilityLabel} clarified. Now it is about framing the engagement, the right level of involvement, and the first useful deliverable.`,
    cta_primary: {
      label_fr: 'Réserver un audit →',
      label_en: 'Book an audit →',
      href: localizeHref('/contact', lang),
      variant: 'primary',
    },
    cta_secondary: {
      label_fr: 'Voir les offres →',
      label_en: 'See services →',
      href: localizeHref('/services', lang),
      variant: 'ghost',
    },
    background: 'paper',
  } satisfies SectionByType<'cta-final'>;

  return { heroData, crumbs, layersData, specData, principlesData, anchorData, ecosystemData, ctaData };
}
