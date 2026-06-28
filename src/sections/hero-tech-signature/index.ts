// Waimia · Co-location DS (Wave #38, T5) · module `hero-tech-signature` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hero-tech-signature/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hero-tech-signature/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-tech-signature' as const,
  schema,
  demo,
  meta,
  Component,
};
