// @waimia/atelier-ui · screens · DashboardScreen : écran d'accueil « Projets » du builder (N2).
//
// À l'ouverture de /library/builder, on affiche ce dashboard (pas l'éditeur vide) : une carte
// « projet » Waimia (méta RÉELLES injectées par l'hôte) qui ouvre le canvas sitemap, et une carte
// « Nouveau brouillon » qui ouvre l'éditeur vierge. Composant PUR : toutes les données arrivent en
// props, aucune connaissance des stores app. Modèle Relume (Recent Projects).
//
// 0 nouveau token DS (rule 60), 0 valeur en dur, 0 tiret cadratin U+2014, UI en français.

import React from 'react';
import { useScreensStyles } from './styles';
import type { ProjectSummary } from './types';
import type { ChatUsage } from '../chat/types';

export interface DashboardScreenProps {
  /** Résumé du projet réel (compteurs déjà calculés côté hôte). */
  project: ProjectSummary;
  /** Ouvre le projet (bascule vers le canvas sitemap des vraies pages). */
  onOpenProject: () => void;
  /** Ouvre l'éditeur sur un document vierge (ancien comportement du builder). */
  onNewDraft: () => void;
  /** Compteur d'usage du chat-IA (Φ3, Q2b : plafond 50/jour visible). undefined = non chargé. */
  chatUsage?: ChatUsage;
}

export function DashboardScreen(props: DashboardScreenProps): React.ReactElement {
  useScreensStyles();
  const { project, onOpenProject, onNewDraft, chatUsage } = props;

  return (
    <div className="wa-scr">
      <header className="wa-scr-head">
        <span className="wa-scr-kicker">Builder visuel · vos projets</span>
        <h1 className="wa-scr-title">Vos projets</h1>
        <p className="wa-scr-lede">
          Ouvrez le projet Waimia pour retrouver le sitemap réel du site et éditer une page en
          détail, ou partez d'un brouillon vierge pour composer une page depuis le catalogue.
        </p>
        {chatUsage && (
          <p
            className="wa-scr-lede"
            data-testid="dash-chat-usage"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-small)',
              color: chatUsage.used >= chatUsage.limit ? 'var(--accent-text)' : 'var(--ink-2)',
            }}
          >
            Assistant IA : <strong>{chatUsage.used}/{chatUsage.limit}</strong> messages aujourd'hui
            {chatUsage.durable === false ? ' (compteur best-effort en mémoire)' : ''}.
          </p>
        )}
      </header>

      <div className="wa-scr-projects">
        <button
          type="button"
          className="wa-scr-card"
          onClick={onOpenProject}
          data-testid="dash-open-project"
        >
          <span className="wa-scr-card-mark" aria-hidden="true">
            {project.name.slice(0, 1).toUpperCase()}
          </span>
          <span className="wa-scr-card-name">{project.name}</span>
          <span className="wa-scr-card-domain">{project.domain}</span>
          <span className="wa-scr-card-meta">
            <span>
              <strong>{project.pageCount}</strong> pages
            </span>
            <span>
              <strong>{project.groupCount}</strong> groupes
            </span>
            <span>
              <strong>{project.sectionTypeCount}</strong> types de sections
            </span>
          </span>
        </button>

        <button
          type="button"
          className="wa-scr-card wa-scr-card--new"
          onClick={onNewDraft}
          data-testid="dash-new-draft"
        >
          <span className="wa-scr-card-plus" aria-hidden="true">
            +
          </span>
          <span className="wa-scr-card-name">Nouveau brouillon</span>
          <span className="wa-scr-card-domain">Composer une page depuis le catalogue</span>
        </button>
      </div>
    </div>
  );
}
