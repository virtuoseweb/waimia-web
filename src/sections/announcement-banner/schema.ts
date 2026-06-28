// Waimia · Co-location DS (Wave #38, T5) · module `announcement-banner` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('announcement-banner'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  text_fr: z.string(),
  text_en: z.string(),
  link_label_fr: z.string().optional(),
  link_label_en: z.string().optional(),
  href: z.string().optional(),
  badge_fr: z.string().optional(),
  badge_en: z.string().optional(),
  tone: z.enum(['accent', 'ink', 'paper-2']).default('accent'),
  dismissible: z.boolean().default(false),
});
