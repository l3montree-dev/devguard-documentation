export const VULN_ID_PATTERN = /^[A-Za-z0-9\-:]+$/

export function normalizeVulnId(id: string): string {
    return /^ghsa-/i.test(id)
        ? 'GHSA-' + id.slice(5).toLowerCase()
        : id.toUpperCase()
}

// currently we only support BSI and NCSC which use the following prefixes
const ADVISORY_ID_PATTERN = /^(WID-SEC|NCSC-)/i

export function isAdvisoryId(id: string): boolean {
    return ADVISORY_ID_PATTERN.test(id)
}
