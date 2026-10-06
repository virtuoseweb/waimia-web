// Données d'une page de ressource VERROUILLÉE (composant src/components/templates/LeadMagnetLanding.astro).
// Une ressource = un fichier `src/data/lead-magnets/<slug>.ts` qui exporte `export const data: LeadMagnetPage`,
// une page `src/pages/ressources/outils/<slug>.astro` de trois lignes, et une entrée `LEAD_MAGNETS`
// (src/data/conversion.ts) dont la clé est le même slug. Le fichier livré est privé
// (private/telechargements/) et part uniquement par e-mail en pièce jointe : rien ici ne porte d'URL de fichier.

export interface LeadMagnetFaq {
  q: string;
  a: string;
}

export interface LeadMagnetContentsItem {
  title: string;
  desc: string;
}

export interface LeadMagnetPage {
  /** Clé de LEAD_MAGNETS ET nom de la page (/ressources/outils/<slug>). */
  slug: string;
  title_fr: string;
  title_en: string;
  kicker_fr: string;
  kicker_en: string;
  /** Promesse en une ou deux phrases (chapô de la page). */
  promise_fr: string;
  promise_en: string;
  /** Format et volume, ex. « PDF · 12 pages ». */
  format_fr: string;
  format_en: string;
  forWho_fr: string[];
  forWho_en: string[];
  /** Sommaire : ce que contient le fichier. */
  inside_fr: LeadMagnetContentsItem[];
  inside_en: LeadMagnetContentsItem[];
  /** Extrait court en HTML (10 % du contenu au plus ; jamais le contenu complet). */
  extract_fr: string;
  extract_en: string;
  illustration?: { src: string; alt_fr: string; alt_en: string };
  faq_fr: LeadMagnetFaq[];
  faq_en: LeadMagnetFaq[];
  /** Chemins de pages liées (JSON-LD `relatedLink`) ; le bloc visible vient du maillage calculé (internal-mesh). */
  relatedPages: string[];
  seoTitle_fr: string;
  seoTitle_en: string;
  seoDescription_fr: string;
  seoDescription_en: string;
  /** Dates ISO (défaut 2026-10-05). */
  publishedAt?: string;
  updatedAt?: string;
}
