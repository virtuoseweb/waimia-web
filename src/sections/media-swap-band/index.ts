// Waimia · Co-location DS (Wave #38, T5) · module `media-swap-band` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/media-swap-band/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/media-swap-band/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'media-swap-band' as const,
  schema,
  demo,
  meta,
  Component,
};
