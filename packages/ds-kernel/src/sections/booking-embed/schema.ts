// Waimia · Co-location DS (Wave #38, T5) · module `booking-embed` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('booking-embed'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  reassurance: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
      }),
    )
    .min(1)
    .max(4)
    .optional(),
  cal_username: z.string().optional(),
  cal_event_type: z.string().optional(),
  cal_namespace: z.string().optional(),
});
