/**
 * Resend client · fetch() direct vers l'API Resend (sans SDK).
 *
 * Pourquoi pas le SDK `resend` ?
 * Le SDK npm `resend@6.x` a des exports ESM/CJS qui plantent silencieusement
 * le bundle Astro/Vite SSR sur Vercel monorepo (validé empiriquement le
 * 2026-04-27 : tous les /api/*.ts qui importaient lib/resend disparaissaient
 * du bundle entry.mjs → 404 en prod). Cf docs/known-issues.md #1.
 *
 * Pourquoi pas React Email ?
 * Même cause racine : `@react-email/components` + `@react-email/render`
 * cassent le graphe d'import SSR Astro/Vite/Vercel monorepo. Solution :
 * templates HTML inline (template strings) dans `lib/emails/*.ts`.
 *
 * Solution : appel direct à l'API REST Resend via fetch(). Zéro SDK, zéro
 * bundle issue. Compatible 100% serverless Vercel.
 *
 * API Resend · https://resend.com/docs/api-reference/emails/send-email
 *   POST https://api.resend.com/emails
 *   Authorization: Bearer ${apiKey}
 *   Body: { from, to, subject, html | text, reply_to, tags, attachments }
 *   attachments[] : { filename, content } (content = Base64 ; 40 Mo max par e-mail
 *   après encodage Base64, doc Resend consultée le 2026-10-05).
 *
 * Usage :
 *   import { sendEmail, emitEvent } from '~/lib/resend';
 *   await sendEmail({ to, subject, html });
 */

import { SITE } from "../site.config";

// Clé et URL lus AU MOMENT DE L'APPEL (pas à l'import) : même comportement en production
// (Astro/Vite remplace `import.meta.env.X` à la compilation) et testable sous node avec un
// faux serveur Resend (scripts/tests/lead-magnet-delivery.test.mjs).
// RESEND_API_URL · override optionnel (tests locaux contre un serveur factice, pour
// prouver le chemin « e-mail envoyé » sans clé réelle). Absent en production.
function resendApiUrl(): string {
  return (
    (import.meta.env.RESEND_API_URL as string | undefined)?.trim() ||
    "https://api.resend.com"
  );
}
function resendApiKey(): string | undefined {
  return (import.meta.env.RESEND_API_KEY as string | undefined) || undefined;
}

if (!resendApiKey() && import.meta.env.PROD) {
  console.error("[resend] RESEND_API_KEY missing in production env");
}

// resolveEnvOrSite · valide qu'une env var est non-vide ET bien formée (contient
// un "@", donc utilisable comme adresse/from email) avant de la retenir. Une env
// var Vercel définie mais VIDE ("") ou malformée (sans "@") n'est ni null ni
// undefined → `??` ne la rattrape pas → Resend reçoit `from:""` et rejette en
// 422 "Invalid `from` field" (bug prod 2026-06-10, GF-1). Fallback = SITE.* pour
// que le comportement par défaut suive la marque configurée (forkabilité), pas
// un littéral en dur.
function resolveEnvOrSite(envValue: string | undefined, fallback: string): string {
  const trimmed = envValue?.trim();
  return trimmed && trimmed.includes("@") ? trimmed : fallback;
}

// EMAIL_FROM · override via env Vercel : EMAIL_FROM="Waimia <…>". Fallback =
// SITE.emailFrom (source unique de marque, cf site.config.ts).
export const EMAIL_FROM = resolveEnvOrSite(
  import.meta.env.EMAIL_FROM,
  SITE.emailFrom,
);
export const EMAIL_REPLY_TO = resolveEnvOrSite(
  import.meta.env.EMAIL_REPLY_TO,
  SITE.email,
);
export const EMAIL_INTERNAL_TO = resolveEnvOrSite(
  import.meta.env.EMAIL_INTERNAL_TO,
  SITE.email,
);

interface SendArgs {
  to: string | string[];
  subject: string;
  /** HTML pré-rendu de l'email (templates inline · cf lib/emails/*.ts) */
  html: string;
  /** Tags Resend pour filtrage analytics (ex: [{name:'type',value:'contact'}]) */
  tags?: { name: string; value: string }[];
  /** Reply-to si différent du From */
  replyTo?: string;
  /** Pièces jointes · `content` en Base64 (40 Mo max par e-mail après encodage) */
  attachments?: { filename: string; content: string }[];
}

export async function sendEmail({
  to,
  subject,
  html,
  tags,
  replyTo,
  attachments,
}: SendArgs) {
  const apiKey = resendApiKey();
  if (!apiKey) {
    console.warn("[resend] skipped (no API key)", { to, subject });
    return { id: "dev-no-send", skipped: true };
  }

  const body = {
    from: EMAIL_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    reply_to: replyTo ?? EMAIL_REPLY_TO,
    ...(tags && tags.length > 0 ? { tags } : {}),
    ...(attachments && attachments.length > 0 ? { attachments } : {}),
  };

  const response = await fetch(`${resendApiUrl()}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error("[resend] send error", response.status, errBody);
    throw new Error(`Resend API ${response.status}: ${errBody.slice(0, 200)}`);
  }

  const data = (await response.json()) as { id?: string };
  return { id: data.id, skipped: false };
}

/* ───── Helper · événement Automations ─────
   Ajoute le contact à l'audience Resend (déclenche les Automations dashboard
   qui écoutent sur audience + tags d'email). Cf docs/09-integrations.md. */
type EventName =
  | "lead_magnet_downloaded"
  | "academy_completed"
  | "diagnostic_completed"
  | "contact_submitted";

interface EventPayload {
  contactId?: string;
  email: string;
  firstName?: string;
  [key: string]: unknown;
}

export async function emitEvent(name: EventName, payload: EventPayload) {
  const apiKey = resendApiKey();
  if (!apiKey) {
    console.warn("[resend] event skipped (no API key)", { name, payload });
    return { skipped: true };
  }

  const audienceId = import.meta.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.info("[resend] no audience configured, event tag-only", {
      name,
      email: payload.email,
    });
    return { skipped: false, audienceless: true };
  }

  const body = {
    email: payload.email,
    ...(typeof payload.firstName === "string"
      ? { first_name: payload.firstName }
      : {}),
  };

  const response = await fetch(
    `${resendApiUrl()}/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  // Idempotent : Resend retourne 200 OK pour duplicate, ou 422 selon version
  if (!response.ok && response.status !== 422) {
    const errBody = await response.text();
    console.warn("[resend] event error (non-fatal)", response.status, errBody);
    return { skipped: false, idempotent: true };
  }

  return { skipped: false };
}
