# 11 : Manifeste des assets illustrations (waimia-web)

> Catalogue **par la vision réelle** de chaque image (ouverte une par une), pas par le nom de fichier.
> Source import : `~/Downloads/waimiaservices/image waimia/` (42 fichiers) → `public/images/illustrations/` (sanitizés web-safe).
> Daté 2026-06-18. Verdict DA global en §1, table import en §2, assets projet existants en §3, recommandation en §4.

---

## §1 : Notes de direction artistique (DA)

### 1.1 Deux registres visuels COEXISTENT dans le projet, et ils ne sont pas compatibles

**Registre A. line-art minimaliste DS (les assets DÉJÀ dans le projet : `themes/`, `besoins/`, `cas/`, `media/*.svg`, `img/*.svg`).**
C'est la vraie identité du site. Palette stricte et magnifiquement tenue : fond papier crème `#F6F1E8`, trait encre quasi-noir `#0C0B09`, **un seul accent** terracotta `#C94F2E`, gris secondaire `#6B6560`. Esthétique éditoriale, sobre, premium, type « schéma technique du New Yorker / rapport McKinsey illustré ». Aération maximale, un seul point rouge par image = focal. **C'est cohérent, distinctif, et taillé pour un cabinet IA B2B premium.** Les SVG (console, dashboard placeholder) prolongent exactement cette grammaire.

**Registre B. illustrations « éditoriales rétro » (les 42 fichiers importés).**
Style midjourney/AI-art : aplats granuleux façon sérigraphie riso, palette **rouge vif/corail + bleu sarcelle + crème**, parfois noir & blanc gravure. Esthétique « couverture de magazine économique 1960-70 » (band of suited figures, surrealisme doux). C'est beau et premium en soi, MAIS **ce n'est pas la même palette ni le même registre que le Registre A** : le rouge y est un rouge-corail saturé `~#E8462E` qui n'est pas le terracotta DS `#C94F2E`, le grain photo/sérigraphie jure avec le line-art vectoriel épuré.

### 1.2 Verdict utilisable ou non ?

**Partiellement.** Le lot importé est de **bonne qualité graphique** mais souffre de 3 problèmes pour un site B2B cabinet IA premium :
1. **Cohérence palette/registre cassée** avec le DS line-art déjà en prod (cf 1.1). Mélanger les deux sur une même page fera « patchwork ».
2. **Thème « tomates » envahissant** : ~12 des 42 images tournent autour de tomates/piment (un private joke ou un test de prompt « pretty woman / chef / tomate »). Hors-sujet total pour Waimia, **inutilisable pro** sauf détournement métaphorique très forcé.
3. **Plusieurs images cryptiques/kitsch** (spider-boss, super-girl lunettes, pirate-money, burning-boat) au sens trop ambigu pour porter un message d'entreprise.

**Recommandation cadre** : ne PAS basculer le site sur le Registre B. Garder le **Registre A (line-art DS)** comme identité principale. Piocher dans le Registre B **uniquement** une poignée d'images fortes et sur-sujet, en les réservant à des zones « éditoriales » (hero de blog, ouverture de cas, page manifeste) où un visuel plus chaud est assumé : et idéalement après un léger recolor vers la palette DS si on veut l'unité. Sinon, **générer de nouveaux SVG line-art** dans le Registre A pour les sections manquantes (cf §4).

---

## §2 : Illustrations importées (42) : catalogue par la vision

> Couleurs notées telles que VUES. « corail » = rouge-orangé saturé du lot. « sarcelle » = teal/bleu-vert. « crème » = beige papier.
> Verdict : **GARDER** (sur-sujet, exploitable pro) · **PEUT-ÊTRE** (beau mais hors-palette ou sens à forcer) · **ÉCARTER** (kitsch / hors-sujet / tomates).

| nouveau-nom | dépeint | style | couleurs | ambiance | usage suggéré | verdict |
|---|---|---|---|---|---|---|
| `band-showing-tv.webp` | 4 personnes en costume de dos regardant une vieille TV posée sur fond rouge, à l'écran une silhouette seule | illustration plate granuleuse | corail · bleu nuit · crème | contemplatif, rétro, légèrement dystopique | hero éditorial « le marché vous regarde » / section problème (suivre la masse) | PEUT-ÊTRE |
| `burning-boat.jpg` | foule en rouge sur une plage face à des barques en feu sur la mer nocturne | illustration narrative dramatique | rouge · bleu nuit · sable | dramatique, rituel, intense | trop chargé/symbolique pour du B2B | ÉCARTER |
| `screenshot-2026-06-12.png` | **capture d'écran d'une card de cas client** (Groupe industriel auto : -42 % contribution, 75 000 €/an, +2.1 pts, témoignage Marie D. DRH) | screenshot UI réel | indigo · blanc · gris | factuel, produit | **référence interne UI** (PAS une illustration) → écarter du pool visuel mais GARDER comme ref design de card cas | ÉCARTER (ref UI, pas illu) |
| `car-on-the-road.jpg` | vue aérienne d'une voiture sur une route, bandes graphiques nettes | illustration plate géométrique | sarcelle · corail · noir | dynamique, épuré, « en route » | bandeau fin / section « parcours / trajectoire » / séparateur | GARDER |
| `chess.webp` | un homme tombe d'un échiquier volant dont les pièces se dispersent dans le ciel | illustration surréaliste | bleu ciel · blanc · rouge sombre | chaos maîtrisé, perte de contrôle | section problème « stratégie qui s'effondre » | PEUT-ÊTRE |
| `computer-crash-landscape.webp` | vieux Mac à l'écran fissuré abandonné sous un arbre, ciel mi-bleu mi-rouge | illustration ligne claire détaillée (BD) | vert sauge · corail · crème | mélancolie tech, obsolescence | section « legacy / outils du passé / dette technique » | GARDER |
| `fruits.webp` | 3 pommes : saine → tachée → pourrie (dégradation) | gravure vintage botanique | rouge · ocre · vert · bleu | pédagogique, métaphore déclin | section « ce qui se dégrade sans entretien » (contenu, SEO, données) | GARDER |
| `gentleman-craftsman-go-work.webp` | homme en costume + casque de chantier tapant sur un laptop, public en silhouette | dessin au trait + aplat rouge | corail · noir · crème | autorité, expertise, mise en scène | section « expert / artisan du numérique » / page équipe | PEUT-ÊTRE |
| `man-and-woman-hi.webp` | un homme âgé et une femme se tendent la main, bandes rouge/gris | illustration plate pointilliste élégante | rouge · gris bleuté · crème | rencontre, connexion, deal | section « collaboration / mise en relation / onboarding client » | GARDER |
| `man-chili-pepper.webp` | homme en costume portant un piment géant, suivi de robots-tomates | illustration rétro humoristique | corail · sarcelle · crème | absurde, décalé | thème tomate/piment hors-sujet | ÉCARTER |
| `style-st.webp` | gros plan de deux mains tapant sur un clavier, halo rouge | illustration granuleuse sombre | rouge · sarcelle sombre · crème | concentration, travail, intensité | bandeau « à l'œuvre / production » / section process | GARDER |
| `style-10.webp` | jungle dense avec une découpe rouge centrale et un tracé ECG | collage graphique | vert sombre · corail · crème | tension, signal vital dans le bruit | trop abstrait/ambigu | PEUT-ÊTRE |
| `style-11.webp` | coureur en silhouette + petit avion rouge, larges bandes horizontales | illustration plate minimaliste | sarcelle · crème · corail | mouvement, départ, ambition | bandeau fin « accélération / décollage » | GARDER |
| `style-12.webp` | ligne d'électrocardiogramme blanche sur fond rouge avec nuages | peinture/aplat | rouge · blanc · bleu nuage | rythme, « pouls » de l'activité | section « monitoring / santé du système » (séparateur fin) | PEUT-ÊTRE |
| `style-13.webp` | réveil rouge sur table de nuit, rai de lumière, nuit | illustration cinématographique sombre | bleu nuit · rouge · | insomnie, urgence, temps qui presse | section « problème / temps perdu » (format paysage court) | GARDER |
| `style-15.webp` | 4 personnes en silhouette devant des tableaux/kanban rouges | illustration plate contrastée | rouge vif · noir · crème | collaboration, pilotage, organisation | section « méthode / pilotage projet / atelier » | GARDER |
| `style-4.jpg` | tomate déclinée sur tous supports média (panneau, TV, bus, mobile, bouteille) | illustration rétro publicitaire | sarcelle · rouge · crème | omnicanal, diffusion | métaphore « diffusion multi-canal » MAIS sujet tomate | ÉCARTER |
| `style-5.jpg` | chef cuisinier choisissant un piment parmi un océan de tomates identiques | illustration peinte réaliste | sarcelle · rouge · blanc | différenciation, sélection | métaphore « se démarquer » MAIS sujet tomate/chef | ÉCARTER |
| `style-5b.webp` | demi-tomate + demi-piment en gros plan sur fond rouge | macro stylisée | rouge saturé | culinaire | tomate hors-sujet | ÉCARTER |
| `style-6.webp` | visage de femme émergeant d'un océan de tomates | illustration onirique | rouge · | noyade, submersion | métaphore « submergé » MAIS tomate | ÉCARTER |
| `style-7.webp` | toast/canapé surmonté de chantilly et d'une rondelle de tomate | illustration botanique vintage | crème · rouge · vert | gastronomie | hors-sujet total | ÉCARTER |
| `style-8.webp` | 5 personnes en costume tombant/aspirées dans 5 tubes rouges, 1 en bas regarde | illustration au trait élégante | corail · noir · crème | choix, parcours, aiguillage | section « parcours / quel chemin choisir / routing » | GARDER |
| `style-9.webp` | bandeau titre « On My Mind » par Asad Zaman (doodles N&B) | header de newsletter dessiné | noir · blanc | brouillon, brainstorm | **asset tiers/branding externe** (nom d'auteur) | ÉCARTER |
| `style-main.jpg` | homme pensif, 3 bulles de pensée : gribouillis / tomate / piment | illustration rétro | sarcelle · rouge · | réflexion, décision | métaphore « clarifier ses idées » MAIS tomate | ÉCARTER |
| `computer-health.webp` | laptop flottant sur paysage, écran rouge avec ECG traversant l'image | illustration ligne claire | bleu ciel · rouge · vert | santé du système, monitoring | section « état de santé / diagnostic site » | GARDER |
| `style-17.webp` | petite silhouette d'où jaillit un immense dégradé rouge en arc | illustration minimaliste atmosphérique | gris bleuté · rouge dégradé · | impact, onde, propagation d'un seul individu | hero « un site, un impact démesuré » / section levier | GARDER |
| `spider-boss.webp` | homme en smoking sur fauteuil rouge, fils rouges reliés à une foule | illustration au trait fin | rouge · crème · noir | contrôle, réseau, marionnettiste | ambigu/inquiétant (manipulation) | ÉCARTER |
| `super-girl.webp` | femme à lunettes de soleil bleues au centre d'une foule en costume | illustration plate stylée | corail · sarcelle · | singularité, se démarquer | section « se distinguer dans la masse » (si on assume le rouge) | PEUT-ÊTRE |
| `its-x.webp` | bureau open-space minimaliste avec un immense X rouge mural | rendu 3D épuré | rouge · rose pâle · | refus, erreur, « ce qu'il ne faut pas » | section « anti-pattern / ce qu'on ne fait pas » | PEUT-ÊTRE |
| `men-on-hand.webp` | 5 hommes en costume debout sur une main géante, soleil rouge | photomontage collage rétro | rouge · vert sauge · crème | soutien, accompagnement, confiance | section « on vous porte / accompagnement » | PEUT-ÊTRE |
| `money-in-the-pig.webp` | main en costume insérant une pièce dans une fente (tirelire/distributeur) | gravure hachurée vintage | corail · crème · | investissement, ROI | section « investissement / coût-bénéfice / pricing » | GARDER |
| `no-no-yes.webp` | triptyque NO / NO / YES (panneau sens interdit, feu rouge, paysage vert) | illustration plate sérigraphie | bleu · rouge · vert | décision, validation, tri | section « qualification / oui-non / critères » | GARDER |
| `no-woman-cry.webp` | triptyque : billets+cercle rouge / graphe boursier / femme de dos en rouge | collage éditorial | gris · rouge · bleu · crème | finance, marché, posture | section « finance / performance / résultats » | PEUT-ÊTRE |
| `oh-men-boy.webp` | triptyque portraits : femme illuminée / femme à la carte / homme casque+lunettes | illustration sérigraphie | corail · N&B · | révélation, exploration, expertise | trio de portraits métiers (si recolor) | PEUT-ÊTRE |
| `people-ice-cream-car.webp` | ambulance + médecin en blouse + file de personnes âgées qui marchent | illustration plate pointilliste | rouge · bleu · crème | santé, urgence, file | secteur santé spécifique (peu générique) | ÉCARTER |
| `pirate-money.webp` | triptyque pictos : recyclage / drapeau pirate / portefeuille de billets | icônes vintage | rouge · noir · vert | piraterie, argent | sens brouillon/négatif | ÉCARTER |
| `pretty-woman.webp` | portrait de femme songeuse sur fond rouge avec UI/diagrammes flottants | illustration éditoriale soignée | corail · blanc · | réflexion augmentée par la data | hero « décider avec la donnée » / page produit | GARDER |
| `snow-movement.webp` | skieur minuscule sur pente enneigée poursuivi par une boule de neige géante | illustration ligne claire | bleu ciel · blanc · rouge | effet boule de neige, momentum | section « effet cumulé / momentum / croissance » | GARDER |
| `money-money.webp` | personnage gravissant un escalier de piles de pièces croissantes, soleil rouge | collage rétro | rouge · gris · crème | croissance, ascension, ROI | section « croissance du CA / progression » | GARDER |
| `woman-and-people.webp` | femme en rouge confiante au premier plan, foule esquissée derrière | illustration éditoriale élégante | corail · crème · | leadership, se distinguer, confiance | hero « sortez du lot » / page positionnement | GARDER |
| `woman-computer.webp` | femme assise dont l'ombre projetée tape sur un laptop | illustration sérigraphie épurée | corail · crème · bleu | l'IA comme prolongement de soi, automatisation | **section phare « votre double qui travaille »** / hero IA | GARDER (fort) |

**Bilan import** : ~17 GARDER · ~10 PEUT-ÊTRE · ~15 ÉCARTER (dont 8 tomate/culinaire, 1 ref UI, 1 branding tiers).

---

## §3 : Assets projet existants (déjà en prod) : catalogue

> Tous en **Registre A line-art DS** (palette `#F6F1E8` / `#0C0B09` / `#C94F2E` / `#6B6560`). Cohérence parfaite entre eux.

| fichier | dépeint | style | couleurs | ambiance | usage actuel/suggéré | verdict |
|---|---|---|---|---|---|---|
| `themes/theme-acquisition.webp` | aimant en U attirant des points (leads) | line-art DS | crème · encre · 1 point terracotta | attraction, lead-gen | thème « acquisition » | GARDER ★ |
| `themes/theme-contenu-seo.webp` | document texte rayonnant avec marque-page | line-art DS | crème · encre · terracotta | contenu, publication | thème « contenu/SEO » | GARDER ★ |
| `themes/theme-finance.webp` | balance en équilibre au-dessus de colonnes de texte | line-art DS | crème · encre · terracotta | équité, arbitrage financier | thème « finance » | GARDER ★ |
| `themes/theme-industrie.webp` | usine stylisée, fumée → cercles → soleil rouge | line-art DS | crème · encre · terracotta | industrie, production | thème « industrie » | GARDER ★ |
| `themes/theme-productivite.webp` | engrenages reliés par tapis roulants, 1 engrenage rouge | line-art DS | crème · encre · terracotta | mécanique, productivité, flux | thème « productivité » | GARDER ★ |
| `themes/theme-support-client.webp` | nuage de bulles désordonnées → alignées en file, 1 rouge | line-art DS | crème · encre · terracotta | mise en ordre du support, file | thème « support client » | GARDER ★ |
| `besoins/besoin-acquerir.webp` | multiples flèches/trajectoires convergeant vers un disque rouge | line-art DS | crème · encre · terracotta | convergence, capter | besoin « acquérir » | GARDER ★ |
| `besoins/besoin-operer.webp` | train d'engrenages + tapis roulants, 1 engrenage rouge | line-art DS | crème · encre · terracotta | opérer, faire tourner | besoin « opérer » | GARDER ★ |
| `besoins/besoin-piloter.webp` | tableau de bord : volant, jauges, graphes, radar, aiguille rouge | line-art DS | crème · encre · terracotta | piloter, mesurer, instruments | besoin « piloter » | GARDER ★ |
| `cas/cas-caserne.webp` | 3 usines isométriques reliées par fils pointillés, nœud rouge central | line-art DS iso | crème · encre · terracotta | réseau multi-sites, hub | header cas « caserne » | GARDER ★ |
| `cas/cas-halcyon.webp` | machine/imprimante émettant une cascade de documents, 1 rouge | line-art DS | crème · encre · terracotta | production de contenu en série | header cas « halcyon » | GARDER ★ |
| `cas/cas-northbound.webp` | grille de cases (backlog) → escalier descendant vers un point rouge | line-art DS | crème · encre · terracotta | déstockage, résolution progressive | header cas « northbound » | GARDER ★ |
| `cas/cas-plateau.webp` | entonnoir filtrant une pluie de gouttes → une seule goutte rouge | line-art DS | crème · encre · terracotta | filtrage, qualification, distillation | header cas « plateau » | GARDER ★ |
| `media/feature-console.svg` | **SVG** maquette de console d'orchestration d'agents (fenêtre, sparkline, journal, statut OK) | line-art DS vectoriel | papier · encre · terracotta | produit, supervision IA | feature « console agents » | GARDER ★ |
| `media/portrait-camille-rousseau.svg` | **SVG** avatar placeholder initiales « CR » sur rond beige | placeholder minimal | beige · gris | neutre | avatar témoignage (placeholder) | GARDER (placeholder) |
| `img/placeholder-dashboard-site-web-intelligent.svg` | **SVG** maquette dashboard complète (header, sidebar, 4 KPI, courbe trafic, table leads, barres) en grammaire DS | line-art DS vectoriel riche | papier · encre · terracotta | produit, dashboard | hero/section « site web intelligent » (placeholder à remplacer par vrai visuel) | GARDER (placeholder de qualité) |
| `img/placeholder-monogram-sb.svg` | **SVG** monogramme « SB » placeholder | placeholder minimal | papier · encre | neutre | avatar interlocuteur (placeholder) | GARDER (placeholder) |
| `logos/*.svg` (~20) | logos clients fictifs (atlas/kairo/lumen/nordis/orio/vela), intégrations (gdrive/gmail/hubspot/notion/pipedrive/postgres/salesforce/slack/snowflake/teams), placeholders A-E | logos SVG | divers | branding/preuve | bandeaux logos clients + grille intégrations | GARDER (existant, non détaillé) |

---

## §4 : Recommandation

### 4.1 Pour les sections « transformation / résultat / dashboard / métier »
Les meilleures images du lot importé, **sur-sujet et exploitables** :
- **Dashboard / pilotage data** → `pretty-woman.webp` (femme + UI flottante) ou, mieux encore et déjà en palette DS, le SVG `img/placeholder-dashboard-site-web-intelligent.svg` (à promouvoir en vrai visuel, c'est le plus aligné).
- **IA qui travaille pour vous / automatisation** → ★ `woman-computer.webp` (l'ombre qui tape = le double qui bosse) = **l'image la plus forte et la plus on-message du lot**.
- **Transformation / résultat / croissance** → `money-money.webp` (escalier de pièces) + `snow-movement.webp` (effet boule de neige) + `style-17.webp` (impact démesuré).
- **Métier / industrie / multi-sites** → garder le Registre A (`themes/theme-industrie`, `cas/cas-caserne`) qui est imbattable de cohérence ; en éditorial chaud, `computer-crash-landscape.webp` (dette/legacy).
- **Acquisition / se démarquer** → `woman-and-people.webp` + `man-and-woman-hi.webp`.

### 4.2 À écarter sans hésiter
Tout le **cluster tomate/piment/culinaire** (8 images : `burning-boat` aussi pour le côté trop dramatique, `man-chili-pepper`, `style-4/5/5b/6/7`, `style-main`), `screenshot-2026-06-12` (ref UI, pas une illu), `style-9` (branding tiers « On My Mind / Asad Zaman »), `pirate-money` (sens brouillon), `spider-boss` (connotation manipulation), `people-ice-cream-car` (santé trop spécifique).

### 4.3 Top 8 images les plus fortes (toutes sources confondues)
1. ★ `woman-computer.webp` : IA prolongement de soi → **hero IA / section automatisation**.
2. ★ `themes/theme-productivite.webp` (Reg. A) : engrenages flux → productivité (cohérence DS parfaite).
3. ★ `besoins/besoin-piloter.webp` (Reg. A) : tableau de bord instruments → pilotage.
4. ★ `img/placeholder-dashboard-site-web-intelligent.svg` (Reg. A) : dashboard riche → produit phare.
5. `money-money.webp` : escalier de pièces → croissance/ROI.
6. `snow-movement.webp` : boule de neige → momentum/effet cumulé.
7. `woman-and-people.webp` : leadership/se distinguer → positionnement.
8. `style-17.webp` : un individu, impact démesuré → levier.

### 4.4 Où il manque encore du visuel (à générer SVG line-art Registre A, ou GPT Image 2 en palette DS)
- **Hero homepage** propre (le dashboard placeholder est bon mais c'est un placeholder).
- **Section « comment on travaille / méthode »** (le `how-we-work-with-ai.jpg` importé est en réalité une **slide texte rouge**, pas une illustration : inexploitable comme visuel, à refaire en composant natif).
- **Étapes process** (3-4 pictos line-art DS cohérents avec `themes/`).
- **Preuve / E-E-A-T / équipe** (vrais portraits à terme ; aujourd'hui placeholders SB/CR).
- **Intégrations/écosystème** au-delà des logos (un schéma de flux DS).

### 4.5 Décision de cohérence (le point clé)
**Ne pas mélanger Registre A et Registre B sur une même page.** Deux options propres :
- **(Recommandé)** Rester Registre A line-art DS partout (identité actuelle, premium, cohérente) et **générer** les visuels manquants dans cette grammaire. Réserver 2-3 images du Registre B aux pages éditoriales (blog/manifeste) où le grain chaud est assumé.
- **(Alternatif, coûteux)** Recolorer les ~8 meilleures images du Registre B vers la palette DS exacte (`#C94F2E` au lieu du corail) pour les unifier : gain d'unité, mais perte du charme sérigraphie et travail de retouche.

---

## §5 : Statut de câblage des assets (addendum 2026-06-19)

> Audit empirique : `rg -o "/images/..." src` croisé avec `public/images/`. Le but « les recycle / utilise au mieux » (Simon) vise le CÂBLAGE, pas l'import. Import ≠ service.

### 5.1 État réel
- **public/images contient 53 fichiers** (28 illustrations + 11 line-art DS + 6 themes + 3 besoins + 4 cas + 1 cases/svg). Les ~14 illustrations ÉCARTÉES du §4.2 (cluster tomate, pirate-money, spider-boss, screenshot UI, style-9 branding tiers, people-ice-cream) ont été **élaguées après import** : il reste **28** illustrations (= les GARDER + PEUT-ÊTRE), pas 42. Le §VÉRIF ci-dessous corrige le compte d'origine.
- **Seuls 6 assets sur 53 sont réellement servis** dans une page (`rg` sur tout `src`) : `besoins/besoin-acquerir.webp`, `besoins/besoin-piloter.webp`, `besoins/besoin-operer.webp`, `themes/theme-productivite.webp`, `line-art/dispositif-flow.svg`, `cases/finance-close.svg`. → **47 orphelins.**

### 5.2 Logos : ne pas importer le dossier Downloads (redondant)
Le dossier `~/Downloads/logo a renommer…` (13 logos) est **redondant** avec `public/logos/partners/` déjà en place (`partner-claude/aws/microsoft/openai/sap/salesforce/google/github/hubspot/meta-business` + `partner-france-num`). Les Downloads sont des **variantes blanches sur transparent** → invisibles sur le marquee `paper` (clair) actuel = downgrade. Le badge **ACTIVATEUR France Num** (Downloads `marques-filles-Activateur`) existe déjà en variante sombre lisible (`partner-france-num.png`). **Décision : aucun import logo.**

### 5.3 Plan de recyclage des orphelins (destinations assignées)
- **line-art `probleme-*` (×4) + `livrable-*` (×6)** : câblés dans les slots `problems-grid` + `deliverables-grid` du flagship `integrateur-claude` (worker `lineart-wiring`, 2026-06-19). Match livrables 1:1 (6/6). 1 `probleme-*` reste en réserve.
- **28 illustrations Registre B** : destinations par slot déjà prescrites en §4.1 + §4.3 (top 8). Servir au fil de la composition des slots éditoriaux du flagship + des autres templates (D6 / V2), PAS en dump. Priorité de câblage = le top 8 du §4.3. **Ne pas mélanger Reg. A et Reg. B sur une même page** (§4.5).
- **themes/cas restants (9)** : à servir sur les hubs secteurs + headers d'études de cas (V2), 1:1 par sujet (table §3).

### 5.4 Critère « recyclé au mieux » (validation)
Objectif de fin de refonte : **0 asset GARDER orphelin** dans `public/images`. Mesure = `rg -o "/images/" src | sort -u | wc -l` doit couvrir tous les GARDER du §2/§3. Suivi à chaque vague.

---

## §VÉRIF
- ~~`ls public/images/illustrations/ | wc -l` → 42~~ → **corrigé 2026-06-19 : 28** (les ~14 ÉCARTÉES du §4.2 ont été élaguées après import ; cf §5.1).
- Fichiers copiés + renommés web-safe à l'import, table de correspondance dans §2 (colonne `nouveau-nom`).
- **0 commande git**, **0 re-délégation** (tout fait par l'agent lui-même).
- Écritures (import D1) limitées à : `public/images/illustrations/*` + ce manifeste. Addendum §5 (2026-06-19) = orchestrateur Opus.
