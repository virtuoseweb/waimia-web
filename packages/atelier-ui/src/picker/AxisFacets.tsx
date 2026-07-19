// Waimia · Atelier · AxisFacets : barre de filtres horizontale par AXES DE LAYOUT (façon Relume).
//
// Sous-composant prop-driven d'AddPanel. Les axes disponibles (Layout, Colonnes, Fond, Densité…)
// sont DEDUITS des données passées en props (chaque type/preset porte un objet `axes`) : un axe
// n'apparaît en dropdown que s'il a au moins deux valeurs distinctes dans le contexte courant.
// Porte aussi les actions transverses « Au hasard » (shuffle) et « Effacer » (reset des filtres).
// Zero import app.

export interface AxisOption {
  /** Clé d'axe (ex. `layout`, `columns`, `background`). */
  key: string;
  /** Libellé FR affiché (ex. « Layout »). */
  label: string;
  /** Valeurs distinctes sélectionnables pour cet axe. */
  values: string[];
}

export interface AxisFacetsProps {
  /** Axes exposables (déjà filtrés à ceux ayant >= 2 valeurs par le parent). */
  options: AxisOption[];
  /** Sélection courante : `{ [key]: value }` ; une clé absente = « tous ». */
  selected: Record<string, string>;
  /** Change la valeur d'un axe (`''` = tous). */
  onChange: (key: string, value: string) => void;
  /** Réinitialise recherche + facettes. */
  onClear: () => void;
  /** Nombre de filtres actifs (pilote l'état du bouton « Effacer »). */
  activeCount: number;
  /** Propose un élément aléatoire du contexte filtré courant. */
  onShuffle: () => void;
  /** Désactive « Au hasard » quand la grille filtrée est vide. */
  canShuffle: boolean;
}

export function AxisFacets({
  options,
  selected,
  onChange,
  onClear,
  activeCount,
  onShuffle,
  canShuffle,
}: AxisFacetsProps): React.ReactElement {
  return (
    <div className="wa-facets" role="group" aria-label="Filtres par axe de layout">
      {options.map((opt) => (
        <label key={opt.key} className="wa-facets__field">
          <span className="wa-facets__label">{opt.label}</span>
          <select
            className="wa-facets__select"
            value={selected[opt.key] ?? ''}
            onChange={(e) => onChange(opt.key, e.target.value)}
          >
            <option value="">Tous</option>
            {opt.values.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      ))}

      <div className="wa-facets__actions">
        <button
          type="button"
          className="wa-facets__btn"
          onClick={onShuffle}
          disabled={!canShuffle}
          title="Proposer une section au hasard"
        >
          &#9861; Au hasard
        </button>
        <button
          type="button"
          className="wa-facets__btn"
          onClick={onClear}
          disabled={activeCount === 0}
        >
          Effacer{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
      </div>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: FACETS_CSS }}
        data-wa-style="axis-facets"
      />
    </div>
  );
}

const FACETS_CSS = `
.wa-facets{display:flex;flex-wrap:wrap;align-items:flex-end;gap:var(--space-3);
  padding:var(--space-3) 0;border-top:1px solid var(--hairline);}
.wa-facets__field{display:flex;flex-direction:column;gap:var(--space-1);}
.wa-facets__label{font-size:var(--text-kicker);color:var(--muted);
  text-transform:uppercase;letter-spacing:.04em;}
.wa-facets__select{appearance:none;font-size:var(--text-small);color:var(--ink);
  background:var(--paper-2);border:1px solid var(--hairline);border-radius:var(--radius-sm);
  padding:var(--space-2) var(--space-5) var(--space-2) var(--space-3);cursor:pointer;
  background-image:linear-gradient(45deg,transparent 50%,var(--muted) 50%),
    linear-gradient(135deg,var(--muted) 50%,transparent 50%);
  background-position:calc(100% - var(--space-3)) 55%, calc(100% - 9px) 55%;
  background-size:5px 5px,5px 5px;background-repeat:no-repeat;}
.wa-facets__select:focus-visible{border-color:var(--accent);outline:none;}
.wa-facets__actions{display:flex;gap:var(--space-2);margin-left:auto;align-items:flex-end;}
.wa-facets__btn{appearance:none;cursor:pointer;font-size:var(--text-small);
  padding:var(--space-2) var(--space-3);border-radius:var(--radius-sm);
  border:1px solid var(--hairline);background:var(--paper-2);color:var(--ink);
  transition:background .15s ease,border-color .15s ease,opacity .15s ease;}
.wa-facets__btn:hover:not(:disabled){border-color:var(--accent);background:var(--paper-3);}
.wa-facets__btn:disabled{opacity:.45;cursor:default;}
`;

export default AxisFacets;
