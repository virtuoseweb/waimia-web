# Observation du style des illustrations Waimia (reverse prompting)

Analyse faite en regardant les 28 illustrations de `public/images/illustrations/` (originaux
couleur) et leurs variantes `ds/*-paper.webp` / `ds/*-ink.webp` (rendu réel du site).
À lire avant d'écrire un sujet : une nouvelle illustration doit pouvoir se glisser entre
deux existantes sans qu'on la remarque comme « différente ».

## 1. Grammaire commune

**Technique**
- Affiche éditoriale de magazine des années 60 (couvertures économiques, posters
  institutionnels), rendue comme une **sérigraphie ou une risographie** : aplats nets,
  grain papier fin sur les grandes surfaces, trame/pointillé dans les ombres, contours
  légèrement imparfaits.
- Deux familles de traitement coexistent : **aplats silhouettés** (woman-computer,
  style-15, band-showing-tv) et **gravure/hachures fines** (gentleman-craftsman,
  money-money, computer-crash-landscape). Les deux se tiennent grâce au grain et à la
  palette ; ne pas mélanger les deux dans la même image.
- Lumière plate, pas de reflets brillants, pas de 3D, pas de dégradé lisse numérique :
  quand il y a un dégradé, il est **en bandes** ou **en grain** (style-17, man-and-woman-hi).

**Composition**
- Panoramique très large (≈ 7:3). Le sujet tient dans la bande centrale ; le haut et le
  bas sont du fond.
- **Horizon bas et franc** : une bande de sol claire ou sombre sur 15–25 % du bas
  (woman-computer, band-showing-tv, men-on-hand, style-17). Le reste est un grand ciel uni.
- **Une grande forme géométrique simple** porte la métaphore : disque (soleil, halo
  derrière l'expert), demi-cercle, arc, flèche, rectangle d'écran.
- **Échelle** : des personnages petits face à une forme immense (style-17 : une silhouette
  minuscule devant une vague de 3/4 de l'image ; snow-movement : un skieur et une boule de
  neige géante). Quand le personnage est grand, il est seul et centré (pretty-woman,
  gentleman-craftsman).
- Beaucoup de vide : 40 à 60 % de l'image est un fond uni. Un seul point focal.

**Personnages**
- Silhouettes années 60 : costumes sombres, attachés-cases, jupes crayon, chemisiers à col,
  chignons, coupes courtes, lunettes rondes. Vus **de dos, de profil ou au loin** ; visages
  peu détaillés, sauf portraits assumés.
- Postures calmes, retenues : marcher, regarder, tendre la main, travailler à un ordinateur.
  Jamais de gesticulation, de joie exagérée ou de pose de stock photo.
- Groupes en **rangées** ou en petit cercle de travail ; le groupe compte plus que l'individu.

**Ton et ce qui se dégage**
- Sérieux, cultivé, un peu ironique ; **surréalisme doux** (une ombre qui travaille à ta
  place, une équipe posée dans une main, un échiquier qui s'envole). L'image pose une
  question plutôt qu'elle n'affirme.
- Calme et silence : pas d'action violente, pas de foule chaotique, même pour un sujet
  « problème » (chess reste élégant).
- Premium, éditorial, « cabinet de conseil qui lit The New Yorker », jamais tech-gadget.
- La métaphore est **concrète et lisible en 2 secondes** sans légende.

**Ce qu'on ne voit jamais**
- Texte, chiffres, logos (les rares lettres des originaux, « NO / YES », « $ », sont à
  éviter dans les nouvelles), robots, cerveaux, circuits lumineux, hologrammes, mains
  robotiques, néons, écrans pleins d'interfaces détaillées, photos.

**Couleur (rendu final)**
- Paper : tout l'image est terracotta sur crème ; le plus sombre est le terracotta, le plus
  clair le crème. Les grandes masses sont soit un aplat terracotta moyen, soit le crème.
- Ink : brun-noir encre dans les ombres, terracotta dans les tons moyens, crème dans les
  lumières ; plus dramatique, contraste plus fort.
- Tritone : ajouter le bleu `#75B0D7` en aplat sur une zone qui a une raison d'être froide
  (ciel, écran, eau, vitre, un objet focal). Les originaux couleur utilisaient déjà un bleu
  sarcelle/ciel en contrepoint du rouge (computer-health, chess, no-no-yes, style-11) : le
  tritone retrouve cette respiration.

## 2. Exemples analysés

Format : ce qu'elle montre · comment elle est faite · expression / ce qui s'en dégage ·
prompt inverse (sujet seul, le style vient de `style.json`).

### computer-health — RÉFÉRENCE TRITONE (« le pouls de votre système »)
- **Montre** : un ordinateur portable géant flotte au milieu d'un grand ciel bleu ; son écran
  est un aplat rouge ; un tracé d'électrocardiogramme traverse toute l'image de gauche à
  droite, rouge sur le ciel, crème sur l'écran ; un nuage crème granuleux à droite ; tout en
  bas, une fine bande de campagne (haies, deux petites maisons au toit rouge).
- **Fait** : le ciel bleu uni occupe ~70 % de l'image (mesuré `#76B2D9`, c'est l'origine du
  bleu `#75B0D7` du tritone) ; aplats nets, grain sur le nuage, horizon très bas et fin,
  objet unique centré à mi-hauteur.
- **Dégage** : calme, surveillance bienveillante, « tout est sous contrôle » ; surréalisme
  doux (un ordinateur posé dans le ciel au-dessus d'un village).
- **En tritone final** : ciel = bleu `#75B0D7`, écran et tracé = terracotta, nuage / bord
  d'écran / maisons = crème. Ici le bleu dépasse 30 % : pour ce type de composition « grand
  ciel », c'est voulu ; ajuster `check.cyan_max_share` (ex. 0.75) au lancement plutôt que
  de réduire le ciel.
- **Prompt inverse** : *A giant laptop floats in the middle of a vast plain sky; its screen
  is a flat solid panel; a single heartbeat line crosses the whole image from left to right,
  passing over the screen; a grainy cloud on the right; at the very bottom a thin strip of
  countryside with hedges and two tiny houses.*

### woman-computer — « l'IA, ton double qui travaille »
- **Montre** : une femme assise dans un fauteuil, ordinateur sur les genoux ; derrière elle,
  son ombre géante, debout, tape sur un autre ordinateur.
- **Fait** : aplats silhouettés, fond uni moyen, sol crème en bande basse, ombre en
  terracotta plus sombre. Grain fin.
- **Dégage** : sérénité, délégation, une pointe d'étrangeté. Le message (l'IA prolonge la
  personne) passe sans un mot.
- **Prompt inverse** : *A calm woman in a 1960s dress sits in a lounge chair with a laptop;
  behind her, her own giant shadow stands and types on another laptop. Plain background,
  pale floor band at the bottom.*

### band-showing-tv — « le marché vous regarde »
- **Montre** : quatre personnes de dos (trois costumes, une robe claire) face à un vieux
  téléviseur qui flotte haut dans un ciel uni ; à l'écran, une silhouette seule.
- **Fait** : sol crème granuleux, ciel aplat, personnages petits et centrés, TV au trait.
- **Dégage** : contemplation, légère dystopie, attention captée.
- **Prompt inverse** : *Four small figures seen from behind, three in dark suits with
  briefcases and one woman in a pale dress, stand on a pale grainy ground looking up at a
  vintage television floating in a plain sky; on its screen a single tiny figure.*

### men-on-hand — « on vous porte »
- **Montre** : cinq hommes en costume debout, en rang, sur une main géante paume ouverte,
  devant un demi-disque (soleil couchant) posé sur l'horizon.
- **Fait** : collage rétro (main gravée, hommes détourés), horizon net au milieu, demi-cercle.
- **Dégage** : soutien, confiance, protection, un peu solennel.
- **Prompt inverse** : *A row of five men in dark suits stands on a giant open palm, in front
  of a large half-sun resting on a flat horizon.*

### style-17 — « un individu, un impact démesuré »
- **Montre** : une silhouette minuscule en bas à gauche ; d'elle part une immense vague en
  arc qui monte jusqu'en haut à droite, en bandes de valeur.
- **Fait** : dégradé en bandes + grain, sol sombre texturé en bas, 70 % de vide.
- **Dégage** : levier, propagation, ambition tranquille.
- **Prompt inverse** : *A tiny lone figure stands on a dark textured ground at the far left;
  from it a gigantic arcing wave of stacked bands sweeps up across the sky to the top right.*

### snow-movement — « l'effet boule de neige »
- **Montre** : un skieur minuscule sur une pente en diagonale, poursuivi par une boule de
  neige gigantesque qui soulève des nuages de poudre.
- **Fait** : diagonale forte, matière peinte granuleuse, ciel uni.
- **Dégage** : momentum, croissance qui s'emballe, humour discret.
- **Prompt inverse** : *A tiny skier on a steep diagonal snow slope, followed by a gigantic
  rolling snowball throwing up clouds of powder; plain sky.*

### gentleman-craftsman-go-work — « l'expert à l'œuvre »
- **Montre** : un homme en costume et casque de chantier tape sur un portable, devant un
  grand disque ; au premier plan, une rangée de têtes de spectateurs de dos.
- **Fait** : gravure hachurée, disque aplat derrière la tête (auréole), public en amorce.
- **Dégage** : autorité, savoir-faire, démonstration publique.
- **Prompt inverse** : *A man in a suit and a white hard hat types on a laptop, framed by a
  huge disc behind him; in the foreground the backs of the heads of a seated audience.*

### man-and-woman-hi — « la rencontre »
- **Montre** : un homme âgé et une jeune femme marchent l'un vers l'autre et se tendent la
  main ; derrière chacun, une grande flèche qui pointe vers l'autre.
- **Fait** : pointillé/trame sur les vêtements, flèches en aplat granuleux, fond crème.
- **Dégage** : connexion, deal, élan mutuel, bienveillance.
- **Prompt inverse** : *An older man in a suit and a young woman in wide trousers walk
  toward each other and reach out to shake hands; behind each, a large flat arrow pointing
  at the other.*

### style-15 — « l'atelier de pilotage »
- **Montre** : quatre personnes devant des tableaux blancs couverts de carrés (kanban) :
  une assise au portable, deux debout qui discutent, une assise avec une tasse.
- **Fait** : silhouettes en aplat très contrastées, tableaux crème, fond uni.
- **Dégage** : méthode, collaboration concentrée, organisation.
- **Prompt inverse** : *Four colleagues in 1960s office clothes work in front of tall white
  boards covered with small square cards: one seated with a laptop, two standing and
  talking, one seated holding a cup.*

### money-money — « la croissance »
- **Montre** : cinq piles de pièces de plus en plus hautes sur une plaine ; un homme debout
  au sommet de la plus haute, une échelle ; un petit éléphant au loin ; un grand soleil.
- **Fait** : gravure, herbe hachurée, nuages, soleil disque.
- **Dégage** : ascension, résultat, une touche d'absurde (l'éléphant).
- **Prompt inverse** : *Five stacks of coins of increasing height stand on a wide grassy
  plain; a man in a suit stands on top of the tallest one beside a ladder; a large sun disc
  and clouds behind.* (sans « $ » : pas de signe.)

### chess — « la stratégie qui s'effondre »
- **Montre** : un échiquier vole en diagonale dans le ciel, ses pièces se dispersent en
  nuée ; un homme chute dessous.
- **Fait** : diagonale, éparpillement en particules, ciel uni, beaucoup de vide.
- **Dégage** : perte de contrôle, mais élégante et silencieuse.
- **Prompt inverse** : *A chessboard tilts through an empty sky, its pieces scattering into
  a swirling cloud; a small man in a suit falls beneath it.*

## 2 bis. Le reste de la bibliothèque (17 illustrations)

Même format, plus court. Ensemble, les 28 illustrations montrent **cinq types de composition**
qu'on peut réutiliser :
1. **Grand vide + petit sujet** : style-17, snow-movement, style-11, band-showing-tv, computer-health.
2. **Triptyque** (trois panneaux juxtaposés qui racontent une progression ou un contraste) :
   fruits, no-no-yes, no-woman-cry, oh-men-boy.
3. **Panneau coupé** (une colonne de couleur pleine + un champ vide ou une foule claire) :
   money-in-the-pig, woman-and-people.
4. **Rythme répété** (colonnes, rangées, tubes) : style-8, style-15, men-on-hand.
5. **Plan serré dramatique** (un objet ou des mains, lumière forte) : style-st, style-13, pretty-woman.

### car-on-the-road — « la trajectoire »
- **Montre** : une voiture blanche vue du dessus sur une route noire, une bande rouge et une
  ligne jaune en dessous, bande de ciel sarcelle en haut.
- **Fait** : vue zénithale, bandes horizontales pleine largeur, motif graphique pur.
- **Dégage** : élan, progression, chemin balisé. Idéal en bandeau fin.
- **Prompt inverse** : *Top-down view of a small white vintage car driving along a wide dark
  road with dashed lane markings, flat horizontal color bands above and below.*

### computer-crash-landscape — « les outils d'hier »
- **Montre** : un vieux Macintosh à l'écran fendu et son clavier, abandonnés sous un arbre noueux,
  au bord d'une colline ; ciel coupé en deux, nuages.
- **Fait** : ligne claire très détaillée (style BD), végétation gravée, grand aplat de ciel.
- **Dégage** : mélancolie, obsolescence, dette technique, sans dramatiser.
- **Prompt inverse** : *An old beige desktop computer with a cracked screen and its keyboard lie
  abandoned under a gnarled tree on a hillside, a large plain sky with a few clouds.*

### fruits — « ce qui se dégrade »
- **Montre** : trois pommes alignées, de la plus fraîche à la plus pourrie, chacune avec son ombre.
- **Fait** : gravure botanique vintage, fond crème uni, ombres portées en aplat.
- **Dégage** : pédagogie, dégradation progressive, entretien nécessaire.
- **Prompt inverse** : *Three apples in a row on a plain background, from fresh and glossy to
  bruised to rotten, each with a flat cast shadow, vintage botanical engraving.*

### its-x — « ce qu'on ne fait pas »
- **Montre** : un open space minimaliste aux murs rouges, dominé par une gigantesque croix murale ;
  bureaux et canapé minuscules au sol.
- **Fait** : perspective frontale symétrique, rendu plus lisse (presque 3D) : à ne pas imiter.
- **Dégage** : interdit, erreur, anti-pattern. Fort mais froid.
- **Prompt inverse** : *A minimalist open-plan office seen in perfect symmetry, tiny desks and a
  sofa dwarfed by a gigantic cross shape spanning the back wall.* (Garder le trait sérigraphié.)

### money-in-the-pig — « investir »
- **Montre** : un panneau crème vide à gauche ; à droite, sur fond rouge, une main en costume
  glisse une pièce dans la fente d'un vieux distributeur.
- **Fait** : panneau coupé, gravure hachurée sur la main et la machine, 40 % de vide.
- **Dégage** : décision d'investir, geste précis, coût/bénéfice.
- **Prompt inverse** : *Split composition: a plain empty panel on the left; on the right a hand in
  a suit sleeve slides a coin into the slot of a vintage machine.*

### no-no-yes — « trier, décider »
- **Montre** : triptyque : panneau sens interdit dans des palmiers, feu rouge, puis colline verte dégagée.
- **Fait** : trois panneaux de même hauteur, ciel bleu, aplats. (Les mots NO / YES sont à exclure
  pour les nouvelles.)
- **Dégage** : qualification, élimination puis feu vert.
- **Prompt inverse** : *Triptych of three equal panels: a no-entry road sign among palm trees, a
  red traffic light, then an open green hillside under a clear sky.*

### no-woman-cry — « la finance, la posture »
- **Montre** : triptyque : billets et disque rouge, histogramme boursier sur papier, femme en veste
  rouge de dos regardant au loin.
- **Fait** : collage éditorial, papier millimétré, portrait peint.
- **Dégage** : performance, lecture des chiffres, assurance.
- **Prompt inverse** : *Triptych: banknotes under a large red disc; a hand-drawn bar chart on graph
  paper; a woman in a structured jacket seen from behind, looking into the distance.*

### oh-men-boy — « les profils »
- **Montre** : triptyque de portraits : une femme illuminée par un soleil éclatant au-dessus de ses
  mains, une femme à lunettes tenant une carte, un homme en casque et lunettes d'aviateur.
- **Fait** : portraits frontaux, mélange couleur / gravure noir et blanc.
- **Dégage** : révélation, exploration, expertise. Un peu kitsch (hors pool automatique).

### pretty-woman — « décider avec la donnée »
- **Montre** : portrait d'une femme au carré court, main au menton, entourée de fenêtres d'interface
  et de lignes de circuit en aplats.
- **Fait** : portrait central plan serré, UI simplifiée en blocs sans texte lisible.
- **Dégage** : réflexion, intelligence calme, pilotage. Limite d'usage : l'UI doit rester abstraite.

### style-10 — « le signal dans le bruit »
- **Montre** : une jungle dense coupée par une trouée rouge ; au centre un petit cœur anatomique et
  un tracé de pouls.
- **Fait** : végétation gravée très chargée, trouée en aplat.
- **Dégage** : tension, signal vital, complexité. Ambigu (hors pool automatique).

### style-11 — « le départ »
- **Montre** : un coureur en silhouette sur une large bande crème, un petit avion rouge qui décolle
  dans la bande de ciel, liseré rouge au sol.
- **Fait** : trois bandes horizontales, deux petites figures aux extrémités, 80 % de vide.
- **Dégage** : lancement, accélération, ambition légère.
- **Prompt inverse** : *A running silhouette crosses a wide pale band at the bottom left while a
  small propeller plane takes off in the top band at the right; flat horizontal bands, lots of space.*

### style-12 — « le rythme »
- **Montre** : un tracé d'électrocardiogramme blanc traverse un fond rouge plein ; des nuages
  passent derrière.
- **Fait** : aplat total + ligne fine + nuages peints.
- **Dégage** : activité, pouls d'un système, monitoring. Bon séparateur.

### style-13 — « le temps presse »
- **Montre** : un réveil sur une table de nuit, dans une chambre sombre traversée par un rai de lumière.
- **Fait** : plan serré, nuit bleu-noir, grain fort, seul objet coloré = le réveil.
- **Dégage** : urgence, insomnie, temps perdu. Le plus sombre de la série : idéal en ink.
- **Prompt inverse** : *A vintage alarm clock on a bedside table in a dark bedroom, a diagonal beam of
  light crossing the wall, heavy grain.*

### style-8 — « l'aiguillage »
- **Montre** : cinq grands tubes verticaux, une personne en costume dans chacun ; une sixième, en
  dessous, regarde.
- **Fait** : rythme de colonnes répétées, format presque carré (à recadrer en 7:3 pour les nouvelles).
- **Dégage** : parcours, routage, choix de voie, système qui oriente les gens.
- **Prompt inverse** : *Five tall vertical tubes side by side, a figure in a suit standing inside each,
  a sixth small figure below looking up at them.*

### style-st — « au travail »
- **Montre** : deux mains sur un clavier vues d'en face, halo lumineux rouge qui monte de l'écran.
- **Fait** : plan serré, dégradé granuleux en halo, contraste fort.
- **Dégage** : concentration, production, intensité. Utilisé en héros du guide.

### super-girl — « se distinguer »
- **Montre** : une femme à lunettes de soleil au centre d'une salle de spectateurs âgés en costume,
  plusieurs aussi à lunettes.
- **Fait** : portrait de groupe frontal, figure centrale en couleur vive.
- **Dégage** : singularité, assurance, un peu décalé (hors pool automatique).

### woman-and-people — « sortir du lot »
- **Montre** : un panneau rouge avec une femme confiante qui regarde vers le haut ; à droite, une
  foule esquissée en crème très pâle.
- **Fait** : panneau coupé, figure en aplat net vs foule à peine tracée.
- **Dégage** : leadership, confiance, différenciation sereine.
- **Prompt inverse** : *Split composition: a solid color panel with a confident woman looking upward;
  beside it a vast crowd sketched in very faint pale lines.*

## 3. Check-list « ça ressemble à du Waimia »

- [ ] Une métaphore concrète, lisible sans légende, légèrement surréaliste.
- [ ] Une grande forme simple + des personnages petits (ou un seul personnage centré).
- [ ] Horizon franc, 40 % de vide au moins, un seul point focal.
- [ ] Silhouettes années 60, postures calmes, vues de dos/profil/au loin.
- [ ] Aplats + grain fin (ou gravure fine), pas de 3D ni de brillance.
- [ ] Aucun texte, chiffre, logo, robot, circuit.
- [ ] Palette finale respectée (palette-check ✓) ; bleu seulement en tritone, en aplat.
