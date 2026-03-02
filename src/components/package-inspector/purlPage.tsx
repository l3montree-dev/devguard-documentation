import Head from 'next/head'
import useSWR from 'swr'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { fetcher } from '@/lib/fetcher'
import { extractPackageName } from '@/lib/utils'
import { PackageInspectResult } from '@/components/package-inspector/types'
import ScoreCardChart from '@/components/package-inspector/ScoreCardChart'
import ProjectStats from '@/components/package-inspector/ProjectStats'
import OverallScoreGauge from '@/components/package-inspector/OverallScoreIcon'
import VulnerabilityList from '@/components/package-inspector/VulnerabilityList'
import { Button } from '@/components/ui/button'

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

    return (
        <div className="mx-auto max-w-6xl p-8">
            <Head>
                <title>{packageName} | Package Inspector</title>
            </Head>

            {/* Header */}
            <div className="mb-6">
                <p className="mb-1 text-sm font-medium uppercase tracking-wider text-gray-500">
                    Package Inspector
                </p>
            </div>

            {/* Hero card */}
            <div className="mb-4 rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-baseline gap-3">
                            <h1 className="text-3xl font-bold text-white">
                                {packageName}
                            </h1>
                            {component.version && (
                                <span className="text-lg text-gray-400">
                                    v{component.version}
                                </span>
                            )}
                        </div>
                        <ProjectStats
                            project={project}
                            purl={result.purl}
                            published={component.published}
                            isMalicious={result.maliciousPackage != null}
                        />
                    </div>
                    {project && (
                        <div className="shrink-0">
                            <OverallScoreGauge score={project.scoreCardScore} />
                        </div>
                    )}
                </div>
            </div>

            {/* Two-column: Scorecard + Vulnerabilities */}
            <div className="grid items-stretch gap-4 md:grid-cols-2">
                {project?.scoreCard && (
                    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <h2 className="mb-4 text-base font-bold text-white">
                            Open SSF Scorecard
                        </h2>
                        <ScoreCardChart checks={project.scoreCard.checks} />
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
        </div>
    )
}
