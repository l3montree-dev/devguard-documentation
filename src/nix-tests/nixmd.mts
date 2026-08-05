import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, copyFileSync } from 'node:fs'
import { relative, join, sep, basename, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const TMP_DIR = 'src/nix-tests/tmp'
const PAGES_DIR = 'src/pages'
const CODE_FENCE = /^[ \t]*```(\w*)[ \t]*([^\r\n]*)\r?\n([\s\S]*?)^[ \t]*```/gm
const SHELL_LANGS = new Set(['bash', 'sh', 'shell'])
const BLOCKING_HINT = /^[ \t]*#[ \t]*hint:.*\bblock/i
const BLANK_OR_COMMENT = /^[ \t]*(#|$)/
const LINE_CONTINUATION = /\\[ \t]*$/

const SSH_REMOTE = /git@([A-Za-z0-9.-]+):([A-Za-z0-9._\/-]+)/g

const VARIABLE_FLAGS = ['assetName', 'apiUrl', 'token', 'webUI']

const SHELL_NIX = 'src/nix-tests/shell.nix'
const SCRIPT_TIMEOUT = process.env.SCRIPT_TIMEOUT ?? '300'
const NIXPKGS_URL = 'https://github.com/NixOS/nixpkgs/tarball/nixos-26.05'
const EXAMPLE_REPO_URL =
    process.env.EXAMPLE_REPO_URL ?? 'https://github.com/l3montree-dev/devguard-example-repository.git'
const EXAMPLE_REPO_DIR = join(TMP_DIR, 'example-repository')
const VEX_SOURCE = 'public/example-files/ingesting/vex-accepted.json'

const REQUIRED_ENV = ['assetName', 'apiUrl', 'token', 'webUI'] as const

const MDX_FILES = [
    'src/pages/getting-started/first-scan.mdx',
    'src/pages/contributing/getting-started.mdx',
    'src/pages/how-to-guides/scanning/upload-vex.mdx',
]

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

function extractBlocks(source: string): CodeBlock[] {
    const result: CodeBlock[] = []

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

    return join(TMP_DIR, fileName)
}

function convert(mdxPath: string): string | null {
    const source = readFileSync(mdxPath, 'utf8')
    const blocks = extractBlocks(source)
    const testBlocks = blocks.filter(
        (block) => SHELL_LANGS.has(block.lang) && !block.meta.includes('{ignore}'),
    )

    if (testBlocks.length === 0) {
        return null
    }

    const header = "#!/usr/bin/env bash\nset -euo pipefail\ntrap 'kill $(jobs -p) 2>/dev/null || true' EXIT\n\n"
    const body = testBlocks
        .map((block) => backgroundHintedCommands(httpsRemotes(changeToTestVariables(block.code))))
        .join('\n')

    const outPath = outputPathFor(mdxPath)

    mkdirSync(TMP_DIR, { recursive: true })
    writeFileSync(outPath, header + body)

    console.log(`${testBlocks.length} Blocks → ${outPath}`)

    return outPath
}

const shQuote = (value: string): string => `'${value.replace(/'/g, `'\\''`)}'`

function assertRequiredEnv(): void {
    const missing = REQUIRED_ENV.filter((name) => !process.env[name])

    if (missing.length > 0) {
        throw new Error(
            `Missing variables: ${missing.join(', ')}.`,
        )
    }
}

function main(): void {
    assertRequiredEnv()

    const env = {
        ...process.env,
        NIX_PATH: `nixpkgs=${NIXPKGS_URL}`,
        DEVGUARD_APIURL: process.env.apiUrl,
        DEVGUARD_TOKEN: process.env.token,
    }

    rmSync(TMP_DIR, { recursive: true, force: true })
    mkdirSync(TMP_DIR, { recursive: true })

    try {
        console.log(`Cloning ${EXAMPLE_REPO_URL} ..`)
        execFileSync('git', ['clone', '--depth', '1', EXAMPLE_REPO_URL, EXAMPLE_REPO_DIR], {
            stdio: 'inherit',
            env,
        })

        console.log('Getting all the code blocks together..')
        const scripts = MDX_FILES.map(convert).filter((path): path is string => path !== null)

        const workRoot = join(TMP_DIR, 'work')
        mkdirSync(workRoot, { recursive: true })

        let failed = false

        for (const script of scripts) {
            console.log(`==> ${script}`)

            const workDir = join(workRoot, basename(script, '.sh'))
            rmSync(workDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
            cpSync(EXAMPLE_REPO_DIR, workDir, { recursive: true })
            copyFileSync(VEX_SOURCE, join(workDir, 'vex.json'))
            execFileSync('chmod', ['-R', 'a+rwX', workDir], { stdio: 'inherit' })

            const inner =
                `cd ${shQuote(resolve(workDir))} && ` +
                `timeout ${SCRIPT_TIMEOUT} bash ${shQuote(resolve(script))}`

            try {
                execFileSync('nix-shell', [SHELL_NIX, '--run', inner], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    env,
                })
                console.log(`OK: ${script}`)
            } catch {
                console.error(`FAILED: ${script}`)
                failed = true
            }
        }
        process.exitCode = failed ? 1 : 0
    } finally {
        rmSync(TMP_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
    }
}

main()
