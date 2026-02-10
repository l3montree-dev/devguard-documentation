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
        return Object.entries(result)
            .map(([ecosystem, count]) => ({
                ecosystem,
                count: Number(count),
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6)
    } catch (error) {
        console.error('Failed API Fetch: ', error)
        return []
    }
}
