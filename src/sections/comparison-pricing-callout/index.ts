// Waimia · Co-location DS (Wave #38, T5) · module `comparison-pricing-callout` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/comparison-pricing-callout/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/comparison-pricing-callout/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'comparison-pricing-callout' as const,
  schema,
  demo,
  meta,
  Component,
};
