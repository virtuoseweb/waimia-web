// Parcours de conversion · source unique des URL et libellés partagés entre
// /audit-ia-pme, /contact, le diagnostic et les lead magnets (GLOBAL, pas INSTANCE).
//
// Décision Simon (4 octobre 2026) : le rendez-vous se prend sur la page contact.
// Tout bouton « Réserver un audit » pointe vers AUDIT_BOOKING_HREF. Les liens
// « En savoir plus sur l'audit » pointent vers AUDIT_PAGE_HREF.

export const AUDIT_BOOKING_HREF = '/contact?offer=audit-ia-pme&intent=audit';
export const AUDIT_PAGE_HREF = '/audit-ia-pme';
/** Libellé unique du bouton de prise de rendez-vous. */
export const AUDIT_BOOKING_LABEL = { fr: 'Réserver un audit IA gratuit', en: 'Book a free AI audit' } as const;
/** Libellé du lien secondaire vers la page qui présente l'audit. */
export const AUDIT_PAGE_LABEL = { fr: "Comment se passe l'audit", en: 'How the audit works' } as const;
export const DIAGNOSTIC_HREF = '/ressources/diagnostics/maturite-ia';
export const ROI_HREF = '/ressources/outils/calculateur-roi-ia';
export const CHARTE_HREF = '/ressources/outils/charte-ia-entreprise';
export const GRILLE_HREF = '/ressources/outils/grille-taches-a-automatiser';
export const CHECKLIST_HREF = '/ressources/outils/checklist-90-jours-claude';
export const GUIDE_ACHAT_CLAUDE_HREF = '/ressources/outils/guide-achat-claude-pme';
export const PACK_SKILLS_CLAUDE_HREF = '/ressources/outils/pack-skills-claude-pme';
export const KIT_CONFORMITE_CLAUDE_HREF = '/ressources/outils/kit-conformite-claude-entreprise';

/** Objets de demande proposés dans le formulaire de contact (`subject`). */
export const CONTACT_SUBJECTS = [
  { value: 'audit', label: 'Audit IA gratuit (45 min)' },
  { value: 'projet', label: 'Un projet : automatisation, agent IA, application métier' },
  { value: 'formation', label: 'Une formation IA ou automatisation' },
  { value: 'autre', label: 'Autre demande' },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]['value'];

/**
 * Pièce jointe d'une ressource VERROUILLÉE : fichier PRIVÉ (hors `public/`, jamais servi par
 * le site), lu par POST /api/lead-magnet et envoyé en pièce jointe Resend.
 * `file` : chemin relatif à la racine du projet, sous `private/telechargements/`.
 */
export interface LeadMagnetAttachment {
  file: string;
  filename: string;
}

export interface LeadMagnetEntry {
  title: string;
  path: string;
  attachments?: readonly LeadMagnetAttachment[];
}

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
    attachments: [
      { file: 'private/telechargements/charte-ia-pme-modele-waimia.pdf', filename: 'charte-ia-pme-modele-waimia.pdf' },
    ],
  },
  'grille-taches-a-automatiser': {
    title: 'Votre grille des tâches à automatiser',
    path: GRILLE_HREF,
  },
  'checklist-90-jours-claude': {
    title: 'Checklist 90 jours pour déployer Claude en PME',
    path: CHECKLIST_HREF,
    attachments: [
      { file: 'private/telechargements/checklist-90-jours-claude-pme-waimia.pdf', filename: 'checklist-90-jours-claude-pme-waimia.pdf' },
    ],
  },
  'guide-achat-claude-pme': {
    title: "Guide d'achat Claude pour PME : plan, coût, configuration",
    path: GUIDE_ACHAT_CLAUDE_HREF,
    attachments: [
      { file: 'private/telechargements/guide-achat-claude-pme.pdf', filename: 'guide-achat-claude-pme.pdf' },
    ],
  },
  'pack-skills-claude-pme': {
    title: 'Pack de 8 skills Claude pour PME',
    path: PACK_SKILLS_CLAUDE_HREF,
    attachments: [
      { file: 'private/telechargements/pack-skills-claude-pme.pdf', filename: 'pack-skills-claude-pme.pdf' },
      { file: 'private/telechargements/pack-skills-claude-pme.zip', filename: 'pack-skills-claude-pme.zip' },
    ],
  },
  'kit-conformite-claude-entreprise': {
    title: 'Kit conformité et administration de Claude en entreprise',
    path: KIT_CONFORMITE_CLAUDE_HREF,
    attachments: [
      { file: 'private/telechargements/kit-conformite-claude-entreprise.pdf', filename: 'kit-conformite-claude-entreprise.pdf' },
    ],
  },
} as const satisfies Record<string, LeadMagnetEntry>;

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
    cta_primary: { label_fr: AUDIT_BOOKING_LABEL.fr, label_en: AUDIT_BOOKING_LABEL.en, href: AUDIT_BOOKING_HREF, variant: 'primary' as const },
    cta_secondary: { label_fr: AUDIT_PAGE_LABEL.fr, label_en: AUDIT_PAGE_LABEL.en, href: AUDIT_PAGE_HREF, variant: 'ghost' as const },
  };
}
