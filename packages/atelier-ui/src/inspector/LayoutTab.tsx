// @waimia/atelier-ui · inspector · onglet LAYOUT (axes de présentation générés).
//
// Rend chaque AxisControl fourni par l'hôte avec le bon widget : enum → segmented control,
// columns/order → stepper, bool → toggle, direction → 4 boutons, placement → sous-panneau
// par région (align / justify / order / hideOn). Voir `deriveAxes` pour construire la liste
// depuis les slots de présentation d'un type.
import React from 'react';
import type { AxisControl, PropsPatch, SectionSlot } from './types';
import { DirectionControl, FieldShell, SegmentedControl, Stepper, Toggle } from './fields/controls';
import { humanize } from './fields/ContainerFields';

const ALIGN_OPTS = [
  { value: 'start' },
  { value: 'center' },
  { value: 'end' },
];
const JUSTIFY_OPTS = [
  { value: 'start' },
  { value: 'center' },
  { value: 'end' },
  { value: 'between' },
];
const HIDE_OPTS = [
  { value: 'none' },
  { value: 'mobile' },
  { value: 'desktop' },
];

/** Construit les AxisControl d'un type depuis ses slots de présentation (enum → segmented),
 *  en préfixant d'éventuels axes supplémentaires fournis par l'hôte (columns, direction…). */
export function deriveAxes(
  presentationSlots: SectionSlot[],
  extras: AxisControl[] = [],
): AxisControl[] {
  const fromSlots: AxisControl[] = presentationSlots
    .filter((s) => s.type === 'enum' && s.enumValues && s.enumValues.length > 0)
    .map((s) => ({
      field: s.field,
      label: humanize(s.field),
      control: 'segmented' as const,
      options: (s.enumValues ?? []).map((v) => ({ value: v })),
    }));
  return [...fromSlots, ...extras];
}

/** Sous-panneau placement d'une région : align / justify / order / hideOn. */
function RegionPlacement(props: {
  region: string;
  value: Record<string, unknown>;
  onChange: (next: Record<string, unknown>) => void;
}): React.ReactElement {
  const v = props.value ?? {};
  const set = (k: string, val: unknown) => props.onChange({ ...v, [k]: val });
  const order = typeof v.order === 'number' ? (v.order as number) : 0;
  return (
    <div className="wa-insp-item">
      <span className="wa-insp-item-idx">{props.region}</span>
      <FieldShell label="Align">
        <SegmentedControl value={v.align as string} options={ALIGN_OPTS} onChange={(x) => set('align', x)} />
      </FieldShell>
      <FieldShell label="Justify">
        <SegmentedControl value={v.justify as string} options={JUSTIFY_OPTS} onChange={(x) => set('justify', x)} />
      </FieldShell>
      <FieldShell label="Order">
        <Stepper value={order} min={0} max={9} onChange={(x) => set('order', x)} />
      </FieldShell>
      <FieldShell label="Hide on">
        <SegmentedControl value={v.hideOn as string} options={HIDE_OPTS} onChange={(x) => set('hideOn', x)} />
      </FieldShell>
    </div>
  );
}

export function LayoutTab(props: {
  axes: AxisControl[];
  value: Record<string, unknown>;
  onChange: (patch: PropsPatch) => void;
}): React.ReactElement {
  if (props.axes.length === 0) {
    return <div className="wa-insp-empty">Ce type n'expose aucun axe de layout.</div>;
  }

  return (
    <div className="wa-insp-field" style={{ gap: 'var(--space-4)' }}>
      <span className="wa-insp-section-title">Layout</span>
      {props.axes.map((axis) => {
        const cur = props.value[axis.field];
        const label = axis.label ?? humanize(axis.field);

        if (axis.control === 'segmented') {
          return (
            <FieldShell key={axis.field} label={label} fieldName={axis.field}>
              <SegmentedControl
                value={cur as string | undefined}
                options={axis.options}
                onChange={(v) => props.onChange({ [axis.field]: v })}
              />
            </FieldShell>
          );
        }
        if (axis.control === 'stepper') {
          const n = typeof cur === 'number' ? cur : (axis.min ?? 0);
          return (
            <FieldShell key={axis.field} label={label} fieldName={axis.field}>
              <Stepper
                value={n}
                min={axis.min}
                max={axis.max}
                step={axis.step}
                onChange={(v) => props.onChange({ [axis.field]: v })}
              />
            </FieldShell>
          );
        }
        if (axis.control === 'toggle') {
          return (
            <FieldShell key={axis.field} label={label} fieldName={axis.field}>
              <Toggle checked={Boolean(cur)} onChange={(v) => props.onChange({ [axis.field]: v })} />
            </FieldShell>
          );
        }
        if (axis.control === 'direction') {
          return (
            <FieldShell key={axis.field} label={label} fieldName={axis.field}>
              <DirectionControl
                value={cur as string | undefined}
                onChange={(v) => props.onChange({ [axis.field]: v })}
              />
            </FieldShell>
          );
        }
        if (axis.control === 'order') {
          const arr = Array.isArray(cur) ? (cur as number[]) : Array.from({ length: axis.count }, (_, i) => i);
          return (
            <FieldShell key={axis.field} label={label} fieldName={axis.field} hint="ordre visuel">
              <div className="wa-insp-placement">
                {Array.from({ length: axis.count }, (_, pos) => (
                  <FieldShell key={pos} label={`pos ${pos}`}>
                    <Stepper
                      value={arr[pos] ?? pos}
                      min={0}
                      max={axis.count - 1}
                      onChange={(v) => {
                        const next = arr.slice();
                        next[pos] = v;
                        props.onChange({ [axis.field]: next });
                      }}
                    />
                  </FieldShell>
                ))}
              </div>
            </FieldShell>
          );
        }
        if (axis.control === 'placement') {
          const obj = (cur as Record<string, Record<string, unknown>>) ?? {};
          return (
            <FieldShell key={axis.field} label={label} fieldName={axis.field}>
              <div className="wa-insp-field" style={{ gap: 'var(--space-2)' }}>
                {axis.regions.map((region) => (
                  <RegionPlacement
                    key={region}
                    region={region}
                    value={obj[region] ?? {}}
                    onChange={(next) => props.onChange({ [axis.field]: { ...obj, [region]: next } })}
                  />
                ))}
              </div>
            </FieldShell>
          );
        }
        return null;
      })}
    </div>
  );
}
