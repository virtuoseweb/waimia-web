// Waimia · Co-location DS (Wave #38, T3) · module `eeat-panel` (cas dur : global-ref EEAT_PACK)
//
// Schéma DÉPLACÉ depuis src/schemas/sections.ts (rule 60 : déplacer, pas dupliquer).
// `z.object` SANS le wrapper discriminatedUnion. `z` vient de `astro:content`.
// Contenu GLOBAL single-source (EEAT_PACK + EEAT_IMAGES) → pas de champ de contenu dans le
// schéma, seulement le pilotage de variante/fond + overrides éditoriaux optionnels.

import { z } from 'zod';

export const schema = z.object({
  type: z.literal('eeat-panel'),
  variant: z.enum(['media', 'columns', 'light', 'hero']).default('media'),
  background: z.enum(['ink', 'paper']).optional(),
  // Silo de maillage interne : sélectionne le jeu de liens (services / outil / secteurs /
  // articles) cohérent avec le silo de la page hôte. Absent = 'generic' (jeu historique),
  // donc rétrocompatible : les instances sans ce champ rendent le maillage actuel.
  // 'web' = pages de site (cluster site web), 'apps' = pages de logiciel sur mesure : liens
  // restreints à leur cluster (décision du 14 octobre 2026). Valeurs ajoutées, aucune retirée.
  silo: z.enum(['acquisition', 'commercial', 'ops', 'hub', 'generic', 'web', 'apps']).optional(),
  eyebrow: z.string().optional(),
  title: z.string().optional(),
  lead: z.string().optional(),
});
