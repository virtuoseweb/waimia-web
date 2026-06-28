// Waimia · Co-location DS (#39) · module `rich-text` · donnée démo bilingue.
// Corps Markdown réaliste (titres, liste, lien, paragraphe) pour /preview/rich-text :
// prouve que le processeur Markdown rend bien du HTML prose au build. Contenu honnête,
// 0 fausse métrique. 0 U+2014 (rule 58).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
  type: 'rich-text',
  kicker_fr: 'Corps éditorial',
  kicker_en: 'Editorial body',
  title_fr: 'Un corps de texte riche, édité sans backend',
  title_en: 'A rich text body, edited without a backend',
  body_md_fr: `## Pourquoi un corps Markdown

Le corps de cette section vit en **Markdown** dans le document de page. Il est rendu en
HTML au build, avec les styles de prose du design system. Pas de CMS, pas de backend :
le contenu se versionne avec le code.

### Ce que vous pouvez écrire

- des titres de niveau 2 et 3 ;
- des listes à puces et numérotées ;
- du texte en *italique* ou en **gras** ;
- des [liens internes](/contact) vers le reste du site.

Le rendu reste lisible : la mesure de ligne est bornée et la typographie suit les mêmes
tokens que le reste des pages.`,
  body_md_en: `## Why a Markdown body

This section body lives as **Markdown** inside the page document. It is rendered to HTML
at build time, using the design system prose styles. No CMS, no backend: the content is
versioned alongside the code.

### What you can write

- level 2 and level 3 headings;
- bulleted and numbered lists;
- *italic* or **bold** text;
- [internal links](/contact) to the rest of the site.

Reading stays comfortable: the line measure is bounded and the typography follows the same
tokens as the rest of the pages.`,
};
