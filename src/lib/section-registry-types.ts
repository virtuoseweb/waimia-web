// Waimia · Co-location DS (Wave #38, T5) · feuille de TYPES du registry (anti-cycle).
//
// Extraits one-shot depuis src/lib/section-registry.ts (rule 60 : déplacés, pas dupliqués).
// Le générateur (section-registry.generated.ts) importe SectionDescriptor/AstroComponent
// d'ici, le god-file (section-registry.ts) ré-exporte ces types → 0 cycle runtime (types only).
//
// SectionDescriptor = SectionMeta (feuille _shared/types), SANS composant runtime : le rendu
// passe par section-loaders.generated.ts (CSS par page), les composants statiques par
// section-components.generated.ts (outils internes seulement).

import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

// Astro component type - opaque côté registry ; le rendu passe par SectionsRenderer.
export type AstroComponent = (_props: never) => unknown;

export type SectionCategory = 'marketing';
export type SectionStatus = 'stable' | 'wip' | 'deprecated';

/**
 * Descripteur d'une section = métadonnées (SectionMeta : category, facettes, intent...).
 * Aucun composant ici : l'importer statiquement chargerait le CSS des 221 sections partout.
 */
export type SectionDescriptor = SectionMeta;
