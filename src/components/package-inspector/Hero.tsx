import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { HeroSection } from '@/components/ui/hero-input'
import { cn } from '@/lib/utils'

const ECOSYSTEMS = [
    { label: 'alpine', value: 'alpine' },
    { label: 'bitnami', value: 'bitnami' },
    { label: 'crates.io', value: 'crates.io' },
    { label: 'debian', value: 'debian' },
    { label: 'git', value: 'git' },
    { label: 'go', value: 'go' },
    { label: 'hex', value: 'hex' },
    { label: 'maven', value: 'maven' },
    { label: 'npm', value: 'npm' },
    { label: 'nuget', value: 'nuget' },
    { label: 'opam', value: 'opam' },
    { label: 'oss-fuzz', value: 'oss-fuzz' },
    { label: 'packagist', value: 'packagist' },
    { label: 'pub', value: 'pub' },
    { label: 'red-hat', value: 'red-hat' },
    { label: 'rubygems', value: 'rubygems' },
]

interface PackageInspectorHeroProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    onSearch: (purl?: string) => void
    error?: string | null
    isSearching?: boolean
}

export function PackageInspectorHero({
    searchTerm,
    setSearchTerm,
    onSearch,
    error,
    isSearching,
}: PackageInspectorHeroProps) {
    const [mode, setMode] = useState<'idle' | 'structured' | 'direct'>('idle')
    const [ecosystem, setEcosystem] = useState('npm')
    const [packageName, setPackageName] = useState('')
    const [version, setVersion] = useState('')

    const [versionError, setVersionError] = useState<string | null>(null)

    const isValidVersion = (v: string) => {
        if (!v) return true
        return /^\d+(\.\d+){0,2}([+._-].+)?$/.test(v)
    }

    const handleStructuredSubmit = () => {
        setVersionError(null)
        if (!packageName.trim() || !version.trim()) {
            setVersionError('Please fill in both fields. Example: next 16.0.1')
            return
        }
        if (!isValidVersion(version.trim())) {
            setVersionError('Invalid version format. Example: next 16.0.1')
            return
        }
        const versionPart = version.trim() ? `@${version.trim()}` : ''
        const purl = `pkg:${ecosystem}/${packageName.trim()}${versionPart}`
        setSearchTerm(purl)
        onSearch(purl)
    }

    const inputBaseClass =
        'h-12 w-full rounded-xl border border-input bg-transparent text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:bg-input/30 md:text-lg'

    return (
        <div className="relative">
            <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8 lg:py-40">
                <HeroSection
                    title="Package Inspector"
                    subtitle={
                        <>
                            Analyze Your Dependencies, Uncover Hidden Risks.
                        </>
                    }
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (mode === 'structured')
                                handleStructuredSubmit()
                            else onSearch()
                        }}
                    >
                        <div className="relative">
                            {mode === 'idle' && (
                                <div className="group relative">
                                    <Search
                                        className="absolute left-3 h-5 w-5 text-muted-foreground"
                                        style={{ top: '2.125rem' }}
                                    />
                                    <input
                                        readOnly
                                        placeholder="Search purl..."
                                        className={cn(
                                            inputBaseClass,
                                            'mt-5 cursor-pointer pl-10 pr-2.5',
                                            error
                                                ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50'
                                                : '',
                                        )}
                                        onFocus={() => setMode('structured')}
                                        disabled={isSearching}
                                    />
                                </div>
                            )}

                            {mode === 'structured' && (
                                <>
                                    <div
                                        className={cn(
                                            'mt-5 flex items-center rounded-xl border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30',
                                            error
                                                ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/50'
                                                : '',
                                        )}
                                    >
                                        <div className="relative flex items-center">
                                            <select
                                                value={ecosystem}
                                                onChange={(e) =>
                                                    setEcosystem(e.target.value)
                                                }
                                                className="h-12 appearance-none bg-transparent pl-3 pr-7 text-base outline-none rounded-l-xl cursor-pointer md:text-lg"
                                                disabled={isSearching}
                                            >
                                                {ECOSYSTEMS.map((eco) => (
                                                    <option
                                                        key={eco.value}
                                                        value={eco.value}
                                                    >
                                                        {eco.label}
                                                    </option>
                                                ))}
                                            </select>
                                            <ChevronDown className="pointer-events-none absolute right-1.5 h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div className="h-8 w-px bg-input" />
                                        <input
                                            type="text"
                                            value={packageName}
                                            onChange={(e) =>
                                                setPackageName(e.target.value)
                                            }
                                            placeholder="Name"
                                            className="h-12 flex-1 min-w-0 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground md:text-lg"
                                            disabled={isSearching}
                                            autoFocus
                                        />
                                        <div className="h-8 w-px bg-input" />
                                        <input
                                            type="text"
                                            value={version}
                                            onChange={(e) => {
                                                setVersion(e.target.value)
                                                setVersionError(null)
                                            }}
                                            placeholder="Version"
                                            className="h-12 w-28 bg-transparent px-3 text-base outline-none placeholder:text-muted-foreground rounded-r-xl md:text-lg"
                                            disabled={isSearching}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setMode('direct')}
                                        className="pl-1 mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Direct Search
                                    </button>
                                </>
                            )}

                            {mode === 'direct' && (
                                <>
                                    <div
                                        className={cn(
                                            'mt-5 flex items-center rounded-xl border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30',
                                            error
                                                ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/50'
                                                : '',
                                        )}
                                    >
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            placeholder="pkg:eco/name@version"
                                            className="h-12 flex-1 min-w-0 bg-transparent pl-3 pr-2.5 text-base outline-none placeholder:text-muted-foreground rounded-xl md:text-lg"
                                            disabled={isSearching}
                                            autoFocus
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setMode('structured')}
                                        className="pl-1 mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Guided Search
                                    </button>
                                </>
                            )}

                            <button type="submit" className="hidden" />

                            {(error || versionError) && (
                                <div className="pl-1 mt-2 text-sm text-red-400">
                                    {versionError || error}
                                </div>
                            )}
                        </div>
                    </form>
                </HeroSection>
            </div>
        </div>
    )
}
