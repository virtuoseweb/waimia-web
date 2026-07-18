// Waimia · Co-location DS · module `bordered-pullquote` · schema (local, co-localise).
// Citation manifeste a filet gauche (border-left 1px ink) : corps large (h2) avec accent
// italique + signature mono. Extrait FIDELE du bloc inline `author-pullquote` (.ap-pullquote)
// de AuthorPageTemplate (rule 60). Corps rendu via set:html (preserve l'accent <i>). Generique :
// toute citation editoriale a filet. z.object SANS discriminatedUnion. 0 token DS cree.
//
// NB : le catalogue a deja `pull-quote-block` (variante inline/centered/breakout) mais son rendu
// visuel differe (filet 2px accent, padding, style de signature) : extraction dediee pour garantir
// la PARITE PIXEL du bloc auteur sans editer un composant partage (interdit du lot).

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('bordered-pullquote'),
  /** Corps de la citation (HTML autorise pour l'accent <i>), rendu via set:html. */
  quote_html_fr: z.string(),
  quote_html_en: z.string(),
  /** Signature mono (HTML autorise pour l'entite &mdash;). Optionnelle. */
  cite_fr: z.string().optional(),
  cite_en: z.string().optional(),
});

export type BorderedPullquoteData = z.infer<typeof schema>;
