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
import { COLOR_SCHEMES, schemeProps, type ColorScheme } from './section-colorschemes';

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
  // collection (feature-grid, pricing-cards, case-card-grid, deliverables-grid) → 7
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
      ],
    },
  ],
  // split (feature-split-media, comparison-duo, feature-zigzag) → 5 proportion × 2 side, élagué = 9
  split: [
    { prop: 'proportion', values: ['1-1', '1-2', '2-1', '2-3', '3-2'] },
    { prop: 'mediaSide', values: ['left', 'right'] },
  ],
  // bento (bento-grid, stats-bento, media-bento) → 6
  bento: [
    {
      prop: 'layout',
      values: ['bento', 'bento-feature', 'mosaic', 'matrix-2x2', 'matrix-3x3', 'grid-uniform'],
    },
  ],
  // process (method-timeline, diagnostic-stages, system-flow, architecture-diagram) → 5
  process: [
    {
      prop: 'layout',
      values: ['vertical-stack', 'horizontal', 'numbered-rows', 'grid-steps', 'diagram'],
    },
  ],
  // editorial (definition-extract, pain-severity-list, statement-orbit, eeat-panel) → 5
  editorial: [
    {
      prop: 'layout',
      values: ['prose', 'two-col', 'list', 'rows-divided', 'lead-aside'],
    },
  ],
  // gallery (scroll-gallery, photo-cluster, horizontal-showcase, media-swap-band) → 5
  gallery: [
    {
      prop: 'layout',
      values: ['grid-auto', 'mosaic', 'masonry', 'matrix-3x3', 'featured-split'],
    },
  ],
  // table (versus-competitors, workflow-table, department-stack) → 2
  table: [{ prop: 'layout', values: ['rows-divided', 'grid-steps'] }],
  // band (footer-cta-band) → 2 layout × 2 align = 4
  band: [
    { prop: 'layout', values: ['inline', 'stacked'] },
    { prop: 'align', values: ['start', 'center'] },
  ],
  // hero (hero-split, hero-centered, hero-masthead-card, hero-conversion-funnel) → 4
  hero: [{ prop: 'layout', values: ['split', 'centered', 'masthead', 'funnel'] }],
  // logos (logo-marquee) → 4
  logos: [{ prop: 'layout', values: ['marquee', 'grid-uniform', 'grid-auto', 'rows-divided'] }],
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
