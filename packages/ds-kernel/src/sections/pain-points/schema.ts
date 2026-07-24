// Waimia · Co-location DS (Wave #38, T5) · module `pain-points` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { refOrInline } from '../_shared/refs';

// Item de friction extrait en const nommée (P4.4-e Phase 3) pour être enveloppé par
// `refOrInline` : chaque item porte SOIT sa forme inline, SOIT un pointeur
// `{ ref: 'pain-points/<id>' }` résolu au rendu via le référentiel GLOBAL src/data/pain-points.ts
// et PROJETÉ à cette forme (label → title, description → body) par resolveSectionRefs.
const painPointItemSchema = z.object({
  num: z.string().optional(),
  title_fr: z.string(),
  title_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
});

export const schema = z.object({
  type: z.literal('pain-points'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  eyebrow_fr: z.string().default('§ Friction'),
  eyebrow_en: z.string().default('§ Friction'),
  h2_fr: z.string(),
  h2_en: z.string(),
  aside_fr: z.string().optional(),
  aside_en: z.string().optional(),
  // items : forme inline OU pointeur `{ ref: 'pain-points/<id>' }`
  // (REF_TARGETS['pain-points.items'] = 'pain-points'). Bornes = nombre d'items.
  items: z.array(refOrInline(painPointItemSchema)).min(2).max(6),
});
