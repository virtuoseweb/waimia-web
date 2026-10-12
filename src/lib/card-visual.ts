/**
 * card-visual.ts · Source unique de l'image des cartes de contenu (hub Ressources + /blog).
 *
 * Une carte reprend l'image que le HERO de sa page détail utilise, lue par le même champ :
 *   - blog      : `heroIllustration.src` (ou `heroImage`) du frontmatter ;
 *   - guides, comparatifs : 1re section `hero-split-media` → `illustration.src`, sinon `media_src` ;
 *   - outils    : `heroIllustration.src`, sinon le motif choisi par outil (hero-illustrations.ts).
 * Sans image de hero explicite : le visuel de sa catégorie (BLOG_TAXO_VISUALS, teinté),
 * puis un choix par tags dans la bibliothèque (illustration-pick.ts).
 *
 * Unicité PAR PAGE : deux cartes d'un même lot n'affichent jamais le même DESSIN (clé
 * `drawing`, donc deux variantes de couleur d'un dessin comptent pour un doublon). Le lot est
 * résolu une seule fois pour tout le hub : les vues filtrées et /blog en lisent un
 * sous-ensemble, donc restent uniques et cohérentes entre elles. Déterministe, 0 Math.random.
 */
import { BLOG_TAXO_VISUALS } from './blog-taxo-visuals';
import {
  drawingKey,
  drawingKeyOfSrc,
  illustrationLibrary,
  illustrationPool,
  illustrationSrc,
  pickIllustrationScored,
  scoreIllustration,
  type Illustration,
} from './illustration-pick';
import type { Silo } from '../data/taxonomies';

export type CardVisualInput = {
  /** Texte de choix par tags (titre, extrait). */
  text: string;
  silo?: string;
  /** Slug de la page : ses dessins dédiés (`<slug>-…` hors pool automatique) sont candidats. */
  slug?: string;
  /** Image du hero de la page détail, quand elle est explicite. */
  heroSrc?: string;
};

export type CardVisualSource = 'hero' | 'category' | 'tags' | 'tags-weak';

export type CardVisual = {
  image: string;
  /** Tags qui matchent (source `tags` seulement) : sert à repérer les contenus sans dessin pertinent. */
  score?: number;
  /** Degrés de `hue-rotate`, seulement pour les visuels de catégorie (base corail d'origine). */
  tint?: number;
  source: CardVisualSource;
};

/** Image de hero d'une page composable : première section `hero-split-media`. */
export function heroSrcFromSections(sections: unknown): string | undefined {
  const first = Array.isArray(sections) ? (sections[0] as Record<string, unknown> | undefined) : undefined;
  if (!first) return undefined;
  const illustration = first.illustration as { src?: string } | undefined;
  const mediaSrc = first.media_src;
  return illustration?.src ?? (typeof mediaSrc === 'string' ? mediaSrc : undefined);
}

/** Bonus du visuel de catégorie : il passe devant une correspondance d'un seul tag, mais
 *  cède devant deux tags ou plus (un dessin vraiment lié au sujet vaut mieux qu'un défaut). */
const CATEGORY_BONUS = 1.5;
/** Bonus d'un dessin dédié à la page (même début de slug, au moins deux segments). */
const DEDICATED_BONUS = 3;

/** Vrai si le slug du dessin commence par les deux premiers segments du slug de la page. */
const isDedicated = (ill: Illustration, slug?: string): boolean => {
  if (!slug) return false;
  const head = slug.split('-').slice(0, 2).join('-');
  return head.includes('-') && ill.slug.startsWith(`${head}-`);
};

/** Hash 32 bits (FNV-1a) : départage les égalités de façon stable. */
const hash = (s: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

export function resolveCardVisuals(inputs: CardVisualInput[]): CardVisual[] {
  const out: (CardVisual | undefined)[] = inputs.map(() => undefined);
  const used = new Set<string>();

  // 1. Heros explicites : réservés avant tout fallback, dans l'ordre du lot.
  inputs.forEach((it, i) => {
    if (!it.heroSrc) return;
    const key = drawingKeyOfSrc(it.heroSrc);
    if (used.has(key)) return; // même dessin déjà pris : cette carte retombe sur les fallbacks
    used.add(key);
    out[i] = { image: it.heroSrc, source: 'hero' };
  });

  // 2. Les autres : affectation gloutonne par meilleur score, du couple (carte, dessin) le
  //    plus pertinent au moins pertinent, dessins déjà utilisés exclus. Un couple vaut les
  //    tags qui matchent le texte de la carte, plus un bonus si le dessin est le visuel de
  //    sa catégorie. Égalités : ordre du lot puis hash stable (0 Math.random).
  const pool = illustrationPool();
  const library = illustrationLibrary();
  const pending = inputs.map((_, i) => i).filter((i) => !out[i]);
  while (pending.length > 0) {
    let best: { i: number; ill: Illustration; total: number; tags: number; own: boolean; tie: number } | undefined;
    for (const i of pending) {
      const it = inputs[i];
      const catImage = it.silo ? BLOG_TAXO_VISUALS[it.silo as Silo]?.image : undefined;
      const catKey = catImage ? drawingKeyOfSrc(catImage) : undefined;
      const candidates = it.slug
        ? [...pool, ...library.filter((ill) => !ill.fallback && isDedicated(ill, it.slug))]
        : pool;
      for (const ill of candidates) {
        const key = drawingKey(ill);
        if (used.has(key)) continue;
        const own = catKey !== undefined && key === catKey;
        const tags = scoreIllustration(ill, it.text);
        const total = tags + (own ? CATEGORY_BONUS : 0) + (isDedicated(ill, it.slug) ? DEDICATED_BONUS : 0);
        const tie = hash(`${it.text}#${ill.slug}`);
        if (!best || total > best.total || (total === best.total && tie < best.tie)) {
          best = { i, ill, total, tags, own, tie };
        }
      }
    }
    if (!best) break; // pool épuisé
    const key = drawingKey(best.ill);
    used.add(key);
    const cat = best.own ? BLOG_TAXO_VISUALS[inputs[best.i].silo as Silo] : undefined;
    out[best.i] = best.own
      ? { image: cat!.image, tint: cat!.hue, source: 'category' }
      : { image: illustrationSrc(best.ill, 'paper'), source: best.tags > 0 ? 'tags' : 'tags-weak', score: best.tags };
    pending.splice(pending.indexOf(best.i), 1);
  }
  // Pool épuisé (plus de dessin libre) : repli déterministe, doublon assumé et signalé.
  for (const i of pending) {
    const pick = pickIllustrationScored(inputs[i].text, { exclude: new Set() });
    out[i] = { image: illustrationSrc(pick.ill, 'paper'), source: 'tags-weak' };
  }

  return out as CardVisual[];
}
