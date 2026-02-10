import type { NextApiRequest, NextApiResponse } from 'next'

type CVEList = {
    data: {
        CVEID: string
        CreatedAt: string
    }[]
}

export const getServerSideCVEs = async (
    offset: number,
    CVES_PER_SITEMAP: number,
) => {
    try {
        const res = await fetch(
            `https://api.main.devguard.org/api/v1/vulndb/list-ids-by-creation-date?offset=${offset}&limit=${CVES_PER_SITEMAP}`,
        )
        const repo: CVEList = await res.json()
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

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devguard.org'
    const CVES_PER_SITEMAP = 50000
    const offset = pageNum * CVES_PER_SITEMAP

    const data = await getServerSideCVEs(offset, CVES_PER_SITEMAP)

    if (!data) {
        return res.status(500).send('Failed to fetch CVE data')
    }

    const cveUrls = data.data.map(
        (item) => `${baseUrl}/vulnerability-database/${item.CVEID}`,
    )

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cveUrls
    .map(
        (cve) => `  <url>
    <loc>${cve}</loc>
  </url>`,
    )
    .join('\n')}
</urlset>`

    res.setHeader('Content-Type', 'text/xml')
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=43200, stale-while-revalidate',
    )
    res.status(200).send(sitemap)
}
