// Waimia · Co-location DS (Wave #38, T5) · module `hero-form-inline` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hero-form-inline/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hero-form-inline/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-form-inline' as const,
  schema,
  demo,
  meta,
  Component,
};
