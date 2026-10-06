// Waimia · module `lead-capture-band` · demo bilingue.
// Ressource verrouillée (PDF) : seule la clé `lead_magnet` est posée, le texte, le mode et la
// couverture viennent de LEAD_CAPTURE_COPY (src/data/conversion.ts). Tout champ texte ajouté
// ici remplacerait la valeur par défaut (override d'instance).
import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'lead-capture-band',
  background: 'paper-2',
  variant: 'band',
  lead_magnet: 'guide-achat-claude-pme',
};
