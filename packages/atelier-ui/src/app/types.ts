// Waimia · Atelier · BuilderApp (#39, brick B6) : types du COEUR du nouvel editeur visuel.
//
// Le nouvel editeur (ile React `BuilderApp`) a pour source de verite UNIQUE un PageDocument,
// modelise ici comme un etat `EditorState` (meta + liste ordonnee de sections + selection).
// L'etat est pilote par un reducer pur (`reducer.ts`) et expose a l'arbre React via un Context
// (`context.ts`) pour que le picker (brick B5) et l'inspecteur (brick B7) s'y branchent SANS
// prop-drilling ni re-implementation. Les types de catalogue (BuilderCatalogueItem, ...) sont
// REUTILISES depuis `@waimia/builder/types` (source unique, rule 59) : ce fichier ne redefinit
// que ce qui est propre a l'app-shell (etat editable + contrat du Context).
//
// 0 token DS invente, 0 valeur en dur, 0 tiret cadratin U+2014.

import type {
  BuilderCatalogueItem,
  BuilderColorScheme,
  BuilderMeta,
  SectionInstance,
} from '@waimia/builder/types';

/**
 * Une section dans l'editeur : l'instance serialisable (`data`, telle qu'elle finira dans le
 * PageDocument) plus une cle locale stable (`uid`) qui survit au reordonnancement et sert de cle
 * React (jamais serialisee dans le document).
 */
export interface EditorSection {
  uid: string;
  data: SectionInstance;
}

/**
 * Etat complet de l'editeur = la representation editable du PageDocument.
 * - `meta`        : entete du document (collection / slug / langue / titres).
 * - `sections`    : liste ORDONNEE des sections (l'ordre EST l'ordre de la page).
 * - `selectedUid` : section active dans l'inspecteur (ou null).
 * - `rev`         : compteur monotone incremente a chaque mutation. Sert de signal de changement
 *                   bon marche aux consommateurs (ex. re-file des vignettes) sans diff profond.
 */
export interface EditorState {
  meta: BuilderMeta;
  sections: EditorSection[];
  selectedUid: string | null;
  rev: number;
}

/**
 * Document minimal accepte par l'action `load` : la meta + les sections brutes. On accepte une
 * forme large (compatible PageDocument) pour pouvoir charger aussi bien un export du builder qu'une
 * page composable reelle du site.
 */
export interface LoadableDoc {
  meta: BuilderMeta;
  sections: SectionInstance[];
}

/**
 * Actions du reducer. Le discriminant est `kind` (et NON `type`) pour ne pas entrer en collision
 * avec `SectionInstance.type` (le type de section). Le reducer reste PUR : l'action `add` porte la
 * `section` deja resolue (demo clonee), la resolution catalogue se fait cote Context.
 */
export type BuilderAction =
  | { kind: 'add'; section: SectionInstance; atIndex?: number }
  | { kind: 'remove'; index: number }
  | { kind: 'duplicate'; index: number }
  | { kind: 'move'; from: number; to: number }
  | { kind: 'patchSection'; index: number; props: Record<string, unknown> }
  | { kind: 'setMeta'; meta: Partial<BuilderMeta> }
  | { kind: 'load'; doc: LoadableDoc }
  | { kind: 'select'; uid: string | null };

/**
 * Contrat du Context expose par `<BuilderApp>`. C'est le POINT D'ACCROCHE unique pour B5 (picker)
 * et B7 (inspecteur) : ils lisent l'etat et appellent les actions, sans connaitre le reducer.
 * Les methodes d'action ont une ergonomie stable (indices/type), la mecanique (uid, clonage,
 * clamp d'index) est encapsulee.
 */
export interface BuilderContextValue {
  /** Etat courant (lecture seule cote consommateur). */
  meta: BuilderMeta;
  sections: EditorSection[];
  selectedUid: string | null;
  rev: number;

  /** Catalogue injecte par la page hote (source de verite = le build). */
  items: BuilderCatalogueItem[];
  itemByType: Map<string, BuilderCatalogueItem>;
  colorSchemes: BuilderColorScheme[];
  /** Route de rendu chrome-less (aperçu live), ex. `/library/builder/render`. */
  renderPath: string;

  /** Ajoute une section (demo par defaut du type) ; `atIndex` insere entre deux blocs. */
  add: (type: string, atIndex?: number) => void;
  /** Retire la section a l'index donne. */
  remove: (index: number) => void;
  /** Duplique la section a l'index donne (clone profond insere juste apres). */
  duplicate: (index: number) => void;
  /** Deplace la section de `from` vers `to` (reordonnancement). */
  move: (from: number, to: number) => void;
  /** Fusionne des props dans la section a l'index donne (edition de contenu, brick B7). */
  patchSection: (index: number, props: Record<string, unknown>) => void;
  /** Met a jour l'entete du document. */
  setMeta: (meta: Partial<BuilderMeta>) => void;
  /** Remplace tout le document (charger une page / import). */
  load: (doc: LoadableDoc) => void;
  /** Selectionne (ou deselectionne) une section par sa cle locale. */
  select: (uid: string | null) => void;

  // ── Assemblage B8/B9 : picker par vignettes + save-as-version ────────────────────────────────
  /**
   * Insere une INSTANCE concrete (type + props deja resolus) a l'index donne. Complement de `add`
   * (qui part de la demo) : sert a reinserer une section « sauvegardee » avec ses props stockees.
   */
  addInstance: (data: SectionInstance, atIndex?: number) => void;
  /** Ouvre le panneau « Ajouter une section » (AddPanel), memorisant l'index d'insertion cible. */
  openAdd: (atIndex?: number) => void;
  /** Ferme le panneau « Ajouter une section ». */
  closeAdd: () => void;
  /** Le panneau « Ajouter une section » est-il ouvert ? (l'hote rend l'overlay reel). */
  addOpen: boolean;
  /** Index d'insertion memorise a l'ouverture du panneau (undefined = ajouter en fin). */
  addAtIndex: number | undefined;
  /** Demande a enregistrer une section comme VERSION reutilisable (ouvre la mini-modale d'hote). */
  saveVersion: (data: SectionInstance) => void;
  /** Ferme la mini-modale « Enregistrer comme version ». */
  closeSave: () => void;
  /** Section en attente d'enregistrement comme version (null = modale fermee). */
  saveTarget: SectionInstance | null;

  /** Demande a DUPLIQUER une section comme NOUVEAU TYPE de catalogue (ouvre la modale d'hote). */
  duplicateType: (data: SectionInstance) => void;
  /** Ferme la modale « Dupliquer comme nouveau type ». */
  closeDuplicateType: () => void;
  /** Section en attente de duplication-comme-type (null = modale fermee). */
  duplicateTypeTarget: SectionInstance | null;
}
