import type { NextApiRequest, NextApiResponse } from 'next'

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

    // TODO: Hier deine CVE-Daten laden (offset, limit: CVES_PER_SITEMAP)
    // const cves = await fetchCVEs(offset, CVES_PER_SITEMAP)

    // Platzhalter – ersetze mit echten Daten
    const cveUrls = Array.from(
        { length: CVES_PER_SITEMAP },
        (_, i) => `CVE-2024-${String(offset + i).padStart(5, '0')}`,
    )

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cveUrls
    .map(
        (cve) => `  <url>
    <loc>${baseUrl}/cve/${cve}</loc>
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
