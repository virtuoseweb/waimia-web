// Waimia · Co-location DS (Wave #38, T5) · module `logo-marquee` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/logo-marquee/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/logo-marquee/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'logo-marquee' as const,
  schema,
  demo,
  meta,
  Component,
};
