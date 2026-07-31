import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { relative, join, sep } from 'node:path'

const OUT_DIR = 'src/nix-tests/tmp'
const PAGES_DIR = 'src/pages'
const CODE_FENCE = /^[ \t]*```(\w*)[ \t]*([^\r\n]*)\r?\n([\s\S]*?)^[ \t]*```/gm
const SHELL_LANGS = new Set(['bash', 'sh', 'shell'])
const BLOCKING_HINT = /^[ \t]*#[ \t]*hint:.*\bblock/i
const BLANK_OR_COMMENT = /^[ \t]*(#|$)/
const LINE_CONTINUATION = /\\[ \t]*$/

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

function endOfCommand(lines: string[], start: number): number {
    let end = start

    while (end < lines.length - 1 && LINE_CONTINUATION.test(lines[end])) {
        end++
    }

    return end
}

function startOfCommand(lines: string[], afterHint: number): number {
    let start = afterHint

    while (start < lines.length && BLANK_OR_COMMENT.test(lines[start])) {
        start++
    }

    return start
}

function backgroundHintedCommands(code: string): string {
    const lines = code.split('\n')

    for (let index = 0; index < lines.length; index++) {
        if (!BLOCKING_HINT.test(lines[index])) {
            continue
        }

        const start = startOfCommand(lines, index + 1)

        if (start >= lines.length) {
            break
        }

        const end = endOfCommand(lines, start)
        const command = lines[end].trimEnd()

        if (!command.endsWith('&')) {
            lines[end] = `${command} &`
        }

        index = end
    }

    return lines.join('\n')
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
    const fileName = relativePath.replace(/\.mdx$/, '').split(sep).join('-') + '.sh'

    return join(OUT_DIR, fileName)
}

function convert(mdxPath: string): void {
    const source = readFileSync(mdxPath, 'utf8')
    const blocks = extractBlocks(source)
    const testBlocks = blocks.filter(
        (block) => SHELL_LANGS.has(block.lang) && !block.meta.includes('{ignore}'),
    )

    if (testBlocks.length === 0) {
        return
    }
    const header = '#!/usr/bin/env bash\nset -euo pipefail\n\n'
    const body = testBlocks
        .map((block) => backgroundHintedCommands(changeToTestVariables(block.code)))
        .join('\n')

    const outPath = outputPathFor(mdxPath)

    mkdirSync(OUT_DIR, { recursive: true })
    writeFileSync(outPath, header + declarationsFor(body) + body)
            
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