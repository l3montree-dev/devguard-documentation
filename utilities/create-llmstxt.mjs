import { glob, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const root = path.resolve(import.meta.dirname, '..')
const dest = path.join(root, 'public')

// same default as next-sitemap.config.js, no trailing slash so we can join by hand
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.devguard.org').replace(/\/$/, '')

const sectionTitles = {
    '': 'Overview',
    'getting-started': 'Getting Started',
    tutorials: 'Tutorials',
    'how-to-guides': 'How-to Guides',
    reference: 'Reference',
    explanations: 'Explanations',
    comparison: 'Comparison',
    contributing: 'Contributing',
    other: 'Other',
}

// single line, no double spaces, descriptions are written as one list item
function oneLine(value) {
    return String(value ?? '')
        .replace(/\s+/g, ' ')
        .trim()
}

const entries = []

for await (const relPath of glob('**/*.md', { cwd: dest })) {
    const { data } = matter(await readFile(path.join(dest, relPath), 'utf-8'))

    entries.push({
        url: `${siteUrl}/${relPath}`,
        title: oneLine(data.title),
        description: oneLine(data.description),
        section: relPath.includes('/') ? relPath.slice(0, relPath.indexOf('/')) : '',
        // 'a/index.md' -> 'a/' sorts an index page above its siblings
        sortKey: relPath.replace(/(^|\/)index\.md$/, '$1'),
    })
}

if (entries.length === 0) {
    throw new Error('no markdown files in public/ – run utilities/copy-pages-to-public.mjs first')
}

const knownSections = Object.keys(sectionTitles)
const usedSections = [...new Set(entries.map((entry) => entry.section))].sort(
    (a, b) => knownSections.indexOf(a) - knownSections.indexOf(b),
)

// landing page used as summary of the whole site
const home = entries.find((entry) => entry.url === `${siteUrl}/index.md`)

const lines = [
    `# ${home?.title ?? 'DevGuard Documentation'}`,
    '',
    `> ${home?.description ?? 'Documentation for DevGuard, an open source application security platform.'}`,
    '',
    'Every link below points to the Markdown source of a documentation page. Replace the `.md`',
    'suffix with nothing to get the regular HTML page, e.g. `/getting-started/first-scan.md` is',
    'rendered at `/getting-started/first-scan`.',
]

for (const section of usedSections) {
    const heading = sectionTitles[section] ?? section.replace(/-/g, ' ')

    lines.push('', `## ${heading}`, '')
    lines.push(
        ...entries
            .filter((entry) => entry.section === section)
            .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
            .map((entry) => `- [${entry.title}](${entry.url}): ${entry.description}`),
    )
}

await writeFile(path.join(dest, 'llms.txt'), lines.join('\n') + '\n')
console.log(`wrote public/llms.txt with ${entries.length} links in ${usedSections.length} sections`)
