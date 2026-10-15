// Email · ContactConfirmation · POST /api/contact
// Confirmation envoi form contact côté client.
import {
  wrapEmail,
  escapeHtml,
  h1Style,
  pStyle,
  mutedStyle,
  accentLinkStyle,
  cardSoftStyle,
  eyebrowStyle,
} from "./_layout";
import { SITE } from "../../site.config";

interface Props {
  firstName?: string;
  /** Brief envoyé · pour rappel client */
  brief: string;
}

export default function ContactConfirmation({
  firstName = "bonjour",
  brief,
}: Props): string {
  const fn = escapeHtml(firstName);
  const briefSafe = escapeHtml(brief);

  const content =
    `<h1 style="${h1Style}">Reçu, ${fn}.</h1>` +
    `<p style="${pStyle}">Votre message est bien arrivé. Simon Beros vous répond personnellement sous 24 heures ouvrées.</p>` +
    `<div style="${cardSoftStyle}">` +
    `<p style="${eyebrowStyle}">Votre message</p>` +
    `<p style="${pStyle}margin:0;font-style:italic;">« ${briefSafe} »</p>` +
    `</div>` +
    `<p style="${pStyle}">Pour gagner du temps, vous pouvez choisir directement un créneau pour l'audit IA gratuit de 45 minutes :</p>` +
    `<p style="${mutedStyle}">· <a href="${SITE.url}/contact?offer=audit-ia-pme&intent=audit" style="${accentLinkStyle}">Choisir un créneau</a><br />· <a href="${SITE.url}/audit-ia-pme" style="${accentLinkStyle}">Ce que couvre l'audit</a></p>` +
    `<p style="${mutedStyle}">Si urgent : <a href="mailto:${SITE.email}" style="${accentLinkStyle}">${SITE.email}</a></p>`;

  return wrapEmail(
    content,
    "Votre message est arrivé · réponse en 24h ouvrées",
  );
}
