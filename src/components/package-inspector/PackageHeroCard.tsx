import {
    ExternalLink,
    Star,
    GitFork,
    Scale,
    Package,
    ShieldAlert,
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
                        <h1 className="font-mono text-2xl leading-none font-semibold tracking-tight sm:text-[26px]">
                            {packageName}
                        </h1>
                        {component.version && (
                            <span className="text-muted-foreground mt-1 block font-mono text-sm tracking-wider">
                                v{component.version}
                            </span>
                        )}
                        {project?.description && (
                            <span className="text-muted-foreground mt-1 block text-sm font-light tracking-wide">
                                {project.description}
                            </span>
                        )}
                        {project && (
                            <div className="mt-4 flex flex-col gap-1.5">
                                {isMalicious ? (
                                    <div className="border-destructive/30 bg-destructive/10 text-destructive inline-flex w-fit items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-sm">
                                        <ShieldAlert className="h-3.5 w-3.5 shrink-0" />
                                        Flagged as malicious
                                    </div>
                                ) : (
                                    <div className="border-success/30 bg-success/10 text-success inline-flex w-fit items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-sm">
                                        <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                                        Not flagged as malicious
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: Stats + meta + links */}
                    <div className="flex flex-col gap-3 lg:items-end">
                        {/* Stats row */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-sm whitespace-nowrap">
                                <Package className="h-4 w-4 opacity-60" />
                                <span className="text-foreground/80 font-medium">
                                    {packageManager}
                                </span>
                            </div>
                            {project && (
                                <>
                                    <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-sm whitespace-nowrap">
                                        <Scale className="h-4 w-4 opacity-60" />
                                        <span className="text-foreground/80 font-medium">
                                            {project.license}
                                        </span>
                                    </div>
                                    <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-sm whitespace-nowrap">
                                        <Star className="h-4 w-4 opacity-60" />
                                        <span className="text-foreground/80 font-medium">
                                            {project.starsCount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-sm whitespace-nowrap">
                                        <GitFork className="h-4 w-4 opacity-60" />
                                        <span className="text-foreground/80 font-medium">
                                            {project.forksCount.toLocaleString()}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Published */}
                        {component.published && (
                            <div className="flex flex-col lg:items-end">
                                <span className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
                                    Published
                                </span>
                                <span className="text-foreground/80 font-mono text-xs">
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
                                    className="flex items-center gap-[5px] font-mono text-sm whitespace-nowrap opacity-85 transition-opacity hover:opacity-100"
                                >
                                    <ExternalLink className="h-3 w-3" />
                                    GitHub
                                </a>
                                {project.homepage && (
                                    <a
                                        href={project.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-[5px] font-mono text-sm whitespace-nowrap opacity-85 transition-opacity hover:opacity-100"
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
