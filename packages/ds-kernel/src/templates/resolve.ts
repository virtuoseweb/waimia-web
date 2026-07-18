// @waimia/ds-kernel · Moteur « template-as-data » · resolveTemplate.
//
// Transforme une définition de template + un contexte de page en une liste ORDONNÉE
// d'items résolus (sections cataloguées + emplacements nommés), en filtrant les blocs
// par `when`. Aucune connaissance du rendu : la couche app mappe chaque item vers son
// composant (registry) ou son markup de slot.

import type {
  BuildOutput,
  ResolvedItem,
  TemplateContext,
  TemplateDefinition,
} from './types';

function toResolved(out: BuildOutput, key: string): ResolvedItem {
  if ('slot' in out) {
    return { kind: 'slot', key, name: out.slot, props: out.props };
  }
  if ('section' in out) {
    return { kind: 'section', key, section: out.section, props: out.props };
  }
  // Section nue.
  return { kind: 'section', key, section: out };
}

export function resolveTemplate<C extends TemplateContext<unknown>>(
  def: TemplateDefinition<C>,
  ctx: C,
): ResolvedItem[] {
  const items: ResolvedItem[] = [];

  def.sections.forEach((builder, i) => {
    if (builder.when && !builder.when(ctx)) return;

    const built = builder.build(ctx);
    const baseKey = `${def.id}:${builder.id ?? 'block'}:${i}`;

    if (Array.isArray(built)) {
      built.forEach((out, j) => items.push(toResolved(out, `${baseKey}:${j}`)));
    } else {
      items.push(toResolved(built, baseKey));
    }
  });

  return items;
}
