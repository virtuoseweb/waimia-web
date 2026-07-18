// Waimia · Co-location DS · module `provenance-chip` · schema (local, co-localise).
// Chip de provenance E-E-A-T (double-label famille A/B, docs/strategy/03 §5) : badge plein
// (projet realise, first-party) ou outline (etude sources tierces, second-party), cliquable
// vers la page methodologie. Extrait FIDELE du bloc inline `case-provenance` de
// CaseStudyTemplate (rule 60 : deplacer le markup vers un composant catalogue, pas dupliquer).
// z.object SANS discriminatedUnion (pattern codegen). 0 token DS cree, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('provenance-chip'),
  /** Plein (first-party, projet realise) ou outline (second-party, sources tierces). Defaut solid. */
  variant: z.enum(['solid', 'outline']).optional(),
  label_fr: z.string(),
  label_en: z.string(),
  /** Destination du chip (ex : page methodologie / sources). */
  href: z.string(),
});

export type ProvenanceChipData = z.infer<typeof schema>;
