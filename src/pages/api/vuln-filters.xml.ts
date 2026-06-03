import type { NextApiRequest, NextApiResponse } from 'next'
import { API_BASE_URL } from '@/lib/fetcher'

const SEVERITY_VALUES = ['critical', 'high', 'medium', 'low']
const MIN_ECOSYSTEM_CVE_COUNT = 100

async function fetchEcosystems(): Promise<string[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/vulndb/cve-ecosystem-distribution/`)
        if (!res.ok) return []
        const dist: Record<string, number> = await res.json()
        return Object.entries(dist)
            .filter(([key, count]) => key && count >= MIN_ECOSYSTEM_CVE_COUNT)
            .map(([key]) => key)
    } catch {
        return []
    }
}

async function fetchActiveYears(): Promise<string[]> {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
    const results = await Promise.allSettled(
        years.map(async (year) => {
            const url = new URL(`${API_BASE_URL}/vulndb/`)
            url.searchParams.set('filterQuery[date_published][is after]', `${year - 1}-12-31`)
            url.searchParams.set('filterQuery[date_published][is before]', `${year + 1}-01-01`)
            url.searchParams.set('page', '1')
            url.searchParams.set('pageSize', '1')
            const r = await fetch(url.toString())
            const d = await r.json()
            return { year, total: (d.total as number) ?? 0 }
        }),
    )
    return results
        .filter(
            (r): r is PromiseFulfilledResult<{ year: number; total: number }> =>
                r.status === 'fulfilled' && r.value.total > 0,
        )
        .map(({ value: { year } }) => String(year))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://docs.devguard.org'
    const now = new Date().toISOString()

    const [ecosystems, years] = await Promise.all([fetchEcosystems(), fetchActiveYears()])

    const urls: string[] = [
        ...SEVERITY_VALUES.map((s) => `${baseUrl}/vulnerability-database/severity/${s}/`),
        ...years.map((y) => `${baseUrl}/vulnerability-database/year/${y}/`),
        ...ecosystems.map((e) => `${baseUrl}/vulnerability-database/ecosystem/${encodeURIComponent(e)}/`),
    ]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`).join('\n')}
</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=43200, stale-while-revalidate')
    res.status(200).send(sitemap)
}
