// Waimia · Co-location DS (Wave #38) · module `testimonial-wall` · schema.
// Mur d'avis masonry. z.object SANS discriminatedUnion. `z` depuis astro:content
// (cohérence build Astro + codegen). Item enrichi (quote surlignable + linkedin).

import { z } from 'zod';
import { refOrInline } from '../_shared/refs';

const testimonialWallItemSchema = z.object({
  quote_fr: z.string(),
  quote_en: z.string(), // phrases a surligner entourees de **doubles asterisques**
  author: z.string(),
  role_fr: z.string(),
  role_en: z.string(),
  company: z.string().optional(),
  avatar: z.string().optional(), // chemin image /images/... optionnel
  linkedin: z.string().optional(), // URL profil LinkedIn optionnelle
});

export const schema = z.object({
  type: z.literal('testimonial-wall'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('paper-2'),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  rating: z.number().optional(), // ex 4.9 (note etoiles d'en-tete)
  rating_max: z.number().optional(), // ex 5
  rating_count: z.number().optional(), // ex 97
  rating_label_fr: z.string().optional(),
  rating_label_en: z.string().optional(), // ex "avis"
  columns: z.enum(['2', '3', '4']).default('3'),
  // testimonials : chaque item porte SOIT sa forme inline (`testimonialWallItemSchema`), SOIT un
  // pointeur `{ ref: 'testimonials/<slug>' }` résolu au rendu via la collection GLOBAL
  // `testimonials` et projeté à la forme d'item par resolveSectionRefs
  // (REF_TARGETS['testimonial-wall.testimonials'] = 'testimonials'). Bornes inchangées : les
  // instances 100% inline actuelles restent valides sous l'union.
  testimonials: z.array(refOrInline(testimonialWallItemSchema)).min(3).max(12),
});
