// Waimia · Library · explorateur de catalogue filtrable (Track C, taxonomie docs/45 §9.6 ;
// facettes IA-opérables Vague C / P2).
//
// Island React client:load qui transforme la landing /library en VRAI catalogue rangé,
// SANS saturer le navigateur :
//   - on affiche des CARTES-GROUPES (1 par famille OU par catégorie), pas 199 cartes-type ;
//   - chaque carte-groupe porte UNE vignette d'aperçu représentative (iframe /preview/<type>)
//     montée À LA DEMANDE via IntersectionObserver (l'iframe n'entre dans le DOM qu'à l'approche
//     du viewport) → la landing ne charge jamais 199 documents preview en parallèle
//     (fini ERR_INSUFFICIENT_RESOURCES). Le détail par type vit sur /library/[category]
//     et /library/family/[family] (peu d'iframes par page).
//   - FILTRES opèrent sur les TYPES ; un groupe s'affiche s'il contient au moins un type retenu,
//     avec son compteur filtré.
//
// FILTRES (Vague C / P2) :
//   - existants : recherche texte, Famille (select), Catégorie (select), Statut (select), Tri,
//     Regrouper par Famille|Catégorie ;
//   - facettes orthogonales multi-select (chips) : Effets, Interactions, Éléments, Layout.
//     Chaque chip porte son effectif (count) ; les tags à 0 sont déjà absents (listFacetCounts) ;
//   - raccourcis : « Animées » (effects != ['static']) et « Avec déclinaisons » (presetCount > 0).
//
// LOGIQUE DE FILTRAGE (documentée, choix retenu) :
//   - INTER-GROUPES = AND : un type doit satisfaire CHAQUE groupe de facettes où au moins un tag
//     est sélectionné (ex. un effet ET un élément cochés → il faut les deux genres).
//   - INTRA-GROUPE = OR : dans un même genre, le type matche s'il porte AU MOINS UN des tags
//     cochés (ex. 'crossfade' OU 'marquee' → l'un suffit).
//   Les filtres select (famille/catégorie/statut) et la recherche restent en AND avec le reste.
//
// 0 nouvelle dépendance. 0 nouveau token DS (rule 60) : variables canoniques uniquement.

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';

export interface CatalogueItem {
  type: string;
  family: string;
  categorySlug: string;
  categoryLabel: string;
  status: 'stable' | 'wip' | 'deprecated';
  tags: string[];
  description_fr: string;
  presetCount: number;
  // Facettes orthogonales (cf section-facets.ts).
  effects: string[];
  interactions: string[];
  elements: string[];
  layoutFacets: string[];
  // Facettes sémantiques IA (Vague C2-A) : job de communication + place de page.
  intent: string[];
  pageRole: string[];
  // Modèle de contenu (instance inline / global-ref source partagée / hybrid).
  contentMode: string;
  // Usage live : true si la section est en prod sur waimia (>= 1 consommateur live).
  onSite: boolean;
}

interface FacetOption {
  value: string;
  label: string;
  count: number;
}

/** Un genre de facette (orthogonales + sémantiques C2-A) + ses options comptées. */
interface FacetGroup {
  kind: 'effects' | 'interactions' | 'elements' | 'layoutFacets' | 'intent' | 'pageRole' | 'contentMode';
  label: string;
  options: FacetOption[];
}

/** Représentant (type) d'un groupe → vignette d'aperçu de la card-groupe. */
interface RepEntry {
  value: string;
  type: string;
}

interface Props {
  items: CatalogueItem[];
  families: FacetOption[];
  categories: FacetOption[];
  familyReps: RepEntry[];
  categoryReps: RepEntry[];
  facetGroups: FacetGroup[];
}

type GroupBy = 'family' | 'category';
type SortBy = 'alpha' | 'count' | 'status';
type ViewMode = 'groups' | 'types';
type FacetKind = FacetGroup['kind'];

const STATUS_LABELS_FR: Record<CatalogueItem['status'], string> = {
  stable: 'Stable',
  wip: 'WIP',
  deprecated: 'Déprécié',
};

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous statuts' },
  { value: 'stable', label: 'Stable' },
  { value: 'wip', label: 'WIP' },
  { value: 'deprecated', label: 'Déprécié' },
];

const FACET_KINDS: FacetKind[] = [
  'effects',
  'interactions',
  'elements',
  'layoutFacets',
  'intent',
  'pageRole',
  'contentMode',
];

// File de concurrence globale (partagée par toutes les vignettes de l'island) : au plus
// MAX_CONCURRENT iframes se chargent simultanément. Chaque preview tire ~des dizaines de
// requêtes (doc + bundle) ; sans plafond, 20+ iframes ouvrent une rafale de connexions qui
// sature le navigateur (ERR_INSUFFICIENT_RESOURCES). On sérialise par vagues : une iframe
// libère son slot quand elle a fini de charger (event load).
const MAX_CONCURRENT = 3;
let inFlight = 0;
const waiters: Array<() => void> = [];
function acquireSlot(): Promise<void> {
  if (inFlight < MAX_CONCURRENT) {
    inFlight++;
    return Promise.resolve();
  }
  return new Promise((resolve) => waiters.push(resolve));
}
function releaseSlot(): void {
  const next = waiters.shift();
  if (next) next();
  else inFlight = Math.max(0, inFlight - 1);
}

/** Vignette d'aperçu montée à la demande : l'iframe n'entre dans le DOM qu'une fois la carte
 *  proche du viewport (IntersectionObserver) ET qu'un slot de la file de concurrence est libre. */
function LazyPreview({ type, label }: { type: string; label: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [near, setNear] = useState(false); // proche du viewport
  const [show, setShow] = useState(false); // slot acquis -> iframe montée
  const loadedRef = useRef(false);

  // 1. Détecte l'approche du viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  // 2. Une fois proche, attend un slot libre avant de monter l'iframe.
  useEffect(() => {
    if (!near || show) return;
    let cancelled = false;
    acquireSlot().then(() => {
      if (cancelled) {
        releaseSlot();
        return;
      }
      setShow(true);
    });
    return () => {
      cancelled = true;
    };
  }, [near, show]);

  // 3. À chaque montage, re-câble le scaling preview-frame.ts.
  useEffect(() => {
    if (!show) return;
    const id = window.setTimeout(() => document.dispatchEvent(new Event('astro:page-load')), 0);
    return () => window.clearTimeout(id);
  }, [show]);

  // Libère le slot quand l'iframe a fini de charger (laisse la vague suivante démarrer).
  const handleLoad = () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    releaseSlot();
  };

  return (
    <span ref={ref} className="cx-card-preview" data-preview-frame data-max-height="240" aria-hidden="true">
      {show && (
        <iframe
          className="cx-card-frame"
          src={`/preview/${type}`}
          title={label}
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
          onLoad={handleLoad}
        />
      )}
    </span>
  );
}

// ── Palette de recherche full-text (⌘K / Ctrl+K) ───────────────────────────
// Overlay role=dialog + listbox plein-texte sur TOUS les types (type + label/family +
// description + tags + facettes). 0 fetch : opère sur la liste d'items déjà reçue en props.
// Navigation clavier (flèches / Entrée / Échap), Entrée -> /library/<type>. Échap ferme et
// restaure le focus sur l'élément qui a ouvert la palette. reduced-motion respecté (styles
// inline -> pas d'animation déclenchée ; on évite tout keyframe). 0 nouvelle classe globale :
// apparence portée par tokens DS inline (var(--token)), idiome identique au comparateur (#65).
const PALETTE_MAX_RESULTS = 40;

interface PaletteResult {
  type: string;
  label: string;
  family: string;
  hay: string;
}

function CommandPalette({
  results,
  onClose,
  reducedMotion,
}: {
  results: PaletteResult[];
  onClose: () => void;
  reducedMotion: boolean;
}) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Focus le champ à l'ouverture (pattern command palette).
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const matches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return results.slice(0, PALETTE_MAX_RESULTS);
    // Tous les mots de la requête doivent matcher (AND), recherche sous-chaîne.
    const words = needle.split(/\s+/).filter(Boolean);
    return results
      .filter((r) => words.every((w) => r.hay.includes(w)))
      .slice(0, PALETTE_MAX_RESULTS);
  }, [q, results]);

  // Borne l'index actif quand la liste filtrée change.
  useEffect(() => {
    setActive((i) => (matches.length === 0 ? 0 : Math.min(i, matches.length - 1)));
  }, [matches.length]);

  // Garde l'option active visible (scroll into view).
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (type: string) => {
    window.location.href = `/library/${type}`;
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (matches.length === 0 ? 0 : (i + 1) % matches.length));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (matches.length === 0 ? 0 : (i - 1 + matches.length) % matches.length));
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      setActive(Math.max(0, matches.length - 1));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const hit = matches[active];
      if (hit) go(hit.type);
    }
  };

  const listboxId = 'cx-palette-listbox';

  return (
    <div
      role="presentation"
      onMouseDown={(e) => {
        // Clic sur le voile (hors panneau) ferme.
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 'var(--space-8) var(--space-4)',
        background: 'color-mix(in srgb, var(--ink) 40%, transparent)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recherche dans le catalogue"
        onKeyDown={onKeyDown}
        style={{
          width: '100%',
          maxWidth: '40rem',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'min(70vh, 36rem)',
          border: '1px solid var(--hairline-strong)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--paper)',
          boxShadow: '0 24px 60px -20px color-mix(in srgb, var(--ink) 45%, transparent)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-3) var(--space-4)',
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          <span
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-small)',
              color: 'var(--muted)',
            }}
          >
            /
          </span>
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un type, une intention, un tag…"
            aria-label="Rechercher dans le catalogue"
            aria-controls={listboxId}
            aria-expanded={true}
            aria-activedescendant={matches[active] ? `cx-palette-opt-${active}` : undefined}
            role="combobox"
            autoComplete="off"
            spellCheck={false}
            style={{
              flex: 1,
              minWidth: 0,
              border: 0,
              background: 'transparent',
              color: 'var(--ink)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-body)',
              outline: 'none',
            }}
          />
          <kbd
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              letterSpacing: 'var(--tracking-mono)',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              border: '1px solid var(--hairline-strong)',
              borderRadius: 'var(--radius-sm)',
              padding: '0 var(--space-2)',
            }}
          >
            Échap
          </kbd>
        </div>

        {matches.length === 0 ? (
          <p
            style={{
              margin: 0,
              padding: 'var(--space-6)',
              textAlign: 'center',
              color: 'var(--muted)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-small)',
            }}
          >
            Aucun type ne correspond.
          </p>
        ) : (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label="Résultats"
            style={{ margin: 0, padding: 'var(--space-2)', listStyle: 'none', overflowY: 'auto' }}
          >
            {matches.map((r, i) => {
              const isActive = i === active;
              return (
                <li key={r.type} role="presentation">
                  <a
                    id={`cx-palette-opt-${i}`}
                    data-idx={i}
                    role="option"
                    aria-selected={isActive}
                    href={`/library/${r.type}`}
                    onMouseMove={() => setActive(i)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(r.type);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3) var(--space-3)',
                      borderRadius: 'var(--radius-sm)',
                      textDecoration: 'none',
                      background: isActive ? 'var(--ink)' : 'transparent',
                      transition: reducedMotion
                        ? 'none'
                        : 'background var(--dur-fast) var(--ease)',
                    }}
                  >
                    <code
                      style={{
                        flex: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-small)',
                        fontWeight: 'var(--fw-semibold)',
                        color: isActive ? 'var(--paper)' : 'var(--ink)',
                      }}
                    >
                      {r.type}
                    </code>
                    <span
                      style={{
                        flex: 1,
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-small)',
                        color: isActive
                          ? 'color-mix(in srgb, var(--paper) 80%, var(--ink))'
                          : 'var(--ink-2)',
                      }}
                    >
                      {r.label}
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        flex: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-micro)',
                        letterSpacing: 'var(--tracking-mono)',
                        textTransform: 'uppercase',
                        color: isActive
                          ? 'color-mix(in srgb, var(--paper) 65%, var(--ink))'
                          : 'var(--muted)',
                      }}
                    >
                      {r.family}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Quick-look au survol (popover) ─────────────────────────────────────────
// Sur survol prolongé d'une carte (>= QUICKLOOK_DELAY), un popover affiche un aperçu rapide :
// mini-iframe /preview/<type> LAZY (1 seule à la fois, via la même file de concurrence que
// LazyPreview : cap dur, l'iframe est détruite à la fermeture du popover -> pas d'accumulation),
// + label + thèse + facettes clés + un lien « Ouvrir la fiche ». Choix iframe : on réutilise le
// rendu réel de la section (vérité catalogue) ; si la frame n'a pas chargé, le bloc texte riche
// reste affiché en dessous, donc l'info utile est toujours présente (dégradation gracieuse).
// Positionné en fixed au point d'ancrage de la carte (pas de portail : reste dans l'island).
const QUICKLOOK_DELAY = 400; // ms : survol prolongé avant ouverture (anti-flicker au balayage)

interface QuickLookData {
  type: string;
  label: string;
  thesis: string;
  facets: string[];
  rect: { top: number; left: number; width: number; height: number };
}

function QuickLook({
  data,
  onClose,
  onKeep,
  reducedMotion,
}: {
  data: QuickLookData;
  onClose: () => void;
  onKeep: () => void;
  reducedMotion: boolean;
}) {
  const [showFrame, setShowFrame] = useState(false);
  const releasedRef = useRef(false);
  const loadedRef = useRef(false);

  // Acquiert un slot de la file de concurrence partagée avant de monter l'iframe.
  useEffect(() => {
    let cancelled = false;
    acquireSlot().then(() => {
      if (cancelled) {
        releaseSlot();
        releasedRef.current = true;
        return;
      }
      setShowFrame(true);
    });
    return () => {
      cancelled = true;
      // Libère le slot au démontage si l'iframe n'a jamais signalé `load`
      // (sinon le slot resterait pris -> on viderait la file de concurrence).
      if (!loadedRef.current && !releasedRef.current) {
        releaseSlot();
        releasedRef.current = true;
      }
    };
  }, []);

  // Re-câble le scaling preview-frame.ts une fois l'iframe montée.
  useEffect(() => {
    if (!showFrame) return;
    const id = window.setTimeout(
      () => document.dispatchEvent(new Event('astro:page-load')),
      0,
    );
    return () => window.clearTimeout(id);
  }, [showFrame]);

  const handleLoad = () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    if (!releasedRef.current) {
      releaseSlot();
      releasedRef.current = true;
    }
  };

  // Place le popover sous l'ancre, recadré dans le viewport (largeur fixe en rem).
  const PANEL_W = 320; // px ; borne d'estimation pour le recadrage horizontal
  const margin = 12;
  const rawLeft = data.rect.left;
  const left = Math.max(
    margin,
    Math.min(rawLeft, window.innerWidth - PANEL_W - margin),
  );
  const below = data.rect.top + data.rect.height + 8;
  const placeBelow = below + 260 < window.innerHeight;
  const top = placeBelow ? below : Math.max(margin, data.rect.top - 268);

  return (
    <div
      role="dialog"
      aria-label={`Aperçu ${data.type}`}
      onMouseEnter={onKeep}
      onMouseLeave={onClose}
      style={{
        position: 'fixed',
        top,
        left,
        width: `${PANEL_W}px`,
        maxWidth: 'calc(100vw - 24px)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--hairline-strong)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--paper)',
        boxShadow: '0 18px 48px -18px color-mix(in srgb, var(--ink) 45%, transparent)',
        overflow: 'hidden',
        transition: reducedMotion ? 'none' : 'opacity var(--dur-fast) var(--ease)',
      }}
    >
      {/* Vignette de rendu réel (mini-iframe lazy, 1 à la fois). */}
      <span
        data-preview-frame
        data-max-height="150"
        aria-hidden="true"
        style={{
          display: 'block',
          position: 'relative',
          minHeight: '120px',
          height: '150px',
          overflow: 'hidden',
          borderBottom: '1px solid var(--hairline)',
          background: 'var(--paper-2)',
        }}
      >
        {showFrame && (
          <iframe
            src={`/preview/${data.type}`}
            title={`Aperçu ${data.type}`}
            loading="lazy"
            tabIndex={-1}
            scrolling="no"
            onLoad={handleLoad}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1280px',
              border: 0,
              transformOrigin: 'top left',
              pointerEvents: 'none',
            }}
          />
        )}
      </span>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          padding: 'var(--space-4)',
        }}
      >
        <code
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-small)',
            fontWeight: 'var(--fw-semibold)',
            color: 'var(--ink)',
          }}
        >
          {data.type}
        </code>
        <strong
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-body)',
            fontWeight: 'var(--fw-semibold)',
            color: 'var(--ink)',
            lineHeight: 1.25,
          }}
        >
          {data.label}
        </strong>
        {data.thesis && (
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-small)',
              lineHeight: 1.5,
              color: 'var(--ink-2)',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {data.thesis}
          </p>
        )}
        {data.facets.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {data.facets.map((f) => (
              <span
                key={f}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  letterSpacing: 'var(--tracking-mono)',
                  color: 'var(--muted)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1px var(--space-2)',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        )}
        <a
          href={`/library/${data.type}`}
          style={{
            marginTop: 'var(--space-1)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-small)',
            color: 'var(--accent-text)',
            textDecoration: 'none',
          }}
        >
          Ouvrir la fiche →
        </a>
      </div>
    </div>
  );
}

export default function CatalogueExplorer({
  items,
  families,
  categories,
  familyReps,
  categoryReps,
  facetGroups,
}: Props) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [groupBy, setGroupBy] = useState<GroupBy>('family');
  const [sortBy, setSortBy] = useState<SortBy>('alpha');
  // Vue : 'groups' = cartes-groupes (défaut), 'types' = une carte par type filtré (vue à plat).
  // La vue ne change QUE le rendu, jamais le filtrage (filtres communs aux 2 vues).
  const [view, setView] = useState<ViewMode>('groups');
  // Facettes multi-select : un Set de tags cochés par genre.
  const [facetSel, setFacetSel] = useState<Record<FacetKind, Set<string>>>(() => ({
    effects: new Set(),
    interactions: new Set(),
    elements: new Set(),
    layoutFacets: new Set(),
    intent: new Set(),
    pageRole: new Set(),
    contentMode: new Set(),
  }));
  const [animatedOnly, setAnimatedOnly] = useState(false);
  const [withPresetsOnly, setWithPresetsOnly] = useState(false);
  // Raccourci « En prod sur waimia » : ne montre que les sections live (onSite).
  const [onSiteOnly, setOnSiteOnly] = useState(false);
  // Section des chips de facettes : repliable, fermée par défaut. Sans ça, ~75 chips dans le
  // panneau sticky le font occuper presque tout le viewport et masquent les résultats.
  // Ouverte au montage uniquement si des facettes sont déjà sélectionnées (sinon on cacherait
  // des filtres actifs). facetSelCount initial = 0 ici (Sets vides), mais on garde la logique
  // robuste si l'état initial évoluait.
  const [facetsOpen, setFacetsOpen] = useState(
    () => FACET_KINDS.reduce((acc, k) => acc + facetSel[k].size, 0) > 0,
  );

  const toggleFacet = (kind: FacetKind, value: string) => {
    setFacetSel((prev) => {
      const nextSet = new Set(prev[kind]);
      if (nextSet.has(value)) nextSet.delete(value);
      else nextSet.add(value);
      return { ...prev, [kind]: nextSet };
    });
  };

  // ── Mode « sélection pour comparer » (#65) ───────────────────────────────
  // Accumule jusqu'à MAX_COMPARE types ; la barre d'action navigue vers
  // /library/compare?types=... (le comparateur lit ?types côté client, SSG).
  const MAX_COMPARE = 4;
  const [compareSel, setCompareSel] = useState<string[]>([]);
  const compareSet = useMemo(() => new Set(compareSel), [compareSel]);
  const compareFull = compareSel.length >= MAX_COMPARE;

  const toggleCompare = (type: string) => {
    setCompareSel((prev) => {
      if (prev.includes(type)) return prev.filter((t) => t !== type);
      if (prev.length >= MAX_COMPARE) return prev; // cap dur
      return [...prev, type];
    });
  };

  const goCompare = () => {
    if (compareSel.length < 2) return;
    window.location.href = `/library/compare?types=${compareSel.join(',')}`;
  };

  // ── Palette de recherche ⌘K (#65 / T6) ────────────────────────────────────
  // Cmd/Ctrl+K (ou « / » hors champ de saisie) ouvre la palette plein-texte. La palette
  // est globale (overlay) et N'INTERFÈRE PAS avec les filtres/toggles : elle navigue
  // directement vers /library/<type>, elle ne touche pas à `query`/`facetSel`/`view`.
  const [paletteOpen, setPaletteOpen] = useState(false);
  // Élément à re-focuser à la fermeture (restauration du focus, a11y).
  const paletteOpenerRef = useRef<HTMLElement | null>(null);

  // reduced-motion : on neutralise les transitions des overlays si l'OS le demande.
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const openPalette = useCallback(() => {
    paletteOpenerRef.current = (document.activeElement as HTMLElement) ?? null;
    setPaletteOpen(true);
  }, []);
  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    // Restaure le focus sur l'élément d'origine (ou le body) après la fermeture.
    const opener = paletteOpenerRef.current;
    window.setTimeout(() => opener?.focus?.(), 0);
  }, []);

  // Raccourci clavier global : Cmd/Ctrl+K ouvre ; « / » ouvre si on n'est pas en train
  // de taper dans un champ (input/textarea/select/contenteditable).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cmdK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
      if (cmdK) {
        e.preventDefault();
        setPaletteOpen((open) => {
          if (!open) paletteOpenerRef.current = (document.activeElement as HTMLElement) ?? null;
          return !open;
        });
        return;
      }
      if (e.key === '/' && !paletteOpen) {
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName;
        const typing =
          tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t?.isContentEditable;
        if (!typing) {
          e.preventDefault();
          openPalette();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paletteOpen, openPalette]);

  // Données plein-texte de la palette : 1 entrée par type, haystack pré-calculé
  // (type + description + tags + famille + catégorie + intentions/rôles) -> filtrage rapide.
  const paletteResults = useMemo<PaletteResult[]>(
    () =>
      items
        .map((it) => ({
          type: it.type,
          label: it.description_fr || it.type,
          family: it.family,
          hay: `${it.type} ${it.description_fr} ${it.tags.join(' ')} ${it.family} ${it.categoryLabel} ${it.intent.join(' ')} ${it.pageRole.join(' ')}`.toLowerCase(),
        }))
        .sort((a, b) => a.type.localeCompare(b.type)),
    [items],
  );

  // ── Quick-look au survol (#65 / T6) ───────────────────────────────────────
  // Survol prolongé (QUICKLOOK_DELAY) d'une carte -> popover d'aperçu. 1 seul à la fois.
  const [quickLook, setQuickLook] = useState<QuickLookData | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  // Fermeture DIFFÉRÉE : quitter la carte programme une fermeture courte, annulée si l'on
  // entre dans le popover (sinon le gap carte<->popover fermerait avant qu'on l'atteigne).
  const closeTimerRef = useRef<number | null>(null);

  const cancelHoverTimer = () => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };
  const cancelCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleQuickLook = useCallback(
    (it: CatalogueItem, anchor: HTMLElement) => {
      cancelHoverTimer();
      cancelCloseTimer();
      const rect = anchor.getBoundingClientRect();
      const facets = [...it.intent, ...it.pageRole].slice(0, 4);
      hoverTimerRef.current = window.setTimeout(() => {
        setQuickLook({
          type: it.type,
          label: it.description_fr || it.type,
          thesis: it.description_fr,
          facets,
          rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        });
      }, QUICKLOOK_DELAY);
    },
    [cancelCloseTimer],
  );

  // Fermeture immédiate (scroll/resize/Échap implicite via démontage).
  const closeQuickLookNow = useCallback(() => {
    cancelHoverTimer();
    cancelCloseTimer();
    setQuickLook(null);
  }, [cancelCloseTimer]);

  // Fermeture différée (sortie de carte) : laisse le temps d'entrer dans le popover.
  const clearQuickLook = useCallback(() => {
    cancelHoverTimer();
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setQuickLook(null), 120);
  }, [cancelCloseTimer]);

  // Maintient le popover ouvert quand le pointeur y entre.
  const keepQuickLook = useCallback(() => cancelCloseTimer(), [cancelCloseTimer]);

  // Ferme le popover si on scrolle (sa position fixed deviendrait fausse) ou si la fenêtre
  // change de taille. Nettoie aussi le timer en attente au démontage.
  useEffect(() => {
    if (!quickLook) return;
    const onScrollOrResize = () => closeQuickLookNow();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [quickLook, closeQuickLookNow]);

  useEffect(
    () => () => {
      cancelHoverTimer();
      cancelCloseTimer();
    },
    [cancelCloseTimer],
  );

  // Garde-fou de séquencement : la sync URL (replaceState) ne doit pas s'exécuter
  // AVANT que l'init au montage ait lu la querystring, sinon le premier render
  // (état par défaut) écraserait les params entrants avant qu'on les lise.
  const hydratedRef = useRef(false);

  // ── Pré-filtrage depuis la querystring (T3) ──────────────────────────────
  // Au montage client, on lit window.location.search pour que les chips des fiches
  // détail (/library?intent=…, ?pageRole=…, ?{facetKind}=…, ?family=…, ?category=…,
  // ?status=…, ?tag=…) ouvrent l'explorer déjà filtré. On ne garde que les valeurs
  // réellement présentes dans les options (anti-bruit / anti-état invalide).
  // Effet à montage unique (premier render client) : ne pas lutter contre les
  // actions utilisateur ni contre la sync URL (replaceState) faite ensuite.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length === 0) {
      hydratedRef.current = true;
      return;
    }

    // Ensembles de valeurs valides par genre de facette (depuis facetGroups).
    const validByKind = new Map<FacetKind, Set<string>>(
      facetGroups.map((g) => [g.kind, new Set(g.options.map((o) => o.value))]),
    );

    let didFilterFacets = false;
    const nextFacetSel: Record<FacetKind, Set<string>> = {
      effects: new Set(),
      interactions: new Set(),
      elements: new Set(),
      layoutFacets: new Set(),
      intent: new Set(),
      pageRole: new Set(),
      contentMode: new Set(),
    };
    for (const kind of FACET_KINDS) {
      const raw = params.get(kind);
      if (!raw) continue;
      const valid = validByKind.get(kind);
      for (const v of raw.split(',').map((s) => s.trim()).filter(Boolean)) {
        if (!valid || valid.has(v)) {
          nextFacetSel[kind].add(v);
          didFilterFacets = true;
        }
      }
    }
    if (didFilterFacets) setFacetSel(nextFacetSel);

    // Selects : on ne retient que des valeurs présentes dans les options fournies.
    const familyParam = params.get('family');
    if (familyParam && families.some((f) => f.value === familyParam)) setFamily(familyParam);

    const categoryParam = params.get('category');
    if (categoryParam && categories.some((c) => c.value === categoryParam)) setCategory(categoryParam);

    const statusParam = params.get('status');
    if (statusParam && STATUS_OPTIONS.some((s) => s.value === statusParam)) setStatus(statusParam);

    // Vue : ?view=types ouvre l'explorer directement sur la vue à plat (liens partageables).
    const viewParam = params.get('view');
    if (viewParam === 'types' || viewParam === 'groups') setView(viewParam);

    // Tag : la recherche texte couvre déjà les tags (cf filtre `hay` ci-dessous),
    // donc on injecte le tag dans `query`, cohérent avec le filtrage existant,
    // sans facette dédiée à maintenir.
    const tagParam = params.get('tag');
    if (tagParam) setQuery(tagParam);

    // Si des facettes ont été pré-sélectionnées par l'URL, ouvrir le panneau
    // « Filtres avancés » pour que l'utilisateur voie pourquoi c'est filtré
    // (sinon des filtres actifs resteraient cachés ; ne régresse pas 6b588e8).
    if (didFilterFacets) setFacetsOpen(true);

    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync URL au changement de filtres (liens partageables) ────────────────
  // history.replaceState (PAS de navigation Astro / pas de full reload) reflète
  // l'état des filtres actifs dans la querystring : copier l'URL = partager la vue.
  // On n'écrit qu'après l'hydratation initiale (hydratedRef) pour ne pas écraser
  // les params entrants. Les facettes multi-valeurs sont jointes par virgule, en
  // miroir exact du parseur d'init ci-dessus (même contrat ?kind=a,b).
  useEffect(() => {
    if (typeof window === 'undefined' || !hydratedRef.current) return;
    const params = new URLSearchParams();
    for (const kind of FACET_KINDS) {
      const sel = facetSel[kind];
      if (sel.size > 0) params.set(kind, [...sel].join(','));
    }
    if (family !== 'all') params.set('family', family);
    if (category !== 'all') params.set('category', category);
    if (status !== 'all') params.set('status', status);
    if (query.trim() !== '') params.set('tag', query.trim());
    if (view !== 'groups') params.set('view', view);
    const qs = params.toString();
    const next = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', next);
  }, [facetSel, family, category, status, query, view]);

  const facetSelCount = useMemo(
    () => FACET_KINDS.reduce((acc, k) => acc + facetSel[k].size, 0),
    [facetSel],
  );

  // Représentants indexés par valeur de groupe (selon l'axe courant).
  const repByValue = useMemo(() => {
    const reps = groupBy === 'family' ? familyReps : categoryReps;
    return new Map(reps.map((r) => [r.value, r.type]));
  }, [groupBy, familyReps, categoryReps]);

  // Filtrage des TYPES (recherche + selects + facettes orthogonales + raccourcis).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (family !== 'all' && it.family !== family) return false;
      if (category !== 'all' && it.categorySlug !== category) return false;
      if (status !== 'all' && it.status !== status) return false;
      if (animatedOnly) {
        const hasEffect = it.effects.some((e) => e !== 'static');
        if (!hasEffect) return false;
      }
      if (withPresetsOnly && it.presetCount <= 0) return false;
      if (onSiteOnly && !it.onSite) return false;
      // Facettes : AND inter-genres, OR intra-genre.
      for (const kind of FACET_KINDS) {
        const sel = facetSel[kind];
        if (sel.size === 0) continue;
        // contentMode est une valeur unique (string) ; les autres genres sont des
        // tableaux de tags. On normalise en tableau pour appliquer la même mécanique.
        const itemTags = kind === 'contentMode' ? [it.contentMode] : it[kind];
        const matchesGenre = itemTags.some((t) => sel.has(t));
        if (!matchesGenre) return false;
      }
      if (q) {
        const hay = `${it.type} ${it.description_fr} ${it.tags.join(' ')} ${it.family}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, query, family, category, status, facetSel, animatedOnly, withPresetsOnly, onSiteOnly]);

  // Regroupement des types retenus en CARTES-GROUPES (1 vignette représentative chacune).
  const groups = useMemo(() => {
    const map = new Map<
      string,
      { key: string; label: string; count: number; stableCount: number; presetCount: number; sample: string }
    >();
    for (const it of filtered) {
      const key = groupBy === 'family' ? it.family : it.categorySlug;
      const label = groupBy === 'family' ? it.family : it.categoryLabel;
      const g =
        map.get(key) ?? { key, label, count: 0, stableCount: 0, presetCount: 0, sample: it.type };
      g.count += 1;
      g.presetCount += it.presetCount;
      if (it.status === 'stable') g.stableCount += 1;
      map.set(key, g);
    }
    const arr = [...map.values()].map((g) => ({
      ...g,
      // vignette = représentant pré-calculé du groupe, sinon 1er type filtré (sample).
      rep: repByValue.get(g.key) ?? g.sample,
      // href = route scopée qui détaille les types du groupe (peu d'iframes).
      href: groupBy === 'family' ? `/library/family/${g.key}` : `/library/${g.key}`,
    }));
    arr.sort((a, b) => {
      if (sortBy === 'count') {
        const d = b.count - a.count;
        if (d !== 0) return d;
      }
      if (sortBy === 'status') {
        const d = b.stableCount - a.stableCount;
        if (d !== 0) return d;
      }
      return a.label.localeCompare(b.label);
    });
    return arr;
  }, [filtered, groupBy, sortBy, repByValue]);

  const totalShown = filtered.length;
  const isFiltered =
    query.trim() !== '' ||
    family !== 'all' ||
    category !== 'all' ||
    status !== 'all' ||
    facetSelCount > 0 ||
    animatedOnly ||
    withPresetsOnly ||
    onSiteOnly;

  const resetFilters = () => {
    setQuery('');
    setFamily('all');
    setCategory('all');
    setStatus('all');
    setAnimatedOnly(false);
    setWithPresetsOnly(false);
    setOnSiteOnly(false);
    setFacetSel({
      effects: new Set(),
      interactions: new Set(),
      elements: new Set(),
      layoutFacets: new Set(),
      intent: new Set(),
      pageRole: new Set(),
      contentMode: new Set(),
    });
  };

  return (
    <div className="cx">
      {/* ── Barre de contrôle ── */}
      <div className="cx-controls" role="group" aria-label="Filtres et tri du catalogue">
        <div className="cx-search" style={{ gap: 'var(--space-2)' }}>
          <input
            type="search"
            className="cx-input"
            placeholder="Rechercher un type, un tag, une intention…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filtrer le catalogue"
          />
          {/* Ouvre la palette plein-texte (⌘K). Apparence = .cx-facets-toggle existant ;
              0 nouvelle classe. Le champ ci-dessus FILTRE la grille ; la palette NAVIGUE. */}
          <button
            type="button"
            className="cx-facets-toggle"
            onClick={openPalette}
            aria-haspopup="dialog"
            aria-keyshortcuts="Meta+K Control+K"
            title="Recherche plein-texte (⌘K)"
            style={{ flex: 'none' }}
          >
            <span>Recherche</span>
            <kbd
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: '0 var(--space-1)',
              }}
            >
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="cx-facets">
          <label className="cx-field">
            <span className="cx-field-label">Famille</span>
            <select className="cx-select" value={family} onChange={(e) => setFamily(e.target.value)}>
              <option value="all">Toutes ({items.length})</option>
              {families.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label} ({f.count})
                </option>
              ))}
            </select>
          </label>

          <label className="cx-field">
            <span className="cx-field-label">Catégorie</span>
            <select className="cx-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Toutes ({items.length})</option>
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label} ({c.count})
                </option>
              ))}
            </select>
          </label>

          <label className="cx-field">
            <span className="cx-field-label">Statut</span>
            <select className="cx-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="cx-field">
            <span className="cx-field-label">Trier</span>
            <select className="cx-select" value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
              <option value="alpha">Alphabétique</option>
              <option value="count">Par nombre</option>
              <option value="status">Par stables</option>
            </select>
          </label>
        </div>

        {/* ── Raccourcis + regroupement ── */}
        <div className="cx-toggles" role="group" aria-label="Raccourcis et regroupement">
          <div className="cx-quick" role="group" aria-label="Raccourcis">
            <button
              type="button"
              className="cx-chip cx-chip--toggle"
              aria-pressed={animatedOnly}
              onClick={() => setAnimatedOnly((v) => !v)}
            >
              Animées
            </button>
            <button
              type="button"
              className="cx-chip cx-chip--toggle"
              aria-pressed={withPresetsOnly}
              onClick={() => setWithPresetsOnly((v) => !v)}
            >
              Avec déclinaisons
            </button>
            <button
              type="button"
              className="cx-chip cx-chip--toggle"
              aria-pressed={onSiteOnly}
              onClick={() => setOnSiteOnly((v) => !v)}
            >
              En prod sur waimia
            </button>
          </div>

          <button
            type="button"
            className="cx-facets-toggle"
            aria-expanded={facetsOpen}
            aria-controls="cx-facet-groups"
            onClick={() => setFacetsOpen((v) => !v)}
          >
            <span>Filtres avancés</span>
            {facetSelCount > 0 && <span className="cx-facets-badge">{facetSelCount}</span>}
            <span className="cx-facets-chevron" aria-hidden="true" />
          </button>

          <div className="cx-groupby" role="group" aria-label="Vue du catalogue">
            <span className="cx-field-label">Vue</span>
            <div className="cx-segmented">
              <button
                type="button"
                className="cx-seg-btn"
                aria-pressed={view === 'groups'}
                onClick={() => setView('groups')}
              >
                Regrouper
              </button>
              <button
                type="button"
                className="cx-seg-btn"
                aria-pressed={view === 'types'}
                onClick={() => setView('types')}
              >
                Types
              </button>
            </div>
          </div>

          {view === 'groups' && (
            <div className="cx-groupby" role="group" aria-label="Regrouper par">
              <span className="cx-field-label">Regrouper</span>
              <div className="cx-segmented">
                <button
                  type="button"
                  className="cx-seg-btn"
                  aria-pressed={groupBy === 'family'}
                  onClick={() => setGroupBy('family')}
                >
                  Famille
                </button>
                <button
                  type="button"
                  className="cx-seg-btn"
                  aria-pressed={groupBy === 'category'}
                  onClick={() => setGroupBy('category')}
                >
                  Catégorie
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Facettes orthogonales multi-select (AND inter-genres, OR intra-genre) ── */}
        {/* Repliable : fermée par défaut pour garder le panneau sticky compact. */}
        <div
          id="cx-facet-groups"
          className={`cx-facet-groups${facetsOpen ? ' is-open' : ' is-collapsed'}`}
        >
          {facetGroups.map((grp) => (
            <fieldset className="cx-facet-group" key={grp.kind}>
              <legend className="cx-field-label">{grp.label}</legend>
              <div className="cx-chips">
                {grp.options.map((opt) => {
                  const active = facetSel[grp.kind].has(opt.value);
                  return (
                    <button
                      type="button"
                      key={opt.value}
                      className="cx-chip"
                      aria-pressed={active}
                      onClick={() => toggleFacet(grp.kind, opt.value)}
                    >
                      {opt.label} <span className="cx-chip-count">{opt.count}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* ── Compteur / reset ── */}
      <div className="cx-meta">
        <span className="cx-count" aria-live="polite">
          {totalShown} {totalShown > 1 ? 'sections' : 'section'}
          {isFiltered ? ` sur ${items.length}` : ''}
          {view === 'groups' && (
            <>
              {' '}
              · {groups.length} {groupBy === 'family' ? 'familles' : 'catégories'}
            </>
          )}
        </span>
        {isFiltered && (
          <button type="button" className="cx-reset" onClick={resetFilters}>
            Réinitialiser
          </button>
        )}
      </div>

      {/* ── Résultats : vue Groupes (cartes-groupes) OU vue Types (cartes à plat) ── */}
      {/* Les 2 vues réutilisent les mêmes classes .cx-card* (1 vignette LazyPreview montée à
          la demande) : 0 nouveau CSS, style DS hérité (cf <style is:global> dans index.astro). */}
      {view === 'groups' ? (
        groups.length === 0 ? (
          <p className="cx-empty">Aucune section ne correspond à ces filtres.</p>
        ) : (
          <ul className="cx-grid">
            {groups.map((g) => {
              // Quick-look pour la carte-groupe : on s'appuie sur le type représentant (g.rep)
              // dont on retrouve l'item complet (thèse + facettes) pour le popover.
              const repItem = items.find((it) => it.type === g.rep);
              return (
              <li
                key={g.key}
                onMouseEnter={(e) => repItem && scheduleQuickLook(repItem, e.currentTarget)}
                onMouseLeave={clearQuickLook}
              >
                <a
                  className="cx-card"
                  href={g.href}
                  onFocus={(e) => repItem && scheduleQuickLook(repItem, e.currentTarget.closest('li') ?? e.currentTarget)}
                  onBlur={clearQuickLook}
                >
                  <LazyPreview type={g.rep} label={`Aperçu ${g.label}`} />
                  <span className="cx-card-body">
                    <span className="cx-card-top">
                      <strong className="cx-card-name">{g.label}</strong>
                      <span className="cx-card-count">{g.count}</span>
                    </span>
                    <span className="cx-card-foot">
                      <span className="cx-card-kind">{groupBy === 'family' ? 'famille' : 'catégorie'}</span>
                      <span className="cx-card-metrics">
                        {g.presetCount > 0 && (
                          <span className="cx-card-presets">{g.presetCount} décl.</span>
                        )}
                        <span className="cx-card-stable">
                          {g.stableCount} stable{g.stableCount > 1 ? 's' : ''}
                        </span>
                      </span>
                    </span>
                  </span>
                </a>
              </li>
              );
            })}
          </ul>
        )
      ) : filtered.length === 0 ? (
        <p className="cx-empty">Aucune section ne correspond à ces filtres.</p>
      ) : (
        <ul className="cx-grid">
          {filtered.map((it) => {
            const fam = it.family;
            const cat = it.categoryLabel;
            return (
              <li
                key={it.type}
                style={{ position: 'relative' }}
                onMouseEnter={(e) => scheduleQuickLook(it, e.currentTarget)}
                onMouseLeave={clearQuickLook}
              >
                {/* Sélecteur « comparer » (#65) : hors du <a> (sinon il intercepterait le clic),
                    posé en overlay sur la vignette. Apparence = .cx-chip existant ; le
                    positionnement résiduel est inline (var(--token)) pour ne pas créer de classe
                    orpheline ni toucher au <style is:global> d'index.astro. */}
                <label
                  className="cx-chip cx-chip--toggle"
                  aria-pressed={compareSet.has(it.type)}
                  style={{
                    position: 'absolute',
                    top: 'var(--space-2)',
                    left: 'var(--space-2)',
                    zIndex: 2,
                    background: 'var(--paper)',
                  }}
                  title={
                    compareSet.has(it.type)
                      ? 'Retirer de la comparaison'
                      : compareFull
                        ? `Maximum ${MAX_COMPARE} sections`
                        : 'Ajouter à la comparaison'
                  }
                >
                  <input
                    type="checkbox"
                    checked={compareSet.has(it.type)}
                    disabled={!compareSet.has(it.type) && compareFull}
                    onChange={() => toggleCompare(it.type)}
                    aria-label={`Comparer ${it.type}`}
                  />
                  Comparer
                </label>
                {/* Carte-type : vignette /preview/[type] + identité technique (mono) + statut +
                    famille·catégorie + déclinaisons. Clic -> fiche détail /library/[type]. */}
                <a
                  className="cx-card"
                  href={`/library/${it.type}`}
                  onFocus={(e) => scheduleQuickLook(it, e.currentTarget.closest('li') ?? e.currentTarget)}
                  onBlur={clearQuickLook}
                >
                  <LazyPreview type={it.type} label={`Aperçu ${it.type}`} />
                  <span className="cx-card-body">
                    <span className="cx-card-top">
                      <code className="cx-type-code">{it.type}</code>
                      <span className="cx-card-count">{STATUS_LABELS_FR[it.status]}</span>
                    </span>
                    <span className="cx-card-foot">
                      <span className="cx-card-kind">
                        {fam} · {cat}
                      </span>
                      {it.presetCount > 0 && (
                        <span className="cx-card-presets">{it.presetCount} décl.</span>
                      )}
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {/* ── Barre d'action « comparer » (#65) ── */}
      {/* Visible dès qu'une section est sélectionnée (vue Types). Navigue vers le comparateur.
          Réutilise le langage .cx-chip ; 0 nouveau token. */}
      {/* Apparence portée par .cx-* existants ; layout résiduel inline (var(--token)) pour
          rester barre flottante sans classe orpheline ni édition d'index.astro. */}
      {compareSel.length > 0 && (
        <div
          role="region"
          aria-label="Sélection à comparer"
          style={{
            position: 'sticky',
            bottom: 'var(--space-4)',
            zIndex: 6,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-3) var(--space-4)',
            border: '1px solid var(--hairline-strong)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--paper-2)',
          }}
        >
          <span
            className="cx-count"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-small)' }}
          >
            {compareSel.length} / {MAX_COMPARE} sélectionnée{compareSel.length > 1 ? 's' : ''}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', flex: 1, minWidth: 0 }}>
            {compareSel.map((t) => (
              <button
                type="button"
                key={t}
                className="cx-chip"
                onClick={() => toggleCompare(t)}
                aria-label={`Retirer ${t}`}
                title="Retirer"
              >
                {t} <span className="cx-chip-count" aria-hidden="true">×</span>
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button type="button" className="cx-reset" onClick={() => setCompareSel([])}>
              Vider
            </button>
            <button
              type="button"
              className="cx-chip cx-chip--toggle"
              aria-pressed={compareSel.length >= 2}
              disabled={compareSel.length < 2}
              onClick={goCompare}
            >
              Comparer ({compareSel.length})
            </button>
          </div>
        </div>
      )}

      {/* ── Overlays : palette ⌘K + quick-look au survol ── */}
      {paletteOpen && (
        <CommandPalette
          results={paletteResults}
          onClose={closePalette}
          reducedMotion={reducedMotion}
        />
      )}
      {quickLook && (
        <QuickLook
          key={quickLook.type}
          data={quickLook}
          onClose={clearQuickLook}
          onKeep={keepQuickLook}
          reducedMotion={reducedMotion}
        />
      )}
    </div>
  );
}
