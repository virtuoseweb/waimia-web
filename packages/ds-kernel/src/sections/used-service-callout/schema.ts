// Waimia · Co-location DS · module `used-service-callout` · schema (local, co-localise).
// Encadre de maillage compact « offre(s) utilisee(s) sur ce projet » : label mono + liste de
// cross-liens vers les services mobilises, bord gauche accent. Extrait FIDELE du bloc inline
// `case-related-offres` de CaseStudyTemplate (rule 60 : deplacer le markup, pas dupliquer ;
// `related-links` ne couvre pas ce role : grille multi-groupes vs encadre a bord accent).
// z.object SANS discriminatedUnion (pattern codegen). 0 token DS cree.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('used-service-callout'),
  /** Intitule de l'encadre. Defaut : « Offre utilisee » / « Service used ». */
  label_fr: z.string().optional(),
  label_en: z.string().optional(),
  links: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        href: z.string(),
      }),
    )
    .min(1)
    .max(6),
});

export type UsedServiceCalloutData = z.infer<typeof schema>;
