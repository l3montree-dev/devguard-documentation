import type { NextApiRequest, NextApiResponse } from 'next'

type CVEList = {
    total: number
}

export const getServerSideCVEs = async () => {
    const res = await fetch(
        'https://api.main.devguard.org/api/v1/vulndb/list-ids-by-creation-date',
    )
    const repo: CVEList = await res.json()
    return repo
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devguard.org'
    let TOTAL_CVES = 0
    try {
        const data = await getServerSideCVEs()
        TOTAL_CVES = data?.total ?? 0
    } catch (e) {
        console.log(e)
    }
    const CVES_PER_SITEMAP = 50000
    const numberOfCveSitemaps = Math.ceil(TOTAL_CVES / CVES_PER_SITEMAP)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(
    { length: numberOfCveSitemaps },
    (_, i) => `  <sitemap>
    <loc>${baseUrl}/api/cve/${i}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`,
).join('\n')}
</sitemapindex>`

    res.setHeader('Content-Type', 'text/xml')
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=43200, stale-while-revalidate',
    )
    res.status(200).send(sitemap)
}
