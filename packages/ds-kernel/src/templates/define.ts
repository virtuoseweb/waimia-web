// @waimia/ds-kernel · Moteur « template-as-data » · defineTemplate.
// Identité typée : sert de point d'ancrage à l'inférence + de façade stable
// (permet d'ajouter validation/normalisation plus tard sans changer les appels).

import type { TemplateContext, TemplateDefinition } from './types';

export function defineTemplate<C extends TemplateContext<unknown>>(
  def: TemplateDefinition<C>,
): TemplateDefinition<C> {
  return def;
}
