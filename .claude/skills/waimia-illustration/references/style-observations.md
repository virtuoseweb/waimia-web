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

## 3. Check-list « ça ressemble à du Waimia »

- [ ] Une métaphore concrète, lisible sans légende, légèrement surréaliste.
- [ ] Une grande forme simple + des personnages petits (ou un seul personnage centré).
- [ ] Horizon franc, 40 % de vide au moins, un seul point focal.
- [ ] Silhouettes années 60, postures calmes, vues de dos/profil/au loin.
- [ ] Aplats + grain fin (ou gravure fine), pas de 3D ni de brillance.
- [ ] Aucun texte, chiffre, logo, robot, circuit.
- [ ] Palette finale respectée (palette-check ✓) ; bleu seulement en tritone, en aplat.
