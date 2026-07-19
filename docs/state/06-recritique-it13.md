# T-5 : Re-critique design AWWWARDS it.13 (prod waimia.com)

Date : 2026-07-19. Mode : lecture seule, jury Awwwards. Prod live https://waimia.com.
Baseline it.12 = 4,5/5 (progression 3,9 it.8 → 4,1 it.9 → 4,5 it.12, source `SR-2026-06-11-54`).
La notation historique = un score global /5 + punch-list P1/P2 (pas de grille par axe). Je reprends ce format et j'ajoute une lecture par axe de la directive 03.

## Méthode + preuves empiriques (GF-1)

Chromium headless (playwright 1.60) sur 5 pages, desktop 1440x900 + mobile 390x844, scroll complet pour déclencher les reveals, `getComputedStyle` + comptage typo + overflow-x + console. Captures dans `scratchpad/shots/`.

Pages : `/` · `/services/site-web-ia` · `/cas-clients/amploi` · `/library/bento-grid` · `/contact`.

Mesures clés (toutes pages, desktop + mobile) :
- H1 `opacity:1`, transform neutre partout. 0 élément critique caché.
- **overflow-x = 0 partout** (docW == cliW sur 1440 ET 390). Aucun débordement horizontal.
- **0 erreur console** sur les 10 rendus.
- Typo (vérif corrigée par GF-4) : les grands titres de section h2/h3 sont **tous en Inter Tight** ; seul le H1 hero est en Instrument Serif (79px). Requête `instrument + fs>=22` sur h2/h3 corps = **0**. (Mon premier comptage « 27-29/32 serif » était un faux positif : le substring `serif` matchait le fallback générique, pas Instrument Serif.)

## Score it.13 : 4,5/5 : maintenu, territoire polish. 0 P1, 0 régression.

La qualité éditoriale reste au niveau it.12. Deux vrais progrès depuis it.12, aucune régression bloquante, mais le levier qui ferait passer 4,5 → 4,7+ (signature motion/immersive) reste non livré.

## Ce qui a progressé depuis it.12

1. **Typo transverse (directive #4) : soldée sur le flagship.** L'inquiétude « h2/h3 en Instrument Serif sur des phrases entières » (flaggée non-exécutée dans `state/05`) n'a plus lieu : le corps est 100 % Inter Tight, le serif est réservé au H1 hero + aux mots d'emphase inline (accents coral italic sur « PME », « IA », « en production », « séance », « cadre », « convertit »). C'est exactement la doctrine visée. Progrès net et vérifié.
2. **Densité d'illustration.** Duotone coral/teal réels présents et bien placés : radar « boucle lire/mesurer/réinjecter » (home), panneau média EKG « monitoring continu » (author panel service), colonnes d'illustrations surréalistes coral (home §diagnostic), 2 vraies captures produit du site Amploi dans le cas client. Plus de media-block brut pleine largeur (l'anti-exemple de la directive #6). Réel, propriétaire, crédible.
3. **Rythme ink/paper maîtrisé.** Home alterne proprement paper → ink (radar) → paper → ink (« Là où l'argent fuit ») → paper (cas) → ink numéroté I-IV → author bento → FAQ paper → CTA ink. Pas de monotonie, pas de doublon de traitement visible sur le parcours.

## Craft solide (au niveau, sans réserve)

- **Hero home** : swiss/éditorial fort. En-tête méta (ACCUEIL / FR / ÉDITION FRANÇAISE / DISPONIBLE T3 2026), H1 serif display, grille 6 capacités (Acquisition/Contenu/Web/Sales/Data/Marque), colonne métriques mono +12h / 5j / 100%, watermark logo fantôme. Niveau agence, pas thème.
- **Pricing service** : 4 paliers, gros chiffres mono, palier 2 « RECOMMANDÉ » en coral, features scannables, CTA différenciés par palier. Propre.
- **Cas Amploi** : barre métriques (6 sem / 2 / 3), couches numérotées 01/02/03, vraies captures produit, chips stack, CTA ink « Un site qui convertit et que les IA savent lire ». Bonne narration.
- **Contact** : « Une séance. Pas un pitch. » hero serif-accent, form + bloc contact direct, section « Choisissez un créneau ».
- **Responsive** : mobile repensé (CTA empilés, grille en stack, nav drawer), pas rétréci. 0 overflow.

## Faiblesses résiduelles (par ordre d'impact)

1. **La signature motion/immersive manque toujours (directive D).** Les pages sont de l'éditorial **statique**. Aucun moment « scroll-driven » mémorable (Container Expansion, parallax léger, reveal chorégraphié) sur le flagship. `data-reveal` = 0 sur les 5 pages testées. C'est cohérent avec la directive (« animations = chantier réel pas encore livré ») mais **c'est LE plafond** : un site awwwards SOTD au registre Linear/Stripe/Anthropic a 2-3 moments de motion qui servent le contenu. Sans ça, le site plafonne « très bon site de cabinet » et n'atteint pas le « donne envie de scroller » narratif visé (§A/§D).
2. **`/contact` : zone booking en état vide.** Sous « Pas de form. Choisissez un créneau », l'embed Cal.com (iframe présente dans le DOM, `found:true`) ne peint rien au chargement : grande bande blanche morte (~380px display) avant le CTA « Besoin d'un cadre ». Probablement gaté par le consentement cookies / chargement lent. Un vrai visiteur pré-consentement voit un titre qui promet des créneaux au-dessus d'un vide. Fallback ou skeleton attendu. (confiance moyenne : dépend du consentement)
3. **Bandes de respiration parfois trop lâches.** Sur `/cas-clients/amploi`, quelques vides paper généreux (sous les captures « Le site livré », sous l'author card) lisent légèrement sparse plutôt qu'« active whitespace ». Pas cassé, mais le vide n'est pas toujours habillé (texture / line-art / média 1/5) comme le prescrit la directive §H.7.
4. **`/library/[type]` reste une datasheet dev-facing.** Dense, mono, table de specs + grille de variantes + bloc JSON. Cohérent et utile, mais c'est un artefact d'outil, pas une vitrine : à ne pas confondre avec les pages jury. (hors périmètre marketing, noté pour cadrage)

## Verdict axe par axe (directive 03)

- Typographie : **fort** (serif discipliné, hiérarchie claire) : progrès.
- Espacements / alignements : **bon**, quelques vides trop lâches sur cas.
- Copywriting : **fort** (voix cash, anti-théâtre, titres qui tranchent).
- Images : **bon → fort** (duotone réels bien placés, captures produit) : progrès.
- Variété sections / réassurance : **bon** (métriques, cas, author trust, FAQ, CTA ink ; bandeau confiance présent).
- Rythme / composition : **bon** en statique : **plafonné** par l'absence de motion signature.

## TOP 5 actions à fort impact

1. **[L] Livrer 2-3 moments de motion signature sur le flagship** (home + 1 secteur/offre). Container Expansion sur 1 section narrative (cas / diagnostic), scroll-reveal chorégraphié sur les blocs numérotés, parallax léger sur 1 illustration duotone. Primitives réutilisables, `prefers-reduced-motion`. C'est le seul vrai levier 4,5 → 4,7+. Cible : composants sections `case-spotlight`, `stats-bento`, blocs I-IV home. Skills : motion-framer / scroll-reveal / gsap-scrolltrigger.
2. **[S] `/contact` : état de chargement du booking Cal.** Skeleton ou liste de créneaux fallback sous « Choisissez un créneau » tant que l'iframe n'est pas peinte / consentement non donné. Supprime la bande morte au-dessus de la ligne de flottaison.
3. **[M] Habiller le vide actif sur `/cas-clients/*`.** Sous « Le site livré » et l'author card : texture DS / line-art / média 1/5 plutôt qu'un vide paper étiré (directive §H.7). Composant cas ou variante d'espacement, pas d'inline.
4. **[S] Resserrer 2-3 crans de densité sur le cas Amploi** (`--section-tight` sur les respirations trop larges) pour réduire la longueur perçue sans amputer le contenu SEO (directive §E).
5. **[M] Ajouter 1 moment « signature » créatif par page phare** (étage §C createur) au climax : sur `/services/site-web-ia`, le climax pricing ou le cas pourrait porter une variante immersive (ratio cinémascope, bento asymétrique) plutôt que le traitement standard, pour casser la régularité éditoriale.

## Note de rigueur (GF-4)

Correction en cours de mission : le pré-diagnostic « serif sur phrases entières non résolu » était faux (fallback générique `serif` compté comme Instrument Serif). Vérifié par requête `fontFamily` premier-token + `fontSize` : 0 grand h2/h3 serif. Le point typo #4 est bien soldé sur le flagship.
