import { API_BASE_URL } from '@/lib/fetcher'
import type { IndexCVE } from '@/components/vulnerability-database/VulnIndexPage'
import type { ParsedUrlQuery } from 'querystring'

export const PAGE_SIZE = 100
const MIN_ECOSYSTEM_CVE_COUNT = 100

const SORT_FIELD_MAP: Record<string, string> = {
    cve: 'cve',
    cvss: 'cvss',
    datePublished: 'date_published',
}

export interface RelatedLink {
    label: string
    href: string
}

interface FetchResult {
    cves: IndexCVE[]
    total: number
    page: number
    search: string
    sort: string
    dir: string
}

export async function fetchIndexCVEs(
    query: ParsedUrlQuery,
    baseFilters: Record<string, string>,
): Promise<FetchResult> {
    const search = ((query.search as string) ?? '').trim()
    const sort = (query.sort as string) ?? 'cvss'
    const dir = (query.dir as string) ?? 'desc'
    const page = Math.max(1, parseInt((query.page as string) ?? '1', 10) || 1)

    const url = new URL(`${API_BASE_URL}/vulndb/`)

    for (const [key, value] of Object.entries(baseFilters)) {
        url.searchParams.set(key, value)
    }

    if (search) {
        url.searchParams.set('filterQuery[cve][ilike]', `%${search.toUpperCase()}%`)
    }

    url.searchParams.set('page', String(page))
    url.searchParams.set('pageSize', String(PAGE_SIZE))

    const sortField = SORT_FIELD_MAP[sort] ?? 'cvss'
    url.searchParams.set(`sort[${sortField}]`, dir)

    const res = await fetch(url.toString())
    if (!res.ok) throw new Error(`API error: ${res.status}`)

    const data = await res.json()

    const cves: IndexCVE[] = (data.data ?? []).map((item: IndexCVE) => ({
        cve: item.cve,
        cvss: item.cvss,
        description: item.description,
        datePublished: item.datePublished,
    }))

    return { cves, total: data.total ?? 0, page, search, sort, dir }
}

export async function fetchYearLinks(exclude?: string): Promise<RelatedLink[]> {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i)
    const results = await Promise.allSettled(
        years.map(async (year) => {
            const url = new URL(`${API_BASE_URL}/vulndb/`)
            url.searchParams.set('filterQuery[date_published][is after]', `${year - 1}-12-31`)
            url.searchParams.set('filterQuery[date_published][is before]', `${year + 1}-01-01`)
            url.searchParams.set('page', '1')
            url.searchParams.set('pageSize', '1')
            const r = await fetch(url.toString())
            const d = await r.json()
            return { year, total: d.total as number }
        }),
    )
    return results
        .filter(
            (r): r is PromiseFulfilledResult<{ year: number; total: number }> =>
                r.status === 'fulfilled' && r.value.total > 0 && String(r.value.year) !== exclude,
        )
        .map(({ value: { year } }) => ({
            label: String(year),
            href: `/vulnerability-database/year/${year}/`,
        }))
}

// Canonical display order for ecosystem links — stable regardless of CVE counts
const ECOSYSTEM_ORDER = [
    'npm', 'pypi', 'maven', 'go', 'debian', 'alpine',
    'nuget', 'rubygems', 'packagist', 'crates.io',
    'git', 'red hat', 'bitnami',
]

export async function fetchEcosystemLinks(exclude?: string): Promise<RelatedLink[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/vulndb/cve-ecosystem-distribution/`)
        if (!res.ok) return []
        const dist: Record<string, number> = await res.json()

        const present = new Set(
            Object.entries(dist)
                .filter(([key, count]) => key && count >= MIN_ECOSYSTEM_CVE_COUNT)
                .map(([key]) => key),
        )

        // Ecosystems in canonical order first, then any others sorted by count
        const ordered = [
            ...ECOSYSTEM_ORDER.filter((k) => present.has(k) && k !== exclude),
            ...Object.entries(dist)
                .filter(([key, count]) => key && count >= MIN_ECOSYSTEM_CVE_COUNT && key !== exclude && !ECOSYSTEM_ORDER.includes(key))
                .sort((a, b) => b[1] - a[1])
                .map(([key]) => key),
        ]

        return ordered.map((key) => ({
            label: key,
            href: `/vulnerability-database/ecosystem/${encodeURIComponent(key)}/`,
        }))
    } catch {
        return []
    }
}
