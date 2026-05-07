import { useState, useEffect } from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import {
    ExternalLink,
    ShieldOff,
    ChevronLeft,
    Star,
    GitFork,
    Scale,
    Package,
    Calendar,
    Hash,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
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

const LABEL_CLASS =
    'text-muted-foreground font-mono text-xs tracking-wider uppercase'

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
        <div>
            <HatchBar />
            <div className="relative mx-auto w-full max-w-[1390px]">
                {/* Left vertical stripe */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-8 border-r border-l border-r-(--grid-line-color) border-l-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80" />

                {/* Right vertical stripe */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-8 border-r border-l border-r-(--grid-line-color) border-l-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80" />

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
            </div>
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
    const [vulnFilter, setVulnFilter] = useState('')

    useEffect(() => {
        const t = setTimeout(() => {
            setSearchError(null)
            setIsSearching(false)
            setVulnFilter('')
        }, 0)
        return () => clearTimeout(t)
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

    // ─── Loading state ────────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <Shell>
                <div className="flex flex-col lg:flex-row">
                    {/* Left skeleton (2/3) */}
                    <div className="flex-1 pt-10 pr-12 pb-10 pl-12 sm:px-8 lg:w-2/3 lg:pr-12 lg:pl-20">
                        {/* Hero skeleton */}
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <Skeleton className="h-9 w-48" />
                                <Skeleton className="h-6 w-20 rounded-md" />
                                <Skeleton className="h-6 w-16 rounded-md" />
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Skeleton className="h-4 w-28" />
                            </div>
                        </div>

                        {/* Scorecard skeleton */}
                        <Card className="mb-4 bg-transparent">
                            <CardHeader className="px-5 pt-5 pb-3">
                                <Skeleton className="h-3 w-32" />
                            </CardHeader>
                            <CardContent className="px-5 pb-5">
                                <Skeleton className="h-48 w-full rounded-lg" />
                            </CardContent>
                        </Card>

                        {/* Vulnerability list skeleton */}
                        <Card className="mb-4 bg-transparent">
                            <CardHeader className="px-5 pt-5 pb-3">
                                <Skeleton className="h-3 w-52" />
                            </CardHeader>
                            <CardContent className="space-y-2 px-5 pb-5">
                                <Skeleton className="h-10 w-full rounded-lg" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Divider skeleton */}
                    <div className="hidden lg:block">
                        <div className="pointer-events-none h-full w-8 border-r border-l border-r-(--grid-line-color) border-l-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80" />
                    </div>

                    {/* Right skeleton (1/3) */}
                    <div className="flex flex-col gap-4 pt-10 pr-12 pb-10 pl-12 sm:px-8 lg:w-1/3 lg:pr-20 lg:pl-12">
                        <Card className="hidden bg-transparent lg:block">
                            <CardHeader className="px-5 pt-5 pb-3">
                                <Skeleton className="h-3 w-16" />
                            </CardHeader>
                            <CardContent className="space-y-2 px-5 pb-5">
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-9 w-full rounded-md" />
                            </CardContent>
                        </Card>
                        <Card className="bg-transparent">
                            <CardHeader className="px-5 pt-5 pb-3">
                                <Skeleton className="h-3 w-20" />
                            </CardHeader>
                            <CardContent className="px-5 pb-5">
                                <div className="flex flex-col gap-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between"
                                        >
                                            <Skeleton className="h-3 w-20" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-transparent">
                            <CardHeader className="px-5 pt-5 pb-3">
                                <Skeleton className="h-3 w-28" />
                            </CardHeader>
                            <CardContent className="space-y-4 px-5 pb-5">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-9 w-full rounded-md" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Shell>
        )
    }

    // ─── Error ────────────────────────────────────────────────────────────────
    if (resolvedError) {
        return (
            <div>
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

    // ─── No data ──────────────────────────────────────────────────────────────
    if (!result) {
        return (
            <Shell>
                <div className="flex flex-col items-center justify-center px-4 py-24 text-center sm:px-8">
                    <p className="text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed">
                        Enter a valid package URL to inspect security details.
                    </p>
                </div>
            </Shell>
        )
    }

    // ─── Computed values ──────────────────────────────────────────────────────
    const { component, affectedComponents, vulns } = result
    const { project } = component
    const packageManager = result.purl.replace(/^pkg:/, '').split('/')[0]
    const isMalicious = result.maliciousPackage != null

    // Vuln counts for header (mirrors deduplication in VulnerabilityList)
    const uniqueVulns = Array.from(
        new Map(vulns.map((v) => [v.cveId, v])).values(),
    )
    const totalVulnCount = uniqueVulns.length
    const showVulnFilter = totalVulnCount > 3
    const filteredVulnCount =
        showVulnFilter && vulnFilter.trim()
            ? uniqueVulns.filter(
                  (v) =>
                      v.cveId
                          .toLowerCase()
                          .includes(vulnFilter.toLowerCase()) ||
                      (v.fixedVersion ?? '')
                          .toLowerCase()
                          .includes(vulnFilter.toLowerCase()),
              ).length
            : totalVulnCount

    const seoTitle = `${packageName} | Package Inspector – DevGuard`
    const seoDescription = `Inspect ${packageName} — view OpenSSF scorecard, known vulnerabilities, and security insights for this open-source package.`

    const facts = [
        {
            label: 'Ecosystem',
            value: packageManager,
            icon: Package,
        },
        project?.license
            ? { label: 'License', value: project.license, icon: Scale }
            : null,
        project?.starsCount != null
            ? {
                  label: 'Stars',
                  value: project.starsCount.toLocaleString(),
                  icon: Star,
              }
            : null,
        project?.forksCount != null
            ? {
                  label: 'Forks',
                  value: project.forksCount.toLocaleString(),
                  icon: GitFork,
              }
            : null,
        component.version
            ? { label: 'Version', value: `v${component.version}`, icon: Hash }
            : null,
        component.published
            ? {
                  label: 'Published',
                  value: new Date(component.published).toLocaleDateString(
                      'en-US',
                      { year: 'numeric', month: 'short', day: 'numeric' },
                  ),
                  icon: Calendar,
              }
            : null,
    ].filter(Boolean) as {
        label: string
        value: string
        icon: React.ComponentType<{ className?: string }>
    }[]

    // ─── Main render ──────────────────────────────────────────────────────────
    return (
        <Shell
            mobileTopContent={
                <div className="px-4 pt-4 sm:px-8 lg:hidden">
                    <Card className="bg-transparent">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className={LABEL_CLASS}>
                                Search Package
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <PackageSearch
                                onSubmit={navigateToPurl}
                                error={searchError}
                                isSearching={isSearching}
                            />
                        </CardContent>
                    </Card>
                </div>
            }
        >
            <Head>
                <title key="title">{seoTitle}</title>
                <meta
                    name="description"
                    key="description"
                    content={seoDescription}
                />
                <meta property="og:title" key="og:title" content={seoTitle} />
                <meta
                    property="og:description"
                    key="og:description"
                    content={seoDescription}
                />
                <meta property="og:type" key="og:type" content="article" />
            </Head>

            {/* Main layout: left 2/3 | divider | right 1/3 */}
            <div className="flex flex-col lg:flex-row">
                {/* ── Left column (2/3) ── */}
                <div className="flex-1 pt-10 pr-12 pb-10 pl-12 sm:px-8 lg:w-2/3 lg:pr-12 lg:pl-20">
                    {/* Hero */}
                    <PackageHeroCard
                        packageName={packageName}
                        packageManager={packageManager}
                        component={component}
                        project={project}
                        isMalicious={isMalicious}
                    />

                    {/* OpenSSF Scorecard */}
                    <Card className="mb-4 bg-transparent">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className={LABEL_CLASS}>
                                OpenSSF Scorecard
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            {project?.scoreCard ? (
                                <ScoreCardChart
                                    checks={project.scoreCard.checks}
                                    score={project.scoreCardScore}
                                    updatedAt={project.updatedAt}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <ShieldOff className="text-muted-foreground/30 mb-3 h-10 w-10" />
                                    <p className="text-muted-foreground mt-1 max-w-[220px] text-sm">
                                        No scorecard data available for this
                                        package.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Vulnerabilities in later releases */}
                    <Card className="mb-4 flex flex-col bg-transparent">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <CardTitle className={LABEL_CLASS}>
                                    Vulnerabilities fixed in later releases
                                    <span className="ml-2 font-normal">
                                        (
                                        {showVulnFilter && vulnFilter.trim()
                                            ? `${filteredVulnCount} of `
                                            : ''}
                                        {totalVulnCount})
                                    </span>
                                </CardTitle>
                                {showVulnFilter && (
                                    <div className="relative w-32">
                                        <Input
                                            value={vulnFilter}
                                            onChange={(e) =>
                                                setVulnFilter(e.target.value)
                                            }
                                            placeholder="CVE…"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <VulnerabilityList
                                vulns={vulns}
                                affectedComponents={affectedComponents}
                                filter={vulnFilter}
                                setFilter={setVulnFilter}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* ── Divider ── */}
                <div className="hidden lg:block">
                    <div className="pointer-events-none h-full w-8 border-r border-l border-r-(--grid-line-color) border-l-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80" />
                </div>

                {/* ── Right column (1/3) ── */}
                <div className="flex flex-col gap-4 pt-10 pr-12 pb-10 pl-12 sm:px-8 lg:w-1/3 lg:pr-20 lg:pl-12">
                    {/* Search */}
                    <Card className="hidden bg-transparent lg:block">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className={LABEL_CLASS}>
                                Search Package
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <PackageSearch
                                onSubmit={navigateToPurl}
                                error={searchError}
                                isSearching={isSearching}
                            />
                        </CardContent>
                    </Card>

                    {/* Package Facts */}
                    <Card className="bg-transparent">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className={LABEL_CLASS}>
                                Package Facts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <div className="flex flex-col gap-3">
                                {facts.map((fact) => {
                                    const Icon = fact.icon
                                    return (
                                        <div
                                            key={fact.label}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                                <Icon className="h-3.5 w-3.5 opacity-60" />
                                                {fact.label}
                                            </div>
                                            <span className="text-foreground/80 font-mono text-xs font-medium">
                                                {fact.value}
                                            </span>
                                        </div>
                                    )
                                })}
                                {project && (
                                    <div className="mt-1 flex flex-col gap-1.5">
                                        <a
                                            href={
                                                'https://' + project.projectKey
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-mono text-xs transition-colors"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            GitHub Repository
                                        </a>
                                        {project.homepage && (
                                            <a
                                                href={project.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 font-mono text-xs transition-colors"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                Homepage
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Scan your project */}
                    <Card className="bg-transparent">
                        <CardHeader className="px-5 pt-5 pb-3">
                            <CardTitle className={LABEL_CLASS}>
                                Scan your project
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-5 pb-5">
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Continuously monitor your dependencies and get
                                alerted when packages like this one introduce
                                security risks into your stack.
                            </p>
                            <Button
                                asChild
                                variant="default"
                                size="default"
                                className="w-full gap-2"
                            >
                                <a
                                    href="https://devguard.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="truncate">
                                        Checkout DevGuard
                                    </span>
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Shell>
    )
}
