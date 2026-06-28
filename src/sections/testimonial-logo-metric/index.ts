// Waimia · Co-location DS (Wave #38, T5) · module `testimonial-logo-metric` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/testimonial-logo-metric/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/testimonial-logo-metric/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'testimonial-logo-metric' as const,
  schema,
  demo,
  meta,
  Component,
};
