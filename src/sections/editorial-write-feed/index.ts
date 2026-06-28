// Waimia · Co-location DS (Wave #38, T5) · module `editorial-write-feed` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/editorial-write-feed/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/editorial-write-feed/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'editorial-write-feed' as const,
  schema,
  demo,
  meta,
  Component,
};
