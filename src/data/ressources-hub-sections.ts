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
// title/description. Les trois vues (guides, comparatifs, outils) ont leur tête éditoriale (H1 +
// introduction) ; sans `h1_fr`, une vue reprendrait la tête de /ressources. ──
export type ResourceView = 'all' | 'outils' | 'comparatifs' | 'guides' | 'articles' | 'actualites';

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
    title_fr: 'Ressources IA pour PME : guides, comparatifs, outils',
    title_en: 'AI resources for SMEs: guides and tools · Waimia',
    description_fr: 'Guides pratiques, comparatifs d\'outils IA, calculateur ROI, checklists et modèles gratuits pour PME. Chaque contenu est daté, signé et relu.',
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
    h1_fr: 'Outils <i>IA</i> gratuits pour PME.',
    h1_en: 'Free <i>AI tools</i> for SMEs.',
    lede_fr: 'Calculateur ROI, diagnostic de maturité IA, grilles, checklists et modèles : des outils pour chiffrer un gain, situer votre entreprise ou cadrer un projet.',
    lede_en: 'ROI calculator, AI maturity diagnostic, grids, checklists and templates: tools to size a gain, place your company or scope a project.',
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
    h1_fr: 'Comparatifs <i>IA</i> pour PME.',
    h1_en: 'AI <i>comparisons</i> for SMEs.',
    lede_fr: 'Deux outils face à face, les critères posés et l\'arbitrage tranché : Claude ou ChatGPT, n8n ou Make, sur mesure ou logiciel du marché.',
    lede_en: 'Two tools side by side, the criteria set and the call made plainly: Claude or ChatGPT, n8n or Make, custom or off-the-shelf.',
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
  // /blog et /actualites : mêmes données qu'avant la bascule sur ResourcesHub (title, description,
  // H1, introduction), les URL /blog/<slug> des contenus ne changent pas.
  articles: {
    href: '/blog',
    title_fr: 'Blog IA et automatisation pour PME : notes de terrain',
    title_en: 'AI and automation blog for SMEs: field notes · Waimia',
    description_fr: "Notes de terrain de Simon Beros sur l'IA et l'automatisation en PME : agents IA, n8n, Claude, CRM, pilotage. Méthodes, comparatifs, coûts datés et sourcés.",
    description_en: "Field notes from Simon Beros on AI and automation in SMEs: AI agents, n8n, Claude, CRM, steering. Methods, comparisons, dated and sourced costs.",
    label_fr: 'Blog',
    label_en: 'Blog',
    h1_fr: 'Blog <i>IA</i> et automatisation en PME.',
    h1_en: 'Notes <i>slowly</i> from the field.',
    lede_fr: 'Une newsletter mensuelle, jamais de promotion. Tout ce qu\'on aurait voulu lire avant de commencer un chantier. <a href="/ressources#newsletter" class="hub-inline-cta">S\'abonner à la newsletter →</a> <a href="/actualites" class="hub-inline-cta">Actualités →</a>',
    lede_en: 'A monthly newsletter, never any promotion. Everything we wished we had read before starting a project. <a href="/ressources#newsletter" class="hub-inline-cta">Subscribe to the newsletter →</a>',
    collection_name_fr: 'Blog IA et automatisation pour PME : notes de terrain',
    collection_name_en: 'AI and automation blog for SMEs: field notes',
    collection_desc_fr: "Notes de terrain de Simon Beros sur l'IA et l'automatisation en PME : agents IA, n8n, Claude, CRM, pilotage. Méthodes, comparatifs, coûts datés et sourcés.",
    collection_desc_en: 'Field notes on AI and automation in SMEs: AI agents, n8n, Claude, CRM, steering.',
  },
  actualites: {
    href: '/actualites',
    title_fr: 'Actualités IA pour PME : agents, Claude, ChatGPT',
    title_en: 'AI news for SMBs: agents, Claude, ChatGPT · Waimia',
    description_fr: "Actualités de l'IA vues par une PME : annonces, ce qui est confirmé, ce que ça change. Billets datés à la minute, signés, sources citées.",
    description_en: 'AI news seen by an SMB: announcements, what is confirmed, what it changes. Posts dated to the minute, signed, sources cited.',
    label_fr: 'Actualités',
    label_en: 'News',
    h1_fr: 'Actualités <i>IA</i> pour PME.',
    h1_en: 'AI <i>news</i> for SMBs.',
    lede_fr: "Ce qui est annoncé, ce qui est confirmé, ce que ça change pour une PME. Chaque billet porte sa date et son heure, son auteur et ses sources. <a href=\"/actualites/rss.xml\" class=\"hub-inline-cta\">Flux RSS texte complet →</a>",
    lede_en: 'What is announced, what is confirmed, what it changes for an SMB. Every post carries its date and time, its author and its sources. <a href="/actualites/rss.xml" class="hub-inline-cta">Full-text RSS feed →</a>',
    collection_name_fr: 'Actualités IA pour PME : agents, Claude, ChatGPT, open source',
    collection_name_en: 'AI news for SMBs: agents, Claude, ChatGPT, open source',
    collection_desc_fr: "Actualités de l'IA vues par une PME : ce qui est annoncé, ce qui est confirmé, ce que ça change. Billets datés à la minute, signés Simon Beros, sources citées.",
    collection_desc_en: 'AI news seen by an SMB: what is announced, what is confirmed, what it changes. Posts dated to the minute, signed, sources cited.',
  },
};

// ── FILTRES PAR TYPE · ordre d'affichage. `prefixes` = débuts d'URL qui définissent le type
// (le filtre CSS de la page s'appuie sur l'attribut href des cartes). Le type « articles »
// regroupe tout ce qui n'est pas sous les trois autres préfixes (blog et notes de terrain). ──
export type ResourceKind = 'guides' | 'comparatifs' | 'outils' | 'articles' | 'actualites';

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
  { key: 'actualites', label_fr: 'Actualités', label_en: 'News', tag_fr: 'ACTUALITÉ', tag_en: 'NEWS', prefixes: [] },
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
