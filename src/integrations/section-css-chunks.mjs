// Waimia · chunks serveur des composants de section (CSS par page).
//
// Les sections sont rendues via des frontières `?astroPropagatedAssets` (src/lib/lazy-section.ts) :
// Astro injecte sur la page la CSS de TOUS les chunks atteints par la section. Or Rollup range un
// module partagé « déjà chargé » par tous les importeurs (ex. Kicker, FormGuard, RelatedLinks,
// aussi importés par le layout Base) dans le chunk de Base.astro, dont la CSS contient la feuille
// globale : une section de formulaire réinjectait ~130 Ko de CSS global APRÈS les styles de page.
//
// Remède : dans les environnements serveur (prerender, ssr) seulement, chaque composant `.astro`
// atteignable depuis un module de section (src/sections/) reçoit son propre chunk, donc sa propre
// feuille. Le client (îles React) n'est pas concerné. Preuve : aucune feuille propagée ne contient
// la feuille globale (cf rapport perf/css-lazy, `cssmeasure.py`).
const SERVER_ENVS = new Set(['ssr', 'prerender']);
const SECTION_DIR = '/src/sections/';

function chunkName(file, root) {
  const rel = file.startsWith(root) ? file.slice(root.length) : file;
  return 'cmp-' + rel.replace(/^\/+/, '').replace(/\.astro$/, '').replace(/[^A-Za-z0-9]+/g, '-');
}

export function sectionCssChunks() {
  let root = '';
  return {
    name: 'waimia:section-css-chunks',
    configResolved(config) {
      root = config.root.replace(/\/+$/, '');
    },
    configEnvironment(name) {
      if (!SERVER_ENVS.has(name)) return;
      const memo = new Map();
      // Vrai si un module de section importe (transitivement) ce module.
      function reachedFromSection(id, getModuleInfo, seen) {
        if (memo.has(id)) return memo.get(id);
        if (seen.has(id)) return false;
        seen.add(id);
        const info = getModuleInfo(id);
        let hit = false;
        if (info) {
          for (const imp of [...info.importers, ...info.dynamicImporters]) {
            if (imp.includes(SECTION_DIR) || reachedFromSection(imp, getModuleInfo, seen)) {
              hit = true;
              break;
            }
          }
        }
        // Seul un « vrai » est mémorisé : un « faux » obtenu en coupant un cycle est partiel.
        if (hit) memo.set(id, true);
        return hit;
      }
      return {
        build: {
          rollupOptions: {
            output: {
              manualChunks(id, { getModuleInfo }) {
                const file = id.split('?')[0];
                if (!file.endsWith('.astro') || !file.includes('/src/')) return undefined;
                if (file.includes('/src/pages/') || file.includes('/src/layouts/')) return undefined;
                // Les sous-modules de style (`X.astro?astro&type=style`) suivent leur composant.
                if (!reachedFromSection(file, getModuleInfo, new Set())) return undefined;
                return chunkName(file, root);
              },
            },
          },
        },
      };
    },
  };
}
