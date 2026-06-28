// Waimia · Co-location DS (Wave #38, T5) · module `cta-form-inline` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('cta-form-inline'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink', 'accent']).default('paper-2'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  placeholder_fr: z.string().default('votre@email.com'),
  placeholder_en: z.string().default('your@email.com'),
  submit_label_fr: z.string().default("S'inscrire →"),
  submit_label_en: z.string().default('Sign up →'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  form_action: z.string().optional(),
});
