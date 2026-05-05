import { useState, useEffect } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import {
    ExternalLink,
    ShieldOff,
    ChevronLeft,
    ChevronRight,
    SquareArrowOutUpRight,
} from 'lucide-react'
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
import DevGuardBanner from '@/components/sections/DevGuardBanner'
import FAQSection, { type FAQ } from '@/components/sections/Faq'
import CTASection from '@/components/sections/Cta'

const packageInspectorFAQ: FAQ[] = [
    {
        question: 'What is a CVE?',
        answer: 'A Common Vulnerability and Exposure (CVE) is a standardized identifier for a publicly known security vulnerability. Each CVE entry includes a description, affected software, and references. CVEs are assigned by CVE Numbering Authorities (CNAs).',
    },
    {
        question: 'What is EPSS, and how does it differ from CVSS?',
        answer: 'CVSS (Common Vulnerability Scoring System) measures the inherent severity of a vulnerability — how bad it could be if exploited. EPSS (Exploit Prediction Scoring System) measures the probability that a vulnerability will actually be exploited in the wild within the next 30 days. CVSS tells you impact; EPSS tells you likelihood. Using both together gives a far more actionable risk picture.',
    },
    {
        question: 'What are GHSAs?',
        answer: 'GitHub Security Advisories (GHSAs) are vulnerability reports published directly by maintainers or the GitHub Security Lab for packages hosted on GitHub. They are often more granular than CVEs — especially for the npm, PyPI, Go, and Maven ecosystems.',
    },
    {
        question: 'Which ecosystems does this database cover?',
        answer: 'The database aggregates advisories across major package ecosystems including npm, PyPI, Maven, Go, RubyGems, NuGet, and more. Coverage comes especially from OSV.',
    },
    {
        question: 'How does DevGuard use this vulnerability database?',
        answer: "DevGuard continuously matches your project's software bill of materials (SBOM) against this database. When a new advisory is published that affects a dependency you use, DevGuard surfaces it in your project's risk view — enriched with CVSS, EPSS, and exploit context so you can prioritize what actually matters.",
    },
    {
        question: 'How current is the data?',
        answer: 'The vulnerability database is updated every six hours to ensure you have access to the latest security information. When a new CVE or GHSA is published, it typically appears in the database within a few hours.',
    },
]

const HatchBar = () => (
    <div className="pointer-events-none inset-x-0 top-0 z-50 block h-8 border-t border-b border-t-(--grid-line-color) border-b-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80" />
)

function Shell({
    children,
    mobileTopContent,
}: {
    children: React.ReactNode
    mobileTopContent?: React.ReactNode
}) {
    return (
        <div className="mx-4">
            <HatchBar />
            <DevGuardBanner
                heading="Know every package"
                subheading="before it ships."
                description="DevGuard continuously monitors your dependencies for vulnerabilities, malicious packages, and scorecard regressions — with real-time threat intelligence built for developers."
                primaryLabel="Checkout DevGuard"
                primaryHref="https://devguard.org/"
                secondaryLabel="View on GitHub"
                secondaryHref="https://github.com/l3montree-dev/devguard"
            />
            {mobileTopContent}
            <HatchBar />
            {children}
            <HatchBar />
        </div>
    )
}

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

    const resolvedError = error || (result && !result.component.published)

    if (isLoading) {
        return (
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
    }

    // ─── Error ────────────────────────────────────────────────────────────────
    if (resolvedError) {
        return (
            <div className="mx-4">
                <HatchBar />
                <div className="flex min-h-[30vh] flex-col items-center justify-center py-24 text-center">
                    <p className="text-muted-foreground/20 font-mono text-8xl font-bold select-none">
                        404
                    </p>
                    <h1 className="mt-6 text-2xl font-semibold tracking-tight">
                        Package not found
                    </h1>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                        The requested package could not be loaded. It may not
                        exist or the service is temporarily unavailable.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button
                            variant="default"
                            onClick={() => router.push('/package-inspector')}
                            className="cursor-pointer gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Back to Package Inspector
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => router.push('https://devguard.org')}
                            className="cursor-pointer gap-2"
                        >
                            Go to Homepage
                        </Button>
                    </div>
                </div>
                <Container showTopGrid={true} showBottomGrid={true}>
                    <FAQSection faqs={packageInspectorFAQ} />
                </Container>
                <Container showBottomGrid={true}>
                    <CTASection />
                </Container>
            </div>
        )
    }

    if (!result) {
        return (
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
    }

    const { component, affectedComponents, vulns } = result
    const { project } = component
    const packageManager = result.purl.replace(/^pkg:/, '').split('/')[0]
    const isMalicious = result.maliciousPackage != null

    return (
        <div>
            <Head>
                <title>{packageName} | Package Inspector</title>
                <meta
                    name="description"
                    content={`Inspect ${packageName} — view OpenSSF scorecard, known vulnerabilities, and security insights for this open-source package.`}
                />
            </Head>

            {/* Header */}
            <p className="text-muted-foreground mb-2 text-base font-medium tracking-wider uppercase">
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
                                <ShieldOff className="text-muted-foreground/30 mb-3 h-10 w-10" />
                                <h3 className="text-foreground text-base font-semibold">
                                    OpenSSF Scorecard
                                </h3>
                                <p className="text-muted-foreground mt-1 max-w-[220px] text-sm">
                                    No scorecard data available for this
                                    package.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
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
        </div>
    )
}
