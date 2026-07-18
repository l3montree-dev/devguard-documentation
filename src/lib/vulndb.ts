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

export function advisorySourceUrl(id: string): string | null {
    if (/^WID-SEC/i.test(id)) {
        // The portal expects the ID without the internal single-letter segment,
        const name = id.replace(/^(WID-SEC)-[A-Za-z]-/i, '$1-')
        return `https://wid.cert-bund.de/portal/wid/securityadvisory?name=${encodeURIComponent(name)}`
    }
    // NCSC advisories live under year/id
    const ncsc = id.match(/^NCSC-(\d{4})-/i)
    if (ncsc) {
        return `https://advisories.ncsc.nl/${ncsc[1]}/${id.toLowerCase()}.html`
    }
    return null
}
