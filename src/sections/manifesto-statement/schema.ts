// Waimia · Co-location DS (Wave #38, T5) · module `manifesto-statement` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('manifesto-statement'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  /** HTML · <i> = relevé italique serif, <span class="acc"> = accent, <strong> = gras */
  text_fr: z.string(),
  text_en: z.string(),
  tone: z.enum(['ink', 'accent']).default('ink'),
  show_grid: z.boolean().default(false),
  /** Narration scroll-pinnée : la section reste sticky plein viewport pendant ~250vh
   *  de scroll et la lecture guidée (--ms-lit) se déroule sur toute cette plage.
   *  Desktop + motion only (mobile ≤768px et reduced-motion retombent en lecture guidée
   *  simple, sans zone de scroll réservée). Opt-in — réservé à /agence. */
  pinned: z.boolean().default(false),
});
