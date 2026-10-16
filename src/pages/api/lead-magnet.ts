/**
 * API · POST /api/lead-magnet
 * Ressources VERROUILLÉES (e-mail obligatoire) : le fichier est envoyé EN PIÈCE JOINTE par
 * Resend et n'est jamais servi par le site. Les ressources sans fichier (diagnostic,
 * calculateur, grille) reçoivent un e-mail « version à garder » avec leur récapitulatif.
 * Toute la logique est dans src/lib/lead-magnet-delivery.ts (testable sans Astro).
 *
 * Honnêteté du retour : 503 si l'envoi n'est pas configuré ou si le fichier manque, 502 si
 * Resend échoue ; jamais de faux succès (sauf honeypot, volontairement silencieux).
 */
import type { APIRoute } from "astro";
import { SITE } from "../../site.config";
import { msg, processLeadMagnet } from "../../lib/lead-magnet-delivery";
import { refererPath } from "../../lib/lead-source";
import { trackLead } from "../../lib/analytics/store";

export const prerender = false;

const _rl = new Map<string, { n: number; resetAt: number }>();

function rateOk(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const e = _rl.get(ip);
  if (!e || e.resetAt < now) { _rl.set(ip, { n: 1, resetAt: now + windowMs }); return true; }
  if (e.n >= max) return false;
  e.n++;
  return true;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": SITE.url,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

// Workaround bug @astrojs/vercel@10 (POST exclu du bundle). Cf known-issues #1.
export const ALL: APIRoute = async ({ request }) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!rateOk(ip, 5, 10 * 60 * 1000)) {
    return Response.json({ ok: false, code: "rate_limited", error: msg("too_many_requests") }, { status: 429, headers: CORS_HEADERS });
  }

  let rawPayload: unknown;
  try {
    const ct = request.headers.get("content-type") ?? "";
    rawPayload = ct.includes("application/json")
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return Response.json({ ok: false, code: "invalid_body", error: msg("invalid_body") }, { status: 400, headers: CORS_HEADERS });
  }

  const page = refererPath(request);
  const { status, body } = await processLeadMagnet(rawPayload, { ip, page });
  // Conversion mesurée seulement si la ressource est réellement partie (le honeypot ne renvoie pas `delivered`).
  if (status === 200 && body.delivered === true) {
    await trackLead("lead-magnet", String(body.slug), page);
  }
  return Response.json(body, { status, headers: CORS_HEADERS });
};
