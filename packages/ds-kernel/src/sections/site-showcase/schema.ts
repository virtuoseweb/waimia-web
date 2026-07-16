// Waimia · Co-location DS (Wave #38) · module `site-showcase` (cas clients)
//
// Vitrine du site livre : captures reelles presentees dans des cadres navigateur DS,
// avec lien nofollow (nouvel onglet) vers le site en production. Deux types de capture :
//   - frame : capture above-fold, cadre a ratio fixe (rendu statique).
//   - tall  : capture pleine page (tres haute), la fenetre defile lentement au survol
//             (CSS only, neutralise en reduced-motion et au toucher).
//
// `z` vient de `astro:content` (coherence build Astro + pattern codegen), comme les autres
// modules. FEUILLE : n'importe que `z` + `placementSchema` (feuille pure _shared).

import { z } from 'zod';
import { placementSchema } from '../_shared/base';

export const schema = z.object({
  type: z.literal('site-showcase'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  placement: placementSchema,
  // En-tete (tout optionnel : la vitrine peut n'etre qu'une grille de captures).
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  lede_fr: z.string().optional(),
  lede_en: z.string().optional(),
  // Lien vers le site en production. Quand present, un bouton "Visiter le site" est rendu
  // avec rel="nofollow noopener noreferrer" + target="_blank" (SEO : pas de transfert de jus,
  // ouverture en nouvel onglet). Absent = pas de lien (ex. site hors ligne).
  url: z.string().optional(),
  url_label_fr: z.string().optional(),
  url_label_en: z.string().optional(),
  // Captures : 1 a 4. La premiere est la capture dominante (layout editorial asymetrique).
  screens: z
    .array(
      z.object({
        src: z.string(),
        alt_fr: z.string(),
        alt_en: z.string(),
        // frame = above-fold ratio fixe (defaut) · tall = pleine page qui defile au survol.
        kind: z.enum(['frame', 'tall']).default('frame'),
        // Legende courte sous la capture : un avantage concret, pas une description.
        caption_fr: z.string().optional(),
        caption_en: z.string().optional(),
      }),
    )
    .min(1)
    .max(4),
});
