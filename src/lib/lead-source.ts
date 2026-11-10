/**
 * Provenance d'une demande (décision de Simon du 14/10/2026 : mesure de conversion légère,
 * maison et gratuite). Chaque e-mail interne de lead dit d'où vient la demande :
 *  - page du formulaire : en-tête `Referer` de l'envoi (même origine seulement) ;
 *  - page d'arrivée, source d'entrée et page précédente : fournies par `window.wmLeadSource()`
 *    (script inline de `layouts/Base.astro`), tenues EN MÉMOIRE pendant la visite.
 * Ni cookie ni stockage sur l'appareil. Transmis avec un formulaire envoyé, et à Cal.com dès
 * l'affichage de l'embed de réservation (`metadata[...]` de CalEmbedReact) : la politique le dit.
 *
 * Une provenance absente ou mal formée ne bloque jamais une demande : `.catch(undefined)`.
 */
import { z } from "zod";

const PATH = /^\/[A-Za-z0-9\-._~\/%]{0,160}$/;
const HOST = /^[a-z0-9.\-]{1,80}$/;
/** Paramètre UTM : chaîne simple de 80 caractères au plus, jamais interprétée (affichée échappée). */
const UTM = /^[A-Za-z0-9][A-Za-z0-9 _.\-+]{0,79}$/;
const utmField = () => z.string().regex(UTM).optional().catch(undefined);

export const LeadSourceSchema = z
  .object({
    landing: z.string().regex(PATH).optional().catch(undefined),
    entry: z.string().regex(HOST).optional().catch(undefined),
    prev: z.string().regex(PATH).optional().catch(undefined),
    /** Pages vues pendant la visite, dans l'ordre (20 au plus). Une entrée invalide écarte le tout. */
    path: z.array(z.string().regex(PATH)).max(20).optional().catch(undefined),
    utm_source: utmField(),
    utm_medium: utmField(),
    utm_campaign: utmField(),
    utm_content: utmField(),
  })
  .optional()
  .catch(undefined);

export type LeadSource = z.infer<typeof LeadSourceSchema>;

/* ───── Canal d'acquisition ───── */

export const CANAUX = [
  "linkedin",
  "email-froid",
  "coworking",
  "annuaire",
  "partenaire",
  "organique",
  "direct",
  "inconnu",
] as const;
export type Canal = (typeof CANAUX)[number];

const SEARCH_HOSTS =
  /(^|\.)(google|bing|duckduckgo|ecosia|qwant|yahoo|brave|startpage|perplexity|chatgpt|claude)\.[a-z.]+$|^openai\.com$/;
const LINKEDIN_HOSTS = /(^|\.)(linkedin\.com|lnkd\.in)$/;

/**
 * Canal lisible d'une demande, déduit côté serveur (jamais lu tel quel du navigateur).
 * Priorité : les UTM posés dans nos liens, puis le référent (`entry`, hôte), puis « direct ».
 * Fonction pure : aucune lecture d'environnement, testée dans scripts/tests/lead-source.test.mjs.
 */
export function deriveCanal(source: LeadSource): Canal {
  const s = (source?.utm_source ?? "").trim().toLowerCase();
  const m = (source?.utm_medium ?? "").trim().toLowerCase();
  const entry = (source?.entry ?? "").trim().toLowerCase();

  if (s || m) {
    if (/^(e-?mail|emailing|cold-?e-?mail|email-froid|mail-froid)$/.test(m) || /^(email-froid|cold-?email)$/.test(s)) return "email-froid";
    if (s.includes("coworking") || m.includes("coworking")) return "coworking";
    if (s.includes("annuaire") || m.includes("annuaire") || m === "directory") return "annuaire";
    if (/partenaire|partner/.test(s) || /partenaire|partner/.test(m)) return "partenaire";
    if (s.includes("linkedin") || LINKEDIN_HOSTS.test(s)) return "linkedin";
    if (/^(google|bing|duckduckgo|ecosia|qwant)$/.test(s) && (!m || m === "organic")) return "organique";
    if (m === "organic" || m === "organique" || m === "seo") return "organique";
    return "inconnu";
  }
  if (!entry) return "inconnu";
  if (entry === "direct") return "direct";
  if (entry === "interne") return "inconnu";
  if (LINKEDIN_HOSTS.test(entry)) return "linkedin";
  if (SEARCH_HOSTS.test(entry)) return "organique";
  return "inconnu";
}

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
  const rows: { label: string; value: string }[] = [{ label: "Canal", value: deriveCanal(source) }];
  if (source?.utm_source) rows.push({ label: "UTM source", value: source.utm_source });
  if (source?.utm_medium) rows.push({ label: "UTM medium", value: source.utm_medium });
  if (source?.utm_campaign) rows.push({ label: "UTM campagne", value: source.utm_campaign });
  if (source?.utm_content) rows.push({ label: "UTM contenu", value: source.utm_content });
  if (source?.entry) rows.push({ label: "Venu de", value: source.entry });
  if (source?.landing) rows.push({ label: "Page d'arrivée", value: source.landing });
  if (source?.prev) rows.push({ label: "Page précédente", value: source.prev });
  if (source?.path && source.path.length > 1) rows.push({ label: "Parcours", value: source.path.join(" → ") });
  if (page) rows.push({ label: "Page du formulaire", value: page });
  return rows;
}

/** Attribution validée, sans page : charge de l'événement Resend et des journaux. */
export function leadAttribution(source: LeadSource): Record<string, string> {
  return {
    canal: deriveCanal(source),
    ...(source?.utm_source ? { utm_source: source.utm_source } : {}),
    ...(source?.utm_medium ? { utm_medium: source.utm_medium } : {}),
    ...(source?.utm_campaign ? { utm_campaign: source.utm_campaign } : {}),
    ...(source?.utm_content ? { utm_content: source.utm_content } : {}),
    ...(source?.entry ? { entry: source.entry } : {}),
    ...(source?.landing ? { landing: source.landing } : {}),
  };
}

/** Étiquette Resend `canal` : valeur issue d'une liste fermée, donc toujours acceptée par Resend. */
export function leadCanalTag(source: LeadSource): { name: string; value: string } {
  return { name: "canal", value: deriveCanal(source) };
}

/** Champs de provenance pour la ligne JSON des journaux Vercel (comptage par page et par canal). */
export function leadSourceLog(source: LeadSource, page?: string): Record<string, string> {
  return {
    ...(page ? { page } : {}),
    ...leadAttribution(source),
    ...(source?.prev ? { prev: source.prev } : {}),
    ...(source?.path ? { pages: String(source.path.length), path: source.path.join(">") } : {}),
  };
}
