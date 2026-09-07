// Waimia · Chat-IA in-app (Φ3) · adapter fournisseur OPENAI (Responses API, via fetch).
//
// Implemente l'interface commune ChatProvider en appelant l'API REST OpenAI /v1/responses (0 SDK).
// Convertit l'historique CANONIQUE (ChatTurn) vers le format `input` de la Responses API
// (function_call / function_call_output) et normalise la reponse en LlmCompletion.
//
// Modele par defaut (Q3, cadrage §6) = le plus leger de la famille GPT-5 supportant reasoning
// `minimal` : gpt-5-nano. Verifie via context7 (doc developers.openai.com) : la Responses API
// prend `reasoning: { effort: 'minimal' }` sur la famille GPT-5 pour prioriser la vitesse/cout.
// Modele ET effort sont surchargeables par env (CHAT_LLM_MODEL / CHAT_LLM_REASONING_EFFORT).

import type {
  ChatProvider,
  ChatTurn,
  FetchImpl,
  LlmCompletion,
  LlmCompletionRequest,
  LlmToolCall,
} from '../types';

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/responses';
/** Modele par defaut = le plus leger de la famille GPT-5 avec reasoning minimal (cout mini). */
export const DEFAULT_OPENAI_MODEL = 'gpt-5-nano';
const DEFAULT_MAX_TOKENS = 4096;

type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high';

interface OpenAiInputItem {
  type?: string;
  role?: 'user' | 'assistant' | 'system';
  content?: string;
  call_id?: string;
  name?: string;
  arguments?: string;
  output?: string;
}

/** Convertit l'historique canonique en items `input` de la Responses API. */
function toOpenAiInput(turns: ChatTurn[]): OpenAiInputItem[] {
  const input: OpenAiInputItem[] = [];
  for (const turn of turns) {
    if (turn.role === 'user') {
      input.push({ role: 'user', content: turn.content });
    } else if (turn.role === 'assistant') {
      if (turn.content) input.push({ role: 'assistant', content: turn.content });
      for (const tc of turn.toolCalls ?? []) {
        input.push({ type: 'function_call', call_id: tc.id, name: tc.name, arguments: JSON.stringify(tc.args) });
      }
    } else {
      input.push({ type: 'function_call_output', call_id: turn.toolCallId, output: turn.content });
    }
  }
  return input;
}

interface OpenAiOutputItem {
  type?: string;
  call_id?: string;
  name?: string;
  arguments?: string;
  content?: Array<{ type?: string; text?: string }>;
}

/** Cree un provider OpenAI. La cle est deja validee (non vide) par le factory. */
export function createOpenAiProvider(opts: {
  apiKey: string;
  model?: string;
  reasoningEffort?: ReasoningEffort;
  fetchImpl?: FetchImpl;
}): ChatProvider {
  const model = opts.model || DEFAULT_OPENAI_MODEL;
  const effort: ReasoningEffort = opts.reasoningEffort ?? 'minimal';
  const doFetch = opts.fetchImpl ?? fetch;

  return {
    id: 'openai',
    model,
    async complete(request: LlmCompletionRequest): Promise<LlmCompletion> {
      const body = {
        model,
        instructions: request.system,
        input: toOpenAiInput(request.turns),
        tools: request.tools.map((t) => ({
          type: 'function' as const,
          name: t.name,
          description: t.description,
          parameters: t.parameters,
        })),
        reasoning: { effort },
        max_output_tokens: request.maxOutputTokens ?? DEFAULT_MAX_TOKENS,
      };

      const res = await doFetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${opts.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => '');
        throw new Error(`OpenAI API ${res.status} : ${detail.slice(0, 500)}`);
      }

      const json = (await res.json()) as { output?: OpenAiOutputItem[]; output_text?: string };
      const output = Array.isArray(json.output) ? json.output : [];

      // Texte final : output_text si fourni, sinon concatenation des blocs output_text des messages.
      let text = typeof json.output_text === 'string' ? json.output_text : '';
      if (!text) {
        text = output
          .filter((o) => o.type === 'message' && Array.isArray(o.content))
          .flatMap((o) => (o.content ?? []).filter((c) => c.type === 'output_text' && typeof c.text === 'string').map((c) => c.text as string))
          .join('\n');
      }

      const toolCalls: LlmToolCall[] = output
        .filter((o) => o.type === 'function_call' && typeof o.call_id === 'string' && typeof o.name === 'string')
        .map((o) => ({
          id: o.call_id as string,
          name: o.name as string,
          args: parseArgs(o.arguments),
        }));

      return {
        text,
        toolCalls,
        stop: toolCalls.length > 0 ? 'tool_use' : 'end',
      };
    },
  };
}

/** Parse les arguments JSON d'un function_call (tolerant : {} si vide/illisible). */
function parseArgs(raw: string | undefined): Record<string, unknown> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
