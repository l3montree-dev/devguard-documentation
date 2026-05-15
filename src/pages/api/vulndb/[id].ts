import type { NextApiRequest, NextApiResponse } from 'next'
import { API_BASE_URL } from '@/lib/fetcher'
import { VULN_ID_PATTERN, normalizeVulnId } from '@/lib/vulndb'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { id } = req.query
    if (typeof id !== 'string' || !VULN_ID_PATTERN.test(id)) {
        return res.status(400).json({ message: 'Invalid id parameter' })
    }

    try {
        const params = new URLSearchParams()
        for (const [key, value] of Object.entries(req.query)) {
            if (key === 'id') continue
            if (Array.isArray(value)) {
                for (const item of value) params.append(key, item)
            } else if (typeof value === 'string') {
                params.append(key, value)
            }
        }

        const qs = params.toString()
        const targetUrl = `${API_BASE_URL}/vulndb/${normalizeVulnId(id)}${qs ? `?${qs}` : ''}`
        const upstream = await fetch(targetUrl)
        if (!upstream.ok) {
            const errorText = await upstream.text()
            console.error(
                `Upstream API error: ${upstream.status} ${upstream.statusText}`,
                {
                    url: targetUrl,
                    status: upstream.status,
                    statusText: upstream.statusText,
                    body: errorText,
                },
            )
            return res.status(upstream.status).json({
                message: `Upstream API error: ${upstream.status} ${upstream.statusText}`,
            })
        }
        const contentType = upstream.headers.get('content-type')
        const bodyText = await upstream.text()

        if (contentType) res.setHeader('content-type', contentType)

        return res.status(upstream.status).send(bodyText)
    } catch {
        return res.status(502).json({
            message: 'Failed to fetch vulnerability data from upstream API',
        })
    }
}
