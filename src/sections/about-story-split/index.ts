// Waimia · Co-location DS (Wave #38, T5) · module `about-story-split` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/about-story-split/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/about-story-split/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'about-story-split' as const,
  schema,
  demo,
  meta,
  Component,
};
