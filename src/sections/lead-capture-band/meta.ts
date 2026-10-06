// Waimia · module `lead-capture-band` · meta.
import type { SectionMeta } from '@waimia/ds-kernel/sections/_shared/types';

export const meta: SectionMeta = {
  category: 'marketing',
  subcategory: 'CTA Sections',
  categorySlug: 'cta-sections',
  family: 'form-panel',
  intent: ['drive-action'],
  pageRole: ['conversion'],
  contentMode: 'instance',
  effects: ['static'],
  interactions: ['hover'],
  elements: ['buttons', 'form', 'list'],
  layoutFacets: ['2-col', 'media-right', 'split'],
  tags: ['lead-magnet', 'email', 'capture', 'form', 'lead', 'pdf', 'conversion', 'rgpd'],
  status: 'stable',
  description_fr: "Bande de capture d'e-mail d'une ressource (lead magnet) : titre fort, accroche, liste de ce que l'e-mail apporte, un seul champ, bouton primaire, mention RGPD courte et aperçu (couverture dessinée ou illustration). Mode `required` (fichier verrouillé, envoyé en pièce jointe) ou `open` (résultat d'un outil déjà affiché, l'e-mail en garde la version). Variantes `band` (pleine largeur) et `card` (dans un article). Moteur : organism LeadCapture → POST /api/lead-magnet.",
  description_en: 'Email capture band for a resource (lead magnet): strong title, hook, list of what the email brings, a single field, primary button, short GDPR notice and a preview (drawn cover or illustration). `required` mode (locked file, sent as an attachment) or `open` (tool result already shown, the email keeps a copy). `band` (full width) and `card` (inside an article) variants. Engine: LeadCapture organism → POST /api/lead-magnet.',
};
