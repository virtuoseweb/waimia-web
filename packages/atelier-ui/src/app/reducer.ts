// Waimia · Atelier · BuilderApp (#39, brick B6) : reducer PUR du PageDocument editable.
//
// Toute mutation de l'etat passe par ce reducer (source de verite unique). Il est PUR (aucun effet
// de bord, aucune lecture DOM, aucun acces catalogue) : l'action `add` porte deja la `section`
// resolue (la resolution de la demo depuis le catalogue se fait cote Context, pour garder ce
// module testable et sans dependance runtime). Chaque mutation incremente `rev` (signal de
// changement bon marche pour les consommateurs, ex. la re-file des vignettes du canvas).
//
// 0 token DS, 0 valeur en dur, 0 tiret cadratin U+2014.

import type { BuilderMeta, SectionInstance } from '@waimia/builder/types';
import type { BuilderAction, EditorSection, EditorState } from './types';

/** Compteur d'identifiants locaux (cles React stables, hors PageDocument). */
let __uid = 0;
/** Genere une cle locale unique et stable pour une section de l'editeur. */
export const nextUid = (): string => `b${++__uid}`;

/** Borne un index dans [0, max] (insertions robustes quand `atIndex`/`to` deborde). */
const clamp = (n: number, max: number): number => (n < 0 ? 0 : n > max ? max : n);

/** Clone profond serialisable d'une instance de section (les instances sont du JSON pur). */
function cloneSection(data: SectionInstance): SectionInstance {
  return JSON.parse(JSON.stringify(data)) as SectionInstance;
}

/** Etat initial : document vide, meta fournie par la page hote. */
export function initState(meta: BuilderMeta): EditorState {
  return { meta, sections: [], selectedUid: null, rev: 0 };
}

/** Reducer pur : (etat, action) -> nouvel etat. Toute mutation retourne un nouvel objet. */
export function reducer(state: EditorState, action: BuilderAction): EditorState {
  switch (action.kind) {
    case 'add': {
      const uid = nextUid();
      const section: EditorSection = { uid, data: action.section };
      const at = clamp(action.atIndex ?? state.sections.length, state.sections.length);
      const sections = state.sections.slice();
      sections.splice(at, 0, section);
      return { ...state, sections, selectedUid: uid, rev: state.rev + 1 };
    }

    case 'remove': {
      const target = state.sections[action.index];
      if (!target) return state;
      const sections = state.sections.filter((_, i) => i !== action.index);
      const selectedUid = state.selectedUid === target.uid ? null : state.selectedUid;
      return { ...state, sections, selectedUid, rev: state.rev + 1 };
    }

    case 'duplicate': {
      const target = state.sections[action.index];
      if (!target) return state;
      const uid = nextUid();
      const clone: EditorSection = { uid, data: cloneSection(target.data) };
      const sections = state.sections.slice();
      sections.splice(action.index + 1, 0, clone);
      return { ...state, sections, selectedUid: uid, rev: state.rev + 1 };
    }

    case 'move': {
      const { from, to } = action;
      if (from === to || from < 0 || from >= state.sections.length) return state;
      const sections = state.sections.slice();
      const [moved] = sections.splice(from, 1);
      sections.splice(clamp(to, sections.length), 0, moved);
      return { ...state, sections, rev: state.rev + 1 };
    }

    case 'patchSection': {
      const target = state.sections[action.index];
      if (!target) return state;
      const sections = state.sections.map((s, i) =>
        i === action.index ? { ...s, data: { ...s.data, ...action.props } } : s,
      );
      return { ...state, sections, rev: state.rev + 1 };
    }

    case 'setMeta':
      return { ...state, meta: { ...state.meta, ...action.meta }, rev: state.rev + 1 };

    case 'load': {
      const sections: EditorSection[] = action.doc.sections.map((data) => ({
        uid: nextUid(),
        data: { ...data },
      }));
      return {
        meta: { ...action.doc.meta },
        sections,
        selectedUid: sections.length > 0 ? sections[0].uid : null,
        rev: state.rev + 1,
      };
    }

    case 'select':
      // La selection ne modifie pas le document : `rev` reste inchange (pas de re-file vignettes).
      return { ...state, selectedUid: action.uid };

    default:
      return state;
  }
}
