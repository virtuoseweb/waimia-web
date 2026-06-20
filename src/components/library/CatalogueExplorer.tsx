// Waimia · Library · explorateur de catalogue filtrable (Track C, taxonomie docs/45 §9.6).
//
// Island React client:load qui transforme la landing /library en VRAI catalogue rangé,
// SANS saturer le navigateur :
//   - on affiche des CARTES-GROUPES (1 par famille OU par catégorie), pas 165 cartes-type ;
//   - chaque carte-groupe porte UNE vignette d'aperçu représentative (iframe /preview/<type>)
//     montée À LA DEMANDE via IntersectionObserver (l'iframe n'entre dans le DOM qu'à l'approche
//     du viewport) → la landing ne charge jamais 165 documents preview en parallèle
//     (fini ERR_INSUFFICIENT_RESOURCES). Le détail par type (165) vit sur /library/[category]
//     et /library/family/[family] (peu d'iframes par page).
//   - FILTRES (recherche texte, catégorie, famille, statut) + TRI opèrent sur les TYPES ;
//     un groupe s'affiche s'il contient au moins un type retenu, avec son compteur filtré.
//
// Alimenté par un export JSON léger du registry (props `items` + `familyReps`/`categoryReps`).
// 0 nouvelle dépendance. 0 nouveau token DS (rule 60) : variables canoniques uniquement.

import { useEffect, useMemo, useRef, useState } from 'react';

export interface CatalogueItem {
  type: string;
  family: string;
  categorySlug: string;
  categoryLabel: string;
  status: 'stable' | 'wip' | 'deprecated';
  tags: string[];
  description_fr: string;
  presetCount: number;
}

interface FacetOption {
  value: string;
  label: string;
  count: number;
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
}

type GroupBy = 'family' | 'category';
type SortBy = 'alpha' | 'count' | 'status';

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous statuts' },
  { value: 'stable', label: 'Stable' },
  { value: 'wip', label: 'WIP' },
  { value: 'deprecated', label: 'Déprécié' },
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

export default function CatalogueExplorer({ items, families, categories, familyReps, categoryReps }: Props) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('all');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [groupBy, setGroupBy] = useState<GroupBy>('family');
  const [sortBy, setSortBy] = useState<SortBy>('alpha');

  // Représentants indexés par valeur de groupe (selon l'axe courant).
  const repByValue = useMemo(() => {
    const reps = groupBy === 'family' ? familyReps : categoryReps;
    return new Map(reps.map((r) => [r.value, r.type]));
  }, [groupBy, familyReps, categoryReps]);

  // Filtrage des TYPES (recherche + facettes).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (family !== 'all' && it.family !== family) return false;
      if (category !== 'all' && it.categorySlug !== category) return false;
      if (status !== 'all' && it.status !== status) return false;
      if (q) {
        const hay = `${it.type} ${it.description_fr} ${it.tags.join(' ')} ${it.family}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, query, family, category, status]);

  // Regroupement des types retenus en CARTES-GROUPES (1 vignette représentative chacune).
  const groups = useMemo(() => {
    const map = new Map<
      string,
      { key: string; label: string; count: number; stableCount: number; sample: string }
    >();
    for (const it of filtered) {
      const key = groupBy === 'family' ? it.family : it.categorySlug;
      const label = groupBy === 'family' ? it.family : it.categoryLabel;
      const g = map.get(key) ?? { key, label, count: 0, stableCount: 0, sample: it.type };
      g.count += 1;
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
    query.trim() !== '' || family !== 'all' || category !== 'all' || status !== 'all';

  const resetFilters = () => {
    setQuery('');
    setFamily('all');
    setCategory('all');
    setStatus('all');
  };

  return (
    <div className="cx">
      {/* ── Barre de contrôle ── */}
      <div className="cx-controls" role="group" aria-label="Filtres et tri du catalogue">
        <div className="cx-search">
          <input
            type="search"
            className="cx-input"
            placeholder="Rechercher un type, un tag, une intention…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Rechercher dans le catalogue"
          />
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
      </div>

      {/* ── Compteur / reset ── */}
      <div className="cx-meta">
        <span className="cx-count" aria-live="polite">
          {totalShown} {totalShown > 1 ? 'sections' : 'section'}
          {isFiltered ? ` sur ${items.length}` : ''} · {groups.length}{' '}
          {groupBy === 'family' ? 'familles' : 'catégories'}
        </span>
        {isFiltered && (
          <button type="button" className="cx-reset" onClick={resetFilters}>
            Réinitialiser
          </button>
        )}
      </div>

      {/* ── Cartes-groupes (1 vignette représentative chacune, montée à la demande) ── */}
      {groups.length === 0 ? (
        <p className="cx-empty">Aucune section ne correspond à ces filtres.</p>
      ) : (
        <ul className="cx-grid">
          {groups.map((g) => (
            <li key={g.key}>
              <a className="cx-card" href={g.href}>
                <LazyPreview type={g.rep} label={`Aperçu ${g.label}`} />
                <span className="cx-card-body">
                  <span className="cx-card-top">
                    <strong className="cx-card-name">{g.label}</strong>
                    <span className="cx-card-count">{g.count}</span>
                  </span>
                  <span className="cx-card-foot">
                    <span className="cx-card-kind">{groupBy === 'family' ? 'famille' : 'catégorie'}</span>
                    <span className="cx-card-stable">
                      {g.stableCount} stable{g.stableCount > 1 ? 's' : ''}
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
