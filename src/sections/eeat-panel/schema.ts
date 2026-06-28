// Waimia · Co-location DS (Wave #38, T3) · module `eeat-panel` (cas dur : global-ref EEAT_PACK)
//
// Schéma DÉPLACÉ depuis src/schemas/sections.ts (rule 60 : déplacer, pas dupliquer).
// `z.object` SANS le wrapper discriminatedUnion. `z` vient de `astro:content`.
// Contenu GLOBAL single-source (EEAT_PACK + EEAT_IMAGES) → pas de champ de contenu dans le
// schéma, seulement le pilotage de variante/fond + overrides éditoriaux optionnels.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('eeat-panel'),
  variant: z.enum(['media', 'columns', 'light', 'hero']).default('media'),
  background: z.enum(['ink', 'paper']).optional(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  lead: z.string().optional(),
});
