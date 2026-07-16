---
route: /blog/brain-circuit
verdict: AMÉLIORER
title_actuel: "Cerveau-circuit · Pourquoi l'iconographie IA est un théâtre · Waimia"
kw_cible: "aucun kw commercial (essai de marque / manifeste anti-théâtre)"
date: 2026-07-16
---

# /blog/brain-circuit : essai éditorial de marque

## 0. Levée de suspicion (GF-4)
Le slug ressemble à un nom d'icône (Lucide `brain-circuit`), d'où l'hypothèse « résidu de test » de la mission. **C'est faux.** Preuves d'un essai publié, intentionnel et lié :
- `src/lib/emails/WelcomeNewsletter.ts:28` : mis en avant dans l'email de bienvenue newsletter (« Le cerveau-circuit arrive toujours avant le travail »).
- `src/pages/bienvenue/newsletter.astro:13-14` : CTA « Lire l'essai → » `/blog/brain-circuit`.
- `src/data/sitemap.ts:201` + `:544` : listé dans la cartographie.
- `src/lib/i18n.ts:53` : dans la liste de prérendu.
- Thème identique au manifeste de marque (`src/sections/manifesto-block/demo.ts:11` : « We distrust … the brain-circuit illustration »).
Le titre = jeu de mots assumé (l'esthétique cerveau-circuit critiquée). **Pas de suppression.** Verdict : AMÉLIORER (le sortir de son statut d'orphelin technique).

## 1. Identité
- Page hardcodée `src/pages/blog/brain-circuit.astro` (prerender), composée via `EssayTemplate` + corps HTML inline dans un slot `body`.
- Title/desc : brain-circuit.astro:24-25. Kicker « ESSAY · 03 · 2026-04 », date 2026-04-22, auteur Simon Beros, 9 min.
- Intent : essai de marque / positionnement (anti-théâtre IA). Rôle silo : ancre E-E-A-T et point de vue, PAS une page de conversion ni de kw. Soutient la crédibilité du positionnement (memory `editorial-voice-anti-theatre`).

## 2. Contenu
- Excellente voix : cash, imagée, prise de position nette (« l'avatar devient le projet », « personne ne peut nommer un humain réveillé à 3 h »). 100 % conforme au standard anti-théâtre. Italique rare et pertinent (`<i>cerveau-circuit</i>`, 1 occurrence hero) : conforme au standard « italique = surligneur rare ».
- **Défaut structurel majeur : le contenu est du HTML inline hardcodé dans la page** (brain-circuit.astro:40-63), pas dans la collection `blog`. C'est un orphelin de contenu (dette de désync, cf règle anti-orphelin CLAUDE.md) : impossible à éditer via le pipeline de contenu, invisible aux surfaces qui listent la collection.
- Version EN absente (le corps est FR-only, contrairement aux 6 MDX bilingues).

## 3. SEO on-page
- H1 « Le cerveau-circuit arrive toujours avant le travail » (brain-circuit.astro:32-34) : éditorial, 0 kw commercial. Cohérent avec le rôle (essai de marque, `noindex` non requis mais aucun kw à défendre).
- Hiérarchie : H1 + H2 propres (Le théâtre arrive avant le diagnostic / Trois symptômes / L'antidote / Comment lire ce blog). RAS.

## 4. Maillage interne
- **Entrant** : fort (email newsletter, page bienvenue, sitemap, i18n). 
- **Sortant** : 3 `relatedCards` hardcodées (brain-circuit.astro:11-21) → pillar, agent-ia, /cas-clients. Corps sans lien inline (acceptable pour un essai).
- **Orphelin de 2 surfaces canoniques** : absent de la grille `/blog` (index ne liste que la collection) ET du `rss.xml` (curl confirme : 6 billets, pas brain-circuit). Un lecteur qui arrive sur `/blog` ne le voit jamais.

## 5. Balisage
- JSON-LD servi : `Article` + `Person` + `WebPage` + `Organization` + `WebSite`. **Manque `BreadcrumbList`** (la page hardcodée ne passe pas `breadcrumbItems` à EssayTemplate, contrairement à `[...slug].astro:107`). Les 6 billets de collection ont le breadcrumb, pas celui-ci.
- Pas de `datePublished`/`dateModified` normalisés passés (la page passe `date="2026-04-22"` string, pas `datePublished` ISO comme `[...slug].astro:99`).

## 6. Conversion
- Pas de CTA commercial (normal, essai de marque). `relatedCards` orientent vers pillar/agent-ia/cas. RAS.

## 7. Verdict + actions
**AMÉLIORER** : vrai essai de valeur, mais orphelin technique à normaliser.

1. **Migrer vers la collection** : créer `src/content/blog/brain-circuit.mdx` (frontmatter : `title_fr/en`, `description_fr/en`, `editorialType: Essay`, `type: essai`, `author: simon-beros`, `category: gouvernance`, `publishedAt: 2026-04-22`, `readingTime: 9`), corps Markdown repris de l'inline. Supprimer `src/pages/blog/brain-circuit.astro` (la route `[...slug].astro` la sert alors). Vérifier que le slug `/blog/brain-circuit` reste identique (0 redirection).
2. **Ajouter la version EN** dans le MDX (bloc après `---` séparateur, comme les autres essais) pour parité bilingue.
3. Post-migration : le billet entre automatiquement dans la grille `/blog` (7 cartes), le `rss.xml`, l'`ItemList`, et gagne `BreadcrumbList` + dates ISO via `[...slug].astro`. Corrige simultanément les 3 défauts de balisage/orphelin.
4. **Relier depuis le pillar et l'essai agent-ia** en retour (`relatedPosts` réciproque) une fois en collection, pour fermer le maillage éditorial.
5. Conserver le rôle brand : ne PAS lui injecter de kw commercial ni de CTA de vente ; c'est l'ancre de positionnement du silo.
