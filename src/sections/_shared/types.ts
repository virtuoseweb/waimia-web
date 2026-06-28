// Waimia · Co-location DS (Wave #38, T1) · feuille partagée PURE (types only)
//
// `SectionMeta` = `SectionDescriptor` (cf src/lib/section-registry.ts) SANS le runtime
// `component` (chaque module porte son propre `Component.astro`) ni `usage` (touchpoint 5,
// dérivé de SECTIONS dans library-manifest). Le `meta.ts` de chaque module exporte un objet
// de ce type ; le codegen recompose `SectionDescriptor` en réattachant `component`.
//
// FEUILLE PURE : n'importe QUE des TYPES. `section-facets` est une feuille pure (0 import).
// `Capabilities` est un `import type` (élidé au build → 0 cycle runtime même si
// section-archetypes importe le type SectionType). Aucun import de valeur.

import type {
  CategorySlug,
  FamilyTag,
  EffectTag,
  InteractionTag,
  ElementTag,
  LayoutTag,
  IntentTag,
  PageRoleTag,
  ContentMode,
} from '../../lib/section-facets';
import type { Capabilities } from '../../lib/section-archetypes';

// Reprises locales (alignées sur section-registry.ts) pour ne pas importer le registry.
export type SectionCategory = 'marketing';
export type SectionStatus = 'stable' | 'wip' | 'deprecated';

/**
 * Métadonnées descriptives d'une section, indépendantes du composant runtime.
 * = `Omit<SectionDescriptor, 'component'>`. Le codegen réattache `component` pour
 * reconstituer le `SectionDescriptor` consommé par le registry (API publique préservée).
 */
export interface SectionMeta {
  category: SectionCategory;
  subcategory: string;
  categorySlug: CategorySlug;
  tags: string[];
  status: SectionStatus;
  description_fr: string;
  description_en: string;
  preview?: string;
  family: FamilyTag;
  intent: IntentTag[];
  pageRole: PageRoleTag[];
  contentMode: ContentMode;
  contentSource?: string;
  effects: EffectTag[];
  interactions: InteractionTag[];
  elements: ElementTag[];
  layoutFacets: LayoutTag[];
  capabilities?: Partial<Capabilities>;
}
