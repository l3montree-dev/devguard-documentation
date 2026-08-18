/**
 * Guards against the /reference/ overview linking to pages that do not exist.
 *
 * The API cards on /reference/ are generated from the tags in the DevGuard
 * OpenAPI spec, which is fetched at runtime from another repository — so a tag
 * added upstream silently produces a dead card here. This check compares the
 * spec's tags against the MDX pages and the _meta.ts entries under
 * src/pages/reference/api/ and fails the build when they drift apart.
 *
 * Run manually:            node utilities/check-api-reference-pages.mjs
 * Fail on fetch errors:    node utilities/check-api-reference-pages.mjs --strict
 */
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const apiPagesDir = path.join(root, 'src', 'pages', 'reference', 'api')
const specCache = path.join(root, 'src', 'services', 'spec-cache.ts')

const strict = process.argv.includes('--strict')

// The HTTP methods ApiReference.tsx groups by — keep in sync with that component.
const HTTP_METHODS = [
    'get',
    'post',
    'put',
    'patch',
    'delete',
    'head',
    'options',
]

// The slug ApiReference.tsx builds its hrefs from — keep in sync with that component.
const toSlug = (tag) => tag.toLowerCase().replace(/\s+/g, '-')

/** Read the spec URL out of spec-cache.ts so there is a single source of truth. */
async function readSpecUrl() {
    const source = await readFile(specCache, 'utf8')
    const match = source.match(/SPEC_URL\s*=\s*\n?\s*'([^']+)'/)
    if (!match) {
        throw new Error(
            `Could not find SPEC_URL in ${path.relative(root, specCache)}`,
        )
    }
    return match[1]
}

function tagsFromSpec(spec) {
    const tags = new Map()
    for (const item of Object.values(spec.paths ?? {})) {
        if (!item) continue
        for (const method of HTTP_METHODS) {
            const op = item[method]
            if (!op) continue
            const tag = op.tags?.[0] ?? 'Other'
            tags.set(tag, (tags.get(tag) ?? 0) + 1)
        }
    }
    return tags
}

const specUrl = await readSpecUrl()

let spec
try {
    const res = await fetch(specUrl)
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    spec = await res.json()
} catch (error) {
    const message = `Could not fetch the OpenAPI spec from ${specUrl}: ${error.message}`
    if (strict) {
        console.error(`✗ ${message}`)
        process.exit(1)
    }
    // A transient network failure should not break an otherwise valid build.
    console.warn(`⚠ Skipping API reference page check — ${message}`)
    process.exit(0)
}

const tags = tagsFromSpec(spec)

const pages = new Set(
    (await readdir(apiPagesDir))
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => file.replace(/\.mdx$/, '')),
)

const metaSource = await readFile(path.join(apiPagesDir, '_meta.ts'), 'utf8')
const metaKeys = new Set(
    [...metaSource.matchAll(/^\s*'?([\w-]+)'?\s*:\s*\{/gm)].map((m) => m[1]),
)

const missingPages = []
const missingMeta = []

for (const [tag, count] of tags) {
    const slug = toSlug(tag)
    if (!pages.has(slug)) missingPages.push({ tag, slug, count })
    else if (!metaKeys.has(slug)) missingMeta.push({ tag, slug })
}

// Pages whose tag no longer exists upstream still resolve, but <ApiTagPage>
// renders an empty endpoint list — a page that looks fine and documents
// nothing, which is worse than a 404 because nothing signals it is broken.
const orphanPages = [...pages].filter(
    (slug) => ![...tags.keys()].some((tag) => toSlug(tag) === slug),
)

if (
    missingPages.length === 0 &&
    missingMeta.length === 0 &&
    orphanPages.length === 0
) {
    console.log(
        `✓ All ${tags.size} API tags have a page under src/pages/reference/api/`,
    )
    process.exit(0)
}

if (missingPages.length > 0) {
    console.error(
        `\n✗ ${missingPages.length} API tag(s) in the OpenAPI spec have no page, so /reference/ links to a 404:\n`,
    )
    for (const { tag, slug, count } of missingPages) {
        console.error(
            `    ${slug}.mdx        missing  — tag "${tag}" (${count} endpoint${count === 1 ? '' : 's'})`,
        )
    }
    console.error(
        `\n  Create src/pages/reference/api/<slug>.mdx rendering <ApiTagPage tag="<tag>" />,\n  and add the slug to src/pages/reference/api/_meta.ts.\n`,
    )
}

if (missingMeta.length > 0) {
    console.error(
        `\n✗ ${missingMeta.length} page(s) are missing a _meta.ts entry:\n`,
    )
    for (const { tag, slug } of missingMeta) {
        console.error(`    ${slug}  — add "${slug}: { title: '${tag}' }"`)
    }
    console.error('')
}

if (orphanPages.length > 0) {
    console.error(
        `\n✗ ${orphanPages.length} page(s) render an empty endpoint list — no tag in the spec maps to them:\n`,
    )
    for (const slug of orphanPages) {
        console.error(`    ${slug}.mdx  — tag renamed or removed upstream`)
    }
    console.error(
        '\n  Point the page at the current tag, or remove it and redirect the old\n  URL in next.config.mjs.\n',
    )
}

process.exit(1)
