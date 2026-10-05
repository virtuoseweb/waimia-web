# Prompt de la tâche planifiée « Soumission Brave hebdomadaire Waimia »

> Texte exact de la tâche planifiée Claude du lundi, 8 h 21 à Paris, qui passe par le navigateur de Simon (ordinateur allumé). Chaque exécution part d'une session neuve, sans mémoire : le texte doit se suffire. La procédure détaillée et ses raisons sont dans `docs/seo/ROUTINE.md`, section 12, qui fait foi. Pour changer la tâche, modifier ce fichier dans une PR, puis recopier tout ce qui suit la ligne « Texte à recopier » dans la tâche planifiée.

## Texte à recopier

Tu soumets à Brave Search les pages nouvelles ou modifiées du site waimia.com, pour Simon Beros, fondateur de Waimia (studio de développement IA et cabinet d'automatisation pour PME). Brave Search n'a ni API ni outil pour webmasters : le seul moyen est son formulaire public, une URL à la fois, dans le navigateur de Simon. Cette tâche tourne chaque lundi matin, sans Simon devant l'écran, et sans mémoire des semaines passées.

**Si tu as accès au repo `virtuoseweb/waimia-web`** : lis `CLAUDE.md`, puis `docs/seo/ROUTINE.md`, section 12 « Brave Search », qui fait foi. Tu ne modifies rien dans le repo.

**Étape 1 : calculer la file, toi-même.** Elle ne dépend d'aucune collecte, d'aucun secret et d'aucun état. Resoumettre une URL déjà soumise est sans conséquence.

- Avec le repo (branche `main` à jour) :
  `node scripts/seo-routine/brave-queue.mjs --from-sitemap --days=8`
  La sortie donne « À SOUMETTRE MAINTENANT » (40 URL au plus) et « À REPRENDRE ».
- Sans le repo, à la main : lis `https://waimia.com/sitemap-0.xml`. Garde chaque URL dont le `<lastmod>` est postérieur ou égal à la date du jour moins 7 jours. Classe-les de la plus récente à la plus ancienne. Les 40 premières sont à soumettre, le reste est « à reprendre ».
- Dans les deux cas, si tu peux lire `docs/seo/data/latest.json` sur `main` et qu'il contient `brave.toSubmit`, ces URL s'ajoutent en tête de la file (le script le fait seul). Si Simon a nommé des URL dans sa demande, elles passent en premier.
- Ne garde que des URL qui commencent par `https://waimia.com`.

Si la file est vide, dis-le, avec la date et le nombre d'URL lues dans le sitemap, et arrête-toi là. Si le sitemap ne peut pas être lu, dis-le : ce n'est pas « rien à soumettre ».

**Étape 2 : soumettre, dans le navigateur de Simon.**

1. Ouvre `https://search.brave.com/submit-url` dans un nouvel onglet, sans le mettre au premier plan si c'est possible, pour ne pas gêner Simon.
2. Colle une URL dans le champ « Insert the URL to be re-fetched », clique « Submit ». Une seule URL à la fois.
3. Vérifie que la page affiche « Success · Thank you for your submission ». Tout autre résultat est un échec : note l'URL et ce qui s'est affiché. N'insiste pas plus de deux fois sur la même URL.
4. Recharge la page avant l'URL suivante (le bouton reste inactif sinon), puis recommence.
5. Arrête-toi à 40 soumissions, même si tout se passe bien : une vérification anti-robot est apparue vers 47 soumissions d'affilée le 4 octobre 2026.
6. Ferme l'onglet que tu as ouvert. Ne touche à aucun autre onglet.

**Si le navigateur est injoignable** (ordinateur éteint, extension déconnectée, onglet qui ne répond pas) : ne tente rien d'autre. Donne la file que tu as calculée, comme liste de ce qui n'a pas pu être soumis, et arrête-toi.

**Interdits, sans exception.**

- Devant un captcha, une case « je ne suis pas un robot », une page d'attente ou toute vérification humaine : arrête-toi net. Ne tente ni de la résoudre ni de la contourner. Tout ce qui restait passe dans « à reprendre ». Exception, à ne pas confondre : après chaque clic sur « Submit », le formulaire affiche de lui-même « Verifying you're a human being » quelques secondes, puis « Success ». C'est normal et ne demande aucune action : attends jusqu'à 30 secondes. Arrête-toi seulement si « Success » n'arrive pas dans ce délai ou si une épreuve à résoudre apparaît.
- Ne jamais saisir d'identifiant ni de mot de passe. Le formulaire ne demande aucun compte : une demande de connexion est une raison de s'arrêter.
- Ne jamais appeler l'adresse du formulaire directement (requête HTTP, script, `curl`) : la soumission passe par la page, dans le navigateur.
- Ne soumettre que des URL de `https://waimia.com` issues de la file. Aucun autre site, aucun autre formulaire, aucun autre moteur.
- Ne rien publier ni envoyer d'autre à l'extérieur. Ne rien modifier dans le repo, ne jamais fusionner ni pousser sur `main`, ne relancer aucun workflow, ne toucher à aucune tâche planifiée.
- Ne jamais écrire qu'une page est indexée chez Brave : une soumission acceptée ne garantit ni exploration ni indexation, et rien ne permet de le mesurer.

**Compte rendu final, en français, court.**

1. Comment la file a été calculée : script ou à la main, date et heure, nombre d'URL dans le sitemap, nombre d'URL retenues, et si `latest.json` a été lu.
2. Nombre d'URL soumises avec « Success ».
3. Échecs : chaque URL, avec le message affiché.
4. À reprendre : la liste complète des URL non soumises (au-delà de 40, après une vérification humaine, ou navigateur injoignable), avec la raison. Si la liste vient du script, donne aussi l'option pour la suite (`--offset=40`).
5. Tout ce qui t'a paru anormal (formulaire changé, texte de confirmation différent, sitemap vide).
