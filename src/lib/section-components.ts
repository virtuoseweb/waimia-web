// Waimia · composants de section STATIQUES (outils internes : preview, atelier).
// ⚠️ Tout importeur de ce module charge le CSS des 221 sections. Pages publiques et
// SectionsRenderer passent par `lazy-section.ts` (CSS par page). Ex-API de section-registry.ts.
import type { SectionType } from '@waimia/ds-kernel';
import type { AstroComponent } from './section-registry-types';
import { SECTION_COMPONENTS } from './section-components.generated';

export const SECTION_REGISTRY: Record<SectionType, AstroComponent> = SECTION_COMPONENTS;

export function getSectionComponent(type: SectionType): AstroComponent | undefined {
  return SECTION_COMPONENTS[type];
}
