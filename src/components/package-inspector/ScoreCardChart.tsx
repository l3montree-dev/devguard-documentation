import React, { useState } from 'react'
import { ScoreCardCheck } from './types'
import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@document-writing-tools/kernux-theme'
import OverallScoreGauge from './OverallScoreIcon'

interface ScoreCardChartProps {
    checks: ScoreCardCheck[]
    score: number
    updatedAt?: string
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
    Vulnerabilities: 'Whether the project has known unfixed vulnerabilities.',
    Contributors:
        'Whether the project has a healthy number of contributors from different organizations.',
    'Dependency-Update-Tool':
        'Whether the project uses automated tools to keep dependencies up to date.',
    Webhooks:
        'Whether the project uses webhooks with secrets to authenticate deliveries.',
}

function getScoreBadgeClasses(score: number): string {
    if (score < 0) return 'bg-muted text-muted-foreground border border-border'
    if (score === 0) return 'bg-muted text-muted-foreground border border-destructive/60'
    if (score < 8) return 'bg-muted text-muted-foreground border border-warning/60'
    return 'bg-muted text-muted-foreground border border-success/60'
}


function getScoreLabel(score: number): string {
    if (score < 0) return 'N/A'
    return `${score}/10`
}

export default function ScoreCardChart({
    checks,
    score,
    updatedAt,
}: ScoreCardChartProps) {
    const [failingExpanded, setFailingExpanded] = useState(false)
    const [passingExpanded, setPassingExpanded] = useState(false)

    const failing = checks.filter((c) => c.score === 0)
    const passing = checks
        .filter((c) => c.score > 0)
        .sort((a, b) => b.score - a.score)
    const na = checks.filter((c) => c.score < 0)

    return (
        <TooltipProvider delayDuration={200}>
            <div>
                <div className="mb-5 flex flex-wrap items-start justify-between gap-2">
                    <div>
                        <p className="text-muted-foreground text-sm">
                            Supply chain security checks
                        </p>
                        {updatedAt && (
                            <span className="text-muted-foreground font-mono text-xs">
                                Updated{' '}
                                {new Date(updatedAt).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    },
                                )}
                            </span>
                        )}
                    </div>
                    <OverallScoreGauge score={score} />
                </div>

                {/* Failing */}
                {failing.length > 0 && (
                    <div className="mb-4">
                        <button
                            onClick={() => setFailingExpanded(!failingExpanded)}
                            className="text-muted-foreground hover:text-foreground mb-2 text-sm font-semibold tracking-wider uppercase transition-colors"
                        >
                            {failingExpanded ? '▾' : '▸'} Failing (
                            {failing.length})
                        </button>
                        {!failingExpanded ? (
                            <div className="flex flex-wrap gap-1.5">
                                {failing.map((check) => (
                                    <Tooltip key={check.name}>
                                        <TooltipTrigger asChild>
                                            <span
                                                className={cn(
                                                    'inline-flex cursor-default items-center rounded-md px-2.5 py-1 font-mono text-sm font-medium',
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
                                            className="w-64 whitespace-normal"
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
                                            <div className="hover:bg-muted/60 flex cursor-default items-center justify-between rounded-lg px-3.5 py-2 transition-colors">
                                                <span className="text-foreground/80 text-base">
                                                    {check.name}
                                                </span>
                                                <span
                                                    className={cn(
                                                        'inline-flex items-center rounded-md px-2.5 py-1 font-mono text-sm font-medium',
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
                                            className="w-64 whitespace-normal"
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
                    <button
                        onClick={() => setPassingExpanded(!passingExpanded)}
                        className="text-muted-foreground hover:text-foreground mb-2 text-sm font-semibold tracking-wider uppercase transition-colors"
                    >
                        {passingExpanded ? '▾' : '▸'} Passing (
                        {passing.length + na.length})
                    </button>
                    {!passingExpanded ? (
                        <div className="flex flex-wrap gap-1.5">
                            {[...passing, ...na].map((check) => (
                                <Tooltip key={check.name}>
                                    <TooltipTrigger asChild>
                                        <span
                                            className={cn(
                                                'inline-flex cursor-default items-center rounded-md px-2.5 py-1 font-mono text-sm font-medium',
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
                                        className="w-64 whitespace-normal"
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
                                        <div className="hover:bg-muted/60 flex cursor-default items-center justify-between rounded-lg px-3.5 py-2 transition-colors">
                                            <span className="text-foreground/80 text-base">
                                                {check.name}
                                            </span>
                                            <span
                                                className={cn(
                                                    'inline-flex items-center rounded-md px-2.5 py-1 font-mono text-sm font-medium',
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
                                        className="w-64 whitespace-normal"
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
