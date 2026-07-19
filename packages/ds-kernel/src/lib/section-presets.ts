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
import { variantsFor } from './section-variants';

/** Sous-ensemble de présentation surchargeable par un preset (axes transverses docs/46).
 *  Index signature : la route preview merge `{...demo, ...props}` au runtime, donc toute clé
 *  de schéma est surchargeable sans éditer ce type (anti-conflit fan-out P2.9 multi-agents).
 *  Un axe qui devient STABLE (réutilisé sur >=2 types) doit être remonté en champ typé
 *  documenté ci-dessous au merge suivant ; le GF-1 par preset attrape les clés sans effet. */
export type PresetProps = Partial<Pick<SectionData, never>> & {
  [key: string]: unknown;
  background?: 'paper' | 'paper-2' | 'paper-3' | 'ink' | 'accent';
  layout?: string;
  density?: 'compact' | 'base' | 'ample';
  /** Axe Variante : hero-conversion-funnel (split/sumie/minimal), eeat-panel (media/columns/light/hero),
   *  testimonial-metrics (quote-left/quote-right), pull-quote-block (breakout/inline/centered). */
  variant?:
    | 'split'
    | 'sumie'
    | 'minimal'
    | 'media'
    | 'columns'
    | 'light'
    | 'hero'
    | 'quote-left'
    | 'quote-right'
    | 'breakout'
    | 'inline'
    | 'centered'
    | 'rail'
    | 'inverted'
    | 'accent';
  /** Axe CONTENU testimonials — surcharges honorées par les composants (toggles de présence).
   *  testimonial-wall : `rating` (undefined masque le bandeau de note d'en-tête).
   *  testimonial-single-spotlight : `portrait_src` / `logo_src` (undefined masque l'atome). */
  rating?: number;
  portrait_src?: string;
  logo_src?: string;
  /** Axe Variante « registre média » du hero split (lineart vs editorial). */
  media_register?: 'lineart' | 'editorial';
  /** Média associé au registre (surcharge la demo pour exposer le preset). */
  media_src?: string;
  media_alt_fr?: string;
  media_alt_en?: string;
  /** hero-case-study : illustration duotone en overlap (côté configurable). Miroir du
   *  champ `illustration` du schéma (src + alt bilingue + côté). Surcharge la demo pour
   *  exposer les déclinaisons « image à droite / à gauche » ; `undefined` = rendu legacy
   *  (décor SVG, sans image). Merge shallow → fournir l'objet complet par preset. */
  illustration?: {
    src: string;
    alt_fr: string;
    alt_en: string;
    side?: 'left' | 'right';
  };
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
  /** card-collections (deliverables-grid, pricing-cards, case-card-grid) : nombre de colonnes
   *  ('auto' = count-adaptive). 5/6 ajoutés au scale Batch 2 pour grid-uniform/grid-auto. */
  columns?: 'auto' | '2' | '3' | '4' | '5' | '6';
  /** card-collections (Batch 2) : largeurs de colonnes pour layout='grid-asym' UNIQUEMENT. */
  colRatio?: 'equal' | '1-2' | '2-1' | '1-1-2' | '2-3';
  /** card-collections (Batch 2) : hauteur des cellules en mode grille (auto|even|square|video). */
  itemHeight?: 'auto' | 'even' | 'square' | 'video';
  /** feature-split-media : ratio des colonnes texte|média (préféré à layout). */
  proportion?: '1-1' | '1-2' | '2-1' | '2-3' | '3-2';
  /** feature-split-media : côté du média en desktop. */
  mediaSide?: 'left' | 'right';
  /** feature-grid (witness moteur v2) : couches NOW exposées par preset témoin. Lues par
   *  data-* dans FeatureGrid → moteur section-layouts.css. */
  hover?: 'none' | 'lift' | 'zoom' | 'glow' | 'border' | 'tint' | 'underline' | 'reveal-cta' | 'media-zoom';
  cellAlignY?: 'top' | 'middle' | 'bottom' | 'between';
  cellBg?: 'paper' | 'paper-2' | 'paper-3' | 'ink' | 'ink-2' | 'ink-3' | 'accent' | 'none';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** feature-grid : override complet des cartes (merge shallow → fournir le tableau entier).
   *  Permet le preset « cellules multicolores » (bg par item). Forme = featureItemSchema. */
  features?: Array<{
    icon?: string;
    title_fr: string;
    title_en: string;
    body_fr: string;
    body_en: string;
    bg?: 'paper' | 'paper-2' | 'paper-3' | 'ink' | 'ink-2' | 'ink-3' | 'accent' | 'none';
    tone?: 'ink' | 'muted' | 'accent' | 'accent-text' | 'paper';
    cellAlignY?: 'top' | 'middle' | 'bottom' | 'between';
    colSpan?: '1' | '2' | '3' | '4';
    cta_label_fr?: string;
    cta_label_en?: string;
    cta_href?: string;
  }>;
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

// Ids des presets de grille GÉNÉRIQUES (miroir exact de src/styles/layouts.css → check-presets.mjs).
// Ne liste QUE les layouts génériques `[data-layout]{--sec-grid}` ; les layouts internes à un
// composant (mosaic, grid-uniform, list…) vivent dans le .astro et sont harvestés à part par le gate.
export const KNOWN_LAYOUTS = [
  'split-3-1',
  'split-1-3',
  'even-2',
  'even-3',
  'even-4',
  'center-1-2-1',
  'editorial-6-1-1',
  'split-1-2',
  'split-2-1',
  // P1 (Vague 0, strat §12.2-B) :
  'split-3-2',
  'split-2-3',
  'even-5',
  'even-6',
  'lead-2-1-1',
  'lead-1-1-2',
  'golden-ab',
  'golden-ba',
] as const;

export const KNOWN_DENSITIES = ['compact', 'base', 'ample', 'grand'] as const;

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

  // hero-case-study (famille hero) · habillage magazine : illustration duotone en
  // overlap avec le titre (côté configurable) OU décor SVG legacy sans image.
  // Axes exposés = illustration (src/alt/side) + background. Le composant lit
  // data.illustration.side → hero-case-study__mast--{left|right} ; sur ink l'image
  // passe en mix-blend-mode:screen (line-art clair sur fond encre). `illustration:
  // undefined` = rendu strictement legacy (décor géométrique, rétrocompat totale).
  'hero-case-study': [
    {
      id: 'hero-case-study--illus-right-paper',
      type: 'hero-case-study',
      label: 'Cas client · illustration à droite · papier',
      family: 'hero',
      era: '2026',
      props: {
        background: 'paper',
        illustration: {
          src: '/images/illustrations/ds/super-girl-paper.webp',
          alt_fr: 'Une figure dynamique qui capte et qualifie les leads, illustration éditoriale duotone.',
          alt_en: 'A dynamic figure that captures and qualifies leads, a duotone editorial illustration.',
          side: 'right',
        },
      },
    },
    {
      id: 'hero-case-study--illus-left-paper',
      type: 'hero-case-study',
      label: 'Cas client · illustration à gauche · papier',
      family: 'hero',
      era: '2026',
      props: {
        background: 'paper',
        illustration: {
          src: '/images/illustrations/ds/man-and-woman-hi-paper.webp',
          alt_fr: 'Deux personnes qui se saluent, symbole du démarrage de partenariat, illustration éditoriale duotone.',
          alt_en: 'Two people greeting each other, a symbol of a partnership kickoff, a duotone editorial illustration.',
          side: 'left',
        },
      },
    },
    {
      id: 'hero-case-study--illus-right-paper-2',
      type: 'hero-case-study',
      label: 'Cas client · illustration à droite · papier 2',
      family: 'hero',
      era: '2025',
      props: {
        background: 'paper-2',
        illustration: {
          src: '/images/illustrations/ds/money-in-the-pig-paper.webp',
          alt_fr: 'Une tirelire qui se remplit, symbole du retour sur investissement, illustration éditoriale duotone.',
          alt_en: 'A piggy bank filling up, a symbol of return on investment, a duotone editorial illustration.',
          side: 'right',
        },
      },
    },
    {
      id: 'hero-case-study--illus-left-ink',
      type: 'hero-case-study',
      label: 'Cas client · illustration à gauche · encre',
      family: 'hero',
      era: '2026',
      props: {
        background: 'ink',
        illustration: {
          src: '/images/illustrations/ds/computer-health-paper.webp',
          alt_fr: 'Un ordinateur ausculté comme un patient, symbole de l\'audit technique, illustration éditoriale duotone.',
          alt_en: 'A computer examined like a patient, a symbol of the technical audit, a duotone editorial illustration.',
          side: 'left',
        },
      },
    },
    {
      id: 'hero-case-study--no-illus-paper',
      type: 'hero-case-study',
      label: 'Cas client · sans illustration · papier',
      family: 'hero',
      era: '2022',
      props: { background: 'paper', illustration: undefined },
    },
    {
      id: 'hero-case-study--no-illus-ink',
      type: 'hero-case-study',
      label: 'Cas client · sans illustration · encre',
      family: 'hero',
      era: '2026',
      props: { background: 'ink', illustration: undefined },
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

  // statement-orbit (famille manifesto) · Batch 6 (texte/manifeste) · 3 couches :
  // layout prose|lead-aside|two-col + density/contentAlign/actionsAlign + placement atomique.
  // La carte interne reste toujours ink (signature) ; `background` agit sur la zone externe.
  'statement-orbit': [
    // Défaut (split 52/48) + palette externe
    { id: 'statement-orbit--paper', type: 'statement-orbit', label: 'Statement orbite · split · papier', family: 'prose', era: '2021', props: { background: 'paper' } },
    { id: 'statement-orbit--paper-2', type: 'statement-orbit', label: 'Statement orbite · split · papier 2', family: 'prose', era: '2023', props: { background: 'paper-2' } },
    { id: 'statement-orbit--ink', type: 'statement-orbit', label: 'Statement orbite · split · encre', family: 'prose', era: '2026', props: { background: 'ink' } },
    // Layout : prose (1 colonne centrée, média contenu dessous)
    { id: 'statement-orbit--prose', type: 'statement-orbit', label: 'Statement orbite · prose centrée', family: 'prose', era: '2024', props: { layout: 'prose' } },
    { id: 'statement-orbit--prose-ample', type: 'statement-orbit', label: 'Statement orbite · prose · ample', family: 'prose', era: '2025', props: { layout: 'prose', density: 'ample' } },
    // Layout : lead-aside (texte 2fr + média aparté 1fr)
    { id: 'statement-orbit--lead-aside', type: 'statement-orbit', label: 'Statement orbite · texte dominant + média aparté', family: 'prose', era: '2023', props: { layout: 'lead-aside' } },
    { id: 'statement-orbit--lead-aside-compact', type: 'statement-orbit', label: 'Statement orbite · lead-aside · compact', family: 'prose', era: '2024', props: { layout: 'lead-aside', density: 'compact' } },
    // Layout : two-col (lede en 2 colonnes de texte sous le titre)
    { id: 'statement-orbit--two-col', type: 'statement-orbit', label: 'Statement orbite · lede en deux colonnes', family: 'prose', era: '2022', props: { layout: 'two-col' } },
    // Axe : contentAlign centré (split, titre + lede centrés)
    { id: 'statement-orbit--center', type: 'statement-orbit', label: 'Statement orbite · contenu centré', family: 'prose', era: '2025', props: { contentAlign: 'center' } },
    // Atomique : CTA centré sans décaler le titre (actions justify indépendant du header)
    { id: 'statement-orbit--atomic-cta-center', type: 'statement-orbit', label: 'Statement orbite · CTA centré (titre à gauche)', family: 'prose', era: '2026', props: { layout: 'prose', placement: { header: { align: 'start' }, actions: { justify: 'center' } } } },
    // Atomique : média en premier (inversion ordre média↔texte)
    { id: 'statement-orbit--atomic-media-first', type: 'statement-orbit', label: 'Statement orbite · média en premier', family: 'prose', era: '2026', props: { placement: { media: { order: 0 }, header: { order: 1 } } } },
  ],

  // definition-extract (famille prose) · Batch 6 · 3 couches :
  // layout prose|lead-aside|rows-divided + density/contentAlign + placement atomique.
  'definition-extract': [
    // Défaut (prose) + palette
    { id: 'definition-extract--paper', type: 'definition-extract', label: 'Définition extractible · prose · papier', family: 'prose', era: '2024', props: { background: 'paper' } },
    { id: 'definition-extract--paper-2', type: 'definition-extract', label: 'Définition extractible · prose · papier 2', family: 'prose', era: '2025', props: { background: 'paper-2' } },
    { id: 'definition-extract--ink', type: 'definition-extract', label: 'Définition extractible · prose · encre', family: 'prose', era: '2026', props: { background: 'ink' } },
    // Layout : lead-aside (statement en lead + pills/specs en colonne aparté)
    { id: 'definition-extract--lead-aside', type: 'definition-extract', label: 'Définition extractible · lead + aparté', family: 'prose', era: '2025', props: { layout: 'lead-aside' } },
    { id: 'definition-extract--lead-aside-ink', type: 'definition-extract', label: 'Définition extractible · lead + aparté · encre', family: 'prose', era: '2026', props: { layout: 'lead-aside', background: 'ink' } },
    // Layout : rows-divided (statement / pills / specs séparés par hairlines)
    { id: 'definition-extract--rows-divided', type: 'definition-extract', label: 'Définition extractible · fiche à filets', family: 'prose', era: '2024', props: { layout: 'rows-divided' } },
    { id: 'definition-extract--rows-divided-paper-2', type: 'definition-extract', label: 'Définition extractible · fiche à filets · papier 2', family: 'prose', era: '2025', props: { layout: 'rows-divided', background: 'paper-2' } },
    // Axe : density
    { id: 'definition-extract--prose-compact', type: 'definition-extract', label: 'Définition extractible · prose · compact', family: 'prose', era: '2025', props: { density: 'compact' } },
    { id: 'definition-extract--prose-ample', type: 'definition-extract', label: 'Définition extractible · prose · ample', family: 'prose', era: '2024', props: { density: 'ample' } },
    // Axe : contentAlign centré (statement + pills centrés)
    { id: 'definition-extract--center', type: 'definition-extract', label: 'Définition extractible · centrée', family: 'prose', era: '2026', props: { contentAlign: 'center' } },
    // Atomique : header (kicker) caché en mobile
    { id: 'definition-extract--atomic-kicker-desktop', type: 'definition-extract', label: 'Définition extractible · kicker desktop seul', family: 'prose', era: '2026', props: { layout: 'rows-divided', placement: { header: { hideOn: 'mobile' } } } },
  ],

  // pain-severity-list (famille pain) · Batch 6 · 3 couches :
  // layout list|rows-divided|two-col|grid + columns/density/contentAlign + placement atomique.
  'pain-severity-list': [
    // Défaut (list ink) + palette
    { id: 'pain-severity-list--ink', type: 'pain-severity-list', label: 'Liste sévérité · list · encre', family: 'prose', era: '2026', props: { background: 'ink' } },
    { id: 'pain-severity-list--paper', type: 'pain-severity-list', label: 'Liste sévérité · list · papier', family: 'prose', era: '2023', props: { background: 'paper' } },
    { id: 'pain-severity-list--paper-2', type: 'pain-severity-list', label: 'Liste sévérité · list · papier 2', family: 'prose', era: '2024', props: { background: 'paper-2' } },
    // Layout : rows-divided (alias explicite des rows à filets)
    { id: 'pain-severity-list--rows-divided', type: 'pain-severity-list', label: 'Liste sévérité · rows à filets', family: 'prose', era: '2024', props: { layout: 'rows-divided' } },
    // Layout : two-col (deux colonnes d'items, severity en rang horizontal)
    { id: 'pain-severity-list--two-col', type: 'pain-severity-list', label: 'Liste sévérité · deux colonnes', family: 'prose', era: '2025', props: { layout: 'two-col' } },
    { id: 'pain-severity-list--two-col-paper', type: 'pain-severity-list', label: 'Liste sévérité · deux colonnes · papier', family: 'prose', era: '2025', props: { layout: 'two-col', background: 'paper' } },
    // Layout : grid count-adaptive (auto-fit) + refiner columns
    { id: 'pain-severity-list--grid-auto', type: 'pain-severity-list', label: 'Liste sévérité · grille adaptative', family: 'prose', era: '2026', props: { layout: 'grid', columns: 'auto' } },
    { id: 'pain-severity-list--grid-3', type: 'pain-severity-list', label: 'Liste sévérité · grille 3 colonnes', family: 'prose', era: '2026', props: { layout: 'grid', columns: '3' } },
    // Axe : density
    { id: 'pain-severity-list--list-compact', type: 'pain-severity-list', label: 'Liste sévérité · list · compact', family: 'prose', era: '2025', props: { density: 'compact' } },
    { id: 'pain-severity-list--list-ample', type: 'pain-severity-list', label: 'Liste sévérité · list · ample', family: 'prose', era: '2024', props: { density: 'ample' } },
    // Atomique : header centré + grille (titre centré, items en grille à gauche)
    { id: 'pain-severity-list--atomic-head-center', type: 'pain-severity-list', label: 'Liste sévérité · titre centré + grille', family: 'prose', era: '2026', props: { layout: 'grid', columns: '2', placement: { header: { align: 'center' } } } },
  ],

  // versus-competitors (famille table) :comparatif ; axe sûr = background.
  'versus-competitors': [
    { id: 'versus-competitors--paper', type: 'versus-competitors', label: 'Versus concurrents · papier', family: 'table', era: '2022', props: { background: 'paper' } },
    { id: 'versus-competitors--paper-2', type: 'versus-competitors', label: 'Versus concurrents · papier 2', family: 'table', era: '2023', props: { background: 'paper-2' } },
    { id: 'versus-competitors--paper-3', type: 'versus-competitors', label: 'Versus concurrents · papier 3', family: 'table', era: '2024', props: { background: 'paper-3' } },
    { id: 'versus-competitors--ink', type: 'versus-competitors', label: 'Versus concurrents · encre', family: 'table', era: '2026', props: { background: 'ink' } },
  ],

  // feature-grid (famille card-grid, composant FeatureGrid) : WITNESS de la migration sur le
  // moteur de layout v2. Presets témoins qui EXERCENT les couches NOW (L8 hover, L10bis cellBg
  // multicolore + contraste auto, L7 cellAlignY=between, L7 justifyContent). Le défaut (demo
  // sans preset) reste la grille hairline 3 colonnes inchangée.
  'feature-grid': [
    { id: 'feature-grid--paper', type: 'feature-grid', label: 'Grille features · papier', family: 'card-grid', era: '2022', props: { background: 'paper' } },
    { id: 'feature-grid--3col-ink', type: 'feature-grid', label: 'Grille features · 3 colonnes · encre', family: 'card-grid', era: '2026', props: { background: 'ink', columns: '3' } },
    { id: 'feature-grid--hover-lift', type: 'feature-grid', label: 'Grille features · survol élévation (lift)', family: 'card-grid', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3', hover: 'lift' } },
    {
      id: 'feature-grid--cells-multicolor',
      type: 'feature-grid',
      label: 'Grille features · cellules multicolores (contraste auto)',
      family: 'card-grid',
      era: '2026',
      props: {
        background: 'paper',
        layout: 'grid-uniform',
        columns: '3',
        features: [
          { title_fr: 'Cellule papier', title_en: 'Paper cell', body_fr: 'Fond clair, texte encre (défaut sûr).', body_en: 'Light surface, ink text (safe default).', bg: 'paper', cta_label_fr: 'Lien', cta_label_en: 'Link', cta_href: '/agence/design-system' },
          { title_fr: 'Cellule encre', title_en: 'Ink cell', body_fr: 'Fond sombre, texte clair fourni par le moteur (contraste auto).', body_en: 'Dark surface, light text from the engine (auto contrast).', bg: 'ink', cta_label_fr: 'Lien', cta_label_en: 'Link', cta_href: '/agence/design-system' },
          { title_fr: 'Cellule accent', title_en: 'Accent cell', body_fr: 'Fond accent terracotta, texte clair remappé.', body_en: 'Terracotta accent surface, remapped light text.', bg: 'accent', cta_label_fr: 'Lien', cta_label_en: 'Link', cta_href: '/agence/design-system' },
        ],
      },
    },
    { id: 'feature-grid--cta-bottom', type: 'feature-grid', label: 'Grille features · CTA poussé en bas de carte', family: 'card-grid', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3', cellAlignY: 'between' } },
    { id: 'feature-grid--justify-center', type: 'feature-grid', label: 'Grille features · grille centrée (justify-content)', family: 'card-grid', era: '2026', props: { background: 'paper', layout: 'grid-auto', justifyContent: 'center' } },
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
    // ── Vague C scale (Batch 2) · recettes de layout + refiners + placement atomique ──
    { id: 'deliverables-grid--grid-uniform-3', type: 'deliverables-grid', label: 'Livrables · grille uniforme · 3 colonnes', family: 'card-grid', era: '2025', props: { layout: 'grid-uniform', columns: '3', background: 'paper' } },
    { id: 'deliverables-grid--grid-uniform-4-even', type: 'deliverables-grid', label: 'Livrables · grille uniforme · 4 colonnes · hauteurs égales', family: 'card-grid', era: '2026', props: { layout: 'grid-uniform', columns: '4', itemHeight: 'even', background: 'paper-2' } },
    { id: 'deliverables-grid--grid-auto', type: 'deliverables-grid', label: 'Livrables · grille fluide adaptative', family: 'card-grid', era: '2025', props: { layout: 'grid-auto', background: 'paper' } },
    { id: 'deliverables-grid--grid-asym-2-1', type: 'deliverables-grid', label: 'Livrables · grille asymétrique · large + étroite', family: 'card-grid', era: '2026', props: { layout: 'grid-asym', colRatio: '2-1', background: 'paper' } },
    { id: 'deliverables-grid--grid-asym-1-2-ink', type: 'deliverables-grid', label: 'Livrables · grille asymétrique · étroite + large · encre', family: 'card-grid', era: '2026', props: { layout: 'grid-asym', colRatio: '1-2', background: 'ink' } },
    { id: 'deliverables-grid--list', type: 'deliverables-grid', label: 'Livrables · liste horizontale', family: 'card-grid', era: '2024', props: { layout: 'list', background: 'paper' } },
    { id: 'deliverables-grid--rows-divided', type: 'deliverables-grid', label: 'Livrables · lignes séparées (table éditoriale)', family: 'card-grid', era: '2023', props: { layout: 'rows-divided', background: 'paper' } },
    { id: 'deliverables-grid--bento-feature', type: 'deliverables-grid', label: 'Livrables · bento vedette (1ʳᵉ carte large)', family: 'card-grid', era: '2026', props: { layout: 'bento-feature', background: 'paper-2' } },
    { id: 'deliverables-grid--featured-split-ink', type: 'deliverables-grid', label: 'Livrables · bloc vedette + colonne · encre', family: 'card-grid', era: '2026', props: { layout: 'featured-split', background: 'ink' } },
    { id: 'deliverables-grid--atomic-header-center', type: 'deliverables-grid', label: 'Livrables · grille fluide · en-tête centré (placement)', family: 'card-grid', era: '2025', props: { layout: 'grid-auto', background: 'paper', placement: { header: { align: 'center' } } } },
    { id: 'deliverables-grid--atomic-body-first', type: 'deliverables-grid', label: 'Livrables · grille avant en-tête (placement order)', family: 'card-grid', era: '2026', props: { layout: 'grid-uniform', columns: '3', background: 'paper', placement: { header: { order: 1 }, body: { order: 0 } } } },
  ],

  // feature-zigzag (famille split-media) :background + toggle alternate_blocks (damier paper/ink lu par le composant).
  'feature-zigzag': [
    { id: 'feature-zigzag--paper', type: 'feature-zigzag', label: 'Zigzag features · papier', family: 'split-media', era: '2020', props: { background: 'paper' } },
    { id: 'feature-zigzag--paper-2', type: 'feature-zigzag', label: 'Zigzag features · papier 2', family: 'split-media', era: '2022', props: { background: 'paper-2' } },
    { id: 'feature-zigzag--ink', type: 'feature-zigzag', label: 'Zigzag features · encre', family: 'split-media', era: '2026', props: { background: 'ink' } },
    { id: 'feature-zigzag--paper-damier', type: 'feature-zigzag', label: 'Zigzag features · papier · damier paper/encre', family: 'split-media', era: '2025', props: { background: 'paper', alternate_blocks: true } },
    { id: 'feature-zigzag--paper-2-damier', type: 'feature-zigzag', label: 'Zigzag features · papier 2 · damier paper/encre', family: 'split-media', era: '2025', props: { background: 'paper-2', alternate_blocks: true } },
    // ── Vague C · Scale (Batch 4) · recettes layout + proportion + mediaSide + atomic ──
    { id: 'feature-zigzag--alternate-media-right', type: 'feature-zigzag', label: 'Zigzag · alterné · média à droite au départ', family: 'split-media', era: '2026', props: { layout: 'alternate', mediaSide: 'right', alternate_blocks: false } },
    { id: 'feature-zigzag--inline-left-2-3', type: 'feature-zigzag', label: 'Zigzag · média gauche fixe · texte dominant 2/3', family: 'split-media', era: '2026', props: { layout: 'inline-left', proportion: '2-3', alternate_blocks: false } },
    { id: 'feature-zigzag--inline-right-3-2', type: 'feature-zigzag', label: 'Zigzag · média droite fixe · média dominant 3/2', family: 'split-media', era: '2026', props: { layout: 'inline-right', proportion: '3-2', alternate_blocks: false } },
    { id: 'feature-zigzag--stacked-ample', type: 'feature-zigzag', label: 'Zigzag · empilé · média au-dessus · ample', family: 'split-media', era: '2026', props: { layout: 'stacked', density: 'ample', alternate_blocks: false } },
    { id: 'feature-zigzag--alternate-1-2-compact', type: 'feature-zigzag', label: 'Zigzag · alterné · texte dominant 1/2 · compact', family: 'split-media', era: '2026', props: { layout: 'alternate', proportion: '1-2', density: 'compact', alternate_blocks: false } },
    { id: 'feature-zigzag--center-header', type: 'feature-zigzag', label: 'Zigzag · en-tête centré', family: 'split-media', era: '2026', props: { contentAlign: 'center', alternate_blocks: false } },
    { id: 'feature-zigzag--atomic-actions-center', type: 'feature-zigzag', label: 'Zigzag · atomique · liens centrés', family: 'split-media', era: '2026', props: { alternate_blocks: false, placement: { actions: { justify: 'center' } } } },
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
    // ── Batch 3 · VOCABULAIRE DE LAYOUT (recettes nommées) + itemHeight + atomique. ──
    { id: 'bento-grid--bento-feature', type: 'bento-grid', label: 'Bento · tuile vedette 2×2', family: 'bento', era: '2026', props: { background: 'paper', layout: 'bento-feature' } },
    { id: 'bento-grid--mosaic', type: 'bento-grid', label: 'Bento · mosaïque éditoriale', family: 'bento', era: '2026', props: { background: 'paper-2', layout: 'mosaic' } },
    { id: 'bento-grid--matrix-2x2', type: 'bento-grid', label: 'Bento · matrice 2×2 carrée', family: 'bento', era: '2026', props: { background: 'paper', layout: 'matrix-2x2' } },
    { id: 'bento-grid--matrix-3x3', type: 'bento-grid', label: 'Bento · matrice 3×3 carrée', family: 'bento', era: '2026', props: { background: 'paper', layout: 'matrix-3x3' } },
    { id: 'bento-grid--grid-uniform-3', type: 'bento-grid', label: 'Bento · grille uniforme 3 colonnes', family: 'bento', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3' } },
    { id: 'bento-grid--grid-uniform-square', type: 'bento-grid', label: 'Bento · grille uniforme · cellules carrées', family: 'bento', era: '2026', props: { background: 'paper-3', layout: 'grid-uniform', columns: '3', itemHeight: 'square' } },
    { id: 'bento-grid--mosaic-ink', type: 'bento-grid', label: 'Bento · mosaïque · encre', family: 'bento', era: '2026', props: { background: 'ink', layout: 'mosaic' } },
    { id: 'bento-grid--atomic-header-center', type: 'bento-grid', label: 'Bento · en-tête centré (atomique)', family: 'bento', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3', placement: { header: { align: 'center' } } } },
    { id: 'bento-grid--atomic-body-first', type: 'bento-grid', label: 'Bento · mosaïque avant l\'en-tête (atomique)', family: 'bento', era: '2026', props: { background: 'paper', layout: 'mosaic', placement: { header: { order: 1 }, body: { order: 0 } } } },
  ],

  // method-timeline (famille timeline) · Vague C Batch 5 : recettes layout (vertical-stack /
  // numbered-rows / horizontal / grid-steps) + density + contentAlign + placement atomique.
  'method-timeline': [
    { id: 'method-timeline--paper', type: 'method-timeline', label: 'Méthode · frise · papier', family: 'timeline', era: '2020', props: { background: 'paper' } },
    { id: 'method-timeline--ink', type: 'method-timeline', label: 'Méthode · frise · encre', family: 'timeline', era: '2026', props: { background: 'ink' } },
    { id: 'method-timeline--vertical-stack', type: 'method-timeline', label: 'Méthode · étapes empilées', family: 'timeline', era: '2024', props: { layout: 'vertical-stack' } },
    { id: 'method-timeline--numbered-rows', type: 'method-timeline', label: 'Méthode · lignes numérotées', family: 'timeline', era: '2024', props: { layout: 'numbered-rows' } },
    { id: 'method-timeline--horizontal', type: 'method-timeline', label: 'Méthode · rail horizontal', family: 'timeline', era: '2025', props: { layout: 'horizontal' } },
    { id: 'method-timeline--grid-steps-auto', type: 'method-timeline', label: 'Méthode · cartes en grille (auto)', family: 'timeline', era: '2025', props: { layout: 'grid-steps', columns: 'auto' } },
    { id: 'method-timeline--grid-steps-3', type: 'method-timeline', label: 'Méthode · cartes en grille (3 col.)', family: 'timeline', era: '2025', props: { layout: 'grid-steps', columns: '3' } },
    { id: 'method-timeline--grid-steps-2', type: 'method-timeline', label: 'Méthode · cartes en grille (2 col.)', family: 'timeline', era: '2025', props: { layout: 'grid-steps', columns: '2' } },
    { id: 'method-timeline--numbered-rows-center', type: 'method-timeline', label: 'Méthode · lignes numérotées · titre centré', family: 'timeline', era: '2025', props: { layout: 'numbered-rows', contentAlign: 'center' } },
    { id: 'method-timeline--horizontal-ample', type: 'method-timeline', label: 'Méthode · rail horizontal · aéré', family: 'timeline', era: '2026', props: { layout: 'horizontal', density: 'ample' } },
    { id: 'method-timeline--atomic-header-center', type: 'method-timeline', label: 'Méthode · header centré (atomique)', family: 'timeline', era: '2026', props: { layout: 'grid-steps', columns: '3', placement: { header: { align: 'center' } } } },
    { id: 'method-timeline--atomic-header-last', type: 'method-timeline', label: 'Méthode · header en dessous (atomique)', family: 'timeline', era: '2026', props: { layout: 'vertical-stack', placement: { header: { order: 1 }, body: { order: 0 } } } },
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
    // ── Batch 3 · VOCABULAIRE DE LAYOUT (recettes nommées) + itemHeight + atomique. ──
    { id: 'stats-bento--grid-uniform-3', type: 'stats-bento', label: 'Stats · grille uniforme 3 colonnes', family: 'bento', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3' } },
    { id: 'stats-bento--grid-uniform-4', type: 'stats-bento', label: 'Stats · grille uniforme 4 colonnes', family: 'bento', era: '2026', props: { background: 'paper-2', layout: 'grid-uniform', columns: '4' } },
    { id: 'stats-bento--matrix-2x2', type: 'stats-bento', label: 'Stats · matrice 2×2 carrée', family: 'bento', era: '2026', props: { background: 'paper', layout: 'matrix-2x2' } },
    { id: 'stats-bento--list', type: 'stats-bento', label: 'Stats · liste éditoriale (1 par ligne)', family: 'bento', era: '2026', props: { background: 'paper', layout: 'list' } },
    { id: 'stats-bento--list-ink', type: 'stats-bento', label: 'Stats · liste éditoriale · encre', family: 'bento', era: '2026', props: { background: 'ink', layout: 'list' } },
    { id: 'stats-bento--grid-uniform-square', type: 'stats-bento', label: 'Stats · grille uniforme · cellules carrées', family: 'bento', era: '2026', props: { background: 'paper-3', layout: 'grid-uniform', columns: '3', itemHeight: 'square' } },
    { id: 'stats-bento--atomic-header-center', type: 'stats-bento', label: 'Stats · en-tête centré (atomique)', family: 'bento', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3', placement: { header: { align: 'center' } } } },
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
    // ── Vague C scale (Batch 2) · recettes de layout + refiners + placement atomique ──
    { id: 'pricing-cards--grid-uniform-4-even', type: 'pricing-cards', label: 'Tarifs · grille uniforme · 4 colonnes · hauteurs égales', family: 'card-grid', era: '2026', props: { layout: 'grid-uniform', columns: '4', itemHeight: 'even', background: 'paper' } },
    { id: 'pricing-cards--grid-auto', type: 'pricing-cards', label: 'Tarifs · grille fluide adaptative', family: 'card-grid', era: '2025', props: { layout: 'grid-auto', background: 'paper-2' } },
    { id: 'pricing-cards--grid-asym-2-1', type: 'pricing-cards', label: 'Tarifs · grille asymétrique · offre large + étroite', family: 'card-grid', era: '2026', props: { layout: 'grid-asym', colRatio: '2-1', background: 'paper' } },
    { id: 'pricing-cards--grid-asym-1-1-2-ink', type: 'pricing-cards', label: 'Tarifs · grille asymétrique · 3 colonnes (vedette large) · encre', family: 'card-grid', era: '2026', props: { layout: 'grid-asym', colRatio: '1-1-2', background: 'ink' } },
    { id: 'pricing-cards--list', type: 'pricing-cards', label: 'Tarifs · liste (formules en lignes)', family: 'card-grid', era: '2024', props: { layout: 'list', background: 'paper' } },
    { id: 'pricing-cards--rows-divided', type: 'pricing-cards', label: 'Tarifs · lignes séparées (table tarifaire)', family: 'card-grid', era: '2023', props: { layout: 'rows-divided', background: 'paper' } },
    { id: 'pricing-cards--bento-feature', type: 'pricing-cards', label: 'Tarifs · bento vedette (offre phare large)', family: 'card-grid', era: '2026', props: { layout: 'bento-feature', background: 'paper-2' } },
    { id: 'pricing-cards--featured-split-ink', type: 'pricing-cards', label: 'Tarifs · offre phare + colonne · encre', family: 'card-grid', era: '2026', props: { layout: 'featured-split', background: 'ink' } },
    { id: 'pricing-cards--atomic-actions-center', type: 'pricing-cards', label: 'Tarifs · grille fluide · CTA centrés (placement)', family: 'card-grid', era: '2025', props: { layout: 'grid-auto', background: 'paper', placement: { actions: { justify: 'center' } } } },
    { id: 'pricing-cards--atomic-header-center', type: 'pricing-cards', label: 'Tarifs · grille uniforme · en-tête centré (placement)', family: 'card-grid', era: '2025', props: { layout: 'grid-uniform', columns: '3', background: 'paper', placement: { header: { align: 'center' } } } },
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
    // ── Vague C scale (Batch 2) · recettes de layout (table → honnête : pas de bento) + placement ──
    { id: 'case-card-grid--rows-divided', type: 'case-card-grid', label: 'Cas clients · lignes séparées (table éditoriale)', family: 'card-grid', era: '2023', props: { layout: 'rows-divided', background: 'paper' } },
    { id: 'case-card-grid--list', type: 'case-card-grid', label: 'Cas clients · liste (sans filets)', family: 'card-grid', era: '2024', props: { layout: 'list', background: 'paper' } },
    { id: 'case-card-grid--grid-uniform-3', type: 'case-card-grid', label: 'Cas clients · cartes en grille · 3 colonnes', family: 'card-grid', era: '2025', props: { layout: 'grid-uniform', columns: '3', background: 'paper' } },
    { id: 'case-card-grid--grid-uniform-2-even', type: 'case-card-grid', label: 'Cas clients · cartes · 2 colonnes · hauteurs égales', family: 'card-grid', era: '2026', props: { layout: 'grid-uniform', columns: '2', itemHeight: 'even', background: 'paper-2' } },
    { id: 'case-card-grid--grid-uniform-auto-ink', type: 'case-card-grid', label: 'Cas clients · cartes en grille fluide · encre', family: 'card-grid', era: '2026', props: { layout: 'grid-uniform', columns: 'auto', background: 'ink' } },
    { id: 'case-card-grid--grid-asym-2-1', type: 'case-card-grid', label: 'Cas clients · cartes asymétriques · large + étroite', family: 'card-grid', era: '2026', props: { layout: 'grid-asym', colRatio: '2-1', background: 'paper' } },
    { id: 'case-card-grid--grid-asym-1-1-2', type: 'case-card-grid', label: 'Cas clients · cartes asymétriques · 3 colonnes (large à droite)', family: 'card-grid', era: '2026', props: { layout: 'grid-asym', colRatio: '1-1-2', background: 'paper-2' } },
    { id: 'case-card-grid--atomic-header-center', type: 'case-card-grid', label: 'Cas clients · cartes en grille · en-tête centré (placement)', family: 'card-grid', era: '2025', props: { layout: 'grid-uniform', columns: '3', background: 'paper', placement: { header: { align: 'center' } } } },
    { id: 'case-card-grid--atomic-actions-end', type: 'case-card-grid', label: 'Cas clients · table · lien « tous » aligné à droite (placement)', family: 'card-grid', era: '2025', props: { background: 'paper', placement: { actions: { justify: 'end' } } } },
  ],

  // eeat-panel (famille eeat) :variant (media|columns|light|hero) + background (ink|paper SEULEMENT).
  'eeat-panel': [
    { id: 'eeat-panel--media-ink', type: 'eeat-panel', label: 'E-E-A-T · média · encre', family: 'prose', era: '2025', props: { variant: 'media', background: 'ink' } },
    { id: 'eeat-panel--columns-ink', type: 'eeat-panel', label: 'E-E-A-T · colonnes · encre', family: 'prose', era: '2025', props: { variant: 'columns', background: 'ink' } },
    { id: 'eeat-panel--light-paper', type: 'eeat-panel', label: 'E-E-A-T · claire · papier', family: 'prose', era: '2026', props: { variant: 'light', background: 'paper' } },
    { id: 'eeat-panel--hero-ink', type: 'eeat-panel', label: 'E-E-A-T · vedette · encre', family: 'prose', era: '2026', props: { variant: 'hero', background: 'ink' } },
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

  // ══════════════════════════════════════════════════════════════════════════════════════
  // CATÉGORIE « CTA / CONVERSION » (fan-out P2.9 w-p29-cta) · presets curés.
  // Axe RÉEL dominant de la catégorie = `background` (data-bg), lu par chaque composant :
  // bandes/box/formulaires de conversion changent de fond, pas de layout interne. Chaque preset
  // décline une intention de fond DISTINCTE de la demo par défaut (0 preset == demo). L'accent
  // (data-bg='accent', var(--accent) + texte var(--paper)) est DÉBLOQUÉ (w-p29-v2) : PresetProps.background
  // expose désormais 'accent' (widening orchestrateur) → 1 preset accent par type dont le schéma
  // Zod l'admet (cta-band, cta-inline, cta-final, cta-form-inline, cta-split-visual). Types SANS
  // 'accent' au schéma : cta-newsletter-footer + branded-callout (enum paper|paper-2|paper-3|ink).
  // Types SANS axe (rendu figé) exclus : closing-cta-band (ink hardcodé), department-cta
  // (sol-cta-dark figé), booking-embed (iframe Cal, ≤1 fond distinct). footer-cta-band déjà curé.

  // cta-band (famille cta) · bande fine full-bleed border-block · fond paper-2 par défaut.
  'cta-band': [
    { id: 'cta-band--paper-3', type: 'cta-band', label: 'CTA bande · fond papier 3', family: 'cta', era: '2021', props: { background: 'paper-3' } },
    { id: 'cta-band--ink', type: 'cta-band', label: 'CTA bande · fond encre', family: 'cta', era: '2024', props: { background: 'ink' } },
    { id: 'cta-band--accent', type: 'cta-band', label: 'CTA bande · fond accent', family: 'cta', era: '2026', props: { background: 'accent' } },
  ],

  // cta-inline (famille cta) · box bordée in-flow (wrap-wide) · fond paper-2 par défaut.
  'cta-inline': [
    { id: 'cta-inline--paper', type: 'cta-inline', label: 'CTA en ligne · box papier', family: 'cta', era: '2020', props: { background: 'paper' } },
    { id: 'cta-inline--paper-3', type: 'cta-inline', label: 'CTA en ligne · box papier 3', family: 'cta', era: '2022', props: { background: 'paper-3' } },
    { id: 'cta-inline--ink', type: 'cta-inline', label: 'CTA en ligne · box encre', family: 'cta', era: '2025', props: { background: 'ink' } },
    { id: 'cta-inline--accent', type: 'cta-inline', label: 'CTA en ligne · box accent', family: 'cta', era: '2026', props: { background: 'accent' } },
  ],

  // cta-final (famille cta) · CTA de clôture pleine largeur (kicker + dispo + sous-titre) · demo paper.
  'cta-final': [
    { id: 'cta-final--paper-2', type: 'cta-final', label: 'CTA final · fond papier 2', family: 'cta', era: '2021', props: { background: 'paper-2' } },
    { id: 'cta-final--paper-3', type: 'cta-final', label: 'CTA final · fond papier 3', family: 'cta', era: '2023', props: { background: 'paper-3' } },
    { id: 'cta-final--ink', type: 'cta-final', label: 'CTA final · fond encre', family: 'cta', era: '2025', props: { background: 'ink' } },
    { id: 'cta-final--accent', type: 'cta-final', label: 'CTA final · fond accent', family: 'cta', era: '2026', props: { background: 'accent' } },
  ],

  // cta-form-inline (famille cta) · capture email inline (bloc formulaire) · demo ink.
  'cta-form-inline': [
    { id: 'cta-form-inline--paper', type: 'cta-form-inline', label: 'CTA formulaire · fond papier', family: 'cta', era: '2022', props: { background: 'paper' } },
    { id: 'cta-form-inline--paper-2', type: 'cta-form-inline', label: 'CTA formulaire · fond papier 2', family: 'cta', era: '2023', props: { background: 'paper-2' } },
    { id: 'cta-form-inline--paper-3', type: 'cta-form-inline', label: 'CTA formulaire · fond papier 3', family: 'cta', era: '2024', props: { background: 'paper-3' } },
    { id: 'cta-form-inline--accent', type: 'cta-form-inline', label: 'CTA formulaire · fond accent', family: 'cta', era: '2026', props: { background: 'accent' } },
  ],

  // cta-split-visual (famille cta) · CTA scindé texte + visuel décoratif · demo paper-2.
  'cta-split-visual': [
    { id: 'cta-split-visual--paper', type: 'cta-split-visual', label: 'CTA scindé · fond papier', family: 'cta', era: '2022', props: { background: 'paper' } },
    { id: 'cta-split-visual--paper-3', type: 'cta-split-visual', label: 'CTA scindé · fond papier 3', family: 'cta', era: '2024', props: { background: 'paper-3' } },
    { id: 'cta-split-visual--ink', type: 'cta-split-visual', label: 'CTA scindé · fond encre', family: 'cta', era: '2026', props: { background: 'ink' } },
    { id: 'cta-split-visual--accent', type: 'cta-split-visual', label: 'CTA scindé · fond accent', family: 'cta', era: '2026', props: { background: 'accent' } },
  ],

  // cta-newsletter-footer (famille newsletter) · bande newsletter de pied · demo ink.
  'cta-newsletter-footer': [
    { id: 'cta-newsletter-footer--paper', type: 'cta-newsletter-footer', label: 'Newsletter pied · fond papier', family: 'newsletter', era: '2021', props: { background: 'paper' } },
    { id: 'cta-newsletter-footer--paper-2', type: 'cta-newsletter-footer', label: 'Newsletter pied · fond papier 2', family: 'newsletter', era: '2023', props: { background: 'paper-2' } },
    { id: 'cta-newsletter-footer--paper-3', type: 'cta-newsletter-footer', label: 'Newsletter pied · fond papier 3', family: 'newsletter', era: '2024', props: { background: 'paper-3' } },
  ],

  // branded-callout (famille cta) · encadré de marque. 2 axes RÉELS curés : background + le 2ᵉ axe
  // `variant: 'rail'` (filet accent 3px à gauche + retrait éditorial), DÉBLOQUÉ (w-p29-v2) :
  // PresetProps.variant expose désormais 'rail' (widening orchestrateur). Le rail est scopé
  // [data-variant='rail'] côté composant → combinable avec chaque fond. background n'admet pas
  // 'accent' (enum paper|paper-2|paper-3|ink) → pas de preset accent ici.
  'branded-callout': [
    { id: 'branded-callout--paper-2', type: 'branded-callout', label: 'Encadré marque · fond papier 2', family: 'cta', era: '2021', props: { background: 'paper-2' } },
    { id: 'branded-callout--paper-3', type: 'branded-callout', label: 'Encadré marque · fond papier 3', family: 'cta', era: '2022', props: { background: 'paper-3' } },
    { id: 'branded-callout--ink', type: 'branded-callout', label: 'Encadré marque · fond encre', family: 'cta', era: '2024', props: { background: 'ink' } },
    { id: 'branded-callout--rail', type: 'branded-callout', label: 'Encadré marque · filet accent à gauche', family: 'cta', era: '2025', props: { variant: 'rail' } },
    { id: 'branded-callout--rail-paper-3', type: 'branded-callout', label: 'Encadré marque · filet accent · fond papier 3', family: 'cta', era: '2026', props: { variant: 'rail', background: 'paper-3' } },
    { id: 'branded-callout--rail-ink', type: 'branded-callout', label: 'Encadré marque · filet accent · fond encre', family: 'cta', era: '2026', props: { variant: 'rail', background: 'ink' } },
  ],

  // newsletter-band (famille newsletter) · bande d'inscription · défaut = bande sombre (idiome ink).
  // Presets = déclinaisons claires (l'inverse chromatique du défaut).
  'newsletter-band': [
    { id: 'newsletter-band--paper', type: 'newsletter-band', label: 'Bande newsletter · fond papier', family: 'newsletter', era: '2022', props: { background: 'paper' } },
    { id: 'newsletter-band--paper-2', type: 'newsletter-band', label: 'Bande newsletter · fond papier 2', family: 'newsletter', era: '2023', props: { background: 'paper-2' } },
    { id: 'newsletter-band--paper-3', type: 'newsletter-band', label: 'Bande newsletter · fond papier 3', family: 'newsletter', era: '2025', props: { background: 'paper-3' } },
  ],

  // newsletter-signup-section (famille newsletter) · section d'inscription pleine · demo ink.
  'newsletter-signup-section': [
    { id: 'newsletter-signup-section--paper', type: 'newsletter-signup-section', label: 'Inscription newsletter · fond papier', family: 'newsletter', era: '2021', props: { background: 'paper' } },
    { id: 'newsletter-signup-section--paper-2', type: 'newsletter-signup-section', label: 'Inscription newsletter · fond papier 2', family: 'newsletter', era: '2023', props: { background: 'paper-2' } },
    { id: 'newsletter-signup-section--paper-3', type: 'newsletter-signup-section', label: 'Inscription newsletter · fond papier 3', family: 'newsletter', era: '2024', props: { background: 'paper-3' } },
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

  // diagnostic-stages (famille process-steps) · Vague C Batch 5 : recettes layout (grid-steps /
  // vertical-stack / numbered-rows) + density + contentAlign + placement. Le relevé « current »
  // (« vous êtes ici ») est préservé dans chaque recette.
  'diagnostic-stages': [
    { id: 'diagnostic-stages--paper-2', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades · papier 2', family: 'process-steps', era: '2024', props: { background: 'paper-2' } },
    { id: 'diagnostic-stages--ink', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades · encre', family: 'process-steps', era: '2026', props: { background: 'ink' } },
    { id: 'diagnostic-stages--grid-steps-3', type: 'diagnostic-stages', label: 'Auto-diagnostic · grille 3 colonnes', family: 'process-steps', era: '2024', props: { layout: 'grid-steps', columns: '3' } },
    { id: 'diagnostic-stages--grid-steps-2', type: 'diagnostic-stages', label: 'Auto-diagnostic · grille 2 colonnes', family: 'process-steps', era: '2024', props: { layout: 'grid-steps', columns: '2' } },
    { id: 'diagnostic-stages--grid-steps-4', type: 'diagnostic-stages', label: 'Auto-diagnostic · grille 4 colonnes', family: 'process-steps', era: '2025', props: { layout: 'grid-steps', columns: '4' } },
    { id: 'diagnostic-stages--vertical-stack', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades empilés', family: 'process-steps', era: '2025', props: { layout: 'vertical-stack' } },
    { id: 'diagnostic-stages--numbered-rows', type: 'diagnostic-stages', label: 'Auto-diagnostic · lignes numérotées', family: 'process-steps', era: '2025', props: { layout: 'numbered-rows' } },
    { id: 'diagnostic-stages--vertical-stack-ink', type: 'diagnostic-stages', label: 'Auto-diagnostic · stades empilés · encre', family: 'process-steps', era: '2026', props: { layout: 'vertical-stack', background: 'ink' } },
    { id: 'diagnostic-stages--numbered-rows-compact', type: 'diagnostic-stages', label: 'Auto-diagnostic · lignes · compact', family: 'process-steps', era: '2026', props: { layout: 'numbered-rows', density: 'compact' } },
    { id: 'diagnostic-stages--head-center', type: 'diagnostic-stages', label: 'Auto-diagnostic · header centré', family: 'process-steps', era: '2026', props: { layout: 'grid-steps', columns: '3', contentAlign: 'center' } },
    { id: 'diagnostic-stages--atomic-head-hide-mobile', type: 'diagnostic-stages', label: 'Auto-diagnostic · header masqué mobile (atomique)', family: 'process-steps', era: '2026', props: { layout: 'grid-steps', columns: '3', placement: { header: { hideOn: 'mobile' } } } },
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
    // ── Vague C · Scale (Batch 4) · layout + proportion + density + contentAlign + atomic ──
    { id: 'comparison-duo--inline-1-2', type: 'comparison-duo', label: 'Comparatif duo · côte à côte · carte « avec » dominante 1/2', family: 'duo', era: '2026', props: { layout: 'inline', proportion: '1-2' } },
    { id: 'comparison-duo--inline-2-1', type: 'comparison-duo', label: 'Comparatif duo · côte à côte · carte « sans » dominante 2/1', family: 'duo', era: '2026', props: { layout: 'inline', proportion: '2-1' } },
    { id: 'comparison-duo--stacked', type: 'comparison-duo', label: 'Comparatif duo · empilé (sans puis avec)', family: 'duo', era: '2026', props: { layout: 'stacked' } },
    { id: 'comparison-duo--inline-compact', type: 'comparison-duo', label: 'Comparatif duo · côte à côte · compact', family: 'duo', era: '2026', props: { layout: 'inline', density: 'compact' } },
    { id: 'comparison-duo--ink-ample-center', type: 'comparison-duo', label: 'Comparatif duo · encre · ample · en-tête centré', family: 'duo', era: '2026', props: { background: 'ink', density: 'ample', contentAlign: 'center' } },
    { id: 'comparison-duo--atomic-header-center', type: 'comparison-duo', label: 'Comparatif duo · atomique · en-tête centré', family: 'duo', era: '2026', props: { placement: { header: { align: 'center' } } } },
  ],

  // architecture-diagram (famille split-media) :figure signature ; axe sûr = background.
  'architecture-diagram': [
    { id: 'architecture-diagram--paper', type: 'architecture-diagram', label: 'Diagramme archi · papier', family: 'split-media', era: '2022', props: { background: 'paper' } },
    { id: 'architecture-diagram--paper-2', type: 'architecture-diagram', label: 'Diagramme archi · papier 2', family: 'split-media', era: '2023', props: { background: 'paper-2' } },
    { id: 'architecture-diagram--paper-3', type: 'architecture-diagram', label: 'Diagramme archi · papier 3', family: 'split-media', era: '2024', props: { background: 'paper-3' } },
    { id: 'architecture-diagram--ink', type: 'architecture-diagram', label: 'Diagramme archi · encre', family: 'split-media', era: '2026', props: { background: 'ink' } },
    // ── Vague C · Scale (Batch 4) · layout split + proportion + density + contentAlign + atomic ──
    { id: 'architecture-diagram--split-2-3', type: 'architecture-diagram', label: 'Diagramme archi · split · en-tête gauche · schéma dominant 2/3', family: 'split-media', era: '2026', props: { layout: 'split', proportion: '2-3' } },
    { id: 'architecture-diagram--split-1-1', type: 'architecture-diagram', label: 'Diagramme archi · split · colonnes égales', family: 'split-media', era: '2026', props: { layout: 'split', proportion: '1-1' } },
    { id: 'architecture-diagram--split-2-1', type: 'architecture-diagram', label: 'Diagramme archi · split · en-tête dominant 2/1', family: 'split-media', era: '2026', props: { layout: 'split', proportion: '2-1' } },
    { id: 'architecture-diagram--split-ink-ample', type: 'architecture-diagram', label: 'Diagramme archi · split · encre · ample', family: 'split-media', era: '2026', props: { layout: 'split', background: 'ink', density: 'ample' } },
    { id: 'architecture-diagram--stacked-center', type: 'architecture-diagram', label: 'Diagramme archi · empilé · en-tête centré', family: 'split-media', era: '2026', props: { layout: 'stacked', contentAlign: 'center' } },
    { id: 'architecture-diagram--atomic-header-end', type: 'architecture-diagram', label: 'Diagramme archi · atomique · en-tête aligné à droite', family: 'split-media', era: '2026', props: { placement: { header: { align: 'end' } } } },
  ],

  // method-stepline (famille timeline) · Vague C Batch 5 : recettes layout (horizontal défaut /
  // vertical-stack / numbered-rows / grid-steps) + density + contentAlign + placement. La
  // numérotation 00..N dérivée et le disque accent restent alignés dans chaque recette.
  'method-stepline': [
    { id: 'method-stepline--paper', type: 'method-stepline', label: 'Méthode · ligne d étapes · papier', family: 'timeline', era: '2023', props: { background: 'paper' } },
    { id: 'method-stepline--ink', type: 'method-stepline', label: 'Méthode · ligne d étapes · encre', family: 'timeline', era: '2026', props: { background: 'ink' } },
    { id: 'method-stepline--vertical-stack', type: 'method-stepline', label: 'Méthode · rail vertical', family: 'timeline', era: '2024', props: { layout: 'vertical-stack' } },
    { id: 'method-stepline--numbered-rows', type: 'method-stepline', label: 'Méthode · lignes numérotées', family: 'timeline', era: '2024', props: { layout: 'numbered-rows' } },
    { id: 'method-stepline--grid-steps-auto', type: 'method-stepline', label: 'Méthode · cartes en grille (auto)', family: 'timeline', era: '2025', props: { layout: 'grid-steps', columns: 'auto' } },
    { id: 'method-stepline--grid-steps-3', type: 'method-stepline', label: 'Méthode · cartes en grille (3 col.)', family: 'timeline', era: '2025', props: { layout: 'grid-steps', columns: '3' } },
    { id: 'method-stepline--grid-steps-2', type: 'method-stepline', label: 'Méthode · cartes en grille (2 col.)', family: 'timeline', era: '2025', props: { layout: 'grid-steps', columns: '2' } },
    { id: 'method-stepline--vertical-stack-ink', type: 'method-stepline', label: 'Méthode · rail vertical · encre', family: 'timeline', era: '2026', props: { layout: 'vertical-stack', background: 'ink' } },
    { id: 'method-stepline--numbered-rows-ample', type: 'method-stepline', label: 'Méthode · lignes numérotées · aéré', family: 'timeline', era: '2026', props: { layout: 'numbered-rows', density: 'ample' } },
    { id: 'method-stepline--head-center', type: 'method-stepline', label: 'Méthode · header centré', family: 'timeline', era: '2026', props: { layout: 'grid-steps', columns: '3', contentAlign: 'center' } },
    { id: 'method-stepline--atomic-body-first', type: 'method-stepline', label: 'Méthode · étapes avant header (atomique)', family: 'timeline', era: '2026', props: { layout: 'numbered-rows', placement: { header: { order: 1 }, body: { order: 0 } } } },
  ],

  // system-flow (famille flow) · Vague C Batch 5 : recettes layout (diagram défaut / horizontal /
  // vertical-stack) + density + contentAlign + placement. Flèches/boucle alignées dans chaque recette.
  'system-flow': [
    { id: 'system-flow--ink', type: 'system-flow', label: 'Flux système · encre', family: 'process-steps', era: '2026', props: { background: 'ink' } },
    { id: 'system-flow--diagram', type: 'system-flow', label: 'Flux système · diagramme horizontal', family: 'process-steps', era: '2024', props: { layout: 'diagram' } },
    { id: 'system-flow--horizontal', type: 'system-flow', label: 'Flux système · rail scrollable', family: 'process-steps', era: '2025', props: { layout: 'horizontal' } },
    { id: 'system-flow--vertical-stack', type: 'system-flow', label: 'Flux système · étapes empilées', family: 'process-steps', era: '2025', props: { layout: 'vertical-stack' } },
    { id: 'system-flow--vertical-stack-ample', type: 'system-flow', label: 'Flux système · empilé · aéré', family: 'process-steps', era: '2026', props: { layout: 'vertical-stack', density: 'ample' } },
    { id: 'system-flow--diagram-compact', type: 'system-flow', label: 'Flux système · diagramme · compact', family: 'process-steps', era: '2026', props: { layout: 'diagram', density: 'compact' } },
    { id: 'system-flow--head-center', type: 'system-flow', label: 'Flux système · header centré', family: 'process-steps', era: '2026', props: { layout: 'horizontal', contentAlign: 'center' } },
    { id: 'system-flow--head-end', type: 'system-flow', label: 'Flux système · en-tête aligné à droite', family: 'process-steps', era: '2026', props: { layout: 'diagram', placement: { header: { align: 'end' } } } },
    { id: 'system-flow--atomic-flow-hide-mobile', type: 'system-flow', label: 'Flux système · cartes masquées mobile (atomique)', family: 'process-steps', era: '2026', props: { layout: 'horizontal', placement: { body: { hideOn: 'mobile' } } } },
  ],

  // (system-flow presets consolidés plus haut · Vague C Batch 5)

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
    // ── Batch 3 · VOCABULAIRE DE LAYOUT (recettes ajoutées) + itemHeight + density + atomique. ──
    { id: 'media-bento--bento-feature', type: 'media-bento', label: 'Bento média · tuile vedette 2×2', family: 'scroll-interactive', era: '2026', props: { background: 'paper', layout: 'bento-feature' } },
    { id: 'media-bento--matrix-2x2', type: 'media-bento', label: 'Bento média · matrice 2×2 carrée', family: 'scroll-interactive', era: '2026', props: { background: 'paper', layout: 'matrix-2x2' } },
    { id: 'media-bento--matrix-3x3', type: 'media-bento', label: 'Bento média · matrice 3×3 carrée', family: 'scroll-interactive', era: '2026', props: { background: 'paper', layout: 'matrix-3x3' } },
    { id: 'media-bento--grid-uniform-3', type: 'media-bento', label: 'Bento média · grille uniforme 3 colonnes', family: 'scroll-interactive', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3' } },
    { id: 'media-bento--grid-uniform-video', type: 'media-bento', label: 'Bento média · grille uniforme · format 16/9', family: 'scroll-interactive', era: '2026', props: { background: 'paper-2', layout: 'grid-uniform', columns: '3', itemHeight: 'video' } },
    { id: 'media-bento--quad-square', type: 'media-bento', label: 'Bento média · quadrillage · vignettes carrées', family: 'scroll-interactive', era: '2026', props: { background: 'paper', layout: 'quad', itemHeight: 'square' } },
    { id: 'media-bento--mosaic-ample', type: 'media-bento', label: 'Bento média · mosaïque · aérée', family: 'scroll-interactive', era: '2026', props: { background: 'paper', layout: 'mosaic', density: 'ample' } },
    { id: 'media-bento--atomic-header-center', type: 'media-bento', label: 'Bento média · en-tête centré (atomique)', family: 'scroll-interactive', era: '2026', props: { background: 'paper', layout: 'grid-uniform', columns: '3', placement: { header: { align: 'center' } } } },
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

  // ══════════════════════════════════════════════════════════════════════════
  // CATÉGORIE « Testimonials » (P2.9 pilote, 2026-07-19) — famille preuve/quote.
  // Axes RÉELS honorés par chaque composant (vérifiés schéma + .astro) :
  //   testimonial-wall            → background(4) × columns(2|3|4) × rating(on/off)
  //   testimonial-block           → background(4)   [layout data-* en double quote, non moissonné par le gate → non exposé]
  //   testimonial-single-spotlight→ background(4) × portrait_src(on/off) × logo_src(on/off)
  //   testimonial-metrics         → background(4) × variant(quote-left|quote-right)
  //   testimonial-logo-metric     → background(4)
  //   quote-spotlight             → background {paper|paper-3|ink} (pas de règle CSS paper-2 → = paper)
  //   pull-quote-block            → background(4) × variant(breakout|inline|centered)
  // Contenu = décliné de la demo du type (0 fausse marque, 0 chiffre inventé) ; les toggles
  // masquent des atomes (rating/portrait/logo) sans introduire de contenu neuf.
  // ══════════════════════════════════════════════════════════════════════════

  'testimonial-wall': [
    { id: 'testimonial-wall--dense-4-paper', type: 'testimonial-wall', label: 'Mur d’avis · dense quatre colonnes · papier', family: 'quote', era: '2024', props: { background: 'paper', columns: '4' } },
    { id: 'testimonial-wall--editorial-2-paper-2', type: 'testimonial-wall', label: 'Mur d’avis · colonnes larges éditoriales · papier 2', family: 'quote', era: '2021', props: { background: 'paper-2', columns: '2' } },
    { id: 'testimonial-wall--balanced-3-paper-3', type: 'testimonial-wall', label: 'Mur d’avis · équilibré trois colonnes · papier 3', family: 'quote', era: '2022', props: { background: 'paper-3', columns: '3' } },
    { id: 'testimonial-wall--spotlight-2-ink', type: 'testimonial-wall', label: 'Mur d’avis · colonnes larges · encre', family: 'quote', era: '2026', props: { background: 'ink', columns: '2' } },
    { id: 'testimonial-wall--dense-4-ink', type: 'testimonial-wall', label: 'Mur d’avis · dense quatre colonnes · encre', family: 'quote', era: '2026', props: { background: 'ink', columns: '4' } },
    { id: 'testimonial-wall--norating-3-paper', type: 'testimonial-wall', label: 'Mur d’avis · sans bandeau de note · papier', family: 'quote', era: '2023', props: { background: 'paper', columns: '3', rating: undefined } },
    { id: 'testimonial-wall--norating-4-paper-2', type: 'testimonial-wall', label: 'Mur d’avis · dense sans note · papier 2', family: 'quote', era: '2024', props: { background: 'paper-2', columns: '4', rating: undefined } },
    { id: 'testimonial-wall--norating-2-ink', type: 'testimonial-wall', label: 'Mur d’avis · colonnes larges sans note · encre', family: 'quote', era: '2026', props: { background: 'ink', columns: '2', rating: undefined } },
    { id: 'testimonial-wall--rating-3-paper', type: 'testimonial-wall', label: 'Mur d’avis · note en avant · papier', family: 'quote', era: '2020', props: { background: 'paper', columns: '3' } },
  ],

  'testimonial-block': [
    { id: 'testimonial-block--paper', type: 'testimonial-block', label: 'Bloc témoignages · papier', family: 'quote', era: '2019', props: { background: 'paper' } },
    { id: 'testimonial-block--paper-2', type: 'testimonial-block', label: 'Bloc témoignages · papier 2', family: 'quote', era: '2021', props: { background: 'paper-2' } },
    { id: 'testimonial-block--paper-3', type: 'testimonial-block', label: 'Bloc témoignages · papier 3', family: 'quote', era: '2023', props: { background: 'paper-3' } },
    { id: 'testimonial-block--ink', type: 'testimonial-block', label: 'Bloc témoignages · encre', family: 'quote', era: '2026', props: { background: 'ink' } },
  ],

  'testimonial-single-spotlight': [
    { id: 'testimonial-single-spotlight--full-ink', type: 'testimonial-single-spotlight', label: 'Spot témoignage · portrait + logo · encre', family: 'quote', era: '2026', props: { background: 'ink' } },
    { id: 'testimonial-single-spotlight--full-paper', type: 'testimonial-single-spotlight', label: 'Spot témoignage · portrait + logo · papier', family: 'quote', era: '2022', props: { background: 'paper' } },
    { id: 'testimonial-single-spotlight--full-paper-2', type: 'testimonial-single-spotlight', label: 'Spot témoignage · portrait + logo · papier 2', family: 'quote', era: '2023', props: { background: 'paper-2' } },
    { id: 'testimonial-single-spotlight--portrait-only-paper', type: 'testimonial-single-spotlight', label: 'Spot témoignage · portrait sans logo · papier', family: 'quote', era: '2021', props: { background: 'paper', logo_src: undefined } },
    { id: 'testimonial-single-spotlight--portrait-only-ink', type: 'testimonial-single-spotlight', label: 'Spot témoignage · portrait sans logo · encre', family: 'quote', era: '2026', props: { background: 'ink', logo_src: undefined } },
    { id: 'testimonial-single-spotlight--logo-only-paper-2', type: 'testimonial-single-spotlight', label: 'Spot témoignage · logo sans portrait · papier 2', family: 'quote', era: '2024', props: { background: 'paper-2', portrait_src: undefined } },
    { id: 'testimonial-single-spotlight--bare-paper-3', type: 'testimonial-single-spotlight', label: 'Spot témoignage · sans portrait ni logo · papier 3', family: 'quote', era: '2020', props: { background: 'paper-3', portrait_src: undefined, logo_src: undefined } },
    { id: 'testimonial-single-spotlight--bare-ink', type: 'testimonial-single-spotlight', label: 'Spot témoignage · sans portrait ni logo · encre', family: 'quote', era: '2026', props: { background: 'ink', portrait_src: undefined, logo_src: undefined } },
  ],

  'testimonial-metrics': [
    { id: 'testimonial-metrics--quote-left-ink', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à gauche · encre', family: 'quote', era: '2026', props: { background: 'ink', variant: 'quote-left' } },
    { id: 'testimonial-metrics--quote-left-paper', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à gauche · papier', family: 'quote', era: '2022', props: { background: 'paper', variant: 'quote-left' } },
    { id: 'testimonial-metrics--quote-left-paper-2', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à gauche · papier 2', family: 'quote', era: '2023', props: { background: 'paper-2', variant: 'quote-left' } },
    { id: 'testimonial-metrics--quote-right-ink', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à droite · encre', family: 'quote', era: '2026', props: { background: 'ink', variant: 'quote-right' } },
    { id: 'testimonial-metrics--quote-right-paper', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à droite · papier', family: 'quote', era: '2021', props: { background: 'paper', variant: 'quote-right' } },
    { id: 'testimonial-metrics--quote-right-paper-3', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à droite · papier 3', family: 'quote', era: '2024', props: { background: 'paper-3', variant: 'quote-right' } },
    { id: 'testimonial-metrics--quote-left-paper-3', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à gauche · papier 3', family: 'quote', era: '2025', props: { background: 'paper-3', variant: 'quote-left' } },
    { id: 'testimonial-metrics--quote-right-paper-2', type: 'testimonial-metrics', label: 'Témoignage chiffré · citation à droite · papier 2', family: 'quote', era: '2023', props: { background: 'paper-2', variant: 'quote-right' } },
  ],

  'testimonial-logo-metric': [
    { id: 'testimonial-logo-metric--paper', type: 'testimonial-logo-metric', label: 'Cartes logo + métrique · papier', family: 'quote', era: '2021', props: { background: 'paper' } },
    { id: 'testimonial-logo-metric--paper-2', type: 'testimonial-logo-metric', label: 'Cartes logo + métrique · papier 2', family: 'quote', era: '2023', props: { background: 'paper-2' } },
    { id: 'testimonial-logo-metric--paper-3', type: 'testimonial-logo-metric', label: 'Cartes logo + métrique · papier 3', family: 'quote', era: '2024', props: { background: 'paper-3' } },
    { id: 'testimonial-logo-metric--ink', type: 'testimonial-logo-metric', label: 'Cartes logo + métrique · encre', family: 'quote', era: '2026', props: { background: 'ink' } },
  ],

  'quote-spotlight': [
    { id: 'quote-spotlight--paper', type: 'quote-spotlight', label: 'Citation à la une · papier', family: 'quote', era: '2018', props: { background: 'paper' } },
    { id: 'quote-spotlight--paper-3', type: 'quote-spotlight', label: 'Citation à la une · papier 3', family: 'quote', era: '2022', props: { background: 'paper-3' } },
    { id: 'quote-spotlight--ink', type: 'quote-spotlight', label: 'Citation à la une · encre', family: 'quote', era: '2026', props: { background: 'ink' } },
  ],

  'pull-quote-block': [
    { id: 'pull-quote-block--centered-paper', type: 'pull-quote-block', label: 'Citation détachée · centrée · papier', family: 'quote', era: '2019', props: { background: 'paper', variant: 'centered' } },
    { id: 'pull-quote-block--centered-ink', type: 'pull-quote-block', label: 'Citation détachée · centrée · encre', family: 'quote', era: '2026', props: { background: 'ink', variant: 'centered' } },
    { id: 'pull-quote-block--centered-paper-3', type: 'pull-quote-block', label: 'Citation détachée · centrée · papier 3', family: 'quote', era: '2022', props: { background: 'paper-3', variant: 'centered' } },
    { id: 'pull-quote-block--inline-paper', type: 'pull-quote-block', label: 'Citation détachée · filet en ligne · papier', family: 'quote', era: '2020', props: { background: 'paper', variant: 'inline' } },
    { id: 'pull-quote-block--inline-paper-3', type: 'pull-quote-block', label: 'Citation détachée · filet en ligne · papier 3', family: 'quote', era: '2024', props: { background: 'paper-3', variant: 'inline' } },
    { id: 'pull-quote-block--inline-ink', type: 'pull-quote-block', label: 'Citation détachée · filet en ligne · encre', family: 'quote', era: '2026', props: { background: 'ink', variant: 'inline' } },
  ],

  // ══════════════════════════════════════════════════════════════════════════════════════
  // CATÉGORIE « STATS / PREUVES CHIFFRÉES » (fan-out P2.9 w-p29-v2) · presets curés.
  // Périmètre = types dont la substance est le CHIFFRE (categorySlug stats-sections + terminal
  // chiffré). Axes RÉELS audités par lecture schema + .astro (data-bg / data-* / --var) :
  //   • key-metric-grid : density + columns(2-4) + size(sm|md|lg|hero) + align. RICHE.
  //     Axe `variant`(default|inverted|accent) TYPE-BLOQUÉ (PresetProps.variant = union fermée sans
  //     inverted/accent) → à promouvoir côté orchestrateur avant curation (rule 60, 0 cast local).
  //     Axe `background:'ink'` COMPOSANT-BLOQUÉ (rejeté GF-1 w-p29-v2) : l'atome KeyMetric n'inverse
  //     PAS la couleur de la VALEUR sur fond encre → chiffre dark-on-dark invisible (labels/deltas OK).
  //     À débloquer par CSS composant (.key-metric-grid[data-bg='ink'] .value → var(--paper)) hors scope.
  //   • metric-callout-band : background (défaut ink) → mono-axe, déclinaisons claires.
  //   • metric-shift : background (défaut paper) → mono-axe.
  //   • proof-bar : background + layout(horizontal|vertical-stack).
  //   • stat-block : background + layout(grid-3|grid-4|rows-hairlines|split-quote). Demo = ink+split-quote.
  //   • stat-counter : background (défaut ink). `animate` = axe MOTION-ONLY (valeur finale rendue en
  //     SSR → identique en screenshot statique) → non curé (non vérifiable GF-1, rule 33).
  //   • terminal-metrics-strip : background (paper|paper-2|ink, défaut paper) → mono-axe.
  // EXCLUS du périmètre : stats-bento + logo-marquee + testimonial-metrics + testimonial-logo-metric
  // (déjà curés) ; social-proof (logos, non chiffré) ; off-proof (famille quote/testimonial).

  // key-metric-grid (stat-grid) · grille de KPI éditoriale. Demo = paper·4col·lg·left.
  'key-metric-grid': [
    { id: 'key-metric-grid--paper-2', type: 'key-metric-grid', label: 'KPI clés · grille · fond papier 2', family: 'stat-grid', era: '2022', props: { background: 'paper-2' } },
    { id: 'key-metric-grid--paper-3', type: 'key-metric-grid', label: 'KPI clés · grille · fond papier 3', family: 'stat-grid', era: '2023', props: { background: 'paper-3' } },
    { id: 'key-metric-grid--3col', type: 'key-metric-grid', label: 'KPI clés · trois colonnes', family: 'stat-grid', era: '2024', props: { columns: '3' } },
    { id: 'key-metric-grid--2col-hero', type: 'key-metric-grid', label: 'KPI clés · deux colonnes · chiffres géants', family: 'stat-grid', era: '2025', props: { columns: '2', size: 'hero' } },
    { id: 'key-metric-grid--center', type: 'key-metric-grid', label: 'KPI clés · alignés au centre', family: 'stat-grid', era: '2024', props: { align: 'center' } },
    { id: 'key-metric-grid--hero-center-paper-2', type: 'key-metric-grid', label: 'KPI clés · chiffres géants centrés · papier 2', family: 'stat-grid', era: '2026', props: { background: 'paper-2', size: 'hero', align: 'center' } },
    { id: 'key-metric-grid--compact-3col-paper-2', type: 'key-metric-grid', label: 'KPI clés · trois colonnes · dense · papier 2', family: 'stat-grid', era: '2026', props: { background: 'paper-2', columns: '3', density: 'compact' } },
    { id: 'key-metric-grid--ink', type: 'key-metric-grid', label: 'KPI clés · grille · encre', family: 'stat-grid', era: '2026', props: { background: 'ink', variant: 'inverted' } },
    { id: 'key-metric-grid--ink-hero-center', type: 'key-metric-grid', label: 'KPI clés · chiffres géants centrés · encre', family: 'stat-grid', era: '2026', props: { background: 'ink', size: 'hero', align: 'center', columns: '2', variant: 'inverted' } },
  ],

  // metric-callout-band (band) · bande d'impact 1-3 métriques. Demo = ink → déclinaisons claires.
  'metric-callout-band': [
    { id: 'metric-callout-band--paper', type: 'metric-callout-band', label: 'Bande impact · fond papier', family: 'band', era: '2022', props: { background: 'paper' } },
    { id: 'metric-callout-band--paper-2', type: 'metric-callout-band', label: 'Bande impact · fond papier 2', family: 'band', era: '2023', props: { background: 'paper-2' } },
    { id: 'metric-callout-band--paper-3', type: 'metric-callout-band', label: 'Bande impact · fond papier 3', family: 'band', era: '2025', props: { background: 'paper-3' } },
  ],

  // metric-shift (stat-grid) · avant → après. Demo = paper → déclinaisons plus sombres.
  'metric-shift': [
    { id: 'metric-shift--paper-2', type: 'metric-shift', label: 'Avant → après · fond papier 2', family: 'stat-grid', era: '2023', props: { background: 'paper-2' } },
    { id: 'metric-shift--paper-3', type: 'metric-shift', label: 'Avant → après · fond papier 3', family: 'stat-grid', era: '2024', props: { background: 'paper-3' } },
    { id: 'metric-shift--ink', type: 'metric-shift', label: 'Avant → après · fond encre', family: 'stat-grid', era: '2026', props: { background: 'ink' } },
  ],

  // proof-bar (band) · barre de preuves chiffrées. Demo = paper·horizontal → 2 axes.
  'proof-bar': [
    { id: 'proof-bar--paper-2', type: 'proof-bar', label: 'Barre de preuves · fond papier 2', family: 'band', era: '2022', props: { background: 'paper-2' } },
    { id: 'proof-bar--paper-3', type: 'proof-bar', label: 'Barre de preuves · fond papier 3', family: 'band', era: '2023', props: { background: 'paper-3' } },
    { id: 'proof-bar--ink', type: 'proof-bar', label: 'Barre de preuves · fond encre', family: 'band', era: '2026', props: { background: 'ink' } },
    { id: 'proof-bar--vertical-stack', type: 'proof-bar', label: 'Barre de preuves · empilée verticale', family: 'band', era: '2024', props: { layout: 'vertical-stack' } },
    { id: 'proof-bar--vertical-stack-ink', type: 'proof-bar', label: 'Barre de preuves · empilée · encre', family: 'band', era: '2026', props: { layout: 'vertical-stack', background: 'ink' } },
  ],

  // stat-block (stat-grid) · bloc de stats. Demo = ink·split-quote → montrer les autres layouts + fonds clairs.
  'stat-block': [
    { id: 'stat-block--grid-3-paper', type: 'stat-block', label: 'Bloc stats · grille 3 · fond papier', family: 'stat-grid', era: '2022', props: { layout: 'grid-3', background: 'paper' } },
    { id: 'stat-block--grid-3-paper-3', type: 'stat-block', label: 'Bloc stats · grille 3 · fond papier 3', family: 'stat-grid', era: '2023', props: { layout: 'grid-3', background: 'paper-3' } },
    { id: 'stat-block--grid-4-paper-2', type: 'stat-block', label: 'Bloc stats · grille 4 · fond papier 2', family: 'stat-grid', era: '2024', props: { layout: 'grid-4', background: 'paper-2' } },
    { id: 'stat-block--grid-4-ink', type: 'stat-block', label: 'Bloc stats · grille 4 · fond encre', family: 'stat-grid', era: '2026', props: { layout: 'grid-4', background: 'ink' } },
    { id: 'stat-block--rows-hairlines-paper', type: 'stat-block', label: 'Bloc stats · lignes filets · fond papier', family: 'stat-grid', era: '2023', props: { layout: 'rows-hairlines', background: 'paper' } },
    { id: 'stat-block--rows-hairlines-ink', type: 'stat-block', label: 'Bloc stats · lignes filets · fond encre', family: 'stat-grid', era: '2026', props: { layout: 'rows-hairlines', background: 'ink' } },
    { id: 'stat-block--split-quote-paper', type: 'stat-block', label: 'Bloc stats · citation scindée · fond papier', family: 'stat-grid', era: '2025', props: { layout: 'split-quote', background: 'paper' } },
  ],

  // stat-counter (stat-grid) · compteurs count-up. Demo = ink → déclinaisons claires. animate = motion-only.
  'stat-counter': [
    { id: 'stat-counter--paper', type: 'stat-counter', label: 'Compteurs · fond papier', family: 'stat-grid', era: '2022', props: { background: 'paper' } },
    { id: 'stat-counter--paper-2', type: 'stat-counter', label: 'Compteurs · fond papier 2', family: 'stat-grid', era: '2023', props: { background: 'paper-2' } },
    { id: 'stat-counter--paper-3', type: 'stat-counter', label: 'Compteurs · fond papier 3', family: 'stat-grid', era: '2025', props: { background: 'paper-3' } },
  ],

  // terminal-metrics-strip (band) · bandeau télémétrie mono. Demo = paper (enum paper|paper-2|ink).
  'terminal-metrics-strip': [
    { id: 'terminal-metrics-strip--paper-2', type: 'terminal-metrics-strip', label: 'Bandeau télémétrie · fond papier 2', family: 'band', era: '2024', props: { background: 'paper-2' } },
    { id: 'terminal-metrics-strip--ink', type: 'terminal-metrics-strip', label: 'Bandeau télémétrie · fond encre', family: 'band', era: '2026', props: { background: 'ink' } },
  ],

  // ═══ Fan-out P2.9 vague 3 · catégorie FAQ / questions ═══
  // faq-accordion (accordion) · axes RENDUS = background (data-bg, 4 fonds) + open_first (ouvre item 1).
  'faq-accordion': [
    { id: 'faq-accordion--paper', type: 'faq-accordion', label: 'FAQ accordéon · papier', family: 'accordion', era: '2021', props: { background: 'paper' } },
    { id: 'faq-accordion--paper-2', type: 'faq-accordion', label: 'FAQ accordéon · papier 2', family: 'accordion', era: '2023', props: { background: 'paper-2' } },
    { id: 'faq-accordion--paper-3', type: 'faq-accordion', label: 'FAQ accordéon · papier 3', family: 'accordion', era: '2024', props: { background: 'paper-3' } },
    { id: 'faq-accordion--open-first', type: 'faq-accordion', label: 'FAQ accordéon · première réponse ouverte', family: 'accordion', era: '2025', props: { background: 'paper', open_first: true } },
    // NB : variantes `ink` écartées (GF-1) — le composant laisse le titre de question (span, color:var(--ink))
    // en dark-on-dark sur fond ink (override ink limité à :is(h2,h3,p)). Bug composant à corriger hors scope preset.
  ],
  // faq-cta-aside (accordion) · axes RENDUS = background + open_first. Demo fige paper-2 + open_first true →
  // poser explicitement dans chaque preset (le merge {...demo, ...props} n'écrase que les clés fournies).
  'faq-cta-aside': [
    { id: 'faq-cta-aside--paper', type: 'faq-cta-aside', label: 'FAQ + encart CTA · papier', family: 'accordion', era: '2022', props: { background: 'paper', open_first: true } },
    { id: 'faq-cta-aside--paper-2', type: 'faq-cta-aside', label: 'FAQ + encart CTA · papier 2', family: 'accordion', era: '2023', props: { background: 'paper-2', open_first: true } },
    { id: 'faq-cta-aside--paper-3', type: 'faq-cta-aside', label: 'FAQ + encart CTA · papier 3', family: 'accordion', era: '2024', props: { background: 'paper-3', open_first: true } },
    // NB : variante `ink` écartée (GF-1) — même bug dark-on-dark sur le titre de question (span) que faq-accordion.
    { id: 'faq-cta-aside--closed', type: 'faq-cta-aside', label: 'FAQ + encart CTA · tout replié', family: 'accordion', era: '2025', props: { background: 'paper-2', open_first: false } },
  ],

  // ═══ Fan-out P2.9 vague 3 · catégorie Process / méthode / étapes ═══
  // process-steps (process-steps) · axe RENDU = background (data-bg). Étapes verticales numérotées, connecteurs.
  'process-steps': [
    { id: 'process-steps--paper', type: 'process-steps', label: 'Étapes process · papier', family: 'process-steps', era: '2021', props: { background: 'paper' } },
    { id: 'process-steps--paper-2', type: 'process-steps', label: 'Étapes process · papier 2', family: 'process-steps', era: '2023', props: { background: 'paper-2' } },
    { id: 'process-steps--paper-3', type: 'process-steps', label: 'Étapes process · papier 3', family: 'process-steps', era: '2024', props: { background: 'paper-3' } },
    { id: 'process-steps--ink', type: 'process-steps', label: 'Étapes process · encre', family: 'process-steps', era: '2026', props: { background: 'ink' } },
  ],
  // journey-steps (process-steps) · axe RENDU = background (data-bg). Parcours icône+numéro, ligne connectrice.
  'journey-steps': [
    { id: 'journey-steps--paper', type: 'journey-steps', label: 'Parcours en étapes · papier', family: 'process-steps', era: '2022', props: { background: 'paper' } },
    { id: 'journey-steps--paper-2', type: 'journey-steps', label: 'Parcours en étapes · papier 2', family: 'process-steps', era: '2023', props: { background: 'paper-2' } },
    { id: 'journey-steps--paper-3', type: 'journey-steps', label: 'Parcours en étapes · papier 3', family: 'process-steps', era: '2024', props: { background: 'paper-3' } },
    { id: 'journey-steps--ink', type: 'journey-steps', label: 'Parcours en étapes · encre', family: 'process-steps', era: '2026', props: { background: 'ink' } },
  ],
  // steps-horizontal (timeline) · axe RENDU = background (data-bg). Étapes en rail horizontal, pastilles numérotées.
  'steps-horizontal': [
    { id: 'steps-horizontal--paper', type: 'steps-horizontal', label: 'Étapes horizontales · papier', family: 'timeline', era: '2022', props: { background: 'paper' } },
    { id: 'steps-horizontal--paper-2', type: 'steps-horizontal', label: 'Étapes horizontales · papier 2', family: 'timeline', era: '2023', props: { background: 'paper-2' } },
    { id: 'steps-horizontal--paper-3', type: 'steps-horizontal', label: 'Étapes horizontales · papier 3', family: 'timeline', era: '2024', props: { background: 'paper-3' } },
    // NB : variante `ink` écartée (GF-1) — titre d'étape (strong, color:var(--ink)) dark-on-dark sur fond ink.
  ],
  // numbered-layer-list (list) · axe RENDU = background (data-bg). Couches numérotées serif accent + sous-puces « → ».
  'numbered-layer-list': [
    { id: 'numbered-layer-list--paper', type: 'numbered-layer-list', label: 'Couches numérotées · papier', family: 'list', era: '2022', props: { background: 'paper' } },
    { id: 'numbered-layer-list--paper-2', type: 'numbered-layer-list', label: 'Couches numérotées · papier 2', family: 'list', era: '2023', props: { background: 'paper-2' } },
    { id: 'numbered-layer-list--paper-3', type: 'numbered-layer-list', label: 'Couches numérotées · papier 3', family: 'list', era: '2024', props: { background: 'paper-3' } },
    { id: 'numbered-layer-list--ink', type: 'numbered-layer-list', label: 'Couches numérotées · encre', family: 'list', era: '2026', props: { background: 'ink' } },
  ],
  // timeline-block (timeline) · axe RENDU = background (data-bg). Frise verticale datée (dates à gauche).
  'timeline-block': [
    { id: 'timeline-block--paper', type: 'timeline-block', label: 'Frise datée · papier', family: 'timeline', era: '2021', props: { background: 'paper' } },
    { id: 'timeline-block--paper-2', type: 'timeline-block', label: 'Frise datée · papier 2', family: 'timeline', era: '2023', props: { background: 'paper-2' } },
    { id: 'timeline-block--paper-3', type: 'timeline-block', label: 'Frise datée · papier 3', family: 'timeline', era: '2024', props: { background: 'paper-3' } },
    // NB : variante `ink` écartée (GF-1) — titre d'événement (strong, color:var(--ink)) dark-on-dark sur fond ink.
  ],
  // timeline-horizontal (timeline) · axe RENDU = background (data-bg). Roadmap horizontale à statuts, scroll-snap.
  'timeline-horizontal': [
    { id: 'timeline-horizontal--paper', type: 'timeline-horizontal', label: 'Roadmap horizontale · papier', family: 'timeline', era: '2023', props: { background: 'paper' } },
    { id: 'timeline-horizontal--paper-2', type: 'timeline-horizontal', label: 'Roadmap horizontale · papier 2', family: 'timeline', era: '2024', props: { background: 'paper-2' } },
    { id: 'timeline-horizontal--paper-3', type: 'timeline-horizontal', label: 'Roadmap horizontale · papier 3', family: 'timeline', era: '2025', props: { background: 'paper-3' } },
    { id: 'timeline-horizontal--ink', type: 'timeline-horizontal', label: 'Roadmap horizontale · encre', family: 'timeline', era: '2026', props: { background: 'ink' } },
  ],
  // editorial-timeline (timeline) · axes RENDUS = background (data-bg) + density (data-density compact/ample) +
  // orientation (v/h, atome Timeline) + numbered (bool). Demo = paper + vertical + numbered → poser explicitement.
  'editorial-timeline': [
    { id: 'editorial-timeline--paper', type: 'editorial-timeline', label: 'Frise éditoriale · papier', family: 'timeline', era: '2021', props: { background: 'paper' } },
    { id: 'editorial-timeline--paper-2', type: 'editorial-timeline', label: 'Frise éditoriale · papier 2', family: 'timeline', era: '2023', props: { background: 'paper-2' } },
    { id: 'editorial-timeline--paper-3', type: 'editorial-timeline', label: 'Frise éditoriale · papier 3', family: 'timeline', era: '2024', props: { background: 'paper-3' } },
    { id: 'editorial-timeline--horizontal', type: 'editorial-timeline', label: 'Frise éditoriale · horizontale', family: 'timeline', era: '2025', props: { background: 'paper', orientation: 'horizontal' } },
    { id: 'editorial-timeline--unnumbered', type: 'editorial-timeline', label: 'Frise éditoriale · sans numéros', family: 'timeline', era: '2024', props: { background: 'paper', numbered: false } },
    { id: 'editorial-timeline--compact', type: 'editorial-timeline', label: 'Frise éditoriale · dense', family: 'timeline', era: '2025', props: { background: 'paper', density: 'compact' } },
    { id: 'editorial-timeline--ample', type: 'editorial-timeline', label: 'Frise éditoriale · aérée', family: 'timeline', era: '2026', props: { background: 'paper', density: 'ample' } },
    // NB : variantes `ink` écartées (GF-1) — l'atome editorial/Timeline rend le titre d'événement
    // (.timeline-title, color:var(--ink)) sans override sous fond ink → dark-on-dark. Bug atome hors scope preset.
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

/** Origine d'une déclinaison : « curée » (preset écrit à la main) vs « générée » (variantsFor). */
export type DeclinaisonOrigin = 'curated' | 'generated';

/** Une déclinaison affichable (preset curé OU variante générée), avec son origine. */
export type Declinaison = {
  id: string;
  label: string;
  props: Record<string, unknown>;
  origin: DeclinaisonOrigin;
};

/** Listing des déclinaisons d'un type pour la fiche /library : compteurs + échantillon capé. */
export type DeclinaisonListing = {
  /** Déclinaisons à afficher : TOUTES les curées + les générées jusqu'au cap. */
  items: Declinaison[];
  /** Nombre de presets curés (manuels). */
  curatedCount: number;
  /** Nombre TOTAL de variantes générées (avant cap), après dédup vs curées. */
  generatedCount: number;
  /** curatedCount + generatedCount : le vrai total de déclinaisons du type. */
  total: number;
  /** Nombre de générées effectivement affichées (≤ cap). */
  generatedShown: number;
};

/** Cap d'affichage par défaut des variantes générées (poids de page / lisibilité, pas SSG). */
export const DEFAULT_GENERATED_CAP = 12;

/**
 * Déclinaisons EXHAUSTIVES d'un type = presets curés (listPresets) ∪ variantes générées
 * (variantsFor, mêmes que la route /preview). Comble l'angle mort « Déclinaisons · 0 » de la
 * fiche /library qui ne lisait que les presets manuels. Les générées sont capées (échantillon)
 * pour ne pas alourdir la fiche ; le compteur `total` reste exact. Dédup par id : un preset
 * curé l'emporte sur une variante générée de même id (parité avec /preview).
 */
export function listDeclinaisons(
  type: SectionType,
  opts: { generatedCap?: number } = {},
): DeclinaisonListing {
  const cap = opts.generatedCap ?? DEFAULT_GENERATED_CAP;
  const curated = listPresets(type);
  const curatedIds = new Set(curated.map((p) => p.id));
  const generatedAll = variantsFor(type).filter((v) => !curatedIds.has(v.id));

  const items: Declinaison[] = [
    ...curated.map((p) => ({
      id: p.id,
      label: p.label,
      props: p.props as Record<string, unknown>,
      origin: 'curated' as const,
    })),
    ...generatedAll.slice(0, cap).map((v) => ({
      id: v.id,
      label: v.label,
      props: v.props as Record<string, unknown>,
      origin: 'generated' as const,
    })),
  ];

  return {
    items,
    curatedCount: curated.length,
    generatedCount: generatedAll.length,
    total: curated.length + generatedAll.length,
    generatedShown: Math.min(generatedAll.length, cap),
  };
}
