// Waimia · page-document.ts — helpers du format PageDocument (#39).
//
// Convertit dans les deux sens entre :
//   - une entrée de collection (objet frontmatter MDX à plat : meta + champs propres + sections),
//   - un `PageDocument` typé/sérialisable.
// Valide un PageDocument (Zod + slot-level via getSlots) et résout presets/colorschemes en
// props concrètes (PAS de référence persistée — le doc reste minimal et autoporteur).
//
// 0 token DS, 0 valeur en dur. Réutilise les sources de vérité existantes : sectionsArraySchema
// (schémas), getSlots (contrat de slots), listPresets/schemeProps (axes de variation).

import {
  pageDocumentSchema,
  PAGE_COLLECTIONS,
  type PageCollection,
  type PageDocument,
  type PageMeta,
} from '../schemas/page-document';
import type { SectionType } from '../schemas/sections';
import { getSlots } from './section-slots';
import { listPresets } from './section-presets';
import type { PresetProps } from './section-presets';
import { COLOR_SCHEME_BY_ID, schemeProps, type Surface } from './section-colorschemes';

/** Champs de `meta` à plat dans le frontmatter (le reste non-`sections` → collectionExtra). */
const META_FLAT_KEYS = [
  'slug',
  'lang',
  'title_fr',
  'title_en',
  'description_fr',
  'description_en',
  'seo',
] as const;

/**
 * Construit un `PageDocument` depuis les données d'une entrée de collection.
 * - les champs meta connus (à plat) → `meta`,
 * - tous les autres champs (hors `sections`) → `meta.collectionExtra` (passe-plat),
 * - `sections` tel quel.
 */
export function frontmatterToPageDoc(
  collection: PageCollection,
  slug: string,
  entryData: Record<string, unknown>,
): PageDocument {
  const { sections, slug: _slug, ...rest } = entryData as Record<string, unknown> & {
    sections?: unknown;
  };

  const collectionExtra: Record<string, unknown> = {};
  const flat: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rest)) {
    if ((META_FLAT_KEYS as readonly string[]).includes(key)) {
      flat[key] = value;
    } else {
      collectionExtra[key] = value;
    }
  }

  const meta = {
    collection,
    slug,
    lang: (flat.lang as 'fr' | 'en') ?? 'fr',
    title_fr: flat.title_fr as string | undefined,
    title_en: flat.title_en as string | undefined,
    description_fr: flat.description_fr as string | undefined,
    description_en: flat.description_en as string | undefined,
    seo: flat.seo as PageMeta['seo'],
    collectionExtra,
  };

  return {
    $schema: 'waimia.page-document/v1',
    meta,
    sections: (sections ?? []) as PageDocument['sections'],
  } as PageDocument;
}

/**
 * Inverse de `frontmatterToPageDoc` : reconstruit l'objet frontmatter qu'attend la collection
 * (meta à plat + collectionExtra étalé + `sections:`). `collection` n'est PAS réémis (c'est le
 * nom de la collection cible, pas un champ de l'entrée).
 */
export function pageDocToFrontmatter(doc: PageDocument): Record<string, unknown> {
  const { meta, sections } = doc;
  const { collection: _collection, collectionExtra, ...metaFlat } = meta;

  const out: Record<string, unknown> = { ...collectionExtra };
  for (const key of META_FLAT_KEYS) {
    const value = (metaFlat as Record<string, unknown>)[key];
    if (value !== undefined) out[key] = value;
  }
  out.sections = sections;
  return out;
}

/** Erreur de validation orientée champ (slot-level). */
export interface PageDocError {
  /** index de la section fautive dans `sections`, ou -1 pour une erreur de niveau document. */
  index: number;
  /** type de section concerné, ou '' au niveau document. */
  type: string;
  /** champ/slot fautif (ex. 'statement_fr', 'metrics'), ou '' si non localisable. */
  field: string;
  message: string;
}

export interface PageDocValidation {
  valid: boolean;
  errors: PageDocError[];
}

/**
 * Valide un PageDocument : (1) `pageDocumentSchema.safeParse` (structure + sections via Zod),
 * puis (2) par instance de section, validation slot-level via `getSlots(type)` pour des erreurs
 * orientées champ (slots de CONTENU requis présents et non vides).
 */
export function validatePageDoc(doc: unknown): PageDocValidation {
  const parsed = pageDocumentSchema.safeParse(doc);
  if (!parsed.success) {
    const errors: PageDocError[] = parsed.error.issues.map((issue) => {
      // path typique : ['sections', <index>, <field>] ou ['meta', <field>].
      const [root, maybeIndex, ...rest] = issue.path;
      const isSection = root === 'sections' && typeof maybeIndex === 'number';
      return {
        index: isSection ? (maybeIndex as number) : -1,
        type: '',
        field: isSection ? String(rest[0] ?? '') : issue.path.join('.'),
        message: issue.message,
      };
    });
    return { valid: false, errors };
  }

  // Slot-level : pour chaque section, vérifier que les slots de CONTENU requis sont fournis.
  const errors: PageDocError[] = [];
  const sections = parsed.data.sections as Array<Record<string, unknown> & { type: SectionType }>;
  sections.forEach((section, index) => {
    const type = section.type;
    const slots = getSlots(type).filter((s) => s.kind === 'content' && s.required);
    for (const slot of slots) {
      const present = slot.bilingual
        ? isFilled(section[`${slot.field}_fr`]) && isFilled(section[`${slot.field}_en`])
        : isFilled(section[slot.field]);
      if (!present) {
        errors.push({
          index,
          type,
          field: slot.bilingual ? `${slot.field}_fr` : slot.field,
          message: `slot de contenu requis manquant ou vide : « ${slot.field} »`,
        });
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

/** Vrai si une valeur de slot est réellement renseignée (non vide). */
function isFilled(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Résout un preset (type, presetId) en props CONCRÈTES à étaler dans une instance de section.
 * Retourne `undefined` si le preset n'existe pas. AUCUNE référence persistée : on renvoie une
 * copie des props pour étalement direct.
 */
export function resolvePreset(type: SectionType, presetId: string): PresetProps | undefined {
  const preset = listPresets(type).find((p) => p.id === presetId);
  if (!preset) return undefined;
  return { ...preset.props };
}

/**
 * Résout un colorscheme (id) en props CONCRÈTES (`background` + `cellCycle?`) à étaler dans une
 * instance. Retourne `undefined` si l'id est inconnu.
 */
export function resolveScheme(
  schemeId: string,
): { background: Surface; cellCycle?: Surface[] } | undefined {
  const scheme = COLOR_SCHEME_BY_ID[schemeId];
  if (!scheme) return undefined;
  return schemeProps(scheme);
}

export { PAGE_COLLECTIONS };
export type { PageCollection, PageDocument, PageMeta };
