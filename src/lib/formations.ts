// Waimia · formations · chargeur des pages composables /formations et /formations/<slug>.
//
// Source : src/content/formations/*.json (index.json = hub). Meme contrat que les collections
// composables (title/description bilingues, seo, faq, sections[] valide par le schema kernel),
// valide ici au build par Zod : un JSON invalide casse le build, comme une collection.
// Choix : chargeur dedie plutot qu'une collection dans content.config.ts, pour ne pas toucher
// un fichier partage pendant la refonte multi-agents. Promotion en collection possible ensuite
// (meme forme de donnees, il suffit de declarer `formations` avec ce schema).

import { z } from 'zod';
import { sectionsArraySchema } from '@waimia/ds-kernel';

const faqArray = z.array(z.object({ q: z.string(), a: z.string() })).optional();

const formationSchema = z.object({
  title_fr: z.string().min(1),
  title_en: z.string().min(1),
  description_fr: z.string().min(40).max(180),
  description_en: z.string().min(40).max(180),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'kebab-case lowercase'),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  seo: z.object({ noindex: z.boolean().default(false), serviceType: z.string().optional() }).optional(),
  faq_fr: faqArray,
  faq_en: faqArray,
  sections: sectionsArraySchema,
});

export type Formation = z.infer<typeof formationSchema>;
export interface FormationEntry {
  /** Nom de fichier sans extension : `index` = hub /formations, sinon /formations/<id>. */
  id: string;
  data: Formation;
}

const files = import.meta.glob<{ default: unknown }>('../content/formations/*.json', { eager: true });

export function listFormations(): FormationEntry[] {
  return Object.entries(files)
    .map(([path, mod]) => {
      const id = path.split('/').pop()!.replace(/\.json$/, '');
      const parsed = formationSchema.safeParse(mod.default);
      if (!parsed.success) {
        throw new Error(`formations/${id}.json invalide : ${parsed.error.message}`);
      }
      return { id, data: parsed.data };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}
