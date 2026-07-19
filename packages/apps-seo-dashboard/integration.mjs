/**
 * integration.mjs - AstroIntegration de l'app-as-plugin « dashboard SEO ».
 *
 * 1re extraction reelle de la convention apps-as-plugins (fiche 0027 D3) : une app
 * = un package `packages/apps-<nom>/` qui expose une AstroIntegration. L'integration
 * injecte SA route dans l'app hote via le mecanisme officiel `injectRoute` (hook
 * astro:config:setup) au lieu de poser un fichier dans `src/pages/`. Activer/desactiver
 * l'app = ajouter/retirer son integration du tableau `integrations` (pilote par le
 * registre `src/apps.config.ts` + flag `enabled`).
 *
 * Le contenu suivi + la memoire restent dans la collection host `dashboard-seo`
 * (astro:content) : l'entrypoint injecte est compile dans le contexte de l'app hote,
 * donc `getCollection('dashboard-seo')` resout normalement.
 *
 * @returns {import('astro').AstroIntegration}
 */
export default function waimiaSeoDashboard() {
  return {
    name: '@waimia/apps-seo-dashboard',
    hooks: {
      'astro:config:setup': ({ injectRoute, logger }) => {
        injectRoute({
          pattern: '/dashboard-seo',
          // URL absolue vers l'entrypoint reel du package (resout correctement meme
          // quand l'integration est importee par son nom de package via le symlink
          // workspace pnpm). Astro compile ce .astro dans le contexte de l'app hote.
          entrypoint: new URL('./src/DashboardSeoPage.astro', import.meta.url),
          // Le fichier exporte `prerender = true` ; on l'affirme pour eviter toute
          // ambiguite de detection sur une route injectee (page 100 % SSG).
          prerender: true,
        });
        if (logger && typeof logger.info === 'function') {
          logger.info('app-as-plugin « dashboard-seo » : route /dashboard-seo injectee (SSG).');
        }
      },
    },
  };
}
