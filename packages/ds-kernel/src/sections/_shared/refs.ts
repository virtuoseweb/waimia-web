// Waimia · P4.4-e Phase 0 · feuille partagée PURE — fondation du résolveur `{ref}`.
//
// Mécanisme générique de référence de contenu global : un champ de section réutilisé
// cross-page (cas, logos, avis, prix, pain-points...) peut porter SOIT sa forme inline,
// SOIT un pointeur `{ ref: 'source/id' }` résolu au rendu vers une source unique.
//
// FEUILLE PURE : n'importe QUE `zod` (comme subschemas.ts / locals.ts). 0 import vers
// sections.ts / registry / Astro / getCollection (anti-cycle, réutilisable côté build ET app).
//
// FONDATION INERTE (Phase 0) : `REF_TARGETS` est VIDE → aucune section n'est câblée,
// donc 0 changement de comportement observable. Les phases suivantes peuplent la table.

import { z } from 'zod';

/**
 * Sources de contenu global résolubles. Tuple readonly = source de vérité des sources
 * valides ; `RefSource` en dérive. L'ordre n'a pas de sémantique.
 */
export const REF_SOURCES = [
  'cases',
  'authors',
  'testimonials',
  'pricing',
  'pain-points',
  'proof-points',
  'guarantees',
  'partners',
  'logos',
] as const;

export type RefSource = (typeof REF_SOURCES)[number];

/**
 * Forme du pointeur de référence : objet STRICT à clé unique `ref` = `'<source>/<id>'`.
 * C'est exactement cette forme que la détection runtime (`isRef`) et la dérivation de
 * slots (`derive-section-slots.mjs`) shape-matchent.
 */
export const refSchema = z
  .object({ ref: z.string().regex(/^[a-z-]+\/[a-z0-9-]+$/) })
  .strict();

export type Ref = z.infer<typeof refSchema>;

/**
 * Enveloppe un schéma d'item : accepte la forme inline OU un pointeur `{ref}`.
 * Utilisé par les phases suivantes sur les champs de section référençables (0 usage ici).
 */
export function refOrInline<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.union([itemSchema, refSchema]);
}

/**
 * Détection à l'exécution (rendu) : objet non-null, clé UNIQUE `ref` de type string.
 */
export function isRef(value: unknown): value is Ref {
  if (value === null || typeof value !== 'object') return false;
  const keys = Object.keys(value as Record<string, unknown>);
  return (
    keys.length === 1 &&
    keys[0] === 'ref' &&
    typeof (value as { ref?: unknown }).ref === 'string'
  );
}

/**
 * Découpe un pointeur `{ ref: 'source/id' }` en `{ source, id }` (split au PREMIER `/`).
 */
export function parseRef(value: { ref: string }): { source: string; id: string } {
  const raw = value.ref;
  const slash = raw.indexOf('/');
  if (slash === -1) return { source: raw, id: '' };
  return { source: raw.slice(0, slash), id: raw.slice(slash + 1) };
}

/**
 * SOURCE DE VÉRITÉ UNIQUE des champs référençables.
 * Format d'une entrée : `'<sectionType>.<field>': '<source>'` (ex. `'logo-marquee.logos': 'logos'`).
 * Lue à la fois par le résolveur app (`src/lib/resolve-section-refs.ts`) et par
 * `derive-section-slots.mjs` (stampe `slot.refSource`) → aucune table dupliquée côté builder.
 * À PEUPLER par les phases suivantes (migration de sections) — VIDE en Phase 0 (fondation inerte).
 */
export const REF_TARGETS: Record<string, RefSource> = {
  // (aucune entrée en Phase 0 : la fondation reste inerte)
};
