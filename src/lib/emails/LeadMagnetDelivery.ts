// Email · LeadMagnetDelivery · POST /api/lead-magnet
// « Version à garder » d'une ressource consultée sur le site : lien vers la page,
// fichier(s) EN PIÈCE JOINTE s'il y en a (jamais de lien public : ressources verrouillées), et récapitulatif des résultats saisis à l'écran
// (diagnostic, calculateur, grille). Aucune promesse de séquence : un seul e-mail.
import {
  wrapEmail,
  escapeHtml,
  escapeUrl,
  h1Style,
  pStyle,
  mutedStyle,
  accentLinkStyle,
  cardSoftStyle,
} from "./_layout";
import { SITE } from "../../site.config";

export interface SummaryLine {
  label: string;
  value: string;
}

interface Props {
  /** Titre de la ressource */
  title: string;
  /** URL canonique de la page de la ressource */
  pageUrl: string;
  /** Fichiers joints à cet e-mail (nom et taille en octets) ; aucun lien de téléchargement */
  attachments?: { filename: string; sizeBytes: number }[];
  /** Langue de l'e-mail */
  lang?: "fr" | "en";
  /** Résultats saisis ou calculés à l'écran, recopiés tels quels */
  summary?: SummaryLine[];
  /** URL de prise de rendez-vous pour l'audit */
  auditUrl: string;
}

export default function LeadMagnetDelivery({
  title,
  pageUrl,
  attachments = [],
  lang = "fr",
  summary = [],
  auditUrl,
}: Props): string {
  const titleSafe = escapeHtml(title);

  const summaryBlock =
    summary.length > 0
      ? `<div style="${cardSoftStyle}">` +
        `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
        summary
          .map(
            (l) =>
              `<tr>` +
              `<td style="font-size:13px;line-height:1.5;color:#7A6F60;padding:6px 12px 6px 0;vertical-align:top;width:46%;">${escapeHtml(l.label)}</td>` +
              `<td style="font-size:14px;line-height:1.5;color:#0C0B09;padding:6px 0;vertical-align:top;">${escapeHtml(l.value)}</td>` +
              `</tr>`,
          )
          .join("") +
        `</table></div>`
      : "";

  const en = lang === "en";
  const sizeLabel = (n: number): string => {
    if (n >= 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1).replace(".", en ? "." : ",")} ${en ? "MB" : "Mo"}`;
    return `${Math.max(1, Math.round(n / 1024))} ${en ? "KB" : "Ko"}`;
  };

  const fileBlock =
    attachments.length > 0
      ? `<div style="${cardSoftStyle}">` +
        `<p style="${pStyle}margin:0 0 8px;">${en ? "Attached to this email:" : attachments.length > 1 ? "Fichiers en pièce jointe :" : "Fichier en pièce jointe :"}</p>` +
        attachments
          .map(
            (f) =>
              `<p style="font-size:14px;line-height:1.6;color:#0C0B09;margin:0;">${escapeHtml(f.filename)} <span style="color:#7A6F60;">(${en ? "approx. " : "environ "}${sizeLabel(f.sizeBytes)})</span></p>`,
          )
          .join("") +
        `</div>` +
        `<p style="${mutedStyle}">${en ? "The file is not available through a public link: it is only sent by email. Keep this message." : "Le fichier n'est pas disponible par un lien public : il n'est envoyé que par e-mail. Gardez ce message."}</p>`
      : "";

  const intro = en
    ? attachments.length > 0
      ? `Here is what you asked for on the site: the file is attached to this email. `
      : `Here is the version to keep, as requested on the site. `
    : attachments.length > 0
      ? `Voici ce que vous avez demandé sur le site : le fichier est en pièce jointe de cet e-mail. `
      : `Voici la version à garder, comme demandé sur le site. `;
  const introDetail =
    summary.length > 0
      ? en
        ? `The lines below repeat what you entered and what was calculated on screen. They are your answers and your assumptions, not a promise of results.`
        : `Les lignes ci-dessous reprennent ce que vous avez saisi et ce qui a été calculé à l'écran. Ce sont vos réponses et vos hypothèses, pas un engagement de résultat.`
      : en
        ? `It is a template: adapt it to your company before sharing it.`
        : `C'est un modèle : adaptez-le à votre entreprise avant de le diffuser.`;

  const content =
    `<h1 style="${h1Style}">${titleSafe}</h1>` +
    `<p style="${pStyle}">${intro}${introDetail}</p>` +
    fileBlock +
    summaryBlock +
    `<p style="${pStyle}">${en ? "The online page stays available:" : "La page en ligne reste accessible :"} <a href="${escapeUrl(pageUrl)}" style="${accentLinkStyle}">${escapeHtml(pageUrl)}</a></p>` +
    `<p style="${pStyle}">${en ? `To go from this to a first project, the AI audit lasts 45 minutes by video and is free: <a href="${escapeUrl(auditUrl)}" style="${accentLinkStyle}">pick a slot</a>.` : `Pour passer de ces éléments à un premier chantier, l'audit IA dure 45 minutes en visio et il est gratuit : <a href="${escapeUrl(auditUrl)}" style="${accentLinkStyle}">choisir un créneau</a>.`}</p>` +
    `<p style="${mutedStyle}">${en ? `You receive this message because you asked for it. Unless you also ticked the monthly newsletter, it is the only one you will receive. A question: <a href="mailto:${SITE.email}" style="${accentLinkStyle}">${SITE.email}</a>` : `Vous recevez ce message parce que vous l'avez demandé. Sans inscription à la lettre mensuelle de votre part, c'est le seul que vous recevrez. Une question : <a href="mailto:${SITE.email}" style="${accentLinkStyle}">${SITE.email}</a>`}</p>`;

  return wrapEmail(content, en ? `${title} · your file` : `${title} · la version à garder`, pageUrl);
}
