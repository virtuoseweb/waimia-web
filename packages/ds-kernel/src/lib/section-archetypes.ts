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
// 40 archétypes. Les 10 premiers = 10 classes de famille CSS RENDUES du moteur
// (sec-<archetype>), cf section-layouts.css. Les 30 suivants (stats…events) réutilisent
// chacun une `familyClass` moteur EXISTANTE (recettes CSS dédiées = migration #46) : ils
// enrichissent le VOCABULAIRE de squelettes sans inventer de nouvelle famille CSS.
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
  | 'gallery'
  | 'stats'
  | 'testimonial'
  | 'pricing'
  | 'faq'
  | 'form'
  | 'banner'
  | 'tabs'
  | 'carousel'
  | 'timeline'
  | 'comparison'
  | 'nav'
  | 'footer'
  | 'blog'
  | 'people'
  | 'contact'
  | 'map'
  | 'toolbar'
  | 'callout'
  // ─── 12 nouveaux archétypes (vocabulaire enrichi, familyClass moteur existante) ───
  | 'pageheader'
  | 'richtext'
  | 'video'
  | 'product'
  | 'integrations'
  | 'divider'
  | 'breadcrumb'
  | 'errorstate'
  | 'consent'
  | 'modal'
  | 'jobs'
  | 'events';

/* ───────────────────────────── Couches (les 6 du standard) ───────────────────────────── */
// LayerTag = quelle couche du mixin de variation un archétype câble réellement.
export type LayerTag =
  | 'layout' // couche 1 : recettes de layout (lexique)
  | 'placement' // couche 2 : placement atomique par région
  | 'axes' // couche 3 : axes de section (columns/proportion/density…)
  | 'skin' // couche 4 : surface/divider/radius/accentEdge
  | 'responsive' // couche 5 : colsMobile/colsTablet/layoutMobile
  | 'interaction' // couche 6 : titleScale/eyebrow/reveal/hover
  // ─── Contrat v2 — couches NOW (tasks/wave-c-axes-standard.md) ───
  | 'grid-align' // L7 parent : justifyContent/alignItems/justifyItems/alignContent
  | 'cell-align' // L7 cellule : cellAlignX/Y, cellPad, mediaFit, mediaRatio
  | 'states' // L8 : hover/pressFeedback/focusRing/transitionSpeed-Ease (+selected/open réserve)
  | 'motion' // L9 : reveal/revealStagger/revealDelay/loop/scrollMotion/textMotion
  | 'color' // L10bis : cellBg/cellTone/tone/borderTone (couleur multi-scope)
  | 'orientation' // L11 : textFlow/textTransform/rotate/objectPosition/overflow/scrollSnap
  | 'typography' // L6 core : measure/balance/clamp
  | 'sizing' // L12 : minHeight/width (+ itemHeight)
  | 'a11y'; // L13 : headingLevel/ariaLabel

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

// Couches NOW transverses (contrat v2) portées par tout archétype : états, motion,
// couleur de rôle, typo core, a11y. Le câblage réel par composant suit (gate SYS-3).
const NOW_COMMON_LAYERS: LayerTag[] = ['states', 'motion', 'color', 'typography', 'a11y'];
// Couches NOW d'alignement (grille parent + cellule) : pour les archétypes qui ont une
// grille de cellules ou un conteneur flex/grid à distribuer.
const GRID_LAYERS: LayerTag[] = ['grid-align', 'cell-align', 'sizing'];

/* ───────────────────────────── Bundles de défauts par archétype ─────────────────────────────
 * Chaque entrée = les défauts de capacités de la catégorie. Cohérent avec le CONTRAT
 * PAR ARCHÉTYPE de tasks/wave-c-axes-standard.md (quel sous-ensemble du lexique câbler). */
export const ARCHETYPE_CAPABILITIES: Record<Archetype, Capabilities> = {
  // Grilles de cartes/items/stats/listes/accordéons : la catégorie la plus large.
  collection: {
    layouts: ['1-col', '2-col', '3-col', '4-col', 'multi-col', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'colRatio', 'itemHeight', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Spans mixtes + dense : hauteurs contrastées, structure pleine.
  bento: {
    layouts: ['bento', 'multi-col', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'itemHeight', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-bento',
  },
  // Média ↔ texte / duo de comparaison.
  split: {
    layouts: ['split', 'media-left', 'media-right', '2-col', '1-col'],
    regions: ['header', 'media', 'body', 'actions'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-split',
  },
  // Étapes / timeline / flow.
  process: {
    layouts: ['1-col', 'multi-col', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS, 'orientation'],
    familyClass: 'sec-process',
  },
  // Texte / manifeste / citation / points de douleur (1 colonne lisible, 2-col, lead-aside).
  editorial: {
    layouts: ['1-col', '2-col', 'centered'],
    regions: ['header', 'body', 'aside'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'sizing'],
    familyClass: 'sec-editorial',
  },
  // Tables éditoriales / comparateurs.
  table: {
    layouts: ['1-col', 'multi-col'],
    regions: ['header', 'body'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'cell-align'],
    familyClass: 'sec-table',
  },
  // Bandes / CTA / panneaux de confiance (position bouton via contentAlign/actionsAlign).
  band: {
    layouts: ['centered', '1-col', '2-col', 'full-bleed'],
    regions: ['header', 'body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Héros / mastheads / pyramides d'entête.
  hero: {
    layouts: ['centered', 'split', 'media-left', 'media-right', 'full-bleed', '1-col'],
    regions: ['header', 'media', 'body', 'actions', 'aside'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-hero',
  },
  // Murs de logos / marquees.
  logos: {
    layouts: ['multi-col', '3-col', '4-col', 'centered'],
    regions: ['header', 'body'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'cell-align'],
    familyClass: 'sec-logos',
  },
  // Galeries / médias (mosaic, masonry, scroll showcase).
  gallery: {
    layouts: ['bento', 'multi-col', '3-col', 'full-bleed', 'off-grid'],
    regions: ['header', 'media', 'body'],
    axes: ['columns', 'itemHeight', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS, 'orientation'],
    familyClass: 'sec-gallery',
  },
  // ─── 12 nouveaux archétypes : vocabulaire de squelettes plus riche, familyClass moteur RENDUE existante ───
  // Chiffres clés / KPI (réutilise le moteur bento pour les spans contrastés).
  stats: {
    layouts: ['multi-col', '3-col', '4-col', 'centered'],
    regions: ['header', 'body'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-bento',
  },
  // Témoignages / avis (réutilise le moteur collection).
  testimonial: {
    layouts: ['1-col', '2-col', '3-col', 'multi-col', 'centered'],
    regions: ['header', 'body', 'media'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Tarifs / paliers (réutilise le moteur collection).
  pricing: {
    layouts: ['2-col', '3-col', 'multi-col', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Questions fréquentes (réutilise le moteur editorial).
  faq: {
    layouts: ['1-col', '2-col', 'centered'],
    regions: ['header', 'body', 'aside'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'sizing'],
    familyClass: 'sec-editorial',
  },
  // Formulaires (réutilise le moteur split média ↔ champ).
  form: {
    layouts: ['split', 'media-left', 'media-right', '1-col', 'centered'],
    regions: ['header', 'media', 'body', 'actions'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-split',
  },
  // Bandeaux / annonces (réutilise le moteur band).
  banner: {
    layouts: ['centered', '1-col', 'full-bleed'],
    regions: ['body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Onglets (réutilise le moteur collection).
  tabs: {
    layouts: ['1-col', '2-col', 'multi-col', 'centered'],
    regions: ['header', 'body'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Carrousels / sliders (réutilise le moteur gallery).
  carousel: {
    layouts: ['multi-col', '3-col', 'full-bleed', 'off-grid'],
    regions: ['header', 'media', 'body'],
    axes: ['columns', 'itemHeight', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS, 'orientation'],
    familyClass: 'sec-gallery',
  },
  // Frises chronologiques (réutilise le moteur process).
  timeline: {
    layouts: ['1-col', 'multi-col', 'centered'],
    regions: ['header', 'body'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS, 'orientation'],
    familyClass: 'sec-process',
  },
  // Comparatifs / face à face (réutilise le moteur table).
  comparison: {
    layouts: ['1-col', '2-col', 'multi-col'],
    regions: ['header', 'body'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'cell-align'],
    familyClass: 'sec-table',
  },
  // Navigation / barres (réutilise le moteur band).
  nav: {
    layouts: ['1-col', 'full-bleed', 'centered'],
    regions: ['header', 'body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Pieds de page (réutilise le moteur collection multi-colonnes).
  footer: {
    layouts: ['multi-col', '2-col', '3-col', '4-col'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // ─── 6 nouveaux archétypes (vocabulaire encore plus riche, familyClass moteur existante) ───
  // Articles / cartes de blog (réutilise le moteur collection).
  blog: {
    layouts: ['1-col', '2-col', '3-col', 'multi-col'],
    regions: ['header', 'body', 'media'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Équipe / personnes (réutilise le moteur collection).
  people: {
    layouts: ['2-col', '3-col', '4-col', 'multi-col', 'centered'],
    regions: ['header', 'body', 'media'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Contact (formulaire + infos, réutilise le moteur split).
  contact: {
    layouts: ['split', 'media-left', 'media-right', '1-col', 'centered'],
    regions: ['header', 'media', 'body', 'actions'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-split',
  },
  // Carte / localisations (réutilise le moteur split média ↔ infos).
  map: {
    layouts: ['split', 'media-left', 'media-right', 'full-bleed'],
    regions: ['header', 'media', 'body'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-split',
  },
  // Barre d'outils / filtres (réutilise le moteur band).
  toolbar: {
    layouts: ['1-col', 'centered', 'full-bleed'],
    regions: ['header', 'body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Encart / aparté en avant (réutilise le moteur band).
  callout: {
    layouts: ['centered', '1-col', '2-col'],
    regions: ['header', 'body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // ─── 12 nouveaux archétypes (vocabulaire encore plus riche, familyClass moteur existante) ───
  // En-tête de page (titre + fil + intro, réutilise le moteur editorial).
  pageheader: {
    layouts: ['1-col', '2-col', 'centered'],
    regions: ['header', 'body', 'aside'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'sizing'],
    familyClass: 'sec-editorial',
  },
  // Texte riche / corps long (réutilise le moteur editorial).
  richtext: {
    layouts: ['1-col', '2-col', 'centered'],
    regions: ['header', 'body', 'aside'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'sizing'],
    familyClass: 'sec-editorial',
  },
  // Vidéo / lecteur (réutilise le moteur split média ↔ texte).
  video: {
    layouts: ['split', 'media-left', 'media-right', 'full-bleed', '1-col'],
    regions: ['header', 'media', 'body', 'actions'],
    axes: ['proportion', 'mediaSide', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-split',
  },
  // Produits / catalogue (réutilise le moteur collection).
  product: {
    layouts: ['2-col', '3-col', '4-col', 'multi-col'],
    regions: ['header', 'body', 'media', 'actions'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Intégrations / connecteurs (réutilise le moteur collection).
  integrations: {
    layouts: ['3-col', '4-col', 'multi-col', 'centered'],
    regions: ['header', 'body'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Séparateur / rupture (réutilise le moteur band).
  divider: {
    layouts: ['centered', '1-col', 'full-bleed'],
    regions: ['body'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Fil d'ariane (réutilise le moteur band).
  breadcrumb: {
    layouts: ['1-col', 'centered'],
    regions: ['body'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // État d'erreur / page vide (réutilise le moteur band).
  errorstate: {
    layouts: ['centered', '1-col', 'full-bleed'],
    regions: ['header', 'body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Consentement / cookies (réutilise le moteur band).
  consent: {
    layouts: ['1-col', 'full-bleed', 'centered'],
    regions: ['body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Boîte de dialogue / modale (réutilise le moteur band).
  modal: {
    layouts: ['centered', 'full-bleed', '1-col'],
    regions: ['header', 'body', 'actions'],
    axes: ['density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, 'grid-align', 'sizing'],
    familyClass: 'sec-band',
  },
  // Offres d'emploi (réutilise le moteur collection).
  jobs: {
    layouts: ['1-col', '2-col', '3-col', 'multi-col'],
    regions: ['header', 'body', 'actions'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
  // Événements / agenda (réutilise le moteur collection).
  events: {
    layouts: ['2-col', '3-col', 'multi-col', '1-col'],
    regions: ['header', 'body', 'media', 'actions'],
    axes: ['columns', 'density'],
    layers: ['layout', 'axes', ...COMMON_LAYERS, ...NOW_COMMON_LAYERS, ...GRID_LAYERS],
    familyClass: 'sec-collection',
  },
};

/* ───────────────────────────── family (registry) → archétype ─────────────────────────────
 * Le `family` du SectionDescriptor (FamilyTag, 27 valeurs) projette sur l'un des 40
 * archétypes. Garde le mapping DRY : TYPE_ARCHETYPE ci-dessous est dérivé de la famille
 * de chaque type (cf section-registry.ts), donc on couvre les 199 types sans table à la
 * main. Source : familles réelles du registry (audit 2026-06-28). */
const FAMILY_ARCHETYPE: Record<string, Archetype> = {
  // collection
  'card-grid': 'collection',
  'stat-grid': 'stats',
  list: 'collection',
  accordion: 'faq',
  tabs: 'tabs',
  'form-panel': 'form',
  breadcrumb: 'breadcrumb',
  'terminal-shell': 'collection',
  // bento
  bento: 'bento',
  // split
  'split-media': 'split',
  duo: 'split',
  // process
  'process-steps': 'process',
  timeline: 'timeline',
  // editorial
  prose: 'editorial',
  quote: 'editorial',
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
  'breadcrumb-bar': 'breadcrumb',

  // Collections (cartes / stats / listes)
  'feature-grid': 'collection',
  'services-grid': 'collection',
  'deliverables-grid': 'collection',
  'case-card-grid': 'collection',
  'case-featured-grid': 'collection',
  'team-card-grid': 'people',
  'pricing-cards': 'pricing',
  'pricing-table': 'pricing',
  'use-case-index': 'collection',
  'pain-points': 'collection',
  'inclusions-list': 'collection',
  'stat-block': 'stats',
  'metric-shift': 'stats',

  // Bento
  'bento-grid': 'bento',
  'stats-bento': 'stats',

  // Split / duo
  'feature-zigzag': 'split',
  'feature-split-media': 'split',
  'architecture-diagram': 'split',

  // Process / timeline / flow
  'process-steps': 'process',
  'method-timeline': 'process',
  'how-we-ship': 'process',
  'system-flow': 'process',
  'diagnostic-stages': 'process',

  // Editorial / manifeste / citation
  'manifesto-block': 'editorial',
  'statement-orbit': 'editorial',
  // Pin garde-capability (wave #34) : familles singleton repliées, archétype préservé.
  'eeat-panel': 'editorial',
  'editorial-prose': 'editorial',
  'definition-extract': 'editorial',
  'pain-severity-list': 'editorial',
  'pull-quote-block': 'editorial',
  'testimonial-block': 'testimonial',

  // Tables / comparatifs
  'comparison-table': 'comparison',
  'versus-competitors': 'comparison',
  'comparison-duo': 'comparison',
  'data-table': 'table',
  'workflow-table': 'table',
  'department-stack': 'table',

  // Timeline
  'timeline-block': 'timeline',

  // Bandes / CTA / FAQ / confiance
  'cta-final': 'band',
  'cta-band': 'band',
  'newsletter-band': 'form',
  'proof-bar': 'band',
  'spec-bar': 'band',
  'guarantee-block': 'band',
  'faq-accordion': 'faq',
  'objection-handler': 'faq',

  // Logos
  'logo-marquee': 'logos',
  'marquee-band': 'logos',
  'social-proof': 'band',
  'ecosystem-partners': 'collection',

  // Galerie
  'media-block': 'gallery',
  'scroll-gallery': 'gallery',
  'media-bento': 'gallery',

  // Produits / intégrations (types existants reclassés vers leurs nouveaux archétypes)
  'product-reel': 'product',
  'integrations-grid': 'integrations',
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
