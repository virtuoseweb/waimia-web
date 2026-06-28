// Waimia · Co-location DS (Wave #38, T5) · module `how-we-ship` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'how-we-ship',
    roman: 'IV',
    section_label_fr: 'Acte IV · Comment on livre',
    section_label_en: 'Act IV · How we ship',
    heading_fr: 'Quatre <i>étapes</i>. Pas de slide deck intermédiaire.',
    heading_en: 'Four <i>steps</i>. No intermediate slide deck.',
    aside_fr: 'Chaque étape produit un livrable concret. Vous ne payez la suivante que si la précédente a passé son audit.',
    aside_en: 'Each step delivers something concrete. You only pay the next one if the previous one passed its audit.',
    steps: [
      { n: 'i', label_fr: 'Diagnostic', label_en: 'Diagnostic', body_fr: "On cartographie vos SOPs, on identifie les workflows répétitifs, on chiffre le potentiel d'impact. Sortie : une carte de processus + une priorité.", body_en: 'We map your SOPs, identify repetitive workflows, quantify impact potential. Output: a process map + a priority.' },
      { n: 'ii', label_fr: 'Sprint MVP · 4 semaines', label_en: 'MVP Sprint · 4 weeks', body_fr: "Un agent, un job. On livre un POC fonctionnel en quatre semaines avec audit trail complet et métriques avant/après.", body_en: 'One agent, one job. We ship a working POC in four weeks with full audit trail and before/after metrics.' },
      { n: 'iii', label_fr: 'Mise en production', label_en: 'Production rollout', body_fr: "Adoption équipe, scripts d'onboarding, observabilité, gouvernance. L'agent rejoint le runtime : Claude managé ou self-hosted.", body_en: 'Team adoption, onboarding scripts, observability, governance. The agent joins the runtime: managed Claude or self-hosted.' },
      { n: 'iv', label_fr: 'Maintenance & extension', label_en: 'Maintenance & extension', body_fr: "SRE 24/7, mises à jour modèles, nouveaux cas d'usage, conformité AI Act continue.", body_en: 'SRE 24/7, model upgrades, new use cases, ongoing AI Act compliance.' },
    ],
  };
