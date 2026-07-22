import { glob, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'src', 'pages')
const dest = path.join(root, 'public')
const skipFiles = new Set(['404.mdx', 'package-inspector.mdx', 'vulnerability-database.mdx'])
let deleteCount = 0
let copyCount = 0
let noindexCount = 0

// delete old, previously copied files first so deleted or renamed files don't get 
// served indefinitely by accident due to gitignore
for await (const old of glob('**/*.md', { cwd: dest })) {
    await rm(path.join(dest, old))
    deleteCount++
}
console.log(`deleted ${deleteCount} old files from public/ for clean state before copying`)

for await (const relPath of glob('**/*.{md,mdx}', { cwd: source })) {
    if (skipFiles.has(relPath)) {
        continue
    }
    const content = await readFile(path.join(source, relPath), 'utf-8')
    
    if (matter(content).data.seo?.robots?.includes('noindex')) {
        noindexCount++
        continue
    }

    const to = path.join(dest, relPath.replace(/\.mdx$/, '.md'))

    await mkdir(path.dirname(to), { recursive: true })
    await writeFile(to, content)

    copyCount++
}
console.log(`copied ${copyCount} markdown files to public/, skipped ${noindexCount} noindex pages`)