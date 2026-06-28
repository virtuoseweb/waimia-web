// Waimia · Vague C2-B · Builder du manifest MCP 2 tiers (source de vérité unique de la forme).
//
// GRAINE DU FUTUR MCP DE COMPOSITION. Un agent IA travaille en 2 temps :
//   1. TIER 1, index compact (`buildIndex`) : il CHERCHE / filtre dessus (`catalogue.search`).
//      Petit par entrée (pas de slots, pas de presets détaillés, pas de descriptions longues),
//      + les facettes agrégées (effets/interactions/éléments/layout) ET les nouvelles facettes
//      sémantiques C2-A (intent / pageRole / contentMode) avec effectifs.
//   2. TIER 2, détail par type (`buildSectionDetail`) : il le récupère pour COMPOSER /
//      instancier une section précise (`catalogue.getSection`). Contient le CONTRAT DE SLOTS
//      (C2-A, `getSlots`) qui dit quels champs remplir, plus les presets et les descriptions.
//
// Les 2 endpoints (`/library/manifest.json` et `/library/section/[type].json`) consomment CE
// module → 0 drift entre tier 1 et tier 2 (DRY). Source de vérité des données = le registry
// (section-registry.ts) + les facettes (section-facets.ts) + les slots (section-slots.ts) +
// les presets (section-presets.ts) + l'usage (library-manifest.ts).
//
// 0 nouveau token, 0 U+2014. Aucune valeur en dur : libellés via les maps de section-facets.

import type { SectionType } from '../schemas/sections';
import {
  listSections,
  listCategories,
  listFacetCounts,
  type SectionListItem,
} from './section-registry';
import {
  FACET_LABELS_FR,
  INTENT_LABELS_FR,
  PAGE_ROLE_LABELS_FR,
  CONTENT_MODE_LABELS_FR,
  type FacetKind,
  type IntentTag,
  type PageRoleTag,
  type ContentMode,
} from './section-facets';
import { getSlots, type SectionSlot } from './section-slots';
import { listPresets } from './section-presets';
import { getUsage } from './library-manifest';

/** Version du schéma du manifest (tier 1 ET tier 2). */
export const MANIFEST_VERSION = 2 as const;

/** Une facette agrégée : un tag, son libellé FR lisible, son effectif. */
export interface FacetEntry {
  tag: string;
  label: string;
  count: number;
}

/** Entrée compacte (tier 1) : juste de quoi CHERCHER / filtrer un type. */
export interface CompactEntry {
  type: SectionType;
  domain: string; // SectionDescriptor.category (macro : marketing|ecommerce|app-ui)
  categorySlug: string;
  family: string;
  status: 'stable' | 'wip' | 'deprecated';
  intent: IntentTag[];
  pageRole: PageRoleTag[];
  contentMode: ContentMode;
  contentSource?: string;
  label: string; // libellé court humain (categoryLabel)
  presetCount: number; // juste le compte (détail en tier 2)
  usage: 'site' | 'library';
  detailHref: string; // pointeur vers le tier 2
}

/** Bloc de facettes agrégées du tier 1 (orthogonales + sémantiques C2-A). */
export interface ManifestFacets {
  effects: FacetEntry[];
  interactions: FacetEntry[];
  elements: FacetEntry[];
  layoutFacets: FacetEntry[];
  intent: FacetEntry[];
  pageRole: FacetEntry[];
  contentMode: FacetEntry[];
}

/** Index compact complet (tier 1). */
export interface ManifestIndex {
  version: typeof MANIFEST_VERSION;
  generatedFrom: string;
  counts: { types: number; categories: number; families: number; presets: number };
  facets: ManifestFacets;
  sections: CompactEntry[];
}

/** Détail d'un type (tier 2) : tout pour composer / instancier 1 section. */
export interface SectionDetail {
  version: typeof MANIFEST_VERSION;
  type: SectionType;
  domain: string;
  categorySlug: string;
  categoryLabel: string;
  family: string;
  status: 'stable' | 'wip' | 'deprecated';
  intent: IntentTag[];
  pageRole: PageRoleTag[];
  contentMode: ContentMode;
  contentSource?: string;
  tags: string[];
  effects: string[];
  interactions: string[];
  elements: string[];
  layoutFacets: string[];
  description_fr: string;
  description_en: string;
  slots: SectionSlot[]; // CONTRAT DE CONTENU (C2-A) : coeur du tier 2
  presets: { id: string; label: string }[];
  presetCount: number;
}

const GENERATED_FROM =
  'section-registry.ts + section-facets.ts + section-slots.ts + section-presets.ts + library-manifest.ts';

/** Map slug -> libellé court humain (subcategory), depuis listCategories(). */
function categoryLabelMap(): Map<string, string> {
  return new Map(listCategories().map((c) => [c.slug, c.label]));
}

function detailHrefFor(type: SectionType): string {
  return `/library/section/${type}.json`;
}

/**
 * Agrège les effectifs d'une facette à valeur scalaire (contentMode) sur le jeu de
 * sections, libellé via la map fournie, trié par effectif décroissant puis tag.
 */
function aggregateScalar<T extends string>(
  sections: SectionListItem[],
  pick: (s: SectionListItem) => T,
  labels: Record<T, string>,
): FacetEntry[] {
  const counts = new Map<T, number>();
  for (const s of sections) {
    const tag = pick(s);
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, label: labels[tag] ?? tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/**
 * Agrège les effectifs d'une facette multi-valuée (intent[], pageRole[]) : une section
 * portant N tags compte pour chacun. Trié par effectif décroissant puis tag.
 */
function aggregateArray<T extends string>(
  sections: SectionListItem[],
  pick: (s: SectionListItem) => readonly T[],
  labels: Record<T, string>,
): FacetEntry[] {
  const counts = new Map<T, number>();
  for (const s of sections) {
    for (const tag of pick(s)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, label: labels[tag] ?? tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Facettes orthogonales (les 4 genres existants) avec libellés FR, depuis listFacetCounts(). */
function orthogonalFacets(): Pick<
  ManifestFacets,
  'effects' | 'interactions' | 'elements' | 'layoutFacets'
> {
  const facetCounts = listFacetCounts();
  const kinds: FacetKind[] = ['effects', 'interactions', 'elements', 'layoutFacets'];
  const out = {} as Pick<ManifestFacets, FacetKind>;
  for (const kind of kinds) {
    out[kind] = facetCounts[kind].map(({ tag, count }) => ({
      tag,
      label: (FACET_LABELS_FR[kind] as Record<string, string>)[tag] ?? tag,
      count,
    }));
  }
  return out;
}

/**
 * TIER 1, index compact (tous les types). Endpoint `/library/manifest.json`.
 */
export function buildIndex(): ManifestIndex {
  const sections = listSections();
  const categories = listCategories();
  const labelBySlug = categoryLabelMap();

  const facets: ManifestFacets = {
    ...orthogonalFacets(),
    intent: aggregateArray(sections, (s) => s.intent, INTENT_LABELS_FR),
    pageRole: aggregateArray(sections, (s) => s.pageRole, PAGE_ROLE_LABELS_FR),
    contentMode: aggregateScalar(sections, (s) => s.contentMode, CONTENT_MODE_LABELS_FR),
  };

  const compact: CompactEntry[] = sections.map((section) => {
    const entry: CompactEntry = {
      type: section.type,
      domain: section.category,
      categorySlug: section.categorySlug,
      family: section.family,
      status: section.status,
      intent: section.intent,
      pageRole: section.pageRole,
      contentMode: section.contentMode,
      label: labelBySlug.get(section.categorySlug) ?? section.subcategory,
      presetCount: listPresets(section.type).length,
      usage: getUsage(section.type),
      detailHref: detailHrefFor(section.type),
    };
    if (section.contentSource) entry.contentSource = section.contentSource;
    return entry;
  });

  const presetTotal = compact.reduce((acc, s) => acc + s.presetCount, 0);

  return {
    version: MANIFEST_VERSION,
    generatedFrom: GENERATED_FROM,
    counts: {
      types: compact.length,
      categories: categories.length,
      families: new Set(sections.map((s) => s.family)).size,
      presets: presetTotal,
    },
    facets,
    sections: compact,
  };
}

/**
 * TIER 2, détail d'un type (tout pour composer 1 section). Endpoint
 * `/library/section/[type].json`. Retourne `null` si le type est inconnu.
 */
export function buildSectionDetail(type: SectionType): SectionDetail | null {
  const section = listSections().find((s) => s.type === type);
  if (!section) return null;

  const labelBySlug = categoryLabelMap();
  const presets = listPresets(type);

  const detail: SectionDetail = {
    version: MANIFEST_VERSION,
    type: section.type,
    domain: section.category,
    categorySlug: section.categorySlug,
    categoryLabel: labelBySlug.get(section.categorySlug) ?? section.subcategory,
    family: section.family,
    status: section.status,
    intent: section.intent,
    pageRole: section.pageRole,
    contentMode: section.contentMode,
    tags: section.tags,
    effects: section.effects,
    interactions: section.interactions,
    elements: section.elements,
    layoutFacets: section.layoutFacets,
    description_fr: section.description_fr,
    description_en: section.description_en,
    slots: getSlots(type),
    presets: presets.map((p) => ({ id: p.id, label: p.label })),
    presetCount: presets.length,
  };
  if (section.contentSource) detail.contentSource = section.contentSource;
  return detail;
}

/** Tous les types couverts (pour `getStaticPaths` du tier 2). */
export function allSectionTypes(): SectionType[] {
  return listSections().map((s) => s.type);
}
