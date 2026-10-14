/**
 * blog-taxo-visuals.ts · Source unique de vérité pour l'habillage illustré du blog (HAB-7).
 *
 * Chaque silo (SILOS, src/data/taxonomies.ts) est associée à une illustration DS duotone
 * (fond crème conservé) et à une teinte `hue` appliquée en `filter: hue-rotate(Ndeg)`
 * côté rendu (ArticleGrid / hero). Le `hue` est une valeur de filtre structurelle
 * (degrés), pas une couleur du Design System : il vit donc dans cette map et non
 * dans les tokens. 0 token DS créé.
 *
 * Cette map n'est QUE le visuel de repli par catégorie : la résolution d'une carte
 * (image du hero de la page détail d'abord, puis cette map si son dessin est libre sur la page,
 * puis un choix par tags, sans doublon de dessin) vit dans src/lib/card-visual.ts.
 */

import type { Silo } from '../data/taxonomies';

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
export const BLOG_TAXO_VISUALS: Record<Silo, BlogTaxoVisual> = {
  automatisation: { image: illustrationPath('computer-health'), hue: 250 },
  agents: { image: illustrationPath('man-and-woman-hi'), hue: 320 },
  claude: { image: illustrationPath('style-11'), hue: 60 },
  web: { image: illustrationPath('computer-health'), hue: 20 },
  applications: { image: illustrationPath('woman-computer'), hue: 140 },
  commercial: { image: illustrationPath('men-on-hand'), hue: 0 },
  acquisition: { image: illustrationPath('money-money'), hue: 30 },
  donnees: { image: illustrationPath('woman-computer'), hue: 110 },
  conseil: { image: illustrationPath('style-8'), hue: 200 },
  conformite: { image: illustrationPath('chess'), hue: 170 },
  formation: { image: illustrationPath('woman-and-people'), hue: 190 },
  studio: { image: illustrationPath('style-12'), hue: 280 },
};
