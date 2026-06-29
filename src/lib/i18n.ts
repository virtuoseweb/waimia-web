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
  // Refonte v7 2026-06-29 · hub /offres supprimé. L'audit de maturité migre en
  // page top-level FR-only /audit-maturite-ia (pas de miroir /en).
  '/audit-maturite-ia',
  // DS Studio / Hero Lab (anciens chemins /agence/*) et leur nouvelle destination /library/* :
  // outils internes FR-only (pas de miroir /en/agence/ds-studio ni /en/library/studio etc.
  // → sinon le switcher de langue du Header pointait vers un 404, SR-42 §3).
  // /agence/* conservés défensivement (redirects 301 depuis cutover 2026-06-16).
  // Déclarés FR-only → le toggle s'affiche désactivé (comme les autres pages sans miroir EN),
  // aucun /en/* 404 émis.
  '/agence/ds-studio', '/agence/hero-lab',
  '/library', '/library/studio', '/library/hero-lab',
  '/blog', '/blog/brain-circuit', '/ressources/academy',
  '/ressources/changelog',
  '/ressources/cookbooks', '/ressources/cookbooks/claude-cowork-rollout',
  '/ressources/cookbooks/claude-skills-tutorial', '/ressources/cookbooks/mcp-server-deploy',
  '/ressources/livres-blancs', '/ressources/livres-blancs/ai-act-readiness',
  '/ressources/field-notes',
  // Pages FR-only « bare » (index sans sous-chemin) — non couvertes par les
  // préfixes à slash final ci-dessous (`startsWith('/x/')` ne matche pas `/x`).
  '/ressources/outils', '/ressources/personas', '/ressources/veille-ia',
  // Expertise Claude : page d'autorité FR-only (pas de miroir /en/expertise-claude).
  // Remplace l'ancien /technologies/* (route tree retiré, SEO état final §0ter).
  '/expertise-claude',
  // Thank-you pages post-conversion FR-only (livre-blanc/newsletter SONT bilingues → exclus).
  // SEO état final : bienvenue/{commande,formation,abonnement,audit} + /secteurs/* supprimés.
  '/bienvenue/contact',
  '/equipe', '/archive',
  // Pages légales FR-only (droit français, pas de miroir /en/) — même cas que trust-center.
  '/mentions-legales', '/cgv', '/politique-confidentialite',
]);

// Préfixes de routes FR-only (contenu dynamique sans équivalent EN).
const FR_ONLY_PREFIXES = [
  '/ressources/cookbooks/', '/ressources/livres-blancs/', '/ressources/field-notes/',
  '/ressources/personas/', '/ressources/veille-ia/',
  '/ressources/categorie/', '/ressources/outils/', '/ressources/silo/', '/ressources/tag/',
  '/equipe/',
  '/categories/', // catalogue marketplace (FR-only, v1.5)
];

// Routes EN-only : pages servies uniquement sous /en/* sans miroir FR
// (le FR a été redirigé ailleurs — cf astro.config redirects /ressources/cas → /cas-clients).
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
  // P0.2-I · lancement FR monolingue : le miroir /en n'est plus généré.
  // On force `false` → plus de hreflang="en-US" émis (Base.astro) ni de
  // switcher de langue (Header.astro) pointant vers un /en/* en 404.
  // Infra i18n conservée : retirer ce court-circuit pour réactiver l'EN
  // (la logique data-driven FR_ONLY/EN_ONLY ci-dessous reste valide).
  return false;
  /* eslint-disable no-unreachable */
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
