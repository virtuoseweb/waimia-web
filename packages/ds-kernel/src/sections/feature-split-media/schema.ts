// Waimia · Co-location DS (Wave #38, T5) · module `feature-split-media` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { featureSplitPointSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('feature-split-media'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  reversed: z.boolean().default(false),
  // Paire asymétrique optionnelle (primitive layouts.css) : split-1-2 = texte
  // étroit + média large, split-2-1 = l'inverse. Absent → ratio symétrique 1fr 1fr
  // (défaut historique préservé). `reversed` mappe sur data-reversed (inversion
  // visuelle seule, ordre DOM = ordre de lecture, WCAG 1.3.2).
  layout: z.enum(['split-1-2', 'split-2-1']).optional(),
  // Média sticky (effet éditorial quand le texte est plus long que le média).
  // Absent/false → alignement centré historique préservé.
  media_sticky: z.boolean().optional(),
  // Axes de variation (Vague C pilote). Tous optionnels → défaut = rendu actuel.
  //  - proportion : ratio des colonnes texte|média (data-proportion). Préféré à `layout`
  //    (qui reste en compat : split-1-2 ≈ 1-2, split-2-1 ≈ 2-1). proportion gagne si présent.
  //  - mediaSide : côté du média en desktop (data-media-side). Absent → ordre DOM (média à droite).
  //  - contentAlign : alignement vertical/typo du bloc texte ; actionsAlign : position du CTA.
  //  - density : rythme padding/gap via tokens --space-*.
  proportion: z.enum(['1-1', '1-2', '2-1', '2-3', '3-2']).optional(),
  mediaSide: z.enum(['left', 'right']).optional(),
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  actionsAlign: z.enum(['start', 'center', 'end', 'spread']).optional(),
  density: z.enum(['compact', 'base', 'ample']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string(),
  body_en: z.string(),
  points: z.array(featureSplitPointSchema).max(6).default([]),
  media_src: z.string().optional(),
  media_alt_fr: z.string().optional(),
  media_alt_en: z.string().optional(),
  media_caption_fr: z.string().optional(),
  media_caption_en: z.string().optional(),
  cta_label_fr: z.string().optional(),
  cta_label_en: z.string().optional(),
  cta_href: z.string().optional(),
});
