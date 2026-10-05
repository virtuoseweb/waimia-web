/**
 * Astro integration : sorties pour moteurs génératifs (GEO), limitées au site PUBLIC.
 *   · un fichier .md par page publique INDEXABLE (jamais le catalogue interne, les pages
 *     noindex, les pages de remerciement ni les redirections) ;
 *   · /llms.txt : index structuré par silo, chaque lien pointe une URL qui répond 200 ;
 *   · /llms-full.txt : concaténation du markdown de ces mêmes pages.
 * La sélection lit le HTML bâti (meta robots) : une page qui passe en noindex sort
 * automatiquement des trois sorties, sans liste à tenir à la main.
 *
 * Utilise un convertisseur HTML→Markdown léger basé sur regex
 * (compatible avec le hook astro:build:done sans dépendances ESM).
 */
import type { AstroIntegration } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { SITE } from '../site.config';
import { isInternalPath } from '../lib/seo/internal-tools.mjs';

interface LlmsMdPagesConfig {
  /** Motifs de pages à exclure (en plus des pages noindex et des surfaces internes). */
  exclude?: string[];
  /** URL du site pour construire les liens absolus. */
  siteUrl?: string;
  /** Résumé d'une phrase (bloc de citation en tête de llms.txt). */
  summary?: string;
  /** Paragraphes de contexte sous le résumé. */
  details?: string[];
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
  return `${clean}.md`;
}

function isExcluded(pathname: string, patterns: string[]): boolean {
  const clean = pathname.replace(/\/+$/, '').replace(/^\/+/, '');
  for (const pattern of patterns) {
    if (pattern.includes('*')) {
      // Glob simple : "admin/**" couvre "admin" et "admin/login".
      const prefix = pattern.replace(/\/?\*.*$/, '');
      if (clean === prefix || clean.startsWith(`${prefix}/`)) return true;
    } else if (clean === pattern) {
      return true;
    }
  }
  return false;
}

function isNoindexHtml(fullHtml: string): boolean {
  return (
    /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(fullHtml) ||
    /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]*name=["']robots["']/i.test(fullHtml)
  );
}

function isRedirectHtml(fullHtml: string): boolean {
  return /<meta[^>]+http-equiv=["']?refresh/i.test(fullHtml);
}

// ── Silos de llms.txt ──────────────────────────────────────────────────
// Ordre = ordre d'affichage. Le premier silo dont `test` accepte le chemin gagne.
// Un nouveau dossier de pages non listé ici tombe dans « Autres pages » (jamais perdu).

interface Silo {
  title: string;
  note?: string;
  test: (p: string) => boolean;
}

const under = (prefix: string) => (p: string) => p === prefix || p.startsWith(`${prefix}/`);

const SILOS: Silo[] = [
  {
    title: 'Services',
    note: 'Conseil, intégration et développement : une page par prestation.',
    test: under('/services'),
  },
  {
    title: 'Audit IA',
    note: "Point d'entrée d'une mission : audit, feuille de route, chiffrage.",
    test: (p) => p.startsWith('/audit'),
  },
  {
    title: 'Formations',
    note: 'Formations IA et automatisation, dispensées via Akigora, organisme certifié Qualiopi.',
    test: under('/formations'),
  },
  { title: 'Réalisations', note: 'Cas clients (client nommé) et projets internes du studio.', test: under('/cas-clients') },
  { title: "Cas d'usage", note: 'Un problème métier, la réponse apportée.', test: under('/cas-usages') },
  { title: 'Guides', test: under('/ressources/guides') },
  { title: 'Comparatifs', test: under('/ressources/comparatifs') },
  {
    title: 'Diagnostics et outils',
    test: (p) => under('/ressources/diagnostics')(p) || under('/ressources/outils')(p),
  },
  { title: 'Blog', test: under('/blog') },
  { title: 'Secteurs', test: under('/secteurs') },
  {
    title: 'Implantations',
    note: 'Bordeaux, Montpellier, Lyon, Paris : missions à distance ou sur site.',
    test: under('/implantations'),
  },
  {
    title: 'Studio',
    note: 'Qui est Waimia, comment se déroule une mission, combien ça coûte.',
    test: (p) =>
      p === '/' ||
      [
        '/agence',
        '/equipe',
        '/tarifs',
        '/contact',
        '/technologies',
        '/manifesto',
        '/conformite-ia',
        '/ressources',
        '/demonstrations',
      ].some((prefix) => under(prefix)(p)),
  },
];

const OPTIONAL_PREFIXES = ['/cgv', '/mentions-legales', '/politique-confidentialite', '/sources-methodologie'];

interface PublicPage {
  pathname: string;
  title: string;
  description: string;
  markdown: string;
}

// ── Integration ────────────────────────────────────────────────────────

export default function llmsMdPages(config: LlmsMdPagesConfig = {}): AstroIntegration {
  const {
    exclude = ['404', 'admin/**', 'api/**', 'bienvenue/**', 'lp/**'],
    siteUrl = SITE.url,
    summary = '',
    details = [],
  } = config;

  return {
    name: 'llms-md-pages',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const distDir = dir.pathname;
        const publicPages: PublicPage[] = [];
        let skipped = 0;

        for (const page of pages) {
          const pathname = '/' + page.pathname.replace(/^\/+|\/+$/g, '');

          if (isInternalPath(pathname) || isExcluded(pathname, exclude)) {
            skipped++;
            continue;
          }

          const htmlPath = path.join(distDir, page.pathname, 'index.html');
          let fullHtml: string;
          try {
            fullHtml = await fs.readFile(htmlPath, 'utf-8');
          } catch {
            skipped++;
            continue;
          }

          // Seules les pages indexables ont une version markdown : une page noindex ou une
          // redirection n'a rien à faire dans une sortie destinée à être citée.
          if (isNoindexHtml(fullHtml) || isRedirectHtml(fullHtml)) {
            skipped++;
            continue;
          }

          const { title, description } = extractMetaFromHtml(fullHtml);
          const body = htmlToMarkdown(extractMainContent(fullHtml));
          const canonicalUrl = pathname === '/' ? `${siteUrl}/` : `${siteUrl}${pathname}`;

          const markdown = [
            `# ${title}`,
            '',
            ...(description ? [`> ${description}`, ''] : []),
            `Source : ${canonicalUrl}`,
            '',
            '---',
            '',
            body,
            '',
          ].join('\n');

          const outputPath = path.join(distDir, pagePathToMdPath(pathname));
          await fs.mkdir(path.dirname(outputPath), { recursive: true });
          await fs.writeFile(outputPath, markdown, 'utf-8');
          publicPages.push({ pathname, title, description, markdown });
        }

        publicPages.sort((a, b) => a.pathname.localeCompare(b.pathname));

        // ── llms.txt (format llmstxt.org : H1, résumé en citation, sections H2 de liens) ──
        const mdUrl = (p: string) => `${siteUrl}${pagePathToMdPath(p)}`;
        const linkLine = (p: PublicPage) =>
          `- [${p.title}](${mdUrl(p.pathname)})${p.description ? ` : ${p.description}` : ''}`;

        const remaining = new Set(publicPages.map((p) => p.pathname));
        const optional = publicPages.filter((p) => OPTIONAL_PREFIXES.some((prefix) => under(prefix)(p.pathname)));
        optional.forEach((p) => remaining.delete(p.pathname));

        const out: string[] = [`# ${SITE.name}`, ''];
        if (summary) out.push(`> ${summary}`, '');
        for (const paragraph of details) out.push(paragraph, '');

        for (const silo of SILOS) {
          const items = publicPages.filter((p) => remaining.has(p.pathname) && silo.test(p.pathname));
          if (items.length === 0) continue;
          items.forEach((p) => remaining.delete(p.pathname));
          // La page hub du silo (chemin le plus court) passe en tête.
          items.sort(
            (a, b) =>
              a.pathname.split('/').length - b.pathname.split('/').length || a.pathname.localeCompare(b.pathname),
          );
          out.push(`## ${silo.title}`, '');
          if (silo.note) out.push(silo.note, '');
          out.push(...items.map(linkLine), '');
        }

        const others = publicPages.filter((p) => remaining.has(p.pathname));
        if (others.length > 0) out.push('## Autres pages', '', ...others.map(linkLine), '');
        if (optional.length > 0) out.push('## Optional', '', ...optional.map(linkLine), '');

        await fs.writeFile(path.join(distDir, 'llms.txt'), out.join('\n'), 'utf-8');

        // ── llms-full.txt : le markdown de chaque page publique, à la suite ──
        const full = [
          `# ${SITE.name} : contenu complet`,
          '',
          ...(summary ? [`> ${summary}`, ''] : []),
          ...publicPages.flatMap((p) => ['', '---', '', p.markdown]),
        ].join('\n');
        await fs.writeFile(path.join(distDir, 'llms-full.txt'), full, 'utf-8');

        console.log(
          `llms-md-pages : ${publicPages.length} pages publiques indexables → .md + llms.txt + llms-full.txt (${skipped} pages écartées)`,
        );
      },
    },
  };
}
