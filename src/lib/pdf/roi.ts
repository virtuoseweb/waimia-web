// Rapport PDF du calculateur de temps récupérable (3 pages A4).
// 1. couverture (heures récupérables en héros) · 2. hypothèses et calcul pas à pas ·
// 3. sensibilité, lectures prudentes, audit. Libellés et formules : calculateur-roi-ia.json.
import type { RoiResult } from '../lead-tools/roi';
import { ROI_SENSITIVITY_KEY } from '../lead-tools/roi';
import { evalFormula } from '../lead-tools/formula';
import { AUDIT_RDV_URL } from '../lead-tools/links';
import {
  C,
  COL_W,
  cartouche,
  M_X,
  Pager,
  createReport,
  ctaBlock,
  embedIllustration,
  eur,
  finish,
  frDate,
  hline,
  label,
  labelWidth,
  num,
  para,
  paraHeight,
  rect,
  runningHead,
  sectionTitle,
  text,
  width,
  wordmark,
  type ReportContext,
} from './kit';
import type { PDFFont } from 'pdf-lib';

const DOC_LABEL = 'Temps récupérable par l’IA';

export const ROI_PDF_FILENAME = 'waimia-estimation-temps-recuperable.pdf';

/** Taille maximale (≤ `size`) pour que `s` tienne dans `maxW`. */
function fit(font: PDFFont, s: string, size: number, maxW: number): number {
  let z = size;
  while (z > 8 && width(font, z, s) > maxW) z -= 1;
  return z;
}

export async function renderRoiPdf(res: RoiResult, ctx: ReportContext): Promise<Uint8Array> {
  const v = res.values;
  const inp = res.inputs;
  // Coût de fonctionnement supérieur ou égal à la valeur du temps : aucun retour en 12 mois.
  const noPayback = inp.coutMensuel > 0 && v.plafond <= 0;
  const outLabel = (k: string) => res.outputLines.find((o) => o.key === k)?.label ?? k;
  const r = await createReport({
    title: `${DOC_LABEL} · ${num(v.heuresAn)} heures par an`,
    subject: `Estimation du temps récupérable : ${num(v.heuresAn)} heures par an, ${eur(v.valeurAn)} par an, budget maximal ${eur(v.plafond)} pour un retour en 12 mois.`,
    keywords: ['Waimia', 'calculateur', 'ROI', 'IA', 'PME'],
    date: ctx.date,
  });
  const { f } = r;
  const img = await embedIllustration(r, 'roi');

  /* ───────── Page 1 · couverture ───────── */
  {
    const p = new Pager(r);
    wordmark(p, M_X, 46, 30);
    const k = 'Rapport personnel';
    label(p, k, { x: M_X + COL_W - labelWidth(p, k), yTop: 58 });
    hline(p, 92, { color: C.ink, t: 0.8 });
    const imgH = (COL_W * img.height) / img.width;
    p.page.drawImage(img, { x: M_X, y: p.py(112 + imgH), width: COL_W, height: imgH });
    p.y = 112 + imgH + 26;

    label(p, 'Calculateur de temps récupérable', { x: M_X, yTop: p.y, color: C.accent, bold: true });
    p.y += 18;
    para(p, 'Le temps que l’IA peut vous rendre', { font: f.serif, size: 34, lead: 36 });
    p.y += 20;

    const y0 = p.y;
    const colL = COL_W * 0.54;
    hline(p, y0, { color: C.ink, t: 0.8 });
    label(p, 'Heures récupérables par an', { x: M_X, yTop: y0 + 14 });
    const big = num(v.heuresAn);
    const unitW = width(f.serif, 24, ' h');
    const bs = fit(f.serif, big, 92, colL - unitW - 24);
    text(p, big, { x: M_X - 2, yTop: y0 + 26 + (92 - bs) * 0.8, font: f.serif, size: bs, raw: true });
    text(p, 'h', { x: M_X + width(f.serif, bs, big) + 8, yTop: y0 + 82, font: f.serif, size: 24, color: C.muted });
    para(p, `Sur ${num(inp.heuresTaches * inp.semaines)} heures passées chaque année sur ces tâches.`, {
      x: M_X,
      yTop: y0 + 122,
      w: colL - 24,
      size: 9.4,
      lead: 13.6,
      color: C.muted,
    });

    const xR = M_X + colL + 18;
    const wR = COL_W - colL - 18;
    rect(p, M_X + colL, y0 + 14, 0.6, 150, C.rule);
    const kpis: [string, string, boolean][] = [
      ['Valeur de ce temps par an', eur(v.valeurAn), false],
      ['Budget maximal, retour en 12 mois', eur(v.plafond), true],
    ];
    kpis.forEach(([l, val, accent], i) => {
      const y = y0 + 14 + i * 76;
      label(p, l, { x: xR, yTop: y, size: 6.8 });
      const s = fit(f.serif, val, 32, wR);
      text(p, val, { x: xR, yTop: y + 16 + (32 - s) * 0.8, font: f.serif, size: s, color: accent && v.plafond > 0 ? C.accent : C.ink, raw: true });
      if (i === 0) hline(p, y + 62, { x: xR, w: wR, color: C.rule });
    });
    if (noPayback) {
      label(p, 'Pas de retour en 12 mois', { x: xR, yTop: y0 + 14 + 76 + 54, color: C.accent, bold: true, size: 6.6 });
    }

    // Bande des hypothèses : les cinq valeurs saisies
    {
      const ys = y0 + 188;
      hline(p, ys, { color: C.rule });
      const short: Record<string, string> = { heuresTaches: 'Heures / semaine', semaines: 'Semaines / an', tauxHoraire: 'Coût horaire', partAuto: 'Part automatisable', coutMensuel: 'Coût mensuel' };
      const cw5 = COL_W / res.inputLines.length;
      res.inputLines.forEach((l, i) => {
        const x = M_X + i * cw5;
        label(p, short[l.key] ?? l.label, { x, yTop: ys + 12, size: 6.4 });
        const z = fit(f.monoBold, l.text, 11, cw5 - 8);
        text(p, l.text, { x, yTop: ys + 26, font: f.monoBold, size: z, raw: true });
      });
      p.y = ys + 48;
    }

    cartouche(p, ctx.email, [
      ['Date', frDate(ctx.date)],
      ['Base', 'Vos hypothèses, telles quelles'],
    ]);
  }

  /* ───────── Page 2 · hypothèses et calcul ───────── */
  {
    const p = new Pager(r);
    runningHead(p, DOC_LABEL);
    sectionTitle(p, '01', 'Vos hypothèses', 'Les cinq chiffres que vous avez saisis');
    res.inputLines.forEach((l, i) => {
      const lw = COL_W - 150;
      const h = Math.max(paraHeight(f.sans, 10, l.label, lw, 14), 14) + 16;
      p.ensure(h);
      const y = p.y;
      hline(p, y, { color: i === 0 ? C.ink : C.rule, t: i === 0 ? 0.8 : 0.6 });
      para(p, l.label, { x: M_X, yTop: y + 8, w: lw, size: 10, lead: 14 });
      const s = l.text;
      text(p, s, { x: M_X + COL_W - width(f.monoBold, 11, s), yTop: y + 10, font: f.monoBold, size: 11, raw: true });
      p.y = y + h;
    });
    hline(p, p.y, { color: C.rule });
    p.y += 34;

    sectionTitle(p, '02', 'Le calcul, pas à pas', 'De vos heures au budget à ne pas dépasser');
    const yearly = evalFormula('heuresTaches * semaines', inp);
    const steps: [string, string, string][] = [
      ['Heures passées sur ces tâches par an', `${num(inp.heuresTaches, 2)} h/sem × ${num(inp.semaines)} sem`, `${num(yearly)} h`],
      [outLabel('heuresAn'), `${num(yearly)} h × ${num(inp[ROI_SENSITIVITY_KEY], 2)} %`, `${num(v.heuresAn)} h`],
      [outLabel('valeurAn'), `${num(v.heuresAn)} h × ${num(inp.tauxHoraire, 2)} €/h`, eur(v.valeurAn)],
      [outLabel('plafond'), `${eur(v.valeurAn)} − ${num(inp.coutMensuel, 2)} €/mois × 12`, eur(v.plafond)],
    ];
    steps.forEach(([t, eq, result], i) => {
      const tw = COL_W - 40 - 150;
      const th = paraHeight(f.sansBold, 10, t, tw, 13.5);
      const h = th + 6 + 14 + 18;
      p.ensure(h);
      const y = p.y;
      rect(p, M_X, y, 24, 24, i === steps.length - 1 ? C.accent : C.ink);
      text(p, String(i + 1), { x: M_X + 12 - width(f.monoBold, 10, String(i + 1)) / 2, yTop: y + 7, font: f.monoBold, size: 10, color: C.paper, raw: true });
      para(p, t, { x: M_X + 40, yTop: y, w: tw, font: f.sansBold, size: 10, lead: 13.5 });
      text(p, eq, { x: M_X + 40, yTop: y + th + 6, font: f.mono, size: 9.2, color: C.muted, raw: true });
      const rs = fit(f.serif, result, 21, 150);
      text(p, result, { x: M_X + COL_W - width(f.serif, rs, result), yTop: y + 1, font: f.serif, size: rs, color: i === steps.length - 1 ? C.accent : C.ink, raw: true });
      if (i < steps.length - 1) rect(p, M_X + 11.6, y + 28, 0.8, h - 32, C.rule);
      p.y = y + h;
    });
    p.y += 6;
    para(p, 'Le budget maximal ne dit pas ce que coûte un projet : il dit ce qu’il ne doit pas coûter pour se rembourser en douze mois. Un devis au-dessus signale un périmètre trop large ou une tâche sans assez de volume.', {
      size: 9.4,
      lead: 14,
      color: C.muted,
      w: COL_W * 0.9,
    });
  }

  /* ───────── Page 3 · sensibilité, lectures, audit ───────── */
  {
    const p = new Pager(r);
    runningHead(p, DOC_LABEL);
    sectionTitle(p, '03', 'Sensibilité', 'Si la part automatisable était plus basse, ou plus haute', 22);
    const sc = res.scenarios;
    const lw = 150;
    const cw = (COL_W - lw) / sc.length;
    // en-têtes de colonnes
    const yH = p.y;
    sc.forEach((s, i) => {
      const x = M_X + lw + i * cw;
      const base = i === 1;
      rect(p, x + 2, yH, cw - 4, 132, base ? C.ink : C.soft);
      label(p, s.label, { x: x + 12, yTop: yH + 10, color: base ? C.paper : C.muted, size: 6.8, bold: base });
      text(p, `${num(s.partAuto)} %`, { x: x + 12, yTop: yH + 24, font: f.serif, size: 22, color: base ? C.paper : C.ink });
    });
    const rows: [string, (o: Record<string, number>) => string][] = [
      ['Heures récupérables par an', (o) => `${num(o.heuresAn)} h`],
      ['Valeur par an', (o) => eur(o.valeurAn)],
      ['Budget maximal', (o) => eur(o.plafond)],
    ];
    label(p, 'Part automatisable', { x: M_X, yTop: yH + 30, size: 6.8 });
    rows.forEach(([l, fmt], j) => {
      const y = yH + 58 + j * 24;
      hline(p, y - 6, { w: lw, color: C.rule });
      text(p, l, { x: M_X, yTop: y, font: f.sans, size: 9.2 });
      sc.forEach((s, i) => {
        const x = M_X + lw + i * cw;
        const val = fmt(s.outputs);
        const z = fit(f.monoBold, val, 9.6, cw - 24);
        text(p, val, { x: x + 12, yTop: y, font: f.monoBold, size: z, color: i === 1 ? C.paper : C.ink, raw: true });
      });
    });
    p.y = yH + 132 + 30;

    // lectures prudentes (déterministes, tirées des hypothèses)
    label(p, 'Ce que le chiffre ne dit pas', { x: M_X, yTop: p.y, color: C.accent, bold: true });
    p.y += 18;
    const low = sc[0];
    const notes: string[] = [];
    if (noPayback) {
      notes.push('Avec ces hypothèses, le coût de fonctionnement dépasse la valeur du temps récupéré : pas de retour en douze mois. Resserrez le périmètre avant de demander un devis.');
    } else if (v.heuresAn === 0) {
      notes.push('Avec ces hypothèses, aucune heure n’est récupérable : vérifiez les heures par semaine et la part automatisable avant de conclure.');
    }
    notes.push('Une heure récupérée n’est une économie que si elle est réaffectée : le calcul valorise du temps, pas une baisse de charges.');
    notes.push(
      low.partAuto < inp[ROI_SENSITIVITY_KEY]
        ? `La part automatisable est l’hypothèse la plus fragile. À ${num(low.partAuto)} %, le budget maximal passe à ${eur(low.outputs.plafond)}.`
        : 'La part automatisable est l’hypothèse la plus fragile : testez toujours le résultat avec une valeur basse avant de décider.',
    );
    notes.push(
      inp.coutMensuel === 0
        ? 'Le coût de fonctionnement est laissé à zéro : abonnements, consommation d’API et maintenance réduiront le plafond.'
        : 'Le calcul ignore le temps d’adoption par les équipes, les erreurs évitées et la qualité de service.',
    );
    notes.push('Seul un pilote en production, mesuré avant et après, donne un chiffre réel.');
    notes.forEach((n) => {
      const h = paraHeight(f.sans, 9.6, n, COL_W - 18, 14.2);
      p.ensure(h + 7);
      rect(p, M_X, p.y + 5, 4, 4, C.accent);
      para(p, n, { x: M_X + 18, yTop: p.y, w: COL_W - 18, size: 9.6, lead: 14.2 });
      p.y += h + 7;
    });
    p.y += 16;

    ctaBlock(p, {
      kicker: 'Audit IA gratuit · 45 minutes',
      title: 'Passer du chiffre au chantier',
      body: 'L’audit IA vérifie l’hypothèse la plus fragile, la part automatisable, en passant vos tâches en revue une par une : 45 minutes en visio, gratuit, avec une cartographie écrite à la fin.',
      button: 'Réserver l’audit IA',
      url: AUDIT_RDV_URL,
      facts: ['45 minutes en visio', 'Gratuit', 'Cartographie écrite'],
    });
  }

  return finish(r);
}
