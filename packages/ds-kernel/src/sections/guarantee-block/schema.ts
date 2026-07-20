// Waimia · Co-location DS (Wave #38, T5) · module `guarantee-block` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { refOrInline } from '../_shared/refs';

// Item de garantie extrait en const nommée (P4.4-e Phase 3) pour être enveloppé par
// `refOrInline` : chaque garantie porte SOIT sa forme inline, SOIT un pointeur
// `{ ref: 'guarantees/<id>' }` résolu au rendu via le référentiel GLOBAL src/data/guarantees.ts
// et PROJETÉ à cette forme (label → title, promise → body) par resolveSectionRefs.
const guaranteeItemSchema = z.object({
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const schema = z.object({
  type: z.literal('guarantee-block'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // guarantees : forme inline OU pointeur `{ ref: 'guarantees/<id>' }` (REF_TARGETS
  // ['guarantee-block.guarantees'] = 'guarantees'). Les instances actuelles restent inline
  // (valides sous l'union). Bornes min/max = nombre d'items (indépendant de leur forme).
  guarantees: z.array(refOrInline(guaranteeItemSchema)).min(1).max(4),
});
