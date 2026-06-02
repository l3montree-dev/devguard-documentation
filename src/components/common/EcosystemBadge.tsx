import Image from 'next/image'

const ECOSYSTEM_TO_LOGO: Record<string, string> = {
    golang: 'golang',
    go: 'golang',
    npm: 'npm',
    apk: 'apk',
    alpine: 'apk',
    pypi: 'pypi',
    python: 'pypi',
    maven: 'maven',
    cargo: 'cargo',
    'crates.io': 'crates.io',
    packagist: 'packagist',
    rubygems: 'rubygems',
    deb: 'deb',
    debian: 'deb',
    bitnami: 'bitnami',
    nuget: 'nuget',
    nix: 'nix',
    php: 'php',
    composer: 'composer',
}

const INVERT_ON_DARK = new Set(['apk', 'bitnami', 'cargo'])

interface Props {
    ecosystem: string
    size?: number
}

export default function EcosystemBadge({ ecosystem, size = 14 }: Props) {
    const key = ecosystem.toLowerCase()
    const logo = ECOSYSTEM_TO_LOGO[key]

    return (
        <span className="inline-flex items-center gap-1.5">
            {logo && (
                <Image
                    alt=""
                    width={size}
                    height={size}
                    className={`inline-block shrink-0${INVERT_ON_DARK.has(logo) ? ' dark:invert' : ''}`}
                    src={`/logos/${logo}-svgrepo-com.svg`}
                />
            )}
            <span>{ecosystem}</span>
        </span>
    )
}
