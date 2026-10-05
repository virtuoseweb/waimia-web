/**
 * API · POST /api/lead-magnet
 * Capture d'e-mail OPTIONNELLE des ressources (diagnostic de maturité IA, calculateur,
 * charte IA, grille des tâches, checklist 90 jours) : envoie UN e-mail « version à garder » avec le
 * récapitulatif saisi à l'écran + une alerte interne. La valeur reste accessible sans
 * e-mail sur la page ; ce endpoint ne sert que la copie par e-mail.
 *
 * Honnêteté du retour : si l'envoi n'est pas configuré (RESEND_API_KEY absente), on
 * répond 503 `email_not_configured` au lieu d'un faux succès.
 */
import type { APIRoute } from "astro";
import { sendEmail, EMAIL_INTERNAL_TO, emitEvent } from "../../lib/resend";
import { upsertSubscriber } from "../../lib/mailerlite";
import LeadMagnetDelivery from "../../lib/emails/LeadMagnetDelivery";
import InternalLeadAlert from "../../lib/emails/InternalLeadAlert";
import { z } from "zod";
import { SITE } from "../../site.config";
import { LEAD_MAGNETS, AUDIT_BOOKING_HREF } from "../../data/conversion";

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

const MSGS = {
  fr: {
    missing_email: "Email manquant ou invalide.",
    missing_fields: "Champs requis manquants.",
    invalid_email: "Email invalide.",
    invalid_request: "Requête invalide.",
    send_failed: "Erreur lors de l'envoi. Veuillez réessayer.",
    too_many_requests: "Trop de tentatives. Veuillez patienter.",
    invalid_body: "Corps de la requête invalide.",
    not_configured: `L'envoi d'e-mail est indisponible pour le moment. Écrivez-nous à ${SITE.email}.`,
  },
  en: {
    missing_email: "Missing or invalid email.",
    missing_fields: "Required fields missing.",
    invalid_email: "Invalid email address.",
    invalid_request: "Invalid request.",
    send_failed: "Send error. Please try again.",
    too_many_requests: "Too many attempts. Please wait.",
    invalid_body: "Invalid request body.",
    not_configured: `Email delivery is unavailable right now. Write to ${SITE.email}.`,
  },
} as const;

type Lang = keyof typeof MSGS;
type MsgKey = keyof typeof MSGS.fr;
function msg(key: MsgKey, lang: Lang = "fr"): string {
  return (MSGS[lang] ?? MSGS.fr)[key];
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": SITE.url,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

const SummaryLineSchema = z.object({
  label: z.string().min(1).max(120),
  value: z.string().max(400),
});

const LeadMagnetSchema = z.object({
  email: z.string().email().max(200),
  slug: z.string().min(1).max(100),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  firstName: z.string().max(100).optional(),
  /** Résultats affichés à l'écran, recopiés dans l'e-mail (40 lignes max). */
  summary: z.array(SummaryLineSchema).max(40).optional(),
  /** Ligne courte pour l'alerte interne (ex. « Niveau 2 · 11/30 »). */
  headline: z.string().max(160).optional(),
  /** Case cochée par la personne : inscription à la lettre mensuelle (jamais par défaut). */
  newsletter: z.union([z.boolean(), z.literal("on"), z.literal("true")]).optional(),
  lang: z.enum(["fr", "en"]).optional().default("fr"),
  website: z.string().optional(),
});

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

  const parsed = LeadMagnetSchema.safeParse(rawPayload);
  if (!parsed.success) {
    const rawLang = (rawPayload as Record<string, string> | null)?.lang === "en" ? "en" : "fr";
    const emailIssue = parsed.error.issues.some((i) => i.path[0] === "email");
    return Response.json(
      {
        ok: false,
        code: emailIssue ? "invalid_email" : "invalid_request",
        error: msg(emailIssue ? "invalid_email" : "invalid_request", rawLang as Lang),
      },
      { status: 400, headers: CORS_HEADERS },
    );
  }
  const { email, lang, slug, company, role, summary, headline, website } = parsed.data;
  const optIn = Boolean(parsed.data.newsletter);
  // Honeypot : un bot a rempli le champ caché → faux succès silencieux
  if (website) {
    return Response.json({ ok: true }, { status: 200, headers: CORS_HEADERS });
  }
  const magnet = (LEAD_MAGNETS as Record<string, { title: string; path: string; file?: string }>)[slug];
  if (!magnet) {
    return Response.json(
      { ok: false, code: "unknown_resource", error: msg("invalid_request", lang) },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const pageUrl = `${SITE.url}${magnet.path}`;
  const fileUrl = magnet.file ? `${SITE.url}${magnet.file}` : undefined;

  try {
    const [delivery] = await Promise.all([
      sendEmail({
        to: email,
        subject: `${magnet.title} · la version à garder`,
        html: LeadMagnetDelivery({
          title: magnet.title,
          pageUrl,
          fileUrl,
          summary,
          auditUrl: `${SITE.url}${AUDIT_BOOKING_HREF}`,
        }),
        tags: [
          { name: "event", value: "lead_magnet_downloaded" },
          { name: "magnet", value: slug },
        ],
      }),
      sendEmail({
        to: EMAIL_INTERNAL_TO,
        subject: `[Lead] ressource · ${slug} · ${email}`,
        html: InternalLeadAlert({
          source: "lead-magnet",
          email,
          company,
          role,
          tags: [slug],
          details: [
            { label: "Ressource", value: magnet.title },
            ...(headline ? [{ label: "Résultat", value: headline }] : []),
            { label: "Lettre mensuelle", value: optIn ? "inscription demandée" : "non (ne pas ajouter à une liste)" },
            ...(summary ?? []).slice(0, 12),
          ],
        }),
        tags: [
          { name: "event", value: "lead_magnet_downloaded" },
          { name: "kind", value: "internal" },
        ],
      }),
    ]);
    // Pas de clé d'envoi : rien n'est parti. On le dit, on n'affiche pas un succès.
    if (delivery.skipped) {
      console.error("[api/lead-magnet] RESEND_API_KEY absente : e-mail non envoyé", { slug });
      return Response.json(
        { ok: false, code: "email_not_configured", error: msg("not_configured", lang) },
        { status: 503, headers: CORS_HEADERS },
      );
    }
    // Audience et automatisations marketing : UNIQUEMENT si la personne a coché la case.
    // Sans consentement, l'adresse ne sert qu'à l'envoi demandé et à l'alerte interne.
    if (optIn) {
      await Promise.all([
        emitEvent("lead_magnet_downloaded", { email, slug }),
        // Groupe MailerLite « newsletter » (le même que /api/newsletter) : le consentement porte sur la lettre.
        upsertSubscriber({ email, groups: ["114701253078942792"] }),
      ]);
    }
    const maskedEmail = email.replace(/(?<=.{3}).(?=.*@)/g, "*");
    console.log(JSON.stringify({ ts: new Date().toISOString(), action: "lead_magnet_downloaded", slug, ip, email: maskedEmail }));
    return Response.json({ ok: true, delivered: true, slug, subscribed: optIn }, { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    console.error("[api/lead-magnet] error", err);
    return Response.json({ ok: false, code: "send_failed", error: msg("send_failed", lang) }, { status: 500, headers: CORS_HEADERS });
  }
};
