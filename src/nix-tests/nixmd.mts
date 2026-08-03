import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { relative, join, sep } from 'node:path'

const OUT_DIR = 'src/nix-tests/tmp'
const PAGES_DIR = 'src/pages'
const CODE_FENCE = /^[ \t]*```(\w*)[ \t]*([^\r\n]*)\r?\n([\s\S]*?)^[ \t]*```/gm
const SHELL_LANGS = new Set(['bash', 'sh', 'shell'])
const BLOCKING_HINT = /^[ \t]*#[ \t]*hint:.*\bblock/i
const BLANK_OR_COMMENT = /^[ \t]*(#|$)/
const LINE_CONTINUATION = /\\[ \t]*$/

const SSH_REMOTE = /git@([A-Za-z0-9.-]+):([A-Za-z0-9._\/-]+)/g

const VARIABLE_FLAGS = ['assetName', 'apiUrl', 'token', 'webUI']

const VARIABLE_PATTERNS: [RegExp, string][] = [
    [/https:\/\/(?:api|app)\.devguard\.org/g, '${apiUrl}'],
    [/https:\/\/<your-devguard-url>/g, '${apiUrl}'],
    [/\b(DEVGUARD_TOKEN|DEVGUARD_PAT|devguard-token)=("[^"]*"|'[^']*'|[^\s\\]*)/g, '$1="${token}"'],
    [/Bearer +[^"'\s]+/g, 'Bearer ${token}'],
]

interface CodeBlock {
    lang: string
    meta: string
    code: string
}

function changeToTestVariables(code: string): string {
    const withFlagValues = VARIABLE_FLAGS.reduce(
        (result, flag) =>
            result.replace(
                new RegExp(`(--${flag})[= ]("[^"]*"|'[^']*'|[^\\s\\\\]*)`, 'g'),
                (_, flagName: string, value: string) => {
                    const quote = value.startsWith("'") ? "'" : '"'

                    return `${flagName}=${quote}\${${flag}}${quote}`
                },
            ),
        code,
    )

    return VARIABLE_PATTERNS.reduce(
        (result, [pattern, replacement]) => result.replace(pattern, replacement),
        withFlagValues,
    )
}

function httpsRemotes(code: string): string {
    return code.replace(SSH_REMOTE, 'https://$1/$2')
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
        .map((block) => backgroundHintedCommands(httpsRemotes(changeToTestVariables(block.code))))
        .join('\n')

    const outPath = outputPathFor(mdxPath)

    mkdirSync(OUT_DIR, { recursive: true })
    writeFileSync(outPath, header + body)
            
    console.log(`${testBlocks.length} Blöcke → ${outPath}`)
}

convert(process.argv[2])