/**
 * API · POST /api/contact
 * Form contact → 2 emails (client confirmation + équipe alert).
 */
import type { APIRoute } from "astro";
import { sendEmail, EMAIL_INTERNAL_TO, emitEvent } from "../../lib/resend";
import { upsertSubscriber } from "../../lib/mailerlite";
import ContactConfirmation from "../../lib/emails/ContactConfirmation";
import InternalLeadAlert from "../../lib/emails/InternalLeadAlert";
import { z } from "zod";
import { SITE } from "../../site.config";

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
    not_configured: `Le formulaire est indisponible pour le moment. Écrivez-nous à ${SITE.email}.`,
  },
  en: {
    missing_email: "Missing or invalid email.",
    missing_fields: "Required fields missing.",
    invalid_email: "Invalid email address.",
    invalid_request: "Invalid request.",
    send_failed: "Send error. Please try again.",
    too_many_requests: "Too many attempts. Please wait.",
    invalid_body: "Invalid request body.",
    not_configured: `The form is unavailable right now. Write to ${SITE.email}.`,
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

const ContactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  brief: z.string().min(1).max(5000),
  company: z.string().max(100).optional(),
  role: z.string().max(100).optional(),
  /** Objet choisi dans le formulaire (audit, projet, formation, autre). */
  subject: z.enum(["audit", "projet", "formation", "autre"]).optional(),
  /** Paramètres d'URL d'origine (?offer=…&intent=…), slugs uniquement. */
  offer: z.string().regex(/^[a-z0-9-]{1,60}$/).optional().or(z.literal("")),
  intent: z.string().regex(/^[a-z0-9-]{1,40}$/).optional().or(z.literal("")),
  lang: z.enum(["fr", "en"]).optional().default("fr"),
  website: z.string().optional(),
});

// Bug @astrojs/vercel@10 adapter : `export const POST` exclu du bundle SSR
// monorepo. Workaround validé empiriquement : utiliser `ALL` + dispatch
// méthode interne. Cf docs/known-issues.md #1. Reverser en POST direct
// quand le bug upstream sera fixé.
export const ALL: APIRoute = async ({ request }) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS_HEADERS });
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!rateOk(ip, 3, 5 * 60 * 1000)) {
    return Response.json({ ok: false, error: msg("too_many_requests") }, { status: 429, headers: CORS_HEADERS });
  }

  let rawPayload: unknown;
  try {
    const ct = request.headers.get("content-type") ?? "";
    if (ct.includes("application/json")) {
      rawPayload = await request.json();
    } else {
      const fd = await request.formData();
      rawPayload = Object.fromEntries(fd.entries());
    }
  } catch {
    return Response.json({ ok: false, error: msg("invalid_body") }, { status: 400, headers: CORS_HEADERS });
  }

  const parsed = ContactSchema.safeParse(rawPayload);
  if (!parsed.success) {
    const rawLang = (rawPayload as Record<string, string>).lang === "en" ? "en" : "fr";
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0])))];
    return Response.json(
      { ok: false, code: "invalid_fields", fields, error: msg("missing_fields", rawLang as Lang) },
      { status: 400, headers: CORS_HEADERS },
    );
  }
  const { email, lang, name, brief, company, role, website, subject, offer, intent } = parsed.data;
  const details = [
    ...(subject ? [{ label: "Objet", value: subject }] : []),
    ...(offer ? [{ label: "Offre (URL)", value: offer }] : []),
    ...(intent ? [{ label: "Intention (URL)", value: intent }] : []),
    ...(name ? [{ label: "Nom", value: name }] : []),
  ];
  // Honeypot : un bot a rempli le champ caché → faux succès silencieux
  if (website) {
    return Response.json({ ok: true }, { status: 200, headers: CORS_HEADERS });
  }
  const firstName = name?.split(" ")[0] ?? undefined;
  try {
    const [, internal] = await Promise.all([
      sendEmail({
        to: email,
        subject: "Votre message est arrivé · Waimia",
        html: ContactConfirmation({ firstName, brief }),
        tags: [{ name: "event", value: "contact_submitted" }],
        replyTo: EMAIL_INTERNAL_TO,
      }),
      sendEmail({
        to: EMAIL_INTERNAL_TO,
        subject: `[Lead] contact${subject ? " · " + subject : ""} · ${email}${company ? " · " + company : ""}`,
        html: InternalLeadAlert({
          source: "contact",
          email,
          company,
          role,
          brief,
          details,
          tags: [subject, offer].filter((t): t is string => Boolean(t)),
        }),
        tags: [
          { name: "event", value: "contact_submitted" },
          { name: "kind", value: "internal" },
        ],
      }),
      emitEvent("contact_submitted", { email, firstName }),
    ]);
    // Pas de clé d'envoi : la demande n'a atteint personne. On le dit, pas de faux succès.
    if (internal.skipped) {
      console.error("[api/contact] RESEND_API_KEY absente : demande non transmise");
      return Response.json(
        { ok: false, code: "email_not_configured", error: msg("not_configured", lang) },
        { status: 503, headers: CORS_HEADERS },
      );
    }
    await upsertSubscriber({
      email,
      name: firstName,
      fields: {
        ...(company ? { company } : {}),
        ...(role ? { role } : {}),
      },
      groups: ["117973699968108238"],
    });
    const maskedEmail = email.replace(/(?<=.{3}).(?=.*@)/g, "*");
    console.log(JSON.stringify({ ts: new Date().toISOString(), action: "contact_submitted", ip, email: maskedEmail }));
    return Response.json({ ok: true, redirect: "/bienvenue/contact" }, { status: 200, headers: CORS_HEADERS });
  } catch (err) {
    console.error("[api/contact] error", err);
    return Response.json({ ok: false, error: msg("send_failed", lang) }, { status: 500, headers: CORS_HEADERS });
  }
};
