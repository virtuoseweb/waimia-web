/**
 * Stockage de la mesure d'audience : interface injectable, implémentation Neon (HTTP, sans
 * connexion persistante, adaptée au serverless) et écriture « sans jamais gêner l'appelant ».
 * Les tests passent un faux stockage (scripts/tests/analytics.test.mjs).
 */
import { analyticsEnv, leadEvent, type Env, type LeadType, type StoredEvent } from "./event";

export interface PageRow {
  path: string;
  visites: number;
  google: number;
  ia: number;
  rdv: number;
  leads: number;
}

export interface Report {
  daily: { day: string; visites: number }[];
  sources: { source: string; visites: number }[];
  leadTypes: { type: string; n: number }[];
  pages: PageRow[];
}

export interface AnalyticsStore {
  insert(event: StoredEvent): Promise<void>;
  /** Supprime les lignes de plus de 13 mois. */
  purge(): Promise<void>;
  report(env: Env, days: number): Promise<Report>;
}

const num = (v: unknown) => Number(v) || 0;

/** Implémentation Neon. Le module est chargé à la demande : rien n'est importé sans base. */
export function neonStore(url: string): AnalyticsStore {
  let sql: { query: (text: string, params?: unknown[]) => Promise<Record<string, unknown>[]> } | null = null;
  const db = async () => {
    if (!sql) {
      const { neon } = await import("@neondatabase/serverless");
      sql = neon(url) as unknown as NonNullable<typeof sql>;
    }
    return sql;
  };
  return {
    async insert(e) {
      await (await db()).query(
        `INSERT INTO events (env, kind, name, path, referrer_host, source, utm_source, utm_medium, utm_campaign, device, detail)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [e.env, e.kind, e.name, e.path, e.referrer_host, e.source, e.utm_source, e.utm_medium, e.utm_campaign, e.device, e.detail],
      );
    },
    async purge() {
      await (await db()).query(`DELETE FROM events WHERE ts < now() - interval '13 months'`);
    },
    async report(env, days) {
      const q = await db();
      const win = `env = $1 AND ts > now() - ($2::int * interval '1 day')`;
      const [daily, sources, leadTypes, pages] = await Promise.all([
        q.query(
          `SELECT to_char((ts AT TIME ZONE 'Europe/Paris')::date, 'YYYY-MM-DD') AS day, count(*) AS n
           FROM events WHERE kind = 'pageview' AND ${win} GROUP BY 1 ORDER BY 1`,
          [env, days],
        ),
        q.query(
          `SELECT coalesce(source, 'direct') AS source, count(*) AS n
           FROM events WHERE kind = 'pageview' AND ${win} GROUP BY 1 ORDER BY 2 DESC`,
          [env, days],
        ),
        q.query(`SELECT name AS type, count(*) AS n FROM events WHERE kind = 'lead' AND ${win} GROUP BY 1 ORDER BY 2 DESC`, [env, days]),
        q.query(
          `SELECT path,
             count(*) FILTER (WHERE kind = 'pageview') AS visites,
             count(*) FILTER (WHERE kind = 'pageview' AND source = 'google') AS google,
             count(*) FILTER (WHERE kind = 'pageview' AND source = 'ia') AS ia,
             count(*) FILTER (WHERE kind = 'click' AND name = 'rdv_click') AS rdv,
             count(*) FILTER (WHERE kind = 'lead') AS leads
           FROM events WHERE ${win} GROUP BY path ORDER BY (count(*) FILTER (WHERE kind = 'pageview') + count(*) FILTER (WHERE kind = 'lead')) DESC LIMIT 300`,
          [env, days],
        ),
      ]);
      return {
        daily: daily.map((r) => ({ day: String(r.day), visites: num(r.n) })),
        sources: sources.map((r) => ({ source: String(r.source), visites: num(r.n) })),
        leadTypes: leadTypes.map((r) => ({ type: String(r.type), n: num(r.n) })),
        pages: pages.map((r) => ({
          path: String(r.path),
          visites: num(r.visites),
          google: num(r.google),
          ia: num(r.ia),
          rdv: num(r.rdv),
          leads: num(r.leads),
        })),
      };
    },
  };
}

function readEnv(name: string): string | undefined {
  const v = (typeof process !== "undefined" ? process.env[name] : undefined) ?? (import.meta.env as Record<string, string | undefined>)[name];
  return v?.trim() || undefined;
}

let override: AnalyticsStore | null | undefined;
/** Réservé aux tests : impose un stockage (ou `null` = aucun). `undefined` rend la main à l'environnement. */
export function setAnalyticsStoreForTests(store: AnalyticsStore | null | undefined): void {
  override = store;
}

let cached: { url: string; store: AnalyticsStore } | null = null;
/** Stockage configuré, ou null (variable absente : on n'écrit rien). */
export function defaultStore(): AnalyticsStore | null {
  if (override !== undefined) return override;
  const url = readEnv("ANALYTICS_DATABASE_URL");
  if (!url) return null;
  if (!cached || cached.url !== url) cached = { url, store: neonStore(url) };
  return cached.store;
}

/** Environnement de mesure courant (VERCEL_ENV), ou null : hors production et preview, rien n'est écrit. */
export function currentEnv(): Env | null {
  return analyticsEnv(readEnv("VERCEL_ENV"));
}

/**
 * Écrit un événement sans jamais lever ni retenir l'appelant plus de `timeoutMs`. La mesure ne doit
 * ni bloquer ni ralentir un formulaire : en cas d'échec ou de lenteur, l'événement est perdu, c'est tout.
 */
export async function recordSafely(store: AnalyticsStore | null, event: StoredEvent | null, timeoutMs = 1500): Promise<void> {
  if (!store || !event) return;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      store.insert(event),
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, timeoutMs);
      }),
    ]);
  } catch (err) {
    console.error("[analytics] écriture ignorée", err instanceof Error ? err.message : "erreur");
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Conversion côté serveur, à appeler APRÈS un succès réel (jamais sur honeypot ni erreur). */
export async function trackLead(type: LeadType, detail: string | undefined, path: string | undefined): Promise<void> {
  const env = currentEnv();
  const store = defaultStore();
  if (!env || !store) return;
  await recordSafely(store, leadEvent(env, type, detail, path));
}
