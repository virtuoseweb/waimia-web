// Waimia · Co-location DS (Wave #38, T5) · module `trust-badges-band` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/trust-badges-band/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/trust-badges-band/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'trust-badges-band' as const,
  schema,
  demo,
  meta,
  Component,
};
