// Waimia · Co-location DS (Wave #38, T5) · module `related-cards-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('related-cards-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  // Rythme vertical retro-compat (optionnel) : override du padding-block de la bande.
  // Absent = rendu catalogue inchange (var(--section-loose)). Valeur = token DS existant,
  // ex. 'var(--section-base)'. Alimente la var CSS --related-cards-band-pad deja en place.
  pad_block: z.string().optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  cards: z
    .array(
      z.object({
        kicker_fr: z.string(),
        kicker_en: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        lead_fr: z.string(),
        lead_en: z.string(),
        href: z.string(),
        // Clé de silo éditorial : posée en data-silo sur la carte (filtre SiloFilter). OPTIONNEL.
        silo: z.string().optional(),
      }),
    )
    .min(2)
    .max(3),
});
