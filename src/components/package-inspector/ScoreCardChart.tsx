import React from 'react'
import { ScoreCardCheck } from './types'
import { cn } from '@/lib/utils'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

interface ScoreCardChartProps {
    checks: ScoreCardCheck[]
}

function getScoreColor(score: number): string {
    if (score >= 7) return 'bg-green-500'
    if (score >= 4) return 'bg-yellow-500'
    return 'bg-red-500'
}

function getScoreTextColor(score: number): string {
    if (score >= 7) return 'text-green-600 dark:text-green-400'
    if (score >= 4) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
}

function ScoreBar({ check }: { check: ScoreCardCheck }) {
    const percentage = (check.score / 10) * 100

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="group cursor-help">
                        <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {check.name}
                            </span>
                            <span
                                className={cn(
                                    'text-sm font-bold',
                                    getScoreTextColor(check.score),
                                )}
                            >
                                {check.score}/10
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className={cn(
                                    'h-full rounded-full transition-all',
                                    getScoreColor(check.score),
                                )}
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                    <p className="text-sm">{check.reason}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default function ScoreCardChart({ checks }: ScoreCardChartProps) {
    return (
        <div className="space-y-4">
            {checks.map((check) => (
                <ScoreBar key={check.name} check={check} />
            ))}
        </div>
    )
}
