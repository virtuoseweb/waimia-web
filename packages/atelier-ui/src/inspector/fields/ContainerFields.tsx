// @waimia/atelier-ui · inspector · moteur de rendu récursif d'un CONTENEUR de champs.
//
// Un « conteneur » = un objet de données (l'instance de section elle-même, ou un item de
// tableau, ou un sous-objet). Donné une liste de descripteurs de champs (SlotItemField[]),
// ce moteur rend un widget par champ, gère la bilingualité au niveau des CLÉS
// (`${field}_${lang}`) et renvoie le conteneur mis à jour via onChange.
//
// Récursion : array → ArrayField, object → ObjectField, qui rappellent ContainerFields.
// (fonctions hoistées → les imports mutuels ESM se résolvent sans casse.)
import React from 'react';
import type { Lang, SlotItemField } from '../types';
import { FieldShell, Toggle } from './controls';
import {
  EnumField,
  ImageField,
  NumberField,
  TextField,
  TextareaField,
  UrlField,
} from './scalar-fields';
import { ArrayField } from './ArrayField';
import { ObjectField } from './ObjectField';

/** Libellé lisible d'un nom de champ technique (`title_part1` → `Title part1`). */
export function humanize(field: string): string {
  const s = field.replace(/_/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const SCALAR_TYPES = new Set(['text', 'richtext', 'url', 'number', 'image', 'enum', 'bool']);

/** Clone shallow d'un conteneur avec une clé remplacée. */
function withKey(container: Record<string, unknown>, key: string, value: unknown): Record<string, unknown> {
  const next = { ...container };
  if (value === undefined) delete next[key];
  else next[key] = value;
  return next;
}

/** Rend UN champ scalaire (langue-agnostique) selon son type logique. */
function ScalarWidget(props: {
  id: string;
  field: SlotItemField;
  value: unknown;
  onChange: (v: unknown) => void;
}): React.ReactElement {
  const { field, value, onChange, id } = props;
  switch (field.type) {
    case 'richtext':
      return <TextareaField id={id} value={value} onChange={onChange} />;
    case 'url':
      return <UrlField id={id} value={value} onChange={onChange} />;
    case 'number':
      return <NumberField id={id} value={value} onChange={onChange} />;
    case 'image':
      return <ImageField id={id} value={value} onChange={onChange} />;
    case 'enum':
      return (
        <EnumField
          id={id}
          value={value}
          options={(field.enumValues ?? []).map((v) => ({ value: v }))}
          onChange={onChange}
        />
      );
    case 'bool':
      return <Toggle checked={Boolean(value)} onChange={onChange} />;
    case 'text':
    default:
      return <TextField id={id} value={value} onChange={onChange} />;
  }
}

/** Rend UN champ d'un conteneur (résout la bilingualité au niveau des clés). */
function ContainerField(props: {
  keyPrefix: string;
  field: SlotItemField;
  container: Record<string, unknown>;
  onContainerChange: (next: Record<string, unknown>) => void;
  lang: Lang;
}): React.ReactElement {
  const { field, container, onContainerChange, lang, keyPrefix } = props;
  const dataKey = field.bilingual ? `${field.field}_${lang}` : field.field;
  const id = `${keyPrefix}-${dataKey}`;
  const label = humanize(field.field);
  const hint = field.bilingual ? lang.toUpperCase() : undefined;
  const setVal = (v: unknown) => onContainerChange(withKey(container, dataKey, v));

  // Conteneur imbriqué : object.
  if (field.type === 'object' && field.itemShape) {
    return (
      <ObjectField
        label={label}
        fieldName={field.field}
        required={field.required}
        shape={field.itemShape}
        value={(container[dataKey] as Record<string, unknown>) ?? {}}
        onChange={setVal}
        lang={lang}
        keyPrefix={id}
      />
    );
  }

  // Tableau (d'objets ou de scalaires).
  if (field.type === 'array') {
    return (
      <ArrayField
        label={label}
        fieldName={field.field}
        required={field.required}
        hint={hint}
        itemShape={field.itemShape}
        max={field.max}
        value={(container[dataKey] as unknown[]) ?? []}
        onChange={setVal}
        lang={lang}
        keyPrefix={id}
      />
    );
  }

  // Scalaire.
  if (SCALAR_TYPES.has(field.type)) {
    // bool : le libellé accompagne l'interrupteur, pas d'enveloppe verticale.
    if (field.type === 'bool') {
      return (
        <FieldShell label={label} fieldName={field.field} required={field.required} hint={hint} htmlFor={id}>
          <ScalarWidget id={id} field={field} value={container[dataKey]} onChange={setVal} />
        </FieldShell>
      );
    }
    return (
      <FieldShell label={label} fieldName={field.field} required={field.required} hint={hint} htmlFor={id}>
        <ScalarWidget id={id} field={field} value={container[dataKey]} onChange={setVal} />
      </FieldShell>
    );
  }

  return (
    <FieldShell label={label} fieldName={field.field} required={field.required} htmlFor={id}>
      <div className="wa-insp-hint">Type non pris en charge : {field.type}</div>
    </FieldShell>
  );
}

/** Rend tous les champs d'un conteneur. */
export function ContainerFields(props: {
  fields: SlotItemField[];
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
  lang: Lang;
  keyPrefix: string;
}): React.ReactElement {
  return (
    <>
      {props.fields.map((f) => (
        <ContainerField
          key={f.field}
          keyPrefix={props.keyPrefix}
          field={f}
          container={props.value}
          onContainerChange={props.onChange}
          lang={props.lang}
        />
      ))}
    </>
  );
}
