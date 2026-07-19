// Email · WelcomeNewsletter · POST /api/newsletter
// Welcome email pour signup newsletter mensuelle Waimia.
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
}

export default function WelcomeNewsletter({
  firstName = "bonjour",
}: Props): string {
  const fn = escapeHtml(firstName);

  const content =
    `<h1 style="${h1Style}">Bienvenue, ${fn}.</h1>` +
    `<p style="${pStyle}">Vous êtes inscrit·e à la newsletter mensuelle Waimia. Une note longue le 15 de chaque mois. Pas de pensum SEO. Pas de promotion. Juste ce qu'on aurait voulu lire avant de commencer un chantier.</p>` +
    `<div style="${cardSoftStyle}">` +
    `<p style="${eyebrowStyle}">Les 3 dernières notes</p>` +
    `<p style="${pStyle}margin:0;">· <a href="${SITE.url}/blog/brain-circuit" style="${accentLinkStyle}">Le cerveau-circuit arrive toujours avant le travail</a><br />· <a href="${SITE.url}/cas-clients" style="${accentLinkStyle}">Études de cas · refonte RevOps</a><br />· <a href="${SITE.url}/blog" style="${accentLinkStyle}">Toutes les notes →</a></p>` +
    `</div>` +
    `<p style="${mutedStyle}">Désabonnement en 1 clic dans chaque email. RGPD-compliant.</p>`;

  return wrapEmail(
    content,
    "Bienvenue · une note par mois, jamais de promotion",
  );
}
