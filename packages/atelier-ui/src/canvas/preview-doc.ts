// Waimia · Atelier · canvas (#39, brick B6) : helpers PURS de construction du PageDocument rendu.
//
// La route de rendu chrome-less (`/library/builder/render`) accepte un PageDocument (GET ?doc= ou
// POST body) et renvoie l'HTML des sections seules, destine a une iframe. Ces helpers construisent
// le document a rendre : soit la PAGE COMPLETE (toggle « Aperçu page »), soit UNE seule section
// (vignette live d'un bloc). Ils sont purs et serialisables (aucun acces React/DOM).
//
// 0 token DS, 0 valeur en dur, 0 tiret cadratin U+2014.

import type { BuilderMeta, SectionInstance } from '@waimia/builder/types';

/** Forme minimale d'un PageDocument acceptee par la route de rendu (validee cote serveur). */
export interface RenderDoc {
  $schema: 'waimia.page-document/v1';
  meta: {
    collection: string;
    slug: string;
    lang: 'fr' | 'en';
    title_fr?: string;
    title_en?: string;
    collectionExtra: Record<string, unknown>;
  };
  sections: SectionInstance[];
}

/** Construit un RenderDoc a partir de la meta de l'editeur et d'une liste de sections. */
export function buildDoc(meta: BuilderMeta, sections: SectionInstance[]): RenderDoc {
  return {
    $schema: 'waimia.page-document/v1',
    meta: {
      collection: meta.collection,
      slug: meta.slug,
      lang: meta.lang,
      title_fr: meta.title_fr,
      title_en: meta.title_en,
      collectionExtra: {},
    },
    sections,
  };
}

/** Document mono-section : la vignette live d'un bloc rend UNIQUEMENT sa section. */
export function buildSectionDoc(meta: BuilderMeta, section: SectionInstance): RenderDoc {
  return buildDoc(meta, [section]);
}
