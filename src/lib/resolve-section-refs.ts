// Waimia · P4.4-e Phase 0 · résolveur `{ref}` côté app (fondation inerte).
//
// Résout, au rendu (build SSG), les champs de section qui portent un pointeur
// `{ ref: 'source/id' }` vers leur forme inline, en lisant la table de vérité UNIQUE
// `REF_TARGETS` (packages/ds-kernel/.../refs.ts). Consommé par SectionsRenderer.astro.
//
// FONDATION INERTE (Phase 0) : `REF_TARGETS` est VIDE et les accessors sont des stubs.
// → `resolveSectionRefs` est un PASSTHROUGH strict (retourne la section inchangée, aucun
//   clone) tant qu'aucun champ n'est déclaré référençable. Les phases suivantes n'ont qu'à
//   enrichir DEUX registres (`SOURCE_ACCESSORS`, `PROJECTIONS`) sans toucher à la boucle.

import { getCollection, type CollectionEntry } from 'astro:content';
import type { SectionData } from '@waimia/ds-kernel';
import {
  REF_TARGETS,
  REF_SOURCES,
  isRef,
  parseRef,
  type RefSource,
} from '@waimia/ds-kernel/sections/_shared/refs';
import { LOGOS } from '../data/logos';
import { GUARANTEE_BY_ID, type Guarantee, type GuaranteeId } from '../data/guarantees';
import { getProofPoint, type ProofPoint, type ProofPointId } from '../data/proof-points';
import { getPainPoint, type PainPoint, type PainPointId } from '../data/pain-points';
import { PARTNERS, type Partner } from '../data/partners';
import { PRICING_GRID, type PricingTierId } from '../data/pricing';

// ─── Memo module-scope ────────────────────────────────────────────────────────
// Garantit qu'une même source de collection n'est chargée qu'UNE fois par build (même
// si Astro mémoïse déjà getCollection côté content layer). Les accessors async des phases
// suivantes passent leur `getCollection` par ce helper.
const sourceMemo = new Map<RefSource, Promise<unknown>>();

/** Charge (et mémoïse) une source une seule fois par build. */
export function loadSourceOnce<T>(source: RefSource, loader: () => Promise<T>): Promise<T> {
  let pending = sourceMemo.get(source);
  if (!pending) {
    pending = loader();
    sourceMemo.set(source, pending);
  }
  return pending as Promise<T>;
}

// ─── Registres à enrichir par les phases suivantes (les 2 SEULS points d'extension) ──

/**
 * Accessor par source : `(id) => entrée résolue` (sync ou async).
 * Phase 0 : stubs qui THROW explicitement (jamais un échec silencieux). Le résolveur
 * capture ce throw et le convertit en `console.warn` → le rendu ne casse jamais, mais
 * une source déclarée dans REF_TARGETS sans accessor câblé reste VISIBLE dans les logs.
 */
const SOURCE_ACCESSORS: Record<RefSource, (id: string) => unknown | Promise<unknown>> =
  REF_SOURCES.reduce(
    (acc, source) => {
      acc[source] = () => {
        throw new Error(`[resolveSectionRefs] source « ${source} » non câblée (à brancher en phase suivante)`);
      };
      return acc;
    },
    {} as Record<RefSource, (id: string) => unknown | Promise<unknown>>,
  );

// ─── P4.4-e Phase 1 : câblage des sources réelles (logos + cases) ───────────────
// logos : store synchrone src/data/logos.ts. `LOGOS[id]` a DÉJÀ la forme
// `logoMarqueeItemSchema` → accessor IDENTITÉ (aucune projection déclarée ci-dessous).
SOURCE_ACCESSORS.logos = (id) => LOGOS[id];
// cases : collection Astro chargée UNE fois par build (memo loadSourceOnce). Matching par
// `c.id` = EXACTEMENT le critère de CaseCardGrid.astro avant migration (Map indexée sur c.id).
SOURCE_ACCESSORS.cases = async (id) => {
  const cases = await loadSourceOnce('cases', () => getCollection('cases'));
  return cases.find((c) => c.id === id);
};
// ─── P4.4-e Phase 2 : câblage de la source `testimonials` ───────────────────────
// Collection Astro chargée UNE fois par build (memo loadSourceOnce). Matching par `t.id`
// (= `data.slug` via le loader glob quand présent, i.e. filename === slug pour cette
// collection). Projection déclarée plus bas (déballe `.data` + retire le `slug`).
SOURCE_ACCESSORS.testimonials = async (id) => {
  const all = await loadSourceOnce('testimonials', () => getCollection('testimonials'));
  return all.find((t) => t.id === id);
};
// ─── P4.4-e Phase 3 : câblage des stores SYNCHRONES src/data (accessors sync, 0 loadSourceOnce) ──
// guarantees : Map indexée par id. Projection déballe label/promise → title/body (plus bas).
SOURCE_ACCESSORS.guarantees = (id) => GUARANTEE_BY_ID.get(id as GuaranteeId);
// proof-points : helper find getProofPoint(id). Projection value/label (superset → subset).
SOURCE_ACCESSORS['proof-points'] = (id) => getProofPoint(id as ProofPointId);
// pain-points : helper find getPainPoint(id). Projection label/description → title/body.
SOURCE_ACCESSORS['pain-points'] = (id) => getPainPoint(id as PainPointId);
// partners : store tableau, identité par `slug`. Projection retire `slug`.
SOURCE_ACCESSORS.partners = (id) => PARTNERS.find((p) => p.slug === id);
// pricing : ACCESSOR-ONLY (aucune entrée REF_TARGETS ne le cible → jamais appelé par le
// résolveur à ce stade). Référentiel MINCE (prix/période/label) : aucun schéma de tier de
// section n'accepte cette forme sans fabriquer cta+features (rule 60 : 0 valeur inventée).
// Accessor câblé pour qu'une phase future n'ait qu'à ajouter REF_TARGETS + projection une fois
// un champ « prix seul » disponible (ou pricing-cards à cta/features optionnels).
SOURCE_ACCESSORS.pricing = (id) => PRICING_GRID.find((t) => t.tier === (id as PricingTierId));

/**
 * Projection par champ : `(entrée résolue) => forme inline attendue par le composant`.
 * Clé = même format que REF_TARGETS (`'<sectionType>.<field>'`). Identité par défaut si
 * aucune projection déclarée. Vide en Phase 0.
 */
const PROJECTIONS: Record<string, (resolved: unknown) => unknown> = {
  // case-card-grid.cases : l'entrée résolue est une CollectionEntry<'cases'> (forme collection,
  // ≠ forme d'item du composant). Projection reproduite VERBATIM depuis CaseCardGrid.astro
  // (mapping `caseRefs` pré-migration) : stack[] → 'a · b · c', href /cas-clients/<id>, sélection
  // des mêmes champs (les médias de reveal ne sont pas dérivés d'une ref, comme avant).
  'case-card-grid.cases': (resolved) => {
    const c = resolved as CollectionEntry<'cases'>;
    return {
      client: c.data.client,
      sector_fr: c.data.sector_fr,
      sector_en: c.data.sector_en,
      duration: c.data.duration,
      stack: c.data.stack.join(' · '),
      impact_fr: c.data.impact_fr,
      impact_en: c.data.impact_en,
      href: `/cas-clients/${c.id}`,
    };
  },
  // testimonial-wall.testimonials : l'entrée résolue est une CollectionEntry<'testimonials'>
  // (forme collection avec `.data` + un `slug` en trop). Projection = déballe `.data` vers la
  // forme d'item `testimonialWallItemSchema` attendue par TestimonialWall.astro (retire `slug`).
  'testimonial-wall.testimonials': (resolved) => {
    const t = resolved as CollectionEntry<'testimonials'>;
    return {
      quote_fr: t.data.quote_fr,
      quote_en: t.data.quote_en,
      author: t.data.author,
      role_fr: t.data.role_fr,
      role_en: t.data.role_en,
      company: t.data.company,
      avatar: t.data.avatar,
      linkedin: t.data.linkedin,
    };
  },
  // ─── P4.4-e Phase 3 : projections des stores synchrones vers la forme d'item du composant ──
  // guarantee-block.guarantees : Guarantee (label/promise) → item (title/body).
  'guarantee-block.guarantees': (resolved) => {
    const g = resolved as Guarantee;
    return { title_fr: g.label_fr, title_en: g.label_en, body_fr: g.promise_fr, body_en: g.promise_en };
  },
  // proof-bar.metrics : ProofPoint (superset) → metricSchema (value + label). On ne dérive que
  // les 3 champs lus par le composant ; description/category/sources sont écartés.
  'proof-bar.metrics': (resolved) => {
    const p = resolved as ProofPoint;
    return { value: p.value, label_fr: p.label_fr, label_en: p.label_en };
  },
  // pain-points.items : PainPoint (label/description) → item (title/body). `num` omis (optionnel :
  // le composant retombe sur l'index).
  'pain-points.items': (resolved) => {
    const p = resolved as PainPoint;
    return { title_fr: p.label_fr, title_en: p.label_en, body_fr: p.description_fr, body_en: p.description_en };
  },
  // ecosystem-partners.partners : Partner → item (retire `slug`, sinon identité de forme).
  'ecosystem-partners.partners': (resolved) => {
    const p = resolved as Partner;
    return { name: p.name, asset: p.asset, href: p.href, external: p.external, category: p.category, box: p.box };
  },
};

// ─── Résolution ────────────────────────────────────────────────────────────────

/**
 * Résout un pointeur unique. Ne throw JAMAIS côté rendu : toute source non câblée / id
 * introuvable / accessor en échec → `console.warn` + `undefined` (l'appelant filtre l'item).
 */
async function resolveOne(source: string, id: string, ctx: string): Promise<unknown> {
  const accessor = (SOURCE_ACCESSORS as Record<string, ((id: string) => unknown | Promise<unknown>) | undefined>)[source];
  if (!accessor) {
    console.warn(`[resolveSectionRefs] source inconnue « ${source} » (ref ${source}/${id} depuis ${ctx})`);
    return undefined;
  }
  try {
    const entry = await accessor(id);
    if (entry === undefined || entry === null) {
      console.warn(`[resolveSectionRefs] ref cassée : ${source}/${id} introuvable (depuis ${ctx})`);
      return undefined;
    }
    return entry;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[resolveSectionRefs] échec résolution ${source}/${id} (depuis ${ctx}) : ${msg}`);
    return undefined;
  }
}

/** Résout un item (inline → gardé tel quel ; `{ref}` → résolu + projeté ; cassé → undefined). */
async function resolveItem(item: unknown, projKey: string): Promise<unknown> {
  if (!isRef(item)) return item;
  const { source, id } = parseRef(item);
  const resolved = await resolveOne(source, id, projKey);
  if (resolved === undefined) return undefined;
  const project = PROJECTIONS[projKey];
  return project ? project(resolved) : resolved;
}

/** Résout la valeur d'un champ référençable (tableau d'items OU valeur scalaire). */
async function resolveField(sectionType: string, field: string, value: unknown): Promise<unknown> {
  const projKey = `${sectionType}.${field}`;
  if (Array.isArray(value)) {
    const out = await Promise.all(value.map((item) => resolveItem(item, projKey)));
    return out.filter((v) => v !== undefined); // items cassés retirés (warn déjà émis)
  }
  return resolveItem(value, projKey);
}

/**
 * Résout les refs d'une section avant rendu. Passthrough strict tant qu'aucun champ du
 * type n'est déclaré dans REF_TARGETS (cas Phase 0). `lang` est propagé pour les phases
 * suivantes (projections bilingues) ; inutilisé ici.
 */
export async function resolveSectionRefs(
  section: SectionData,
  lang: 'fr' | 'en',
): Promise<SectionData> {
  void lang;
  const prefix = `${(section as { type: string }).type}.`;
  const refFields = Object.keys(REF_TARGETS)
    .filter((key) => key.startsWith(prefix))
    .map((key) => key.slice(prefix.length));

  // Fondation inerte : 0 champ référençable → passthrough strict (aucun clone).
  if (refFields.length === 0) return section;

  const clone: Record<string, unknown> = { ...(section as Record<string, unknown>) };
  const sectionType = (section as { type: string }).type;
  for (const field of refFields) {
    if (!(field in clone)) continue;
    clone[field] = await resolveField(sectionType, field, clone[field]);
  }
  return clone as SectionData;
}
