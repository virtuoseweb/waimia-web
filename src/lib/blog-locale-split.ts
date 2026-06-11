// Découpe locale du corps MDX bilingue des essais/blog.
//
// Convention du contenu (`src/content/blog/*.mdx`) : le corps est rédigé en
// français, suivi d'une règle horizontale Markdown de niveau racine (`---`,
// rendue en `<hr>`), puis du même texte en anglais. Les deux moitiés étaient
// jusqu'ici rendues ensemble sur chaque locale (FR voyait FR + EN dupliqué).
//
// Ce module isole, au build, la moitié correspondant à la locale rendue :
//   - FR  -> tout ce qui précède le premier `<hr>` racine
//   - EN  -> tout ce qui suit le premier `<hr>` racine
//   - aucun `<hr>` racine (article mono-langue) -> corps complet sur les deux
//     locales (l'EN retombe sur le FR, comportement de repli documenté).
//
// Le séparateur `<hr>` lui-même est retiré : il ne doit rester ni en bas de la
// page FR ni en haut de la page EN.

export interface MarkdownHeading {
  depth: number;
  slug: string;
  text: string;
}

// Premier `<hr>` (avec ou sans attributs, auto-fermant ou non), peu importe la casse.
const FIRST_HR = /<hr\b[^>]*>(?:\s*<\/hr>)?/i;

/**
 * Renvoie la moitié du HTML correspondant à la locale.
 * @param html  HTML complet rendu par `<Content />`
 * @param lang  locale rendue
 */
export function splitLocaleHtml(html: string, lang: 'fr' | 'en'): string {
  const match = FIRST_HR.exec(html);
  if (!match) {
    // Pas de séparateur : article mono-langue, on rend tout (repli FR pour EN).
    return html;
  }
  const before = html.slice(0, match.index);
  const after = html.slice(match.index + match[0].length);
  return lang === 'en' ? after.trim() : before.trim();
}

/**
 * Filtre les headings (sommaire + a11y) pour ne garder que ceux dont l'ancre
 * `id`/`slug` est effectivement présente dans la moitié de HTML rendue.
 * Robuste : on cherche `id="slug"` puis, en repli, l'occurrence du slug.
 */
export function filterHeadingsForHtml(
  headings: MarkdownHeading[] | undefined,
  chosenHtml: string,
): MarkdownHeading[] {
  if (!headings || headings.length === 0) return [];
  return headings.filter((h) => {
    if (!h.slug) return false;
    return (
      chosenHtml.includes(`id="${h.slug}"`) ||
      chosenHtml.includes(`id='${h.slug}'`)
    );
  });
}
