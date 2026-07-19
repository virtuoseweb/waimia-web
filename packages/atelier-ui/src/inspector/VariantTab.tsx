// @waimia/atelier-ui · inspector · onglet VARIANTE (grille des presets).
//
// Si `renderPresetThumb` est fourni, chaque carte affiche la vignette rendue ; sinon carte
// texte : libellé + badges des axes clés du preset (background / layout / variant / density /
// columns). Clic → onPickPreset(id). Preset actif = surbrillance (selectedPresetId).
import React from 'react';
import type { Preset } from './types';

/** Axes lisibles à afficher en badges (ordre stable). */
const BADGE_KEYS = ['background', 'layout', 'variant', 'density', 'columns', 'proportion'];

function badges(preset: Preset): string[] {
  const out: string[] = [];
  for (const k of BADGE_KEYS) {
    const v = preset.props[k];
    if (v != null && v !== '') out.push(`${k}: ${String(v)}`);
  }
  return out;
}

export function VariantTab(props: {
  presets: Preset[];
  selectedPresetId?: string;
  onPickPreset: (id: string) => void;
  renderPresetThumb?: (presetId: string) => React.ReactNode;
}): React.ReactElement {
  if (props.presets.length === 0) {
    return <div className="wa-insp-empty">Ce type n'a pas encore de preset.</div>;
  }

  return (
    <div className="wa-insp-field" style={{ gap: 'var(--space-4)' }}>
      <span className="wa-insp-section-title">Variante</span>
      <div className="wa-insp-presets">
        {props.presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className="wa-insp-preset"
            aria-pressed={props.selectedPresetId === preset.id}
            onClick={() => props.onPickPreset(preset.id)}
          >
            {props.renderPresetThumb ? props.renderPresetThumb(preset.id) : null}
            <span className="wa-insp-preset-label">{preset.label}</span>
            {!props.renderPresetThumb ? (
              <span className="wa-insp-badges">
                {badges(preset).map((b) => (
                  <span key={b} className="wa-insp-badge">
                    {b}
                  </span>
                ))}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
