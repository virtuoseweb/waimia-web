// Waimia · Co-location DS (Wave #38, T5) · module `operating-layer` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'operating-layer',
    chapter_num: 'FIG III · 3.0',
    chapter_title_fr: 'Acte III · La plateforme',
    chapter_title_en: 'Act III · The platform',
    spec_label: 'VIRTUOSEOS · v2.4',
    h2_fr: 'La <i>couche opérationnelle</i> sous-jacente.',
    h2_en: 'The <i>operating layer</i> we ship under.',
    lede_fr: "VirtuoseOS est le kernel qui se trouve sous chaque intervention Waimia : workspaces, agents, trace auditable des commandes, UI française d'abord.",
    lede_en: 'VirtuoseOS is the kernel that sits under every Waimia engagement: workspaces, agents, auditable command trails, a French-first UI.',
    cta_primary: { label_fr: 'Visite produit →', label_en: 'See product tour →', href: '/expertise-claude', variant: 'accent' },
    cta_secondary: { label_fr: 'Voir le changelog', label_en: 'Read changelog', href: '/blog', variant: 'ghost' },
    terminal_label: 'waimia · workspace/demo',
    console_lines: [
      { k: '[kernel]', v: 'multi-workspace/init ok' },
      { k: '[agent:revops]', v: '14 handoffs routed · 0 dropped' },
      { k: '[hubspot]', v: '482 contacts synced ◉' },
      { k: '[audit]', v: 'trail open · last 12 min' },
      { k: '[locale]', v: 'fr-FR · typographic rules on' },
    ],
    console_cmd: '$ waimia ship pipeline.agent --workspace=demo',
    attrs: [
      { k: 'Kernel', v_fr: 'Multi-workspace', v_en: 'Multi-workspace' },
      { k: 'Agents', v_fr: 'Audités, réversibles', v_en: 'Audited, reversible' },
      { k: 'Data', v_fr: 'CRM-natif + entrepôt', v_en: 'CRM-native + warehouse' },
      { k: 'Locale', v_fr: 'FR-first · parité EN', v_en: 'FR-first · EN parity' },
    ],
  };
