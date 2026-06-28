// Waimia · Co-location DS (Wave #38, T5) · module `booking-embed` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/booking-embed/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/booking-embed/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'booking-embed' as const,
  schema,
  demo,
  meta,
  Component,
};
