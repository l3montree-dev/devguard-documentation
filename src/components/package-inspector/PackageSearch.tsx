import { useState } from 'react'
import { ChevronDown, Loader2, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const ECOSYSTEMS = [
    { label: 'Alpine', value: 'alpine' },
    { label: 'Bitnami', value: 'bitnami' },
    { label: 'Crates.io', value: 'crates.io' },
    { label: 'Debian', value: 'debian' },
    { label: 'Git', value: 'git' },
    { label: 'Go', value: 'golang' },
    { label: 'Hex', value: 'hex' },
    { label: 'Maven', value: 'maven' },
    { label: 'npm', value: 'npm' },
    { label: 'NuGet', value: 'nuget' },
    { label: 'Opam', value: 'opam' },
    { label: 'OSS-Fuzz', value: 'oss-fuzz' },
    { label: 'Packagist', value: 'packagist' },
    { label: 'Pub', value: 'pub' },
    { label: 'Red-Hat', value: 'red-hat' },
    { label: 'Rubygems', value: 'rubygems' },
]

interface PackageSearchProps {
    onSubmit: (purl: string) => void
    error?: string | null
    isSearching?: boolean
    autoFocus?: boolean
    className?: string
}

export default function PackageSearch({
    onSubmit,
    error,
    isSearching,
    autoFocus,
    className,
}: PackageSearchProps) {
    const [mode, setMode] = useState<'structured' | 'direct'>('structured')
    const [ecosystem, setEcosystem] = useState('npm')
    const [packageName, setPackageName] = useState('')
    const [version, setVersion] = useState('')
    const [directPurl, setDirectPurl] = useState('')
    const [localError, setLocalError] = useState<string | null>(null)

    const displayError = localError || error

    const handleStructuredSubmit = () => {
        setLocalError(null)
        if (!packageName.trim() || !version.trim()) {
            setLocalError('Please fill in both fields. Example: next 16.0.1')
            return
        }
        const versionPart = version.trim() ? `@${version.trim()}` : ''
        const purl = `pkg:${ecosystem}/${packageName.trim()}${versionPart}`
        onSubmit(purl)
    }

    const handleDirectSubmit = () => {
        setLocalError(null)
        const trimmed = directPurl.trim()
        if (!trimmed.startsWith('pkg:')) {
            setLocalError(
                'Please enter a valid purl (e.g., pkg:npm/next@16.0.1)',
            )
            return
        }
        onSubmit(trimmed)
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                if (mode === 'structured') handleStructuredSubmit()
                else handleDirectSubmit()
            }}
            className={className}
        >
            {mode === 'structured' && (
                <>
                    <div
                        className={cn(
                            'border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex items-center rounded-md border bg-transparent transition-colors focus-within:ring-[3px]',
                            displayError
                                ? 'border-destructive focus-within:border-destructive focus-within:ring-destructive/50'
                                : '',
                        )}
                    >
                        <div className="relative flex items-center">
                            <select
                                value={ecosystem}
                                onChange={(e) => setEcosystem(e.target.value)}
                                className="h-12 cursor-pointer appearance-none rounded-l-md bg-transparent pr-7 pl-3 text-base outline-none md:text-lg"
                                disabled={isSearching}
                                aria-label="Ecosystem"
                            >
                                {ECOSYSTEMS.map((eco) => (
                                    <option key={eco.value} value={eco.value}>
                                        {eco.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="text-muted-foreground pointer-events-none absolute right-1.5 h-4 w-4" />
                        </div>
                        <div className="bg-input h-8 w-px" />
                        <input
                            type="text"
                            value={packageName}
                            onChange={(e) => setPackageName(e.target.value)}
                            placeholder="name"
                            className="placeholder:text-muted-foreground h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none md:text-lg"
                            disabled={isSearching}
                            autoFocus={autoFocus}
                        />
                        <div className="bg-input h-8 w-px" />
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => {
                                setVersion(e.target.value)
                                setLocalError(null)
                            }}
                            placeholder="version"
                            className="placeholder:text-muted-foreground h-12 w-20 bg-transparent px-3 text-base outline-none sm:w-28 md:text-lg"
                            disabled={isSearching}
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 mr-1.5 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-sm px-3 text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {isSearching ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">Inspect</span>
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setMode('direct')
                            setLocalError(null)
                        }}
                        className="text-muted-foreground hover:text-foreground mt-2 pl-1 text-sm transition-colors"
                    >
                        Search via full purl
                    </button>
                </>
            )}

            {mode === 'direct' && (
                <>
                    <div
                        className={cn(
                            'border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex items-center rounded-md border bg-transparent transition-colors focus-within:ring-[3px]',
                            displayError
                                ? 'border-destructive focus-within:border-destructive focus-within:ring-destructive/50'
                                : '',
                        )}
                    >
                        <input
                            type="text"
                            value={directPurl}
                            onChange={(e) => {
                                setDirectPurl(e.target.value)
                                setLocalError(null)
                            }}
                            placeholder="pkg:eco/name@version"
                            className="placeholder:text-muted-foreground h-12 min-w-0 flex-1 rounded-l-md bg-transparent pr-2.5 pl-3 text-base outline-none md:text-lg"
                            disabled={isSearching}
                            autoFocus={autoFocus}
                        />
                        <button
                            type="submit"
                            disabled={isSearching}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 mr-1.5 inline-flex h-9 shrink-0 items-center gap-1.5 rounded-sm px-3 text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {isSearching ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Search className="h-4 w-4" />
                            )}
                            <span className="hidden sm:inline">Inspect</span>
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            setMode('structured')
                            setLocalError(null)
                        }}
                        className="text-muted-foreground hover:text-foreground mt-2 pl-1 text-sm transition-colors"
                    >
                        Guided Search
                    </button>
                </>
            )}

            {displayError && (
                <p role="alert" className="text-destructive mt-2 pl-1 text-sm">
                    {displayError}
                </p>
            )}
        </form>
    )
}
