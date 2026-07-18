// Waimia · Co-location DS · module `publications-panel` · schema (local, co-localise).
// Panneau publications d'un profil : entete + callout manifeste + liste de publications
// (titre / lieu / annee) + index de ressources recentes (date · titre · rubrique) + lien « tout
// voir ». Extrait FIDELE du bloc inline `author-publications` de AuthorPageTemplate (rule 60).
// Bloc compound (aucun type catalogue ne le couvre) : compose l'atome editorial/Callout. Le tri
// et le decoupage des ressources sont faits en amont (data-builder) ; le composant formate la
// date par langue. z.object SANS discriminatedUnion. 0 token DS cree, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('publications-panel'),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  title_fr: z.string(),
  title_en: z.string(),
  /** Corps du callout manifeste (HTML autorise : <br/>), rendu via set:html. */
  manifesto_html_fr: z.string(),
  manifesto_html_en: z.string(),
  /** Publications externes (titre / lieu / annee), libelles non localises. */
  publications: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        venue: z.string(),
        year: z.string(),
      }),
    )
    .optional(),
  /** Index de ressources recentes (deja trie/decoupe en amont). Date formatee par langue. */
  resources: z
    .array(
      z.object({
        date_iso: z.string(),
        title_fr: z.string(),
        title_en: z.string(),
        href: z.string(),
        tag_fr: z.string(),
        tag_en: z.string(),
      }),
    )
    .optional(),
  all_href: z.string(),
  all_label_fr: z.string(),
  all_label_en: z.string(),
});

export type PublicationsPanelData = z.infer<typeof schema>;
