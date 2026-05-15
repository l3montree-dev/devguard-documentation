export const API_BASE_URL =
    process.env.NEXT_PUBLIC_DEVGUARD_API_URL ??
    'https://api.main.devguard.org/api/v1'

export async function fetcher<T = unknown>(url: string): Promise<T> {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`)
    }
    return res.json() as Promise<T>
}
