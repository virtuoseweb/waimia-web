// Waimia · section-variants.ts — PILIER 5 (générateur déterministe), axes STRUCTURELS.
//
// LE MANQUE PROFOND COMBLÉ : les variantes ne sont plus ÉCRITES À LA MAIN (presets
// arbitraires) — elles sont CALCULÉES depuis les axes structurels par archétype. Pour un
// type donné on connaît À L'AVANCE le nombre exact de variantes = |produit cartésien des
// axes de son archétype, élagué des combos invalides|.
//
// 3 tiers de props (cf tasks/section-production-system.md) :
//   1. Axes STRUCTURELS  → ici, combinatoires, génèrent les cartes catalogue (compte connu).
//   2. Schémas COULEUR    → axe orthogonal (section-colorschemes.ts), pas multiplié en cartes.
//   3. Knobs ÉDITEUR      → builder-live, jamais pré-générés.
//
// Forme de sortie COMPATIBLE avec un Preset (id/type/label/family/props) + flag `generated`.
// 0 token inventé · 0 clé de prop inventée (que des clés honorées par le moteur/schéma) ·
// déterministe (0 Date/Math.random, ordre stable).

import type { SectionType } from '../schemas/sections';
import type { Archetype } from './section-archetypes';
import { archetypeFor } from './section-archetypes';
import { SECTIONS } from './section-registry';
import { COLOR_SCHEMES, COLOR_SCHEME_BY_ID, schemeProps, type ColorScheme } from './section-colorschemes';

export { COLOR_SCHEMES } from './section-colorschemes';

/**
 * Allowlist des TYPES dont le composant est vérifié « mixin-safe » : il consomme les props
 * du moteur (layout/columns string/density…) sans collision avec un contrat legacy. Certains
 * composants legacy résolus en archétype collection traitent `data.columns` comme un TABLEAU
 * et crashent sur un string (.map) au prerender ; ils doivent rester sur le cartésien d'origine.
 * Seuls les types de cette liste reçoivent les squelettes-presets de STRUCTURAL_SKELETONS.
 * Cette liste S'ÉTEND à mesure que les composants sont câblés au moteur (migration #46).
 */
const MIXIN_READY: Set<SectionType> = new Set(['feature-grid']);

/* ───────────────────────────── Axes structurels ───────────────────────────── */

/** Un axe structurel = une prop + son petit jeu de valeurs curées. */
export interface AxisDef {
  prop: string;
  values: string[];
}

/** Une variante générée = forme compatible Preset + flag `generated`. */
export interface GeneratedVariant {
  id: string;
  type: SectionType;
  label: string;
  family?: string;
  props: Record<string, string | number | boolean>;
  generated: true;
}

/**
 * Axes structurels PAR ARCHÉTYPE (cf tasks/section-production-system.md §AXES STRUCTURELS).
 * Le produit cartésien élagué de ces axes = le set COMPLET de variantes d'un type.
 * `columns`/`density`/etc. NON listés ici = knobs éditeur (tier 3), pas des cartes.
 */
export const STRUCTURAL_AXES: Record<Archetype, AxisDef[]> = {
  // collection (feature-grid, case-card-grid, deliverables-grid) → 10
  collection: [
    {
      prop: 'layout',
      values: [
        'grid-uniform',
        'grid-auto',
        'grid-asym',
        'list',
        'rows-divided',
        'bento-feature',
        'featured-split',
        'two-col',
        'alternating',
        'cards-deck',
        'list-media-left',
        'grid-3-featured',
        'cards-overlap',
        'metric-row',
      ],
    },
  ],
  // split (feature-split-media, feature-zigzag) → 7 proportion × 2 side, élagué = 13
  split: [
    { prop: 'proportion', values: ['1-1', '1-2', '2-1', '2-3', '3-2', '1-3', '3-1'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
  ],
  // bento (bento-grid, media-bento) → 8
  bento: [
    {
      prop: 'layout',
      values: [
        'bento',
        'bento-feature',
        'mosaic',
        'matrix-2x2',
        'matrix-3x3',
        'matrix-4x4',
        'grid-uniform',
        'feature-corner',
        'matrix-3x2',
        'feature-row',
        'quad',
      ],
    },
  ],
  // process (method-timeline, diagnostic-stages, system-flow, architecture-diagram) → 7
  process: [
    {
      prop: 'layout',
      values: [
        'vertical-stack',
        'horizontal',
        'numbered-rows',
        'grid-steps',
        'diagram',
        'zigzag',
        'connected-line',
        'cards-steps',
        'snake',
        'vertical-alternating',
      ],
    },
  ],
  // editorial (definition-extract, pain-severity-list, statement-orbit, eeat-panel) → 8
  editorial: [
    {
      prop: 'layout',
      values: [
        'prose',
        'two-col',
        'list',
        'rows-divided',
        'lead-aside',
        'drop-cap',
        'pull-quote',
        'centered-statement',
        'sidenote',
        'numbered-prose',
        'two-col-lead',
        'statement-big',
      ],
    },
  ],
  // gallery (scroll-gallery, photo-cluster, horizontal-showcase, media-swap-band) → 8
  gallery: [
    {
      prop: 'layout',
      values: [
        'grid-auto',
        'mosaic',
        'masonry',
        'matrix-3x3',
        'matrix-4x4',
        'grid-uniform',
        'featured-split',
        'peek-scroll',
        'masonry-3',
        'fullbleed-pair',
        'filmstrip',
        'overlap',
      ],
    },
  ],
  // table (workflow-table, department-stack) → 5
  table: [
    {
      prop: 'layout',
      values: [
        'rows-divided',
        'grid-steps',
        'comparison-matrix',
        'feature-check',
        'spec-rows',
        'striped-rows',
        'sticky-header',
        'two-col-compare',
        'checklist',
      ],
    },
  ],
  // band (footer-cta-band) → 7 layout × 2 align = 14
  band: [
    { prop: 'layout', values: ['inline', 'stacked', 'centered', 'full-bleed', 'split-image', 'boxed', 'gradient'] },
    { prop: 'align', values: ['start', 'center'] },
  ],
  // hero (hero-split, hero-centered, hero-masthead-card, hero-conversion-funnel) → 8
  hero: [
    {
      prop: 'layout',
      values: [
        'split',
        'centered',
        'masthead',
        'funnel',
        'full-bleed-image',
        'stacked',
        'minimal',
        'with-form',
        'split-reverse',
        'video-bg',
        'centered-narrow',
        'with-logos-strip',
        'side-form',
      ],
    },
  ],
  // logos (logo-marquee) → 6
  logos: [
    {
      prop: 'layout',
      values: [
        'marquee',
        'grid-uniform',
        'grid-auto',
        'rows-divided',
        'bordered-grid',
        'with-heading',
        'two-row',
        'logo-quote',
        'tiered',
      ],
    },
  ],
  // ─── 12 nouveaux archétypes (un axe `layout`) ───
  // stats (stat-block, metric-shift, stats-bento) → 7
  stats: [
    {
      prop: 'layout',
      values: [
        'inline-row',
        'grid-uniform',
        'big-number-split',
        'bento',
        'with-context',
        'ticker',
        'comparison-pair',
        'kpi-row',
        'dual-metric',
        'progress-bars',
      ],
    },
  ],
  // testimonial (testimonial-block) → 7
  testimonial: [
    {
      prop: 'layout',
      values: [
        'single-quote',
        'quote-grid',
        'carousel',
        'with-logos',
        'avatar-row',
        'big-quote',
        'video-quote',
        'logo-quote-grid',
        'split-quote',
        'rating-cards',
      ],
    },
  ],
  // pricing (pricing-cards, pricing-table) → 7
  pricing: [
    {
      prop: 'layout',
      values: [
        'tier-cards-3',
        'tier-cards-2',
        'single',
        'comparison-matrix',
        'toggle-billing',
        'feature-checklist',
        'highlighted-popular',
        'tier-cards-4',
        'side-by-side',
        'enterprise-row',
      ],
    },
  ],
  // faq (faq-accordion, objection-handler) → 5
  faq: [
    {
      prop: 'layout',
      values: [
        'accordion-single',
        'accordion-two-col',
        'list-open',
        'grid',
        'with-aside-cta',
        'two-col-open',
        'categorized',
        'search-faq',
      ],
    },
  ],
  // form (newsletter-band, form-panel) → 6
  form: [
    {
      prop: 'layout',
      values: [
        'single-col',
        'two-col',
        'inline',
        'split-with-media',
        'multi-step',
        'boxed-card',
        'two-step',
        'compact-inline',
        'full-width',
      ],
    },
  ],
  // banner (annonces / bandeaux) → 6
  banner: [
    { prop: 'layout', values: ['thin-bar', 'with-cta', 'countdown', 'dismissible', 'sticky-top', 'promo-split'] },
  ],
  // tabs (onglets) → 7
  tabs: [
    { prop: 'layout', values: ['horizontal-tabs', 'vertical-tabs', 'segmented', 'pills', 'underline-tabs', 'boxed-tabs', 'vertical-rail'] },
  ],
  // carousel (sliders) → 7
  carousel: [
    { prop: 'layout', values: ['slider', 'peek', 'fade', 'thumbnails', 'cards-peek', 'full-slide', 'logo-carousel'] },
  ],
  // timeline (timeline-block) → 8
  timeline: [
    {
      prop: 'layout',
      values: [
        'vertical-events',
        'horizontal-events',
        'alternating',
        'milestone-rail',
        'dated-list',
        'snake-timeline',
        'cards-timeline',
        'compact-dates',
      ],
    },
  ],
  // comparison (versus-competitors, comparison-table, comparison-duo) → 7
  comparison: [
    { prop: 'layout', values: ['two-col-versus', 'matrix', 'before-after', 'toggle', 'three-way', 'toggle-rows', 'highlight-winner'] },
  ],
  // nav (barres de navigation) → 6
  nav: [
    {
      prop: 'layout',
      values: ['logo-left', 'centered', 'mega-menu', 'minimal', 'with-cta', 'split'],
    },
  ],
  // footer (pieds de page) → 6
  footer: [
    {
      prop: 'layout',
      values: ['columns-4', 'columns-mega', 'minimal', 'big-cta', 'newsletter', 'sitemap'],
    },
  ],
  // ─── 6 nouveaux archétypes (un axe `layout`) ───
  // blog (cartes / listes d'articles) → 8
  blog: [
    {
      prop: 'layout',
      values: [
        'cards-grid',
        'list-rows',
        'featured-plus-list',
        'magazine',
        'grid-with-sidebar',
        'minimal-list',
        'cards-image-top',
        'two-col-list',
      ],
    },
  ],
  // people (équipe / personnes) → 7
  people: [
    {
      prop: 'layout',
      values: [
        'avatar-grid',
        'avatar-row',
        'cards-bio',
        'list-rows',
        'featured-leader',
        'circular-grid',
        'two-col',
      ],
    },
  ],
  // contact (formulaire + infos) → 6
  contact: [
    {
      prop: 'layout',
      values: [
        'form-left-info-right',
        'form-right-info-left',
        'form-only',
        'form-map-split',
        'info-columns-form-below',
        'centered-form',
      ],
    },
  ],
  // map (carte / localisations) → 5
  map: [
    {
      prop: 'layout',
      values: ['map-full', 'map-left-info', 'map-right-info', 'map-with-cards', 'locations-list-map'],
    },
  ],
  // toolbar (barre d'outils / filtres) → 5
  toolbar: [
    {
      prop: 'layout',
      values: ['filters-inline', 'search-center', 'tabs-filters', 'sort-bar', 'sticky-toolbar'],
    },
  ],
  // callout (encart / aparté) → 6
  callout: [
    {
      prop: 'layout',
      values: ['note-inline', 'highlight-box', 'icon-callout', 'quote-callout', 'warning-bar', 'tip-card'],
    },
  ],
  // ─── 12 nouveaux archétypes (un axe `layout`) ───
  // pageheader (en-tête de page) → 7
  pageheader: [
    {
      prop: 'layout',
      values: ['title-only', 'title-breadcrumb', 'title-intro', 'title-meta', 'centered-title', 'title-with-cta', 'split-title-aside'],
    },
  ],
  // richtext (texte riche) → 6
  richtext: [
    {
      prop: 'layout',
      values: ['single-col', 'with-toc', 'two-col', 'wide-prose', 'with-sidebar-notes', 'legal-numbered'],
    },
  ],
  // video (vidéo / lecteur) → 6
  video: [
    {
      prop: 'layout',
      values: ['video-full', 'video-left-text', 'video-right-text', 'video-grid', 'video-with-chapters', 'poster-modal'],
    },
  ],
  // product (produits / catalogue) → 6
  product: [
    {
      prop: 'layout',
      values: ['cards-grid', 'cards-list', 'featured-product', 'grid-with-filters', 'carousel-row', 'two-col-detail'],
    },
  ],
  // integrations (intégrations / connecteurs) → 5
  integrations: [
    {
      prop: 'layout',
      values: ['logo-grid-categories', 'search-grid', 'featured-plus-grid', 'list-by-category', 'marquee-grid'],
    },
  ],
  // divider (séparateur / rupture) → 6
  divider: [
    {
      prop: 'layout',
      values: ['rule-line', 'label-center', 'icon-break', 'quote-break', 'gradient-fade', 'number-marker'],
    },
  ],
  // breadcrumb (fil d'ariane) → 5
  breadcrumb: [
    {
      prop: 'layout',
      values: ['inline-path', 'with-title', 'centered', 'arrowed', 'condensed'],
    },
  ],
  // errorstate (état d'erreur / page vide) → 5
  errorstate: [
    {
      prop: 'layout',
      values: ['centered-illustration', 'split-illustration', 'minimal-text', 'with-search', 'with-links'],
    },
  ],
  // consent (consentement / cookies) → 5
  consent: [
    {
      prop: 'layout',
      values: ['bottom-bar', 'corner-card', 'center-modal', 'top-bar', 'detailed-prefs'],
    },
  ],
  // modal (boîte de dialogue) → 5
  modal: [
    {
      prop: 'layout',
      values: ['centered-dialog', 'side-drawer', 'fullscreen', 'bottom-sheet', 'image-dialog'],
    },
  ],
  // jobs (offres d'emploi) → 5
  jobs: [
    {
      prop: 'layout',
      values: ['list-rows', 'cards-grid', 'by-department', 'table-listing', 'featured-roles'],
    },
  ],
  // events (événements / agenda) → 5
  events: [
    {
      prop: 'layout',
      values: ['cards-grid', 'list-dated', 'calendar-grid', 'featured-event', 'timeline-upcoming'],
    },
  ],
};

/* ───────────────────────────── Squelettes = PRESETS de props primitives ─────────────────────────────
 * MIGRATION #46-A. Un squelette n'est PAS un nom de layout opaque : c'est un PRESET de props
 * PRIMITIVES déjà honorées par le moteur/composant. Chaque preset pose un `layout` ∈ les 21
 * recettes CSS RÉELLES (cf section-layouts.css) + d'autres props honorées → rend DISTINCTEMENT
 * sans aucune recette CSS nouvelle. STRUCTURAL_SKELETONS est PARTIAL : seuls les archétypes
 * migrés y figurent ; les autres retombent sur le cartésien STRUCTURAL_AXES (migration
 * incrémentale). 0 clé inventée, 0 valeur `layout` hors des 21 recettes. */
export interface SkeletonDef {
  name: string;
  props: Record<string, string | number>;
}

export const STRUCTURAL_SKELETONS: Partial<Record<Archetype, SkeletonDef[]>> = {
  // collection (feature-grid, case-card-grid, deliverables-grid…) : 14 presets témoins.
  collection: [
    { name: 'grid-uniform', props: { layout: 'grid-uniform', columns: '3' } },
    { name: 'grid-auto', props: { layout: 'grid-auto' } },
    { name: 'grid-asym', props: { layout: 'grid-asym' } },
    { name: 'list', props: { layout: 'list' } },
    { name: 'rows-divided', props: { layout: 'rows-divided', dividers: 'row-rules' } },
    { name: 'bento-feature', props: { layout: 'bento-feature' } },
    { name: 'featured-split', props: { layout: 'featured-split' } },
    { name: 'two-col', props: { layout: 'two-col', columns: '2' } },
    { name: 'alternating', props: { layout: 'rows-divided', colorDistribution: 'alternating' } },
    { name: 'cards-deck', props: { layout: 'grid-uniform', columns: '4', density: 'compact' } },
    { name: 'list-media-left', props: { layout: 'list', cardMedia: 'image', cardContent: 'media-title-desc' } },
    { name: 'grid-3-featured', props: { layout: 'grid-uniform', columns: '3', colorDistribution: 'featured-first' } },
    { name: 'cards-overlap', props: { layout: 'bento-feature', density: 'ample' } },
    { name: 'metric-row', props: { layout: 'grid-uniform', columns: '4', cardContent: 'title-desc', density: 'compact' } },
  ],
};

/* ───────────────────────────── Labels FR auto-composés ───────────────────────────── */

const LAYOUT_LABEL: Record<string, string> = {
  'grid-uniform': 'grille uniforme',
  'grid-auto': 'grille auto',
  'grid-asym': 'grille asymétrique',
  list: 'liste',
  'rows-divided': 'lignes séparées',
  'bento-feature': 'bento vedette',
  'featured-split': 'vedette + split',
  bento: 'bento',
  mosaic: 'mosaïque',
  'matrix-2x2': 'matrice 2x2',
  'matrix-3x3': 'matrice 3x3',
  masonry: 'masonry',
  'vertical-stack': 'pile verticale',
  horizontal: 'horizontal',
  'numbered-rows': 'lignes numérotées',
  'grid-steps': 'grille étapes',
  diagram: 'diagramme',
  prose: 'prose',
  'two-col': 'deux colonnes',
  'lead-aside': 'chapeau + aparté',
  inline: 'en ligne',
  stacked: 'empilé',
  split: 'split',
  centered: 'centré',
  masthead: 'masthead',
  funnel: 'entonnoir',
  marquee: 'marquee',
  // ─── nouvelles valeurs (extension 22 archétypes) ───
  alternating: 'alternance',
  'cards-deck': 'jeu de cartes',
  'matrix-4x4': 'matrice 4x4',
  'feature-corner': 'coin vedette',
  zigzag: 'zigzag',
  'connected-line': 'ligne connectée',
  'drop-cap': 'lettrine',
  'pull-quote': 'citation détachée',
  'centered-statement': 'énoncé centré',
  'peek-scroll': 'défilement aperçu',
  'comparison-matrix': 'matrice comparative',
  'feature-check': 'cases à cocher',
  'spec-rows': 'lignes specs',
  'full-bleed': 'pleine largeur',
  'full-bleed-image': 'image pleine',
  minimal: 'minimal',
  'with-form': 'avec formulaire',
  'bordered-grid': 'grille bordée',
  'with-heading': 'avec titre',
  'inline-row': 'ligne en ligne',
  'big-number-split': 'grand nombre split',
  'with-context': 'avec contexte',
  ticker: 'bandeau défilant',
  'comparison-pair': 'paire comparée',
  'single-quote': 'citation unique',
  'quote-grid': 'grille de citations',
  carousel: 'carrousel',
  'with-logos': 'avec logos',
  'avatar-row': 'ligne avatars',
  'big-quote': 'grande citation',
  'video-quote': 'citation vidéo',
  'tier-cards-3': '3 paliers',
  'tier-cards-2': '2 paliers',
  single: 'palier unique',
  'toggle-billing': 'bascule facturation',
  'feature-checklist': 'liste de cases',
  'highlighted-popular': 'palier mis en avant',
  'accordion-single': 'accordéon simple',
  'accordion-two-col': 'accordéon 2 colonnes',
  'list-open': 'liste ouverte',
  grid: 'grille',
  'with-aside-cta': 'avec aparté CTA',
  'single-col': 'colonne unique',
  'split-with-media': 'split avec média',
  'multi-step': 'multi-étapes',
  'boxed-card': 'carte encadrée',
  'thin-bar': 'bandeau fin',
  'with-cta': 'avec CTA',
  countdown: 'compte à rebours',
  dismissible: 'fermable',
  'horizontal-tabs': 'onglets horizontaux',
  'vertical-tabs': 'onglets verticaux',
  segmented: 'segmenté',
  pills: 'pilules',
  slider: 'slider',
  peek: 'aperçu',
  fade: 'fondu',
  thumbnails: 'vignettes',
  'vertical-events': 'événements verticaux',
  'horizontal-events': 'événements horizontaux',
  'milestone-rail': 'rail de jalons',
  'dated-list': 'liste datée',
  'two-col-versus': 'face à face',
  matrix: 'matrice',
  'before-after': 'avant après',
  toggle: 'bascule',
  'logo-left': 'logo à gauche',
  'mega-menu': 'méga-menu',
  'columns-4': '4 colonnes',
  'columns-mega': 'méga colonnes',
  'big-cta': 'grand CTA',
  newsletter: 'newsletter',
  sitemap: 'plan du site',
  // ─── extension 28 archétypes : allongements (2b) ───
  'list-media-left': 'liste média à gauche',
  'grid-3-featured': 'grille 3 + vedette',
  'cards-overlap': 'cartes superposées',
  'metric-row': 'ligne de mesures',
  'matrix-3x2': 'matrice 3x2',
  'feature-row': 'ligne vedette',
  quad: 'quadrant',
  'cards-steps': 'cartes étapes',
  snake: 'serpentin',
  'vertical-alternating': 'vertical alterné',
  sidenote: 'note de marge',
  'numbered-prose': 'prose numérotée',
  'two-col-lead': 'chapeau 2 colonnes',
  'statement-big': 'grand énoncé',
  'masonry-3': 'masonry 3 colonnes',
  'fullbleed-pair': 'paire pleine largeur',
  filmstrip: 'pellicule',
  overlap: 'chevauchement',
  'striped-rows': 'lignes zébrées',
  'sticky-header': 'en-tête collant',
  'two-col-compare': 'comparaison 2 colonnes',
  checklist: 'liste de contrôle',
  'split-image': 'split image',
  boxed: 'encadré',
  gradient: 'dégradé',
  'two-row': 'deux rangées',
  'logo-quote': 'logo + citation',
  tiered: 'par paliers',
  'split-reverse': 'split inversé',
  'video-bg': 'fond vidéo',
  'centered-narrow': 'centré étroit',
  'with-logos-strip': 'avec bande de logos',
  'side-form': 'formulaire latéral',
  'kpi-row': 'ligne KPI',
  'dual-metric': 'double mesure',
  'progress-bars': 'barres de progression',
  'logo-quote-grid': 'grille logo + citation',
  'split-quote': 'citation split',
  'rating-cards': 'cartes de notes',
  'tier-cards-4': '4 paliers',
  'side-by-side': 'côte à côte',
  'enterprise-row': 'ligne entreprise',
  'two-col-open': '2 colonnes ouvert',
  categorized: 'par catégories',
  'search-faq': 'FAQ avec recherche',
  'two-step': 'deux étapes',
  'compact-inline': 'compact en ligne',
  'full-width': 'pleine largeur',
  'sticky-top': 'collant en haut',
  'promo-split': 'promo split',
  'underline-tabs': 'onglets soulignés',
  'boxed-tabs': 'onglets encadrés',
  'vertical-rail': 'rail vertical',
  'cards-peek': 'cartes en aperçu',
  'full-slide': 'diapo pleine',
  'logo-carousel': 'carrousel de logos',
  'snake-timeline': 'frise serpentin',
  'cards-timeline': 'frise en cartes',
  'compact-dates': 'dates compactes',
  'three-way': 'trois voies',
  'toggle-rows': 'lignes à bascule',
  'highlight-winner': 'gagnant mis en avant',
  // ─── 6 nouveaux archétypes (2a) ───
  // blog
  'cards-grid': 'grille de cartes',
  'list-rows': 'lignes de liste',
  'featured-plus-list': 'vedette + liste',
  magazine: 'magazine',
  'grid-with-sidebar': 'grille + colonne',
  'minimal-list': 'liste minimale',
  'cards-image-top': 'cartes image en haut',
  'two-col-list': 'liste 2 colonnes',
  // people
  'avatar-grid': 'grille avatars',
  'cards-bio': 'cartes bio',
  'featured-leader': 'dirigeant en vedette',
  'circular-grid': 'grille ronde',
  // contact
  'form-left-info-right': 'formulaire à gauche, infos à droite',
  'form-right-info-left': 'formulaire à droite, infos à gauche',
  'form-only': 'formulaire seul',
  'form-map-split': 'formulaire + carte',
  'info-columns-form-below': 'colonnes infos, formulaire dessous',
  'centered-form': 'formulaire centré',
  // map
  'map-full': 'carte pleine',
  'map-left-info': 'carte à gauche, infos',
  'map-right-info': 'carte à droite, infos',
  'map-with-cards': 'carte avec cartes',
  'locations-list-map': 'liste de lieux + carte',
  // toolbar
  'filters-inline': 'filtres en ligne',
  'search-center': 'recherche centrée',
  'tabs-filters': 'onglets + filtres',
  'sort-bar': 'barre de tri',
  'sticky-toolbar': 'barre collante',
  // callout
  'note-inline': 'note en ligne',
  'highlight-box': 'encart surligné',
  'icon-callout': 'encart à icône',
  'quote-callout': 'encart citation',
  'warning-bar': 'bandeau d\'alerte',
  'tip-card': 'carte conseil',
  // ─── 12 nouveaux archétypes (extension 40) ───
  // pageheader (centered-title réutilise 'centered' ? non : libellé propre)
  'title-only': 'titre seul',
  'title-breadcrumb': 'titre + fil',
  'title-intro': 'titre + intro',
  'title-meta': 'titre + méta',
  'centered-title': 'titre centré',
  'title-with-cta': 'titre + CTA',
  'split-title-aside': 'titre + aparté',
  // richtext (two-col existe déjà)
  'with-toc': 'avec sommaire',
  'wide-prose': 'prose large',
  'with-sidebar-notes': 'notes en marge',
  'legal-numbered': 'légal numéroté',
  // video
  'video-full': 'vidéo pleine',
  'video-left-text': 'vidéo à gauche, texte',
  'video-right-text': 'vidéo à droite, texte',
  'video-grid': 'grille vidéos',
  'video-with-chapters': 'vidéo + chapitres',
  'poster-modal': 'poster + modal',
  // product (cards-grid existe déjà)
  'cards-list': 'liste de cartes',
  'featured-product': 'produit vedette',
  'grid-with-filters': 'grille + filtres',
  'carousel-row': 'rangée carrousel',
  'two-col-detail': 'détail 2 colonnes',
  // integrations
  'logo-grid-categories': 'grille logos catégorisée',
  'search-grid': 'grille + recherche',
  'featured-plus-grid': 'vedette + grille',
  'list-by-category': 'liste par catégorie',
  'marquee-grid': 'grille défilante',
  // divider
  'rule-line': 'filet',
  'label-center': 'libellé centré',
  'icon-break': 'rupture icône',
  'quote-break': 'rupture citation',
  'gradient-fade': 'fondu dégradé',
  'number-marker': 'marqueur numéro',
  // breadcrumb (centered existe déjà)
  'inline-path': 'chemin en ligne',
  'with-title': 'avec titre',
  arrowed: 'fléché',
  condensed: 'condensé',
  // errorstate
  'centered-illustration': 'illustration centrée',
  'split-illustration': 'illustration split',
  'minimal-text': 'texte minimal',
  'with-search': 'avec recherche',
  'with-links': 'avec liens',
  // consent
  'bottom-bar': 'barre basse',
  'corner-card': 'carte coin',
  'center-modal': 'modale centrée',
  'top-bar': 'barre haute',
  'detailed-prefs': 'préférences détaillées',
  // modal
  'centered-dialog': 'dialogue centré',
  'side-drawer': 'tiroir latéral',
  fullscreen: 'plein écran',
  'bottom-sheet': 'panneau bas',
  'image-dialog': 'dialogue image',
  // jobs (list-rows et cards-grid existent déjà)
  'by-department': 'par département',
  'table-listing': 'liste tableau',
  'featured-roles': 'rôles vedettes',
  // events (cards-grid existe déjà)
  'list-dated': 'liste datée',
  'calendar-grid': 'grille calendrier',
  'featured-event': 'événement vedette',
  'timeline-upcoming': 'à venir',
};

const PROPORTION_LABEL: Record<string, string> = {
  '1-1': 'équilibré',
  '1-2': 'média dominant',
  '2-1': 'texte dominant',
  '2-3': 'média large',
  '3-2': 'texte large',
  '1-3': 'média très large',
  '3-1': 'texte très large',
};

const SIDE_LABEL: Record<string, string> = { left: 'média à gauche', right: 'média à droite' };
const ALIGN_LABEL: Record<string, string> = { start: 'aligné début', center: 'centré' };

function valueLabel(prop: string, value: string): string {
  if (prop === 'layout') return LAYOUT_LABEL[value] ?? value;
  if (prop === 'proportion') return PROPORTION_LABEL[value] ?? value;
  if (prop === 'mediaSide') return SIDE_LABEL[value] ?? value;
  if (prop === 'align') return ALIGN_LABEL[value] ?? value;
  return value;
}

/** Libellé FR d'un squelette (preset). Réutilise LAYOUT_LABEL quand le nom existe déjà. */
const SKELETON_LABEL: Record<string, string> = {
  'grid-uniform': 'grille uniforme',
  'grid-auto': 'grille auto',
  'grid-asym': 'grille asymétrique',
  list: 'liste',
  'rows-divided': 'lignes séparées',
  'bento-feature': 'bento vedette',
  'featured-split': 'vedette + split',
  'two-col': 'deux colonnes',
  alternating: 'alternance',
  'cards-deck': 'jeu de cartes',
  'list-media-left': 'liste média à gauche',
  'grid-3-featured': 'grille 3 + vedette',
  'cards-overlap': 'cartes superposées',
  'metric-row': 'ligne de métriques',
};

function skeletonLabel(name: string): string {
  return SKELETON_LABEL[name] ?? LAYOUT_LABEL[name] ?? name;
}

/* ───────────────────────────── Cartésien + élagage ───────────────────────────── */

/** Famille registry d'un type (pour remplir `family` + dériver l'archétype). */
function familyOf(type: SectionType): string | undefined {
  return SECTIONS[type]?.family;
}

/** Produit cartésien des axes → liste de combos {prop: value}. Ordre stable. */
function cartesian(axes: AxisDef[]): Array<Record<string, string>> {
  return axes.reduce<Array<Record<string, string>>>(
    (acc, axis) =>
      acc.flatMap((combo) => axis.values.map((value) => ({ ...combo, [axis.prop]: value }))),
    [{}],
  );
}

/**
 * Règles d'ÉLAGAGE (combos invalides/absurdes → jetées AVANT génération).
 * Minimale OBLIGATOIRE : split proportion='1-1' → mediaSide neutre (1 seule entrée, pas
 * left+right). On retire mediaSide du combo pour que l'id/props soient « 1-1 » sans côté.
 * Retourne le combo normalisé, ou null si le combo doit être totalement écarté (doublon).
 */
function prune(
  archetype: Archetype,
  combo: Record<string, string>,
): Record<string, string> | null {
  if (archetype === 'split') {
    if (combo.proportion === '1-1') {
      // 1-1 = symétrique → le côté média n'a pas de sens. On ne garde QUE mediaSide='right'
      // (canonique) et on retire la clé mediaSide du combo normalisé → 1 entrée unique.
      if (combo.mediaSide === 'left') return null; // doublon de la version 'right'
      const { mediaSide: _omit, ...rest } = combo;
      return rest;
    }
  }
  return combo;
}

/* ───────────────────────────── API publique ───────────────────────────── */

/**
 * Set COMPLET de variantes structurelles d'un type = produit cartésien des axes de son
 * archétype, élagué. Compte = `variantCount(type)`. Ids stables/déterministes/kebab-case.
 */
export function variantsFor(type: SectionType): GeneratedVariant[] {
  const family = familyOf(type);
  const archetype = archetypeFor(type, family);

  // TYPE mixin-safe MIGRÉ (#46-A) → 1 variante par PRESET de props primitives (rend
  // distinctement sans recette CSS nouvelle). Gardé par MIXIN_READY : un type collection NON
  // câblé au moteur (ex. composant legacy attendant un columns TABLEAU) repasse par le
  // cartésien STRUCTURAL_AXES d'origine → pas de crash columns.map au prerender.
  const skeletons = MIXIN_READY.has(type) ? STRUCTURAL_SKELETONS[archetype] : undefined;
  if (skeletons && skeletons.length > 0) {
    const seenSk = new Set<string>();
    const outSk: GeneratedVariant[] = [];
    for (const sk of skeletons) {
      const id = `${type}--${sk.name}`;
      if (seenSk.has(id)) continue;
      seenSk.add(id);
      outSk.push({
        id,
        type,
        label: `${type} · ${skeletonLabel(sk.name)}`,
        family,
        props: { ...sk.props },
        generated: true,
      });
    }
    return outSk;
  }

  const axes = STRUCTURAL_AXES[archetype];
  if (!axes || axes.length === 0) return [];

  const seen = new Set<string>();
  const out: GeneratedVariant[] = [];

  for (const rawCombo of cartesian(axes)) {
    const combo = prune(archetype, rawCombo);
    if (!combo) continue;

    // suffixe id = valeurs des props présentes, dans l'ordre des axes déclarés
    const orderedProps = axes.map((a) => a.prop).filter((p) => combo[p] !== undefined);
    const suffix = orderedProps.map((p) => combo[p]).join('-');
    const id = `${type}--${suffix}`;
    if (seen.has(id)) continue;
    seen.add(id);

    const labelParts = orderedProps.map((p) => valueLabel(p, combo[p]!));
    out.push({
      id,
      type,
      label: `${type} · ${labelParts.join(' · ')}`,
      family,
      props: { ...combo },
      generated: true,
    });
  }

  return out;
}

/** Compte CONNU À L'AVANCE de variantes structurelles d'un type. */
export function variantCount(type: SectionType): number {
  return variantsFor(type).length;
}

/**
 * Les 16 versions colorées d'UN variant de base (défaut = le 1er variant structurel).
 * Sert le sélecteur de schéma du builder + la PREUVE de complétude couleur. L'axe couleur
 * est orthogonal : ces entrées ne sont PAS ajoutées au catalogue de chaque type (sinon
 * ×16) — seules un/des types témoins les rendent dans la preview.
 */
export function colorVariantsFor(
  type: SectionType,
  baseVariant?: GeneratedVariant,
): GeneratedVariant[] {
  const base = baseVariant ?? variantsFor(type)[0];
  if (!base) return [];
  const baseLayout =
    (base.props.layout as string | undefined) ??
    (base.props.proportion as string | undefined) ??
    'base';

  return COLOR_SCHEMES.map((scheme: ColorScheme) => {
    const sp = schemeProps(scheme);
    const props: Record<string, string | number | boolean> = {
      ...base.props,
      background: sp.background,
    };
    if (sp.cellCycle && sp.cellCycle.length > 0) props.cellCycle = sp.cellCycle.join(',');
    return {
      id: `${type}--${baseLayout}--scheme-${scheme.id}`,
      type,
      label: `${base.label} · ${scheme.label}`,
      family: base.family,
      props,
      generated: true as const,
    };
  });
}

/* ════════════════════════════════════════════════════════════════════════════
   SYS v2-E — ESPACE D'AXES COMPLET + COUVERTURE DIVERSE
   ════════════════════════════════════════════════════════════════════════════
   Le `STRUCTURAL_AXES` ci-dessus = les FORMES (cartes principales du catalogue).
   `FULL_AXES` = l'espace combinatoire RÉEL d'un archétype (tous les axes du moteur
   pertinents), pour :
     - `combinationCount(type)` = produit des cardinalités = « le nombre de possibilités »
       (exposé au builder/MCP, l'espace est nommé et mesuré, aucun axe oublié).
     - `coverageVariantsFor(type)` = couverture DÉTERMINISTE (1-wise covering array) où
       CHAQUE valeur de CHAQUE axe apparaît au moins une fois + quelques paires-clés
       curées. Bornée (~60-120), ids stables, props valides, 0 random, combos invalides
       élagués. Le catalogue est RICHE et VARIÉ sans pré-rendre les milliards.
   `colorScheme` est un axe LOGIQUE (16 schémas) : à la génération il s'expanse en
   props honorées par le moteur (`background` + `cellCycle`). Aucune clé inventée. */

/** Espace combinatoire réel par archétype. `colorScheme` = axe logique (cf expansion). */
export const FULL_AXES: Record<Archetype, AxisDef[]> = {
  collection: [
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    {
      prop: 'headerKind',
      values: ['none', 'title', 'eyebrow-title', 'eyebrow-title-lede', 'eyebrow-title-lede-cta'],
    },
    { prop: 'introRow', values: ['none', 'lede-aside', 'desc-media-split', 'lede-centered'] },
    {
      prop: 'layout',
      values: [
        'grid-uniform',
        'grid-auto',
        'grid-asym',
        'list',
        'rows-divided',
        'bento-feature',
        'featured-split',
      ],
    },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'dividers', values: ['none', 'column-rules', 'row-rules', 'grid-lines'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'itemHeight', values: ['auto', 'even', 'square'] },
    {
      prop: 'cardContent',
      values: ['title', 'title-desc', 'icon-title-desc', 'title-desc-meta', 'media-title-desc'],
    },
    { prop: 'cardMedia', values: ['none', 'icon', 'image', 'image-bg'] },
    { prop: 'cardAlign', values: ['left', 'center'] },
    // axe logique couleur : 16 schémas (expansés en background+cellCycle à la génération)
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    {
      prop: 'colorDistribution',
      values: ['uniform', 'featured-first', 'one-accent', 'alternating'],
    },
    { prop: 'bgSource', values: ['color', 'image', 'gradient'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom', 'tint', 'border'] },
  ],
  // Autres archétypes : espace raisonnable (seul collection est RENDU richement aujourd'hui ;
  // ces déclarations donnent un combinationCount honnête et préparent l'extension).
  split: [
    { prop: 'proportion', values: ['1-1', '1-2', '2-1', '2-3', '3-2', '1-3', '3-1'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'headerKind', values: ['none', 'title', 'eyebrow-title', 'eyebrow-title-lede'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'mediaFit', values: ['cover', 'contain'] },
    { prop: 'mediaRatio', values: ['auto', '1-1', '4-3', '16-9'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    { prop: 'hover', values: ['none', 'lift', 'media-zoom'] },
  ],
  bento: [
    { prop: 'layout', values: ['bento', 'bento-feature', 'mosaic', 'matrix-2x2', 'matrix-3x3', 'matrix-3x2', 'grid-uniform', 'quad', 'feature-row'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'cardMedia', values: ['none', 'icon', 'image', 'image-bg'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
  ],
  process: [
    { prop: 'layout', values: ['vertical-stack', 'horizontal', 'numbered-rows', 'grid-steps', 'diagram'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  editorial: [
    { prop: 'layout', values: ['prose', 'two-col', 'list', 'rows-divided', 'lead-aside'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'measure', values: ['prose', 'read', 'wide'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  gallery: [
    { prop: 'layout', values: ['grid-auto', 'mosaic', 'masonry', 'masonry-3', 'matrix-3x3', 'featured-split', 'filmstrip', 'overlap'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'itemHeight', values: ['auto', 'even', 'square'] },
    { prop: 'cardMedia', values: ['image', 'image-bg'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    { prop: 'hover', values: ['none', 'media-zoom', 'zoom'] },
  ],
  table: [
    { prop: 'layout', values: ['rows-divided', 'grid-steps', 'striped-rows', 'sticky-header', 'two-col-compare', 'checklist'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'dividers', values: ['none', 'row-rules', 'grid-lines'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  band: [
    { prop: 'layout', values: ['inline', 'stacked', 'centered', 'full-bleed', 'split-image', 'boxed', 'gradient'] },
    { prop: 'align', values: ['start', 'center'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  hero: [
    { prop: 'layout', values: ['split', 'centered', 'masthead', 'funnel', 'full-bleed-image', 'minimal', 'split-reverse', 'side-form'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    { prop: 'bgSource', values: ['color', 'image', 'gradient'] },
  ],
  logos: [
    { prop: 'layout', values: ['marquee', 'grid-uniform', 'grid-auto', 'rows-divided', 'bordered-grid', 'with-heading', 'two-row', 'logo-quote', 'tiered'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'columns', values: ['auto', '3', '4', '6'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  // ─── 12 nouveaux archétypes (mêmes layouts que STRUCTURAL_AXES + axes transverses honorés) ───
  stats: [
    { prop: 'layout', values: ['inline-row', 'grid-uniform', 'big-number-split', 'bento', 'with-context', 'ticker', 'comparison-pair', 'kpi-row', 'dual-metric', 'progress-bars'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  testimonial: [
    { prop: 'layout', values: ['single-quote', 'quote-grid', 'carousel', 'with-logos', 'avatar-row', 'big-quote', 'video-quote', 'logo-quote-grid', 'split-quote', 'rating-cards'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  pricing: [
    { prop: 'layout', values: ['tier-cards-3', 'tier-cards-2', 'single', 'comparison-matrix', 'toggle-billing', 'feature-checklist', 'highlighted-popular', 'tier-cards-4', 'side-by-side', 'enterprise-row'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  faq: [
    { prop: 'layout', values: ['accordion-single', 'accordion-two-col', 'list-open', 'grid', 'with-aside-cta', 'two-col-open', 'categorized', 'search-faq'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  form: [
    { prop: 'layout', values: ['single-col', 'two-col', 'inline', 'split-with-media', 'multi-step', 'boxed-card', 'two-step', 'compact-inline', 'full-width'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  banner: [
    { prop: 'layout', values: ['thin-bar', 'with-cta', 'countdown', 'dismissible', 'sticky-top', 'promo-split'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  tabs: [
    { prop: 'layout', values: ['horizontal-tabs', 'vertical-tabs', 'segmented', 'pills', 'underline-tabs', 'boxed-tabs', 'vertical-rail'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  carousel: [
    { prop: 'layout', values: ['slider', 'peek', 'fade', 'thumbnails', 'cards-peek', 'full-slide', 'logo-carousel'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  timeline: [
    { prop: 'layout', values: ['vertical-events', 'horizontal-events', 'alternating', 'milestone-rail', 'dated-list', 'snake-timeline', 'cards-timeline', 'compact-dates'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  comparison: [
    { prop: 'layout', values: ['two-col-versus', 'matrix', 'before-after', 'toggle', 'three-way', 'toggle-rows', 'highlight-winner'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  nav: [
    { prop: 'layout', values: ['logo-left', 'centered', 'mega-menu', 'minimal', 'with-cta', 'split'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  footer: [
    { prop: 'layout', values: ['columns-4', 'columns-mega', 'minimal', 'big-cta', 'newsletter', 'sitemap'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  // ─── 6 nouveaux archétypes (mêmes layouts que STRUCTURAL_AXES + axes transverses honorés) ───
  blog: [
    { prop: 'layout', values: ['cards-grid', 'list-rows', 'featured-plus-list', 'magazine', 'grid-with-sidebar', 'minimal-list', 'cards-image-top', 'two-col-list'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  people: [
    { prop: 'layout', values: ['avatar-grid', 'avatar-row', 'cards-bio', 'list-rows', 'featured-leader', 'circular-grid', 'two-col'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  contact: [
    { prop: 'layout', values: ['form-left-info-right', 'form-right-info-left', 'form-only', 'form-map-split', 'info-columns-form-below', 'centered-form'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  map: [
    { prop: 'layout', values: ['map-full', 'map-left-info', 'map-right-info', 'map-with-cards', 'locations-list-map'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  toolbar: [
    { prop: 'layout', values: ['filters-inline', 'search-center', 'tabs-filters', 'sort-bar', 'sticky-toolbar'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  callout: [
    { prop: 'layout', values: ['note-inline', 'highlight-box', 'icon-callout', 'quote-callout', 'warning-bar', 'tip-card'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  // ─── 12 nouveaux archétypes (mêmes layouts que STRUCTURAL_AXES + axes transverses honorés) ───
  pageheader: [
    { prop: 'layout', values: ['title-only', 'title-breadcrumb', 'title-intro', 'title-meta', 'centered-title', 'title-with-cta', 'split-title-aside'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  richtext: [
    { prop: 'layout', values: ['single-col', 'with-toc', 'two-col', 'wide-prose', 'with-sidebar-notes', 'legal-numbered'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  video: [
    { prop: 'layout', values: ['video-full', 'video-left-text', 'video-right-text', 'video-grid', 'video-with-chapters', 'poster-modal'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  product: [
    { prop: 'layout', values: ['cards-grid', 'cards-list', 'featured-product', 'grid-with-filters', 'carousel-row', 'two-col-detail'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  integrations: [
    { prop: 'layout', values: ['logo-grid-categories', 'search-grid', 'featured-plus-grid', 'list-by-category', 'marquee-grid'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  divider: [
    { prop: 'layout', values: ['rule-line', 'label-center', 'icon-break', 'quote-break', 'gradient-fade', 'number-marker'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  breadcrumb: [
    { prop: 'layout', values: ['inline-path', 'with-title', 'centered', 'arrowed', 'condensed'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  errorstate: [
    { prop: 'layout', values: ['centered-illustration', 'split-illustration', 'minimal-text', 'with-search', 'with-links'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  consent: [
    { prop: 'layout', values: ['bottom-bar', 'corner-card', 'center-modal', 'top-bar', 'detailed-prefs'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  modal: [
    { prop: 'layout', values: ['centered-dialog', 'side-drawer', 'fullscreen', 'bottom-sheet', 'image-dialog'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  jobs: [
    { prop: 'layout', values: ['list-rows', 'cards-grid', 'by-department', 'table-listing', 'featured-roles'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  events: [
    { prop: 'layout', values: ['cards-grid', 'list-dated', 'calendar-grid', 'featured-event', 'timeline-upcoming'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorDistribution', values: ['uniform', 'featured-first', 'one-accent', 'alternating'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
};

/** Cardinalité d'un axe (le colorScheme compte ses 16 schémas). */
function axisCardinality(axis: AxisDef): number {
  return axis.values.length;
}

/**
 * Nombre de combinaisons de l'espace d'axes d'un type = PRODUIT des cardinalités des
 * FULL_AXES de son archétype. C'est « le nombre de possibilités » exposé (aucun axe
 * oublié). Pré-générer tout est impossible (milliards) — d'où la couverture diverse.
 */
export function combinationCount(type: SectionType): number {
  const archetype = archetypeFor(type, familyOf(type));
  const axes = FULL_AXES[archetype];
  if (!axes || axes.length === 0) return 0;
  return axes.reduce((acc, axis) => acc * axisCardinality(axis), 1);
}

/** Le sous-ensemble des axes du standard (clés de prop) figés au contrat. */
export function fullAxisNames(type: SectionType): string[] {
  const archetype = archetypeFor(type, familyOf(type));
  return (FULL_AXES[archetype] ?? []).map((a) => a.prop);
}

/* ─── Élagage des combos invalides/redondants (couverture) ─── */
/**
 * Normalise un combo : retire les clés redondantes/incohérentes AVANT de poser les props.
 * - cardMedia='image-bg' + bgSource='image' → on garde le fond de CARTE (cardMedia), la
 *   section repasse en couleur (redondance « tout en image » illisible/superflue).
 * - cardMedia='image-bg' impose un cardContent qui a un titre (pas 'title' nu suffit) ; on
 *   laisse, le moteur gère le contraste. Pas d'autre invalidité dure (les axes du moteur
 *   sont conçus inertes/gracieux hors de leur recette).
 */
function pruneFullCombo(combo: Record<string, string>): Record<string, string> {
  const c = { ...combo };
  if (c.cardMedia === 'image-bg' && c.bgSource === 'image') c.bgSource = 'color';
  // colRatio n'a de sens que pour grid-asym : non présent dans FULL_AXES collection (knob),
  // donc rien à élaguer ici. columns est ignoré gracieusement par les recettes qui imposent
  // leur grille (matrix/bento/list) — le moteur s'en charge, pas d'élagage nécessaire.
  return c;
}

/**
 * Expanse les props logiques en props honorées par le moteur/composant :
 *   - colorScheme → background (+ cellCycle si duo/trio).
 * Les autres props passent telles quelles (clés = data-attrs du moteur).
 */
function expandProps(combo: Record<string, string>): Record<string, string | number | boolean> {
  const props: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(combo)) {
    if (k === 'colorScheme') {
      const scheme = COLOR_SCHEME_BY_ID[v];
      if (scheme) {
        const sp = schemeProps(scheme);
        props.background = sp.background;
        if (sp.cellCycle && sp.cellCycle.length > 0) props.cellCycle = sp.cellCycle.join(',');
      }
      continue;
    }
    props[k] = v;
  }
  return props;
}

/** Résumé court et stable d'un combo pour l'id (les valeurs non-défaut marquantes). */
function coverageSuffix(n: number, focusProp: string, focusValue: string): string {
  const fp = focusProp.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
  return `cov-${n}-${fp}-${focusValue}`;
}

/**
 * Couverture DIVERSE (1-wise covering array) : pour CHAQUE axe et CHAQUE valeur, on émet
 * une variante où cet axe = cette valeur, les AUTRES axes complétés par un round-robin
 * DÉTERMINISTE (index qui avance) → diversité (pas 3 cartes identiques), aucun random.
 * Garantie : chaque valeur de chaque axe apparaît ≥ 1. + paires-clés curées en fin.
 * Bornée naturellement (~Σ cardinalités + curées ≈ 70-90 pour collection).
 */
export function coverageVariantsFor(type: SectionType): GeneratedVariant[] {
  const family = familyOf(type);
  const archetype = archetypeFor(type, family);
  const axes = FULL_AXES[archetype];
  if (!axes || axes.length === 0) return [];

  const out: GeneratedVariant[] = [];
  const seen = new Set<string>();
  let rr = 0; // compteur round-robin global, déterministe

  // Valeur « de remplissage » d'un autre axe = round-robin sur ses valeurs.
  const fillValue = (axis: AxisDef, step: number): string =>
    axis.values[step % axis.values.length]!;

  const pushVariant = (combo: Record<string, string>, n: number, focusProp: string, focusValue: string) => {
    const pruned = pruneFullCombo(combo);
    const id = `${type}--${coverageSuffix(n, focusProp, focusValue)}`;
    if (seen.has(id)) return;
    seen.add(id);
    out.push({
      id,
      type,
      label: `${type} · couverture ${n} · ${focusProp}=${focusValue}`,
      family,
      props: expandProps(pruned),
      generated: true as const,
    });
  };

  let n = 1;
  // 1-wise : balaye chaque axe × chaque valeur, focus fixé, reste en round-robin.
  for (const focusAxis of axes) {
    for (const focusValue of focusAxis.values) {
      const combo: Record<string, string> = {};
      for (const axis of axes) {
        combo[axis.prop] = axis.prop === focusAxis.prop ? focusValue : fillValue(axis, rr);
        rr += 1; // avance à chaque case → diversité maximale entre variantes
      }
      pushVariant(combo, n, focusAxis.prop, focusValue);
      n += 1;
    }
  }

  // Paires-clés curées (interactions visuellement intéressantes, déterministes).
  const curated: Array<[string, Record<string, string>]> = [
    ['dividers-x-color', { layout: 'grid-uniform', columns: '3', dividers: 'grid-lines', colorScheme: 'duo-paper-accent', cardContent: 'icon-title-desc' }],
    ['intro-x-layout', { introRow: 'desc-media-split', layout: 'grid-auto', columns: 'auto', headerKind: 'eyebrow-title-lede', cardContent: 'title-desc' }],
    ['cardbg-x-feature', { cardMedia: 'image-bg', layout: 'bento-feature', columns: '3', colorDistribution: 'featured-first', cardContent: 'media-title-desc' }],
    ['bgimage-x-center', { bgSource: 'image', headerAlign: 'center', layout: 'grid-uniform', columns: '3', cardContent: 'title-desc' }],
    ['oneaccent-x-rows', { colorDistribution: 'one-accent', layout: 'rows-divided', dividers: 'row-rules', cardContent: 'title-desc-meta' }],
    ['alt-x-grid', { colorDistribution: 'alternating', layout: 'grid-uniform', columns: '2', cardContent: 'icon-title-desc' }],
  ];
  for (const [key, combo] of curated) {
    const id = `${type}--cov-pair-${key}`;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({
      id,
      type,
      label: `${type} · paire ${key}`,
      family,
      props: expandProps(pruneFullCombo(combo)),
      generated: true as const,
    });
  }

  return out;
}
