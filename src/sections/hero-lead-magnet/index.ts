// Waimia · Co-location DS (Wave #38, T5) · module `hero-lead-magnet` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hero-lead-magnet/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hero-lead-magnet/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-lead-magnet' as const,
  schema,
  demo,
  meta,
  Component,
};
