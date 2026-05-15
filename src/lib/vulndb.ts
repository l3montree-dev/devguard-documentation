export const VULN_ID_PATTERN = /^[A-Za-z0-9\-:]+$/

export function normalizeVulnId(id: string): string {
    return /^ghsa-/i.test(id)
        ? 'GHSA-' + id.slice(5).toLowerCase()
        : id.toUpperCase()
}
