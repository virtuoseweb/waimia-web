// @waimia/atelier-ui · inspector · types (contrat prop-driven, self-contained)
//
// Ces types MIRRORENT le contrat de slots de @waimia/ds-kernel (section-slots.ts) et
// l'axe couleur (section-colorschemes.ts) SANS import runtime : l'inspecteur reste
// découplé (0 dépendance app/src), l'hôte (BuilderApp, B9) fournit les données.
//
// Conventions de données (dérivées du schéma Zod / demos réelles) :
//  - un slot bilingue `field` → deux clés de données `${field}_fr` et `${field}_en` ;
//  - un slot `object` → une valeur objet unique (sous-champs = itemShape) ;
//  - un slot `array` AVEC itemShape → tableau d'objets ; SANS itemShape → tableau de scalaires ;
//  - un slot `array` bilingue → deux clés `${field}_fr` / `${field}_en`, chacune un tableau ;
//  - un sous-champ bilingue d'itemShape → `${sub}_fr` / `${sub}_en` dans chaque item.

/** Type logique d'un slot, normalisé depuis le schéma Zod. */
export type SlotType =
  | 'text'
  | 'richtext'
  | 'image'
  | 'url'
  | 'enum'
  | 'array'
  | 'bool'
  | 'number'
  | 'object';

/** Nature d'un slot : contenu éditorial à remplir, ou axe de rendu. */
export type SlotKind = 'content' | 'presentation';

/** Forme d'un item (slots `array` d'objets ou slots `object`). */
export interface SlotItemField {
  field: string;
  type: SlotType;
  required: boolean;
  bilingual?: boolean;
  enumValues?: string[];
  min?: number;
  max?: number;
  itemShape?: SlotItemField[];
}

/** Un slot de section : un champ du contrat de contenu/présentation. */
export interface SectionSlot {
  field: string;
  kind: SlotKind;
  type: SlotType;
  required: boolean;
  bilingual?: boolean;
  enumValues?: string[];
  min?: number;
  max?: number;
  itemShape?: SlotItemField[];
}

/** Un schéma de couleur (miroir de ColorScheme, section-colorschemes.ts). */
export type Surface =
  | 'paper'
  | 'paper-2'
  | 'paper-3'
  | 'ink'
  | 'ink-2'
  | 'ink-3'
  | 'accent';

export interface ColorScheme {
  id: string;
  kind: 'mono' | 'duo' | 'trio';
  base: Surface;
  cells: Surface[];
  label: string;
}

/** Un preset sélectionnable (miroir de Preset, section-presets.ts). */
export interface Preset {
  id: string;
  type: string;
  label: string;
  family?: string;
  era?: string;
  props: Record<string, unknown>;
}

/** Langue active du formulaire bilingue. */
export type Lang = 'fr' | 'en';

/**
 * Descripteur d'un contrôle d'axe de layout. L'hôte le fournit (souvent via `deriveAxes`),
 * ce qui permet d'exposer aussi bien les enums de présentation (background/variant) que les
 * axes PresetProps non couverts par le schéma (columns, direction, itemOrder, placement…).
 */
export type AxisControl =
  | { field: string; label?: string; control: 'segmented'; options: AxisOption[] }
  | { field: string; label?: string; control: 'stepper'; min?: number; max?: number; step?: number }
  | { field: string; label?: string; control: 'toggle' }
  | { field: string; label?: string; control: 'direction' }
  | { field: string; label?: string; control: 'order'; count: number }
  | { field: string; label?: string; control: 'placement'; regions: string[] };

export interface AxisOption {
  value: string;
  label?: string;
}

/** Patch partiel de props (l'hôte fusionne shallow au niveau racine). */
export type PropsPatch = Record<string, unknown>;

export interface InspectorPanelProps {
  /** Identifiant du type de section édité (ex. 'case-spotlight'). */
  typeId: string;
  /** Props courantes de l'instance (demo mergée + overrides). Source contrôlée. */
  props: Record<string, unknown>;
  /** Contrat de slots complet du type (getSlots(typeId)). */
  slots: SectionSlot[];
  /** Axes de layout à exposer dans l'onglet Layout. Voir `deriveAxes`. */
  presentationAxes: AxisControl[];
  /** Presets sélectionnables du type (SECTION_PRESETS[typeId]). */
  presets: Preset[];
  /** Schémas de couleur (COLOR_SCHEMES). */
  schemes: ColorScheme[];
  /** Patch partiel émis à chaque édition. L'hôte fusionne dans les props. */
  onChange: (patch: PropsPatch) => void;
  /** Application d'un preset (l'hôte applique preset.props et met à jour props). */
  onPickPreset: (id: string) => void;
  /** Vignette optionnelle d'un preset (sinon carte texte + badges d'axes). */
  renderPresetThumb?: (presetId: string) => import('react').ReactNode;
  /** Preset actif (surbrillance). Optionnel. */
  selectedPresetId?: string;
  /**
   * Enregistre les AXES DE PRÉSENTATION courants de la section comme VARIANTE custom réutilisable.
   * L'inspecteur (pur) fournit id + libellé saisis ; l'hôte fait le POST /api/ds/custom-preset (il
   * connaît le keyword, le type et projette les props). Résout { ok, error? } pour le feedback inline.
   * Absent → le bouton « Enregistrer comme variante » n'est pas rendu (contexte sans persistance dev).
   */
  onSaveVariant?: (args: { id: string; label: string }) => Promise<{ ok: boolean; error?: string }>;
}
