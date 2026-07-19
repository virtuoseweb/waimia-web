// @waimia/atelier-ui · inspector · champ TABLEAU (liste repliable add/remove/reorder).
//
// Deux régimes : itemShape présent → items = objets édités récursivement (ContainerFields) ;
// sinon → items = scalaires (chaîne, TextField). JAMAIS de textarea JSON.
import React from 'react';
import type { Lang, SlotItemField } from '../types';
import { TextField } from './scalar-fields';
import { ContainerFields } from './ContainerFields';

/** Valeur par défaut d'un nouvel item selon la forme. */
function blankItem(itemShape?: SlotItemField[]): unknown {
  if (!itemShape) return '';
  return {};
}

/** Déplace l'élément `from` vers `to` dans un nouveau tableau. */
function move<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const [it] = next.splice(from, 1);
  next.splice(to, 0, it);
  return next;
}

export function ArrayField(props: {
  label: string;
  fieldName?: string;
  required?: boolean;
  hint?: string;
  itemShape?: SlotItemField[];
  max?: number;
  value: unknown[];
  onChange: (next: unknown[]) => void;
  lang: Lang;
  keyPrefix: string;
}): React.ReactElement {
  const items = Array.isArray(props.value) ? props.value : [];
  const canAdd = props.max === undefined || items.length < props.max;

  const setItem = (i: number, v: unknown) => {
    const next = items.slice();
    next[i] = v;
    props.onChange(next);
  };
  const remove = (i: number) => props.onChange(items.filter((_, j) => j !== i));
  const add = () => props.onChange([...items, blankItem(props.itemShape)]);
  const reorder = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    props.onChange(move(items, from, to));
  };

  return (
    <div className="wa-insp-group" data-array={props.fieldName}>
      <div className="wa-insp-group-head">
        <span className="wa-insp-label">
          <span>{props.label}</span>
          {props.fieldName && props.fieldName !== props.label ? (
            <span className="wa-insp-fieldname">{props.fieldName}</span>
          ) : null}
          {props.required ? <span className="wa-insp-req">*</span> : null}
          {props.hint ? <span className="wa-insp-hint">{props.hint}</span> : null}
        </span>
        <span className="wa-insp-hint">
          {items.length}
          {props.max !== undefined ? ` / ${props.max}` : ''}
        </span>
      </div>

      {items.length === 0 ? <div className="wa-insp-hint">Aucun élément.</div> : null}

      {items.map((item, i) => (
        <div className="wa-insp-item" key={`${props.keyPrefix}-i${i}`}>
          <div className="wa-insp-item-head">
            <span className="wa-insp-item-idx">#{i + 1}</span>
            <span className="wa-insp-item-tools">
              <button
                type="button"
                className="wa-insp-icon-btn"
                aria-label="Monter"
                disabled={i === 0}
                onClick={() => reorder(i, i - 1)}
              >
                ↑
              </button>
              <button
                type="button"
                className="wa-insp-icon-btn"
                aria-label="Descendre"
                disabled={i === items.length - 1}
                onClick={() => reorder(i, i + 1)}
              >
                ↓
              </button>
              <button
                type="button"
                className="wa-insp-icon-btn"
                aria-label="Supprimer"
                onClick={() => remove(i)}
              >
                ×
              </button>
            </span>
          </div>

          {props.itemShape ? (
            <ContainerFields
              fields={props.itemShape}
              value={(item as Record<string, unknown>) ?? {}}
              onChange={(next) => setItem(i, next)}
              lang={props.lang}
              keyPrefix={`${props.keyPrefix}-i${i}`}
            />
          ) : (
            <TextField value={item} onChange={(v) => setItem(i, v)} />
          )}
        </div>
      ))}

      <button type="button" className="wa-insp-add" onClick={add} disabled={!canAdd}>
        + Ajouter
      </button>
    </div>
  );
}
