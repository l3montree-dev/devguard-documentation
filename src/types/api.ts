export type AffectedComponent = {
    id: string
    Source: string
    purl: string
    ecosystem: string
    scheme: string
    type: string
    name: string
    namespace: string
    subpath?: string
    version: string
    semverStart?: string
    semverEnd?: string
    versionIntroduced?: string
    versionFixed?: string
    cves?: string
}

export type AffectedComponents = AffectedComponent[]
