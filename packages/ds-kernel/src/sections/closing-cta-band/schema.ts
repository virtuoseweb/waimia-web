// Waimia · Co-location DS · module `closing-cta-band` · schema (local, co-localise).
// Bande CTA de cloture sur fond ink : kicker + titre display-lg (accent italique <em>) + bouton
// primaire. Extrait FIDELE du bloc inline `author-cta` de AuthorPageTemplate (rule 60). Titre
// rendu via set:html (preserve l'accent <em>). Generique : toute bande CTA finale ink d'un profil
// ou d'une page editoriale. z.object SANS discriminatedUnion. 0 token DS cree, 0 hardcode.
//
// NB : le catalogue a `footer-cta-band` (CTA de cloture ink canonique) mais sa typo/mise en page
// (h2 propre, sous-titre, layout inline/stacked) diverge du bloc auteur (display-lg, inner 820px) :
// extraction dediee pour la PARITE PIXEL sans editer un composant partage (interdit du lot).

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('closing-cta-band'),
  // Axe de déclinaison (#118) : fond. DÉFAUT ABSENT = ink (rendu signature inchangé) ;
  // paper/paper-2/paper-3 déclinent la bande CTA de clôture sur fond clair (modèle BentoGrid).
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string(),
  kicker_en: z.string(),
  /** Titre display-lg (HTML autorise pour l'accent <em>), rendu via set:html. */
  h2_html_fr: z.string(),
  h2_html_en: z.string(),
  button_label_fr: z.string(),
  button_label_en: z.string(),
  button_href: z.string(),
});

export type ClosingCtaBandData = z.infer<typeof schema>;
