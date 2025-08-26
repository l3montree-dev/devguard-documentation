import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse,
) {
    res.status(200).json({ status: 'ok' })
}
