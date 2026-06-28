// Waimia · Builder visuel (#39 T3) : le CANVAS de composition de page (île React client:load).
//
// Pièce maîtresse de l'outil pro : un app-shell 3 zones (façon Webflow/Relume) qui compose un
// PageDocument (#39) à partir du catalogue de sections, avec aperçu live dans une iframe.
//
//   ┌─────────── BARRE (meta + Exporter) ───────────┐
//   │ PICKER (gauche) │ CANVAS (centre) │ INSPECTOR │
//   │  registry        │  liste ordonnée │  variant  │
//   │  cherchable      │  + aperçu live  │  preset   │
//   │  groupé famille  │  (iframe)       │  scheme   │
//   └────────────────────────────────────────────────┘
//
// ── APERÇU LIVE : choix GET vs POST (documenté) ──────────────────────────────────────────────
// La route de rendu (`src/pages/library/builder/render.astro`, #67) accepte le PageDocument :
//   - en GET via `?doc=<JSON encodé URI>`  (simple : on pilote `iframe.src`),
//   - en POST via le corps JSON           (sans limite de longueur d'URL).
// On privilégie le GET (1 attribut `src`, pas de fetch). MAIS les URLs ont une limite pratique
// (~8 ko selon navigateur/proxy). Dès que le doc encodé dépasse `URL_DOC_LIMIT` (6000 car., marge
// sûre), on bascule sur un POST : on `fetch()` la route avec le doc en corps, et on injecte le
// HTML renvoyé dans `iframe.srcdoc`. Le GET reste le chemin nominal (docs courts) ; le POST est le
// chemin de repli automatique (docs longs). Aucune section n'est tronquée : l'aperçu reflète
// toujours le document complet. Les deux chemins sont debouncés (1 seul rendu par rafale d'édits).
//
// ── PÉRIMÈTRE T3 vs T4 ───────────────────────────────────────────────────────────────────────
// T3 (ce scope) : ajouter/réordonner/supprimer/sélectionner des sections, variant (preset) +
// colorscheme par section, aperçu live, export JSON. L'inspecteur AFFICHE les slots de contenu en
// LECTURE SEULE (champs à remplir), mais l'éditeur de champs complet (saisie du contenu bilingue,
// tableaux d'items) et le round-trip MDX restent T4 : explicitement signalés dans l'UI.
//
// 0 token DS inventé, 0 valeur en dur : le layout passe par var(--token) en styles inline (évite
// le mismatch SSR comme dans library/index.astro) et par la feuille is:global de la page hôte.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
// Import RUNTIME depuis le module PUR (sans `astro:content`) : sinon le bundle client tire
// `lib/page-document` -> `schemas/page-document` -> `astro:content` (virtuel serveur) = build cassé.
import { pageDocToFrontmatter } from '@waimia/ds-kernel/lib/page-document-frontmatter';
import type { PageDocument } from '@waimia/ds-kernel';
import type {
  BuilderCanvasProps,
  BuilderCatalogueItem,
  BuilderColorScheme,
  BuilderMeta,
  BuilderSlot,
  SectionInstance,
} from './types';

// ── Constantes (pas des tokens DS : seuils techniques) ──────────────────────────────────────
/** Au-delà, l'aperçu live passe en POST+srcdoc plutôt qu'en GET (limite pratique d'URL). */
const URL_DOC_LIMIT = 6000;
/** Délai de debounce de l'aperçu live (ms) : un seul rendu par rafale d'édition. */
const PREVIEW_DEBOUNCE_MS = 350;

/** Identifiant local d'une section dans le canvas (clé React stable, hors PageDocument). */
let __uid = 0;
const nextUid = () => `s${++__uid}`;

interface CanvasSection {
  /** clé locale stable (réordonnancement sans remount intempestif). */
  uid: string;
  /** instance de section telle qu'elle sera sérialisée dans le PageDocument. */
  data: SectionInstance;
  /** preset appliqué (id) ou '' si aucun. */
  presetId: string;
  /** colorscheme appliqué (id) ou '' si aucun. */
  schemeId: string;
}

/** Construit le PageDocument sérialisable à partir de l'état du canvas. */
function toPageDocument(meta: BuilderMeta, sections: CanvasSection[]) {
  return {
    $schema: 'waimia.page-document/v1',
    meta: {
      collection: meta.collection,
      slug: meta.slug,
      lang: meta.lang,
      title_fr: meta.title_fr,
      title_en: meta.title_en,
      collectionExtra: {},
    },
    sections: sections.map((s) => s.data),
  };
}

/** Applique preset + colorscheme par-dessus la démo de base, sans muter l'original. */
function applyVariations(
  base: SectionInstance,
  presetProps: Record<string, unknown> | undefined,
  schemeProps: { background: string; cellCycle?: string[] } | undefined,
): SectionInstance {
  // Ordre : démo de base → preset (layout/déclinaison) → colorscheme (couleur prime, axe dédié).
  return {
    ...base,
    ...(presetProps ?? {}),
    ...(schemeProps ?? {}),
  } as SectionInstance;
}

export default function BuilderCanvas({
  items,
  colorSchemes,
  defaultMeta,
  collections,
  renderPath,
}: BuilderCanvasProps) {
  // Index type → entrée catalogue (lookup O(1) pour presets/slots/demo).
  const itemByType = useMemo(() => {
    const m = new Map<string, BuilderCatalogueItem>();
    for (const it of items) m.set(it.type, it);
    return m;
  }, [items]);

  const schemeById = useMemo(() => {
    const m = new Map<string, BuilderColorScheme>();
    for (const s of colorSchemes) m.set(s.id, s);
    return m;
  }, [colorSchemes]);

  // ── État document ──────────────────────────────────────────────────────────────────────────
  const [meta, setMeta] = useState<BuilderMeta>(defaultMeta);
  const [sections, setSections] = useState<CanvasSection[]>([]);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'mdx'>('json');

  const selected = useMemo(
    () => sections.find((s) => s.uid === selectedUid) ?? null,
    [sections, selectedUid],
  );

  // ── Picker : registry groupé par famille + filtré par recherche ──────────────────────────────
  const groupedItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const match = (it: BuilderCatalogueItem) =>
      q.length === 0 ||
      it.type.toLowerCase().includes(q) ||
      it.family.toLowerCase().includes(q) ||
      it.categoryLabel.toLowerCase().includes(q) ||
      it.description_fr.toLowerCase().includes(q) ||
      it.tags.some((t) => t.toLowerCase().includes(q));

    const groups = new Map<string, BuilderCatalogueItem[]>();
    for (const it of items) {
      if (!match(it)) continue;
      const arr = groups.get(it.family) ?? [];
      arr.push(it);
      groups.set(it.family, arr);
    }
    return [...groups.entries()]
      .map(([family, list]) => ({ family, list }))
      .sort((a, b) => a.family.localeCompare(b.family));
  }, [items, query]);

  const totalMatches = useMemo(
    () => groupedItems.reduce((n, g) => n + g.list.length, 0),
    [groupedItems],
  );

  // ── Recalcul de l'instance d'une section (rejoue preset + scheme sur la démo de base) ─────────
  const rebuildData = useCallback(
    (type: string, presetId: string, schemeId: string): SectionInstance => {
      const item = itemByType.get(type);
      const base: SectionInstance = item ? { ...item.demo } : { type };
      // Preset : props concrètes (background/layout/density/...) résolues au build et embarquées
      // dans VariationOption.props (cf page hôte : resolvePreset). On les étale sur la démo.
      const presetProps = item?.presets.find((p) => p.id === presetId)?.props;
      // Colorscheme : axe couleur orthogonal (background + cellCycle), appliqué APRÈS le preset
      // pour que la couleur choisie prime (les composants câblés honorent background/cellCycle).
      const scheme = schemeId ? schemeById.get(schemeId) : undefined;
      const schemeProps = scheme
        ? scheme.cellCycle.length > 0
          ? { background: scheme.background, cellCycle: scheme.cellCycle }
          : { background: scheme.background }
        : undefined;
      return applyVariations(base, presetProps, schemeProps);
    },
    [itemByType, schemeById],
  );

  // ── Actions canvas ───────────────────────────────────────────────────────────────────────────
  const addSection = useCallback(
    (type: string) => {
      const item = itemByType.get(type);
      if (!item) return;
      const uid = nextUid();
      setSections((prev) => [
        ...prev,
        { uid, data: { ...item.demo }, presetId: '', schemeId: '' },
      ]);
      setSelectedUid(uid);
    },
    [itemByType],
  );

  const removeSection = useCallback(
    (uid: string) => {
      setSections((prev) => prev.filter((s) => s.uid !== uid));
      setSelectedUid((cur) => (cur === uid ? null : cur));
    },
    [],
  );

  const moveSection = useCallback((uid: string, dir: -1 | 1) => {
    setSections((prev) => {
      const idx = prev.findIndex((s) => s.uid === uid);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = prev.slice();
      const [moved] = next.splice(idx, 1);
      next.splice(target, 0, moved);
      return next;
    });
  }, []);

  const patchVariation = useCallback(
    (uid: string, key: 'presetId' | 'schemeId', value: string) => {
      setSections((prev) =>
        prev.map((s) => {
          if (s.uid !== uid) return s;
          const presetId = key === 'presetId' ? value : s.presetId;
          const schemeId = key === 'schemeId' ? value : s.schemeId;
          return { ...s, presetId, schemeId, data: rebuildData(s.data.type, presetId, schemeId) };
        }),
      );
    },
    [rebuildData],
  );

  // Édite une clé de contenu d'une section (data[field]) de façon immuable → l'aperçu live suit.
  const patchData = useCallback((uid: string, field: string, value: unknown) => {
    setSections((prev) =>
      prev.map((s) =>
        s.uid === uid ? { ...s, data: { ...s.data, [field]: value } } : s,
      ),
    );
  }, []);

  // ── Aperçu live (GET nominal, POST+srcdoc en repli si l'URL dépasse la limite) ───────────────
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const debounceRef = useRef<number | null>(null);
  const reqIdRef = useRef(0);
  /** Dernier doc poussé dans l'iframe (évite un reload identique quand src reflète l'URL absolue). */
  const lastPushedRef = useRef('');
  const [previewMode, setPreviewMode] = useState<'get' | 'post'>('get');

  const pageDoc = useMemo(() => toPageDocument(meta, sections), [meta, sections]);

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      const frame = iframeRef.current;
      if (!frame) return;
      const json = JSON.stringify(pageDoc);
      // Doc identique au dernier rendu poussé : rien à faire (évite les reloads inutiles).
      if (json === lastPushedRef.current) return;
      const encoded = encodeURIComponent(json);
      const getUrl = `${renderPath}?doc=${encoded}`;

      if (getUrl.length <= URL_DOC_LIMIT) {
        setPreviewMode('get');
        // GET nominal : on pilote src. removeAttribute('srcdoc') au cas où on revient de POST.
        if (frame.hasAttribute('srcdoc')) frame.removeAttribute('srcdoc');
        frame.src = getUrl;
        lastPushedRef.current = json;
        return;
      }

      // Repli POST : doc trop long pour l'URL → fetch + srcdoc (aucune troncature).
      setPreviewMode('post');
      const myReq = ++reqIdRef.current;
      fetch(renderPath, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: json,
      })
        .then((r) => r.text())
        .then((html) => {
          // Ignore les réponses obsolètes (course entre rafales d'édition).
          if (myReq !== reqIdRef.current) return;
          if (iframeRef.current) {
            iframeRef.current.srcdoc = html;
            lastPushedRef.current = json;
          }
        })
        .catch(() => {
          /* erreur réseau : le rendu précédent reste affiché ; pas d'échec silencieux côté logique
             car le mode POST est signalé dans la barre d'aperçu. */
        });
    }, PREVIEW_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [pageDoc, renderPath]);

  // ── Export : JSON brut + MDX round-trip (frontmatter YAML prêt à coller dans la collection) ───
  const exportJson = useMemo(() => JSON.stringify(pageDoc, null, 2), [pageDoc]);
  // MDX = frontmatter (issu de pageDocToFrontmatter) encadré par ---. Collé dans
  // src/content/<collection>/<slug>.mdx, il reproduit la page. JSON est un sous-ensemble
  // valide de YAML 1.2, donc ce bloc est un frontmatter YAML valide pour Astro (et bundlable
  // côté client, contrairement au package `yaml` qui n'est pas une dépendance directe).
  const exportMdx = useMemo(() => {
    const frontmatter = pageDocToFrontmatter(pageDoc as PageDocument);
    return `---\n${JSON.stringify(frontmatter, null, 2)}\n---\n`;
  }, [pageDoc]);
  const exportValue = exportFormat === 'json' ? exportJson : exportMdx;
  const copyExport = useCallback(() => {
    if (navigator.clipboard) void navigator.clipboard.writeText(exportValue);
  }, [exportValue]);

  // ── Styles inline (var(--token) uniquement) : layout app-shell, anti-mismatch SSR ────────────
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
    <div className="bld">
      {/* ── BARRE ── */}
      <div className="bld-bar">
        <div className="bld-bar-meta">
          <label className="bld-field">
            <span className="bld-field-label">Collection</span>
            <select
              className="bld-select"
              value={meta.collection}
              onChange={(e) => setMeta((m) => ({ ...m, collection: e.target.value }))}
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
              value={meta.slug}
              onChange={(e) => setMeta((m) => ({ ...m, slug: e.target.value }))}
              spellCheck={false}
            />
          </label>
          <label className="bld-field">
            <span className="bld-field-label">Langue</span>
            <select
              className="bld-select"
              value={meta.lang}
              onChange={(e) => setMeta((m) => ({ ...m, lang: e.target.value as 'fr' | 'en' }))}
            >
              <option value="fr">fr</option>
              <option value="en">en</option>
            </select>
          </label>
        </div>
        <div className="bld-bar-actions">
          <span className="bld-bar-count">{sections.length} sections</span>
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
                ? 'PageDocument sérialisé en JSON'
                : 'Frontmatter MDX prêt à coller dans la collection cible'
            }
          />
          <p className="bld-note">
            {exportFormat === 'json'
              ? 'PageDocument typé, prêt pour le MCP page.compose.'
              : 'Round-trip : collez ce bloc dans src/content/<collection>/<slug>.mdx pour reproduire la page.'}
          </p>
        </div>
      )}

      {/* ── APP-SHELL 3 ZONES ── */}
      <div style={shell}>
        {/* GAUCHE · PICKER */}
        <aside style={col} className="bld-picker" aria-label="Catalogue des sections">
          <div className="bld-picker-search">
            <input
              className="bld-input"
              type="search"
              placeholder="Chercher une section..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Chercher une section dans le catalogue"
            />
            <span className="bld-picker-count">{totalMatches} types</span>
          </div>
          <div className="bld-picker-list">
            {groupedItems.map((group) => (
              <section key={group.family} className="bld-picker-group">
                <h3 className="bld-picker-family">{group.family}</h3>
                <ul className="bld-picker-items">
                  {group.list.map((it) => (
                    <li key={it.type}>
                      <button
                        type="button"
                        className="bld-picker-item"
                        onClick={() => addSection(it.type)}
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
            {totalMatches === 0 && (
              <p className="bld-empty">Aucune section ne correspond à « {query} ».</p>
            )}
          </div>
        </aside>

        {/* CENTRE · CANVAS */}
        <main style={col} className="bld-canvas" aria-label="Composition de la page">
          <div className="bld-canvas-stack">
            {sections.length === 0 && (
              <div className="bld-empty bld-empty--canvas">
                Document vide. Ajoutez une section depuis le catalogue à gauche.
              </div>
            )}
            <ol className="bld-blocks">
              {sections.map((s, idx) => {
                const isSel = s.uid === selectedUid;
                return (
                  <li
                    key={s.uid}
                    className={`bld-block${isSel ? ' is-selected' : ''}`}
                  >
                    <button
                      type="button"
                      className="bld-block-main"
                      onClick={() => setSelectedUid(s.uid)}
                      aria-pressed={isSel}
                    >
                      <span className="bld-block-index">{idx + 1}</span>
                      <span className="bld-block-type">{s.data.type}</span>
                      {(s.presetId || s.schemeId) && (
                        <span className="bld-block-variation">
                          {[s.presetId, s.schemeId].filter(Boolean).join(' · ')}
                        </span>
                      )}
                    </button>
                    <div className="bld-block-tools">
                      <button
                        type="button"
                        className="bld-tool"
                        onClick={() => moveSection(s.uid, -1)}
                        disabled={idx === 0}
                        aria-label={`Monter la section ${s.data.type}`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="bld-tool"
                        onClick={() => moveSection(s.uid, 1)}
                        disabled={idx === sections.length - 1}
                        aria-label={`Descendre la section ${s.data.type}`}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="bld-tool bld-tool--danger"
                        onClick={() => removeSection(s.uid)}
                        aria-label={`Supprimer la section ${s.data.type}`}
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* APERÇU LIVE */}
          <div className="bld-preview">
            <div className="bld-preview-head">
              <span className="bld-preview-title">Aperçu live</span>
              <span className="bld-preview-mode" title="Méthode d'envoi du document à la route de rendu">
                {previewMode === 'get' ? 'GET ?doc' : 'POST (doc long)'}
              </span>
            </div>
            <iframe
              ref={iframeRef}
              className="bld-preview-frame"
              title="Aperçu de la page composée"
              loading="lazy"
            />
          </div>
        </main>

        {/* DROITE · INSPECTOR */}
        <aside style={col} className="bld-inspector" aria-label="Inspecteur de section">
          {!selected && (
            <p className="bld-empty bld-empty--inspector">
              Sélectionnez une section dans le canvas pour ajuster sa déclinaison.
            </p>
          )}
          {selected && (
            <Inspector
              key={selected.uid}
              section={selected}
              item={itemByType.get(selected.data.type)}
              colorSchemes={colorSchemes}
              onPatch={patchVariation}
              onPatchData={patchData}
            />
          )}
        </aside>
      </div>
    </div>
  );
}

// ── INSPECTOR (sous-composant) ─────────────────────────────────────────────────────────────────
interface InspectorProps {
  section: CanvasSection;
  item: BuilderCatalogueItem | undefined;
  colorSchemes: BuilderColorScheme[];
  onPatch: (uid: string, key: 'presetId' | 'schemeId', value: string) => void;
  onPatchData: (uid: string, field: string, value: unknown) => void;
}

function Inspector({ section, item, colorSchemes, onPatch, onPatchData }: InspectorProps) {
  const presets = item?.presets ?? [];
  const contentSlots = (item?.slots ?? []).filter((s) => s.kind === 'content');

  return (
    <div className="bld-insp">
      <header className="bld-insp-head">
        <span className="bld-insp-kicker">Section</span>
        <span className="bld-insp-type">{section.data.type}</span>
        {item && <span className="bld-insp-family">{item.family} · {item.categoryLabel}</span>}
      </header>

      {/* Déclinaison (preset) */}
      <div className="bld-field">
        <span className="bld-field-label">Déclinaison (preset)</span>
        <select
          className="bld-select"
          value={section.presetId}
          onChange={(e) => onPatch(section.uid, 'presetId', e.target.value)}
          disabled={presets.length === 0}
        >
          <option value="">Démo par défaut</option>
          {presets.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        {presets.length === 0 && (
          <span className="bld-hint">Aucun preset catalogué pour ce type.</span>
        )}
      </div>

      {/* Schéma de couleur */}
      <div className="bld-field">
        <span className="bld-field-label">Schéma de couleur</span>
        <select
          className="bld-select"
          value={section.schemeId}
          onChange={(e) => onPatch(section.uid, 'schemeId', e.target.value)}
        >
          <option value="">Couleur de la démo</option>
          {colorSchemes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Slots de contenu : éditables (scalaires + bilingues), arrays/objets en édition avancée JSON */}
      <div className="bld-insp-slots">
        <span className="bld-field-label">Contenu (slots)</span>
        {contentSlots.length === 0 && (
          <span className="bld-hint">Aucun slot de contenu déclaré.</span>
        )}
        <div className="bld-slot-list">
          {contentSlots.map((slot) => (
            <SlotEditor
              key={slot.field}
              uid={section.uid}
              slot={slot}
              data={section.data}
              onPatchData={onPatchData}
            />
          ))}
        </div>
        <p className="bld-note">
          Les champs texte/nombre/oui-non sont éditables directement (l'aperçu se met à jour). Les
          listes et objets sont en édition avancée (JSON).
        </p>
      </div>
    </div>
  );
}

// ── ÉDITEUR DE SLOT (un champ de contenu) ────────────────────────────────────────────────────────
interface SlotEditorProps {
  uid: string;
  slot: BuilderSlot;
  data: SectionInstance;
  onPatchData: (uid: string, field: string, value: unknown) => void;
}

/** Types logiques de slot éditables par un contrôle scalaire simple (le reste = JSON avancé). */
const SCALAR_TYPES = new Set(['text', 'richtext', 'url', 'enum', 'number', 'bool']);

function SlotEditor({ uid, slot, data, onPatchData }: SlotEditorProps) {
  const meta = (
    <span className="bld-slot-meta">
      {slot.type}
      {slot.bilingual ? ' · fr/en' : ''}
      {slot.required ? ' · requis' : ''}
    </span>
  );

  // Slot non scalaire (array/object) → édition avancée via textarea JSON tolérant.
  if (!SCALAR_TYPES.has(slot.type)) {
    if (slot.bilingual) {
      return (
        <div className="bld-slot">
          <div className="bld-slot-head">
            <span className="bld-slot-field">{slot.field}</span>
            {meta}
          </div>
          <JsonField uid={uid} field={`${slot.field}_fr`} label="FR (avancé)" data={data} onPatchData={onPatchData} />
          <JsonField uid={uid} field={`${slot.field}_en`} label="EN (avancé)" data={data} onPatchData={onPatchData} />
        </div>
      );
    }
    return (
      <div className="bld-slot">
        <div className="bld-slot-head">
          <span className="bld-slot-field">{slot.field}</span>
          {meta}
        </div>
        <JsonField uid={uid} field={slot.field} label="Avancé (JSON)" data={data} onPatchData={onPatchData} />
      </div>
    );
  }

  // Slot scalaire bilingue → deux contrôles FR / EN.
  if (slot.bilingual) {
    return (
      <div className="bld-slot">
        <div className="bld-slot-head">
          <span className="bld-slot-field">{slot.field}</span>
          {meta}
        </div>
        <ScalarField uid={uid} field={`${slot.field}_fr`} label="FR" slot={slot} data={data} onPatchData={onPatchData} />
        <ScalarField uid={uid} field={`${slot.field}_en`} label="EN" slot={slot} data={data} onPatchData={onPatchData} />
      </div>
    );
  }

  // Slot scalaire simple → un seul contrôle.
  return (
    <div className="bld-slot">
      <div className="bld-slot-head">
        <span className="bld-slot-field">{slot.field}</span>
        {meta}
      </div>
      <ScalarField uid={uid} field={slot.field} label="" slot={slot} data={data} onPatchData={onPatchData} />
    </div>
  );
}

// ── Contrôle scalaire (texte / nombre / booléen / enum) lié à data[field] ─────────────────────────
interface ScalarFieldProps {
  uid: string;
  field: string;
  label: string;
  slot: BuilderSlot;
  data: SectionInstance;
  onPatchData: (uid: string, field: string, value: unknown) => void;
}

function ScalarField({ uid, field, label, slot, data, onPatchData }: ScalarFieldProps) {
  const raw = data[field];
  const inputId = `bld-f-${uid}-${field}`;

  if (slot.type === 'bool') {
    return (
      <label className="bld-slot-check" htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          checked={raw === true}
          onChange={(e) => onPatchData(uid, field, e.target.checked)}
        />
        <span className="bld-slot-sub">{label || 'Activé'}</span>
      </label>
    );
  }

  if (slot.type === 'enum' && slot.enumValues && slot.enumValues.length > 0) {
    return (
      <label className="bld-slot-control">
        {label && <span className="bld-slot-sub">{label}</span>}
        <select
          id={inputId}
          className="bld-select"
          value={typeof raw === 'string' ? raw : ''}
          onChange={(e) => onPatchData(uid, field, e.target.value)}
          aria-label={label ? `${field} ${label}` : field}
        >
          <option value="">(non défini)</option>
          {slot.enumValues.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (slot.type === 'number') {
    return (
      <label className="bld-slot-control">
        {label && <span className="bld-slot-sub">{label}</span>}
        <input
          id={inputId}
          className="bld-input"
          type="number"
          value={typeof raw === 'number' ? raw : ''}
          onChange={(e) => {
            const v = e.target.value;
            // Champ vidé → on retire la valeur (undefined) plutôt que de forcer 0.
            onPatchData(uid, field, v === '' ? undefined : Number(v));
          }}
          aria-label={label ? `${field} ${label}` : field}
        />
      </label>
    );
  }

  // text / richtext / url : zone multiligne (le richtext et les textes longs respirent mieux).
  return (
    <label className="bld-slot-control">
      {label && <span className="bld-slot-sub">{label}</span>}
      <textarea
        id={inputId}
        className="bld-input bld-slot-textarea"
        rows={slot.type === 'richtext' ? 3 : 2}
        value={typeof raw === 'string' ? raw : ''}
        onChange={(e) => onPatchData(uid, field, e.target.value)}
        spellCheck={false}
        aria-label={label ? `${field} ${label}` : field}
      />
    </label>
  );
}

// ── Contrôle JSON tolérant (slots array / object) lié à data[field] ───────────────────────────────
interface JsonFieldProps {
  uid: string;
  field: string;
  label: string;
  data: SectionInstance;
  onPatchData: (uid: string, field: string, value: unknown) => void;
}

function JsonField({ uid, field, label, data, onPatchData }: JsonFieldProps) {
  // Brouillon local : on n'écrase la valeur de la section QUE si le JSON est valide (parsing
  // tolérant). Tant qu'il est invalide, l'aperçu garde la dernière valeur correcte + message.
  const [draft, setDraft] = useState(() => stableJson(data[field]));
  const [error, setError] = useState<string | null>(null);
  // Re-synchronise le brouillon si la valeur change hors de ce champ (preset/scheme rejoués).
  const lastExternal = useRef(stableJson(data[field]));
  const external = stableJson(data[field]);
  if (external !== lastExternal.current) {
    lastExternal.current = external;
    if (!error) setDraft(external);
  }

  const inputId = `bld-j-${uid}-${field}`;
  return (
    <label className="bld-slot-control">
      {label && <span className="bld-slot-sub">{label}</span>}
      <textarea
        id={inputId}
        className="bld-input bld-slot-textarea bld-slot-json"
        rows={4}
        value={draft}
        spellCheck={false}
        aria-label={`${field} ${label} (JSON)`}
        onChange={(e) => {
          const next = e.target.value;
          setDraft(next);
          try {
            const parsed = next.trim() === '' ? undefined : JSON.parse(next);
            setError(null);
            onPatchData(uid, field, parsed);
          } catch {
            // JSON invalide : on n'écrase pas la valeur de la section, on signale juste.
            setError('JSON invalide (valeur non appliquée)');
          }
        }}
      />
      {error && <span className="bld-slot-err">{error}</span>}
    </label>
  );
}

/** Sérialise une valeur de slot pour l'éditeur JSON (stable, indenté). */
function stableJson(value: unknown): string {
  if (value === undefined) return '';
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return '';
  }
}
