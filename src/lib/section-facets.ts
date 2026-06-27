// Waimia · Section facets (Vague C / F0, 2026-06-28)
// Vocabulaires de facettes ORTHOGONALES (filtres IA-opérables, pas des niveaux d'arbre)
// + unions TS dérivées des valeurs réelles du registry (categorySlug, family).
//
// Source de vérité des tags : ce fichier. Le registry (section-registry.ts) importe
// ces types et les rend obligatoires sur SectionDescriptor.
//
// Les 4 facettes décrivent ce qu'une section CONTIENT / FAIT, indépendamment de sa
// place dans la taxonomie Domaine > Catégorie > Famille > Variante > Déclinaison.

// ───────────────────────────── EFFECTS (animations/effets visibles) ─────────────────────────────
export type EffectTag =
  | 'static' // aucune animation
  | 'scroll-reveal' // apparition au scroll (classe .reveal + observer global)
  | 'crossfade' // fondu enchaîné d'images (data-active opacity)
  | 'sticky-media' // colonne média sticky (scroll-gallery)
  | 'sticky-stack' // cartes qui s'empilent en sticky (stack-cards)
  | 'hover-reveal' // image révélée au survol (hover-reveal-list)
  | 'hover-zoom' // zoom/scale au survol
  | 'marquee' // défilement continu horizontal
  | 'count-up' // compteurs animés
  | 'parallax'
  | 'auto-rotate' // rotation/cycle auto (media-swap-band auto)
  | 'horizontal-scroll' // scroll horizontal / snap (horizontal-showcase)
  | 'expand-collapse'; // accordéon / toggle hauteur

// ───────────────────────────── INTERACTIONS ─────────────────────────────
export type InteractionTag =
  | 'none'
  | 'hover'
  | 'scroll'
  | 'click-toggle'
  | 'autoplay'
  | 'drag-scroll';

// ───────────────────────────── ELEMENTS (atomes d'UI contenus) ─────────────────────────────
export type ElementTag =
  | 'buttons'
  | 'form'
  | 'image'
  | 'multiple-images'
  | 'background-image'
  | 'icons'
  | 'line-art'
  | 'cards'
  | 'logos'
  | 'slider'
  | 'tabs'
  | 'accordion'
  | 'table'
  | 'list'
  | 'video'
  | 'kpi-numbers'
  | 'badge'
  | 'avatar'
  | 'timeline'
  | 'quote'
  | 'code-block';

// ───────────────────────────── LAYOUT (forme de mise en page) ─────────────────────────────
export type LayoutTag =
  | '1-col'
  | '2-col'
  | '3-col'
  | '4-col'
  | 'multi-col'
  | 'media-left'
  | 'media-right'
  | 'bento'
  | 'centered'
  | 'split'
  | 'full-bleed'
  | 'off-grid';

// ───────────────────────────── Listes `as const` (alimentent les filtres UI) ─────────────────────────────
export const EFFECT_TAGS = [
  'static',
  'scroll-reveal',
  'crossfade',
  'sticky-media',
  'sticky-stack',
  'hover-reveal',
  'hover-zoom',
  'marquee',
  'count-up',
  'parallax',
  'auto-rotate',
  'horizontal-scroll',
  'expand-collapse',
] as const satisfies readonly EffectTag[];

export const INTERACTION_TAGS = [
  'none',
  'hover',
  'scroll',
  'click-toggle',
  'autoplay',
  'drag-scroll',
] as const satisfies readonly InteractionTag[];

export const ELEMENT_TAGS = [
  'buttons',
  'form',
  'image',
  'multiple-images',
  'background-image',
  'icons',
  'line-art',
  'cards',
  'logos',
  'slider',
  'tabs',
  'accordion',
  'table',
  'list',
  'video',
  'kpi-numbers',
  'badge',
  'avatar',
  'timeline',
  'quote',
  'code-block',
] as const satisfies readonly ElementTag[];

export const LAYOUT_TAGS = [
  '1-col',
  '2-col',
  '3-col',
  '4-col',
  'multi-col',
  'media-left',
  'media-right',
  'bento',
  'centered',
  'split',
  'full-bleed',
  'off-grid',
] as const satisfies readonly LayoutTag[];

// ───────────────────────────── Libellés FR lisibles (filtres UI) ─────────────────────────────
export const FACET_LABELS_FR: {
  effects: Record<EffectTag, string>;
  interactions: Record<InteractionTag, string>;
  elements: Record<ElementTag, string>;
  layoutFacets: Record<LayoutTag, string>;
} = {
  effects: {
    static: 'Statique',
    'scroll-reveal': 'Apparition au scroll',
    crossfade: 'Fondu enchaîné',
    'sticky-media': 'Média collant',
    'sticky-stack': 'Cartes empilées',
    'hover-reveal': 'Révélation au survol',
    'hover-zoom': 'Zoom au survol',
    marquee: 'Défilement continu',
    'count-up': 'Compteurs animés',
    parallax: 'Parallaxe',
    'auto-rotate': 'Rotation automatique',
    'horizontal-scroll': 'Défilement horizontal',
    'expand-collapse': 'Déplier / replier',
  },
  interactions: {
    none: 'Aucune',
    hover: 'Survol',
    scroll: 'Défilement',
    'click-toggle': 'Clic (bascule)',
    autoplay: 'Lecture automatique',
    'drag-scroll': 'Glisser pour faire défiler',
  },
  elements: {
    buttons: 'Boutons',
    form: 'Formulaire',
    image: 'Image',
    'multiple-images': 'Plusieurs images',
    'background-image': 'Image de fond',
    icons: 'Icônes',
    'line-art': 'Illustration au trait',
    cards: 'Cartes',
    logos: 'Logos',
    slider: 'Slider',
    tabs: 'Onglets',
    accordion: 'Accordéon',
    table: 'Tableau',
    list: 'Liste',
    video: 'Vidéo',
    'kpi-numbers': 'Chiffres clés',
    badge: 'Badge',
    avatar: 'Avatar',
    timeline: 'Frise chronologique',
    quote: 'Citation',
    'code-block': 'Bloc de code',
  },
  layoutFacets: {
    '1-col': '1 colonne',
    '2-col': '2 colonnes',
    '3-col': '3 colonnes',
    '4-col': '4 colonnes',
    'multi-col': 'Multi-colonnes',
    'media-left': 'Média à gauche',
    'media-right': 'Média à droite',
    bento: 'Bento',
    centered: 'Centré',
    split: 'Scindé',
    'full-bleed': 'Pleine largeur',
    'off-grid': 'Hors grille',
  },
};

// ───────────────────────────── Unions dérivées des valeurs réelles du registry ─────────────────────────────
// 28 categorySlug (intent, niveau Catégorie de la taxonomie).
export type CategorySlug =
  | 'about-sections'
  | 'banner-sections'
  | 'breadcrumb-sections'
  | 'call-to-action-sections'
  | 'comparison-sections'
  | 'contact-sections'
  | 'content-listing-sections'
  | 'content-sections'
  | 'cta-sections'
  | 'faq-sections'
  | 'feature-sections'
  | 'gallery-sections'
  | 'hero-header-sections'
  | 'index-sections'
  | 'logo-sections'
  | 'manifesto-sections'
  | 'newsletter-sections'
  | 'pricing-sections'
  | 'process-sections'
  | 'stats-sections'
  | 'table-sections'
  | 'team-sections'
  | 'terminal-sections'
  | 'testimonial-sections'
  | 'timelines'
  | 'trust-proof'
  | 'trust-sections'
  | 'utility-sections';

// 27 family (niveau Famille de la taxonomie).
export type FamilyTag =
  | 'accordion'
  | 'band'
  | 'bento'
  | 'breadcrumb'
  | 'card-grid'
  | 'duo'
  | 'eeat'
  | 'flow'
  | 'form-panel'
  | 'gallery'
  | 'hero'
  | 'list'
  | 'manifesto'
  | 'marquee'
  | 'masthead'
  | 'pain'
  | 'process-steps'
  | 'prose'
  | 'pyramid'
  | 'quote'
  | 'scroll-interactive'
  | 'split-media'
  | 'stat-grid'
  | 'table'
  | 'tabs'
  | 'terminal-shell'
  | 'timeline';

export const CATEGORY_SLUGS = [
  'about-sections',
  'banner-sections',
  'breadcrumb-sections',
  'call-to-action-sections',
  'comparison-sections',
  'contact-sections',
  'content-listing-sections',
  'content-sections',
  'cta-sections',
  'faq-sections',
  'feature-sections',
  'gallery-sections',
  'hero-header-sections',
  'index-sections',
  'logo-sections',
  'manifesto-sections',
  'newsletter-sections',
  'pricing-sections',
  'process-sections',
  'stats-sections',
  'table-sections',
  'team-sections',
  'terminal-sections',
  'testimonial-sections',
  'timelines',
  'trust-proof',
  'trust-sections',
  'utility-sections',
] as const satisfies readonly CategorySlug[];

export const FAMILY_TAGS = [
  'accordion',
  'band',
  'bento',
  'breadcrumb',
  'card-grid',
  'duo',
  'eeat',
  'flow',
  'form-panel',
  'gallery',
  'hero',
  'list',
  'manifesto',
  'marquee',
  'masthead',
  'pain',
  'process-steps',
  'prose',
  'pyramid',
  'quote',
  'scroll-interactive',
  'split-media',
  'stat-grid',
  'table',
  'tabs',
  'terminal-shell',
  'timeline',
] as const satisfies readonly FamilyTag[];

/** Bloc de facettes porté par chaque SectionDescriptor (tous obligatoires). */
export interface SectionFacets {
  effects: EffectTag[];
  interactions: InteractionTag[];
  elements: ElementTag[];
  layoutFacets: LayoutTag[];
}

export type FacetKind = keyof SectionFacets;
