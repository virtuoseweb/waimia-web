# Prochain chantier — Consolidation documentaire + nettoyage repo

> Instruction copy-paste pour Claude Code. Chantier sûr, borné, sans risque produit :
> on termine la mise au propre de la base avant la chirurgie SEO du site.

---

```
CONTEXTE
Tu reprends le repo waimia-web (Astro 6, site waimia.com, prod LIVE). La documentation
vient d'être réorganisée et auditée en profondeur. Lis EN PREMIER, dans l'ordre :
1. CLAUDE.md (racine) — garde-fous GF-1..GF-6 + règles projet (non négociable).
2. docs/README.md — index maître (carte des docs, board des chantiers, sources de vérité).
Trois manifestes pilotent CE chantier (à exécuter puis supprimer) :
- docs/CONSOLIDATION-MANIFEST.md  (fusion / MAJ / archivage du contenu des docs)
- docs/REPO-CLEANUP-MANIFEST.md   (nettoyage repo-wide : racine, ONBOARDING, etc.)
- docs/state/01-chantiers.md §f-ter (corrections factuelles à appliquer)

OBJECTIF
Passer de ~62 docs à ~25 docs vivants clairement répartis, le reste archivé (consultable,
hors chemin par défaut). Repo racine propre. Zéro contenu perdu (les actions résiduelles
sont déjà remontées dans state/01 §f-bis/f-ter). Aucune contradiction factuelle restante.

BRANCHE
feat/docs-consolidation  (jamais sur main ; 1 commit par lot ; git mv pour préserver l'historique)

TÂCHES (ordre)
1. CONSOLIDATION (docs/CONSOLIDATION-MANIFEST.md) :
   a. Archiver les 32 docs listés → docs/archive/ (toute cartography/, 12 audits, 3 DS,
      architecture/05, state/42). 1 commit/lot par dossier.
   b. Fusions §2 : 50→52 (extraire la procédure technique avant d'archiver 50), 07→06,
      dédup env vars 09/10, 46+47→annexes de 45, DS-COHERENCE+00→28, audits/25→audit-refonte/editorial.
   c. Déplacer design-system/48-ECOSYSTEM-PARTNERS → docs/specs/ (c'est une feature, pas du DS).
2. CORRECTIONS FACTUELLES (state/01 §f-ter) — PRIORITAIRES :
   - architecture/03-integrations : output:'server' → 'static' (FAUX aujourd'hui).
   - architecture/01 + 05 : Pages CMS → TinaCMS (réf architecture/36).
   - architecture/10 : projet Vercel waimia-v2 → waimia-web.
   - architecture/03 : author inline → reference('authors').
   - strategy/05 : « static à venir » → fait ; apps/web/ → src/.
3. NETTOYAGE REPO (docs/REPO-CLEANUP-MANIFEST.md) :
   - rm les ~52 images-preuves à la racine (gitignorées, non trackées, régénérables).
   - git mv ONBOARDING.md → docs/archive/ONBOARDING-florentin.md (périmé).
   - README.md racine : ajouter en tête le pointeur vers docs/README.md.
   - session-reports/ : garder README + les 5 derniers SR, le reste → session-reports/archive/.
   - tasks/ : LIVE = ORCH-STATE.md, lessons.md, todo.md ; le reste → tasks/archive/.
   - visual-audit/ : NE PAS toucher au contenu (mémoire visuelle) ; son README/protocole est déjà posé.
4. MAJ INDEX :
   - docs/README.md §3 (compteurs dossiers : cartography/ vidé, audits/ = 2) + sources de vérité.
   - grep -rn "docs/" CLAUDE.md README.md docs/README.md tasks → corriger tous les liens déplacés.
5. NETTOYAGE FINAL : supprimer les 3 manifestes (CONSOLIDATION, REPO-CLEANUP, ce fichier)
   une fois leurs actions exécutées.

GARDE-FOUS (CLAUDE.md)
- GF-1 preuve empirique : après chaque lot, astro check (0 erreur) + npx -y pnpm@9.15.0 build
  (→ Complete!). « ça build » est la preuve que rien n'est cassé (docs non importés mais les
  corrections factuelles touchent de la doc lue par toi, pas le code — vérifier quand même).
- git mv (jamais rm sur du suivi) sauf les images racine non trackées.
- 1 scope = 1 lot = 1 commit ; jamais git add -A global.
- Ne PAS toucher au contenu du site (pages/collections) : c'est le chantier SUIVANT (strategy/02).
- Ne PAS merger sur main : pousser feat/docs-consolidation, Simon valide.

CRITÈRE DE FIN
- build vert + astro check 0 erreur.
- cartography/ vidé, audits/ = {22, 23-tokens}, ~25 docs vivants.
- racine repo : plus aucune image-preuve, seuls CLAUDE.md/README.md/CONTRIBUTING.md en .md.
- 0 lien doc cassé (grep), README.md à jour, 0 contradiction factuelle (output static, TinaCMS).
- les 3 manifestes supprimés.
```

---

## Chantier SUIVANT (après celui-ci) — pour mémoire
Exécution de `strategy/02` (suppression du fictif/thin → base propre du site) :
suppressions Niveau A→I, méga-menu resserré, assainissement identité véridique, création
pages légales + cas réels. Les H1 du pilier se figent via une passe keyword **gratuite**
(SERP/autocomplete/Trends/Keyword Planner + validation GSC post-lancement — `strategy/01 §7`,
`strategy/03`), **sans aucun outil payant**. Rien n'est bloqué. Instruction dédiée à préparer.
