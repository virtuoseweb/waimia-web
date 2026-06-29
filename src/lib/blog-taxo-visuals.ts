/**
 * blog-taxo-visuals.ts · Source unique de vérité pour l'habillage illustré du blog (HAB-7).
 *
 * Chaque catégorie de la taxonomie blog est associée à une illustration DS duotone
 * (fond crème conservé) et à une teinte `hue` appliquée en `filter: hue-rotate(Ndeg)`
 * côté rendu (ArticleGrid / hero). Le `hue` est une valeur de filtre structurelle
 * (degrés), pas une couleur du Design System : il vit donc dans cette map et non
 * dans les tokens. 0 token DS créé.
 *
 * Résolution par article :
 *  - si `heroImage` explicite en frontmatter → on l'utilise tel quel (override illustration),
 *    MAIS la teinte `hue` reste dérivée de la `category`.
 *  - sinon illustration = celle de la map pour sa `category`.
 *  - `category` absente/inconnue (ou type essai/notes/avis sans category mappée) → fallback.
 */

const ILLUSTRATION_BASE = '/images/illustrations/ds';

/** Construit le chemin absolu d'une illustration DS `-paper.webp`. */
function illustrationPath(name: string): string {
  return `${ILLUSTRATION_BASE}/${name}-paper.webp`;
}

export interface BlogTaxoVisual {
  /** Chemin absolu de l'illustration `-paper.webp`. */
  image: string;
  /** Teinte en degrés pour `filter: hue-rotate(Ndeg)` (0 = coral de base). */
  hue: number;
}

/** Map catégorie → illustration + hue. Valeurs validées empiriquement (HAB-7). */
export const BLOG_TAXO_VISUALS: Record<string, BlogTaxoVisual> = {
  crm: { image: illustrationPath('men-on-hand'), hue: 0 },
  acquisition: { image: illustrationPath('money-money'), hue: 30 },
  pilotage: { image: illustrationPath('woman-computer'), hue: 110 },
  gouvernance: { image: illustrationPath('chess'), hue: 170 },
  'contenu-seo-geo': { image: illustrationPath('band-showing-tv'), hue: 220 },
};

/** Fallback : catégorie absente/inconnue, ou type sans category mappée. */
export const BLOG_TAXO_FALLBACK: BlogTaxoVisual = {
  image: illustrationPath('style-12'),
  hue: 280,
};

/** Forme minimale lue sur une entrée blog. */
export interface BlogVisualInput {
  category?: string | null;
  heroImage?: string | null;
}

/**
 * Résout l'illustration + la teinte d'un article blog.
 * Robuste : category absente → fallback. heroImage explicite → override de l'image,
 * teinte toujours dérivée de la category (fallback si absente).
 */
export function resolveBlogVisual(entryData: BlogVisualInput): BlogTaxoVisual {
  const base = (entryData.category && BLOG_TAXO_VISUALS[entryData.category]) || BLOG_TAXO_FALLBACK;
  const image = entryData.heroImage ? entryData.heroImage : base.image;
  return { image, hue: base.hue };
}
