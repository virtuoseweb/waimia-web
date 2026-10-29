// Libellés de colonne pour les tableaux du corps riche (billets, guides).
//
// Le corps arrive en HTML déjà rendu (`<table>` sans classe). Pour qu'un tableau reste lisible
// en mobile, chaque ligne s'affiche en fiche (global.css) et chaque valeur a besoin de son
// libellé : on recopie le texte de l'en-tête de colonne dans `data-label` sur chaque <td>.
// Sans effet sur un tableau sans en-tête, ni sur une cellule qui porte déjà `data-label`.
const stripTags = (s: string) =>
  s.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function labelTableCells(html: string): string {
  if (!html.includes('<table')) return html;
  return html.replace(/<table\b[\s\S]*?<\/table>/gi, (table) => {
    const headRow =
      table.match(/<thead\b[\s\S]*?<\/thead>/i)?.[0] ?? table.match(/<tr\b[\s\S]*?<\/tr>/i)?.[0];
    if (!headRow) return table;
    const labels = [...headRow.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map((m) => stripTags(m[1]));
    if (labels.length === 0) return table;
    return table.replace(/<tr\b[\s\S]*?<\/tr>/gi, (row) => {
      if (/<th\b/i.test(row)) return row;
      let i = 0;
      return row.replace(/<td\b([^>]*)>/gi, (cell, attrs: string) => {
        const label = labels[i++];
        return label && !/\bdata-label=/.test(attrs) ? `<td data-label="${escapeAttr(label)}"${attrs}>` : cell;
      });
    });
  });
}
