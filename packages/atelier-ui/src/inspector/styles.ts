// @waimia/atelier-ui · inspector · feuille de style scopée (injectée une fois).
//
// Tout en var(--token) DS (0 valeur en dur hormis 1px hairline structurel). Injectée
// dans <head> via `useInspectorStyles()` (dédupliquée par id) → self-contained, aucune
// import CSS externe requise côté hôte. Classes préfixées `wa-insp` (pas de collision).

import { useEffect } from 'react';

const STYLE_ID = 'wa-insp-styles';

export const CSS = `
.wa-insp {
  font-family: var(--font-sans, system-ui, sans-serif);
  color: var(--ink);
  font-size: 0.875rem;
  line-height: 1.45;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--paper);
}
.wa-insp * { box-sizing: border-box; }

/* Onglets */
.wa-insp-tabs {
  display: flex;
  gap: var(--space-1);
  padding: var(--space-2);
  border-bottom: 1px solid var(--hairline);
  background: var(--paper-2);
  flex: 0 0 auto;
}
.wa-insp-tab {
  appearance: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--ink);
  opacity: 0.62;
  font: inherit;
  font-weight: 500;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm, 6px);
  cursor: pointer;
  transition: opacity 120ms, background 120ms;
}
.wa-insp-tab:hover { opacity: 0.9; background: var(--paper-3); }
.wa-insp-tab[aria-selected='true'] {
  opacity: 1;
  background: var(--paper);
  border-color: var(--hairline-strong);
  font-weight: 600;
}

.wa-insp-body {
  padding: var(--space-4);
  overflow-y: auto;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Champ générique */
.wa-insp-field { display: flex; flex-direction: column; gap: var(--space-1); }
.wa-insp-label {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  font-weight: 600;
  font-size: 0.78rem;
  letter-spacing: 0.01em;
}
.wa-insp-fieldname { opacity: 0.55; font-weight: 500; }
.wa-insp-req { color: var(--accent-text); }
.wa-insp-hint { opacity: 0.5; font-size: 0.72rem; font-weight: 500; }

.wa-insp-input,
.wa-insp-textarea,
.wa-insp-select {
  font: inherit;
  color: var(--ink);
  background: var(--paper);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm, 6px);
  padding: var(--space-2) var(--space-3);
  width: 100%;
}
.wa-insp-textarea { min-height: 5.5rem; resize: vertical; line-height: 1.5; }
.wa-insp-input:focus,
.wa-insp-textarea:focus,
.wa-insp-select:focus {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
  border-color: var(--accent);
}

/* Segmented control */
.wa-insp-seg { display: inline-flex; flex-wrap: wrap; gap: 2px; padding: 2px; background: var(--paper-3); border-radius: var(--radius-sm, 6px); }
.wa-insp-seg-btn {
  appearance: none; border: 0; background: transparent; font: inherit;
  color: var(--ink); opacity: 0.62; padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm, 5px); cursor: pointer; transition: all 110ms;
}
.wa-insp-seg-btn:hover { opacity: 0.9; }
.wa-insp-seg-btn[aria-pressed='true'] { background: var(--paper); opacity: 1; font-weight: 600; box-shadow: var(--shadow-card-rest, 0 0 0 1px var(--hairline)); }

/* Stepper */
.wa-insp-stepper { display: inline-flex; align-items: center; gap: var(--space-2); }
.wa-insp-step-btn {
  appearance: none; width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--hairline-strong); background: var(--paper); color: var(--ink);
  font: inherit; font-size: 1rem; line-height: 1; cursor: pointer;
}
.wa-insp-step-btn:hover { background: var(--paper-3); }
.wa-insp-step-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.wa-insp-step-val { min-width: 2.5rem; text-align: center; font-variant-numeric: tabular-nums; font-weight: 600; }

/* Toggle */
.wa-insp-toggle {
  appearance: none; position: relative; width: 2.4rem; height: 1.35rem; flex: 0 0 auto;
  border-radius: 999px; border: 1px solid var(--hairline-strong); background: var(--paper-3);
  cursor: pointer; transition: background 120ms;
}
.wa-insp-toggle[aria-checked='true'] { background: var(--accent); border-color: var(--accent); }
.wa-insp-toggle::after {
  content: ''; position: absolute; top: 50%; left: 3px; width: 1rem; height: 1rem;
  border-radius: 50%; background: var(--paper); transform: translateY(-50%); transition: left 120ms;
}
.wa-insp-toggle[aria-checked='true']::after { left: calc(100% - 1rem - 3px); }
.wa-insp-toggle-row { display: flex; align-items: center; gap: var(--space-3); }

/* Direction (4 boutons) */
.wa-insp-dir { display: inline-flex; gap: var(--space-1); }
.wa-insp-dir-btn {
  appearance: none; width: 2.25rem; height: 2.25rem; border-radius: var(--radius-sm, 6px);
  border: 1px solid var(--hairline-strong); background: var(--paper); color: var(--ink);
  cursor: pointer; font-size: 1rem; line-height: 1; display: grid; place-items: center;
}
.wa-insp-dir-btn:hover { background: var(--paper-3); }
.wa-insp-dir-btn[aria-pressed='true'] { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }

/* Language tabs */
.wa-insp-langs { display: inline-flex; gap: var(--space-1); }
.wa-insp-lang {
  appearance: none; border: 1px solid var(--hairline-strong); background: var(--paper);
  color: var(--ink); opacity: 0.6; font: inherit; font-weight: 600; font-size: 0.72rem;
  padding: 2px var(--space-2); border-radius: var(--radius-sm, 5px); cursor: pointer;
}
.wa-insp-lang[aria-pressed='true'] { opacity: 1; background: var(--ink); color: var(--paper); border-color: var(--ink); }

/* Array / object */
.wa-insp-group { border: 1px solid var(--hairline); border-radius: var(--radius-md, 8px); padding: var(--space-3); background: var(--paper-2); display: flex; flex-direction: column; gap: var(--space-3); }
.wa-insp-group-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.wa-insp-item { border: 1px solid var(--hairline); border-radius: var(--radius-sm, 6px); padding: var(--space-3); background: var(--paper); display: flex; flex-direction: column; gap: var(--space-2); }
.wa-insp-item-head { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); }
.wa-insp-item-idx { font-weight: 700; font-size: 0.72rem; opacity: 0.5; letter-spacing: 0.04em; }
.wa-insp-item-tools { display: inline-flex; gap: var(--space-1); }
.wa-insp-icon-btn {
  appearance: none; width: 1.6rem; height: 1.6rem; border-radius: var(--radius-sm, 5px);
  border: 1px solid var(--hairline-strong); background: var(--paper); color: var(--ink);
  cursor: pointer; font-size: 0.85rem; line-height: 1; display: grid; place-items: center;
}
.wa-insp-icon-btn:hover { background: var(--paper-3); }
.wa-insp-icon-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.wa-insp-add {
  appearance: none; align-self: flex-start; border: 1px dashed var(--hairline-strong);
  background: transparent; color: var(--ink); font: inherit; font-weight: 600; font-size: 0.8rem;
  padding: var(--space-2) var(--space-3); border-radius: var(--radius-sm, 6px); cursor: pointer;
}
.wa-insp-add:hover { background: var(--paper-3); }
.wa-insp-add:disabled { opacity: 0.35; cursor: not-allowed; }

/* Image preview */
.wa-insp-img-preview { margin-top: var(--space-1); max-width: 100%; max-height: 8rem; border-radius: var(--radius-sm, 6px); border: 1px solid var(--hairline); object-fit: contain; background: var(--paper-3); }

/* Variant presets grid */
.wa-insp-presets { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: var(--space-3); }
.wa-insp-preset {
  appearance: none; text-align: left; border: 1px solid var(--hairline-strong); background: var(--paper);
  border-radius: var(--radius-md, 8px); padding: var(--space-3); cursor: pointer; display: flex;
  flex-direction: column; gap: var(--space-2); font: inherit; color: var(--ink);
}
.wa-insp-preset:hover { border-color: var(--ink); }
.wa-insp-preset[aria-pressed='true'] { outline: 2px solid var(--accent); outline-offset: 1px; border-color: var(--accent); }
.wa-insp-preset-label { font-weight: 600; font-size: 0.8rem; }
.wa-insp-badges { display: flex; flex-wrap: wrap; gap: var(--space-1); }
.wa-insp-badge {
  font-size: 0.68rem; font-weight: 600; padding: 1px var(--space-2); border-radius: 999px;
  background: var(--paper-3); color: var(--ink); opacity: 0.8;
}

/* Color schemes */
.wa-insp-schemes { display: grid; grid-template-columns: repeat(auto-fill, minmax(112px, 1fr)); gap: var(--space-3); }
.wa-insp-scheme {
  appearance: none; border: 1px solid var(--hairline-strong); background: var(--paper);
  border-radius: var(--radius-md, 8px); padding: var(--space-2); cursor: pointer; display: flex;
  flex-direction: column; gap: var(--space-2); font: inherit; color: var(--ink); align-items: stretch;
}
.wa-insp-scheme:hover { border-color: var(--ink); }
.wa-insp-scheme[aria-pressed='true'] { outline: 2px solid var(--accent); outline-offset: 1px; border-color: var(--accent); }
.wa-insp-swatch { display: flex; height: 2.4rem; border-radius: var(--radius-sm, 6px); overflow: hidden; border: 1px solid var(--hairline); }
.wa-insp-swatch > span { flex: 1 1 auto; }
.wa-insp-scheme-label { font-size: 0.7rem; font-weight: 600; text-align: center; opacity: 0.8; }

.wa-insp-empty { opacity: 0.5; font-style: italic; padding: var(--space-4); text-align: center; }
.wa-insp-section-title { font-weight: 700; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.55; }
.wa-insp-placement { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }
`;

/** Injecte la feuille de style scopée une seule fois (dédupliquée par id). */
export function useInspectorStyles(): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

/** Table surface DS → var(--token) pour les pastilles de couleur. */
export const SURFACE_VAR: Record<string, string> = {
  paper: 'var(--paper)',
  'paper-2': 'var(--paper-2)',
  'paper-3': 'var(--paper-3)',
  ink: 'var(--ink)',
  'ink-2': 'var(--ink-2)',
  'ink-3': 'var(--ink-3)',
  accent: 'var(--accent)',
};
