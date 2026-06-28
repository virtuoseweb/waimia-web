// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-masthead` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('hero-hub-masthead'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  variant: z.enum(['hub', 'listing', 'detail']).default('hub'),
  decoration: z.boolean().default(false),
  align: z.enum(['left', 'centered']).default('left'),
  scale: z.enum(['monumental', 'standard']).optional(),
  transition_id: z.string().optional(),
  role_fr: z.string().optional(),
  role_en: z.string().optional(),
});
