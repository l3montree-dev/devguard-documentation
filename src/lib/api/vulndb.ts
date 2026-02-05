export type RadarDatum = {
    ecosystem: string
    count: number
}

export async function fetchRadarData(
    url = 'https://api.main.devguard.org/api/v1/vulndb/affected-package-distribution/',
): Promise<RadarDatum[]> {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            console.error(
                'API responded with',
                response.status,
                response.statusText,
            )
            return []
        }
        const result = await response.json()
        return (result as any[]).map((it) => ({
            ecosystem: String(it.ecosystem ?? it.name ?? 'unknown'),
            count: Number(it.count ?? it.value ?? 0),
        }))
    } catch (error) {
        console.error('Failed API Fetch: ', error)
        return []
    }
}
