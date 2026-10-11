// Rapport PDF du diagnostic de maturité IA (4 pages A4).
// 1. couverture · 2. lecture par dimension · 3. réponses détaillées · 4. priorité, étape, audit.
// Tous les textes de restitution viennent de src/data/diagnostic-maturite-ia.ts (via le résultat).
import type { DiagnosticResult } from '../lead-tools/diagnostic';
import { AUDIT_RDV_URL } from '../lead-tools/links';
import { SITE } from '../../site.config';
import {
  C,
  COL_W,
  cartouche,
  M_X,
  Pager,
  createReport,
  ctaBlock,
  embedIllustration,
  finish,
  frDate,
  hline,
  label,
  labelWidth,
  link,
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

const DOC_LABEL = 'Diagnostic de maturité IA';

export const DIAGNOSTIC_PDF_FILENAME = 'waimia-diagnostic-maturite-ia.pdf';

export async function renderDiagnosticPdf(res: DiagnosticResult, ctx: ReportContext): Promise<Uint8Array> {
  const r = await createReport({
    title: `${DOC_LABEL} · niveau ${res.level.level} sur 5`,
    subject: `Rapport du diagnostic de maturité IA : score ${res.total} sur ${res.max}, niveau ${res.level.level} (${res.level.name}).`,
    keywords: ['Waimia', 'diagnostic', 'maturité IA', 'PME'],
    date: ctx.date,
  });
  const { f } = r;
  const img = await embedIllustration(r, 'diagnostic');

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

    label(p, DOC_LABEL, { x: M_X, yTop: p.y, color: C.accent, bold: true });
    p.y += 18;
    para(p, 'Où en est votre entreprise avec l’IA', { font: f.serif, size: 34, lead: 36 });
    p.y += 20;

    // Bandeau résultat : niveau | score
    const y0 = p.y;
    const colL = COL_W * 0.52;
    hline(p, y0, { color: C.ink, t: 0.8 });
    label(p, 'Votre niveau', { x: M_X, yTop: y0 + 14 });
    const big = String(res.level.level);
    text(p, big, { x: M_X - 2, yTop: y0 + 26, font: f.serif, size: 92 });
    const bw = width(f.serif, 92, big);
    text(p, 'sur 5', { x: M_X + bw + 8, yTop: y0 + 82, font: f.serif, size: 22, color: C.muted });
    text(p, res.level.name, { x: M_X, yTop: y0 + 122, font: f.serifItalic, size: 30, color: C.accent });

    const xR = M_X + colL + 18;
    const wR = COL_W - colL - 18;
    rect(p, M_X + colL, y0 + 14, 0.6, 150, C.rule);
    label(p, 'Score', { x: xR, yTop: y0 + 14 });
    const sc = String(res.total);
    text(p, sc, { x: xR, yTop: y0 + 30, font: f.serif, size: 46 });
    text(p, `sur ${res.max}`, { x: xR + width(f.serif, 46, sc) + 6, yTop: y0 + 54, font: f.serif, size: 18, color: C.muted });
    // jauge segmentée sur 30, découpée par niveaux
    const gy = y0 + 92;
    const unit = wR / res.max;
    for (let i = 0; i < res.max; i++) {
      const lv = res.levels.find((l) => i >= l.min && i <= l.max);
      const filled = i < res.total;
      rect(p, xR + i * unit + 0.6, gy, unit - 1.2, 12, filled ? (lv?.level === res.level.level ? C.accent : C.ink) : C.track);
    }
    res.levels.forEach((l) => {
      const x = xR + l.min * unit + 0.6;
      label(p, String(l.level), { x, yTop: gy + 18, size: 6.6, color: l.level === res.level.level ? C.accent : C.muted, bold: l.level === res.level.level });
    });
    para(p, res.level.reading, { x: xR, yTop: gy + 36, w: wR, font: f.sans, size: 9.4, lead: 13.6, color: C.ink });
    p.y = y0 + 180;

    // Bande de lecture rapide : les cinq dimensions, la plus faible en accent
    {
      const ys = p.y + 8;
      hline(p, ys, { color: C.rule });
      const cw5 = COL_W / res.dims.length;
      res.dims.forEach((d, i) => {
        const weak = d.key === res.weak.key;
        const x = M_X + i * cw5;
        label(p, d.name, { x, yTop: ys + 12, size: 6.6, color: weak ? C.accent : C.muted, bold: weak });
        text(p, `${d.score}/${d.max}`, { x, yTop: ys + 26, font: f.monoBold, size: 12, color: weak ? C.accent : C.ink, raw: true });
      });
      p.y = ys + 48;
    }

    cartouche(p, ctx.email, [
      ['Date', frDate(ctx.date)],
      ['Questionnaire', '10 questions, 5 dimensions'],
    ]);
  }

  /* ───────── Page 2 · lecture par dimension ───────── */
  {
    const p = new Pager(r);
    runningHead(p, DOC_LABEL);
    sectionTitle(p, '01', 'Lecture par dimension', 'Où en est chaque dimension');
    para(p, 'Chaque dimension est notée sur 6 : deux questions, de 0 à 3 points chacune. La plus basse est le point à traiter en premier.', {
      size: 10,
      color: C.muted,
      w: COL_W * 0.86,
    });
    p.y += 16;

    const nameW = 132;
    const barX = M_X + nameW + 12;
    const valW = 44;
    const barW = COL_W - nameW - 12 - valW;
    res.dims.forEach((d) => {
      const weak = d.key === res.weak.key;
      const whyH = paraHeight(f.sans, 8.6, d.why, barW, 12.2);
      const rowH = Math.max(22 + whyH, 40) + 16;
      p.ensure(rowH);
      const y = p.y;
      hline(p, y, { color: weak ? C.accent : C.rule, t: weak ? 1.2 : 0.6 });
      text(p, d.name, { x: M_X, yTop: y + 12, font: f.sansBold, size: 11.5, color: weak ? C.accent : C.ink });
      if (weak) label(p, 'À traiter en premier', { x: M_X, yTop: y + 30, color: C.accent, size: 6.4, bold: true });
      const seg = barW / d.max;
      for (let i = 0; i < d.max; i++) {
        rect(p, barX + i * seg + 1, y + 13, seg - 2, 10, i < d.score ? (weak ? C.accent : C.ink) : C.track);
      }
      const v = `${d.score}/${d.max}`;
      text(p, v, { x: M_X + COL_W - width(f.monoBold, 11, v), yTop: y + 12, font: f.monoBold, size: 11, color: weak ? C.accent : C.ink, raw: true });
      para(p, d.why, { x: barX, yTop: y + 30, w: barW, font: f.sans, size: 8.6, lead: 12.2, color: C.muted });
      p.y = y + rowH;
    });
    hline(p, p.y, { color: C.rule });
    p.y += 30;

    // Échelle des cinq niveaux
    p.ensure(150);
    label(p, 'Échelle des cinq niveaux', { x: M_X, yTop: p.y, color: C.ink, bold: true });
    p.y += 18;
    const n = res.levels.length;
    const gap = 6;
    const cw = (COL_W - gap * (n - 1)) / n;
    // Une seule taille pour les cinq noms, la plus grande qui ne coupe aucun mot.
    let ns = 15;
    while (ns > 9 && res.levels.some((l) => l.name.split(' ').some((w) => width(f.serifItalic, ns, w) > cw - 20))) ns -= 0.5;
    const nameH = Math.max(...res.levels.map((l) => paraHeight(f.serifItalic, ns, l.name, cw - 20, ns + 1)));
    const boxH = 20 + 30 + nameH + 22;
    res.levels.forEach((l, i) => {
      const x = M_X + i * (cw + gap);
      const cur = l.level === res.level.level;
      rect(p, x, p.y, cw, boxH, cur ? C.ink : C.soft);
      if (cur) rect(p, x, p.y, cw, 4, C.accent);
      text(p, String(l.level), { x: x + 10, yTop: p.y + 14, font: f.serif, size: 26, color: cur ? C.paper : C.ink });
      para(p, l.name, { x: x + 10, yTop: p.y + 48, w: cw - 20, font: cur ? f.serifItalic : f.serif, size: ns, lead: ns + 1, color: cur ? C.paper : C.ink });
      label(p, `${l.min} à ${l.max}`, { x: x + 10, yTop: p.y + 52 + nameH, size: 6.6, color: cur ? hexLight() : C.muted });
    });
    p.y += boxH + 14;
    const ix = M_X + (res.level.level - 1) * (cw + gap);
    label(p, 'Vous êtes ici', { x: ix, yTop: p.y, color: C.accent, bold: true, size: 6.8 });
  }

  /* ───────── Page 3 · réponses détaillées ───────── */
  {
    const p = new Pager(r);
    runningHead(p, DOC_LABEL);
    sectionTitle(p, '02', 'Vos réponses', 'Ce que vous avez répondu, question par question', 22);
    p.y += 2;
    const qx = M_X + 24;
    const qw = COL_W - 24 - 40;
    res.dims.forEach((d) => {
      const weak = d.key === res.weak.key;
      p.ensure(24 + 40);
      const y = p.y;
      rect(p, M_X, y, COL_W, 19, weak ? C.ink : C.soft);
      label(p, d.name, { x: M_X + 8, yTop: y + 6.5, color: weak ? C.paper : C.ink, bold: true, size: 7.2 });
      const sc = `${d.score}/${d.max}`;
      label(p, sc, { x: M_X + COL_W - 8 - labelWidth(p, sc, 7.2, true), yTop: y + 6.5, color: weak ? C.paper : C.ink, bold: true, size: 7.2 });
      p.y = y + 19 + 8;
      d.questions.forEach((q) => {
        const qh = paraHeight(f.sansBold, 9.2, q.text, qw, 12.6);
        const ah = paraHeight(f.serifItalic, 11.2, q.answer, qw, 13.4);
        const h = qh + 3 + ah + 9;
        p.ensure(h);
        const yq = p.y;
        text(p, String(q.n).padStart(2, '0'), { x: M_X, yTop: yq + 1.5, font: f.mono, size: 8, color: C.muted, raw: true });
        para(p, q.text, { x: qx, yTop: yq, w: qw, font: f.sansBold, size: 9.2, lead: 12.6 });
        para(p, q.answer, { x: qx, yTop: yq + qh + 3, w: qw, font: f.serifItalic, size: 11.2, lead: 13.4, color: C.ink });
        const v = `${q.value}/3`;
        text(p, v, { x: M_X + COL_W - width(f.mono, 8.4, v), yTop: yq + 1.5, font: f.mono, size: 8.4, color: q.value <= 1 ? C.accent : C.muted, raw: true });
        p.y = yq + h;
      });
      p.y += 4;
    });
  }

  /* ───────── Page 4 · priorité, prochaine étape, audit ───────── */
  {
    const p = new Pager(r);
    runningHead(p, DOC_LABEL);
    sectionTitle(p, '03', 'Le point à traiter en premier', res.weak.name, 30);
    // encart conseil
    const advH = paraHeight(f.sans, 10.6, res.weak.advice, COL_W - 40, 16.4);
    const linkH = res.weak.link ? 26 : 0;
    p.ensure(advH + linkH + 34);
    const y0 = p.y;
    rect(p, M_X, y0, COL_W, advH + linkH + 32, C.soft);
    rect(p, M_X, y0, 3, advH + linkH + 32, C.accent);
    para(p, res.weak.advice, { x: M_X + 20, yTop: y0 + 16, w: COL_W - 40, size: 10.6, lead: 16.4 });
    if (res.weak.link) {
      const url = `${SITE.url}${res.weak.link.href}`;
      const lw = text(p, `Ressource utile : ${res.weak.link.label}`, { x: M_X + 20, yTop: y0 + 20 + advH + 4, font: f.sansBold, size: 9.6, color: C.accent });
      hline(p, y0 + 20 + advH + 16, { x: M_X + 20, w: lw, color: C.accent, t: 0.6 });
      link(p, M_X + 18, y0 + 20 + advH, lw + 4, 18, url);
    }
    p.y = y0 + advH + linkH + 32 + 26;

    label(p, 'La prochaine étape à votre niveau', { x: M_X, yTop: p.y, color: C.accent, bold: true });
    p.y += 18;
    para(p, res.level.next, { font: f.serif, size: 16.5, lead: 21.5, w: COL_W * 0.94 });
    p.y += 26;

    ctaBlock(p, {
      kicker: 'Audit IA gratuit · 45 minutes',
      // Niveau le plus haut : la source dit « pas besoin d'un audit de découverte » ; le bloc
      // propose donc le même créneau pour un sujet précis (pas de contradiction avec la page).
      ...(res.level.level === res.levels[res.levels.length - 1].level
        ? {
            title: 'Un sujet précis bloque ?',
            body: 'Le créneau de l’audit sert aussi à ça : on part de votre sujet plutôt que d’une découverte. 45 minutes en visio, gratuit, avec une cartographie écrite à la fin.',
          }
        : {
            title: 'Passer du niveau au premier chantier',
            body: 'L’audit IA reprend ces réponses et descend au niveau des tâches : 45 minutes en visio, gratuit, avec une cartographie écrite à la fin.',
          }),
      button: 'Réserver l’audit IA',
      url: AUDIT_RDV_URL,
      facts: ['45 minutes en visio', 'Gratuit', 'Cartographie écrite'],
    });
    p.y += 20;

    // Note de méthode (barème lu dans les niveaux de la source)
    const scale = res.levels.map((l) => `${l.min} à ${l.max} niveau ${l.level}`).join(', ');
    const note = `Ce diagnostic est un repère déclaratif, pas une mesure : il reflète vos réponses à une date donnée. Chaque dimension est notée sur 6 (deux questions de 0 à 3) ; le niveau vient du total sur ${res.max} : ${scale}.`;
    const nh = paraHeight(f.sans, 8.4, note, COL_W - 110, 12.4);
    p.ensure(nh + 4);
    label(p, 'Note de méthode', { x: M_X, yTop: p.y + 1, size: 6.8 });
    para(p, note, { x: M_X + 110, yTop: p.y, w: COL_W - 110, size: 8.4, lead: 12.4, color: C.muted });
    p.y += nh;
  }

  return finish(r);
}

function hexLight() {
  return C.rule;
}
