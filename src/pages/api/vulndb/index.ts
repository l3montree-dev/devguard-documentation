import type { NextApiRequest, NextApiResponse } from 'next'
import { API_BASE_URL } from '@/lib/fetcher'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET')
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const params = new URLSearchParams()
        for (const [key, value] of Object.entries(req.query)) {
            if (Array.isArray(value)) {
                for (const item of value) {
                    params.append(key, item)
                }
            } else if (typeof value === 'string') {
                params.append(key, value)
            }
        }

        const targetUrl = `${API_BASE_URL}/vulndb/?${params.toString()}`
        const upstream = await fetch(targetUrl)
        const contentType = upstream.headers.get('content-type')
        const bodyText = await upstream.text()

        if (contentType) {
            res.setHeader('content-type', contentType)
        }

        return res.status(upstream.status).send(bodyText)
    } catch {
        return res.status(502).json({
            message: 'Failed to fetch vulnerability data from upstream API',
        })
    }
}
