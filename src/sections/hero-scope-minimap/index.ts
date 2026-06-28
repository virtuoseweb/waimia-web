// Waimia · Co-location DS (Wave #38, T5) · module `hero-scope-minimap` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hero-scope-minimap/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hero-scope-minimap/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-scope-minimap' as const,
  schema,
  demo,
  meta,
  Component,
};
