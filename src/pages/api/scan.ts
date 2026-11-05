import type { NextApiRequest, NextApiResponse } from 'next'
import { API_BASE_V2_URL } from '@/lib/fetcher'

export const config = {
    api: { bodyParser: { sizeLimit: '3mb' } },
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ message: 'Method not allowed' })
    }

    try {
        const upstream = await fetch(
            `${API_BASE_V2_URL}/scan-unauthenticated`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(req.body),
            },
        )
        const contentType = upstream.headers.get('content-type')
        if (contentType) res.setHeader('content-type', contentType)
        return res.status(upstream.status).send(await upstream.text())
    } catch {
        return res.status(502).json({ message: 'Failed to scan SBOM' })
    }
}
