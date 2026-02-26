import { useState } from 'react'
import { Container } from '../top-level-pages/container'
import { ReachabilityAnalysisResponse } from 'src/components/reachabilityAnalysis/reachability-types'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { fetcher } from 'src/lib/fetcher'
import useSWR from 'swr'



export default function ReachabilityAnalysisPackageDetails({ purl }: { purl?: string }) {
    const { data, error, isLoading } = useSWR<ReachabilityAnalysisResponse>(
        purl ? `http://localhost:8080/api/v1/vulndb/reachability/${purl}` : null,
        fetcher,
    )

    const [isVulnerabilitiesOpen, setIsVulnerabilitiesOpen] = useState(false)
    const [isComponentsOpen, setIsComponentsOpen] = useState(false)

    if (isLoading) {
        return (
            <Container>
                <div className="mb-6 grid gap-4 lg:grid-cols-3">
                    <div className="relative lg:col-span-2">
                        <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
                        <div className="relative flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] p-8">
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <Skeleton className="h-9 w-96" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
                    <div className="relative flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] p-7">
                        <Skeleton className="h-6 w-40" />
                    </div>
                </div>

                <div className="relative mb-4">
                    <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
                    <div className="relative flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] p-7">
                        <Skeleton className="h-6 w-48"/>
                    </div>
                </div>
            </Container>
        )
    }

    if (error || !data) {
        return <div>No Package data found</div>
    }

    return (
        <Container>
            <div className="mb-6 grid gap-4 lg:grid-cols-3 w-3/4">
                <div className="relative lg:col-span-2">
                    <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
                    <div className="relative flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] p-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
                                    {purl}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative mt-6">
                <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
                <div className="relative flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                    <button
                        onClick={() => setIsComponentsOpen(!isComponentsOpen)}
                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                        <h2 className="text-lg font-medium text-gray-950 dark:text-white">
                            Components (
                            {data.components.length})
                        </h2>
                        <svg
                            className={`h-5 w-5 transition-transform ${isComponentsOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {isComponentsOpen && (
                        <div className="px-8 pb-8">
                            <div>
                                {data.components.map((comp) => (
                                    <div className='flex'>
                                        <p className='px-4 mx-8 my-4 py-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50'>{comp.name}</p>
                                        <p className='px-4 mx-8 my-4 py-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50'>{comp.type}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-black/5 dark:outline-white/15" />
            </div>
            <div className="relative mt-6">
                <div className="absolute inset-px rounded-lg bg-white dark:bg-gray-800" />
                <div className="relative flex flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                    <button
                        onClick={() => setIsVulnerabilitiesOpen(!isVulnerabilitiesOpen)}
                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                        <h2 className="text-lg font-medium text-gray-950 dark:text-white">
                            Vulnerabilities (
                            {data.vulnerabilities.length})
                        </h2>
                        <svg
                            className={`h-5 w-5 transition-transform ${isVulnerabilitiesOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {isVulnerabilitiesOpen && (
                        <div className="px-8 pb-8">
                            <div>
                                {data.vulnerabilities.map((vuln) => (
                                    <div className='flex'>
                                        <p className='px-4 mx-8 my-4 py-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50'>{vuln.id}</p>
                                        <p className='px-4 mx-8 my-4 py-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50'>{vuln['bom-ref']}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-black/5 dark:outline-white/15" />
            </div>
            <div className="mt-8 flex gap-3">
                <div>
                    <Button>
                        <Link href="/reachability-analysis/">Get Back</Link>
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