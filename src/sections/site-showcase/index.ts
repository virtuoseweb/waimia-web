// Waimia · Co-location DS (Wave #38) · module `site-showcase` · point d'agregation.
// Reunit les 4 facettes co-localisees (schema/demo/meta/Component) en un default unique,
// contrat attendu par scripts/gen-section-aggregate.mjs (`{ id, schema, demo, meta, Component }`).

import { schema } from '@waimia/ds-kernel/sections/site-showcase/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/site-showcase/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'site-showcase' as const,
  schema,
  demo,
  meta,
  Component,
};
