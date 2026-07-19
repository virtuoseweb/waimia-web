// Waimia · apps.config.ts · REGISTRE des apps-as-plugins (fiche 0027 D3)
//
// Convention : une « app » interne (outil pro : dashboard SEO, DS Studio, builder…)
// vit dans son propre package `packages/apps-<nom>/` et expose une AstroIntegration
// qui injecte SA route dans l'app hote via `injectRoute` (mecanisme officiel Astro).
// Ce fichier est la SOURCE UNIQUE qui declare quelles apps existent et lesquelles sont
// activees. `astro.config.mjs` le consomme : les apps `enabled` porteuses d'une
// `integration` sont ajoutees au tableau `integrations` d'Astro.
//
// Activer / desactiver une app = basculer son `enabled` ici (aucune autre edition).
//   enabled: true  → route injectee (200)
//   enabled: false → integration retiree → route inexistante (404)
//
// ─── Deux formes d'entree ───────────────────────────────────────────────────
//  1. App EXTRAITE (vraie integration) : `integration` = l'AstroIntegration du
//     package. C'est le cas cible. Seul `seoDashboard` est extrait a ce stade
//     (1re extraction reelle de la convention).
//  2. Façade DECLARATIVE (`facade: true`, pas d'`integration`) : l'app existe et
//     reste activee, mais son code n'est PAS encore deplace en package (decision D3 :
//     DS Studio + builder restent dans l'app hote pour l'instant). Le registre les
//     documente pour donner la carte complete des apps ; elles ne modifient pas le
//     tableau `integrations` (routes servies par leurs fichiers actuels sous src/pages/).
//
// ─── Ajouter une nouvelle app (recette) ──────────────────────────────────────
//  1. `packages/apps-<nom>/` : package.json (modele = apps-seo-dashboard) + le code.
//  2. `integration.mjs` : AstroIntegration qui `injectRoute({ pattern, entrypoint })`.
//  3. Ici : importer l'integration + ajouter `{ enabled: true, integration: x() }`.
//  4. Rien d'autre : `astro.config.mjs` recolte automatiquement les apps enabled.

// Import par chemin relatif vers le package (et non par le nom `@waimia/apps-seo-dashboard/integration`) :
// evite d'ajouter une dependance workspace au package.json racine (hors scope de la 1re extraction).
// Le package expose quand meme l'export `./integration` pour de futurs consommateurs par nom.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import waimiaSeoDashboard from '../packages/apps-seo-dashboard/integration.mjs';
import type { AstroIntegration } from 'astro';

export interface AppEntry {
  /** Faux → l'app est retiree du build (route 404). */
  enabled: boolean;
  /** AstroIntegration de l'app extraite (injecte sa route). Absente pour une façade. */
  integration?: AstroIntegration;
  /** Vrai → app declaree mais NON extraite (code encore dans l'app hote). */
  facade?: boolean;
  /** Route publique servie par l'app (documentation / carte des apps). */
  route?: string;
}

// ─── Store d'etat (overrides) ────────────────────────────────────────────────
// src/data/apps-state.json = { "apps": { "<id>": true|false } }. VIDE ({}) = tous
// les defauts ci-dessous s'appliquent (0 changement de comportement). Un override
// { "<id>": false } desactive l'app (route 404). Ecrit par l'endpoint dev
// PATCH /api/ds/apps (DS Studio). Lu ICI au chargement de la config Astro : un toggle
// ne prend effet QU'AU redemarrage d'`astro dev` (la config n'est evaluee qu'au boot).
type AppsStateFile = { apps?: Record<string, boolean> };

function readAppsState(): Record<string, boolean> {
  try {
    const raw = readFileSync(fileURLToPath(new URL('./data/apps-state.json', import.meta.url)), 'utf8');
    const parsed = JSON.parse(raw) as AppsStateFile;
    return parsed && parsed.apps && typeof parsed.apps === 'object' ? parsed.apps : {};
  } catch {
    // Fichier absent/illisible -> aucun override (comportement par defaut).
    return {};
  }
}

const APPS_STATE = readAppsState();
const resolveEnabled = (id: string, defaultEnabled: boolean): boolean =>
  typeof APPS_STATE[id] === 'boolean' ? (APPS_STATE[id] as boolean) : defaultEnabled;

// ─── Definitions de base (defauts) ───────────────────────────────────────────
// `defaultEnabled` = valeur si aucun override dans apps-state.json.
const APP_DEFS: Record<string, { defaultEnabled: boolean; integration?: AstroIntegration; facade?: boolean; route?: string }> = {
  // App extraite : dashboard SEO interne (POC git-based). Route /dashboard-seo injectee.
  seoDashboard: {
    defaultEnabled: true,
    integration: waimiaSeoDashboard(),
    route: '/dashboard-seo',
  },
  // Façades declaratives (code non deplace, decision D3) : activees, servies par
  // leurs pages actuelles sous src/pages/library/*. Documentees ici pour la carte.
  dsStudio: {
    defaultEnabled: true,
    facade: true,
    route: '/library/studio',
  },
  builder: {
    defaultEnabled: true,
    facade: true,
    route: '/library/builder',
  },
};

export const APPS: Record<string, AppEntry> = Object.fromEntries(
  Object.entries(APP_DEFS).map(([id, def]) => [
    id,
    {
      enabled: resolveEnabled(id, def.defaultEnabled),
      ...(def.integration ? { integration: def.integration } : {}),
      ...(def.facade ? { facade: true } : {}),
      ...(def.route ? { route: def.route } : {}),
    },
  ]),
);

/** Etat effectif d'une app (consomme par l'endpoint GET /api/ds/apps + la carte des apps). */
export interface AppState {
  id: string;
  /** Etat CONFIGURE (defaut + override apps-state.json, relu a chaud). Effet au redemarrage. */
  enabled: boolean;
  /** Etat ACTIF servi MAINTENANT (fige au boot d'astro dev). Diverge de `enabled` si un toggle
   *  a ete fait sans redemarrage encore. */
  active: boolean;
  /** Vrai = vraie integration extraite (injecte sa route). */
  extracted: boolean;
  /** Vrai = façade declarative (code encore dans l'app hote). */
  facade: boolean;
  route?: string;
}

/**
 * Liste des apps avec leur etat EFFECTIF. `enabled` est relu A CHAUD depuis apps-state.json
 * (reflete un toggle immediatement, effet reel au redemarrage) ; `active` est fige au boot
 * (ce qui est reellement servi). L'endpoint /api/ds/apps s'en sert pour une UX honnete.
 */
export function listAppsState(): AppState[] {
  const store = readAppsState();
  return Object.entries(APP_DEFS).map(([id, def]) => ({
    id,
    enabled: typeof store[id] === 'boolean' ? (store[id] as boolean) : def.defaultEnabled,
    active: APPS[id]?.enabled ?? def.defaultEnabled,
    extracted: Boolean(def.integration),
    facade: Boolean(def.facade),
    ...(def.route ? { route: def.route } : {}),
  }));
}

/** Integrations Astro des apps activees ET extraites (consomme par astro.config.mjs). */
export const enabledAppIntegrations: AstroIntegration[] = Object.values(APPS)
  .filter((app) => app.enabled && app.integration)
  .map((app) => app.integration as AstroIntegration);
