/**
 * Mesure d'audience maison (décision de Simon, 16/10/2026) : validation et normalisation d'un
 * événement, classement de la source, rejet des robots. Logique PURE, sans Astro ni réseau
 * (testée sous node : scripts/tests/analytics.test.mjs).
 *
 * Vie privée : on ne stocke NI adresse IP, NI user-agent, NI identifiant, NI URL complète.
 * Le user-agent sert seulement à écarter les robots, puis il est jeté. Le référent est réduit à
 * son nom d'hôte.
 */

export type Env = "production" | "preview";
export type Source = "google" | "bing" | "ia" | "social" | "direct" | "interne" | "autre";
export type Kind = "pageview" | "click" | "lead";
export type Device = "mobile" | "tablette" | "ordinateur";

/** Ligne de la table `events` (hors id et ts, posés par la base). */
export interface StoredEvent {
  env: Env;
  kind: Kind;
  name: string | null;
  path: string;
  referrer_host: string | null;
  source: Source | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  device: Device | null;
  detail: string | null;
}

/** `production` si VERCEL_ENV=production, `preview` si preview, sinon null : on n'écrit rien. */
export function analyticsEnv(vercelEnv: string | undefined | null): Env | null {
  return vercelEnv === "production" || vercelEnv === "preview" ? vercelEnv : null;
}

const BOT_UA = /bot|crawl|spider|headless|lighthouse/i;
/** Robot probable : user-agent absent ou connu comme robot. */
export function isBotUserAgent(ua: string | null | undefined): boolean {
  return !ua || BOT_UA.test(ua);
}

const AI_HOSTS = new Set([
  "chatgpt.com",
  "chat.openai.com",
  "perplexity.ai",
  "claude.ai",
  "gemini.google.com",
  "copilot.microsoft.com",
]);
const SOCIAL_HOSTS = new Set(["linkedin.com", "lnkd.in", "facebook.com", "l.facebook.com", "x.com", "twitter.com", "t.co"]);

/** Retire `www.` et met en minuscules ; null si ce n'est pas un nom d'hôte plausible. */
function cleanHost(host: string): string | null {
  const h = host.toLowerCase().replace(/^www\./, "");
  return /^[a-z0-9.\-]{1,80}$/.test(h) ? h : null;
}

/** Nom d'hôte du référent (http/https seulement), jamais l'URL complète. */
export function referrerHost(referrer: unknown): string | null {
  if (typeof referrer !== "string" || !referrer || referrer.length > 2000) return null;
  try {
    const u = new URL(referrer);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return cleanHost(u.hostname);
  } catch {
    return null;
  }
}

function hostMatches(host: string, set: Set<string>): boolean {
  return set.has(host) || [...set].some((d) => host.endsWith("." + d));
}

/**
 * Classe la provenance. `ownHosts` : hôtes du site lui-même (waimia.com, hôte de la requête pour
 * les previews) → `interne`. Un utm_source IA l'emporte (les assistants ne passent pas toujours de référent).
 */
export function classifySource(host: string | null, utmSource: string | null, ownHosts: string[] = []): Source {
  const utm = utmSource?.toLowerCase() ?? "";
  if (utm && AI_HOSTS.has(utm)) return "ia";
  if (!host) return "direct";
  if (host === "waimia.com" || ownHosts.includes(host)) return "interne";
  if (hostMatches(host, AI_HOSTS)) return "ia";
  if (/(^|\.)google\.[a-z.]+$/.test(host)) return "google";
  if (host === "bing.com" || host.endsWith(".bing.com")) return "bing";
  if (hostMatches(host, SOCIAL_HOSTS)) return "social";
  return "autre";
}

/** Chemin de page : commence par `/`, sans query ni hash, borné ; sinon null. */
export function normalizePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const p = value.split(/[?#]/)[0];
  if (!p.startsWith("/") || p.startsWith("//") || p.length > 200) return null;
  return /^\/[^\s\u0000-\u001f]*$/.test(p) ? p : null;
}

function short(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.replace(/[\u0000-\u001f]/g, "").trim().slice(0, max);
  return v || null;
}

const DEVICES: readonly string[] = ["mobile", "tablette", "ordinateur"];
const CLIENT_KINDS: Record<string, { kind: Kind; name: string | null }> = {
  pageview: { kind: "pageview", name: null },
  rdv_click: { kind: "click", name: "rdv_click" },
};

export interface NormalizeContext {
  env: Env;
  userAgent: string | null | undefined;
  /** Hôtes propres du site (hôte de la requête) pour classer `interne`. */
  ownHosts?: string[];
}

/**
 * Événement envoyé par le navigateur → ligne à écrire, ou null (à ignorer en silence : robot,
 * drapeau webdriver, type inconnu, chemin invalide).
 */
export function normalizeClientEvent(raw: unknown, ctx: NormalizeContext): StoredEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  if (isBotUserAgent(ctx.userAgent) || r.webdriver === true) return null;
  const spec = typeof r.type === "string" && Object.hasOwn(CLIENT_KINDS, r.type) ? CLIENT_KINDS[r.type] : null;
  const path = normalizePath(r.path);
  if (!spec || !path) return null;
  const host = referrerHost(r.referrer);
  const utmSource = short(r.utm_source, 60);
  return {
    env: ctx.env,
    kind: spec.kind,
    name: spec.name,
    path,
    referrer_host: host,
    source: classifySource(host, utmSource, ctx.ownHosts),
    utm_source: utmSource,
    utm_medium: short(r.utm_medium, 60),
    utm_campaign: short(r.utm_campaign, 100),
    device: typeof r.device === "string" && DEVICES.includes(r.device) ? (r.device as Device) : null,
    detail: null,
  };
}

export type LeadType = "contact" | "devis" | "lead-magnet" | "newsletter";

/** Conversion côté serveur ; `path` = page d'origine (peut manquer : on écrit alors `/`). */
export function leadEvent(env: Env, type: LeadType, detail: string | undefined, path: string | undefined): StoredEvent {
  return {
    env,
    kind: "lead",
    name: type,
    path: normalizePath(path) ?? "/",
    referrer_host: null,
    source: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    device: null,
    detail: short(detail, 100),
  };
}
