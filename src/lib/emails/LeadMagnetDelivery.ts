// Email · LeadMagnetDelivery · POST /api/lead-magnet
// « Version à garder » d'une ressource consultée sur le site : lien vers la page,
// fichier à télécharger s'il existe, et récapitulatif des résultats saisis à l'écran
// (diagnostic, calculateur, grille). Aucune promesse de séquence : un seul e-mail.
import {
  wrapEmail,
  escapeHtml,
  escapeUrl,
  h1Style,
  pStyle,
  mutedStyle,
  buttonLinkStyle,
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
  /** URL d'un fichier à télécharger (PDF), si la ressource en a un */
  fileUrl?: string;
  /** Résultats saisis ou calculés à l'écran, recopiés tels quels */
  summary?: SummaryLine[];
  /** URL de prise de rendez-vous pour l'audit */
  auditUrl: string;
}

export default function LeadMagnetDelivery({
  title,
  pageUrl,
  fileUrl,
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

  const fileBlock = fileUrl
    ? `<div style="padding:8px 0 20px;">` +
      `<a href="${escapeUrl(fileUrl)}" style="${buttonLinkStyle}">Télécharger le PDF</a>` +
      `</div>`
    : "";

  const content =
    `<h1 style="${h1Style}">${titleSafe}</h1>` +
    `<p style="${pStyle}">Voici la version à garder, comme demandé sur le site. ` +
    (summary.length > 0
      ? `Les lignes ci-dessous reprennent ce que vous avez saisi et ce qui a été calculé à l'écran. Ce sont vos réponses et vos hypothèses, pas un engagement de résultat.`
      : `Le document est un modèle : adaptez-le à votre entreprise avant de le diffuser.`) +
    `</p>` +
    summaryBlock +
    fileBlock +
    `<p style="${pStyle}">La page en ligne reste accessible : <a href="${escapeUrl(pageUrl)}" style="${accentLinkStyle}">${escapeHtml(pageUrl)}</a></p>` +
    `<p style="${pStyle}">Pour passer de ces chiffres à un premier chantier, l'audit IA dure 45 minutes en visio et il est gratuit : <a href="${escapeUrl(auditUrl)}" style="${accentLinkStyle}">choisir un créneau</a>.</p>` +
    `<p style="${mutedStyle}">Vous recevez ce message parce que vous l'avez demandé. Sans inscription à la lettre mensuelle de votre part, c'est le seul que vous recevrez. Une question : <a href="mailto:${SITE.email}" style="${accentLinkStyle}">${SITE.email}</a></p>`;

  return wrapEmail(content, `${title} · la version à garder`, pageUrl);
}
