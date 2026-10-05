// Waimia · module `market-cases` · schema
// Rubrique « Études de cas du marché » : cas réels documentés, réalisés par des tiers, rendus
// dans un registre visuellement distinct des preuves Waimia. Le CONTENU est global
// (src/data/market-cases.ts) : la section ne porte que le cadrage (titre, intro) et la liste
// des fonctions à afficher. Une fonction sans cas dans le store fait échouer le build.

import { z } from 'zod';
import { sectionBaseSchema } from '../_shared/base';

const groupSchema = z.object({
  /** Clé de fonction du store src/data/market-cases.ts (ex. `support-sav`). */
  function: z.string().regex(/^[a-z0-9-]+$/),
  /** Titre du groupe. Requis quand la section liste plusieurs fonctions (hub). */
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  /** Page d'analyse de la fonction (lien « lire l'analyse »), utilisé par la variante digest. */
  href: z.string().optional(),
});

export const schema = z.object({
  type: z.literal('market-cases'),
  ...sectionBaseSchema.shape,
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  intro_fr: z.string().optional(),
  intro_en: z.string().optional(),
  /** `full` : fiche complète (automatisé, outil, résultat, citation, limites, source). `digest` : hub, sans le détail de ce qui a été automatisé ni la citation ; les limites restent affichées. */
  variant: z.enum(['full', 'digest']).optional(),
  groups: z.array(groupSchema).min(1).max(6),
});

export type MarketCasesData = z.infer<typeof schema>;
