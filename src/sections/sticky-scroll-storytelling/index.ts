// Waimia · Co-location DS (#80) · module `sticky-scroll-storytelling` · point d'agrégation.
// Réunit les 4 facettes co-localisées (schema/demo/meta/Component) en un default unique,
// contrat attendu par scripts/gen-section-aggregate.mjs (`{ id, schema, demo, meta, Component }`).

import { schema } from '@waimia/ds-kernel/sections/sticky-scroll-storytelling/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/sticky-scroll-storytelling/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'sticky-scroll-storytelling' as const,
  schema,
  demo,
  meta,
  Component,
};
