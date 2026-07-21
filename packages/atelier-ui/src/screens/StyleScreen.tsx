// @waimia/atelier-ui · screens · StyleScreen : 4e vue du pipeline builder, le STYLE de la page (N3.5).
//
// Position dans le flux (réf docs/specs/05 §Message 4, adapté au moteur réel) :
//   dashboard → sitemap → (ouvrir une page) → STYLE → éditeur (wireframe + design fusionnés).
//
// Rôle : choisir un THÈME (jeu de tokens coordonnés accent/paper/ink...) pour la page en cours de
// composition, avec APERÇU LIVE. L'application se fait par le même mécanisme que le DS Studio (P2.8) :
// l'hôte pose les tokens sur `document.documentElement` (var(--token) → repeint tout le sous-arbre du
// builder en direct). Le panneau d'aperçu ci-dessous est du DOM INLINE (0 iframe) bâti sur var(--token)
// → il repeint visiblement à chaque application (support de la preuve GF-1 visuelle).
//
// PORTÉE HONNÊTE (cf rapport de brique) : le choix est appliqué en LIVE, SESSION/aperçu (portée = la
// page ouverte dans le builder), PAS persisté globalement au site. Le seul store de thème existant
// (POST /api/ds/preset) persiste GLOBALEMENT (rebuild du site) : l'appliquer ici contredirait la portée
// « page en cours, pas le site entier ». Un store de thème PAGE-SCOPED n'existe pas encore côté backend
// → hors scope de cette brique (documenté). On livre donc la version minimale honnête : appliquer un
// thème réel (démos + presets persistés) à la page courante, aperçu live, réinitialisation.
//
// Composant PUR : toutes les données arrivent en props ; aucune connaissance des stores app.
//
// 0 nouveau token DS (rule 60), 0 valeur en dur, 0 tiret cadratin U+2014, UI en français.

import React, { useCallback } from 'react';
import { useScreensStyles } from './styles';
import type { StyleTheme } from './types';

export interface StyleScreenProps {
  /** Libellé de la page en cours (route réelle, ou « Nouveau brouillon »). */
  pageLabel: string;
  /** Thèmes réels disponibles (démos compile-time + presets persistés), injectés par l'hôte. */
  themes: StyleTheme[];
  /** Id du thème actuellement appliqué en live, ou null (baseline du fichier tokens.css). */
  activeThemeId: string | null;
  /** Applique un thème en LIVE (l'hôte pose les tokens sur document.documentElement). */
  onApply: (id: string) => void;
  /** Réinitialise à la baseline (l'hôte retire les overrides de tokens). */
  onReset: () => void;
  /** Retour à l'écran précédent (sitemap si page réelle, sinon dashboard). */
  onBack: () => void;
  /** Continue vers l'éditeur (design + wireframe). */
  onContinue: () => void;
}

/** Chip de couleur d'aperçu : la valeur littérale vient des tokens du thème (données, pas hardcode). */
function Swatch(props: { color?: string }): React.ReactElement | null {
  if (!props.color) return null;
  return <span className="wa-scr-theme-chip" style={{ background: props.color }} aria-hidden="true" />;
}

/** Une carte de thème : palette d'aperçu + nom + origine (démo/persisté) + état sélectionné. */
function ThemeCard(props: {
  theme: StyleTheme;
  active: boolean;
  onApply: (id: string) => void;
}): React.ReactElement {
  const { theme, active, onApply } = props;
  return (
    <button
      type="button"
      className={`wa-scr-theme${active ? ' is-active' : ''}`}
      onClick={() => onApply(theme.id)}
      data-testid="style-theme-card"
      data-theme-id={theme.id}
      aria-pressed={active}
    >
      <span className="wa-scr-theme-swatches">
        <Swatch color={theme.swatch.accent} />
        <Swatch color={theme.swatch.paper} />
        <Swatch color={theme.swatch.ink} />
      </span>
      <span className="wa-scr-theme-row">
        <span className="wa-scr-theme-name">{theme.label}</span>
        <span
          className={`wa-scr-theme-kind wa-scr-theme-kind--${theme.kind}`}
        >
          {theme.kind === 'demo' ? 'démo' : 'thème'}
        </span>
      </span>
      {active && <span className="wa-scr-theme-check">Appliqué</span>}
    </button>
  );
}

export function StyleScreen(props: StyleScreenProps): React.ReactElement {
  useScreensStyles();
  const { pageLabel, themes, activeThemeId, onApply, onReset, onBack, onContinue } = props;

  const active = themes.find((t) => t.id === activeThemeId) ?? null;

  // Aléatoire : applique un thème réel au hasard (parmi la liste disponible), différent de l'actif si
  // possible. Honnête : ne génère PAS de nouveau concept, pioche uniquement parmi les thèmes réels.
  const shuffle = useCallback(() => {
    if (themes.length === 0) return;
    const pool = themes.length > 1 ? themes.filter((t) => t.id !== activeThemeId) : themes;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) onApply(pick.id);
  }, [themes, activeThemeId, onApply]);

  return (
    <div className="wa-scr" data-testid="style-screen">
      <div className="wa-scr-bar">
        <button type="button" className="wa-scr-back" onClick={onBack} data-testid="style-back">
          <span aria-hidden="true">←</span> Retour
        </button>
        <h1 className="wa-scr-title" style={{ fontSize: 'var(--text-h3)' }}>
          Style · {pageLabel}
        </h1>
        <span className="wa-scr-bar-count">{themes.length} thèmes</span>
      </div>

      <header className="wa-scr-head">
        <span className="wa-scr-kicker">Builder visuel · style de la page</span>
        <h2 className="wa-scr-title" style={{ fontSize: 'var(--text-h2)' }}>
          Choisissez une direction visuelle
        </h2>
        <p className="wa-scr-lede">
          Appliquez un thème de tokens coordonnés (accent, fond, encre) à la page en cours. L'aperçu se
          repeint en direct. Ce choix reste local à la composition en cours ; il n'est pas publié sur le
          site tant que vous ne le déployez pas depuis le DS Studio.
        </p>
      </header>

      <div className="wa-scr-style-actions">
        <button
          type="button"
          className="wa-scr-btn"
          onClick={shuffle}
          disabled={themes.length === 0}
          data-testid="style-shuffle"
        >
          Aléatoire
        </button>
        <button
          type="button"
          className="wa-scr-btn"
          onClick={onReset}
          disabled={activeThemeId === null}
          data-testid="style-reset"
        >
          Réinitialiser
        </button>
        <span className="wa-scr-style-active" data-testid="style-active">
          {active ? (
            <>
              Thème appliqué : <strong>{active.label}</strong>
            </>
          ) : (
            <>Aucun thème appliqué (baseline du Design System).</>
          )}
        </span>
        <button
          type="button"
          className="wa-scr-btn wa-scr-btn--primary"
          onClick={onContinue}
          data-testid="style-continue"
          style={{ marginLeft: 'auto' }}
        >
          Continuer vers l'éditeur →
        </button>
      </div>

      <div className="wa-scr-style-cols">
        <div>
          {themes.length > 0 ? (
            <div className="wa-scr-style-grid" data-testid="style-theme-grid">
              {themes.map((theme) => (
                <ThemeCard
                  key={theme.id}
                  theme={theme}
                  active={theme.id === activeThemeId}
                  onApply={onApply}
                />
              ))}
            </div>
          ) : (
            <p className="wa-scr-style-empty">
              Aucun thème disponible. Créez-en un depuis le DS Studio (« Thèmes &amp; presets »).
            </p>
          )}
        </div>

        {/* Aperçu LIVE : DOM inline sur var(--token) → repeint à l'application (preuve GF-1). */}
        <aside className="wa-scr-style-preview" data-testid="style-preview">
          <div className="wa-scr-prev-head">
            <span className="wa-scr-prev-tag">Aperçu live</span>
            <span className="wa-scr-prev-tag">{active ? active.label : 'baseline'}</span>
          </div>
          <div className="wa-scr-prev-body">
            <span className="wa-scr-prev-kicker">§ Aperçu du thème</span>
            <p className="wa-scr-prev-title" data-testid="style-preview-title">
              Un titre de section, sur fond clair
            </p>
            <p className="wa-scr-prev-lede">
              Le corps de texte se lit sur le fond de la page. Les boutons et l'accent suivent le thème
              sélectionné.
            </p>
            <div className="wa-scr-prev-actions">
              <span className="wa-scr-prev-cta" data-testid="style-preview-cta">
                Action principale
              </span>
              <span className="wa-scr-prev-cta wa-scr-prev-cta--ghost">Action secondaire</span>
            </div>
            <div className="wa-scr-prev-ink" data-testid="style-preview-ink">
              <span className="wa-scr-prev-ink-label">Variante encre</span>
              <span className="wa-scr-prev-ink-text">Contraste inversé, fond sombre du thème.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
