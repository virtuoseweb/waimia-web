// Waimia · Co-location DS (Wave #38, T5) · feuille de TYPES du registry (anti-cycle).
//
// Extraits one-shot depuis src/lib/section-registry.ts (rule 60 : déplacés, pas dupliqués).
// Le générateur (section-registry.generated.ts) importe SectionDescriptor/AstroComponent
// d'ici, le god-file (section-registry.ts) ré-exporte ces types → 0 cycle runtime (types only).
//
// SectionDescriptor = SectionMeta (feuille _shared/types) + le runtime `component`. Source
// unique de la forme « meta » conservée dans _shared/types.ts (déjà = Omit<…, 'component'>).

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

// Astro component type - opaque côté registry ; le rendu passe par SectionsRenderer.
export type AstroComponent = (_props: never) => unknown;

export type SectionCategory = 'marketing';
export type SectionStatus = 'stable' | 'wip' | 'deprecated';

/**
 * Descripteur complet d'une section = métadonnées (SectionMeta) + composant runtime.
 * `SectionMeta` porte déjà tous les champs descriptifs (category, facettes, intent...).
 */
export interface SectionDescriptor extends SectionMeta {
  component: AstroComponent;
}
