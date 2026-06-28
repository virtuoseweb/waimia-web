// Waimia · Co-location DS (Wave #38, T5) · module `hero-lead-magnet` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('hero-lead-magnet'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  h1_fr: z.string(),
  h1_en: z.string(),
  lede_fr: z.string(),
  lede_en: z.string(),
  format_fr: z.string(),
  format_en: z.string(),
  published_at: z.string(),
  cover_url: z.string().optional(),
  download_label_fr: z.string().default('PDF gratuit · sur inscription'),
  download_label_en: z.string().default('Free PDF · on signup'),
  cta_label_fr: z.string(),
  cta_label_en: z.string(),
  cta_href: z.string().optional(),
});
