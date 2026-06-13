// src/data/guarantees.ts : référentiel UNIQUE des garanties contractuelles Waimia (V-F1, docs/40 §1).
// Consolidation de l'existant, 0 invention : les 5 entrées proviennent de src/content/guarantees/*.mdx
// (ids repris tels quels, MDX archivés dans docs/archive/content/guarantees/). Même pattern que
// pain-points.ts / proof-points.ts (R7a) : typé, ids stables kebab-case.
// Consommateurs cibles : tunnel step 4 (§4.2) + futur tunnel conversion Phase C.
// `sources` = chemins de contenu (collection/slug) d'origine, conservés comme trace de provenance.
// Validé par scripts/check-content-refs.mjs (ids stables kebab-case).

export type GuaranteeCategory =
  | 'remboursement'
  | 'delai'
  | 'qualite'
  | 'rgpd'
  | 'support';

export type GuaranteeId =
  | 'remboursement-100pct-30-jours'
  | 'audit-cadrage-45min-sous-5-jours'
  | 'livrable-revu-72h-ouvrees'
  | 'donnees-hebergees-ue-dpa-signe'
  | 'support-email-reponse-4h';

export interface Guarantee {
  id: GuaranteeId;
  category: GuaranteeCategory;
  /** Nom d'icône Lucide (parité avec le champ `icon` des MDX d'origine). */
  icon: string;
  label_fr: string;
  label_en: string;
  promise_fr: string;
  promise_en: string;
  detail_fr: string;
  detail_en: string;
  /** Slugs d'offres liées (collection `offres`). */
  relatedOffres: string[];
  /** Chemins de contenu (collection/slug) d'origine, MDX archivés en V-F1. */
  sources: string[];
}

export const GUARANTEES: readonly Guarantee[] = [
  {
    id: 'remboursement-100pct-30-jours',
    category: 'remboursement',
    icon: 'shield-check',
    label_fr: 'Remboursement 100 % sous 30 jours',
    label_en: '100% refund within 30 days',
    promise_fr:
      'Waimia rembourse 100 % des honoraires encaissés sous 30 jours si le livrable final ne respecte pas la promesse écrite validée au lancement.',
    promise_en:
      'Waimia refunds 100% of collected fees within 30 days if the final deliverable does not meet the written promise approved at kickoff.',
    detail_fr:
      'La demande doit citer des écarts observables entre la promesse signée et le livrable remis. Un changement de périmètre demandé en cours de mission est exclu.',
    detail_en:
      'The request must identify observable gaps between the signed promise and the delivered work. Scope changes requested during the engagement are excluded.',
    relatedOffres: ['application-ia-pme', 'infrastructure-ia'],
    sources: ['guarantees/remboursement-100pct-30-jours'],
  },
  {
    id: 'audit-cadrage-45min-sous-5-jours',
    category: 'delai',
    icon: 'clock',
    label_fr: 'Audit de cadrage sous 5 jours',
    label_en: 'Scoping audit within 5 business days',
    promise_fr:
      'Waimia planifie un audit de cadrage de 45 minutes sous 5 jours ouvrés après une prise de contact qualifiée et documentée.',
    promise_en:
      'Waimia schedules a 45-minute scoping audit within 5 business days after a qualified and documented first contact.',
    detail_fr:
      "Le délai court après réception des éléments de contexte minimaux et validation d'un créneau commun. Hors périodes de fermeture annoncées.",
    detail_en:
      'The delay starts after receiving the minimum context and confirming a shared time slot. Announced closure periods are excluded.',
    relatedOffres: ['activation-ia', 'growth-system-ia'],
    sources: ['guarantees/audit-cadrage-45min-sous-5-jours'],
  },
  {
    id: 'livrable-revu-72h-ouvrees',
    category: 'qualite',
    icon: 'refresh-cw',
    label_fr: 'Livrable revu sous 72 h',
    label_en: 'Deliverable revision within 72 business hours',
    promise_fr:
      "Tout livrable Waimia est revu et corrigé sous 72 h ouvrées après réception d'un retour client documenté et consolidé.",
    promise_en:
      'Every Waimia deliverable is reviewed and corrected within 72 business hours after receiving documented and consolidated client feedback.',
    detail_fr:
      'Un cycle couvre un lot de retours transmis dans un même document ou email. Les demandes nouvelles hors devis sont recadrées séparément.',
    detail_en:
      'One cycle covers a batch of feedback sent in the same document or email. New requests outside the quote are reframed separately.',
    relatedOffres: ['growth-system-ia', 'composable-pilot'],
    sources: ['guarantees/livrable-revu-72h-ouvrees'],
  },
  {
    id: 'donnees-hebergees-ue-dpa-signe',
    category: 'rgpd',
    icon: 'database',
    label_fr: 'Données UE et DPA signé',
    label_en: 'EU hosting and signed DPA',
    promise_fr:
      "Les données clients opérées par Waimia sont hébergées exclusivement dans l'Union européenne et un DPA est signé au démarrage de la mission.",
    promise_en:
      'Client data operated by Waimia is hosted exclusively in the European Union, and a DPA is signed at the start of the engagement.',
    detail_fr:
      "Le périmètre couvre les outils opérés directement par Waimia pour la mission. Les services tiers imposés par le client sont hors périmètre d'hébergement.",
    detail_en:
      'The scope covers tools operated directly by Waimia for the engagement. Third-party services imposed by the client are outside the hosting scope.',
    relatedOffres: ['infrastructure-ia', 'application-ia-pme'],
    sources: ['guarantees/donnees-hebergees-ue-dpa-signe'],
  },
  {
    id: 'support-email-reponse-4h',
    category: 'support',
    icon: 'mail',
    label_fr: 'Support email : réponse sous 4 h',
    label_en: 'Email support: human reply within 4 business hours',
    promise_fr:
      'Le support email Waimia apporte une première réponse humaine sous 4 h ouvrées, du lundi au vendredi, entre 9 h et 18 h CET.',
    promise_en:
      'Waimia email support provides a first human reply within 4 business hours, Monday to Friday, between 9 a.m. and 6 p.m. CET.',
    detail_fr:
      "Le délai s'applique aux demandes reçues sur le canal support convenu. Les urgences hors plage ou hors contrat suivent le niveau de couverture prévu.",
    detail_en:
      'The delay applies to requests received on the agreed support channel. Off-hours or out-of-scope emergencies follow the contracted coverage level.',
    relatedOffres: ['claude-cowork', 'growth-system-ia'],
    sources: ['guarantees/support-email-reponse-4h'],
  },
];

export const GUARANTEE_BY_ID: ReadonlyMap<GuaranteeId, Guarantee> = new Map(
  GUARANTEES.map((g) => [g.id, g]),
);
