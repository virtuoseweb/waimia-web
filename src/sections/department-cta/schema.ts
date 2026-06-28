// Waimia · Co-location DS (Wave #38, T5) · module `department-cta` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('department-cta'),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  primary_label_fr: z.string().default('Prendre rendez-vous →'),
  primary_label_en: z.string().default('Book a call →'),
  primary_href: z.string().default('/contact'),
  secondary_label_fr: z.string().default('Toutes les solutions'),
  secondary_label_en: z.string().default('All solutions'),
  secondary_href: z.string().default('/solutions'),
});
