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
import { DashboardScreen } from '@waimia/atelier-ui/screens/DashboardScreen.tsx';
import { SitemapScreen } from '@waimia/atelier-ui/screens/SitemapScreen.tsx';
import type { SitemapGroup, SitemapPage } from '@waimia/atelier-ui/screens/types.ts';
import { COLOR_SCHEMES } from '@waimia/ds-kernel/lib/section-colorschemes';
import type {
  BuilderCatalogueItem,
  BuilderColorScheme,
  BuilderMeta,
  BuilderPage,
  SectionInstance,
} from '@waimia/builder/types';
// Donnees app REELLES du site (source de verite unique, rule 59) : l'hote est le SEUL point cote
// app autorise a connaitre ces stores ; les ecrans (atelier-ui) restent purs (props-driven).
import { SITE_PAGES, SITE_GROUPS } from '../../lib/site-pages.generated';

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

/** Preset resolu passe a l'inspecteur (presets catalogue + variantes custom LIVE de la session). */
interface PresetOption {
  id: string;
  type: string;
  label: string;
  props: Record<string, unknown>;
}

export interface BuilderHostProps {
  items: BuilderCatalogueItem[];
  colorSchemes: BuilderColorScheme[];
  defaultMeta: BuilderMeta;
  collections: string[];
  pages?: BuilderPage[];
  renderPath: string;
}

/** Ecran actif de l'app builder (dashboard d'accueil -> sitemap -> editeur). */
type Screen = 'dashboard' | 'sitemap' | 'editor';

/** Contexte d'une page REELLE ouverte dans l'editeur (N4) : route + fichier + sections d'origine. */
interface RealPageContext {
  route: string;
  /** Chemin relatif SOUS src/content/ (ex. services/site-web-ia.json), pour PATCH /api/ds/instance. */
  file: string;
  /** Sections telles que lues sur disque : reference pour l'alignement d'index « Appliquer au site ». */
  sections: SectionInstance[];
}

/**
 * Derive le slug d'une page depuis sa collection + son chemin de contenu.
 * Ex. ('services', 'services/agents-ia.json') -> 'agents-ia' ;
 *     ('services', 'services/agents-ia/agent-support-client.json') -> 'agents-ia/agent-support-client'.
 */
function deriveSlug(collection: string, file: string): string {
  let s = file.replace(/\.json$/, '');
  const prefix = `${collection}/`;
  if (s.startsWith(prefix)) s = s.slice(prefix.length);
  return s;
}

/** Cles d'axes de presentation cherchees dans la demo d'un type pour alimenter les facettes du picker. */
const AXIS_KEYS = ['background', 'layout', 'columns', 'variant', 'density', 'proportion', 'contentAlign', 'align'];

// Axes de presentation surchargeables acceptes par POST /api/ds/custom-preset. MIROIR STRICT de
// `CUSTOM_PRESET_AXES` (src/integrations/ds-save-dev.mjs) : l'endpoint refuse (400) toute cle hors
// de cette liste, donc on ne projette QUE ces cles depuis les props de la section (jamais les slots
// de contenu). Source de verite = l'endpoint ; ce miroir doit rester aligne (1 seul point d'ecriture).
const CUSTOM_PRESET_AXES = new Set<string>([
  'background', 'layout', 'density', 'variant', 'rating', 'portrait_src', 'logo_src',
  'media_register', 'media_src', 'media_alt_fr', 'media_alt_en', 'illustration', 'media_side',
  'reveal_mode', 'swap_mode', 'speed', 'alternate_blocks', 'reversed', 'media_sticky', 'rounded',
  'contentAlign', 'actionsAlign', 'columns', 'colRatio', 'itemHeight', 'proportion', 'mediaSide',
  'direction', 'itemOrder', 'hover', 'cellAlignY', 'cellBg', 'justifyContent', 'colSpan',
  'features', 'placement',
]);

// Validation kebab-case LIVE du nouveau type (miroir de scaffold-section.mjs `isKebab` + de la garde
// KEBAB_RE de l'endpoint /api/ds/scaffold) : minuscules, chiffres, tirets simples, pas de tiret en tete/fin.
const KEBAB_RE = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;

/** Resultat du POST scaffold cote modale (contrat pur : succes -> liste de fichiers, echec -> message). */
type DuplicateResult = { ok: true; created: string[] } | { ok: false; error: string };

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

export default function BuilderHost({
  items,
  colorSchemes,
  defaultMeta,
  collections,
  pages,
  renderPath,
}: BuilderHostProps): React.ReactElement {
  // Blocs sauvegardes (source de verite = /api/ds/saved, DEV-ONLY). Rafraichis apres chaque save.
  const [savedList, setSavedList] = useState<SavedEntry[]>([]);
  // Contrat de slots complet par type : charge a la demande (chunk Vite), null tant que non arrive.
  const [slotsByType, setSlotsByType] = useState<SlotsByType | null>(null);

  // ── Routeur d'ecrans (dashboard -> sitemap -> editeur), navigation par etat React interne ───────
  const [screen, setScreen] = useState<Screen>('dashboard');
  // Page reelle ouverte dans l'editeur (null = brouillon vierge « Nouveau brouillon »).
  const [realPage, setRealPage] = useState<RealPageContext | null>(null);
  // Document initial charge dans l'editeur au montage (null = editeur vierge).
  const [initialDoc, setInitialDoc] = useState<{ meta: BuilderMeta; sections: SectionInstance[] } | null>(null);
  // Route en cours de chargement (desactive la carte) + erreur eventuelle affichee dans le sitemap.
  const [openingRoute, setOpeningRoute] = useState('');
  const [openError, setOpenError] = useState('');

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

  // Deep-link depuis le catalogue (fiche /library/[type]) : `?add=<type>[&preset=<id>]` saute le
  // dashboard et ouvre l'editeur avec CE bloc deja pose (preset applique si l'id existe dans les
  // presets curated du type). Reutilise le meme chemin que `openPage` (initialDoc + screen editor).
  // L'URL est nettoyee (replaceState) apres montage pour ne pas re-declencher au reload / partage.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const addType = params.get('add');
    if (!addType) return;
    // Nettoyage inconditionnel de l'URL (param consomme) : evite tout re-declenchement.
    window.history.replaceState({}, '', window.location.pathname);
    const item = items.find((it) => it.type === addType);
    if (!item) return;
    const presetId = params.get('preset');
    const preset = presetId ? item.presets.find((p) => p.id === presetId) : undefined;
    const instance: SectionInstance = preset
      ? ({ ...item.demo, ...preset.props, type: item.type } as SectionInstance)
      : ({ ...item.demo, type: item.type } as SectionInstance);
    setInitialDoc({ meta: defaultMeta, sections: [instance] });
    setRealPage(null);
    setScreen('editor');
    // items/defaultMeta sont des props stables (serialisees une fois par la page hote) : l'effet
    // se joue une seule fois au montage ; le nettoyage d'URL garantit l'idempotence.
  }, [items, defaultMeta]);

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

  // ── Compteurs REELS du projet (jamais hardcodes) pour le dashboard ─────────────────────────────
  const project = useMemo(
    () => ({
      name: 'Waimia',
      domain: 'waimia.com',
      pageCount: SITE_PAGES.length,
      groupCount: SITE_GROUPS.length,
      sectionTypeCount: items.length,
    }),
    [items.length],
  );

  // ── Navigation ────────────────────────────────────────────────────────────────────────────────
  const openDashboard = useCallback(() => setScreen('dashboard'), []);
  const openSitemap = useCallback(() => {
    setOpenError('');
    setScreen('sitemap');
  }, []);
  const startNewDraft = useCallback(() => {
    setRealPage(null);
    setInitialDoc(null);
    setScreen('editor');
  }, []);

  // N4 : ouvre une page REELLE editable -> fetch /api/ds/page (lecture seule) -> charge l'editeur.
  const openPage = useCallback(
    async (route: string) => {
      const page = SITE_PAGES.find((p) => p.route === route);
      if (!page || !page.editable || !page.file) return;
      setOpeningRoute(route);
      setOpenError('');
      try {
        const res = await fetch(`/api/ds/page?file=${encodeURIComponent(page.file)}`);
        const json = (await res.json().catch(() => null)) as
          | { ok?: boolean; sections?: SectionInstance[]; meta?: Record<string, unknown>; error?: string }
          | null;
        if (!res.ok || !json || !json.ok || !Array.isArray(json.sections)) {
          setOpenError((json && json.error) || `Echec du chargement (HTTP ${res.status}).`);
          return;
        }
        const meta: BuilderMeta = {
          collection: collections.includes(page.collection) ? page.collection : defaultMeta.collection,
          slug: deriveSlug(page.collection, page.file),
          lang: 'fr',
          title_fr: page.title,
          title_en: typeof json.meta?.title_en === 'string' ? (json.meta.title_en as string) : undefined,
        };
        setInitialDoc({ meta, sections: json.sections });
        setRealPage({ route: page.route, file: page.file, sections: json.sections });
        setScreen('editor');
      } catch {
        setOpenError('Endpoint indisponible (chargement dev uniquement).');
      } finally {
        setOpeningRoute('');
      }
    },
    [collections, defaultMeta.collection],
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOST_CSS }} data-wa-style="builder-host" />

      {screen === 'dashboard' && (
        <DashboardScreen project={project} onOpenProject={openSitemap} onNewDraft={startNewDraft} />
      )}

      {screen === 'sitemap' && (
        <SitemapScreen
          projectName={project.name}
          groups={SITE_GROUPS as SitemapGroup[]}
          pages={SITE_PAGES as SitemapPage[]}
          onBack={openDashboard}
          onOpenPage={openPage}
          openingRoute={openingRoute}
          error={openError}
        />
      )}

      {screen === 'editor' && (
        <>
          <div className="bldx-crumb">
            <button type="button" className="bldx-crumb__link" onClick={openDashboard}>
              <span aria-hidden="true">←</span> Projets
            </button>
            {realPage && (
              <button type="button" className="bldx-crumb__link" onClick={openSitemap}>
                <span aria-hidden="true">←</span> Sitemap
              </button>
            )}
            <span className="bldx-crumb__here">
              {realPage ? realPage.route : 'Nouveau brouillon'}
            </span>
          </div>
          <BuilderApp
            items={items}
            colorSchemes={colorSchemes}
            defaultMeta={defaultMeta}
            collections={collections}
            pages={pages}
            renderPath={renderPath}
            initialDoc={initialDoc ?? undefined}
            realPageRoute={realPage?.route}
            renderPicker={
              <Overlays
                types={pickerTypes}
                savedSections={savedSections}
                savedList={savedList}
                thumbSrcOf={thumbSrcOf}
                onSaved={refreshSaved}
              />
            }
            renderInspector={
              <InspectorSlot slotsByType={slotsByType} schemes={schemes} realPage={realPage} />
            }
          />
        </>
      )}
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
  const { add, addInstance, openAdd, closeAdd, addOpen, addAtIndex, saveTarget, closeSave, duplicateTypeTarget, closeDuplicateType } = useBuilder();

  // Fetch scaffold (keyword cote HOTE, jamais dans atelier-ui) : dryRun => liste des fichiers qui
  // SERAIENT crees ; reel => fichiers reellement crees. Contrat pur cote modale : (from, newType,
  // dryRun) -> Promise<{ok, created}|{ok:false, error}>.
  const runScaffold = useCallback(
    async (from: string, newType: string, dryRun: boolean): Promise<DuplicateResult> => {
      try {
        const res = await fetch('/api/ds/scaffold', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ keyword: 'WAIMIA-SAVE', type: newType, from, dryRun }),
        });
        const payload = (await res.json().catch(() => null)) as
          | { ok?: boolean; error?: string; created?: unknown }
          | null;
        if (res.ok && payload && payload.ok) {
          const created = Array.isArray(payload.created) ? payload.created.map((f) => String(f)) : [];
          return { ok: true, created };
        }
        return { ok: false, error: (payload && payload.error) || `Echec (HTTP ${res.status}).` };
      } catch {
        return { ok: false, error: 'Endpoint indisponible (scaffold dev uniquement).' };
      }
    },
    [],
  );

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

      {duplicateTypeTarget && (
        <DuplicateTypeModal
          from={duplicateTypeTarget.type}
          onDuplicateType={runScaffold}
          onClose={closeDuplicateType}
        />
      )}
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

// ── Modale « Dupliquer comme nouveau type » : from -> POST /api/ds/scaffold (dryRun puis reel) ─────
// Meme pattern que SaveVersionModal / SaveVariantModal (VariantTab) : nom kebab-case auto-suggere
// `<from>-v2`, modifiable, validation kebab LIVE. Un clic « Verifier » = POST dryRun (liste created[]
// AFFICHEE sans rien ecrire) ; « Creer » = POST reel (fichiers reellement crees). L'HOTE porte le
// fetch (keyword) via `onDuplicateType`, la modale reste PURE (0 keyword, 0 fetch). UI FR honnete :
// rappel « cree un nouveau type de section (fichiers reels + generateurs) » + note rechargement.
function DuplicateTypeModal(props: {
  from: string;
  onDuplicateType: (from: string, newType: string, dryRun: boolean) => Promise<DuplicateResult>;
  onClose: () => void;
}): React.ReactElement {
  const { from } = props;
  const [name, setName] = useState(`${from}-v2`);
  const [phase, setPhase] = useState<'idle' | 'checking' | 'checked' | 'creating' | 'created' | 'error'>('idle');
  const [created, setCreated] = useState<string[]>([]);
  const [error, setError] = useState('');

  const trimmed = name.trim();
  const kebabOk = KEBAB_RE.test(trimmed);
  const sameAsSource = trimmed === from;
  const nameValid = kebabOk && !sameAsSource;
  const busy = phase === 'checking' || phase === 'creating';

  // Editer le nom invalide la verification precedente (created[] du dryRun devient obsolete).
  const onNameChange = useCallback((value: string) => {
    setName(value);
    setPhase('idle');
    setCreated([]);
    setError('');
  }, []);

  const run = useCallback(
    (dryRun: boolean) => {
      if (!nameValid || busy) return;
      setPhase(dryRun ? 'checking' : 'creating');
      setError('');
      void props.onDuplicateType(from, trimmed, dryRun).then((r) => {
        if (r.ok) {
          setCreated(r.created);
          setPhase(dryRun ? 'checked' : 'created');
        } else {
          setError(r.error);
          setPhase('error');
        }
      });
    },
    [nameValid, busy, props, from, trimmed],
  );

  const done = phase === 'created';

  return (
    <div className="bldx-ov" role="dialog" aria-modal="true" aria-label="Dupliquer comme nouveau type">
      <button type="button" className="bldx-ov__backdrop" aria-label="Fermer" onClick={props.onClose} />
      <div className="bldx-ov__panel bldx-ov__panel--narrow" data-testid="dup-type-modal">
        <h2 className="bldx-save__title">Dupliquer « {from} » comme nouveau type</h2>
        <p className="bldx-dup__note">
          Crée un nouveau type de section dans le catalogue : fichiers réels (schéma, demo, meta,
          composant) et régénération des index. Ce n'est pas une simple copie de bloc.
        </p>

        {!done && (
          <>
            <label className="bldx-save__label">
              <span className="bld-field-label">Nom du nouveau type (kebab-case)</span>
              <input
                className="bld-input"
                value={name}
                autoFocus
                spellCheck={false}
                placeholder="ex. hero-split-v2"
                data-testid="dup-type-name"
                onChange={(e) => onNameChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && phase === 'checked') run(false);
                  else if (e.key === 'Enter') run(true);
                }}
              />
            </label>
            {trimmed.length > 0 && !kebabOk && (
              <p className="bldx-dup__invalid" data-testid="dup-type-invalid">
                Format invalide : minuscules, chiffres et tirets simples (ex. hero-split-v2).
              </p>
            )}
            {kebabOk && sameAsSource && (
              <p className="bldx-dup__invalid" data-testid="dup-type-invalid">
                Choisissez un nom différent du type source.
              </p>
            )}
          </>
        )}

        {phase === 'checked' && (
          <div className="bldx-dup__result" data-testid="dup-type-checked">
            <p className="bldx-dup__hint">
              {created.length} fichier(s) seraient créés (vérification, rien n'est écrit) :
            </p>
            <ul className="bldx-dup__files" data-testid="dup-type-files">
              {created.map((f) => (
                <li key={f} className="bldx-dup__file">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {done && (
          <div className="bldx-dup__result" data-testid="dup-type-created">
            <p className="bldx-dup__ok">Type « {trimmed} » créé. {created.length} fichier(s) :</p>
            <ul className="bldx-dup__files" data-testid="dup-type-files">
              {created.map((f) => (
                <li key={f} className="bldx-dup__file">
                  {f}
                </li>
              ))}
            </ul>
            <p className="bldx-dup__hint">
              Le nouveau type sera disponible dans le catalogue après rechargement (HMR / redémarrage
              du serveur dev).
            </p>
          </div>
        )}

        {phase === 'error' && <p className="bldx-save__err" data-testid="dup-type-error">{error}</p>}

        <div className="bldx-save__actions">
          <button type="button" className="bld-btn" onClick={props.onClose}>
            {done ? 'Fermer' : 'Annuler'}
          </button>
          {!done && (
            <>
              <button
                type="button"
                className="bld-btn"
                onClick={() => run(true)}
                disabled={!nameValid || busy}
                data-testid="dup-type-check"
              >
                {phase === 'checking' ? 'Vérification…' : 'Vérifier'}
              </button>
              <button
                type="button"
                className="bld-btn bld-btn--primary bldx-dup__create"
                onClick={() => run(false)}
                disabled={!nameValid || busy}
                data-testid="dup-type-create"
              >
                {phase === 'creating' ? 'Création…' : 'Créer'}
              </button>
            </>
          )}
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
  realPage: RealPageContext | null;
}): React.ReactElement {
  const { sections, selectedUid, itemByType, patchSection } = useBuilder();
  const [presetByUid, setPresetByUid] = useState<Record<string, string>>({});
  // Variantes CUSTOM enregistrees pendant la session (LIVE) : merge par type dans la liste des
  // variantes tant que le serveur dev n'a pas redemarre (la liste complete buildee les integrera
  // au prochain restart, cf note de la modale). Cle = type de section, valeur = presets ajoutes.
  const [extraPresets, setExtraPresets] = useState<Record<string, PresetOption[]>>({});

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
  const presets: PresetOption[] = [
    ...(item?.presets ?? []).map((p) => ({ id: p.id, type, label: p.label, props: p.props })),
    ...(extraPresets[type] ?? []),
  ];

  // Projette les AXES DE PRESENTATION courants (jamais les slots de contenu) : cles limitees au
  // miroir de l'allowlist de l'endpoint. L'hote fait le POST + integre la variante en LIVE.
  const saveVariant = async (args: { id: string; label: string }): Promise<{ ok: boolean; error?: string }> => {
    const axisProps: Record<string, unknown> = {};
    for (const key of Object.keys(selected.data)) {
      if (CUSTOM_PRESET_AXES.has(key)) axisProps[key] = (selected.data as Record<string, unknown>)[key];
    }
    try {
      const res = await fetch('/api/ds/custom-preset', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ keyword: 'WAIMIA-SAVE', id: args.id, type, label_fr: args.label, props: axisProps }),
      });
      const payload = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; errors?: string[] }
        | null;
      if (res.ok && payload && payload.ok) {
        setExtraPresets((m) => {
          const list = m[type] ?? [];
          if (list.some((p) => p.id === args.id)) return m;
          return { ...m, [type]: [...list, { id: args.id, type, label: args.label, props: axisProps }] };
        });
        return { ok: true };
      }
      const detail = Array.isArray(payload?.errors) ? payload!.errors!.join(' · ') : payload?.error;
      return { ok: false, error: detail || `Echec (HTTP ${res.status}).` };
    } catch {
      return { ok: false, error: 'Endpoint indisponible (enregistrement dev uniquement).' };
    }
  };

  return (
    <>
      <InspectorPanel
        typeId={type}
        props={selected.data as Record<string, unknown>}
        slots={slots}
        presentationAxes={presentationAxes}
        presets={presets}
        schemes={props.schemes}
        onChange={(patch) => patchSection(index, patch)}
        onPickPreset={(id) => {
          const preset = presets.find((x) => x.id === id);
          if (!preset) return;
          patchSection(index, preset.props as Record<string, unknown>);
          setPresetByUid((m) => ({ ...m, [selected.uid]: id }));
        }}
        selectedPresetId={presetByUid[selected.uid]}
        onSaveVariant={saveVariant}
      />
      {props.realPage && (
        <ApplyToSite realPage={props.realPage} index={index} data={selected.data} />
      )}
    </>
  );
}

// ── « Appliquer au site » : PATCH /api/ds/instance de la section EDITEE vers la page reelle (N4) ──
// Portee VERROUILLEE v1 : on ne patche QUE les props d'une section a un index qui correspond encore
// a la position reelle dans le fichier. Si le doc a ete reordonne/insere/supprime, l'index de
// l'editeur ne correspond plus a l'index disque : le bouton est desactive (tooltip explicatif).
// Detection d'alignement : la section a l'index i doit exister dans le fichier d'origine ET avoir le
// meme `type` (identite de position robuste aux swaps de types differents).
function ApplyToSite(props: {
  realPage: RealPageContext;
  index: number;
  data: SectionInstance;
}): React.ReactElement {
  const [phase, setPhase] = useState<'idle' | 'saving' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const { realPage, index, data } = props;
  const original = realPage.sections[index];
  const aligned = !!original && original.type === data.type;

  const apply = useCallback(() => {
    if (!aligned) return;
    setPhase('saving');
    setMessage('');
    fetch('/api/ds/instance', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ keyword: 'WAIMIA-SAVE', file: realPage.file, index, props: data }),
    })
      .then(async (res) => {
        const payload = (await res.json().catch(() => null)) as
          | { ok?: boolean; error?: string; errors?: string[] }
          | null;
        if (res.ok && payload && payload.ok) {
          setPhase('ok');
          setMessage(`Section #${index} appliquee a ${realPage.file}.`);
          return;
        }
        setPhase('error');
        const errs = Array.isArray(payload?.errors) ? ` : ${payload!.errors!.join(' · ')}` : '';
        setMessage(((payload && payload.error) || `Echec (HTTP ${res.status})`) + errs);
      })
      .catch(() => {
        setPhase('error');
        setMessage('Endpoint indisponible (application dev uniquement).');
      });
  }, [aligned, realPage.file, index, data]);

  return (
    <div className="bldx-apply">
      <button
        type="button"
        className="bld-btn bld-btn--primary bldx-apply__btn"
        onClick={apply}
        disabled={!aligned || phase === 'saving'}
        title={
          aligned
            ? 'Ecrit les props de cette section dans le fichier de contenu reel (dev, sans commit).'
            : 'Index desynchronise (section reordonnee, ajoutee ou supprimee) : rechargez la page pour reappliquer.'
        }
      >
        {phase === 'saving' ? 'Application…' : 'Appliquer au site'}
      </button>
      {!aligned && (
        <p className="bldx-apply__hint">
          Index desynchronise avec le fichier reel (reorder/ajout/suppression). Seule l'edition de
          contenu d'une section a sa position d'origine s'applique au site dans cette version.
        </p>
      )}
      {phase === 'ok' && <p className="bldx-apply__ok">{message}</p>}
      {phase === 'error' && <p className="bldx-apply__err">{message}</p>}
    </div>
  );
}

const HOST_CSS = `
.bldx-crumb{display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap;
  padding:var(--space-3) 0 var(--space-4);}
.bldx-crumb__link{display:inline-flex;align-items:center;gap:var(--space-2);
  padding:var(--space-2) var(--space-3);border:1px solid var(--hairline-strong);
  border-radius:var(--radius-sm);background:var(--paper);color:var(--ink-2);
  font-family:var(--font-mono);font-size:var(--text-small);cursor:pointer;
  transition:border-color var(--dur-fast) var(--ease),color var(--dur-fast) var(--ease);}
.bldx-crumb__link:hover{border-color:var(--accent-text);color:var(--accent-text);}
.bldx-crumb__link:focus-visible{outline:2px solid var(--accent);outline-offset:1px;}
.bldx-crumb__here{font-family:var(--font-mono);font-size:var(--text-small);color:var(--muted);}
.bldx-apply{display:flex;flex-direction:column;gap:var(--space-2);
  padding:var(--space-4);border-top:1px solid var(--hairline);background:var(--paper-2);}
.bldx-apply__btn{width:100%;justify-content:center;}
.bldx-apply__hint{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);
  line-height:1.5;color:var(--muted);}
.bldx-apply__ok{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);color:var(--complementary);}
.bldx-apply__err{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);color:var(--accent-text);}
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
.bldx-save__actions{display:flex;justify-content:flex-end;gap:var(--space-3);flex-wrap:wrap;}
.bldx-save__err{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);color:var(--accent-text);}
.bldx-dup__note{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);
  line-height:1.5;color:var(--muted);}
.bldx-dup__invalid{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);color:var(--accent-text);}
.bldx-dup__result{display:flex;flex-direction:column;gap:var(--space-2);
  padding:var(--space-3);border:1px solid var(--hairline);border-radius:var(--radius-sm);
  background:var(--paper-2);}
.bldx-dup__hint{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);
  line-height:1.5;color:var(--muted);}
.bldx-dup__ok{margin:0;font-family:var(--font-mono);font-size:var(--text-micro);color:var(--complementary);}
.bldx-dup__files{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:var(--space-1);
  max-height:200px;overflow-y:auto;}
.bldx-dup__file{font-family:var(--font-mono);font-size:var(--text-micro);color:var(--ink-2);
  word-break:break-all;}
`;
