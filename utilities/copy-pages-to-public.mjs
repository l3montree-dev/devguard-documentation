import { glob, mkdir, copyFile, rm } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const source = path.join(root, 'src', 'pages')
const dest = path.join(root, 'public')
const skipFiles = new Set(['404.mdx', 'package-inspector.mdx', 'vulnerability-database.mdx'])
let deleteCount = 0
let copyCount = 0

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
    const from = path.join(source, relPath)
    const to = path.join(dest, relPath.replace(/\.mdx$/, '.md'))

    await mkdir(path.dirname(to), { recursive: true })
    await copyFile(from, to)

    copyCount++
}
console.log(`copied ${copyCount} markdown files to public/`)