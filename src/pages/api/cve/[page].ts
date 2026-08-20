import type { NextApiRequest, NextApiResponse } from 'next'
import { API_BASE_URL } from '@/lib/fetcher'

type CVEList = {
    data: {
        CVEID: string
        CreatedAt: string
        DatePublished?: string
    }[]
}

const cache = new Map<number, { data: CVEList; expiresAt: number }>()
const CACHE_TTL_MS = 12 * 60 * 60 * 1000 // 12 hours
const CACHE_MAX_ENTRIES = 50

const setCached = (offset: number, data: CVEList) => {
    const now = Date.now()
    cache.delete(offset)
    for (const [key, entry] of cache) {
        if (now >= entry.expiresAt) {
            cache.delete(key)
        }
    }
    // evict least-recently-used entries until there is room for the new one
    while (cache.size >= CACHE_MAX_ENTRIES) {
        const oldest = cache.keys().next()
        if (oldest.done) {
            break
        }
        cache.delete(oldest.value)
    }
    cache.set(offset, { data, expiresAt: now + CACHE_TTL_MS })
}

export const getServerSideCVEs = async (
    offset: number,
    CVES_PER_SITEMAP: number,
): Promise<CVEList | undefined> => {
    const cached = cache.get(offset)
    if (cached) {
        if (Date.now() < cached.expiresAt) {
            // re-insert so the entry becomes the most-recently-used one
            cache.delete(offset)
            cache.set(offset, cached)
            return cached.data
        }
        cache.delete(offset)
    }
    try {
        const res = await fetch(
            `${API_BASE_URL}/vulndb/list-ids-by-creation-date/?offset=${encodeURIComponent(String(offset))}&limit=${encodeURIComponent(String(CVES_PER_SITEMAP))}`,
        )
        if (!res.ok) {
            console.error(`Upstream API error: ${res.status} ${res.statusText}`)
            // release the connection instead of waiting for GC
            await res.body?.cancel().catch(() => {})
            return undefined
        }
        const repo: CVEList = await res.json()
        setCached(offset, repo)
        return repo
    } catch (error) {
        console.error('Failed API Fetch: ', error)
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { page } = req.query
    const pageNum = parseInt((page as string).replace('.xml', ''), 10)

    if (isNaN(pageNum) || pageNum < 0) {
        return res.status(400).send('Invalid page number')
    }

    const baseUrl = 'https://docs.devguard.org'
    const CVES_PER_SITEMAP = 50000
    const offset = pageNum * CVES_PER_SITEMAP

    const data = await getServerSideCVEs(offset, CVES_PER_SITEMAP)

    if (!data) {
        return res.status(500).send('Failed to fetch CVE data')
    }

    const cveUrls = data.data.map((item) => ({
        loc: `${baseUrl}/vulnerability-database/${item.CVEID}/`,
        lastmod: new Date(item.DatePublished ?? item.CreatedAt).toISOString(),
    }))

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cveUrls
    .map(
        (cve) => `  <url>
    <loc>${cve.loc}</loc>
    <lastmod>${cve.lastmod}</lastmod>
  </url>`,
    )
    .join('\n')}
</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=43200, stale-while-revalidate',
    )
    res.status(200).send(sitemap)
}
