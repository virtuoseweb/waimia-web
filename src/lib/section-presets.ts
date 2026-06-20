// Waimia · section-presets.ts — touchpoint PRESET du système de variation (Phase B, docs/46).
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
  /** Axe Variante du hero-conversion-funnel (squelette de rendu). */
  variant?: 'split' | 'sumie' | 'minimal';
  /** Axe Variante « registre média » du hero split (lineart vs editorial). */
  media_register?: 'lineart' | 'editorial';
  /** Média associé au registre (surcharge la demo pour exposer le preset). */
  media_src?: string;
  media_alt_fr?: string;
  media_alt_en?: string;
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
 * SECTION_PRESETS — catalogue des presets par type de section.
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
