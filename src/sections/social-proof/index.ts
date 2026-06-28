// Waimia · Co-location DS (Wave #38, T5) · module `social-proof` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/social-proof/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/social-proof/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'social-proof' as const,
  schema,
  demo,
  meta,
  Component,
};
