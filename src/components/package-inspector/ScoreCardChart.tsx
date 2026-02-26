import React, { useState } from 'react'
import { ScoreCardCheck } from './types'
import { cn } from '@/lib/utils'

interface ScoreCardChartProps {
    checks: ScoreCardCheck[]
}

function getScoreColor(score: number): string {
    if (score >= 4) return 'bg-primary'
    return 'bg-red-500'
}

function getScoreTextColor(score: number): string {
    if (score >= 4) return 'text-primary'
    return 'text-red-500'
}

function ScoreBar({ check }: { check: ScoreCardCheck }) {
    const [open, setOpen] = useState(false)
    const isNA = check.score < 0
    const percentage = isNA ? 0 : (check.score / 10) * 100

    return (
        <div>
            <div className="mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm font-medium text-gray-300">
                    <button
                        type="button"
                        onClick={() => setOpen(!open)}
                        className={cn(
                            'inline-flex items-center justify-center text-gray-400 transition-transform hover:text-gray-200',
                            open && 'rotate-90',
                        )}
                        aria-expanded={open}
                        aria-label={`Toggle reason for ${check.name}`}
                    >
                        ▶
                    </button>
                    {check.name}
                </span>
                <span
                    className={cn(
                        'text-sm font-bold',
                        isNA ? 'text-gray-500' : getScoreTextColor(check.score),
                    )}
                >
                    {isNA ? 'N/A' : `${check.score}/10`}
                </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                {!isNA && (
                    <div
                        className={cn(
                            'h-full rounded-full transition-all',
                            getScoreColor(check.score),
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                )}
            </div>
            {open && (
                <p className="mt-1 text-xs text-gray-300">{check.reason}</p>
            )}
        </div>
    )
}

export default function ScoreCardChart({ checks }: ScoreCardChartProps) {
    return (
        <div className="space-y-2">
            {checks.map((check) => (
                <ScoreBar key={check.name} check={check} />
            ))}
        </div>
    )
}
