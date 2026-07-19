// @waimia/atelier-ui · screens · types PURS des écrans d'entrée du builder (props-driven).
//
// Les écrans (dashboard « Projets », canvas sitemap) sont montés par l'hôte app (`BuilderHost`),
// SEUL point autorisé à connaître les données app (SITE_PAGES / SITE_GROUPS / compteurs). Ils
// reçoivent ces données en props sérialisables : ce module ne redéfinit que le contrat de props,
// aucune donnée n'y est importée. Structurellement compatibles avec `SitePage`/`SitePageSection`
// de `src/lib/site-pages.generated.ts` (source de vérité côté app, rule 59).
//
// 0 token DS, 0 valeur en dur, 0 tiret cadratin U+2014.

/** Résumé d'un projet affiché sur le dashboard (compteurs RÉELS, injectés par l'hôte). */
export interface ProjectSummary {
  /** Nom lisible du projet (ex. « Waimia »). */
  name: string;
  /** Domaine de production (ex. « waimia.com »). */
  domain: string;
  /** Nombre de pages réelles du site (SITE_PAGES.length). */
  pageCount: number;
  /** Nombre de groupes de sitemap (SITE_GROUPS.length). */
  groupCount: number;
  /** Nombre de types de sections composables du catalogue. */
  sectionTypeCount: number;
}

/** Une section listée dans la carte de page du sitemap (wireframe minimaliste). */
export interface SitemapSection {
  /** Type de section (clé du catalogue / registry). */
  type: string;
  /** Libellé court reconnaissable (1er champ de titre non vide, fallback `#<index>`). */
  label: string;
  /** Fond éventuel (paper / ink / ...) : sert au repère visuel de la barre wireframe. */
  background?: string;
}

/** Une page réelle du site, telle qu'affichée dans le canvas sitemap. */
export interface SitemapPage {
  /** Route publique réelle (commence par '/'). */
  route: string;
  /** Titre lisible de la page. */
  title: string;
  /** Id du groupe de sitemap auquel la page appartient. */
  group: string;
  /** Collection Astro d'origine, ou 'bespoke'. */
  collection: string;
  /** Chemin de contenu relatif à src/content/ (pages issues d'une collection éditable). */
  file?: string;
  /** true = sections[] JSON éditables par le builder ; false = template/prose/bespoke. */
  editable: boolean;
  /** Sections dans l'ordre (vides pour les pages non section-composables). */
  sections: SitemapSection[];
}

/** Un groupe de sitemap (ordre d'affichage = ordre du tableau SITE_GROUPS). */
export interface SitemapGroup {
  /** Id stable du groupe. */
  id: string;
  /** Libellé FR affiché en en-tête de colonne. */
  label_fr: string;
}
