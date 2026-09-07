// Waimia · Chat-IA in-app (Φ3) · adapter fournisseur ANTHROPIC (Messages API, via fetch).
//
// Implemente l'interface commune ChatProvider en appelant l'API REST Anthropic (0 SDK). Convertit
// l'historique CANONIQUE (ChatTurn) vers le format de fil Anthropic (blocs text / tool_use /
// tool_result) et normalise la reponse en LlmCompletion. Modele par defaut = le plus leger de la
// famille (Haiku, Q3). fetch injectable pour les tests (mock de la reponse HTTP du LLM).

import type {
  ChatProvider,
  ChatTurn,
  FetchImpl,
  LlmCompletion,
  LlmCompletionRequest,
  LlmToolCall,
} from '../types';

const ANTHROPIC_ENDPOINT = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';
/** Modele par defaut = le plus leger de la famille Anthropic (cout mini, cf cadrage §6 Q3). */
export const DEFAULT_ANTHROPIC_MODEL = 'claude-haiku-4-5';
const DEFAULT_MAX_TOKENS = 4096;

interface AnthropicBlock {
  type: string;
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
  tool_use_id?: string;
  content?: unknown;
}

interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: AnthropicBlock[];
}

/** Convertit l'historique canonique en messages Anthropic (fusionne les tool_result consecutifs). */
function toAnthropicMessages(turns: ChatTurn[]): AnthropicMessage[] {
  const messages: AnthropicMessage[] = [];
  for (const turn of turns) {
    if (turn.role === 'user') {
      messages.push({ role: 'user', content: [{ type: 'text', text: turn.content }] });
    } else if (turn.role === 'assistant') {
      const content: AnthropicBlock[] = [];
      if (turn.content) content.push({ type: 'text', text: turn.content });
      for (const tc of turn.toolCalls ?? []) {
        content.push({ type: 'tool_use', id: tc.id, name: tc.name, input: tc.args });
      }
      // Un tour assistant sans contenu ni tool ne doit pas produire un bloc vide.
      if (content.length > 0) messages.push({ role: 'assistant', content });
    } else {
      // tool : tous les tool_result consecutifs vont dans UN seul message user (contrainte Anthropic).
      const block: AnthropicBlock = { type: 'tool_result', tool_use_id: turn.toolCallId, content: turn.content };
      const last = messages[messages.length - 1];
      if (last && last.role === 'user' && last.content.every((b) => b.type === 'tool_result')) {
        last.content.push(block);
      } else {
        messages.push({ role: 'user', content: [block] });
      }
    }
  }
  return messages;
}

/** Cree un provider Anthropic. La cle est deja validee (non vide) par le factory. */
export function createAnthropicProvider(opts: {
  apiKey: string;
  model?: string;
  fetchImpl?: FetchImpl;
}): ChatProvider {
  const model = opts.model || DEFAULT_ANTHROPIC_MODEL;
  const doFetch = opts.fetchImpl ?? fetch;

  return {
    id: 'anthropic',
    model,
    async complete(request: LlmCompletionRequest): Promise<LlmCompletion> {
      const body = {
        model,
        max_tokens: request.maxOutputTokens ?? DEFAULT_MAX_TOKENS,
        system: request.system,
        tools: request.tools.map((t) => ({
          name: t.name,
          description: t.description,
          input_schema: t.parameters,
        })),
        messages: toAnthropicMessages(request.turns),
      };

      const res = await doFetch(ANTHROPIC_ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': opts.apiKey,
          'anthropic-version': ANTHROPIC_VERSION,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`Anthropic API ${res.status} : ${detail.slice(0, 500)}`);
      }

      const json = (await res.json()) as { content?: AnthropicBlock[]; stop_reason?: string };
      const blocks = Array.isArray(json.content) ? json.content : [];
      const text = blocks
        .filter((b) => b.type === 'text' && typeof b.text === 'string')
        .map((b) => b.text as string)
        .join('\n');
      const toolCalls: LlmToolCall[] = blocks
        .filter((b) => b.type === 'tool_use' && typeof b.id === 'string' && typeof b.name === 'string')
        .map((b) => ({ id: b.id as string, name: b.name as string, args: (b.input ?? {}) as Record<string, unknown> }));

      return {
        text,
        toolCalls,
        stop: toolCalls.length > 0 || json.stop_reason === 'tool_use' ? 'tool_use' : 'end',
      };
    },
  };
}
