// Waimia · surfaces INTERNES (catalogue DS, atelier, outils d'audit) · source unique.
//
// Ces chemins ne font pas partie du site public : ils servent à concevoir et auditer le
// site. Ils ne doivent être ni explorés, ni indexés, ni liés depuis une page publique.
// Module en JS pur (0 dépendance) pour être importable à la fois par astro.config.mjs,
// par les routes Astro (getStaticPaths) et par les scripts de gate (node scripts/*.mjs).
//
// Règle de build :
//   · production Vercel (VERCEL_ENV=production)  → surfaces internes NON générées.
//   · preview Vercel, CI, build local, astro dev → surfaces internes générées (le sweep
//     GF-1, les e2e et l'atelier en dépendent).
//   · WAIMIA_INTERNAL_TOOLS=0 | 1 force l'un ou l'autre (ex. reproduire la prod en local :
//     `WAIMIA_INTERNAL_TOOLS=0 pnpm build`).

/** Préfixes de chemin des surfaces internes (segment entier : `/library` couvre `/library/x`). */
export const INTERNAL_PATH_PREFIXES = [
  '/preview',
  '/preview-v',
  '/preview-swi',
  '/library',
  '/components',
  '/categories',
  '/compare',
  '/dashboard-seo',
  '/agence/cartographie',
  '/agence/design-system',
  '/agence/ds-studio',
  '/agence/hero-lab',
];

/** Endpoints serverless qui n'existent que pour l'atelier interne. */
export const INTERNAL_API_PREFIXES = ['/api/ds'];

/** Vrai si `pathname` appartient à une surface interne. */
export function isInternalPath(pathname) {
  const p = String(pathname || '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  return [...INTERNAL_PATH_PREFIXES, ...INTERNAL_API_PREFIXES].some(
    (prefix) => p === prefix || p.startsWith(`${prefix}/`),
  );
}

/** Vrai si le build courant doit générer les surfaces internes. */
export function internalToolsEnabled(env = process.env) {
  const forced = env.WAIMIA_INTERNAL_TOOLS;
  if (forced === '0' || forced === 'false') return false;
  if (forced === '1' || forced === 'true') return true;
  return env.VERCEL_ENV !== 'production';
}
