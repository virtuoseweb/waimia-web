// Sélection déterministe d'une illustration de la bibliothèque `src/data/illustrations.json`
// (duotone paper/ink). Utilisé comme fallback visuel quand une section (ex. feature-zigzag)
// n'a pas de média explicite. 0 Math.random : même entrée → même sortie à chaque build.
import library from '../data/illustrations.json';

export type Illustration = {
  slug: string;
  paper: string;
  ink: string;
  width: number;
  height: number;
  alt_fr: string;
  alt_en: string;
  tags: string[];
  fallback: boolean;
  source: string;
  /** Distribution de couleurs (scripts/illustrations/style.json `casts`). */
  palette?: 'duotone' | 'tritone';
  cast?: string;
  /** Dessin d'origine : les variantes de couleur d'un même dessin partagent cette clé. */
  drawing?: string;
};

/** Clé d'unicité par section : deux variantes du même dessin ne cohabitent jamais. */
export const drawingKey = (ill: Illustration): string => ill.drawing ?? ill.slug;

const ALL: Illustration[] = (library as { illustrations: Illustration[] }).illustrations;
const POOL: Illustration[] = ALL.filter((ill) => ill.fallback);

/** minuscules, sans accents, non-alphanumériques → espace. */
const normalise = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

/** Un mot de tag matche un mot du texte s'il est identique, si l'un est préfixe de
 *  l'autre avec un préfixe d'au moins 4 caractères (budget/budgets, migration/migrations),
 *  ou s'ils partagent un radical commun d'au moins 6 caractères (automatiser/automatisation). */
const wordHit = (tagWord: string, textWords: string[]): boolean =>
  textWords.some((w) => {
    if (w === tagWord) return true;
    const shorter = w.length < tagWord.length ? w : tagWord;
    const longer = shorter === w ? tagWord : w;
    if (shorter.length >= 4 && longer.startsWith(shorter)) return true;
    // Radical commun ≥ 6 caractères (automatiser/automatisation).
    return shorter.length >= 6 && w.slice(0, 6) === tagWord.slice(0, 6);
  });

const score = (ill: Illustration, textWords: string[]): number =>
  ill.tags.reduce((acc, tag) => {
    const parts = normalise(tag).split(' ').filter(Boolean);
    return parts.length > 0 && parts.every((p) => wordHit(p, textWords)) ? acc + 1 : acc;
  }, 0);

/** Hash 32 bits (FNV-1a) stable. */
const hash = (s: string): number => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

/** Toute la bibliothèque (y compris les dessins propres à une page, `fallback: false`). */
export const illustrationLibrary = (): readonly Illustration[] => ALL;

/** Pool automatique (illustrations `fallback: true`), dans l'ordre de la bibliothèque. */
export const illustrationPool = (): readonly Illustration[] => POOL;

/** Score de tags d'une illustration pour un texte (nombre de tags qui matchent). */
export const scoreIllustration = (ill: Illustration, text: string): number =>
  score(ill, normalise(text).split(' ').filter(Boolean));

export type ScoredPick = {
  ill: Illustration;
  /** Nombre de tags de l'illustration qui matchent le texte (0 = choix par hash, sans lien). */
  score: number;
  /** Vrai si le pool entier est exclu : l'illustration rendue est alors un doublon forcé. */
  exhausted: boolean;
};

/** Même choix que `pickIllustration`, avec le score de tags et l'état du pool exposés. */
export function pickIllustrationScored(
  text: string,
  opts: { exclude?: Set<string>; seed?: number } = {},
): ScoredPick {
  const exclude = opts.exclude ?? new Set<string>();
  const seed = opts.seed ?? 0;
  const available = POOL.filter((ill) => !exclude.has(drawingKey(ill)));
  const candidates = available.length > 0 ? available : POOL;

  const textWords = normalise(text).split(' ').filter(Boolean);
  let best = -1;
  let top: Illustration[] = [];
  for (const ill of candidates) {
    const s = score(ill, textWords);
    if (s > best) {
      best = s;
      top = [ill];
    } else if (s === best) {
      top.push(ill);
    }
  }
  // Égalité (dont score 0) → choix déterministe par hash du texte + seed.
  return {
    ill: top[hash(`${text}#${seed}`) % top.length],
    score: best,
    exhausted: available.length === 0,
  };
}

export function pickIllustration(
  text: string,
  opts: { exclude?: Set<string>; seed?: number } = {},
): Illustration {
  return pickIllustrationScored(text, opts).ill;
}

const BY_SRC = new Map<string, Illustration>();
for (const ill of ALL) {
  BY_SRC.set(ill.paper, ill);
  BY_SRC.set(ill.ink, ill);
}

/** Clé de dessin d'un fichier image : celle de la bibliothèque si le fichier y figure, sinon
 *  le nom de fichier sans suffixe de fond (-paper / -ink). */
export const drawingKeyOfSrc = (src: string): string => {
  const hit = BY_SRC.get(src);
  if (hit) return drawingKey(hit);
  return (src.split('/').pop() ?? src).replace(/\.(webp|png|jpe?g|svg)$/i, '').replace(/-(paper|ink)$/, '');
};

export const illustrationSrc = (ill: Illustration, tone: 'paper' | 'ink'): string =>
  tone === 'ink' ? ill.ink : ill.paper;
