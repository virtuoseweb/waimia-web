// Waimia · Co-location DS (Wave #38, T5) · module `pricing-single-highlight` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/pricing-single-highlight/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/pricing-single-highlight/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'pricing-single-highlight' as const,
  schema,
  demo,
  meta,
  Component,
};
