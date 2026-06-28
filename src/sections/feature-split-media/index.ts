// Waimia · Co-location DS (Wave #38, T5) · module `feature-split-media` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/feature-split-media/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/feature-split-media/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'feature-split-media' as const,
  schema,
  demo,
  meta,
  Component,
};
