// Waimia · Co-location DS · module `keyword-strip` · schema (local, co-localise).
// Bande d'items inline mono-majuscule separes par « · » : mots-cles (sans lien) OU liens
// (sociaux / contact). Extrait FIDELE des blocs inline `author-expertise` (.ap-expertise) et
// `author-social` (.ap-contact) de AuthorPageTemplate (rule 60 : deplacer le markup vers un
// composant catalogue, pas dupliquer). Generique et reutilisable pour tout profil / toute
// bande de mots-cles ou de liens. z.object SANS discriminatedUnion (pattern codegen).
// 0 token DS cree, 0 hardcode dans le rendu.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('keyword-strip'),
  /** En-tete editorial optionnel (kicker « § ... »). Absent = bande nue (cas expertise). */
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  /** Libelle a11y du <section> (aria-label) si pas de kicker visible. */
  aria_label_fr: z.string().optional(),
  aria_label_en: z.string().optional(),
  /** Couleur/semantique des items : muted = mots-cles (<p>), ink = liens contact (<address>). */
  tone: z.enum(['muted', 'ink']).optional(),
  /** Rythme padding-block : tight = bande sous hero (0 / space-9), base = section (space-12). */
  pad: z.enum(['tight', 'base']).optional(),
  /** Filet superieur (border-top hairline) pour separer d'un bloc precedent. */
  topRule: z.boolean().optional(),
  items: z
    .array(
      z.object({
        label: z.string(),
        /** Optionnel : rend un <a> (lien) au lieu d'un <span> (mot-cle). */
        href: z.string().optional(),
        /** Ouvre dans un nouvel onglet + rel noopener (liens externes). */
        external: z.boolean().optional(),
      }),
    )
    .min(1),
});

export type KeywordStripData = z.infer<typeof schema>;
