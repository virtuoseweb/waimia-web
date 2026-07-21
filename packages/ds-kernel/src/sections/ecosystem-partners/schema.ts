// Waimia · Co-location DS (Wave #38, T5) · module `ecosystem-partners` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { refOrInline } from '../_shared/refs';

// Item partenaire extrait en const nommée (P4.4-e Phase 3) pour être enveloppé par
// `refOrInline` : chaque partenaire porte SOIT sa forme inline, SOIT un pointeur
// `{ ref: 'partners/<slug>' }` résolu au rendu via le référentiel GLOBAL src/data/partners.ts
// et PROJETÉ à cette forme (retire `slug`) par resolveSectionRefs.
const partnerItemSchema = z.object({
  name: z.string(),
  asset: z.string(),
  href: z.string().optional(),
  external: z.boolean().optional(),
  category: z.string().optional(),
  // Calibrage poids optique (docs/48) : rétrécit la boîte des marques
  // compactes pour égaliser le poids d'encre. Surcharge --logo-w/--logo-h.
  box: z.object({ h: z.string().optional(), w: z.string().optional() }).optional(),
});

export const schema = z.object({
  type: z.literal('ecosystem-partners'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  layout: z.enum(['wall', 'grid', 'marquee']).default('grid'),
  // partners : forme inline OU pointeur `{ ref: 'partners/<slug>' }`
  // (REF_TARGETS['ecosystem-partners.partners'] = 'partners').
  partners: z.array(refOrInline(partnerItemSchema)).min(1),
});
