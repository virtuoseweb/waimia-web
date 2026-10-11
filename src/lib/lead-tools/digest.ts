// Restitution courte d'un résultat d'outil pour les e-mails (visiteur et alerte interne) :
// chiffres clés, lignes détaillées, « angle de reprise » déterministe (aucun LLM) et brouillon
// de réponse. Tout dérive du résultat recalculé côté serveur.
import type { LeadToolResult } from './index';
import { LEAD_TOOL_LABEL } from './index';
import { ROI_SENSITIVITY_KEY } from './roi';
import { AUDIT_RDV_URL } from './links';

const nf = (v: number, d = 0) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: d }).format(v).replace(/\u202F/g, '\u00A0');
const eur = (v: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(v)).replace(/\u202F/g, '\u00A0');

export interface DigestMetric {
  label: string;
  value: string;
  /** Mise en avant (accent). */
  accent?: boolean;
}
export interface DigestRow {
  label: string;
  value: string;
  emphasis?: boolean;
}
export interface DigestSection {
  title: string;
  rows: DigestRow[];
}

export interface LeadToolDigest {
  toolLabel: string;
  /** Objet de l'e-mail au visiteur. */
  visitorSubject: string;
  /** Ligne de prévisualisation. */
  preview: string;
  /** Une phrase de résultat (alerte interne, en-tête). */
  headline: string;
  metrics: DigestMetric[];
  /** Détail complet (alerte interne) : scores, réponses ou hypothèses et résultats. */
  sections: DigestSection[];
  /** 2 à 3 phrases pour reprendre le contact. */
  angle: string[];
  /** Nombre de pages du rapport PDF. */
  pages: number;
}

export function digestLeadTool(res: LeadToolResult): LeadToolDigest {
  if (res.tool === 'diagnostic-maturite-ia') {
    const lowest = res.weak.questions.slice().sort((a, b) => a.value - b.value)[0];
    return {
      toolLabel: LEAD_TOOL_LABEL[res.tool],
      visitorSubject: `Votre rapport de maturité IA · niveau ${res.level.level} sur 5`,
      preview: `Niveau ${res.level.level} sur 5, ${res.level.name}. Votre rapport complet est en pièce jointe.`,
      headline: `Niveau ${res.level.level} sur 5 (${res.level.name}) · ${res.total}/${res.max} · point faible : ${res.weak.name}`,
      metrics: [
        { label: 'Niveau', value: `${res.level.level} sur 5 · ${res.level.name}`, accent: true },
        { label: 'Score', value: `${res.total} sur ${res.max}` },
        { label: 'À traiter en premier', value: res.weak.name },
      ],
      sections: [
        {
          title: 'Scores par dimension',
          rows: res.dims.map((d) => ({
            label: d.key === res.weak.key ? `${d.name} (la plus faible)` : d.name,
            value: `${d.score} sur ${d.max}`,
            emphasis: d.key === res.weak.key,
          })),
        },
        ...res.dims.map((d) => ({
          title: `Réponses · ${d.name}`,
          rows: d.questions.map((q) => ({ label: `${q.n}. ${q.text}`, value: `${q.answer} (${q.value}/3)`, emphasis: q.value <= 1 })),
        })),
      ],
      angle: [
        `Niveau ${res.level.level} (${res.level.name}), ${res.total} sur ${res.max} : la dimension la plus faible est ${res.weak.name} (${res.weak.score} sur ${res.weak.max}).`,
        `Ouvrir par la question « ${lowest.text} » : réponse « ${lowest.answer} ».`,
        `Le rapport lui suggère : « ${res.level.next} »`,
      ],
      pages: 4,
    };
  }
  const v = res.values;
  const part = res.inputs[ROI_SENSITIVITY_KEY];
  const noPayback = res.inputs.coutMensuel > 0 && v.plafond <= 0;
  return {
    toolLabel: LEAD_TOOL_LABEL[res.tool],
    visitorSubject: `Votre estimation · ${nf(v.heuresAn)} heures récupérables par an`,
    preview: `${nf(v.heuresAn)} heures par an, ${eur(v.valeurAn)} de valeur. Votre rapport complet est en pièce jointe.`,
    headline: `${nf(v.heuresAn)} h/an · ${eur(v.valeurAn)}/an · budget max ${eur(v.plafond)}`,
    metrics: [
      { label: 'Heures récupérables par an', value: `${nf(v.heuresAn)} h`, accent: true },
      { label: 'Valeur de ce temps par an', value: eur(v.valeurAn) },
      { label: 'Budget maximal, retour en 12 mois', value: eur(v.plafond) },
    ],
    sections: [
      { title: 'Hypothèses saisies', rows: res.inputLines.map((l) => ({ label: l.label, value: l.text })) },
      { title: 'Résultats', rows: res.outputLines.map((l) => ({ label: l.label, value: l.text, emphasis: true })) },
      {
        title: 'Sensibilité (part automatisable)',
        rows: res.scenarios.map((s) => ({ label: `${s.label} · ${nf(s.partAuto)} %`, value: `${nf(s.outputs.heuresAn)} h · budget max ${eur(s.outputs.plafond)}` })),
      },
    ],
    angle: [
      `${nf(v.heuresAn)} heures récupérables par an déclarées, soit ${eur(v.valeurAn)} de valeur et un budget maximal de ${eur(v.plafond)}.`,
      part >= 70
        ? `Part automatisable déclarée haute (${nf(part)} %) : la vérifier tâche par tâche avant tout chiffrage.`
        : part <= 20
          ? `Part automatisable prudente (${nf(part)} %) : chercher les tâches à plus fort volume.`
          : `Part automatisable à ${nf(part)} % : c'est l'hypothèse à vérifier pendant l'audit.`,
      noPayback
        ? 'Coût mensuel supérieur à la valeur du temps : recadrer le périmètre avant de parler devis.'
        : res.inputs.coutMensuel === 0
          ? 'Coût de fonctionnement laissé à zéro : le plafond est surestimé, à corriger ensemble.'
          : `Coût de fonctionnement déclaré : ${eur(res.inputs.coutMensuel)} par mois.`,
    ],
    pages: 3,
  };
}

/** Lien Gmail « nouveau message » prérempli (encodage URI complet, < `max` caractères). */
export function gmailComposeUrl(to: string, subject: string, paragraphs: string[], max = 1800): string {
  const base = 'https://mail.google.com/mail/?view=cm&fs=1';
  const build = (ps: string[]) =>
    `${base}&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(ps.join('\n\n'))}`;
  // On retire d'abord les paragraphes facultatifs (au milieu), puis on tronque le plus long.
  const ps = paragraphs.slice();
  let url = build(ps);
  while (url.length >= max && ps.length > 3) {
    ps.splice(ps.length - 3, 1);
    url = build(ps);
  }
  while (url.length >= max) {
    const i = ps.reduce((k, p, j) => (p.length > ps[k].length ? j : k), 0);
    ps[i] = `${ps[i].slice(0, Math.max(0, ps[i].length - 40)).trimEnd()}…`;
    url = build(ps);
  }
  return url;
}

/** Brouillon de réponse au visiteur (paragraphes), repris par le lien Gmail de l'alerte. */
export function replyDraft(res: LeadToolResult): { subject: string; paragraphs: string[] } {
  if (res.tool === 'diagnostic-maturite-ia') {
    const lowest = res.weak.questions.slice().sort((a, b) => a.value - b.value)[0];
    return {
      subject: `Votre diagnostic de maturité IA (niveau ${res.level.level} sur 5)`,
      paragraphs: [
        'Bonjour,',
        `Merci d'avoir fait le diagnostic de maturité IA sur waimia.com. Votre résultat : niveau ${res.level.level} sur 5 (${res.level.name}), avec ${res.weak.name} comme point à traiter en premier.`,
        `Une question pour aller plus loin : sur « ${lowest.text} », vous avez répondu « ${lowest.answer} ». Qu'est-ce qui bloque aujourd'hui de ce côté ?`,
        `Si c'est utile, on peut en parler 45 minutes en visio, gratuitement : ${AUDIT_RDV_URL}`,
        'Bien à vous,\nWaimia',
      ],
    };
  }
  const v = res.values;
  return {
    subject: `Votre estimation de temps récupérable (${nf(v.heuresAn)} h par an)`,
    paragraphs: [
      'Bonjour,',
      `Merci d'avoir utilisé le calculateur sur waimia.com. Avec vos hypothèses, l'estimation donne ${nf(v.heuresAn)} heures récupérables par an et un budget de mise en place à ne pas dépasser de ${eur(v.plafond)}.`,
      `L'hypothèse la plus fragile est la part automatisable (${nf(res.inputs[ROI_SENSITIVITY_KEY])} %). Quelles sont les tâches que vous aviez en tête ?`,
      `Si c'est utile, on peut les passer en revue 45 minutes en visio, gratuitement : ${AUDIT_RDV_URL}`,
      'Bien à vous,\nWaimia',
    ],
  };
}
