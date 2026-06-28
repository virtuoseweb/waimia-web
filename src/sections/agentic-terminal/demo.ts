// Waimia · Co-location DS (Wave #38, T5) · module `agentic-terminal` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'agentic-terminal',
    badge_fr: 'MOTEUR DE CONTENU AGENTIQUE',
    badge_en: 'AGENTIC CONTENT ENGINE',
    title_part1_fr: 'Votre contenu,',
    title_part1_en: 'Your content,',
    title_highlight_fr: 'produit en continu',
    title_highlight_en: 'shipped continuously',
    description_fr: 'Un agent qui audite, brieffe et rédige. Une relecture humaine sur chaque livrable, avant publication.',
    description_en: 'An agent that audits, briefs and writes. A human review on every deliverable, before publishing.',
    filename: 'waimia-env · agent.ts',
    folders: ['audits', 'briefs'],
    files: [
      { name: 'audits/gsc-snapshot.md', type: 'MD' },
      { name: 'briefs/cocon-seo.md', type: 'MD' },
      { name: 'livrables/article-draft.ts', type: 'TS' },
    ],
    prompt_label_fr: 'Votre objectif',
    prompt_label_en: 'Your goal',
    prompt_text_fr: 'Augmenter le trafic organique sur le cocon « SEO local » sans sacrifier la qualité éditoriale.',
    prompt_text_en: 'Grow organic traffic on the « local SEO » cluster without sacrificing editorial quality.',
    lines_fr: [
      { kind: 'comment', text: '# session agent · waimia' },
      { kind: 'cmd', text: 'waimia run audit --scope=contenu' },
      { kind: 'out', text: 'analyse de 128 pages, lecture GSC et GA…' },
      { kind: 'ok', text: 'ok 12 leviers prioritaires identifiés' },
      { kind: 'cmd', text: 'waimia draft brief --topic="cocon SEO local"' },
      { kind: 'out', text: 'rédaction du plan, sources citées, relecture humaine en file.' },
      { kind: 'ok', text: 'ok brief prêt · 1 relecteur assigné' },
    ],
    lines_en: [
      { kind: 'comment', text: '# agent session · waimia' },
      { kind: 'cmd', text: 'waimia run audit --scope=content' },
      { kind: 'out', text: 'scanning 128 pages, reading GSC and GA…' },
      { kind: 'ok', text: 'ok 12 priority levers identified' },
      { kind: 'cmd', text: 'waimia draft brief --topic="local SEO cluster"' },
      { kind: 'out', text: 'drafting the outline, sources cited, human review queued.' },
      { kind: 'ok', text: 'ok brief ready · 1 reviewer assigned' },
    ],
    success_msg_fr: 'Brief livré. Relecture humaine en cours…',
    success_msg_en: 'Brief delivered. Human review in progress…',
    footer_status_fr: 'Agent actif',
    footer_status_en: 'Agent active',
    footer_framework: 'Astro + IA',
    footer_memory: 'live',
    badges_fr: ['Audit', 'Rédaction', 'Relecture'],
    badges_en: ['Audit', 'Writing', 'Review'],
  };
