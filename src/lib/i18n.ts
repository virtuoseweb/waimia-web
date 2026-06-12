// Waimia · i18n helpers
// FR par défaut à `/`, EN à `/en/*`. URL canonique différente par langue (meilleur SEO/GEO).

export const LANGS = ['fr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'fr';

/**
 * Détecte la langue depuis Astro.url.pathname.
 * Ex: '/en/offres' → 'en', '/offres' → 'fr'.
 */
export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';
}

/**
 * Préfixe une URL avec la langue active.
 * Le défaut FR n'a pas de préfixe (route à `/`), EN a `/en`.
 */
export function localizeHref(href: string, lang: Lang): string {
  if (!href.startsWith('/')) return href;
  if (lang === DEFAULT_LANG) return href;
  return `/${lang}${href === '/' ? '' : href}`;
}

/**
 * URL miroir pour le toggle FR/EN (même page, autre langue).
 */
export function alternateHref(pathname: string, currentLang: Lang): string {
  if (currentLang === 'en') return pathname.replace(/^\/en(\/|$)/, '/') || '/';
  return `/en${pathname === '/' ? '' : pathname}`;
}

/**
 * Codes hreflang ISO complets pour balises SEO.
 */
export const HREFLANG: Record<Lang, string> = { fr: 'fr-FR', en: 'en-US' };

// Pages statiques FR qui n'ont pas de miroir EN (→ pas de hreflang en-US à émettre).
const FR_ONLY_STATIC = new Set([
  // /offres/conseil retiré 2026-06-10 (R3 nav) : la page EN /en/offres/conseil
  // existe (200) — l'entrée FR-only était périmée (faussait hreflang + localisation nav).
  '/offres/revops', '/offres/site-web-ia',
  '/offres/site-web-ia-landing', '/offres/audit-maturite-ia',
  // DS Studio / Hero Lab : outils internes FR-only (pas de miroir /en/agence/ds-studio
  // ni /en/agence/hero-lab → sinon le switcher de langue du Header pointait vers un 404,
  // SR-42 §3). Déclarés FR-only → le toggle s'affiche désactivé (comme les autres pages
  // sans miroir EN), aucun /en/* 404 émis.
  '/agence/ds-studio', '/agence/hero-lab',
  '/ressources/blog', '/ressources/blog/brain-circuit', '/ressources/academy',
  '/ressources/changelog',
  '/ressources/cookbooks', '/ressources/cookbooks/claude-cowork-rollout',
  '/ressources/cookbooks/claude-skills-tutorial', '/ressources/cookbooks/mcp-server-deploy',
  '/ressources/livres-blancs', '/ressources/livres-blancs/ai-act-readiness',
  '/ressources/field-notes',
  // Pages FR-only « bare » (index sans sous-chemin) — non couvertes par les
  // préfixes à slash final ci-dessous (`startsWith('/x/')` ne matche pas `/x`).
  '/ressources/outils', '/ressources/personas', '/ressources/veille-ia',
  '/technologies/virtuoseos',
  // Thank-you pages post-conversion FR-only (audit/livre-blanc/newsletter SONT bilingues → exclus).
  '/bienvenue/contact', '/bienvenue/commande', '/bienvenue/formation', '/bienvenue/abonnement',
  '/glossaire', '/secteurs', '/secteurs/finance-compta',
  '/secteurs/industrie', '/secteurs/services-b2b',
  '/equipe', '/archive', '/ecole', '/commerce',
  // Pages légales FR-only (droit français, pas de miroir /en/) — même cas que trust-center.
  '/mentions-legales', '/cgv', '/politique-confidentialite',
]);

// Préfixes de routes FR-only (contenu dynamique sans équivalent EN).
const FR_ONLY_PREFIXES = [
  '/glossaire/', '/secteurs/',
  '/ressources/cookbooks/', '/ressources/livres-blancs/', '/ressources/field-notes/',
  '/ressources/personas/', '/ressources/veille-ia/',
  '/ressources/categorie/', '/ressources/outils/', '/ressources/silo/', '/ressources/tag/',
  '/equipe/', '/ecole/', '/commerce/',
  '/categories/', // catalogue marketplace (FR-only, v1.5)
];

// Routes EN-only : pages servies uniquement sous /en/* sans miroir FR
// (le FR a été redirigé ailleurs — cf astro.config redirects /ressources/cas → /cas).
// Empêche l'émission d'un hreflang="fr-FR" pointant vers une 404.
const EN_ONLY_PREFIXES = [
  '/en/ressources/cas', // /en/ressources/cas + /en/ressources/cas/{plateau,halcyon,caserne,northbound,virtuoseos}
];

// Segments FR-only au milieu du chemin (pas un préfixe) — ex. tunnels de conversion
// /offres/<offre>/tunnel/{1-4} : FR-only, aucun miroir /en/.../tunnel/.
const FR_ONLY_PATH_SEGMENTS = ['/tunnel/'];

/**
 * Retourne `true` si la page à `pathname` a un miroir anglais.
 * Utilisé pour n'émettre `hreflang="en-US"` que sur les pages effectivement traduites.
 */
export function hasBilingualMirror(pathname: string): boolean {
  // Pages EN-only (servies sous /en/* sans miroir FR) → pas de hreflang fr-FR (404).
  if (EN_ONLY_PREFIXES.some((p) => pathname.startsWith(p))) return false;
  if (FR_ONLY_STATIC.has(pathname)) return false;
  // Segments FR-only au milieu du chemin (ex. /offres/<offre>/tunnel/N).
  if (FR_ONLY_PATH_SEGMENTS.some((s) => pathname.includes(s))) return false;
  return !FR_ONLY_PREFIXES.some((p) => pathname.startsWith(p));
}

/**
 * Tire la chaîne dans la bonne langue depuis un objet { en, fr }.
 */
export function t<T extends Record<Lang, string>>(o: T, lang: Lang): string {
  return o[lang];
}
