import React from 'react'
import {
    Star,
    GitFork,
    Scale,
    ExternalLink,
    Package,
    ShieldCheck,
} from 'lucide-react'
import { Project } from './types'
import { Badge } from '@/components/ui/badge'

interface ProjectStatsProps {
    project: Project
    purl: string
    published?: string
    isMalicious: boolean
}

function StatCard({
    icon: Icon,
    value,
}: {
    icon: React.ElementType
    value: string | number
}) {
    return (
        <div className="flex items-center gap-1 rounded-md border border-gray-700 bg-gray-800 px-4 py-2">
            <Icon className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-semibold text-white">
                {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
        </div>
    )
}

export default function ProjectStats({
    project,
    purl,
    published,
    isMalicious,
}: ProjectStatsProps) {
    const packageManager = purl.replace(/^pkg:/, '').split('/')[0]

    return (
        <div className="space-y-3">
            <p className="line-clamp-2 text-lg text-gray-400">
                {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-2">
                <Badge
                    variant="outline"
                    className="flex w-fit items-center gap-1.5 text-sm"
                >
                    <Package className="h-4 w-4" />
                    {packageManager}
                </Badge>
                <Badge
                    variant="outline"
                    className="flex w-fit items-center gap-1.5 text-sm"
                >
                    <Scale className="h-4 w-4" />
                    {project.license}
                </Badge>
                <StatCard icon={Star} value={project.starsCount} />
                <StatCard icon={GitFork} value={project.forksCount} />
            </div>

            <div className="flex flex-wrap gap-x-4 text-xs text-gray-400">
                {published && (
                    <span>
                        First published:{' '}
                        {new Date(published).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <a
                    href={'https://' + project.projectKey}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-blue-400 hover:underline"
                >
                    <ExternalLink className="h-4 w-4" />
                    View on GitHub
                </a>
            </div>
            <div className="flex flex-wrap items-center">
                {project.homepage && (
                    <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-blue-400 hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Project Homepage
                    </a>
                )}
            </div>
            <div className="flex flex-wrap items-center">
                {!isMalicious && (
                    <div>
                        <div className="flex items-center gap-1.5 rounded-md border border-green-700 bg-green-900/30 px-3 py-2">
                            <ShieldCheck className="h-4 w-4 shrink-0 text-green-400" />
                            <span className="text-xs font-semibold text-green-300">
                                Not flagged as malicious
                            </span>
                        </div>
                        <span className="mt-1 block text-xs text-gray-400">
                            Scorecard updated:{' '}
                            {new Date(project.updatedAt).toLocaleDateString(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
