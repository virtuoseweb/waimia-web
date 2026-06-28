// Waimia · Co-location DS (Wave #38, T5) · module `pain-severity-list` · demo bilingue (extrait)
// DEPLACE depuis src/lib/section-demos.ts (rule 60).

import type { DemoData } from '../../lib/section-demos';

export const demo: DemoData = {
    type: 'pain-severity-list',
    background: 'ink',
    kicker_fr: 'Pain points · par sévérité',
    kicker_en: 'Pain points · by severity',
    h2_fr: `Là où le site <i class="acc">fuit</i>.`,
    h2_en: `Where the site <i class="acc">leaks</i>.`,
    items: [
      {
        severity: 'critical',
        title_fr: 'Aucune présence à convertir',
        title_en: 'No presence to convert',
        desc_fr: "Vous existez en ligne, mais rien n'amène le visiteur vers une conversation commerciale.",
        desc_en: 'You exist online, but nothing leads the visitor toward a sales conversation.',
        fix_fr: 'Tunnel repensé, orienté preuve.',
        fix_en: 'Redesigned funnel, proof-first.',
      },
      {
        severity: 'high',
        title_fr: 'Une vitrine qui ne capte rien',
        title_en: 'A brochure that captures nothing',
        desc_fr: 'De jolies pages, mais aucun mécanisme de capture : ni quiz, ni scoring, ni routage.',
        desc_en: 'Nice pages, but no capture mechanism : no quiz, no scoring, no routing.',
        fix_fr: 'Capture + scoring + routage CRM.',
        fix_en: 'Capture + scoring + CRM routing.',
      },
      {
        severity: 'medium',
        title_fr: 'Un site qui ne lit pas ses données',
        title_en: "A site that doesn't read its data",
        desc_fr: 'Aucune lecture du comportement : vous ne savez ni qui vient, ni pourquoi il repart.',
        desc_en: 'No behavioural reading : you know neither who comes nor why they leave.',
        fix_fr: 'Tracking first-party + reporting.',
        fix_en: 'First-party tracking + reporting.',
      },
      {
        severity: 'medium',
        title_fr: 'Des contenus qui ne ressortent jamais',
        title_en: 'Content that never surfaces',
        desc_fr: 'Vos pages existent mais restent invisibles : ni les moteurs classiques ni les moteurs génératifs ne les citent.',
        desc_en: 'Your pages exist but stay invisible : neither classic engines nor generative engines cite them.',
        fix_fr: 'Structure SEO + GEO, données structurées.',
        fix_en: 'SEO + GEO structure, structured data.',
      },
      {
        severity: 'low',
        title_fr: 'Une stack qui se grippe au moindre ajout',
        title_en: 'A stack that seizes on every change',
        desc_fr: 'Chaque évolution coûte cher et casse autre chose : le site freine vos opérations au lieu de les servir.',
        desc_en: 'Every change is costly and breaks something else : the site slows your operations instead of serving them.',
        fix_fr: 'Socle composable, déploiements sûrs.',
        fix_en: 'Composable foundation, safe deploys.',
      },
    ],
  };
