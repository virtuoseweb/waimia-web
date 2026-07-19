// @waimia/atelier-ui · inspector · primitives de contrôle partagées (prop-driven).
import React from 'react';
import type { AxisOption, Lang } from '../types';

/** Enveloppe de champ : libellé + nom technique + requis + hint. */
export function FieldShell(props: {
  label: string;
  fieldName?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  htmlFor?: string;
}): React.ReactElement {
  return (
    <div className="wa-insp-field">
      <label className="wa-insp-label" htmlFor={props.htmlFor}>
        <span>{props.label}</span>
        {props.fieldName && props.fieldName !== props.label ? (
          <span className="wa-insp-fieldname">{props.fieldName}</span>
        ) : null}
        {props.required ? <span className="wa-insp-req" title="Requis">*</span> : null}
        {props.hint ? <span className="wa-insp-hint">{props.hint}</span> : null}
      </label>
      {props.children}
    </div>
  );
}

/** Segmented control (choix exclusif dans une liste bornée). */
export function SegmentedControl(props: {
  value: string | undefined;
  options: AxisOption[];
  onChange: (v: string) => void;
  ariaLabel?: string;
}): React.ReactElement {
  return (
    <div className="wa-insp-seg" role="group" aria-label={props.ariaLabel}>
      {props.options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="wa-insp-seg-btn"
          aria-pressed={props.value === opt.value}
          onClick={() => props.onChange(opt.value)}
        >
          {opt.label ?? opt.value}
        </button>
      ))}
    </div>
  );
}

/** Stepper numérique borné. */
export function Stepper(props: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
}): React.ReactElement {
  const step = props.step ?? 1;
  const atMin = props.min !== undefined && props.value <= props.min;
  const atMax = props.max !== undefined && props.value >= props.max;
  return (
    <div className="wa-insp-stepper">
      <button
        type="button"
        className="wa-insp-step-btn"
        aria-label="Diminuer"
        disabled={atMin}
        onClick={() => props.onChange(props.value - step)}
      >
        −
      </button>
      <span className="wa-insp-step-val">{props.value}</span>
      <button
        type="button"
        className="wa-insp-step-btn"
        aria-label="Augmenter"
        disabled={atMax}
        onClick={() => props.onChange(props.value + step)}
      >
        +
      </button>
    </div>
  );
}

/** Interrupteur booléen. */
export function Toggle(props: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}): React.ReactElement {
  return (
    <div className="wa-insp-toggle-row">
      <button
        type="button"
        role="switch"
        aria-checked={props.checked}
        className="wa-insp-toggle"
        onClick={() => props.onChange(!props.checked)}
      />
      {props.label ? <span>{props.label}</span> : null}
    </div>
  );
}

const DIRECTIONS: AxisOption[] = [
  { value: 'row', label: '→' },
  { value: 'row-reverse', label: '←' },
  { value: 'column', label: '↓' },
  { value: 'column-reverse', label: '↑' },
];

/** Contrôle de direction (4 boutons). */
export function DirectionControl(props: {
  value: string | undefined;
  onChange: (v: string) => void;
}): React.ReactElement {
  return (
    <div className="wa-insp-dir" role="group" aria-label="Direction">
      {DIRECTIONS.map((d) => (
        <button
          key={d.value}
          type="button"
          className="wa-insp-dir-btn"
          aria-pressed={props.value === d.value}
          aria-label={d.value}
          title={d.value}
          onClick={() => props.onChange(d.value)}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
}

/** Bascule de langue FR / EN pour les champs bilingues. */
export function LangTabs(props: {
  lang: Lang;
  onChange: (l: Lang) => void;
}): React.ReactElement {
  return (
    <div className="wa-insp-langs" role="group" aria-label="Langue">
      {(['fr', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          className="wa-insp-lang"
          aria-pressed={props.lang === l}
          onClick={() => props.onChange(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
