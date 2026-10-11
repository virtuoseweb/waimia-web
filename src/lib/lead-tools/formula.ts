// Évaluateur des formules des outils (src/content/outils/*.json, champ `outputs[].formula`).
// Source unique : utilisé par la page outil (script client du ToolWidget), par computeRoi
// (serveur, PDF, e-mails). Aucune formule n'est réécrite en TypeScript : on évalue celle du JSON.
// Grammaire : nombres, identifiants (variables), + - * /, parenthèses. Pas d'eval().

export function evalFormula(expr: string, vars: Record<string, number>): number {
  let i = 0;
  const s = expr;
  const skip = () => {
    while (i < s.length && s[i] === ' ') i++;
  };
  function primary(): number {
    skip();
    const c = s[i];
    if (c === '(') {
      i++;
      const v = add();
      skip();
      if (s[i] === ')') i++;
      return v;
    }
    const start = i;
    if (c !== undefined && /[a-zA-Z_]/.test(c)) {
      while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) i++;
      return Number(vars[s.slice(start, i)] ?? 0);
    }
    while (i < s.length && /[0-9.]/.test(s[i])) i++;
    return Number(s.slice(start, i));
  }
  function mul(): number {
    let v = primary();
    skip();
    while (s[i] === '*' || s[i] === '/') {
      const op = s[i++];
      const r = primary();
      v = op === '*' ? v * r : v / r;
      skip();
    }
    return v;
  }
  function add(): number {
    let v = mul();
    skip();
    while (s[i] === '+' || s[i] === '-') {
      const op = s[i++];
      const r = mul();
      v = op === '+' ? v + r : v - r;
      skip();
    }
    return v;
  }
  return add();
}

/** Mise en forme d'un résultat d'outil (mêmes règles que l'affichage à l'écran). */
export function formatToolValue(v: number, format: string, unit: string, lang: string): string {
  const loc = lang === 'en' ? 'en-US' : 'fr-FR';
  if (!isFinite(v)) v = 0;
  if (format === 'currency-eur') {
    return new Intl.NumberFormat(loc, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Math.round(v));
  }
  if (format === 'percent') {
    return new Intl.NumberFormat(loc, { style: 'percent', maximumFractionDigits: 0 }).format(v);
  }
  const n =
    format === 'decimal2'
      ? new Intl.NumberFormat(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)
      : new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }).format(Math.round(v));
  return unit ? `${n} ${unit}` : n;
}
