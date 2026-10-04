/**
 * Astro integration : robots.txt.
 *
 * Remplace astro-robots-txt, qui ne sait écrire qu'UN user-agent par groupe : il fallait
 * soit répéter les ~30 lignes d'interdictions pour chaque robot (465 lignes), soit laisser
 * des groupes nommés avec un simple `Allow: /`. Or un groupe nommé N'HÉRITE PAS du groupe
 * `*` (RFC 9309) : avant cette refonte, GPTBot, ClaudeBot, PerplexityBot et consorts
 * avaient donc le droit d'explorer /api/ et tout le catalogue interne.
 *
 * Ici : UN seul groupe, plusieurs lignes `User-agent` (forme prévue par la RFC), donc les
 * mêmes règles pour tous, sans duplication possible.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param {{ userAgents: string[], allow: string[], disallow: string[], sitemap: string, llms?: string }} options
 */
export function renderRobots({ userAgents, allow, disallow, sitemap, llms }) {
  const lines = [
    '# Les mêmes règles pour tous les robots, moteurs génératifs compris.',
    '# Le site public est ouvert ; seuls /api/ et les outils internes sont fermés.',
    'User-agent: *',
    ...userAgents.map((ua) => `User-agent: ${ua}`),
    ...disallow.map((rule) => `Disallow: ${rule}`),
    ...allow.map((rule) => `Allow: ${rule}`),
    '',
    `Sitemap: ${sitemap}`,
  ];
  if (llms) lines.push('', `# Index pour moteurs génératifs (llms.txt) : ${llms}`);
  return lines.join('\n') + '\n';
}

export default function robots(options) {
  return {
    name: 'waimia-robots',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        await fs.writeFile(path.join(fileURLToPath(dir), 'robots.txt'), renderRobots(options), 'utf8');
        logger.info(`robots.txt : 1 groupe, ${options.userAgents.length + 1} user-agents, ${options.disallow.length} interdictions`);
      },
    },
  };
}
