# 09 — Cadrage chat-IA in-app (Φ3, builder V3)

> Périmètre : la brique « chat MCP » du board `P4.4-e (suite) — V3 : pipeline 4 vues + chat MCP`.
> Les 4 vues sont soldées (dashboard, sitemap réel, editor wireframe+design, style — PR #44). Cette
> brique reste : le chat-IA in-app décrit dans `docs/specs/05` (messages 1, 4, 5) et `docs/specs/06`
> §3 IN(4), §7 Φ3. **0 ligne de code tant que les points §2 ne sont pas tranchés** (même discipline
> que l'arbitrage `{ref}` de l'audit 08 : options posées, décision Simon avant implémentation).

## 1. Ce qui distingue cette brique des 3 précédentes (props gap, écran style, sandboxes)

Les 3 bricks livrés cette session (PR #42/#43/#44) réutilisaient des mécanismes existants (endpoints
`ds-save-dev`, tools MCP, tokens DS) sans introduire de nouvelle dépendance externe ni de coût
récurrent. Le chat-IA in-app est différent : **il a besoin d'un cerveau LLM qui décide quels tools MCP
appeler à partir d'un prompt utilisateur**. Ce n'est pas un détail d'implémentation, c'est une
dépendance produit nouvelle (appel API facturé, clé à gérer, latence, gestion d'erreur/timeout).
Doc06 §3 le liste bien en scope v1, mais §11 (décisions ouvertes) ne couvre que le périmètre Φ5 —
**le modèle de coût/hébergement du chat n'a jamais été tranché**, à combler ici.

## 2. Option d'architecture — qui porte le LLM, qui porte le coût

### A. Proxy serveur vers l'API Anthropic (recommandé v1)
Un endpoint `/api/ds/chat` (SSR, `prerender=false`, même famille que `ds-save-dev.mjs`) reçoit le
prompt + l'historique de conversation, appelle l'API Anthropic (`claude-sonnet-5` ou `claude-haiku-4-5`
selon le coût visé) avec un system prompt scopé + les 8 tools MCP exposés comme *tool definitions*
Anthropic, exécute les tool calls réellement (via les mêmes fonctions que `mcp/waimia-catalogue-server.mjs`,
pas un second MCP stdio — appel direct in-process pour éviter la latence d'un sous-process), boucle
jusqu'à réponse finale, renvoie au client.
- **Coût** : porté par Simon (clé API dans les env Vercel, jamais exposée client). Facturé à l'usage
  Anthropic (tokens in/out). Nécessite un plafond dur (rate-limit par session/jour) pour éviter une
  dérive de coût si l'outil est laissé ouvert.
- **Sécurité** : clé jamais exposée au navigateur (le pattern `ds-save-dev.mjs` le fait déjà pour
  d'autres endpoints dev-only ; ici l'endpoint doit être accessible en usage normal, pas dev-only —
  à distinguer : garde d'auth différente de « keyword + refus main »).
- **Avantage** : UX la plus proche de la vision Lovable (in-app, pas de setup pour l'utilisateur interne).

### B. Bring-your-own-key (chaque utilisateur fournit sa clé Anthropic/OpenAI)
Le client stocke sa propre clé (localStorage ou champ de config), l'appel API part du navigateur ou
d'un proxy qui relaie sans la stocker.
- **Coût** : 0 pour Simon, porté par chaque utilisateur.
- **Inconvénient** : friction énorme pour l'équipe interne (doc05 dit explicitement que l'IA doit être
  « facultative mais fluide », pas un obstacle de setup) ; inadapté à un futur client qui hérite du
  projet sans compte API.

### C. Piloter uniquement via IA externe (Claude Code / Claude.ai / ChatGPT connecté au MCP)
Pas de chat in-app du tout pour le moment : le serveur MCP `waimia-catalogue-server.mjs` (déjà 8 tools,
GF-1'd) est la seule surface, utilisée depuis Claude Code ou un client MCP externe. C'est **exactement
Φ4** (« pilotage IA externe »), déjà livré à 100 % côté serveur.
- **Coût** : 0 nouveau (le coût existe déjà, sur l'abonnement Claude/OpenAI de l'utilisateur externe).
- **Inconvénient** : ne répond pas à la demande explicite doc05 msg 1 (« chat type Lovable **in-app** »)
  ni à la vision doc06 §3 IN(4). Reporterait le vrai chat in-app à une session ultérieure.

## 3. Recommandation

**A pour le v1**, avec un garde-fou de coût dur dès le premier commit (pas une optimisation différée) :
- Modèle par défaut **Haiku** (coût mini) pour la boucle agentique, avec option de bascule Sonnet
  seulement si Haiku s'avère insuffisant pour le raisonnement de composition.
- Plafond explicite (ex. N messages/jour en dev, désactivé par défaut en prod tant que le produit
  n'est pas destiné à un client externe) — miroir du garde-fou keyword des endpoints `ds-save-dev`.
- Scope v1 **délibérément réduit** vs la vision complète doc05 msg 5 (Lovable) : prompt → tool calls
  → preview live. **Hors v1** : toolbar select/edit-inline/annotate dans la preview, sélection→contexte
  chat, modes plan/build distincts, chips d'actions post-génération, références inter-projets. Ces
  raffinements UX sont Φ3.2, pas un blocker du premier chat fonctionnel.

## 4. Questions pour arbitrage Simon (bloquant avant tout code)

1. **Modèle de coût** : Option A (clé Anthropic sur ton compte, usage facturé à toi) confirmée, ou
   préfères-tu explorer B/C d'abord le temps de mesurer un usage réel ?
2. **Plafond d'usage** : un plafond dur en dev (ex. 50 messages/jour) est-il acceptable, ou faut-il un
   mécanisme plus fin (compteur visible dans le dashboard atelier) dès le v1 ?
3. **Modèle LLM** : Haiku par défaut (moins cher, peut sous-performer sur des compositions complexes)
   ou Sonnet par défaut (meilleure qualité, coût plus élevé par appel) ?
4. **Scope v1 confirmé** : le périmètre réduit (§3, prompt→tool calls→preview, sans toolbar
   interactive) est-il le bon point de départ, ou un sous-ensemble encore plus petit est-il préférable
   (ex. juste « générer une page depuis une description », sans conversation multi-tour) ?

## 5. Ce que ce document n'autorise pas

Comme l'audit 08 avant lui : aucune ligne de code applicative sur cette brique tant que la section 4
n'est pas tranchée. Les 3 bricks déjà livrées cette session (props gap MCP, écran style, sandboxes
P2.2) restent indépendantes et ne sont pas concernées par ce gel.

## 6. Décisions Simon (2026-07-21)

- **Q2 (plafond d'usage)** — TRANCHÉ : les deux mécanismes, pas un choix exclusif. Compteur visible
  dans le dashboard atelier **et** plafond dur 50 messages/jour dès le v1.
- **Q4 (scope v1)** — TRANCHÉ : le périmètre réduit du §3 (prompt → tool calls → preview, sans
  toolbar interactive) confirmé comme point de départ.
- **Q1 (modèle de coût/architecture)** — TRANCHÉ partiellement : garder les **3 options A/B/C du §2
  disponibles/configurables** plutôt qu'un choix figé unique (pas seulement A comme recommandé au §3).
  Implique un point d'abstraction entre le chat et le "backend LLM" dès la conception, pas une
  intégration Anthropic-only en dur.
- **Q3 (modèle LLM)** — **AMBIGU, à clarifier avant code sur CE point précis uniquement** : la réponse
  cite littéralement « haiku » (correspond au mot utilisé au §3 pour le défaut recommandé), mais le
  même message ouvre aussi par « utilise l'API OpenAI avec le modèle léger, effort minimum, pour
  économiser les coûts API lors du dev » — une mention qui peut vouloir dire (a) remplacer Anthropic
  par OpenAI comme fournisseur du chat-MCP, (b) utiliser OpenAI seulement pendant le dev/test de la
  feature (économie d'itération) alors que la prod reste Haiku, ou (c) autre chose. Question posée à
  Simon en direct plutôt que de trancher au hasard entre deux architectures aux implications différentes
  (clé API, endpoint, coût, sécurité). **Le reste (Q1/Q2/Q4 + l'architecture "3 options configurables")
  peut avancer immédiatement** ; seul le choix précis du fournisseur/modèle LLM par défaut reste gelé.
