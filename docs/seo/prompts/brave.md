# Prompt de la tâche planifiée « Soumission Brave hebdomadaire Waimia »

> Texte exact de la tâche planifiée Claude du lundi, 8 h 21 à Paris, qui passe par le navigateur de Simon (ordinateur allumé). Chaque exécution part d'une session neuve : sa seule mémoire est le fichier `docs/seo/data/state/brave-submitted.json` du repo, qu'elle lit au départ et complète à la fin. La procédure détaillée et ses raisons sont dans `docs/seo/ROUTINE.md`, section 12, qui fait foi. Pour changer la tâche, modifier ce fichier dans une PR, puis recopier tout ce qui suit la ligne « Texte à recopier » dans la tâche planifiée.

## Texte à recopier

Tu soumets à Brave Search les pages nouvelles ou modifiées du site waimia.com, pour Simon Beros, fondateur de Waimia (studio de développement IA et cabinet d'automatisation pour PME). Brave Search n'a ni API ni outil pour webmasters : le seul moyen est son formulaire public, une URL à la fois, dans le navigateur de Simon. Cette tâche tourne chaque lundi matin, sans Simon devant l'écran. Sa mémoire est un fichier du repo : `docs/seo/data/state/brave-submitted.json` (chaque URL soumise avec « Success » et son `lastmod` à ce moment).

**Si tu as accès au repo `virtuoseweb/waimia-web`** : lis `CLAUDE.md`, puis `docs/seo/ROUTINE.md`, section 12 « Brave Search », qui fait foi. Le seul fichier que tu modifies est `docs/seo/data/state/brave-submitted.json`, et seulement par le script (étape 3).

**Étape 1 : calculer la file, toi-même.**

- Avec le repo (branche `main` à jour, `git pull --ff-only`) :
  `node scripts/seo-routine/brave-queue.mjs --from-sitemap`
  La sortie donne « À SOUMETTRE MAINTENANT » (40 URL au plus) et « À REPRENDRE ». Avec la mémoire, la file ne contient que les URL jamais soumises, ou dont le `lastmod` a changé depuis leur dernière soumission : une page déjà soumise et inchangée ne ressort pas. Le reste au-delà de 40 revient seul la semaine suivante.
- Si la sortie annonce « Pas de mémoire Brave » alors que le fichier devrait exister, signale-le dans le compte rendu.
- Sans le repo, à la main : lis `https://waimia.com/sitemap-0.xml`. Garde chaque URL dont le `<lastmod>` est postérieur ou égal à la date du jour moins 7 jours. Classe-les de la plus récente à la plus ancienne. Les 40 premières sont à soumettre, le reste est « à reprendre ». Dans ce cas, pas d'étape 3.
- Si Simon a nommé des URL dans sa demande, elles passent en premier.
- Ne garde que des URL qui commencent par `https://waimia.com`.

Si la file est vide, dis-le, avec la date, le nombre d'URL lues dans le sitemap et le nombre d'URL déjà soumises, et arrête-toi là. Si le sitemap ne peut pas être lu, dis-le : ce n'est pas « rien à soumettre ».

**Étape 2 : soumettre, dans le navigateur de Simon.**

1. Ouvre `https://search.brave.com/submit-url` dans un nouvel onglet, sans le mettre au premier plan si c'est possible, pour ne pas gêner Simon.
2. Colle une URL dans le champ « Insert the URL to be re-fetched », clique « Submit ». Une seule URL à la fois.
3. Vérifie que la page affiche « Success · Thank you for your submission ». Tout autre résultat est un échec : note l'URL et ce qui s'est affiché. N'insiste pas plus de deux fois sur la même URL.
4. Recharge la page avant l'URL suivante (le bouton reste inactif sinon), puis recommence.
5. Arrête-toi à 40 soumissions, même si tout se passe bien : une vérification anti-robot est apparue vers 47 soumissions d'affilée le 4 octobre 2026.
6. Ferme l'onglet que tu as ouvert. Ne touche à aucun autre onglet.
7. Tiens la liste exacte des URL qui ont affiché « Success », et d'elles seules.

**Étape 3 : enregistrer les « Success » dans la mémoire, puis pousser ce seul fichier.**

1. Écris les URL « Success » dans un fichier temporaire hors du repo, une par ligne, puis :
   `node scripts/seo-routine/brave-queue.mjs --record --record-file=<ce fichier>`
   Le script n'accepte que des URL de `https://waimia.com` présentes au sitemap, et enregistre leur `lastmod` du moment. Une URL refusée est à signaler.
2. `git status --porcelain` ne doit montrer que `docs/seo/data/state/brave-submitted.json`. Sinon, ne commite rien et signale-le.
3. Commite ce seul fichier sur `main` : `git add docs/seo/data/state/brave-submitted.json`, puis un message `chore(seo-data): mémoire Brave, <n> URL soumises le <date>`, suivi des lignes d'attribution demandées par la session.
4. Pousse : `git pull --rebase origin main`, puis `git -c credential.helper= -c credential.helper='!gh auth git-credential' push origin main`. Le workflow IndexNow commite lui aussi sur `main` : en cas de refus, refais `pull --rebase` puis le push, deux fois au plus. Ce fichier sous `docs/seo/data/` ne redéploie pas le site.
5. Si le push échoue malgré tout, ou si aucun accès au repo n'existe, donne la liste des « Success » dans le compte rendu : elle permettra d'enregistrer la mémoire à la main. Sans cet enregistrement, ces URL reviendront dans la file de la semaine suivante.

**Si le navigateur est injoignable** (ordinateur éteint, extension déconnectée, onglet qui ne répond pas) : ne tente rien d'autre, ne touche pas à la mémoire. Donne la file que tu as calculée, comme liste de ce qui n'a pas pu être soumis, et arrête-toi.

**Interdits, sans exception.**

- Devant un captcha, une case « je ne suis pas un robot », une page d'attente ou toute vérification humaine : arrête-toi net. Ne tente ni de la résoudre ni de la contourner. Tout ce qui restait passe dans « à reprendre ». Enregistre quand même les « Success » déjà obtenus (étape 3). Exception, à ne pas confondre : après chaque clic sur « Submit », le formulaire affiche de lui-même « Verifying you're a human being » quelques secondes, puis « Success ». C'est normal et ne demande aucune action : attends jusqu'à 30 secondes. Arrête-toi seulement si « Success » n'arrive pas dans ce délai ou si une épreuve à résoudre apparaît.
- Ne jamais saisir d'identifiant ni de mot de passe. Le formulaire ne demande aucun compte : une demande de connexion est une raison de s'arrêter.
- Ne jamais appeler l'adresse du formulaire directement (requête HTTP, script, `curl`) : la soumission passe par la page, dans le navigateur.
- Ne soumettre que des URL de `https://waimia.com` issues de la file. Aucun autre site, aucun autre formulaire, aucun autre moteur.
- Ne jamais enregistrer dans la mémoire une URL qui n'a pas affiché « Success ».
- Dans le repo, ne modifier que `docs/seo/data/state/brave-submitted.json`, par le script. Aucun autre fichier, aucune branche, aucune PR, aucun workflow relancé, aucune tâche planifiée touchée. Ne rien publier ni envoyer d'autre à l'extérieur.
- Ne jamais écrire qu'une page est indexée chez Brave : une soumission acceptée ne garantit ni exploration ni indexation, et rien ne permet de le mesurer.

**Compte rendu final, en français, court.**

1. Comment la file a été calculée : script avec mémoire, script sans mémoire, ou à la main ; date et heure, nombre d'URL dans le sitemap, nombre d'URL déjà soumises et écartées, nombre d'URL retenues.
2. Nombre d'URL soumises avec « Success ».
3. Échecs : chaque URL, avec le message affiché.
4. Mémoire : nombre d'URL enregistrées, SHA du commit poussé, ou la raison pour laquelle rien n'a été poussé (avec la liste des « Success » dans ce cas).
5. À reprendre : le nombre d'URL restantes et la raison (au-delà de 40, vérification humaine, navigateur injoignable). Avec la mémoire, elles reviennent seules lundi prochain.
6. Tout ce qui t'a paru anormal (formulaire changé, texte de confirmation différent, sitemap vide, file anormalement longue).
