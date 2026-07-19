// Waimia · Atelier · PresetGallery : galerie visuelle des DECLINAISONS (presets) d'un type.
//
// Un type de section a N presets (« variante × declinaison » : layout / palette / densite …).
// Cette grille les rend en vignettes d'apercu (/preview/<type>/<presetId>) avec, sous chaque
// vignette, un badge des AXES DIFFERENCIANTS : seulement les cles dont la valeur varie
// d'un preset a l'autre (ce qui distingue reellement cette declinaison). Reutilisee plus tard par
// l'inspecteur (brick B9). Prop-driven : aucun import depuis le `src/` de l'app.
//
// Chargement paresseux des vignettes via `useThumbQueue` (max 3 iframes simultanees).

import { useMemo, useRef } from 'react';
import { SectionThumb } from '../preview/SectionThumb';
import { useThumbQueue } from '../preview/useThumbQueue';

/** Un preset expose par le catalogue, forme minimale consommee par la galerie (recu en props). */
export interface PickerPreset {
  id: string;
  label?: string;
  /** Axes de variation du preset (ex. `{ layout: 'split-3-1', background: 'ink' }`). */
  axes: Record<string, unknown>;
}

export interface PresetGalleryProps {
  /** Type parent (sert a construire l'URL d'apercu du preset). */
  typeId: string;
  /** Declinaisons a afficher. */
  presets: PickerPreset[];
  /** Resout l'URL d'apercu d'un preset (ex. `(pid) => \`/preview/${typeId}/${pid}\``). */
  thumbSrcOf: (presetId: string) => string;
  /** Preset actuellement applique (surligne). */
  current?: string;
  /** Choix d'une declinaison. */
  onPick: (presetId: string) => void;
  /** Largeur des vignettes (px). Defaut : 240. */
  thumbWidth?: number;
}

/** Rend une valeur d'axe de facon lisible pour un badge (objets resumes en cle=valeur courtes). */
function formatAxisValue(value: unknown): string {
  if (value == null) return '·';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) return `${value.length} él.`;
  return 'objet';
}

/**
 * Calcule l'ensemble des cles d'axes dont la valeur VARIE au moins une fois sur la collection.
 * Une cle constante (meme valeur partout) n'aide pas a distinguer les presets → on la masque.
 */
function differentiatingKeys(presets: PickerPreset[]): Set<string> {
  const seen = new Map<string, Set<string>>();
  for (const p of presets) {
    for (const [k, v] of Object.entries(p.axes ?? {})) {
      const sig = JSON.stringify(v);
      const set = seen.get(k) ?? new Set<string>();
      set.add(sig);
      seen.set(k, set);
    }
  }
  const keys = new Set<string>();
  for (const [k, values] of seen) {
    // Varie sur la collection, OU n'est present que sur une partie des presets.
    if (values.size > 1 || presetsWithKey(presets, k) < presets.length) keys.add(k);
  }
  return keys;
}

function presetsWithKey(presets: PickerPreset[], key: string): number {
  return presets.filter((p) => key in (p.axes ?? {})).length;
}

export function PresetGallery({
  typeId,
  presets,
  thumbSrcOf,
  current,
  onPick,
  thumbWidth = 240,
}: PresetGalleryProps): React.ReactElement {
  const gridRef = useRef<HTMLDivElement>(null);
  const diffKeys = useMemo(() => differentiatingKeys(presets), [presets]);

  useThumbQueue(gridRef, [presets.length]);

  return (
    <section className="wa-presets" aria-label={`Déclinaisons de ${typeId}`}>
      <div className="wa-presets__grid" ref={gridRef} data-testid="preset-grid">
        {presets.map((p) => {
          const badges = Object.entries(p.axes ?? {}).filter(([k]) => diffKeys.has(k));
          return (
            <SectionThumb
              key={p.id}
              src={thumbSrcOf(p.id)}
              label={p.label ?? p.id}
              width={thumbWidth}
              height={Math.round(thumbWidth * 0.72)}
              selected={current === p.id}
              onClick={() => onPick(p.id)}
              footer={
                badges.length > 0 ? (
                  <ul className="wa-presets__axes" aria-label="Axes différenciants">
                    {badges.map(([k, v]) => (
                      <li key={k} className="wa-presets__axis">
                        <span className="wa-presets__axiskey">{k}</span>
                        <span className="wa-presets__axisval">{formatAxisValue(v)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null
              }
            />
          );
        })}
      </div>

      {presets.length === 0 && (
        <p className="wa-presets__empty" role="status">
          Aucune déclinaison pour ce type.
        </p>
      )}

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: PRESETS_CSS }}
        data-wa-style="preset-gallery"
      />
    </section>
  );
}

const PRESETS_CSS = `
.wa-presets__grid{display:grid;gap:var(--space-4);
  grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));}
.wa-presets__axes{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:var(--space-1);}
.wa-presets__axis{display:inline-flex;align-items:center;gap:4px;
  border:1px solid var(--hairline);border-radius:var(--radius-sm);
  padding:1px var(--space-2);background:var(--paper-2);font-size:var(--text-kicker);line-height:1.5;}
.wa-presets__axiskey{color:var(--muted);}
.wa-presets__axisval{color:var(--ink);font-weight:600;}
.wa-presets__empty{margin:0;padding:var(--space-6) 0;text-align:center;color:var(--muted);
  font-size:var(--text-small);}
`;

export default PresetGallery;
