// Waimia · DS · thèmes de page (presets de tokens coordonnés). SOURCE DE VÉRITÉ UNIQUE (rule 59).
//
// Un « thème » = un jeu de tokens CSS coordonnés (accent + paper + ink, avec leurs miroirs RGB)
// appliqués en LIVE sur `document.documentElement` : comme tout le rendu consomme var(--token),
// changer la valeur repeint instantanément tout le sous-arbre (principe ACSS / DS Studio, P2.8).
//
// Deux origines :
//   - DEMO_PRESETS  : thèmes de démonstration soignés, compile-time (couche C, palette cohérente).
//   - persistés     : src/data/ds-presets.json, écrits par le DS Studio en dev (POST /api/ds/preset).
//
// Ce module est lu par DEUX surfaces (donc extrait ici pour ne pas dupliquer la donnée) :
//   - /library/studio  (DS Studio global : liste « Thèmes & presets »)
//   - /library/builder (StyleScreen : choix de thème pour la page en cours de composition)
//
// 0 nouveau token DS, 0 tiret cadratin U+2014.

/** Thèmes de démonstration : chaque preset déplace accent + paper + ink de façon coordonnée. */
export const DEMO_PRESETS: Record<string, Record<string, string>> = {
  'Encre & ardoise': {
    '--accent': '#3B6EA5', '--accent-sur-clair': '#2C5681', '--accent-rgb': '59, 110, 165',
    '--paper': '#F2F3F5', '--paper-2': '#E8EAEE', '--paper-3': '#DDE0E6',
    '--ink': '#10151C', '--ink-2': '#1C242F', '--ink-rgb': '16, 21, 28',
  },
  'Forêt sobre': {
    '--accent': '#2F7D5B', '--accent-sur-clair': '#246347', '--accent-rgb': '47, 125, 91',
    '--paper': '#F4F2EC', '--paper-2': '#EBE8DF', '--paper-3': '#E1DDD1',
    '--ink': '#101410', '--ink-2': '#1B221B', '--ink-rgb': '16, 20, 16',
  },
  'Nuit prune': {
    '--accent': '#B5547E', '--accent-sur-clair': '#933F64', '--accent-rgb': '181, 84, 126',
    '--paper': '#F4F1F3', '--paper-2': '#EBE6E9', '--paper-3': '#E1DADF',
    '--ink': '#161019', '--ink-2': '#241B28', '--ink-rgb': '22, 16, 25',
  },
};

/** Preset de thème persisté (src/data/ds-presets.json), écrit par le DS Studio en dev. */
export interface PersistedThemePreset {
  slug: string;
  name: string;
  savedAt?: string;
  tokens: Record<string, string>;
}

/** Aperçu de palette d'un thème : valeurs LITTÉRALES lues dans les tokens du preset (pour la carte). */
export interface StyleThemeSwatch {
  accent?: string;
  paper?: string;
  ink?: string;
}

/** Thème normalisé exposé aux écrans (structurellement compatible avec atelier-ui `StyleTheme`). */
export interface StyleThemeData {
  /** Id stable (slug) : sert de clé de sélection et de data-testid. */
  id: string;
  /** Nom lisible affiché sur la carte. */
  label: string;
  /** Origine : démo compile-time vs thème persisté (git). */
  kind: 'demo' | 'saved';
  /** Jeu de tokens à appliquer en LIVE ({ "--token": "valeur" }). */
  tokens: Record<string, string>;
  /** Palette représentative (accent/paper/ink) dérivée des tokens du thème. */
  swatch: StyleThemeSwatch;
}

/** Slug déterministe depuis un nom lisible : sans accents, minuscules, alphanum + tirets simples. */
function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Dérive la palette d'aperçu (accent/paper/ink) depuis les tokens littéraux du thème. */
function swatchOf(tokens: Record<string, string>): StyleThemeSwatch {
  const swatch: StyleThemeSwatch = {};
  if (tokens['--accent']) swatch.accent = tokens['--accent'];
  if (tokens['--paper']) swatch.paper = tokens['--paper'];
  if (tokens['--ink']) swatch.ink = tokens['--ink'];
  return swatch;
}

/**
 * Fusionne démos + persistés en liste normalisée (démos d'abord, puis persistés triés par slug).
 * Aucune valeur inventée : les tokens et la palette viennent des presets réels.
 */
export function buildStyleThemes(persisted: PersistedThemePreset[]): StyleThemeData[] {
  const demos: StyleThemeData[] = Object.entries(DEMO_PRESETS).map(([label, tokens]) => ({
    id: slugify(label),
    label,
    kind: 'demo' as const,
    tokens,
    swatch: swatchOf(tokens),
  }));
  const saved: StyleThemeData[] = (Array.isArray(persisted) ? persisted : [])
    .filter((p) => p && typeof p.name === 'string' && p.tokens && typeof p.tokens === 'object')
    .slice()
    .sort((a, b) => String(a.slug).localeCompare(String(b.slug)))
    .map((p) => ({
      id: p.slug || slugify(p.name),
      label: p.name,
      kind: 'saved' as const,
      tokens: p.tokens,
      swatch: swatchOf(p.tokens),
    }));
  return [...demos, ...saved];
}
