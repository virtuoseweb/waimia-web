/**
 * Anti-robots des formulaires Waimia · source unique, partagée par tous les endpoints /api/*
 * qui reçoivent un formulaire (contact, devis, lead-magnet, newsletter).
 *
 * Deux signaux, tous deux traités par un FAUX SUCCÈS SILENCIEUX (le robot ne sait pas qu'il
 * est repéré ; aucun e-mail, aucune lecture de fichier, aucun appel externe) :
 *  1. `website` : champ piège caché hors écran. Un humain ne le voit pas, un robot le remplit.
 *  2. `_t` : horodatage (ms epoch) posé par le JS de la page au chargement. Une soumission moins
 *     de MIN_FILL_MS après ce moment est un robot. Champ absent ou illisible : pas de rejet
 *     (formulaires sans JS, anciens clients) ; seul le champ piège protège alors.
 *
 * Le contrat côté interface : `src/lib/honeypot-client.ts` (chaîne HTML du champ) et le script
 * `scripts/check-honeypot.mjs` qui échoue si un formulaire ou un endpoint l'oublie.
 */

export const HONEYPOT_FIELD = "website";
export const TIMING_FIELD = "_t";
export const MIN_FILL_MS = 2000;

export function isBotSubmission(payload: unknown, now: number = Date.now()): boolean {
  if (!payload || typeof payload !== "object") return false;
  const p = payload as Record<string, unknown>;
  const trap = p[HONEYPOT_FIELD];
  if (typeof trap === "string" ? trap.trim() !== "" : trap !== undefined && trap !== null && trap !== false) {
    return true;
  }
  const rawT = p[TIMING_FIELD];
  const t = typeof rawT === "number" ? rawT : typeof rawT === "string" && /^\d{10,14}$/.test(rawT) ? Number(rawT) : NaN;
  if (Number.isFinite(t)) {
    const elapsed = now - t;
    // elapsed < 0 : horloge cliente en avance, on ne conclut rien. Trop rapide : robot.
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) return true;
  }
  return false;
}
