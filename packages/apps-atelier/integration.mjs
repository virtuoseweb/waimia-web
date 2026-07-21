/**
 * integration.mjs - AstroIntegration de l'app-as-plugin « atelier » (catalogue DS,
 * fiche section, DS Studio, builder, config, onboarding, hero-lab).
 *
 * 2e extraction reelle de la convention apps-as-plugins (fiche 0027 D3), apres
 * apps-seo-dashboard. Tout l'atelier — l'ensemble des routes /library/* qui vivaient
 * sous src/pages/library/** — est deplace dans ce package. L'integration re-injecte
 * CHAQUE route avec le MEME pattern d'URL via `injectRoute` (hook astro:config:setup),
 * donc les URLs publiques sont strictement inchangees.
 *
 * Les entrypoints sont compiles dans le contexte de l'app hote : les imports vers le
 * host (layouts/Base, components/ui, lib/section-registry, data/*, styles/*, scripts/*,
 * SectionsRenderer…) sont resolus par chemins relatifs vers la racine du repo ; les
 * packages workspace `@waimia/*` sont resolus par leur nom. L'endpoint dev /api/ds/*
 * et le renderer SectionsRenderer restent cote hote (non deplaces).
 *
 * Activer/desactiver l'atelier = basculer `enabled` sur l'entree `atelier` du registre
 * src/apps.config.ts (enabled:false -> toutes les routes /library/* deviennent 404).
 *
 * @returns {import('astro').AstroIntegration}
 */

// Table declarative des routes de l'atelier : { pattern, entry, prerender }.
// `entry` = chemin de l'entrypoint sous ./src/pages/library/ (mirror de l'ancienne
// arborescence src/pages/library/). `prerender` reprend l'export du fichier
// (toutes SSG sauf builder/render = SSR live).
const ATELIER_ROUTES = [
  { pattern: '/library',                    entry: 'index.astro',              prerender: true },
  { pattern: '/library/[type]',             entry: '[type].astro',             prerender: true },
  { pattern: '/library/[category]',         entry: '[category].astro',         prerender: true },
  { pattern: '/library/compare',            entry: 'compare.astro',            prerender: true },
  { pattern: '/library/hero-lab',           entry: 'hero-lab.astro',           prerender: true },
  { pattern: '/library/studio',             entry: 'studio.astro',             prerender: true },
  { pattern: '/library/manifest.json',      entry: 'manifest.json.ts',         prerender: true },
  { pattern: '/library/builder',            entry: 'builder/index.astro',      prerender: true },
  { pattern: '/library/builder/render',     entry: 'builder/render.astro',     prerender: false },
  { pattern: '/library/config',             entry: 'config/index.astro',       prerender: true },
  { pattern: '/library/config/onboarding',  entry: 'config/onboarding.astro',  prerender: true },
  { pattern: '/library/family',             entry: 'family/index.astro',       prerender: true },
  { pattern: '/library/family/[family]',    entry: 'family/[family].astro',    prerender: true },
  { pattern: '/library/section/[type].json', entry: 'section/[type].json.ts',  prerender: true },
];

export default function waimiaAtelier() {
  return {
    name: '@waimia/apps-atelier',
    hooks: {
      'astro:config:setup': ({ injectRoute, logger }) => {
        for (const { pattern, entry, prerender } of ATELIER_ROUTES) {
          injectRoute({
            pattern,
            entrypoint: new URL(`./src/pages/library/${entry}`, import.meta.url),
            prerender,
          });
        }
        if (logger && typeof logger.info === 'function') {
          logger.info(`app-as-plugin « atelier » : ${ATELIER_ROUTES.length} routes /library/* injectees.`);
        }
      },
    },
  };
}
