import React, { useState } from 'react'
import { ScoreCardCheck } from './types'
import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import OverallScoreGauge from './OverallScoreIcon'

interface ScoreCardChartProps {
    checks: ScoreCardCheck[]
    score: number
}

const checkDescriptions: Record<string, string> = {
    Maintained:
        'Whether the project is actively maintained with recent commits and issue activity.',
    'Code-Review':
        'Whether the project requires code review before changes are merged.',
    'CII-Best-Practices':
        'Whether the project has earned a CII Best Practices Badge.',
    'Dangerous-Workflow':
        'Whether the project avoids dangerous coding patterns in CI/CD workflows.',
    License: 'Whether the project declares a license.',
    'Token-Permissions':
        'Whether the project follows the principle of least privilege for workflow tokens.',
    'Branch-Protection':
        'Whether the project uses branch protection settings on its default branch.',
    'Signed-Releases':
        'Whether the project cryptographically signs release artifacts.',
    'Security-Policy':
        'Whether the project has a published security policy (SECURITY.md).',
    'Binary-Artifacts':
        'Whether the project avoids checked-in binary artifacts in the source repository.',
    Packaging:
        'Whether the project is published as a package through an official build system.',
    Fuzzing:
        'Whether the project uses fuzzing tools to discover potential vulnerabilities.',
    'Pinned-Dependencies':
        'Whether the project pins dependencies to specific versions instead of mutable tags.',
    SAST: 'Whether the project runs static analysis tools to catch bugs before they ship.',
    Vulnerabilities:
        'Whether the project has known unfixed vulnerabilities.',
    Contributors:
        'Whether the project has a healthy number of contributors from different organizations.',
    'Dependency-Update-Tool':
        'Whether the project uses automated tools to keep dependencies up to date.',
    Webhooks:
        'Whether the project uses webhooks with secrets to authenticate deliveries.',
}

function getScoreColor(score: number): string {
    if (score >= 4) return 'bg-primary'
    return 'bg-red-500'
}

function getScoreBadgeClasses(score: number): string {
    if (score < 0) return 'bg-gray-500/15 text-gray-500'
    if (score === 0) return 'bg-red-500/15 text-red-400'
    if (score < 5) return 'bg-orange-400/15 text-orange-400'
    if (score < 8) return 'bg-yellow-400/15 text-yellow-400'
    return 'bg-green-400/15 text-green-400'
}

function getScoreBarColor(score: number): string {
    if (score < 5) return 'bg-orange-400'
    if (score < 8) return 'bg-yellow-400'
    return 'bg-green-400'
}

function getScoreLabel(score: number): string {
    if (score < 0) return 'N/A'
    return `${score}/10`
}

export default function ScoreCardChart({ checks, score }: ScoreCardChartProps) {
    const [expanded, setExpanded] = useState(false)

    const failing = checks.filter((c) => c.score === 0)
    const passing = checks
        .filter((c) => c.score > 0)
        .sort((a, b) => b.score - a.score)
    const na = checks.filter((c) => c.score < 0)

    return (
        <TooltipProvider delayDuration={200}>
            <div>
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-white">
                            Open SSF Scorecard
                        </h2>
                        <p className="mt-0.5 text-xs text-gray-500">
                            Supply chain security checks
                        </p>
                    </div>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-gray-200"
                    >
                        {expanded ? '↑ Collapse' : '↓ Show all'}
                    </button>
                </div>

                <div className="mb-5 flex justify-center">
                    <OverallScoreGauge score={score} checks={checks} />
                </div>

                {/* Failing */}
                {failing.length > 0 && (
                    <div className="mb-4">
                        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                            ● Failing
                        </div>
                        {!expanded ? (
                            <div className="flex flex-wrap gap-1.5">
                                {failing.map((check) => (
                                    <Tooltip key={check.name}>
                                        <TooltipTrigger asChild>
                                            <span
                                                className={cn(
                                                    'inline-flex cursor-default items-center rounded-md px-2.5 py-1 font-mono text-xs font-medium',
                                                    getScoreBadgeClasses(
                                                        check.score,
                                                    ),
                                                )}
                                            >
                                                {check.name}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="top"
                                            className="max-w-xs"
                                        >
                                            {checkDescriptions[check.name] ??
                                                check.reason}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-0.5">
                                {failing.map((check) => (
                                    <Tooltip key={check.name}>
                                        <TooltipTrigger asChild>
                                            <div className="flex cursor-default items-center justify-between rounded-lg px-3.5 py-2 transition-colors hover:bg-white/[0.04]">
                                                <span className="text-sm text-gray-300">
                                                    {check.name}
                                                </span>
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-medium',
                                                        getScoreBadgeClasses(
                                                            check.score,
                                                        ),
                                                    )}
                                                >
                                                    {getScoreLabel(check.score)}
                                                </span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent
                                            side="top"
                                            className="max-w-xs"
                                        >
                                            {checkDescriptions[check.name] ??
                                                check.reason}
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Passing + N/A */}
                <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        ● Passing
                    </div>
                    {!expanded ? (
                        <div className="flex flex-wrap gap-1.5">
                            {[...passing, ...na].map((check) => (
                                <Tooltip key={check.name}>
                                    <TooltipTrigger asChild>
                                        <span
                                            className={cn(
                                                'inline-flex cursor-default items-center rounded-md px-2.5 py-1 font-mono text-xs font-medium',
                                                getScoreBadgeClasses(
                                                    check.score,
                                                ),
                                            )}
                                        >
                                            {check.name}
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="top"
                                        className="max-w-xs"
                                    >
                                        {checkDescriptions[check.name] ??
                                            check.reason}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-0.5">
                            {[...passing, ...na].map((check) => (
                                <Tooltip key={check.name}>
                                    <TooltipTrigger asChild>
                                        <div className="flex cursor-default items-center justify-between rounded-lg px-3.5 py-2 transition-colors hover:bg-white/[0.04]">
                                            <span className="text-sm text-gray-300">
                                                {check.name}
                                            </span>
                                            <div className="flex items-center gap-2.5">
                                                {check.score > 0 && (
                                                    <div className="h-1 w-20 overflow-hidden rounded-full bg-white/[0.06]">
                                                        <div
                                                            className={cn(
                                                                'h-full rounded-full',
                                                                getScoreBarColor(
                                                                    check.score,
                                                                ),
                                                            )}
                                                            style={{
                                                                width: `${check.score * 10}%`,
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs font-medium',
                                                        getScoreBadgeClasses(
                                                            check.score,
                                                        ),
                                                    )}
                                                >
                                                    {getScoreLabel(
                                                        check.score,
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent
                                        side="top"
                                        className="max-w-xs"
                                    >
                                        {checkDescriptions[check.name] ??
                                            check.reason}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </TooltipProvider>
    )
}
