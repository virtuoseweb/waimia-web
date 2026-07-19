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
import waimiaSeoDashboard from '../packages/apps-seo-dashboard/integration.mjs';
import type { AstroIntegration } from 'astro';

export interface AppEntry {
  /** Faux → l'app est retiree du build (route 404). */
  enabled: boolean;
  /** AstroIntegration de l'app extraite (injecte sa route). Absente pour une façade. */
  integration?: AstroIntegration;
  /** Vrai → app declaree mais NON extraite (code encore dans l'app hote). */
  facade?: boolean;
}

export const APPS: Record<string, AppEntry> = {
  // App extraite : dashboard SEO interne (POC git-based). Route /dashboard-seo injectee.
  seoDashboard: {
    enabled: true,
    integration: waimiaSeoDashboard(),
  },
  // Façades declaratives (code non deplace, decision D3) : activees, servies par
  // leurs pages actuelles sous src/pages/library/*. Documentees ici pour la carte.
  dsStudio: {
    enabled: true,
    facade: true,
  },
  builder: {
    enabled: true,
    facade: true,
  },
};

/** Integrations Astro des apps activees ET extraites (consomme par astro.config.mjs). */
export const enabledAppIntegrations: AstroIntegration[] = Object.values(APPS)
  .filter((app) => app.enabled && app.integration)
  .map((app) => app.integration as AstroIntegration);
