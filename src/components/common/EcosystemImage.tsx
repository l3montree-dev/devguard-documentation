import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Maps API/OSV ecosystem names (lowercase) to the SVG filename stem
const ECOSYSTEM_TO_LOGO: Record<string, string> = {
    golang: 'golang',
    go: 'golang',
    npm: 'npm',
    apk: 'apk',
    pypi: 'pypi',
    python: 'pypi',
    maven: 'maven',
    cargo: 'cargo',
    'crates.io': 'crates.io',
    packagist: 'packagist',
    rubygems: 'rubygems',
    deb: 'deb',
    bitnami: 'bitnami',
    nuget: 'nuget',
    nix: 'nix',
    php: 'php',
    composer: 'composer',
}

const INVERT_ON_DARK = new Set(['apk', 'bitnami', 'cargo'])

export default function EcosystemImage({
    ecosystem,
    size = 20,
}: {
    ecosystem: string
    size?: number
}) {
    const logo = ECOSYSTEM_TO_LOGO[ecosystem.toLowerCase()]

    if (!logo) {
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
                    <span className="shrink-0">
                        <Image
                            alt={`${ecosystem} logo`}
                            width={size}
                            height={size}
                            className={`inline-block${INVERT_ON_DARK.has(logo) ? ' dark:invert' : ''}`}
                            src={`/logos/${logo}-svgrepo-com.svg`}
                        />
                    </span>
                </TooltipTrigger>
                <TooltipContent>{ecosystem}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
