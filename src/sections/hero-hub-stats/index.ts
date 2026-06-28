// Waimia · Co-location DS (Wave #38, T5) · module `hero-hub-stats` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hero-hub-stats/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hero-hub-stats/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-hub-stats' as const,
  schema,
  demo,
  meta,
  Component,
};
