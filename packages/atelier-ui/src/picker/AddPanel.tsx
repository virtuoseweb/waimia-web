// Waimia · Atelier · AddPanel : panneau « Ajouter une section » par VIGNETTES (React, prop-driven).
//
// Remplace le choix de section par NOM (liste texte du builder actuel) par un picker visuel façon
// Relume : recherche texte + facette FAMILLE (chips) + facettes par AXES DE LAYOUT (dropdowns
// Layout / Colonnes / Fond… déduits des données) + bouton « Au hasard » + « Effacer », grille de
// vignettes d'aperçu, et deux onglets « Suggérées » / « Sauvegardées ». Zéro import depuis le
// `src/` de l'app : types, resolution d'URL de vignette et blocs sauvegardés arrivent en PROPS.
// Intégré plus tard par la brick B9 (panneau du builder).
//
// Chargement des vignettes : délégué à `useThumbQueue` (file IntersectionObserver, max 3
// simultanées) attachée au conteneur de grille. Re-observe à chaque changement de filtre/onglet.

import { useMemo, useRef, useState } from 'react';
import { SectionThumb } from '../preview/SectionThumb';
import { useThumbQueue } from '../preview/useThumbQueue';
import { PickerToolbar } from './PickerToolbar';
import { FamilyChips } from './FamilyChips';
import { AxisFacets, type AxisOption } from './AxisFacets';

/** Type de section catalogue, forme consommée par le picker (reçu en props).
 *  `axes` (optionnel) porte les valeurs d'axes de layout du type (layout, columns, background…),
 *  d'où le parent déduit les facettes dropdown : prop-driven, aucune valeur codée en dur. */
export interface PickerType {
  id: string;
  label_fr: string;
  family?: string;
  category?: string;
  axes?: Record<string, string | number | boolean>;
}

/** Bloc sauvegardé par l'utilisateur (onglet « Sauvegardées »). */
export interface SavedSection {
  id: string;
  label: string;
  type: string;
}

export interface AddPanelProps {
  /** Catalogue des types sélectionnables. */
  types: PickerType[];
  /** Résout l'URL de la page d'aperçu d'un type (ex. `(id) => \`/preview/${id}\``). */
  thumbSrcOf: (typeId: string) => string;
  /** Blocs sauvegardés (optionnel). */
  savedSections?: SavedSection[];
  /** L'utilisateur choisit un type du catalogue. */
  onPick: (typeId: string) => void;
  /** L'utilisateur choisit un bloc sauvegardé. */
  onPickSaved?: (savedId: string) => void;
  /** Fermeture du panneau. */
  onClose?: () => void;
  /** Largeur des vignettes (px), transmise à SectionThumb. Défaut : 260. */
  thumbWidth?: number;
  /** Ordre/libellés préférés des axes de facette (les autres suivent, auto-détectés). */
  facetAxisLabels?: Record<string, string>;
}

type Tab = 'suggested' | 'saved';

const ALL_FAMILIES = '__all__';

/** Libellés FR par défaut des axes de layout connus (surchargables via `facetAxisLabels`). */
const DEFAULT_AXIS_LABELS: Record<string, string> = {
  layout: 'Layout',
  columns: 'Colonnes',
  cols: 'Colonnes',
  background: 'Fond',
  density: 'Densité',
  variant: 'Variante',
  contentAlign: 'Alignement',
  align: 'Alignement',
};

/** Ordre d'affichage préféré des axes (les inconnus suivent, triés alpha). */
const AXIS_ORDER = ['layout', 'columns', 'cols', 'background', 'density', 'variant', 'contentAlign', 'align'];

export function AddPanel({
  types,
  thumbSrcOf,
  savedSections = [],
  onPick,
  onPickSaved,
  onClose,
  thumbWidth = 260,
  facetAxisLabels,
}: AddPanelProps): React.ReactElement {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<string>(ALL_FAMILIES);
  const [axisSel, setAxisSel] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<Tab>('suggested');
  const gridRef = useRef<HTMLDivElement>(null);

  const axisLabels = { ...DEFAULT_AXIS_LABELS, ...(facetAxisLabels ?? {}) };

  // Familles distinctes du catalogue (facette chips). Triées, sans les vides.
  const families = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of types) {
      const f = t.family?.trim();
      if (!f) continue;
      counts.set(f, (counts.get(f) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => a.id.localeCompare(b.id, 'fr'));
  }, [types]);

  // Axes de layout exposables : toute clé d'`axes` ayant >= 2 valeurs distinctes sur le catalogue.
  const axisOptions = useMemo<AxisOption[]>(() => {
    const byKey = new Map<string, Set<string>>();
    for (const t of types) {
      if (!t.axes) continue;
      for (const [k, v] of Object.entries(t.axes)) {
        if (v == null || v === '') continue;
        const set = byKey.get(k) ?? new Set<string>();
        set.add(String(v));
        byKey.set(k, set);
      }
    }
    const opts: AxisOption[] = [];
    for (const [key, values] of byKey) {
      if (values.size < 2) continue; // un axe constant ne filtre rien
      opts.push({
        key,
        label: axisLabels[key] ?? key,
        values: Array.from(values).sort((a, b) => a.localeCompare(b, 'fr')),
      });
    }
    return opts.sort((a, b) => {
      const ia = AXIS_ORDER.indexOf(a.key);
      const ib = AXIS_ORDER.indexOf(b.key);
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      return a.key.localeCompare(b.key);
    });
    // axisLabels dérive de props stables ; recalcul lié aux types.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types]);

  // Grille filtrée = recherche texte ∩ facette famille ∩ facettes d'axes.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeAxes = Object.entries(axisSel).filter(([, v]) => v);
    return types.filter((t) => {
      if (family !== ALL_FAMILIES && t.family !== family) return false;
      for (const [k, v] of activeAxes) {
        if (String(t.axes?.[k] ?? '') !== v) return false;
      }
      if (!q) return true;
      return t.label_fr.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
    });
  }, [types, query, family, axisSel]);

  const activeFilterCount =
    (family !== ALL_FAMILIES ? 1 : 0) +
    (query.trim() ? 1 : 0) +
    Object.values(axisSel).filter(Boolean).length;

  // Re-observe la file de rendu quand la liste visible change (filtre) ou l'onglet.
  useThumbQueue(gridRef, [tab, filtered.length, tab === 'saved' ? savedSections.length : 0]);

  const setAxis = (key: string, value: string): void =>
    setAxisSel((prev) => {
      const next = { ...prev };
      if (value) next[key] = value;
      else delete next[key];
      return next;
    });

  const clearFilters = (): void => {
    setQuery('');
    setFamily(ALL_FAMILIES);
    setAxisSel({});
  };

  const shuffle = (): void => {
    if (tab === 'saved') {
      if (savedSections.length === 0) return;
      const pick = savedSections[Math.floor(Math.random() * savedSections.length)];
      onPickSaved?.(pick.id);
      return;
    }
    if (filtered.length === 0) return;
    const pick = filtered[Math.floor(Math.random() * filtered.length)];
    onPick(pick.id);
  };

  return (
    <section className="wa-add" aria-label="Ajouter une section">
      <header className="wa-add__head">
        <h2 className="wa-add__title">Ajouter une section</h2>
        {onClose && (
          <button
            type="button"
            className="wa-add__close"
            onClick={onClose}
            aria-label="Fermer le panneau"
          >
            &#10005;
          </button>
        )}
      </header>

      <div className="wa-add__tabs" role="tablist" aria-label="Source des sections">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'suggested'}
          className="wa-add__tab"
          data-active={tab === 'suggested' || undefined}
          onClick={() => setTab('suggested')}
        >
          Suggérées <span className="wa-add__tabcount">{types.length}</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'saved'}
          className="wa-add__tab"
          data-active={tab === 'saved' || undefined}
          onClick={() => setTab('saved')}
        >
          Sauvegardées <span className="wa-add__tabcount">{savedSections.length}</span>
        </button>
      </div>

      {tab === 'suggested' && (
        <>
          <PickerToolbar query={query} onQuery={setQuery} resultCount={filtered.length} />
          {families.length > 0 && (
            <FamilyChips
              families={families}
              active={family}
              allId={ALL_FAMILIES}
              onSelect={setFamily}
            />
          )}
          <AxisFacets
            options={axisOptions}
            selected={axisSel}
            onChange={setAxis}
            onClear={clearFilters}
            activeCount={activeFilterCount}
            onShuffle={shuffle}
            canShuffle={filtered.length > 0}
          />

          <div className="wa-add__grid" ref={gridRef} data-testid="add-grid">
            {filtered.map((t) => (
              <SectionThumb
                key={t.id}
                src={thumbSrcOf(t.id)}
                label={t.label_fr}
                width={thumbWidth}
                height={Math.round(thumbWidth * 0.72)}
                onClick={() => onPick(t.id)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="wa-add__empty" role="status">
              Aucune section ne correspond aux filtres actifs.
            </p>
          )}
        </>
      )}

      {tab === 'saved' && (
        <>
          <div className="wa-add__savedbar">
            <button
              type="button"
              className="wa-facets__btn"
              onClick={shuffle}
              disabled={savedSections.length === 0}
              title="Proposer un bloc au hasard"
            >
              &#9861; Au hasard
            </button>
          </div>
          <div className="wa-add__grid" ref={gridRef} data-testid="saved-grid">
            {savedSections.map((s) => (
              <SectionThumb
                key={s.id}
                src={thumbSrcOf(s.type)}
                label={s.label}
                width={thumbWidth}
                height={Math.round(thumbWidth * 0.72)}
                onClick={() => onPickSaved?.(s.id)}
              />
            ))}
            {savedSections.length === 0 && (
              <p className="wa-add__empty" role="status">
                Aucun bloc sauvegardé pour l'instant.
              </p>
            )}
          </div>
        </>
      )}

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: ADD_CSS }}
        data-wa-style="add-panel"
      />
    </section>
  );
}

const ADD_CSS = `
.wa-add{display:flex;flex-direction:column;gap:var(--space-4);
  padding:var(--space-5);background:var(--paper);color:var(--ink);
  border:1px solid var(--hairline);border-radius:var(--radius-md);
  max-height:100%;overflow:auto;}
.wa-add__head{display:flex;align-items:center;justify-content:space-between;gap:var(--space-3);}
.wa-add__title{margin:0;font-size:var(--text-h3, 1.25rem);line-height:1.2;}
.wa-add__close{border:1px solid var(--hairline);background:var(--paper-2);color:var(--ink);
  width:32px;height:32px;border-radius:var(--radius-sm);cursor:pointer;line-height:1;
  transition:background .15s ease,border-color .15s ease;}
.wa-add__close:hover{background:var(--paper-3);border-color:var(--accent);}
.wa-add__tabs{display:flex;gap:var(--space-2);border-bottom:1px solid var(--hairline);}
.wa-add__tab{appearance:none;border:0;background:transparent;color:var(--muted);
  padding:var(--space-2) var(--space-3);cursor:pointer;font-size:var(--text-small);
  border-bottom:2px solid transparent;margin-bottom:-1px;
  display:inline-flex;align-items:center;gap:var(--space-2);}
.wa-add__tab[data-active]{color:var(--ink);border-bottom-color:var(--accent);}
.wa-add__tabcount{font-size:var(--text-kicker);color:var(--muted);
  background:var(--paper-2);border-radius:var(--radius-full);padding:1px var(--space-2);}
.wa-add__savedbar{display:flex;justify-content:flex-end;}
.wa-add__grid{display:grid;gap:var(--space-4);
  grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));}
.wa-add__empty{margin:0;padding:var(--space-6) 0;text-align:center;color:var(--muted);
  font-size:var(--text-small);}
`;

export default AddPanel;
