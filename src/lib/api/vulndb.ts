import { fetcher } from '@/lib/fetcher'
import { useMemo } from 'react'
import useSWR from 'swr'

export type RadarDatum = {
    ecosystem: string
    count: number
}

export function useRadarData() {
    const { data, error, isLoading } = useSWR(
        '/api/ecosystem-distribution',
        fetcher,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            dedupingInterval: 1000 * 60 * 60, // 1 hour
        },
    )

    const processedData = useMemo(
        () =>
            Object.entries(data || {})
                .map(([ecosystem, count]) => ({
                    ecosystem,
                    count: Number(count),
                }))
                .sort((a, b) => b.count - a.count || a.ecosystem.localeCompare(b.ecosystem))
                .slice(0, 7),
        [data],
    )

    if (error) {
        console.error('Failed API Fetch:', error)
        return { data: [], isLoading: false, error }
    }

    if (isLoading || !data) {
        return { data: [], isLoading: true, error: null }
    }

    return { data: processedData, isLoading: false, error: null }
}
