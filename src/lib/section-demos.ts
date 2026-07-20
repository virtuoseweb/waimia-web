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

import { SECTION_DEMOS as GENERATED_SECTION_DEMOS } from './section-demos.generated';
// DEV-ONLY : store des démos éditées localement (P4.4-h E2). Piloté par GET/PUT/DELETE
// /api/ds/demo-override (integration src/integrations/ds-save-dev.mjs, dev-only). Référencé
// UNIQUEMENT dans la branche `import.meta.env.DEV` ci-dessous : au build de prod DEV -> `false`,
// le bloc est éliminé par le DCE et cet import est retiré -> aucune fuite dans le HTML.
import DEMO_OVERRIDES_STORE from '../data/demo-overrides.json';

// --- DEV-ONLY : overlay « modifier le composant = éditer sa démo » ------------------
// Merge des props partiels du store PAR-DESSUS la démo générée, par type. Même garde que le
// repère `data-atelier-idx` de SectionsRenderer : `import.meta.env.DEV` est remplacé
// statiquement par `false` au build de prod -> SECTION_DEMOS = la démo générée, JSON ignoré,
// HTML prod IDENTIQUE. En dev, un changement du JSON invalide ce module (HMR) -> re-merge.
let overlayDemos: Record<SectionType, DemoData> = GENERATED_SECTION_DEMOS;
const activeOverrides: Record<string, DemoData> = {};

if (import.meta.env.DEV) {
  const raw = (DEMO_OVERRIDES_STORE as { overrides?: Record<string, DemoData> }).overrides ?? {};
  const merged: Record<SectionType, DemoData> = { ...GENERATED_SECTION_DEMOS };
  for (const [type, props] of Object.entries(raw)) {
    const base = merged[type as SectionType];
    if (base && props && typeof props === 'object' && !Array.isArray(props)) {
      // Le type reste celui de la démo de base (on n'édite jamais le discriminant ici).
      merged[type as SectionType] = { ...base, ...props, type: base.type };
      activeOverrides[type] = props;
    }
  }
  overlayDemos = merged;
}

export const SECTION_DEMOS: Record<SectionType, DemoData> = overlayDemos;

/**
 * Overrides de démo ACTIFS (dev-only) : {} en prod (branche DEV éliminée au build). Clé = type,
 * valeur = props partiels appliqués. Sert au bandeau « Démo modifiée localement » de la fiche.
 */
export const DEV_DEMO_OVERRIDES: Record<string, DemoData> = activeOverrides;

export function getSectionDemo(type: SectionType): DemoData | undefined {
  return SECTION_DEMOS[type];
}
