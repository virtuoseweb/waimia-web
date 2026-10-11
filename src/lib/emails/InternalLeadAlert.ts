// Email · InternalLeadAlert · alerte interne Waimia (boîte EMAIL_INTERNAL_TO = l'« admin »).
// Envoyée sur chaque lead reçu (contact, devis, lead-magnet ; academy et newsletter le jour où
// elles en envoient une). Elle doit contenir TOUT ce que la personne a répondu : aucune base de
// données ne garde ces réponses ailleurs.
import {
  wrapEmail,
  escapeHtml,
  escapeUrl,
  h1Style,
  pStyle,
  mutedStyle,
  eyebrowStyle,
  buttonLinkStyle,
  ACCENT,
  INK,
  MUTED,
  RULE,
  SOFT,
} from "./_layout";

export type LeadSource = "contact" | "lead-magnet" | "academy" | "devis" | "newsletter";

/**
 * Objet normalisé de TOUTES les alertes internes : `Lead <outil> · <email>`.
 * Seul endroit où il est construit (contact, devis, lead-magnet).
 */
export function internalLeadSubject(label: string, email: string): string {
  const clean = (s: string) => s.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  return `[Lead] ${clean(label)} · ${clean(email)}`;
}

interface Row {
  label: string;
  value: string;
  emphasis?: boolean;
}

interface Props {
  source: LeadSource;
  email: string;
  company?: string;
  role?: string;
  brief?: string;
  /** Score academy (0-18) si source=academy */
  score?: number;
  /** Lignes libres « libellé : valeur » (objet de la demande, score du diagnostic, etc.) */
  details?: Row[];
  /** Liste tags pour qualification (ex: ['hot', 'fintech']) */
  tags?: string[];
  /** Nom lisible de l'outil ou de la ressource (titre de l'alerte). */
  toolLabel?: string;
  /** Horodatage de réception (déjà formaté, heure de Paris). */
  receivedAt?: string;
  /** Alerte affichée EN TÊTE (ex. « PDF non généré : … »). */
  warning?: string;
  /** Une phrase de résultat, mise en avant. */
  headline?: string;
  /** Détail complet groupé (scores, réponses, hypothèses, résultats). */
  sections?: { title: string; rows: Row[] }[];
  /** Pièces jointes de cette alerte (noms de fichiers). */
  attachments?: string[];
  /** Angle de reprise : 2 à 3 phrases déterministes. */
  angle?: string[];
  /** Lien « Préparer ma réponse » (Gmail prérempli). */
  replyUrl?: string;
}

const rowsTable = (rows: Row[]): string =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
  rows
    .map(
      (r) =>
        `<tr>` +
        `<td style="font-size:13px;line-height:1.5;color:${MUTED};padding:7px 14px 7px 0;vertical-align:top;width:52%;border-top:1px solid ${RULE};">${escapeHtml(r.label)}</td>` +
        `<td style="font-size:14px;line-height:1.5;color:${r.emphasis ? ACCENT : INK};padding:7px 0;vertical-align:top;border-top:1px solid ${RULE};${r.emphasis ? "font-weight:600;" : ""}">${escapeHtml(r.value)}</td>` +
        `</tr>`,
    )
    .join("") +
  `</table>`;

export default function InternalLeadAlert({
  source,
  email,
  company,
  role,
  brief,
  score,
  tags,
  details,
  toolLabel,
  receivedAt,
  warning,
  headline,
  sections,
  attachments,
  angle,
  replyUrl,
}: Props): string {
  const isHot = source === "academy" && score !== undefined && score < 9;
  const raw = toolLabel ?? source;
  const title = raw.charAt(0).toLocaleUpperCase("fr-FR") + raw.slice(1);

  const warningBlock = warning
    ? `<div style="border:1px solid ${ACCENT};border-left:4px solid ${ACCENT};padding:12px 16px;margin:0 0 20px;border-radius:4px;">` +
      `<p style="${pStyle}margin:0;color:${ACCENT};font-weight:600;">${escapeHtml(warning)}</p></div>`
    : "";

  const identity =
    `<p style="${eyebrowStyle}">Identité</p>` +
    `<p style="font-size:17px;line-height:1.4;color:${INK};margin:0 0 4px;font-weight:600;"><a href="mailto:${escapeHtml(email)}" style="color:${INK};text-decoration:underline;">${escapeHtml(email)}</a></p>` +
    (company || role
      ? `<p style="${pStyle}margin:0 0 4px;">${[company, role].filter(Boolean).map(escapeHtml).join(" · ")}</p>`
      : "") +
    (receivedAt ? `<p style="${mutedStyle}margin:0;">Reçu le ${escapeHtml(receivedAt)} · source ${escapeHtml(source)}</p>` : `<p style="${mutedStyle}margin:0;">Source ${escapeHtml(source)}</p>`);

  const headlineBlock = headline
    ? `<p style="font-family:'Instrument Serif',Georgia,serif;font-size:24px;line-height:1.2;color:${INK};margin:18px 0 0;">${escapeHtml(headline)}</p>`
    : "";

  const scoreLine =
    score !== undefined
      ? `<p style="${pStyle}">Score academy : <strong>${escapeHtml(score)}/18</strong> ${
          isHot ? "· prospect chaud (relance équipe sous 24h)" : "· prospect tiède"
        }</p>`
      : "";

  const card =
    `<div style="background:#FFFFFF;background:rgba(255,255,255,0.55);border:1px solid ${RULE};padding:20px 22px;border-radius:8px;margin:0 0 20px;">` +
    identity +
    headlineBlock +
    `</div>`;

  const detailsBlock =
    details && details.length > 0
      ? `<div style="background:${SOFT};padding:16px 20px;border-radius:8px;margin:0 0 20px;">${rowsTable(details)}</div>`
      : "";

  const sectionsBlock = (sections ?? [])
    .map(
      (s) =>
        `<div style="background:${SOFT};padding:16px 20px 12px;border-radius:8px;margin:0 0 14px;">` +
        `<p style="${eyebrowStyle}">${escapeHtml(s.title)}</p>` +
        rowsTable(s.rows) +
        `</div>`,
    )
    .join("");

  const attachBlock =
    attachments && attachments.length > 0
      ? `<p style="${pStyle}">Pièce jointe : <strong>${attachments.map(escapeHtml).join(", ")}</strong> (le rapport reçu par la personne).</p>`
      : "";

  const briefLine = brief ? `<p style="${pStyle}font-style:italic;">« ${escapeHtml(brief)} »</p>` : "";

  const angleBlock =
    angle && angle.length > 0
      ? `<div style="border-top:2px solid ${INK};padding:18px 0 0;margin:24px 0 0;">` +
        `<p style="${eyebrowStyle}color:${ACCENT};">Angle de reprise</p>` +
        angle.map((a) => `<p style="${pStyle}margin:0 0 8px;">${escapeHtml(a)}</p>`).join("") +
        (replyUrl
          ? `<p style="margin:16px 0 0;"><a href="${escapeUrl(replyUrl)}" style="${buttonLinkStyle}">Préparer ma réponse</a></p>`
          : "") +
        `</div>`
      : "";

  const tagsLine =
    tags && tags.length > 0 ? `<p style="${mutedStyle}margin-top:20px;">Tags : ${tags.map(escapeHtml).join(" · ")}</p>` : "";

  const content =
    warningBlock +
    `<p style="${eyebrowStyle}">${isHot ? "Lead chaud" : "Nouveau lead"}</p>` +
    `<h1 style="${h1Style}">${escapeHtml(title)}</h1>` +
    card +
    scoreLine +
    detailsBlock +
    sectionsBlock +
    attachBlock +
    briefLine +
    angleBlock +
    tagsLine +
    `<p style="${mutedStyle}margin-top:20px;">Action attendue : répondre sous 24 h ouvrées${isHot ? " (sous 4 h : lead chaud)" : ""}.</p>`;

  return wrapEmail(content, `${warning ? "[PDF non joint] " : ""}Lead ${raw} · ${email}`);
}
