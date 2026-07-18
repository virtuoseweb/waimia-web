// Waimia · Co-location DS · module `curriculum-timeline` · point d'agregation.
// Contrat attendu par scripts/gen-section-aggregate.mjs : { id, schema, demo, meta, Component }.
import { schema } from '@waimia/ds-kernel/sections/curriculum-timeline/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/curriculum-timeline/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'curriculum-timeline' as const,
  schema,
  demo,
  meta,
  Component,
};
