// Waimia · Chat-IA in-app (Φ3) · FACTORY provider-agnostique.
//
// Q1 + Q3 (cadrage §6) : un vrai commutateur configurable, pas un appel LLM en dur. Ce factory
// resout la config d'env en un ChatProvider concret (Anthropic OU OpenAI). Si la cle du fournisseur
// selectionne est absente/vide -> ProviderNotConfiguredError (l'endpoint la mappe en HTTP 503, jamais
// un 500 silencieux).

import { createAnthropicProvider, DEFAULT_ANTHROPIC_MODEL } from './providers/anthropic';
import { createOpenAiProvider, DEFAULT_OPENAI_MODEL } from './providers/openai';
import {
  ProviderNotConfiguredError,
  type ChatProvider,
  type ChatProviderId,
  type ProviderConfig,
} from './types';

/** Valeurs d'env brutes lues par l'endpoint (via import.meta.env, cf resend/mailerlite). */
export interface ChatEnv {
  provider?: string;
  anthropicApiKey?: string;
  openaiApiKey?: string;
  model?: string;
  reasoningEffort?: string;
}

/** Normalise un identifiant de fournisseur (defaut anthropic si absent/inconnu). */
export function normalizeProviderId(raw: string | undefined): ChatProviderId {
  return raw && raw.trim().toLowerCase() === 'openai' ? 'openai' : 'anthropic';
}

/**
 * Resout la config d'env en ProviderConfig. Ne jette PAS ici (la validation de cle se fait dans
 * createProvider) : retourne { provider, configured, apiKey } pour que l'appelant puisse decider
 * (503 config manquante vs. appel reel).
 */
export function resolveProviderConfig(env: ChatEnv): {
  provider: ChatProviderId;
  apiKey: string;
  configured: boolean;
  model?: string;
  reasoningEffort?: ProviderConfig['reasoningEffort'];
} {
  const provider = normalizeProviderId(env.provider);
  const apiKeyRaw = provider === 'openai' ? env.openaiApiKey : env.anthropicApiKey;
  const apiKey = typeof apiKeyRaw === 'string' ? apiKeyRaw.trim() : '';
  const effort = env.reasoningEffort?.trim();
  const validEfforts = ['minimal', 'low', 'medium', 'high'] as const;
  const reasoningEffort = validEfforts.includes(effort as never)
    ? (effort as ProviderConfig['reasoningEffort'])
    : undefined;
  return {
    provider,
    apiKey,
    configured: apiKey.length > 0,
    model: env.model?.trim() || undefined,
    reasoningEffort,
  };
}

/** Modele par defaut affiche/documente pour un fournisseur (sans instancier). */
export function defaultModelFor(provider: ChatProviderId): string {
  return provider === 'openai' ? DEFAULT_OPENAI_MODEL : DEFAULT_ANTHROPIC_MODEL;
}

/**
 * Construit un ChatProvider concret. Jette ProviderNotConfiguredError si la cle est absente/vide
 * (mappee en HTTP 503 par l'endpoint). fetchImpl injectable pour les tests.
 */
export function createProvider(config: ProviderConfig): ChatProvider {
  if (!config.apiKey || config.apiKey.trim().length === 0) {
    throw new ProviderNotConfiguredError(config.provider);
  }
  if (config.provider === 'openai') {
    return createOpenAiProvider({
      apiKey: config.apiKey,
      model: config.model,
      reasoningEffort: config.reasoningEffort,
      fetchImpl: config.fetchImpl,
    });
  }
  return createAnthropicProvider({
    apiKey: config.apiKey,
    model: config.model,
    fetchImpl: config.fetchImpl,
  });
}
