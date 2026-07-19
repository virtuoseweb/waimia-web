// Waimia · Atelier · BuilderApp (#39, brick B6) : l'ILE-COEUR du nouvel editeur visuel.
//
// Remplace l'ancienne ile `BuilderCanvas` (composition par noms, JSON brut) par un app-shell dont
// la vue centrale est un CANVAS PAR BLOCS (une vignette live par section). Architecture :
//   - etat = PageDocument editable, pilote par un reducer PUR (`reducer.ts`) via `useReducer` ;
//   - Context (`context.ts`) : point d'accroche unique du picker (B5) et de l'inspecteur (B7) ;
//   - barre : meta (collection/slug/langue) + charger une page + Enregistrer + Exporter + toggle
//     « Aperçu page » (iframe globale du document complet) ;
//   - 3 zones : picker (gauche) | canvas par blocs / apercu page (centre) | inspecteur (droite).
//
// Les acquis FONCTIONNELS de l'ancienne ile SURVIVENT ici (l'E2E en depend) : chargement du
// catalogue, ajout de section (demo par defaut), Enregistrer -> POST /api/ds/compose (statut inline
// « Brouillon enregistre »), Export JSON. Le picker gauche est MINIMAL (liste de types groupee par
// famille) en attendant le picker riche B5 ; l'inspecteur droit est un placeholder en attendant B7.
// Les deux sont des SLOTS remplacables via les props `renderPicker` / `renderInspector`.
//
// 0 token DS invente, 0 valeur en dur (layout via var(--token) inline + feuille is:global de la
// page hote, anti-mismatch SSR), 0 tiret cadratin U+2014, UI en francais.

import {
  useCallback,
  useMemo,
  useReducer,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
// Import RUNTIME depuis le module PUR (sans `astro:content`) : sinon le bundle client tire une
// chaine serveur (astro:content virtuel) = build casse. Idem BuilderCanvas.
import { pageDocToFrontmatter } from '@waimia/ds-kernel/lib/page-document-frontmatter';
import type { PageDocument } from '@waimia/ds-kernel';
import type {
  BuilderCatalogueItem,
  BuilderColorScheme,
  BuilderMeta,
  BuilderPage,
} from '@waimia/builder/types';
import { BuilderContext } from './context';
import { useBuilder } from './context';
import { initState, reducer } from './reducer';
import type { BuilderContextValue } from './types';
import { BlockCanvas } from '../canvas/BlockCanvas';
import { FullPreview } from '../canvas/FullPreview';
import { buildDoc } from '../canvas/preview-doc';

/** Route de persistance du brouillon (integration DEV-ONLY `ds-save-dev.mjs`). Contrat stable. */
const COMPOSE_ENDPOINT = '/api/ds/compose';

/** Props de l'ile : identiques a l'ancienne BuilderCanvas + 2 slots optionnels (B5 / B7). */
export interface BuilderAppProps {
  items: BuilderCatalogueItem[];
  colorSchemes: BuilderColorScheme[];
  defaultMeta: BuilderMeta;
  collections: string[];
  pages?: BuilderPage[];
  renderPath: string;
  /** Slot gauche (picker B5). Defaut : picker minimal integre. */
  renderPicker?: ReactNode;
  /** Slot droit (inspecteur B7). Defaut : placeholder integre. */
  renderInspector?: ReactNode;
}

export default function BuilderApp({
  items,
  colorSchemes,
  defaultMeta,
  collections,
  pages = [],
  renderPath,
  renderPicker,
  renderInspector,
}: BuilderAppProps) {
  const [state, dispatch] = useReducer(reducer, defaultMeta, initState);

  // Index type -> entree catalogue (lookup O(1) pour resoudre la demo a l'ajout).
  const itemByType = useMemo(() => {
    const m = new Map<string, BuilderCatalogueItem>();
    for (const it of items) m.set(it.type, it);
    return m;
  }, [items]);

  const pageByKey = useMemo(() => {
    const m = new Map<string, BuilderPage>();
    for (const p of pages) m.set(`${p.collection}/${p.slug}`, p);
    return m;
  }, [pages]);

  // ── Actions exposees (ergonomie stable ; la mecanique reste dans le reducer) ──────────────────
  const add = useCallback(
    (type: string, atIndex?: number) => {
      const item = itemByType.get(type);
      if (!item) return;
      // Clone de la demo : chaque instance ajoutee est independante.
      dispatch({ kind: 'add', section: { ...item.demo }, atIndex });
    },
    [itemByType],
  );
  const remove = useCallback((index: number) => dispatch({ kind: 'remove', index }), []);
  const duplicate = useCallback((index: number) => dispatch({ kind: 'duplicate', index }), []);
  const move = useCallback((from: number, to: number) => dispatch({ kind: 'move', from, to }), []);
  const patchSection = useCallback(
    (index: number, props: Record<string, unknown>) =>
      dispatch({ kind: 'patchSection', index, props }),
    [],
  );
  const setMeta = useCallback(
    (meta: Partial<BuilderMeta>) => dispatch({ kind: 'setMeta', meta }),
    [],
  );
  const select = useCallback((uid: string | null) => dispatch({ kind: 'select', uid }), []);
  const load = useCallback(
    (doc: { meta: BuilderMeta; sections: BuilderContextValue['sections'][number]['data'][] }) =>
      dispatch({ kind: 'load', doc }),
    [],
  );

  // Valeur de Context memoisee : les bricks voisines (picker/inspecteur) s'y branchent.
  const ctx: BuilderContextValue = useMemo(
    () => ({
      meta: state.meta,
      sections: state.sections,
      selectedUid: state.selectedUid,
      rev: state.rev,
      items,
      itemByType,
      colorSchemes,
      renderPath,
      add,
      remove,
      duplicate,
      move,
      patchSection,
      setMeta,
      load,
      select,
    }),
    [state, items, itemByType, colorSchemes, renderPath, add, remove, duplicate, move, patchSection, setMeta, select, load],
  );

  // ── Charger une page composable reelle dans le canvas ─────────────────────────────────────────
  const loadPage = useCallback(
    (key: string) => {
      const page = pageByKey.get(key);
      if (!page) return;
      load({
        meta: {
          collection: collections.includes(page.collection) ? page.collection : state.meta.collection,
          slug: page.slug,
          lang: state.meta.lang,
          title_fr: page.label,
          title_en: state.meta.title_en,
        },
        sections: page.sections.map((s) => ({ ...s })),
      });
    },
    [pageByKey, collections, state.meta.lang, state.meta.collection, state.meta.title_en, load],
  );

  // ── Document serialisable (export + apercu page) ──────────────────────────────────────────────
  const pageDoc = useMemo(
    () => buildDoc(state.meta, state.sections.map((s) => s.data)),
    [state.meta, state.sections],
  );

  // ── Export : JSON brut + MDX round-trip (frontmatter YAML) ────────────────────────────────────
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'mdx'>('json');
  const exportJson = useMemo(() => JSON.stringify(pageDoc, null, 2), [pageDoc]);
  const exportMdx = useMemo(() => {
    const frontmatter = pageDocToFrontmatter(pageDoc as unknown as PageDocument);
    return `---\n${JSON.stringify(frontmatter, null, 2)}\n---\n`;
  }, [pageDoc]);
  const exportValue = exportFormat === 'json' ? exportJson : exportMdx;
  const copyExport = useCallback(() => {
    if (navigator.clipboard) void navigator.clipboard.writeText(exportValue);
  }, [exportValue]);

  // ── Enregistrer : POST /api/ds/compose (round-trip persistance) ───────────────────────────────
  const [saveState, setSaveState] = useState<
    | { phase: 'idle' }
    | { phase: 'saving' }
    | { phase: 'ok'; path: string }
    | { phase: 'error'; message: string; errors?: string[] }
  >({ phase: 'idle' });

  const savePage = useCallback(() => {
    setSaveState({ phase: 'saving' });
    fetch(COMPOSE_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug: state.meta.slug, doc: pageDoc }),
    })
      .then(async (res) => {
        if (res.status === 404) {
          setSaveState({
            phase: 'error',
            message: 'Endpoint indisponible (enregistrement dev uniquement).',
          });
          return;
        }
        let payload: { ok?: boolean; path?: string; error?: string; errors?: unknown } | null = null;
        try {
          payload = await res.json();
        } catch {
          /* reponse non-JSON : message generique ci-dessous. */
        }
        if (res.ok && payload && payload.ok && typeof payload.path === 'string') {
          setSaveState({ phase: 'ok', path: payload.path });
          return;
        }
        const message =
          payload && typeof payload.error === 'string'
            ? payload.error
            : `Echec de l'enregistrement (HTTP ${res.status}).`;
        const errors = Array.isArray(payload?.errors)
          ? payload.errors.map((e) => String(e))
          : undefined;
        setSaveState({ phase: 'error', message, errors });
      })
      .catch(() => {
        setSaveState({
          phase: 'error',
          message: 'Endpoint indisponible (dev uniquement) ou erreur reseau.',
        });
      });
  }, [state.meta.slug, pageDoc]);

  // ── Toggle vue : canvas par blocs vs apercu page complete ─────────────────────────────────────
  const [pagePreview, setPagePreview] = useState(false);

  // ── Styles inline (var(--token) uniquement) : app-shell 3 colonnes, anti-mismatch SSR ─────────
  const shell: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(220px, 280px) minmax(0, 1fr) minmax(240px, 320px)',
    gap: '1px',
    background: 'var(--hairline)',
    border: '1px solid var(--hairline)',
    minHeight: 'calc(100dvh - var(--header-height) - var(--space-12))',
  };
  const col: CSSProperties = {
    background: 'var(--paper)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    maxHeight: 'calc(100dvh - var(--header-height) - var(--space-12))',
    overflowY: 'auto',
  };

  return (
    <BuilderContext.Provider value={ctx}>
      <div className="bld">
        {/* ── BARRE ── */}
        <div className="bld-bar">
          <div className="bld-bar-meta">
            {pages.length > 0 && (
              <label className="bld-field">
                <span className="bld-field-label">Charger une page</span>
                <select
                  className="bld-select"
                  value=""
                  onChange={(e) => {
                    const key = e.target.value;
                    if (!key) return;
                    if (
                      state.sections.length > 0 &&
                      !window.confirm(
                        'Charger cette page remplacera les sections du canvas. Continuer ?',
                      )
                    ) {
                      return;
                    }
                    loadPage(key);
                  }}
                  aria-label="Charger une page composable existante dans le canvas"
                >
                  <option value="">Page vierge…</option>
                  {pages.map((p) => (
                    <option key={`${p.collection}/${p.slug}`} value={`${p.collection}/${p.slug}`}>
                      {p.label} · {p.route}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label className="bld-field">
              <span className="bld-field-label">Collection</span>
              <select
                className="bld-select"
                value={state.meta.collection}
                onChange={(e) => setMeta({ collection: e.target.value })}
              >
                {collections.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="bld-field">
              <span className="bld-field-label">Slug</span>
              <input
                className="bld-input"
                value={state.meta.slug}
                onChange={(e) => setMeta({ slug: e.target.value })}
                spellCheck={false}
              />
            </label>
            <label className="bld-field">
              <span className="bld-field-label">Langue</span>
              <select
                className="bld-select"
                value={state.meta.lang}
                onChange={(e) => setMeta({ lang: e.target.value as 'fr' | 'en' })}
              >
                <option value="fr">fr</option>
                <option value="en">en</option>
              </select>
            </label>
          </div>
          <div className="bld-bar-actions">
            <span className="bld-bar-count">{state.sections.length} sections</span>
            <button
              type="button"
              className={`bld-btn${pagePreview ? ' bld-btn--primary' : ''}`}
              onClick={() => setPagePreview((v) => !v)}
              aria-pressed={pagePreview}
              title="Basculer entre le canvas par blocs et l'apercu de la page complete"
            >
              {pagePreview ? 'Vue blocs' : 'Aperçu page'}
            </button>
            {saveState.phase !== 'idle' && (
              <span
                className={saveState.phase === 'error' ? 'bld-slot-err' : 'bld-bar-count'}
                role="status"
                aria-live="polite"
              >
                {saveState.phase === 'saving' && 'Enregistrement…'}
                {saveState.phase === 'ok' && 'Enregistre'}
                {saveState.phase === 'error' && 'Echec'}
              </span>
            )}
            <button
              type="button"
              className="bld-btn"
              onClick={savePage}
              disabled={saveState.phase === 'saving'}
            >
              {saveState.phase === 'saving' ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button
              type="button"
              className="bld-btn bld-btn--primary"
              onClick={() => setExportOpen((v) => !v)}
              aria-expanded={exportOpen}
              aria-controls="bld-export"
            >
              Exporter
            </button>
          </div>
        </div>

        {(saveState.phase === 'ok' || saveState.phase === 'error') && (
          <div
            role="status"
            aria-live="polite"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
              padding: 'var(--space-3) var(--space-4)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--paper-2)',
            }}
          >
            {saveState.phase === 'ok' && (
              <p className="bld-note">Brouillon enregistre : {saveState.path}</p>
            )}
            {saveState.phase === 'error' && (
              <>
                <p className="bld-slot-err">{saveState.message}</p>
                {saveState.errors && saveState.errors.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 'var(--space-4)' }}>
                    {saveState.errors.map((err, i) => (
                      <li key={i} className="bld-slot-err">
                        {err}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}

        {exportOpen && (
          <div className="bld-export" id="bld-export">
            <div className="bld-export-head">
              <div className="bld-export-tabs" role="tablist" aria-label="Format d'export">
                <button
                  type="button"
                  role="tab"
                  className={`bld-btn bld-export-tab${exportFormat === 'json' ? ' is-active' : ''}`}
                  aria-selected={exportFormat === 'json'}
                  onClick={() => setExportFormat('json')}
                >
                  JSON
                </button>
                <button
                  type="button"
                  role="tab"
                  className={`bld-btn bld-export-tab${exportFormat === 'mdx' ? ' is-active' : ''}`}
                  aria-selected={exportFormat === 'mdx'}
                  onClick={() => setExportFormat('mdx')}
                >
                  MDX
                </button>
              </div>
              <button type="button" className="bld-btn" onClick={copyExport}>
                Copier
              </button>
            </div>
            <textarea
              className="bld-export-area"
              readOnly
              value={exportValue}
              spellCheck={false}
              aria-label={
                exportFormat === 'json'
                  ? 'PageDocument serialise en JSON'
                  : 'Frontmatter MDX pret a coller dans la collection cible'
              }
            />
            <p className="bld-note">
              {exportFormat === 'json'
                ? 'PageDocument type, pret pour le MCP page.compose.'
                : 'Round-trip : collez ce bloc dans src/content/<collection>/<slug>.mdx pour reproduire la page.'}
            </p>
          </div>
        )}

        {/* ── APP-SHELL 3 ZONES ── */}
        <div style={shell}>
          {/* GAUCHE · PICKER (slot B5, defaut minimal) */}
          <aside style={col} className="bld-picker" aria-label="Catalogue des sections">
            {renderPicker ?? <MiniPicker />}
          </aside>

          {/* CENTRE · CANVAS PAR BLOCS ou APERÇU PAGE */}
          <main style={col} className="bld-canvas" aria-label="Composition de la page">
            {pagePreview ? (
              <FullPreview
                meta={state.meta}
                sections={state.sections.map((s) => s.data)}
                renderPath={renderPath}
              />
            ) : (
              <BlockCanvas />
            )}
          </main>

          {/* DROITE · INSPECTEUR (slot B7, defaut placeholder) */}
          <aside style={col} className="bld-inspector" aria-label="Inspecteur de section">
            {renderInspector ?? <InspectorPlaceholder />}
          </aside>
        </div>
      </div>
    </BuilderContext.Provider>
  );
}

// ── PICKER MINIMAL (slot gauche par defaut, en attendant B5) ──────────────────────────────────────
// Liste des types groupee par famille + recherche. Reutilise les classes bld-picker-* de la page
// hote (0 nouveau style). Ajoute une section au clic (demo par defaut, ajoutee en fin de document).
function MiniPicker() {
  const { items, add } = useBuilder();
  const [query, setQuery] = useState('');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (it: BuilderCatalogueItem) =>
      q.length === 0 ||
      it.type.toLowerCase().includes(q) ||
      it.family.toLowerCase().includes(q) ||
      it.categoryLabel.toLowerCase().includes(q) ||
      it.description_fr.toLowerCase().includes(q) ||
      it.tags.some((t) => t.toLowerCase().includes(q));

    const byFamily = new Map<string, BuilderCatalogueItem[]>();
    for (const it of items) {
      if (!match(it)) continue;
      const arr = byFamily.get(it.family) ?? [];
      arr.push(it);
      byFamily.set(it.family, arr);
    }
    return [...byFamily.entries()]
      .map(([family, list]) => ({ family, list }))
      .sort((a, b) => a.family.localeCompare(b.family));
  }, [items, query]);

  const total = groups.reduce((n, g) => n + g.list.length, 0);

  return (
    <>
      <div className="bld-picker-search">
        <input
          className="bld-input"
          type="search"
          placeholder="Chercher une section..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Chercher une section dans le catalogue"
        />
        <span className="bld-picker-count">{total} types</span>
      </div>
      <div className="bld-picker-list">
        {groups.map((group) => (
          <section key={group.family} className="bld-picker-group">
            <h3 className="bld-picker-family">{group.family}</h3>
            <ul className="bld-picker-items">
              {group.list.map((it) => (
                <li key={it.type}>
                  <button
                    type="button"
                    className="bld-picker-item"
                    onClick={() => add(it.type)}
                    title={it.description_fr}
                  >
                    <span className="bld-picker-type">{it.type}</span>
                    <span className="bld-picker-add" aria-hidden="true">
                      +
                    </span>
                    <span className="bld-sr">Ajouter la section {it.type}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {total === 0 && <p className="bld-empty">Aucune section ne correspond a « {query} ».</p>}
      </div>
    </>
  );
}

// ── INSPECTEUR PLACEHOLDER (slot droit par defaut, en attendant B7) ───────────────────────────────
// Affiche le type de la section selectionnee + un rappel que l'edition fine arrive avec B7. Le
// vrai inspecteur consommera `useBuilder()` (patchSection) via le slot `renderInspector`.
function InspectorPlaceholder() {
  const { sections, selectedUid } = useBuilder();
  const selected = sections.find((s) => s.uid === selectedUid) ?? null;
  if (!selected) {
    return (
      <p className="bld-empty bld-empty--inspector">
        Selectionnez une section dans le canvas pour l'inspecter.
      </p>
    );
  }
  return (
    <div className="bld-insp">
      <header className="bld-insp-head">
        <span className="bld-insp-kicker">Section</span>
        <span className="bld-insp-type">{selected.data.type}</span>
      </header>
      <p className="bld-hint">
        Edition des champs a venir (inspecteur B7). Le canvas gere deja l'ordre, la duplication, la
        suppression et l'insertion.
      </p>
    </div>
  );
}
