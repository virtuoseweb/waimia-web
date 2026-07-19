// Waimia · Atelier · FamilyChips : facette FAMILLE du picker (chips selectionnables).
// Sous-composant prop-driven d'AddPanel. Zero import app.

export interface FamilyChip {
  id: string;
  count: number;
}

export interface FamilyChipsProps {
  /** Familles distinctes du catalogue avec leur cardinalite. */
  families: FamilyChip[];
  /** Famille active (ou `allId` pour « Toutes »). */
  active: string;
  /** Identifiant sentinelle de la chip « Toutes ». */
  allId: string;
  /** Notifie la selection d'une famille (ou `allId`). */
  onSelect: (familyId: string) => void;
}

export function FamilyChips({
  families,
  active,
  allId,
  onSelect,
}: FamilyChipsProps): React.ReactElement {
  return (
    <div className="wa-chips" role="group" aria-label="Filtrer par famille">
      <button
        type="button"
        className="wa-chips__chip"
        data-active={active === allId || undefined}
        aria-pressed={active === allId}
        onClick={() => onSelect(allId)}
      >
        Toutes
      </button>
      {families.map((f) => (
        <button
          key={f.id}
          type="button"
          className="wa-chips__chip"
          data-active={active === f.id || undefined}
          aria-pressed={active === f.id}
          onClick={() => onSelect(f.id)}
        >
          {f.id}
          <span className="wa-chips__count">{f.count}</span>
        </button>
      ))}

      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: CHIPS_CSS }}
        data-wa-style="family-chips"
      />
    </div>
  );
}

const CHIPS_CSS = `
.wa-chips{display:flex;flex-wrap:wrap;gap:var(--space-2);}
.wa-chips__chip{appearance:none;cursor:pointer;font-size:var(--text-small);
  display:inline-flex;align-items:center;gap:var(--space-2);
  padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);
  border:1px solid var(--hairline);background:var(--paper-2);color:var(--muted);
  transition:background .15s ease,border-color .15s ease,color .15s ease;text-transform:capitalize;}
.wa-chips__chip:hover{border-color:var(--accent);color:var(--ink);}
.wa-chips__chip[data-active]{background:var(--accent);border-color:var(--accent);
  color:var(--accent-text);}
.wa-chips__count{font-size:var(--text-kicker);opacity:.75;}
.wa-chips__chip[data-active] .wa-chips__count{opacity:.9;}
`;

export default FamilyChips;
