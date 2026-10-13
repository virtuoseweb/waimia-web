// Waimia · Section registry V2 (2026-05-15 ; Wave #38 T5 - co-location full replace 2026-06-28)
// Mapping `section.type` -> composant Astro pour rendu data-driven.
//
// ⚠️ `SECTIONS` (Record<SectionType, SectionDescriptor>) est désormais RECONSTRUIT depuis les
// modules co-localisés `src/sections/<type>/` dans `section-registry.generated.ts`
// (scripts/gen-section-aggregate.mjs, mode REPLACE) et ré-exporté ici. Les TYPES du descripteur
// vivent dans `section-registry-types.ts` (feuille anti-cycle). Les helpers de listing/nichage
// restent ici. API PUBLIQUE PRESERVEE (drop-in). Gate : `npm run check:section-aggregate`.

import type { SectionType } from '@waimia/ds-kernel';
import type {
  CategorySlug,
  FamilyTag,
  FacetKind,
} from '@waimia/ds-kernel/lib/section-facets';
import { capabilitiesFor, type Capabilities } from '@waimia/ds-kernel/lib/section-archetypes';

// Types du descripteur (extraits one-shot vers la feuille anti-cycle) - ré-export inchangé.
export type {
  AstroComponent,
  SectionCategory,
  SectionStatus,
  SectionDescriptor,
} from './section-registry-types';
import type { SectionDescriptor } from './section-registry-types';

// SECTIONS reconstruit depuis les modules (generated) - ré-export drop-in.
export { SECTIONS } from './section-registry.generated';
import { SECTIONS } from './section-registry.generated';

// SECTION_REGISTRY / getSectionComponent (composants statiques) : déplacés dans
// `section-components.ts`, réservé aux outils internes. Ce module reste SANS composant pour
// que ses importeurs (pages publiques, manifestes) ne chargent pas le CSS des 221 sections.

export function getSectionMeta(type: SectionType): SectionDescriptor | undefined {
  return SECTIONS[type];
}

/**
 * Capacités EFFECTIVES d'un type (Pilier 2). Délègue à `capabilitiesFor` : bundle
 * d'archétype (dérivé de la `family` du descripteur) fusionné avec l'override partiel
 * éventuel du registry (`capabilities`). Source de vérité unique pour builder/MCP/gate/UI.
 */
export function getCapabilities(type: SectionType): Capabilities {
  const meta = SECTIONS[type];
  return capabilitiesFor(type, meta?.capabilities, meta?.family);
}

export interface SectionListItem extends SectionDescriptor {
  type: SectionType;
}

export function listSections(): SectionListItem[] {
  return (Object.keys(SECTIONS) as SectionType[]).map((type) => ({ type, ...SECTIONS[type] }));
}

export interface CategoryGroup {
  slug: string;
  label: string;
  count: number;
  sectionTypes: SectionType[];
}

export function listCategories(): CategoryGroup[] {
  const map = new Map<string, CategoryGroup>();

  for (const section of listSections()) {
    const current = map.get(section.categorySlug) ?? {
      slug: section.categorySlug,
      label: section.subcategory,
      count: 0,
      sectionTypes: [],
    };

    current.count += 1;
    current.sectionTypes.push(section.type);
    map.set(section.categorySlug, current);
  }

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

// ───────────────────────────── Nichage (Vague C / F0) ─────────────────────────────

export interface FamilyGroup {
  family: FamilyTag;
  count: number;
  types: SectionType[];
}

/**
 * Familles présentes dans une Catégorie (niveau Famille de la taxonomie),
 * triées par effectif décroissant puis nom. Vide si categorySlug inconnu.
 */
export function listFamiliesByCategory(categorySlug: CategorySlug): FamilyGroup[] {
  const map = new Map<FamilyTag, FamilyGroup>();

  for (const section of listSections()) {
    if (section.categorySlug !== categorySlug) continue;
    const current = map.get(section.family) ?? {
      family: section.family,
      count: 0,
      types: [],
    };
    current.count += 1;
    current.types.push(section.type);
    map.set(section.family, current);
  }

  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.family.localeCompare(b.family),
  );
}

export interface FacetCount {
  tag: string;
  count: number;
}

/**
 * Effectifs par facette (alimente les compteurs des filtres UI). Une section
 * portant N tags d'une facette compte pour chacun. Tri par effectif décroissant.
 */
export function listFacetCounts(): Record<FacetKind, FacetCount[]> {
  const kinds: FacetKind[] = ['effects', 'interactions', 'elements', 'layoutFacets'];
  const acc: Record<FacetKind, Map<string, number>> = {
    effects: new Map(),
    interactions: new Map(),
    elements: new Map(),
    layoutFacets: new Map(),
  };

  for (const section of listSections()) {
    for (const kind of kinds) {
      for (const tag of section[kind]) {
        acc[kind].set(tag, (acc[kind].get(tag) ?? 0) + 1);
      }
    }
  }

  const toSorted = (m: Map<string, number>): FacetCount[] =>
    [...m.entries()]
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));

  return {
    effects: toSorted(acc.effects),
    interactions: toSorted(acc.interactions),
    elements: toSorted(acc.elements),
    layoutFacets: toSorted(acc.layoutFacets),
  };
}

// ───────────── Sections liées (Wave preview/détail · helpers purs, build-time) ─────────────
//
// Couche data consommée par la fiche détail `/library/[type]` ET le manifest MCP tier 2
// (mcp-manifest.ts → SectionDetail.related). Source de vérité unique = le registry → 0 drift.
// Tout est dérivé de listSections()/getSectionMeta()/listCategories() (0 nouvelle dépendance).

/** Une section similaire avec son score de proximité (déterministe, SSG). */
export interface ScoredSection {
  section: SectionListItem;
  score: number;
}

/** Fil d'Ariane d'un type : catégorie (slug + libellé), famille, type. */
export interface SectionBreadcrumb {
  categorySlug: string;
  categoryLabel: string;
  family: FamilyTag;
  type: SectionType;
}

/** Map slug -> libellé court humain (subcategory), depuis listCategories(). */
function categoryLabelBySlug(): Map<string, string> {
  return new Map(listCategories().map((c) => [c.slug, c.label]));
}

/**
 * Sections de la même FAMILLE que `type`, hors `type` lui-même. Triées par type
 * pour un rendu déterministe (SSG). Vide si type inconnu.
 */
export function listFamilyPeers(type: SectionType): SectionListItem[] {
  const meta = getSectionMeta(type);
  if (!meta) return [];
  return listSections()
    .filter((s) => s.type !== type && s.family === meta.family)
    .sort((a, b) => a.type.localeCompare(b.type));
}

/**
 * Sections de la même CATÉGORIE (categorySlug) que `type`, hors `type` lui-même.
 * Triées par type pour un rendu déterministe (SSG). Vide si type inconnu.
 */
export function listCategoryPeers(type: SectionType): SectionListItem[] {
  const meta = getSectionMeta(type);
  if (!meta) return [];
  return listSections()
    .filter((s) => s.type !== type && s.categorySlug === meta.categorySlug)
    .sort((a, b) => a.type.localeCompare(b.type));
}

/** Indice de Jaccard |∩|/|∪| de deux listes vues comme ensembles. 0 si union vide. */
function jaccard(a: readonly string[], b: readonly string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  if (setA.size === 0 && setB.size === 0) return 0;
  let inter = 0;
  for (const v of setA) if (setB.has(v)) inter += 1;
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

/** Score de proximité entre deux sections (cf spec §Scoring). Pondérations exactes. */
function similarityScore(a: SectionListItem, b: SectionListItem): number {
  return (
    3 * jaccard(a.intent, b.intent) +
    2 * jaccard(a.pageRole, b.pageRole) +
    1.5 * (a.family === b.family ? 1 : 0) +
    1 * jaccard(a.elements, b.elements) +
    1 * jaccard(a.layoutFacets, b.layoutFacets) +
    0.8 * jaccard(a.tags, b.tags) +
    0.5 * jaccard(a.effects, b.effects) +
    0.5 * (a.categorySlug === b.categorySlug ? 1 : 0)
  );
}

/**
 * Map memoïsée type -> liste complète des autres sections triées par score décroissant
 * (puis type pour départager). Calculée UNE fois (build O(n²), n≈199, trivial en SSG).
 */
let _scoredMap: Map<SectionType, ScoredSection[]> | null = null;
function scoredMap(): Map<SectionType, ScoredSection[]> {
  if (_scoredMap) return _scoredMap;
  const sections = listSections();
  const map = new Map<SectionType, ScoredSection[]>();
  for (const a of sections) {
    const scored = sections
      .filter((b) => b.type !== a.type)
      .map((b) => ({ section: b, score: similarityScore(a, b) }))
      .sort((x, y) => y.score - x.score || x.section.type.localeCompare(y.section.type));
    map.set(a.type, scored);
  }
  _scoredMap = map;
  return map;
}

/**
 * Sections les plus SIMILAIRES à `type` (scoring spec §Scoring), self exclu, plus
 * tout type listé dans `opts.exclude`. Tri décroissant par score. Défaut limit=6.
 * Vide si type inconnu.
 */
export function listSimilarSections(
  type: SectionType,
  opts?: { limit?: number; exclude?: SectionType[] },
): ScoredSection[] {
  if (!getSectionMeta(type)) return [];
  const limit = opts?.limit ?? 6;
  const excluded = new Set(opts?.exclude ?? []);
  const scored = scoredMap().get(type) ?? [];
  return scored.filter((s) => !excluded.has(s.section.type)).slice(0, limit);
}

/** Fil d'Ariane d'un type : catégorie › famille › type. */
export function getBreadcrumb(type: SectionType): SectionBreadcrumb {
  const meta = getSectionMeta(type);
  const categorySlug = meta?.categorySlug ?? '';
  return {
    categorySlug,
    categoryLabel: categoryLabelBySlug().get(categorySlug) ?? meta?.subcategory ?? '',
    family: meta?.family as FamilyTag,
    type,
  };
}
