/**
 * Astro integration: génère un fichier .md pour chaque page HTML du site.
 * Permet aux bots IA d'accéder à une version markdown propre de chaque page.
 *
 * Utilise un convertisseur HTML→Markdown léger basé sur regex
 * (compatible avec le hook astro:build:done sans dépendances ESM).
 */
import type { AstroIntegration } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SITE } from '../site.config';

interface LlmsMdPagesConfig {
  /** Glob patterns of pages to exclude */
  exclude?: string[];
  /** Site URL for building absolute paths */
  siteUrl?: string;
}

// ── HTML → Markdown converter (regex-based, no external deps) ──────────

function stripTags(html: string, ...tags: string[]): string {
  for (const tag of tags) {
    html = html.replace(new RegExp(`<${tag}[^>]*>[\\s\\S]*?</${tag}>`, 'gi'), '');
    html = html.replace(new RegExp(`<${tag}[^>]*\\/?>`, 'gi'), '');
  }
  return html;
}

function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove unwanted tags entirely (content included)
  md = stripTags(md, 'script', 'style', 'noscript', 'svg', 'iframe', 'audio', 'video', 'form', 'button', 'nav', 'picture');

  // Remove HTML comments
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Headings (h1-h6)
  for (let i = 6; i >= 1; i--) {
    const prefix = '#'.repeat(i);
    md = md.replace(new RegExp(`<h${i}[^>]*>([\\s\\S]*?)<\\/h${i}>`, 'gi'), (_m, content) => {
      return `\n\n${prefix} ${cleanInline(content).trim()}\n\n`;
    });
  }

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_m, content) => {
    return `\n\n${cleanInline(content).trim()}\n\n`;
  });

  // Bold
  md = md.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');

  // Italic
  md = md.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, text) => {
    const cleanText = cleanInline(text).trim();
    if (!cleanText) return '';
    // Skip anchor links and javascript:
    if (href.startsWith('#') || href.startsWith('javascript:')) return cleanText;
    return `[${cleanText}](${href})`;
  });

  // Images → alt text only
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, (_m, alt) => {
    return alt ? `![${alt}]` : '';
  });
  md = md.replace(/<img[^>]*>/gi, '');

  // List items
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, content) => {
    return `\n- ${cleanInline(content).trim()}`;
  });

  // Unordered/ordered lists wrapper
  md = md.replace(/<\/?[ou]l[^>]*>/gi, '\n');

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, content) => {
    const lines = cleanInline(content).trim().split('\n');
    return '\n\n' + lines.map((l: string) => `> ${l.trim()}`).filter((l: string) => l !== '> ').join('\n') + '\n\n';
  });

  // Code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_m, content) => {
    return `\n\n\`\`\`\n${decodeEntities(content).trim()}\n\`\`\`\n\n`;
  });
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, content) => {
    return `\n\n\`\`\`\n${decodeEntities(content).trim()}\n\`\`\`\n\n`;
  });

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Horizontal rules
  md = md.replace(/<hr[^>]*\/?>/gi, '\n\n---\n\n');

  // Line breaks
  md = md.replace(/<br[^>]*\/?>/gi, '\n');

  // Tables
  md = convertTables(md);

  // Remove all remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  md = decodeEntities(md);

  // Clean up whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.replace(/[ \t]+$/gm, '');
  md = md.replace(/^[ \t]+/gm, (match) => {
    // Preserve indentation for list items
    return match;
  });

  return md.trim();
}

function convertTables(html: string): string {
  return html.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (_m, tableContent) => {
    const rows: string[][] = [];
    const rowMatches = tableContent.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];

    for (const row of rowMatches) {
      const cells: string[] = [];
      const cellMatches = row.match(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi) || [];
      for (const cell of cellMatches) {
        const content = cell.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/i, '$1');
        cells.push(cleanInline(content).trim());
      }
      if (cells.length > 0) rows.push(cells);
    }

    if (rows.length === 0) return '';

    const colCount = Math.max(...rows.map((r) => r.length));
    const lines: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const padded = rows[i].concat(Array(colCount - rows[i].length).fill(''));
      lines.push('| ' + padded.join(' | ') + ' |');
      if (i === 0) {
        lines.push('| ' + padded.map(() => '---').join(' | ') + ' |');
      }
    }

    return '\n\n' + lines.join('\n') + '\n\n';
  });
}

function cleanInline(html: string): string {
  let text = html;
  text = text.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**');
  text = text.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*');
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  text = text.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
  text = text.replace(/<br[^>]*\/?>/gi, '\n');
  text = text.replace(/<[^>]+>/g, '');
  return decodeEntities(text);
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_m, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, code) => String.fromCharCode(parseInt(code, 16)));
}

// ── Meta extraction ────────────────────────────────────────────────────

function extractMetaFromHtml(fullHtml: string): { title: string; description: string } {
  const titleMatch = fullHtml.match(/<title[^>]*>([^<]+)<\/title>/i);
  const descMatch =
    fullHtml.match(/<meta\s+name="description"\s+content="([^"]*)"[^>]*>/i) ||
    fullHtml.match(/<meta\s+content="([^"]*)"\s+name="description"[^>]*>/i);

  let title = titleMatch?.[1] || '';
  title = title.replace(/\s*[|–—·-]\s*Waimia.*$/i, '').trim();

  return {
    title: decodeEntities(title),
    description: descMatch ? decodeEntities(descMatch[1]) : '',
  };
}

function extractMainContent(fullHtml: string): string {
  const mainMatch = fullHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) return mainMatch[1];

  const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return bodyMatch?.[1] || fullHtml;
}

// ── Path helpers ───────────────────────────────────────────────────────

function pagePathToMdPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/index';
  if (clean === '/index') return '/index.md';
  if (clean.endsWith('/index')) return `${clean}.md`;
  return `${clean}.md`;
}

function isExcluded(pathname: string, patterns: string[]): boolean {
  const clean = pathname.replace(/\/+$/, '').replace(/^\/+/, '');
  for (const pattern of patterns) {
    if (pattern.includes('*')) {
      // Simple glob: "admin/**" matches "admin/login", "admin/leads"
      const prefix = pattern.replace(/\/?\*.*$/, '');
      if (clean.startsWith(prefix)) return true;
    } else {
      if (clean === pattern) return true;
    }
  }
  return false;
}

// ── Integration ────────────────────────────────────────────────────────

export default function llmsMdPages(config: LlmsMdPagesConfig = {}): AstroIntegration {
  const {
    exclude = ['404', 'admin/**', 'api/**', 'desinscription'],
    siteUrl = SITE.url,
  } = config;

  return {
    name: 'llms-md-pages',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const distDir = dir.pathname;
        let generated = 0;
        let skipped = 0;

        for (const page of pages) {
          const { pathname } = page;

          if (isExcluded(pathname, exclude)) {
            skipped++;
            continue;
          }

          const htmlPath = path.join(distDir, pathname, 'index.html');
          let fullHtml: string;
          try {
            fullHtml = await fs.readFile(htmlPath, 'utf-8');
          } catch {
            skipped++;
            continue;
          }

          const { title, description } = extractMetaFromHtml(fullHtml);
          const mainHtml = extractMainContent(fullHtml);
          const markdownBody = htmlToMarkdown(mainHtml);

          const mdPath = pagePathToMdPath('/' + pathname);
          const canonicalUrl = `${siteUrl}/${pathname}`.replace(/\/+/g, '/').replace(':/', '://');

          const lines = [
            `# ${title}`,
            '',
            ...(description ? [`> ${description}`, ''] : []),
            `Source : ${canonicalUrl}`,
            '',
            '---',
            '',
            markdownBody,
            '',
          ];

          const outputPath = path.join(distDir, mdPath);
          await fs.mkdir(path.dirname(outputPath), { recursive: true });
          await fs.writeFile(outputPath, lines.join('\n'), 'utf-8');
          generated++;
        }

        // Append llms.txt reference to robots.txt as comment (non-standard directive removed for Google compliance)
        const robotsPath = path.join(distDir, 'robots.txt');
        try {
          let robotsContent = await fs.readFile(robotsPath, 'utf-8');
          if (!robotsContent.includes('llms.txt')) {
            robotsContent += `\n# LLMs context (llms.txt): ${siteUrl}/llms.txt\n`;
            await fs.writeFile(robotsPath, robotsContent, 'utf-8');
          }
        } catch {
          // robots.txt may not exist yet
        }

        console.log(`✅ llms-md-pages: ${generated} fichiers .md générés (${skipped} exclus)`);
      },
    },
  };
}
