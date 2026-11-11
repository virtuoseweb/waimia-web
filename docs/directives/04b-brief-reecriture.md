# Brief de réécriture d'un lot de contenus (chantier voix humaine, novembre 2026)

Tu réécris un lot de contenus publiés de waimia.com pour qu'ils se lisent comme écrits par
Simon Beros, rédacteur expert, avec une identité franche et reconnaissable. Zéro slop IA.

## Lire d'abord, en entier
1. `docs/directives/04-voix-redactionnelle.md` : LA règle (rédacteur Simon, identité
   anti-théâtre, aucune trace de fabrication, tunnel du silo).
2. Un modèle déjà validé : `src/content/blog/cles-api-automatisation-securite-pme.json`.
3. `src/data/taxonomies.ts` (SILOS : `guide`, `pillar`, `magnet` ; silo `claude` :
   service = `/services/integration-claude`), `src/data/conversion.ts` (clés LEAD_MAGNETS),
   `src/data/pricing.ts` (seuls prix autorisés), `src/content/cases/` (seuls clients réels).

## Par fichier
- Réécris toute la prose française : `body_sections[].html_fr`, ou les champs texte FR des
  `sections` (guides, comparatifs, services…), `excerpt_fr`, réponses de `faq_fr` (garde les
  questions). Mets `headings` en cohérence avec les H2/H3 et leurs `id`.
- **Signature** : au moins deux prises de position à la première personne de Simon par page
  éditoriale (« je déconseille… », « quand j'audite… ») ; pages de service, secteur,
  implantation, formation : « nous », avec un « je » quand Simon tranche. Jamais d'anecdote,
  de client ou de chiffre vécu inventé : il raisonne, il ne raconte pas.
- Supprime toute trace de fabrication : dates de lecture dans la prose, « n'a pas pu être
  lu », « erreur du site », « non vérifié ailleurs », « ce billet / cette page / cet
  article », sections « ce qu'on ne sait pas », « limites », « inconnues ». Les dates de
  lecture restent dans `sources` seulement. Attribution naturelle avec lien. Un fait
  invérifiable sort sans être annoncé. Une incertitude utile devient un conseil.
- NE TOUCHE PAS : `title_fr`, `seoTitle_fr`, `h1_fr`, `slug`, `publishedAt`, champs `*_en`,
  `heroIllustration`, `category`. Exception : si `description_fr` porte une trace de
  fabrication (« relu le… »), retire-la seulement, ≤ 160 caractères, mêmes mots-clés.
- Tunnel : lien vers le guide pilier du silo dans le premier tiers (sauf si la page l'est),
  lien vers la page de service là où le texte décrit le problème qu'elle règle. Articles de
  blog : `lead_magnet` = `magnet` du silo sauf ressource clairement plus pertinente ;
  `charte-ia-entreprise` seulement si le sujet est l'usage encadré de l'IA ou la conformité.
  Ne lie que des URL dont le fichier source existe (src/content ou src/pages). Ancres
  descriptives.
- Aucun fait, chiffre, prix, client nouveau. Un fait nouveau seulement s'il est lu à la
  source primaire maintenant, ajouté à `sources` avec « lu le 11 novembre 2026 ».
- `updatedAt` : date du jour au format déjà utilisé par le fichier (ISO complet si le
  fichier l'utilise).
- Garde la structure GEO (réponse directe en tête, définitions nettes, tableaux). Coupe le
  remplissage ; plus court si c'est plus fort. Pas de tiret cadratin. Apostrophes : style du
  fichier.

## Interdits
Aucune commande git de mutation, aucun build, aucun install, aucun fichier hors de ton lot,
aucun envoi externe.

## Preuves (sans build), depuis ton worktree
- `node scripts/check-ai-tells.mjs --report` : aucune ligne pour tes fichiers.
- `node scripts/check-no-emdash.mjs` : code 0.
- JSON valides : `python3 -c "import json,sys;[json.load(open(f)) for f in sys.argv[1:]]" <fichiers>`.
- Cibles des liens ajoutés : existence prouvée.

## Rapport (≤ 300 mots)
Par fichier, une ligne : changements, lead_magnet, liens du tunnel. Codes de sortie.
Ce que tu n'as pas pu faire.
