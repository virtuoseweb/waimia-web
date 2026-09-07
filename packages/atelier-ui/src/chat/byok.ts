// @waimia/atelier-ui · chat · BYOK (bring-your-own-key) : preference de connexion au runtime LLM.
//
// SOURCE UNIQUE (rule 60 / anti-duplication) partagee par les deux surfaces du chat :
//   - l'ecran Reglages (ChatSettingsPanel) qui ECRIT la preference (fournisseur + cle),
//   - le host du chat (BuilderHost) qui la LIT pour ajouter les en-tetes a POST/GET /api/ds/chat.
//
// Securite (contrainte stricte de la mission) : la cle BYOK vit UNIQUEMENT dans le navigateur
// (localStorage), jamais persistee cote serveur, jamais loggee, jamais dans l'URL/query/cookie.
// Elle est transmise en EN-TETE de requete pour la duree d'un appel ; le serveur (provider.ts +
// chat.ts) la garde en memoire le temps de la requete puis l'oublie. Champ vide = comportement
// actuel inchange (le serveur retombe sur sa cle d'environnement) : 0 regression.
//
// 0 dependance, 0 token DS, 0 valeur en dur metier, 0 tiret cadratin U+2014.

/** Fournisseurs LLM selectionnables au runtime (miroir de ChatProviderId cote serveur). */
export type ByokProvider = 'anthropic' | 'openai';

/** Cle localStorage de la cle API BYOK (nom clair, comme demande). */
export const BYOK_KEY_STORAGE = 'waimia-chat-byok';
/** Cle localStorage du fournisseur choisi dans l'ecran Reglages. */
export const BYOK_PROVIDER_STORAGE = 'waimia-chat-provider';

/** En-tete transportant la cle BYOK (jamais l'URL, jamais un cookie). */
export const HEADER_CHAT_API_KEY = 'X-Chat-Api-Key';
/** En-tete transportant le fournisseur choisi (anthropic|openai). */
export const HEADER_CHAT_PROVIDER = 'X-Chat-Provider';

/** Preference de connexion lue depuis le navigateur. */
export interface ByokState {
  /** Fournisseur choisi (null = aucune preference explicite, le serveur decide). */
  provider: ByokProvider | null;
  /** Cle API collee par l'utilisateur (vide = pas de BYOK, la cle serveur est utilisee). */
  apiKey: string;
}

/** Normalise un identifiant de fournisseur brut (localStorage / champ) en ByokProvider ou null. */
export function normalizeByokProvider(raw: string | null | undefined): ByokProvider | null {
  return raw === 'anthropic' || raw === 'openai' ? raw : null;
}

/** Lit la preference depuis localStorage. SSR-safe : { null, '' } hors navigateur. */
export function loadByok(): ByokState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return { provider: null, apiKey: '' };
  }
  try {
    const provider = normalizeByokProvider(window.localStorage.getItem(BYOK_PROVIDER_STORAGE));
    const apiKey = (window.localStorage.getItem(BYOK_KEY_STORAGE) ?? '').trim();
    return { provider, apiKey };
  } catch {
    // Mode prive / storage bloque : pas de preference, jamais un crash.
    return { provider: null, apiKey: '' };
  }
}

/** Enregistre le fournisseur choisi (toujours) et la cle (si non vide, sinon l'efface). */
export function saveByok(provider: ByokProvider, apiKey: string): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(BYOK_PROVIDER_STORAGE, provider);
    const trimmed = apiKey.trim();
    if (trimmed) window.localStorage.setItem(BYOK_KEY_STORAGE, trimmed);
    else window.localStorage.removeItem(BYOK_KEY_STORAGE);
  } catch {
    // Quota / mode prive : la preference n'est pas persistee, pas de crash.
  }
}

/** Efface la cle BYOK (le fournisseur choisi reste ; la cle serveur reprend la main). */
export function clearByokKey(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.removeItem(BYOK_KEY_STORAGE);
  } catch {
    // no-op
  }
}

/**
 * En-tetes a joindre a une requete /api/ds/chat, derives d'un etat BYOK (defaut = localStorage).
 * Vide si aucune cle BYOK : le serveur retombe alors sur sa cle d'environnement (0 regression).
 */
export function byokHeaders(state: ByokState = loadByok()): Record<string, string> {
  const apiKey = state.apiKey.trim();
  if (!apiKey) return {};
  const headers: Record<string, string> = { [HEADER_CHAT_API_KEY]: apiKey };
  if (state.provider) headers[HEADER_CHAT_PROVIDER] = state.provider;
  return headers;
}
