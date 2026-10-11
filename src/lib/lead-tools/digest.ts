// Restitution courte d'un résultat d'outil pour les e-mails (visiteur et alerte interne) :
// chiffres clés, lignes détaillées, « angle de reprise » déterministe (aucun LLM) et brouillon
// de réponse. Tout dérive du résultat recalculé côté serveur.
import type { DiagnosticResult, LeadToolResult } from './index';
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

/**
 * Diagnostic : y a-t-il réellement une dimension en retrait ? Non quand toutes les dimensions ont
 * le même score (le « minimum » n'est alors qu'un ex æquo tranché par l'ordre), et a fortiori au
 * maximum (30 sur 30 : `maximal`). Aucun point faible ni « blocage » ne doit alors être affirmé.
 */
function diagSpread(res: DiagnosticResult): { even: boolean; maximal: boolean } {
  const even = res.dims.every((d) => d.score === res.dims[0].score);
  return { even, maximal: even && res.weak.score >= res.weak.max };
}

/**
 * Budget maximal en toutes lettres : jamais de montant négatif ni de « à ne pas dépasser » sur un
 * plafond nul (même logique que le PDF : src/lib/pdf/roi.ts, branche `noPayback`).
 */
function budgetValue(plafond: number, coutMensuel: number): string {
  if (plafond > 0) return eur(plafond);
  return coutMensuel > 0 ? 'Aucun, pas de retour en 12 mois' : 'Nul, aucune valeur à investir';
}
function budgetShort(plafond: number, coutMensuel: number): string {
  if (plafond > 0) return `budget max ${eur(plafond)}`;
  return coutMensuel > 0 ? 'pas de retour en 12 mois' : 'budget max nul';
}

export function digestLeadTool(res: LeadToolResult, opts: { hasPdf?: boolean } = {}): LeadToolDigest {
  const hasPdf = opts.hasPdf !== false;
  if (res.tool === 'diagnostic-maturite-ia') {
    const lowest = res.weak.questions.slice().sort((a, b) => a.value - b.value)[0];
    const { even, maximal } = diagSpread(res);
    const nDims = res.dims.length;
    return {
      toolLabel: LEAD_TOOL_LABEL[res.tool],
      visitorSubject: `Votre rapport de maturité IA · niveau ${res.level.level} sur 5`,
      preview: `Niveau ${res.level.level} sur 5, ${res.level.name}. ${hasPdf ? 'Votre rapport complet est en pièce jointe.' : 'Votre résultat est détaillé dans cet e-mail.'}`,
      headline: `Niveau ${res.level.level} sur 5 (${res.level.name}) · ${res.total}/${res.max} · ${
        maximal ? 'niveau maximal, aucune dimension en retrait' : even ? 'aucune dimension en retrait' : `point faible : ${res.weak.name}`
      }`,
      metrics: [
        { label: 'Niveau', value: `${res.level.level} sur 5 · ${res.level.name}`, accent: true },
        { label: 'Score', value: `${res.total} sur ${res.max}` },
        even
          ? { label: 'Dimensions', value: maximal ? 'Toutes au maximum' : 'Toutes au même niveau' }
          : { label: 'À traiter en premier', value: res.weak.name },
      ],
      sections: [
        {
          title: 'Scores par dimension',
          rows: res.dims.map((d) => ({
            label: !even && d.key === res.weak.key ? `${d.name} (la plus faible)` : d.name,
            value: `${d.score} sur ${d.max}`,
            emphasis: !even && d.key === res.weak.key,
          })),
        },
        ...res.dims.map((d) => ({
          title: `Réponses · ${d.name}`,
          rows: d.questions.map((q) => ({ label: `${q.n}. ${q.text}`, value: `${q.answer} (${q.value}/3)`, emphasis: q.value <= 1 })),
        })),
      ],
      angle: even
        ? [
            maximal
              ? `Niveau ${res.level.level} (${res.level.name}), ${res.total} sur ${res.max} : aucune dimension en retrait, les ${nDims} sont au maximum.`
              : `Niveau ${res.level.level} (${res.level.name}), ${res.total} sur ${res.max} : aucune dimension en retrait, les ${nDims} sont au même niveau (${res.weak.score} sur ${res.weak.max}).`,
            maximal
              ? `Niveau ${res.level.level} : parler d'industrialisation et de gouvernance, pas d'un blocage.`
              : `Partir du premier chantier visé par la personne plutôt que d'une dimension à corriger.`,
            `Le rapport lui suggère : « ${res.level.next} »`,
          ]
        : [
            `Niveau ${res.level.level} (${res.level.name}), ${res.total} sur ${res.max} : la dimension la plus faible est ${res.weak.name} (${res.weak.score} sur ${res.weak.max}).`,
            `Ouvrir par la question « ${lowest.text} » : réponse « ${lowest.answer} ».`,
            `Le rapport lui suggère : « ${res.level.next} »`,
          ],
      pages: 4,
    };
  }
  const v = res.values;
  const part = res.inputs[ROI_SENSITIVITY_KEY];
  const cout = res.inputs.coutMensuel;
  const noPayback = cout > 0 && v.plafond <= 0;
  return {
    toolLabel: LEAD_TOOL_LABEL[res.tool],
    visitorSubject: `Votre estimation · ${nf(v.heuresAn)} heures récupérables par an`,
    preview: `${nf(v.heuresAn)} heures par an, ${eur(v.valeurAn)} de valeur. ${hasPdf ? 'Votre rapport complet est en pièce jointe.' : 'Votre résultat est détaillé dans cet e-mail.'}`,
    headline: `${nf(v.heuresAn)} h/an · ${eur(v.valeurAn)}/an · ${budgetShort(v.plafond, cout)}`,
    metrics: [
      { label: 'Heures récupérables par an', value: `${nf(v.heuresAn)} h`, accent: true },
      { label: 'Valeur de ce temps par an', value: eur(v.valeurAn) },
      { label: 'Budget maximal, retour en 12 mois', value: budgetValue(v.plafond, cout) },
    ],
    sections: [
      { title: 'Hypothèses saisies', rows: res.inputLines.map((l) => ({ label: l.label, value: l.text })) },
      {
        title: 'Résultats',
        rows: res.outputLines.map((l) => ({ label: l.label, value: l.key === 'plafond' && l.value <= 0 ? budgetValue(l.value, cout) : l.text, emphasis: true })),
      },
      {
        title: 'Sensibilité (part automatisable)',
        rows: res.scenarios.map((s) => ({ label: `${s.label} · ${nf(s.partAuto)} %`, value: `${nf(s.outputs.heuresAn)} h · ${budgetShort(s.outputs.plafond, cout)}` })),
      },
    ],
    angle: [
      v.plafond > 0
        ? `${nf(v.heuresAn)} heures récupérables par an déclarées, soit ${eur(v.valeurAn)} de valeur et un budget maximal de ${eur(v.plafond)}.`
        : `${nf(v.heuresAn)} heures récupérables par an déclarées, soit ${eur(v.valeurAn)} de valeur annuelle : ${noPayback ? 'aucun budget ne se rembourse en 12 mois' : 'le budget maximal est nul'}.`,
      part >= 70
        ? `Part automatisable déclarée haute (${nf(part)} %) : la vérifier tâche par tâche avant tout chiffrage.`
        : part <= 20
          ? `Part automatisable prudente (${nf(part)} %) : chercher les tâches à plus fort volume.`
          : `Part automatisable à ${nf(part)} % : c'est l'hypothèse à vérifier pendant l'audit.`,
      noPayback
        ? `Coût de fonctionnement annuel (${eur(cout * 12)}, soit ${eur(cout)} par mois) ${cout * 12 === v.valeurAn ? 'égal à' : 'supérieur à'} la valeur annuelle du temps (${eur(v.valeurAn)}) : recadrer le périmètre avant de parler devis.`
        : v.plafond <= 0
          ? 'Valeur du temps nulle (heures par semaine, part automatisable ou coût horaire à zéro) : le plafond est nul, revoir ces hypothèses ensemble.'
          : cout === 0
            ? 'Coût de fonctionnement laissé à zéro : le plafond est surestimé, à corriger ensemble.'
            : `Coût de fonctionnement déclaré : ${eur(cout)} par mois.`,
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
    const { even, maximal } = diagSpread(res);
    if (even) {
      return {
        subject: `Votre diagnostic de maturité IA (niveau ${res.level.level} sur 5)`,
        paragraphs: [
          'Bonjour,',
          `Merci d'avoir fait le diagnostic de maturité IA sur waimia.com. Votre résultat : niveau ${res.level.level} sur 5 (${res.level.name}), avec ${maximal ? 'toutes les dimensions au maximum' : 'des dimensions toutes au même niveau'}.`,
          maximal
            ? `À ce niveau, la question est moins de démarrer que d'industrialiser et de gouverner. Où en êtes-vous sur ces deux points ?`
            : `Aucune dimension ne ressort en retrait : le plus utile est de partir de ce que vous voulez réaliser en premier. Quel est le premier chantier que vous avez en tête ?`,
          `Si c'est utile, on peut en parler 45 minutes en visio, gratuitement : ${AUDIT_RDV_URL}`,
          'Bien à vous,\nWaimia',
        ],
      };
    }
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
  const cout = res.inputs.coutMensuel;
  const estimate =
    v.plafond > 0
      ? `l'estimation donne ${nf(v.heuresAn)} heures récupérables par an et un budget de mise en place à ne pas dépasser de ${eur(v.plafond)}.`
      : cout > 0
        ? `l'estimation donne ${nf(v.heuresAn)} heures récupérables par an, soit ${eur(v.valeurAn)} de valeur annuelle, pour un coût de fonctionnement annuel de ${eur(cout * 12)} ${cout * 12 === v.valeurAn ? 'égal à' : 'supérieur à'} cette valeur : pas de retour en 12 mois à ce stade.`
        : `l'estimation donne ${nf(v.heuresAn)} heures récupérables par an, sans valeur chiffrée : le budget maximal est donc nul.`;
  return {
    subject: `Votre estimation de temps récupérable (${nf(v.heuresAn)} h par an)`,
    paragraphs: [
      'Bonjour,',
      `Merci d'avoir utilisé le calculateur sur waimia.com. Avec vos hypothèses, ${estimate}`,
      `L'hypothèse la plus fragile est la part automatisable (${nf(res.inputs[ROI_SENSITIVITY_KEY])} %). Quelles sont les tâches que vous aviez en tête ?`,
      `Si c'est utile, on peut les passer en revue 45 minutes en visio, gratuitement : ${AUDIT_RDV_URL}`,
      'Bien à vous,\nWaimia',
    ],
  };
}
