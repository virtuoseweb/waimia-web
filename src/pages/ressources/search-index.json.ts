// Index de la recherche du hub Ressources (/ressources et ses vues filtrées).
export const prerender = true;

// Fichier statique généré au build, lu à la demande par le script de recherche de
// ResourcesHub.astro (au premier focus ou à la première frappe dans le champ).
// Périmètre = celui des cartes du hub : getResourceItems() (source unique), donc les
// articles, guides, comparatifs, outils et le diagnostic de maturité indexables. Aucune page
// de service. Hors sitemap (endpoint non HTML) et servi en `X-Robots-Tag: noindex`
// (vercel.json).
//
// `terms` = mots-clés de pondération intermédiaire (entre le titre et l'extrait) : tags du
// contenu, libellé du silo (FR et EN), type de ressource, type d'outil et mots du slug.
import type { APIRoute } from 'astro';
import { getResourceItems, type ResourceItem } from '../../lib/resources-hub';
import { siloLabel } from '../../data/taxonomies';

const KIND_TERMS: Record<ResourceItem['kind'], string> = {
  guides: 'guide guides tutoriel methode',
  comparatifs: 'comparatif comparatifs comparaison comparison vs versus',
  outils: 'outil outils tool tools gratuit free',
  articles: 'article articles blog',
  actualites: 'actualite actualites news veille annonce',
};

const TOOL_TERMS: Record<NonNullable<ResourceItem['toolType']>, string> = {
  calculator: 'calculateur calculator simulateur simulation estimation',
  checklist: 'checklist liste controle verification',
  template: 'modele template trame',
  audit: 'audit diagnostic test score',
};

// Minuscules sans accents, mots séparés par une espace, sans doublon.
const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function termsOf(it: ResourceItem): string {
  const slug = it.href.split('/').pop() ?? '';
  const raw = [
    KIND_TERMS[it.kind],
    it.toolType ? TOOL_TERMS[it.toolType] : '',
    it.silo ? `${siloLabel(it.silo, 'fr') ?? ''} ${siloLabel(it.silo, 'en') ?? ''}` : '',
    ...(it.tags ?? []),
    slug,
  ].join(' ');
  const words = norm(raw).split(/[^a-z0-9]+/).filter((w) => w.length > 1);
  return [...new Set(words)].join(' ');
}

export const GET: APIRoute = async () => {
  const items = await getResourceItems();
  const index = items.map((it) => ({
    href: it.href,
    kind: it.kind,
    title_fr: it.title_fr,
    title_en: it.title_en,
    excerpt_fr: it.excerpt_fr,
    excerpt_en: it.excerpt_en,
    silo: it.silo,
    date: it.date.toISOString().slice(0, 10),
    image: it.image,
    tint: it.tint,
    terms: termsOf(it),
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
