// Waimia · API · /api/ds/chat (SSR, prerender=false) · chat-IA in-app du builder (Φ3).
//
// Endpoint REEL (pas dev-only, contrairement aux /api/ds/* du middleware ds-save-dev.mjs) : injecte
// par packages/apps-atelier/integration.mjs, servi en Vercel Function. Suit le pattern des routes
// API du repo (export ALL + dispatch methode, cf src/pages/api/contact.ts ; workaround bug adapter
// @astrojs/vercel@10 qui exclut `export const POST` du bundle SSR monorepo).
//
// Flux (Q4 scope v1) : POST prompt+historique -> config provider (Q1/Q3, Anthropic OU OpenAI selon
// env, jamais en dur) -> plafond 50/jour (Q2) -> boucle agentique (le LLM decide quels tools MCP
// appeler, execution reelle in-process) -> renvoie texte + PageDocument (applique au canvas) + usage.
//
// Cles LLM ABSENTES en env aujourd'hui (verifie `vercel env ls`) : si la cle du provider selectionne
// est absente/vide, l'endpoint renvoie 503 { error:'CHAT_PROVIDER_NOT_CONFIGURED' } -- JAMAIS un 500
// silencieux ni un crash. Env a ajouter dans Vercel pour rendre la feature live : cf rapport / §.
//
// 0 nouveau token DS, 0 valeur en dur metier, 0 tiret cadratin U+2014.

import type { APIRoute } from 'astro';
import { createProvider, resolveProviderConfig, defaultModelFor } from '../../../lib/chat/provider';
import { runChatTurn } from '../../../lib/chat/run-chat';
import { createUsageStore } from '../../../lib/chat/usage';
import { ProviderNotConfiguredError, type ChatTurn } from '../../../lib/chat/types';

export const prerender = false;

/** Env lu via import.meta.env (memes conventions que resend.ts / mailerlite.ts). */
function readEnv() {
  const limitRaw = import.meta.env.CHAT_DAILY_LIMIT;
  const limitParsed = typeof limitRaw === 'string' ? Number.parseInt(limitRaw, 10) : Number(limitRaw);
  return {
    provider: import.meta.env.CHAT_LLM_PROVIDER as string | undefined,
    anthropicApiKey: import.meta.env.ANTHROPIC_API_KEY as string | undefined,
    openaiApiKey: import.meta.env.OPENAI_API_KEY as string | undefined,
    model: import.meta.env.CHAT_LLM_MODEL as string | undefined,
    reasoningEffort: import.meta.env.CHAT_LLM_REASONING_EFFORT as string | undefined,
    dailyLimit: Number.isFinite(limitParsed) && limitParsed > 0 ? limitParsed : undefined,
    redisUrl: import.meta.env.UPSTASH_REDIS_REST_URL as string | undefined,
    redisToken: import.meta.env.UPSTASH_REDIS_REST_TOKEN as string | undefined,
  };
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

/** Convertit les messages du client ({role, content}) en historique canonique (user/assistant). */
function toTurns(messages: Array<{ role?: unknown; content?: unknown }>): ChatTurn[] {
  const turns: ChatTurn[] = [];
  for (const m of messages) {
    const content = typeof m.content === 'string' ? m.content : '';
    if (!content) continue;
    if (m.role === 'assistant') turns.push({ role: 'assistant', content });
    else turns.push({ role: 'user', content });
  }
  return turns;
}

export const ALL: APIRoute = async ({ request }) => {
  const env = readEnv();
  const config = resolveProviderConfig({
    provider: env.provider,
    anthropicApiKey: env.anthropicApiKey,
    openaiApiKey: env.openaiApiKey,
    model: env.model,
    reasoningEffort: env.reasoningEffort,
  });
  const usageStore = createUsageStore({
    redisUrl: env.redisUrl,
    redisToken: env.redisToken,
    limit: env.dailyLimit,
  });

  // ── GET : etat pour le dashboard/UI (config + compteur d'usage), sans consommer de quota ──
  if (request.method === 'GET') {
    const usage = await usageStore.get();
    return json({
      ok: true,
      configured: config.configured,
      provider: config.provider,
      model: config.model ?? defaultModelFor(config.provider),
      usage,
    });
  }

  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'GET, POST' } });
  }

  // ── POST : un tour de chat ──
  let payload: { messages?: unknown; maxSteps?: unknown } | null = null;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'INVALID_JSON', message: 'Corps de requete JSON invalide.' }, 400);
  }

  const messages = Array.isArray(payload?.messages) ? (payload!.messages as Array<{ role?: unknown; content?: unknown }>) : [];
  const turns = toTurns(messages);
  if (turns.length === 0 || turns[turns.length - 1].role !== 'user') {
    return json(
      { ok: false, error: 'INVALID_MESSAGES', message: 'messages doit finir par un message utilisateur non vide.' },
      400,
    );
  }

  // Garde-fou config (Q1/Q3) : provider selectionne sans cle -> 503 explicite (jamais un 500 muet).
  if (!config.configured) {
    return json(
      {
        ok: false,
        error: 'CHAT_PROVIDER_NOT_CONFIGURED',
        provider: config.provider,
        message: `Le fournisseur LLM « ${config.provider} » n'a pas de cle API configuree en environnement.`,
      },
      503,
    );
  }

  // Plafond dur 50/jour (Q2) : on lit AVANT d'appeler le LLM (evite un appel facture au-dela du plafond).
  const before = await usageStore.get();
  if (before.used >= before.limit) {
    return json(
      { ok: false, error: 'CHAT_DAILY_LIMIT_REACHED', usage: before, message: `Plafond quotidien atteint (${before.limit}/jour).` },
      429,
    );
  }

  const maxSteps = typeof payload?.maxSteps === 'number' && payload.maxSteps > 0 ? Math.min(payload.maxSteps, 10) : undefined;

  try {
    const provider = createProvider({
      provider: config.provider,
      apiKey: config.apiKey,
      model: config.model,
      reasoningEffort: config.reasoningEffort,
    });
    const result = await runChatTurn({ provider, turns, maxSteps });
    const usage = await usageStore.increment();

    return json({
      ok: true,
      provider: config.provider,
      model: provider.model,
      text: result.text,
      toolTrace: result.toolTrace,
      pageDocument: result.pageDocument,
      pageValid: result.pageValid,
      steps: result.steps,
      stopped: result.stopped,
      usage,
    });
  } catch (err) {
    if (err instanceof ProviderNotConfiguredError) {
      return json({ ok: false, error: 'CHAT_PROVIDER_NOT_CONFIGURED', provider: err.provider, message: err.message }, 503);
    }
    console.error('[api/ds/chat] upstream error', err);
    return json(
      { ok: false, error: 'CHAT_UPSTREAM_ERROR', message: err instanceof Error ? err.message : String(err) },
      502,
    );
  }
};
