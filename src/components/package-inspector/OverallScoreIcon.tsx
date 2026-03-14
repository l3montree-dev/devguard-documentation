import React from 'react'
import { cn } from '@/lib/utils'

interface OverallScoreGaugeProps {
    score: number
    maxScore?: number
}

function getScoreLabel(score: number): string {
    if (score >= 8) return 'Excellent'
    if (score >= 6) return 'Good'
    if (score >= 4) return 'Fair'
    if (score >= 2) return 'Poor'
    return 'Critical'
}

function getScoreBadgeClasses(score: number): string {
    if (score >= 6) return 'bg-success/15 text-success border-success/30'
    if (score >= 2) return 'bg-warning/15 text-warning border-warning/30'
    return 'bg-destructive/15 text-destructive border-destructive/30'
}

export default function OverallScoreGauge({
    score,
    maxScore = 10,
}: OverallScoreGaugeProps) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-sm">Overall Score</span>
            <span className="text-foreground font-mono text-lg font-bold">
                {score.toFixed(1)}
                <span className="text-muted-foreground text-sm font-normal">
                    {' '}
                    / {maxScore}
                </span>
            </span>
            <span
                className={cn(
                    'rounded-md border px-2.5 py-0.5 text-xs font-semibold',
                    getScoreBadgeClasses(score),
                )}
            >
                {getScoreLabel(score)}
            </span>
        </div>
    )
}
