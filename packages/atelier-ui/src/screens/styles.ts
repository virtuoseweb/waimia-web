// @waimia/atelier-ui · screens · feuille de style scopée (injectée une fois, dédupliquée par id).
//
// Écrans d'entrée du builder (dashboard « Projets » + canvas sitemap des vraies pages). Tout en
// var(--token) DS existants (0 valeur en dur hormis 1px hairline structurel + 2px focus outline).
// Classes préfixées `wa-scr` (pas de collision avec l'éditeur bld-* ni l'inspecteur wa-insp).
//
// 0 nouveau token DS (rule 60), 0 valeur en dur, 0 tiret cadratin U+2014, UI en français.

import { useEffect } from 'react';

const STYLE_ID = 'wa-scr-styles';

export const CSS = `
.wa-scr { display: flex; flex-direction: column; gap: var(--space-6);
  padding: var(--space-6); color: var(--ink); font-family: var(--font-sans); }
.wa-scr * { box-sizing: border-box; }

/* ── En-tête d'écran (kicker + titre + lede) ── */
.wa-scr-head { display: flex; flex-direction: column; gap: var(--space-3); }
.wa-scr-kicker { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--muted); }
.wa-scr-title { margin: 0; font-family: var(--font-sans); font-size: var(--text-h2);
  line-height: var(--leading-h2); letter-spacing: var(--tracking-display);
  font-weight: var(--fw-semibold); color: var(--ink); text-wrap: balance; }
.wa-scr-lede { margin: 0; max-width: 64ch; font-size: var(--text-body);
  line-height: 1.55; color: var(--ink-2); }

/* ── Dashboard : grille de cartes projet ── */
.wa-scr-projects { display: grid; gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
.wa-scr-card { display: flex; flex-direction: column; gap: var(--space-3);
  padding: var(--space-5); border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-md); background: var(--paper); color: var(--ink);
  text-align: left; cursor: pointer; min-height: 180px;
  transition: border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); }
.wa-scr-card:hover { border-color: var(--accent-text); box-shadow: var(--shadow-card-hover); }
.wa-scr-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.wa-scr-card-mark { display: flex; align-items: center; justify-content: center;
  width: 40px; height: 40px; border-radius: var(--radius-sm); background: var(--ink);
  color: var(--paper); font-family: var(--font-sans); font-size: var(--text-body);
  font-weight: var(--fw-semibold); line-height: 1; }
.wa-scr-card-name { font-family: var(--font-sans); font-size: var(--text-h3);
  font-weight: var(--fw-semibold); color: var(--ink); }
.wa-scr-card-domain { font-family: var(--font-mono); font-size: var(--text-small);
  color: var(--accent-text); }
.wa-scr-card-meta { margin-top: auto; display: flex; flex-wrap: wrap; gap: var(--space-3);
  font-family: var(--font-mono); font-size: var(--text-micro); color: var(--muted); }
.wa-scr-card-meta strong { color: var(--ink); font-weight: var(--fw-semibold); }
.wa-scr-card--new { align-items: flex-start; justify-content: center; gap: var(--space-2);
  border-style: dashed; background: var(--paper-2); }
.wa-scr-card--new .wa-scr-card-plus { font-family: var(--font-mono); font-size: var(--text-h2);
  line-height: 1; color: var(--accent-text); }

/* ── Sitemap : barre de retour ── */
.wa-scr-bar { display: flex; align-items: center; gap: var(--space-4); flex-wrap: wrap; }
.wa-scr-back { display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-3); border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm); background: var(--paper); color: var(--ink-2);
  font-family: var(--font-mono); font-size: var(--text-small); cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease); }
.wa-scr-back:hover { border-color: var(--accent-text); color: var(--accent-text); }
.wa-scr-back:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.wa-scr-bar-count { font-family: var(--font-mono); font-size: var(--text-small); color: var(--muted); }

/* ── Sitemap : un groupe = en-tête + rangée de cartes de pages ── */
.wa-scr-groups { display: flex; flex-direction: column; gap: var(--space-7); }
.wa-scr-group { display: flex; flex-direction: column; gap: var(--space-3); }
.wa-scr-group-head { display: flex; align-items: baseline; gap: var(--space-3);
  padding-bottom: var(--space-2); border-bottom: 1px solid var(--hairline); }
.wa-scr-group-label { font-family: var(--font-sans); font-size: var(--text-body);
  font-weight: var(--fw-semibold); color: var(--ink); }
.wa-scr-group-count { font-family: var(--font-mono); font-size: var(--text-micro); color: var(--muted); }
.wa-scr-group-pages { display: grid; gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); align-items: start; }

/* ── Sitemap : carte d'une page (colonne de sections en wireframe) ── */
.wa-scr-page { display: flex; flex-direction: column; gap: 0; width: 100%;
  border: 1px solid var(--hairline-strong); border-radius: var(--radius-sm);
  background: var(--paper); overflow: hidden; text-align: left; }
button.wa-scr-page { cursor: pointer; color: var(--ink);
  transition: border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); }
button.wa-scr-page:hover { border-color: var(--accent-text); box-shadow: var(--shadow-card-hover); }
button.wa-scr-page:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.wa-scr-page--template { opacity: 0.62; }
.wa-scr-page-head { display: flex; flex-direction: column; gap: var(--space-1);
  padding: var(--space-3); border-bottom: 1px solid var(--hairline); background: var(--paper-2); }
.wa-scr-page-title { font-family: var(--font-sans); font-size: var(--text-small);
  font-weight: var(--fw-semibold); color: var(--ink); line-height: 1.35;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.wa-scr-page-route { font-family: var(--font-mono); font-size: var(--text-micro);
  color: var(--muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.wa-scr-page-badges { display: flex; align-items: center; gap: var(--space-2);
  margin-top: var(--space-1); }
.wa-scr-badge { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; padding: 2px var(--space-2);
  border-radius: var(--radius-pill); border: 1px solid var(--hairline-strong); }
.wa-scr-badge--editable { color: var(--complementary); border-color: var(--complementary); }
.wa-scr-badge--template { color: var(--muted); }
.wa-scr-page-sections { display: flex; flex-direction: column; gap: 2px;
  padding: var(--space-2); }
.wa-scr-sec { display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-1) var(--space-2); border-radius: var(--radius-xs);
  background: var(--paper-2); }
.wa-scr-sec-bar { flex: none; width: 3px; height: 14px; border-radius: var(--radius-full);
  background: var(--hairline-strong); }
.wa-scr-sec--ink .wa-scr-sec-bar { background: var(--ink); }
.wa-scr-sec-label { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; font-family: var(--font-sans); font-size: var(--text-micro); color: var(--ink-2); }
.wa-scr-sec-type { flex: none; max-width: 45%; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; font-family: var(--font-mono); font-size: var(--text-micro); color: var(--muted); }
.wa-scr-page-empty { padding: var(--space-3); font-family: var(--font-mono);
  font-size: var(--text-micro); color: var(--muted); }
.wa-scr-page-link { display: inline-flex; align-items: center; gap: var(--space-1);
  margin: var(--space-2) var(--space-3) var(--space-3); font-family: var(--font-mono);
  font-size: var(--text-micro); color: var(--accent-text); text-decoration: none; }
.wa-scr-page-link:hover { text-decoration: underline; }

.wa-scr-err { font-family: var(--font-mono); font-size: var(--text-small); color: var(--accent-text); }

/* ── Style (thème) : boutons d'action ── */
.wa-scr-btn { display: inline-flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-4); border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-sm); background: var(--paper); color: var(--ink-2);
  font-family: var(--font-mono); font-size: var(--text-small); cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease); }
.wa-scr-btn:hover:not(:disabled) { border-color: var(--accent-text); color: var(--accent-text); }
.wa-scr-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 1px; }
.wa-scr-btn:disabled { color: var(--muted); cursor: not-allowed; }
.wa-scr-btn--primary { background: var(--ink); border-color: var(--ink); color: var(--paper); }
.wa-scr-btn--primary:hover:not(:disabled) { color: var(--paper); border-color: var(--ink); }
.wa-scr-style-actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3); }
.wa-scr-style-active { font-family: var(--font-mono); font-size: var(--text-micro);
  color: var(--muted); }
.wa-scr-style-active strong { color: var(--ink); font-weight: var(--fw-semibold); }

/* ── Style (thème) : layout deux colonnes (grille de thèmes | aperçu live sticky) ── */
.wa-scr-style-cols { display: grid; gap: var(--space-6);
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 1fr); align-items: start; }
@media (max-width: 860px) { .wa-scr-style-cols { grid-template-columns: 1fr; } }

/* ── Style (thème) : grille de cartes de thème ── */
.wa-scr-style-grid { display: grid; gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
.wa-scr-theme { display: flex; flex-direction: column; gap: var(--space-3);
  padding: var(--space-4); border: 1px solid var(--hairline-strong);
  border-radius: var(--radius-md); background: var(--paper); color: var(--ink);
  text-align: left; cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); }
.wa-scr-theme:hover { border-color: var(--accent-text); box-shadow: var(--shadow-card-hover); }
.wa-scr-theme:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.wa-scr-theme.is-active { border-color: var(--accent-text);
  box-shadow: 0 0 0 1px var(--accent-text); }
.wa-scr-theme-swatches { display: flex; gap: var(--space-2); }
.wa-scr-theme-chip { width: 28px; height: 28px; border-radius: var(--radius-sm);
  border: 1px solid var(--hairline-strong); }
.wa-scr-theme-row { display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-2); }
.wa-scr-theme-name { font-family: var(--font-sans); font-size: var(--text-small);
  font-weight: var(--fw-semibold); color: var(--ink); }
.wa-scr-theme-kind { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; padding: 2px var(--space-2);
  border-radius: var(--radius-pill); border: 1px solid var(--hairline-strong); color: var(--muted); }
.wa-scr-theme-kind--demo { color: var(--accent-text); border-color: var(--accent-text); }
.wa-scr-theme-kind--saved { color: var(--complementary); border-color: var(--complementary); }
.wa-scr-theme-check { font-family: var(--font-mono); font-size: var(--text-micro);
  color: var(--accent-text); }
.wa-scr-style-empty { padding: var(--space-4); font-family: var(--font-mono);
  font-size: var(--text-micro); color: var(--muted); border: 1px dashed var(--hairline-strong);
  border-radius: var(--radius-sm); }

/* ── Style (thème) : panneau d'aperçu LIVE (DOM inline var(--token), repeint à l'application) ── */
.wa-scr-style-preview { position: sticky; top: var(--space-4);
  border: 1px solid var(--hairline-strong); border-radius: var(--radius-md); overflow: hidden;
  background: var(--paper); }
.wa-scr-prev-head { display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-2); padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--hairline); background: var(--paper-2); }
.wa-scr-prev-tag { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--muted); }
.wa-scr-prev-body { display: flex; flex-direction: column; gap: var(--space-4);
  padding: var(--space-6); background: var(--paper); }
.wa-scr-prev-kicker { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--accent-text); }
.wa-scr-prev-title { margin: 0; font-family: var(--font-sans); font-size: var(--text-h3);
  line-height: var(--leading-h3); letter-spacing: var(--tracking-display);
  font-weight: var(--fw-semibold); color: var(--ink); }
.wa-scr-prev-lede { margin: 0; font-size: var(--text-small); line-height: 1.55; color: var(--ink-2); }
.wa-scr-prev-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); }
.wa-scr-prev-cta { padding: var(--space-2) var(--space-4); border-radius: var(--radius-sm);
  border: 1px solid var(--ink); background: var(--ink); color: var(--paper);
  font-family: var(--font-mono); font-size: var(--text-small); }
.wa-scr-prev-cta--ghost { background: transparent; color: var(--accent-text);
  border-color: var(--accent-text); }
.wa-scr-prev-ink { display: flex; flex-direction: column; gap: var(--space-2);
  padding: var(--space-4); border-radius: var(--radius-sm); background: var(--ink); color: var(--paper); }
.wa-scr-prev-ink-label { font-family: var(--font-mono); font-size: var(--text-micro);
  letter-spacing: var(--tracking-mono); text-transform: uppercase; color: var(--paper); opacity: 0.7; }
.wa-scr-prev-ink-text { font-family: var(--font-sans); font-size: var(--text-small); color: var(--paper); }
`;

/** Injecte la feuille de style scopée une seule fois (dédupliquée par id). */
export function useScreensStyles(): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_ID;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}
