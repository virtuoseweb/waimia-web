// astro-head-inject
// Waimia · rendu paresseux des sections (CSS par page).
//
// Problème : un import statique des 221 composants de section (registry) fait regrouper
// leurs styles dans une seule feuille chargée par TOUTES les pages (~690 Ko).
// Remède : chaque section est chargée via `<module>/index.ts?astroPropagatedAssets`, le
// mécanisme qu'Astro utilise pour `render()` des collections de contenu. Au build, ce
// module est une frontière CSS : les styles de la section ne sont plus attachés aux pages
// par le graphe de modules, ils sont injectés dans le <head> SEULEMENT quand la section
// est réellement rendue (propagation de head). Calque de `astro/dist/content/runtime.js`.
//
// Le commentaire `astro-head-inject` en PREMIÈRE ligne est requis : il marque ce module et
// ses importeurs (SectionsRenderer, layouts, pages) « in-tree », pour que leurs sections
// soient instanciées avant le rendu du <head>. API interne d'Astro (6.4) : à revérifier
// lors d'une montée de version (preuve : `_astro/section-registry.*.css` absent du build
// et styles de section présents dans le <head> des pages).
import {
  createComponent,
  createHeadAndContent,
  renderComponent,
  renderTemplate,
  renderUniqueStylesheet,
  unescapeHTML,
} from 'astro/runtime/server/index.js';
import { SECTION_LOADERS } from './section-loaders.generated';

type AnyComponent = any;

interface PropagatedModule {
  default: {
    __astroPropagation: true;
    getMod: () => Promise<{ Component: AnyComponent }>;
    collectedLinks: string[];
    collectedStyles: string[];
  };
}

export type SectionLoader = () => Promise<PropagatedModule>;

const cache = new Map<SectionLoader, Promise<AnyComponent>>();

// Feuilles déjà émises par rendu de page. `renderUniqueStylesheet` ne déduplique que face aux
// styles statiques de la page, pas entre sections propagées. Une feuille externe est identifiée
// par son empreinte de contenu (`nom.EMPREINTE.css`) : Astro fusionne les CSS propagées des
// environnements prerender et ssr, d'où des paires `demo.X.css` / `index.X.css` identiques.
const emitted = new WeakMap<object, Set<string>>();

function firstEmission(result: object, key: string): boolean {
  let seen = emitted.get(result);
  if (!seen) {
    // Amorcé avec les feuilles statiques de la page (même contenu sous un autre nom).
    seen = new Set();
    for (const s of ((result as any).styles ?? []) as Array<{ props?: { href?: string } }>) {
      if (s?.props?.href) seen.add(linkKey(s.props.href));
    }
    emitted.set(result, seen);
  }
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
}

function linkKey(src: string): string {
  const m = /\.([A-Za-z0-9_-]{8})\.css$/.exec(src);
  return m ? `hash:${m[1]}` : `href:${src}`;
}

async function build(loader: SectionLoader): Promise<AnyComponent> {
  const { collectedLinks, collectedStyles, getMod } = (await loader()).default;
  // getMod() = le module co-localisé `index.ts` (qui ré-exporte `Component`).
  const Section = (await getMod()).Component;
  return createComponent({
    factory(result: any, props: any, slots: any) {
      const styles = (Array.isArray(collectedStyles) ? collectedStyles : [])
        .filter((content) => firstEmission(result, `inline:${content}`))
        .map((content) => renderUniqueStylesheet(result, { type: 'inline', content }) ?? '')
        .join('');
      const links = (Array.isArray(collectedLinks) ? collectedLinks : [])
        .filter((src) => firstEmission(result, linkKey(src)))
        .map((src) => renderUniqueStylesheet(result, { type: 'external', src }) ?? '')
        .join('');
      return createHeadAndContent(
        unescapeHTML(styles + links) as any,
        renderTemplate`${renderComponent(result, 'Section', Section, props, slots)}` as any,
      );
    },
    propagation: 'self',
  } as any);
}

/** Composant de section prêt à rendre, styles injectés dans le <head> de la page. */
export function lazySection(loader: SectionLoader): Promise<AnyComponent> {
  let pending = cache.get(loader);
  if (!pending) {
    pending = build(loader);
    cache.set(loader, pending);
  }
  return pending;
}

/**
 * Composants des types demandés (dédoublonnés), indexés par type. Type inconnu : absent du
 * résultat (l'appelant journalise comme avant).
 */
export async function loadSections(types: Iterable<string>): Promise<Record<string, AnyComponent>> {
  const unique = [...new Set(types)].filter((t) => t in SECTION_LOADERS);
  const comps = await Promise.all(
    unique.map((t) => lazySection(SECTION_LOADERS[t as keyof typeof SECTION_LOADERS])),
  );
  return Object.fromEntries(unique.map((t, i) => [t, comps[i]]));
}
