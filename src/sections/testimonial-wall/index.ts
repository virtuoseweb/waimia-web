// Waimia · Co-location DS (Wave #38) · module `testimonial-wall` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/testimonial-wall/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/testimonial-wall/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'testimonial-wall' as const,
  schema,
  demo,
  meta,
  Component,
};
