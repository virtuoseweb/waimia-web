// Waimia · curation des comparatifs : l'arbitrage tranché en une phrase par comparatif
// (fidèle au verdict de chaque page), affiché comme extrait des cartes comparatifs dans
// l'index /ressources et sa vue filtrée /ressources/comparatifs. Clé = slug du comparatif ;
// sans entrée, la carte retombe sur la description de la page.
export const COMPARATIFS_CURATION: Record<string, { fr: string; en: string }> = {
  'claude-code-vs-cursor': {
    fr: 'Cursor pour garder le contrôle ligne à ligne, Claude Code pour déléguer des tâches entières à un agent. Le bon choix dépend de votre façon de coder.',
    en: 'Cursor to keep line-by-line control, Claude Code to hand whole tasks to an agent. The right pick depends on how you code.',
  },
  'claude-vs-chatgpt-pme': {
    fr: 'Le choix se joue sur votre besoin prioritaire, pas sur un classement : ChatGPT en assistant polyvalent, Claude pour brancher l\'IA à vos outils et vos données.',
    en: 'It comes down to your priority need, not a ranking: ChatGPT as an all-round assistant, Claude to wire AI into your tools and data.',
  },
  'geo-vs-seo': {
    fr: 'Le SEO vous fait trouver sur Google, le GEO vous fait citer par les IA. Deux leviers complémentaires, pas un remplacement.',
    en: 'SEO gets you found on Google, GEO gets you cited by AIs. Two complementary levers, not a replacement.',
  },
  'site-web-intelligent-vs-wordpress': {
    fr: 'Pour une PME qui veut un actif et pas une dette, le site web intelligent l\'emporte sur WordPress sur cinq critères : performance, SEO/GEO, maintenance, sécurité et coût total.',
    en: 'For an SMB that wants an asset, not a debt, the intelligent website beats WordPress on five criteria: performance, SEO/GEO, maintenance, security and total cost.',
  },
};
