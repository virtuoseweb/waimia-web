// @waimia/ds-kernel · Moteur « template-as-data » · types.
//
// Doctrine (décision nuit 0018) : un template de page n'est PAS un composant .astro
// monolithique, c'est une DÉFINITION LOGICIELLE = une liste ordonnée de sections
// cataloguées + les mappings frontmatter→données, par type de page/collection.
// `resolveTemplate(def, ctx)` transforme cette définition + le contenu d'une page en
// une liste ordonnée de sections résolues, rendue par le registry de sections côté app.
//
// Générique, zéro dépendance app : le moteur ne connaît que le contrat de section
// (`SectionData`, source de vérité `../schemas/sections`). Les builders (mappings) et
// le type de contexte vivent côté app (ex. `src/lib/templates/case-study.ts`).

import type { SectionData } from '../schemas/sections';

export type Lang = 'fr' | 'en';

/** Une section cataloguée résolue (le type union du catalogue). Alias public. */
export type Section = SectionData;

/**
 * Contexte de résolution d'un template. Forme minimale imposée par la doctrine :
 * `{ data, lang }`. Extensible par intersection côté app quand des builders ont
 * besoin de valeurs dérivées au niveau route (ex. numéro de cas, cartes liées,
 * id de View Transition) : `type CaseCtx = TemplateContext<CaseData> & { caseNum: string }`.
 */
export interface TemplateContext<TData> {
  data: TData;
  lang: Lang;
}

/**
 * Sortie autorisée d'un builder :
 *  - une section nue (`SectionData`) ;
 *  - une section + props de rendu additionnels (`{ section, props }`) : les props sont
 *    passées au composant AU-DELÀ de `data`+`lang` (ex. `topPad`, `h1Gap`, `style`,
 *    `reveal`) pour reproduire fidèlement un appel de composant paramétré ;
 *  - un emplacement nommé (`{ slot, props }`) : un item hors-catalogue rendu par la
 *    couche app (ex. bande auteur composée d'une molécule). Le moteur ne connaît PAS
 *    la sémantique du slot, il transporte juste son nom + ses props.
 */
export type BuildOutput =
  | Section
  | { section: Section; props?: Record<string, unknown> }
  | { slot: string; props?: Record<string, unknown> };

/** Un builder = un bloc du template : condition d'apparition + fonction de construction. */
export interface SectionBuilder<C extends TemplateContext<unknown>> {
  /** Identifiant lisible du bloc (sert de clé de rendu stable + debug). */
  id?: string;
  /** Filtre d'apparition (bloc conditionnel au frontmatter). Absent = toujours rendu. */
  when?: (ctx: C) => boolean;
  /** Construit la (les) sortie(s) du bloc à partir du contexte. Peut retourner un tableau. */
  build: (ctx: C) => BuildOutput | BuildOutput[];
}

/** Définition d'un template : une liste ordonnée de builders. */
export interface TemplateDefinition<C extends TemplateContext<unknown>> {
  id: string;
  sections: SectionBuilder<C>[];
}

/** Une section cataloguée résolue, prête à rendre via le registry. */
export interface ResolvedSection {
  kind: 'section';
  /** clé de rendu stable (déterministe) */
  key: string;
  section: Section;
  /** props additionnels du composant (au-delà de `data`+`lang`) */
  props?: Record<string, unknown>;
}

/** Un emplacement nommé résolu, rendu par la couche app. */
export interface ResolvedSlot {
  kind: 'slot';
  key: string;
  /** nom logique de l'emplacement ; l'app décide du markup (molécule hors-catalogue) */
  name: string;
  props?: Record<string, unknown>;
}

export type ResolvedItem = ResolvedSection | ResolvedSlot;
