/* CalEmbedReact · Cal.com inline booking widget (SaaS officiel)
 *
 * Bascule 2026-05-08 : du self-host cal.waimia.com vers cal.com SaaS.
 * Hydraté `client:only="react"` côté Astro pour éviter le SSR sur `window`.
 * Snippet de référence : https://app.cal.com/event-types · embed React
 *
 * ⚠️ NE PAS retirer `namespace` (régression it.13/06e5e91, re-corrigée 2026-06-12).
 * Sans namespace, getCalApi() fait `Cal("init","")` → le embed.js live sérialise
 * le namespace vide en `/n/` dans le path → app.cal.com/<user>/n/<event>/n/embed = 404
 * (booking cassé). Un namespace NON-VIDE ("audit") donne l'URL propre 200. Prouvé
 * par test embed.js live isolé 2026-06-12.
 */
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';
import { SITE } from '../../../site.config';

type LeadSource = { landing?: string; entry?: string; prev?: string };

/** Provenance tenue en mémoire par layouts/Base.astro (src/lib/lead-source.ts), passée à Cal
 *  en `metadata[...]` pour que la réservation dise d'où vient la personne. Elle part dans l'URL
 *  de l'iframe dès l'affichage, avant toute réservation : la politique de confidentialité le dit. */
function leadSourceMetadata(): Record<string, string> {
  const read = (window as unknown as { wmLeadSource?: () => LeadSource }).wmLeadSource;
  const src = read ? read() : undefined;
  const out: Record<string, string> = {};
  if (src?.landing) out['metadata[landing]'] = src.landing;
  if (src?.entry) out['metadata[entry]'] = src.entry;
  if (src?.prev) out['metadata[prev]'] = src.prev;
  return out;
}

interface Props {
  /** Namespace Cal isolant l'instance sur la page (default: SITE.cal.namespace) */
  namespace?: string;
  /** Slug `username/event-type` (default: SITE.cal.username/SITE.cal.event) */
  calLink?: string;
  /** Thème (default: "light") */
  theme?: 'auto' | 'light' | 'dark';
}

export default function CalEmbedReact({
  namespace = SITE.cal.namespace,
  calLink = `${SITE.cal.username}/${SITE.cal.event}`,
  theme = 'light',
}: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace });
      cal('ui', {
        theme,
        // Durée, format et interlocuteur sont déjà écrits à gauche (ContactConversion) :
        // le panneau Cal les répétait et repoussait les dates sous la ligne de flottaison.
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
    })();
  }, [namespace, theme]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{
        layout: 'month_view',
        theme,
        // Cal.com quirk : "true"/"false" en string, pas booléen
        useSlotsViewOnSmallScreen: 'true',
        ...leadSourceMetadata(),
      }}
    />
  );
}
