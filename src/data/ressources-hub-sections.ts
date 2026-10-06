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
//   • le CTA final.
import type { SectionByType } from '@waimia/ds-kernel';

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

// ── CTA final · cta-final (paper, statique) ──
export const ctaData = {
  type: 'cta-final' as const,
  h2_fr: 'Prêt à livrer un <em>agent</em>,<br />pas un slide deck ?',
  h2_en: 'Ready to ship an <em>agent</em>,<br />not a slide deck?',
  body_fr: 'Audit IA gratuit de 45 minutes : vos process passés en revue tâche par tâche, une cartographie écrite à la fin.',
  body_en: 'Free 45-minute AI audit: your processes reviewed task by task, a written map at the end.',
  cta_primary: { label_fr: 'Réserver un audit →', label_en: 'Book an audit →', href: '/contact?offer=audit-ia-pme&intent=audit', variant: 'primary' as const },
  cta_secondary: { label_fr: "Ce que couvre l'audit →", label_en: 'What the audit covers →', href: '/audit-ia-pme', variant: 'ghost' as const },
  background: 'paper' as const,
} satisfies SectionByType<'cta-final'>;
