// Waimia · Co-location DS (Wave #38, T5) · module `cta-newsletter-footer` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('cta-newsletter-footer'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  placeholder_fr: z.string().default('vous@entreprise.com'),
  placeholder_en: z.string().default('you@company.com'),
  button_label_fr: z.string().default('S’abonner'),
  button_label_en: z.string().default('Subscribe'),
  consent_fr: z.string().optional(),
  consent_en: z.string().optional(),
  action: z.string().optional(),
});
