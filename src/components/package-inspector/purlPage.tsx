import { useState, useEffect } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ExternalLink, ShieldOff } from 'lucide-react'
import { fetcher } from '@/lib/fetcher'
import { extractPackageName } from '@/lib/utils'
import { PackageInspectResult } from '@/components/package-inspector/types'
import PackageHeroCard from '@/components/package-inspector/PackageHeroCard'
import ScoreCardChart from '@/components/package-inspector/ScoreCardChart'
import VulnerabilityList from '@/components/package-inspector/VulnerabilityList'
import PackageSearch from '@/components/package-inspector/PackageSearch'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Container } from '../ui/container'

export default function PurlPageComponent({ purl }: { purl?: string }) {
    const router = useRouter()
    const purlString = typeof purl === 'string' ? purl : ''
    const decodedPurl = purlString ? decodeURIComponent(purlString) : ''
    const packageName = decodedPurl ? extractPackageName(decodedPurl) : ''

    const [searchError, setSearchError] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        setSearchError(null)
        setIsSearching(false)
    }, [purl])

    const navigateToPurl = async (newPurl: string) => {
        setSearchError(null)
        setIsSearching(true)
        try {
            const response = await fetch(
                `/api/vulndb/purl-inspect/${encodeURIComponent(newPurl)}`,
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
        ? `/api/vulndb/purl-inspect/${encodeURIComponent(decodedPurl)}`
        : null

    const {
        data: result,
        error,
        isLoading,
    } = useSWR<PackageInspectResult>(url, fetcher)

    const renderSkeleton = () => (
        <Container
            showTopGrid={false}
            showBottomGrid={false}
            className="card-blue py-5"
        >
            <div className="mb-6">
                <Skeleton className="mb-1 h-4 w-32" />
            </div>

            {/* Hero card skeleton */}
            <Card className="mb-4">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-6 w-3/4 max-w-48" />
                            <Skeleton className="h-4 w-1/2 max-w-32" />
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
            </Card>

            {/* Two-column skeleton */}
            <div className="grid items-stretch gap-4 lg:grid-cols-2">
                <Card>
                    <CardContent className="p-6">
                        <Skeleton className="mb-4 h-5 w-24" />
                        <Skeleton className="h-48 w-full rounded-lg" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <Skeleton className="mb-4 h-5 w-3/4 max-w-40" />
                        <div className="space-y-3">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom buttons skeleton */}
            <div className="mt-6 flex justify-end gap-3">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="hidden h-10 w-32 rounded-md sm:block" />
            </div>
        </Container>
    )

    if (isLoading) {
        return renderSkeleton()
    }

    if (error) {
        return (
            <Container
                showTopGrid={false}
                showBottomGrid={false}
                className="card-blue py-5"
            >
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <h2 className="mb-2 text-3xl font-bold text-foreground">
                        Package not found
                    </h2>
                    <p className="mb-6 max-w-md text-base text-muted-foreground">
                        The package you are looking for does not exist or could
                        not be retrieved. Please verify the package URL and try
                        again.
                    </p>
                    <Button asChild>
                        <Link href="/package-inspector">
                            Back to Package Inspector
                        </Link>
                    </Button>
                </div>
            </Container>
        )
    }

    if (!result) {
        return renderSkeleton()
    }

    const { component, affectedComponents, vulns } = result
    const { project } = component
    const packageManager = result.purl.replace(/^pkg:/, '').split('/')[0]
    const isMalicious = result.maliciousPackage != null

    return (
        <Container
            showTopGrid={false}
            showBottomGrid={false}
            className="card-blue py-5"
        >
            <Head>
                <title>{packageName} | Package Inspector</title>
                <meta
                    name="description"
                    content={`Inspect ${packageName} — view OpenSSF scorecard, known vulnerabilities, and security insights for this open-source package.`}
                />
            </Head>

            {/* Header */}
            <p className="mb-2 text-base font-medium uppercase tracking-wider text-muted-foreground">
                Package Inspector
            </p>

            {/* Search — matches Hero styling */}
            <PackageSearch
                onSubmit={navigateToPurl}
                error={searchError}
                isSearching={isSearching}
                className="mb-6"
            />

            <PackageHeroCard
                packageName={packageName}
                packageManager={packageManager}
                component={component}
                project={project}
                isMalicious={isMalicious}
            />

            {/* Two-column: Scorecard + Vulnerabilities */}
            <div className="grid items-stretch gap-4 lg:grid-cols-2">
                <Card>
                    <CardContent className="flex h-full flex-col p-6">
                        {project?.scoreCard ? (
                            <ScoreCardChart
                                checks={project.scoreCard.checks}
                                score={project.scoreCardScore}
                                updatedAt={project.updatedAt}
                            />
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                                <ShieldOff className="mb-3 h-10 w-10 text-muted-foreground/30" />
                                <h3 className="text-base font-semibold text-foreground">
                                    OpenSSF Scorecard
                                </h3>
                                <p className="mt-1 max-w-[220px] text-sm text-muted-foreground">
                                    No scorecard data available for this
                                    package.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Vulnerabilities fixed in later releases
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VulnerabilityList
                            vulns={vulns}
                            affectedComponents={affectedComponents}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Bottom buttons */}
            <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row">
                <Button asChild>
                    <Link href="/package-inspector">
                        Back to Package Inspector
                    </Link>
                </Button>
                <Button asChild className="hidden sm:inline-flex">
                    <a
                        target="_blank"
                        href="https://app.devguard.org/"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        Try DevGuard
                        <ExternalLink size={16} />
                    </a>
                </Button>
            </div>
        </Container>
    )
}
