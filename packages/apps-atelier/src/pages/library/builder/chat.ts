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

/**
 * BYOK : lit la cle et le fournisseur dans les EN-TETES de la requete (jamais l'URL/query/cookie).
 * Si presents, ils prennent le pas sur la cle serveur pour CETTE requete uniquement (cf provider.ts).
 */
function readKeyOverride(request: Request): { provider?: string; apiKey?: string } {
  return {
    provider: request.headers.get('x-chat-provider') ?? undefined,
    apiKey: request.headers.get('x-chat-api-key') ?? undefined,
  };
}

/**
 * Filet de securite : ne JAMAIS ecrire une cle API dans un log. Retire la cle exacte utilisee
 * (BYOK ou env) + tout token Bearer / sk-... d'une chaine avant journalisation. La valeur du secret
 * n'est deja jamais posee dans nos erreurs (elle ne vit que dans les en-tetes des adapters) ; cette
 * redaction couvre le cas ou une API amont l'echoerait.
 */
function redactSecrets(msg: string, apiKey: string): string {
  let out = msg;
  if (apiKey && apiKey.length >= 8) out = out.split(apiKey).join('[redacted-key]');
  return out
    .replace(/Bearer\s+[A-Za-z0-9._-]+/gi, 'Bearer [redacted]')
    .replace(/sk-[A-Za-z0-9._-]{8,}/g, 'sk-[redacted]');
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
  // BYOK (en-tetes) : si une cle est fournie par le navigateur, elle prend le pas sur la cle d'env
  // pour cette requete uniquement. Absente => flux existant inchange (cle serveur).
  const override = readKeyOverride(request);
  const config = resolveProviderConfig(
    {
      provider: env.provider,
      anthropicApiKey: env.anthropicApiKey,
      openaiApiKey: env.openaiApiKey,
      model: env.model,
      reasoningEffort: env.reasoningEffort,
    },
    override,
  );
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
      // 'byok' = une cle du navigateur est active pour cette requete ; 'env' = cle serveur. Permet
      // a l'ecran Reglages de confirmer que ses en-tetes sont bien pris en compte (sans divulguer la cle).
      source: config.source,
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
    // Logue le fournisseur + la SOURCE de la cle (env|byok), jamais la valeur de la cle : la clef
    // exacte (et tout token amont echoue) est retiree du message avant journalisation.
    const rawMessage = err instanceof Error ? err.message : String(err);
    const safeMessage = redactSecrets(rawMessage, config.apiKey);
    console.error('[api/ds/chat] upstream error', {
      provider: config.provider,
      source: config.source,
      message: safeMessage,
    });
    return json({ ok: false, error: 'CHAT_UPSTREAM_ERROR', message: safeMessage }, 502);
  }
};
