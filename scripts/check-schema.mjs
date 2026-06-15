/**
 * check-schema.mjs
 * Gate JSON-LD schema.org : anti-doublon singleton + assertions de presence cles.
 * Usage : node scripts/check-schema.mjs
 * Exit 0 = OK, 1 = violation, 2 = dist/client absent.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join, relative, sep, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist', 'client')

const LINE = '═'.repeat(68)
const SEP  = '─'.repeat(68)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relPath (file) {
  return relative(DIST, file).split(sep).join('/')
}

function walk (dir, predicate) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full, predicate))
    else if (predicate(full)) out.push(full)
  }
  return out
}

// ---------------------------------------------------------------------------
// JSON-LD extraction : gere les 3 formes (objet, tableau, @graph)
// ---------------------------------------------------------------------------

const LD_RE = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g

function extractTypes (html) {
  const types = []
  let m
  LD_RE.lastIndex = 0
  while ((m = LD_RE.exec(html)) !== null) {
    let parsed
    try {
      parsed = JSON.parse(m[1])
    } catch (_) {
      continue
    }
    collectTypes(parsed, types)
  }
  return types
}

function collectTypes (node, acc) {
  if (Array.isArray(node)) {
    node.forEach(n => collectTypes(n, acc))
    return
  }
  if (!node || typeof node !== 'object') return
  if (node['@graph']) {
    node['@graph'].forEach(n => collectTypes(n, acc))
    return
  }
  const t = node['@type']
  if (Array.isArray(t)) acc.push(...t)
  else if (t) acc.push(t)
}

// ---------------------------------------------------------------------------
// Types singleton par page (max 1 occurrence autorisee)
// ---------------------------------------------------------------------------

const SINGLETONS = new Set([
  'Organization',
  'WebSite',
  'FAQPage',
  'BreadcrumbList',
  'CollectionPage',
  'WebPage',
  'ContactPage',
  'AboutPage',
  'Service',
])

function checkDoublons (types, filePath) {
  const counts = {}
  for (const t of types) {
    counts[t] = (counts[t] ?? 0) + 1
  }
  const violations = []
  for (const [type, count] of Object.entries(counts)) {
    if (SINGLETONS.has(type) && count >= 2) {
      violations.push({ type, count })
    }
  }
  return violations
}

// ---------------------------------------------------------------------------
// Assertions de presence par page cle
// Cle = chemin relatif depuis dist/client (sans index.html)
// ---------------------------------------------------------------------------

const ASSERTIONS = [
  {
    key: '',
    label: 'index (racine)',
    required: ['Organization', 'WebSite', 'FAQPage'],
  },
  {
    key: 'expertise-claude',
    label: 'expertise-claude',
    required: ['FAQPage', 'BreadcrumbList'],
  },
  {
    key: 'realisations',
    label: 'realisations',
    required: ['CollectionPage', 'BreadcrumbList'],
  },
  {
    key: 'offres/growth-system-ia',
    label: 'offres/growth-system-ia',
    required: ['Service', 'BreadcrumbList'],
  },
  {
    key: 'offres/audit-maturite-ia',
    label: 'offres/audit-maturite-ia',
    required: ['Service'],
  },
  {
    key: 'acquerir',
    label: 'acquerir',
    required: ['Service', 'BreadcrumbList'],
  },
  {
    key: 'piloter',
    label: 'piloter',
    required: ['Service', 'BreadcrumbList'],
  },
  {
    key: 'operer',
    label: 'operer',
    required: ['Service', 'BreadcrumbList'],
  },
  {
    key: 'secteurs/e-commerce',
    label: 'secteurs/e-commerce',
    required: ['Article', 'BreadcrumbList', 'FAQPage'],
  },
]

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!existsSync(DIST)) {
  console.error('dist/client absent. Lancer le build avant ce check.')
  process.exit(2)
}

const htmlFiles = walk(DIST, f => f.endsWith('index.html'))

console.log(LINE)
console.log(`check:schema  --  ${htmlFiles.length} pages index.html trouvees`)
console.log(LINE)

let doublon_violations = 0
let assertion_violations = 0
let assertion_warnings = 0

// --- Passe 1 : anti-doublon sur toutes les pages ---

const pageTypesMap = new Map() // key -> types[]

for (const file of htmlFiles) {
  const rel = relPath(file)
  // cle = chemin sans /index.html
  const key = rel === 'index.html' ? '' : rel.replace(/\/index\.html$/, '')
  const html = readFileSync(file, 'utf8')
  const types = extractTypes(html)
  pageTypesMap.set(key, types)

  const violations = checkDoublons(types, file)
  if (violations.length > 0) {
    for (const v of violations) {
      console.error(`✗ DOUBLON SINGLETON  ${rel}  type=${v.type}  count=${v.count}`)
      doublon_violations++
    }
  }
}

if (doublon_violations === 0) {
  console.log(`✓ anti-doublon OK -- 0 doublon singleton sur ${htmlFiles.length} pages`)
} else {
  console.log(`✗ ${doublon_violations} doublon(s) singleton detecte(s)`)
}

console.log(SEP)

// --- Passe 2 : assertions de presence ---

for (const assertion of ASSERTIONS) {
  const types = pageTypesMap.get(assertion.key)

  if (!types) {
    console.warn(`⚠ page absente du dist (warning) : ${assertion.label}`)
    assertion_warnings++
    continue
  }

  const typeSet = new Set(types)
  const missing = assertion.required.filter(t => !typeSet.has(t))

  if (missing.length > 0) {
    console.error(`✗ SCHEMA MANQUANT  ${assertion.label}  types absents : ${missing.join(', ')}`)
    assertion_violations++
  } else {
    console.log(`✓ ${assertion.label}  [${assertion.required.join(', ')}]`)
  }
}

console.log(LINE)

// --- Bilan ---

const total_violations = doublon_violations + assertion_violations

if (total_violations > 0) {
  console.error(`\n✗ schema lock ECHEC : ${total_violations} violation(s), ${assertion_warnings} avertissement(s)`)
  process.exit(1)
}

const assertion_count = ASSERTIONS.length - assertion_warnings
console.log(
  `\n✓ schema lock OK : ${htmlFiles.length} pages analysees, 0 doublon, ${assertion_count} assertions cles vertes`
)
process.exit(0)
