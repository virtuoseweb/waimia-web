// Waimia · section-presets.ts :touchpoint PRESET du système de variation (Phase B, docs/46).
//
// Un PRESET = une combinaison nommée et sélectionnable « variante (layout) × déclinaison
// (palette / densité) » appliquée à un composant-famille paramétrable. C'est le niveau 4
// de la taxonomie (Catégorie → Famille → Variante(type) → Déclinaison(preset), docs/45).
//
// Le STYLE est global (le composant .astro + les classes/CSS vars) ; le preset surcharge
// uniquement les props de présentation (background / layout / density) au-dessus de la demo
// par défaut (SECTION_DEMOS). 1 composant-famille → N presets = le volume des 1000+ blocks
// SANS dupliquer de types Zod.
//
// PREUVE (Phase B) : la famille HERO sert de référence. Une fois le pattern prouvé →
// vague de production (Phase D) catégorie par catégorie.

import type { SectionType, SectionData } from '../schemas/sections';

/** Sous-ensemble de présentation surchargeable par un preset (axes transverses docs/46). */
export type PresetProps = Partial<Pick<SectionData, never>> & {
  background?: 'paper' | 'paper-2' | 'paper-3' | 'ink';
  layout?: string;
  density?: 'compact' | 'base' | 'ample';
  /** Axe Variante : hero-conversion-funnel (split/sumie/minimal), eeat-panel (media/columns/light/hero). */
  variant?: 'split' | 'sumie' | 'minimal' | 'media' | 'columns' | 'light' | 'hero';
  /** Axe Variante « registre média » du hero split (lineart vs editorial). */
  media_register?: 'lineart' | 'editorial';
  /** Média associé au registre (surcharge la demo pour exposer le preset). */
  media_src?: string;
  media_alt_fr?: string;
  media_alt_en?: string;
  /** scroll-gallery : côté du cadre média sticky en desktop. */
  media_side?: 'left' | 'right';
  /** hover-reveal-list : image qui suit le curseur (cursor) ou cadre fixe (fixed). */
  reveal_mode?: 'cursor' | 'fixed';
  /** media-swap-band : rotation auto des médias ou changement au survol. */
  swap_mode?: 'auto' | 'hover';
  /** logo-marquee : cadence du défilement continu. */
  speed?: 'slow' | 'base';
  /** feature-zigzag : damier paper/ink (1 bloc sur 2 en contraste inverse). */
  alternate_blocks?: boolean;
  /** feature-split-media : inversion visuelle média/texte (ordre DOM préservé). */
  reversed?: boolean;
  /** feature-split-media : colonne média sticky. */
  media_sticky?: boolean;
  /** footer-cta-band : bande à coins arrondis. */
  rounded?: boolean;
  /** Axes de variation universels (Vague C pilote) — lus par data-* dans les composants câblés. */
  contentAlign?: 'start' | 'center' | 'end';
  actionsAlign?: 'start' | 'center' | 'end' | 'spread';
  /** deliverables-grid (FeatureGrid) : nombre de colonnes ('auto' = count-adaptive). */
  columns?: 'auto' | '2' | '3' | '4';
  /** feature-split-media : ratio des colonnes texte|média (préféré à layout). */
  proportion?: '1-1' | '1-2' | '2-1' | '2-3' | '3-2';
  /** feature-split-media : côté du média en desktop. */
  mediaSide?: 'left' | 'right';
  /** Couche atomique (Vague C) : placement par région, forme identique à placementSchema (Zod).
   *  Lu par data-* dans les composants câblés (FooterCtaBand, FeatureSplitMedia au pilote).
   *  Merge shallow dans la demo → fournir l'objet `placement` complet par preset. */
  placement?: {
    header?: AtomRegionPlacement;
    media?: AtomRegionPlacement;
    body?: AtomRegionPlacement;
    actions?: AtomRegionPlacement;
    aside?: AtomRegionPlacement;
  };
};

/** Sous-ensemble d'atomes placeables par région (miroir de regionPlacement, schemas/sections.ts). */
type AtomRegionPlacement = {
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
  order?: number;
  hideOn?: 'none' | 'mobile' | 'desktop';
};

export type Preset = {
  /** id unique kebab-case (stable, sert de slug d'URL /preview/[type]/[preset]). */
  id: string;
  /** famille-type ciblée (doit exister dans le registry / SectionType). */
  type: SectionType;
  /** libellé lisible FR (catalogue / DS Studio). */
  label: string;
  /** regroupement intra-catégorie (niveau 2 taxonomie). */
  family?: string;
  /** époque/style 2010-2026 (filtrage futur). */
  era?: string;
  /** surcharges de présentation appliquées par-dessus la demo par défaut du type. */
  props: PresetProps;
};

// Ids des presets de grille connus (miroir de src/styles/layouts.css → check-presets.mjs).
export const KNOWN_LAYOUTS = [
  'split-3-1',
  'split-1-3',
  'even-2',
  'even-3',
  'even-4',
  'center-1-2-1',
  'editorial-6-1-1',
] as const;

export const KNOWN_DENSITIES = ['compact', 'base', 'ample'] as const;

/**
 * SECTION_PRESETS :catalogue des presets par type de section.
 * Phase B : famille HERO seulement (référence). Le reste viendra par vagues (Phase D).
 */
export const SECTION_PRESETS: Partial<Record<SectionType, Preset[]>> = {
  'hero-split': [
    {
      id: 'hero-split--showcase-3-1-paper',
      type: 'hero-split',
      label: 'Hero split · showcase · colonne large · papier',
      family: 'hero',
      era: '2018',
      props: { layout: 'split-3-1', background: 'paper' },
    },
    {
      id: 'hero-split--editorial-1-3-paper-2',
      type: 'hero-split',
      label: 'Hero split · éditorial · média dominant · papier 2',
      family: 'hero',
      era: '2020',
      props: { layout: 'split-1-3', background: 'paper-2' },
    },
    {
      id: 'hero-split--balanced-even-2-ink',
      type: 'hero-split',
      label: 'Hero split · équilibré · deux colonnes · encre',
      family: 'hero',
      era: '2022',
      props: { layout: 'even-2', background: 'ink' },
    },
    {
      id: 'hero-split--showcase-3-1-ink-ample',
      type: 'hero-split',
      label: 'Hero split · showcase · encre · ample',
      family: 'hero',
      era: '2024',
      props: { layout: 'split-3-1', background: 'ink', density: 'ample' },
    },
    {
      id: 'hero-split--compact-even-2-paper-3',
      type: 'hero-split',
      label: 'Hero split · compact · deux colonnes · papier 3',
      family: 'hero',
      era: '2016',
      props: { layout: 'even-2', background: 'paper-3', density: 'compact' },
    },
  ],
  'hero-conversion-funnel': [
    {
      id: 'hero-conversion-funnel--split-lineart-paper',
      type: 'hero-conversion-funnel',
      label: 'Hero entonnoir · split · registre line-art · papier',
      family: 'hero',
      era: '2024',
      props: {
        variant: 'split',
        media_register: 'lineart',
        media_src: '/images/line-art/dispositif-flow.svg',
        background: 'paper',
      },
    },
    {
      id: 'hero-conversion-funnel--split-editorial-paper-2',
      type: 'hero-conversion-funnel',
      label: 'Hero entonnoir · split · registre éditorial · papier 2',
      family: 'hero',
      era: '2026',
      props: {
        variant: 'split',
        media_register: 'editorial',
        media_src: '/images/illustrations/ds/gentleman-craftsman-go-work-paper.webp',
        media_alt_fr: 'Illustration éditoriale : artisan au travail',
        media_alt_en: 'Editorial illustration: craftsman at work',
        background: 'paper-2',
      },
    },
  ],
  'hero-centered': [
    {
      id: 'hero-centered--manifesto-paper',
      type: 'hero-centered',
      label: 'Hero centré · manifeste · papier',
      family: 'hero',
      era: '2014',
      props: { background: 'paper' },
    },
    {
      id: 'hero-centered--editorial-1-2-1-paper-2-ample',
      type: 'hero-centered',
      label: 'Hero centré · éditorial encadré · papier 2 · ample',
      family: 'hero',
      era: '2021',
      props: { layout: 'center-1-2-1', background: 'paper-2', density: 'ample' },
    },
    {
      id: 'hero-centered--split-even-2-ink',
      type: 'hero-centered',
      label: 'Hero centré · bascule deux colonnes · encre',
      family: 'hero',
      era: '2023',
      props: { layout: 'even-2', background: 'ink' },
    },
    {
      id: 'hero-centered--compact-paper-3',
      type: 'hero-centered',
      label: 'Hero centré · compact · papier 3',
      family: 'hero',
      era: '2019',
      props: { background: 'paper-3', density: 'compact' },
    },
  ],

  // ─────────────────────────────────────────────────────────────────────────
  // Vague C / P1 :Déclinaisons des 25 types services + 7 familles media-first.
  // L'axe sûr universel est `background` (consommé par data-bg sur chaque type).
  // Les axes typés (layout/variant/media_side/swap_mode/reveal_mode/speed +
  // toggles alternate_blocks/reversed/media_sticky/rounded) ne sont surchargés
  // QUE quand le composant les lit réellement (vérifié schéma + .astro).
  // ─────────────────────────────────────────────────────────────────────────

  // ── 25 types services ─────────────────────────────────────────────────────

  // hero-masthead-card (famille hero) :mixin seul : axe sûr = background.
  'hero-masthead-card': [
    { id: 'hero-masthead-card--paper', type: 'hero-masthead-card', label: 'Masthead carte · papier', family: 'hero', era: '2022', props: { background: 'paper' } },
    { id: 'hero-masthead-card--paper-2', type: 'hero-masthead-card', label: 'Masthead carte · papier 2', family: 'hero', era: '2023', props: { background: 'paper-2' } },
    { id: 'hero-masthead-card--paper-3', type: 'hero-masthead-card', label: 'Masthead carte · papier 3', family: 'hero', era: '2024', props: { background: 'paper-3' } },
    { id: 'hero-masthead-card--ink', type: 'hero-masthead-card', label: 'Masthead carte · encre', family: 'hero', era: '2026', props: { background: 'ink' } },
  ],

  // statement-orbit (famille manifesto) :carte ink interne ; axe sûr = background.
  'statement-orbit': [
    { id: 'statement-orbit--paper', type: 'statement-orbit', label: 'Statement orbite · papier', family: 'manifesto', era: '2021', props: { background: 'paper' } },
    { id: 'statement-orbit--paper-2', type: 'statement-orbit', label: 'Statement orbite · papier 2', family: 'manifesto', era: '2023', props: { background: 'paper-2' } },
    { id: 'statement-orbit--paper-3', type: 'statement-orbit', label: 'Statement orbite · papier 3', family: 'manifesto', era: '2024', props: { background: 'paper-3' } },
    { id: 'statement-orbit--ink', type: 'statement-orbit', label: 'Statement orbite · encre', family: 'manifesto', era: '2026', props: { background: 'ink' } },
  ],

  // definition-extract (famille prose) :bloc GEO extractible ; axe sûr = background.
  'definition-extract': [
    { id: 'definition-extract--paper', type: 'definition-extract', label: 'Définition extractible · papier', family: 'prose', era: '2024', props: { background: 'paper' } },
    { id: 'definition-extract--paper-2', type: 'definition-extract', label: 'Définition extractible · papier 2', family: 'prose', era: '2025', props: { background: 'paper-2' } },
    { id: 'definition-extract--paper-3', type: 'definition-extract', label: 'Définition extractible · papier 3', family: 'prose', era: '2025', props: { background: 'paper-3' } },
    { id: 'definition-extract--ink', type: 'definition-extract', label: 'Définition extractible · encre', family: 'prose', era: '2026', props: { background: 'ink' } },
  ],

  // pain-severity-list (famille pain) :liste sévérité ; axe sûr = background.
  'pain-severity-list': [
    { id: 'pain-severity-list--paper', type: 'pain-severity-list', label: 'Liste sévérité · papier', family: 'pain', era: '2023', props: { background: 'paper' } },
    { id: 'pain-severity-list--paper-2', type: 'pain-severity-list', label: 'Liste sévérité · papier 2', family: 'pain', era: '2024', props: { background: 'paper-2' } },
    { id: 'pain-severity-list--paper-3', type: 'pain-severity-list', label: 'Liste sévérité · papier 3', family: 'pain', era: '2025', props: { background: 'paper-3' } },
    { id: 'pain-severity-list--ink', type: 'pain-severity-list', label: 'Liste sévérité · encre', family: 'pain', era: '2026', props: { background: 'ink' } },
  ],

  // versus-competitors (famille table) :comparatif ; axe sûr = background.
  'versus-competitors': [
    { id: 'versus-competitors--paper', type: 'versus-competitors', label: 'Versus concurrents · papier', family: 'table', era: '2022', props: { background: 'paper' } },
    { id: 'versus-competitors--paper-2', type: 'versus-competitors', label: 'Versus concurrents · papier 2', family: 'table', era: '2023', props: { background: 'paper-2' } },
    { id: 'versus-competitors--paper-3', type: 'versus-competitors', label: 'Versus concurrents · papier 3', family: 'table', era: '2024', props: { background: 'paper-3' } },
    { id: 'versus-competitors--ink', type: 'versus-competitors', label: 'Versus concurrents · encre', family: 'table', era: '2026', props: { background: 'ink' } },
  ],

  // deliverables-grid (famille card-grid, composant FeatureGrid) : axes câblés (Vague C pilote) =
  // background + columns (auto|2|3|4) + density (compact|base|ample) + contentAlign.
  'deliverables-grid': [
    { id: 'deliverables-grid--auto-paper', type: 'deliverables-grid', label: 'Livrables · grille adaptative · papier', family: 'card-grid', era: '2022', props: { background: 'paper', columns: 'auto' } },
    { id: 'deliverables-grid--3col-paper', type: 'deliverables-grid', label: 'Livrables · 3 colonnes · papier', family: 'card-grid', era: '2022', props: { background: 'paper', columns: '3' } },
    { id: 'deliverables-grid--4col-paper-2', type: 'deliverables-grid', label: 'Livrables · 4 colonnes · papier 2', family: 'card-grid', era: '2023', props: { background: 'paper-2', columns: '4' } },
    { id: 'deliverables-grid--2col-ample-paper-3', type: 'deliverables-grid', label: 'Livrables · 2 colonnes · ample · papier 3', family: 'card-grid', era: '2024', props: { background: 'paper-3', columns: '2', density: 'ample' } },
    { id: 'deliverables-grid--3col-centered-paper', type: 'deliverables-grid', label: 'Livrables · 3 colonnes · titre centré · papier', family: 'card-grid', era: '2024', props: { background: 'paper', columns: '3', contentAlign: 'center' } },
    { id: 'deliverables-grid--3col-compact-paper-2', type: 'deliverables-grid', label: 'Livrables · 3 colonnes · compact · papier 2', family: 'card-grid', era: '2023', props: { background: 'paper-2', columns: '3', density: 'compact' } },
    { id: 'deliverables-grid--4col-ink', type: 'deliverables-grid', label: 'Livrables · 4 colonnes · encre', family: 'card-grid', era: '2026', props: { background: 'ink', columns: '4' } },
    { id: 'deliverables-grid--2col-centered-ink-ample', type: 'deliverables-grid', label: 'Livrables · 2 colonnes · centré · encre · ample', family: 'card-grid', era: '2026', props: { background: 'ink', columns: '2', contentAlign: 'center', density: 'ample' } },
  ],

  // feature-zigzag (famille split-media) :background + toggle alternate_blocks (damier paper/ink lu par le composant).
  'feature-zigzag': [
    { id: 'feature-zigzag--paper', type: 'feature-zigzag', label: 'Zigzag features · papier', family: 'split-media', era: '2020', props: { background: 'paper' } },
    { id: 'feature-zigzag--paper-2', type: 'feature-zigzag', label: 'Zigzag features · papier 2', family: 'split-media', era: '2022', props: { background: 'paper-2' } },
    { id: 'feature-zigzag--ink', type: 'feature-zigzag', label: 'Zigzag features · encre', family: 'split-media', era: '2026', props: { background: 'ink' } },
    { id: 'feature-zigzag--paper-damier', type: 'feature-zigzag', label: 'Zigzag features · papier · damier paper/encre', family: 'split-media', era: '2025', props: { background: 'paper', alternate_blocks: true } },
    { id: 'feature-zigzag--paper-2-damier', type: 'feature-zigzag', label: 'Zigzag features · papier 2 · damier paper/encre', family: 'split-media', era: '2025', props: { background: 'paper-2', alternate_blocks: true } },
  ],

  // bento-grid (famille bento) :span par cellule (contenu) ; axes câblés (Vague C) =
  // background + density + columns (auto|2|3|4, bento adaptatif clampé).
  'bento-grid': [
    { id: 'bento-grid--paper', type: 'bento-grid', label: 'Bento · papier', family: 'bento', era: '2022', props: { background: 'paper' } },
    { id: 'bento-grid--paper-2', type: 'bento-grid', label: 'Bento · papier 2', family: 'bento', era: '2023', props: { background: 'paper-2' } },
    { id: 'bento-grid--paper-3', type: 'bento-grid', label: 'Bento · papier 3', family: 'bento', era: '2024', props: { background: 'paper-3' } },
    { id: 'bento-grid--ink', type: 'bento-grid', label: 'Bento · encre', family: 'bento', era: '2026', props: { background: 'ink' } },
    { id: 'bento-grid--auto-fluide', type: 'bento-grid', label: 'Bento · grille fluide adaptative', family: 'bento', era: '2025', props: { background: 'paper', columns: 'auto' } },
    { id: 'bento-grid--3col-compact', type: 'bento-grid', label: 'Bento · 3 colonnes · dense', family: 'bento', era: '2025', props: { background: 'paper-2', columns: '3', density: 'compact' } },
    { id: 'bento-grid--4col-ample', type: 'bento-grid', label: 'Bento · 4 colonnes · aéré', family: 'bento', era: '2026', props: { background: 'paper', columns: '4', density: 'ample' } },
    { id: 'bento-grid--2col-ink', type: 'bento-grid', label: 'Bento · 2 colonnes · encre', family: 'bento', era: '2026', props: { background: 'ink', columns: '2' } },
    { id: 'bento-grid--ink-ample', type: 'bento-grid', label: 'Bento · encre · aéré', family: 'bento', era: '2026', props: { background: 'ink', density: 'ample' } },
    { id: 'bento-grid--paper-compact', type: 'bento-grid', label: 'Bento · papier · dense', family: 'bento', era: '2024', props: { background: 'paper', density: 'compact' } },
  ],

  // method-timeline (famille timeline) :axe sûr = background.
  'method-timeline': [
    { id: 'method-timeline--paper', type: 'method-timeline', label: 'Méthode · frise · papier', family: 'timeline', era: '2020', props: { background: 'paper' } },
    { id: 'method-timeline--paper-2', type: 'method-timeline', label: 'Méthode · frise · papier 2', family: 'timeline', era: '2022', props: { background: 'paper-2' } },
    { id: 'method-timeline--paper-3', type: 'method-timeline', label: 'Méthode · frise · papier 3', family: 'timeline', era: '2023', props: { background: 'paper-3' } },
    { id: 'method-timeline--ink', type: 'method-timeline', label: 'Méthode · frise · encre', family: 'timeline', era: '2026', props: { background: 'ink' } },
  ],

  // stats-bento (famille bento) :vedette content-driven ; axes câblés (Vague C) =
  // background + density + columns (auto|2|3|4, span-lg clampé en 2 colonnes).
  'stats-bento': [
    { id: 'stats-bento--paper', type: 'stats-bento', label: 'Stats bento · papier', family: 'bento', era: '2022', props: { background: 'paper' } },
    { id: 'stats-bento--paper-2', type: 'stats-bento', label: 'Stats bento · papier 2', family: 'bento', era: '2023', props: { background: 'paper-2' } },
    { id: 'stats-bento--paper-3', type: 'stats-bento', label: 'Stats bento · papier 3', family: 'bento', era: '2024', props: { background: 'paper-3' } },
    { id: 'stats-bento--ink', type: 'stats-bento', label: 'Stats bento · encre', family: 'bento', era: '2026', props: { background: 'ink' } },
    { id: 'stats-bento--auto-fluide', type: 'stats-bento', label: 'Stats bento · grille fluide adaptative', family: 'bento', era: '2025', props: { background: 'paper', columns: 'auto' } },
    { id: 'stats-bento--3col-compact', type: 'stats-bento', label: 'Stats bento · 3 colonnes · dense', family: 'bento', era: '2025', props: { background: 'paper-2', columns: '3', density: 'compact' } },
    { id: 'stats-bento--4col', type: 'stats-bento', label: 'Stats bento · 4 colonnes', family: 'bento', era: '2026', props: { background: 'paper', columns: '4' } },
    { id: 'stats-bento--2col-ample', type: 'stats-bento', label: 'Stats bento · 2 colonnes · aéré', family: 'bento', era: '2026', props: { background: 'paper-3', columns: '2', density: 'ample' } },
    { id: 'stats-bento--ink-compact', type: 'stats-bento', label: 'Stats bento · encre · dense', family: 'bento', era: '2026', props: { background: 'ink', density: 'compact' } },
    { id: 'stats-bento--ink-ample', type: 'stats-bento', label: 'Stats bento · encre · aéré', family: 'bento', era: '2026', props: { background: 'ink', density: 'ample' } },
  ],

  // logo-marquee (famille marquee) :background + speed (slow|base) lu par data-speed.
  'logo-marquee': [
    { id: 'logo-marquee--paper-base', type: 'logo-marquee', label: 'Logos défilants · papier · cadence normale', family: 'marquee', era: '2021', props: { background: 'paper', speed: 'base' } },
    { id: 'logo-marquee--paper-slow', type: 'logo-marquee', label: 'Logos défilants · papier · cadence lente', family: 'marquee', era: '2022', props: { background: 'paper', speed: 'slow' } },
    { id: 'logo-marquee--paper-2-slow', type: 'logo-marquee', label: 'Logos défilants · papier 2 · cadence lente', family: 'marquee', era: '2023', props: { background: 'paper-2', speed: 'slow' } },
    { id: 'logo-marquee--ink-base', type: 'logo-marquee', label: 'Logos défilants · encre · cadence normale', family: 'marquee', era: '2026', props: { background: 'ink', speed: 'base' } },
  ],

  // pricing-cards (famille card-grid) :featured par tier (contenu) ; axes câblés (Vague C) =
  // background + density + contentAlign + columns (auto|2|3|4).
  'pricing-cards': [
    { id: 'pricing-cards--paper', type: 'pricing-cards', label: 'Tarifs · cartes · papier', family: 'card-grid', era: '2021', props: { background: 'paper' } },
    { id: 'pricing-cards--paper-2', type: 'pricing-cards', label: 'Tarifs · cartes · papier 2', family: 'card-grid', era: '2023', props: { background: 'paper-2' } },
    { id: 'pricing-cards--paper-3', type: 'pricing-cards', label: 'Tarifs · cartes · papier 3', family: 'card-grid', era: '2024', props: { background: 'paper-3' } },
    { id: 'pricing-cards--ink', type: 'pricing-cards', label: 'Tarifs · cartes · encre', family: 'card-grid', era: '2026', props: { background: 'ink' } },
    { id: 'pricing-cards--auto-centre', type: 'pricing-cards', label: 'Tarifs · grille fluide · titre centré', family: 'card-grid', era: '2025', props: { background: 'paper', columns: 'auto', contentAlign: 'center' } },
    { id: 'pricing-cards--4col', type: 'pricing-cards', label: 'Tarifs · 4 colonnes', family: 'card-grid', era: '2026', props: { background: 'paper', columns: '4' } },
    { id: 'pricing-cards--3col-ample', type: 'pricing-cards', label: 'Tarifs · 3 colonnes · aéré', family: 'card-grid', era: '2025', props: { background: 'paper-2', columns: '3', density: 'ample' } },
    { id: 'pricing-cards--2col-centre', type: 'pricing-cards', label: 'Tarifs · 2 colonnes · titre centré', family: 'card-grid', era: '2024', props: { background: 'paper', columns: '2', contentAlign: 'center' } },
    { id: 'pricing-cards--ink-centre', type: 'pricing-cards', label: 'Tarifs · encre · titre centré', family: 'card-grid', era: '2026', props: { background: 'ink', contentAlign: 'center', columns: 'auto' } },
    { id: 'pricing-cards--compact', type: 'pricing-cards', label: 'Tarifs · cartes · dense', family: 'card-grid', era: '2024', props: { background: 'paper', density: 'compact', columns: 'auto' } },
  ],

  // case-card-grid (famille card-grid) :table éditoriale en lignes (pas de colonnes) ;
  // axes câblés (Vague C) = background + density + contentAlign (header).
  'case-card-grid': [
    { id: 'case-card-grid--paper', type: 'case-card-grid', label: 'Cas clients · grille · papier', family: 'card-grid', era: '2022', props: { background: 'paper' } },
    { id: 'case-card-grid--paper-2', type: 'case-card-grid', label: 'Cas clients · grille · papier 2', family: 'card-grid', era: '2023', props: { background: 'paper-2' } },
    { id: 'case-card-grid--paper-3', type: 'case-card-grid', label: 'Cas clients · grille · papier 3', family: 'card-grid', era: '2024', props: { background: 'paper-3' } },
    { id: 'case-card-grid--ink', type: 'case-card-grid', label: 'Cas clients · grille · encre', family: 'card-grid', era: '2026', props: { background: 'ink' } },
    { id: 'case-card-grid--compact', type: 'case-card-grid', label: 'Cas clients · table dense', family: 'card-grid', era: '2024', props: { background: 'paper', density: 'compact' } },
    { id: 'case-card-grid--ample', type: 'case-card-grid', label: 'Cas clients · table aérée', family: 'card-grid', era: '2025', props: { background: 'paper', density: 'ample' } },
    { id: 'case-card-grid--centre', type: 'case-card-grid', label: 'Cas clients · en-tête centré', family: 'card-grid', era: '2025', props: { background: 'paper-2', contentAlign: 'center' } },
    { id: 'case-card-grid--ink-ample', type: 'case-card-grid', label: 'Cas clients · encre · aérée', family: 'card-grid', era: '2026', props: { background: 'ink', density: 'ample' } },
    { id: 'case-card-grid--ink-centre', type: 'case-card-grid', label: 'Cas clients · encre · en-tête centré', family: 'card-grid', era: '2026', props: { background: 'ink', contentAlign: 'center' } },
    { id: 'case-card-grid--paper-2-compact', type: 'case-card-grid', label: 'Cas clients · papier 2 · dense', family: 'card-grid', era: '2023', props: { background: 'paper-2', density: 'compact' } },
  ],

  // eeat-panel (famille eeat) :variant (media|columns|light|hero) + background (ink|paper SEULEMENT).
  'eeat-panel': [
    { id: 'eeat-panel--media-ink', type: 'eeat-panel', label: 'E-E-A-T · média · encre', family: 'eeat', era: '2025', props: { variant: 'media', background: 'ink' } },
    { id: 'eeat-panel--columns-ink', type: 'eeat-panel', label: 'E-E-A-T · colonnes · encre', family: 'eeat', era: '2025', props: { variant: 'columns', background: 'ink' } },
    { id: 'eeat-panel--light-paper', type: 'eeat-panel', label: 'E-E-A-T · claire · papier', family: 'eeat', era: '2026', props: { variant: 'light', background: 'paper' } },
    { id: 'eeat-panel--hero-ink', type: 'eeat-panel', label: 'E-E-A-T · vedette · encre', family: 'eeat', era: '2026', props: { variant: 'hero', background: 'ink' } },
  ],

  // faq-two-column (famille accordion) :FAQ statique 2 colonnes ; axe sûr = background.
  'faq-two-column': [
    { id: 'faq-two-column--paper', type: 'faq-two-column', label: 'FAQ deux colonnes · papier', family: 'accordion', era: '2021', props: { background: 'paper' } },
    { id: 'faq-two-column--paper-2', type: 'faq-two-column', label: 'FAQ deux colonnes · papier 2', family: 'accordion', era: '2023', props: { background: 'paper-2' } },
    { id: 'faq-two-column--paper-3', type: 'faq-two-column', label: 'FAQ deux colonnes · papier 3', family: 'accordion', era: '2024', props: { background: 'paper-3' } },
    { id: 'faq-two-column--ink', type: 'faq-two-column', label: 'FAQ deux colonnes · encre', family: 'accordion', era: '2026', props: { background: 'ink' } },
  ],

  // footer-cta-band (famille band) : axes câblés (Vague C pilote) = background (défaut ink) +
  // layout (inline|stacked) + contentAlign + actionsAlign (INDÉPENDANTE) + density + toggle rounded.
  'footer-cta-band': [
    { id: 'footer-cta-band--ink', type: 'footer-cta-band', label: 'Bande CTA finale · encre', family: 'band', era: '2022', props: { background: 'ink' } },
    { id: 'footer-cta-band--ink-rounded', type: 'footer-cta-band', label: 'Bande CTA finale · encre · arrondie', family: 'band', era: '2024', props: { background: 'ink', rounded: true } },
    { id: 'footer-cta-band--ink-actions-center', type: 'footer-cta-band', label: 'Bande CTA finale · encre · bouton au centre', family: 'band', era: '2025', props: { background: 'ink', actionsAlign: 'center' } },
    { id: 'footer-cta-band--ink-actions-spread', type: 'footer-cta-band', label: 'Bande CTA finale · encre · boutons écartés', family: 'band', era: '2025', props: { background: 'ink', actionsAlign: 'spread' } },
    { id: 'footer-cta-band--ink-stacked-centered', type: 'footer-cta-band', label: 'Bande CTA finale · encre · empilée · tout centré', family: 'band', era: '2026', props: { background: 'ink', layout: 'stacked', contentAlign: 'center', actionsAlign: 'center' } },
    { id: 'footer-cta-band--paper', type: 'footer-cta-band', label: 'Bande CTA finale · papier', family: 'band', era: '2023', props: { background: 'paper' } },
    { id: 'footer-cta-band--paper-2-rounded', type: 'footer-cta-band', label: 'Bande CTA finale · papier 2 · arrondie', family: 'band', era: '2025', props: { background: 'paper-2', rounded: true } },
    { id: 'footer-cta-band--paper-stacked-compact', type: 'footer-cta-band', label: 'Bande CTA finale · papier · empilée · compact', family: 'band', era: '2024', props: { background: 'paper', layout: 'stacked', density: 'compact' } },
    { id: 'footer-cta-band--paper-3-actions-end-ample', type: 'footer-cta-band', label: 'Bande CTA finale · papier 3 · boutons à droite · ample', family: 'band', era: '2026', props: { background: 'paper-3', actionsAlign: 'end', density: 'ample' } },
    // ── Couche ATOMIQUE (Vague C pilote) · placement par région. Régions câblées : header + actions.
    // Preuve d'INDÉPENDANCE : header à gauche (start) MAIS bouton centré (center) sans décaler le titre.
    { id: 'footer-cta-band--atomic-cta-centre', type: 'footer-cta-band', label: 'Bande CTA finale · atomique · titre à gauche · bouton au centre', family: 'band', era: '2026', props: { background: 'ink', placement: { header: { align: 'start' }, actions: { justify: 'center' } } } },
    // Header centré, actions à droite : deux régions alignées différemment, indépendamment.
    { id: 'footer-cta-band--atomic-header-centre-actions-end', type: 'footer-cta-band', label: 'Bande CTA finale · atomique · titre centré · boutons à droite', family: 'band', era: '2026', props: { background: 'paper-2', placement: { header: { align: 'center' }, actions: { justify: 'end' } } } },
    // Actions écartées (between) sans toucher l'alignement du titre.
    { id: 'footer-cta-band--atomic-spread', type: 'footer-cta-band', label: 'Bande CTA finale · atomique · boutons écartés (between)', family: 'band', era: '2026', props: { background: 'ink', placement: { actions: { justify: 'between' } } } },
    // Ordre : bloc CTA AU-DESSUS du titre (actions order 0, header order 1) en desktop.
    { id: 'footer-cta-band--atomic-cta-first', type: 'footer-cta-band', label: 'Bande CTA finale · atomique · CTA avant le titre', family: 'band', era: '2026', props: { background: 'paper', layout: 'stacked', placement: { header: { order: 1 }, actions: { order: 0, justify: 'start' } } } },
  ],

  // feature-split-media (famille split-media) : axes câblés (Vague C pilote) = background +
  // proportion (1-1|1-2|2-1|2-3|3-2) + mediaSide (left|right) + contentAlign + actionsAlign +
  // density, plus les toggles existants reversed/media_sticky. proportion remplace layout.
  'feature-split-media': [
    { id: 'feature-split-media--1-1-paper', type: 'feature-split-media', label: 'Feature split média · symétrique · papier', family: 'split-media', era: '2021', props: { background: 'paper', proportion: '1-1' } },
    { id: 'feature-split-media--1-2-paper', type: 'feature-split-media', label: 'Feature split média · texte étroit · média large · papier', family: 'split-media', era: '2023', props: { background: 'paper', proportion: '1-2' } },
    { id: 'feature-split-media--2-1-media-left-paper', type: 'feature-split-media', label: 'Feature split média · média à gauche · texte large · papier', family: 'split-media', era: '2024', props: { background: 'paper', proportion: '2-1', mediaSide: 'left' } },
    { id: 'feature-split-media--3-2-paper-2', type: 'feature-split-media', label: 'Feature split média · texte dominant · papier 2', family: 'split-media', era: '2024', props: { background: 'paper-2', proportion: '3-2' } },
    { id: 'feature-split-media--2-3-media-left-paper-3', type: 'feature-split-media', label: 'Feature split média · média dominant à gauche · papier 3', family: 'split-media', era: '2025', props: { background: 'paper-3', proportion: '2-3', mediaSide: 'left' } },
    { id: 'feature-split-media--1-2-sticky-paper-2', type: 'feature-split-media', label: 'Feature split média · média large collant · papier 2', family: 'split-media', era: '2025', props: { background: 'paper-2', proportion: '1-2', media_sticky: true } },
    { id: 'feature-split-media--1-1-centered-ink', type: 'feature-split-media', label: 'Feature split média · symétrique · texte centré · encre', family: 'split-media', era: '2026', props: { background: 'ink', proportion: '1-1', contentAlign: 'center', actionsAlign: 'center' } },
    { id: 'feature-split-media--2-1-ample-ink', type: 'feature-split-media', label: 'Feature split média · texte large · ample · encre', family: 'split-media', era: '2026', props: { background: 'ink', proportion: '2-1', density: 'ample' } },
    // ── Couche ATOMIQUE (Vague C pilote) · placement par région. Régions câblées : header + media + actions + body.
    // Média en premier (order 0) : prime sur mediaSide, média avant le texte en desktop.
    { id: 'feature-split-media--atomic-media-first', type: 'feature-split-media', label: 'Feature split média · atomique · média avant le texte', family: 'split-media', era: '2026', props: { background: 'paper', proportion: '1-1', placement: { media: { order: 0 } } } },
    // INDÉPENDANCE : titre/lede à gauche (start) MAIS CTA centré (center) sous le texte.
    { id: 'feature-split-media--atomic-cta-centre', type: 'feature-split-media', label: 'Feature split média · atomique · texte à gauche · CTA au centre', family: 'split-media', era: '2026', props: { background: 'paper-2', proportion: '1-2', placement: { header: { align: 'start' }, actions: { justify: 'center' } } } },
    // Header centré + CTA à droite + média en second : trois régions, trois placements distincts.
    { id: 'feature-split-media--atomic-header-centre', type: 'feature-split-media', label: 'Feature split média · atomique · titre centré · CTA à droite', family: 'split-media', era: '2026', props: { background: 'ink', proportion: '1-1', placement: { header: { align: 'center' }, actions: { justify: 'end' }, media: { order: 1 } } } },
    // Body aligné à droite (end) indépendamment du header (qui reste à gauche par défaut).
    { id: 'feature-split-media--atomic-body-end', type: 'feature-split-media', label: 'Feature split média · atomique · corps de texte aligné à droite', family: 'split-media', era: '2026', props: { background: 'paper-3', proportion: '2-1', placement: { body: { align: 'end' } } } },
  ],

  // diagnostic-stages (famille process-steps) :stades horizontaux ; axe sûr = background.
  'diagnostic-stages': [
    { id: 'diagnostic-stages--paper', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades · papier', family: 'process-steps', era: '2023', props: { background: 'paper' } },
    { id: 'diagnostic-stages--paper-2', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades · papier 2', family: 'process-steps', era: '2024', props: { background: 'paper-2' } },
    { id: 'diagnostic-stages--paper-3', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades · papier 3', family: 'process-steps', era: '2025', props: { background: 'paper-3' } },
    { id: 'diagnostic-stages--ink', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades · encre', family: 'process-steps', era: '2026', props: { background: 'ink' } },
  ],

  // workflow-table (famille table) :table signature 5 colonnes ; axe sûr = background.
  'workflow-table': [
    { id: 'workflow-table--paper', type: 'workflow-table', label: 'Table workflows · papier', family: 'table', era: '2023', props: { background: 'paper' } },
    { id: 'workflow-table--paper-2', type: 'workflow-table', label: 'Table workflows · papier 2', family: 'table', era: '2024', props: { background: 'paper-2' } },
    { id: 'workflow-table--paper-3', type: 'workflow-table', label: 'Table workflows · papier 3', family: 'table', era: '2025', props: { background: 'paper-3' } },
    { id: 'workflow-table--ink', type: 'workflow-table', label: 'Table workflows · encre', family: 'table', era: '2026', props: { background: 'ink' } },
  ],

  // department-stack (famille table, composant EditorialTableBlock) :axe sûr = background.
  'department-stack': [
    { id: 'department-stack--paper', type: 'department-stack', label: 'Stack outils · table · papier', family: 'table', era: '2023', props: { background: 'paper' } },
    { id: 'department-stack--paper-2', type: 'department-stack', label: 'Stack outils · table · papier 2', family: 'table', era: '2024', props: { background: 'paper-2' } },
    { id: 'department-stack--paper-3', type: 'department-stack', label: 'Stack outils · table · papier 3', family: 'table', era: '2025', props: { background: 'paper-3' } },
    { id: 'department-stack--ink', type: 'department-stack', label: 'Stack outils · table · encre', family: 'table', era: '2026', props: { background: 'ink' } },
  ],

  // comparison-duo (famille duo) :deux cartes Sans/Avec ; axe sûr = background.
  'comparison-duo': [
    { id: 'comparison-duo--paper', type: 'comparison-duo', label: 'Comparatif duo · papier', family: 'duo', era: '2022', props: { background: 'paper' } },
    { id: 'comparison-duo--paper-2', type: 'comparison-duo', label: 'Comparatif duo · papier 2', family: 'duo', era: '2023', props: { background: 'paper-2' } },
    { id: 'comparison-duo--paper-3', type: 'comparison-duo', label: 'Comparatif duo · papier 3', family: 'duo', era: '2024', props: { background: 'paper-3' } },
    { id: 'comparison-duo--ink', type: 'comparison-duo', label: 'Comparatif duo · encre', family: 'duo', era: '2026', props: { background: 'ink' } },
  ],

  // architecture-diagram (famille split-media) :figure signature ; axe sûr = background.
  'architecture-diagram': [
    { id: 'architecture-diagram--paper', type: 'architecture-diagram', label: 'Diagramme archi · papier', family: 'split-media', era: '2022', props: { background: 'paper' } },
    { id: 'architecture-diagram--paper-2', type: 'architecture-diagram', label: 'Diagramme archi · papier 2', family: 'split-media', era: '2023', props: { background: 'paper-2' } },
    { id: 'architecture-diagram--paper-3', type: 'architecture-diagram', label: 'Diagramme archi · papier 3', family: 'split-media', era: '2024', props: { background: 'paper-3' } },
    { id: 'architecture-diagram--ink', type: 'architecture-diagram', label: 'Diagramme archi · encre', family: 'split-media', era: '2026', props: { background: 'ink' } },
  ],

  // method-stepline (famille timeline) :étapes en ligne ; axe sûr = background.
  'method-stepline': [
    { id: 'method-stepline--paper', type: 'method-stepline', label: 'Méthode · ligne d étapes · papier', family: 'timeline', era: '2023', props: { background: 'paper' } },
    { id: 'method-stepline--paper-2', type: 'method-stepline', label: 'Méthode · ligne d étapes · papier 2', family: 'timeline', era: '2024', props: { background: 'paper-2' } },
    { id: 'method-stepline--paper-3', type: 'method-stepline', label: 'Méthode · ligne d étapes · papier 3', family: 'timeline', era: '2025', props: { background: 'paper-3' } },
    { id: 'method-stepline--ink', type: 'method-stepline', label: 'Méthode · ligne d étapes · encre', family: 'timeline', era: '2026', props: { background: 'ink' } },
  ],

  // system-flow (famille flow) :cartes d étapes + boucle ; axe sûr = background.
  'system-flow': [
    { id: 'system-flow--paper', type: 'system-flow', label: 'Flux système · papier', family: 'flow', era: '2023', props: { background: 'paper' } },
    { id: 'system-flow--paper-2', type: 'system-flow', label: 'Flux système · papier 2', family: 'flow', era: '2024', props: { background: 'paper-2' } },
    { id: 'system-flow--paper-3', type: 'system-flow', label: 'Flux système · papier 3', family: 'flow', era: '2025', props: { background: 'paper-3' } },
    { id: 'system-flow--ink', type: 'system-flow', label: 'Flux système · encre', family: 'flow', era: '2026', props: { background: 'ink' } },
  ],

  // ── 7 familles media-first ─────────────────────────────────────────────────

  // scroll-gallery :background + media_side (left|right) lu par le composant.
  'scroll-gallery': [
    { id: 'scroll-gallery--paper-right', type: 'scroll-gallery', label: 'Galerie scroll · papier · média à droite', family: 'scroll-interactive', era: '2024', props: { background: 'paper', media_side: 'right' } },
    { id: 'scroll-gallery--paper-left', type: 'scroll-gallery', label: 'Galerie scroll · papier · média à gauche', family: 'scroll-interactive', era: '2024', props: { background: 'paper', media_side: 'left' } },
    { id: 'scroll-gallery--paper-2-right', type: 'scroll-gallery', label: 'Galerie scroll · papier 2 · média à droite', family: 'scroll-interactive', era: '2025', props: { background: 'paper-2', media_side: 'right' } },
    { id: 'scroll-gallery--ink-left', type: 'scroll-gallery', label: 'Galerie scroll · encre · média à gauche', family: 'scroll-interactive', era: '2026', props: { background: 'ink', media_side: 'left' } },
    { id: 'scroll-gallery--ink-right', type: 'scroll-gallery', label: 'Galerie scroll · encre · média à droite', family: 'scroll-interactive', era: '2026', props: { background: 'ink', media_side: 'right' } },
  ],

  // stack-cards :tone PAR carte (contenu) ; axe preset = background.
  'stack-cards': [
    { id: 'stack-cards--paper', type: 'stack-cards', label: 'Cartes empilées · papier', family: 'scroll-interactive', era: '2024', props: { background: 'paper' } },
    { id: 'stack-cards--paper-2', type: 'stack-cards', label: 'Cartes empilées · papier 2', family: 'scroll-interactive', era: '2025', props: { background: 'paper-2' } },
    { id: 'stack-cards--paper-3', type: 'stack-cards', label: 'Cartes empilées · papier 3', family: 'scroll-interactive', era: '2025', props: { background: 'paper-3' } },
    { id: 'stack-cards--ink', type: 'stack-cards', label: 'Cartes empilées · encre', family: 'scroll-interactive', era: '2026', props: { background: 'ink' } },
  ],

  // hover-reveal-list :background + reveal_mode (cursor|fixed) lu par le composant.
  'hover-reveal-list': [
    { id: 'hover-reveal-list--paper-cursor', type: 'hover-reveal-list', label: 'Liste révélation · papier · image suit le curseur', family: 'scroll-interactive', era: '2024', props: { background: 'paper', reveal_mode: 'cursor' } },
    { id: 'hover-reveal-list--paper-fixed', type: 'hover-reveal-list', label: 'Liste révélation · papier · image fixe', family: 'scroll-interactive', era: '2024', props: { background: 'paper', reveal_mode: 'fixed' } },
    { id: 'hover-reveal-list--paper-2-fixed', type: 'hover-reveal-list', label: 'Liste révélation · papier 2 · image fixe', family: 'scroll-interactive', era: '2025', props: { background: 'paper-2', reveal_mode: 'fixed' } },
    { id: 'hover-reveal-list--ink-cursor', type: 'hover-reveal-list', label: 'Liste révélation · encre · image suit le curseur', family: 'scroll-interactive', era: '2026', props: { background: 'ink', reveal_mode: 'cursor' } },
    { id: 'hover-reveal-list--ink-fixed', type: 'hover-reveal-list', label: 'Liste révélation · encre · image fixe', family: 'scroll-interactive', era: '2026', props: { background: 'ink', reveal_mode: 'fixed' } },
  ],

  // horizontal-showcase :tone PAR panel (contenu) ; axe preset = background.
  'horizontal-showcase': [
    { id: 'horizontal-showcase--paper', type: 'horizontal-showcase', label: 'Vitrine horizontale · papier', family: 'scroll-interactive', era: '2024', props: { background: 'paper' } },
    { id: 'horizontal-showcase--paper-2', type: 'horizontal-showcase', label: 'Vitrine horizontale · papier 2', family: 'scroll-interactive', era: '2025', props: { background: 'paper-2' } },
    { id: 'horizontal-showcase--paper-3', type: 'horizontal-showcase', label: 'Vitrine horizontale · papier 3', family: 'scroll-interactive', era: '2025', props: { background: 'paper-3' } },
    { id: 'horizontal-showcase--ink', type: 'horizontal-showcase', label: 'Vitrine horizontale · encre', family: 'scroll-interactive', era: '2026', props: { background: 'ink' } },
  ],

  // media-bento :background + layout (feature-2|quad|mosaic) lu par le composant.
  'media-bento': [
    { id: 'media-bento--paper-feature-2', type: 'media-bento', label: 'Bento média · papier · une vedette', family: 'scroll-interactive', era: '2024', props: { background: 'paper', layout: 'feature-2' } },
    { id: 'media-bento--paper-quad', type: 'media-bento', label: 'Bento média · papier · quadrillage', family: 'scroll-interactive', era: '2024', props: { background: 'paper', layout: 'quad' } },
    { id: 'media-bento--paper-2-mosaic', type: 'media-bento', label: 'Bento média · papier 2 · mosaïque', family: 'scroll-interactive', era: '2025', props: { background: 'paper-2', layout: 'mosaic' } },
    { id: 'media-bento--ink-feature-2', type: 'media-bento', label: 'Bento média · encre · une vedette', family: 'scroll-interactive', era: '2026', props: { background: 'ink', layout: 'feature-2' } },
    { id: 'media-bento--ink-mosaic', type: 'media-bento', label: 'Bento média · encre · mosaïque', family: 'scroll-interactive', era: '2026', props: { background: 'ink', layout: 'mosaic' } },
  ],

  // photo-cluster :background + layout (lead-cluster|scatter|duo) lu par le composant.
  'photo-cluster': [
    { id: 'photo-cluster--paper-lead-cluster', type: 'photo-cluster', label: 'Grappe photos · papier · grappe vedette', family: 'scroll-interactive', era: '2024', props: { background: 'paper', layout: 'lead-cluster' } },
    { id: 'photo-cluster--paper-scatter', type: 'photo-cluster', label: 'Grappe photos · papier · dispersée', family: 'scroll-interactive', era: '2024', props: { background: 'paper', layout: 'scatter' } },
    { id: 'photo-cluster--paper-2-duo', type: 'photo-cluster', label: 'Grappe photos · papier 2 · duo', family: 'scroll-interactive', era: '2025', props: { background: 'paper-2', layout: 'duo' } },
    { id: 'photo-cluster--ink-lead-cluster', type: 'photo-cluster', label: 'Grappe photos · encre · grappe vedette', family: 'scroll-interactive', era: '2026', props: { background: 'ink', layout: 'lead-cluster' } },
    { id: 'photo-cluster--ink-scatter', type: 'photo-cluster', label: 'Grappe photos · encre · dispersée', family: 'scroll-interactive', era: '2026', props: { background: 'ink', layout: 'scatter' } },
  ],

  // media-swap-band :background + swap_mode (auto|hover) lu par le composant.
  'media-swap-band': [
    { id: 'media-swap-band--paper-auto', type: 'media-swap-band', label: 'Bande média alternée · papier · rotation auto', family: 'scroll-interactive', era: '2024', props: { background: 'paper', swap_mode: 'auto' } },
    { id: 'media-swap-band--paper-hover', type: 'media-swap-band', label: 'Bande média alternée · papier · au survol', family: 'scroll-interactive', era: '2024', props: { background: 'paper', swap_mode: 'hover' } },
    { id: 'media-swap-band--paper-2-hover', type: 'media-swap-band', label: 'Bande média alternée · papier 2 · au survol', family: 'scroll-interactive', era: '2025', props: { background: 'paper-2', swap_mode: 'hover' } },
    { id: 'media-swap-band--ink-auto', type: 'media-swap-band', label: 'Bande média alternée · encre · rotation auto', family: 'scroll-interactive', era: '2026', props: { background: 'ink', swap_mode: 'auto' } },
    { id: 'media-swap-band--ink-hover', type: 'media-swap-band', label: 'Bande média alternée · encre · au survol', family: 'scroll-interactive', era: '2026', props: { background: 'ink', swap_mode: 'hover' } },
  ],
};

/** Liste les presets d'un type (vide si aucun). */
export function listPresets(type: SectionType): Preset[] {
  return SECTION_PRESETS[type] ?? [];
}

/** Récupère un preset par (type, id). undefined si absent. */
export function getPreset(type: SectionType, id: string): Preset | undefined {
  return listPresets(type).find((p) => p.id === id);
}

/** Tous les presets aplatis (pour getStaticPaths imbriqué / gate). */
export function allPresets(): Preset[] {
  return Object.values(SECTION_PRESETS).flat().filter(Boolean) as Preset[];
}
