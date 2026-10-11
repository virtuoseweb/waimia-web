// Kit de mise en page des rapports PDF Waimia (pdf-lib + @pdf-lib/fontkit, pur JS : sûr pour le
// bundle SSR Vercel). Polices et images viennent de ./assets.generated.ts (aucune lecture de
// fichier à l'exécution).
//
// Conventions :
//  - coordonnées « depuis le haut » (yTop) converties en interne vers le repère PDF (bas-gauche) ;
//  - tout texte affiché passe par `fr()` (typographie française) puis `safe()` (glyphes absents
//    remplacés) ; les URL ne passent jamais par `fr()` ;
//  - mise en page à pages FIXES : `ensure()` lève une erreur au lieu de couper en silence
//    (les tests prouvent que les cas les plus longs tiennent).
import {
  PDFArray,
  PDFDocument,
  PDFName,
  PDFString,
  rgb,
  type PDFFont,
  type PDFImage,
  type PDFPage,
  type RGB,
} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { PDF_FONTS, PDF_IMAGES } from './assets.generated';
import { SITE } from '../../site.config';

/* ───── Gabarit A4 ───── */
export const PAGE_W = 595.28;
export const PAGE_H = 841.89;
export const M_X = 58;
export const M_TOP = 54;
export const M_BOTTOM = 70;
export const COL_W = PAGE_W - M_X * 2;

/* ───── Couleurs de la marque (mêmes valeurs que src/lib/emails/_layout.ts) ───── */
const hex = (h: string): RGB => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
export const C = {
  paper: hex('#F6F1E8'),
  soft: hex('#EFEAE0'),
  rule: hex('#E0DBD2'),
  ink: hex('#0C0B09'),
  muted: hex('#7A6F60'),
  accent: hex('#C94F2E'),
  track: hex('#E6E0D5'),
};

export interface Fonts {
  serif: PDFFont;
  serifItalic: PDFFont;
  sans: PDFFont;
  sansMedium: PDFFont;
  sansBold: PDFFont;
  mono: PDFFont;
  monoBold: PDFFont;
}

export interface ReportContext {
  /** Destinataire (affiché en couverture). */
  email: string;
  /** Date du rapport. */
  date: Date;
  /** Langue demandée. Le contenu des outils n'existe qu'en français : rendu en français. */
  lang?: 'fr' | 'en';
}

export class PdfLayoutOverflow extends Error {}

const b64 = (s: string): Uint8Array => {
  if (typeof Buffer !== 'undefined') return new Uint8Array(Buffer.from(s, 'base64'));
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

/* ───── Typographie française ───── */
const NBSP = '\u00A0';
/**
 * Espaces insécables avant : ; ? ! » et après «, entre un nombre et son unité ;
 * apostrophe typographique ; espace fine insécable (absente des polices) → insécable.
 */
export function fr(text: string): string {
  return String(text)
    .replace(/\u202F/g, NBSP)
    .replace(/'/g, '’')
    .replace(/ +([:;?!»])/g, `${NBSP}$1`)
    .replace(/« +/g, `«${NBSP}`)
    .replace(/(\d) (?=(h|€|%|sem|sur|min|mois|points?|ans?|heures?)(?![\p{L}]))/gu, `$1${NBSP}`)
    .replace(/(\d) (?=\d{3}(?!\d))/g, `$1${NBSP}`);
}

const GLYPH_FALLBACK: Record<string, string> = {
  '\u202F': NBSP,
  '\u2192': '>',
  '\u2014': ',',
  '\u2248': '~',
};

/** Remplace les caractères sans glyphe dans la police (évite les carrés .notdef). */
export function safe(font: PDFFont, text: string): string {
  const fk = (font as unknown as { embedder?: { font?: { hasGlyphForCodePoint(c: number): boolean } } }).embedder?.font;
  if (!fk) return text;
  let out = '';
  for (const ch of text) {
    const cp = ch.codePointAt(0) as number;
    if (ch === '\n' || fk.hasGlyphForCodePoint(cp)) out += ch;
    else if (GLYPH_FALLBACK[ch] !== undefined) out += GLYPH_FALLBACK[ch];
    else if (/\s/.test(ch)) out += ' ';
    // autre caractère sans glyphe : omis
  }
  return out;
}

/** Nombre au format fr-FR (séparateur insécable). */
export function num(v: number, digits = 0): string {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: digits, minimumFractionDigits: 0 }).format(v).replace(/\u202F/g, NBSP);
}
export function eur(v: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
    .format(Math.round(v))
    .replace(/\u202F/g, NBSP);
}
export function frDate(d: Date): string {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(d);
}

/* ───── Document ───── */
export interface Report {
  doc: PDFDocument;
  f: Fonts;
  pages: PDFPage[];
}

export async function createReport(meta: { title: string; subject: string; keywords: string[]; date: Date }): Promise<Report> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const embed = (k: keyof typeof PDF_FONTS) => doc.embedFont(b64(PDF_FONTS[k]), { subset: true });
  const [serif, serifItalic, sans, sansMedium, sansBold, mono, monoBold] = await Promise.all([
    embed('serif'),
    embed('serifItalic'),
    embed('sans'),
    embed('sansMedium'),
    embed('sansBold'),
    embed('mono'),
    embed('monoBold'),
  ]);
  doc.setTitle(meta.title, { showInWindowTitleBar: true });
  doc.setAuthor('Waimia');
  doc.setSubject(meta.subject);
  doc.setKeywords(meta.keywords);
  doc.setCreator(`Waimia · ${SITE.url.replace(/^https?:\/\//, '')}`);
  doc.setProducer('Waimia');
  doc.setLanguage('fr-FR');
  doc.setCreationDate(meta.date);
  doc.setModificationDate(meta.date);
  return { doc, f: { serif, serifItalic, sans, sansMedium, sansBold, mono, monoBold }, pages: [] };
}

export async function embedIllustration(r: Report, key: keyof typeof PDF_IMAGES): Promise<PDFImage> {
  return r.doc.embedJpg(b64(PDF_IMAGES[key].jpeg));
}

/* ───── Page et curseur ───── */
export class Pager {
  page: PDFPage;
  y: number;
  r: Report;
  constructor(r: Report) {
    this.r = r;
    this.page = r.doc.addPage([PAGE_W, PAGE_H]);
    r.pages.push(this.page);
    this.page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: C.paper });
    this.y = M_TOP;
  }
  /** Lève une erreur si `h` points ne tiennent plus au-dessus du pied de page. */
  ensure(h: number): void {
    if (this.y + h > PAGE_H - M_BOTTOM + 0.5) {
      throw new PdfLayoutOverflow(`mise en page : ${Math.round(this.y + h - (PAGE_H - M_BOTTOM))} pt de trop (page ${this.r.pages.indexOf(this.page) + 1})`);
    }
  }
  /** Repère PDF d'une ordonnée « depuis le haut ». */
  py(yTop: number): number {
    return PAGE_H - yTop;
  }
  space(h: number): void {
    this.y += h;
  }
  get remaining(): number {
    return PAGE_H - M_BOTTOM - this.y;
  }
}

/* ───── Texte ───── */
export function width(font: PDFFont, size: number, text: string, tracking = 0): number {
  const t = safe(font, text);
  return font.widthOfTextAtSize(t, size) + tracking * Math.max(0, [...t].length - 1);
}

/** Texte sur une ligne, `yTop` = haut de la boîte de ligne ; la ligne de base suit la taille. */
export function text(
  p: Pager,
  s: string,
  o: { x: number; yTop: number; font: PDFFont; size: number; color?: RGB; tracking?: number; raw?: boolean },
): number {
  const str = safe(o.font, o.raw ? s : fr(s));
  const baseline = p.py(o.yTop + o.size * 0.8);
  if (!o.tracking) {
    p.page.drawText(str, { x: o.x, y: baseline, font: o.font, size: o.size, color: o.color ?? C.ink });
    return o.font.widthOfTextAtSize(str, o.size);
  }
  let x = o.x;
  for (const ch of str) {
    p.page.drawText(ch, { x, y: baseline, font: o.font, size: o.size, color: o.color ?? C.ink });
    x += o.font.widthOfTextAtSize(ch, o.size) + o.tracking;
  }
  return x - o.x - o.tracking;
}

/** Étiquette en capitales espacées (mono). */
export function label(p: Pager, s: string, o: { x: number; yTop: number; color?: RGB; size?: number; bold?: boolean }): number {
  const size = o.size ?? 7.4;
  const font = o.bold ? p.r.f.monoBold : p.r.f.mono;
  return text(p, s.toLocaleUpperCase('fr-FR'), { x: o.x, yTop: o.yTop, font, size, color: o.color ?? C.muted, tracking: size * 0.14 });
}
export function labelWidth(p: Pager, s: string, size = 7.4, bold = false): number {
  const font = bold ? p.r.f.monoBold : p.r.f.mono;
  return width(font, size, fr(s.toLocaleUpperCase('fr-FR')), size * 0.14);
}

/** Découpe en lignes (espaces normales seulement : les insécables tiennent ensemble). */
export function wrap(font: PDFFont, size: number, s: string, maxW: number): string[] {
  const lines: string[] = [];
  for (const para of safe(font, s).split('\n')) {
    let line = '';
    for (const word of para.split(' ').filter((w) => w.length > 0)) {
      const cand = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(cand, size) <= maxW) {
        line = cand;
        continue;
      }
      if (line) lines.push(line);
      // Mot plus long que la colonne (adresse e-mail, texte hostile) : coupe par caractères.
      let rest = word;
      while (font.widthOfTextAtSize(rest, size) > maxW) {
        // plus long préfixe qui tient (recherche dichotomique)
        let lo = 1;
        let hi = rest.length - 1;
        while (lo < hi) {
          const mid = Math.ceil((lo + hi) / 2);
          if (font.widthOfTextAtSize(rest.slice(0, mid), size) <= maxW) lo = mid;
          else hi = mid - 1;
        }
        const k = lo;
        lines.push(rest.slice(0, k));
        rest = rest.slice(k);
      }
      line = rest;
    }
    lines.push(line);
  }
  return lines;
}

/** Paragraphe ; renvoie la hauteur occupée. Avance le curseur si `advance`. */
export function para(
  p: Pager,
  s: string,
  o: { x?: number; yTop?: number; w?: number; font?: PDFFont; size?: number; lead?: number; color?: RGB; advance?: boolean; raw?: boolean },
): number {
  const font = o.font ?? p.r.f.sans;
  const size = o.size ?? 10;
  const lead = o.lead ?? size * 1.5;
  const x = o.x ?? M_X;
  const w = o.w ?? COL_W;
  const y0 = o.yTop ?? p.y;
  const lines = wrap(font, size, o.raw ? s : fr(s), w);
  const h = lines.length * lead;
  if (o.advance !== false && o.yTop === undefined) p.ensure(h);
  lines.forEach((ln, i) => {
    p.page.drawText(ln, { x, y: p.py(y0 + i * lead + (lead - size) / 2 + size * 0.8), font, size, color: o.color ?? C.ink });
  });
  if (o.advance !== false && o.yTop === undefined) p.y += h;
  return h;
}
export function paraHeight(font: PDFFont, size: number, s: string, w: number, lead = size * 1.5, raw = false): number {
  return wrap(font, size, raw ? s : fr(s), w).length * lead;
}

/* ───── Formes ───── */
export function rect(p: Pager, x: number, yTop: number, w: number, h: number, color: RGB, border?: RGB): void {
  p.page.drawRectangle({ x, y: p.py(yTop + h), width: w, height: h, color, ...(border ? { borderColor: border, borderWidth: 0.6 } : {}) });
}
export function hline(p: Pager, yTop: number, o: { x?: number; w?: number; color?: RGB; t?: number } = {}): void {
  const x = o.x ?? M_X;
  p.page.drawLine({ start: { x, y: p.py(yTop) }, end: { x: x + (o.w ?? COL_W), y: p.py(yTop) }, thickness: o.t ?? 0.6, color: o.color ?? C.rule });
}
/** Rectangle à coins arrondis (bouton). */
export function pill(p: Pager, x: number, yTop: number, w: number, h: number, color: RGB): void {
  const r = h / 2;
  const y = p.py(yTop + h);
  const path = `M ${r} 0 L ${w - r} 0 A ${r} ${r} 0 0 1 ${w - r} ${h} L ${r} ${h} A ${r} ${r} 0 0 1 ${r} 0 Z`;
  p.page.drawSvgPath(path, { x, y: y + h, color, borderWidth: 0 });
}
/** Flèche « ↗ » dessinée (le glyphe n'existe pas dans les polices). */
export function arrow(p: Pager, x: number, yTop: number, s: number, color: RGB, t = 1.3): void {
  const y0 = p.py(yTop + s);
  const y1 = p.py(yTop);
  p.page.drawLine({ start: { x, y: y0 }, end: { x: x + s, y: y1 }, thickness: t, color });
  p.page.drawLine({ start: { x: x + s * 0.3, y: y1 }, end: { x: x + s, y: y1 }, thickness: t, color });
  p.page.drawLine({ start: { x: x + s, y: y1 }, end: { x: x + s, y: y1 - s * 0.7 }, thickness: t, color });
}

/* ───── Liens (annotations /Link manuelles) ───── */
export function link(p: Pager, x: number, yTop: number, w: number, h: number, uri: string): void {
  const ctx = p.r.doc.context;
  const annot = ctx.obj({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [x, p.py(yTop + h), x + w, p.py(yTop)],
    Border: [0, 0, 0],
    F: 4,
    A: { Type: 'Action', S: 'URI', URI: PDFString.of(uri) },
  });
  const ref = ctx.register(annot);
  const annots = p.page.node.lookup(PDFName.of('Annots'));
  if (annots instanceof PDFArray) annots.push(ref);
  else p.page.node.set(PDFName.of('Annots'), ctx.obj([ref]));
}

/* ───── Marque ───── */
/** Wordmark « Waimia. » : i italique et point en accent. Renvoie la largeur. */
export function wordmark(p: Pager, x: number, yTop: number, size: number, color: RGB = C.ink): number {
  const { serif, serifItalic } = p.r.f;
  const parts: [string, PDFFont, RGB][] = [
    ['Waim', serif, color],
    ['i', serifItalic, C.accent],
    ['a', serif, color],
    ['.', serif, C.accent],
  ];
  let cx = x;
  for (const [s, font, col] of parts) {
    p.page.drawText(s, { x: cx, y: p.py(yTop + size * 0.8), font, size, color: col });
    cx += font.widthOfTextAtSize(s, size) + (s === 'i' ? size * 0.02 : 0);
  }
  return cx - x;
}

/** En-tête des pages intérieures : wordmark, titre courant, filet. */
export function runningHead(p: Pager, docLabel: string): void {
  wordmark(p, M_X, M_TOP - 6, 17);
  const w = labelWidth(p, docLabel);
  label(p, docLabel, { x: M_X + COL_W - w, yTop: M_TOP });
  hline(p, M_TOP + 22, { color: C.ink, t: 0.8 });
  p.y = M_TOP + 50;
}

/** Titre de section : numéro + étiquette, puis titre serif. */
export function sectionTitle(p: Pager, n: string, kicker: string, title: string, size = 27): void {
  p.ensure(size * 1.15 + 26);
  const nw = label(p, n, { x: M_X, yTop: p.y, color: C.accent, bold: true });
  label(p, kicker, { x: M_X + nw + 10, yTop: p.y });
  p.y += 18;
  const h = para(p, title, { font: p.r.f.serif, size, lead: size * 1.08 });
  void h;
  p.y += 12;
}

/** Pied de page sur toutes les pages : marque, coordonnées cliquables, pagination. */
export function footers(r: Report): void {
  const total = r.pages.length;
  r.pages.forEach((page, i) => {
    const p = { page, r, py: (y: number) => PAGE_H - y } as unknown as Pager;
    const yTop = PAGE_H - 44;
    hline(p, yTop - 12, { color: C.rule });
    const host = SITE.url.replace(/^https?:\/\//, '');
    let x = M_X;
    const segs: [string, string | null][] = [
      ['Waimia', null],
      [SITE.city, null],
      [host, SITE.url],
      [SITE.email, `mailto:${SITE.email}`],
      [SITE.tel, `tel:${SITE.telE164}`],
    ];
    segs.forEach(([s, uri], k) => {
      const w = label(p, s, { x, yTop, color: uri ? C.ink : C.muted, size: 6.8 });
      if (uri) link(p, x - 1, yTop - 3, w + 2, 6.8 + 6, uri);
      x += w;
      if (k < segs.length - 1) {
        x += 6;
        label(p, '·', { x, yTop, size: 6.8 });
        x += labelWidth(p, '·', 6.8) + 6;
      }
    });
    const pg = `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    const w = labelWidth(p, pg, 6.8);
    label(p, pg, { x: M_X + COL_W - w, yTop, size: 6.8 });
  });
}

/**
 * Cartouche de couverture (destinataire, date, base), posé au-dessus du pied de page.
 * La hauteur suit la longueur de l'adresse (jusqu'à 200 caractères). Lève une erreur s'il
 * chevauche le contenu déjà posé.
 */
export function cartouche(p: Pager, recipient: string, others: [string, string][]): void {
  const { f } = p.r;
  const cw = [COL_W * 0.46, ...others.map(() => (COL_W * 0.54) / others.length)];
  const emailW = cw[0] - 26;
  let es = 9.6;
  while (es > 7.4 && wrap(f.sansMedium, es, recipient, emailW).length > 2) es -= 0.4;
  const eh = paraHeight(f.sansMedium, es, recipient, emailW, es * 1.3, true);
  const oh = Math.max(...others.map(([, v], i) => paraHeight(f.sans, 9.6, v, cw[i + 1] - 26, 12.5)));
  const boxH = 28 + Math.max(eh, oh) + 16;
  const boxY = PAGE_H - M_BOTTOM - 12 - boxH;
  if (p.y > boxY - 8) throw new PdfLayoutOverflow('mise en page : la couverture déborde sur le cartouche');
  rect(p, M_X, boxY, COL_W, boxH, C.soft);
  let cx = M_X + 16;
  label(p, 'Préparé pour', { x: cx, yTop: boxY + 14 });
  para(p, recipient, { x: cx, yTop: boxY + 28, w: emailW, font: f.sansMedium, size: es, lead: es * 1.3, raw: true });
  cx += cw[0];
  others.forEach(([k, v], i) => {
    label(p, k, { x: cx, yTop: boxY + 14 });
    para(p, v, { x: cx, yTop: boxY + 28, w: cw[i + 1] - 26, size: 9.6, lead: 12.5 });
    cx += cw[i + 1];
  });
}

/* ───── Bloc d'appel à l'action (identique pour les deux rapports) ───── */
export function ctaBlock(
  p: Pager,
  o: { kicker: string; title: string; body: string; button: string; url: string; facts: string[] },
): { button: { x: number; yTop: number; w: number; h: number } } {
  const { f } = p.r;
  const pad = 28;
  const innerW = COL_W - pad * 2;
  const titleH = paraHeight(f.serif, 25, o.title, innerW, 27);
  const bodyH = paraHeight(f.sans, 10.2, o.body, innerW - 40, 15.6);
  const btnH = 46;
  const h = pad + 12 + 14 + titleH + 10 + bodyH + 22 + btnH + 22 + 30;
  p.ensure(h);
  const y0 = p.y;
  rect(p, M_X, y0, COL_W, h, C.ink);
  // fine bande d'accent en tête du bloc
  rect(p, M_X, y0, COL_W, 3, C.accent);
  let y = y0 + pad;
  label(p, o.kicker, { x: M_X + pad, yTop: y, color: hexPaperMuted() });
  y += 22;
  para(p, o.title, { x: M_X + pad, yTop: y, w: innerW, font: f.serif, size: 25, lead: 27, color: C.paper });
  y += titleH + 10;
  para(p, o.body, { x: M_X + pad, yTop: y, w: innerW - 40, font: f.sans, size: 10.2, lead: 15.6, color: C.paper });
  y += bodyH + 22;
  // bouton : toute la pastille est cliquable
  const tw = width(f.sansBold, 13, fr(o.button));
  const bw = tw + 30 + 40;
  const bx = M_X + pad;
  pill(p, bx, y, bw, btnH, C.accent);
  text(p, o.button, { x: bx + 28, yTop: y + (btnH - 13) / 2 + 0.5, font: f.sansBold, size: 13, color: C.paper });
  arrow(p, bx + 28 + tw + 14, y + btnH / 2 - 5, 10, C.paper, 1.6);
  link(p, bx, y, bw, btnH, o.url);
  // adresse lisible à droite du bouton (également cliquable)
  const shown = o.url.replace(/^https?:\/\//, '').replace(/[?#].*$/, '');
  const sw = labelWidth(p, shown, 7);
  label(p, shown, { x: bx + bw + 16, yTop: y + btnH / 2 - 4, color: hexPaperMuted(), size: 7 });
  link(p, bx + bw + 14, y + btnH / 2 - 8, sw + 4, 16, o.url);
  const button = { x: bx, yTop: y, w: bw, h: btnH };
  y += btnH + 22;
  // repères : 45 minutes, gratuit, cartographie écrite
  hline(p, y - 8, { x: M_X + pad, w: innerW, color: rgb(0.25, 0.23, 0.2) });
  let fx = M_X + pad;
  const colW = innerW / o.facts.length;
  o.facts.forEach((fact) => {
    rect(p, fx, y + 1, 5, 5, C.accent);
    label(p, fact, { x: fx + 11, yTop: y, color: C.paper, size: 7.2 });
    fx += colW;
  });
  p.y = y0 + h;
  return { button };
}
function hexPaperMuted(): RGB {
  return rgb(0.72, 0.68, 0.61);
}

export async function finish(r: Report): Promise<Uint8Array> {
  footers(r);
  return r.doc.save({ useObjectStreams: true });
}
