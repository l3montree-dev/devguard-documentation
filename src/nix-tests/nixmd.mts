import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { relative, join, dirname } from 'node:path'

const OUT_DIR = 'src/nix-tests/tmp'
const PAGES_DIR = 'src/pages'
const CODE_FENCE = /^[ \t]*```(\w*)[ \t]*([^\r\n]*)\r?\n([\s\S]*?)^[ \t]*```/gm

const TEST_VALUES: Record<string, string> = {
    assetName: "testorg/projects/testgroup/assets/testrepo",
    apiUrl: "http://host.docker.internal:8080",
    token: "df8f06f63639f161bf00f04566308aa88580b894c2798e5168ba9a89b572866a",
    webUI: "http://localhost:3000",
}

interface CodeBlock {
    lang: string
    meta: string
    code: string
}

function changeToTestVariables(code: string): string {
    return Object.keys(TEST_VALUES).reduce(
        (result, flag) =>
            result.replace(new RegExp(`(--${flag}=)("[^"]*"|'[^']*'|[^\\s\\\\]*)`, 'g'), `$1"\${${flag}}"`),
        code,
    )
}

function declarationsFor(body: string): string {
    const declarations = Object.entries(TEST_VALUES)
        .filter(([flag]) => body.includes(`\${${flag}}`))
        .map(([flag, value]) => `${flag}="\${${flag}:-${value}}"`)

    return declarations.length === 0 ? '' : declarations.join('\n') + '\n\n'
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
    const body = testBlocks.map((block) => changeToTestVariables(block.code)).join('\n')

    const outPath = outputPathFor(mdxPath)

    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, header + declarationsFor(body) + body)
            
    console.log(`${testBlocks.length} Blöcke → ${outPath}`)
}

convert(process.argv[2])