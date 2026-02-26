import React from 'react'
import { Label, Pie, PieChart } from 'recharts'
import { cn } from '@/lib/utils'
import { ChartContainer } from '@/components/ui/chart'

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

function getScoreLabelColor(score: number): string {
    if (score >= 7) return 'text-green-400'
    if (score >= 4) return 'text-yellow-400'
    return 'text-red-400'
}

function getScoreFill(score: number): string {
    if (score >= 7) return '#4ade80'
    if (score >= 4) return '#facc15'
    return '#f87171'
}

export default function OverallScoreGauge({
    score,
    maxScore = 10,
}: OverallScoreGaugeProps) {
    const data = [
        {
            name: 'Score',
            value: score,
            fill: getScoreFill(score),
        },
        {
            name: 'Remaining',
            value: maxScore - score,
            fill: 'hsl(var(--secondary))',
        },
    ]

    return (
        <div className="flex flex-col items-center">
            <h3 className="mb-2 text-base font-semibold text-white">
                Overall Score
            </h3>
            <div className="h-[154px] w-[154px]">
                <ChartContainer config={{}} className="aspect-square w-full">
                    <PieChart>
                        <Pie
                            data={data}
                            startAngle={-270}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={42}
                            strokeWidth={2}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        'cx' in viewBox &&
                                        'cy' in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {score.toFixed(1)}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 19}
                                                    className="fill-muted-foreground text-sm"
                                                >
                                                    / {maxScore}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </div>
            <span
                className={cn(
                    'mt-2 text-base font-semibold',
                    getScoreLabelColor(score),
                )}
            >
                {getScoreLabel(score)}
            </span>
        </div>
    )
}
