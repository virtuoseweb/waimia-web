// Waimia · Library · BuilderHost (#39, assemblage B8+B9) : le WRAPPER HOTE du builder visuel.
//
// C'est le SEUL endroit cote app autorise a connaitre les DONNEES du builder (catalogue, presets,
// schemas de couleur, slots, blocs sauvegardes /api/ds/saved) et a les cabler sur l'ile pure
// `@waimia/atelier-ui`. Il rend `<BuilderApp>` en lui fournissant :
//   - `renderPicker`  = <Overlays> : le declencheur « + Ajouter une section » + le panneau AddPanel
//                       (vignettes reelles /preview/<type>, onglets Suggerees/Sauvegardees) + la
//                       mini-modale « Enregistrer comme version » (POST /api/ds/saved). Rendu DANS
//                       le Provider (via le slot) -> il consomme les actions par `useBuilder()`.
//   - `renderInspector` = <InspectorSlot> : l'inspecteur 4 onglets (Variante/Layout/Contenu/Couleur)
//                       branche sur la section selectionnee (patchSection).
//
// `atelier-ui` reste 0 import app : toutes les donnees transitent en props/Context. Les DONNEES
// lourdes (contrat de slots des 221 types, 1.2 Mo) NE sont PAS serialisees dans les props d'ile :
// on les charge a la demande par import DYNAMIQUE (chunk Vite separe, resolu au premier montage de
// l'inspecteur). Les presets/schemas (petits) transitent par le Context / un import statique pur.
//
// 0 nouveau token DS (var(--token) uniquement), 0 valeur en dur, 0 tiret cadratin U+2014, UI FR.

import { useCallback, useEffect, useMemo, useState } from 'react';
import BuilderApp from '@waimia/atelier-ui/app/BuilderApp.tsx';
import { useBuilder } from '@waimia/atelier-ui/app/context.ts';
import { AddPanel, type PickerType, type SavedSection } from '@waimia/atelier-ui/picker/AddPanel.tsx';
import { InspectorPanel } from '@waimia/atelier-ui/inspector/InspectorPanel.tsx';
import { deriveAxes } from '@waimia/atelier-ui/inspector/LayoutTab.tsx';
import type { ColorScheme, SectionSlot } from '@waimia/atelier-ui/inspector/types.ts';
import { COLOR_SCHEMES } from '@waimia/ds-kernel/lib/section-colorschemes';
import type {
  BuilderCatalogueItem,
  BuilderColorScheme,
  BuilderMeta,
  BuilderPage,
  SectionInstance,
} from '@waimia/builder/types';

/** Entree du store « Saved sections » (/api/ds/saved) : type + props concretes reutilisables. */
interface SavedEntry {
  id: string;
  label: string;
  type: string;
  props: Record<string, unknown>;
  sourcePresetId?: string;
  createdAt?: string;
}

/** Contrat de slots par type, tel que servi par section-slots.generated.json (charge a la demande). */
type SlotsByType = Record<string, { slots: SectionSlot[] }>;

export interface BuilderHostProps {
  items: BuilderCatalogueItem[];
  colorSchemes: BuilderColorScheme[];
  defaultMeta: BuilderMeta;
  collections: string[];
  pages?: BuilderPage[];
  renderPath: string;
}

/** Cles d'axes de presentation cherchees dans la demo d'un type pour alimenter les facettes du picker. */
const AXIS_KEYS = ['background', 'layout', 'columns', 'variant', 'density', 'proportion', 'contentAlign', 'align'];

/** Extrait les axes scalaires presents dans une demo (aucune valeur en dur : lu depuis les donnees). */
function pickAxes(demo: SectionInstance): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const key of AXIS_KEYS) {
    const v = (demo as Record<string, unknown>)[key];
    if (v != null && (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean')) {
      out[key] = v;
    }
  }
  return out;
}

export default function BuilderHost({ items, ...rest }: BuilderHostProps): React.ReactElement {
  // Blocs sauvegardes (source de verite = /api/ds/saved, DEV-ONLY). Rafraichis apres chaque save.
  const [savedList, setSavedList] = useState<SavedEntry[]>([]);
  // Contrat de slots complet par type : charge a la demande (chunk Vite), null tant que non arrive.
  const [slotsByType, setSlotsByType] = useState<SlotsByType | null>(null);

  const refreshSaved = useCallback(async () => {
    try {
      const res = await fetch('/api/ds/saved');
      const json = await res.json();
      if (json && json.ok && Array.isArray(json.sections)) setSavedList(json.sections as SavedEntry[]);
    } catch {
      /* endpoint dev indisponible (build statique) : l'onglet Sauvegardees reste vide, pas d'erreur. */
    }
  }, []);

  useEffect(() => {
    void refreshSaved();
  }, [refreshSaved]);

  // Import DYNAMIQUE du contrat de slots (1.2 Mo) : chunk separe, hors bundle initial de l'ile.
  useEffect(() => {
    let alive = true;
    import('../../../packages/ds-kernel/src/lib/section-slots.generated.json')
      .then((mod) => {
        if (alive) setSlotsByType(((mod as { default?: SlotsByType }).default ?? mod) as SlotsByType);
      })
      .catch(() => {
        /* si le chunk echoue, l'inspecteur retombe sur les slots partiels du catalogue (Context). */
      });
    return () => {
      alive = false;
    };
  }, []);

  const thumbSrcOf = useCallback((typeId: string) => `/preview/${typeId}`, []);

  const pickerTypes = useMemo<PickerType[]>(
    () =>
      items.map((it) => ({
        id: it.type,
        label_fr: it.type,
        family: it.family,
        category: it.categoryLabel,
        axes: pickAxes(it.demo),
      })),
    [items],
  );

  const savedSections = useMemo<SavedSection[]>(
    () => savedList.map((s) => ({ id: s.id, label: s.label, type: s.type })),
    [savedList],
  );

  // COLOR_SCHEMES (ds-kernel) et le contrat ColorScheme de l'inspecteur ont la MEME forme
  // (id/kind/base/cells/label) : miroir self-contained, cast structurel sans re-mapper.
  const schemes = COLOR_SCHEMES as unknown as ColorScheme[];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOST_CSS }} data-wa-style="builder-host" />
      <BuilderApp
        items={items}
        {...rest}
        renderPicker={
          <Overlays
            types={pickerTypes}
            savedSections={savedSections}
            savedList={savedList}
            thumbSrcOf={thumbSrcOf}
            onSaved={refreshSaved}
          />
        }
        renderInspector={<InspectorSlot slotsByType={slotsByType} schemes={schemes} />}
      />
    </>
  );
}

// ── Overlays : declencheur picker (colonne gauche) + modales AddPanel & Save-as-version ───────────
// Rendu comme `renderPicker` (donc DANS le Provider) : il consomme les actions du builder par
// `useBuilder()`. Les modales sont en position fixed -> elles echappent au clipping de la colonne.
function Overlays(props: {
  types: PickerType[];
  savedSections: SavedSection[];
  savedList: SavedEntry[];
  thumbSrcOf: (typeId: string) => string;
  onSaved: () => Promise<void>;
}): React.ReactElement {
  const { add, addInstance, openAdd, closeAdd, addOpen, addAtIndex, saveTarget, closeSave } = useBuilder();

  const reinsertSaved = useCallback(
    (savedId: string) => {
      const entry = props.savedList.find((s) => s.id === savedId);
      if (!entry) return;
      // Reinsertion avec les PROPS STOCKEES (pas la demo) : type garanti coherent avec le store.
      addInstance({ ...(entry.props as Record<string, unknown>), type: entry.type } as SectionInstance, addAtIndex);
      closeAdd();
    },
    [props.savedList, addInstance, addAtIndex, closeAdd],
  );

  return (
    <div className="bldx-pick">
      <button
        type="button"
        className="bld-btn bld-btn--primary bldx-pick__add bld-add-trigger"
        onClick={() => openAdd()}
      >
        + Ajouter une section
      </button>
      <p className="bldx-pick__hint">
        Pioche une section par vignette, ou reutilise une version sauvegardee. Tu peux aussi inserer
        entre deux blocs depuis le canvas.
      </p>

      {addOpen && (
        <div className="bldx-ov" role="dialog" aria-modal="true" aria-label="Ajouter une section">
          <button type="button" className="bldx-ov__backdrop" aria-label="Fermer le panneau" onClick={closeAdd} />
          <div className="bldx-ov__panel bldx-ov__panel--wide">
            <AddPanel
              types={props.types}
              thumbSrcOf={props.thumbSrcOf}
              savedSections={props.savedSections}
              onPick={(typeId) => {
                add(typeId, addAtIndex);
                closeAdd();
              }}
              onPickSaved={reinsertSaved}
              onClose={closeAdd}
            />
          </div>
        </div>
      )}

      {saveTarget && <SaveVersionModal data={saveTarget} onClose={closeSave} onSaved={props.onSaved} />}
    </div>
  );
}

// ── Mini-modale « Enregistrer comme version » : label -> POST /api/ds/saved -> refresh ────────────
function SaveVersionModal(props: {
  data: SectionInstance;
  onClose: () => void;
  onSaved: () => Promise<void>;
}): React.ReactElement {
  const [label, setLabel] = useState('');
  const [phase, setPhase] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');

  const submit = useCallback(() => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setPhase('saving');
    fetch('/api/ds/saved', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ keyword: 'WAIMIA-SAVE', label: trimmed, type: props.data.type, props: props.data }),
    })
      .then(async (res) => {
        const payload = await res.json().catch(() => null);
        if (res.ok && payload && payload.ok) {
          await props.onSaved();
          props.onClose();
          return;
        }
        setPhase('error');
        setError((payload && payload.error) || `Echec de l'enregistrement (HTTP ${res.status}).`);
      })
      .catch(() => {
        setPhase('error');
        setError('Endpoint indisponible (enregistrement dev uniquement).');
      });
  }, [label, props]);

  return (
    <div className="bldx-ov" role="dialog" aria-modal="true" aria-label="Enregistrer comme version">
      <button type="button" className="bldx-ov__backdrop" aria-label="Annuler" onClick={props.onClose} />
      <div className="bldx-ov__panel bldx-ov__panel--narrow">
        <h2 className="bldx-save__title">Enregistrer « {props.data.type} » comme version</h2>
        <label className="bldx-save__label">
          <span className="bld-field-label">Nom de la version</span>
          <input
            className="bld-input"
            value={label}
            autoFocus
            placeholder="Ex. Hero encre resserre"
            onChange={(e) => setLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit();
            }}
          />
        </label>
        {phase === 'error' && <p className="bldx-save__err">{error}</p>}
        <div className="bldx-save__actions">
          <button type="button" className="bld-btn" onClick={props.onClose}>
            Annuler
          </button>
          <button
            type="button"
            className="bld-btn bld-btn--primary bldx-save__confirm"
            onClick={submit}
            disabled={phase === 'saving' || label.trim().length === 0}
          >
            {phase === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── InspectorSlot : inspecteur 4 onglets branche sur la section selectionnee ──────────────────────
// Rendu comme `renderInspector` (DANS le Provider). Lit la selection + patchSection par Context.
// La surbrillance du preset actif est tracee localement (uid -> presetId), reset implicite au reload.
function InspectorSlot(props: {
  slotsByType: SlotsByType | null;
  schemes: ColorScheme[];
}): React.ReactElement {
  const { sections, selectedUid, itemByType, patchSection } = useBuilder();
  const [presetByUid, setPresetByUid] = useState<Record<string, string>>({});

  const index = sections.findIndex((s) => s.uid === selectedUid);
  const selected = index >= 0 ? sections[index] : null;

  if (!selected) {
    return (
      <p className="bld-empty bld-empty--inspector">
        Selectionnez une section dans le canvas pour l'inspecter.
      </p>
    );
  }

  const type = selected.data.type;
  const item = itemByType.get(type);
  // Slots complets (itemShape/min/max) depuis le chunk charge ; repli sur les slots partiels du
  // catalogue tant que le chunk n'est pas arrive (le Contenu de base reste editable).
  const slots: SectionSlot[] =
    (props.slotsByType?.[type]?.slots as SectionSlot[] | undefined) ??
    ((item?.slots as unknown as SectionSlot[]) ?? []);
  const presentationAxes = deriveAxes(slots.filter((s) => s.kind === 'presentation'));
  const presets = (item?.presets ?? []).map((p) => ({ id: p.id, type, label: p.label, props: p.props }));

  return (
    <InspectorPanel
      typeId={type}
      props={selected.data as Record<string, unknown>}
      slots={slots}
      presentationAxes={presentationAxes}
      presets={presets}
      schemes={props.schemes}
      onChange={(patch) => patchSection(index, patch)}
      onPickPreset={(id) => {
        const preset = item?.presets.find((x) => x.id === id);
        if (!preset) return;
        patchSection(index, preset.props);
        setPresetByUid((m) => ({ ...m, [selected.uid]: id }));
      }}
      selectedPresetId={presetByUid[selected.uid]}
    />
  );
}

const HOST_CSS = `
.bldx-pick{display:flex;flex-direction:column;gap:var(--space-3);padding:var(--space-3);}
.bldx-pick__add{width:100%;justify-content:center;}
.bldx-pick__hint{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);
  line-height:1.5;color:var(--muted);}
.bld-insert-btn{flex:none;font-size:var(--text-micro);}
.bldx-ov{position:fixed;inset:0;z-index:50;display:grid;place-items:center;padding:var(--space-5);}
.bldx-ov__backdrop{position:absolute;inset:0;border:0;background:rgba(var(--ink-rgb),0.45);cursor:pointer;}
.bldx-ov__panel{position:relative;z-index:1;max-height:calc(100dvh - var(--space-10));overflow:auto;
  background:var(--paper);border:1px solid var(--hairline);border-radius:var(--radius-md);
  box-shadow:0 24px 64px rgba(var(--ink-rgb),0.25);}
.bldx-ov__panel--wide{width:min(1040px, 96vw);}
.bldx-ov__panel--wide .wa-add{border:0;border-radius:0;max-height:none;}
.bldx-ov__panel--narrow{width:min(420px, 94vw);padding:var(--space-5);
  display:flex;flex-direction:column;gap:var(--space-4);}
.bldx-save__title{margin:0;font-family:var(--font-sans);font-size:var(--text-body);
  font-weight:var(--fw-semibold);color:var(--ink);}
.bldx-save__label{display:flex;flex-direction:column;gap:var(--space-2);}
.bldx-save__actions{display:flex;justify-content:flex-end;gap:var(--space-3);}
.bldx-save__err{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);color:var(--accent-text);}
`;
