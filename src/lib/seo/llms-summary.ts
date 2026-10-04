// Waimia · llms-summary.ts · en-tête de /llms.txt (résumé du site pour les moteurs IA).
//
// Rien n'est recopié à la main : les domaines de l'offre viennent du menu Solutions
// (src/data/sitemap.ts), les prix de la source unique (src/data/pricing.ts), le contact et
// le lien de rendez-vous de src/site.config.ts et src/data/conversion.ts. Un prix ou une
// page qui change met /llms.txt à jour au build suivant.

import { SITE } from '../../site.config';
import { AUDIT_BOOKING_HREF } from '../../data/conversion';
import {
  AUDIT_DURATION_MIN,
  DEPLOYMENT_FLOOR_EUR,
  HOURLY_RATE_EUR,
  MAINTENANCE_TIERS_EUR,
  PILOT_FLOOR_EUR,
  SCOPING_SPRINT_EUR,
  SCOPING_SPRINT_HOURS,
  formatEur,
} from '../../data/pricing';
import { serviceDomains } from './service-catalog';

// Espace insécable fine (formatEur) → espace simple : sortie texte brut pour les modèles.
const eur = (value: number) => formatEur(value).replace(/[  ]/g, ' ');

/** Résumé d'une phrase (citation en tête de llms.txt et de llms-full.txt). */
export const LLMS_SUMMARY = `${SITE.name} est un studio de développement IA et un cabinet d'automatisation des processus pour PME et ETI de 10 à 250 salariés. Basé à Bordeaux, missions à distance partout en France.`;

/** Paragraphes de contexte, dans l'ordre : offre, parcours et prix, formations, garde-fous, contact. */
export function llmsDetails(): string[] {
  const domains = serviceDomains()
    .map((d, i) => `${i + 1}. ${d.name} : ${d.services.map((s) => s.name).join(', ')}.`)
    .join('\n');

  const maintenance = MAINTENANCE_TIERS_EUR.map((p) => String(p)).join(', ').replace(/, (\d+)$/, ' ou $1');
  const path = [
    `- Audit IA : gratuit (${eur(0)}), ${AUDIT_DURATION_MIN} minutes en visio, sans engagement.`,
    `- Sprint de cadrage : ${eur(SCOPING_SPRINT_EUR)} HT, ${SCOPING_SPRINT_HOURS} heures, prix fixe.`,
    `- Pilote (un premier système en production) : dès ${eur(PILOT_FLOOR_EUR)} HT.`,
    `- Déploiement sur mesure : dès ${eur(DEPLOYMENT_FLOOR_EUR)} HT, devis ferme après audit.`,
    `- Maintenance : trois paliers à ${maintenance} € HT par mois.`,
    `- Interventions hors forfait : ${eur(HOURLY_RATE_EUR)} HT de l'heure.`,
  ].join('\n');

  return [
    `L'offre, en cinq domaines :\n${domains}`,
    `Le parcours et les prix d'entrée (hors taxes, détail sur ${SITE.url}/tarifs) :\n${path}`,
    'Formations : formations dispensées via Akigora, organisme certifié Qualiopi. Prise en charge possible selon votre situation.',
    'Garde-fous : RGPD et AI Act pris en compte dès la conception, validation humaine sur les actions sensibles, journal des actions, code et workflows transférés au client en fin de mission.',
    `Qui : Simon Beros, fondateur, travaille seul avec les équipes métier du client (${SITE.url}/equipe/simon-beros).`,
    `Contact : ${SITE.email}. Prise de rendez-vous pour l'audit gratuit : ${SITE.url}${AUDIT_BOOKING_HREF}`,
    `Chaque lien ci-dessous pointe la version markdown d'une page publique. L'URL canonique est la même sans l'extension .md. Contenu complet en un seul fichier : ${SITE.url}/llms-full.txt`,
  ];
}
