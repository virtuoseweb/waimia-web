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
      ],
    },
  ],
  // split (feature-split-media, feature-zigzag) → 5 proportion × 2 side, élagué = 9
  split: [
    { prop: 'proportion', values: ['1-1', '1-2', '2-1', '2-3', '3-2'] },
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
      ],
    },
  ],
  // table (workflow-table, department-stack) → 5
  table: [
    {
      prop: 'layout',
      values: ['rows-divided', 'grid-steps', 'comparison-matrix', 'feature-check', 'spec-rows'],
    },
  ],
  // band (footer-cta-band) → 4 layout × 2 align = 8
  band: [
    { prop: 'layout', values: ['inline', 'stacked', 'centered', 'full-bleed'] },
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
      ],
    },
  ],
  // logos (logo-marquee) → 6
  logos: [
    {
      prop: 'layout',
      values: ['marquee', 'grid-uniform', 'grid-auto', 'rows-divided', 'bordered-grid', 'with-heading'],
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
      ],
    },
  ],
  // faq (faq-accordion, objection-handler) → 5
  faq: [
    {
      prop: 'layout',
      values: ['accordion-single', 'accordion-two-col', 'list-open', 'grid', 'with-aside-cta'],
    },
  ],
  // form (newsletter-band, form-panel) → 6
  form: [
    {
      prop: 'layout',
      values: ['single-col', 'two-col', 'inline', 'split-with-media', 'multi-step', 'boxed-card'],
    },
  ],
  // banner (annonces / bandeaux) → 4
  banner: [
    { prop: 'layout', values: ['thin-bar', 'with-cta', 'countdown', 'dismissible'] },
  ],
  // tabs (onglets) → 4
  tabs: [
    { prop: 'layout', values: ['horizontal-tabs', 'vertical-tabs', 'segmented', 'pills'] },
  ],
  // carousel (sliders) → 4
  carousel: [
    { prop: 'layout', values: ['slider', 'peek', 'fade', 'thumbnails'] },
  ],
  // timeline (timeline-block) → 5
  timeline: [
    {
      prop: 'layout',
      values: ['vertical-events', 'horizontal-events', 'alternating', 'milestone-rail', 'dated-list'],
    },
  ],
  // comparison (versus-competitors, comparison-table, comparison-duo) → 4
  comparison: [
    { prop: 'layout', values: ['two-col-versus', 'matrix', 'before-after', 'toggle'] },
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
};

const PROPORTION_LABEL: Record<string, string> = {
  '1-1': 'équilibré',
  '1-2': 'média dominant',
  '2-1': 'texte dominant',
  '2-3': 'média large',
  '3-2': 'texte large',
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
    { prop: 'proportion', values: ['1-1', '1-2', '2-1', '2-3', '3-2'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'headerKind', values: ['none', 'title', 'eyebrow-title', 'eyebrow-title-lede'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'mediaFit', values: ['cover', 'contain'] },
    { prop: 'mediaRatio', values: ['auto', '1-1', '4-3', '16-9'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    { prop: 'hover', values: ['none', 'lift', 'media-zoom'] },
  ],
  bento: [
    { prop: 'layout', values: ['bento', 'bento-feature', 'mosaic', 'matrix-2x2', 'matrix-3x3', 'grid-uniform'] },
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
    { prop: 'layout', values: ['grid-auto', 'mosaic', 'masonry', 'matrix-3x3', 'featured-split'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'itemHeight', values: ['auto', 'even', 'square'] },
    { prop: 'cardMedia', values: ['image', 'image-bg'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    { prop: 'hover', values: ['none', 'media-zoom', 'zoom'] },
  ],
  table: [
    { prop: 'layout', values: ['rows-divided', 'grid-steps'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'dividers', values: ['none', 'row-rules', 'grid-lines'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  band: [
    { prop: 'layout', values: ['inline', 'stacked'] },
    { prop: 'align', values: ['start', 'center'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  hero: [
    { prop: 'layout', values: ['split', 'centered', 'masthead', 'funnel'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
    { prop: 'bgSource', values: ['color', 'image', 'gradient'] },
  ],
  logos: [
    { prop: 'layout', values: ['marquee', 'grid-uniform', 'grid-auto', 'rows-divided', 'bordered-grid', 'with-heading'] },
    { prop: 'columns', values: ['auto', '3', '4', '6'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  // ─── 12 nouveaux archétypes (mêmes layouts que STRUCTURAL_AXES + axes transverses honorés) ───
  stats: [
    { prop: 'layout', values: ['inline-row', 'grid-uniform', 'big-number-split', 'bento', 'with-context', 'ticker', 'comparison-pair'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  testimonial: [
    { prop: 'layout', values: ['single-quote', 'quote-grid', 'carousel', 'with-logos', 'avatar-row', 'big-quote', 'video-quote'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  pricing: [
    { prop: 'layout', values: ['tier-cards-3', 'tier-cards-2', 'single', 'comparison-matrix', 'toggle-billing', 'feature-checklist', 'highlighted-popular'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  faq: [
    { prop: 'layout', values: ['accordion-single', 'accordion-two-col', 'list-open', 'grid', 'with-aside-cta'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  form: [
    { prop: 'layout', values: ['single-col', 'two-col', 'inline', 'split-with-media', 'multi-step', 'boxed-card'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  banner: [
    { prop: 'layout', values: ['thin-bar', 'with-cta', 'countdown', 'dismissible'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  tabs: [
    { prop: 'layout', values: ['horizontal-tabs', 'vertical-tabs', 'segmented', 'pills'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  carousel: [
    { prop: 'layout', values: ['slider', 'peek', 'fade', 'thumbnails'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'columns', values: ['auto', '2', '3', '4'] },
    { prop: 'hover', values: ['none', 'lift', 'zoom'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  timeline: [
    { prop: 'layout', values: ['vertical-events', 'horizontal-events', 'alternating', 'milestone-rail', 'dated-list'] },
    { prop: 'headerAlign', values: ['left', 'center', 'right'] },
    { prop: 'density', values: ['compact', 'base', 'ample'] },
    { prop: 'colorScheme', values: COLOR_SCHEMES.map((s) => s.id) },
  ],
  comparison: [
    { prop: 'layout', values: ['two-col-versus', 'matrix', 'before-after', 'toggle'] },
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
