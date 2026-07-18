// Waimia · Co-location DS · module `closing-cta-band` · point d'agregation.
// Contrat attendu par scripts/gen-section-aggregate.mjs : { id, schema, demo, meta, Component }.
import { schema } from '@waimia/ds-kernel/sections/closing-cta-band/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/closing-cta-band/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'closing-cta-band' as const,
  schema,
  demo,
  meta,
  Component,
};
