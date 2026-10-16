/**
 * API · POST /api/collect
 * Réception de la mesure d'audience maison (pages vues, clics vers le rendez-vous).
 * Sans cookie, sans IP, sans user-agent stockés (src/lib/analytics/event.ts).
 * Répond TOUJOURS 204, sans détail, même en erreur : un beacon n'a rien à lire, et la mesure
 * ne doit jamais révéler son état. N'écrit que si ANALYTICS_DATABASE_URL existe et que
 * VERCEL_ENV vaut production ou preview. Même origine seulement.
 */
import type { APIRoute } from "astro";
import { SITE } from "../../site.config";
import { normalizeClientEvent } from "../../lib/analytics/event";
import { currentEnv, defaultStore, recordSafely } from "../../lib/analytics/store";

export const prerender = false;

const MAX_BODY = 4096;
const NO_CONTENT = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

/** Hôte de l'Origin (ou, à défaut, du Referer) quand il est celui du site appelé. */
function sameOriginHost(request: Request): string | null {
  const from = request.headers.get("origin") ?? request.headers.get("referer");
  if (!from) return null;
  try {
    const host = new URL(from).host;
    const own = [new URL(request.url).host, request.headers.get("host"), request.headers.get("x-forwarded-host")];
    return own.includes(host) ? host : null;
  } catch {
    return null;
  }
}

// Workaround bug @astrojs/vercel@10 (POST exclu du bundle). Cf known-issues #1.
export const ALL: APIRoute = async ({ request }) => {
  try {
    if (request.method !== "POST") return NO_CONTENT();
    const host = sameOriginHost(request);
    const env = currentEnv();
    const store = defaultStore();
    if (!host || !env || !store) return NO_CONTENT();
    const text = await request.text();
    if (text.length > MAX_BODY) return NO_CONTENT();
    const event = normalizeClientEvent(JSON.parse(text), {
      env,
      userAgent: request.headers.get("user-agent"),
      ownHosts: [host, new URL(SITE.url).host.replace(/^www\./, "")],
    });
    await recordSafely(store, event);
  } catch {
    /* corps illisible ou erreur interne : même réponse */
  }
  return NO_CONTENT();
};
