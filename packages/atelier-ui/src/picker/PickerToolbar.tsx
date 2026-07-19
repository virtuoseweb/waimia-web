// Waimia · Atelier · PickerToolbar : barre de recherche + compteur de resultats du picker.
// Sous-composant prop-driven d'AddPanel. Zero import app.

export interface PickerToolbarProps {
  /** Valeur courante du champ de recherche (controle par le parent). */
  query: string;
  /** Notifie le parent d'un changement de recherche. */
  onQuery: (value: string) => void;
  /** Nombre de vignettes actuellement affichees (feedback utilisateur). */
  resultCount: number;
}

export function PickerToolbar({
  query,
  onQuery,
  resultCount,
}: PickerToolbarProps): React.ReactElement {
  return (
    <div className="wa-toolbar">
      <label className="wa-toolbar__field">
        <span className="wa-toolbar__icon" aria-hidden="true">
          &#9906;
        </span>
        <input
          type="search"
          className="wa-toolbar__input"
          placeholder="Rechercher une section…"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label="Rechercher une section"
        />
      </label>
      <span className="wa-toolbar__count" aria-live="polite">
        {resultCount} section{resultCount > 1 ? 's' : ''}
      </span>

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: TOOLBAR_CSS }}
        data-wa-style="picker-toolbar"
      />
    </div>
  );
}

const TOOLBAR_CSS = `
.wa-toolbar{display:flex;align-items:center;gap:var(--space-3);}
.wa-toolbar__field{display:flex;align-items:center;gap:var(--space-2);flex:1;
  border:1px solid var(--hairline);border-radius:var(--radius-sm);
  background:var(--paper-2);padding:0 var(--space-3);
  transition:border-color .15s ease;}
.wa-toolbar__field:focus-within{border-color:var(--accent);}
.wa-toolbar__icon{color:var(--muted);font-size:var(--text-small);}
.wa-toolbar__input{flex:1;border:0;background:transparent;color:var(--ink);
  padding:var(--space-2) 0;font-size:var(--text-small);outline:none;min-width:0;}
.wa-toolbar__input::placeholder{color:var(--muted);}
.wa-toolbar__count{font-size:var(--text-kicker);color:var(--muted);white-space:nowrap;}
`;

export default PickerToolbar;
