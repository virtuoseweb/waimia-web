Strat complète Waimia

> ADDENDUM 2026-06-22 (V7-FOLD, pivot Simon) — SUPERSEDE l'architecture « services satellites » (§ Niveau 2, « 9 services Phase 1 ») partout où elle apparaît ci-dessous. Décision : RÉDUIRE le nombre de pages service. Les sous-capacités ne sont plus des pages autonomes mais des SECTIONS `feature-zigzag` dans leur page parente (briques avec ancres `#capacites`/`#capacites-2`). Architecture cible = 6 pages service (nav Solutions cols 1-2) :
> - Col 1 (acquisition) : `site-web-intelligent` · `landing-page-scoring` (← tunnel-conversion-intelligent + 301, absorbe le scoring) · `maintenance-growth`.
> - Col 2 (productivité) : `integrateur-claude` (absorbe Claude Code + référent IA + gouvernance) · `consultant-ia-claude` (← consultant-claude) · `agents-ia`.
> - `content-marketing-intelligent` reste une page dédiée indexée (liée depuis la brique « Content Marketing » de site-web-intelligent, hors nav).
> Supprimés (repliés en briques, jamais indexés donc 0 301) : integrateur-claude-code, referent-ia, gouvernance-ia, crm-intelligent, lead-scoring-ia, geo, seo-ia.
> Cols 3-4 nav (Résoudre un problème = cas-usages ; Audits) restent `soon` jusqu'aux Phases B/C. Livré sur `feat/v7-foundations` (commit 7a3bace), GATE preview Vercel avant merge main. Détail exécution : `~/.claude/plans/flickering-squishing-eagle.md`.

> ADDENDUM 2026-06-26 (V7-FOLD Phases B+C LIVRÉES, commit 1200d1a) : les cols 3-4 de la nav ne sont plus intégralement « soon ».
> - Phase B : collection `cas-usages` peuplée (5 pages : generer-plus-de-leads, reduire-temps-cms, centraliser-donnees, reduire-reporting, standardiser-processus) + hub `/cas-usages` (indexable, 5 enfants). Routes composables créées (mirror de la route services). Nav Solutions col 3 « Résoudre un problème » ACTIVE (3 liens visibles + footer hub).
> - Phase C : audits transactionnels `/audit-ia-pme` + `/audit-site-web-intelligent` (indexés, CTA `/contact` gratuit 45 min) ; diagnostics `/ressources/diagnostics/{maturite-ia, site-web-intelligent}` (indexés ; hub `/ressources/diagnostics` noindex + hors sitemap tant que < 3-5 enfants). Nav Ressources col « Diagnostics » ACTIVE (2 liens).
> - Restent `soon` (cibles non créées) : `secteurs/*`, `etudes-de-cas/*`, `demonstrations/*`, diagnostics `claude-pme` + `referent-ia`.
> - Gate Phase A (nav 4 méga-menus + 6 pages service) : régressions corrigées (footer méga-menu `soon` non honoré sur le sheet mobile, 3 meta-descriptions > 160), commit 32c8ddc.
> - Preuve GF-1 (build statique parité prod) : build `Complete!`, 11 routes neuves = 200, `getComputedStyle` H1/CTA opacity=1/transform=none sur cas-usage/audit/diagnostic/hub, reveal au scroll vérifié, 0 erreur console, gates `internal-links` (0 bloquant, 911 pages) / `seo` (exit 0) / `no-emdash` / `schema` verts.
> - Statut : branche `worktree-1782505856-86810`, NON mergée `main`. GATE Simon (design + copy) avant prod.

Waimia — Architecture SEO/GEO 
Objectif stratégique
Construire un site B2B capable de :
* générer des leads qualifiés ;
* construire l’autorité de Waimia sur l’IA appliquée aux PME ;
* capter les requêtes émergentes autour de Claude ;
* positionner “Site Web Intelligent” comme actif propriétaire ;
* éviter la dilution SEO ;
* éviter les pages faibles ;
* maximiser la conversion dès le lancement.

1. Positionnement final
Waimia repose sur 2 offres principales.
Offre 1 — Site Web Intelligent
Un système d’acquisition, de contenu, de conversion et de réduction du temps marketing.
Objectifs :
* générer plus de leads ;
* réduire le temps passé dans le CMS ;
* structurer le contenu ;
* améliorer SEO/GEO ;
* connecter CRM, analytics et formulaires ;
* rendre le site plus exploitable par l’équipe marketing.

Offre 2 — Intégration Claude
Un système d’intégration IA pour standardiser les process, automatiser les tâches, centraliser la connaissance et exploiter les données métier.
Objectifs :
* déployer Claude en entreprise ;
* configurer Claude Code ;
* former un référent IA ;
* créer des agents IA métier ;
* structurer la gouvernance IA ;
* connecter Claude aux outils internes ;
* réduire le reporting manuel ;
* exploiter les données dispersées.

Ce qui n’est PAS un pilier
Les éléments suivants ne deviennent pas des piliers indépendants :
* Dashboard ;
* BI ;
* Reporting ;
* RevOps ;
* Publicité ;
* Automatisation générique ;
* CRM ;
* Analytics.
Ils sont intégrés dans les offres :
* Site Web Intelligent ;
* Intégration Claude ;
* Cas d’usage ;
* Audits.

2. Navigation principale
Navigation finale :
* Solutions
* Cas clients
* Ressources
* Agence
Ne pas utiliser :
* Acquérir
* Piloter
* Opérer
Ces termes sont utiles en interne, mais trop abstraits pour une PME.

3. Mega menu — Solutions
Objectif : montrer ce que Waimia vend et orienter par offre ou par problème.
Colonne 1 — 
* Site Web Intelligent
Sous-texte :
Générer plus de leads et réduire le temps passé par l’équipe marketing.

section spéciale (design (logotype, branding, direction artistique, web design, product design, landing page), puis intégration (crm,migration, outils sur mesure, chatbot IA) section spéciale content marketing intelligent, réduction temps crm, puis tunnel de qualification intelligent puis maintenance et growth (tracking,seo,geo,reporting et maintenance avec forfait horaire) 
* Maintenance & growth : Faire évoluer son site web après
  -SEO/GEO /services/maintenance/seo-geo

* Tunnel de qualification intelligent  /services/landing-page-scoring
        section : lead magnet, tracking,scoring, A/B test, copywriting, landing page, séquence email. Nous travaillons avec une agence partenaire pour la publicité afin de rester concentrer sur la partie technique et notre domaine d'expertise.

Colonne 2 — Intégration Claude
Sous-texte :
Standardiser les processus, gagner du temps et mieux exploiter la connaissance interne.
Liens :
* Intégrateur Claude /services/integrateur-claude (avec section cowork, claude code, claude agents managed, notre méthode devenir un referent ia pour votre orga, et faire monter en compétence un membre de votre équipe.
* Consultant Claude /services/consultant-ia-claude
* Agents IA /services/agents-ia
        section spéciale : intégration chat bot IA
        section spéciale : intégration MCP
        section spéciale : workflow
        section spéciale : Agent métier 

Colonne 3 — Résoudre un problème
Objectif : orienter les visiteurs qui ne savent pas quel service choisir.
Liens :
* Générer plus de leads /cas-usages/generer-plus-de-leads
* Réduire le temps passé dans le CMS /cas-usages/reduire-temps-cms
* Centraliser les données /cas-usages/centraliser-donnees
* Réduire le reporting /cas-usages/reduire-reporting
* Standardiser les processus /cas-usages/standardiser-processus
CTA :
* Voir tous les cas d’usage /cas-usages

Colonne 4 — Audits
Objectif : proposer une entrée commerciale plus facile que l’achat d’un projet complet.
Liens :
* Audit IA PME /audit-ia-pme
* Audit Site Web Intelligent /audit-site-web-intelligent
* Diagnostic maturité IA /ressources/diagnostics/maturite-ia
* Diagnostic Site Web Intelligent /ressources/diagnostics/site-web-intelligent
CTA :
* Réserver un audit /contact
4. Mega menu — Cas clients
Objectif : rassurer par secteur, preuve et résultat.
Colonne 1 — Par secteur
Liens :
* Conseil /secteurs/conseil
* Comptabilité /secteurs/comptabilite
* Agence /secteurs/agence
* Industrie /secteurs/industrie
* Formation /secteurs/formation
* ESN /secteurs/esn
CTA :
* Tous les secteurs /secteurs

Colonne 2 — Études de cas
Liens :
* Toutes les études de cas /etudes-de-cas
* Site Web Intelligent /etudes-de-cas/site-web-intelligent
* Intégration Claude /etudes-de-cas/integration-claude

Colonne 3 — Résultats obtenus
Liens :
* Plus de leads /etudes-de-cas/resultats/plus-de-leads
* Réduction du temps marketing /etudes-de-cas/resultats/reduction-temps-marketing
* Centralisation des données /etudes-de-cas/resultats/centralisation-donnees
* Automatisation des processus /etudes-de-cas/resultats/automatisation-processus
* Meilleure qualification commerciale /etudes-de-cas/resultats/qualification-commerciale

Colonne 4 — Preuves & démonstrations
Au lancement, si peu de cas clients réels :
* Démo Site Web Intelligent /demonstrations/site-web-intelligent
* Démo Intégration Claude /demonstrations/integration-claude
* Avant / Après /demonstrations/avant-apres
Quand un vrai cas client solide existe, remplacer cette colonne par :
* Projet vedette /etudes-de-cas/projet-vedette

5. Mega menu — Ressources
Objectif : éduquer, qualifier et capter des leads.
Collections ressources finales :
* Blog
* Guides
* Diagnostics
* Outils
* Comparatifs
Ne pas créer de collection “Livres blancs”. Les livres blancs sont absorbés dans “Guides”.

Colonne 1 — Lire
Liens :
* Blog /blog
* Guides /ressources/guides
* Comparatifs /ressources/comparatifs
CTA :
* Toutes les ressources /ressources

Colonne 2 — Diagnostics
Liens :
* Diagnostic maturité IA /ressources/diagnostics/maturite-ia
* Diagnostic Site Web Intelligent /ressources/diagnostics/site-web-intelligent
* Diagnostic Claude PME /ressources/diagnostics/claude-pme
* Diagnostic Référent IA /ressources/diagnostics/referent-ia

Colonne 3 — Outils
Liens :
* Calculateur ROI IA /ressources/outils/calculateur-roi-ia
* Score maturité IA /ressources/outils/score-maturite-ia
* Checklist déploiement Claude /ressources/guides/checklist-deploiement-claude

Colonne 4 — Les plus consultés
Liens :
* Claude vs ChatGPT PME /ressources/comparatifs/claude-vs-chatgpt-pme
* GEO vs SEO /ressources/comparatifs/geo-vs-seo
* Site Web Intelligent vs WordPress /ressources/comparatifs/site-web-intelligent-vs-wordpress
* Claude Code vs Cursor /ressources/comparatifs/claude-code-vs-cursor

6. Mega menu — Agence
Objectif : construire la confiance.
Colonne 1 — Qui nous sommes
Liens :
* À propos /a-propos
* Méthode /methode
* Simon Beros — Auteur /auteurs/simon-beros

Colonne 2 — Vision
Liens :
* Manifeste /manifeste
* Process Intelligence /methode/process-intelligence
* Notre approche /methode

Colonne 3 — Écosystème
Liens :
* Partenaires technologiques /partenaires
* Stack & technologies /technologies
* Expertise Claude /services/integrateur-claude

Colonne 4 — Présence
Liens :
* Montpellier /implantations/montpellier
* France entière /implantations
* Bordeaux /implantations/bordeaux
CTA :
* Réserver un audit /contact

7. Distinction pages locales
Pages locales commerciales SEO
Objectif : capter une intention transactionnelle locale.
Exemples :
* Intégrateur Claude Paris /integrateur-claude-paris
* Intégrateur Claude Bordeaux /integrateur-claude-bordeaux
* Intégrateur Claude Lyon /integrateur-claude-lyon
Ces pages ne vont pas dans le menu Agence.

Pages implantations
Objectif : rassurer sur la présence et l’ancrage.
Exemples :
* Implantations /implantations
* Montpellier /implantations/montpellier
* Bordeaux /implantations/bordeaux
Ces pages peuvent apparaître dans le mega menu Agence.

8. Phase 1 — Lancement
Objectif : lancer avec une architecture déjà crédible, mais sans diluer le site.
Corporate
* Accueil /
* À propos /a-propos
* Méthode /methode
* Contact /contact
* Études de cas /etudes-de-cas

Pages transactionnelles audit
* Audit IA PME /audit-ia-pme
* Audit Site Web Intelligent /audit-site-web-intelligent

Services — Site Web Intelligent
* Site Web Intelligent /services/site-web-intelligent
* Content Marketing Intelligent /services/content-marketing-intelligent
* GEO /services/geo
* SEO IA /services/seo-ia
* CRM Intelligent /services/crm-intelligent
* Lead Scoring IA /services/lead-scoring-ia

Services — Intégration Claude
* Intégrateur Claude /services/integrateur-claude
* Intégrateur Claude Code /services/integrateur-claude-code
* Consultant Claude /services/consultant-claude
* Référent IA /services/referent-ia
* Agents IA /services/agents-ia
* Gouvernance IA /services/gouvernance-ia

Secteurs
* Conseil /secteurs/conseil
* Comptabilité /secteurs/comptabilite

Cas d’usage
* Hub cas d’usage /cas-usages
* Générer plus de leads /cas-usages/generer-plus-de-leads
* Réduire le temps passé dans le CMS /cas-usages/reduire-temps-cms
* Centraliser les données /cas-usages/centraliser-donnees
* Réduire le reporting /cas-usages/reduire-reporting
* Standardiser les processus /cas-usages/standardiser-processus
* Claude + HubSpot /cas-usages/claude-hubspot
* Claude + Notion /cas-usages/claude-notion
* Site Web Intelligent pour cabinet comptable /cas-usages/site-web-intelligent-cabinet-comptable

Démonstrations
* Démonstration Site Web Intelligent /demonstrations/site-web-intelligent
* Démonstration Intégration Claude /demonstrations/integration-claude
* Avant / Après /demonstrations/avant-apres

Ressources
* Hub ressources /ressources
* Guides /ressources/guides
* Diagnostics /ressources/diagnostics
* Outils /ressources/outils
* Comparatifs /ressources/comparatifs
* Diagnostic maturité IA /ressources/diagnostics/maturite-ia
* Diagnostic Site Web Intelligent /ressources/diagnostics/site-web-intelligent
* Guide Claude PME /ressources/guides/claude-pme

Blog
* Claude vs ChatGPT Entreprise /blog/claude-vs-chatgpt-entreprise
* Claude Code vs Cursor /blog/claude-code-vs-cursor
* Comment déployer Claude dans une PME /blog/deployer-claude-pme
* Référent IA : rôle et missions /blog/referent-ia-role-missions
* GEO vs SEO /blog/geo-vs-seo
* Site vitrine vs Site Web Intelligent /blog/site-vitrine-vs-site-web-intelligent
* Futur du Content Marketing /blog/futur-content-marketing
* Lead Magnet Intelligent /blog/lead-magnet-intelligent

9. Phase 2 — Mois 2
Nouveaux secteurs
* Agence /secteurs/agence
* Industrie /secteurs/industrie

Nouvelle ressource
* Checklist déploiement Claude /ressources/guides/checklist-deploiement-claude

Nouveaux articles
* Claude pour cabinet comptable /blog/claude-cabinet-comptable
* Claude pour agence marketing /blog/claude-agence-marketing
* Créer une base de connaissance Claude /blog/base-connaissance-claude
* Choisir un référent IA /blog/choisir-referent-ia

10. Phase 3 — Mois 3
Nouveaux secteurs
* Formation /secteurs/formation
* ESN /secteurs/esn

Cas d’usage
* Claude + documentation interne /cas-usages/claude-documentation
* Claude + base de connaissance /cas-usages/claude-base-connaissance

Nouvelle ressource
* Diagnostic Claude PME /ressources/diagnostics/claude-pme

Nouveaux articles
* Claude et HubSpot /blog/claude-hubspot
* Claude et Notion /blog/claude-notion
* Agents IA pour PME /blog/agents-ia-pme
* Gouvernance IA PME /blog/gouvernance-ia-pme

11. Phase 4 — Mois 4
Pages locales commerciales SEO — test
* Intégrateur Claude Paris /integrateur-claude-paris
* Intégrateur Claude Bordeaux /integrateur-claude-bordeaux
* Intégrateur Claude Lyon /integrateur-claude-lyon

Pages implantations
* Implantations /implantations
* Montpellier /implantations/montpellier
* Bordeaux /implantations/bordeaux

Cas d’usage
* Claude + Google Workspace /cas-usages/claude-google-workspace
* Claude + support client /cas-usages/claude-support-client

Nouvelle ressource
* Calculateur ROI IA /ressources/outils/calculateur-roi-ia

Nouveaux articles
* Claude Code pour équipe technique /blog/claude-code-equipe-technique
* Sécurité Claude en entreprise /blog/securite-claude-entreprise
* SEO et LLM /blog/seo-llm
* Structurer un Site Web Intelligent /blog/structurer-site-web-intelligent

12. Phase 5 — Mois 5
Cas d’usage
* Claude + CRM /cas-usages/claude-crm
* Claude + support commercial /cas-usages/claude-support-commercial

Nouvelle ressource
* Benchmark Claude vs ChatGPT PME /ressources/guides/benchmark-claude-chatgpt-pme

Nouveaux articles
* Claude vs Copilot /blog/claude-vs-copilot
* Mesurer le ROI de l’IA /blog/mesurer-roi-ia
* Lead Scoring avec l’IA /blog/lead-scoring-ia
* Erreurs de déploiement Claude /blog/erreurs-deploiement-claude

13. Phase 6 — Mois 6
Cas d’usage
* Site Web Intelligent pour agence /cas-usages/site-web-intelligent-agence
* Site Web Intelligent pour ESN /cas-usages/site-web-intelligent-esn

Comparatifs
* Site Web Intelligent vs WordPress /ressources/comparatifs/site-web-intelligent-vs-wordpress
* Claude vs ChatGPT PME /ressources/comparatifs/claude-vs-chatgpt-pme
* Claude Code vs Cursor 2026 /ressources/comparatifs/claude-code-vs-cursor-2026
* GEO vs SEO 2026 /ressources/comparatifs/geo-vs-seo-2026

14. Hiérarchie SEO
Niveau 1 — Hubs principaux
* /services/site-web-intelligent
* /services/integrateur-claude

Niveau 2 — Services satellites
* /services/content-marketing-intelligent
* /services/geo
* /services/seo-ia
* /services/crm-intelligent
* /services/lead-scoring-ia
* /services/integrateur-claude-code
* /services/consultant-claude
* /services/referent-ia
* /services/agents-ia
* /services/gouvernance-ia

Niveau 3 — Entrées transactionnelles
* /audit-ia-pme
* /audit-site-web-intelligent

Niveau 4 — Contextualisation métier
* /secteurs/*

Niveau 5 — Résolution de problèmes
* /cas-usages/*

Niveau 6 — Preuve
* /etudes-de-cas/*
* /demonstrations/*

Niveau 7 — Autorité et longue traîne
* /ressources/*
* /blog/*

15. Plan anti-cannibalisation
Chaque page doit avoir une intention unique.
/services/integrateur-claude
Intention : trouver un prestataire pour intégrer Claude en entreprise.
Angle : offre principale.

/services/consultant-claude
Intention : chercher un expert ou accompagnant Claude.
Angle : conseil, cadrage, accompagnement.

/services/integrateur-claude-code
Intention : intégrer Claude Code dans un contexte équipe technique.
Angle : dev, projets, repo, workflow, qualité.

/services/referent-ia
Intention : structurer un rôle IA interne.
Angle : montée en compétence, gouvernance, relais interne.

/blog/deployer-claude-pme
Intention : comprendre comment déployer Claude.
Angle : guide informationnel.

/cas-usages/claude-hubspot
Intention : comprendre comment utiliser Claude avec HubSpot.
Angle : scénario métier.

16. Template page service
Exemples :
* /services/site-web-intelligent
* /services/integrateur-claude
* /services/geo
* /services/seo-ia
* /services/agents-ia
Sections obligatoires
1. Hero orienté résultat
2. Définition courte Format extractible pour Google / LLM.
3. Problèmes traités
4. Pour qui / pas pour qui
5. Ce que Waimia met en place
6. Livrables
7. Architecture du système
8. Process
9. Mesure & analytics
10. Stack possible
11. Cas d’usage associés
12. Secteurs associés
13. Études de cas associées
14. Ressources liées
15. FAQ
16. CTA principal
17. CTA secondaire
Maillage obligatoire
Chaque page service doit linker vers :
* son hub principal ;
* 2 services complémentaires ;
* 2 cas d’usage ;
* 2 secteurs ;
* 1 ressource ;
* 1 à 2 articles ;
* 1 étude de cas quand disponible.

17. Template page secteur
Exemples :
* /secteurs/conseil
* /secteurs/comptabilite
* /secteurs/agence
* /secteurs/industrie
* /secteurs/formation
* /secteurs/esn
Sections obligatoires
1. Hero métier
2. Contexte du secteur
3. Défis fréquents
4. Comment Site Web Intelligent s’applique au secteur
5. Comment Intégration Claude s’applique au secteur
6. Cas d’usage du secteur
7. Ressources utiles
8. Études de cas du secteur
9. FAQ secteur
10. CTA diagnostic
Maillage obligatoire
Chaque page secteur doit linker vers :
* /services/site-web-intelligent
* /services/integrateur-claude
* 2 à 4 services satellites ;
* 2 à 4 cas d’usage ;
* 1 diagnostic ;
* les études de cas du secteur ;
* 2 articles pertinents.

18. Template page cas d’usage
Exemples :
* /cas-usages/generer-plus-de-leads
* /cas-usages/reduire-temps-cms
* /cas-usages/centraliser-donnees
* /cas-usages/claude-hubspot
* /cas-usages/site-web-intelligent-cabinet-comptable
Sections obligatoires
1. Hero problème
2. Situation de départ
3. Pourquoi le problème coûte cher
4. Solution Waimia
5. Hub parent :
    * Site Web Intelligent ;
    * ou Intégration Claude.
6. Architecture proposée
7. Exemple concret
8. Résultat attendu
9. KPIs suivis
10. Stack possible
11. Dashboard / reporting
12. Secteurs concernés
13. Services liés
14. Ressources liées
15. FAQ
16. CTA audit
Maillage obligatoire
Chaque cas d’usage doit linker vers :
* 1 hub principal :
    * /services/site-web-intelligent
    * ou /services/integrateur-claude
* 1 à 2 services satellites ;
* 1 à 2 secteurs ;
* 1 ressource ;
* 1 article ;
* 1 étude de cas quand disponible.

19. Template étude de cas
Exemples :
* /etudes-de-cas/plateau
* /etudes-de-cas/halcyon
* /etudes-de-cas/client-comptabilite
Sections obligatoires
1. Résumé du projet
2. Contexte client
3. Problème initial
4. Objectifs
5. Solution mise en place
6. Stack utilisée
7. Process projet
8. Résultats mesurés
9. Avant / après
10. Ce que le client peut faire maintenant
11. Services liés
12. Cas d’usage liés
13. Secteur lié
14. CTA
Maillage obligatoire
Chaque étude de cas doit linker vers :
* le secteur ;
* les services utilisés ;
* les cas d’usage correspondants ;
* une ressource liée ;
* la page /etudes-de-cas.

20. Template démonstration
Exemples :
* /demonstrations/site-web-intelligent
* /demonstrations/integration-claude
* /demonstrations/avant-apres
Sections obligatoires
1. Ce que la démonstration montre
2. Problème simulé
3. Architecture
4. Captures ou prototype
5. Résultat attendu
6. Services liés
7. Cas d’usage liés
8. CTA audit
Rôle
Les démonstrations compensent l’absence de cas clients au lancement.

21. Template page ressource
Exemples :
* /ressources/diagnostics/maturite-ia
* /ressources/diagnostics/site-web-intelligent
* /ressources/outils/calculateur-roi-ia
* /ressources/guides/claude-pme
Sections obligatoires
1. Hero orienté bénéfice
2. À qui s’adresse la ressource
3. Ce que l’utilisateur obtient
4. Formulaire ou accès direct
5. Résultat / score / livrable
6. Recommandations
7. Services liés
8. Cas d’usage liés
9. Articles liés
10. CTA audit
Maillage obligatoire
Chaque ressource doit linker vers :
* 1 service principal ;
* 1 à 2 cas d’usage ;
* 1 secteur si pertinent ;
* 2 articles ;
* 1 diagnostic complémentaire si pertinent.

22. Template article
Exemples :
* /blog/geo-vs-seo
* /blog/claude-code-vs-cursor
* /blog/deployer-claude-pme
Sections obligatoires
1. Introduction courte
2. Réponse directe en début d’article
3. Développement structuré
4. Exemple concret
5. Erreurs fréquentes
6. Recommandation Waimia
7. FAQ
8. Ressources liées
9. CTA
Maillage obligatoire
Chaque article doit linker vers :
* 1 service ;
* 1 cas d’usage ;
* 1 ressource ;
* 1 autre article ;
* 1 secteur si pertinent.

23. Template page locale commerciale SEO
Exemples :
* /integrateur-claude-paris
* /integrateur-claude-bordeaux
* /integrateur-claude-lyon
Sections obligatoires
1. Hero local
2. Problèmes des entreprises locales
3. Offre Claude locale
4. Méthode d’intervention
5. Cas d’usage adaptés
6. Preuves ou projets liés
7. Ressources utiles
8. FAQ locale
9. CTA
Maillage obligatoire
Chaque page locale commerciale doit linker vers :
* /services/integrateur-claude
* /services/integrateur-claude-code
* /cas-usages
* 2 cas d’usage Claude ;
* /implantations ou l’implantation pertinente ;
* une ressource Claude.

24. Template page implantation
Exemples :
* /implantations
* /implantations/montpellier
* /implantations/bordeaux
Rôle
Ces pages ne sont pas des pages SEO commerciales principales. Elles servent à rassurer sur la présence, l’ancrage et la proximité.
Sections obligatoires
1. Présence locale
2. Zone d’intervention
3. Types de clients accompagnés
4. Services proposés dans la zone
5. Lien vers les pages commerciales locales si elles existent
6. Contact
Maillage obligatoire
Chaque page implantation doit linker vers :
* /contact
* /services/site-web-intelligent
* /services/integrateur-claude
* page locale commerciale si pertinente.

25. Règles d’indexation
À indexer
* pages services ;
* pages audits ;
* pages secteurs ;
* pages cas d’usage ;
* études de cas ;
* démonstrations ;
* ressources ;
* articles ;
* pages locales commerciales ;
* pages implantations principales.

À éviter ou noindex
* pages de filtre avec paramètres ;
* résultats de recherche interne ;
* tags trop faibles ;
* archives pauvres ;
* pages auteur vides ;
* pages démonstration sans contenu réel.

Canonical
Les pages filtrées doivent pointer en canonical vers leur hub principal :
* /etudes-de-cas
* /blog
* /ressources

26. Données structurées recommandées
Pages services
* Service
* Organization
* FAQPage
* BreadcrumbList
Pages audit
* Service
* FAQPage
* BreadcrumbList
Pages cas d’usage
* WebPage
* FAQPage
* BreadcrumbList
Études de cas
* Article
* CreativeWork
* Organization
* BreadcrumbList
Articles
* Article
* FAQPage
* BreadcrumbList
* Person pour l’auteur
Ressources
* SoftwareApplication pour outils
* Quiz si diagnostic interactif
* Article ou Guide pour guides
* BreadcrumbList
Auteur
* Person
* sameAs
* knowsAbout
* authorOf

27. Règles GEO par page importante
Chaque page stratégique doit contenir :
* définition courte ;
* réponse directe ;
* résumé ;
* FAQ ;
* tableau comparatif si pertinent ;
* exemples concrets ;
* entités nommées clairement ;
* date de mise à jour ;
* auteur ;
* liens internes cohérents.

28. Rythme de croisière après 6 mois
Chaque mois :
1 nouveau cas d’usage
Exemples :
* Claude RH /cas-usages/claude-rh
* Claude recrutement /cas-usages/claude-recrutement
* Site Web Intelligent industrie /cas-usages/site-web-intelligent-industrie
* Site Web Intelligent formation /cas-usages/site-web-intelligent-formation

2 à 4 articles
Exemples :
* Claude pour PME industrielle /blog/claude-pme-industrielle
* Agents IA et documentation /blog/agents-ia-documentation
* GEO pour cabinets de conseil /blog/geo-cabinets-conseil
* SEO IA et recherche générative /blog/seo-ia-recherche-generative

1 ressource tous les 2 mois
Exemples :
* Score maturité IA /ressources/outils/score-maturite-ia
* Diagnostic référent IA /ressources/diagnostics/referent-ia
* Guide déploiement Claude /ressources/guides/guide-deploiement-claude

1 étude de cas à chaque projet terminé
Exemples :
* Plateau /etudes-de-cas/plateau
* Halcyon /etudes-de-cas/halcyon
* Client comptabilité /etudes-de-cas/client-comptabilite

Optimisations continues
* FAQ
* maillage interne
* données structurées
* CTA
* statistiques
* captures
* ressources liées
* cas d’usage liés
* études de cas liées
* amélioration des pages hub
* suppression ou fusion des pages faibles

29. Règles finales
Ne pas recréer de pilier Dashboard / BI
La data, les dashboards, les analytics, le reporting et le prévisionnel sont intégrés dans :
* Site Web Intelligent
* Intégration Claude
* Cas d’usage
* Audit
Ils ne deviennent pas un pilier indépendant.

Ne pas recréer Acquérir / Piloter / Opérer
Cette logique est utile en interne, mais trop abstraite pour la navigation publique.

Ne pas multiplier les pages secteurs après la couverture initiale
Une fois ces secteurs couverts :
* Conseil
* Comptabilité
* Agence
* Industrie
* Formation
* ESN
ne pas créer de nouveau secteur sauf demande business réelle.

Ne pas créer de nouveaux services sans offre réelle
Après le lancement, la croissance se fait surtout via :
* cas d’usage ;
* ressources ;
* études de cas ;
* articles ;
* comparatifs ;
* démonstrations.
Pas par invention continue de nouvelles pages service.

Ne pas créer de collection “Livres blancs”
Tous les contenus longs sont intégrés dans :
* /ressources/guides

30. Priorité stratégique
1. Faire ranker /services/integrateur-claude
2. Faire ranker /services/site-web-intelligent
3. Convertir via /audit-ia-pme
4. Convertir via /audit-site-web-intelligent
5. Construire l’autorité du hub /cas-usages
6. Ajouter les preuves via /etudes-de-cas
7. Compenser l’absence de preuves avec /demonstrations
8. Renforcer le GEO avec ressources, FAQ, comparatifs et données structurées

31. Validation finale
Cette version est validée comme architecture de lancement.
Elle couvre :
* positionnement ;
* navigation ;
* mega menus ;
* services ;
* audits ;
* secteurs ;
* cas d’usage ;
* démonstrations ;
* ressources ;
* blog ;
* études de cas ;
* pages locales ;
* pages implantations ;
* templates ;
* maillage interne ;
* indexation ;
* données structurées ;
* GEO ;
* conversion ;
* anti-cannibalisation.
Elle est suffisamment complète pour lancer sans continuer à repousser la décision.





32. Collection landing pages et tunnels de conversion
Objectif
Créer une collection dédiée aux pages de conversion qui ne sont pas conçues pour structurer le SEO principal, mais pour convertir un trafic précis.
Ces pages servent à :
* campagnes LinkedIn ;
* campagnes email ;
* prospection directe ;
* retargeting ;
* publicités ;
* séquences commerciales ;
* liens partagés en rendez-vous ;
* variantes sectorielles ou contextuelles d’une offre.

Collection dédiée
Créer une collection :
* /lp/*
Rôle :
* convertir ;
* personnaliser le message ;
* réduire la friction ;
* tester des angles ;
* éviter de polluer les pages services ;
* éviter de créer trop de pages SEO proches.
Règle principale :
/lp/ sert à convertir, pas à ranker.

Différence entre pages SEO et landing pages
Pages SEO indexables
Elles restent dans :
* /services/*
* /cas-usages/*
* /secteurs/*
* /ressources/*
* /blog/*
* /audit-ia-pme
* /audit-site-web-intelligent
Rôle :
* construire l’autorité ;
* ranker ;
* structurer le cocon ;
* recevoir du maillage ;
* répondre à une intention de recherche durable.

Landing pages de conversion
Elles vont dans :
* /lp/*
Rôle :
* convertir un trafic précis ;
* adapter le discours à une cible ;
* tester un angle ;
* servir une campagne ;
* simplifier le parcours ;
* éviter de dupliquer les pages principales.
Indexation par défaut :
* noindex
* canonical vers la page SEO parent quand il y en a une.

Hub landing pages
Créer un hub interne :
* /lp
Rôle :
* retrouver les landing pages ;
* faciliter le partage interne ;
* centraliser les pages de campagne.
Indexation :
* noindex
Cette page peut être accessible depuis le footer uniquement si nécessaire, avec un libellé discret :
* Pages d’accès
* Campagnes
* Accès rapides
Mais elle ne doit pas être poussée comme une page SEO.

Footer et accessibilité
Pages à mettre dans le footer
Mettre seulement les pages permanentes et utiles :
* /audit-ia-pme
* /audit-site-web-intelligent
* /ressources/diagnostics/maturite-ia
* /ressources/diagnostics/site-web-intelligent
* /contact
Optionnel :
* /lp
Uniquement si Waimia veut retrouver facilement les landings en interne.

Pages à ne pas lister individuellement dans le footer
Ne pas lister toutes les pages :
* /lp/*
Pourquoi :
* surcharge du footer ;
* dilution UX ;
* bruit SEO ;
* exposition de pages de campagne ;
* risque de confusion avec les vraies pages services.

Landing pages prioritaires à créer
1. Landing page Audit IA PME
URL :
* /lp/audit-ia-pme
Page parent SEO :
* /audit-ia-pme
Indexation :
* noindex
* canonical vers /audit-ia-pme
Usage :
* prospection ;
* campagne LinkedIn ;
* email sortant ;
* retargeting ;
* signature commerciale.
Structure :
1. Hero direct Exemple : “Identifiez où l’IA peut vraiment faire gagner du temps à votre PME.”
2. Problèmes ciblés
3. Ce que l’audit analyse
4. Livrable obtenu
5. Durée et déroulé
6. Pour qui / pas pour qui
7. Exemple de restitution
8. FAQ courte
9. CTA principal : réserver un audit
10. CTA secondaire : faire un diagnostic

2. Landing page Audit Site Web Intelligent
URL :
* /lp/audit-site-web-intelligent
Page parent SEO :
* /audit-site-web-intelligent
Indexation :
* noindex
* canonical vers /audit-site-web-intelligent
Usage :
* audit de site ;
* prospection PME ;
* campagnes SEO/GEO ;
* retargeting visiteurs du site.
Structure :
1. Hero direct Exemple : “Votre site génère-t-il assez de leads ou demande-t-il trop de travail manuel ?”
2. Problèmes ciblés
3. Axes analysés :
    * conversion ;
    * SEO ;
    * GEO ;
    * CMS ;
    * contenu ;
    * CRM ;
    * analytics ;
    * lead magnets.
4. Score obtenu
5. Recommandations
6. Exemple de livrable
7. FAQ courte
8. CTA diagnostic

3. Landing page Intégrateur Claude
URL :
* /lp/integrateur-claude
Page parent SEO :
* /services/integrateur-claude
Indexation :
* noindex
* canonical vers /services/integrateur-claude
Usage :
* campagne LinkedIn ;
* cold email ;
* retargeting ;
* rendez-vous commerciaux ;
* messages directs.
Structure :
1. Hero direct Exemple : “Déployez Claude dans votre entreprise sans improviser.”
2. Cas d’usage fréquents
3. Ce que Waimia configure
4. Référent IA
5. Gouvernance
6. Claude Code
7. Exemples de workflows
8. CTA audit IA

4. Landing page Site Web Intelligent
URL :
* /lp/site-web-intelligent
Page parent SEO :
* /services/site-web-intelligent
Indexation :
* noindex
* canonical vers /services/site-web-intelligent
Usage :
* campagnes d’acquisition ;
* prospection PME ;
* retargeting ;
* présentation commerciale.
Structure :
1. Hero direct Exemple : “Transformez votre site en système d’acquisition.”
2. Douleurs principales :
    * peu de leads ;
    * trop de temps dans le CMS ;
    * contenu difficile à maintenir ;
    * SEO/GEO faible ;
    * données dispersées.
3. Ce que Waimia met en place
4. Démo ou schéma
5. Résultats attendus
6. CTA audit site

5. Landing page Diagnostic maturité IA
URL :
* /lp/diagnostic-maturite-ia
Page parent SEO :
* /ressources/diagnostics/maturite-ia
Indexation :
* noindex
* canonical vers /ressources/diagnostics/maturite-ia
Usage :
* lead magnet ;
* newsletter ;
* ads ;
* prospection ;
* nurturing.
Structure :
1. Hero direct Exemple : “Évaluez votre maturité IA en quelques minutes.”
2. Questions couvertes
3. Score obtenu
4. Recommandations
5. Ce que le diagnostic révèle
6. CTA démarrer le diagnostic

6. Landing page Diagnostic Site Web Intelligent
URL :
* /lp/diagnostic-site-web-intelligent
Page parent SEO :
* /ressources/diagnostics/site-web-intelligent
Indexation :
* noindex
* canonical vers /ressources/diagnostics/site-web-intelligent
Usage :
* lead magnet ;
* audit site ;
* campagnes SEO/GEO ;
* retargeting.
Structure :
1. Hero direct Exemple : “Votre site est-il prêt pour le SEO, le GEO et la conversion ?”
2. Axes analysés
3. Score obtenu
4. Recommandations
5. CTA démarrer

7. Landing pages sectorielles personnalisées
Exemples :
* /lp/audit-ia-cabinet-comptable
* /lp/site-web-intelligent-cabinet-comptable
* /lp/integrateur-claude-agence
* /lp/site-web-intelligent-agence
* /lp/integrateur-claude-esn
Pages parentes SEO possibles :
* /secteurs/comptabilite
* /secteurs/agence
* /secteurs/esn
* /services/integrateur-claude
* /services/site-web-intelligent
Indexation :
* noindex
Exception :
Si une landing sectorielle devient profonde, durable et recherchable, elle doit sortir de /lp/ et devenir une vraie page SEO :
* /cas-usages/site-web-intelligent-cabinet-comptable
* /secteurs/comptabilite
* /cas-usages/claude-cabinet-comptable

8. Landing pages par douleur métier
Exemples :
* /lp/reduire-temps-reporting
* /lp/reduire-temps-cms
* /lp/centraliser-donnees
* /lp/generer-plus-de-leads
* /lp/standardiser-processus
Pages parentes SEO :
* /cas-usages/reduire-reporting
* /cas-usages/reduire-temps-cms
* /cas-usages/centraliser-donnees
* /cas-usages/generer-plus-de-leads
* /cas-usages/standardiser-processus
Indexation :
* noindex
* canonical vers la page cas d’usage correspondante.

Template landing page /lp/*
Sections obligatoires
1. Hero ultra direct
Objectif :
* faire comprendre l’offre en moins de 5 secondes ;
* afficher un bénéfice concret ;
* pousser un CTA immédiat.

2. Problème ciblé
Afficher 3 à 5 douleurs précises.
Exemples :
* trop de temps passé dans le CMS ;
* reporting manuel ;
* données dispersées ;
* manque de leads ;
* déploiement IA improvisé ;
* absence de référent IA.

3. Ce que Waimia met en place
Présenter uniquement les livrables utiles à cette landing.
Exemples :
* audit ;
* diagnostic ;
* roadmap ;
* dashboard ;
* intégration Claude ;
* système de contenu ;
* automatisations ;
* CRM ;
* analytics.

4. Exemple concret
Inclure si possible :
* schéma ;
* avant / après ;
* workflow ;
* capture ;
* exemple de dashboard ;
* exemple de restitution.

5. Pour qui
Exemples :
* PME ;
* dirigeants ;
* équipes marketing ;
* agences ;
* cabinets comptables ;
* ESN ;
* équipes commerciales ;
* équipes opérationnelles.

6. Ce que le prospect obtient
Exemples :
* audit ;
* rapport ;
* score ;
* roadmap ;
* recommandations ;
* système configuré ;
* diagnostic ;
* démonstration.

7. Preuve ou réassurance
Exemples :
* méthode Waimia ;
* démonstration ;
* capture ;
* étude de cas ;
* stack ;
* expertise Claude ;
* expertise Site Web Intelligent.

8. FAQ courte
3 à 5 questions maximum.

9. CTA principal
Exemples :
* Réserver un audit
* Démarrer le diagnostic
* Planifier un échange
* Voir la démonstration

10. CTA secondaire
Exemples :
* Lire la page service
* Voir les cas d’usage
* Consulter la méthode
* Télécharger le guide

Règles de design UX pour les landing pages
Les landing pages doivent être plus courtes que les pages SEO.
Elles doivent limiter les distractions :
* navigation réduite ou simplifiée ;
* CTA visible rapidement ;
* sections plus directes ;
* moins de liens sortants ;
* pas de mega menu obligatoire ;
* preuve rapidement visible ;
* formulaire ou prise de rendez-vous accessible sans effort.

Règles SEO des landing pages
Par défaut
Toutes les pages /lp/* sont :
* noindex
* exclues du sitemap XML principal
* canonicalisées vers une page parent si elle existe

Exception
Une page /lp/* peut devenir indexable seulement si elle respecte toutes ces conditions :
* intention de recherche unique ;
* contenu non dupliqué ;
* volume ou opportunité SEO identifiable ;
* maillage interne réel ;
* profondeur suffisante ;
* potentiel evergreen.
Dans ce cas, elle doit être déplacée hors de /lp/ vers :
* /services/*
* /cas-usages/*
* /secteurs/*
* /ressources/*

Règles de tracking
Chaque landing page doit avoir :
* source de trafic ;
* campagne ;
* CTA principal ;
* taux de conversion ;
* taux de scroll ;
* clics formulaire ;
* clics calendrier ;
* soumissions ;
* taux de qualification ;
* origine CRM.
Paramètres recommandés :
* utm_source
* utm_medium
* utm_campaign
* utm_content
* utm_term

Règles de création
Ne créer une landing page /lp/* que si elle répond à un de ces besoins :
* campagne précise ;
* segment précis ;
* douleur précise ;
* offre précise ;
* canal précis ;
* test d’angle ;
* prospection personnalisée ;
* retargeting.
Ne pas créer de landing page juste pour ajouter une URL.

Règle de priorité
Ordre de création recommandé :
1. /lp/audit-ia-pme
2. /lp/audit-site-web-intelligent
3. /lp/integrateur-claude
4. /lp/site-web-intelligent
5. /lp/diagnostic-maturite-ia
6. /lp/diagnostic-site-web-intelligent
7. landing pages sectorielles
8. landing pages par douleur métier

Résumé final
Le système complet devient :
* /services = offres durables ;
* /cas-usages = problèmes métier ;
* /secteurs = contexte métier ;
* /ressources = éducation et lead magnets indexables ;
* /blog = autorité et longue traîne ;
* /audit-* = conversion transactionnelle indexable ;
* /demonstrations = preuve et réassurance ;
* /lp = tunnels de conversion noindex ;
* /etudes-de-cas = preuve réelle.
La collection /lp/ est utile, mais elle doit rester séparée du SEO principal pour éviter la cannibalisation et la dilution.
