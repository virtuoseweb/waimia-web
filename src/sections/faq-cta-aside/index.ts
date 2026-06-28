// Waimia · Co-location DS (Wave #38, T5) · module `faq-cta-aside` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/faq-cta-aside/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/faq-cta-aside/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'faq-cta-aside' as const,
  schema,
  demo,
  meta,
  Component,
};
