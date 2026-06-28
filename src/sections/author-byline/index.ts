// Waimia · Co-location DS (Wave #38, T5) · module `author-byline` · point d'agregation.
import { schema } from '@waimia/ds-kernel/sections/author-byline/schema';
import { demo } from './demo';
import { meta } from './meta';
import Component from './Component.astro';

export { schema } from '@waimia/ds-kernel/sections/author-byline/schema';
export { demo } from './demo';
export { meta } from './meta';
export { default as Component } from './Component.astro';

export default {
  id: 'author-byline' as const,
  schema,
  demo,
  meta,
  Component,
};
