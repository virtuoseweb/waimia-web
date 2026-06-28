// Waimia · section-colorschemes.ts — PILIER 5 (générateur déterministe), axe COULEUR.
//
// Les 16 schémas de couleur = TOUTES les combinaisons signifiantes du DS (mono/duo/trio
// sur les 3 rôles primaires + tons doux mono), BORNÉES. Source de vérité unique pour :
//   - le sélecteur de schéma du builder/library,
//   - la preuve de complétude couleur de la preview,
//   - le manifest MCP (annonce l'espace couleur exact).
//
// L'axe couleur est ORTHOGONAL aux axes structurels : on n'explose PAS le catalogue en
// cartes ×16 ; chaque variante structurelle est visualisable dans n'importe quel schéma.
//
// 0 token inventé : `Surface` = exactement les surfaces DS de src/styles/tokens.css. Le
// moteur résout chaque surface en var(--<surface>) ; rien en dur ici.

/** Surfaces DS (cf src/styles/tokens.css). 0 valeur en dur, 0 surface inventée. */
export type Surface =
  | 'paper'
  | 'paper-2'
  | 'paper-3'
  | 'ink'
  | 'ink-2'
  | 'ink-3'
  | 'accent';

/** Nombre de couleurs distinctes mises en jeu par le schéma. */
export type SchemeKind = 'mono' | 'duo' | 'trio';

export interface ColorScheme {
  /** id stable kebab-case (slug), unique parmi les 16. */
  id: string;
  /** mono (1 couleur) | duo (fond + cellules vedettes) | trio (fond + 2 couleurs en cycle). */
  kind: SchemeKind;
  /** surface de FOND de la section. */
  base: Surface;
  /** surfaces des cellules vedettes/alternées (mono = [], duo = [sec], trio = [a, b] en cycle). */
  cells: Surface[];
  /** libellé FR lisible (catalogue / DS Studio). 0 U+2014. */
  label: string;
}

/** Libellé FR d'une surface (pour composer les labels de schéma). */
const SURFACE_LABEL: Record<Surface, string> = {
  paper: 'papier',
  'paper-2': 'papier 2',
  'paper-3': 'papier 3',
  ink: 'encre',
  'ink-2': 'encre 2',
  'ink-3': 'encre 3',
  accent: 'accent',
};

/* ───────────────────────────── MONO (7) ─────────────────────────────
 * Section uniforme dans une seule surface : les 3 rôles primaires + les 4 tons doux. */
const MONO: ColorScheme[] = (
  ['paper', 'paper-2', 'paper-3', 'ink', 'ink-2', 'ink-3', 'accent'] as const
).map((base) => ({
  id: `mono-${base}`,
  kind: 'mono' as const,
  base,
  cells: [] as Surface[],
  label: `Mono ${SURFACE_LABEL[base]}`,
}));

/* ───────────────────────────── DUO (6) ─────────────────────────────
 * Fond + cellules vedettes/alternées dans la 2e couleur. Paires ORDONNÉES des 3 rôles
 * primaires {paper, ink, accent}, base != secondaire. */
const DUO_PAIRS: Array<[Surface, Surface]> = [
  ['paper', 'ink'],
  ['paper', 'accent'],
  ['ink', 'paper'],
  ['ink', 'accent'],
  ['accent', 'paper'],
  ['accent', 'ink'],
];
const DUO: ColorScheme[] = DUO_PAIRS.map(([base, sec]) => ({
  id: `duo-${base}-${sec}`,
  kind: 'duo' as const,
  base,
  cells: [sec],
  label: `Duo ${SURFACE_LABEL[base]} + ${SURFACE_LABEL[sec]}`,
}));

/* ───────────────────────────── TRIO (3) ─────────────────────────────
 * Fond + les 2 autres couleurs primaires en cycle sur les cellules. */
const PRIMARY: Surface[] = ['paper', 'ink', 'accent'];
const TRIO: ColorScheme[] = PRIMARY.map((base) => {
  const cells = PRIMARY.filter((s) => s !== base);
  return {
    id: `trio-${base}`,
    kind: 'trio' as const,
    base,
    cells,
    label: `Trio ${SURFACE_LABEL[base]} (cycle ${cells.map((c) => SURFACE_LABEL[c]).join('/')})`,
  };
});

/** Les 16 schémas = 7 mono + 6 duo + 3 trio. Ordre stable, déterministe. */
export const COLOR_SCHEMES: ColorScheme[] = [...MONO, ...DUO, ...TRIO];

/** Lookup par id. */
export const COLOR_SCHEME_BY_ID: Record<string, ColorScheme> = Object.fromEntries(
  COLOR_SCHEMES.map((s) => [s.id, s]),
);

/**
 * Props à passer à une section pour appliquer un schéma (props honorées par le moteur) :
 *   - `background` = surface de fond,
 *   - `cellCycle`  = surfaces des cellules à cycler (duo : 1 élément ; trio : 2 éléments).
 * mono → pas de cellCycle (les cellules héritent du fond). Aucune clé inventée.
 */
export function schemeProps(scheme: ColorScheme): {
  background: Surface;
  cellCycle?: Surface[];
} {
  if (scheme.kind === 'mono') {
    return { background: scheme.base };
  }
  if (scheme.kind === 'trio') {
    return { background: scheme.base, cellCycle: scheme.cells };
  }
  // duo
  return { background: scheme.base, cellCycle: scheme.cells };
}
