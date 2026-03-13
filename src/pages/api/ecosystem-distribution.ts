import type { NextApiRequest, NextApiResponse } from 'next'
import { API_BASE_URL } from '@/lib/fetcher'

let cache: { data: Record<string, number>; expiresAt: number } | null = null
const CACHE_TTL_MS = 6 * 60 * 60 * 1000 // 6 hours

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse,
) {
    if (cache && Date.now() < cache.expiresAt) {
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=21600, stale-while-revalidate=3600',
        )
        return res.status(200).json(cache.data)
    }

    try {
        const upstream = await fetch(
            `${API_BASE_URL}/vulndb/cve-ecosystem-distribution/`,
        )
        if (!upstream.ok) {
            return res
                .status(upstream.status)
                .json({ error: 'Upstream API error' })
        }
        const data = await upstream.json()
        cache = { data, expiresAt: Date.now() + CACHE_TTL_MS }

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=21600, stale-while-revalidate=3600',
        )
        return res.status(200).json(data)
    } catch {
        return res.status(502).json({ error: 'Failed to fetch upstream data' })
    }
}
