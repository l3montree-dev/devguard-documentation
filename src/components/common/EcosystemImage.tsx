import Image from 'next/image'
import { GitBranch } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Maps ecosystem name (lowercase) to SVG filename under /public/logos/
// Files ending in -svgrepo-com.svg use that suffix; others use their exact filename.
const ECOSYSTEM_TO_LOGO: Record<string, { file: string; invertOnDark?: boolean }> = {
    golang:     { file: 'golang-svgrepo-com.svg' },
    go:         { file: 'golang-svgrepo-com.svg' },
    npm:        { file: 'npm-svgrepo-com.svg' },
    apk:        { file: 'apk-svgrepo-com.svg', invertOnDark: true },
    alpine:     { file: 'apk-svgrepo-com.svg', invertOnDark: true },
    pypi:       { file: 'pypi-svgrepo-com.svg' },
    python:     { file: 'pypi-svgrepo-com.svg' },
    maven:      { file: 'maven-svgrepo-com.svg' },
    cargo:      { file: 'cargo-svgrepo-com.svg', invertOnDark: true },
    'crates.io':{ file: 'crates.io-svgrepo-com.svg' },
    packagist:  { file: 'packagist-svgrepo-com.svg' },
    rubygems:   { file: 'rubygems-svgrepo-com.svg' },
    deb:        { file: 'deb-svgrepo-com.svg' },
    debian:     { file: 'deb-svgrepo-com.svg' },
    bitnami:    { file: 'bitnami-svgrepo-com.svg', invertOnDark: true },
    nuget:      { file: 'nuget-svgrepo-com.svg' },
    nix:        { file: 'nix-svgrepo-com.svg' },
    php:        { file: 'php-svgrepo-com.svg' },
    composer:   { file: 'composer-svgrepo-com.svg' },
    'red hat':  { file: 'Red_Hat_logo.svg' },
}

export default function EcosystemImage({
    ecosystem,
    size = 20,
}: {
    ecosystem: string
    size?: number
}) {
    const key = ecosystem.toLowerCase()
    const entry = ECOSYSTEM_TO_LOGO[key]

    // Lucide icon fallback for git
    if (!entry && key === 'git') {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="inline-flex shrink-0 items-center justify-center text-muted-foreground">
                            <GitBranch width={size} height={size} />
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>{ecosystem}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }

    if (!entry) {
        return (
            <span className="text-muted-foreground bg-muted shrink-0 rounded px-1.5 py-0.5 text-xs">
                {ecosystem}
            </span>
        )
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="shrink-0 inline-flex">
                        <Image
                            alt={`${ecosystem} logo`}
                            width={size}
                            height={size}
                            className={`inline-block${entry.invertOnDark ? ' dark:invert' : ''}`}
                            src={`/logos/${entry.file}`}
                        />
                    </span>
                </TooltipTrigger>
                <TooltipContent>{ecosystem}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
