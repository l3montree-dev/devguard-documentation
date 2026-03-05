import { fetcher } from '@/lib/fetcher'
import { useMemo, useRef } from 'react'
import useSWR from 'swr'

export type RadarDatum = {
    ecosystem: string
    count: number
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
    const result = [...arr]
    let s = seed
    for (let i = result.length - 1; i > 0; i--) {
        s = (s * 16807 + 0) % 2147483647
        const j = s % (i + 1)
        ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
}

export function useRadarData() {
    const seedRef = useRef(Math.floor(Math.random() * 2147483647))

    const { data, error, isLoading } = useSWR(
        `https://api.main.devguard.org/api/v1/vulndb/cve-ecosystem-distribution/`,
        fetcher,
    )

    const processedData = useMemo(
        () =>
            seededShuffle(
                Object.entries(data || {})
                    .map(([ecosystem, count]) => ({
                        ecosystem,
                        count: Number(count),
                    }))
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 7),
                seedRef.current,
            ),
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
