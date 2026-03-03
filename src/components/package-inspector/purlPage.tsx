import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { fetcher } from '@/lib/fetcher'
import { extractPackageName } from '@/lib/utils'
import { PackageInspectResult } from '@/components/package-inspector/types'
import PackageHeroCard from '@/components/package-inspector/PackageHeroCard'
import ScoreCardChart from '@/components/package-inspector/ScoreCardChart'
import VulnerabilityList from '@/components/package-inspector/VulnerabilityList'
import { Button } from '@/components/ui/button'
import { Container } from '../ui/container'

export default function PurlPageComponent({ purl }: { purl?: string }) {
    const purlString = typeof purl === 'string' ? purl : ''
    const decodedPurl = purlString ? decodeURIComponent(purlString) : ''
    const packageName = decodedPurl ? extractPackageName(decodedPurl) : ''

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
            <div className="flex min-h-screen items-center justify-center bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
                    <p className="text-gray-600">
                        Loading package information...
                    </p>
                </div>
            </div>
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
            <div className="mb-6">
                <p className="mb-1 text-sm font-medium uppercase tracking-wider text-gray-500">
                    Package Inspector
                </p>
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
                    <Button>
                        <Link href="/package-inspector">Get Back</Link>
                    </Button>
                </div>
                <div>
                    <Button>
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
