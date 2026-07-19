// @waimia/atelier-ui · inspector · onglet CONTENU (formulaire data-driven des slots).
//
// Rend les slots de CONTENU du type via le moteur récursif ContainerFields, en traitant
// les props de l'instance comme le conteneur racine. Chaque édition est diffée en un PATCH
// partiel (clés racine modifiées) émis à l'hôte, qui fusionne. Champs bilingues sous tabs
// FR/EN. JAMAIS de textarea JSON.
import React from 'react';
import type { Lang, PropsPatch, SectionSlot } from './types';
import { LangTabs } from './fields/controls';
import { ContainerFields } from './fields/ContainerFields';

/** Diff shallow racine : clés de `next` différentes de `prev` (+ clés supprimées). */
function shallowPatch(
  prev: Record<string, unknown>,
  next: Record<string, unknown>,
): PropsPatch {
  const patch: PropsPatch = {};
  for (const k of Object.keys(next)) {
    if (next[k] !== prev[k]) patch[k] = next[k];
  }
  for (const k of Object.keys(prev)) {
    if (!(k in next)) patch[k] = undefined;
  }
  return patch;
}

/** Y a-t-il au moins un slot bilingue à éditer ? (sinon on masque les tabs FR/EN). */
function hasBilingual(slots: SectionSlot[]): boolean {
  const deep = (arr?: { bilingual?: boolean; itemShape?: unknown[] }[]): boolean =>
    !!arr &&
    arr.some(
      (f) => f.bilingual || deep(f.itemShape as { bilingual?: boolean; itemShape?: unknown[] }[]),
    );
  return deep(slots as unknown as { bilingual?: boolean; itemShape?: unknown[] }[]);
}

export function SlotForm(props: {
  contentSlots: SectionSlot[];
  value: Record<string, unknown>;
  onChange: (patch: PropsPatch) => void;
  lang: Lang;
  onLangChange: (l: Lang) => void;
}): React.ReactElement {
  const showLangs = hasBilingual(props.contentSlots);

  if (props.contentSlots.length === 0) {
    return <div className="wa-insp-empty">Ce type n'a aucun slot de contenu.</div>;
  }

  return (
    <div className="wa-insp-field" style={{ gap: 'var(--space-4)' }}>
      {showLangs ? (
        <div className="wa-insp-group-head">
          <span className="wa-insp-section-title">Contenu</span>
          <LangTabs lang={props.lang} onChange={props.onLangChange} />
        </div>
      ) : null}
      <ContainerFields
        fields={props.contentSlots}
        value={props.value}
        onChange={(next) => props.onChange(shallowPatch(props.value, next))}
        lang={props.lang}
        keyPrefix="slot"
      />
    </div>
  );
}
