// @waimia/atelier-ui · chat · types PURS du panneau chat-IA in-app (Φ3).
//
// Le panneau (ChatPanel) est un composant PUR props-driven : l'hote app (BuilderHost) porte le fetch
// vers /api/ds/chat, l'application du PageDocument au canvas et l'etat d'usage. Ce module ne definit
// que le contrat de props (aucun fetch, aucun import app).
//
// 0 token DS, 0 valeur en dur, 0 tiret cadratin U+2014.

/** Une entree de trace de tool executee par la boucle agentique (affichee sous la reponse). */
export interface ChatToolTraceItem {
  name: string;
  ok: boolean;
}

/** Un message de la conversation affiche dans le panneau. */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  /** Trace des tools MCP appeles pour produire ce message (assistant uniquement). */
  toolTrace?: ChatToolTraceItem[];
  /** true = ce message assistant a produit un PageDocument applique au canvas. */
  applied?: boolean;
}

/** Compteur d'usage quotidien (plafond dur 50/jour, Q2). */
export interface ChatUsage {
  used: number;
  limit: number;
  /** true = compteur durable (Upstash) ; false = best-effort en memoire. */
  durable?: boolean;
}

/** Phase de l'interaction chat. */
export type ChatPhase = 'idle' | 'thinking' | 'error';
