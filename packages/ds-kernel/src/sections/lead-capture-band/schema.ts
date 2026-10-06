// Waimia · module `lead-capture-band` · schema
// Bande de capture d'e-mail d'une ressource (lead magnet), bloc MAJEUR et non plus une ligne
// « facultatif ». Le moteur du formulaire reste l'organism LeadCapture (POST /api/lead-magnet,
// FormGuard anti-robots, états vide/erreur/envoi/succès, jamais de faux succès).
//   - mode `required` : ressource VERROUILLÉE (PDF), e-mail obligatoire, fichier en pièce jointe.
//   - mode `open`     : outil interactif, résultat déjà visible ; l'e-mail en garde la version.
// `lead_magnet` = clé de LEAD_MAGNETS (src/data/conversion.ts) ; une clé inconnue fait échouer
// le build (contrôle dans le composant). `benefits_*` : uniquement ce que l'e-mail apporte
// réellement (src/lib/lead-magnet-delivery.ts), jamais une promesse de séquence.
// Contenu GLOBAL par ressource : LEAD_CAPTURE_COPY (src/data/conversion.ts). Une section qui ne
// porte que `lead_magnet` reçoit ce texte ; chaque champ texte écrit ici le remplace (override).

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

const previewSchema = z.object({
  /** Illustration (webp du registre) : prioritaire sur la couverture dessinée. */
  image_src: z.string().optional(),
  image_alt_fr: z.string().optional(),
  image_alt_en: z.string().optional(),
  /** Couverture dessinée en CSS (aucune image) : bandeau, titre, ligne de format. */
  cover_kicker_fr: z.string().optional(),
  cover_kicker_en: z.string().optional(),
  cover_title_fr: z.string().optional(),
  cover_title_en: z.string().optional(),
  cover_meta_fr: z.string().optional(),
  cover_meta_en: z.string().optional(),
});

export const schema = z.object({
  type: z.literal('lead-capture-band'),
  ...sectionBaseSchema.shape,
  /** Slug de la ressource (clé de LEAD_MAGNETS). */
  lead_magnet: z.string().regex(/^[a-z0-9-]+$/),
  /** `required` : e-mail obligatoire (fichier verrouillé). `open` : résultat déjà affiché, l'e-mail en garde la version. Défaut : celui de la ressource. */
  mode: z.enum(['required', 'open']).optional(),
  /** `band` : bande pleine largeur, aperçu à droite. `card` : bloc dans une colonne de texte (corps d'article). */
  variant: z.enum(['band', 'card']).optional(),
  /** Id d'ancre (lien « Recevoir le PDF » plus haut dans la page). */
  anchor_id: z.string().regex(/^[a-z0-9-]+$/).optional(),
  /** Bande masquée au chargement : l'outil de la page la révèle quand un résultat existe. */
  initially_hidden: z.boolean().optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string().optional(),
  h2_en: z.string().optional(),
  /** Accroche : une ou deux phrases. */
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  /** Ce que l'e-mail apporte, une ligne par bénéfice. */
  benefits_fr: z.array(z.string()).min(1).max(6).optional(),
  benefits_en: z.array(z.string()).min(1).max(6).optional(),
  submit_label_fr: z.string().optional(),
  submit_label_en: z.string().optional(),
  preview: previewSchema.optional(),
});

export type LeadCaptureBandData = z.infer<typeof schema>;
