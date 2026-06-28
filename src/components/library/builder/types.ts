// Waimia · Builder visuel (#39 T3) : types partagés entre la page hôte Astro et l'île React.
//
// La page hôte (`src/pages/library/builder/index.astro`) charge le catalogue côté BUILD
// (registry + presets + colorschemes + slots + demos) et sérialise ces données en props pour
// l'île `BuilderCanvas`. L'île n'importe AUCUN module serveur (registry/zod) : tout ce dont elle
// a besoin transite par ces props sérialisables. Cela évite d'embarquer le registry (~4000 l) +
// `astro:content` dans le bundle client et garantit un seul point de vérité (le build).
//
// 0 token DS inventé, 0 valeur en dur (le layout de l'île passe par var(--token) en styles
// inline ou via la feuille is:global de la page hôte).

/** Données démo d'une section = instance prête à l'emploi (contient `type` + props). */
export type SectionInstance = Record<string, unknown> & { type: string };

/** Une option de variation (preset) présentée dans l'inspecteur. */
export interface VariationOption {
  /** id stable (presetId), sert de valeur de <select>. */
  id: string;
  /** libellé lisible FR. */
  label: string;
  /** props concrètes du preset à étaler sur l'instance (background/layout/density/...). */
  props: Record<string, unknown>;
}

/** Slot d'un type de section, vue lecture seule de l'inspecteur (édition fine = T4). */
export interface BuilderSlot {
  field: string;
  kind: 'content' | 'presentation';
  type: string;
  required: boolean;
  bilingual?: boolean;
}

/** Entrée du catalogue exposée au picker + à l'inspecteur (1 par type de section). */
export interface BuilderCatalogueItem {
  type: string;
  family: string;
  categorySlug: string;
  categoryLabel: string;
  status: 'stable' | 'wip' | 'deprecated';
  description_fr: string;
  tags: string[];
  /** Données démo par défaut, injectées quand on ajoute la section au document. */
  demo: SectionInstance;
  /** Presets disponibles (axe layout/déclinaison), vide si aucun. */
  presets: VariationOption[];
  /** Slots du type (lecture seule dans l'inspecteur ; édition de contenu = T4). */
  slots: BuilderSlot[];
}

/** Schéma de couleur global (les 16 schémas DS), commun à toutes les sections. */
export interface BuilderColorScheme {
  id: string;
  label: string;
  /** surface de fond appliquée par le schéma. */
  background: string;
  /** surfaces des cellules à cycler (duo: 1, trio: 2, mono: vide). */
  cellCycle: string[];
}

/** Métadonnées minimales du document en cours d'édition. */
export interface BuilderMeta {
  collection: string;
  slug: string;
  lang: 'fr' | 'en';
  title_fr?: string;
  title_en?: string;
}

/** Props passées par la page hôte Astro à l'île `BuilderCanvas`. */
export interface BuilderCanvasProps {
  /** Catalogue complet (1 entrée par type), trié pour le picker. */
  items: BuilderCatalogueItem[];
  /** Les 16 schémas de couleur DS, communs. */
  colorSchemes: BuilderColorScheme[];
  /** Métadonnées par défaut du document neuf. */
  defaultMeta: BuilderMeta;
  /** Collections de page autorisées (pour le sélecteur de meta.collection). */
  collections: string[];
  /** Chemin de la route de rendu chrome-less (aperçu live). */
  renderPath: string;
}
