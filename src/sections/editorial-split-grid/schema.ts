// Waimia · Co-location DS (Wave #38, T5) · module `editorial-split-grid` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';
import { ctaSchema } from '../_shared/subschemas';
import { relatedCardSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('editorial-split-grid'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  left: z.object({
    slot: z.literal('left').default('left'),
    kicker_fr: z.string(),
    kicker_en: z.string(),
    h2_fr: z.string(),
    h2_en: z.string(),
    lede_fr: z.string(),
    lede_en: z.string(),
    cards: z.array(relatedCardSchema).min(1).max(3),
    cta: ctaSchema,
  }),
  right: z.object({
    slot: z.literal('right').default('right'),
    kicker_fr: z.string(),
    kicker_en: z.string(),
    h2_fr: z.string(),
    h2_en: z.string(),
    lede_fr: z.string(),
    lede_en: z.string(),
    cards: z.array(relatedCardSchema).min(1).max(3),
    cta: ctaSchema,
  }),
});
