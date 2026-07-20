// @waimia/atelier-ui · inspector · champ TABLEAU (liste repliable add/remove/reorder).
//
// Deux régimes : itemShape présent → items = objets édités récursivement (ContainerFields) ;
// sinon → items = scalaires (chaîne, TextField). JAMAIS de textarea JSON.
//
// P4.4-e — slot `refable` : quand `refable && refSource`, CHAQUE item propose en plus un choix
// « Inline » (forme éditée sur place, INCHANGÉE) ou « Référence » (pointeur `{ ref: '<source>/<id>' }`
// vers une source de contenu GLOBAL, résolu au rendu). Le choix se fait par item, via le même
// mécanisme d'édition (onChange sur la valeur de l'item) — aucun chemin de données parallèle.
import React, { useEffect, useState } from 'react';
import type { Lang, SlotItemField } from '../types';
import { TextField } from './scalar-fields';
import { ContainerFields } from './ContainerFields';
import { fetchRefOptions, type RefOption } from './ref-options';

/** Valeur par défaut d'un nouvel item selon la forme. */
function blankItem(itemShape?: SlotItemField[]): unknown {
  if (!itemShape) return '';
  return {};
}

/** Un item est un pointeur de référence ssi objet à clé UNIQUE `ref` de type string. */
function isRefItem(v: unknown): v is { ref: string } {
  if (v === null || typeof v !== 'object') return false;
  const keys = Object.keys(v as Record<string, unknown>);
  return keys.length === 1 && keys[0] === 'ref' && typeof (v as { ref?: unknown }).ref === 'string';
}

/** Découpe la partie `id` d'un pointeur `{ ref: 'source/id' }` (chaîne après le 1er `/`). */
function refId(ref: string): string {
  const slash = ref.indexOf('/');
  return slash === -1 ? '' : ref.slice(slash + 1);
}

/** Déplace l'élément `from` vers `to` dans un nouveau tableau. */
function move<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const [it] = next.splice(from, 1);
  next.splice(to, 0, it);
  return next;
}

/**
 * Sélecteur d'id pour un item en mode « Référence ». Charge les options de la source (dev-only,
 * mémoïsé) et écrit `{ ref: '<source>/<id>' }`. Auto-sélectionne la 1ʳᵉ option quand l'item vient
 * de basculer en ref (id encore vide) → jamais de ref vide persistée dans le cas nominal.
 */
function RefSelect(props: {
  id: string;
  source: string;
  value: { ref: string };
  onChange: (v: { ref: string }) => void;
}): React.ReactElement {
  const [options, setOptions] = useState<RefOption[] | null>(null);
  const currentId = refId(props.value.ref);

  useEffect(() => {
    let alive = true;
    fetchRefOptions(props.source).then((opts) => {
      if (alive) setOptions(opts);
    });
    return () => {
      alive = false;
    };
  }, [props.source]);

  // Bascule fraîche en ref (id vide) → adopte la 1ʳᵉ option dispo dès qu'elles sont chargées.
  useEffect(() => {
    if (currentId === '' && options && options.length > 0) {
      props.onChange({ ref: `${props.source}/${options[0].id}` });
    }
    // props.onChange stable au niveau de l'item ; on ne réagit qu'au chargement + id vide.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, currentId, props.source]);

  if (options === null) {
    return <div className="wa-insp-hint">Chargement des références…</div>;
  }
  if (options.length === 0) {
    return <div className="wa-insp-hint">Aucune référence disponible pour « {props.source} ».</div>;
  }

  // Ref cassée : l'id courant n'existe plus dans la source → on l'affiche quand même (marqué).
  const known = options.some((o) => o.id === currentId);
  return (
    <select
      id={props.id}
      className="wa-insp-select"
      value={currentId}
      onChange={(e) => props.onChange({ ref: `${props.source}/${e.target.value}` })}
    >
      {!known && currentId ? <option value={currentId}>⚠ {currentId} (introuvable)</option> : null}
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.label || o.id}
        </option>
      ))}
    </select>
  );
}

/** Bascule Inline / Référence d'un item (segmented control réutilisant le style DS existant). */
function RefModeToggle(props: {
  mode: 'inline' | 'ref';
  source: string;
  onInline: () => void;
  onRef: () => void;
}): React.ReactElement {
  return (
    <div className="wa-insp-seg" role="group" aria-label={`Source de l'item (${props.source})`}>
      <button
        type="button"
        className="wa-insp-seg-btn"
        aria-pressed={props.mode === 'inline'}
        onClick={props.onInline}
      >
        Inline
      </button>
      <button
        type="button"
        className="wa-insp-seg-btn"
        aria-pressed={props.mode === 'ref'}
        onClick={props.onRef}
      >
        Référence
      </button>
    </div>
  );
}

export function ArrayField(props: {
  label: string;
  fieldName?: string;
  required?: boolean;
  hint?: string;
  itemShape?: SlotItemField[];
  max?: number;
  refable?: boolean;
  refSource?: string;
  value: unknown[];
  onChange: (next: unknown[]) => void;
  lang: Lang;
  keyPrefix: string;
}): React.ReactElement {
  const items = Array.isArray(props.value) ? props.value : [];
  const canAdd = props.max === undefined || items.length < props.max;
  const canRef = Boolean(props.refable && props.refSource);

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

      {items.map((item, i) => {
        const isRef = canRef && isRefItem(item);
        return (
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

            {canRef && props.refSource ? (
              <RefModeToggle
                mode={isRef ? 'ref' : 'inline'}
                source={props.refSource}
                onInline={() => {
                  if (isRef) setItem(i, blankItem(props.itemShape));
                }}
                onRef={() => {
                  if (!isRef) setItem(i, { ref: '' });
                }}
              />
            ) : null}

            {isRef && props.refSource ? (
              <RefSelect
                id={`${props.keyPrefix}-i${i}-ref`}
                source={props.refSource}
                value={item as { ref: string }}
                onChange={(v) => setItem(i, v)}
              />
            ) : props.itemShape ? (
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
        );
      })}

      <button type="button" className="wa-insp-add" onClick={add} disabled={!canAdd}>
        + Ajouter
      </button>
    </div>
  );
}
