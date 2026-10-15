// ─────────────────────────────────────────────────────────────────────────────
// Hub Ressources · /ressources · sections statiques en donnée
// ─────────────────────────────────────────────────────────────────────────────
// Refonte 2026-10-06 (demande Simon : « une page qui, comme le blog, affiche tous les outils,
// comparatifs et guides ») : /ressources devient l'INDEX UNIFIÉ. La page dérive à l'exécution
// la liste complète (guides, comparatifs, outils, articles) triée par date et rendue en
// `article-grid` ; ce module ne porte que les littéraux statiques :
//   • l'en-tête de l'index (section cataloguée `list-index-section`, ses filtres sont passés
//     en slot par la page car ils portent des compteurs réels) ;
//   • les libellés des filtres par type (ordre d'affichage, préfixes d'URL qui les définissent) ;
//   • le manifesto (« La promesse ») ;
//   • le CTA final.
import type { SectionByType } from '@waimia/ds-kernel';
import { AUDIT_BOOKING_HREF, AUDIT_BOOKING_LABEL } from './conversion';

// ── EN-TÊTE · list-index-section (paper, statique) ──
export const indexHeadData = {
  type: 'list-index-section' as const,
  kicker_fr: '§ Ressources · tout ce qu\'on publie',
  kicker_en: '§ Resources · everything we publish',
  h1_fr: 'Ressources <i>IA</i> pour PME.',
  h1_en: 'AI <i>resources</i> for SMEs.',
  lede_fr: 'Guides, comparatifs, outils gratuits et articles, du plus récent au plus ancien. Filtrez par type : chaque contenu est daté, signé et relu.',
  lede_en: 'Guides, comparisons, free tools and articles, newest first. Filter by type: every piece is dated, signed and reviewed.',
} satisfies SectionByType<'list-index-section'>;

// ── VUES DU HUB · /ressources (toutes), /ressources/outils, /ressources/comparatifs et
// /ressources/guides sont rendues par le MÊME composant (ResourcesHub.astro) ; chaque vue a sa propre URL, son
// title/description. Outils et comparatifs sont des filtres de /ressources (décision Simon du
// 15/10/2026) : sans `h1_fr`, leur vue garde la tête de /ressources. Guides a sa tête éditoriale. ──
export type ResourceView = 'all' | 'outils' | 'comparatifs' | 'guides';

export const RESOURCE_VIEWS: Record<ResourceView, {
  href: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  label_fr?: string;
  label_en?: string;
  h1_fr?: string;
  h1_en?: string;
  lede_fr?: string;
  lede_en?: string;
  collection_name_fr: string;
  collection_name_en: string;
  collection_desc_fr: string;
  collection_desc_en: string;
}> = {
  all: {
    href: '/ressources',
    title_fr: 'Ressources IA pour PME : guides et outils · Waimia',
    title_en: 'AI resources for SMEs: guides and tools · Waimia',
    description_fr: 'Guides pratiques, comparatifs outils IA, calculateur et checklists gratuits, articles : toutes les ressources IA pour PME, du plus récent au plus ancien.',
    description_en: 'Practical guides, AI tool comparisons, free calculator and checklists, articles: all AI resources for SMEs, newest first.',
    collection_name_fr: 'Ressources IA pour PME · Waimia',
    collection_name_en: 'AI resources for SMEs · Waimia',
    collection_desc_fr: 'Index de toutes les ressources Waimia : guides, comparatifs, outils gratuits et articles, triés par date.',
    collection_desc_en: 'Index of all Waimia resources: guides, comparisons, free tools and articles, sorted by date.',
  },
  outils: {
    href: '/ressources/outils',
    title_fr: 'Outils IA gratuits : calculateur ROI, diagnostic · Waimia',
    title_en: 'Free AI tools: ROI calculator, diagnostic · Waimia',
    description_fr: 'Calculateur ROI, diagnostic de maturité IA, grille des tâches à automatiser, checklists et charte : des outils gratuits pour PME B2B, sans inscription.',
    description_en: 'ROI calculator, AI maturity diagnostic, task automation grid, checklists and charter: free tools for B2B SMEs, no sign-up.',
    label_fr: 'Outils',
    label_en: 'Tools',
    collection_name_fr: 'Outils IA gratuits pour PME · Waimia',
    collection_name_en: 'Free AI tools for SMEs · Waimia',
    collection_desc_fr: "Calculateur ROI, score de maturité IA, grille de priorisation, charte et checklists : des outils gratuits pour PME B2B, pensés pour passer à l'action.",
    collection_desc_en: 'ROI calculator, AI maturity score, prioritisation grid, charter and checklists: free tools for B2B SMEs.',
  },
  comparatifs: {
    href: '/ressources/comparatifs',
    title_fr: 'Comparatifs IA : Claude vs ChatGPT, n8n vs Make · Waimia',
    title_en: 'AI comparisons: Claude vs ChatGPT, n8n vs Make · Waimia',
    description_fr: "Comparatifs outils IA pour PME : Claude vs ChatGPT, n8n vs Make, Zapier. Les critères posés, les écarts documentés, l'arbitrage tranché pour décider.",
    description_en: 'AI tool comparisons for SMEs: Claude vs ChatGPT, n8n vs Make, Zapier. Criteria set, gaps documented, the call made so you can decide.',
    label_fr: 'Comparatifs',
    label_en: 'Comparisons',
    collection_name_fr: 'Comparatifs IA · Waimia',
    collection_name_en: 'AI comparisons · Waimia',
    collection_desc_fr: 'Comparatifs objectifs pour trancher entre outils, approches et fournisseurs IA.',
    collection_desc_en: 'Objective comparisons to decide between AI tools, approaches and vendors.',
  },
  guides: {
    href: '/ressources/guides',
    title_fr: 'Guides pratiques IA pour PME : Claude, agents, n8n · Waimia',
    title_en: 'Practical AI guides for SMEs: Claude, agents, n8n · Waimia',
    description_fr: 'Guides pratiques IA pour PME : Claude, agents, n8n, coûts, RGPD et AI Act. Des étapes concrètes, des chiffres sourcés et les pièges à éviter.',
    description_en: 'Practical AI guides for SMEs: Claude, agents, n8n, costs, GDPR and AI Act. Concrete steps, sourced figures and the pitfalls to avoid.',
    label_fr: 'Guides',
    label_en: 'Guides',
    h1_fr: 'Guides <i>pratiques</i> IA pour PME.',
    h1_en: 'Practical <i>AI guides</i> for SMEs.',
    lede_fr: "Des guides pour comprendre, chiffrer et déployer l'IA en PME : Claude, agents, automatisation, conformité. Des étapes, des exemples et les pièges à éviter, datés et sourcés.",
    lede_en: 'Guides to understand, cost and deploy AI in SMEs: Claude, agents, automation, compliance. Steps, examples and the pitfalls to avoid, dated and sourced.',
    collection_name_fr: 'Guides pratiques IA pour PME · Waimia',
    collection_name_en: 'Practical AI guides for SMEs · Waimia',
    collection_desc_fr: "Guides pratiques pour comprendre, chiffrer et déployer l'IA en PME : Claude, agents, automatisation, conformité.",
    collection_desc_en: 'Practical guides to understand, cost and deploy AI in SMEs: Claude, agents, automation, compliance.',
  },
};

// ── FILTRES PAR TYPE · ordre d'affichage. `prefixes` = débuts d'URL qui définissent le type
// (le filtre CSS de la page s'appuie sur l'attribut href des cartes). Le type « articles »
// regroupe tout ce qui n'est pas sous les trois autres préfixes (blog et notes de terrain). ──
export type ResourceKind = 'guides' | 'comparatifs' | 'outils' | 'articles';

export const RESOURCE_KINDS: ReadonlyArray<{
  key: ResourceKind;
  label_fr: string;
  label_en: string;
  tag_fr: string;
  tag_en: string;
  prefixes: string[];
}> = [
  { key: 'guides', label_fr: 'Guides', label_en: 'Guides', tag_fr: 'GUIDE', tag_en: 'GUIDE', prefixes: ['/ressources/guides/'] },
  { key: 'comparatifs', label_fr: 'Comparatifs', label_en: 'Comparisons', tag_fr: 'COMPARATIF', tag_en: 'COMPARISON', prefixes: ['/ressources/comparatifs/'] },
  { key: 'outils', label_fr: 'Outils', label_en: 'Tools', tag_fr: 'OUTIL', tag_en: 'TOOL', prefixes: ['/ressources/outils/', '/ressources/diagnostics/'] },
  { key: 'articles', label_fr: 'Articles', label_en: 'Articles', tag_fr: 'ARTICLE', tag_en: 'ARTICLE', prefixes: [] },
];

// ── MANIFESTO · manifesto-statement (ink, statique) · conservé du hub guides supprimé ;
// rendu par le hub Ressources (ResourcesHub.astro, 3 vues) et par le hub /blog. ──
export const manifestoData = {
  type: 'manifesto-statement' as const,
  kicker_fr: '§ La promesse',
  kicker_en: '§ The promise',
  text_fr: 'Pas de théorie creuse. Des <i>étapes</i>, des exemples, des pièges à <span class="acc">éviter</span>.',
  text_en: 'No empty theory. <i>Steps</i>, examples, pitfalls to <span class="acc">avoid</span>.',
  tone: 'ink' as const,
  show_grid: false,
  pinned: false,
} satisfies SectionByType<'manifesto-statement'>;

// ── CTA final · cta-final (paper, statique) ──
export const ctaData = {
  type: 'cta-final' as const,
  h2_fr: 'Prêt à livrer un <em>agent</em>,<br />pas un slide deck ?',
  h2_en: 'Ready to ship an <em>agent</em>,<br />not a slide deck?',
  body_fr: 'Audit IA gratuit de 45 minutes : vos process passés en revue tâche par tâche, une cartographie écrite à la fin.',
  body_en: 'Free 45-minute AI audit: your processes reviewed task by task, a written map at the end.',
  cta_primary: { label_fr: `${AUDIT_BOOKING_LABEL.fr} →`, label_en: `${AUDIT_BOOKING_LABEL.en} →`, href: AUDIT_BOOKING_HREF, variant: 'primary' as const },
  cta_secondary: { label_fr: "Ce que couvre l'audit →", label_en: 'What the audit covers →', href: '/audit-ia-pme', variant: 'ghost' as const },
  background: 'paper' as const,
} satisfies SectionByType<'cta-final'>;
