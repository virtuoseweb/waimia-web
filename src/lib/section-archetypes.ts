// Waimia · Section archetypes (Pilier 2 — système de production de sections)
// Source de vérité des BUNDLES DE DÉFAUTS de capacités par catégorie d'archétype.
//
// Modèle Webflow/Figma : UN seul contrat de variation (le mixin Zod partagé), des
// composants = presets de capacités. L'archétype donne les défauts (la plupart des
// collections partagent les mêmes leviers) ; un type surcharge ponctuellement via son
// descripteur registry (`capabilities`). `capabilitiesFor(type)` fusionne les deux.
//
// 0 duplication : on RÉUTILISE les unions de section-facets.ts (LayoutTag) et le
// SectionType du schéma ; on ne re-déclare aucun vocabulaire existant.

import type { SectionType } from '../schemas/sections';
import type { LayoutTag } from './section-facets';

/* ───────────────────────────── Archétypes (catégories de section) ───────────────────────────── */
// 10 archétypes = 10 classes de famille CSS du moteur (sec-<archetype>), cf section-layouts.css.
export type Archetype =
  | 'collection'
  | 'bento'
  | 'split'
  | 'process'
  | 'editorial'
  | 'table'
  | 'band'
  | 'hero'
  | 'logos'
  | 'gallery';

/* ───────────────────────────── Couches (les 6 du standard) ───────────────────────────── */
// LayerTag = quelle couche du mixin de variation un archétype câble réellement.
export type LayerTag =
  | 'layout' // couche 1 : recettes de layout (lexique)
  | 'placement' // couche 2 : placement atomique par région
  | 'axes' // couche 3 : axes de section (columns/proportion/density…)
  | 'skin' // couche 4 : surface/divider/radius/accentEdge
  | 'responsive' // couche 5 : colsMobile/colsTablet/layoutMobile
  | 'interaction'; // couche 6 : titleScale/eyebrow/reveal/hover

// Régions nommées (slots) qu'une section peut câbler.
export type RegionTag = 'header' | 'media' | 'body' | 'actions' | 'aside';

/* ───────────────────────────── Capabilities (la donnée, pas un contrat) ─────────────────────────────
 * Ce que le composant CÂBLE réellement = source de vérité pour builder/MCP/gate/UI :
 * quels knobs proposer, sans mentir. Le consommateur lit `capabilities`, jamais un
 * contrat divergent. `axes` = noms d'axes du standard (string borné, ex. 'columns',
 * 'proportion', 'density', 'colRatio', 'itemHeight', 'mediaSide'). `familyClass` = la
 * classe CSS de famille du moteur (sec-collection…) découlant de l'archétype. */
export interface Capabilities {
  layouts: LayoutTag[];
  regions: RegionTag[];
  axes: string[];
  layers: LayerTag[];
  familyClass: string;
}

// Les 4 couches transverses portées par presque tous les archétypes (skin/responsive/
// interaction + placement sont optionnelles et universelles via le mixin).
const COMMON_LAYERS: LayerTag[] = ['placement', 'skin', 'responsive', 'interaction'];

/* ───────────────────────────── Bundles de défauts par archétype ─────────────────────────────
 * Chaque entrée = les défauts de capacités de la catégorie. Cohérent avec le CONTRAT
 * PAR ARCHÉTYPE de tasks/wave-c-axes-standard.md (quel sous-ensemble du lexique câbler). */
export const ARCHETYPE_CAPABILITIES: Record<Archetype, Capabilities> = {
  // Grilles de cartes/items/stats/listes/accordéons : la catégorie la plus large.
  collection: {
    layouts: ['1-col', '2-col', '3-col', '4-col', 'multi-col', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'colRatio', 'itemHeight', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-collection',
  },
  // Spans mixtes + dense : hauteurs contrastées, structure pleine.
  bento: {
    layouts: ['bento', 'multi-col', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'itemHeight', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-bento',
  },
  // Média ↔ texte / duo de comparaison.
  split: {
    layouts: ['split', 'media-left', 'media-right', '2-col', '1-col'],
    regions: ['header', 'media', 'body', 'actions'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-split',
  },
  // Étapes / timeline / flow.
  process: {
    layouts: ['1-col', 'multi-col', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-process',
  },
  // Texte / manifeste / citation / points de douleur (1 colonne lisible, 2-col, lead-aside).
  editorial: {
    layouts: ['1-col', '2-col', 'centered'],
    regions: ['header', 'body', 'aside'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-editorial',
  },
  // Tables éditoriales / comparateurs.
  table: {
    layouts: ['1-col', 'multi-col'],
    regions: ['header', 'body'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-table',
  },
  // Bandes / CTA / panneaux de confiance (position bouton via contentAlign/actionsAlign).
  band: {
    layouts: ['centered', '1-col', '2-col', 'full-bleed'],
    regions: ['header', 'body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-band',
  },
  // Héros / mastheads / pyramides d'entête.
  hero: {
    layouts: ['centered', 'split', 'media-left', 'media-right', 'full-bleed', '1-col'],
    regions: ['header', 'media', 'body', 'actions', 'aside'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-hero',
  },
  // Murs de logos / marquees.
  logos: {
    layouts: ['multi-col', '3-col', '4-col', 'centered'],
    regions: ['header', 'body'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-logos',
  },
  // Galeries / médias (mosaic, masonry, scroll showcase).
  gallery: {
    layouts: ['bento', 'multi-col', '3-col', 'full-bleed', 'off-grid'],
    regions: ['header', 'media', 'body'],
    axes: ['columns', 'itemHeight', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS],
    familyClass: 'sec-gallery',
  },
};

/* ───────────────────────────── family (registry) → archétype ─────────────────────────────
 * Le `family` du SectionDescriptor (FamilyTag, 27 valeurs) projette sur l'un des 10
 * archétypes. Garde le mapping DRY : TYPE_ARCHETYPE ci-dessous est dérivé de la famille
 * de chaque type (cf section-registry.ts), donc on couvre les 199 types sans table à la
 * main. Source : familles réelles du registry (audit 2026-06-28). */
const FAMILY_ARCHETYPE: Record<string, Archetype> = {
  // collection
  'card-grid': 'collection',
  'stat-grid': 'collection',
  list: 'collection',
  accordion: 'collection',
  tabs: 'collection',
  'form-panel': 'collection',
  breadcrumb: 'collection',
  'terminal-shell': 'collection',
  // bento
  bento: 'bento',
  // split
  'split-media': 'split',
  duo: 'split',
  // process
  'process-steps': 'process',
  flow: 'process',
  timeline: 'process',
  // editorial
  prose: 'editorial',
  manifesto: 'editorial',
  quote: 'editorial',
  pain: 'editorial',
  eeat: 'editorial',
  // table
  table: 'table',
  // band
  band: 'band',
  // hero
  hero: 'hero',
  masthead: 'hero',
  pyramid: 'hero',
  // logos
  marquee: 'logos',
  // gallery
  gallery: 'gallery',
  'scroll-interactive': 'gallery',
};

/* ───────────────────────────── TYPE → archétype ─────────────────────────────
 * Mappe les types actifs (et au-delà). On laisse cette table EXPLICITE pour les types
 * dont l'archétype ne découle pas trivialement de la famille (overrides), et on fournit
 * une dérivation par famille pour le reste via `archetypeFor`. Au moins les ~32 types
 * actifs sont couverts ici ; le reste prend le défaut par famille (ou 'collection'). */
export const TYPE_ARCHETYPE: Partial<Record<SectionType, Archetype>> = {
  // Hero / mastheads (actifs prioritaires)
  'hero-home': 'hero',
  'hero-split': 'hero',
  'hero-split-media': 'hero',
  'hero-centered': 'hero',
  'hero-full-bleed': 'hero',
  'hero-offer-detail': 'hero',
  'hero-hub-stats': 'hero',
  'hero-tunnel-step': 'hero',
  'hero-atlas': 'hero',
  'masthead-bar': 'hero',
  'breadcrumb-bar': 'collection',

  // Collections (cartes / stats / listes)
  'feature-grid': 'collection',
  'services-grid': 'collection',
  'deliverables-grid': 'collection',
  'case-card-grid': 'collection',
  'case-featured-grid': 'collection',
  'team-card-grid': 'collection',
  'pricing-cards': 'collection',
  'use-case-index': 'collection',
  'pain-points': 'collection',
  'inclusions-list': 'collection',
  'stat-block': 'collection',
  'metric-shift': 'collection',

  // Bento
  'bento-grid': 'bento',
  'stats-bento': 'bento',

  // Split / duo
  'feature-zigzag': 'split',
  'feature-split-media': 'split',
  'architecture-diagram': 'split',
  'comparison-duo': 'split',

  // Process / timeline / flow
  'process-steps': 'process',
  'method-timeline': 'process',
  'how-we-ship': 'process',
  'timeline-block': 'process',
  'system-flow': 'process',
  'diagnostic-stages': 'process',

  // Editorial / manifeste / citation
  'manifesto-block': 'editorial',
  'statement-orbit': 'editorial',
  'editorial-prose': 'editorial',
  'definition-extract': 'editorial',
  'pain-severity-list': 'editorial',
  'pull-quote-block': 'editorial',
  'testimonial-block': 'editorial',

  // Tables
  'comparison-table': 'table',
  'versus-competitors': 'table',
  'pricing-table': 'table',
  'data-table': 'table',
  'workflow-table': 'table',
  'department-stack': 'table',

  // Bandes / CTA / FAQ / confiance
  'cta-final': 'band',
  'cta-band': 'band',
  'newsletter-band': 'band',
  'proof-bar': 'band',
  'spec-bar': 'band',
  'guarantee-block': 'band',
  'faq-accordion': 'collection',
  'objection-handler': 'collection',

  // Logos
  'logo-marquee': 'logos',
  'marquee-band': 'logos',
  'social-proof': 'band',
  'ecosystem-partners': 'collection',

  // Galerie
  'media-block': 'gallery',
  'scroll-gallery': 'gallery',
  'media-bento': 'gallery',
};

/**
 * Archétype effectif d'un type :
 *   1. override explicite TYPE_ARCHETYPE,
 *   2. sinon dérivation par sa famille registry (passée par le caller),
 *   3. défaut 'collection'.
 * Le paramètre `family` est optionnel : un caller qui connaît la famille (registry)
 * peut la passer pour une dérivation exacte sans gonfler TYPE_ARCHETYPE.
 */
export function archetypeFor(type: SectionType, family?: string): Archetype {
  const override = TYPE_ARCHETYPE[type];
  if (override) return override;
  if (family && FAMILY_ARCHETYPE[family]) return FAMILY_ARCHETYPE[family];
  return 'collection';
}

/**
 * Capacités effectives d'un type = bundle d'archétype, fusionné avec un éventuel
 * override partiel (fourni par le descripteur registry). Défaut 'collection' si non
 * mappé. Le merge est shallow par clé : un override ne remplace que les champs fournis,
 * conservant les défauts d'archétype pour le reste (adaptatif à l'unité).
 */
export function capabilitiesFor(
  type: SectionType,
  override?: Partial<Capabilities>,
  family?: string,
): Capabilities {
  const base = ARCHETYPE_CAPABILITIES[archetypeFor(type, family)];
  if (!override) return base;
  return {
    layouts: override.layouts ?? base.layouts,
    regions: override.regions ?? base.regions,
    axes: override.axes ?? base.axes,
    layers: override.layers ?? base.layers,
    familyClass: override.familyClass ?? base.familyClass,
  };
}
