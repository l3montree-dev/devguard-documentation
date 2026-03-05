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
    if (score >= 8) return 'bg-green-400/15 text-green-400 border-green-400/30'
    if (score >= 6) return 'bg-green-400/10 text-green-300 border-green-300/30'
    if (score >= 4) return 'bg-yellow-400/15 text-yellow-400 border-yellow-400/30'
    if (score >= 2) return 'bg-orange-400/15 text-orange-400 border-orange-400/30'
    return 'bg-red-400/15 text-red-400 border-red-400/30'
}

export default function OverallScoreGauge({
    score,
    maxScore = 10,
}: OverallScoreGaugeProps) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Overall Score</span>
            <span className="font-mono text-lg font-bold text-white">
                {score.toFixed(1)}
                <span className="text-sm font-normal text-gray-500">
                    {' '}
                    / {maxScore}
                </span>
            </span>
            <span
                className={cn(
                    'rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                    getScoreBadgeClasses(score),
                )}
            >
                {getScoreLabel(score)}
            </span>
        </div>
    )
}
