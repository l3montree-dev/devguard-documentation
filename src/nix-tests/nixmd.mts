import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { relative, join, dirname } from 'node:path'

const OUT_DIR = 'src/nix-tests/tmp'
const PAGES_DIR = 'src/pages'
const CODE_FENCE = /^[ \t]*```(\w*)[ \t]*([^\r\n]*)\r?\n([\s\S]*?)^[ \t]*```/gm

interface CodeBlock {
    lang: string
    meta: string
    code: string
}

function extractBlocks(source: string) : CodeBlock[] {
    const result : CodeBlock[] = []

    for (const match of source.matchAll(CODE_FENCE)) {
        result.push({
            lang: match[1],
            meta: match[2],
            code: match[3],
        })
    }

    return result
}

function outputPathFor(mdxPath: string): string {
    const relativePath = relative(PAGES_DIR, mdxPath)
    const shellPath = relativePath.replace(/\.mdx$/, '.sh')

    return join(OUT_DIR, shellPath)
}

function convert(mdxPath: string): void {
    const source = readFileSync(mdxPath, 'utf8')
    const blocks = extractBlocks(source)
    const testBlocks = blocks.filter((block) => block.meta.includes('{test}'))

    if (testBlocks.length === 0) {
        console.log("No codeblocks found for testing.") 
        return
    }
    const header = '#!/usr/bin/env bash\nset -euo pipefail\n\n'
    const body = testBlocks.map((block) => block.code).join('\n')
            
    const outPath = outputPathFor(mdxPath)
            
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, header + body)
            
    console.log(`${testBlocks.length} Blöcke → ${outPath}`)
}

function collectMdxFiles(): string[] {
    const entries = readdirSync(PAGES_DIR, { recursive : true })
    rmSync(OUT_DIR, { recursive: true, force: true })

    return entries
        .map((entry) => String(entry))
        .filter((entry) => entry.endsWith('.mdx'))
        .map((entry) => join(PAGES_DIR, entry))
}

for (const mdxPath of collectMdxFiles()) {
    convert(mdxPath)
}