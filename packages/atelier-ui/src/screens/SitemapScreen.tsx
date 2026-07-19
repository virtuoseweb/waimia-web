// @waimia/atelier-ui · screens · SitemapScreen : canvas sitemap des VRAIES pages du site (N3).
//
// Ouvrir le projet Waimia affiche cette vue : le sitemap réel, groupé et ordonné selon SITE_GROUPS.
// Chaque groupe = en-tête + rangée de cartes de pages ; chaque page = colonne de sections en
// wireframe minimaliste (label court + type), avec badge « éditable » vs « template ». Vue
// d'ensemble LÉGÈRE (DOM texte simple, aucun iframe/thumbnail live) pour tenir 118 pages sans coût.
// Composant PUR : toutes les données arrivent en props (SitemapGroup[] + SitemapPage[]).
//
//   - page éditable  → carte cliquable (bouton) qui charge la page réelle dans l'éditeur.
//   - page template  → carte atténuée + lien « voir la page » vers sa route publique.
//
// 0 nouveau token DS (rule 60), 0 valeur en dur, 0 tiret cadratin U+2014, UI en français.

import React, { useMemo } from 'react';
import { useScreensStyles } from './styles';
import type { SitemapGroup, SitemapPage } from './types';

export interface SitemapScreenProps {
  /** Nom du projet (titre de la vue). */
  projectName: string;
  /** Groupes de sitemap, DANS l'ordre d'affichage (= ordre de SITE_GROUPS). */
  groups: SitemapGroup[];
  /** Toutes les pages réelles du site (rattachées à un groupe par `page.group`). */
  pages: SitemapPage[];
  /** Retour au dashboard « Projets ». */
  onBack: () => void;
  /** Ouvre une page ÉDITABLE dans l'éditeur (chargée avec ses vraies sections). */
  onOpenPage: (route: string) => void;
  /** Route en cours de chargement (désactive la carte le temps du fetch), ou ''. */
  openingRoute?: string;
  /** Message d'erreur de chargement d'une page, ou ''. */
  error?: string;
}

/** Carte d'une page : wireframe de ses sections + badge éditable/template. */
function PageCard(props: {
  page: SitemapPage;
  opening: boolean;
  onOpen: (route: string) => void;
}): React.ReactElement {
  const { page, opening, onOpen } = props;
  const sectionRows = page.sections.map((s, i) => (
    <div
      key={`${s.type}-${i}`}
      className={`wa-scr-sec${s.background === 'ink' ? ' wa-scr-sec--ink' : ''}`}
    >
      <span className="wa-scr-sec-bar" aria-hidden="true" />
      <span className="wa-scr-sec-label">{s.label}</span>
      <span className="wa-scr-sec-type">{s.type}</span>
    </div>
  ));

  const head = (
    <span className="wa-scr-page-head">
      <span className="wa-scr-page-title">{page.title}</span>
      <span className="wa-scr-page-route">{page.route}</span>
      <span className="wa-scr-page-badges">
        {page.editable ? (
          <span className="wa-scr-badge wa-scr-badge--editable">éditable</span>
        ) : (
          <span className="wa-scr-badge wa-scr-badge--template">template</span>
        )}
        <span className="wa-scr-group-count">{page.sections.length} sections</span>
      </span>
    </span>
  );

  // Page éditable → la carte entière est un bouton qui charge la page dans l'éditeur.
  if (page.editable && page.file) {
    return (
      <button
        type="button"
        className="wa-scr-page"
        data-testid="sitemap-page-card"
        data-route={page.route}
        data-editable="true"
        disabled={opening}
        onClick={() => onOpen(page.route)}
      >
        {head}
        {sectionRows.length > 0 ? (
          <span className="wa-scr-page-sections">{sectionRows}</span>
        ) : (
          <span className="wa-scr-page-empty">Aucune section listée.</span>
        )}
      </button>
    );
  }

  // Page template / bespoke → carte atténuée non éditable + lien vers la page publique.
  return (
    <div
      className="wa-scr-page wa-scr-page--template"
      data-testid="sitemap-page-card"
      data-route={page.route}
      data-editable="false"
    >
      {head}
      {sectionRows.length > 0 ? (
        <div className="wa-scr-page-sections">{sectionRows}</div>
      ) : (
        <div className="wa-scr-page-empty">Rendu par template ou page bespoke (non composable).</div>
      )}
      <a className="wa-scr-page-link" href={page.route} target="_blank" rel="noreferrer">
        voir la page →
      </a>
    </div>
  );
}

export function SitemapScreen(props: SitemapScreenProps): React.ReactElement {
  useScreensStyles();
  const { projectName, groups, pages, onBack, onOpenPage, openingRoute = '', error = '' } = props;

  // Pages regroupées par id de groupe (préserve l'ordre de `pages` dans chaque groupe).
  const pagesByGroup = useMemo(() => {
    const m = new Map<string, SitemapPage[]>();
    for (const p of pages) {
      const arr = m.get(p.group) ?? [];
      arr.push(p);
      m.set(p.group, arr);
    }
    return m;
  }, [pages]);

  return (
    <div className="wa-scr">
      <div className="wa-scr-bar">
        <button type="button" className="wa-scr-back" onClick={onBack} data-testid="sitemap-back">
          <span aria-hidden="true">←</span> Projets
        </button>
        <h1 className="wa-scr-title" style={{ fontSize: 'var(--text-h3)' }}>
          Sitemap · {projectName}
        </h1>
        <span className="wa-scr-bar-count">
          {pages.length} pages · {groups.length} groupes
        </span>
      </div>

      {error && <p className="wa-scr-err">{error}</p>}

      <div className="wa-scr-groups">
        {groups.map((group) => {
          const groupPages = pagesByGroup.get(group.id) ?? [];
          if (groupPages.length === 0) return null;
          return (
            <section key={group.id} className="wa-scr-group" data-testid="sitemap-group">
              <header className="wa-scr-group-head">
                <span className="wa-scr-group-label">{group.label_fr}</span>
                <span className="wa-scr-group-count">{groupPages.length} pages</span>
              </header>
              <div className="wa-scr-group-pages">
                {groupPages.map((page) => (
                  <PageCard
                    key={page.route}
                    page={page}
                    opening={openingRoute === page.route}
                    onOpen={onOpenPage}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
