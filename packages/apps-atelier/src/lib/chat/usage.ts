// Waimia · Chat-IA in-app (Φ3) · plafond d'usage 50 messages/jour (Q2, cadrage §6).
//
// Q2 tranchee : LES DEUX mecanismes, pas un choix exclusif -> (a) plafond DUR 50 msg/jour ET
// (b) compteur VISIBLE dans le dashboard atelier. Ce module porte la PERSISTANCE du compteur, avec
// deux backends selon la config (meme logique provider-agnostique que le reste) :
//   - DURABLE : Upstash Redis REST (@upstash deja en deps du repo) si UPSTASH_REDIS_REST_URL +
//     UPSTASH_REDIS_REST_TOKEN sont en env -> compteur partage entre instances serverless, TTL 48h.
//   - BEST-EFFORT : compteur en memoire (Map module-scope) sinon -> par instance serverless, non
//     partage (suffisant pour l'usage interne v1 ; documente comme limite). Le SSG statique Vercel
//     n'a pas de DB en place pour ce cas d'usage : on n'introduit AUCUNE DB lourde (scope reduit Q4).
//
// Le compteur cote client (localStorage) sert seulement a l'UX (afficher N/50) ; l'autorite est ce
// controle serveur. Cle du jour = UTC (YYYY-MM-DD) : le compteur se remet a zero a minuit UTC.

/** Plafond dur par defaut (surchargeable par env CHAT_DAILY_LIMIT). */
export const DEFAULT_DAILY_LIMIT = 50;

/** Config d'env pour le store (lue par l'endpoint via import.meta.env). */
export interface UsageEnv {
  redisUrl?: string;
  redisToken?: string;
  limit?: number;
  fetchImpl?: typeof fetch;
}

/** Etat d'usage renvoye au client (compteur + plafond + nature du backend). */
export interface UsageState {
  used: number;
  limit: number;
  /** true = backend durable (Upstash) ; false = compteur en memoire best-effort. */
  durable: boolean;
}

export interface UsageStore {
  /** Lit l'usage courant (sans incrementer). */
  get(): Promise<UsageState>;
  /** Incremente d'1 et retourne le nouvel etat (appele APRES un message reussi). */
  increment(): Promise<UsageState>;
}

/** Cle du compteur pour le jour courant (UTC). */
function dayKey(): string {
  return `waimia:chat:usage:${new Date().toISOString().slice(0, 10)}`;
}

// ─── Backend en memoire (best-effort, par instance) ───
// Map module-scope : survit entre invocations d'une MEME instance serverless (pas partagee).
const memCounts = new Map<string, number>();

function purgeOldDays(current: string): void {
  for (const key of memCounts.keys()) {
    if (key !== current) memCounts.delete(key);
  }
}

// ─── Backend Upstash Redis REST (durable) ───

async function redisCmd(
  url: string,
  token: string,
  parts: string[],
  fetchImpl: typeof fetch,
): Promise<unknown> {
  const endpoint = `${url.replace(/\/$/, '')}/${parts.map(encodeURIComponent).join('/')}`;
  const res = await fetchImpl(endpoint, { headers: { authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Upstash ${res.status} : ${detail.slice(0, 200)}`);
  }
  const json = (await res.json()) as { result?: unknown };
  return json.result;
}

/**
 * Cree un store d'usage. Selectionne le backend durable (Upstash) si configure, sinon best-effort en
 * memoire. En cas d'erreur du backend durable a runtime, retombe proprement sur le compteur memoire
 * (jamais un crash : le chat reste utilisable, le plafond degrade en best-effort). Le champ `durable`
 * reflete le backend EFFECTIVEMENT utilise a chaque appel.
 */
export function createUsageStore(env: UsageEnv): UsageStore {
  const limit = env.limit && env.limit > 0 ? env.limit : DEFAULT_DAILY_LIMIT;
  const url = env.redisUrl?.trim();
  const token = env.redisToken?.trim();
  const durableConfigured = Boolean(url && token);
  const doFetch = env.fetchImpl ?? fetch;

  function memGet(): UsageState {
    const key = dayKey();
    return { used: memCounts.get(key) ?? 0, limit, durable: false };
  }
  function memIncrement(): UsageState {
    const key = dayKey();
    purgeOldDays(key);
    const next = (memCounts.get(key) ?? 0) + 1;
    memCounts.set(key, next);
    return { used: next, limit, durable: false };
  }

  return {
    async get(): Promise<UsageState> {
      if (!durableConfigured) return memGet();
      try {
        const raw = await redisCmd(url as string, token as string, ['get', dayKey()], doFetch);
        const used = raw === null || raw === undefined ? 0 : Number.parseInt(String(raw), 10) || 0;
        return { used, limit, durable: true };
      } catch {
        return memGet();
      }
    },
    async increment(): Promise<UsageState> {
      if (!durableConfigured) return memIncrement();
      try {
        const key = dayKey();
        const raw = await redisCmd(url as string, token as string, ['incr', key], doFetch);
        const used = Number.parseInt(String(raw), 10) || 1;
        // Premier increment du jour : pose un TTL 48h pour que le compteur s'auto-nettoie.
        if (used === 1) {
          try {
            await redisCmd(url as string, token as string, ['expire', key, '172800'], doFetch);
          } catch {
            /* TTL best-effort : un echec ici n'empeche pas le comptage. */
          }
        }
        return { used, limit, durable: true };
      } catch {
        return memIncrement();
      }
    },
  };
}
