// Waimia · Co-location DS (Wave #38, T5) · module `hero-media-medallion` · point d'agregation.
import { schema } from './schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from './schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'hero-media-medallion' as const,
  schema,
  demo,
  meta,
  Component,
};
