// Waimia · Co-location DS · module `offer-rail` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/offer-rail/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/offer-rail/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'offer-rail' as const,
  schema,
  demo,
  meta,
  Component,
};
