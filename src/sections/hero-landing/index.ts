// Waimia · Co-location DS (Wave #38, T5) · module `hero-landing` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hero-landing/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hero-landing/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-landing' as const,
  schema,
  demo,
  meta,
  Component,
};
