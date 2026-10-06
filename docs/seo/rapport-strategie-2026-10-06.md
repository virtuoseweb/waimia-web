# Rapport SEO, GEO et contenu · 6 octobre 2026

Livraison du cluster Claude (PR #76, `e23f2e4f`) puis plan pour la suite. Les chiffres viennent de la collecte `docs/seo/data/2026-W41/` (fenêtre du 6 septembre au 3 octobre 2026, donc **avant** la mise en ligne du cluster). Tout ce qui suit sans mesure est marqué « hypothèse ».

## 1. Ce qui est livré

| Bloc | Contenu | Preuve |
| --- | --- | --- |
| Hub | `/ressources/guides/claude-pme` réécrit : 26 sections, 14 questions, 19 liens internes, 10 illustrations | build, rendu Playwright (desktop 1440, mobile 390) |
| Pages enfants | fonctionnalités Claude, Claude Code, skills, plugins entreprise, Claude Design (18 à 19 sections chacune, 7 illustrations) | idem |
| Cowork | page `claude-cowork` conservée (URL), réécrite : « Cowork est désormais Claude » | idem |
| Pages existantes | `integration-claude` (12 à 19 sections), `consultant-ia-claude`, `formations/claude`, 2 comparatifs, `mcp-claude`, `agent-ia-definition`, 3 variantes `integrateur-claude` | idem |
| Lead magnets | 3 ressources livrées **uniquement** par e-mail (pièce jointe Resend), fichiers privés | production : `delivered:true, attached:true` pour les 3 vers `delivered@resend.dev` |
| Honeypot | `FormGuard` sur 8 formulaires + garde CI `check-honeypot` | preview : champ rempli = faux succès silencieux ; e-mail invalide = 400 |
| Illustrations | environ 190 au registre, dont 3 seulement par le moteur GPT | registre `src/data/illustrations.json` |
| Indexation | IndexNow : 9 URL envoyées (200) ; API Indexing : 9 soumises, 0 erreur, quota du jour 3/200 | `indexnow.json`, `indexing-api.json` du 6 octobre |

Limites de preuve : réception réelle de l'e-mail non contrôlée dans le tableau de bord Resend ; Core Web Vitals non mesurés ; `astro check` non relu (8 erreurs connues sur `main`).

## 2. Point de départ mesuré (avant cluster)

- **Visibilité** : 28 jours = 4 clics, 377 impressions, position moyenne 26,4. Sur 7 jours : 1 clic, 252 impressions (+174 % sur la semaine précédente).
- **Indexation** : sitemap 105 URL, 45 indexées, 43 « Google ne reconnaît pas cette URL », 12 détectées non indexées, 3 explorées non indexées, 2 en noindex. Le cluster entre dans les 43 : il n'a pas encore été vu par Google.
- **Pages qui reçoivent des impressions** : `/implantations/montpellier` (85, position 48,6), le hub Claude (61, position 31,6), le comparatif Claude vs ChatGPT (58, position 32,9), `/ressources` (30), `/services/consultant-ia-claude` (28, position 18,9).
- **Aucune requête commerciale à plus de 3 impressions n'est en première page**, hors marque (« waimia », position 1).
- **Concurrence** (sitemaps) : claudin.tech 188 URL, kayro.ai 129, sparkyflow 128, subti.ai 76, limova 23. Aucune nouvelle URL concurrente cette semaine.
- Autorité : 1 lien externe connu (brief Semrush d'octobre).

Conséquence : le goulot n'est pas le contenu seul, c'est la **découverte et l'autorité**. 4 clics en 28 jours ne permettent aucune conclusion sur la conversion. Il n'existe pas encore de ligne de base de leads par page : à mettre en place (section 7).

## 3. Cannibalisations mesurées

Source : `byPageQuery` sur 28 jours. Les volumes sont minuscules (1 à 5 impressions par couple), donc **signal faible, à surveiller, pas à trancher**.

| Requête | Pages concurrentes (impressions, position) | Décision |
| --- | --- | --- |
| `guide claude pme` | `/services/consultant-ia-claude` (5, 8,6) devant le hub (1, 14) | Le hub doit gagner : lien contextuel `consultant-ia-claude` vers le hub avec cette ancre, et retirer l'expression « guide » du titre de la page service si elle y figure. À vérifier dans le `title` avant d'agir. |
| `claude pme` | service consultant (5, 10,4), hub (3, 14), comparatif (4, 41,3) | Cible = hub. Le comparatif ne doit pas viser cette requête : relire son H1 et son maillage entrant. |
| 9 requêtes `… claude pme/tpe` (test, utiliser, dangers, charte, diagnostic, bonnes pratiques, sensibilisation) | hub et comparatif Claude vs ChatGPT | Le comparatif reçoit des impressions qu'il ne doit pas capter. Ajouter dans le comparatif un renvoi explicite vers les pages enfants (sécurité : kit de conformité ; charte : outil charte). |
| `diagnostic claude pme` | 4 pages | Requête d'intention outil : créer la page dédiée (section 5, ligne D1) plutôt que de la laisser se disperser. |
| `n8n vs zapier coût total` | article de blog et `/services/automatisation-n8n` | Cible = l'article (informationnel) ; la page service ne doit pas répondre à la question de coût. |
| `diagnostic perplexity pme` | `consultant-ia-claude` (position 91,7) et `referencement-ia` | Hors sujet pour la page Claude : ne rien optimiser dessus. |

Cannibalisation **structurelle** à surveiller sur le cluster neuf (hypothèse, non mesurable avant 4 semaines) : `integration-claude` (service) contre le hub sur « claude entreprise », et `formations/claude` contre le guide skills sur « formation claude ». Règle : une requête = une page cible, notée dans `docs/seo/keywords.json` (champ `target`).

## 4. Axes d'amélioration, par ordre de levier

1. **Autorité et découverte** (levier n°1, hypothèse fondée sur la mesure : 45 pages indexées sur 105, 1 lien externe).
   - Référencements : annuaires d'agences et de prestataires (La Fabrique du Net, Sortlist, Malt, Clutch), page partenaire Anthropic si éligible (conditions à vérifier avant toute promesse), communautés n8n et Make.
   - Une publication externe par mois qui cite une page du cluster (podcast, tribune, étude chiffrée propre à Waimia).
   - Liens depuis les clients et cas : page de cas avec lien retour négocié.
2. **Conversion** : instrumenter avant d'optimiser. Événements existants : `lead_magnet_downloaded` (tag Resend). Manquent : vue de la capture, soumission refusée (503 sans clé, 429), clic vers `/contact?offer=audit-ia-pme`. Sans cela, aucune décision de contenu ne se prouve.
3. **Requêtes de sous-traitance et d'achat** : le cluster couvre l'information et la comparaison. La demande d'un décideur est « agence / prestataire / consultant / sous-traitance + sujet + ville ou secteur ». Ces pages existent peu (Montpellier seulement en local avec traction : 85 impressions mais position 48,6).
4. **CTR** : `lowCtrPages` liste 4 pages sans clic malgré 30 à 85 impressions. Réécrire title et description une fois la position sous 20, pas avant (CTR attendu à position 30 : 0,4 %).
5. **GEO (moteurs génératifs)** : les réponses directes de 40 à 60 mots sont posées dans les nouvelles pages. À faire : fichier `llms.txt` (aucun fichier `public/llms.txt` trouvé le 6 octobre, route éventuelle à vérifier dans `src/pages`) listant les 6 guides, schéma `FAQPage`/`Article` vérifié par `check-jsonld`, citations de sources datées. Mesure possible : requêtes de test manuelles dans 3 moteurs, notées chaque mois (pas d'outil automatique en place).
6. **Dette de cohérence** : 8 erreurs `astro check` préexistantes ; héros de services convertis (6) à arbitrer ; volumes des 28 nouvelles requêtes à mesurer (champ `volume: null`).

## 5. Silos et pages à créer

Priorité = intention commerciale d'abord, puis volume probable (hypothèse, non mesuré). Chaque ligne = une page, une requête cible, un lead magnet ou un CTA audit.

| Id | Page proposée | Requête cible (hypothèse) | Intention | Maillage entrant minimal | Priorité |
| --- | --- | --- | --- | --- | --- |
| A1 | Agence d'intégration Claude : comment choisir (guide acheteur) | `agence claude`, `intégrateur claude` | sous-traitance | hub, `integration-claude`, mega-menu | 1 |
| A2 | Combien coûte une intégration Claude en PME (fourchettes sourcées) | `prix intégration claude` | transactionnelle | hub, guide d'achat, `/tarifs` | 1 |
| A3 | Sous-traiter ou internaliser l'IA en PME | `externaliser ia pme` | décision | hub, `consultant-ia-claude` | 1 |
| B1 | Claude pour la comptabilité et la finance (cas d'usage + skills) | `claude comptabilité`, `ia comptabilité pme` | métier | `cas-usages/finance-comptabilite`, skills | 2 |
| B2 | Claude pour les RH | `claude rh pme` | métier | `cas-usages/rh` | 2 |
| B3 | Claude pour le support client | `claude support client` | métier | `cas-usages/support-sav` | 2 |
| B4 | Claude pour le commercial et la prospection | `claude prospection` | métier | `prospection-automatisee` | 2 |
| C1 | Claude en Teams/Slack/Google Workspace : connecteurs et limites | `claude google workspace` | outil | plugins, MCP | 2 |
| C2 | Claude et RGPD : hébergement, données, sous-traitants (page dédiée) | `claude rgpd` | risque | kit de conformité, `/conformite-ia` | 1 |
| D1 | Diagnostic Claude pour PME (outil, version gated) | `diagnostic claude pme` | outil | hub, comparatif | 1 |
| E1 | Formation Claude : financement OPCO et Qualiopi (guide) | `formation claude opco` | transactionnelle | `formations/claude` | 2 |
| F1 | Pack workflows n8n prêts à importer (lead magnet) | `workflow n8n pdf`, `template n8n` | lead magnet | `automatisation-n8n`, `n8n-prix` | 2 |
| F2 | Zapier vs n8n vs Make : coût réel (hub comparatif) | `zapier vs n8n` | comparatif | blog existant, `n8n-vs-make` | 2 |
| G1 | Agents IA par fonction (hub) | `agent ia commercial` | informatif et commercial | `agents-ia`, `agent-ia-definition` | 3 |
| H1 | Pages locales : Toulouse, Nantes, Lille (si preuve locale réelle) | `agence ia toulouse` | local | `implantations` | 3, **conditionnée** |
| I1 | Fil d'actualité Claude (une note courte par évolution produit) | requêtes « claude nouveauté » | informatif | hub, Cowork | 3 |

Règles : pas de page locale sans élément de preuve réel (client, événement, adresse) ; pas de chiffre de prix non sourcé ; une page A, B ou C ne s'ajoute qu'avec un lien depuis le hub le jour de sa mise en ligne.

## 6. Maillage à ajouter (à faire, rien n'est posé)

Mesure de départ : 99 pages au registre, 0 orpheline, 45 275 liens, 0 cassé. Les liens à ajouter améliorent la **distribution**, pas la présence.

| Depuis | Vers | Ancre proposée | Pourquoi |
| --- | --- | --- | --- |
| `/` (accueil, position 2,1) | hub Claude | « Déployer Claude dans votre PME » | page la mieux placée du site : lui faire passer de l'autorité |
| `/implantations/montpellier` (85 impr.) | `consultant-ia-claude`, hub | « consultant IA Claude » | reprendre les impressions locales vers l'offre |
| `/services/consultant-ia-claude` | hub | « guide complet pour déployer Claude » | cannibalisation `guide claude pme` |
| `/services/automatisation-n8n` | `n8n-prix` | « prix de n8n » | séparer coût (guide) et offre (service) |
| `/ressources` (30 impr.) | hub et 3 lead magnets | blocs de cartes | page de passage sans clic |
| `claude-vs-chatgpt-pme` | `claude-skills`, `kit-conformite` | « sécurité et skills » | purge de la cannibalisation |
| `mcp-claude` | `claude-plugins-entreprise` | « plugins d'entreprise » | cohérence du cluster |
| `agent-ia-definition` | `claude-cowork` | « Cowork, désormais intégré à Claude » | entité marque fusionnée |
| articles de blog sur ROI, devis, tableau de bord | `calculateur-roi-ia`, `guide-achat-claude-pme` | ancres descriptives | convertir le trafic informatif |
| chaque nouvelle page A, B, C, D | hub + service concerné + audit | contextuelles | règle de mise en ligne |

Vérification à chaque ajout : `node scripts/check-internal-mesh.mjs` et `check-internal-links.mjs`.

## 7. Mesure à installer (sinon rien ne se prouve)

1. Ligne de base : relever W42 à W45 sur le hub et les 5 enfants (impressions, position, clics, couverture d'index).
2. Leads : compter les e-mails `lead_magnet_downloaded` par ressource (source Resend), plus les formulaires `/contact`. Objectif non chiffré tant que la base est à zéro.
3. Indexation : suivre `gsc-index.json` pour les 9 URL envoyées ; si la couverture reste « non reconnue » après 3 semaines, auditer les liens entrants et le sitemap.
4. Volumes : renseigner les 28 requêtes à `volume: null` via Semrush avant d'arbitrer les priorités de la section 5.

## 8. Risques et points non résolus

- Cowork : formulation datée du 5 octobre 2026 ; Anthropic peut changer le déploiement Team et Enterprise, la page doit être relue à chaque annonce.
- Aucune clé Resend sur les previews Vercel : les envois ne se testent qu'en production (adresse de test `delivered@resend.dev`).
- Les chemins `includeFiles` des PDF sont prouvés en preview (lecture réussie) et en production (envoi réussi) ; toute nouvelle ressource privée doit passer la même vérification.
- Illustrations : 3 images GPT sur le cluster (coût OpenAI). Aucun nouvel appel payant sans accord ; un garde-fou de script reste à décider.
- Pages non illustrables sans changement de code : hubs `/ressources/guides`, `/ressources/comparatifs`, `/ressources/outils`, `/services`, `/implantations`, `/cas-usages`, `/agence`, `/audit-ia-pme`, `/contact`, `/tarifs`, `/technologies`, `/manifesto`, `/equipe/simon-beros`. Décision de Simon nécessaire.
- Héros de services passés en `hero-split-media` : la ligne « Audit gratuit de 45 minutes… » a disparu sur 6 pages ; à confirmer ou rétablir.
