// Waimia · Co-location DS (Wave #38, T5) · module `related-links` · schema.
// Section de maillage interne compacte (strat 11). z.object SANS discriminatedUnion.
// z vient de zod (pattern codegen). Rule 60 : 0 token DS, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('related-links'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  groups: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        links: z
          .array(
            z.object({
              label_fr: z.string(),
              label_en: z.string(),
              href: z.string(),
              desc_fr: z.string().optional(),
              desc_en: z.string().optional(),
            }),
          )
          .min(1)
          .max(6),
      }),
    )
    .min(1)
    .max(5),
});
