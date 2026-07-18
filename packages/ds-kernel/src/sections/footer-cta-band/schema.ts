// Waimia · Co-location DS (Wave #38, T5) · module `footer-cta-band` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'zod';
import { placementSchema } from '../_shared/base';
import { footerCtaButtonSchema } from '../_shared/locals';

export const schema = z.object({
  type: z.literal('footer-cta-band'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).default('ink'),
  // Axes de variation (Vague C pilote). Tous optionnels → défaut = rendu actuel.
  //  - layout : 'inline' (CTA à côté du titre, défaut historique) | 'stacked' (CTA sous le bloc).
  //  - contentAlign : alignement du bloc titre/texte (start|center|end).
  //  - actionsAlign : position des boutons, INDÉPENDANTE du contenu (start|center|end|spread).
  //  - density : rythme padding-block/gap via tokens --space-*.
  layout: z.enum(['inline', 'stacked']).optional(),
  contentAlign: z.enum(['start', 'center', 'end']).optional(),
  actionsAlign: z.enum(['start', 'center', 'end', 'spread']).optional(),
  density: z.enum(['compact', 'base', 'ample']).optional(),
  //  - texture : décor optionnel. 'signature-grid' pose la grille millimétrique DS (globale,
  //    variante on-dark sur fond ink). Absent → aucun décor = rendu actuel.
  texture: z.enum(['signature-grid']).optional(),
  placement: placementSchema,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  // Variante HTML inline du kicker (rendu via set:html, prioritaire sur kicker_fr/_en plaintext).
  // Permet un fragment accentué (ex. « III. » en accent). Optionnel → défaut = kicker plaintext.
  kicker_html_fr: z.string().optional(),
  kicker_html_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  subtitle_fr: z.string().optional(),
  subtitle_en: z.string().optional(),
  // Variante HTML inline du sous-titre (rendu via set:html, prioritaire sur subtitle_fr/_en).
  // Permet un relevé <i> (ex. « propriétaire à vie »). Optionnel → défaut = subtitle plaintext.
  subtitle_html_fr: z.string().optional(),
  subtitle_html_en: z.string().optional(),
  rounded: z.boolean().optional(),
  buttons: z.array(footerCtaButtonSchema).min(1).max(2),
});
