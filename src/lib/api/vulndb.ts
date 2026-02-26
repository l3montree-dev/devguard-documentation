import { fetcher } from '@/lib/fetcher'
import { useMemo } from 'react'
import useSWR from 'swr'

export type RadarDatum = {
    ecosystem: string
    count: number
}

export function useRadarData() {
    const { data, error, isLoading } = useSWR(
        `https://api.main.devguard.org/api/v1/vulndb/affected-package-distribution/`,
        fetcher,
    )

    const processedData = useMemo(
        () =>
            Object.entries(data || {})
                .map(([ecosystem, count]) => ({
                    ecosystem,
                    count: Number(count),
                }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 7)
                .sort(() => Math.random() - 0.5),
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
