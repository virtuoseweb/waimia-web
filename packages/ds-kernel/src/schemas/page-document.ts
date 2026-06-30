// Waimia · PageDocument (#39) — format de page typé, sérialisable JSON.
//
// But : formaliser le document de page composable EXISTANT (frontmatter MDX `sections:[...]`
// → SectionsRenderer → registry) en un objet typé, sérialisable JSON et convertible en
// frontmatter MDX (round-trip avec l'existant, AUCUNE migration de contenu). C'est le futur
// payload du MCP `page.compose` (#41).
//
// RÉUTILISE la source de vérité des sections (`sectionsArraySchema`, src/schemas/sections.ts) :
// on ne forke PAS le contrat d'instance des sections.
//
// 0 token DS, 0 valeur en dur. `z` vient d'`astro:content` comme dans sections.ts (cohérence
// + même neutralisation `astro:content`→zod hors build, cf scripts/derive-section-slots.mjs).

import { z } from 'zod';
import { sectionsArraySchema } from './sections';

/**
 * Clés EXACTES des collections de contenu (cf `collections` dans src/content.config.ts).
 * Source de vérité miroir : si une collection est ajoutée/retirée là-bas, mettre à jour ici.
 */
export const PAGE_COLLECTIONS = [
  'cases',
  'offres',
  'blog',
  'secteurs',
  'outils',
  'authors',
  'courses',
  'services',
  'lp',
  'cas-usages',
  'demonstrations',
  'implantations',
  'guides',
  'diagnostics',
  'comparatifs',
  'audits',
  'pages-locales',
] as const;

export type PageCollection = (typeof PAGE_COLLECTIONS)[number];

/**
 * Bloc SEO de page — sous-ensemble portable des champs SEO communs. Les champs spécifiques
 * d'une collection (priceRange, serviceType…) restent dans `collectionExtra` et sont validés
 * ensuite par la collection cible.
 */
export const pageSeoSchema = z
  .object({
    noindex: z.boolean().optional(),
    canonical: z.string().url().optional(),
    ogImage: z.string().optional(),
  })
  .optional();

/**
 * Métadonnées de page communes à toutes les collections. Les champs propres à une collection
 * (price_from_eur, faq_fr, taxonomies…) ne sont PAS listés ici : ils transitent par
 * `collectionExtra` (passe-plat) puis sont validés par le schéma de la collection cible.
 *
 * Pas de `pageRole` : il est dérivable du `type` de section via le registry (rule 60, anti-désync).
 */
export const pageMetaSchema = z.object({
  collection: z.enum(PAGE_COLLECTIONS),
  slug: z.string().regex(/^[a-z0-9/-]+$/, 'slug kebab-case (a-z, 0-9, tirets, slashes)'),
  lang: z.enum(['fr', 'en']).default('fr'),
  title_fr: z.string().optional(),
  title_en: z.string().optional(),
  description_fr: z.string().optional(),
  description_en: z.string().optional(),
  seo: pageSeoSchema,
  /**
   * Passe-plat des champs propres à la collection (price_from_eur, faq_fr, category…).
   * Validés ensuite par le schéma de la collection cible, PAS ici.
   */
  collectionExtra: z.record(z.string(), z.unknown()).default({}),
});

export type PageMeta = z.infer<typeof pageMetaSchema>;

/**
 * Document de page composable v1. `sections` réutilise EXACTEMENT `sectionsArraySchema`
 * (discriminated union + anchor/expand), donc le contrat d'instance des sections n'est jamais
 * dupliqué.
 */
export const pageDocumentSchema = z.object({
  $schema: z.literal('waimia.page-document/v1'),
  meta: pageMetaSchema,
  sections: sectionsArraySchema,
});

export type PageDocument = z.infer<typeof pageDocumentSchema>;
