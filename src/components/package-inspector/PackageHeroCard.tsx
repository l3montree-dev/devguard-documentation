import { Package, ShieldAlert, ShieldCheck } from 'lucide-react'
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
        <div className="mb-6">
            {/* Name + badges */}
            <div className="mb-2 flex flex-wrap items-center gap-3">
                <h1 className="font-mono text-2xl font-bold sm:text-3xl">
                    {packageName}
                </h1>

                {/* Ecosystem badge */}
                <span className="border-muted-foreground/20 bg-muted-foreground/10 text-muted-foreground inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide">
                    <Package className="h-3 w-3" />
                    {packageManager}
                </span>

                {/* Malicious badge */}
                {project &&
                    (isMalicious ? (
                        <span className="border-destructive/30 bg-destructive/15 text-destructive inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide">
                            <ShieldAlert className="h-3 w-3" />
                            MALICIOUS
                        </span>
                    ) : (
                        <span className="border-success/30 bg-success/15 text-success inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wide">
                            <ShieldCheck className="h-3 w-3" />
                            SAFE
                        </span>
                    ))}
            </div>

            {/* Version */}
            {component.version && (
                <div className="text-muted-foreground flex flex-wrap items-center gap-1 text-xs">
                    <span>Version v{component.version}</span>
                </div>
            )}
        </div>
    )
}
