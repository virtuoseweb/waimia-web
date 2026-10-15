/**
 * Logique de POST /api/lead-magnet, sans dépendance à Astro (testable sous node :
 * scripts/tests/lead-magnet-delivery.test.mjs).
 *
 * Principes (décision Simon, 5 octobre 2026) :
 *  - ressources VERROUILLÉES : l'e-mail est obligatoire, le fichier n'est JAMAIS servi par le
 *    site (aucune URL publique) ; il part uniquement en PIÈCE JOINTE Resend, ce qui prouve
 *    aussi que l'adresse est réelle ;
 *  - jamais de faux succès : sans clé Resend → 503 `email_not_configured` ; échec Resend → 502
 *    `send_failed` ; fichier absent → 503 `resource_unavailable` (le chemin n'est écrit que
 *    dans le log serveur, jamais dans la réponse) ;
 *  - outils gratuits (diagnostic, calculateur) : champ `result` = réponses BRUTES, validées
 *    strictement (lead-tools/schema.ts) puis RECALCULÉES ici ; rapport PDF (src/lib/pdf) joint
 *    au visiteur ET à l'alerte interne, renvoyé en base64 (`pdf`) pour téléchargement immédiat,
 *    jamais stocké. Échec du PDF : e-mail sans pièce jointe, alerte marquée, `pdf: null` + `warning`
 *    (décision Simon, 11 octobre 2026) ;
 *  - honeypot `website` ou soumission trop rapide : faux succès silencieux, AVANT toute
 *    validation, lecture de fichier, e-mail ou appel externe.
 *
 * Lecture des fichiers privés (fonction Vercel). Les fichiers de `private/telechargements/`
 * sont déclarés à la fonction par `adapter: vercel({ includeFiles })` (astro.config.mjs) :
 * @astrojs/vercel 10.0.8 les copie dans `.vercel/output/functions/*.func/` en conservant leur
 * place relative à la racine du dépôt (nft.js : copyFilesToFolder + ancêtre commun).
 * On cherche donc le fichier (1) depuis `process.cwd()` (racine de la fonction sur Vercel),
 * puis (2) en remontant depuis `import.meta.url` (repli recommandé par la doc du runtime :
 * le module bundlé vit sous dist/server/). PROUVÉ en local : lecture depuis le dépôt, test
 * node. À PROUVER sur une preview Vercel (GF-1) : lequel des deux chemins répond en runtime.
 */
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { sendEmail, EMAIL_INTERNAL_TO, emitEvent } from "./resend";
import { upsertSubscriber } from "./mailerlite";
import { isBotSubmission } from "./honeypot";
import LeadMagnetDelivery from "./emails/LeadMagnetDelivery";
import InternalLeadAlert, { internalLeadSubject } from "./emails/InternalLeadAlert";
import { SITE } from "../site.config";
import { LEAD_MAGNETS, AUDIT_BOOKING_HREF, type LeadMagnetEntry } from "../data/conversion";
import { computeLeadTool, type LeadToolPayload, type LeadToolResult } from "./lead-tools";
import { LeadToolPayloadSchema } from "./lead-tools/schema";
import { LeadSourceSchema, leadSourceLog, leadSourceRows } from "./lead-source";
import { digestLeadTool, gmailComposeUrl, replyDraft } from "./lead-tools/digest";
import { AUDIT_RDV_URL } from "./lead-tools/links";
import { renderLeadToolPdf } from "./pdf";

export const MSGS = {
  fr: {
    invalid_email: "Email invalide.",
    invalid_request: "Requête invalide.",
    send_failed: "Erreur lors de l'envoi. Veuillez réessayer.",
    too_many_requests: "Trop de tentatives. Veuillez patienter.",
    invalid_body: "Corps de la requête invalide.",
    not_configured: `L'envoi d'e-mail est indisponible pour le moment. Écrivez-nous à ${SITE.email}.`,
    resource_unavailable: `Ce fichier est momentanément indisponible. Écrivez-nous à ${SITE.email}, nous vous l'envoyons.`,
    invalid_result: "Les réponses envoyées sont incomplètes ou hors limites. Vérifiez le formulaire et réessayez.",
  },
  en: {
    invalid_email: "Invalid email address.",
    invalid_request: "Invalid request.",
    send_failed: "Send error. Please try again.",
    too_many_requests: "Too many attempts. Please wait.",
    invalid_body: "Invalid request body.",
    not_configured: `Email delivery is unavailable right now. Write to ${SITE.email}.`,
    resource_unavailable: `This file is temporarily unavailable. Write to ${SITE.email} and we will send it to you.`,
    invalid_result: "The answers sent are incomplete or out of range. Check the form and try again.",
  },
} as const;

export type Lang = keyof typeof MSGS;
export type MsgKey = keyof typeof MSGS.fr;
export function msg(key: MsgKey, lang: Lang = "fr"): string {
  return (MSGS[lang] ?? MSGS.fr)[key];
}

const SummaryLineSchema = z.object({
  label: z.string().min(1).max(120),
  value: z.string().max(400),
});

export const LeadMagnetSchema = z.object({
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
  /** Champ piège (honeypot) : vide pour un humain. Lu par isBotSubmission. */
  website: z.string().optional(),
  /**
   * Réponses BRUTES d'un outil gratuit (diagnostic, calculateur). Validées à part
   * (LeadToolPayloadSchema) pour renvoyer un code dédié ; le serveur recalcule tout.
   */
  result: z.unknown().optional(),
  /** Provenance tenue en mémoire par le navigateur (src/lib/lead-source.ts). */
  source: LeadSourceSchema,
});

export interface DeliveryDeps {
  /** Registre des ressources (défaut : LEAD_MAGNETS). */
  magnets?: Readonly<Record<string, LeadMagnetEntry>>;
  /** Racines où chercher `private/telechargements/…` (défaut : cwd puis ancêtres du module). */
  baseDirs?: string[];
  /** Horloge (tests du délai minimal). */
  now?: number;
  ip?: string;
  /** Page qui a envoyé le formulaire (en-tête Referer, même origine). */
  page?: string;
  /** Génération du rapport PDF (injectable pour tester l'échec). */
  renderPdf?: typeof renderLeadToolPdf;
}

export interface DeliveryResult {
  status: number;
  body: Record<string, unknown>;
}

/** Slugs des outils gratuits : leur contenu d'e-mail vient UNIQUEMENT du résultat recalculé. */
const TOOL_SLUGS = ["diagnostic-maturite-ia", "calculateur-roi-ia"] as const;

const PRIVATE_FILE_RE = /^private\/telechargements\/[A-Za-z0-9._-]+$/;
/** Plafond de sécurité sur la somme des fichiers (Resend : 40 Mo après Base64 ; Base64 = x1,33). */
const MAX_TOTAL_BYTES = 25 * 1024 * 1024;

function defaultBaseDirs(): string[] {
  const dirs: string[] = [];
  try {
    dirs.push(process.cwd());
  } catch {
    /* cwd indisponible : on passe au repli */
  }
  try {
    let dir = dirname(fileURLToPath(import.meta.url));
    for (let i = 0; i < 8; i++) {
      dirs.push(dir);
      const up = dirname(dir);
      if (up === dir) break;
      dir = up;
    }
  } catch {
    /* import.meta.url non fichier : seul cwd sera essayé */
  }
  return [...new Set(dirs)];
}

async function readPrivateFile(rel: string, baseDirs: string[]): Promise<Buffer | null> {
  if (!PRIVATE_FILE_RE.test(rel)) return null;
  for (const base of baseDirs) {
    try {
      return await readFile(resolve(join(base, rel)));
    } catch {
      /* essayer la racine suivante */
    }
  }
  return null;
}

export async function processLeadMagnet(rawPayload: unknown, deps: DeliveryDeps = {}): Promise<DeliveryResult> {
  // 1. Anti-robots : avant TOUT (validation, lecture de fichier, e-mail, appel externe).
  if (isBotSubmission(rawPayload, deps.now)) {
    return { status: 200, body: { ok: true } };
  }

  // 2. Validation.
  const rawLang = (rawPayload as Record<string, unknown> | null)?.lang === "en" ? "en" : "fr";
  const parsed = LeadMagnetSchema.safeParse(rawPayload);
  if (!parsed.success) {
    const emailIssue = parsed.error.issues.some((i) => i.path[0] === "email");
    return {
      status: 400,
      body: {
        ok: false,
        code: emailIssue ? "invalid_email" : "invalid_request",
        error: msg(emailIssue ? "invalid_email" : "invalid_request", rawLang),
      },
    };
  }
  const { email, lang, slug, company, role, summary, headline, source } = parsed.data;
  const optIn = Boolean(parsed.data.newsletter);
  const magnets = deps.magnets ?? (LEAD_MAGNETS as Readonly<Record<string, LeadMagnetEntry>>);
  if (!Object.prototype.hasOwnProperty.call(magnets, slug)) {
    return { status: 400, body: { ok: false, code: "unknown_resource", error: msg("invalid_request", lang) } };
  }
  const magnet = magnets[slug];

  // 2 bis. Résultat d'outil : validation stricte, puis recalcul serveur (jamais le score du client).
  // Pour un slug d'outil, `result` est OBLIGATOIRE : sans lui, `headline` et `summary` (écrits par le
  // client) passeraient dans l'alerte interne et l'e-mail visiteur. Même famille d'erreur que
  // « résultat invalide » (400 `invalid_result`).
  let toolResult: LeadToolResult | null = null;
  const isToolSlug = (TOOL_SLUGS as readonly string[]).includes(slug);
  if (isToolSlug && parsed.data.result === undefined) {
    return { status: 400, body: { ok: false, code: "invalid_result", error: msg("invalid_result", lang) } };
  }
  if (parsed.data.result !== undefined) {
    const r = LeadToolPayloadSchema.safeParse(parsed.data.result);
    if (!r.success) {
      return { status: 400, body: { ok: false, code: "invalid_result", error: msg("invalid_result", lang) } };
    }
    if (r.data.tool !== slug) {
      return { status: 400, body: { ok: false, code: "result_mismatch", error: msg("invalid_request", lang) } };
    }
    toolResult = computeLeadTool(r.data as LeadToolPayload);
  }

  // 3. Pièces jointes : lues AVANT d'envoyer quoi que ce soit.
  const baseDirs = deps.baseDirs ?? defaultBaseDirs();
  const attachments: { filename: string; content: string; sizeBytes: number }[] = [];
  let total = 0;
  for (const att of magnet.attachments ?? []) {
    const buf = await readPrivateFile(att.file, baseDirs);
    if (!buf) {
      console.error("[lead-magnet] resource_unavailable : fichier introuvable", { slug, file: att.file });
      return { status: 503, body: { ok: false, code: "resource_unavailable", error: msg("resource_unavailable", lang) } };
    }
    total += buf.length;
    attachments.push({ filename: att.filename, content: buf.toString("base64"), sizeBytes: buf.length });
  }
  if (total > MAX_TOTAL_BYTES) {
    console.error("[lead-magnet] resource_unavailable : pièces jointes trop lourdes", { slug, total });
    return { status: 503, body: { ok: false, code: "resource_unavailable", error: msg("resource_unavailable", lang) } };
  }

  // 3 bis. Rapport PDF de l'outil. Un échec n'est JAMAIS silencieux : l'e-mail part sans pièce
  // jointe et le dit, l'alerte interne l'indique en tête, la réponse porte `pdf: null` + `warning`.
  let report: { filename: string; base64: string; sizeBytes: number } | null = null;
  let pdfError: string | null = null;
  if (toolResult) {
    try {
      const render = deps.renderPdf ?? renderLeadToolPdf;
      const out = await render(toolResult, { email, date: new Date(deps.now ?? Date.now()), lang });
      report = { filename: out.filename, base64: Buffer.from(out.bytes).toString("base64"), sizeBytes: out.bytes.length };
    } catch (err) {
      pdfError = err instanceof Error ? err.message : String(err);
      console.error("[lead-magnet] PDF non généré", { slug, error: pdfError });
    }
  }
  // Digest APRÈS le PDF : le texte d'aperçu n'annonce une pièce jointe que si elle existe.
  const digest = toolResult ? digestLeadTool(toolResult, { hasPdf: report !== null }) : null;

  const pageUrl = `${SITE.url}${magnet.path}`;
  const hasFiles = attachments.length > 0 || report !== null;
  const subject = digest
    ? digest.visitorSubject
    : hasFiles
    ? lang === "en"
      ? `${magnet.title} · your file`
      : `${magnet.title} · votre fichier en pièce jointe`
    : `${magnet.title} · la version à garder`;

  try {
    // 4. E-mail au visiteur d'abord : sans lui, rien d'autre ne part.
    const delivery = await sendEmail({
      to: email,
      subject,
      html: LeadMagnetDelivery({
        title: magnet.title,
        pageUrl,
        attachments: attachments.map((a) => ({ filename: a.filename, sizeBytes: a.sizeBytes })),
        lang,
        summary: isToolSlug ? undefined : summary,
        auditUrl: `${SITE.url}${AUDIT_BOOKING_HREF}`,
        ...(digest
          ? {
              report: {
                toolLabel: digest.toolLabel,
                metrics: digest.metrics,
                preview: digest.preview,
                pdf: report ? { filename: report.filename, sizeBytes: report.sizeBytes, pages: digest.pages } : null,
                bookingUrl: AUDIT_RDV_URL,
              },
            }
          : {}),
      }),
      ...(hasFiles
        ? {
            attachments: [
              ...attachments.map((a) => ({ filename: a.filename, content: a.content })),
              ...(report ? [{ filename: report.filename, content: report.base64 }] : []),
            ],
          }
        : {}),
      tags: [
        { name: "event", value: "lead_magnet_downloaded" },
        { name: "magnet", value: slug },
      ],
    });
    // Pas de clé d'envoi : rien n'est parti. On le dit, on n'affiche pas un succès.
    if (delivery.skipped) {
      console.error("[api/lead-magnet] RESEND_API_KEY absente : e-mail non envoyé", { slug });
      return { status: 503, body: { ok: false, code: "email_not_configured", error: msg("not_configured", lang) } };
    }

    // 5. Alerte interne (non bloquante : le visiteur a déjà son fichier).
    try {
      const receivedAt = new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/Paris",
      }).format(new Date(deps.now ?? Date.now()));
      const draft = toolResult ? replyDraft(toolResult) : null;
      await sendEmail({
        to: EMAIL_INTERNAL_TO,
        subject: internalLeadSubject(digest ? digest.toolLabel : slug, email),
        html: InternalLeadAlert({
          source: "lead-magnet",
          email,
          company,
          role,
          tags: [slug],
          toolLabel: digest ? digest.toolLabel : magnet.title,
          receivedAt,
          ...(toolResult && !report ? { warning: `PDF non généré : ${pdfError ?? "raison inconnue"}` } : {}),
          headline: digest?.headline ?? (isToolSlug ? undefined : headline),
          details: [
            { label: "Ressource", value: magnet.title },
            { label: "Lettre mensuelle", value: optIn ? "inscription demandée" : "non (ne pas ajouter à une liste)" },
            ...(digest || isToolSlug ? [] : [...(headline ? [{ label: "Résultat", value: headline }] : []), ...(summary ?? [])]),
            ...leadSourceRows(source, deps.page),
          ],
          sections: digest?.sections,
          attachments: report ? [report.filename] : [],
          angle: digest?.angle,
          replyUrl: draft ? gmailComposeUrl(email, draft.subject, draft.paragraphs) : undefined,
        }),
        // Le rapport PDF de l'outil est joint à l'alerte (les fichiers statiques, connus, non).
        ...(report ? { attachments: [{ filename: report.filename, content: report.base64 }] } : {}),
        tags: [
          { name: "event", value: "lead_magnet_downloaded" },
          { name: "kind", value: "internal" },
        ],
      });
    } catch (err) {
      console.error("[api/lead-magnet] alerte interne non envoyée", err);
    }

    // 6. Audience et automatisations marketing : UNIQUEMENT si la case a été cochée.
    if (optIn) {
      await Promise.all([
        emitEvent("lead_magnet_downloaded", { email, slug }),
        // Groupe MailerLite « newsletter » (le même que /api/newsletter) : le consentement porte sur la lettre.
        upsertSubscriber({ email, groups: ["114701253078942792"] }),
      ]);
    }
    const maskedEmail = email.replace(/(?<=.{3}).(?=.*@)/g, "*");
    console.log(
      JSON.stringify({ ts: new Date().toISOString(), action: "lead_magnet_delivered", slug, ...leadSourceLog(source, deps.page), ip: deps.ip, email: maskedEmail, files: attachments.length + (report ? 1 : 0), pdf: toolResult ? Boolean(report) : undefined }),
    );
    return {
      status: 200,
      body: {
        ok: true,
        delivered: true,
        slug,
        attached: hasFiles,
        subscribed: optIn,
        ...(toolResult
          ? {
              pdf: report ? { filename: report.filename, base64: report.base64 } : null,
              ...(report ? {} : { warning: "pdf_not_generated" }),
            }
          : {}),
      },
    };
  } catch (err) {
    console.error("[api/lead-magnet] error", err);
    return { status: 502, body: { ok: false, code: "send_failed", error: msg("send_failed", lang) } };
  }
}
