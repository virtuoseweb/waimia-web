// @waimia/atelier-ui · inspector · onglet COULEUR (pastilles visuelles des schémas).
//
// Chaque schéma est une pastille montrant sa surface de FOND + ses cellules vedettes. Le
// schéma actif est déduit de props.background (+ cellCycle). Clic → patch { background,
// cellCycle } (cellCycle vidé pour un schéma mono). 0 token en dur : SURFACE_VAR mappe
// chaque surface DS vers son var(--token).
import React from 'react';
import type { ColorScheme, PropsPatch, Surface } from './types';
import { SURFACE_VAR } from './styles';

/** Patch de props appliquant un schéma (miroir de schemeProps). */
function schemePatch(scheme: ColorScheme): PropsPatch {
  if (scheme.kind === 'mono') return { background: scheme.base, cellCycle: undefined };
  return { background: scheme.base, cellCycle: scheme.cells };
}

/** Surfaces à afficher dans la pastille (fond + cellules). */
function swatchSurfaces(scheme: ColorScheme): Surface[] {
  if (scheme.kind === 'mono') return [scheme.base];
  return [scheme.base, ...scheme.cells];
}

/** Le schéma est-il actif au vu des props courantes ? */
function isActive(scheme: ColorScheme, background: unknown, cellCycle: unknown): boolean {
  if (background !== scheme.base) return false;
  const cur = Array.isArray(cellCycle) ? (cellCycle as string[]) : [];
  const want = scheme.kind === 'mono' ? [] : scheme.cells;
  return cur.length === want.length && cur.every((c, i) => c === want[i]);
}

export function ColorTab(props: {
  schemes: ColorScheme[];
  value: Record<string, unknown>;
  onChange: (patch: PropsPatch) => void;
}): React.ReactElement {
  if (props.schemes.length === 0) {
    return <div className="wa-insp-empty">Aucun schéma de couleur fourni.</div>;
  }
  const bg = props.value.background;
  const cellCycle = props.value.cellCycle;

  return (
    <div className="wa-insp-field" style={{ gap: 'var(--space-4)' }}>
      <span className="wa-insp-section-title">Couleur</span>
      <div className="wa-insp-schemes">
        {props.schemes.map((scheme) => {
          const active = isActive(scheme, bg, cellCycle);
          return (
            <button
              key={scheme.id}
              type="button"
              className="wa-insp-scheme"
              aria-pressed={active}
              title={scheme.label}
              onClick={() => props.onChange(schemePatch(scheme))}
            >
              <span className="wa-insp-swatch">
                {swatchSurfaces(scheme).map((s, i) => (
                  <span key={i} style={{ background: SURFACE_VAR[s] ?? 'var(--paper)' }} />
                ))}
              </span>
              <span className="wa-insp-scheme-label">{scheme.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
