// Waimia · Chat-IA in-app (Φ3) · contrats PROVIDER-AGNOSTIQUES.
//
// Q1 + Q3 tranchees (docs/audits/09-chat-mcp-cadrage.md §6) : le chat ne code JAMAIS un appel LLM en
// dur. Une couche d'abstraction expose une interface commune de tool-calling ; un adapter par
// fournisseur (Anthropic, OpenAI) l'implemente. Le fournisseur ET le modele sont selectionnables par
// variable d'env, sans redeploiement de code. Ce module ne definit que les TYPES partages.
//
// 0 dependance SDK (les adapters appellent l'API REST via fetch) : 0 nouveau package, bundle leger.

/** Fournisseurs LLM supportes. Les DEUX sont disponibles en dev ET en prod (Q3). */
export type ChatProviderId = 'anthropic' | 'openai';

/** Definition d'un tool exposee au LLM (name + description + JSON Schema des parametres). */
export interface LlmToolDef {
  name: string;
  description: string;
  /** JSON Schema (objet) des parametres du tool. */
  parameters: Record<string, unknown>;
}

/** Un appel de tool decide par le LLM (forme normalisee, commune aux 2 fournisseurs). */
export interface LlmToolCall {
  /** Id opaque (tool_use.id cote Anthropic, call_id cote OpenAI) : reference le resultat au bon appel. */
  id: string;
  name: string;
  /** Arguments deja parses en objet (le JSON du LLM est deserialise par l'adapter). */
  args: Record<string, unknown>;
}

/**
 * Un tour de conversation, forme CANONIQUE independante du fournisseur. La boucle agentique
 * (run-chat.ts) maintient cet historique ; chaque adapter le convertit vers son format de fil.
 */
export type ChatTurn =
  | { role: 'user'; content: string }
  | { role: 'assistant'; content: string; toolCalls?: LlmToolCall[] }
  | { role: 'tool'; toolCallId: string; name: string; content: string };

/** Reponse normalisee d'un appel LLM. */
export interface LlmCompletion {
  /** Texte libre produit par le modele (peut coexister avec des toolCalls). */
  text: string;
  /** Appels de tools demandes par le modele (vide = reponse finale). */
  toolCalls: LlmToolCall[];
  /** 'tool_use' = le modele veut executer des tools ; 'end' = reponse finale. */
  stop: 'tool_use' | 'end';
}

/** Requete envoyee a un provider pour un appel de completion. */
export interface LlmCompletionRequest {
  system: string;
  turns: ChatTurn[];
  tools: LlmToolDef[];
  maxOutputTokens?: number;
}

/** Interface commune implementee par chaque adapter de fournisseur. */
export interface ChatProvider {
  readonly id: ChatProviderId;
  readonly model: string;
  complete(request: LlmCompletionRequest): Promise<LlmCompletion>;
}

/** Signature fetch injectable (permet de mocker la reponse HTTP du LLM dans les tests). */
export type FetchImpl = typeof fetch;

/** Configuration resolue d'un provider (lue depuis l'env par le factory). */
export interface ProviderConfig {
  provider: ChatProviderId;
  apiKey: string;
  /** Override de modele (env CHAT_LLM_MODEL) ; defaut = le plus leger de la famille. */
  model?: string;
  /** Effort de raisonnement (OpenAI GPT-5) ; defaut 'minimal'. */
  reasoningEffort?: 'minimal' | 'low' | 'medium' | 'high';
  /** fetch injectable (tests). Defaut = fetch global. */
  fetchImpl?: FetchImpl;
}

/** Erreur : le provider selectionne n'a pas de cle API configuree (mappee en HTTP 503 par l'endpoint). */
export class ProviderNotConfiguredError extends Error {
  constructor(public readonly provider: ChatProviderId) {
    super(`Aucune cle API configuree pour le fournisseur LLM « ${provider} ».`);
    this.name = 'ProviderNotConfiguredError';
  }
}
