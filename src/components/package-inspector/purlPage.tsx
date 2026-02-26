import { useEffect, useState } from 'react'
import Head from 'next/head'
import { extractPackageName } from '@/lib/utils'
import { PackageInspectResult } from '@/components/package-inspector/types'
import ScoreCardChart from '@/components/package-inspector/ScoreCardChart'
import ProjectStats from '@/components/package-inspector/ProjectStats'
import OverallScoreGauge from '@/components/package-inspector/OverallScoreIcon'
import VulnerabilityList from '@/components/package-inspector/VulnerabilityList'

export default function PurlPageComponent({ purl }: { purl?: string }) {
    const [result, setResult] = useState<PackageInspectResult | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const purlString = typeof purl === 'string' ? purl : ''
    let packageName = ''

    if (purlString) {
        packageName = extractPackageName(decodeURIComponent(purlString))
    }

    useEffect(() => {
        if (!purlString) return

        const fetchPackageInfo = async () => {
            setIsLoading(true)
            setError(null)
            const decodedPurl = decodeURIComponent(purlString)

            const response = await fetch(
                'https://api.main.devguard.org/api/v1/vulndb/purl-inspect/' +
                    decodedPurl,
            )

            if (response.ok) {
                const data: PackageInspectResult = await response.json()
                setResult(data)
            } else {
                setError('Package not found')
            }

            setIsLoading(false)
        }
        fetchPackageInfo()
    }, [purlString])

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
        return <div className="p-8 text-red-500">{error}</div>
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
                <div className="flex items-baseline gap-3">
                    <h1 className="text-3xl font-bold text-white">
                        {packageName}
                    </h1>
                    {component.version && (
                        <span className="text-lg text-gray-400">
                            v{component.version}
                        </span>
                    )}
                </div>
            </div>
            {/* Top row: Project stats + Overall score */}
            <div className="mb-8 flex items-start gap-16">
                <div className="min-w-0 max-w-2xl flex-1">
                    <ProjectStats
                        project={project}
                        purl={result.purl}
                        published={component.published}
                        isMalicious={result.maliciousPackage != null}
                    />
                </div>
                <div className="shrink-0">
                    <OverallScoreGauge score={project.scoreCardScore} />
                </div>
            </div>

            {/* Bottom row: Scorecard bars + Vulnerability list */}
            <div className="grid items-start gap-12 md:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-xl font-semibold text-white">
                        Open SSF Scorecard Checks
                    </h2>
                    <ScoreCardChart checks={project.scoreCard.checks} />
                </div>

                <VulnerabilityList
                    vulns={vulns}
                    affectedComponents={affectedComponents}
                />
            </div>
        </div>
    )
}
