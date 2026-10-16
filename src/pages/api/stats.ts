/**
 * API · GET /api/stats
 * Tableau de bord de la mesure d'audience maison. Authentification Basic (utilisateur `waimia`,
 * mot de passe = ANALYTICS_DASHBOARD_PASSWORD, comparaison à temps constant). Jamais indexé,
 * jamais mis en cache. À chaque chargement : purge des lignes de plus de 13 mois.
 * Paramètres : ?jours=7|30|90 (défaut 30), ?env=preview (défaut production).
 */
import type { APIRoute } from "astro";
import { basicAuthOk, parseDays, renderDashboard } from "../../lib/analytics/dashboard";
import { defaultStore } from "../../lib/analytics/store";

export const prerender = false;

const HEADERS = {
  "X-Robots-Tag": "noindex, nofollow",
  "Cache-Control": "no-store",
  "Content-Type": "text/html; charset=utf-8",
} as const;

export const ALL: APIRoute = async ({ request }) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response(null, { status: 405, headers: { Allow: "GET, HEAD", ...HEADERS } });
  }
  const password = (typeof process !== "undefined" ? process.env.ANALYTICS_DASHBOARD_PASSWORD : undefined) ?? import.meta.env.ANALYTICS_DASHBOARD_PASSWORD;
  if (!basicAuthOk(request.headers.get("authorization"), password)) {
    return new Response("Authentification requise.", {
      status: 401,
      headers: { ...HEADERS, "WWW-Authenticate": 'Basic realm="Mesure d\'audience", charset="UTF-8"' },
    });
  }
  const store = defaultStore();
  if (!store) {
    return new Response("Mesure non configurée (ANALYTICS_DATABASE_URL absente).", { status: 503, headers: HEADERS });
  }
  const url = new URL(request.url);
  const days = parseDays(url.searchParams.get("jours"));
  const env = url.searchParams.get("env") === "preview" ? "preview" : "production";
  try {
    await store.purge().catch((err) => console.error("[analytics] purge ignorée", err instanceof Error ? err.message : "erreur"));
    const report = await store.report(env, days);
    return new Response(request.method === "HEAD" ? null : renderDashboard(report, { days, env }), { status: 200, headers: HEADERS });
  } catch (err) {
    console.error("[analytics] tableau de bord", err instanceof Error ? err.message : "erreur");
    return new Response("Lecture impossible pour le moment.", { status: 500, headers: HEADERS });
  }
};
