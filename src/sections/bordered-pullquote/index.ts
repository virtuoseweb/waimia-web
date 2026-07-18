// Waimia · Co-location DS · module `bordered-pullquote` · point d'agregation.
// Contrat attendu par scripts/gen-section-aggregate.mjs : { id, schema, demo, meta, Component }.
import { schema } from '@waimia/ds-kernel/sections/bordered-pullquote/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/bordered-pullquote/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'bordered-pullquote' as const,
  schema,
  demo,
  meta,
  Component,
};
