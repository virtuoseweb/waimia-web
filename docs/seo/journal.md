# Journal de la routine SEO/GEO

Une entrée par semaine, la plus récente en haut. Écrit par la session Claude hebdomadaire (voir `docs/seo/ROUTINE.md`, section 9). Le numéro de l'entrée est la semaine ISO de la session ; la collecte lue peut porter le numéro de la semaine précédente (runbook, section 0). Chaque entrée dit ce qui a été fait, pourquoi, et quoi mesurer ensuite. Les chiffres viennent de `docs/seo/data/` : aucun chiffre de mémoire, aucun chiffre estimé.

## Modèle d'entrée

```markdown
## AAAA-Www (collecte du JJ mois AAAA)

**Données** : collecte du JJ mois AAAA à HH:MM UTC (`generatedAt`), fraîche oui/non (`freshness.mjs`) · Search Console configuré oui/non · étapes en erreur : aucune / liste.

**KPI** (28 jours, variation contre les 28 précédents) : clics N (±N) · impressions N (±N) · CTR N % · position N (±N) · pages indexées N sur N.

**Brave** : N URL dans la file du jour (`brave-queue.mjs --from-sitemap`), à soumettre par la tâche Brave.

**Bilan mensuel** (premier lundi du mois seulement, runbook section 13) : évolution sur quatre semaines contre la référence · ce qui a marché ou non · changements proposés.

**Bilan des actions précédentes**
- AAAA-Www, `/chemin`, requête « … » : gagné / stable / perdu / trop tôt / non mesurable. Avant : position N, N impressions. Maintenant : position N, N impressions. Indexée : oui depuis le … / non (motif).

**Actions de la semaine** (PR #N) : au moins une création et une à deux révisions (runbook, section 4). Sans création : la raison admise par la section 4.4, avec le fait qui la prouve.
1. Création / révision / fusion de `/chemin` (entrée `id` du calendrier).
   - Pourquoi : l'entrée du calendrier ou la règle 4.x du runbook, avec la donnée qui l'a déclenchée.
   - Recherche en ligne : requêtes cherchées ; pages lues, avec lien (lues le JJ mois AAAA) ; ce qu'elles couvrent, ce qui manque.
   - Ce qui a changé : …
   - Sources primaires : lien (vérifié le JJ mois AAAA).
   - À mesurer : `/chemin`, requête « … » : valeur de départ. Attendu : … À juger à partir de AAAA-Www.

**Calendrier** : livré cette semaine · prévu la semaine suivante · entrées ajoutées (avec leur origine) · entrées abandonnées ou replanifiées (avec la raison) · N semaines d'avance (`check-calendar.mjs`).

**Brouillon LinkedIn** : `docs/seo/posts/AAAA-Www.md` (à relire et à publier par Simon).

**Non retenu cette semaine** : ce qui a été envisagé et écarté, en une ligne chacun.

**Pour Simon** : décisions attendues.
```

## Entrées

### Illustrations en production, 16 octobre 2026 (PR #107, `0de8e586`)

- **Demande de Simon** : plusieurs pages créées n'avaient pas d'image. 20 illustrations dessinées avec le skill `waimia-illustration` (moteur B, SVG, aucune API payante) : 9 héros (6 guides, 3 comparatifs) et 11 billets récents.
- **Défaut trouvé** : le gabarit des billets (`essay`) ignore `body_sections[0].figures` ; les billets affichaient l'illustration par catégorie. Les 11 billets portent l'image en `heroIllustration`. Deux anciens billets (`automatiser-relance-devis-n8n`, `trier-emails-entrant-claude-n8n`) ont encore des `figures` non rendues : tâche séparée.
- **Preuves** : build 0, `astro check` 8 erreurs (référence), portes à la référence, 20 pages mesurées à 1366×768 et 390×844 (image chargée, opacity 1, 0 débordement, 0 erreur console, bas des CTA des héros ≤ 725 px à 390×844), E2E 77 passés, preview 20 sur 20, production 20 sur 20.

### Vague 14 en production, 16 octobre 2026 (PR #105, `3d884315`)

- **Mesure** : Vercel Web Analytics activé et posé (composant Astro, injecté seulement lors d'un build Vercel). Première page vue comptée en production le 16 octobre. Une mesure maison (Neon, PR #104) a été construite puis fermée sur décision de Simon : Web Analytics est inclus dans le plan. Limite : les événements personnalisés (conversions) ne sont pas suivis ; l'e-mail interne de chaque lead porte déjà la page d'origine.
- **Contenu** : guide `cahier-des-charges-site-internet` (exemple de brief, méthode de Simon du 16 octobre, packs de 10 et 20 heures au taux horaire, option SEO/GEO, maillage vers le système complet) ; billet `ia-auto-hebergee-open-webui-pme` (accord de Simon), publié en article et non en guide.
- **Prix** : pages site web (hub, Shopify, Webflow, WordPress), prix d'entrée ramené au sprint de 10 heures.
- **Calendrier** : article « audit site internet » planifié en W48 ; 6 semaines d'avance. Orientation : plus d'articles que de guides (42 guides pour 32 billets le 16 octobre).
- **Preuves** : build 0, `astro check` 8 erreurs (référence), portes à la référence, balayage des 202 pages à deux tailles (404 rendus, 0 défaut), E2E 77 passés, preview vérifiée sur le SHA (script d'analyse en 200), production vérifiée.

### Vague 13 en production, 16 octobre 2026 (PR #102, `bfd8bdb1`)

- **Conversion d'abord** : mesure sur le build, avant la vague, 23 pages du sitemap sur 193 portaient une bande de capture, et 12 des 15 pages à impressions n'en avaient aucune. Ajouts : 9 bandes `lead-capture-band` (aimants à pièce jointe : guide d'achat Claude, kit conformité, charte) et 50 appels vers les outils (diagnostic de maturité, grille des tâches, calculateur ROI), car les aimants-outils exigent un résultat calculé (`lead-magnet-delivery.ts` renvoie 400 sans lui). Après : 37 pages sur 200 avec bande, les 15 pages à impressions ont toutes une capture (777 impressions sur 777 de la collecte du 8 octobre).
- **Sept créations** planifiées en W43 à W47, publiées : guides `audit-geo-pme`, `accompagnement-ia-pme`, `refonte-logiciel-metier` (SERP vérifiée : refonte applicative, pas de site), comparatif `formateur-ia-organisme-freelance-agence`, billets `etre-cite-par-perplexity`, `formation-ia-marketing-pme`, `agent-ia-24-7-pme`. Déclarées au maillage.
- **Révisions** : cas d'usage `finance-comptabilite` (cadre CNOEC, secret professionnel, facture électronique) et `rh` (DPAE, CNIL, article 22) ; titre de `/tarifs` aligné sur « tarif agence IA » (révision abandonnée selon sa condition : page déjà indexée) ; promesse de l'audit gratuit alignée sur `/audit-ia-pme` dans `referencement-ia` et `mesurer-visibilite-ia-chatgpt` (décision du 14 octobre).
- **Calendrier** : 6 créations planifiées de W43 à W48 (formation IA RH, factures fournisseurs, chatbot RH, réponse aux appels d'offres, relance des impayés, cahier des charges site internet), 6 semaines d'avance, 0 avertissement.
- **Preuves** : build 0, `astro check` 8 erreurs (référence), portes à la référence, balayage des 200 pages à deux tailles (400 rendus, 0 défaut), E2E 77 passés (5 nouveaux sur les captures, sans soumission), `lead-magnet-delivery` 18 sur 18, preview vérifiée sur le SHA, production vérifiée (8 URL en 200, sitemap 200, title de `/tarifs` servi).
- **Non fait** : mesure du CTR et des conversions (Search Console et CI bloquées par la facturation GitHub) ; secteurs sans bande (gabarit à `body_sections`) ; bande automatique de fin de billet (changement de gabarit, tâche dédiée).

### Vague 12 en production, 16 octobre 2026 (PR #101, `d315b66c`)

- **Cinq créations planifiées, publiées en avance** : comparatif `lovable-vs-developpement-sur-mesure`, billets `poc-ou-mvp-differences-pme`, `contenu-ia-seo-google-penalise`, `connecter-claude-wordpress-shopify-mcp`, `chatgpt-shopping-e-commerce` (disponibilité en France présentée comme non confirmée).
- **Sept révisions** : billet GEO aligné sur le guide de Google du 15 mai 2026 (viser l'IA générative reste du SEO) et sur le rapport Search Console IA générative ; `geo-vs-seo` recentré sur la décision de budget ; `ai-act-pme-calendrier` revérifié dans les articles 111 et 113 (délai du 2 décembre 2026 pour le marquage) ; `avis-n8n-vs-zapier-2026` (calcul des tâches Zapier corrigé), `n8n-vs-make`, `/services/automatisations`, `/services/sequences-de-suivi`. Frise de `/conformite-ia` complétée du 2 décembre 2026.
- **Revue Opus bloquante, corrigée avant fusion** : quatre affirmations contredites par leur source primaire (crédits Lovable : le site publié reste en ligne ; dépassement Zapier plafonné à 3 fois le quota de tâches ; dépassement n8n décrit seulement pour Business et Enterprise, corrigé aussi dans `n8n-prix` déjà en production ; délai AI Act du marquage) et trois réserves.
- **Calendrier et suivi** : sept créations planifiées de W43 à W47 (audit GEO, formateur IA, refonte de logiciel métier, formation IA marketing, agent IA 24/7, accompagnement IA, être cité par Perplexity), 6 semaines d'avance ; 14 requêtes ajoutées à `keywords.json` (pages des vagues 11 et 12, cibles à créer à `null`).
- **Preuves** : portes 37 sur 39, `astro check` 8 erreurs, balayage des 193 pages à deux tailles après corrections (386 rendus, 0 défaut), E2E 72 passés, preview vérifiée sur le SHA, production vérifiée (5 URL en 200, sitemap 193).
- **Mesure Lighthouse mobile en production (16 octobre)** : pages de contenu 88 à 98, SEO 100, accessibilité 96 à 97, CLS 0 ; accueil 75 à 95 selon le passage (1 761 éléments, 1,4 s de styles et mise en page).

### Vague 11 en production, 16 octobre 2026 (PR #100, `03af0de9`)

- **Six créations** sur des requêtes où les concurrents se classent sans page Waimia (analyse des exports Semrush du dossier `waimia seo` : noiise, kayro, ia4ops, lucasfonseque, bulk formation) : guides `claude-in-chrome-entreprise`, `prompt-engineering-pme`, `mesurer-visibilite-ia-chatgpt`, comparatif `chatgpt-claude-gemini-perplexity-pme`, billets `ai-mode-google-ai-overviews-pme` et `geo-local-recommande-par-les-ia`. Six autres sujets planifiés de W43 à W48 (Lovable ou sur mesure, POC ou MVP, contenu IA et Google, Claude avec WordPress et Shopify, ChatGPT Shopping, IA auto-hébergée) : la porte du calendrier passe de 0 à 6 semaines d'avance.
- **Révisions des pages à impressions sans clic** (collecte GSC du 8 octobre) : `automatisation-n8n`, `calculateur-roi-ia` (FAQ servie en accordéon, FAQPage), `consultant-ia-claude`. Secteurs `batiment`, `e-commerce`, `startup-logiciel` réécrits pour l'IA ; `startup-logiciel` entre dans l'index (décision du 5 octobre). Une page secteur qui déclare ses cas n'affiche plus qu'eux (`src/lib/sector-cases.ts`).
- **Design** : bandes de prose pleine largeur (110 contenus ; colonne de lecture inchangée à 656 px), tableaux et code de prose sans débordement, fonds alternés du comparatif Claude vs ChatGPT, héros de Montpellier, hub ressources, note de prix bornée.
- **Revue Opus** : ok avec réserves, corrigées avant fusion (cartes de cas hors sujet sur `startup-logiciel`, durée du sprint n8n, sources Studeria et SparkToro). Prix ChatGPT Business et Gemini Enterprise relus sur les pages officielles ; montant en euros de Workspace non relu (page servie en dollars).
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs, balayage des 188 pages à deux tailles après corrections (376 rendus, 0 défaut), E2E 72 passés, preview vérifiée sur le SHA (9 pages, un H1, FAQPage, index), production vérifiée (7 URL en 200, sitemap 188, title n8n servi).
- **Non fait** : données Search Console à rafraîchir (identifiants seulement dans la CI, bloquée par la facturation) ; porte `semantic` (13 écarts de jetons DS, tâche DS dédiée).

### Vague 10 en production, 16 octobre 2026 (PR #99, `eb73dba7`)

- **Contenu** : guides `claude-tpe` (dirigeant seul et conditions grand public, comptes Team) et `claude-finance-pme` (factures, PDF, Excel, facturation électronique DGFiP 2026-2027), billet `agent-ia-entreprise-exemples`, section « Agence, freelance ou cabinet de conseil » dans `choisir-agence-ia-pme` (tarifs Freeland sourcés), pages services `agent-support-client` (chatbot à règles ou agent, article 50) et `applications-internes` (application métier ou logiciel du marché). Six entrées du calendrier publiées.
- **Revue Opus** : sources relues (Anthropic, Intercom, Salesforce, Freeland, DGFiP). Réserves corrigées avant fusion : réserve sur Pro et l'usage commercial ajoutée à `claude-for-small-business` (contradiction avec `claude-tpe`), limite PDF à 600 pages, marge d'environ 30 % du découpage des modèles depuis 4.7, accès de l'agent en lecture puis écriture. Laissé : « Quelques semaines, premier agent de support en production » (`agent-support-client`), qui ne l'attribue pas au sprint.
- **Preuves** : portes 37 sur 39 avec le numéro de PR (rouges connues), `astro check` 8 erreurs, balayage des 181 pages à deux tailles (362 rendus, 0 erreur, 0 débordement, 0 CTA hors écran), E2E 72 passés, preview vérifiée sur le SHA (200, un H1, marqueurs), production vérifiée (3 nouvelles URL en 200, sitemap 181 URL).
- **Rapprochements du dossier `waimia seo`** : « Pages with only one internal link » soldé (mesure sur le build, hors en-tête et pied : seules `/cgv` et `/mentions-legales` ont moins de 2 liens entrants) ; « Content not optimized » soldé (les 4 pages signalées le 9 octobre ont un paragraphe maximal de 68 à 69 mots).

### Vague 9 en production, 15 octobre 2026 (PR #98, `5a5881ab`)

- **Promesse du sprint** : 28 formulations « premier workflow/agent en production » remplacées par « prototypé et testé » sur les pages services Make, n8n, automatisations, agents IA, support client et la LP système IA marketing, alignées sur `/tarifs` (la mise en production relève du pilote). Faux positifs laissés : durées de mise en production d'un pilote, cas du marché.

### Vague 8 en production, 15 octobre 2026 (PR #97, `663f5b98`)

- **Contenu** : guide `claude-managed-agents` (17 sources Anthropic lues le 15 octobre), tutoriel Make `tutoriel-make-tri-emails-claude`, guide `second-cerveau-entreprise`, section « Combien coûte une automatisation n8n livrée ? » dans `n8n-prix`. Title de `/services/integration-claude` : « Agence Claude, intégrateur Claude pour PME : audit gratuit » (requêtes « agence Claude », « intégrateur Claude »).
- **Maillage local** : liens contextuels vers `/implantations/bordeaux` (5 → 14 dans le contenu), Montpellier (6 → 9), Lyon (8 → 11).
- **Écarté** : réindexer `/secteurs/comptabilite`. Décision du 5 octobre (les neuf secteurs restent en 301) et cannibalisation avec `/cas-usages/finance-comptabilite`.
- **Revue** : liens `<a>` affichés en texte brut dans deux guides, sprint présenté comme mise en production (contraire à `/tarifs`), crédits Make et modèles Haiku inexacts. Tout corrigé avant fusion.
- **Preuves** : portes 37 sur 39, `astro check` 8 erreurs, balayage des 178 pages (356 en 200, 0 débordement, 0 jeton brut), E2E 72 passés, preview balayée, production vérifiée (trois guides en 200, title servi).

### Vague 7 en production, 15 octobre 2026 (PR #96, `444eb942`)

- **Navigation** : entrée « Formations » au menu principal ; `/conformite-ia` et `/technologies` dans les panneaux ; H1 auteur « Simon Beros, architecte de systèmes IA » ; rubrique « Réalisations Waimia » sur `/cas-usages`, séparée des études de cas du marché.
- **Contenu** : six guides sourcés (relevés le 15 octobre) qui comblent les absents de la stratégie : transparence des chatbots (article 50), checklist RGPD des agents IA, n8n auto-hébergé et RGPD, coût d'un projet IA, aides au financement, architecture d'un agent SAV. FAQ article 4 de `/conformite-ia` alignée sur le texte modifié.
- **Design et qualité** : formation Claude rythmée par niveau, comparatif Claude vs ChatGPT aéré, carte Balzeo illustrée par la boutique (13 grilles), ids de titre uniques (31 pages avaient des doublons), titres masqués des bandes de cartes tirés du kicker.
- **Défaut attrapé par la revue** : neuf cartes « Pour aller plus loin » portaient un libellé à la place du lien (404 relatives). Réparées, et `check:content-refs` refuse désormais tout `href` qui n'est pas une adresse (falsifiée).
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs (référence), balayage des 175 pages à deux tailles (0 débordement, 0 CTA hors écran), E2E 72 passés, preview balayée (26 mesures en 200), production vérifiée (six guides en 200).
- **Décisions pour Simon** : badges Meta Business Partner et Google Partner encore affichés (`src/data/eeat-proposals.ts`) alors que la stratégie les dit retirés faute de preuve ; mention « Activateur France Num » à confirmer.

### Vague 6 en production, 15 octobre 2026 (PR #95, `10da1e3f`)

- **Contenu** : cinq pages nouvelles sur des requêtes sans page dédiée : guides `quel-modele-claude-choisir`, `claude-gratuit` (usage commercial vérifié dans les conditions grand public d'Anthropic), `llm-rag-dirigeant`, `rpa-ou-agent-ia`, comparatif `mistral-vs-claude-pme`. Toutes reliées par le maillage interne et présentes au sitemap.
- **Maillage** : pied de page allégé (environ 26 liens), médiane des liens distincts par page 104 → 96, pages recevant 170 liens ou plus 98 → 90 (`mesure-liens.py` sur le build). Plan du site complet : les 169 URL du sitemap.
- **Performance** : feuilles CSS bloquantes 6 → 4 (petites feuilles intégrées au HTML).
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs (référence), E2E local 72 passés et 38 ignorés (GitHub Actions bloqué par la facturation, CI rejouée en local), production vérifiée (les cinq pages en 200).

### Vague 5 en production, 15 octobre 2026 (PR #94, `a4ba5c5a`)

Demande de Simon du 15 octobre : traiter tout le contenu, tout le dossier `waimia seo`, le SEO/GEO et le design. Cinq audits en lecture seule (écart stratégie, écart audits du 5 octobre et Semrush, CTR/GEO des 99 pages d'offre, CTR/GEO des 62 ressources, design par gabarit), puis trois lots.

- **Titles et descriptions** : 103 titles et 68 descriptions changés sur 110 pages (mesure sur le HTML buildé avant et après). La requête reste en tête, suivie d'une raison de cliquer lue dans la page. Villes différenciées par un fait local. Jeton `prix.pilote` à la place de 2 000 € HT en dur dans 9 descriptions. Effet à lire en W43 et W44 dans `gsc-performance.json`.
- **GEO** : chapôs qui répondent dans les 80 premiers mots (services clés, 10 guides et comparatifs) ; blog : date de mise à jour affichée et `<time>` ISO, FAQPage servi par `FaqAccordion` sur 5 billets.
- **Conversion** : libellé unique « Réserver l'audit gratuit » et lien `/contact?offer=audit-ia-pme&intent=audit` (le fragment `#offer=` n'atteignait ni le serveur ni la mesure ; il reste lu pour les anciens liens) ; CTA du héros dans le premier écran à 1366×768 ; calendrier remonté sur `/contact` mobile ; cas et panneau auteur sur `/audit-ia-pme` ; bande CTA dans les fiches cas, le hub ressources, les billets, `/agence`, la page auteur.
- **Lisibilité** : chapô des héros 11 → 15 px, contrastes, libellés 9 → 11 px, comparatif replié sur mobile.
- **Preuves** : portes 37 sur 39 (rouges connues), `astro check` 8 erreurs (référence), balayage des 176 pages à deux tailles en local et sur la preview (352 en 200, 0 débordement), revue Opus « ok », production vérifiée (9 liens `?offer=` sur l'accueil, 0 fragment, nouveau title de `/services/agents-ia`).
- **Hors dépôt, à Simon** : portrait, réglages Cal.com (description, semaine au lundi), demandes d'indexation, liens entrants.

### Mesure de la provenance des leads, 15 octobre 2026 (PR #92, branche `seo-v4/mesure`, non fusionnée)

Décision 2 du 14 octobre (mesure légère, maison, gratuite). Chaque alerte interne de contact et de lead magnet dit d'où vient la personne : source d'entrée (moteur, site, direct), page d'arrivée, page précédente et page du formulaire ; les journaux Vercel portent les mêmes champs (contact, lead magnet, newsletter) et Cal reçoit `metadata[landing]`, `metadata[entry]`, `metadata[prev]`. Ni cookie ni stockage : `window.wmLeadSource()` vit en mémoire pendant la visite ; politique de confidentialité v1.1. Défaut de production corrigé dans la même PR : un envoi de newsletter partait trois fois (3 POST mesurés sur waimia.com, 1 sur le build de la PR, au chargement et après navigation). Preuves locales : tests 18 sur 18 avec falsification, navigateur sur le build servi, `astro check` à 8 erreurs (référence), portes 36 vertes et 2 rouges connues. Non vérifié : l'enregistrement des `metadata` par Cal (exige une réservation réelle).

**Décisions de la nuit (Claude, mandat de Simon)** : pas de réécriture de title ni de description cette nuit, les pages candidates ayant déjà changé depuis le 8 octobre (effet à lire en W43 et W44) ; pas de lot de maillage (pages candidates déjà liées de 10 à 58 fois dans le corps des pages) ; pas d'embed Cal sur `/audit-ia-pme` (la page n'embarque aucune île React ; l'embed y ajouterait le client React et le script Cal sans preuve que l'étape `/contact` coûte des leads, à revoir avec la provenance mesurée) ; pas de création de guide (conditions de la stratégie non remplies).

### Décisions de Simon du 14 octobre 2026 · audit global SEO, GEO et conversion

Réponses de Simon aux dix questions de l'audit global du 14 octobre 2026 (9 dimensions, 117 constats retenus après relecture contradictoire). Elles sont acquises : ne pas les redemander.

1. **Bannière cookies** : la réduire à une barre compacte sur mobile, en gardant son style (couleurs, police, bordure). Pas de suppression.
2. **Mesure de conversion** : ajouter une mesure légère, open source ou maison (script et tableau de bord), sans outil payant. Cal reçoit très peu de réservations : l'effort va au référencement naturel, au GEO et à un contenu qui parle vraiment aux lecteurs, sans texte générique.
3. **Promesse de l'audit gratuit** : aligner partout sur `/audit-ia-pme`. Ajouter une partie site web et logiciel : Waimia fait aussi du développement web (sites et logiciels sur mesure). Sur les pages du sujet site web, recentrer les liens internes sur ce sujet au lieu de l'automatisation ou de l'IA, et séparer proprement les clusters. Créer les pages qui manquent, sur preuve de demande.
4. **`/services/seo-geo-contenu` et `/services/referencement-ia`** : garder deux pages différenciées, puis poser les liens « agence GEO » vers `/services/referencement-ia`.
5. **Pages créées les 12 et 13 octobre sans requête suivie** (5 villes, 6 secteurs) : les garder indexées. Point de contrôle le 11 novembre 2026 : sans impression à cette date dans `gsc-performance.json`, passer en `seo.noindex`.
6. **Siège** : Bordeaux, à uniformiser sur tout le site.
7. **Offre no code et Airtable** : aucune offre tant qu'aucune mission réelle n'est documentée ; le title de `/services/automatisations` se centre sur l'automatisation des processus métier.
8. **Description de l'événement Cal `simonberos/audit`** : elle existe ; proposer à Simon un texte de remplacement seulement si elle peut être améliorée.
9. **Mise en production** : validée.
10. **Italiques** : alléger l'accueil et `/manifesto` (paragraphes seulement, les accents serif des titres restent).

### Vague 1 en production le 14 octobre 2026 (PR #88, merge `b25b6b62`)

Neuf lots, intégrés puis prouvés sur la preview Vercel, puis en production : 11 marqueurs de contenu présents sur waimia.com, parcours Playwright à 390×844 et à 1440×900.

- **Mesures, avant puis après** :
  - bannière cookies en mobile : 141 px, puis 56 px ;
  - CTA du héros au-dessus de la bannière : 3 pages sur 11, puis 10 sur 11 ;
  - titres de plus de 60 caractères : 10, puis 0 ;
  - paragraphes longs : 33, puis 24 ;
  - contenu propre à la page de Toulouse : 16 %, puis 63 % ; de Lyon : 23 %, puis 61 %.
- **Exception sur `/tarifs` mobile.** Le fil d'Ariane ajouté sort de l'écran le CTA de l'étape 1, dont le bas passe à 907 px pour un écran de 844. En échange, le kicker n'est plus caché sous le header fixe, et le CTA « Audit gratuit » du header reste visible.
- **Chiffres retirés de la page sources, faute de source primaire lisible** : McKinsey (10 à 25 %), Clickzou, Batiweb, Warmly et CNB. Les six sources gardées ont été relues le 14 octobre.
- **Moteurs.** IndexNow et l'Indexing API sont laissés à la routine du dimanche, qui évite les doubles envois. Les demandes d'indexation manuelles dans Search Console restent à faire par Simon.
- **Siège.** Le registre officiel (recherche-entreprises, lu le 14 octobre) donne toujours l'établissement de Montpellier. « Basé à Bordeaux » est uniformisé, mais aucun identifiant légal bordelais (RCS, adresse, tribunaux) n'est écrit sans pièce.

### Vague 2 du 14 octobre 2026 · stratégie tirée des audits Semrush (branche `seo/vague2-1014`)

**En production le 14 octobre 2026 (PR #89, merge `40715069`).** Statut Vercel du commit de fusion : succès ; marqueur `id="site-web-logiciel"` présent sur waimia.com 60 s après la fusion. Sur la production : 21 contrôles de la vague 2 sur 21 (le même script donnait 16 KO sur la production précédente), 11 marqueurs de la vague 1 sur 11, CTA des héros à 390 sur 10 pages sur 11 (exception `/tarifs` inchangée), aucun débordement. Aucun envoi IndexNow ni demande Search Console manuels : routine du dimanche.

Source : lecture intégrale des 31 fichiers du dossier Semrush (PDF, xlsx, csv des quatre concurrents, audit du site, données Waimia), confrontée au dépôt ; stratégie en 39 lots, plan de design en 19 changements. Vingt lots écrits en worktrees séparés, chacun revu par Opus, puis intégrés ; le lot `catalogue` (composants partagés) part dans une PR distincte.

- **Promesse de l'audit** : une source unique, `AUDIT_PROMISE` (`src/data/conversion.ts`), avec une variante site web et logiciel liée à `/audit-ia-pme#site-web-logiciel`. « Trois automatisations rentables » : 175 pages, puis 0. Scan de la promesse sur `src/` : 834 signalements, puis 558, aucun fichier en hausse ; dans le HTML servi, aucune formule interdite ne décrit l'audit.
- **Clusters (décision 3)** : silos E-E-A-T `web` et `apps`, thème `web` du maillage, catégorie `web` sur 9 pages de site ; `/services/site-web-ia` ne lie plus l'automatisation (4 liens, puis 0). Nouveau guide `/ressources/guides/refonte-site-internet` (refonte site internet, 3 600, KD 28).
- **GEO (décision 4)** : `seo-geo-contenu` et `referencement-ia` restent deux pages ; libellé « Agence GEO : être cité par les IA » au méga-menu, au plan du site et au maillage ; anneau acquisition réordonné vers `referencement-ia`.
- **Technique** : `WebApplication` retiré des 5 outils (sans note ni avis, erreur Semrush), `Article` à la place ; `check:jsonld` suit ce choix. Accueil au sitemap avec sa barre finale, comme son canonical ; `check:sitemap` l'accepte. 301 de l'article Google Ads vs Meta Ads. Badges du panneau E-E-A-T dimensionnés (46 sans dimensions, puis 0). Schémas de pages régénérés : `check:page-schemas` passe de 5 erreurs à 0.
- **Plafond des méta descriptions** : 160 caractères (portes `check:head` et `check:seo`), pas 175 ; sept descriptions raccourcies, leçon d'`AGENTS.md` corrigée.
- **Contenu** : villes, formations, guides Claude, pilier IA, ressources et pages automatisation réécrits contre le texte générique ; aucun fait, client ni chiffre ajouté sans source.
- **Gelé, en attente de Simon** : visio ou sur site, siège légal, badges partenaires, prix « pilote » et « déploiement », Diag Data IA, page « agence web Montpellier », mesure de conversion.
- **Revue visuelle D1** (build servi, 390×844 et 1440×900) : espace avant « En savoir plus sur l'audit », panneau E-E-A-T mobile sous 1 800 px (environ 2 300 avant), métrique du guide de coût contenue, grille de cas de `/services/shopify` : Balzeo et Amploi, deux cas web, au lieu de Brow-X (cas de SAV, hors cluster) et Balzeo. Liens retirés des réponses de FAQ rendues en texte échappé (6 pages, 0 restante dans le build).
- **Revue Opus avant fusion** : aucun bloquant, les 15 bloquants de la phase 1 résolus. `check:jsonld` interdit désormais `WebApplication` et `SoftwareApplication` ; `check:sitemap` compare le canonical à l'identique et n'accepte l'accueil qu'avec sa barre. Les trois mutations correspondantes font rougir les portes.
- **Lot catalogue (PR #90, merge `393213f1`, en production le 15 octobre 2026)** : bande CTA finale à 414 à 548 px au lieu de 731 à 868 (390 et 1440, 8 pages) ; maillage « Sur le même sujet » une seule fois, avant la bande CTA ; « § 01 » retiré des blocs de prose à un seul H2 ; lede seul du héros en registre de lecture (CTA du héros toujours dans le premier écran : 638 px au plus à 390, 837 à 1440) ; TechWhenDual sur `.wrap-wide`. En production : statut Vercel du commit de fusion en succès, marqueur `hsm-lede--solo` présent sur waimia.com 80 s après la fusion, mêmes mesures que sur la preview.
- **Preuves locales (PR #89)** : portes `check:*` vertes sauf `semantic` et `hover-reflow` (hors CI, fichiers non touchés) ; `astro check` à 8 erreurs comme `main` ; Playwright 71 réussis ; marqueurs de la vague 1 : 11 sur 11 ; CTA des héros à 390 : 10 pages sur 11, comme en vague 1.

### Vague 3 du 15 octobre 2026 · restes mesurés après la vague 2 (branche `seo-v3/integration`)

**En production le 15 octobre 2026 (PR #91, merge `233a9426`)**, sur ordre de Simon (« met en prod ce qu'on a pour le moment »). Avant la fusion : Build (astro), E2E Playwright, SEO, tests de la routine et balayage GF-1 de la preview verts ; revue Opus des commits du parent « fusionnable », sans bloquant (ses mineurs sont repris dans la phase C). Après : statut Vercel du commit de fusion « success » ; marqueurs absents de la production avant la fusion, présents à 00:12 UTC (H1 `Ressources <i>IA</i> pour PME` sur `/ressources/outils`, « en six domaines » dans `/llms.txt`) ; les 35 pages touchées, les trois vues de ressources et `/llms.txt` en 200, aucun `{{prix` servi.

**Décisions de Simon du 15 octobre 2026**, acquises :
- Siège : « ok pour le siège, pas de RCS sans pièce », puis « c mon adresse a bdx c juste ». L'adresse d'activité de Bordeaux reste partout où elle est ; mentions légales inchangées tant qu'aucune pièce ne montre un siège bordelais.
- Ressources : « on voulait que les hub outils et comparatif disparaisse car se sont déjà des liens filtrables dans ressource et les liens affiche le bon filtre », puis « c les hub mais les filtres et les liens généré par les filtres doivent rester ». Appliqué : `/ressources/outils` et `/ressources/comparatifs` restent les URL des pastilles de filtre, sans 301 ; leur tête propre (H1, chapô, fil d'Ariane) est retirée, elles reprennent celle de `/ressources`. Title, description et indexation inchangés. `/ressources/guides` (non cité) garde sa tête.

**Six lots en worktrees, revus par Opus, puis intégrés** (phase A : navigation et hubs, services, ressources ; phase B : services, villes et GEO, promesse et clusters) :
- Méga-menu : « Commercial et visibilité » scindé en « Outils commerciaux » et « Site web, SEO et marque » ; `/llms.txt` tire le nombre de domaines du menu (six, au lieu de « cinq » écrit en dur).
- Services : formules creuses et chiffres sans source retirés, voix en « on », cartes de cas réalignées sur les fiches (rétention Balzeo écrite « de 32 % à 43 % »), FAQ « basés où » propres à chaque page, H1 de `/services` et `/implantations` sur leur requête.
- Faits Claude relus le 15 octobre sur la page tarifs d'Anthropic : Max dès 100 $ ; Claude Docs, Slides et Design inclus dans toutes les offres, Free comprise ; chartes de marque de Claude Design en bêta sur les offres payantes. Formation Claude et intégration Claude alignées.
- Villes et GEO : Lyon et Toulouse sur leurs requêtes, description de `/services/referencement-ia` sur « agence GEO et référencement IA », lien « agence GEO » depuis `/services/site-web-ia`.
- Cluster web : promesse de l'audit en variante site web sur la démonstration, redite corps et FAQ retirée de `/services/shopify`, source primaire Palantir pour l'article forward deployed engineer.

**Preuves locales** (build servi, 35 pages touchées) : 35 en 200 ; à 390×844 et 1440×900, aucun débordement horizontal et le CTA du héros dans le premier écran (783 px au plus à 390, 863 à 1440) ; aucun `{{prix` ni `<i>` échappé dans les 176 pages ; vues outils et comparatifs : H1 de `/ressources`, pastille active, seules les cartes du type, filtre de thème fonctionnel, aucune entrée de redirection dans `.vercel/output/config.json`, toujours au sitemap. Portes `check:*` vertes sauf `semantic` et `hover-reflow` (dette connue, fichiers non touchés) ; `astro check` à 8 erreurs comme `main`.

**Reste pour la phase C** (PR distincte) : chapôs de plus de 40 mots sur 35 pages de service, visuels de héros par sujet, alternance des fonds des villes, jeton de prix du sprint de cadrage, typographie des titres.

**Phase C (branche `seo-v3c/integration`, PR #93, non fusionnée)**. Quatre lots en worktrees, chacun revu par Opus, puis les mineurs des revues.
- **Chapôs** des 35 pages services : 40 mots au plus, deux phrases, intitulé recherché gardé.
- **Villes** : aucune section voisine au même fond sur les 10 villes, bloc Sources compris (fond calculé dans `[...slug].astro`) ; épingle au lieu du réseau générique sur 5 villes.
- **Héros** : un visuel par sujet sur 20 pages.
- **Ressources** :
  - chapôs directs ;
  - phrase MCP unique : « Anthropic examine les connecteurs de son annuaire, mais n'audite pas la sécurité des serveurs MCP » ;
  - ancres réécrites pour décrire leur cible.
- **Prix** : jeton `prix.sprint` (source `SCOPING_SPRINT_EUR`) à la place de 535 « 999 € » écrits en dur dans 78 fichiers. Le texte visible des 177 pages est identique avant et après, hors notes de prix allégées.
- **Titres** : insécable avant `? ! : ;`, imposée par la porte `check:title-typo`.
- **Dates** : `gen-lastmod` saute les commits marqués `Lastmod: ignore`. Instantané régénéré : `/outils-hub` retirée, 58 routes datées.
- **Débordement corrigé** sur le guide financement OPCO, présent en production : la variante `editorial` fige la première colonne sans retour à la ligne, et la page débordait de 872 px à 1440. Le tableau des sources passe en variante `default`.
- **Question ouverte à Simon** : le fil d'Ariane JSON-LD des vues `/ressources`, outils et comparatifs n'a pas de fil visible. La revue de #91 demandait de le retirer ; il est laissé en place, en attente de sa décision : le retirer, ou afficher un fil d'Ariane visible.

### 2026-W42 (session du 12 octobre 2026, collecte du 11 octobre 2026)

**Données** : collecte du 11 octobre 2026 à 22:55 UTC (`generatedAt`), fraîche oui (`freshness.mjs` : « FRAÎCHE · collecte complète de 6.8 h ») · Search Console configuré oui · étapes en erreur : aucune (8 étapes `ok`). Les données de performance s'arrêtent au 8 octobre 2026. Flux : 0 en erreur. Concurrents : 14 URL nouvelles, toutes chez claudin.tech.

**KPI** (28 jours, du 11 septembre au 8 octobre 2026, contre les 28 précédents) : clics 5 (-1) · impressions 1 007 (+921) · CTR 0,50 % · position 28,2 (-7,4, gain) · pages indexées 80 sur 120. Sur 7 jours (2 au 8 octobre) : clics 3 (+1) · impressions 765 (+587) · position 29,6 (+4,1). Indexation : 23 pages nouvellement indexées, 1 nouvellement non indexée (`/blog/tableau-de-bord-pme-quelles-donnees-suivre`, « explorée, actuellement non indexée »), 16 vues pour la première fois. Aucune page n'atteint `weeksNotIndexed` > 3 (maximum : 1) : la règle 4.1-3 ne se déclenche pas. Indexing API : 54 notifications envoyées le 11 octobre (16 ajoutées, 38 modifiées, 0 erreur, quota 54 sur 200), des notifications et pas des pages indexées.

**Brave** : 93 URL dans la file du 12 octobre 2026 à 06:09 UTC (`brave-queue.mjs --from-sitemap --days=8`), 40 à soumettre par la tâche Brave, 53 à reprendre (`--offset=40`). Rien n'a été soumis par cette session.

**Bilan des actions précédentes** (toutes mises en production les 5 et 6 octobre 2026 ; une seule collecte complète archivée depuis, celle du 11 octobre : verdict « trop tôt » partout, comme l'indiquaient les lignes « À mesurer », à juger à partir de 2026-W44)
- 2026-W41, `/ressources/comparatifs/claude-vs-chatgpt-pme`, requête « claude vs chatgpt » : trop tôt. Avant (collecte du 4 octobre) : page en position 13,4, 21 impressions. Maintenant : page en position 32, 150 impressions ; requête « claude vs chatgpt » en position 15,2 (6 impressions). Indexée.
- 2026-W41, `/ressources/guides/n8n-prix`, requête « n8n prix » : trop tôt. Avant : aucune page. Maintenant : page indexée, 4 impressions en position 13,8 ; la requête « n8n prix » n'a aucune impression.
- 2026-W41, `/ressources/guides/agent-ia-definition`, requête « agents ia c'est quoi » : trop tôt. Avant : aucune impression. Maintenant : page indexée, 22 impressions en position 83,2 ; la requête exacte n'a aucune impression.
- 2026-W41, `/ressources/guides/devis-automatise`, requête « devis automatisé » : trop tôt. Avant : aucune impression. Maintenant : aucune impression, page « détectée, actuellement non indexée » (`weeksNotIndexed` 0).
- 2026-W41, `/ressources/guides/claude-cowork`, requête « claude cowork prix » : trop tôt. Valeur de départ relevée : aucune impression sur la requête ; page indexée, 9 impressions en position 22,9.

**Actions de la semaine** (PR #84) : une création, deux révisions.

1. Création de `/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche` (entrée `w45-crm-sur-mesure`, planifiée en 2026-W42).
   - Pourquoi : entrée du calendrier ; « crm sur mesure » et « automatisation crm » visaient la même page service pour deux intentions.
   - Recherche en ligne : requêtes « crm sur mesure », « crm sur mesure ou crm du marché pme prix », « développer son propre crm vs hubspot salesforce avantages inconvénients », plus les pages CRM des concurrents. Pages lues le 12 octobre 2026 : <https://www.leblogdudirigeant.com/crm-standard-sur-mesure-comment-trancher/>, <https://www.appvizer.fr/magazine/relation-client/customer-relationship-management-crm/crm-sur-mesure>, <https://www.hostinger.com/ca-fr/horizons/custom-crm>, <https://www.codeur.com/pages/prix-crm>, <https://www.raftlabs.com/blog/cost-to-build-app-like-hubspot>, <https://www.lafabriquedunet.fr/logiciels/productivite/crm/crm-tpe-pme>, <https://independant.io/prix-crm/>, <https://sparkyflow.com/agence/agence-crm/> (concurrent). Non lue : la page d'innowise.com (introuvable au moment de la lecture). Ce qu'elles couvrent : définitions, avantages du sur mesure, fourchettes de prix larges. Ce qui manque : la troisième voie (CRM du marché et sur mesure autour), un calcul sur trois ans avec prix datés, les cas où le calcul s'inverse, « ne le faites pas si ». Questions récurrentes : prix d'un CRM sur mesure, propriété du code, no-code ou développement, délai.
   - Ce que la page apporte : trois options définies, tableau à 8 critères, prix publics datés, exemple illustratif sur trois ans, verdict en 7 situations, test en 5 questions, retour d'expérience Amploi (HubSpot gardé, demandes du site routées par l'API Forms), FAQ de 6 questions, illustration dessinée pour la page (moteur SVG du skill `waimia-illustration`).
   - Sources primaires : <https://www.pipedrive.com/fr/pricing>, <https://www.hubspot.com/pricing/sales/starter> (vérifiées le 12 octobre 2026). Non écrit : le prix de l'offre HubSpot Starter (promotion affichée, montant ambigu).
   - `docs/seo/keywords.json` : la cible de « crm sur mesure » passe de `/services/crm-scoring-routing` au comparatif. La page service garde « CRM sur mesure » dans son title : risque de cannibalisation à surveiller.
   - À mesurer : `/ressources/comparatifs/crm-sur-mesure-vs-crm-du-marche`, requête « crm sur mesure » : aucune impression sur 28 jours au 11 octobre 2026. Attendu : page indexée, premières impressions, `onTarget` vrai. À juger à partir de 2026-W45.

2. Révision de `/ressources/guides/combien-coute-un-agent-ia-pme` (entrée `w42-revision-cout-agent-ia-haiku-5-5`, ajoutée cette semaine).
   - Pourquoi : règle 4.1-4, contenu daté par une actualité. Trois entrées de flux de sources différentes (Le Monde Informatique le 9 octobre, Blog du Modérateur le 8 octobre, Make Community le 10 octobre) annoncent Claude Haiku 5.5. La page chiffrait le modèle avec Claude Haiku 4.5 (1 $ / 5 $) ; Haiku 5.5 coûte 0,10 $ / 0,50 $. Cette règle passe devant les deux révisions planifiées en 2026-W42, replanifiées en 2026-W43.
   - Recherche en ligne : « combien coûte un agent IA PME », « prix agent ia entreprise coût mensuel API », pages concurrentes sur le coût des agents. Pages lues le 12 octobre 2026 : <https://www.the-intelligence-academy.com/blog/cout-agent-ia-pme-budget-roi>, <https://www.studeria.fr/articles-de-blog/cout-agent-ia-production-pme-2026> (7 octobre, cite encore Haiku 4.5 comme option économique), <https://kolonell.com/fr/blog/agent-ia-service-client-pme-cout-integration-2026>, <https://www.mission-open-data.fr/budget-ia-pme-2026-guide-complet/>, <https://omidsaffari.com/fr/blog/agent-ia-prix-cout-mensuel>, <https://www.koino.fr/articles/employes-ia-pme-comparatif-limova-delos-alternatives-2026>, <https://www.limova.ai/tarifs/> (concurrent). Aucune ne parle de Haiku 5.5, de l'écart de découpage en jetons ni des crédits API des offres Team.
   - Ce qui a changé : chiffres clés, exemple de calcul (0,59 $ contre 4,50 $ pour 1 000 e-mails, avec la correction d'environ 30 % de jetons en plus à partir des modèles 4.7), paragraphe « ce que ça change pour une PME », crédits API mensuels des offres Team et Max (20 $ par siège Standard, 100 $ par siège Premium, plafond 500 $, ce qu'ils couvrent ou non), tableau des trois budgets, deux réponses de FAQ, badge et date de mise à jour, sources, phrase sur la mécanique d'orchestration (n8n contre Make) corrigée après relecture, `updatedAt` au 12 octobre.
   - Sources primaires : <https://www.anthropic.com/claude-haiku-5-5> (annonce du 7 octobre 2026), <https://platform.claude.com/docs/en/about-claude/pricing>, <https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans> (vérifiées le 12 octobre 2026). Non relues ce jour, donc gardées avec leur date du 6 octobre dans la page : <https://claude.com/pricing>, n8n, Make, OVHcloud.
   - À mesurer : `/ressources/guides/combien-coute-un-agent-ia-pme` : absente de `byPage` sur 28 jours au 11 octobre 2026, indexée à cette collecte. Attendu : premières impressions sur « combien coûte un agent ia ». À juger à partir de 2026-W45.

3. Révision de `/ressources/comparatifs/claude-platform-vs-openai-platform` (entrée `w42-revision-claude-platform-vs-openai-haiku-5-5`, ajoutée cette semaine).
   - Pourquoi : règle 4.1-4. La page affirmait que GPT-6 Luna coûte dix fois moins cher que Claude Haiku 4.5 : faux depuis le 7 octobre 2026, Haiku 5.5 étant au même prix public que GPT-6 Luna.
   - Recherche en ligne : « API Claude ou API OpenAI comparatif prix entreprise », « Claude Haiku 5.5 vs GPT-6 Luna ». Pages lues le 12 octobre 2026 : <https://tensoria.fr/blog/api-claude-openai-mistral-integrer-ia-logiciel>, <https://www.kunalganglani.com/blog/claude-api-vs-openai-api-2026>, <https://costbench.com/compare/openai-vs-claude/>, <https://enterprisedna.co/resources/blog/claude-api-vs-chatgpt-api>, <https://redresscompliance.com/anthropic-claude-pricing-2026.html>. Toutes citent encore Haiku 4.5 ou des modèles plus anciens.
   - Ce qui a changé : tableau (gamme et petit modèle), section prix (petits modèles au même prix, seuils de contexte long différents, découpage en tokens propre à chaque éditeur, baisse du prix des lectures en cache de Sonnet 5.5), réponse courte, verdict « gros volumes », FAQ prix et FAQ Europe (10 % de plus sur Bedrock comme sur Vertex, vérifié sur la grille d'Anthropic), sources, dates, `updatedAt` au 12 octobre.
   - Sources primaires : <https://www.anthropic.com/claude-haiku-5-5>, <https://platform.claude.com/docs/en/about-claude/pricing>, <https://developers.openai.com/api/docs/pricing> (vérifiées le 12 octobre 2026). Les autres sources de la page n'ont pas été relues et gardent leur date.
   - À mesurer : `/ressources/comparatifs/claude-platform-vs-openai-platform` : 6 impressions, position 22,5 sur 28 jours au 11 octobre 2026. Attendu : plus de 30 impressions sur 28 jours. À juger à partir de 2026-W45.

**Relecture sceptique** : un sous-agent a relu les trois pages avec la grille de la section 6. Verdict « oui » pour les trois (la page apprend quelque chose que les premiers résultats ne disent pas), avec des corrections faites dans la PR : CRM (calcul Pipedrive sur l'offre Premium, comparable à HubSpot Professional ; exemple sur trois ans côté sur mesure ; cas des utilisateurs occasionnels rendu conditionnel ; délais et règle du test alignés ; affirmations sans preuve retirées), agent IA (badge et date, crédit Team expliqué, phrase contradictoire sur l'orchestration), Platform (exemple à 11 $ « à nombre de tokens égal », FAQ « en contexte court », cache limité à la lecture). Le détail est dans la PR.

**Calendrier** : livré cette semaine : `w45-crm-sur-mesure` (création), deux révisions ajoutées par la règle 4.1-4. Mise à jour des statuts : 23 entrées « en cours » livrées par les PR #76, #78 et #80 (fusionnées les 6 octobre) passent à « publié ». Replanifiées : `w42-revision-automatisation-n8n` et `w42-revision-calculateur-roi-ia` en 2026-W43. Ajoutées : quatre révisions « Haiku 5.5 » (`agent-ia-definition` en W43, `n8n-prix` en W44, `trier-emails-entrant-claude-n8n` en W48, `roi-automatisation` en W49) ; quatre créations (`w44-guide-application-metier`, origine : quatre requêtes de `keywords.json` dont deux de priorité 1 sur une page de vente ; `w45-guide-claude-tpe`, origine : huit variantes de « claude tpe » réparties sur quatre pages ; `w47-guide-claude-finance-pme`, origine : « claude finance » sur un guide général et six pages finance nouvelles chez claudin.tech, deux lues ; `w48-article-agent-ia-entreprise-exemples`, origine : « agent ia entreprise » de priorité 1 sur une page de vente, `onTarget` faux sur « agent ia »). Prévu la semaine suivante (2026-W43) : création `w47-freelance-cabinet-agence-ia`, révisions `automatisation-n8n`, `calculateur-roi-ia`, `agent-ia-definition`. 6 semaines d'avance (`check-calendar.mjs`), de 2026-W43 à 2026-W48. Aucune entrée abandonnée. Aucune entrée « mesurée » : la première collecte qui le permet est celle de 2026-W44.

**Brouillon LinkedIn** : `docs/seo/posts/2026-W42.md` (une section, à relire et à publier par Simon).

**Non retenu cette semaine**
- Réviser `/ressources/guides/claude-pme`, en position 8 à 20 sur plusieurs requêtes (`strikingDistance`) et en cannibalisation sur « claude pme » avec deux autres pages : révisée les 6 octobre (PR #76 et #79), trop tôt pour la retoucher sans mesure.
- `lowCtrPages` : toutes les pages listées sont en position 17 à 43 avec 0 clic ; le CTR attendu à ces positions (0,4 % à 1 %) donne moins d'un clic. Pas de signal exploitable.
- `/implantations/montpellier`, 144 impressions sur « agence airtable montpellier » et « agence no code montpellier » : hors positionnement, comme noté en W41.
- Mettre à jour le PDF du guide d'achat Claude, que la page « combien coûte un agent IA » propose et qui cite des prix du 5 octobre : hors périmètre d'une PR de contenu JSON, signalé à Simon.

**Pour Simon**
- Le PDF proposé en téléchargement sur la page « combien coûte un agent IA » (prix Anthropic relevés le 5 octobre 2026) est antérieur à Claude Haiku 5.5 et aux crédits API des offres Team : à régénérer.
- `/services/crm-scoring-routing` garde « CRM sur mesure » dans son title alors que le mot-clé vise maintenant le comparatif : à trancher (retirer du title, ou garder si l'intention d'achat d'un CRM développé doit aller sur la page service).
- Idées en attente de ta décision depuis le 5 octobre : `idee-agence-ia-toulouse`, `idee-formation-claude-code`, `idee-logiciel-seo-ia-pme`.
- Les mentions de Claude Haiku 4.5 restent sur quatre pages planifiées au calendrier (W43 à W49) ; si tu préfères tout corriger d'un coup, une PR dédiée le permet.

### 2026-W42, lot 2 (demande de Simon du 12 octobre 2026, PR #85)

Demande de Simon après la PR #84 : régénérer et actualiser avec Claude Haiku 5.5 les pages et ressources concernées, créer la page Toulouse, la formation « Développer son projet avec Claude Code » et l'article « Logiciel SEO IA pour PME ». Les trois idées en attente depuis le 5 octobre sont donc tranchées par Simon.

1. Révisions Claude Haiku 5.5 (prix relus le 12 octobre 2026 sur platform.claude.com/docs/en/about-claude/pricing : 0,10 $ / 0,50 $ sous 100 000 jetons) : `agent-ia-definition`, `n8n-prix`, `roi-automatisation`, `trier-emails-entrant-claude-n8n`, `agent-ia-vs-automatisation-classique-2026`. Exemples recalculés, réserve de 30 % de jetons ajoutée.
2. PDF `guide-achat-claude-pme` régénéré (14 pages) : encadré sur les crédits API des plans Max et Team (support.claude.com/en/articles/17154008, lu le 12 octobre 2026).
3. Créations : `/implantations/toulouse` (modèle Lyon, rien d'inventé), `/formations/claude-code` (outils relus aux sources des éditeurs), `/blog/logiciel-seo-ia-pme` (prix des éditeurs relevés le 12 octobre 2026, sauf Semrush : page d'aide de février 2026).
4. Relecture sceptique par sous-agent : corrections appliquées (voir PR). Non vérifié : page tarifs Semrush actuelle, certification Qualiopi d'Akigora, disponibilité des dots en France.
5. Non modifié, à décider : mentions « Haiku 4.5 » dans les démos de sections, les variantes de page `content-marketing-intelligent`, `src/pages/[...slug].astro` et `_expertise-claude.astro` ; liste des villes dans le menu et la page agence.

### 2026-W41 · session d'audit du 5 octobre 2026 (hors cadence, demandée par Simon)

**Contexte.** Session lancée à la main par Simon après un audit SEO complet du site en ligne (88 URL du sitemap lues, concurrents, Search Console consulté dans son navigateur). Elle s'ajoute à la session W41 du matin (PR #69) : c'est une seconde PR la même semaine, avec trois créations au lieu du plafond de deux, sur demande explicite. Les trois créations sont avancées depuis le calendrier (W42, W43, W44).

**Données.** Search Console, interface, lu le 5 octobre 2026 : rapport Pages à jour au 21 septembre 2026 seulement (9 pages indexées, 87 non indexées dont 81 « détectée, actuellement non indexée ») ; il est antérieur à la refonte et à la collecte du 4 octobre (38 indexées sur 73 par inspection d'URL), qui reste la référence. Performances sur 3 mois (3 juillet au 2 octobre) : 15 clics, 468 impressions, position moyenne 26,8. Liens externes : 1 (cal.com). Sitemap `sitemap-index.xml` lu le 5 octobre, 92 pages découvertes. Core Web Vitals : non mesurés (analyse PageSpeed non aboutie).

**Constats de l'audit qui ont donné lieu à une action**
- Fichiers statiques servis avec `Cache-Control: public, max-age=0, must-revalidate`, y compris les fichiers hachés de `/_astro/` (relevé sur la production le 5 octobre).
- Hubs `/ressources/guides` et `/ressources/comparatifs` en noindex alors qu'ils listent 6 et 4 pages complètes, et que les fils d'Ariane et le balisage BreadcrumbList des pages filles pointent vers eux.
- `/blog/brain-circuit` (noindex) listé sur le hub blog.
- Description du hub blog sans mot-clé ; title « guide pillar » ; 6 titles de plus de 60 caractères.
- Requêtes sans page : « n8n prix », « agents ia c'est quoi », et « devis automatisé » portée par une page service.

**Actions** (PR #72, branche `feat/seo-audit-2026-10-05`)

1. Création de `/ressources/guides/n8n-prix` (entrée `w42-n8n-prix`).
   - Recherche en ligne : « n8n prix », « n8n tarif auto-hébergé coût serveur PME ». Pages lues le 5 octobre 2026 : <https://tensoria.fr/blog/combien-coute-n8n-production>, <https://nordflux.de/fr/ressources/n8n-cout-licence>, <https://agence-scroll.com/fr/blog/price-automation-n8n>, <https://latenode.com/fr/blog/tarifs-n8n-2025-comparaison-complete-des-offres-et-analyse-des-couts-caches-face-aux-alternatives>, <https://sliplane.io/blog/n8n-pricing>. Elles donnent toutes la grille et des coûts de serveur ; aucune ne donne la durée maximale d'une exécution par offre, l'absence de partage en Community Edition, ce que la licence autorise à un prestataire, ni les cas où n8n n'est pas le bon choix.
   - Sources primaires (vérifiées le 5 octobre 2026) : <https://n8n.io/pricing/>, <https://docs.n8n.io/choose-how-to-use-n8n>, <https://docs.n8n.io/deploy/host-n8n/community-edition-features>, <https://docs.n8n.io/n8n-community-license/community-license/license-faq>, <https://www.ovhcloud.com/fr/vps/>, <https://platform.claude.com/docs/en/about-claude/pricing>.
   - Non vérifié : le prix en facturation mensuelle (la page n'affiche en clair que « Save 17% ») : non écrit dans la page. Le prix de dépassement des offres Starter et Pro n'est pas publié : la page le dit.
   - À mesurer : `/ressources/guides/n8n-prix`, requête « n8n prix » : aucune page, aucune impression au 5 octobre. Attendu : page indexée et premières impressions. À juger à partir de 2026-W44.

2. Création de `/ressources/guides/agent-ia-definition` (entrée `w44-agents-ia-definition`).
   - Recherche en ligne : « agent IA c'est quoi définition », « agents IA c'est quoi différence chatbot assistant automatisation entreprise ». Pages lues le 5 octobre 2026 : <https://www.salesforce.com/fr-ca/agentforce/ai-agents/>, <https://www.hubspot.fr/products/artificial-intelligence/breeze-ai-agents/what-is>, <https://larevueia.fr/agent-ia/>, <https://quelllm.fr/guide/agent-ia-c-est-quoi-definition-exemples>, <https://www.marketing-management.io/blog/agent-ia>. Aucune ne chiffre un coût d'usage ni ne donne de questions à poser à un vendeur.
   - Sources primaires (vérifiées le 5 octobre 2026) : <https://www.anthropic.com/engineering/building-effective-agents> (19 décembre 2024), <https://developers.openai.com/api/docs/guides/agents>, <https://platform.claude.com/docs/en/about-claude/pricing>.
   - Relecture sceptique : première version jugée « non » (rien que les premiers résultats ne disent). Ajoutés en réponse : cinq questions à poser à un vendeur, un exemple de coût d'usage chiffré (2,50 dollars contre 30 dollars par mois), un tableau de cinq pannes avec leur garde-fou. Le projet Les Carnets de Montpellier est désormais présenté comme proche d'un assistant, pas comme un agent.
   - À mesurer : `/ressources/guides/agent-ia-definition`, requête « agents ia c'est quoi » : cible déplacée depuis `/blog/agent-ia-vs-automatisation-classique-2026`, aucune impression au 5 octobre. Attendu : page indexée et premières impressions. À juger à partir de 2026-W44.

3. Création de `/ressources/guides/devis-automatise` (entrée `w43-devis-automatise`).
   - Recherche en ligne : « devis automatisé », « automatiser ses devis PME comment faire relance devis automatique ». Pages lues le 5 octobre 2026 : <https://abby.fr/guide/facturation/devis-automatise>, <https://www.webandseo.fr/devis-automatise/>, <https://estimaker.io/fr/blog/automatisation-des-devis>, <https://tulipemedia.com/automatiser-devis/>, <https://sparkyflow.com/generation-de-devis-automatise/>. Pages d'éditeurs pour l'essentiel : aucune ne dit quand ne pas automatiser, ni ce qui peut rater.
   - Source primaire (vérifiée le 5 octobre 2026) : <https://entreprendre.service-public.gouv.fr/vosdroits/F31144>.
   - Non traité : la facturation électronique obligatoire, faute de source relue pendant la session.
   - `docs/seo/keywords.json` : la cible de « devis automatisé » passe de `/services/sequences-de-suivi` au guide, comme le prévoit le calendrier. La page service garde son title actuel jusqu'à sa révision (`w44-revision-sequences-de-suivi`) : risque de cannibalisation à surveiller.
   - À mesurer : `/ressources/guides/devis-automatise`, requête « devis automatisé » : aucune impression au 5 octobre. Attendu : page indexée, premières impressions, et `onTarget` vrai. À juger à partir de 2026-W44.

4. Révision de `/ressources/guides/claude-cowork` (entrée `w43-revision-guide-claude-cowork`).
   - Pourquoi : « claude cowork » est le mot-clé suivi au plus fort volume en priorité 1, et « claude cowork prix » vise cette page, qui ne donnait les prix que dans une réponse de FAQ.
   - Ce qui a changé : tableau des prix par offre en tête de page, exemple de coût illustratif pour une équipe de 10 personnes, explication de ce qui fait varier l'usage, title et H1 avec « prix », réponse de FAQ complétée avec l'offre Team, `updatedAt` au 5 octobre.
   - Source primaire : <https://claude.com/pricing> (vérifiée le 5 octobre 2026). Les autres sources de la page n'ont pas été relues et gardent leur date du 4 octobre.
   - À mesurer : `/ressources/guides/claude-cowork`, requête « claude cowork prix ». Valeur de départ à relever dans la collecte W42. À juger à partir de 2026-W44.

5. Correctifs techniques et on-page (hors calendrier).
   - `vercel.json` : `Cache-Control` long sur `/_astro/` (immutable), `/fonts/`, `/images/` et `/logos/`. À vérifier sur la preview Vercel avant fusion.
   - `/ressources/guides` et `/ressources/comparatifs` passent en index, avec un title descriptif, et sortent de `src/data/sitemap-noindex-exclude.ts` : chacun liste plus de 3 à 5 pages complètes (politique index-on-quality, `strategy/10 §3`). Décision à confirmer par Simon à la fusion.
   - Hub blog : description avec la requête, articles en noindex retirés de la liste.
   - Titles raccourcis sous 60 caractères : `cas-usages/finance-comptabilite`, `guides/ai-act-pme-calendrier`, `guides/taches-a-automatiser-pme`, `implantations/montpellier`, `services/agents-ia`, hub `/services`. « Guide pillar » renommé « guide complet » (title seulement, URL inchangée). Aucun `updatedAt` modifié pour ces retouches.
   - `/services/automatisation-n8n` : lien vers le guide « prix de n8n » (version française). Ce n'est pas la révision `w42-revision-automatisation-n8n`, qui reste à faire.
   - `src/lib/internal-mesh.ts` : trois guides ajoutés au registre.

6. Décisions de Simon du 5 octobre, appliquées dans la même PR.
   - Hubs : l'indexation n'est plus écrite en dur. `src/lib/seo/hub-index.ts` : un hub s'indexe dès qu'il liste au moins 3 pages filles elles-mêmes indexables ; les pages filles en noindex ne sont plus listées. Appliqué à `/ressources/guides`, `/ressources/comparatifs` et `/ressources/outils` (3 outils : il passe en index). Le sitemap suit par l'intégration `sitemapHygiene`.
   - Secteurs : les trois pages restent en noindex pour l'instant, mais le panneau E-E-A-T (accueil et pages services) affiche leurs libellés sans lien. Le lien revient de lui-même quand une page sort de `sitemap-noindex-exclude.ts`.
   - Trois révisions inscrites au calendrier, avec passage en index à la livraison : `w45-revision-secteur-batiment`, `w46-revision-secteur-e-commerce`, `w47-revision-secteur-startup-logiciel`. Simon juge le secteur logiciel pertinent, sur deux projets distincts : Amploi (client venu par Inbound Value) et l'application livrée à Inbound Value, dont il a tiré une version SaaS. Les deux fiches cas sont à compléter avant d'écrire (détail dans `origine` de l'entrée).

7. Fiche cas `/cas-clients/amploi` complétée, sur les indications de Simon du 5 octobre : TinaCMS sur mesure avec interface en glisser-déposer, skills de création de contenu livrés dans un dépôt GitHub et utilisés par un agent Claude qui commite et déploie sur Vercel. Title et description mis à jour, quatrième phase et quatrième livrable ajoutés, `updatedAt` au 5 octobre. Le score PageSpeed est écrit dans la fiche (impact, chiffre de contexte, section « Ce qui est mesuré », FAQ) : 100 sur 100 en performances, accessibilité, bonnes pratiques et SEO, sur mobile et sur ordinateur, rapport PageSpeed Insights de <https://amploi.fr/> du 5 octobre 2026 à 17 h 06 (Lighthouse 13.5.0 ; mobile : FCP 1,1 s, LCP 1,7 s, TBT 0 ms, CLS 0). Source : captures fournies par Simon, puis rapport relu par l'agent à son adresse permanente (<https://pagespeed.web.dev/analysis/https-amploi-fr/sy0utfy5ep?form_factor=mobile>, lu le 5 octobre 2026). Deux captures du rapport (mobile, ordinateur), refaites depuis cette adresse sans l'habillage du navigateur, sont ajoutées à la vitrine de la fiche, avec un lien vers le rapport. À la demande de Simon, la fiche parle d'une mesure Google PageSpeed Insights du site en production, sans le mot « laboratoire ». Elle précise que le score peut varier d'une analyse à l'autre : une capture du même jour à 16 h 54 affichait 98 en performances sur mobile. La version SaaS tirée de l'application livrée à Inbound Value n'est pas ajoutée : c'est un produit de Simon, à ranger avec les projets internes.

8. Gabarit des fiches cas (`src/lib/templates/case-study.ts`) : ajout de la section catalogue `faq-accordion`, alimentée par `faq_fr` / `faq_en`, entre la stack et la carte auteur. Les questions existaient dans les dix fiches mais n'étaient ni affichées ni balisées : elles sont maintenant visibles, avec un JSON-LD FAQPage par fiche. Aucune réponse réécrite, sauf les deux ajoutées sur Amploi (actions 7).

**Calendrier** : trois créations livrées en avance (W42, W43, W44) et une révision (W43). Les créations restantes sont avancées d'autant pour garder une création par semaine : `w45-crm-sur-mesure` en W42, `w46-workflow-ia` en W43, `w47-freelance-cabinet-agence-ia` en W44, `w48-architecte-ia` en W45, `w49-chatbot-service-client` en W46. Il reste 5 semaines d'avance, sous le seuil de 6 : la prochaine session doit ajouter des idées datées.

**Brouillon LinkedIn** : `docs/seo/posts/2026-W41.md` (trois brouillons, à relire et à publier par Simon).

**Non retenu**
- Indexer les pages `/secteurs/*` : noindex voulu au pivot d'octobre (« hors cible »). L'audit les signale parce que l'accueil et 17 pages services y renvoient : décision pour Simon.
- Raccourcir le title de l'accueil (67 caractères) : il porte la ligne de positionnement.
- Réécrire les blocs communs des pages formations (41 à 46 % de séquences communes entre pages) : à inscrire au calendrier.
- Alléger `section-registry.css` (678 Ko) et le pied de page : hors périmètre d'une PR de contenu.

**Non vérifié dans cette session** : aucun sous-agent n'a relu la révision de `claude-cowork` ; les versions anglaises n'ont pas été relues par un tiers ; Core Web Vitals non mesurés.

**Pour Simon**
- Fusionner après contrôle de la preview Vercel (GF-1), en particulier les en-têtes `Cache-Control`.
- ~~Confirmer l'indexation des deux hubs ressources, et trancher le sort des liens vers `/secteurs/*`.~~ Clos le 5 octobre (voir « Clôture du 5 octobre 2026 »).
- Autorité : 1 seul lien externe relevé dans Search Console. Demander un lien aux clients cités et à Akigora, créer les profils d'annuaires (La Fabrique du Net, Sortlist, impli.fr, Malt) : ce sont des actions extérieures, non faites ici.
- Compléter les emplacements « [exemple vécu à ajouter] » des brouillons LinkedIn.

### Note du 5 octobre 2026 · collecte non partie, routine éditoriale

**Constat.** La collecte planifiée du lundi 5 octobre 2026 (04:30 UTC) n'est pas partie : la liste des runs du workflow `seo-routine.yml`, relue le 5 octobre vers 08:30 UTC, ne contient aucun run `schedule`, seulement des runs `pull_request` et un run lancé à la main le 4 octobre à 21:19 UTC. La cause n'est pas établie.

**Ce que cela a produit.** La session W41 a travaillé sur la collecte de la veille et n'a livré qu'une révision. La tâche Brave a répondu « rien à soumettre », faute de clé `brave` dans `latest.json`, alors que 15 pages neuves étaient en ligne.

**Ce que change la PR de la branche `feat/routine-editoriale`.**
- Collecte : créneau principal le dimanche à 19:17 UTC, rattrapage le lundi à 03:17 UTC, sans effet si une collecte complète de moins de 36 heures existe (`scripts/seo-routine/freshness.mjs`). La fraîcheur se juge par `generatedAt` (moins de 48 heures pour la session), plus par le numéro de semaine : la collecte du dimanche porte le numéro de la semaine qui se termine.
- Brave : la tâche calcule sa file elle-même, sans secret ni état (`node scripts/seo-routine/brave-queue.mjs --from-sitemap --days=8`) : URL du sitemap de production au `lastmod` de moins de 8 jours, plus `brave.toSubmit` de la collecte s'il existe, 40 URL au plus par exécution. Calcul réel du 5 octobre 2026 à 08:11 UTC : 88 URL au sitemap, 84 dans la fenêtre (la refonte des 4 et 5 octobre a daté presque tout le site), dont les 15 pages inconnues de la dernière inspection d'indexation placées en tête ; 40 à soumettre, 44 à reprendre. Rien n'a été soumis par cette PR.
- Rédaction : calendrier éditorial `docs/seo/calendrier-editorial.json` (28 entrées à l'amorce, 8 semaines d'avance, de 2026-W42 à 2026-W49), vérifié par `scripts/seo-routine/check-calendar.mjs`. Le runbook demande désormais au moins une création et une à deux révisions par semaine (plafond : 2 et 3), une recherche en ligne avant d'écrire, un volet GEO explicite, un brouillon de post LinkedIn par création, et ne fait plus dépendre la production de contenu de la collecte. La règle « une à trois actions, ne rien faire est un résultat valide » disparaît.
- Prompts des deux tâches planifiées versionnés : `docs/seo/prompts/routine-hebdo.md` et `docs/seo/prompts/brave.md`.

**À savoir.** Les angles du calendrier sont des hypothèses : aucune recherche en ligne n'a été faite pour l'amorce. Les créneaux planifiés ne sont pas éprouvés : le premier run `schedule` attendu est celui du dimanche qui suit la fusion.

**Pour Simon.** Recopier les deux prompts dans les tâches planifiées après la fusion. Décider des trois idées du calendrier qui supposent une offre ou un positionnement (`idee-agence-ia-toulouse`, `idee-formation-claude-code`, `idee-logiciel-seo-ia-pme`). Faire soumettre à Brave les 84 URL en trois exécutions espacées (40, puis `--offset=40`, puis `--offset=80` pour les 4 dernières).

### 2026-W41 (session du 5 octobre 2026, données de la collecte du 4 octobre 2026)

**Données** : la collecte planifiée du lundi 5 octobre (04:30 UTC) n'avait pas tourné à 06:10 UTC : aucun run `schedule` du workflow `seo-routine.yml`, `latest.json` toujours en `2026-W40`. La session a travaillé sur la collecte W40 du 4 octobre 2026 à 21:20 UTC (Search Console configuré : oui, 7 étapes `ok`), comme le prévoit la section 10 du runbook. Flux et concurrents relancés en local sans rien commiter (`--dry-run --only=feeds,competitors`) : 137 entrées, 0 flux en erreur, 0 URL nouvelle chez les 5 concurrents. Aucune mesure nouvelle de performance ni d'indexation depuis l'entrée précédente.

**KPI** (collecte W40, 28 jours du 4 septembre au 1er octobre 2026, contre les 28 précédents) : clics 4 (±0) · impressions 193 (+122) · CTR 2,07 % · position 23,3 (-15,4) · pages indexées 38 sur 73. Sur 7 jours (25 septembre au 1er octobre) : clics 2 (+2) · impressions 109 (+61) · position 26,8 (+9,9).

**Brave** : file non calculée (la clé `brave` n'existe pas encore dans `latest.json` : la collecte W40 est antérieure à l'étape `brave-queue`). Le sitemap construit depuis `main` compte 88 URL contre 73 à la collecte : 15 pages nouvelles, listées dans le compte rendu.

**Bilan mensuel** (premier lundi d'octobre) : une seule collecte existe, celle qui sert de référence (38 pages indexées sur 73 ; avant refonte, du 30/06 au 29/09/2026, 92 jours : 16 clics, 322 impressions). Aucune évolution sur quatre semaines n'est mesurable. Sur les 28 derniers jours : 4 clics, 193 impressions. Mots-clés de priorité 1 : 1 visible sur 26 (« agence n8n », 1 impression). Aucun changement proposé à `keywords.json`, `feeds.json` ou `competitors.json`. Changement proposé hors fichiers : l'horaire (voir « Pour Simon »). Premier bilan complet : lundi 2 novembre 2026.

**Bilan des actions précédentes** : aucune action de contenu antérieure à mesurer. Les refontes fusionnées les 4 et 5 octobre (#56, #61, #67) sont postérieures à la fenêtre de données (arrêtée au 1er octobre) : trop tôt.

**Points de lecture de la collecte W40**
- Indexation : 35 pages non indexées, toutes à `weeksNotIndexed` 0 (première mesure). La règle des trois collectes (4.1, règle 3) ne se déclenche pas avant W44.
- `/implantations` et `/implantations/bordeaux` vues « exclue par la balise noindex » : explorations du 25 juillet et du 23 septembre, avant la refonte. Le build de production du 5 octobre sert `index, follow` sur les deux (vérifié dans `dist/client`). Pas de bug : attendre la réexploration.
- Canonique : Google retient `https://waimia.com` pour `https://waimia.com/` (barre finale). Sans conséquence.
- `strikingDistance` et `lowCtrPages` vides. `/implantations/montpellier` : 26 impressions en position 54,8, sur « agence airtable montpellier » et « agence no code montpellier », hors positionnement : rien à faire.
- Flux : Claude Sonnet 5.5 (28 septembre), GPT-6.1 Sol et annonces du DevDay d'OpenAI (29 septembre). Les pages qui citent des modèles (`claude-platform-vs-openai-platform`, formations) les nomment déjà.

**Actions de la semaine** (PR de la branche `feat/seo-2026-W41`)
1. Révision de `/ressources/comparatifs/claude-vs-chatgpt-pme`.
   - Pourquoi : règle 4.1, contenu incomplet (la page écrivait ne pas avoir pu relire les prix et les conditions d'OpenAI et renvoyait le lecteur au site d'OpenAI pour la moitié du tableau), sur la page qui porte le mot-clé de priorité 1 « claude vs chatgpt » : 21 impressions et position 13,4 sur 28 jours, requêtes « chatgpt vs claude » (position 7,5), « comparaison entre claude et chatgpt » (7), « abonnement claude vs chatgpt » (10). Les sources d'OpenAI ont pu être lues le 5 octobre.
   - Ce qui a changé : colonne ChatGPT complétée (offre ChatGPT Business, prix, sièges, données, MCP) ; constat « même prix public des deux côtés » en réponse directe ; exemple de coût illustratif (10 sièges) ; limites des engagements sur les données ; avertissement d'OpenAI sur les serveurs MCP ; sections « Ce qui peut rater » et limites du comparatif (hébergement, conservation, Copilot et Gemini non traités) ; question de FAQ reprise de la requête réelle « abonnement claude vs chatgpt » ; lien vers le modèle de charte IA à la place d'une page de service ; meta description ; `updatedAt` au 5 octobre.
   - Sources lues : <https://claude.com/pricing>, <https://support.claude.com/en/articles/9266767-what-is-the-team-plan>, <https://help.openai.com/en/articles/8792828-what-is-chatgpt-business>, <https://openai.com/business/pricing/>, <https://openai.com/enterprise-privacy/> (page datée du 8 janvier 2026), <https://help.openai.com/en/articles/12584461-developer-mode-and-mcp-apps-in-chatgpt> (vérifiées le 5 octobre 2026). Non relues ce jour, donc gardées avec leur date du 4 octobre dans la page : centre de confidentialité d'Anthropic, annonce du protocole MCP.
   - À mesurer : `/ressources/comparatifs/claude-vs-chatgpt-pme` : 21 impressions et position 13,4 sur 28 jours à la collecte du 4 octobre ; requête « chatgpt vs claude » : position 7,5 (2 impressions) ; mot-clé suivi « claude vs chatgpt » : aucune impression. Attendu : position de la page sous 10 et plus de 30 impressions sur 28 jours. À juger à partir de 2026-W44 (deux collectes complètes après la mise en production), `trop tôt` avant.

**Non retenu cette semaine**
- Créer une page pour une requête sans cible (« n8n prix », « ia expert comptable », « automatisation rh », « automatisation comptabilité », « agence ia paris », « agence ia toulouse ») : 15 pages viennent d'être publiées et ne sont pas encore mesurées ; `/implantations/paris`, `/cas-usages/rh` et `/cas-usages/finance-comptabilite` existent désormais et peuvent porter trois de ces requêtes (cibles à renseigner au bilan de novembre, une fois les pages vues par Google).
- Retoucher `/blog/agent-ia-vs-automatisation-classique-2026` (« explorée, non indexée », cite Claude Sonnet 4.6 en exemple) : première semaine de mesure, à reprendre si elle reste non indexée.
- Traiter les 4 pages « explorée, non indexée » (`/tarifs`, `/services/sequences-de-suivi`, deux articles) : explorations de juillet, antérieures à la refonte ; attendre la réexploration.

**Pour Simon**
- La session tourne avant la collecte : décaler l'un des deux horaires (par exemple la collecte le dimanche soir), sinon la session lira chaque lundi les données de la semaine précédente.
- Date du sitemap : `lastmod` vient de la date du commit. Si la collecte du 5 octobre tourne avant la fusion de cette PR et que la fusion a lieu le même jour, la page révisée garde `lastmod` 2026-10-05 et ne sera pas renvoyée à Google ni à Bing : « Demander l'indexation » à la main dans Search Console pour cette URL après la fusion.
- `src/data/lastmod.generated.json` n'a pas pu être régénéré ici (clone superficiel) : sa valeur pour la page est déjà 2026-10-05.

### 2026-W40 (4 octobre 2026) · mise en service

**Données** : Search Console configuré : oui. Étapes en erreur : aucune. Première collecte complète le 4 octobre 2026 (`docs/seo/data/2026-W40/`) : 7 étapes `ok`.

**Mise en route faite** (`docs/seo/SETUP.md`) : API activées dans le projet `master-well-486317-d9`, compte de service propriétaire de `sc-domain:waimia.com`, secret `GSC_SERVICE_ACCOUNT_JSON` posé.

**KPI** (28 jours, du 4 septembre au 1er octobre 2026, contre les 28 précédents) : clics 4 (±0) · impressions 193 (+122) · CTR 2,07 % · position 23,3 (-15,4) · pages indexées 38 sur 73.

**Point zéro de l'indexation** (inspection d'URL, 73 URL du sitemap) : 38 indexées · 14 « détectée, actuellement non indexée » · 15 « Google ne reconnaît pas cette URL » · 4 « explorée, actuellement non indexée » · 2 « exclue par la balise noindex ».

**Référence d'avant refonte** (Search Console, du 30/06 au 29/09/2026, 92 jours) : 16 clics, 322 impressions. Ces deux points servent de référence au bilan mensuel (runbook, section 13).

**Soumissions du 4 octobre 2026** : 73 URL notifiées à Google par l'Indexing API (passe complète, 0 erreur, quota 73 sur 200) ; 73 URL envoyées à IndexNow (réponse « envoyé, clé en cours de validation ») ; les 73 URL soumises une première fois à Brave Search, à la main, par le formulaire <https://search.brave.com/submit-url>. Ce sont des notifications envoyées, pas des pages indexées.

**Ajout du 4 octobre 2026 (PR Brave et bilan mensuel)** : la collecte calcule désormais la file des URL à soumettre à Brave (`scripts/seo-routine/brave-queue.mjs`, clé `brave` de `latest.json`), sans rien soumettre, Brave n'ayant pas d'API. La soumission se fait par le navigateur de Simon, dans la tâche planifiée « Soumission Brave hebdomadaire Waimia ». Le runbook gagne les sections 12 (Brave Search) et 13 (bilan mensuel), et la règle des pages non indexées depuis plus de trois collectes.

**Actions de la semaine** : aucune action de contenu.

**À mesurer** : à partir de 2026-W41, le nombre de pages indexées contre le point zéro (38 sur 73), et le sort des 18 pages « détectée » ou « explorée, non indexée » : celles qui le sont encore après trois collectes appellent une décision (runbook, 4.1, règle 3). Premier bilan mensuel : lundi 2 novembre 2026.

**Pour Simon** : rien à configurer. La file Brave sera vide à la première collecte (amorçage sur le sitemap du 4 octobre 2026, déjà soumis à la main).

### 2026-W40 (4 octobre 2026) · mise en place

**Données** : Search Console non configuré (secret `GSC_SERVICE_ACCOUNT_JSON` absent). Aucune collecte commitée à cette date.

**Actions de la semaine** : aucune action de contenu. Mise en place de l'outillage : scripts `scripts/seo-routine/`, workflow `.github/workflows/seo-routine.yml`, runbook, mots-clés suivis (66), flux (25), concurrents (5).

**Ajout du 4 octobre 2026 (PR Indexing API)** : la collecte notifie désormais Google par l'Indexing API (`scripts/seo-routine/indexing-api.mjs`) pour les URL du sitemap nouvelles ou modifiées, pages non indexées en premier, 200 par jour au plus, avec le compte de service déjà utilisé pour virtuoseweb.fr. Usage hors du cadre documenté par Google (API réservée aux offres d'emploi et aux diffusions en direct) : aucune garantie d'exploration ni d'indexation, à juger sur `indexation` dans `latest.json`. Aucun appel réel à cette date (secret absent).

**État de départ connu** (brief Semrush d'octobre 2026, hors Search Console) : score d'autorité 2 ; 9 pages indexées sur 96 avant la refonte, 81 « détectée, actuellement non indexée ». Le sitemap de production compte 74 URL le 4 octobre 2026.

**À mesurer** : à la première collecte avec Search Console, relever le nombre de pages indexées et les KPI sur 28 jours. Ils servent de point zéro pour toutes les entrées suivantes.

**Pour Simon** : faire la mise en route de `docs/seo/SETUP.md` (activer « Google Search Console API » dans le projet `master-well-486317-d9`, ajouter le compte de service comme propriétaire de `sc-domain:waimia.com`, créer le secret, lancer le workflow avec la première passe).

### Décision du 5 octobre 2026 · pages secteurs

**Décision (Simon).** Indexer les secteurs utiles et liés, laisser les autres hors index. Mesure sur le build avant changement : aucune page publique ne liait les trois secteurs encore en ligne (seuls le plan du site et la cartographie interne) ; les neuf autres sont redirigés en 301 vers `/services` depuis le pivot, sans lien entrant ni cas propre, et le restent.

**Fait.**
- `/secteurs/batiment` et `/secteurs/e-commerce` : index, sortis de `sitemap-noindex-exclude.ts`, déclarés cibles du maillage (`kind: 'secteur'`, groupe « Par secteur »). Contenu réécrit pour l'intention d'achat : douleurs, workflows alignés sur le title (le title e-commerce promettait commandes, support et catalogue, la page parlait de vitesse de site), déroulé semaine par semaine (`methodSteps` → `method-timeline`), offre et prix (`offer_sections` → `pricing-cards`, sprint 999 € HT puis régie 99 € HT/h), six questions d'achat en FAQ. Le diagnostic générique de maturité cède la place à l'offre.
- `/secteurs/startup-logiciel` : même réécriture, **reste noindex** (cas Amploi = RH et santé au travail, pas un éditeur). Déclaré au registre du maillage : il s'active seul le jour où son `seo.noindex` tombe.
- Visuels : illustrations propres à chaque workflow (skill `waimia-illustration`) à la place du pool générique partagé par les trois pages ; une du hub `/ressources` affichait un cadre vide (`media_src` jamais passé), elle reprend l'illustration du hero de l'article.

**À mesurer.** Couverture Search Console des deux pages à partir de la collecte W42, puis impressions sur « automatisation devis bâtiment / artisan » et « automatisation e-commerce ».

### Clôture du 5 octobre 2026 · décisions laissées ouvertes par la PR #72

**Hubs `/ressources/guides` et `/ressources/comparatifs` : indexation confirmée (Simon).** Mesure en production : `robots: index, follow` sur les deux, présents dans `sitemap-0.xml`.

**Liens vers `/secteurs/*` : soldé par la décision secteurs ci-dessus (PR #74).** Mesure en production sur les 97 URL du sitemap : 52 couples page-cible vers `/secteurs/batiment` (24) et `/secteurs/e-commerce` (28), tous deux index, aucun vers `/secteurs/startup-logiciel` (noindex) ; `/secteurs` répond en 301. Le constat de l'audit (« l'accueil et 17 pages services renvoient vers des secteurs noindex ») ne se vérifie plus.

Les deux points correspondants de « Pour Simon » de l'entrée W41 sont clos.

