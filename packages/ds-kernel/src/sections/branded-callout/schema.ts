// Waimia · Co-location DS (Wave #38, T5) · module `branded-callout` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { ctaSchema } from '../_shared/subschemas';

export const schema = z.object({
  type: z.literal('branded-callout'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body1_fr: z.string(),
  body1_en: z.string(),
  body2_fr: z.string().optional(),
  body2_en: z.string().optional(),
  cta: ctaSchema.optional(),
  /** Rend body1/body2 en HTML (preserve les liens internes). Absent = texte brut (retro-compat). */
  bodyHtml: z.boolean().optional(),
  /** Variante `rail` : filet accent a gauche (border-left 3px --accent) + retrait editorial. Absent = plein. */
  variant: z.enum(['rail']).optional(),
});
