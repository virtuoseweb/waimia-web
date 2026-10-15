/**
 * Provenance d'une demande (décision de Simon du 14/10/2026 : mesure de conversion légère,
 * maison et gratuite). Chaque e-mail interne de lead dit d'où vient la demande :
 *  - page du formulaire : en-tête `Referer` de l'envoi (même origine seulement) ;
 *  - page d'arrivée, source d'entrée et page précédente : fournies par `window.wmLeadSource()`
 *    (script inline de `layouts/Base.astro`), tenues EN MÉMOIRE pendant la visite.
 * Ni cookie ni stockage sur l'appareil, rien n'est transmis sans formulaire soumis.
 *
 * Une provenance absente ou mal formée ne bloque jamais une demande : `.catch(undefined)`.
 */
import { z } from "zod";

const PATH = /^\/[A-Za-z0-9\-._~\/%]{0,160}$/;
const HOST = /^[a-z0-9.\-]{1,80}$/;

export const LeadSourceSchema = z
  .object({
    landing: z.string().regex(PATH).optional().catch(undefined),
    entry: z.string().regex(HOST).optional().catch(undefined),
    prev: z.string().regex(PATH).optional().catch(undefined),
  })
  .optional()
  .catch(undefined);

export type LeadSource = z.infer<typeof LeadSourceSchema>;

/** Chemin de la page qui a envoyé le formulaire, lu dans `Referer` (même hôte uniquement). */
export function refererPath(request: Request): string | undefined {
  const ref = request.headers.get("referer");
  if (!ref) return undefined;
  try {
    const u = new URL(ref);
    if (u.host !== new URL(request.url).host) return undefined;
    return PATH.test(u.pathname) ? u.pathname : undefined;
  } catch {
    return undefined;
  }
}

/** Lignes « Provenance » de l'alerte interne, dans l'ordre de lecture du parcours. */
export function leadSourceRows(source: LeadSource, page?: string): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  if (source?.entry) rows.push({ label: "Venu de", value: source.entry });
  if (source?.landing) rows.push({ label: "Page d'arrivée", value: source.landing });
  if (source?.prev) rows.push({ label: "Page précédente", value: source.prev });
  if (page) rows.push({ label: "Page du formulaire", value: page });
  return rows;
}

/** Champs de provenance pour la ligne JSON des journaux Vercel (comptage par page). */
export function leadSourceLog(source: LeadSource, page?: string): Record<string, string> {
  return {
    ...(page ? { page } : {}),
    ...(source?.landing ? { landing: source.landing } : {}),
    ...(source?.entry ? { entry: source.entry } : {}),
    ...(source?.prev ? { prev: source.prev } : {}),
  };
}
