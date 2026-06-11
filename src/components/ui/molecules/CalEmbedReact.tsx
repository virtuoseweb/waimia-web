/* CalEmbedReact · Cal.com inline booking widget (SaaS officiel)
 *
 * Bascule 2026-05-08 : du self-host cal.waimia.com vers cal.com SaaS.
 * Hydraté `client:only="react"` côté Astro pour éviter le SSR sur `window`.
 * Snippet de référence : https://app.cal.com/event-types · embed React
 *
 * Fix 2026-06-11 : namespace retiré — le prop namespace de @calcom/embed-react
 * injecte une route /n/{namespace}/n/ que Cal.com SaaS ne sert pas (HTTP 404).
 * L'URL propre sans namespace (https://app.cal.com/simonberos/audit/embed)
 * répond 200. Embed unique sur la page, isolation inutile.
 */
import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

interface Props {
  /** Slug `username/event-type` (default: "simonberos/audit") */
  calLink?: string;
  /** Thème (default: "light") */
  theme?: 'auto' | 'light' | 'dark';
}

export default function CalEmbedReact({
  calLink = 'simonberos/audit',
  theme = 'light',
}: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal('ui', {
        theme,
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, [theme]);

  return (
    <Cal
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{
        layout: 'month_view',
        theme,
        // Cal.com quirk : "true"/"false" en string, pas booléen
        useSlotsViewOnSmallScreen: 'true',
      }}
    />
  );
}
