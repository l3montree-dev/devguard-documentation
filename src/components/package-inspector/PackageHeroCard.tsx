import {
    ExternalLink,
    Star,
    GitFork,
    Scale,
    Package,
    ShieldCheck,
} from 'lucide-react'
import { Component, Project } from '@/components/package-inspector/types'

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
        <div className="relative mb-4 flex items-center overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 px-7 py-[16px] justify-between">
            <div>
            {/* Name */}
            <div className="flex min-w-[160px] flex-col gap-0.5 pr-7">
                <h1 className="font-mono text-[22px] font-semibold leading-none tracking-tight text-[#f0f0f0]">
                    {packageName}
                </h1>
                {component.version && (
                    <span className="mt-1 font-mono tracking-wider text-xs text-gray-500">
                        v{component.version}
                    </span>
                )}
                {project?.description && (
                    <span className="mt-1 text-xs text-gray-500 font-light tracking-wide">
                        {project.description}
                    </span>
                )}
            </div>
            {/* Badge */}
            {project && !isMalicious && (
                <div className="flex flex-shrink-0 flex-col gap-1.5 pt-5">
                    <div className="flex items-center gap-1.5 rounded-[5px] border border-[#1e4d35] bg-[#0f2a1e] px-3 py-1.5 font-mono text-[11px] text-emerald-400">
                        <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                        Not flagged as malicious
                    </div>
                    <span className="pl-0.5 font-mono text-xs text-gray-500">
                        Scorecard:{' '}
                        {new Date(
                            project.updatedAt,
                        ).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </span>
                </div>
            )}
            </div>

            <div className='flex flex-col items-end gap-3'>
            {/* Stats */}
            <div className="flex items-center gap-5 pl-7">
                <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-[#888]">
                    <Package className="h-3.5 w-3.5 opacity-60" />
                    <span className="font-medium text-[#bbb]">
                        {packageManager}
                    </span>
                </div>
                {project && (
                    <>
                        <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-[#888]">
                            <Scale className="h-[13px] w-[13px] opacity-60" />
                            <span className="font-medium text-[#bbb]">
                                {project.license}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-[#888]">
                            <Star className="h-[13px] w-[13px] opacity-60" />
                            <span className="font-medium text-[#bbb]">
                                {project.starsCount.toLocaleString('de-DE')}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-[#888]">
                            <GitFork className="h-[13px] w-[13px] opacity-60" />
                            <span className="font-medium text-[#bbb]">
                                {project.forksCount.toLocaleString('de-DE')}
                            </span>
                        </div>
                    </>
                )}
            </div>



            {/* Meta: Published */}
            {component.published && (
                <div className="flex flex-col items-end pl-7">
                    <span className="font-mono uppercase tracking-widest text-xs text-gray-500">
                        Published
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">
                        {new Date(component.published).toLocaleDateString(
                            'en-US',
                            {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            },
                        )}
                    </span>
                </div>
            )}

            {/* Links */}
            {project && (
                <div className="flex items-center gap-4 pl-7">
                    <a
                        href={'https://' + project.projectKey}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-[5px] whitespace-nowrap font-mono text-[11px] text-emerald-400 opacity-85 transition-opacity hover:opacity-100"
                    >
                        <ExternalLink className="h-[11px] w-[11px]" />
                        GitHub
                    </a>
                    {project.homepage && (
                        <a
                            href={project.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-[5px] whitespace-nowrap font-mono text-[11px] text-emerald-400 opacity-85 transition-opacity hover:opacity-100"
                        >
                            <ExternalLink className="h-[11px] w-[11px]" />
                            Homepage
                        </a>
                    )}
                </div>
            )}
</div>            
        </div>
    )
}
