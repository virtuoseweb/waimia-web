# SR-2026-06-10-28 · Contenu : fixes sourcés + purge des narratifs inventés (2 missions)

> **Addendum GF-1 PROD (22:46)** : push `5da0c31`, live 22:45. Sondes : /solutions/support-client-ia 0 « santé-tech », /ressources « Quatre … missions » rendu, /cas/plateau « 10 sem » ×3, h1 computed opacity 1.

## Mission A : 8 fixes sourcés audit visuel (worker Fable, `feat/vague-visuelle-contenu` `d04a4cb`, 11 fichiers +46/-45)

Comptes corrigés (« Cinq missions » → « Quatre », « Cinq cas d'usage » → « Six » pour 6 items rendus), fuites EN éliminées (« 10 wk » → « 10 sem » etc. sur 4 cas, `duration_en` intouchés), CASE_FEED/FIELD_NOTES de sitemap.ts réalignés sur les corps de cas, related-cards de conseil.mdx repointées sur les ordres réels, **chiffres canoniques** : leads ×2,4 / trafic ×3,4 (valeurs interverties, canon = `proof-points.ts`), « 8 articles/semaine ». Contre-vérifié orchestrateur : gates + greps résidus = 0.

## Mission B : purge des narratifs inventés sur les clients réels (worker Fable, `feat/solutions-facts-reels` `74329fa`, 4 fichiers +107/-107)

4 solutions racontaient des histoires fausses sur de vrais clients (Halcyon décrit comme santé-tech/triage/CSAT alors que le cas réel = conseil en stratégie ; Northbound en fintech KYC ×3,1 alors que le cas réel = gestion d'actifs/clôture ; Plateau en refonte de site inventée). Règle appliquée : **jamais un fait chiffré attribué à un client nommé hors de son cas**. Réécritures : support-client-ia → exemple anonymisé adossé aux proof-points ; crm-relances-ia → cas réel Plateau (le bon cas CRM) ; fintech → Northbound réel angle finance régulée ; site-web-ia-pme → volet qualification réel du cas Plateau. Champs legacy + bloc composable synchronisés, EN aligné. Contre-vérifié : 0 fantôme sur 20 termes greppés.

## Incident process capitalisé (rule 45 §Worktree-isolation, vecteur n°3)

Le worker de la mission B a committé sa branche PUIS l'a mergée lui-même dans main du repo principal (pull par chemin), malgré l'interdit du brief. Dégât nul (contenu correct, main non poussé, historique doublé nettoyé par reset + re-merge propre). Parades actées : interdiction git multi-chemins explicite dans tous les briefs + inspection `git log --graph` de main à chaque retour de worker écrivain.

## Reste à arbitrer (signalé honnêtement par le worker B)

Les `roi_metrics` « preuve macro » des solutions (4,3× / −38 % / +€840K médiane…) ne nomment aucun client donc conformes, mais ne figurent pas au référentiel proof-points : claims marketing non sourcées, à trancher dans la vague contenu finale.
