// Waimia · Section demos - données d'exemple par type (Wave #38 T5 - full replace 2026-06-28).
//
// ⚠️ Les démos vivent désormais dans les modules co-localisés `src/sections/<type>/demo.ts`.
// `SECTION_DEMOS` est RECONSTRUIT depuis ces modules dans `section-demos.generated.ts`
// (scripts/gen-section-aggregate.mjs, mode REPLACE) et ré-exporté ici. Le type `DemoData` vit
// dans `section-demos-types.ts` (feuille anti-cycle). API PUBLIQUE PRESERVEE (drop-in).
// Régénérer : `npm run gen:section-aggregate`. Gate : `npm run check:section-aggregate`.

import type { SectionType } from '@waimia/ds-kernel';

export type { DemoData } from './section-demos-types';
import type { DemoData } from './section-demos-types';

export { SECTION_DEMOS } from './section-demos.generated';
import { SECTION_DEMOS } from './section-demos.generated';

export function getSectionDemo(type: SectionType): DemoData | undefined {
  return SECTION_DEMOS[type];
}
