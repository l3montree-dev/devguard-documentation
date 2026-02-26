export interface ScoreCardCheck {
    name: string
    score: number
    reason: string
}

export interface ScoreCard {
    checks: ScoreCardCheck[]
}

export interface Project {
    projectKey: string
    starsCount: number
    forksCount: number
    homepage: string
    license: string
    description: string
    scoreCard: ScoreCard
    scoreCardScore: number
    updatedAt: string
}

export interface CVE {
    cve: string
    description: string
    cvss: number
    datePublished: string
}

export interface AffectedComponent {
    cves: CVE[]
}

export interface Vuln {
    cveId: string
    fixedVersion: string
}

export interface Component {
    version: string
    published: string
    project: Project
}

export interface PackageInspectResult {
    purl: string
    component: Component
    affectedComponents: AffectedComponent[]
    vulns: Vuln[]
    maliciousPackage: {
        id: string
        summary: string
        details: string
        published: string
        modified: string
    } | null
}
