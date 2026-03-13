import {
    ExternalLink,
    Star,
    GitFork,
    Scale,
    Package,
    ShieldCheck,
} from 'lucide-react'
import { Component, Project } from '@/components/package-inspector/types'
import { Card, CardHeader } from '@/components/ui/card'

interface PackageHeroCardProps {
    packageName: string
    packageManager: string
    component: Component
    project: Project | undefined
    isMalicious: boolean
}

export default function PackageHeroCard({
    packageName,
    packageManager,
    component,
    project,
    isMalicious,
}: PackageHeroCardProps) {
    return (
        <Card className="mb-4">
            <CardHeader>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    {/* Left: Name + badge */}
                    <div className="min-w-0 flex-1">
                        <h1 className="font-mono text-2xl font-semibold leading-none tracking-tight sm:text-[26px]">
                            {packageName}
                        </h1>
                        {component.version && (
                            <span className="font-mono mt-1 block text-sm tracking-wider text-muted-foreground">
                                v{component.version}
                            </span>
                        )}
                        {project?.description && (
                            <span className="mt-1 block text-sm font-light tracking-wide text-muted-foreground">
                                {project.description}
                            </span>
                        )}
                        {project && !isMalicious && (
                            <div className="mt-4 flex flex-col gap-1.5">
                                <div className="font-mono inline-flex w-fit items-center gap-1.5 rounded-[5px] border border-emerald-700/50 bg-emerald-950/30 px-3 py-1.5 text-sm text-emerald-400">
                                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                                    Not flagged as malicious
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Stats + meta + links */}
                    <div className="flex flex-col gap-3 lg:items-end">
                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="font-mono flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
                                <Package className="h-4 w-4 opacity-60" />
                                <span className="font-medium text-foreground/80">
                                    {packageManager}
                                </span>
                            </div>
                            {project && (
                                <>
                                    <div className="font-mono flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
                                        <Scale className="h-4 w-4 opacity-60" />
                                        <span className="font-medium text-foreground/80">
                                            {project.license}
                                        </span>
                                    </div>
                                    <div className="font-mono flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
                                        <Star className="h-4 w-4 opacity-60" />
                                        <span className="font-medium text-foreground/80">
                                            {project.starsCount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="font-mono flex items-center gap-1.5 whitespace-nowrap text-sm text-muted-foreground">
                                        <GitFork className="h-4 w-4 opacity-60" />
                                        <span className="font-medium text-foreground/80">
                                            {project.forksCount.toLocaleString()}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Published */}
                        {component.published && (
                            <div className="flex flex-col lg:items-end">
                                <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                                    Published
                                </span>
                                <span className="font-mono text-xs text-foreground/80">
                                    {new Date(
                                        component.published,
                                    ).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                        )}

                        {/* Links */}
                        {project && (
                            <div className="flex items-center gap-4">
                                <a
                                    href={'https://' + project.projectKey}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono flex items-center gap-[5px] whitespace-nowrap text-sm opacity-85 transition-opacity hover:opacity-100"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    GitHub
                                </a>
                                {project.homepage && (
                                    <a
                                        href={project.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono flex items-center gap-[5px] whitespace-nowrap text-sm opacity-85 transition-opacity hover:opacity-100"
                                    >
                                        <ExternalLink className="h-3 w-3" />
                                        Homepage
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
