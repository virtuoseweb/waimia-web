// Waimia · Co-location DS (Wave #38, T5) · module `hero-detail-menu` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/hero-detail-menu/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/hero-detail-menu/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-detail-menu' as const,
  schema,
  demo,
  meta,
  Component,
};
