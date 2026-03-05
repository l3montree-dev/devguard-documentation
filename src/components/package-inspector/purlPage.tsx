import { useState, useEffect } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ExternalLink, Search, X, ChevronDown } from 'lucide-react'
import { fetcher } from '@/lib/fetcher'
import { extractPackageName, cn } from '@/lib/utils'
import { PackageInspectResult } from '@/components/package-inspector/types'
import PackageHeroCard from '@/components/package-inspector/PackageHeroCard'
import ScoreCardChart from '@/components/package-inspector/ScoreCardChart'
import VulnerabilityList from '@/components/package-inspector/VulnerabilityList'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Container } from '../ui/container'

const ECOSYSTEMS = [
    { label: 'Alpine', value: 'alpine' },
    { label: 'Bitnami', value: 'bitnami' },
    { label: 'Crates.io', value: 'crates.io' },
    { label: 'Debian', value: 'debian' },
    { label: 'Git', value: 'git' },
    { label: 'Go', value: 'go' },
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

export default function PurlPageComponent({ purl }: { purl?: string }) {
    const router = useRouter()
    const purlString = typeof purl === 'string' ? purl : ''
    const decodedPurl = purlString ? decodeURIComponent(purlString) : ''
    const packageName = decodedPurl ? extractPackageName(decodedPurl) : ''

    const [searchOpen, setSearchOpen] = useState(false)
    const [ecosystem, setEcosystem] = useState('npm')
    const [searchName, setSearchName] = useState('')
    const [version, setVersion] = useState('')
    const [searchError, setSearchError] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        setSearchOpen(false)
        setSearchName('')
        setVersion('')
        setSearchError(null)
        setIsSearching(false)
    }, [purl])

    const handleSearchSubmit = async () => {
        setSearchError(null)
        if (!searchName.trim() || !version.trim()) {
            setSearchError('Please fill in both fields.')
            return
        }
        const versionPart = version.trim() ? `@${version.trim()}` : ''
        const newPurl = `pkg:${ecosystem}/${searchName.trim()}${versionPart}`
        setIsSearching(true)
        try {
            const response = await fetch(
                'https://api.main.devguard.org/api/v1/vulndb/purl-inspect/' +
                    encodeURIComponent(newPurl),
            )
            if (!response.ok) {
                setSearchError('Package not found. Please check your input.')
                return
            }
            const data = await response.json()
            if (!data?.component) {
                setSearchError('Package not found. Please check your input.')
                return
            }
            router.push('/package-inspector/' + encodeURIComponent(newPurl))
        } catch {
            setSearchError('Could not reach the API. Please try again.')
        } finally {
            setIsSearching(false)
        }
    }

    const url = decodedPurl
        ? 'https://api.main.devguard.org/api/v1/vulndb/purl-inspect/' +
          decodedPurl
        : null

    const {
        data: result,
        error,
        isLoading,
    } = useSWR<PackageInspectResult>(url, fetcher)

    if (isLoading) {
        return (
            <Container showTopGrid={false} showBottomGrid={false} className="py-5">
                <div className="mb-6">
                    <Skeleton className="mb-1 h-4 w-32" />
                </div>

                {/* Hero card skeleton */}
                <div className="mb-4 rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>

                {/* Two-column skeleton */}
                <div className="grid items-stretch gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <Skeleton className="mb-4 h-5 w-24" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                    </div>
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <Skeleton className="mb-4 h-5 w-40" />
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </div>

                {/* Bottom buttons skeleton */}
                <div className="mt-6 flex justify-end gap-3">
                    <Skeleton className="h-10 w-24 rounded-md" />
                    <Skeleton className="h-10 w-32 rounded-md" />
                </div>
            </Container>
        )
    }

    if (error) {
        return <div className="p-8 text-red-500">Package not found</div>
    }

    if (!result) {
        return null
    }

    const { component, affectedComponents, vulns } = result
    const { project } = component
    const packageManager = result.purl.replace(/^pkg:/, '').split('/')[0]
    const isMalicious = result.maliciousPackage != null

    return (
        <Container showTopGrid={false} showBottomGrid={false} className='py-5'>
            {/* Left edge grid pattern */}
            <div className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-8 border-r border-r-[var(--grid-line-color)] bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] [background-size:10px_10px] bg-fixed opacity-80 sm:block" />

            {/* Right edge grid pattern */}
            <div className="pointer-events-none fixed inset-y-0 right-0 z-50 hidden w-8 border-l border-l-[var(--grid-line-color)] bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] [background-size:10px_10px] bg-fixed opacity-80 sm:block" />
            <Head>
                <title>{packageName} | Package Inspector</title>
            </Head>

            {/* Header */}
            <div className="mb-6 flex items-end justify-between">
                <p className="mb-1 text-sm font-medium uppercase tracking-wider text-gray-500">
                    Package Inspector
                </p>
                <div className="relative">
                    {!searchOpen ? (
                        <button
                            type="button"
                            onClick={() => setSearchOpen(true)}
                            className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-gray-600 hover:text-gray-300"
                        >
                            <Search className="h-3.5 w-3.5" />
                            Search again
                        </button>
                    ) : (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSearchSubmit()
                            }}
                            className="flex flex-col items-end gap-2"
                        >
                            <div
                                className={cn(
                                    'flex items-center rounded-xl border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
                                    searchError ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/50' : '',
                                )}
                            >
                                <div className="relative flex items-center">
                                    <select
                                        value={ecosystem}
                                        onChange={(e) => setEcosystem(e.target.value)}
                                        className="h-9 appearance-none bg-transparent pl-2.5 pr-6 text-xs outline-none rounded-l-xl cursor-pointer"
                                        disabled={isSearching}
                                    >
                                        {ECOSYSTEMS.map((eco) => (
                                            <option key={eco.value} value={eco.value}>
                                                {eco.label}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="pointer-events-none absolute right-1 h-3 w-3 text-muted-foreground" />
                                </div>
                                <div className="h-6 w-px bg-input" />
                                <input
                                    type="text"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    placeholder="name"
                                    className="h-9 w-24 min-w-0 bg-transparent px-2 text-xs outline-none placeholder:text-muted-foreground"
                                    disabled={isSearching}
                                    autoFocus
                                />
                                <div className="h-6 w-px bg-input" />
                                <input
                                    type="text"
                                    value={version}
                                    onChange={(e) => {
                                        setVersion(e.target.value)
                                        setSearchError(null)
                                    }}
                                    placeholder="version"
                                    className="h-9 w-20 bg-transparent px-2 text-xs outline-none placeholder:text-muted-foreground"
                                    disabled={isSearching}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchOpen(false)
                                        setSearchError(null)
                                    }}
                                    className="mr-1.5 flex items-center text-gray-500 hover:text-gray-300"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <button type="submit" className="hidden" />
                            {searchError && (
                                <span className="text-xs text-red-400">{searchError}</span>
                            )}
                        </form>
                    )}
                </div>
            </div>

            <PackageHeroCard
                packageName={packageName}
                packageManager={packageManager}
                component={component}
                project={project}
                isMalicious={isMalicious}
            />

            {/* Two-column: Scorecard + Vulnerabilities */}
            <div className="grid items-stretch gap-4 md:grid-cols-2">
                {project?.scoreCard && (
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <ScoreCardChart checks={project.scoreCard.checks} score={project.scoreCardScore} />
                    </div>
                )}

                <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                    <h2 className="mb-4 text-base font-bold text-white">
                        Vulnerabilities fixed in later releases
                    </h2>
                    <VulnerabilityList
                        vulns={vulns}
                        affectedComponents={affectedComponents}
                    />
                </div>
            </div>

            {/* Bottom buttons */}
            <div className="mt-6 flex justify-end gap-3">
                <div>
                    <Button asChild>
                        <Link href="/package-inspector">Get Back</Link>
                    </Button>
                </div>
                <div>
                    <Button asChild>
                        <a
                            target="_blank"
                            href="https://main.devguard.org/"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            Try DevGuard
                            <ExternalLink size={16} />
                        </a>
                    </Button>
                </div>
            </div>
        </Container>
    )
}
