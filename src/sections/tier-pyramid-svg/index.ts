// Waimia · Co-location DS (Wave #38, T5) · module `tier-pyramid-svg` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/tier-pyramid-svg/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/tier-pyramid-svg/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'tier-pyramid-svg' as const,
  schema,
  demo,
  meta,
  Component,
};
