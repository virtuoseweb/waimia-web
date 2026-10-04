// Parcours de conversion · source unique des URL et libellés partagés entre
// /audit-ia-pme, /contact, le diagnostic et les lead magnets (GLOBAL, pas INSTANCE).
//
// Décision Simon (4 octobre 2026) : le rendez-vous se prend sur la page contact.
// Tout bouton « Réserver un audit » pointe vers AUDIT_BOOKING_HREF. Les liens
// « En savoir plus sur l'audit » pointent vers AUDIT_PAGE_HREF.

export const AUDIT_BOOKING_HREF = '/contact?offer=audit-ia-pme&intent=audit';
export const AUDIT_PAGE_HREF = '/audit-ia-pme';
export const DIAGNOSTIC_HREF = '/ressources/diagnostics/maturite-ia';
export const ROI_HREF = '/ressources/outils/calculateur-roi-ia';
export const CHARTE_HREF = '/ressources/outils/charte-ia-entreprise';
export const GRILLE_HREF = '/ressources/outils/grille-taches-a-automatiser';

/** Objets de demande proposés dans le formulaire de contact (`subject`). */
export const CONTACT_SUBJECTS = [
  { value: 'audit', label: 'Audit IA gratuit (45 min)' },
  { value: 'projet', label: 'Un projet : automatisation, agent IA, application métier' },
  { value: 'formation', label: 'Une formation IA ou automatisation' },
  { value: 'autre', label: 'Autre demande' },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]['value'];

/** Lead magnets servis par POST /api/lead-magnet (clé = `slug` du payload). */
export const LEAD_MAGNETS = {
  'diagnostic-maturite-ia': {
    title: 'Votre diagnostic de maturité IA',
    path: DIAGNOSTIC_HREF,
  },
  'calculateur-roi-ia': {
    title: 'Votre estimation de temps récupérable',
    path: ROI_HREF,
  },
  'charte-ia-entreprise': {
    title: 'Modèle de charte IA pour PME',
    path: CHARTE_HREF,
    file: '/telechargements/charte-ia-pme-modele-waimia.pdf',
  },
  'grille-taches-a-automatiser': {
    title: 'Votre grille des tâches à automatiser',
    path: GRILLE_HREF,
  },
} as const satisfies Record<string, { title: string; path: string; file?: string }>;

export type LeadMagnetSlug = keyof typeof LEAD_MAGNETS;

/**
 * Bande finale « audit » des pages outil (section catalogue `cta-final`).
 * Source unique : même boutons partout, seul le texte d'accroche varie par page.
 */
export function auditCtaFinal(h2: string, body: string) {
  return {
    type: 'cta-final' as const,
    background: 'ink' as const,
    h2_fr: h2,
    h2_en: h2,
    body_fr: body,
    body_en: body,
    cta_primary: { label_fr: "Réserver l'audit IA", label_en: 'Book the AI audit', href: AUDIT_BOOKING_HREF, variant: 'primary' as const },
    cta_secondary: { label_fr: "Ce que couvre l'audit", label_en: 'What the audit covers', href: AUDIT_PAGE_HREF, variant: 'ghost' as const },
  };
}
