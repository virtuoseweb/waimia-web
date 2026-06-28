// Waimia · Co-location DS (Wave #38, T5) · module `contact-form` · schema (extrait)
// DEPLACE depuis src/schemas/sections.ts (rule 60). z.object SANS discriminatedUnion.
// z vient d'astro:content (build Astro + pattern codegen). Imports partages reresolus.

import { z } from 'astro:content';

export const schema = z.object({
  type: z.literal('contact-form'),
  background: z.enum(['paper', 'paper-2', 'paper-3', 'ink']).optional(),
  kicker_fr: z.string().optional(),
  kicker_en: z.string().optional(),
  h2_fr: z.string(),
  h2_en: z.string(),
  body_fr: z.string().optional(),
  body_en: z.string().optional(),
  name_label_fr: z.string().default('Nom'),
  name_label_en: z.string().default('Name'),
  email_label_fr: z.string().default('Email'),
  email_label_en: z.string().default('Email'),
  message_label_fr: z.string().default('Message'),
  message_label_en: z.string().default('Message'),
  submit_label_fr: z.string().default('Envoyer →'),
  submit_label_en: z.string().default('Send →'),
  form_action: z.string().default('/api/contact'),
  hint_fr: z.string().optional(),
  hint_en: z.string().optional(),
  details: z
    .array(
      z.object({
        label_fr: z.string(),
        label_en: z.string(),
        value: z.string(),
        href: z.string().optional(),
      }),
    )
    .optional(),
});
