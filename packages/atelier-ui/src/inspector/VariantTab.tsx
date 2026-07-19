// @waimia/atelier-ui · inspector · onglet VARIANTE (grille des presets + enregistrer variante).
//
// Si `renderPresetThumb` est fourni, chaque carte affiche la vignette rendue ; sinon carte
// texte : libellé + badges des axes clés du preset (background / layout / variant / density /
// columns). Clic → onPickPreset(id). Preset actif = surbrillance (selectedPresetId).
//
// Action « Enregistrer comme variante » (P3) : quand `onSaveVariant` est fourni, une mini-modale
// (même pattern que « Enregistrer comme version » côté hôte) collecte un libellé + un id
// auto-suggéré `<type>--<slug>` (modifiable), puis délègue le POST à l'hôte. Composant PUR : il ne
// connaît ni le keyword, ni le fetch, ni les props projetées ; il émet { id, label } et affiche le
// résultat. 0 token DS inventé, 0 valeur en dur, 0 tiret cadratin U+2014.
import React, { useState } from 'react';
import type { Preset } from './types';

/** Axes lisibles à afficher en badges (ordre stable). */
const BADGE_KEYS = ['background', 'layout', 'variant', 'density', 'columns', 'proportion'];

/** Slugifie un libellé humain (miroir de `slugify` côté endpoint ds-save-dev.mjs). */
function slugify(name: string): string {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function badges(preset: Preset): string[] {
  const out: string[] = [];
  for (const k of BADGE_KEYS) {
    const v = preset.props[k];
    if (v != null && v !== '') out.push(`${k}: ${String(v)}`);
  }
  return out;
}

export function VariantTab(props: {
  typeId: string;
  presets: Preset[];
  selectedPresetId?: string;
  onPickPreset: (id: string) => void;
  renderPresetThumb?: (presetId: string) => React.ReactNode;
  /** Enregistre les axes de présentation courants comme variante custom (fetch côté hôte). */
  onSaveVariant?: (args: { id: string; label: string }) => Promise<{ ok: boolean; error?: string }>;
}): React.ReactElement {
  const [saveOpen, setSaveOpen] = useState(false);

  return (
    <div className="wa-insp-field" style={{ gap: 'var(--space-4)' }}>
      <div className="wa-insp-group-head">
        <span className="wa-insp-section-title">Variante</span>
        {props.onSaveVariant ? (
          <button
            type="button"
            className="wa-insp-add"
            data-testid="variant-save-open"
            onClick={() => setSaveOpen(true)}
          >
            Enregistrer comme variante
          </button>
        ) : null}
      </div>

      {props.presets.length === 0 ? (
        <div className="wa-insp-empty">Ce type n'a pas encore de preset.</div>
      ) : (
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
      )}

      {saveOpen && props.onSaveVariant ? (
        <SaveVariantModal
          typeId={props.typeId}
          onSaveVariant={props.onSaveVariant}
          onClose={() => setSaveOpen(false)}
        />
      ) : null}
    </div>
  );
}

// ── Mini-modale « Enregistrer comme variante » : libellé + id auto-suggéré -> onSaveVariant ───────
function SaveVariantModal(props: {
  typeId: string;
  onSaveVariant: (args: { id: string; label: string }) => Promise<{ ok: boolean; error?: string }>;
  onClose: () => void;
}): React.ReactElement {
  const [label, setLabel] = useState('');
  // id auto-suggéré `<type>--<slug>` ; l'utilisateur peut le surcharger (idTouched verrouille l'auto).
  const [id, setId] = useState('');
  const [idTouched, setIdTouched] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'saving' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  const prefix = `${props.typeId}--`;
  const suggestedId = idTouched ? id : `${prefix}${slugify(label)}`;

  const submit = (): void => {
    const trimmedLabel = label.trim();
    const finalId = suggestedId.trim();
    if (!trimmedLabel || finalId === prefix || !finalId.startsWith(prefix)) return;
    setPhase('saving');
    setError('');
    void props
      .onSaveVariant({ id: finalId, label: trimmedLabel })
      .then((res) => {
        if (res.ok) {
          setPhase('ok');
          return;
        }
        setPhase('error');
        setError(res.error || 'Echec de l\'enregistrement.');
      })
      .catch(() => {
        setPhase('error');
        setError('Endpoint indisponible (enregistrement dev uniquement).');
      });
  };

  const canSubmit =
    phase !== 'saving' && label.trim().length > 0 && suggestedId.trim().length > prefix.length;

  return (
    <div className="wa-insp-ov" role="dialog" aria-modal="true" aria-label="Enregistrer comme variante">
      <button type="button" className="wa-insp-ov-backdrop" aria-label="Annuler" onClick={props.onClose} />
      <div className="wa-insp-ov-panel" data-testid="variant-save-modal">
        <h2 className="wa-insp-modal-title">Enregistrer « {props.typeId} » comme variante</h2>
        <p className="wa-insp-modal-note">
          Capture les axes de présentation courants (layout, densité, fond, direction…) comme
          variante nommée du catalogue. Elle apparaît tout de suite ci-dessous ; la liste complète
          buildée la reflétera au prochain redémarrage du serveur dev.
        </p>

        {phase === 'ok' ? (
          <>
            <p className="wa-insp-modal-ok" data-testid="variant-save-ok">
              Variante enregistrée. Disponible dans la liste des variantes.
            </p>
            <div className="wa-insp-modal-actions">
              <button type="button" className="wa-insp-add" onClick={props.onClose}>
                Fermer
              </button>
            </div>
          </>
        ) : (
          <>
            <label className="wa-insp-field" style={{ gap: 'var(--space-1)' }}>
              <span className="wa-insp-label">Nom de la variante</span>
              <input
                className="wa-insp-input"
                value={label}
                autoFocus
                placeholder="Ex. Encre resserré"
                data-testid="variant-save-label"
                onChange={(e) => setLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submit();
                }}
              />
            </label>
            <label className="wa-insp-field" style={{ gap: 'var(--space-1)' }}>
              <span className="wa-insp-label">
                Identifiant <span className="wa-insp-fieldname">{prefix}…</span>
              </span>
              <input
                className="wa-insp-input"
                value={suggestedId}
                data-testid="variant-save-id"
                onChange={(e) => {
                  setIdTouched(true);
                  setId(e.target.value);
                }}
              />
            </label>
            {phase === 'error' ? <p className="wa-insp-modal-err">{error}</p> : null}
            <div className="wa-insp-modal-actions">
              <button type="button" className="wa-insp-add" onClick={props.onClose}>
                Annuler
              </button>
              <button
                type="button"
                className="wa-insp-add wa-insp-add--primary"
                data-testid="variant-save-submit"
                onClick={submit}
                disabled={!canSubmit}
              >
                {phase === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
