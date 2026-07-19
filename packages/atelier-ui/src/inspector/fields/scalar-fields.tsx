// @waimia/atelier-ui · inspector · champs scalaires contrôlés (value + onChange, prop-driven).
// JAMAIS de textarea JSON : chaque type logique a son widget dédié.
import React from 'react';
import type { AxisOption } from '../types';

const asStr = (v: unknown): string => (v == null ? '' : String(v));

/** text → input texte. */
export function TextField(props: {
  id?: string;
  value: unknown;
  onChange: (v: string) => void;
  placeholder?: string;
}): React.ReactElement {
  return (
    <input
      id={props.id}
      className="wa-insp-input"
      type="text"
      value={asStr(props.value)}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

/** richtext → textarea (HTML éditorial inline, pas de JSON). */
export function TextareaField(props: {
  id?: string;
  value: unknown;
  onChange: (v: string) => void;
}): React.ReactElement {
  return (
    <textarea
      id={props.id}
      className="wa-insp-textarea"
      value={asStr(props.value)}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

/** url → input url. */
export function UrlField(props: {
  id?: string;
  value: unknown;
  onChange: (v: string) => void;
}): React.ReactElement {
  return (
    <input
      id={props.id}
      className="wa-insp-input"
      type="url"
      inputMode="url"
      value={asStr(props.value)}
      placeholder="/chemin ou https://…"
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

/** number → input numérique (renvoie un number, ou undefined si vidé). */
export function NumberField(props: {
  id?: string;
  value: unknown;
  onChange: (v: number | undefined) => void;
}): React.ReactElement {
  return (
    <input
      id={props.id}
      className="wa-insp-input"
      type="number"
      value={props.value == null ? '' : String(props.value)}
      onChange={(e) => {
        const raw = e.target.value;
        props.onChange(raw === '' ? undefined : Number(raw));
      }}
    />
  );
}

/** enum → select (contenu). En layout, un enum passe par SegmentedControl. */
export function EnumField(props: {
  id?: string;
  value: unknown;
  options: AxisOption[];
  onChange: (v: string) => void;
}): React.ReactElement {
  return (
    <select
      id={props.id}
      className="wa-insp-select"
      value={asStr(props.value)}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option value="">(vide)</option>
      {props.options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label ?? o.value}
        </option>
      ))}
    </select>
  );
}

/** image → input src + aperçu visuel. */
export function ImageField(props: {
  id?: string;
  value: unknown;
  onChange: (v: string) => void;
}): React.ReactElement {
  const src = asStr(props.value);
  return (
    <div className="wa-insp-field" style={{ gap: 'var(--space-2)' }}>
      <input
        id={props.id}
        className="wa-insp-input"
        type="text"
        value={src}
        placeholder="/images/…"
        onChange={(e) => props.onChange(e.target.value)}
      />
      {src ? <img className="wa-insp-img-preview" src={src} alt="Aperçu" /> : null}
    </div>
  );
}
